/**
 * MatchWise Lite v2.9.0
 * traits.js - Multi-Framework Psychometric & Consciousness Calculation Engine
 * Unified Evaluator mapping single responses across 10 clinical & behavioral frameworks:
 * 1. Big Five (OCEAN)
 * 2. MBTI / Jungian Cognitive Style
 * 3. Dr. Taylor Hartman Color Code (Core Motives)
 * 4. DISC Assessment (Pace & Focus)
 * 5. The Birkman Method (Usual Style, Underlying Needs, Stress Triggers)
 * 6. FIRO-B (Inclusion, Control, Affection - Expressed vs. Wanted)
 * 7. Thomas-Kilmann Conflict Mode (TKI)
 * 8. Gottman Sound Relationship House (Emotional Safety & Four Horsemen Risks)
 * 9. Adult Attachment Theory (ECR - Anxiety vs. Avoidance)
 * 10. Schwartz Theory of Basic Human Values & Life Domain Priorities
 */

const PersonalityEngine = {
    /**
     * Parse answers to determine all personality traits & types across 10 frameworks.
     * @param {Object} answers - Map of { questionId: answerValue }
     * @param {Array} questionsList - Array of question metadata from questions.json
     * @returns {Object} Calculated multi-framework profile metadata
     */
    calculate(answers, questionsList) {
        // --- 1. ACCUMULATOR INITIALIZATION ---

        // Big Five (OCEAN)
        const ocean = { openness: 50, conscientiousness: 50, extroversion: 50, agreeableness: 50, neuroticism: 50 };
        
        // MBTI
        const mbti = { mbti_e: 0, mbti_i: 0, mbti_s: 0, mbti_n: 0, mbti_t: 0, mbti_f: 0, mbti_j: 0, mbti_p: 0 };
        
        // Hartman Color Code (Core Motives)
        const hartman = { red: 5, blue: 5, white: 5, yellow: 5 };
        
        // DISC Assessment
        const disc = { d: 5, i: 5, s: 5, c: 5 };
        
        // Birkman Tri-Layer Behavioral Model
        const birkman_usual = { assertive: 5, structured: 5, supportive: 5, social: 5 };
        const birkman_needs = { structure: 5, empathy: 5, freedom: 5, esteem: 5 };
        const birkman_stress = { withdrawing: 2, demanding: 2, impatient: 2, defensive: 2 };
        
        // FIRO-B (Expressed vs. Wanted)
        const firo = {
            exp_ctrl: 5, wnt_ctrl: 5,
            exp_inc: 5,  wnt_inc: 5,
            exp_aff: 5,  wnt_aff: 5
        };
        
        // Thomas-Kilmann Conflict Modes (TKI)
        const tki = { collaborating: 5, compromising: 4, accommodating: 3, avoiding: 3, competing: 2 };
        
        // Gottman Sound Relationship House & Four Horsemen Risk
        const gottman = {
            repair_receptivity: 50,
            criticism_risk: 10,
            defensiveness_risk: 10,
            stonewalling_risk: 10,
            contempt_risk: 5
        };
        
        // Adult Attachment (ECR)
        const attachment = { secure: 15, anxious: 5, avoidant: 5 };
        
        // Schwartz Basic Human Values
        const schwartz = {
            tradition: 10,
            security: 10,
            self_direction: 10,
            benevolence: 10,
            hedonism: 10,
            achievement: 10
        };

        // Communication & Decision Styles
        const communication = { assertive: 5, passive: 2, passive_aggressive: 1, reserved: 2 };
        const decision = { consensus: 5, analytical: 3, intuitive: 2, autonomous: 2 };
        
        // Love Languages
        const love_languages = { words: 5, quality_time: 5, gifts: 3, acts: 4, touch: 4 };

        // Life Domain Values & Priorities
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

        // 11. David Hawkins Map of Consciousness & Abraham Hicks Emotional Guidance Scale
        const consciousness_accum = {
            hawkins_weighted_sum: 0,
            hawkins_weight: 0,
            hicks_weighted_sum: 0,
            hicks_weight: 0,
            stress_floor_loc: 600,
            force_weight: 0,
            power_weight: 0
        };

        // 12. Maslow's Hierarchy of Needs & Human Development Frameworks (Kegan & Bowen)
        const maslow_accum = {
            somatic: 12,
            safety: 15,
            belonging: 15,
            esteem: 15,
            actualization: 15,
            transcendence: 10
        };

        const developmental_accum = {
            kegan_weighted_sum: 0,
            kegan_weight: 0,
            diff_weighted_sum: 0,
            diff_weight: 0
        };

        let totalWeight = 0;
        let answeredCount = 0;

        // Map questions for O(1) lookup
        const qMap = {};
        (questionsList || []).forEach(q => { qMap[q.id] = q; });

        // Helper clamp
        const clamp = (val, min = 10, max = 95) => Math.max(min, Math.min(max, Math.round(val)));

        // --- 2. PROCESS ANSWERS & MULTI-FACTOR MAPPING ---
        for (const [qId, val] of Object.entries(answers || {})) {
            const q = qMap[qId];
            if (!q) continue;

            answeredCount++;
            const weight = q.weight || 1.0;
            totalWeight += weight;

            // 1. LIKERT TYPE (Scale 1 to 7)
            if (q.type === "likert") {
                const numericVal = parseInt(val, 10);
                if (isNaN(numericVal)) continue;
                const score = (numericVal - 4) * weight;

                // Big Five
                if (q.trait === "openness") ocean.openness += score * 8;
                else if (q.trait === "conscientiousness") ocean.conscientiousness += score * 8;
                else if (q.trait === "extroversion") ocean.extroversion += score * 8;
                else if (q.trait === "agreeableness") ocean.agreeableness += score * 8;
                else if (q.trait === "neuroticism") ocean.neuroticism += score * 8;
                
                // Cross-map to related frameworks
                if (q.trait === "extroversion") {
                    disc.i += score * 1.5;
                    firo.exp_inc += score * 1.5;
                    hartman.yellow += Math.max(0, score * 1.2);
                }
                if (q.trait === "agreeableness") {
                    disc.s += score * 1.5;
                    hartman.blue += Math.max(0, score * 1.2);
                    attachment.secure += score * 1.5;
                    tki.collaborating += score * 1.2;
                }
                if (q.trait === "conscientiousness") {
                    disc.c += score * 1.5;
                    hartman.red += Math.max(0, score * 1.0);
                    birkman_needs.structure += score * 1.5;
                    schwartz.security += score * 1.5;
                }
                if (q.trait === "neuroticism") {
                    attachment.anxious += score * 2.0;
                    gottman.defensiveness_risk += Math.max(0, score * 2.5);
                    gottman.stonewalling_risk += Math.max(0, score * 2.0);
                }

                if (q.trait === "conflict_tolerance") {
                    tki.collaborating += score * 2.0;
                    gottman.repair_receptivity += score * 4;
                } else if (q.trait === "conflict_forgiveness") {
                    tki.compromising += score * 1.5;
                    gottman.repair_receptivity += score * 3;
                } else if (q.trait === "communication_active_listening") {
                    communication.assertive += score * 1.5;
                    gottman.repair_receptivity += score * 3;
                    firo.exp_aff += score * 1.5;
                } else if (q.trait === "communication_sharing") {
                    if (score > 0) {
                        communication.assertive += score * 1.2;
                        firo.exp_aff += score * 1.5;
                    } else {
                        communication.reserved += Math.abs(score) * 1.2;
                        gottman.stonewalling_risk += Math.abs(score) * 2;
                    }
                } else if (q.trait === "affection_physical") {
                    love_languages.touch += score * 1.8;
                    firo.wnt_aff += score * 1.5;
                } else if (q.trait === "affection_words") {
                    love_languages.words += score * 1.8;
                    firo.wnt_aff += score * 1.5;
                } else if (q.trait === "money_saver_spender") {
                    other_traits.money_saver += score * 10;
                    schwartz.security += score * 2;
                } else if (q.trait === "boundaries_family_privacy") {
                    other_traits.family_privacy += score * 10;
                    firo.wnt_ctrl += score * 1.5;
                } else if (q.trait === "career_worklife_balance") {
                    other_traits.worklife_balance += score * 10;
                    schwartz.hedonism += score * 2;
                } else if (q.trait === "ideology_traditionalism") {
                    ideology.traditionalism += Math.max(0, score * 5);
                    schwartz.tradition += score * 3;
                } else if (q.trait === "ideology_liberalism") {
                    ideology.liberalism += Math.max(0, score * 5);
                    schwartz.self_direction += score * 3;
                } else if (q.trait in other_traits) {
                    other_traits[q.trait] += score * 10;
                }
            }

            // 2. SCENARIO / CHOICE TYPE (Multi-Framework Polytomous Scoring)
            else if (q.type === "scenario" || q.type === "choice") {
                const optId = val;
                const opt = q.options?.find(o => o.id === optId);
                if (opt && opt.trait_scores) {
                    for (const [traitKey, tScore] of Object.entries(opt.trait_scores)) {
                        const scaled = tScore * weight;

                        // 1. Hartman Color Code
                        if (traitKey === "hartman_red" || traitKey === "hartman_power") hartman.red += scaled * 4;
                        else if (traitKey === "hartman_blue" || traitKey === "hartman_intimacy") hartman.blue += scaled * 4;
                        else if (traitKey === "hartman_white" || traitKey === "hartman_peace") hartman.white += scaled * 4;
                        else if (traitKey === "hartman_yellow" || traitKey === "hartman_fun") hartman.yellow += scaled * 4;

                        // 2. DISC Assessment
                        else if (traitKey === "disc_d") disc.d += scaled * 4;
                        else if (traitKey === "disc_i") disc.i += scaled * 4;
                        else if (traitKey === "disc_s") disc.s += scaled * 4;
                        else if (traitKey === "disc_c") disc.c += scaled * 4;

                        // 3. Birkman Model
                        else if (traitKey.startsWith("birkman_usual_")) {
                            const sub = traitKey.replace("birkman_usual_", "");
                            if (birkman_usual[sub] !== undefined) birkman_usual[sub] += scaled * 3;
                        } else if (traitKey.startsWith("birkman_need_")) {
                            const sub = traitKey.replace("birkman_need_", "");
                            if (birkman_needs[sub] !== undefined) birkman_needs[sub] += scaled * 3;
                        } else if (traitKey.startsWith("birkman_stress_")) {
                            const sub = traitKey.replace("birkman_stress_", "");
                            if (birkman_stress[sub] !== undefined) birkman_stress[sub] += scaled * 3;
                        }

                        // 4. FIRO-B
                        else if (traitKey === "firo_exp_ctrl") firo.exp_ctrl += scaled * 3;
                        else if (traitKey === "firo_wnt_ctrl") firo.wnt_ctrl += scaled * 3;
                        else if (traitKey === "firo_exp_inc") firo.exp_inc += scaled * 3;
                        else if (traitKey === "firo_wnt_inc") firo.wnt_inc += scaled * 3;
                        else if (traitKey === "firo_exp_aff") firo.exp_aff += scaled * 3;
                        else if (traitKey === "firo_wnt_aff") firo.wnt_aff += scaled * 3;

                        // 5. Thomas-Kilmann Conflict (TKI)
                        else if (traitKey === "tki_competing" || traitKey === "conflict_competing") tki.competing += scaled * 3;
                        else if (traitKey === "tki_collaborating" || traitKey === "conflict_collaborating") tki.collaborating += scaled * 3;
                        else if (traitKey === "tki_compromising" || traitKey === "conflict_compromising") tki.compromising += scaled * 3;
                        else if (traitKey === "tki_avoiding" || traitKey === "conflict_avoiding") tki.avoiding += scaled * 3;
                        else if (traitKey === "tki_accommodating") tki.accommodating += scaled * 3;

                        // 6. Gottman Dyadic & Four Horsemen
                        else if (traitKey === "gottman_repair_receptivity") gottman.repair_receptivity += scaled * 6;
                        else if (traitKey === "gottman_criticism_risk") gottman.criticism_risk += scaled * 4;
                        else if (traitKey === "gottman_defensiveness_risk") gottman.defensiveness_risk += scaled * 4;
                        else if (traitKey === "gottman_stonewalling_risk") gottman.stonewalling_risk += scaled * 4;
                        else if (traitKey === "gottman_contempt_risk") gottman.contempt_risk += scaled * 5;

                        // 7. Attachment (ECR)
                        else if (traitKey === "attachment_secure") attachment.secure += scaled * 3;
                        else if (traitKey === "attachment_anxious") attachment.anxious += scaled * 3;
                        else if (traitKey === "attachment_avoidant") attachment.avoidant += scaled * 3;

                        // 8. Schwartz Values
                        else if (traitKey === "schwartz_tradition") schwartz.tradition += scaled * 4;
                        else if (traitKey === "schwartz_security") schwartz.security += scaled * 4;
                        else if (traitKey === "schwartz_self_direction") schwartz.self_direction += scaled * 4;
                        else if (traitKey === "schwartz_benevolence") schwartz.benevolence += scaled * 4;
                        else if (traitKey === "schwartz_hedonism") schwartz.hedonism += scaled * 4;
                        else if (traitKey === "schwartz_achievement") schwartz.achievement += scaled * 4;

                        // Big Five & MBTI
                        else if (traitKey === "extroversion") ocean.extroversion += scaled * 8;
                        else if (traitKey === "openness") ocean.openness += scaled * 8;
                        else if (traitKey === "conscientiousness") ocean.conscientiousness += scaled * 8;
                        else if (traitKey === "agreeableness") ocean.agreeableness += scaled * 8;
                        else if (traitKey === "neuroticism") ocean.neuroticism += scaled * 8;
                        else if (traitKey === "mbti_e") mbti.mbti_e += scaled * 2;
                        else if (traitKey === "mbti_i") mbti.mbti_i += scaled * 2;
                        else if (traitKey === "mbti_s") mbti.mbti_s += scaled * 2;
                        else if (traitKey === "mbti_n") mbti.mbti_n += scaled * 2;
                        else if (traitKey === "mbti_t") mbti.mbti_t += scaled * 2;
                        else if (traitKey === "mbti_f") mbti.mbti_f += scaled * 2;
                        else if (traitKey === "mbti_j") mbti.mbti_j += scaled * 2;
                        else if (traitKey === "mbti_p") mbti.mbti_p += scaled * 2;

                        // Communication & Decision
                        else if (traitKey === "communication_assertive") communication.assertive += scaled * 2;
                        else if (traitKey === "communication_passive") communication.passive += scaled * 2;
                        else if (traitKey === "communication_passive_aggressive") communication.passive_aggressive += scaled * 2;
                        else if (traitKey === "communication_reserved") communication.reserved += scaled * 2;
                        else if (traitKey === "decision_consensus") decision.consensus += scaled * 2;

                        // Love Languages
                        else if (traitKey === "love_words") love_languages.words += scaled * 3;
                        else if (traitKey === "love_quality_time") love_languages.quality_time += scaled * 3;
                        else if (traitKey === "love_acts") love_languages.acts += scaled * 3;
                        else if (traitKey === "love_gifts") love_languages.gifts += scaled * 3;
                        else if (traitKey === "love_touch") love_languages.touch += scaled * 3;

                        // Ideology
                        else if (traitKey === "ideology_traditionalism") ideology.traditionalism += Math.max(0, scaled * 4);
                        else if (traitKey === "ideology_feminism") ideology.feminism += Math.max(0, scaled * 4);
                        else if (traitKey === "ideology_liberalism") ideology.liberalism += Math.max(0, scaled * 4);
                        else if (traitKey === "ideology_capitalism") ideology.capitalism += Math.max(0, scaled * 4);

                        // Awareness & Consciousness (David Hawkins & Abraham Hicks)
                        else if (traitKey === "hawkins_loc") {
                            consciousness_accum.hawkins_weighted_sum += tScore * weight;
                            consciousness_accum.hawkins_weight += weight;
                            if (tScore < 200) {
                                consciousness_accum.force_weight += weight;
                            } else {
                                consciousness_accum.power_weight += weight;
                            }
                            if (tScore < consciousness_accum.stress_floor_loc) {
                                consciousness_accum.stress_floor_loc = tScore;
                            }
                        } else if (traitKey === "hicks_level") {
                            consciousness_accum.hicks_weighted_sum += tScore * weight;
                            consciousness_accum.hicks_weight += weight;
                        }

                        // 12. Maslow Hierarchy of Needs
                        else if (traitKey === "maslow_somatic") maslow_accum.somatic += Math.max(0, scaled * 4);
                        else if (traitKey === "maslow_safety") maslow_accum.safety += Math.max(0, scaled * 4);
                        else if (traitKey === "maslow_belonging") maslow_accum.belonging += Math.max(0, scaled * 4);
                        else if (traitKey === "maslow_esteem") maslow_accum.esteem += Math.max(0, scaled * 4);
                        else if (traitKey === "maslow_actualization") maslow_accum.actualization += Math.max(0, scaled * 4);
                        else if (traitKey === "maslow_transcendence") maslow_accum.transcendence += Math.max(0, scaled * 4);

                        // 13. Human Development (Kegan Orders of Consciousness & Bowen Differentiation)
                        else if (traitKey === "kegan_stage") {
                            developmental_accum.kegan_weighted_sum += tScore * weight;
                            developmental_accum.kegan_weight += weight;
                        } else if (traitKey === "differentiation_level") {
                            developmental_accum.diff_weighted_sum += tScore * weight;
                            developmental_accum.diff_weight += weight;
                        }

                        // Other Traits
                        else if (traitKey === "children_desire") other_traits.children_desire += scaled * 15;
                        else if (traitKey in other_traits) {
                            other_traits[traitKey] += scaled * 10;
                        }
                    }
                }
            }
        }

        // --- 3. SYNTHESIS & CALIBRATION OF ALL 10 FRAMEWORKS ---

        // 1. BIG FIVE (OCEAN)
        const finalOcean = {
            openness: clamp(ocean.openness),
            conscientiousness: clamp(ocean.conscientiousness),
            extroversion: clamp(ocean.extroversion),
            agreeableness: clamp(ocean.agreeableness),
            neuroticism: clamp(ocean.neuroticism)
        };

        // 2. MBTI TENDENCY
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

        // 3. HARTMAN COLOR CODE (Core Motives)
        // Correlate with Big Five & DISC baseline if sparse
        if (hartman.red === 5 && hartman.blue === 5) {
            hartman.red += (finalOcean.conscientiousness - 50) / 5 + (disc.d - 5);
            hartman.blue += (finalOcean.agreeableness - 50) / 5;
            hartman.white += (50 - finalOcean.neuroticism) / 6;
            hartman.yellow += (finalOcean.extroversion - 50) / 5;
        }
        const hartmanTotal = Math.max(1, hartman.red + hartman.blue + hartman.white + hartman.yellow);
        const hartmanPercent = {
            red: Math.round((hartman.red / hartmanTotal) * 100),
            blue: Math.round((hartman.blue / hartmanTotal) * 100),
            white: Math.round((hartman.white / hartmanTotal) * 100),
            yellow: Math.round((hartman.yellow / hartmanTotal) * 100)
        };
        const sortedHartman = Object.entries(hartmanPercent).sort((a, b) => b[1] - a[1]);
        const primaryColor = sortedHartman[0][0];
        const secondaryColor = sortedHartman[1][0];
        const colorMetadata = {
            red: { motive_en: "Power, Progress & Leadership", motive_ar: "القوة والإنجاز والقيادة", fuel_en: "Competence and efficiency", fuel_ar: "الكفاءة والإنجاز العملي", hazard_en: "Impatience and bluntness", hazard_ar: "نفاد الصبر والمباشرة القاسية" },
            blue: { motive_en: "Intimacy, Connection & Loyalty", motive_ar: "التقارب والعمق العاطفي والوفاء", fuel_en: "Authentic care and being understood", fuel_ar: "الاهتمام الصادق والتقدير العميق", hazard_en: "Over-sensitivity and perfectionism", hazard_ar: "فرط الحساسية والمثالية المرهقة" },
            white: { motive_en: "Peace, Clarity & Internal Harmony", motive_ar: "السلام والوضوح والهدوء الداخلي", fuel_en: "Calm acceptance and low pressure", fuel_ar: "القبول الهادئ وغياب الضغط والمشاحنات", hazard_en: "Passive resistance and avoidance", hazard_ar: "المقاومة السلبية وتأجيل المواجهة" },
            yellow: { motive_en: "Joy, Spontaneity & Optimism", motive_ar: "المرح والعفوية والتفاؤل الحيوي", fuel_en: "Playfulness, novelty and freedom", fuel_ar: "المرح والتجديد والحرية", hazard_en: "Restlessness and routine fatigue", hazard_ar: "الملل السريع والهروب من الروتين الجاد" }
        };
        const finalHartman = {
            primary: primaryColor,
            secondary: secondaryColor,
            scores: hartmanPercent,
            breakdown: hartmanPercent,
            metadata: colorMetadata[primaryColor]
        };

        // 4. DISC ASSESSMENT
        if (disc.d === 5 && disc.i === 5) {
            disc.d += (finalOcean.conscientiousness - 50) / 8 + (finalOcean.extroversion - 50) / 10;
            disc.i += (finalOcean.extroversion - 50) / 5;
            disc.s += (finalOcean.agreeableness - 50) / 5;
            disc.c += (finalOcean.conscientiousness - 50) / 5;
        }
        const discTotal = Math.max(1, disc.d + disc.i + disc.s + disc.c);
        const discPercent = {
            d: Math.round((disc.d / discTotal) * 100),
            i: Math.round((disc.i / discTotal) * 100),
            s: Math.round((disc.s / discTotal) * 100),
            c: Math.round((disc.c / discTotal) * 100)
        };
        const sortedDisc = Object.entries(discPercent).sort((a, b) => b[1] - a[1]);
        const primaryDisc = sortedDisc[0][0].toUpperCase();
        const secondaryDisc = sortedDisc[1][0].toUpperCase();
        const paceScore = ((discPercent.d + discPercent.i) - (discPercent.s + discPercent.c)); // >0 fast, <0 steady
        const focusScore = ((discPercent.d + discPercent.c) - (discPercent.i + discPercent.s)); // >0 task, <0 people
        const finalDisc = {
            primary: primaryDisc,
            secondary: secondaryDisc,
            type: `${primaryDisc}${secondaryDisc}`,
            scores: discPercent,
            breakdown: { D: discPercent.d, I: discPercent.i, S: discPercent.s, C: discPercent.c },
            pace: paceScore >= 0 ? "Fast-Paced & Responsive" : "Reflective & Deliberate",
            pace_ar: paceScore >= 0 ? "سريع الإيقاع واستجابي" : "متأنٍ ومتأمل وهادئ الإيقاع",
            focus: focusScore >= 0 ? "Task & Logic Driven" : "People & Relationship Driven",
            focus_ar: focusScore >= 0 ? "موجه نحو المهام والمنطق" : "موجه نحو العلاقات والأشخاص"
        };

        // 5. THE BIRKMAN METHOD (Usual vs. Needs vs. Stress)
        const sortedUsual = Object.entries(birkman_usual).sort((a, b) => b[1] - a[1]);
        const sortedNeeds = Object.entries(birkman_needs).sort((a, b) => b[1] - a[1]);
        const sortedStress = Object.entries(birkman_stress).sort((a, b) => b[1] - a[1]);
        const primaryUsual = sortedUsual[0][0];
        const primaryNeed = sortedNeeds[0][0];
        const primaryStress = sortedStress[0][0];

        const birkmanDescriptions = {
            usual: {
                assertive: { en: "Direct, decisive, action-oriented leadership.", ar: "قيادة مباشرة، حاسمة ومبادرة نحو الإنجاز." },
                structured: { en: "Systematic, organized, reliable and thorough.", ar: "منهجي، منظم، موثوق ومتقن للتفاصيل." },
                supportive: { en: "Gentle, collaborative, and considerate of others.", ar: "ودود، متعاون، ومراعٍ جداً لمشاعر الآخرين." },
                social: { en: "Expressive, engaging, energetic and lively.", ar: "تعبيري، اجتماعي، متفاعل ومفعم بالحيوية." }
            },
            needs: {
                structure: { en: "Clear expectations, orderly home environment, and predictability.", ar: "توقعات واضحة، نظام وترتيب بيتي، واستقرار وتوقع مسبق." },
                empathy: { en: "Soft tone, emotional validation, and patient listening.", ar: "نبرة هادئة، اعتراف بالمشاعر، واستماع رحب دون استعجال." },
                freedom: { en: "Personal space, trust without micromanagement, and autonomy.", ar: "مساحة شخصية، ثقة دون تدقيق تفصيلي، واستقلالية مريحة." },
                esteem: { en: "Explicit appreciation, respect for input, and genuine reassurance.", ar: "تقدير صريح، احترام للرأي والمشاركة، وطمأنة صادقة." }
            },
            stress: {
                withdrawing: { en: "Becomes uncommunicative, cold, and emotionally unavailable.", ar: "ينعزل عن التواصل، ويصبح صامتاً ومنغلقاً عاطفياً." },
                demanding: { en: "Becomes blunt, critical, rigid, and micromanaging.", ar: "يصبح حاداً، كثير الانتقاد، صارماً ومدققاً في كل شيء." },
                impatient: { en: "Becomes restless, dismissive, and rushes decisions abruptly.", ar: "ينفد صبره سريعاً، ويتجاوز الآخرين ويتخذ قرارات متعجلة." },
                defensive: { en: "Takes comments personally, counter-attacks, and dwells on hurt.", ar: "يتحسس شخصياً من أي ملاحظة، ويدافع بهجوم مضاد أو استياء دفين." }
            }
        };

        const finalBirkman = {
            usual_style: primaryUsual,
            underlying_need: primaryNeed,
            stress_trigger: primaryStress,
            summary: {
                usual: birkmanDescriptions.usual[primaryUsual] || birkmanDescriptions.usual.supportive,
                needs: birkmanDescriptions.needs[primaryNeed] || birkmanDescriptions.needs.empathy,
                stress: birkmanDescriptions.stress[primaryStress] || birkmanDescriptions.stress.withdrawing
            }
        };

        // 6. FIRO-B (Expressed vs. Wanted)
        const normalizeFiro = (val) => Math.max(1, Math.min(9, Math.round(val / 2)));
        const finalFiro = {
            inclusion: { expressed: normalizeFiro(firo.exp_inc), wanted: normalizeFiro(firo.wnt_inc) },
            control: { expressed: normalizeFiro(firo.exp_ctrl), wanted: normalizeFiro(firo.wnt_ctrl) },
            affection: { expressed: normalizeFiro(firo.exp_aff), wanted: normalizeFiro(firo.wnt_aff) }
        };

        // 7. THOMAS-KILMANN CONFLICT MODE (TKI)
        const tkiTotal = Math.max(1, tki.competing + tki.collaborating + tki.compromising + tki.avoiding + tki.accommodating);
        const tkiScores = {
            competing: Math.round((tki.competing / tkiTotal) * 100),
            collaborating: Math.round((tki.collaborating / tkiTotal) * 100),
            compromising: Math.round((tki.compromising / tkiTotal) * 100),
            avoiding: Math.round((tki.avoiding / tkiTotal) * 100),
            accommodating: Math.round((tki.accommodating / tkiTotal) * 100)
        };
        const sortedTki = Object.entries(tkiScores).sort((a, b) => b[1] - a[1]);
        const primaryTki = sortedTki[0][0];
        const secondaryTki = sortedTki[1][0];
        const finalTki = {
            primary: primaryTki,
            secondary: secondaryTki,
            scores: tkiScores,
            assertiveness: Math.round((tkiScores.competing + tkiScores.collaborating) / 2),
            cooperativeness: Math.round((tkiScores.accommodating + tkiScores.collaborating) / 2)
        };

        // 8. GOTTMAN SOUND RELATIONSHIP HOUSE & SAFETY RADAR
        const count = Math.max(1, answeredCount);
        const normalizedCriticism = (gottman.criticism_risk / count) * 20;
        const normalizedDefensiveness = (gottman.defensiveness_risk / count) * 20;
        const normalizedStonewalling = (gottman.stonewalling_risk / count) * 20;
        const normalizedContempt = (gottman.contempt_risk / count) * 20;
        const horsemenNormalized = normalizedCriticism + normalizedDefensiveness + normalizedStonewalling + normalizedContempt;

        const repairScore = clamp(Math.round((gottman.repair_receptivity / (count * 0.4)) * 35), 35, 95);
        const safetyIndex = clamp(Math.round(100 - (horsemenNormalized * 1.5) + (repairScore * 0.15)), 35, 96);

        const horsemenObj = {
            criticism: clamp(Math.round(normalizedCriticism * 4), 8, 85),
            defensiveness: clamp(Math.round(normalizedDefensiveness * 4), 8, 85),
            stonewalling: clamp(Math.round(normalizedStonewalling * 4), 8, 85),
            contempt: clamp(Math.round(normalizedContempt * 4), 2, 60)
        };

        const finalGottman = {
            repair_receptivity: repairScore,
            emotional_safety_index: safetyIndex,
            risks: horsemenObj,
            four_horsemen_risk: horsemenObj
        };

        // 9. ADULT ATTACHMENT (ECR CONTINUOUS & DISCRETE)
        let primaryAttachment = "secure";
        if (attachment.anxious > attachment.secure && attachment.anxious >= attachment.avoidant) {
            primaryAttachment = "anxious";
        } else if (attachment.avoidant > attachment.secure && attachment.avoidant > attachment.anxious) {
            primaryAttachment = "avoidant";
        } else if (attachment.anxious > 12 && attachment.avoidant > 12 && attachment.secure < 20) {
            primaryAttachment = "fearful_avoidant";
        }

        const anxietyScore = clamp((attachment.anxious * 5) + (finalOcean.neuroticism * 0.3), 15, 92);
        const avoidanceScore = clamp((attachment.avoidant * 5) + ((100 - finalOcean.agreeableness) * 0.25), 15, 92);

        const finalAttachment = {
            primary: primaryAttachment,
            anxiety_score: anxietyScore,
            avoidance_score: avoidanceScore,
            scores: {
                secure: Math.round(attachment.secure * 10),
                anxious: Math.round(attachment.anxious * 10),
                avoidant: Math.round(attachment.avoidant * 10)
            }
        };

        // 10. SCHWARTZ THEORY OF BASIC HUMAN VALUES
        const schwartzTotal = Math.max(1, schwartz.tradition + schwartz.security + schwartz.self_direction + schwartz.benevolence + schwartz.hedonism + schwartz.achievement);
        const schwartzPercentages = {
            tradition: Math.round((schwartz.tradition / schwartzTotal) * 100),
            security: Math.round((schwartz.security / schwartzTotal) * 100),
            self_direction: Math.round((schwartz.self_direction / schwartzTotal) * 100),
            benevolence: Math.round((schwartz.benevolence / schwartzTotal) * 100),
            hedonism: Math.round((schwartz.hedonism / schwartzTotal) * 100),
            achievement: Math.round((schwartz.achievement / schwartzTotal) * 100)
        };
        const sortedSchwartz = Object.entries(schwartzPercentages).sort((a, b) => b[1] - a[1]);
        const topValues = sortedSchwartz.slice(0, 3).map(item => item[0]);

        const finalSchwartz = {
            top_values: topValues,
            scores: schwartzPercentages
        };

        // Communication Style (Compatibility backward compatibility)
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

        // Aesthetic profile
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

        // 11. CONSCIOUSNESS & EMOTIONAL GUIDANCE SPECTRUM (Hawkins & Hicks)
        let rawHawkins = 310; // Default Willingness/Optimism baseline
        if (consciousness_accum.hawkins_weight > 0) {
            rawHawkins = consciousness_accum.hawkins_weighted_sum / consciousness_accum.hawkins_weight;
        } else {
            // Anchor dynamically if awareness questions weren't answered directly
            const safeScore = (finalGottman.repair_receptivity || 70);
            const neuroPenalty = (finalOcean.neuroticism - 50) * 2;
            const agreeBonus = (finalOcean.agreeableness - 50) * 1.5;
            rawHawkins = 250 + (safeScore * 1.5) - neuroPenalty + agreeBonus;
        }
        const finalHawkinsScore = Math.max(30, Math.min(590, Math.round(rawHawkins)));

        let rawHicks = 6; // Default Hopefulness/Contentment baseline
        if (consciousness_accum.hicks_weight > 0) {
            rawHicks = consciousness_accum.hicks_weighted_sum / consciousness_accum.hicks_weight;
        } else {
            rawHicks = Math.max(1, Math.min(22, Math.round(22 - ((finalHawkinsScore - 30) / 560) * 21)));
        }
        const finalHicksScore = Math.max(1, Math.min(22, Math.round(rawHicks)));

        // Stress regression floor
        let stressFloor = consciousness_accum.stress_floor_loc;
        if (stressFloor === 600) {
            stressFloor = Math.max(30, Math.min(finalHawkinsScore, Math.round(finalHawkinsScore * 0.65)));
        }

        // Force vs Power ratio
        const totalConsciousResponses = consciousness_accum.force_weight + consciousness_accum.power_weight;
        const powerRatio = totalConsciousResponses > 0
            ? Math.round((consciousness_accum.power_weight / totalConsciousResponses) * 100)
            : (finalHawkinsScore >= 200 ? 80 : 35);

        // Hawkins metadata resolver
        let hawkinsLevelEn = "Reason (400)", hawkinsLevelAr = "المنطق والتبصر (400)";
        let hawkinsViewEn = "Wise / Meaningful", hawkinsViewAr = "حكيم وذو معنى عميق";
        if (finalHawkinsScore >= 540) {
            hawkinsLevelEn = "Joy & Serenity (540+)"; hawkinsLevelAr = "البهجة والسكينة (540+)";
            hawkinsViewEn = "One / Complete"; hawkinsViewAr = "حالة وحدة واكتمال تام";
        } else if (finalHawkinsScore >= 500) {
            hawkinsLevelEn = "Love & Reverence (500)"; hawkinsLevelAr = "المحبة والتقدير (500)";
            hawkinsViewEn = "Loving / Benign"; hawkinsViewAr = "محب ورحيم وكريم";
        } else if (finalHawkinsScore >= 400) {
            hawkinsLevelEn = "Reason & Understanding (400)"; hawkinsLevelAr = "المنطق والاستبصار (400)";
            hawkinsViewEn = "Wise / Meaningful"; hawkinsViewAr = "حكيم وذو مغزى";
        } else if (finalHawkinsScore >= 350) {
            hawkinsLevelEn = "Acceptance & Forgiveness (350)"; hawkinsLevelAr = "القبول والتسامح (350)";
            hawkinsViewEn = "Harmonious / Merciful"; hawkinsViewAr = "متناغم ومتسامح";
        } else if (finalHawkinsScore >= 310) {
            hawkinsLevelEn = "Willingness & Optimism (310)"; hawkinsLevelAr = "الاستعداد والتفاؤل (310)";
            hawkinsViewEn = "Hopeful / Cooperative"; hawkinsViewAr = "مفعم بالأمل ومتعاون";
        } else if (finalHawkinsScore >= 250) {
            hawkinsLevelEn = "Neutrality & Trust (250)"; hawkinsLevelAr = "الحياد والثقة (250)";
            hawkinsViewEn = "Satisfactory / Feasible"; hawkinsViewAr = "مُرضٍ ومريح";
        } else if (finalHawkinsScore >= 200) {
            hawkinsLevelEn = "Courage & Responsibility (200)"; hawkinsLevelAr = "الشجاعة والمسؤولية (200)";
            hawkinsViewEn = "Empowering / Feasible"; hawkinsViewAr = "مُمكِّن ومتاح";
        } else if (finalHawkinsScore >= 175) {
            hawkinsLevelEn = "Pride & Inflation (175)"; hawkinsLevelAr = "الكبرياء والدفاعية (175)";
            hawkinsViewEn = "Demanding / Righteous"; hawkinsViewAr = "استعلائي ومدعٍ للصواب";
        } else if (finalHawkinsScore >= 150) {
            hawkinsLevelEn = "Anger & Resentment (150)"; hawkinsLevelAr = "الغضب والاستياء (150)";
            hawkinsViewEn = "Frustrating / Vengeful"; hawkinsViewAr = "محبط وانتقامي";
        } else if (finalHawkinsScore >= 125) {
            hawkinsLevelEn = "Desire & Craving (125)"; hawkinsLevelAr = "الرغبة والتعلق (125)";
            hawkinsViewEn = "Insatiable / Dependent"; hawkinsViewAr = "شره وتعلّقي";
        } else if (finalHawkinsScore >= 100) {
            hawkinsLevelEn = "Fear & Anxiety (100)"; hawkinsLevelAr = "الخوف والقلق (100)";
            hawkinsViewEn = "Threatening / Fragile"; hawkinsViewAr = "مهدد وقلق";
        } else {
            hawkinsLevelEn = "Guilt & Contraction (<100)"; hawkinsLevelAr = "الشعور بالذنب والانكماش (<100)";
            hawkinsViewEn = "Tragic / Condemning"; hawkinsViewAr = "مأساوي وجالد للذات";
        }

        // Hicks 22-level scale metadata
        const HICKS_MAP = {
            1: { en: "Joy, Appreciation & Love", ar: "البهجة والامتنان والمحبة", tier_en: "High Alignment", tier_ar: "محاذاة اهتزازية عليا" },
            2: { en: "Passion & Creative Flow", ar: "الشغف والتدفق الإبداعي", tier_en: "High Alignment", tier_ar: "محاذاة اهتزازية عليا" },
            3: { en: "Enthusiasm & Eagerness", ar: "الحماس والبهجة", tier_en: "High Alignment", tier_ar: "محاذاة اهتزازية عليا" },
            4: { en: "Positive Expectation & Belief", ar: "التوقع الإيجابي واليقين", tier_en: "High Alignment", tier_ar: "محاذاة اهتزازية عليا" },
            5: { en: "Optimism", ar: "التفاؤل", tier_en: "Constructive Harmony", tier_ar: "تناغم بنّاء" },
            6: { en: "Hopefulness", ar: "الرجاء والأمل", tier_en: "Constructive Harmony", tier_ar: "تناغم بنّاء" },
            7: { en: "Contentment & Peace", ar: "الرضا والاطمئنان", tier_en: "Constructive Harmony", tier_ar: "تناغم بنّاء" },
            8: { en: "Boredom & Stagnation", ar: "الملل والركود", tier_en: "Resistance Threshold", tier_ar: "عتبة المقاومة" },
            9: { en: "Pessimism", ar: "التشاؤم", tier_en: "Resistance Threshold", tier_ar: "عتبة المقاومة" },
            10: { en: "Frustration & Impatience", ar: "الإحباط ونفاد الصبر", tier_en: "Reactive Friction", tier_ar: "احتكاك تفاعلي" },
            11: { en: "Overwhelment & Pressure", ar: "الاستثقال والضغط النفسي", tier_en: "Reactive Friction", tier_ar: "احتكاك تفاعلي" },
            12: { en: "Disappointment", ar: "خيبة الأمل", tier_en: "Contracted Resistance", tier_ar: "مقاومة منكمشة" },
            13: { en: "Doubt & Hesitation", ar: "الشك والتردد", tier_en: "Contracted Resistance", tier_ar: "مقاومة منكمشة" },
            14: { en: "Worry & Apprehension", ar: "القلق والتوجس", tier_en: "Contracted Resistance", tier_ar: "مقاومة منكمشة" },
            15: { en: "Blame & Resentment", ar: "اللوم والعتب", tier_en: "Severe Resistance", tier_ar: "مقاومة حادة" },
            16: { en: "Discouragement", ar: "التثبيط وضعف الهمة", tier_en: "Severe Resistance", tier_ar: "مقاومة حادة" },
            17: { en: "Anger", ar: "الغضب والاستثارة", tier_en: "Severe Resistance", tier_ar: "مقاومة حادة" },
            18: { en: "Revenge & Retaliation", ar: "الرغبة في رد الإساءة", tier_en: "Destructive Contraction", tier_ar: "انكماش مدمر" },
            19: { en: "Hatred & Rage", ar: "الحقد والغيظ", tier_en: "Destructive Contraction", tier_ar: "انكماش مدمر" },
            20: { en: "Jealousy & Envy", ar: "الغيرة والحسد", tier_en: "Destructive Contraction", tier_ar: "انكماش مدمر" },
            21: { en: "Insecurity & Guilt", ar: "انعدام الأمان والشعور بالذنب", tier_en: "Deep Powerlessness", tier_ar: "عجز عميق" },
            22: { en: "Fear, Despair & Powerlessness", ar: "الخوف واليأس والعجز", tier_en: "Deep Powerlessness", tier_ar: "عجز عميق" }
        };
        const hicksMeta = HICKS_MAP[finalHicksScore] || HICKS_MAP[6];

        const finalConsciousness = {
            hawkins: {
                score: finalHawkinsScore,
                level: hawkinsLevelEn,
                level_ar: hawkinsLevelAr,
                view_of_life: hawkinsViewEn,
                view_of_life_ar: hawkinsViewAr,
                is_above_200: finalHawkinsScore >= 200,
                domain: finalHawkinsScore >= 200 ? "Power" : "Force",
                domain_ar: finalHawkinsScore >= 200 ? "القوة الروحية البنّاءة" : "القوة القسرية الضاغطة",
                power_ratio: powerRatio
            },
            hicks: {
                level: finalHicksScore,
                state: hicksMeta.en,
                state_ar: hicksMeta.ar,
                tier: hicksMeta.tier_en,
                tier_ar: hicksMeta.tier_ar
            },
            stress_floor: {
                loc: stressFloor,
                is_above_200: stressFloor >= 200
            },
            pivot_agility: {
                score: Math.round(100 - (finalHicksScore * 3.5)),
                rating_en: finalHicksScore <= 6 ? "Rapid & Resilient" : (finalHicksScore <= 12 ? "Moderate" : "Rigid & Lingering"),
                rating_ar: finalHicksScore <= 6 ? "سريع ومرن" : (finalHicksScore <= 12 ? "متوسط" : "بطيء ومترسب")
            }
        };

        // 12. SYNTHESIS: MASLOW'S HIERARCHY OF NEEDS
        const mRawSomatic = Math.max(5, maslow_accum.somatic);
        const mRawSafety = Math.max(5, maslow_accum.safety);
        const mRawBelonging = Math.max(5, maslow_accum.belonging);
        const mRawEsteem = Math.max(5, maslow_accum.esteem);
        const mRawActualization = Math.max(5, maslow_accum.actualization);
        const mRawTranscendence = Math.max(5, maslow_accum.transcendence);

        const mTotal = mRawSomatic + mRawSafety + mRawBelonging + mRawEsteem + mRawActualization + mRawTranscendence;

        const mPctSomatic = Math.round((mRawSomatic / mTotal) * 100);
        const mPctSafety = Math.round((mRawSafety / mTotal) * 100);
        const mPctBelonging = Math.round((mRawBelonging / mTotal) * 100);
        const mPctEsteem = Math.round((mRawEsteem / mTotal) * 100);
        const mPctActualization = Math.round((mRawActualization / mTotal) * 100);
        const mPctTranscendence = Math.max(0, 100 - (mPctSomatic + mPctSafety + mPctBelonging + mPctEsteem + mPctActualization));

        const maslowTiers = {
            somatic: mPctSomatic,
            safety: mPctSafety,
            belonging: mPctBelonging,
            esteem: mPctEsteem,
            actualization: mPctActualization,
            transcendence: mPctTranscendence
        };

        // Determine Primary Need Center of Gravity
        const tierEntries = Object.entries(maslowTiers);
        tierEntries.sort((a, b) => b[1] - a[1]);
        const primaryTierKey = tierEntries[0][0];

        const MASLOW_NAMES = {
            somatic: { en: "Somatic Homeostasis & Biological Pacing", ar: "الاتزان الجسدي والتنظيم العصبي" },
            safety: { en: "Safety, Security & Predictability", ar: "الأمان والاستقرار المالي والتنظيمي" },
            belonging: { en: "Love, Belonging & Relational Closeness", ar: "الانتماء والمودة والقرب الوجداني" },
            esteem: { en: "Esteem, Mastery & Social Competence", ar: "التقدير والكفاءة والمكانة الاجتماعية" },
            actualization: { en: "Self-Actualization & Autonomy", ar: "تحقيق الذات والسيادة الفردية" },
            transcendence: { en: "Self-Transcendence & Purpose", ar: "التسامي عن الذات والرسالة المشتركة" }
        };

        const dNeedPct = mPctSomatic + mPctSafety + mPctBelonging + mPctEsteem;
        const bNeedPct = mPctActualization + mPctTranscendence;

        let needOrientationEn = "Balanced Integrative";
        let needOrientationAr = "توازن تكاملي مرن";
        if (dNeedPct >= 65) {
            needOrientationEn = "Deficiency & Security Anchored (D-Needs)";
            needOrientationAr = "مرتكز على الأمان وسد الاحتياج (D-Needs)";
        } else if (bNeedPct >= 38) {
            needOrientationEn = "Growth & Actualization Driven (B-Needs)";
            needOrientationAr = "مدفوع بالنمو وتحقيق الذات (B-Needs)";
        }

        const finalMaslow = {
            tiers: maslowTiers,
            primary_need: primaryTierKey,
            primary_need_en: MASLOW_NAMES[primaryTierKey].en,
            primary_need_ar: MASLOW_NAMES[primaryTierKey].ar,
            d_need_pct: dNeedPct,
            b_need_pct: bNeedPct,
            orientation_en: needOrientationEn,
            orientation_ar: needOrientationAr
        };

        // 13. SYNTHESIS: HUMAN DEVELOPMENT (KEGAN & BOWEN)
        let keganScore = developmental_accum.kegan_weight > 0
            ? (developmental_accum.kegan_weighted_sum / developmental_accum.kegan_weight)
            : (3.1 + (ocean.openness / 100) * 0.7 + (finalHawkinsScore >= 350 ? 0.4 : 0));
        keganScore = Math.max(2.0, Math.min(5.0, Math.round(keganScore * 10) / 10));

        let diffScore = developmental_accum.diff_weight > 0
            ? (developmental_accum.diff_weighted_sum / developmental_accum.diff_weight)
            : (2.8 + (ocean.conscientiousness / 100) * 0.7 + (finalAttachment.primary === "secure" ? 0.7 : -0.3));
        diffScore = Math.max(1.0, Math.min(5.0, Math.round(diffScore * 10) / 10));

        let keganStageEn = "Stage 3: Socialized Mind (Interpersonal)";
        let keganStageAr = "المرحلة 3: العقل الاجتماعي (الانتماء والولاء المشترك)";
        if (keganScore >= 4.6) {
            keganStageEn = "Stage 5: Self-Transforming Mind (Inter-individual)";
            keganStageAr = "المرحلة 5: العقل المتسامي والتحولي (الوعي التكاملي)";
        } else if (keganScore >= 3.8) {
            keganStageEn = "Stage 4: Self-Authoring Mind (Internal Compass)";
            keganStageAr = "المرحلة 4: العقل المستقل والمؤلف لذاته (السيادة النفسية)";
        } else if (keganScore >= 3.2) {
            keganStageEn = "Stage 3-to-4 Bridge (Differentiating)";
            keganStageAr = "جسر العبور (بين الانتماء والسيادة الذاتية)";
        } else if (keganScore >= 2.6) {
            keganStageEn = "Stage 3: Socialized Mind (Interpersonal)";
            keganStageAr = "المرحلة 3: العقل الاجتماعي (الانتماء والولاء المشترك)";
        } else {
            keganStageEn = "Stage 2: Instrumental Mind (Transactional)";
            keganStageAr = "المرحلة 2: العقل النفعي (المعاملات والحماية الذاتية)";
        }

        const finalDevelopmental = {
            kegan: {
                score: keganScore,
                stage_en: keganStageEn,
                stage_ar: keganStageAr
            },
            differentiation: {
                score: diffScore,
                level_en: diffScore >= 4.0 ? "High Sovereignty" : (diffScore >= 2.8 ? "Balanced Interdependence" : "Enmeshment / Low Differentiation"),
                level_ar: diffScore >= 4.0 ? "سيادة نفسية وتمايز عالي" : (diffScore >= 2.8 ? "ترابط متوازن ومرن" : "اندماجية وحساسية مفرطة")
            }
        };

        // 12B. MAJOR SEGMENTS FOR EACH MASLOW TIER (3 Core Segments Per Level)
        const maslowSegments = {
            transcendence: [
                {
                    key: "transpersonal_mission",
                    icon: "✨",
                    name_en: "Transpersonal Mission & Generational Legacy",
                    name_ar: "الرسالة المتعدية والأثر الخالد",
                    score: Math.round(clamp(0.45 * (finalOthers.religion_importance || 50) + 0.35 * keganScore * 20 + 0.2 * (mPctTranscendence * 6), 30, 98)),
                    desc_en: "Uniting as a couple around a noble cause larger than individual comfort, building a lasting righteous legacy.",
                    desc_ar: "توحيد جهود الزوجين حول رسالة سامية تتجاوز متعهما الخاصة لبناء أثر مبارك يمتد للأجيال القادمة.",
                    relational_en: "Transforms the marriage into an evolutionary powerhouse, giving daily challenges transcendent meaning and resilience.",
                    relational_ar: "يحول الزواج إلى مؤسسة رسالية ملهمة تمنح أعباء الحياة معنى وجودياً وتماسكاً يتجاوز كل الصعاب.",
                    action_en: "Formulate a shared Family Mission Statement defining the positive imprint you intend to leave on your community.",
                    action_ar: "صياغة ميثاق رسالة الأسرة المشترك لتحديد الأثر الإيجابي والخيري الذي يريد الزوجان غرسه في المجتمع."
                },
                {
                    key: "altruistic_service",
                    icon: "🌱",
                    name_en: "Altruism & Generative Compassion",
                    name_ar: "العطاء المجتمعي والإيثار المبارك",
                    score: Math.round(clamp(0.5 * finalOcean.agreeableness + 0.3 * (finalOthers.marriage_commitment || 50) + 0.2 * (mPctTranscendence * 6), 35, 98)),
                    desc_en: "Selfless generosity, mentoring younger generations, uplifting those in need, and living an outward-facing compassionate life.",
                    desc_ar: "البذل والإيثار وخدمة الضعفاء وتوجيه الأجيال الناشئة والعيش بروح الرحمة والتكافل الاجتماعي.",
                    relational_en: "Directs relational energy outward in service, eliminating petty domestic quarrels through shared noble contribution.",
                    relational_ar: "توجيه طاقة الزوجين نحو نفع الناس، مما يصغر الخلافات اليومية أمام عظمة العطاء المشترك.",
                    action_en: "Adopt a shared charitable project or community mentoring initiative that you actively nurture together.",
                    action_ar: "تبني مشروع خيري أو مبادرة تطوعية مجتمعية يعمل الشريكان على رعايتها وتطويرها سوياً."
                },
                {
                    key: "spiritual_unity",
                    icon: "🌌",
                    name_en: "Spiritual Unity & Sacred Meaning",
                    name_ar: "الوحدة الروحية والمعنى الوجودي",
                    score: Math.round(clamp(0.45 * (finalHawkinsScore / 6) + 0.35 * (finalOthers.religion_importance || 50) + 0.2 * (mPctTranscendence * 6), 30, 98)),
                    desc_en: "Shared spiritual consciousness, experiences of awe, sacred reverence, and inner peace in the presence of the Divine.",
                    desc_ar: "السكينة الروحية المشتركة واستشعار المعية الإلهية والعيش بخشوع وسلام وجودي عميق.",
                    relational_en: "Anchors the couple in an eternal spiritual bond where physical and emotional companionship is crowned with spiritual harmony.",
                    relational_ar: "يربط الزوجين برباط روحي خالد تتكامل فيه المودة الأرضية مع السكينة الإيمانية العلوية.",
                    action_en: "Practice shared contemplative moments, spiritual study, or prayers together to renew sacred reverence and peace.",
                    action_ar: "الحرص على جلسات تفكر وذكر ودعاء مشترك لتجديد الهدوء الروحي وربط الأسرة بالمعاني المقدسة."
                }
            ],
            actualization: [
                {
                    key: "authentic_alignment",
                    icon: "🧭",
                    name_en: "Authenticity & Core Values Alignment",
                    name_ar: "الأصالة والعيش وفق بوصلة المبادئ",
                    score: Math.round(clamp(0.45 * finalOcean.openness + 0.35 * keganScore * 20 + 0.2 * (mPctActualization * 5), 35, 98)),
                    desc_en: "Living in congruence with one's highest moral and existential convictions rather than conforming to social scripts.",
                    desc_ar: "التطابق التام بين المبادئ الداخلية والسلوك العملي، والعيش بصدق وأمانة بعيداً عن الأقنعة الاجتماعية.",
                    relational_en: "Creates an authentic union of two genuine souls who love each other for who they truly are, not false personas.",
                    relational_ar: "يخلق زواجاً حقيقياً بين روحين صادقتين تحبان بعضهما على الحقيقة دون تزييف أو ادعاء.",
                    action_en: "Engage in regular deep reflections on your family core values, aligning decisions with what truly matters to your souls.",
                    action_ar: "مراجعة بوصلة القيم الأسرية بانتظام والتأكد من أن نمط حياتكما يجسد ما تؤمنان به حقاً."
                },
                {
                    key: "creative_growth",
                    icon: "🎨",
                    name_en: "Creative Potential & Intellectual Expansion",
                    name_ar: "الإبداع وتنمية الإمكانات الكامنة",
                    score: Math.round(clamp(0.5 * finalOcean.openness + 0.3 * (finalOthers.marriage_growth || 50) + 0.2 * (mPctActualization * 5), 35, 98)),
                    desc_en: "Cultivating artistic, intellectual, or entrepreneurial gifts; embracing lifelong curiosity and continuous evolution.",
                    desc_ar: "تفجير الطاقات الإبداعية والفكرية وشغف التعلم المستمر واكتشاف مواهب جديدة في مختلف مراحل العمر.",
                    relational_en: "Keeps the marriage intellectually stimulating and ever-evolving, preventing boredom and marital stagnation.",
                    relational_ar: "يجدد روح الحيوية والشغف الفكري في الزواج، ويمنع الرتابة والملل من التسلل للحياة المشتركة.",
                    action_en: "Encourage independent creative hobbies, reading, or new intellectual pursuits, dedicating time for partner self-expansion.",
                    action_ar: "تشجيع الشريك على ممارسة هواياته الإبداعية والقراءة والتعلم، وتوفير الوقت اللازم لنموه الشخصي."
                },
                {
                    key: "personal_sovereignty",
                    icon: "🕊️",
                    name_en: "Personal Sovereignty & Autonomous Freedom",
                    name_ar: "السيادة الفردية والاستقلال الفكري",
                    score: Math.round(clamp(0.45 * (finalOthers.boundaries_independence || 50) + 0.35 * diffScore * 20 + 0.2 * (mPctActualization * 5), 35, 98)),
                    desc_en: "Possessing an internal locus of control and psychological sovereignty that enables loving partnership without enmeshment.",
                    desc_ar: "امتلاك استقلالية فكرية ونفسية ناضجة تتيح بناء شراكة محبة دون ذوبان مرضي أو تبعية خانقة.",
                    relational_en: "Allows differentiation: two autonomous adults holding hands, walking in the same direction with mutual freedom.",
                    relational_ar: "يحقق مفهوم التمايز النفسي: شخصان ناضجان ومستقلان يسيران معاً في درب الحياة بحرية واختيار واعٍ.",
                    action_en: "Honor partner solitude and individual perspectives without perceiving differences as threats to marital intimacy.",
                    action_ar: "احترام حق الشريك في مساحته الخاصة ورؤيته المستقلة دون اعتبار الاختلاف تهديداً لمودة الزواج."
                }
            ],
            esteem: [
                {
                    key: "self_worth_dignity",
                    icon: "👑",
                    name_en: "Self-Worth, Dignity & Inner Sovereignty",
                    name_ar: "عزة النفس والكرامة الذاتية",
                    score: Math.round(clamp(0.45 * (100 - finalOcean.neuroticism) + 0.35 * diffScore * 20 + 0.2 * (mPctEsteem * 4.5), 35, 98)),
                    desc_en: "Robust self-respect, moral dignity, and healthy pride that does not depend on partner validation for survival.",
                    desc_ar: "احترام الذات والكرامة الأخلاقية والشعور بالقيمة الشخصية المستقلة عن استحسان الآخرين.",
                    relational_en: "Prevents needy insecurity, groveling, or passive-aggressive entitlement, enabling an equal partnership of equals.",
                    relational_ar: "يمنع الاستجداء العاطفي أو التنازل عن الكرامة، ويتيح قيام شراكة ناضجة بين ندين محترمين.",
                    action_en: "Never use belittling or dismissive sarcasm; actively affirm each other's inherent personal worth and voice.",
                    action_ar: "الابتعاد التام عن التهكم والتقليل، وتأكيد احترام رأي الشريك وقيمته الإنسانية في كل مناسبة."
                },
                {
                    key: "competence_mastery",
                    icon: "🏆",
                    name_en: "Competence, Mastery & Achievement",
                    name_ar: "الكفاءة والإتقان والإنجاز",
                    score: Math.round(clamp(0.45 * (finalOthers.career_ambition || 50) + 0.35 * finalOcean.conscientiousness + 0.2 * (mPctEsteem * 4.5), 35, 98)),
                    desc_en: "Cultivating expertise, solving complex life challenges, fulfilling career and intellectual goals with excellence.",
                    desc_ar: "تطوير المهارات وتجاوز التحديات الحياتية والنجاح المهني والفكري بروح الإتقان والتميز.",
                    relational_en: "Builds mutual admiration and trust in each other's capability to steer the family vessel through life's storms.",
                    relational_ar: "يولد الإعجاب المتبادل والثقة العميقة في قدرة الشريك على إدارة الأزمات وقيادة دفة الحياة باقتدار.",
                    action_en: "Actively support and celebrate each other's professional and personal milestones, investing in partner skill growth.",
                    action_ar: "تشجيع ودعم أهداف الشريك المهنية وتوفير البيئة المناسبة لتفوقه والاحتفاء بنجاحاته."
                },
                {
                    key: "mutual_admiration",
                    icon: "🌟",
                    name_en: "Mutual Admiration & Partner Validation",
                    name_ar: "الاحترام المتبادل والاعتراف بالجهد",
                    score: Math.round(clamp(0.45 * (finalOthers.career_support || 50) + 0.35 * finalOcean.agreeableness + 0.2 * (mPctEsteem * 4.5), 35, 98)),
                    desc_en: "Public and private recognition of each other's strengths, wisdom, hard work, and moral character.",
                    desc_ar: "الاعتراف الصادق بجهود الشريك ومناقبه وفضائله أمام الأبناء والأهل والثناء على إسهاماته الكريمة.",
                    relational_en: "Makes partners feel deeply valued, respected, and motivated to give their very best to the marriage.",
                    relational_ar: "يشعر الشريك بجدارته وقيمته داخل الأسرة، ويحفزه على بذل أقصى جهده للعطاء والتفاني.",
                    action_en: "Give explicit vocal credit for the partner's sacrifices, both privately and in the presence of family and children.",
                    action_ar: "إبراز فضل الشريك وشكره علناً أمام الأهل والأبناء وتجنب نكران المجهود أو اعتباره تحصيل حاصل."
                }
            ],
            belonging: [
                {
                    key: "emotional_intimacy",
                    icon: "💖",
                    name_en: "Deep Emotional Intimacy & Attunement",
                    name_ar: "القرب الوجداني والتواصل العميق",
                    score: Math.round(clamp(0.4 * (finalOthers.emotional_empathy || 50) + 0.35 * (100 - (finalAttachment.avoidance || 30)) + 0.25 * (mPctBelonging * 4.5), 30, 98)),
                    desc_en: "Deep heart-to-heart sharing, feeling truly understood, empathic tuning into each other's emotional worlds.",
                    desc_ar: "المشاركة الوجدانية الصادقة، والشعور بأن الشريك يفهم أعماق النفس ويستجيب للمشاعر بصدق واهتمام.",
                    relational_en: "Prevents emotional isolation and loneliness, binding the couple into an intimate emotional sanctuary.",
                    relational_ar: "يقضي على الوحشة والجفاف العاطفي، ويجعل العلاقة ملاذاً حميماً يشعر فيه الطرفان باكتمال الأنس.",
                    action_en: "Spend 15 minutes every evening asking curious, non-judgmental open questions about each other's inner state.",
                    action_ar: "تخصيص 15 دقيقة يومياً لحوار وجداني هادئ يسأل فيه كل طرف عن مشاعر الآخر وهمومه باهتمام خالص."
                },
                {
                    key: "unconditional_acceptance",
                    icon: "🫂",
                    name_en: "Unconditional Acceptance & Tender Warmth",
                    name_ar: "الدفء والقبول غير المشروط",
                    score: Math.round(clamp(0.45 * finalOcean.agreeableness + 0.35 * (finalOthers.emotional_comforting || 50) + 0.2 * (mPctBelonging * 4.5), 35, 98)),
                    desc_en: "Embracing each other's quirks, flaws, and vulnerabilities with tenderness rather than conditional approval.",
                    desc_ar: "تقبل الشريك كما هو بمحاسنه وعيوبه، ومنحه الدفء والتقدير دون شروط تعجيزية أو محاولات تشكيل قسري.",
                    relational_en: "Dissolves performance anxiety and shame, allowing both partners to relax into their most authentic selves.",
                    relational_ar: "ينزع قلق إثبات الجدارة والخوف من الرفض، مما يسمح للشريكين بالعيش بعفوية واطمئنان كامل.",
                    action_en: "Express three specific moments of gratitude or affection daily, focusing on who the partner is, not just what they do.",
                    action_ar: "التعبير اليومي عن ثلاث لمسات امتنان ومودة تركز على محبة ذات الشريك وليس فقط ما ينجزه."
                },
                {
                    key: "shared_rituals",
                    icon: "☕",
                    name_en: "Companionship & Connection Rituals",
                    name_ar: "المؤانسة والطقوس المشتركة",
                    score: Math.round(clamp(0.4 * (finalOthers.marriage_growth || 50) + 0.35 * finalOcean.extroversion + 0.25 * (mPctBelonging * 4.5), 35, 98)),
                    desc_en: "Daily and weekly shared micro-rituals (morning coffee, date nights, shared humor) fostering joyous friendship.",
                    desc_ar: "الطقوس اليومية والأسبوعية المحببة (قهوة الصباح، موعد أسبوعي، الضحك المشترك) التي تبني صداقة متينة.",
                    relational_en: "Replenishes the couple's Emotional Bank Account and keeps passion and companionship vibrant through all seasons.",
                    relational_ar: "يغذي الرصيد العاطفي المشترك باستمرار، ويبقي جذوة الصداقة والمرح متقدة وسط أعباء الحياة.",
                    action_en: "Protect an unmissable weekly date night dedicated solely to romance, fun, and couple recreation.",
                    action_ar: "الالتزام بموعد أسبوعي ثابت ومقدس مخصص للمتعة وتجديد الرومانسية والاستمتاع المشترك دون عمل أو أطفال."
                }
            ],
            safety: [
                {
                    key: "financial_predictability",
                    icon: "🛡️",
                    name_en: "Financial Predictability & Resource Prudence",
                    name_ar: "الأمان المالي وإدارة الموارد بحكمة",
                    score: Math.round(clamp(0.45 * (finalOthers.religion_finances || 50) + 0.35 * finalOcean.conscientiousness + 0.2 * (mPctSafety * 4.5), 35, 98)),
                    desc_en: "Prudent budget management, emergency reserves, and transparent alignment on spending and long-term saving.",
                    desc_ar: "إدارة المصروفات بحكمة وبناء مدخرات للطوارئ والشفافية التامة في خطط الإنفاق والاستثمار المستقبلي.",
                    relational_en: "Eliminates financial anxiety—one of the primary instigators of marital breakdown—creating peace of mind.",
                    relational_ar: "ينزع فتيل القلق المالي الذي يعد أكبر مهدد لاستقرار البيوت، ويمنح الأسرة طمأنينة معيشية مستدامة.",
                    action_en: "Conduct a monthly low-stress financial sync to review household goals, celebrate milestones, and agree on major purchases.",
                    action_ar: "عقد جلسة مراجعة مالية شهرية ودية لتنسيق الميزانية والاحتفال بالإنجازات والاتفاق المسبق على النفقات الكبيرة."
                },
                {
                    key: "emotional_safety",
                    icon: "🔒",
                    name_en: "Emotional Safety & Non-Threatening Space",
                    name_ar: "الأمان النفسي والاحتواء الآمن",
                    score: Math.round(clamp(0.4 * (100 - (finalAttachment.anxiety || 30)) + 0.35 * (100 - finalOcean.neuroticism) + 0.25 * (mPctSafety * 4.5), 30, 98)),
                    desc_en: "Freedom from harsh contempt, threats of abandonment, ridicule, or weaponizing vulnerabilities during disagreement.",
                    desc_ar: "انعدام التهديد بالانفصال أو السخرية أو استخدام نقاط الضعف ضد الشريك عند حدوث أي خلاف.",
                    relational_en: "Forms the bedrock where genuine vulnerability, deep trust, and honest self-expression can safely unfold.",
                    relational_ar: "حجر الأساس الذي يسمح بالبوح الصادق وإظهار الضعف البشري دون خوف من العقاب أو التقليل.",
                    action_en: "Ban the Four Horsemen (criticism, contempt, defensiveness, stonewalling) and guarantee absolute relational loyalty.",
                    action_ar: "إقصاء فرسان الهلاك (النقد، الازدراء، الدفاعية، الانغلاق) والتأكيد الدائم على أن الخلاف لا يمس رابط المودة."
                },
                {
                    key: "domestic_order",
                    icon: "🏡",
                    name_en: "Domestic Order & External Boundary Clarity",
                    name_ar: "النظام المنزلي وحماية الحدود الأسرية",
                    score: Math.round(clamp(0.5 * finalOcean.conscientiousness + 0.3 * (finalOthers.boundaries_independence || 50) + 0.2 * (mPctSafety * 4.5), 35, 98)),
                    desc_en: "Predictable domestic responsibilities, clean living sanctuary, and firm boundaries against intrusive external interference.",
                    desc_ar: "وضوح الأدوار والمسؤوليات المنزلية، وحفظ خصوصية عش الزوجية بحزم ضد أي تدخلات خارجية مقتحمة.",
                    relational_en: "Shields the marriage from chaos and extended family friction, preserving the home as a serene refuge.",
                    relational_ar: "يحمي الأسرة من الفوضى والتدخلات المربكة، ويجعل المنزل واحة أمان واستقرار نفسي للشريكين.",
                    action_en: "Agree on explicit household division of responsibilities and a united front regarding in-laws and external demands.",
                    action_ar: "تحديد أدوار منزلية متفق عليها بوضوح، وتكوين جبهة موحدة تحمي قرارات الزوجين الخاصة من الضغوط الخارجية."
                }
            ],
            somatic: [
                {
                    key: "rest_recovery",
                    icon: "💤",
                    name_en: "Rest, Sleep & Somatic Recovery",
                    name_ar: "الراحة والنوم والتعافي الحيوي",
                    score: Math.round(clamp(0.4 * (finalOthers.worklife_balance || 50) + 0.3 * (100 - finalOcean.neuroticism) + 0.3 * (mPctSomatic * 5), 35, 98)),
                    desc_en: "Adequate physiological downtime, deep restorative sleep, and protecting the body from chronic physical exhaustion.",
                    desc_ar: "كفاية النوم العميق وتجديد الطاقة البدنية وحماية الجسد من الإرهاق التراكمي وتفريغ الإجهاد اليومي.",
                    relational_en: "Exhaustion triggers emotional reactivity and short tempers. A well-rested partner brings patience and gentleness to interactions.",
                    relational_ar: "الإنهاك الجسدي يسبب سرعة الانفعال وضيق الصدر. حماية راحة الشريك توفر الطاقة الوجدانية للرفق والاحتواء.",
                    action_en: "Establish a non-negotiable 30-minute tech-free evening wind-down routine without high-stakes marital debates before bed.",
                    action_ar: "اعتماد روتين مسائي هادئ قبل النوم بـ 30 دقيقة خالٍ من الشاشات وتجنب فتح النقاشات الحساسة وقت الإرهاق."
                },
                {
                    key: "nervous_regulation",
                    icon: "🌿",
                    name_en: "Nervous System Grounding & De-escalation",
                    name_ar: "تنظيم الجهاز العصبي وتفريغ التوتر",
                    score: Math.round(clamp(0.5 * (finalOthers.emotional_regulation || 50) + 0.3 * (100 - finalOcean.neuroticism) + 0.2 * (mPctSomatic * 5), 30, 98)),
                    desc_en: "Capacity to down-regulate sympathetic fight-or-flight arousal and restore internal calm during interpersonal stress.",
                    desc_ar: "القدرة على تهدئة استثارة الجهاز العصبي والعودة السريعة لحالة السكينة الداخلية عند مواجهة الضغوط.",
                    relational_en: "Allows partners to co-regulate rather than trigger mutual defensive escalation when tensions arise.",
                    relational_ar: "يمكن الشريكين من تهدئة بعضهما البعض (Co-regulation) بدلاً من تبادل الاستفزاز والانفعال الدفاعي.",
                    action_en: "Take a 20-minute physiological pause (deep diaphragmatic breathing, walk, cool water) when emotional flooding begins.",
                    action_ar: "أخذ استراحة بيولوجية لمدة 20 دقيقة (تنفس عميق، شرب ماء بارد، حركة خفيفة) عند الشعور بفيضان المشاعر."
                },
                {
                    key: "vitality_rhythm",
                    icon: "⚡",
                    name_en: "Vitality, Pacing & Sensory Ease",
                    name_ar: "الحيوية البدنية والتناغم الحركي",
                    score: Math.round(clamp(0.4 * (100 - (finalOthers.worklife_balance || 50) * 0.15) + 0.3 * finalOcean.extroversion + 0.3 * (mPctSomatic * 5), 35, 96)),
                    desc_en: "Daily rhythm of wholesome nourishment, physical movement, and sensory comfort in the home environment.",
                    desc_ar: "التغذية المتوازنة والحركة اليومية وتهيئة بيئة معيشية مريحة حسياً تعزز النشاط والانشراح.",
                    relational_en: "Synchronized activity levels and sensory comfort prevent mismatched domestic pacing and sluggish resentment.",
                    relational_ar: "تناغم وتيرة النشاط المشترك والبيئة المنزلية المريحة يحفظ الحيوية ويمنع التباعد والكسل المنزلي.",
                    action_en: "Schedule regular joint walks, wholesome shared meals, and optimize the home's lighting and noise levels for calm.",
                    action_ar: "تخصيص وقت يومي للمشي المشترك أو وجبة متوازنة، وتحسين إضاءة وهدوء المنزل لطرد التوتر الحسي."
                }
            ]
        };
        finalMaslow.segments = maslowSegments;

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

        // Return Complete Unified Profile
        return {
            // Core Legacy Traits (for full backwards compatibility)
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
            conflict: {
                primary: finalTki.primary,
                scores: {
                    collaborating: finalTki.scores.collaborating,
                    avoiding: finalTki.scores.avoiding,
                    competing: finalTki.scores.competing,
                    compromising: finalTki.scores.compromising
                }
            },
            decision_style: decision_style,
            love_languages: {
                primary: primaryLoveLang,
                scores: loveLangScores
            },
            values_and_lifestyle: finalOthers,
            aesthetic_profile: aesthetic_profile,
            ideology_profile: ideologyPercentages,
            assessment_confidence: clamp(calculatedConfidence, 15, 98),

            // --- MULTI-FRAMEWORK EXTENSIONS ---

            hartman: finalHartman,
            disc: finalDisc,
            birkman: finalBirkman,
            firo_b: finalFiro,
            tki_conflict: finalTki,
            gottman_safety: finalGottman,
            attachment_ecr: finalAttachment,
            schwartz_values: finalSchwartz,
            consciousness: finalConsciousness,
            maslow_profile: finalMaslow,
            developmental_profile: finalDevelopmental
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
