/**
 * MatchWise Lite v2.6.0 AI Service
 * Multi-Provider Clinical & Psychometric Orchestration:
 * 1. MatchWise Autonomous AI (Built-in Free / No Key Required / Unlimited Requests)
 * 2. Google Gemini 1.5 Flash (Free Tier via aistudio.google.com)
 * 3. Groq (Llama 3.3 70B - Fast Free Tier)
 * 4. DeepSeek Pro (Direct api.deepseek.com & NVIDIA NIM)
 * 5. OpenAI (GPT-4o Mini)
 */

// Localized psychometric term dictionaries for AI consultation
const AI_TRANSLATIONS = {
    hartman: {
        red: { ar: "الأحمر (القوة والقيادة)", en: "RED" },
        blue: { ar: "الأزرق (العمق والوفاء)", en: "BLUE" },
        white: { ar: "الأبيض (السلام والسكينة)", en: "WHITE" },
        yellow: { ar: "الأصفر (المرح والبهجة)", en: "YELLOW" }
    },
    birkman_style: {
        assertive: { ar: "الحزم والمبادرة المباشرة", en: "assertive" },
        supportive: { ar: "الدعم والتعاطف الوجداني", en: "supportive" },
        reflective: { ar: "التأمل والتروي الهادئ", en: "reflective" },
        organized: { ar: "التنظيم والمنهجية الواضحة", en: "organized" }
    },
    birkman_need: {
        empathy: { ar: "التعاطف والتفهم الصادق", en: "empathy" },
        freedom: { ar: "المساحة الشخصية والاستقلالية", en: "freedom" },
        structure: { ar: "الوضوح والنظام المحدد", en: "structure" },
        respect: { ar: "الاحترام والتقدير المتبادل", en: "respect" },
        affirmation: { ar: "التشجيع والتطمين الدائم", en: "affirmation" },
        directness: { ar: "الصراحة والوضوح التام", en: "directness" },
        patience: { ar: "التأني والرفق", en: "patience" }
    },
    birkman_stress: {
        withdrawing: { ar: "الانعزال والصمت الدفاعي", en: "withdrawing" },
        demanding: { ar: "الإلحاح والضغط المباشر", en: "demanding" },
        impatient: { ar: "الاستعجال والتوتر", en: "impatient" },
        resisting: { ar: "المقاومة السلبية", en: "resisting" },
        compliant: { ar: "المسايرة الظاهرية مع كتمان الضيق", en: "compliant" }
    },
    attachment: {
        secure: { ar: "الآمن والمتزن", en: "secure" },
        anxious: { ar: "القلق والباحث عن التطمين", en: "anxious" },
        avoidant: { ar: "التجنبي والباحث عن المساحة", en: "avoidant" },
        fearful: { ar: "المضطرب والحذر", en: "fearful" }
    }
};

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
     * Evaluates demographic constraints and psychometric convergence to return optimal diagnostic question.
     */
    async determineNextQuestion(currentHistory = [], currentAnswers = {}, allQuestions = [], currentLanguage = "en", userDemographics = {}) {
        let currentProfile = {};
        try {
            const engine = (typeof window !== "undefined" && window.PersonalityEngine) || (typeof global !== "undefined" && global.PersonalityEngine);
            if (engine) {
                currentProfile = engine.calculate(currentAnswers, allQuestions);
            }
        } catch (err) {
            console.warn("PersonalityEngine calculation skipped for prompt:", err);
        }

        const userGender = userDemographics.gender || null;
        const userMarital = userDemographics.maritalStatus || null;

        // Strict Demographic Gate: Filter remaining questions to only those matching user demographics
        const eligibleRemaining = allQuestions.filter(q => {
            if (currentAnswers[q.id] !== undefined) return false;
            if (q.gender_constraint && userGender && q.gender_constraint !== userGender) return false;
            if (q.marital_constraint && userMarital && q.marital_constraint !== userMarital) return false;
            return true;
        });

        if (eligibleRemaining.length === 0) return null;

        // If using built-in or if no API key is provided, use autonomous psychometric convergence
        if (this.provider === "builtin" || !this.apiKey) {
            return this.determineNextQuestionAutonomous(currentAnswers, eligibleRemaining, currentProfile, currentLanguage, userDemographics, currentHistory, allQuestions);
        }

        const askedCount = Object.keys(currentAnswers).length;
        const prompt = `You are an expert psychometrician and relationship psychologist AI.
Assess 10 frameworks (Hartman, DISC, Birkman, FIRO-B, TKI, Gottman, Attachment, Schwartz, Big Five).
User Profile: Name: ${userDemographics.name || "User"}, Gender: ${userGender === 'M' ? 'Male' : 'Female'}, Marital Status: ${userMarital || "single"}.
User has answered ${askedCount} questions.
Current State: Hartman: ${currentProfile.hartman?.primary || "Pending"}, DISC: ${currentProfile.disc?.primary || "Pending"}, Need: ${currentProfile.birkman?.underlying_need || "Pending"}.
Choose the most diagnostic next question from these demographically verified candidates:
${JSON.stringify(eligibleRemaining.slice(0, 15).map(q => ({ id: q.id, trait: q.trait, cat: q.category })))}.
Output valid JSON only: { "nextQuestionId": "string", "clinicalReason": "string in ${currentLanguage === 'ar' ? 'Arabic' : 'English'}" }`;

        try {
            const responseText = await this.callAI(prompt);
            const jsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(jsonStr);
            if (parsed && parsed.nextQuestionId && eligibleRemaining.some(q => q.id === parsed.nextQuestionId)) {
                return parsed;
            }
        } catch (e) {
            console.warn("External AI call failed, falling back to autonomous engine:", e.message);
        }

        return this.determineNextQuestionAutonomous(currentAnswers, eligibleRemaining, currentProfile, currentLanguage, userDemographics, currentHistory, allQuestions);
    }

    determineNextQuestionAutonomous(currentAnswers, eligibleRemaining, currentProfile, currentLanguage, userDemographics = {}, currentHistory = [], allQuestions = []) {
        if (!eligibleRemaining || eligibleRemaining.length === 0) return null;

        const isAr = currentLanguage === "ar";
        const askedCount = Object.keys(currentAnswers).length;

        // Build question lookup map
        const allQuestionsMap = {};
        (allQuestions || []).forEach(q => { allQuestionsMap[q.id] = q; });

        // Analyze recent history categories to prevent repetitive clustering
        const lastQId = currentHistory[currentHistory.length - 1];
        const secondLastQId = currentHistory[currentHistory.length - 2];
        const lastCategory = allQuestionsMap[lastQId]?.category;
        const secondLastCategory = allQuestionsMap[secondLastQId]?.category;

        // Track category distribution count so far
        const categoryCounts = {};
        for (const qId of Object.keys(currentAnswers)) {
            const q = allQuestionsMap[qId];
            if (q && q.category) {
                categoryCounts[q.category] = (categoryCounts[q.category] || 0) + 1;
            }
        }

        // Psychometric Ambiguity & Latent Need Indicators
        const hScores = currentProfile.hartman?.scores || { red: 25, blue: 25, white: 25, yellow: 25 };
        const sortedColors = Object.entries(hScores).sort((a, b) => b[1] - a[1]);
        const top1Color = sortedColors[0]?.[0];
        const top2Color = sortedColors[1]?.[0];
        const hartmanGap = (sortedColors[0]?.[1] || 25) - (sortedColors[1]?.[1] || 25);
        const isHartmanAmbiguous = hartmanGap < 9;

        const attScores = currentProfile.attachment || { secure: 15, anxious: 5, avoidant: 5 };
        const isAttachmentAmbiguous = Math.abs((attScores.anxious || 5) - (attScores.avoidant || 5)) < 4;

        // Score each candidate question using Computerized Adaptive Testing (CAT) principles
        const scoredCandidates = eligibleRemaining.map(q => {
            let score = (q.weight || 1.0) * 5;
            if (q.importance === "high") score += 4;
            if (q.type === "scenario") score += 3;

            // 1. Demographic Signature Relevance
            const isDemographicSpecific = (q.gender_constraint && q.gender_constraint === userDemographics.gender) ||
                                          (q.marital_constraint && q.marital_constraint === userDemographics.maritalStatus);
            if (isDemographicSpecific) {
                if (askedCount >= 3 && askedCount <= 18) {
                    score += 35; // Ideal window for stage-specific personal question
                } else {
                    score += 15;
                }
            }

            // 2. Category Information Gain & Pillar Coverage
            const curCatCount = categoryCounts[q.category] || 0;
            if (curCatCount === 0) {
                score += 26; // High reward for uncovering new relationship pillar
            } else if (curCatCount === 1) {
                score += 14;
            } else if (curCatCount === 2) {
                score += 6;
            } else if (curCatCount >= 4) {
                score -= 8; // Penalty for over-represented category
            }

            // 3. Category Recency / Anti-Fatigue Penalty
            if (q.category === lastCategory) {
                score -= 16;
            }
            if (q.category === secondLastCategory) {
                score -= 8;
            }

            // 4. Hartman Motive Tie Resolution
            if (isHartmanAmbiguous && q.options) {
                const touchesHartman = q.options.some(opt => {
                    const ts = opt.trait_scores || {};
                    return ts[`hartman_${top1Color}`] !== undefined || ts[`hartman_${top2Color}`] !== undefined;
                });
                if (touchesHartman) score += 18;
            }

            // 5. Attachment Pattern Clarification
            if (isAttachmentAmbiguous && (q.trait === "attachment" || (q.options && q.options.some(o => o.trait_scores && (o.trait_scores.attachment_anxious || o.trait_scores.attachment_avoidant))))) {
                score += 14;
            }

            // 6. Consciousness Scale Pacing (q76 - q85)
            const isConsciousnessQ = q.category === "Awareness & Consciousness" || (q.options && q.options.some(o => o.consciousness_delta !== undefined));
            if (isConsciousnessQ) {
                if (askedCount >= 10 && askedCount % 5 === 0) {
                    score += 22; // Well-spaced consciousness probing
                } else if (askedCount < 8) {
                    score -= 8; // Defer till core behavioral styles are established
                }
            }

            return { question: q, score, isDemographicSpecific, curCatCount, isConsciousnessQ };
        });

        // Sort descending by calculated information gain score
        scoredCandidates.sort((a, b) => b.score - a.score);
        const best = scoredCandidates[0];
        const bestQ = best.question;

        // Dynamic, psychologically insightful clinical rationale
        let clinicalReason = "";
        const CATEGORY_AR_NAMES = {
            "Personality": "الشخصية والطباع",
            "Lifestyle": "نمط الحياة واليوميات",
            "Money": "الإدارة المالية والإنفاق",
            "Decision making": "صناعة القرار والشراكة",
            "Conflict": "إدارة الخلافات والتهدئة",
            "Communication": "التواصل والحوار",
            "Children": "التربية ورؤية الأبناء",
            "Religion": "القيم الإيمانية والروحية",
            "Career": "الطموح المهني والعمل",
            "Boundaries": "الحدود والخصوصية",
            "Trust": "الثقة والأمان النفسي",
            "Affection": "المودة ولغات الحب",
            "Emotional intelligence": "الذكاء العاطفي والاستيعاب",
            "Future planning": "التخطيط المستقبلي والرؤية",
            "Marriage": "فلسفة الزواج والارتباط",
            "Awareness & Consciousness": "مستوى الوعي والاتزان"
        };

        if (best.isDemographicSpecific) {
            clinicalReason = isAr
                ? "سؤال استراتيجي مخصص لتقييم الجاهزية والتوافق الحياتي بناءً على خلفيتك الاجتماعية وظروف المرحلة."
                : "Targeted diagnostic scenario evaluating relational readiness and stage-specific life priorities.";
        } else if (isHartmanAmbiguous && (bestQ.category === "Personality" || bestQ.category === "Decision making")) {
            clinicalReason = isAr
                ? "تم استدعاء هذا السؤال لفض الالتباس بين الدوافع الأساسية (Hartman) وتحديد المحرك السلوكي الأول بدقة."
                : "Selected to resolve variance between primary motives and accurately calibrate core behavioral drivers.";
        } else if (best.curCatCount === 0) {
            const catName = isAr ? (CATEGORY_AR_NAMES[bestQ.category] || bestQ.category) : bestQ.category;
            clinicalReason = isAr
                ? `سؤال استكشافي لتغطية ركيزة (${catName}) وتحقيق وزن شامل لكافة أبعاد التوافق الزواجي.`
                : `Exploratory item measuring (${bestQ.category}) to ensure comprehensive multidimensional profile calibration.`;
        } else if (best.isConsciousnessQ) {
            clinicalReason = isAr
                ? "سؤال لوزن مستوى الوعي الذاتي وإدارة الانفعالات (Hawkins Scale) في المواقف الزوجية التفاعلية."
                : "Calibrating emotional consciousness and ego defensiveness (Hawkins Scale) under relational stress.";
        } else {
            clinicalReason = isAr
                ? "سؤال تشخيصي لضبط النمط التواصلي ومستوى المرونة العاطفية في إدارة التفاعلات اليومية."
                : "Diagnostic item measuring communicative pacing and emotional elasticity in daily dynamics.";
        }

        return {
            nextQuestionId: bestQ.id,
            clinicalReason,
            frameworkTarget: bestQ.trait || bestQ.category || "multi-framework"
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

        const prompt = `You are a world-class relationship psychologist analyzing an individual multi-framework psychometric report including David Hawkins' Map of Consciousness and Abraham Hicks' Emotional Guidance Scale.
Language: ${isAr ? 'Arabic' : 'English'}. WRITE ENTIRE ANALYSIS IN ${isAr ? 'ARABIC' : 'ENGLISH'}.
Profile: ${JSON.stringify({
    name: userProfile.owner_name,
    hartman: userProfile.calculated_personality?.hartman,
    disc: userProfile.calculated_personality?.disc,
    birkman: userProfile.calculated_personality?.birkman,
    firo_b: userProfile.calculated_personality?.firo_b,
    gottman_safety: userProfile.calculated_personality?.gottman_safety,
    attachment: userProfile.calculated_personality?.attachment,
    consciousness: userProfile.calculated_personality?.consciousness
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
        const c = traits.consciousness || null;

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

        const posTraits = isAr ? [
            "وعي ذاتي مرتفع وقدرة على فهم الاحتياجات العاطفية",
            "وفاء والتزام عميق في العلاقات القريبة",
            "مرونة في التكيف عند وضوح التوقعات المشتركة",
            "رغبة صادقة في بناء حياة أسرية مستقرة"
        ] : [
            "High introspective emotional self-awareness",
            "Deep loyalty and investment in partner well-being",
            "Adaptable problem-solving when boundaries are clear",
            "Strong foundational commitment to a durable marriage"
        ];

        const grwAreas = isAr ? [
            "التعبير الصريح عن الاحتياجات قبل أن تتحول إلى استياء صامت",
            "التمييز بين النقد الموضوعي للرأي وبين الهجوم على الشخصية",
            "منح النفس استراحة واعية عند الشعور بالإرهاق النفسي"
        ] : [
            "Vocalizing unspoken needs before they turn into silent resentment",
            "Distinguishing between constructive feedback and personal rejection",
            "Taking intentional timeouts when noticing stress derailing triggers"
        ];

        if (c && c.hawkins) {
            const locName = isAr ? c.hawkins.level_ar : c.hawkins.level;
            const hicksState = isAr ? c.hicks?.state_ar : c.hicks?.state;
            if (c.hawkins.is_power) {
                posTraits.push(
                    isAr
                        ? `وعي شعوري متزن في نطاق القوة الإيجابية (${c.hawkins.score} - ${locName}) ومحاذاة مشاعرية نحو (${hicksState || 'التفاؤل'}).`
                        : `Constructive consciousness baseline in the Power realm (${c.hawkins.score} - ${locName}) with emotional alignment toward ${hicksState || 'Optimism'}.`
                );
            } else {
                grwAreas.push(
                    isAr
                        ? `تدريب النفس على الانتقال من ردود فعل الضغط والقسر إلى عتبة الشجاعة وقبول المتغيرات (مستوى هوكينز 200+).`
                        : `Practicing intentional pivots from reactive Force patterns toward the 200 Courage threshold and acceptance.`
                );
            }
        }

        return {
            coreMotiveAnalysis: motiveAnalysis,
            operatingManual: {
                naturalStyle: isAr
                    ? `سلوك يومي يتسم بـ (${AI_TRANSLATIONS.birkman_style[b.usual_style]?.ar || b.usual_style})، مع إيقاع (${d.pace_ar || d.pace}).`
                    : `Outwardly manifests as ${b.usual_style} with a ${d.pace} tempo.`,
                hiddenNeeds: isAr
                    ? `حاجة عميقة لـ (${AI_TRANSLATIONS.birkman_need[b.underlying_need]?.ar || b.underlying_need}) والاعتراف الصادق بالمشاعر.`
                    : `Crucial underlying need for ${b.underlying_need} and consistent reassurance.`,
                stressReaction: isAr
                    ? `عند التعب أو الإجهاد، قد يلجأ إلى (${AI_TRANSLATIONS.birkman_stress[b.stress_trigger]?.ar || b.stress_trigger}).`
                    : `Under prolonged stress, derailer reflex manifests as ${b.stress_trigger}.`,
                howToDeescalate: isAr
                    ? `التحدث بنبرة هادئة ومنح مساحة للتعبير دون مقاطعة أو دفاعية.`
                    : `Lower vocal volume, offer clear emotional reassurance, and avoid defensive counter-attacks.`
            },
            conflictAndSafety: isAr
                ? `مؤشر الأمان العاطفي لديك يبلغ (${g.emotional_safety_index}%)، مما يمنحك ركيزة متوازنة لاحتواء الأزمات بشرط مراقبة ردود الفعل الارتدادية.`
                : `Your Emotional Safety Index sits at ${g.emotional_safety_index}%, indicating a solid foundation for cooperative dispute resolution when emotional flooding is managed.`,
            attachmentProfile: isAr
                ? `نمط الارتباط الغالب هو (${AI_TRANSLATIONS.attachment[ecr.primary]?.ar || ecr.primary}) بدرجة قلق (${ecr.anxiety_score || 25}%) وتجنب (${ecr.avoidance_score || 30}%). تبحث عن ملاذ آمن يجمع بين القرب والاستقرار.`
                : `Attachment orientation reflects a ${ecr.primary} baseline (Anxiety: ${ecr.anxiety_score || 25}%, Avoidance: ${ecr.avoidance_score || 30}%), prioritizing secure intimacy and mutual dependability.`,
            positiveTraits: posTraits,
            growthAreas: grwAreas,
            watchouts: isAr ? [
                `الحذر من ردة فعل التوتر (${AI_TRANSLATIONS.birkman_stress[b.stress_trigger]?.ar || b.stress_trigger}) أثناء المشاحنات الساخنة`,
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

        const prompt = `You are a clinical marital and relationship psychologist AI conducting a deep dyadic compatibility consultation including Hawkins Map of Consciousness & Abraham Hicks Emotional Guidance Scale.
Language: ${isAr ? 'Arabic' : 'English'}. WRITE ENTIRE ANALYSIS IN ${isAr ? 'ARABIC' : 'ENGLISH'}.
Partner A: ${profileA.owner_name}, Hartman: ${profileA.calculated_personality?.hartman?.primary}, DISC: ${profileA.calculated_personality?.disc?.primary}, Need: ${profileA.calculated_personality?.birkman?.underlying_need}, Hawkins LoC: ${profileA.calculated_personality?.consciousness?.hawkins?.score || 350}, Hicks: Lv ${profileA.calculated_personality?.consciousness?.hicks?.level || 5}.
Partner B: ${profileB.owner_name}, Hartman: ${profileB.calculated_personality?.hartman?.primary}, DISC: ${profileB.calculated_personality?.disc?.primary}, Need: ${profileB.calculated_personality?.birkman?.underlying_need}, Hawkins LoC: ${profileB.calculated_personality?.consciousness?.hawkins?.score || 350}, Hicks: Lv ${profileB.calculated_personality?.consciousness?.hicks?.level || 5}.
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
        const nameA = (isAr && profileA.owner_name_ar) ? profileA.owner_name_ar : profileA.owner_name;
        const nameB = (isAr && profileB.owner_name_ar) ? profileB.owner_name_ar : profileB.owner_name;

        const hA_val = (tA.hartman?.primary || "blue").toLowerCase();
        const hB_val = (tB.hartman?.primary || "white").toLowerCase();
        const hA = isAr ? (AI_TRANSLATIONS.hartman[hA_val]?.ar || hA_val) : hA_val.toUpperCase();
        const hB = isAr ? (AI_TRANSLATIONS.hartman[hB_val]?.ar || hB_val) : hB_val.toUpperCase();

        const rawNeedA = tA.birkman?.underlying_need || "empathy";
        const rawNeedB = tB.birkman?.underlying_need || "freedom";
        const needA = isAr ? (AI_TRANSLATIONS.birkman_need[rawNeedA]?.ar || rawNeedA) : rawNeedA;
        const needB = isAr ? (AI_TRANSLATIONS.birkman_need[rawNeedB]?.ar || rawNeedB) : rawNeedB;

        const rawStressA = tA.birkman?.stress_trigger || "demanding";
        const rawStressB = tB.birkman?.stress_trigger || "withdrawing";
        const stressA = isAr ? (AI_TRANSLATIONS.birkman_stress[rawStressA]?.ar || rawStressA) : rawStressA;
        const stressB = isAr ? (AI_TRANSLATIONS.birkman_stress[rawStressB]?.ar || rawStressB) : rawStressB;

        const cA = tA.consciousness;
        const cB = tB.consciousness;
        let consciousnessNote = "";
        if (cA?.hawkins && cB?.hawkins) {
            const delta = Math.abs(cA.hawkins.score - cB.hawkins.score);
            if (cA.hawkins.is_power && cB.hawkins.is_power && delta <= 120) {
                consciousnessNote = isAr
                    ? ` كلاهما يعمل في فضاء الوعي البنّاء (فضاء القوة الروحية البنّاءة > 200) مع رنين ترددي متناغم يسهل التسامي السريع فوق صغائر الخلافات.`
                    : ` Both partners operate within the constructive Power realm (>200) with synergistic vibrational resonance, facilitating swift mutual elevation.`;
            } else if (delta > 100) {
                consciousnessNote = isAr
                    ? ` يشير فارق الوعي (${delta} نقطة هوكينز) إلى أهمية ألا يتقمص الشريك الأكثر هدوءاً دور الواعظ أو الوصي، بل ممارسة الاحتواء المتدرج.`
                    : ` An awareness delta (${delta} Hawkins points) highlights the need for the more grounded partner to avoid preaching, relying instead on non-judgmental holding.`;
            }
        }

        return {
            executiveSummary: (isAr
                ? `تحليل توافق استشاري معمق بين ${nameA} و ${nameB}. تكشف المقارنة النفسية عن تكامل بنيوي واعد يجمع بين دافع (${hA}) لدى ${nameA} ودافع (${hB}) لدى ${nameB}. نجاح هذا المسار يعتمد على احترام فوارق السرعة والإيقاع اليومي، وإشباع الاحتياجات الخفية قبل تصاعد الخلافات.`
                : `In-depth dyadic consultation between ${nameA} and ${nameB}. Psychometric synthesis reveals a powerful complementary union bridging ${nameA}'s ${hA} motive with ${nameB}'s ${hB} energy. Long-term marital flourishing hinges on honoring tempo variations and satisfying unspoken emotional needs.`) + consciousnessNote,

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
