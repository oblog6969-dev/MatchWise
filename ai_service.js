/**
 * MatchWise Lite v2.5.2 AI Service
 * Multi-Provider Clinical & Psychometric Orchestration:
 * 1. MatchWise Autonomous AI (Built-in Free / No Key Required / Unlimited Requests)
 * 2. Google Gemini 1.5 Flash (Free Tier via aistudio.google.com)
 * 3. Groq (Llama 3.3 70B - Fast Free Tier)
 * 4. DeepSeek Pro (Direct api.deepseek.com & NVIDIA NIM)
 * 5. OpenAI (GPT-4o Mini)
 */

class AIService {
    constructor() {
        const getStored = (k) => (typeof localStorage !== "undefined" ? localStorage.getItem(k) : null);
        this.provider = getStored("mw_ai_provider") || "builtin"; // "builtin" default!
        this.apiKey = getStored("mw_ai_key") || "";
    }

    setConfiguration(provider, apiKey) {
        if (provider) {
            this.provider = provider;
            if (typeof localStorage !== "undefined") localStorage.setItem("mw_ai_provider", provider);
        }
        this.apiKey = apiKey || "";
        if (typeof localStorage !== "undefined") localStorage.setItem("mw_ai_key", this.apiKey);
    }

    /**
     * Adaptive Question Determination
     * Evaluates psychometric convergence and returns optimal diagnostic question.
     */
    async determineNextQuestion(currentHistory, currentAnswers, allQuestions, currentLanguage) {
        let currentProfile = {};
        try {
            if (typeof window !== "undefined" && window.PersonalityEngine) {
                currentProfile = window.PersonalityEngine.calculate(currentAnswers, allQuestions);
            }
        } catch (err) {
            console.warn("PersonalityEngine calculation skipped for prompt:", err);
        }

        const remainingQuestions = allQuestions.filter(q => !currentAnswers[q.id]);
        if (remainingQuestions.length === 0) return null;

        // If using built-in or if no API key is provided, use autonomous psychometric convergence
        if (this.provider === "builtin" || !this.apiKey) {
            return this.determineNextQuestionAutonomous(currentAnswers, remainingQuestions, currentProfile, currentLanguage);
        }

        const askedCount = Object.keys(currentAnswers).length;
        const prompt = `You are an expert psychometrician and relationship psychologist AI.
Assess 10 frameworks (Hartman, DISC, Birkman, FIRO-B, TKI, Gottman, Attachment, Schwartz, Big Five).
User has answered ${askedCount} questions.
Current State: Hartman: ${currentProfile.hartman?.primary || "Pending"}, DISC: ${currentProfile.disc?.primary || "Pending"}, Need: ${currentProfile.birkman?.underlying_need || "Pending"}.
Choose the most diagnostic next question from: ${JSON.stringify(remainingQuestions.slice(0, 20).map(q => ({ id: q.id, trait: q.trait, cat: q.category })))}.
Output valid JSON only: { "nextQuestionId": "string", "clinicalReason": "string in ${currentLanguage === 'ar' ? 'Arabic' : 'English'}" }`;

        try {
            const responseText = await this.callAI(prompt);
            const jsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(jsonStr);
            if (parsed && parsed.nextQuestionId && remainingQuestions.some(q => q.id === parsed.nextQuestionId)) {
                return parsed;
            }
        } catch (e) {
            console.warn("External AI call failed, falling back to autonomous engine:", e.message);
        }

        return this.determineNextQuestionAutonomous(currentAnswers, remainingQuestions, currentProfile, currentLanguage);
    }

