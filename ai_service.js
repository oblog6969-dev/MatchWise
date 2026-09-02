/**
 * MatchWise Lite v2.0 AI Service
 * Powered by DeepSeek Pro / Gemini / OpenAI / Groq
 * Orchestrates multi-framework adaptive testing, psychometric convergence,
 * single profile qualitative analysis, and deep dyadic compatibility consultation.
 */

class AIService {
    constructor() {
        const getStored = (k) => (typeof localStorage !== "undefined" ? localStorage.getItem(k) : null);
        this.provider = getStored("mw_ai_provider") || "deepseek"; // "deepseek", "deepseek-ai/deepseek-v4-flash", "gemini", "openai", "groq"
        this.apiKey = getStored("mw_ai_key") || "YOUR_API_KEY_HERE";
    }

    setConfiguration(provider, apiKey) {
        if (provider) {
            this.provider = provider;
            if (typeof localStorage !== "undefined") localStorage.setItem("mw_ai_provider", provider);
        }
        if (apiKey) {
            this.apiKey = apiKey;
            if (typeof localStorage !== "undefined") localStorage.setItem("mw_ai_key", apiKey);
        }
    }

    /**
     * Adaptive Question Determination via DeepSeek Pro
     * Analyzes emerging 10-framework psychometric state to pick or generate optimal next question.
     */
    async determineNextQuestion(currentHistory, currentAnswers, allQuestions, currentLanguage) {
        // Calculate intermediate multi-framework traits
        let currentProfile = {};
        try {
            if (window.PersonalityEngine) {
                currentProfile = window.PersonalityEngine.calculate(currentAnswers, allQuestions);
            }
        } catch (err) {
            console.warn("PersonalityEngine calculation skipped for prompt:", err);
        }

        const askedCount = Object.keys(currentAnswers).length;
        const remainingQuestions = allQuestions.filter(q => !currentAnswers[q.id]);

        const prompt = `You are an expert psychometrician and relationship psychologist AI (DeepSeek Pro).
You are administering an AI-assisted adaptive compatibility assessment in ${currentLanguage === 'ar' ? 'Arabic' : 'English'}.
We assess 10 clinical and behavioral frameworks simultaneously:
1. Dr. Taylor Hartman Color Code (Core Motives: Red/Power, Blue/Intimacy, White/Peace, Yellow/Fun)
2. DISC Assessment (Pace: Fast vs. Deliberate, Focus: Task vs. People)
3. The Birkman Method (Usual Style, Underlying Needs, Stress Triggers)
4. FIRO-B (Inclusion, Control, Affection: Expressed vs. Wanted)
5. Thomas-Kilmann Conflict Mode (TKI: Competing, Collaborating, Compromising, Avoiding, Accommodating)
6. Gottman Sound Relationship House (Four Horsemen: Criticism, Contempt, Defensiveness, Stonewalling; Repair Receptivity)
7. Adult Attachment Theory (ECR: Secure, Anxious, Avoidant)
8. Schwartz Basic Human Values (Tradition, Security, Self-Direction, Benevolence, Hedonism, Achievement)
9. Big Five (OCEAN)
10. Gary Chapman 5 Love Languages

The user has answered ${askedCount} questions so far:
User Answers:
${JSON.stringify(currentAnswers, null, 2)}

Current Psychometric Convergence State:
- Hartman Core Motive: ${currentProfile.hartman?.primary || "Pending"}
- DISC Style: ${currentProfile.disc?.primary || "Pending"} (${currentProfile.disc?.pace || "Pending"})
- Birkman Underlying Need: ${currentProfile.birkman?.underlying_need || "Pending"}
- Attachment Style: ${currentProfile.attachment?.primary || "Pending"}
- Conflict Style (TKI): ${currentProfile.conflict?.primary || "Pending"}

Here are the remaining available questions in the database:
${JSON.stringify(remainingQuestions.slice(0, 30).map(q => ({
    id: q.id,
    category: q.category,
    trait: q.trait,
    text: currentLanguage === 'ar' ? q.arabic.text : q.english.text
})), null, 2)}

TASK:
1. If the user has reached 40+ questions and their psychometric convergence across the 10 frameworks is clear, complete the test:
   Return: {"next_id": null}
2. Review if there is an ambiguity (e.g., conflicting signals between conflict style and stress reactions, or unclear attachment boundary).
   Select the single most diagnostic question ID from the database:
   Return: {"next_id": "question_id_from_database"}
3. If the database lacks a question specifically probing an identified psychological blindspot or contradiction, GENERATE a new multi-factor scenario question:
   Return:
   {
     "next_id": "NEW",
     "new_question": {
       "id": "ai_gen_${Date.now()}",
       "category": "Personality / Conflict / Communication / Values",
       "type": "scenario",
       "weight": 1.5,
       "english": { "text": "Realistic relationship scenario in English" },
       "arabic": { "text": "Realistic relationship scenario in Arabic" },
       "options": [
         {
           "id": "opt1",
           "english": "Option 1 text",
           "arabic": "نص الخيار الأول",
           "trait_scores": {
             "hartman_red": 2.5,
             "disc_d": 2.0,
             "birkman_usual_assertive": 2.0,
             "birkman_need_structure": 1.5,
             "firo_exp_ctrl": 2.0,
             "tki_competing": 1.5
           }
         },
         {
           "id": "opt2",
           "english": "Option 2 text",
           "arabic": "نص الخيار الثاني",
           "trait_scores": {
             "hartman_blue": 2.5,
             "disc_s": 2.0,
             "birkman_need_empathy": 2.5,
             "firo_wnt_aff": 2.5,
             "attachment_secure": 2.0,
             "gottman_repair_receptivity": 2.0
           }
         },
         {
           "id": "opt3",
           "english": "Option 3 text",
           "arabic": "نص الخيار الثالث",
           "trait_scores": {
             "hartman_white": 2.5,
             "disc_s": 2.0,
             "birkman_need_freedom": 2.0,
             "birkman_stress_withdrawing": 2.0,
             "gottman_stonewalling_risk": 1.5,
             "tki_avoiding": 2.0
           }
         }
       ]
     }
   }
4. If the standard path is sufficient:
   Return: {"next_id": "STANDARD"}

Return ONLY the raw valid JSON object.`;

        try {
            const responseText = await this.callAI(prompt);
            const jsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
            const result = JSON.parse(jsonStr);
            return result;
        } catch (error) {
            console.error("AI Error determining next question:", error);
            return { next_id: "STANDARD" };
        }
    }

