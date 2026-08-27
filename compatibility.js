/**
 * MatchWise Lite v1.2
 * compatibility.js - Relationship Compatibility Engine
 * Compares two psychological profiles across 12 distinct dimensions:
 * Big Five Alignment, Communication, Conflict Dynamics, Financial Systems,
 * Housing Autonomy, Family Boundaries, Children/Parenthood, Religious Values,
 * Emotional Synergy & Love Languages, Career Support, Ideology, and Aesthetics.
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

        // --- 1. PERSONALITY DYNAMICS (BIG FIVE) ---
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
                en: "Diverging Intellectual and Novelty Interests: One partner seeks constant new experiences while the other values comfortable routines.",
                ar: "تفاوت في الاهتمامات والتجارب الجديدة: يسعى أحد الشريكين للتجدد المستمر بينما يفضل الآخر الروتين المستقر."
            });
            discussionTopics.push({
                en: "How to balance structured domestic comfort with exploring new mutual hobbies, culture, and travel.",
                ar: "كيفية الموازنة بين الهدوء المنزلي وبين استكشاف هوايات وثقافات وسفر مشترك."
            });
        } else {
            strengths.push({
                en: "Harmonious Experience Orientation: Both partners share a beautifully aligned outlook toward life's adventures and new ideas.",
                ar: "توجّه متناغم نحو التجارب: يتشارك الشريكان مستوى متقارباً من الانفتاح على أفكار وتجارب الحياة."
            });
        }

        if (oA.neuroticism > 65 && oB.neuroticism > 65) {
            challenges.push({
                en: "Mutual Stress Amplification: Both tend to react strongly to uncertainty, which can escalate minor domestic friction.",
                ar: "تضخيم متبادل للتوتر: يميل كلا الشريكين للتفاعل بقوة مع الضغوط والمفاجآت، مما قد يصعد الخلافات البسيطة."
            });
            growthOpportunities.push({
                en: "Practice a structured 15-minute emotional cool-down protocol before discussing contentious issues.",
                ar: "التدرب على بروتوكول تهدئة لمدة 15 دقيقة قبل الخوض في أي نقاش شائك تحت الضغط."
            });
        }

        // --- 2. COMMUNICATION STYLE ASSESSMENT ---
        const commA = traitsA.communication.primary;
        const commB = traitsB.communication.primary;

        let commScore = 80;
        if (commA === "assertive" && commB === "assertive") {
            commScore = 96;
            strengths.push({
                en: "Direct & Healthy Dialogue: Both communicate transparently and respectfully without passive mind-games.",
                ar: "حوار مباشر وصحي: يتواصل كلا الشريكين بشفافية واحترام متبادل دون تلميحات سلبية أو غموض."
            });
        } else if (commA === "passive_aggressive" || commB === "passive_aggressive") {
            commScore = 55;
            challenges.push({
                en: "Indirect Communication Triggers: Subtle resentment or cold silence could stall emotional clarity.",
                ar: "تواصل غير مباشر: قد يؤدي الصمت البارد أو العتب غير المباشر إلى تعليق الوضوح العاطفي."
            });
            discussionTopics.push({
                en: "Agree on a safe rule of expressing hurt feelings within 24 hours rather than letting resentment brew.",
                ar: "الاتفاق على التعبير عن المشاعر المجروحة خلال 24 ساعة بدلاً من ترك العتب يتراكم."
            });
        } else if ((commA === "passive" || commA === "reserved") && (commB === "passive" || commB === "reserved")) {
            commScore = 65;
            challenges.push({
                en: "Unexpressed Emotional Needs: Both tend to withhold sensitive feelings to maintain superficial peace.",
                ar: "احتياجات عاطفية غير معلنة: يميل كلا الطرفين لكتمان المشاعر الحساسة للحفاظ على سلام سطحي."
            });
            growthOpportunities.push({
                en: "Schedule regular weekly 'Heart-to-Heart Check-ins' to proactively voice unstated thoughts.",
                ar: "تخصيص جلسة مصارحة وحوار أسبوعية منتظمة للحديث عن الأفكار غير المعلنة بودية."
            });
        }
        categoryScores["Communication"] = commScore;

        // --- 3. CONFLICT SYSTEM ---
        const confA = traitsA.conflict.primary;
        const confB = traitsB.conflict.primary;
        let conflictScore = 78;

        if (confA === "collaborating" && confB === "collaborating") {
            conflictScore = 98;
            strengths.push({
                en: "Collaborative Problem Solvers: Problems are faced as a united team against the obstacle, not against each other.",
                ar: "حل تعاوني للمشكلات: مواجهة الخلافات كفريق واحد ضد العقبة، وليس ضد بعضكما البعض."
            });
        } else if (confA === "competing" && confB === "competing") {
            conflictScore = 48;
            challenges.push({
                en: "Ego and Win-Lose Dynamics: Arguments may turn into power struggles where being right is prioritized over harmony.",
                ar: "صراعات الأنا والرغبة في الفوز: قد تتحول النقاشات إلى رغبة في إثبات الخطأ على حساب الود والتوافق."
            });
            discussionTopics.push({
                en: "Establish a golden rule to use 'I feel' statements and a timeout system when voices rise.",
                ar: "تثبيت قاعدة ذهبية لاستخدام عبارات تبدأ بـ 'أشعر' وطلب مهلة مؤقتة فور ارتفاع نبرة الصوت."
            });
        } else if ((confA === "competing" && confB === "avoiding") || (confB === "competing" && confA === "avoiding")) {
            conflictScore = 58;
            challenges.push({
                en: "Pursuer-Distancer Cycle: One partner pursues immediate resolution intensely while the other withdraws defensively.",
                ar: "حلقة الملاحق والمنسحب: يضغط أحد الشريكين للحل الفوري بينما ينسحب الآخر دفاعياً للهروب من الضغط."
            });
            growthOpportunities.push({
                en: "The pursuer practices giving emotional space, while the distancer commits to returning to the topic within 12 hours.",
                ar: "يتدرب الطرف الملاحق على إعطاء مساحة، بينما يلتزم الطرف المنسحب بالعودة للحوار خلال 12 ساعة."
            });
        }
        categoryScores["Conflict"] = conflictScore;

        // --- 4. MONEY VALUES & EXPENSE ARCHITECTURE (q11, q12) ---
        let moneyScore = 85;
        if (ansA["q11"] && ansB["q11"]) {
            if (ansA["q11"] !== ansB["q11"]) {
                moneyScore -= 20;
                challenges.push({
                    en: "Divergent Financial Contribution Models: Discrepancy between shared dual-income pooling vs traditional male sole provider duties.",
                    ar: "تفاوت في نموذج تقاسم المصاريف: اختلاف بين تقاسم الأعباء المالية مناصفة ونموذج النفقة التقليدية الكاملة."
                });
                discussionTopics.push({
                    en: "Draft a written monthly budget clarifying exact responsibilities for housing, groceries, travel, and personal savings.",
                    ar: "صياغة ميزانية شهرية واضحة تحدد مسؤوليات السكن والمقاضي ومصاريف السفر والادخار الخاص."
                });
            } else {
                strengths.push({
                    en: "Synchronized Financial Philosophy: Complete agreement on household expense division and contribution expectations.",
                    ar: "فلسفة مالية متطابقة: اتفاق تام وواضح على توزيع النفقات والمساهمة في بناء المستقبل."
                });
            }
        }

        // Account separation (q12)
        if (ansA["q12"] && ansB["q12"] && ansA["q12"] !== ansB["q12"]) {
            moneyScore -= 12;
        }

        // Saver vs Spender
        const saverA = traitsA.values_and_lifestyle?.money_saver || 50;
        const saverB = traitsB.values_and_lifestyle?.money_saver || 50;
        const saverDiff = Math.abs(saverA - saverB);
        if (saverDiff > 30) {
            moneyScore -= 15;
            challenges.push({
                en: "Saver vs. Spender Friction: One prioritizes long-term investments, while the other values immediate lifestyle experiences.",
                ar: "تفاوت المدّخر والمنفِق: يعطي أحدكما الأولوية للاستثمار طويل الأجل، بينما يقدّر الآخر متعة الإنفاق والرحلات الآنية."
            });
        }
        categoryScores["Money"] = Math.round(Math.max(35, moneyScore));

        // --- 5. HOUSING & LIFESTYLE AUTONOMY (q9, q10) ---
        let housingScore = 85;
        if (ansA["q9"] && ansB["q9"]) {
            if ((ansA["q9"] === "opt1" && ansB["q9"] === "opt3") || (ansA["q9"] === "opt3" && ansB["q9"] === "opt1")) {
                housingScore = 40;
                dealBreakers.push({
                    en: "Housing Independence Clash: One partner demands living inside the family villa, while the other strictly requires an independent home from day one.",
                    ar: "تعارض حاسم في ترتيبات السكن: يصر أحد الشريكين على السكن بفيلا العائلة، بينما يشترط الآخر سكناً مستقلاً تماماً من اليوم الأول."
                });
            } else if (ansA["q9"] === ansB["q9"]) {
                strengths.push({
                    en: "Unified Housing Vision: Complete consensus on residential independence and extended family proximity.",
                    ar: "رؤية سكنية موحدة: توافق تام على ترتيبات السكن والاستقلالية والمسافة المناسبة من العائلة."
                });
            }
        }
        categoryScores["Lifestyle"] = Math.round(Math.max(35, housingScore));

        // --- 6. FAMILY PRIVACY & IN-LAW BOUNDARIES (q26, q41) ---
        let familyScore = 82;
        if (ansA["q26"] && ansB["q26"] && ansA["q26"] !== ansB["q26"]) {
            familyScore -= 20;
            challenges.push({
                en: "In-Law Boundary Variances: Diverging expectations regarding extended family involvement in marital affairs.",
                ar: "تفاوت حدود العائلة: وجهات نظر متباعدة بشأن السماح لأفراد العائلة بالاطلاع على شؤون الزوجين."
            });
            discussionTopics.push({
                en: "Establish explicit, respectful guidelines for protecting marital privacy while honoring family relations.",
                ar: "وضع ضوابط واضحة ومحترمة لحماية خصوصية البيت مع بر الوالدين والصلة الطيبة."
            });
        } else {
            strengths.push({
                en: "Aligned Family Boundaries: United commitment to maintaining marital privacy as a core team.",
                ar: "حدود أسرية متوافقة: التزام مشترك بحفظ خصوصية الحياة الزوجية وحل المشكلات داخلياً."
            });
        }
        categoryScores["Family"] = Math.round(Math.max(35, familyScore));

        // --- 7. CHILDREN & PARENTHOOD (q22 - POTENTIAL DEAL-BREAKER) ---
        let childrenScore = 90;
        if (ansA["q22"] && ansB["q22"]) {
            if ((ansA["q22"] === "opt1" && ansB["q22"] === "opt3") || (ansA["q22"] === "opt3" && ansB["q22"] === "opt1")) {
                childrenScore = 30;
                dealBreakers.push({
                    en: "Irreconcilable Family Goals: One partner strongly desires children, whereas the other prefers a child-free lifestyle.",
                    ar: "تعارض جوهري في الرغبة الإنجابية: أحد الشريكين يضع إنجاب الأطفال كأولوية قصوى، بينما يفضل الآخر حياة خالية من الأبناء."
                });
            } else if (ansA["q22"] === "opt3" || ansB["q22"] === "opt3") {
                childrenScore = 65;
                discussionTopics.push({
                    en: "A clear timeline to align on parenthood expectations to avoid unspoken resentment later.",
                    ar: "جدول زمني لحسم التوقعات بشأن الأبوة والأمومة لتجنب الخلافات الصامتة لاحقاً."
                });
            } else if (ansA["q22"] === ansB["q22"]) {
                strengths.push({
                    en: "Aligned Parenthood Intentions: Mutual harmony on the timing, significance, and vision of raising a family.",
                    ar: "رؤية تربوية وأسرية موحدة: انسجام تام في توقيت وأهمية وبناء الأسرة وتربية الأبناء."
                });
            }
        }
        categoryScores["Children"] = childrenScore;

        // --- 8. RELIGIOUS VALUES & SPIRITUALITY (q23, q47, q48) ---
        let relScore = 85;
        const relImpA = traitsA.values_and_lifestyle?.religion_importance || 50;
        const relImpB = traitsB.values_and_lifestyle?.religion_importance || 50;

        if (ansA["q23"] && ansB["q23"]) {
            if ((ansA["q23"] === "opt1" && ansB["q23"] === "opt3") || (ansA["q23"] === "opt3" && ansB["q23"] === "opt1")) {
                relScore = 45;
                dealBreakers.push({
                    en: "Spiritual Life Discrepancy: Contrast between viewing strict daily religious practice as a relationship pillar vs a private individual matter.",
                    ar: "تباين في الالتزام الديني: فجوة بين اعتبار الالتزام الديني اليومي ركيزة في إدارة المنزل وبين اعتباره شأناً فردياً بحتاً."
                });
            } else if (ansA["q23"] === ansB["q23"]) {
                strengths.push({
                    en: "Shared Spiritual Compass: Harmonious expectations for religious values, prayer, and moral foundations in the home.",
                    ar: "بوصلة قيمية وإيمانية مشتركة: توقعات متوافقة حول القيم الروحية والأخلاقية وأداء الفرائض في البيت."
                });
            }
        }

        if (Math.abs(relImpA - relImpB) > 35) {
            relScore -= 15;
            challenges.push({
                en: "Varying Religious Observance Pacing: Differences in daily spiritual routines and expectations of partner's practice.",
                ar: "تفاوت وتيرة الالتزام الديني: فوارق في الممارسات الروحية اليومية والتوقعات المتبادلة."
            });
        }
        categoryScores["Religion"] = Math.round(Math.max(30, relScore));

        // --- 9. EMOTIONAL CONNECTION & LOVE LANGUAGES (q28, Attachment) ---
        let emotionalScore = 80;
        const loveA = traitsA.love_languages?.primary || "words";
        const loveB = traitsB.love_languages?.primary || "words";

        if (loveA === loveB) {
            emotionalScore += 12;
            strengths.push({
                en: `Shared Primary Love Language (${loveA.replace("_", " ")}): Both express and receive affection in the exact same emotional frequency.`,
                ar: `لغة حب أساسية متطابقة: يعبر كلا الشريكين عن المودة ويستقبلانها بنفس الطريقة، مما يسهل الانسجام العاطفي الفوري.`
            });
        } else {
            discussionTopics.push({
                en: `Bridging Love Languages: Partner A connects via ${loveA.replace("_", " ")}, while Partner B connects via ${loveB.replace("_", " ")}.`,
                ar: `سد فجوة لغات الحب: الطرف (أ) يشعر بالحب بطريقة مختلفة عن الطرف (ب). يحتاج كل منكما لتعلم لغة شريكه العاطفية.`
            });
        }

        // Attachment styles matching
        const attachA = traitsA.attachment?.primary || "secure";
        const attachB = traitsB.attachment?.primary || "secure";
        if (attachA === "secure" && attachB === "secure") {
            emotionalScore += 8;
            strengths.push({
                en: "Dual-Secure Attachment: High emotional safety, trust, and healthy interdependence.",
                ar: "ارتباط عاطفي آمن ومزدوج: بيئة عاطفية يسودها الأمان والثقة المتبادلة والاعتماد الصحي المشترك."
            });
        } else if ((attachA === "anxious" && attachB === "avoidant") || (attachB === "anxious" && attachA === "avoidant")) {
            emotionalScore -= 18;
            challenges.push({
                en: "Anxious-Avoidant Cycle: Seeking reassurance triggers retreat in the other partner, creating a repetitive pursue-withdraw loop.",
                ar: "فخ القلق والتجنب: طلب التطمين المستمر قد يدفع الطرف الآخر للانسحاب، مما يعزز دوامة القلق والتباعد."
            });
            growthOpportunities.push({
                en: "Learn to recognize the loop early: state 'I need gentle reassurance' instead of criticism, and give time without abandoning the dialogue.",
                ar: "تعلما تمييز هذه الدوامة مبكراً: اطلبا التطمين بهدوء دون هجوم، وامنحا وقتاً للتفكير دون قطع الحوار."
            });
        }
        categoryScores["Emotional Needs"] = Math.round(Math.max(40, Math.min(98, emotionalScore)));

        // --- 10. MARRIAGE & FUTURE VISION (q15, q24, q30) ---
        let marriageScore = 85;
        if (ansA["q15"] && ansB["q15"] && ansA["q15"] !== ansB["q15"]) {
            marriageScore -= 18;
            challenges.push({
                en: "Decisional Leadership Discrepancy: Diverging views on traditional male final authority (Qiwamah) vs strict equal partnership consensus.",
                ar: "تفاوت في قيادة القرار: تباعد بين القيادة والمسؤولية النهائية للرجل (القوامة) وبين التوافق المتساوي التام."
            });
            discussionTopics.push({
                en: "Agree in advance on protocols for breaking deadlocks on critical family matters.",
                ar: "الاتفاق مسبقاً على آلية واضحة لكسر الجمود عند الخلاف في القرارات الكبرى."
            });
        } else {
            strengths.push({
                en: "Aligned Marital Roles & Leadership: Mutual agreement on how household authority and responsibilities are handled.",
                ar: "رؤية متوافقة للأدوار الزوجية: اتفاق متبادل على قيادة وتوزيع المسؤوليات داخل المنزل."
            });
        }

        categoryScores["Marriage"] = Math.round(Math.max(35, marriageScore));

        // --- 11. IDEOLOGY & CULTURAL PROFILE ---
        const idA = traitsA.ideology_profile || { traditionalism: 25, feminism: 25, liberalism: 25, capitalism: 25 };
        const idB = traitsB.ideology_profile || { traditionalism: 25, feminism: 25, liberalism: 25, capitalism: 25 };
        const ideoDiff = Math.abs(idA.traditionalism - idB.traditionalism) +
                         Math.abs(idA.feminism - idB.feminism) +
                         Math.abs(idA.liberalism - idB.liberalism) +
                         Math.abs(idA.capitalism - idB.capitalism);
        const ideoScore = Math.round(Math.max(30, Math.min(98, 100 - (ideoDiff * 0.35))));
        categoryScores["Ideology Alignment"] = ideoScore;

        // --- 12. AESTHETICS & PRESENTATION (q66 - q69 CROSS-MATCH) ---
        let aesScore = 100;
        const aesA = traitsA.aesthetic_profile || {};
        const aesB = traitsB.aesthetic_profile || {};

        if (aesA.self_presentation && aesB.expect_presentation && aesA.self_presentation !== aesB.expect_presentation) aesScore -= 20;
        if (aesB.self_presentation && aesA.expect_presentation && aesB.self_presentation !== aesA.expect_presentation) aesScore -= 20;
        if (aesA.self_fashion && aesB.expect_fashion && aesA.self_fashion !== aesB.expect_fashion) aesScore -= 15;
        if (aesB.self_fashion && aesA.expect_fashion && aesB.self_fashion !== aesA.expect_fashion) aesScore -= 15;
        const finalAes = Math.max(40, aesScore);
        categoryScores["Aesthetic Alignment"] = finalAes;

        // --- OVERALL COMPATIBILITY INDEX CALCULATION ---
        const scoresArr = Object.values(categoryScores);
        let avg = scoresArr.reduce((a, b) => a + b, 0) / scoresArr.length;

        // Penalize heavily for severe deal-breakers
        if (dealBreakers.length > 0) {
            avg -= (dealBreakers.length * 10);
        }

        const overallCompatibilityIndex = Math.round(Math.max(30, Math.min(98, avg)));

        // Dynamic Recommendations
        const recommendations = [];
        if (overallCompatibilityIndex >= 85) {
            recommendations.push({
                en: "Exceptional Structural Synergy: Maintain this extraordinary harmony through continuous appreciation and active communication.",
                ar: "انسجام وتوافق استثنائي: حافظا على هذا التوافق الرائع من خلال التقدير اليومي المستمر وتجديد الحوار الودود."
            });
        } else if (overallCompatibilityIndex >= 70) {
            recommendations.push({
                en: "Strong Core Foundation: Focus on intentional conversations around the specific financial and domestic boundary variances identified.",
                ar: "قاعدة توافق قوية: ركزا على الحوار الواعي حول النقاط المحددة في إدارة الميزانية والحدود العائلية لمنع أي احتكاك."
            });
        } else {
            recommendations.push({
                en: "Significant Perspective Variances: Bridging core differences in expectations will require open empathy, clear written agreements, and mutual compromises.",
                ar: "فوارق واضحة في التوقعات: سيتطلب بناء علاقة متينة صراحة عميقة، واتفاقات واضحة حول المسؤوليات والتنازلات المشتركة."
            });
        }

        const averageConfidence = Math.round(
            ((profileA.assessment_confidence || 85) + (profileB.assessment_confidence || 85)) / 2
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

// Export to global window namespace & CommonJS for testing
if (typeof window !== "undefined") {
    window.CompatibilityEngine = CompatibilityEngine;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports = CompatibilityEngine;
}