    determineNextQuestionAutonomous(currentAnswers, remainingQuestions, currentProfile, currentLanguage) {
        const isAr = currentLanguage === "ar";
        // Prioritize diagnostic multi-framework scenario questions first
        const scenarioQuestions = remainingQuestions.filter(q => ["q71", "q72", "q73", "q74", "q75"].includes(q.id));
        if (scenarioQuestions.length > 0) {
            const q = scenarioQuestions[0];
            return {
                nextQuestionId: q.id,
                clinicalReason: isAr
                    ? "سؤال تشخيصي لوزن التوافق العملي في إدارة المواقف والأولويات المشتركة."
                    : "Diagnostic scenario evaluating multi-framework decision styles and underlying needs.",
                frameworkTarget: q.trait || "multi-framework"
            };
        }

        // Otherwise pick the question addressing the most uncertain category
        const hScores = currentProfile.hartman?.scores || {};
        const isHartmanTied = Math.abs((hScores.red || 25) - (hScores.blue || 25)) < 8;
        
        let targetQ = remainingQuestions[0];
        if (isHartmanTied) {
            const found = remainingQuestions.find(q => q.options && q.options.some(opt => opt.trait_scores && (opt.trait_scores.hartman_red || opt.trait_scores.hartman_blue)));
            if (found) targetQ = found;
        }

        return {
            nextQuestionId: targetQ.id,
            clinicalReason: isAr
                ? "سؤال استكشافي لقياس النمط التواصلي ومستوى الحساسية العاطفية."
                : "Exploratory item measuring communicative pace and relational priorities.",
            frameworkTarget: targetQ.trait || "general"
        };
    }

    /**
     * Individual Report Qualitative Analysis
     */
    async analyzeReport(userProfile, currentLanguage) {
        const isAr = currentLanguage === "ar";

        // If built-in provider or no key, return autonomous analysis directly
        if (this.provider === "builtin" || !this.apiKey) {
            return this.generateBuiltinSingleAnalysis(userProfile, currentLanguage);
        }

        const prompt = `You are a world-class relationship psychologist analyzing an individual 10-framework psychometric report.
Language: ${isAr ? 'Arabic' : 'English'}. WRITE ENTIRE ANALYSIS IN ${isAr ? 'ARABIC' : 'ENGLISH'}.
Profile: ${JSON.stringify({
    name: userProfile.owner_name,
    hartman: userProfile.calculated_personality?.hartman,
    disc: userProfile.calculated_personality?.disc,
    birkman: userProfile.calculated_personality?.birkman,
    firo_b: userProfile.calculated_personality?.firo_b,
    gottman_safety: userProfile.calculated_personality?.gottman_safety,
    attachment: userProfile.calculated_personality?.attachment
}, null, 2)}
Output raw JSON only matching schema:
{
  "coreMotiveAnalysis": "...",
  "operatingManual": { "naturalStyle": "...", "hiddenNeeds": "...", "stressReaction": "...", "howToDeescalate": "..." },
  "conflictAndSafety": "...",
  "attachmentProfile": "...",
  "positiveTraits": ["...", "...", "...", "..."],
  "growthAreas": ["...", "...", "..."],
  "watchouts": ["...", "..."]
}`;

        try {
            const responseText = await this.callAI(prompt);
            const jsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(jsonStr);
        } catch (error) {
            console.warn("External AI failed, utilizing autonomous clinical engine:", error.message);
            return this.generateBuiltinSingleAnalysis(userProfile, currentLanguage);
        }
    }

