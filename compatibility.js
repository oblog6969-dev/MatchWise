/**
 * MatchWise Lite v1.0
 * compatibility.js - Premium Compatibility Assessment Engine
 * Compares two profiles using structured psychological and lifestyle modeling.
 * Computes scores based on similarity (values, children, religion),
 * complementarity (extroversion, communication, attachment styles),
 * triggers deal-breakers, and formats detailed strengths/challenges/topics to discuss.
 */

const CompatibilityEngine = {
    compare(profileA, profileB) {
        const traitsA = profileA.calculated_personality;
        const traitsB = profileB.calculated_personality;

        const categoryScores = {};
        const dealBreakers = [];
        const strengths = [];
        const challenges = [];
        const discussionTopics = [];
        const growthOpportunities = [];

        // --- 1. PERSONALITY DYNAMICS DEDUCTION ---
        // Big Five Similarity / Balance
        const bigFiveDiffs = {
            openness: Math.abs(traitsA.big_five.openness - traitsB.big_five.openness),
            conscientiousness: Math.abs(traitsA.big_five.conscientiousness - traitsB.big_five.conscientiousness),
            extroversion: Math.abs(traitsA.big_five.extroversion - traitsB.big_five.extroversion),
            agreeableness: Math.abs(traitsA.big_five.agreeableness - traitsB.big_five.agreeableness),
            neuroticism: Math.abs(traitsA.big_five.neuroticism - traitsB.big_five.neuroticism)
        };

        // Big Five compatibility: High agreeableness on both is great. High neuroticism on both is challenging.
        // Big difference in openness is a source of lifestyle drift.
        let personalityScore = 100 - (
            (bigFiveDiffs.openness * 0.2) +
            (bigFiveDiffs.conscientiousness * 0.15) +
            (bigFiveDiffs.extroversion * 0.1) + // Extroversion difference can be complementary
            (bigFiveDiffs.agreeableness * 0.2) +
            (bigFiveDiffs.neuroticism * 0.35)
        );
        categoryScores["Personality"] = Math.round(Math.max(30, Math.min(100, personalityScore)));

        if (bigFiveDiffs.openness > 35) {
            challenges.push({
                en: "Diverging Intellectual and Artistic Outlets: One partner seeks constant novelty while the other values stable routines.",
                ar: "تفاوت المخارج الفكرية والفنية: يسعى أحد الشريكين إلى التجدد المستمر بينما يقدّر الآخر الروتين المستقر."
            });
            discussionTopics.push({
                en: "How to balance structured comfort with the pursuit of new hobbies and experiences.",
                ar: "كيفية تحقيق التوازن بين الراحة المنظمة والسعي وراء هوايات وتجارب جديدة."
            });
        } else {
            strengths.push({
                en: "Harmonious Experience Orientation: Both partners share a similar level of openness to life's adventures and thoughts.",
                ar: "توجّه متناغم نحو التجارب: يتشارك الشريكان مستوى مماثلاً من الانفتاح على مغامرات الحياة وأفكارها."
            });
        }

        if (traitsA.big_five.neuroticism > 65 && traitsB.big_five.neuroticism > 65) {
            challenges.push({
                en: "Shared Stress Amplification: Both partners tend to react strongly to uncertainty, potentially escalating tension.",
                ar: "تضخيم متبادل للتوتر: يميل كلا الشريكين إلى التفاعل بقوة مع حالات عدم اليقين، مما قد يؤدي إلى تصاعد التوتر."
            });
            growthOpportunities.push({
                en: "Develop an agreed external circuit-breaker, like professional coaching, when both feel overwhelmed.",
                ar: "تطوير أسلوب متبادل متفق عليه لتهدئة الأوضاع، مثل التوجيه المهني، عندما يشعر كلا الطرفين بالإرهاق."
            });
        }

        // --- 2. COMMUNICATION STYLE ASSESSMENT ---
        const commA = traitsA.communication.primary;
        const commB = traitsB.communication.primary;

        let commScore = 80;
        if (commA === "assertive" && commB === "assertive") {
            commScore = 95;
            strengths.push({
                en: "Direct & Healthy Dialogue: Both communicate transparently and respectfully without passive mind-games.",
                ar: "حوار مباشر وصحي: يتواصل كلا الشريكين بشفافية واحترام متبادل دون ألعاب ذهنية سلبية."
            });
        } else if (commA === "passive_aggressive" || commB === "passive_aggressive") {
            commScore = 55;
            challenges.push({
                en: "Indirect Communication Triggers: Subtle resentment or sarcasm could stall emotional clarity.",
                ar: "محفزات التواصل غير المباشر: الاستياء الخفي أو السخرية قد يعطلان الوضوح العاطفي بينكما."
            });
            discussionTopics.push({
                en: "Set a rule of sharing frustrations within 24 hours rather than letting them accumulate.",
                ar: "ضعا قاعدة لمشاركة مشاعر الإحباط خلال 24 ساعة بدلاً من تركها تتراكم."
            });
        } else if ((commA === "passive" || commA === "reserved") && (commB === "passive" || commB === "reserved")) {
            commScore = 60;
            challenges.push({
                en: "Unexpressed Frustrations: A tendency for both to bury negative feelings to preserve superficial peace.",
                ar: "مشاعر إحباط غير معلنة: ميل كلا الطرفين إلى دفن المشاعر السلبية للحفاظ على سلام سطحي."
            });
            growthOpportunities.push({
                en: "Initiate a scheduled 'Heart-to-Heart Check-in' weekly to proactively ask for thoughts.",
                ar: "احرصا على إجراء 'جلسة مصارحة' أسبوعية مجدولة لطرح الأفكار والمشاعر بانتظام."
            });
        }
        categoryScores["Communication"] = commScore;

        // --- 3. CONFLICT SYSTEM ---
        const confA = traitsA.conflict.primary;
        const confB = traitsB.conflict.primary;
        let conflictScore = 75;

        if (confA === "collaborating" && confB === "collaborating") {
            conflictScore = 98;
            strengths.push({
                en: "Collaborative Problem Solvers: Problems are faced as a team against the issue, not against each other.",
                ar: "حل المشكلات بشكل تعاوني: تُواجَه المشكلات كفريق ضد العقبة، وليس ضد بعضكما البعض."
            });
        } else if (confA === "competing" && confB === "competing") {
            conflictScore = 45;
            challenges.push({
                en: "Ego and Power Struggles: Arguments might turn into battlefields where winning is prioritized over resolving.",
                ar: "صراعات الأنا والقوة: قد تتحول النقاشات إلى ساحات معارك تُعطى فيها الأولوية للفوز على حساب الحل."
            });
            discussionTopics.push({
                en: "Agree to use 'I feel' statements and a structural timeout system when voices rise.",
                ar: "اتفقا على استخدام عبارات تبدأ بـ 'أشعر' ونظام مهلة مؤقتة عندما ترتفع الأصوات."
            });
        } else if ((confA === "competing" && confB === "avoiding") || (confB === "competing" && confA === "avoiding")) {
            conflictScore = 55;
            challenges.push({
                en: "Pursuer-Distancer Dynamic: One partner pursues resolution forcefully while the other withdraws defensively.",
                ar: "ديناميكية الملاحِق والمتهرّب: يسعى أحد الشريكين بقوة إلى الحل بينما ينسحب الآخر دفاعياً."
            });
            growthOpportunities.push({
                en: "The pursuer practices giving space, while the distancer commits to returning to the topic within 12 hours.",
                ar: "يتدرب الشريك الملاحِق على إعطاء مساحة، بينما يلتزم الشريك المنسحب بالعودة إلى الموضوع خلال 12 ساعة."
            });
        }
        categoryScores["Conflict"] = conflictScore;

        // --- 4. MONEY VALUES ---
        // Compare financial models: joint, hybrid, separate
        const ansA = profileA.answers;
        const ansB = profileB.answers;

        let moneyScore = 80;
        const modelA = ansA["q16"];
        const modelB = ansB["q16"];

        if (modelA && modelB) {
            if (modelA !== modelB) {
                moneyScore -= 25;
                dealBreakers.push({
                    en: "Divergent Financial Architecture: Partners have conflicting expectations of account structures (Joint vs. Separate).",
                    ar: "هيكلية مالية متباعدة: لدى الشريكين توقعات متضاربة حول هيكلة الحسابات (مشتركة مقابل منفصلة)."
                });
            } else {
                strengths.push({
                    en: "Aligned Financial Philosophy: Agreement on how to structure shared and personal bank accounts.",
                    ar: "فلسفة مالية متوافقة: اتفاق تام على كيفية هيكلة الحسابات المصرفية المشتركة والشخصية."
                });
            }
        }

        // Saver vs Spender
        const saverA = traitsA.values_and_lifestyle?.money_saver || 50;
        const saverB = traitsB.values_and_lifestyle?.money_saver || 50;
        const saverDiff = Math.abs(saverA - saverB);
        if (saverDiff > 30) {
            moneyScore -= 15;
            challenges.push({
                en: "Saver vs. Spender Friction: One prioritizes long-term investments, while the other values immediate lifestyle experience.",
                ar: "احتجاج المدّخر والمنفِق: يعطي أحدكما الأولوية للاستثمار طويل الأجل، بينما يقدّر الآخر متعة الإنفاق الآني."
            });
            discussionTopics.push({
                en: "Create a strict budget containing both a dedicated savings target and guilt-free personal spending allowances.",
                ar: "إنشاء ميزانية صارمة تحتوي على هدف ادخار مخصص ومصروف شخصي حر لكل طرف."
            });
        }
        categoryScores["Money"] = Math.round(Math.max(30, moneyScore));

        // --- 5. LIFESTYLE MAPPING ---
        let lifestyleScore = 85;
        const neatA = traitsA.values_and_lifestyle?.lifestyle_neatness || 50;
        const neatB = traitsB.values_and_lifestyle?.lifestyle_neatness || 50;
        if (Math.abs(neatA - neatB) > 30) {
            lifestyleScore -= 15;
            challenges.push({
                en: "Cleanliness and Order Discrepancy: Significant difference in domestic tidiness expectations.",
                ar: "تفاوت معايير النظافة والترتيب: اختلاف كبير في توقعات الترتيب المنزلي والتمسك بالنظام."
            });
        }

        const socialA = traitsA.values_and_lifestyle?.social_frequency || 50;
        const socialB = traitsB.values_and_lifestyle?.social_frequency || 50;
        if (Math.abs(socialA - socialB) > 30) {
            lifestyleScore -= 10;
            discussionTopics.push({
                en: "How many days per week to host guests, ensuring quiet private time for the introverted partner.",
                ar: "تحديد عدد أيام استضافة الزوار أسبوعياً، بما يضمن وقتاً هادئاً وخاصاً للشريك الأكثر انطوائية."
            });
        }
        categoryScores["Lifestyle"] = Math.round(Math.max(40, lifestyleScore));

        // --- 6. FAMILY & BOUNDARIES ---
        let familyScore = 80;
        const famBoundA = ansA["q30"];
        const famBoundB = ansB["q30"];
        if (famBoundA && famBoundB && famBoundA !== famBoundB) {
            familyScore -= 20;
            challenges.push({
                en: "In-law Boundary Disparities: Diverging views on allowing extended family members to influence household decisions.",
                ar: "تفاوت حدود العائلتين: وجهات نظر متباعدة بشأن السماح لأفراد العائلة الممتدة بالتأثير على قرارات المنزل."
            });
            discussionTopics.push({
                en: "Formulate concrete limits regarding parental involvement in marital arguments.",
                ar: "صياغة حدود ملموسة فيما يتعلق بتدخل الوالدين في الخلافات الزوجية."
            });
        }
        categoryScores["Family"] = Math.round(Math.max(30, familyScore));

        // --- 7. CHILDREN EXPECTATIONS (Potential Deal-breaker) ---
        let childrenScore = 90;
        const desireA = ansA["q31"];
        const desireB = ansB["q31"];

        if (desireA && desireB) {
            // opt1: Yes, opt2: No, opt3: Unsure
            if ((desireA === "opt1" && desireB === "opt2") || (desireA === "opt2" && desireB === "opt1")) {
                childrenScore = 30;
                dealBreakers.push({
                    en: "Incompatible Family Vows: One partner absolutely demands children, while the other does not want any.",
                    ar: "رغبات عائلية غير متوافقة: يطلب أحد الشريكين إنجاب الأطفال كلياً، بينما لا يرغب الآخر في ذلك مطلقاً."
                });
            } else if (desireA === "opt3" || desireB === "opt3") {
                childrenScore = 70;
                discussionTopics.push({
                    en: "A timeline to decide on parenthood expectations to avoid unspoken resentment later.",
                    ar: "جدول زمني لحسم التوقعات بشأن الأبوة والأمومة لتجنب الاستياء الصامت لاحقاً."
                });
            } else if (desireA === "opt1" && desireB === "opt1") {
                strengths.push({
                    en: "Shared Parenting Goals: Complete alignment on the beautiful intention of raising a family.",
                    ar: "أهداف تربوية مشتركة: توافق تام على الرغبة الجميلة في بناء عائلة وتربية أطفال."
                });
            }
        }
        categoryScores["Children"] = childrenScore;

        // --- 8. RELIGION & VALUES (Potential Deal-breaker) ---
        let religionScore = 85;
        const relImpA = traitsA.values_and_lifestyle?.religion_importance || 50;
        const relImpB = traitsB.values_and_lifestyle?.religion_importance || 50;
        const orthodoxyA = ansA["q34_follow"];
        const orthodoxyB = ansB["q34_follow"];

        if (Math.abs(relImpA - relImpB) > 35) {
            religionScore -= 20;
            challenges.push({
                en: "Varying Spiritual Priorities: One partner lives with religious observance as a daily compass, while the other is secular or less observant.",
                ar: "أولويات روحية متفاوتة: يعيش أحد الشريكين بامتثال ديني كبوصلة يومية، بينما يعيش الآخر بنمط علماني أو أقل تدبيراً."
            });
            discussionTopics.push({
                en: "What religious traditions will be taught to children, and how will daily rituals be respected.",
                ar: "ما هي التقاليد الدينية التي ستُعلّم للأطفال، وكيف سيتم احترام الطقوس اليومية للطرفين."
            });
        }

        // Deal-breaker: if religion is central to one and requires matching, but they differ
        const worldviewA = ansA["q35"];
        const worldviewB = ansB["q35"];
        if (worldviewA && worldviewB && worldviewA !== worldviewB && (relImpA > 70 || relImpB > 70)) {
            religionScore -= 15;
            dealBreakers.push({
                en: "Worldview and Theological Divergence: Significant differences in core beliefs when religion is highly valued.",
                ar: "تباعد الرؤية العقائدية والكونية: اختلافات جوهرية في المعتقدات الأساسية عندما يكون للدين قيمة عالية لدى أحد الطرفين."
            });
        }
        categoryScores["Religion"] = Math.round(Math.max(30, religionScore));

        // --- 9. EMOTIONAL NEEDS & LOVE LANGUAGES ---
        let emotionalScore = 80;
        const loveA = traitsA.love_languages.primary;
        const loveB = traitsB.love_languages.primary;
        if (loveA === loveB) {
            emotionalScore = 95;
            strengths.push({
                en: `Identical Love Languages: Both partners express and receive love primarily through ${loveA.replace("_", " ")}, creating immediate resonance.`,
                ar: `لغة حب متطابقة: يعبر كلا الشريكين عن الحب ويستقبلانه أساساً عبر نفس اللغة، مما يخلق انسجاماً فورياً.`
            });
        } else {
            discussionTopics.push({
                en: `Bridging Love Languages: Partner A feels loved via ${loveA.replace("_", " ")}; Partner B feels loved via ${loveB.replace("_", " ")}.`,
                ar: `سد فجوة لغات الحب: الطرف (أ) يشعر بالحب عبر لغة أخرى عن الطرف (ب). يحتاج كل منكما لتعلم لغة شريكه.`
            });
        }

        // Attachment styles matching (Secure + Secure = wonderful, Anxious + Avoidant = Classic challenging spiral)
        const attachA = traitsA.attachment.primary;
        const attachB = traitsB.attachment.primary;
        if (attachA === "secure" && attachB === "secure") {
            emotionalScore += 5;
            strengths.push({
                en: "Double-Secure Emotional Foundation: High levels of mutual trust and safe interdependence.",
                ar: "قاعدة عاطفية آمنة ومزدوجة: مستويات عالية من الثقة المتبادلة والاعتماد الآمن المشترك."
            });
        } else if ((attachA === "anxious" && attachB === "avoidant") || (attachB === "anxious" && attachA === "avoidant")) {
            emotionalScore -= 20;
            challenges.push({
                en: "Anxious-Avoidant Trap: One pursues reassurance when anxious, triggering the other's avoidance and space-seeking.",
                ar: "فخ القلق والتجنب: يطلب أحدكما الطمأنينة عند القلق، مما يحفز الآخر على التجنب والانسحاب."
            });
            growthOpportunities.push({
                en: "Learn to recognize the spiral early. Practice stating: 'I need reassurance' versus 'I need 20 minutes to process.'",
                ar: "تعلما تمييز هذه الدوامة مبكراً. تمرنا على قول: 'أحتاج إلى طمأنينة' مقابل 'أحتاج إلى 20 دقيقة لمعالجة مشاعري'."
            });
        }
        categoryScores["Emotional Needs"] = Math.round(Math.max(40, Math.min(100, emotionalScore)));

        // --- 10. MARRIAGE & FUTURE PLANNING ---
        let marriageScore = 85;
        const rolesA = ansA["q24"];
        const rolesB = ansB["q24"];
        if (rolesA && rolesB && rolesA !== rolesB) {
            marriageScore -= 20;
            dealBreakers.push({
                en: "Diverging Marital Roles Paradigm: One expects a traditional homemaker/provider setup, the other demands strict egalitarianism.",
                ar: "تضارب نموذج الأدوار الزوجية: يتوقع أحدكما إعداداً تقليدياً لرب المنزل/المعيل، بينما يطلب الآخر مساواة صارمة."
            });
        } else {
            strengths.push({
                en: "Aligned Domestic Visions: Highly coordinated views on division of marital responsibilities and roles.",
                ar: "رؤية منزلية متوافقة: وجهات نظر متطابقة حول تقسيم المسؤوليات والأدوار الزوجية داخل البيت."
            });
        }

        const locA = ansA["q54"];
        const locB = ansB["q54"];
        if (locA && locB && locA !== locB) {
            marriageScore -= 15;
            challenges.push({
                en: "Geographic Future Discrepancy: Conflicting wishes regarding settling down locally versus relocating abroad.",
                ar: "تفاوت مستقبلي جغرافي: رغبات متعارضة بشأن الاستقرار محلياً مقابل الهجرة والعمل بالخارج."
            });
            discussionTopics.push({
                en: "A concrete discussion on compromise locations or career timelines.",
                ar: "نقاش ملموس حول مواقع وسطية للتسوية أو جداول زمنية للعمل والدراسة."
            });
        }
        categoryScores["Marriage"] = Math.round(Math.max(30, marriageScore));

        // --- 11. SUBTLE PHYSICAL & FASHION EXPECTATION MATCHING (CROSS-MATCH) ---
        // Cross-match Person A's self-presentation with Person B's expectations and vice-versa
        let aestheticScore = 100;
        const aesA = traitsA.aesthetic_profile || { self_presentation: "natural", expect_presentation: "natural", self_fashion: "casual", expect_fashion: "casual" };
        const aesB = traitsB.aesthetic_profile || { self_presentation: "natural", expect_presentation: "natural", self_fashion: "casual", expect_fashion: "casual" };

        // Cross Match 1: Person A meets Person B expectations
        if (aesA.self_presentation !== aesB.expect_presentation) aestheticScore -= 20;
        if (aesA.self_fashion !== aesB.expect_fashion) aestheticScore -= 20;

        // Cross Match 2: Person B meets Person A expectations
        if (aesB.self_presentation !== aesA.expect_presentation) aestheticScore -= 20;
        if (aesB.self_fashion !== aesA.expect_fashion) aestheticScore -= 20;

        const aestheticMatchPercentage = Math.max(40, aestheticScore);

        // Push subtle hint rather than private raw values
        if (aestheticMatchPercentage >= 80) {
            strengths.push({
                en: `Aesthetic & Presentation Harmony: Physical & Fashion compatibility matches other side expectation by ${aestheticMatchPercentage}%.`,
                ar: `تناغم المظهر والأناقة: يتوافق أسلوب المظهر المادي والأزياء مع توقعات الطرف الآخر بنسبة ${aestheticMatchPercentage}%.`
            });
        } else if (aestheticMatchPercentage <= 60) {
            challenges.push({
                en: `Evolving Aesthetic Preferences: Physical & Fashion compatibility matches other side expectation by ${aestheticMatchPercentage}%.`,
                ar: `تطور تفضيلات المظهر والأناقة: يتوافق أسلوب المظهر المادي والأزياء مع توقعات الطرف الآخر بنسبة ${aestheticMatchPercentage}%.`
            });
            discussionTopics.push({
                en: "Discuss expectations regarding grooming, daily presentation, and style expression in social settings.",
                ar: "مناقشة التوقعات بشأن الهندام والاعتناء بالمظهر اليومي والتعبير عن الأناقة في المناسبات الاجتماعية."
            });
        } else {
            strengths.push({
                en: `Solid Aesthetic Alignment: Physical & Fashion compatibility matches other side expectation by ${aestheticMatchPercentage}%.`,
                ar: `توافق مظهر كافٍ ومريح: يتوافق أسلوب المظهر المادي والأزياء مع توقعات الطرف الآخر بنسبة ${aestheticMatchPercentage}%.`
            });
        }

        // Add to Category Scores for holistic profiling
        categoryScores["Aesthetic Alignment"] = aestheticMatchPercentage;

        // --- 12. OVERALL COMPATIBILITY INDEX CALCULATIONS ---
        const totalCategories = Object.keys(categoryScores).length;
        const sumScores = Object.values(categoryScores).reduce((a, b) => a + b, 0);
        let calculatedIndex = sumScores / totalCategories;

        // Apply progressive penalties for critical issues and deal-breakers
        if (dealBreakers.length > 0) {
            calculatedIndex -= (dealBreakers.length * 10);
        }

        const overallCompatibilityIndex = Math.round(Math.max(30, Math.min(98, calculatedIndex)));

        // Generate dynamic recommendations based on calculated index
        const recommendations = [];
        if (overallCompatibilityIndex >= 85) {
            recommendations.push({
                en: "Outstanding Synergy: Focus on maintaining this high alignment by practicing continuous appreciation and not taking the compatibility for granted.",
                ar: "انسجام وتناغم متميز: ركزا على الحفاظ على هذا التوافق العالي من خلال التقدير المستمر وعدم اعتبار التوافق أمراً مسلماً به."
            });
        } else if (overallCompatibilityIndex >= 70) {
            recommendations.push({
                en: "Strong Core with Minor Frictions: Focus on developing clear collaborative conflict protocols to resolve the specific boundaries and lifestyle variances identified.",
                ar: "قاعدة قوية مع بعض الاحتكاكات الطفيفة: ركزا على تطوير بروتوكولات واضحة لحل النزاعات بشكل تعاوني لمعالجة الفوارق المحددة في الحدود وأسلوب الحياة."
            });
        } else {
            recommendations.push({
                en: "Significant Differences Detected: A successful long-term relationship will require deep commitment, open conversations, and structured compromises on domestic roles, financial decisions, and communication styles.",
                ar: "تم اكتشاف فروق جوهرية: سيتطلب نجاح العلاقة على المدى الطويل التزاماً عميقاً، ومحادثات صريحة، وتنازلات مدروسة ومنظمة حول الأدوار المنزلية، والقرارات المالية، وأساليب التواصل."
            });
        }

        // Confidence score of the assessment
        const averageConfidence = Math.round(
            ((profileA.assessment_confidence || 80) + (profileB.assessment_confidence || 80)) / 2
        );

        return {
            overall_index: overallCompatibilityIndex,
            category_scores: categoryScores,
            strengths: strengths.slice(0, 5),
            challenges: challenges.slice(0, 5),
            discussion_topics: discussionTopics.slice(0, 5),
            deal_breakers: dealBreakers,
            growth_opportunities: growthOpportunities.slice(0, 3),
            recommendations: recommendations,
            report_confidence: averageConfidence
        };
    }
};

window.CompatibilityEngine = CompatibilityEngine;
