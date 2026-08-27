/**
 * MatchWise Lite v1.2
 * traits.js - Personality Scoring Engine
 * Evaluates responses to calculate detailed psychometric traits:
 * Big Five (OCEAN), MBTI Tendency, Attachment Style, Communication Style,
 * Conflict Style, Decision Style, Love Language Tendencies, Ideology, and Confidence.
 */

const PersonalityEngine = {
    /**
     * Parse answers to determine all personality traits & types.
     * @param {Object} answers - Map of { questionId: answerValue }
     * @param {Array} questionsList - Array of question metadata from questions.json
     * @returns {Object} Calculated profile metadata
     */
    calculate(answers, questionsList) {
        // Initialize Trait Accumulators
        const ocean = { openness: 50, conscientiousness: 50, extroversion: 50, agreeableness: 50, neuroticism: 50 };
        const mbti = { mbti_e: 0, mbti_i: 0, mbti_s: 0, mbti_n: 0, mbti_t: 0, mbti_f: 0, mbti_j: 0, mbti_p: 0 };
        const attachment = { secure: 5, anxious: 2, avoidant: 2 };
        const communication = { assertive: 5, passive: 2, passive_aggressive: 1, reserved: 2 };
        const conflict = { collaborating: 5, avoiding: 2, competing: 1, compromising: 3 };
        const decision = { consensus: 5, analytical: 3, intuitive: 2, autonomous: 2 };
        const love_languages = { words: 5, quality_time: 5, gifts: 3, acts: 4, touch: 4 };

        const other_traits = {
            money_saver: 50,
            lifestyle_neatness: 50,
            lifestyle_health: 50,
            social_frequency: 50,
            family_influence: 50,
            family_privacy: 50,
            religion_importance: 50,
            religion_orthodoxy: 50,
            religion_finances: 50,
            career_ambition: 50,
            career_support: 50,
            career_prestige: 50,
            worklife_balance: 50,
            trust_jealousy: 50,
            trust_privacy: 50,
            trust_past: 50,
            marriage_commitment: 50,
            marriage_growth: 50,
            children_desire: 50,
            emotional_regulation: 50,
            emotional_empathy: 50,
            emotional_comforting: 50,
            boundaries_independence: 50,
            future_stability: 50
        };

        const ideology = { traditionalism: 10, feminism: 10, liberalism: 10, capitalism: 10 };

        let totalWeight = 0;
        let answeredCount = 0;

        // Map questions for O(1) lookup
        const qMap = {};
        questionsList.forEach(q => { qMap[q.id] = q; });

        // Process Answers
        for (const [qId, val] of Object.entries(answers)) {
            const q = qMap[qId];
            if (!q) continue;

            answeredCount++;
            const weight = q.weight || 1.0;
            totalWeight += weight;

            // 1. LIKERT TYPE (Scale 1 to 7)
            if (q.type === "likert") {
                const numericVal = parseInt(val, 10);
                if (isNaN(numericVal)) continue;
                // Normalized around 0 (-3 to +3)
                const score = (numericVal - 4) * weight;

                if (q.trait === "openness") ocean.openness += score * 8;
                else if (q.trait === "conscientiousness") ocean.conscientiousness += score * 8;
                else if (q.trait === "extroversion") ocean.extroversion += score * 8;
                else if (q.trait === "agreeableness") ocean.agreeableness += score * 8;
                else if (q.trait === "neuroticism") ocean.neuroticism += score * 8;
                else if (q.trait === "conflict_tolerance") conflict.collaborating += score * 1.5;
                else if (q.trait === "conflict_forgiveness") conflict.compromising += score * 1.5;
                else if (q.trait === "communication_active_listening") communication.assertive += score * 1.5;
                else if (q.trait === "communication_sharing") {
                    if (score > 0) communication.assertive += score * 1.2;
                    else communication.reserved += Math.abs(score) * 1.2;
                }
                else if (q.trait === "affection_physical") love_languages.touch += score * 1.8;
                else if (q.trait === "affection_words") love_languages.words += score * 1.8;
                else if (q.trait === "money_saver_spender") other_traits.money_saver += score * 10;
                else if (q.trait === "boundaries_family_privacy") other_traits.family_privacy += score * 10;
                else if (q.trait === "career_worklife_balance") other_traits.worklife_balance += score * 10;
                else if (q.trait === "ideology_traditionalism") ideology.traditionalism += Math.max(0, score * 5);
                else if (q.trait === "ideology_liberalism") ideology.liberalism += Math.max(0, score * 5);
                else if (q.trait in other_traits) {
                    other_traits[q.trait] += score * 10;
                }
            }

            // 2. SCENARIO / CHOICE TYPE
            else if (q.type === "scenario" || q.type === "choice") {
                const optId = val;
                const opt = q.options?.find(o => o.id === optId);
                if (opt && opt.trait_scores) {
                    for (const [traitKey, tScore] of Object.entries(opt.trait_scores)) {
                        const scaledScore = tScore * weight;
                        if (traitKey === "ideology_traditionalism") ideology.traditionalism += Math.max(0, scaledScore * 4);
                        else if (traitKey === "ideology_feminism") ideology.feminism += Math.max(0, scaledScore * 4);
                        else if (traitKey === "ideology_liberalism") ideology.liberalism += Math.max(0, scaledScore * 4);
                        else if (traitKey === "ideology_capitalism") ideology.capitalism += Math.max(0, scaledScore * 4);
                        else if (traitKey === "extroversion") ocean.extroversion += scaledScore * 8;
                        else if (traitKey === "openness") ocean.openness += scaledScore * 8;
                        else if (traitKey === "conscientiousness") ocean.conscientiousness += scaledScore * 8;
                        else if (traitKey === "agreeableness") ocean.agreeableness += scaledScore * 8;
                        else if (traitKey === "mbti_e") mbti.mbti_e += scaledScore * 2;
                        else if (traitKey === "mbti_i") mbti.mbti_i += scaledScore * 2;
                        else if (traitKey === "mbti_s") mbti.mbti_s += scaledScore * 2;
                        else if (traitKey === "mbti_n") mbti.mbti_n += scaledScore * 2;
                        else if (traitKey === "mbti_t") mbti.mbti_t += scaledScore * 2;
                        else if (traitKey === "mbti_f") mbti.mbti_f += scaledScore * 2;
                        else if (traitKey === "mbti_j") mbti.mbti_j += scaledScore * 2;
                        else if (traitKey === "mbti_p") mbti.mbti_p += scaledScore * 2;
                        else if (traitKey === "attachment_secure") attachment.secure += scaledScore * 2;
                        else if (traitKey === "attachment_anxious") attachment.anxious += scaledScore * 2;
                        else if (traitKey === "attachment_avoidant") attachment.avoidant += scaledScore * 2;
                        else if (traitKey === "communication_assertive") communication.assertive += scaledScore * 2;
                        else if (traitKey === "communication_passive") communication.passive += scaledScore * 2;
                        else if (traitKey === "communication_passive_aggressive") communication.passive_aggressive += scaledScore * 2;
                        else if (traitKey === "communication_reserved") communication.reserved += scaledScore * 2;
                        else if (traitKey === "conflict_collaborating") conflict.collaborating += scaledScore * 2;
                        else if (traitKey === "conflict_avoiding") conflict.avoiding += scaledScore * 2;
                        else if (traitKey === "conflict_competing") conflict.competing += scaledScore * 2;
                        else if (traitKey === "conflict_compromising") conflict.compromising += scaledScore * 2;
                        else if (traitKey === "decision_consensus") decision.consensus += scaledScore * 2;
                        else if (traitKey === "love_words") love_languages.words += scaledScore * 3;
                        else if (traitKey === "love_quality_time") love_languages.quality_time += scaledScore * 3;
                        else if (traitKey === "love_acts") love_languages.acts += scaledScore * 3;
                        else if (traitKey === "love_gifts") love_languages.gifts += scaledScore * 3;
                        else if (traitKey === "love_touch") love_languages.touch += scaledScore * 3;
                        else if (traitKey === "children_desire") other_traits.children_desire += scaledScore * 15;
                        else if (traitKey in other_traits) {
                            other_traits[traitKey] += scaledScore * 10;
                        }
                    }
                }
            }
        }

        // Normalize Big Five OCEAN to 15 - 95 % range
        const clamp = (val, min = 15, max = 95) => Math.max(min, Math.min(max, Math.round(val)));
        const finalOcean = {
            openness: clamp(ocean.openness),
            conscientiousness: clamp(ocean.conscientiousness),
            extroversion: clamp(ocean.extroversion),
            agreeableness: clamp(ocean.agreeableness),
            neuroticism: clamp(ocean.neuroticism)
        };

        // Determine MBTI Tendency
        let e_score = (mbti.mbti_e - mbti.mbti_i) + ((finalOcean.extroversion - 50) / 10);
        let s_score = (mbti.mbti_s - mbti.mbti_n) + ((50 - finalOcean.openness) / 10);
        let t_score = (mbti.mbti_t - mbti.mbti_f) + ((50 - finalOcean.agreeableness) / 10);
        let j_score = (mbti.mbti_j - mbti.mbti_p) + ((finalOcean.conscientiousness - 50) / 10);

        const mbti_type = [
            e_score >= 0 ? "E" : "I",
            s_score >= 0 ? "S" : "N",
            t_score >= 0 ? "T" : "F",
            j_score >= 0 ? "J" : "P"
        ].join("");

        // Attachment Style
        let primaryAttachment = "secure";
        if (attachment.anxious > attachment.secure && attachment.anxious >= attachment.avoidant) {
            primaryAttachment = "anxious";
        } else if (attachment.avoidant > attachment.secure && attachment.avoidant > attachment.anxious) {
            primaryAttachment = "avoidant";
        }
        const finalAttachment = {
            primary: primaryAttachment,
            scores: {
                secure: Math.round(attachment.secure * 10),
                anxious: Math.round(attachment.anxious * 10),
                avoidant: Math.round(attachment.avoidant * 10)
            }
        };

        // Communication Style
        let primaryComm = "assertive";
        let maxCommVal = communication.assertive;
        for (const [k, v] of Object.entries(communication)) {
            if (v > maxCommVal) {
                maxCommVal = v;
                primaryComm = k;
            }
        }
        const finalComm = {
            primary: primaryComm,
            scores: {
                assertive: Math.round(communication.assertive * 10),
                passive: Math.round(communication.passive * 10),
                passive_aggressive: Math.round(communication.passive_aggressive * 10),
                reserved: Math.round(communication.reserved * 10)
            }
        };

        // Conflict Style
        let primaryConflict = "collaborating";
        let maxConflictVal = conflict.collaborating;
        for (const [k, v] of Object.entries(conflict)) {
            if (v > maxConflictVal) {
                maxConflictVal = v;
                primaryConflict = k;
            }
        }
        const finalConflict = {
            primary: primaryConflict,
            scores: {
                collaborating: Math.round(conflict.collaborating * 10),
                avoiding: Math.round(conflict.avoiding * 10),
                competing: Math.round(conflict.competing * 10),
                compromising: Math.round(conflict.compromising * 10)
            }
        };

        // Decision Style
        const decision_style = decision.consensus >= 5 ? "consensus" : "analytical";

        // Love Languages
        const loveLangScores = {
            words: Math.max(10, Math.round(love_languages.words * 5)),
            quality_time: Math.max(10, Math.round(love_languages.quality_time * 5)),
            gifts: Math.max(10, Math.round(love_languages.gifts * 5)),
            acts: Math.max(10, Math.round(love_languages.acts * 5)),
            touch: Math.max(10, Math.round(love_languages.touch * 5))
        };
        const sortedLangs = Object.entries(loveLangScores).sort((a, b) => b[1] - a[1]);
        const primaryLoveLang = sortedLangs[0][0];

        // Aesthetic profile (q66 - q69)
        const aesthetic_profile = {
            self_presentation: answers["q66"] || "opt2",
            expect_presentation: answers["q67"] || "opt2",
            self_fashion: answers["q68"] || "opt2",
            expect_fashion: answers["q69"] || "opt2"
        };

        // Normalize Values and Lifestyle
        const finalOthers = {};
        for (const [k, v] of Object.entries(other_traits)) {
            finalOthers[k] = clamp(v, 10, 95);
        }

        // Ideology Percentages
        const totalIdeologySum = ideology.traditionalism + ideology.feminism + ideology.liberalism + ideology.capitalism;
        let ideologyPercentages = { traditionalism: 25, feminism: 25, liberalism: 25, capitalism: 25 };
        if (totalIdeologySum > 0) {
            ideologyPercentages = {
                traditionalism: Math.round((ideology.traditionalism / totalIdeologySum) * 100),
                feminism: Math.round((ideology.feminism / totalIdeologySum) * 100),
                liberalism: Math.round((ideology.liberalism / totalIdeologySum) * 100),
                capitalism: Math.round((ideology.capitalism / totalIdeologySum) * 100)
            };
        }

        // Assessment Confidence Calculation
        const totalPossible = questionsList.length || 70;
        const completeness = Math.min(1.0, answeredCount / totalPossible);

        const answerValues = Object.values(answers).map(v => {
            const num = parseInt(v, 10);
            return isNaN(num) ? 4 : num;
        });
        const mean = answerValues.reduce((sum, v) => sum + v, 0) / (answerValues.length || 1);
        const variance = answerValues.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / (answerValues.length || 1);
        const normalizedVariance = Math.min(1.0, variance / 2.0);

        const calculatedConfidence = Math.round((completeness * 50) + (normalizedVariance * 25) + 20);

        return {
            big_five: finalOcean,
            mbti: {
                type: mbti_type,
                scores: {
                    e_i: Math.round(e_score * 10),
                    s_n: Math.round(s_score * 10),
                    t_f: Math.round(t_score * 10),
                    j_p: Math.round(j_score * 10)
                }
            },
            attachment: finalAttachment,
            communication: finalComm,
            conflict: finalConflict,
            decision_style: decision_style,
            love_languages: {
                primary: primaryLoveLang,
                scores: loveLangScores
            },
            values_and_lifestyle: finalOthers,
            aesthetic_profile: aesthetic_profile,
            ideology_profile: ideologyPercentages,
            assessment_confidence: clamp(calculatedConfidence, 65, 96)
        };
    }
};

// Export to global window namespace & CommonJS for testing
if (typeof window !== "undefined") {
    window.PersonalityEngine = PersonalityEngine;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports = PersonalityEngine;
}