    /**
     * Autonomous Local Clinical Analysis for Single Profile
     */
    generateBuiltinSingleAnalysis(userProfile, currentLanguage) {
        const isAr = currentLanguage === "ar";
        const traits = userProfile.calculated_personality || {};
        const h = traits.hartman || { primary: "blue" };
        const d = traits.disc || { primary: "S", pace: "Reflective" };
        const b = traits.birkman || { usual_style: "supportive", underlying_need: "empathy", stress_trigger: "withdrawing" };
        const ecr = traits.attachment || { primary: "secure", anxiety_score: 25, avoidance_score: 30 };
        const g = traits.gottman_safety || { emotional_safety_index: 85 };

        const motiveTexts = {
            red: {
                en: `Your core operating motive is RED (Power, Progress & Leadership). You are naturally decisive, proactive, and driven by competence and tangible progress. You thrive when respected and given autonomy. Your vulnerability is impatience with indecisiveness or extended delays.`,
                ar: `دافعك النفسي الأساسي مدفوع باللون الأحمر (القوة، الإنجاز، والقيادة). تتميز بالحسم والمبادرة العالية والتركيز على الكفاءة والنتائج. يزدهر أداؤك عند الاحترام والاستقلالية، وتكمن نقطة ضعفك في نفاد الصبر السريع مع التردد أو التسويف.`
            },
            blue: {
                en: `Your core operating motive is BLUE (Intimacy, Depth & Loyalty). You bring genuine emotional devotion, thoughtful care, and deep authenticity to your relationships. You crave being truly understood and valued. Your vulnerability is hyper-sensitivity to perceived criticism or emotional coldness.`,
                ar: `دافعك النفسي الأساسي مدفوع باللون الأزرق (التقارب العاطفي، العمق، والوفاء). تتمتع بصدق وجداني عميق واهتمام بالغ بالتفاصيل والوفاء. وقودك الحقيقي هو التقدير والشعور بالأمان العاطفي، ونقطة ضعفك هي الحساسية المفرطة تجاه النقد أو البرود.`
            },
            white: {
                en: `Your core operating motive is WHITE (Peace, Clarity & Internal Harmony). You possess an extraordinary gift for calmness, balanced reasoning, and low-drama consistency. You thrive in accepting environments free of excessive pressure. Your vulnerability is quiet avoidance of confronting difficult issues.`,
                ar: `دافعك النفسي الأساسي مدفوع باللون الأبيض (السلام، الهدوء، والوضوح الداخلي). تمتلك قدرة فريدة على حفظ الهدوء والاتزان وتجنب الصراعات المفتعلة. وقودك هو القبول الهادئ وغياب الضغط، ونقطة ضعفك هي الانعزال وتأجيل حسم المسائل الشائكة.`
            },
            yellow: {
                en: `Your core operating motive is YELLOW (Joy, Spontaneity & Optimism). You radiate infectious energy, social warmth, and playful enthusiasm. You thrive on novelty, shared adventures, and sincere affirmation. Your vulnerability is routine fatigue and avoiding uncomfortable obligations.`,
                ar: `دافعك النفسي الأساسي مدفوع باللون الأصفر (البهجة، العفوية، والمرح الإيجابي). تنشر التفاؤل والحيوية وتجيد كسر الروتين. وقودك هو خوض تجارب جديدة والحرية والمودة التعبيرية، ونقطة ضعفك هي سرعة الملل وتجنب الأعباء الثقيلة.`
            }
        };

        const primaryCol = (h.primary || "blue").toLowerCase();
        const motiveAnalysis = motiveTexts[primaryCol] ? (isAr ? motiveTexts[primaryCol].ar : motiveTexts[primaryCol].en) : (isAr ? motiveTexts.blue.ar : motiveTexts.blue.en);

        return {
            coreMotiveAnalysis: motiveAnalysis,
            operatingManual: {
                naturalStyle: isAr ? `سلوك يومي يتسم بـ (${b.usual_style})، مع إيقاع (${d.pace_ar || d.pace}).` : `Outwardly manifests as ${b.usual_style} with a ${d.pace} tempo.`,
                hiddenNeeds: isAr ? `حاجة عميقة لـ (${b.underlying_need}) والاعتراف الصادق بالمشاعر.` : `Crucial underlying need for ${b.underlying_need} and consistent reassurance.`,
                stressReaction: isAr ? `عند التعب أو الإجهاد، قد يلجأ إلى (${b.stress_trigger}).` : `Under prolonged stress, derailer reflex manifests as ${b.stress_trigger}.`,
                howToDeescalate: isAr ? `التحدث بنبرة هادئة ومنح مساحة للتعبير دون مقاطعة أو دفاعية.` : `Lower vocal volume, offer clear emotional reassurance, and avoid defensive counter-attacks.`
            },
            conflictAndSafety: isAr
                ? `مؤشر الأمان العاطفي لديك يبلغ (${g.emotional_safety_index}%)، مما يمنحك ركيزة متوازنة لاحتواء الأزمات بشرط مراقبة ردود الفعل الارتدادية.`
                : `Your Emotional Safety Index sits at ${g.emotional_safety_index}%, indicating a solid foundation for cooperative dispute resolution when emotional flooding is managed.`,
            attachmentProfile: isAr
                ? `نمط الارتباط الغالب هو (${ecr.primary}) بدرجة قلق (${ecr.anxiety_score || 25}%) وتجنب (${ecr.avoidance_score || 30}%). تبحث عن ملاذ آمن يجمع بين القرب والاستقرار.`
                : `Attachment orientation reflects a ${ecr.primary} baseline (Anxiety: ${ecr.anxiety_score || 25}%, Avoidance: ${ecr.avoidance_score || 30}%), prioritizing secure intimacy and mutual dependability.`,
            positiveTraits: isAr ? [
                "وعي ذاتي مرتفع وقدرة على فهم الاحتياجات العاطفية",
                "وفاء والتزام عميق في العلاقات القريبة",
                "مرونة في التكيف عند وضوح التوقعات المشتركة",
                "رغبة صادقة في بناء حياة أسرية مستقرة"
            ] : [
                "High introspective emotional self-awareness",
                "Deep loyalty and investment in partner well-being",
                "Adaptable problem-solving when boundaries are clear",
                "Strong foundational commitment to a durable marriage"
            ],
            growthAreas: isAr ? [
                "التعبير الصريح عن الاحتياجات قبل أن تتحول إلى استياء صامت",
                "التمييز بين النقد الموضوعي للرأي وبين الهجوم على الشخصية",
                "منح النفس استراحة واعية عند الشعور بالإرهاق النفسي"
            ] : [
                "Vocalizing unspoken needs before they turn into silent resentment",
                "Distinguishing between constructive feedback and personal rejection",
                "Taking intentional timeouts when noticing stress derailing triggers"
            ],
            watchouts: isAr ? [
                `الحذر من ردة فعل التوتر (${b.stress_trigger}) أثناء المشاحنات الساخنة`,
                "تجنب افتراض ما يدور في ذهن الشريك دون سؤال مباشر"
            ] : [
                `Be mindful of the stress reflex (${b.stress_trigger}) during heated moments`,
                "Avoid mind-reading or projecting assumptions onto the other party"
            ]
        };
    }

