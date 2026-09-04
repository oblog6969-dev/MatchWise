/**
 * MatchWise Lite v2.6.0
 * compatibility.js - Multi-Framework Dyadic Relationship Compatibility Engine
 * Compares two psychological profiles across 12 standard relationship dimensions
 * plus 6 deep multi-framework behavioral interaction dynamics:
 * 1. Hartman Core Motive Synergy (Red, Blue, White, Yellow pairing dynamics)
 * 2. DISC Pace & Focus Equilibrium (Tempo friction, Task vs. People balance)
 * 3. Birkman Cross-Need Satisfaction (Usual style vs. Partner's hidden needs)
 * 4. FIRO-B Reciprocal Compatibility (Control leadership vs. Affection reciprocity)
 * 5. Gottman Dyadic Safety & Repair Receptivity (Four horsemen vs. de-escalation)
 * 6. Attachment Trap & Cycle Analysis (Secure, Anxious, Avoidant cycles)
 */

const CompatibilityEngine = {
    compare(profileA, profileB) {
        const traitsA = profileA.calculated_personality;
        const traitsB = profileB.calculated_personality;
        const ansA = profileA.answers || {};
        const ansB = profileB.answers || {};

        const categoryScores = {};
        const dealBreakers = [];
        const strengths = [];
        const challenges = [];
        const discussionTopics = [];
        const growthOpportunities = [];

        // --- 1. PERSONALITY DYNAMICS (BIG FIVE & MBTI) ---
        const oA = traitsA.big_five;
        const oB = traitsB.big_five;
        const diffOpen = Math.abs(oA.openness - oB.openness);
        const diffConsc = Math.abs(oA.conscientiousness - oB.conscientiousness);
        const diffExtro = Math.abs(oA.extroversion - oB.extroversion);
        const diffAgree = Math.abs(oA.agreeableness - oB.agreeableness);
        const diffNeuro = Math.abs(oA.neuroticism - oB.neuroticism);

        let personalityScore = 100 - (
            (diffOpen * 0.18) +
            (diffConsc * 0.15) +
            (diffExtro * 0.10) +
            (diffAgree * 0.20) +
            (diffNeuro * 0.35)
        );
        categoryScores["Personality"] = Math.round(Math.max(35, Math.min(98, personalityScore)));

        if (diffOpen > 30) {
            challenges.push({
                en: "Diverging Novelty Orientation: One partner seeks frequent new experiences and stimulation, while the other values predictable, grounding routines.",
                ar: "تفاوت في حب التجديد: يسعى أحد الشريكين للتجارب الجديدة المستمرة، بينما يفضل الآخر الروتين المستقر المطمئن."
            });
            discussionTopics.push({
                en: "How to balance structured domestic comfort with exploring mutual hobbies, culture, and travel.",
                ar: "كيفية الموازنة بين الهدوء المنزلي وبين استكشاف هوايات وثقافات وسفر مشترك."
            });
        } else {
            strengths.push({
                en: "Harmonious Experience Alignment: Both partners share a beautifully balanced outlook toward exploring life and ideas.",
                ar: "توجّه متناغم نحو التجارب: يتشارك الشريكان مستوى متقارباً ومريحاً من الانفتاح على أفكار وتجارب الحياة."
            });
        }

        if (oA.neuroticism > 65 && oB.neuroticism > 65) {
            challenges.push({
                en: "Mutual Stress Amplification: Both tend to react strongly to uncertainty or changes, which can escalate minor domestic friction.",
                ar: "تضخيم متبادل للتوتر: يميل كلا الشريكين للتفاعل بقوة مع الضغوط والمفاجآت، مما قد يصعد الخلافات البسيطة."
            });
            growthOpportunities.push({
                en: "Practice an intentional 15-minute emotional cool-down protocol before discussing contentious issues under stress.",
                ar: "التدرب على بروتوكول تهدئة لمدة 15 دقيقة قبل الخوض في أي نقاش شائك تحت الضغط."
            });
        }

        // --- 2. HARTMAN CORE MOTIVE DYNAMICS ---
        const hA = traitsA.hartman?.primary || "blue";
        const hB = traitsB.hartman?.primary || "white";
        const pairKey = [hA, hB].sort().join("_");

        const hartmanSynergies = {
            "blue_red": {
                en: "Power & Intimacy Dynamic: Red drives efficiency and decisive momentum, while Blue brings emotional depth, loyalty, and empathy.",
                ar: "ديناميكية الإنجاز والعمق: يدفع الأحمر نحو الكفاءة والقرارات الحاسمة، بينما يضفي الأزرق دفئاً عاطفياً ووفاءً وعمقاً إنسانياً.",
                challenge_en: "Red's direct bluntness can unintentionally wound Blue's feelings, while Blue's emotional analysis can frustrate Red's desire for speed.",
                challenge_ar: "صراحة الأحمر الحادة قد تجرح مشاعر الأزرق الرقيقة، بينما تحليل الأزرق للمشاعر قد يثير نفاد صبر الأحمر المتعجل."
            },
            "blue_white": {
                en: "Gentle Harmony: Blue provides heartfelt devotion while White provides calm, low-drama acceptance and stability.",
                ar: "تناغم هادئ ورقيق: يمنح الأزرق تفانياً ومحبة فياضة، بينما يوفر الأبيض سكينة وتقبلاً هادئاً يمتص التوتر.",
                challenge_en: "White may avoid voicing needs to preserve peace, leaving Blue feeling uncertain or carrying the emotional conversation alone.",
                challenge_ar: "قد يكتم الأبيض احتياجاته حفظاً للسلام، مما يجعل الأزرق يشعر بالحيرة أو يحمل عبء الحوار العاطفي بمفرده."
            },
            "red_white": {
                en: "Leader & Anchor Dynamic: Red takes the executive initiative while White offers steady, non-combative support and calm balance.",
                ar: "ديناميكية القيادة والملاذ الهادئ: يتولى الأحمر المبادرة العملية، بينما يوفر الأبيض دعماً هادئاً ورصيناً يوازن الاندفاع.",
                challenge_en: "Red risks overpowering White's quiet desires; White risks using passive resistance if feeling unheard.",
                challenge_ar: "قد يطغى حزم الأحمر على رغبات الأبيض الصامتة، مما يدفع الأبيض للمقاومة السلبية عند الشعور بعدم الاستماع إليه."
            },
            "blue_yellow": {
                en: "Depth & Sunshine: Blue provides deep devotion and roots, while Yellow brings laughter, playfulness, and spontaneous joy.",
                ar: "العمق والمرح: يمنح الأزرق استقراراً واحتواءً عميقاً، بينما يضفي الأصفر بهجة وضحكاً وعفوية تنعش الحياة.",
                challenge_en: "Blue may view Yellow as occasionally restless or casual about serious commitments; Yellow may feel weighed down by heavy emotional talks.",
                challenge_ar: "قد يرى الأزرق أن الأصفر يتعامل بتهاون مع الأمور الجادة، بينما قد يشعر الأصفر بالاختناق من النقاشات العاطفية الثقيلة."
            },
            "red_yellow": {
                en: "High-Energy Powerhouse: High drive, high social charisma, and fast movement in accomplishing shared life goals.",
                ar: "طاقة استثنائية وإنجاز: طموح عالٍ وجاذبية اجتماعية وحركة سريعة في تحقيق أهداف الحياة المشتركة.",
                challenge_en: "Both can struggle with slow-paced domestic routine; arguments can become loud and competitive.",
                challenge_ar: "قد يمل كلاهما من الروتين المنزلي البطيء، وقد تتحول النقاشات إلى رغبة سريعة في المنافسة والتبرير."
            },
            "red_red": {
                en: "Dynamic Dual-Leadership: High mutual respect for strength, competence, and high life standards.",
                ar: "قيادة مشتركة قوية: احترام متبادل عالي للقوة والكفاءة والمعايير الحياتية الرفيعة.",
                challenge_en: "High power-struggle risk; clear division of executive domains is essential to avoid head-on collisions.",
                challenge_ar: "احتمال كبير لتصادم الإرادات؛ التقسيم الواضح لمناطق المسؤولية ضروري لتفادي الصدام المباشر."
            },
            "blue_blue": {
                en: "Profound Emotional Intimacy: Rare soul-level connection, unmatched loyalty, and deep mutual consideration.",
                ar: "تواصل وجداني عميق: تفاهم روحي نادر، ووفاء مطلق، ومراعاة فائقة لمشاعر الآخر في كل تفصيلة.",
                challenge_en: "Risk of emotional co-rumination where both amplify hurts or dwell excessively on sensitive remarks.",
                challenge_ar: "خطر التضخيم العاطفي المشترك، حيث قد يقف الشريكان طويلاً عند العتاب وتأويل الكلمات الحساسة."
            },
            "white_white": {
                en: "Zen Oasis: Absolute peacefulness, zero household drama, and low baseline stress.",
                ar: "واحة من السكينة: سلام تام، وخلو المنزل من أي دراما أو صراخ، ومستوى منخفض جداً من التوتر.",
                challenge_en: "Risk of decision paralysis where neither partner takes the initiative on challenging life logistics.",
                challenge_ar: "خطر المماطلة وتأجيل القرارات المصيرية، حيث يتردد كلا الطرفين في المبادرة لحسم الأمور الصعبة."
            },
            "white_yellow": {
                en: "Easygoing Serenity: Low maintenance, cheerful, and adaptable to whatever life brings.",
                ar: "مرونة وانشراح: علاقة خفيفة على النفس، متفائلة، وتتأقلم بسلاسة مع تقلبات الحياة.",
                challenge_en: "Household chores and long-term financial discipline require intentional structure to avoid neglect.",
                challenge_ar: "تحتاج إدارة الالتزامات المالية والمنزلية إلى نظام محدد حتى لا تضيع في خضم العفوية والاسترخاء."
            },
            "yellow_yellow": {
                en: "Joyful Celebration: Unbounded fun, humor, vibrant friendships, and constant adventure.",
                ar: "احتفال دائم بالحياة: مرح بلا حدود، وضحك، وعلاقات اجتماعية حيوية وشغف مستمر بالسفر والتجديد.",
                challenge_en: "Disciplined budgeting and serious emotional processing must be actively scheduled.",
                challenge_ar: "الانضباط المالي الصارم والحوارات العاطفية العميقة تحتاج إلى تخصيص وقت واعٍ لها لتجنب السطحية."
            }
        };

        const currentSynergy = hartmanSynergies[pairKey] || hartmanSynergies["blue_white"];
        strengths.push({ en: currentSynergy.en, ar: currentSynergy.ar });
        challenges.push({ en: currentSynergy.challenge_en, ar: currentSynergy.challenge_ar });

        // --- 3. DISC PACE & TEMPO EQUILIBRIUM ---
        const discA = traitsA.disc || { primary: "S", pace: "Reflective & Deliberate" };
        const discB = traitsB.disc || { primary: "C", pace: "Reflective & Deliberate" };
        const paceDiff = discA.pace !== discB.pace;

        let paceScore = 85;
        if (paceDiff) {
            paceScore = 72;
            challenges.push({
                en: `Tempo & Latency Mismatch: One partner operates with ${discA.pace}, while the other operates with ${discB.pace}. Fast decisions may feel rushed; deliberate processing may feel sluggish.`,
                ar: `تفاوت في إيقاع القرارات: يتصرف أحد الشريكين بإيقاع (${discA.pace_ar || "سريع"}) بينما يفضل الآخر إيقاعاً (${discB.pace_ar || "متأنياً"}). قد يبدو التسرع مزعجاً أو يبدو التأني بطئاً غير مبرر.`
            });
            discussionTopics.push({
                en: "Agree on a '24-Hour Consideration Rule' for major family decisions to balance speed with thoroughness.",
                ar: "الاتفاق على 'قاعدة مهلة الـ 24 ساعة' للقرارات الكبيرة للتوفيق بين الرغبة في الحسم والحاجة للتفكير."
            });
        } else {
            strengths.push({
                en: "Synchronized Daily Tempo: Both partners share compatible operational speeds and decision-making cadences.",
                ar: "تناغم في إيقاع الحياة: يتشارك الشريكان سرعة متقاربة في اتخاذ القرارات وإدارة المهام اليومية دون تذمر."
            });
        }

        // --- 4. BIRKMAN CROSS-NEED & STRESS DYNAMICS ---
        const birkA = traitsA.birkman || { usual_style: "supportive", underlying_need: "empathy", stress_trigger: "withdrawing" };
        const birkB = traitsB.birkman || { usual_style: "supportive", underlying_need: "empathy", stress_trigger: "withdrawing" };

        let crossNeedFriction = false;
        // Check if A's usual triggers B's stress
        if (birkA.usual_style === "assertive" && (birkB.underlying_need === "empathy" || birkB.underlying_need === "freedom")) {
            crossNeedFriction = true;
            challenges.push({
                en: "Cross-Need Vulnerability: Partner A's direct, assertive style can inadvertently trigger Partner B's need for gentleness or autonomy, leading to defensive withdrawal.",
                ar: "حساسية الاحتياج الخفي: أسلوب الطرف الأول المباشر والحازم قد يمس احتياج الطرف الثاني للرفق والمساحة الشخصية، مما يدفعه للانعزال."
            });
            growthOpportunities.push({
                en: "Partner A frames requests with warmth and soft tone, while Partner B explicitly confirms receipt before retreating.",
                ar: "يبدأ الطرف الأول كلامه بنبرة ودية دافئة، بينما يؤكد الطرف الثاني استماعه واهتمامه قبل أن يطلب وقتاً للراحة."
            });
        }
        if (birkB.usual_style === "assertive" && (birkA.underlying_need === "empathy" || birkA.underlying_need === "freedom")) {
            crossNeedFriction = true;
        }

        // --- 5. FIRO-B RECIPROCAL CONTROL & AFFECTION ---
        const firoA = traitsA.firo_b || { control: { expressed: 5, wanted: 5 }, affection: { expressed: 5, wanted: 5 } };
        const firoB = traitsB.firo_b || { control: { expressed: 5, wanted: 5 }, affection: { expressed: 5, wanted: 5 } };

        const ctrlAtoB = Math.abs(firoA.control.expressed - firoB.control.wanted);
        const ctrlBtoA = Math.abs(firoB.control.expressed - firoA.control.wanted);
        const reciprocalCtrlDiff = ctrlAtoB + ctrlBtoA;

        let leadershipScore = 88;
        if (firoA.control.expressed >= 7 && firoB.control.expressed >= 7) {
            leadershipScore = 60;
            challenges.push({
                en: "Dual-Executive Power Dynamic (FIRO-B High Expressed Control): Both partners naturally gravitate toward steering the ship; proactive delegation is essential to avoid conflict.",
                ar: "صراع القيادة المزدوجة: يميل كلا الشريكين لتولي زمام التوجيه وحسم القرارات؛ تفويض مجالات واضحة لكل طرف ضروري لمنع التصادم."
            });
            discussionTopics.push({
                en: "Define distinct primary ownership zones (e.g., finances, hospitality, home aesthetics, children schedules).",
                ar: "تحديد مناطق واضحة للمسؤولية المستقلة (مثل: الشؤون المالية، الضيافة، ديكور المنزل، مواعيد الأبناء)."
            });
        } else if (firoA.control.expressed <= 3 && firoB.control.expressed <= 3) {
            leadershipScore = 65;
            challenges.push({
                en: "Leadership Vacuum: Both partners prefer the other to take charge of major logistical decisions, creating risks of procrastination.",
                ar: "فراغ في المبادرة القيادية: يفضل كلا الشريكين أن يتولى الآخر زمام اللوجستيات الصعبة، مما قد يسبب تأجيلاً مستمراً."
            });
        } else if (reciprocalCtrlDiff <= 4) {
            strengths.push({
                en: "Complementary Decision Flow (FIRO-B): A natural, organic balance where leadership and supportive cooperation alternate smoothly.",
                ar: "تكامل قيادي مريح: توازن فطري سلس يتناوب فيه الشريكان بين تولي القيادة والمساندة المرنة دون نزاع على السلطة."
            });
        }

        // --- 6. GOTTMAN DYADIC SAFETY & REPAIR RECEPTIVITY ---
        const gottA = traitsA.gottman_safety || { repair_receptivity: 75, emotional_safety_index: 80, risks: {} };
        const gottB = traitsB.gottman_safety || { repair_receptivity: 75, emotional_safety_index: 80, risks: {} };
        const avgRepair = Math.round((gottA.repair_receptivity + gottB.repair_receptivity) / 2);
        const avgSafety = Math.round((gottA.emotional_safety_index + gottB.emotional_safety_index) / 2);

        categoryScores["Emotional Safety"] = avgSafety;

        if (avgRepair >= 75) {
            strengths.push({
                en: "High Repair Receptivity (Gottman Sound Relationship House): Both partners readily recognize and accept bids to de-escalate during arguments, preventing chronic toxicity.",
                ar: "استجابة عالية لتهدئة الخلافات: يستجيب كلا الشريكين بسرعة للإشارات اللطيفة وكسر التوتر أثناء النقاش، مما يمنع تراكم السموم النفسية."
            });
        } else if (gottA.risks.stonewalling > 60 && gottB.risks.criticism > 60) {
            challenges.push({
                en: "Criticism-Stonewalling Vulnerability: When one partner expresses complaints sharply, the other shuts down emotionally, creating escalating frustration.",
                ar: "دورة الانتقاد والانغلاق: عندما يعبر أحدهما عن ملاحظاته بحدة، ينغلق الآخر عاطفياً ويلتزم الصمت، مما يضاعف الإحباط بينهما."
            });
            growthOpportunities.push({
                en: "Use gentle startups: Replace 'You always/never' with 'I feel [emotion] about [specific situation] and I need [clear request]'.",
                ar: "استخدام البداية الهادئة: استبدال كلمات 'أنت دائماً/أنت لا' بـ 'أشعر بـ [شعور] تجاه [موقف محدد] وأحتاج منك [طلب واضح]'."
            });
        }

        // --- 7. ATTACHMENT CYCLE DYNAMICS (ECR) ---
        const attA = traitsA.attachment?.primary || "secure";
        const attB = traitsB.attachment?.primary || "secure";

        if ((attA === "anxious" && attB === "avoidant") || (attB === "anxious" && attA === "avoidant")) {
            challenges.push({
                en: "The Classic Anxious-Avoidant Cycle: The anxious partner craves immediate closeness when distressed, which causes the avoidant partner to withdraw for air, triggering panic in the anxious partner.",
                ar: "حلقة القلق والانسحاب الكلاسيكية: يبحث الشريك القلق عن القرب الفوري عند التوتر، فيتراجع الشريك التجنبي طلباً للمساحة، مما يضاعف قلق الأول ويشعل الدورة."
            });
            growthOpportunities.push({
                en: "The avoidant partner gives explicit verbal reassurance ('I love you and need 30 minutes of quiet, then I'll be back'), breaking the cycle of abandonment fears.",
                ar: "يقدم الشريك التجنبي طمأنة صريحة ('أنا أحبك، أحتاج فقط 30 دقيقة هادئة وسأعود لنكمل حديثنا') لكسر مخاوف الهجر لدى الطرف القلق."
            });
        } else if (attA === "secure" && attB === "secure") {
            strengths.push({
                en: "Secure Emotional Harbor: Mutual trust and psychological safety allow both partners to be both deeply intimate and comfortably independent.",
                ar: "ملاذ عاطفي آمن: ثقة متبادلة وأمان نفسي يسمحان للشريكين بالجمع بين القرب الوجداني العميق والاستقلالية الصحية."
            });
        }

        // --- 8. COMMUNICATION & CONFLICT (TKI) ---
        const confA = traitsA.tki_conflict?.primary || traitsA.conflict?.primary || "collaborating";
        const confB = traitsB.tki_conflict?.primary || traitsB.conflict?.primary || "collaborating";
        let conflictScore = 80;

        if (confA === "collaborating" && confB === "collaborating") {
            conflictScore = 98;
            strengths.push({
                en: "Collaborative Problem Solvers (TKI): Problems are approached as a united team against the obstacle, rather than adversaries against each other.",
                ar: "حل تعاوني للمشكلات: مواجهة الخلافات كفريق واحد ضد العقبة، وليس كخصمين ضد بعضهما البعض."
            });
        } else if (confA === "competing" && confB === "competing") {
            conflictScore = 50;
            challenges.push({
                en: "Win-Lose Competitive Dynamic (TKI): High risk of debating to 'win the argument' rather than preserving emotional connection.",
                ar: "رغبة في الفوز بالجدال: ميل لإثبات صواب الرأي وإفحام الطرف الآخر على حساب الحفاظ على الدفء العاطفي."
            });
        } else if ((confA === "competing" && confB === "avoiding") || (confB === "competing" && confA === "avoiding")) {
            conflictScore = 60;
        }
        categoryScores["Conflict Dynamics"] = conflictScore;

        // --- 9. SCHWARTZ VALUES & EXISTENTIAL PRIORITIES ---
        const schA = traitsA.schwartz_values?.top_values || [];
        const schB = traitsB.schwartz_values?.top_values || [];
        const sharedValues = schA.filter(v => schB.includes(v));

        let valueScore = 75;
        if (sharedValues.length >= 2) {
            valueScore = 95;
            strengths.push({
                en: `Deep Worldview Consensus (Schwartz Values): Shared core life priorities in ${sharedValues.join(" & ")}, ensuring long-term existential alignment.`,
                ar: `توافق وجودي عميق في القيم: تشارك قيم الحياة الأساسية في (${sharedValues.join(" و ")} مما يضمن وحدة المسار والهدف المستقبلي.`
            });
        } else if (schA.includes("tradition") && schB.includes("self_direction")) {
            valueScore = 65;
            challenges.push({
                en: "Tradition vs. Individuality Tension: Navigating societal/familial customs versus personal self-determination will require explicit mutual agreements.",
                ar: "تجاذب بين التقاليد والاستقلالية: الموازنة بين العادات والواجبات العائلية وبين الاستقلالية الشخصية تتطلب اتفاقات واضحة مسبقة."
            });
        }
        categoryScores["Core Values"] = valueScore;

        // --- 10. MONEY, EXPENSES & HOUSING (q11, q12, q23, etc.) ---
        let moneyScore = 85;
        if (ansA["q11"] && ansB["q11"]) {
            if (ansA["q11"] !== ansB["q11"]) {
                moneyScore -= 20;
                challenges.push({
                    en: "Divergent Financial Models: Discrepancy between shared dual-income pooling vs traditional male sole provider duties.",
                    ar: "تفاوت في نموذج تقاسم المصاريف: اختلاف بين تقاسم الأعباء المالية مناصفة ونموذج النفقة التقليدية الكاملة."
                });
                discussionTopics.push({
                    en: "Draft a clear monthly budget clarifying exact responsibilities for housing, groceries, travel, and personal savings.",
                    ar: "صياغة ميزانية شهرية واضحة تحدد مسؤوليات السكن والمقاضي ومصاريف السفر والادخار الخاص."
                });
            } else {
                strengths.push({
                    en: "Synchronized Financial Philosophy: Complete agreement on household expense division and contribution expectations.",
                    ar: "فلسفة مالية متطابقة: اتفاق تام وواضح على توزيع النفقات والمساهمة في بناء المستقبل."
                });
            }
        }
        categoryScores["Finances"] = Math.max(40, moneyScore);

        // Housing & In-Law Boundaries (q23, q49)
        let housingScore = 90;
        if (ansA["q23"] && ansB["q23"] && ansA["q23"] !== ansB["q23"]) {
            housingScore -= 30;
            dealBreakers.push({
                en: "Conflicting Housing Arrangements: One partner insists on an independent private residence, while the other anticipates living in or adjacent to the family home.",
                ar: "تعارض في طبيعة السكن: يشترط أحد الطرفين سكناً مستقلاً تماماً، بينما يفضل أو يتوقع الآخر السكن مع أو بجوار الأهل."
            });
        }
        categoryScores["Housing & Boundaries"] = Math.max(30, housingScore);

        // Children & Parenting (q31)
        let childrenScore = 90;
        if (ansA["q31"] && ansB["q31"] && ansA["q31"] !== ansB["q31"]) {
            childrenScore -= 25;
            challenges.push({
                en: "Divergent Family Timeline: Different expectations regarding when to have children or optimal family size.",
                ar: "تفاوت في توقيت الإنجاب: تباين في الرغبة حول توقيت إنجاب الأطفال أو حجم الأسرة المستقبلي."
            });
        }
        categoryScores["Children & Parenting"] = Math.max(40, childrenScore);

        // Religious & Cultural Alignment
        let relScore = 90;
        if (ansA["q37"] && ansB["q37"] && ansA["q37"] !== ansB["q37"]) {
            relScore -= 20;
        }
        categoryScores["Cultural & Spiritual"] = Math.max(40, relScore);

        // Aesthetics & Presentation (q66 - q69)
        let aesScore = 100;
        const aesA = traitsA.aesthetic_profile || {};
        const aesB = traitsB.aesthetic_profile || {};
        if (aesA.self_presentation && aesB.expect_presentation && aesA.self_presentation !== aesB.expect_presentation) aesScore -= 20;
        if (aesB.self_presentation && aesA.expect_presentation && aesB.self_presentation !== aesA.expect_presentation) aesScore -= 20;
        categoryScores["Aesthetic Alignment"] = Math.max(40, aesScore);

        // --- 11. CONSCIOUSNESS & VIBRATIONAL RESONANCE (Hawkins & Hicks) ---
        const cA = traitsA.consciousness || { hawkins: { score: 310, is_above_200: true }, hicks: { level: 6 } };
        const cB = traitsB.consciousness || { hawkins: { score: 310, is_above_200: true }, hicks: { level: 6 } };

        const locA = cA.hawkins.score;
        const locB = cB.hawkins.score;
        const locDiff = Math.abs(locA - locB);

        const hicksA = cA.hicks.level;
        const hicksB = cB.hicks.level;
        const hicksDiff = Math.abs(hicksA - hicksB);

        // Calculate Resonance score
        let resonanceScore = 100 - (locDiff * 0.15) - (hicksDiff * 2.5);
        if (cA.hawkins.is_above_200 && cB.hawkins.is_above_200) {
            resonanceScore += 10;
        } else if (!cA.hawkins.is_above_200 && !cB.hawkins.is_above_200) {
            resonanceScore -= 15;
        }
        resonanceScore = Math.max(35, Math.min(98, Math.round(resonanceScore)));
        categoryScores["Awareness & Consciousness"] = resonanceScore;

        // Dyadic interaction dynamics analysis
        let consciousnessArchetype = "";
        let consciousnessSummaryEn = "";
        let consciousnessSummaryAr = "";

        if (cA.hawkins.is_above_200 && cB.hawkins.is_above_200) {
            consciousnessArchetype = "Mutual Power Harmony";
            consciousnessSummaryEn = "Both partners operate predominantly above the critical 200 Courage threshold in the domain of Power. Disagreements are met with emotional ownership, non-defensive curiosity, and rapid de-escalation.";
            consciousnessSummaryAr = "يعمل كلا الشريكين فوق عتبة الشجاعة (200) في نطاق القوة الروحية البنّاءة. تُقابل الخلافات بمسؤولية ذاتية، وفضول غير دفاعي، وقدرة سريعة على كسر حدة التوتر وإعادة الهدوء.";
            strengths.push({
                en: "Conscious Emotional Attunement: Shared high-vibrational baseline minimizes toxic resentment and fosters mutual psychological sovereignty.",
                ar: "تناغم شعوري واعٍ: أرضية مشتركة فوق عتبة الشجاعة والمسؤولية تحمي العلاقة من تراكم الأحقاد وتعزز الاحترام والنضج."
            });
        } else if (cA.hawkins.is_above_200 !== cB.hawkins.is_above_200) {
            consciousnessArchetype = "Gravitational Consciousness Asymmetry";
            const higherPerson = locA > locB ? profileA.owner_name : profileB.owner_name;
            const lowerPerson = locA > locB ? profileB.owner_name : profileA.owner_name;
            consciousnessSummaryEn = `${higherPerson} operates from constructive acceptance, while ${lowerPerson} tends to react from contracted self-protection (Force). The higher-vibration partner risks emotional exhaustion if they slip into a savior/parental dynamic.`;
            consciousnessSummaryAr = `يعمل (${higherPerson}) من منطلق القبول والمسؤولية، بينما يميل (${lowerPerson}) لردود أفعال دفاعية منكمشة. قد يشعر الشريك الأكثر وعياً بالإرهاق إذا تحول لدور المنقذ أو الموجه الدائم.`;
            challenges.push({
                en: "Vibrational Asymmetry: Bridging the gap between emotional ownership and defensive blame requires clear boundary preservation.",
                ar: "تفاوت في مستوى الوعي الانفعالي: الموازنة بين تحمل المسؤولية وبين الدفاعية التلقائية تتطلب صبراً وحفظاً للحدود النفسية."
            });
            growthOpportunities.push({
                en: "The higher-awareness partner must maintain loving detachment without patronizing, while the other practices the 'pause before reaction' protocol.",
                ar: "تدرب الشريك الأكثر هدوءاً على الاحتواء دون استعلاء أو دور المنقذ، وتدرب الطرف الآخر على التوقف لثوانٍ قبل الرد الانفعالي."
            });
        } else {
            consciousnessArchetype = "Dual Force Contraction Trap";
            consciousnessSummaryEn = "Both partners frequently operate below the 200 threshold under stress (Pride, Anger, or Fear). Disagreements risk deteriorating into competing defensiveness or mutual emotional abandonment.";
            consciousnessSummaryAr = "يميل كلا الشريكين إلى العمل تحت عتبة 200 أثناء الضغط (الكبرياء، الغضب، أو الخوف). هناك خطر تصاعد الخلافات إلى منافسة في الدفاعية أو انسحاب عاطفي متبادل.";
            challenges.push({
                en: "Defensive Escalation Risk: Both partners tend to project blame outward, turning minor domestic friction into ego-defense battles.",
                ar: "احتمالية تصعيد الدفاعية: ميل الشريكين لإلقاء اللوم خارجياً يحول الخلافات البسيطة إلى معارك لإثبات الصواب والدفاع عن النفس."
            });
            growthOpportunities.push({
                en: "Adopt the 'One-Voice Pause' agreement: the moment either feels defensive, both stop talking and state their vulnerability rather than their accusation.",
                ar: "تبني اتفاقية 'وقف التصعيد الفوري': بمجرد شعور أي طرف بالدفاعية، يتوقف كلاهما للتعبير عن المشاعر بدلاً من توجيه الاتهامات."
            });
        }

        // --- OVERALL COMPATIBILITY INDEX CALCULATION ---
        const scoresArr = Object.values(categoryScores);
        let avg = scoresArr.reduce((a, b) => a + b, 0) / scoresArr.length;

        if (dealBreakers.length > 0) {
            avg -= (dealBreakers.length * 12);
        }

        const overallCompatibilityIndex = Math.round(Math.max(30, Math.min(98, avg)));

        // Dynamic Recommendations
        const recommendations = [];
        if (overallCompatibilityIndex >= 85) {
            recommendations.push({
                en: "Exceptional Multi-System Synergy: Maintain this extraordinary harmony through continuous emotional attunement and intentional dialogue.",
                ar: "انسجام وتوافق استثنائي: حافظا على هذا التوافق الرائع من خلال التقدير اليومي المستمر وتجديد الحوار الودود."
            });
        } else if (overallCompatibilityIndex >= 70) {
            recommendations.push({
                en: "Strong Core Foundation: Focus on intentional conversations around the specific pace, leadership, and emotional de-escalation scripts identified.",
                ar: "قاعدة توافق متينة: ركزا على الحوار الواعي حول النقاط المحددة في الإيقاع اليومي، وتقاسم القرارات، وبروتوكولات التهدئة أثناء الخلاف."
            });
        } else {
            recommendations.push({
                en: "Significant Perspective Variances: Bridging core differences in pace, conflict, and expectations will require deep empathy, clear agreements, and patient adaptation.",
                ar: "فوارق واضحة في التوقعات والإيقاع: سيتطلب بناء علاقة متينة صراحة عميقة، واتفاقات مكتوبة حول المسؤوليات والتهدئة والتنازلات المشتركة."
            });
        }

        const averageConfidence = Math.round(
            ((profileA.assessment_confidence || 85) + (profileB.assessment_confidence || 85)) / 2
        );

        // Fair-Fighting Rules tailored for this specific couple
        const fairFightingRules = [
            {
                en: "The 20-Minute Cool-Down: If either partner signals emotional flooding or voice rises, pause immediately without abandonment.",
                ar: "قاعدة الـ 20 دقيقة للتهدئة: عند شعور أي طرف بالضغط أو ارتفاع نبرة الصوت، يتم إيقاف النقاش فوراً مع التأكيد على العودة له بهدوء."
            },
            {
                en: "Issue Separation: Address only one topic per conversation. Never bring up past grievances or unrelated family matters.",
                ar: "حصر النقاش في موضوع واحد: مناقشة مسألة واحدة محددة دون فتح ملفات الماضي أو إقحام مواقف عائلية سابقة."
            },
            {
                en: "Soft Startup: Begin difficult discussions with appreciation and personal feeling rather than character evaluation.",
                ar: "البداية اللطيفة: بدء الحوارات الحساسة بعبارات مودة وتقدير والتعبير عن المشاعر الشخصية بدلاً من تقييم شخصية الشريك."
            }
        ];

        return {
            overall_index: overallCompatibilityIndex,
            category_scores: categoryScores,
            strengths: strengths.slice(0, 6),
            challenges: challenges.slice(0, 6),
            discussion_topics: discussionTopics.slice(0, 5),
            deal_breakers: dealBreakers,
            growth_opportunities: growthOpportunities.slice(0, 4),
            recommendations: recommendations,
            report_confidence: averageConfidence,

            // Multi-Framework Dyadic Payload
            multi_framework_dynamics: {
                hartman_pair: {
                    type_a: hA,
                    type_b: hB,
                    summary: currentSynergy
                },
                disc_tempo: {
                    pace_a: discA.pace,
                    pace_b: discB.pace,
                    is_mismatch: paceDiff,
                    score: paceScore
                },
                birkman_needs: {
                    has_friction: crossNeedFriction,
                    need_a: birkA.underlying_need,
                    need_b: birkB.underlying_need,
                    stress_a: birkA.stress_trigger,
                    stress_b: birkB.stress_trigger
                },
                firo_leadership: {
                    score: leadershipScore,
                    reciprocal_diff: reciprocalCtrlDiff
                },
                gottman_safety: {
                    safety_score: avgSafety,
                    repair_receptivity: avgRepair
                },
                attachment_cycle: {
                    style_a: attA,
                    style_b: attB,
                    is_anxious_avoidant_trap: (attA === "anxious" && attB === "avoidant") || (attB === "anxious" && attA === "avoidant")
                },
                consciousness_spectrum: {
                    score: resonanceScore,
                    archetype: consciousnessArchetype,
                    loc_a: locA,
                    loc_b: locB,
                    loc_diff: locDiff,
                    hicks_a: hicksA,
                    hicks_b: hicksB,
                    hicks_diff: hicksDiff,
                    summary_en: consciousnessSummaryEn,
                    summary_ar: consciousnessSummaryAr
                },
                fair_fighting_rules: fairFightingRules
            }
        };
    }
};

// Export to global window namespace & CommonJS for testing
if (typeof window !== "undefined") {
    window.CompatibilityEngine = CompatibilityEngine;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports = CompatibilityEngine;
}