    /**
     * Deep Multi-Framework Individual Report Analysis
     */
    async analyzeReport(userProfile, currentLanguage) {
        const prompt = `You are a world-class relationship psychologist analyzing an individual's comprehensive 10-framework psychometric report.
Language: ${currentLanguage === 'ar' ? 'Arabic' : 'English'}. YOU MUST WRITE YOUR ENTIRE ANALYSIS IN ${currentLanguage === 'ar' ? 'ARABIC' : 'ENGLISH'}.

The user's psychometric profile:
${JSON.stringify({
    name: userProfile.owner_name,
    gender: userProfile.gender,
    big_five: userProfile.calculated_personality?.big_five,
    hartman: userProfile.calculated_personality?.hartman,
    disc: userProfile.calculated_personality?.disc,
    birkman: userProfile.calculated_personality?.birkman,
    firo_b: userProfile.calculated_personality?.firo_b,
    conflict_tki: userProfile.calculated_personality?.tki_conflict,
    gottman_safety: userProfile.calculated_personality?.gottman_safety,
    attachment: userProfile.calculated_personality?.attachment_ecr,
    schwartz_values: userProfile.calculated_personality?.schwartz_values,
    love_languages: userProfile.calculated_personality?.love_languages
}, null, 2)}

Provide a deeply insightful, compassionate, and precise psychological analysis.
Format your output as a raw JSON object matching this schema:
{
  "coreMotiveAnalysis": "1-2 paragraphs detailing their Hartman core motive fuel, strengths, and interpersonal blind spots",
  "operatingManual": {
    "naturalStyle": "How they appear outwardly in daily life",
    "hiddenNeeds": "What they secretly need from a partner to feel safe and respected (Birkman)",
    "stressReaction": "How they behave defensively when depleted or triggered",
    "howToDeescalate": "Concrete advice for their partner on how to restore calm"
  },
  "conflictAndSafety": "Insight into their TKI conflict mode and Gottman emotional safety radar",
  "attachmentProfile": "Analysis of their attachment security and emotional intimacy patterns",
  "positiveTraits": ["strength 1", "strength 2", "strength 3", "strength 4"],
  "growthAreas": ["growth area 1", "growth area 2", "growth area 3"],
  "watchouts": ["red flag or vulnerability watchout 1", "watchout 2"]
}`;

        try {
            const responseText = await this.callAI(prompt);
            const jsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(jsonStr);
        } catch (error) {
            console.error("AI Error analyzing report:", error);
            return null;
        }
    }