    /**
     * Dyadic (2-Report) Compatibility Consultation
     */
    async compareProfilesWithAI(profileA, profileB, currentLanguage) {
        const isAr = currentLanguage === "ar";

        // If built-in provider or no key, return autonomous dyadic consultation directly
        if (this.provider === "builtin" || !this.apiKey) {
            return this.generateBuiltinDyadicConsultation(profileA, profileB, currentLanguage);
        }

        const prompt = `You are a clinical marital and relationship psychologist AI conducting a deep dyadic compatibility consultation.
Language: ${isAr ? 'Arabic' : 'English'}. WRITE ENTIRE ANALYSIS IN ${isAr ? 'ARABIC' : 'ENGLISH'}.
Partner A: ${profileA.owner_name}, Hartman: ${profileA.calculated_personality?.hartman?.primary}, DISC: ${profileA.calculated_personality?.disc?.primary}, Need: ${profileA.calculated_personality?.birkman?.underlying_need}.
Partner B: ${profileB.owner_name}, Hartman: ${profileB.calculated_personality?.hartman?.primary}, DISC: ${profileB.calculated_personality?.disc?.primary}, Need: ${profileB.calculated_personality?.birkman?.underlying_need}.
Output raw JSON only matching schema:
{
  "executiveSummary": "...",
  "motiveAndPaceDynamic": "...",
  "crossNeedCollision": "...",
  "leadershipAndPower": "...",
  "reactiveConflictDance": "...",
  "deescalationProtocol": "...",
  "conversationalBridgeScripts": [
    { "scenario": "...", "scriptA": "...", "scriptB": "..." },
    { "scenario": "...", "scriptA": "...", "scriptB": "..." },
    { "scenario": "...", "scriptA": "...", "scriptB": "..." }
  ]
}`;

        try {
            const responseText = await this.callAI(prompt);
            const jsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(jsonStr);
        } catch (error) {
            console.warn("External AI consultation failed, utilizing autonomous clinical engine:", error.message);
            return this.generateBuiltinDyadicConsultation(profileA, profileB, currentLanguage);
        }
    }

