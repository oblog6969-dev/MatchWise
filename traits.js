/**
 * MatchWise Lite v2.5.2
 * traits.js - Multi-Framework Psychometric & Behavioral Scoring Engine
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
            assessment_confidence: clamp(calculatedConfidence, 65, 96),

            // --- MULTI-FRAMEWORK EXTENSIONS ---
            hartman: finalHartman,
            disc: finalDisc,
            birkman: finalBirkman,
            firo_b: finalFiro,
            tki_conflict: finalTki,
            gottman_safety: finalGottman,
            attachment_ecr: finalAttachment,
            schwartz_values: finalSchwartz
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