    /**
     * AI-Assisted Dyadic (2-Report) Compatibility Consultation
     * Performs cross-framework dyadic synthesis powered by DeepSeek Pro.
     */
    async compareProfilesWithAI(profileA, profileB, currentLanguage) {
        const prompt = `You are a clinical marital and relationship psychologist AI (DeepSeek Pro) conducting a deep dyadic compatibility consultation.
Language: ${currentLanguage === 'ar' ? 'Arabic' : 'English'}. YOU MUST WRITE YOUR ANALYSIS IN ${currentLanguage === 'ar' ? 'ARABIC' : 'ENGLISH'}.

Profile A (${profileA.owner_name}):
${JSON.stringify({
    name: profileA.owner_name,
    gender: profileA.gender,
    hartman: profileA.calculated_personality?.hartman,
    disc: profileA.calculated_personality?.disc,
    birkman: profileA.calculated_personality?.birkman,
    firo_b: profileA.calculated_personality?.firo_b,
    conflict: profileA.calculated_personality?.tki_conflict,
    gottman: profileA.calculated_personality?.gottman_safety,
    attachment: profileA.calculated_personality?.attachment_ecr,
    schwartz: profileA.calculated_personality?.schwartz_values
}, null, 2)}

Profile B (${profileB.owner_name}):
${JSON.stringify({
    name: profileB.owner_name,
    gender: profileB.gender,
    hartman: profileB.calculated_personality?.hartman,
    disc: profileB.calculated_personality?.disc,
    birkman: profileB.calculated_personality?.birkman,
    firo_b: profileB.calculated_personality?.firo_b,
    conflict: profileB.calculated_personality?.tki_conflict,
    gottman: profileB.calculated_personality?.gottman_safety,
    attachment: profileB.calculated_personality?.attachment_ecr,
    schwartz: profileB.calculated_personality?.schwartz_values
}, null, 2)}

Analyze their dynamic across:
1. Hartman Motive & DISC Pace Synergy
2. Birkman Cross-Need Satisfaction (Does A's normal behavior trigger B's stress, or vice-versa?)
3. FIRO-B Leadership & Closeness Dynamic (Power balance)
4. Gottman & Attachment Conflict Loop (Pursuer-distancer, stonewalling vs. criticism)
5. Actionable Bridge Scripts (Verbatim sentence starters for difficult conversations)

Return ONLY a raw JSON object with this exact structure:
{
  "executiveSummary": "Deep 2-paragraph overview of their overall relational synergy and friction points",
  "motiveAndPaceDynamic": "Analysis of their Hartman colors and DISC speeds interacting together",
  "crossNeedCollision": "Analysis of their Birkman hidden needs and potential triggers",
  "leadershipAndPower": "Analysis of their FIRO-B control balance and household decision flow",
  "reactiveConflictDance": "Detailed simulation of what happens when they have an argument and how to break the cycle",
  "deescalationProtocol": "Step-by-step rules for this specific couple to calm tension",
  "conversationalBridgeScripts": [
    { "scenario": "When discussing chores or money", "scriptA": "What Partner A should say", "scriptB": "What Partner B should say" },
    { "scenario": "When one partner needs emotional space", "scriptA": "What Partner A should say", "scriptB": "What Partner B should say" }
  ]
}`;

        try {
            const responseText = await this.callAI(prompt);
            const jsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(jsonStr);
        } catch (error) {
            console.error("AI Error comparing profiles:", error);
            return null;
        }
    }

    // --- PROVIDER CALL DISPATCHER ---
    async callAI(prompt) {
        if (this.provider === 'deepseek' || this.provider === 'deepseek-pro') {
            return await this.callDeepseekDirect(prompt);
        } else if (this.provider === 'deepseek-ai/deepseek-v4-flash') {
            return await this.callDeepseekNvidia(prompt);
        } else if (this.provider === 'gemini') {
            return await this.callGemini(prompt);
        } else if (this.provider === 'openai') {
            return await this.callOpenAI(prompt);
        } else if (this.provider === 'groq') {
            return await this.callGroq(prompt);
        }
        // Default to deepseek
        return await this.callDeepseekDirect(prompt);
    }

    // Direct DeepSeek API (api.deepseek.com)
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

        if (!response.ok) {
            throw new Error(`DeepSeek API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    // NVIDIA NIM DeepSeek Endpoint
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

        if (!response.ok) {
            throw new Error(`NVIDIA DeepSeek Error: ${response.status}`);
        }

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

        if (!response.ok) {
            throw new Error(`Gemini API Error: ${response.status}`);
        }

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

        if (!response.ok) {
            throw new Error(`OpenAI API Error: ${response.status}`);
        }

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
                model: 'llama-3.1-8b-instant',
                messages: [{ role: 'user', content: prompt }]
            })
        });

        if (!response.ok) {
            throw new Error(`Groq API Error: ${response.status}`);
        }

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