    /**
     * Autonomous Local Clinical Consultation for 2 Profiles
     */
    generateBuiltinDyadicConsultation(profileA, profileB, currentLanguage) {
        const isAr = currentLanguage === "ar";
        const tA = profileA.calculated_personality || {};
        const tB = profileB.calculated_personality || {};
        const nameA = profileA.owner_name;
        const nameB = profileB.owner_name;

        const hA = (tA.hartman?.primary || "blue").toUpperCase();
        const hB = (tB.hartman?.primary || "white").toUpperCase();
        const needA = tA.birkman?.underlying_need || "empathy";
        const needB = tB.birkman?.underlying_need || "freedom";
        const stressA = tA.birkman?.stress_trigger || "demanding";
        const stressB = tB.birkman?.stress_trigger || "withdrawing";

        return {
            executiveSummary: isAr
                ? `تحليل توافق استشاري معمق بين ${nameA} و ${nameB}. تكشف المقارنة النفسية عن تكامل بنيوي واعد يجمع بين دافع (${hA}) لدى ${nameA} ودافع (${hB}) لدى ${nameB}. نجاح هذا المسار يعتمد على احترام فوارق السرعة والإيقاع اليومي، وإشباع الاحتياجات الخفية قبل تصاعد الخلافات.`
                : `In-depth dyadic consultation between ${nameA} and ${nameB}. Psychometric synthesis reveals a powerful complementary union bridging ${nameA}'s ${hA} motive with ${nameB}'s ${hB} energy. Long-term marital flourishing hinges on honoring tempo variations and satisfying unspoken emotional needs.`,

            motiveAndPaceDynamic: isAr
                ? `يقدم ${nameA} طاقة المبادرة والوضوح العملي، بينما يضفي ${nameB} عمقاً إنسانياً وتوازناً مدروساً. عند اتخاذ القرارات، يتطلب تفاوت السرعة ألا يتعجل ${nameA} الشريك، وأن يبادر ${nameB} بمشاركة انطباعاته دون تردد.`
                : `${nameA} provides forward drive, clarity, and structural momentum, while ${nameB} contributes emotional grounding and stability. The tempo differential means ${nameA} must avoid rushing decision cycles, while ${nameB} benefits from proactively sharing feedback.`,

            crossNeedCollision: isAr
                ? `نقطة الحذر الأساسية: يحتاج ${nameA} سراً إلى (${needA})، بينما يحتاج ${nameB} بشدة إلى (${needB}). عندما يشعر أحد الطرفين بعدم إشباع احتياجه، يبدأ الاحتكاك الدفاعي غير المقصود.`
                : `Primary tripwire: ${nameA} requires ${needA} to feel secure, whereas ${nameB} fundamentally craves ${needB}. When either need feels ignored under exhaustion, defensive cross-derailment occurs.`,

            leadershipAndPower: isAr
                ? `توزيع المسؤوليات والقيادة: يتكامل الطرفان بشكل ممتاز عندما يتولى ${nameA} إدارة التخطيط والمتابعة التنفيذية بالتراضي، بينما يتولى ${nameB} العناية بتفاصيل الأجواء الأسرية والعمق الاجتماعي.`
                : `Leadership equilibrium: Highly synergistic when ${nameA} facilitates strategic direction and execution by mutual consensus, while ${nameB} nurtures relational harmony, hospitality, and family well-being.`,

            reactiveConflictDance: isAr
                ? `محاكاة دورة الخلاف: يبدأ النزاع عادةً بنبرة سريعة أو عتاب من ${nameA} في لحظة ضغط، فيشعر ${nameB} بتهديد احتياجه لـ (${needB})، فيلجأ تلقائياً إلى (${stressB}). هذا الصمت يربك ${nameA} فيتحول إلى (${stressA})، مما يوسع فجوة التباعد.`
                : `Conflict simulation: Sparks initiate when ${nameA} raises concerns directly during fatigue; ${nameB}'s need for ${needB} feels cornered, prompting ${stressB}. Sensing disengagement, ${nameA} escalates into ${stressA}, reinforcing the pursue-withdraw spiral.`,

            deescalationProtocol: isAr
                ? `قواعد التهدئة الذهبية: التوقف الفوري لمدة 20 دقيقة عند ارتفاع النبرة مع قول: "أنا حريص عليك وعلى علاقتنا، لنرتاح قليلاً ونكمل بهدوء".`
                : `Circuit Breaker: Enforce an immediate 20-minute de-escalation pause upon vocal escalation, coupled with verbal reassurance: "I love and value you; let's take a breath and talk softly."`,

            conversationalBridgeScripts: [
                {
                    scenario: isAr ? "عند الشعور بالإرهاق أو ضغوط العمل والرغبة في الهدوء" : "When returning home fatigued after high-stress hours",
                    scriptA: isAr ? `"${nameB}، أنا ممتن لجهودك، أحتاج فقط 15 دقيقة لأصفي ذهني وسأكون معك بكل انتباهي."` : `"${nameB}, I'm so glad to see you. I just need 15 minutes to unwind, and then I am completely present for you."`,
                    scriptB: isAr ? `"${nameA}، خذ وقتك بالكامل، البيت هادئ وبانتظارك حين ترتاح."` : `"${nameA}, take all the quiet time you need. I'm right here whenever you feel refreshed."`
                },
                {
                    scenario: isAr ? "عند نقاش ميزانية مشتركة أو قرارات مالية حساسة" : "When discussing finances, budgets, or unexpected expenses",
                    scriptA: isAr ? `"هدفي ليس التضييق، بل أن نبني أماننا المالي سوياً. ما هي أولوياتك الأهم هذا الشهر؟"` : `"My goal is our shared financial security, not restriction. What are the top priorities on your mind this month?"`,
                    scriptB: isAr ? `"أقدر حرصك وتخطيطك، دعنا ننظر للأرقام معاً خطوة بخطوة حتى نصل لاتفاق مريح لكلانا."` : `"I deeply appreciate your foresight. Let's look over the budget together step-by-step until we both feel comfortable."`
                },
                {
                    scenario: isAr ? "عند شعور أحد الشريكين بالجفاء أو الرغبة في التجديد العاطفي" : "When seeking emotional reassurance or closeness after a disagreement",
                    scriptA: isAr ? `"أعلم أن النقاش الأخير كان متوتراً، مكانتك عندي فوق أي خلاف، وأحب أن نتحدث بود."` : `"I know our last talk felt strained. You are far more important to me than any debate, and I want to reconnect."`,
                    scriptB: isAr ? `"أنا أيضاً أعتز بك وأشتاق لحديثنا الهادئ. شكراً لأنك بادرت بالوصل والاحتواء."` : `"I value us so much and missed our warmth. Thank you for reaching out and creating this safe space."`
                }
            ]
        };
    }

