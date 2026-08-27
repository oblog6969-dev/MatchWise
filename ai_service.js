/**
 * MatchWise Lite AI Service
 * Handles API interactions with AI providers (Gemini, OpenAI, Groq).
 */

const API_KEY = "YOUR_API_KEY_HERE";
const PROVIDER = "gemini"; // "gemini", "openai", or "groq"

class AIService {
    constructor() {
        this.provider = PROVIDER;
        this.apiKey = API_KEY;
    }

    async determineNextQuestion(currentHistory, currentAnswers, allQuestions, currentLanguage) {
        const prompt = `You are an expert relationship psychologist AI.
You are administering a relationship compatibility test. The user is taking the test in ${currentLanguage === 'ar' ? 'Arabic' : 'English'}.
The user has answered the following questions so far:
${JSON.stringify(currentAnswers, null, 2)}

Here is the database of available questions:
${JSON.stringify(allQuestions.map(q => ({id: q.id, text: currentLanguage === 'ar' ? q.arabic.text : q.english.text, category: q.category})), null, 2)}

Based on the user's answers, what should the next question be?
You are acting anonymously. The normal assessment path is ready to provide the next question. However, you can interfere if you notice a specific point about the user that needs clarification.

You have three choices:
1. If the current answers are normal and don't require immediate clarification, let the system follow its standard path. Return: {"next_id": "STANDARD"}
2. To clarify a specific point using an existing question, select a question from the database that hasn't been asked yet. Return: {"next_id": "id_from_database"}
3. If the database is insufficient to probe a specific area of concern that arose, GENERATE a new Multiple Choice Question (MCQ). Return: {"next_id": "NEW", "new_question": {...}}

Return ONLY a JSON object.

If you choose an existing question:
{
  "next_id": "the_id_of_the_next_question_from_the_database"
}

If you decide to GENERATE a new question, return exactly this format (you MUST provide both English and Arabic translations for the question and options):
{
  "next_id": "NEW",
  "new_question": {
    "id": "ai_gen_X", // Generate a unique ID like ai_gen_123
    "category": "Identify the category (e.g., Communication, Trust)",
    "type": "choice",
    "english": { "text": "Question text in English" },
    "arabic": { "text": "Question text in Arabic" },
    "options": [
      { "id": "opt1", "english": "Option 1 English", "arabic": "Option 1 Arabic" },
      { "id": "opt2", "english": "Option 2 English", "arabic": "Option 2 Arabic" },
      { "id": "opt3", "english": "Option 3 English", "arabic": "Option 3 Arabic" }
    ]
  }
}

If you choose the standard path:
{
  "next_id": "STANDARD"
}

If no more questions are needed (test complete, minimum 45 questions asked), return {"next_id": null}.
`;
        
        try {
            const responseText = await this.callAI(prompt);
            const jsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
            const result = JSON.parse(jsonStr);
            return result; // Returns the whole object so we can parse new_question
        } catch (error) {
            console.error("AI Error determining next question:", error);
            return { next_id: "STANDARD" }; // Fallback to standard path
        }
    }

    async analyzeReport(userAnswers, allQuestions, currentLanguage) {
        const answeredData = Object.keys(userAnswers).map(qid => {
            const q = allQuestions.find(q => q.id === qid);
            if (!q) return null;
            return {
                category: q.category,
                question: currentLanguage === 'ar' ? q.arabic.text : q.english.text,
                answer: userAnswers[qid]
            };
        }).filter(item => item !== null);

        const prompt = `You are an expert relationship psychologist AI analyzing test results. 
The user is viewing the report in ${currentLanguage === 'ar' ? 'Arabic' : 'English'}. YOU MUST WRITE YOUR ANALYSIS IN ${currentLanguage === 'ar' ? 'ARABIC' : 'ENGLISH'}.
The user just completed a compatibility assessment with these answers:
${JSON.stringify(answeredData, null, 2)}

Do a deep analysis of the user's positive and negative traits that affect relationships to increase the trust level and usefulness of the report.

Return ONLY a JSON object in this exact format (translated to ${currentLanguage === 'ar' ? 'Arabic' : 'English'}):
{
  "positiveTraits": ["positive trait 1", "positive trait 2", ...],
  "negativeTraits": ["negative trait 1", "negative trait 2", ...],
  "concerns": ["red flag / concern 1", "red flag / concern 2", ...],
  "focusAreas": ["focus area for growth 1", "focus area 2", ...]
}
`;

        try {
            const responseText = await this.callAI(prompt);
            const jsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(jsonStr);
        } catch (error) {
            console.error("AI Error analyzing report:", error);
            return { positiveTraits: [], negativeTraits: [], concerns: [], focusAreas: [] };
        }
    }

    async callAI(prompt) {
        if (this.provider === 'gemini') {
            return await this.callGemini(prompt);
        } else if (this.provider === 'openai') {
            return await this.callOpenAI(prompt);
        } else if (this.provider === 'groq') {
            return await this.callGroq(prompt);
        }
        throw new Error("Unknown provider: " + this.provider);
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
                model: 'llama3-8b-8192',
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

window.AIService = AIService;
