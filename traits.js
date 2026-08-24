/**
 * MatchWise Lite v1.0
 * traits.js - Personality Scoring Engine
 * Evaluates raw responses to calculate detailed, robust traits:
 * Big Five (OCEAN), MBTI Tendency, Attachment Style, Communication Style,
 * Conflict Style, Decision Style, Love Language Tendencies, and Assessment Confidence.
 */

const PersonalityEngine = {
    /**
     * Parse answers to determine all personality traits & types.
     * @param {Object} answers - Map of { questionId: answerValue }
     * @param {Array} questionsList - Array of question metadata from questions.json
     * @returns {Object} Calculated profile metadata
     */
    calculate(answers, questionsList) {
        // Initialize Trait Scores
        const ocean = { openness: 50, conscientiousness: 50, extroversion: 50, agreeableness: 50, neuroticism: 50 };
        const mbti = { mbti_e: 0, mbti_i: 0, mbti_s: 0, mbti_n: 0, mbti_t: 0, mbti_f: 0, mbti_j: 0, mbti_p: 0 };
        const attachment = { secure: 0, anxious: 0, avoidant: 0 };
        const communication = { assertive: 0, passive: 0, passive_aggressive: 0, reserved: 0, private: 0 };
        const conflict = { collaborating: 0, avoiding: 0, competing: 0, compromising: 0 };
        const decision = { analytical: 0, intuitive: 0, consensus: 0, veto_husband: 0, veto_delegated: 0 };
        const love_languages = { words: 0, quality_time: 0, gifts: 0, acts: 0, touch: 0 };
        const other_traits = {};

        // Ideology scoring
        const ideology = { traditionalism: 0, feminism: 0, liberalism: 0, capitalism: 0 };

        let totalWeight = 0;
        let answeredCount = 0;

        // Map questions to facilitate fast lookup
        const qMap = {};
        questionsList.forEach(q => { qMap[q.id] = q; });

        // Process Answers
        for (const [qId, val] of Object.entries(answers)) {
            const q = qMap[qId];
            if (!q) continue;

            answeredCount++;
            const weight = q.weight || 1.0;
            totalWeight += weight;

            // 1. LIKERT TYPE
            if (q.type === "likert") {
                // Map 7-point Likert Scale (-3 to +3)
                // 1: Strongly Disagree (-3), 2: Disagree (-2), 3: Slightly Disagree (-1),
                // 4: Neutral (0), 5: Slightly Agree (+1), 6: Agree (+2), 7: Strongly Agree (+3)
                const numericVal = parseInt(val, 10);
                const score = (numericVal - 4) * weight; // Normalized around 0

                // Match traits
                if (q.trait === "openness") ocean.openness += score * 10;
                else if (q.trait === "conscientiousness") ocean.conscientiousness += score * 10;
                else if (q.trait === "extroversion") ocean.extroversion += score * 10;
                else if (q.trait === "agreeableness") ocean.agreeableness += score * 10;
                else if (q.trait === "neuroticism") ocean.neuroticism += score * 10;
                else if (q.trait === "communication_assertive") {
                    communication.assertive += score * 1.5;
                } else if (q.trait === "communication_active_listening") {
                    communication.assertive += score * 1.0;
                } else if (q.trait === "communication_sharing") {
                    if (score > 0) communication.assertive += score * 1.0;
                    else {
                        communication.reserved += Math.abs(score) * 1.2;
                    }
                } else if (q.trait === "conflict_tolerance") {
                    conflict.collaborating += score * 1.0;
                } else if (q.trait === "conflict_forgiveness") {
                    conflict.compromising += score * 1.0;
                } else if (q.trait === "money_saver_spender") {
                    other_traits["money_saver"] = (other_traits["money_saver"] || 50) + score * 15;
                } else if (q.trait === "lifestyle_neatness") {
                    other_traits["lifestyle_neatness"] = (other_traits["lifestyle_neatness"] || 50) + score * 15;
                } else if (q.trait === "lifestyle_social_frequency") {
                    other_traits["social_frequency"] = (other_traits["social_frequency"] || 50) + score * 15;
                } else if (q.trait === "lifestyle_health") {
                    other_traits["health_focus"] = (other_traits["health_focus"] || 50) + score * 15;
                } else if (q.trait === "marriage_commitment") {
                    other_traits["commitment_view"] = (other_traits["commitment_view"] || 50) + score * 15;
                } else if (q.trait === "marriage_independence") {
                    other_traits["independence_view"] = (other_traits["independence_view"] || 50) + score * 15;
                } else if (q.trait === "family_influence") {
                    other_traits["family_influence"] = (other_traits["family_influence"] || 50) + score * 15;
                } else if (q.trait === "religion_importance") {
                    other_traits["religion_importance"] = (other_traits["religion_importance"] || 50) + score * 15;
                } else if (q.trait === "religion_orthodoxy") {
                    other_traits["religion_orthodoxy"] = (other_traits["religion_orthodoxy"] || 50) + score * 15;
                } else if (q.trait === "career_ambition") {
                    other_traits["career_ambition"] = (other_traits["career_ambition"] || 50) + score * 15;
                } else if (q.trait === "career_worklife_balance") {
                    other_traits["worklife_balance"] = (other_traits["worklife_balance"] || 50) + score * 15;
                } else if (q.trait === "decision_consensus") {
                    decision.consensus += score * 1.5;
                } else if (q.trait === "trust_jealousy") {
                    other_traits["trust_jealousy"] = (other_traits["trust_jealousy"] || 50) + score * 15;
                } else if (q.trait === "trust_privacy") {
                    other_traits["trust_privacy"] = (other_traits["trust_privacy"] || 50) + score * 15;
                } else if (q.trait === "boundaries_independence") {
                    other_traits["boundaries_independence"] = (other_traits["boundaries_independence"] || 50) + score * 15;
                } else if (q.trait === "boundaries_secrets") {
                    other_traits["boundaries_secrets"] = (other_traits["boundaries_secrets"] || 50) + score * 15;
                } else if (q.trait === "emotional_regulation") {
                    other_traits["emotional_regulation"] = (other_traits["emotional_regulation"] || 50) + score * 15;
                } else if (q.trait === "emotional_empathy") {
                    other_traits["emotional_empathy"] = (other_traits["emotional_empathy"] || 50) + score * 15;
                } else if (q.trait === "affection_physical") {
                    love_languages.touch += score * 1.5;
                } else if (q.trait === "future_stability") {
                    other_traits["future_stability"] = (other_traits["future_stability"] || 50) + score * 15;
                } else if (q.trait === "mbti_s_n") {
                    mbti.mbti_s += score * 1.5;
                } else if (q.trait === "mbti_j_p") {
                    mbti.mbti_j += score * 1.5;
                } else if (q.trait === "religion_finances") {
                    other_traits["religion_finances"] = (other_traits["religion_finances"] || 50) + score * 15;
                } else if (q.trait === "career_prestige") {
                    other_traits["career_prestige"] = (other_traits["career_prestige"] || 50) + score * 15;
                } else if (q.trait === "trust_past") {
                    other_traits["trust_past"] = (other_traits["trust_past"] || 50) + score * 15;
                } else if (q.trait === "boundaries_family_privacy") {
                    other_traits["family_privacy"] = (other_traits["family_privacy"] || 50) + score * 15;
                } else if (q.trait === "emotional_comforting") {
                    other_traits["emotional_comforting"] = (other_traits["emotional_comforting"] || 50) + score * 15;
                } else if (q.trait === "affection_words") {
                    love_languages.words += score * 1.5;
                } else if (q.trait === "marriage_growth") {
                    other_traits["marriage_growth"] = (other_traits["marriage_growth"] || 50) + score * 15;
                } else {
                    // Fallback to directly using traits if present
                    if (q.trait) {
                        other_traits[q.trait] = (other_traits[q.trait] || 50) + score * 15;
                    }
                }
            }

            // 2. MULTIPLE CHOICE OR SCENARIO TYPE
            else if (q.type === "choice" || q.type === "scenario") {
                const optId = val;
                const opt = q.options?.find(o => o.id === optId);
                if (opt && opt.trait_scores) {
                    for (const [traitKey, tScore] of Object.entries(opt.trait_scores)) {
                        const scaledScore = tScore * weight;
                        if (traitKey === "ideology_traditionalism") ideology.traditionalism += scaledScore;
                        else if (traitKey === "ideology_feminism") ideology.feminism += scaledScore;
                        else if (traitKey === "ideology_liberalism") ideology.liberalism += scaledScore;
                        else if (traitKey === "ideology_capitalism") ideology.capitalism += scaledScore;
                        else if (traitKey === "extroversion") ocean.extroversion += scaledScore * 10;
                        else if (traitKey === "mbti_e") mbti.mbti_e += scaledScore * 2;
                        else if (traitKey === "mbti_i") mbti.mbti_i += scaledScore * 2;
                        else if (traitKey === "mbti_t") mbti.mbti_t += scaledScore * 2;
                        else if (traitKey === "mbti_f") mbti.mbti_f += scaledScore * 2;
                        else if (traitKey === "attachment_secure") attachment.secure += scaledScore * 2;
                        else if (traitKey === "attachment_anxious") attachment.anxious += scaledScore * 2;
                        else if (traitKey === "attachment_avoidant") attachment.avoidant += scaledScore * 2;
                        else if (traitKey === "communication_assertive") communication.assertive += scaledScore * 2;
                        else if (traitKey === "communication_passive") communication.passive += scaledScore * 2;
                        else if (traitKey === "communication_passive_aggressive") {
                            communication.passive_aggressive += scaledScore * 2;
                        } else if (traitKey === "communication_reserved") communication.reserved += scaledScore * 2;
                        else if (traitKey === "communication_private") communication.private += scaledScore * 2;
                        else if (traitKey === "conflict_collaborating") conflict.collaborating += scaledScore * 2;
                        else if (traitKey === "conflict_avoiding") conflict.avoiding += scaledScore * 2;
                        else if (traitKey === "conflict_competing") conflict.competing += scaledScore * 2;
                        else if (traitKey === "conflict_compromising") conflict.compromising += scaledScore * 2;
                        else if (traitKey === "emotional_intelligence") {
                            other_traits["emotional_intelligence"] = (other_traits["emotional_intelligence"] || 50) + scaledScore * 15;
                        } else {
                            other_traits[traitKey] = (other_traits[traitKey] || 50) + scaledScore * 15;
                        }
                    }
                }
            }

            // 3. PRIORITY RANKING TYPE
            else if (q.type === "rank") {
                // val is an array of IDs in order of preference (1st is index 0)
                if (Array.isArray(val)) {
                    val.forEach((itemId, idx) => {
                        const rankScore = (q.items.length - idx) * weight; // Higher score for top rank
                        const item = q.items?.find(i => i.id === itemId);
                        if (item && item.trait) {
                            if (item.trait === "money_priority_security") {
                                other_traits["money_priority_security"] = (other_traits["money_priority_security"] || 0) + rankScore * 10;
                            } else if (item.trait === "money_priority_experience") {
                                other_traits["money_priority_experience"] = (other_traits["money_priority_experience"] || 0) + rankScore * 10;
                            } else if (item.trait === "money_priority_growth") {
                                other_traits["money_priority_growth"] = (other_traits["money_priority_growth"] || 0) + rankScore * 10;
                            } else if (item.trait === "money_priority_charity") {
                                other_traits["money_priority_charity"] = (other_traits["money_priority_charity"] || 0) + rankScore * 10;
                            } else if (item.trait === "love_words") love_languages.words += rankScore * 2;
                            else if (item.trait === "love_quality_time") love_languages.quality_time += rankScore * 2;
                            else if (item.trait === "love_gifts") love_languages.gifts += rankScore * 2;
                            else if (item.trait === "love_acts") love_languages.acts += rankScore * 2;
                            else if (item.trait === "love_touch") love_languages.touch += rankScore * 2;
                            else {
                                other_traits[item.trait] = (other_traits[item.trait] || 0) + rankScore * 10;
                            }
                        }
                    });
                }
            }
        }

        // Normalize Big Five OCEAN to 10 - 90 % range
        const clamp = (val, min = 10, max = 90) => Math.max(min, Math.min(max, Math.round(val)));
        const finalOcean = {
            openness: clamp(ocean.openness),
            conscientiousness: clamp(ocean.conscientiousness),
            extroversion: clamp(ocean.extroversion),
            agreeableness: clamp(ocean.agreeableness),
            neuroticism: clamp(ocean.neuroticism)
        };

        // Determine MBTI
        // Feed Big Five correlates to MBTI tendencies
        let e_score = mbti.mbti_e + (finalOcean.extroversion - 50);
        let s_score = mbti.mbti_s + (50 - finalOcean.openness);
        let t_score = mbti.mbti_t + (50 - finalOcean.agreeableness);
        let j_score = mbti.mbti_j + (finalOcean.conscientiousness - 50);

        const mbti_type = [
            e_score >= 0 ? "E" : "I",
            s_score >= 0 ? "S" : "N",
            t_score >= 0 ? "T" : "F",
            j_score >= 0 ? "J" : "P"
        ].join("");

        // Attachment Style
        let maxAttachment = "secure";
        let maxAttachVal = attachment.secure;
        if (attachment.anxious > maxAttachVal) {
            maxAttachment = "anxious";
            maxAttachVal = attachment.anxious;
        }
        if (attachment.avoidant > maxAttachVal) {
            maxAttachment = "avoidant";
            maxAttachVal = attachment.avoidant;
        }
        const finalAttachment = {
            primary: maxAttachment,
            scores: {
                secure: Math.round(attachment.secure * 10),
                anxious: Math.round(attachment.anxious * 10),
                avoidant: Math.round(attachment.avoidant * 10)
            }
        };

        // Communication Style
        let maxComm = "assertive";
        let maxCommVal = communication.assertive;
        if (communication.passive > maxCommVal) {
            maxComm = "passive";
            maxCommVal = communication.passive;
        }
        if (communication.passive_aggressive > maxCommVal) {
            maxComm = "passive_aggressive";
            maxCommVal = communication.passive_aggressive;
        }
        if (communication.reserved > maxCommVal) {
            maxComm = "reserved";
            maxCommVal = communication.reserved;
        }
        const finalComm = {
            primary: maxComm,
            scores: {
                assertive: Math.round(communication.assertive * 10),
                passive: Math.round(communication.passive * 10),
                passive_aggressive: Math.round(communication.passive_aggressive * 10),
                reserved: Math.round(communication.reserved * 10)
            }
        };

        // Conflict Style
        let maxConflict = "collaborating";
        let maxConflictVal = conflict.collaborating;
        if (conflict.avoiding > maxConflictVal) {
            maxConflict = "avoiding";
            maxConflictVal = conflict.avoiding;
        }
        if (conflict.competing > maxConflictVal) {
            maxConflict = "competing";
            maxConflictVal = conflict.competing;
        }
        if (conflict.compromising > maxConflictVal) {
            maxConflict = "compromising";
            maxConflictVal = conflict.compromising;
        }
        const finalConflict = {
            primary: maxConflict,
            scores: {
                collaborating: Math.round(conflict.collaborating * 10),
                avoiding: Math.round(conflict.avoiding * 10),
                competing: Math.round(conflict.competing * 10),
                compromising: Math.round(conflict.compromising * 10)
            }
        };

        // Decision Style
        const decision_style = decision.analytical >= decision.intuitive ? "analytical" : "intuitive";

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

        // Extract exact raw values for aesthetics (q66, q67, q68, q69) to assist cross-matching
        const aesthetic_profile = {
            self_presentation: answers["q66"] || "natural",
            expect_presentation: answers["q67"] || "natural",
            self_fashion: answers["q68"] || "casual",
            expect_fashion: answers["q69"] || "casual"
        };

        // Normalize miscellaneous values
        const finalOthers = {};
        for (const [k, v] of Object.entries(other_traits)) {
            finalOthers[k] = clamp(v);
        }

        // Calculate relative Ideology Percentages
        const tradScore = Math.max(0, ideology.traditionalism);
        const femScore = Math.max(0, ideology.feminism);
        const libScore = Math.max(0, ideology.liberalism);
        const capScore = Math.max(0, ideology.capitalism);

        const totalIdeologySum = tradScore + femScore + libScore + capScore;
        let ideologyPercentages = { traditionalism: 25, feminism: 25, liberalism: 25, capitalism: 25 };
        if (totalIdeologySum > 0) {
            ideologyPercentages = {
                traditionalism: Math.round((tradScore / totalIdeologySum) * 100),
                feminism: Math.round((femScore / totalIdeologySum) * 100),
                liberalism: Math.round((libScore / totalIdeologySum) * 100),
                capitalism: Math.round((capScore / totalIdeologySum) * 100)
            };
        }

        // Calculate Ideology Consistency Index
        let ideologyConsistency = 100;
        if (answers["q9"] && answers["q10"]) {
            if ((answers["q9"] === "opt1" && answers["q10"] === "opt1") || (answers["q9"] === "opt3" && answers["q10"] === "opt3")) {
                ideologyConsistency -= 25;
            }
        }
        if (answers["q11"] && answers["q12"]) {
            if ((answers["q11"] === "opt1" && answers["q12"] === "opt1") || (answers["q11"] === "opt3" && answers["q12"] === "opt3")) {
                ideologyConsistency -= 25;
            }
        }
        if (answers["q13"] && answers["q14"]) {
            if ((answers["q13"] === "opt1" && answers["q14"] === "opt1") || (answers["q13"] === "opt3" && answers["q14"] === "opt3")) {
                ideologyConsistency -= 25;
            }
        }
        if (answers["q15"] && answers["q16"]) {
            if ((answers["q15"] === "opt1" && answers["q16"] === "opt1") || (answers["q15"] === "opt3" && answers["q16"] === "opt3")) {
                ideologyConsistency -= 25;
            }
        }

        // Calculate Assessment Confidence Percentage
        // Formula: completeness_ratio (40%) + response_variance (30%) + core_consistency (30%)
        const minQuestions = 45;
        const maxQuestions = 70;
        const completeness = Math.min(1.0, answeredCount / maxQuestions);

        // Compute response variance (extremely uniform answering drops confidence)
        const answerValues = Object.values(answers).map(v => {
            if (Array.isArray(v)) return 4; // midpoint estimate for priority lists
            const num = parseInt(v, 10);
            return isNaN(num) ? 4 : num;
        });
        const mean = answerValues.reduce((sum, v) => sum + v, 0) / (answerValues.length || 1);
        const variance = answerValues.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / (answerValues.length || 1);
        const normalizedVariance = Math.min(1.0, variance / 2.0); // Max variance normalized around 2.0

        // Consistency check: check logical alignment between reverse questions
        // Let's analyze alignment of introversion/extroversion, trust, parents
        let consistencyScore = 0.85; // baseline
        if (answers["q1"] && answers["q2"]) {
            if (answers["q1"] === "opt1" && answers["q2"] === "opt3") consistencyScore -= 0.2;
        }
        if (answers["q71"] && answers["q72"]) {
            if (answers["q71"] === "opt1" && answers["q72"] === "opt3") consistencyScore -= 0.25;
        }

        const calculatedConfidence = Math.round(
            (completeness * 40) + (normalizedVariance * 30) + (consistencyScore * 30)
        );

        // Physical Appearance, Modesty, and Fashion Profiling (v2.0)
        const physical_appearance_profile = {
            attraction_priority: clamp(finalOthers["appearance_attraction_priority"] || 50),
            fitness_grooming_effort: clamp(finalOthers["appearance_fitness_effort"] || 50)
        };

        const publicModestyRaw = (
            (finalOthers["modesty_public_hijab_niqab"] || 50) +
            (finalOthers["modesty_public_mixed_gatherings"] || 50) +
            (finalOthers["modesty_vacation_resort_attire"] || 50)
        ) / 3;

        const privateFreedomRaw = (
            (finalOthers["modesty_private_freedom"] || 50) +
            (finalOthers["modesty_private_intimacy_openness"] || 50)
        ) / 2;

        const socialSharingRaw = finalOthers["modesty_social_media_sharing"] || 50;
        const socialMediaPrivacyIndex = clamp(100 - socialSharingRaw);

        const modesty_profile = {
            public_modesty_index: clamp(publicModestyRaw),
            private_modesty_freedom: clamp(privateFreedomRaw),
            social_media_privacy_index: socialMediaPrivacyIndex
        };

        const fashion_profile = {
            traditional: clamp(finalOthers["fashion_traditional"] || 50),
            modern_elegant: clamp(finalOthers["fashion_modern_elegant"] || 50),
            casual_relaxed: clamp(finalOthers["fashion_casual"] || 50),
            high_fashion: clamp(finalOthers["fashion_high_fashion"] || 50)
        };

        return {
            big_five: finalOcean,
            mbti: {
                type: mbti_type,
                scores: {
                    e_i: Math.round(e_score),
                    s_n: Math.round(s_score),
                    t_f: Math.round(t_score),
                    j_p: Math.round(j_score)
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
            physical_appearance_profile: physical_appearance_profile,
            modesty_profile: modesty_profile,
            fashion_profile: fashion_profile,
            ideology_profile: ideologyPercentages,
            ideology_consistency: ideologyConsistency,
            assessment_confidence: clamp(calculatedConfidence, 55, 98) // never state 100% certainty
        };
    }
};

window.PersonalityEngine = PersonalityEngine;