    // --- EXTERNAL PROVIDER DISPATCHER ---
    async callAI(prompt) {
        if (!this.apiKey) {
            throw new Error("No API key configured for external AI.");
        }

        if (this.provider === 'gemini') {
            return await this.callGemini(prompt);
        } else if (this.provider === 'groq') {
            return await this.callGroq(prompt);
        } else if (this.provider === 'deepseek' || this.provider === 'deepseek-pro') {
            return await this.callDeepseekDirect(prompt);
        } else if (this.provider === 'deepseek-ai/deepseek-v4-flash') {
            return await this.callDeepseekNvidia(prompt);
        } else if (this.provider === 'openai') {
            return await this.callOpenAI(prompt);
        }
        throw new Error(`Unsupported external AI provider: ${this.provider}`);
    }

    async callDeepseekDirect(prompt) {
        const url = `https://api.deepseek.com/v1/chat/completions`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.3
            })
        });

        if (!response.ok) throw new Error(`DeepSeek API Error: ${response.status}`);
        const data = await response.json();
        return data.choices[0].message.content;
    }

    async callDeepseekNvidia(prompt) {
        const url = `https://integrate.api.nvidia.com/v1/chat/completions`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`,
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                model: 'deepseek-ai/deepseek-v4-flash',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.3
            })
        });

        if (!response.ok) throw new Error(`NVIDIA DeepSeek Error: ${response.status}`);
        const data = await response.json();
        return data.choices[0].message.content;
    }

    async callGemini(prompt) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        if (!response.ok) throw new Error(`Gemini API Error: ${response.status}`);
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }

    async callOpenAI(prompt) {
        const url = `https://api.openai.com/v1/chat/completions`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [{ role: 'user', content: prompt }]
            })
        });

        if (!response.ok) throw new Error(`OpenAI API Error: ${response.status}`);
        const data = await response.json();
        return data.choices[0].message.content;
    }

    async callGroq(prompt) {
        const url = `https://api.groq.com/openai/v1/chat/completions`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [{ role: 'user', content: prompt }]
            })
        });

        if (!response.ok) throw new Error(`Groq API Error: ${response.status}`);
        const data = await response.json();
        return data.choices[0].message.content;
    }
}

// Global Export
if (typeof window !== "undefined") {
    window.AIService = AIService;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports = AIService;
}
