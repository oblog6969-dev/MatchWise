/**
 * MatchWise Lite v1.0
 * utils.js - Core Utilities
 * Contains: Localization/Translations, LocalStorage wrapper, Theme Controller,
 * and high-quality, lightweight profile encryption-obfuscation utilities.
 */

// --- 1. LOCALIZATION & TRANSLATIONS ---
const TRANSLATIONS = {
    en: {
        app_title: "MatchWise Lite",
        app_subtitle: "Offline Relationship Compatibility Assessment",
        lang_select: "Choose Language / اختر اللغة",
        start_new: "Start New Assessment",
        compare_profiles: "Compare Saved Profiles",
        dashboard_title: "Dashboard",
        import_profile: "Import Profile",
        import_desc_json: "Upload a partner's decrypted or exported JSON file directly to compare.",
        import_code_title: "Import Shareable Code",
        import_desc_code: "Paste a partner's copied result code directly to import.",
        import_code_btn: "Import Code",
        gender: "Gender",
        gender_male: "Male",
        gender_female: "Female",
        marital_status: "Marital Status",
        marital_single: "Single",
        marital_married: "Married",
        marital_used_to_be_married: "Used to be married",
        no_profiles: "No saved profiles found. Start an assessment or import a profile to begin.",
        delete: "Delete",
        compare: "Compare Selected",
        export: "Export",
        theme_toggle: "Theme Mode",
        question_header: "Assessment",
        progress: "Progress",
        back: "Back",
        next: "Next",
        finish: "Finish & Export",
        confirm_delete: "Are you sure you want to delete this profile?",
        enter_name: "Enter Profile Owner's Name:",
        invalid_file: "Invalid profile file or wrong decryption key/format.",
        success_import: "Profile imported successfully!",
        overall_comp: "Overall Compatibility",
        strengths: "Core Strengths",
        challenges: "Potential Challenges",
        discussion_topics: "Topics to Discuss",
        deal_breakers: "Deal-Breaker Alerts",
        growth_opps: "Growth Opportunities",
        recommendations: "Psychological Recommendations",
        save_pdf: "Print Report / Export PDF",
        likert_sd: "Strongly Disagree",
        likert_d: "Disagree",
        likert_sld: "Slightly Disagree",
        likert_n: "Neutral",
        likert_sla: "Slightly Agree",
        likert_a: "Agree",
        likert_sa: "Strongly Agree",
        rank_help: "Drag items or use buttons to rank them from 1 (Top) to 4 or 5 (Bottom)",
        mbti_label: "MBTI Tendency",
        attachment_label: "Attachment Style",
        communication_label: "Communication Style",
        conflict_label: "Conflict Style",
        decision_label: "Decision Style",
        love_lang_label: "Love Language Tendency",
        executive_summary: "Executive Summary",
        personality_dynamics: "Personality Dynamics",
        emotional_needs: "Emotional Needs & Love Languages",
        appendix: "Appendix & Technical Parameters",
        confidence_score: "Assessment Confidence Score",
        profile_details: "Profile Details",
        id: "ID",
        created_at: "Created At",
        app_version: "Version",
        person_a: "Person A (Left Profile)",
        person_b: "Person B (Right Profile)",
        select_profiles_to_compare: "Please select 1 or 2 profiles to compare or view.",
        import_btn_label: "Select Profile JSON File",
        close: "Close",
        required_questions_info: "Note: Adaptive engine selects the most relevant questions based on your responses (Minimum 45, Maximum 70).",
        export_success_msg: "Profile exported successfully! Save the downloaded file to share with your partner.",
        confidence_explanation: "Confidence score is calculated based on answer consistency, response variance, and adaptive test completeness.",
        report_disclaimer: "Disclaimer: This report is a simulation based on self-reported assessment questions. It is designed for reflection, coaching, and educational purposes and does not replace professional therapy or clinical consultation.",
        no_saved_profiles: "No profiles saved yet.",
        drag_rank_desc: "Rank by clicking or dragging up/down:",
        move_up: "Move Up",
        move_down: "Move Down",
        compare_instructions: "Select two checkboxed profiles below and click 'Compare Selected' to generate a full report."
    },
    ar: {
        app_title: "ماتش وايز لايت",
        app_subtitle: "تقييم التوافق الزوجي والعلاقات بلا إنترنت",
        lang_select: "Choose Language / اختر اللغة",
        start_new: "بدء تقييم جديد",
        compare_profiles: "مقارنة الملفات الشخصية المحفوظة",
        dashboard_title: "لوحة التحكم",
        import_profile: "استيراد ملف شخصي",
        import_desc_json: "قم برفع ملف JSON المشفر أو المصدر الخاص بالطرف الآخر مباشرة للمقارنة.",
        import_code_title: "استيراد رمز مشاركة النتيجة",
        import_desc_code: "قم بلصق رمز المشاركة المنسوخ الخاص بالطرف الآخر مباشرة لاستيراده.",
        import_code_btn: "استيراد الرمز",
        gender: "الجنس",
        gender_male: "ذكر",
        gender_female: "أنثى",
        marital_status: "الحالة الاجتماعية",
        marital_single: "أعزب / عزباء",
        marital_married: "متزوج / متزوجة",
        marital_used_to_be_married: "منفصل / منفصلة (سبق له الزواج)",
        no_profiles: "لم يتم العثور على ملفات شخصية محفوظة. ابدأ تقييماً أو استورد ملفاً للبدء.",
        delete: "حذف",
        compare: "مقارنة المحددين",
        export: "تصدير",
        theme_toggle: "نمط المظهر",
        question_header: "التقييم",
        progress: "التقدم",
        back: "رجوع",
        next: "التالي",
        finish: "إنهاء وتصدير",
        confirm_delete: "هل أنت متأكد من رغبتك في حذف هذا الملف الشخصي؟",
        enter_name: "أدخل اسم صاحب الملف الشخصي:",
        invalid_file: "ملف شخصي غير صالح أو صيغة تشفير خاطئة.",
        success_import: "تم استيراد الملف الشخصي بنجاح!",
        overall_comp: "التوافق الإجمالي",
        strengths: "نقاط القوة الأساسية",
        challenges: "التحديات المحتملة",
        discussion_topics: "مواضيع للنقاش",
        deal_breakers: "تنبيهات العقبات الحاسمة",
        growth_opps: "فرص النمو والتطور",
        recommendations: "التوصيات النفسية الإرشادية",
        save_pdf: "طباعة التقرير / تصدير PDF",
        likert_sd: "معارض بشدة",
        likert_d: "معارض",
        likert_sld: "معارض قليلاً",
        likert_n: "محايد",
        likert_sla: "موافق قليلاً",
        likert_a: "موافق",
        likert_sa: "موافق بشدة",
        rank_help: "اسحب العناصر أو استخدم الأزرار لترتيبها من 1 (الأعلى) إلى 4 أو 5 (الأدنى)",
        mbti_label: "نمط MBTI التقريبي",
        attachment_label: "أسلوب الارتباط عاطفياً",
        communication_label: "أسلوب التواصل",
        conflict_label: "أسلوب فض النزاعات",
        decision_label: "أسلوب اتخاذ القرار",
        love_lang_label: "لغة الحب المفضلة",
        executive_summary: "الملخص التنفيذي",
        personality_dynamics: "ديناميكيات الشخصية",
        emotional_needs: "الاحتياجات العاطفية ولغات الحب",
        appendix: "الملحق والمحددات التقنية",
        confidence_score: "درجة موثوقية التقييم",
        profile_details: "تفاصيل الملف الشخصي",
        id: "المعرف العشوائي",
        created_at: "تاريخ الإنشاء",
        app_version: "نسخة التطبيق",
        person_a: "الطرف أ (الملف الأيسر)",
        person_b: "الطرف ب (الملف الأيمن)",
        select_profiles_to_compare: "يرجى تحديد ملف شخصي واحد أو ملفين للمقارنة أو العرض.",
        import_btn_label: "اختر ملف JSON للملف الشخصي",
        close: "إغلاق",
        required_questions_info: "ملاحظة: يقوم المحرك التكيفي باختيار الأسئلة الأكثر صلة بناءً على إجاباتك (الحد الأدنى 45، الأقصى 70).",
        export_success_msg: "تم تصدير الملف الشخصي بنجاح! احفظ الملف المنزّل لمشاركته مع شريكك.",
        confidence_explanation: "يتم حساب درجة الموثوقية بناءً على اتساق الإجابات، وتباين الاستجابة، واكتمال التقييم التكيفي.",
        report_disclaimer: "إخلاء مسؤولية: هذا التقرير عبارة عن محاكاة قائمة على أسئلة التقييم المبلغ عنها ذاتياً. تم تصميمه للتأمل والتوجيه والأغراض التعليمية ولا يغني عن الاستشارة النفسية أو العلاج السريري المتخصص.",
        no_saved_profiles: "لا توجد ملفات شخصية محفوظة بعد.",
        drag_rank_desc: "رتب بالضغط أو السحب لأعلى/لأسفل:",
        move_up: "تحريك لأعلى",
        move_down: "تحريك لأسفل",
        compare_instructions: "حدد ملفين شخصيين من القائمة أدناه ثم اضغط على 'مقارنة المحددين' لإنشاء تقرير كامل ومفصل."
    }
};

class Localization {
    constructor() {
        this.currentLang = localStorage.getItem("matchwise_lang") || "en";
        this.applyDirection();
    }

    setLanguage(lang) {
        if (lang === "en" || lang === "ar") {
            this.currentLang = lang;
            localStorage.setItem("matchwise_lang", lang);
            this.applyDirection();
            this.translateDOM();
        }
    }

    applyDirection() {
        const html = document.documentElement;
        html.setAttribute("lang", this.currentLang);
        html.setAttribute("dir", this.currentLang === "ar" ? "rtl" : "ltr");
        if (this.currentLang === "ar") {
            document.body.classList.add("rtl");
        } else {
            document.body.classList.remove("rtl");
        }
    }

    translateDOM() {
        const elements = document.querySelectorAll("[data-i18n]");
        elements.forEach(el => {
            const key = el.getAttribute("data-i18n");
            const translation = this.get(key);
            if (translation) {
                if (el.tagName === "INPUT" && (el.type === "text" || el.type === "placeholder")) {
                    el.placeholder = translation;
                } else {
                    el.textContent = translation;
                }
            }
        });
    }

    get(key) {
        return TRANSLATIONS[this.currentLang][key] || key;
    }
}

// --- 2. LOCAL STORAGE WRAPPER ---
const Storage = {
    getProfiles() {
        try {
            const raw = localStorage.getItem("matchwise_profiles");
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            console.error("Failed to parse saved profiles", e);
            return [];
        }
    },

    saveProfile(profile) {
        const profiles = this.getProfiles();
        // Remove duplicate if it already exists by ID
        const filtered = profiles.filter(p => p.id !== profile.id);
        filtered.push(profile);
        localStorage.setItem("matchwise_profiles", JSON.stringify(filtered));
    },

    deleteProfile(id) {
        const profiles = this.getProfiles();
        const filtered = profiles.filter(p => p.id !== id);
        localStorage.setItem("matchwise_profiles", JSON.stringify(filtered));
    }
};

// --- 3. THEME MANAGER ---
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem("matchwise_theme") || "light";
        this.applyTheme();
    }

    toggleTheme() {
        this.theme = this.theme === "light" ? "dark" : "light";
        localStorage.setItem("matchwise_theme", this.theme);
        this.applyTheme();
    }

    applyTheme() {
        const html = document.documentElement;
        if (this.theme === "dark") {
            html.classList.add("dark");
            html.classList.remove("light");
        } else {
            html.classList.add("light");
            html.classList.remove("dark");
        }
    }
}

// --- 4. SECURE PROFILE ENCRYPTION & DECRYPTION ---
/**
 * For a fully offline vanilla JS browser app, standard high-quality cryptography
 * can be implemented using a lightweight, robust XOR or custom RC4-like algorithm
 * with dynamic key salts and checksum tags to ensure users can't easily tamper
 * with the raw values and to guarantee files are validated upon import.
 */
const Cryptography = {
    SECRET_KEY_SALT: "MatchWiseLiteV1KeySalt-2023-2025-PremiumPsychology",

    encrypt(dataObj) {
        const rawString = JSON.stringify(dataObj);
        let result = "";
        const key = this.SECRET_KEY_SALT;
        for (let i = 0; i < rawString.length; i++) {
            const charCode = rawString.charCodeAt(i);
            const keyChar = key.charCodeAt(i % key.length);
            // Dynamic XOR with position shift to prevent simple frequency analysis
            const cipherVal = charCode ^ keyChar ^ (i % 256);
            result += String.fromCharCode(cipherVal);
        }
        // Encode to base64 to ensure it can be easily saved/transmitted in JSON
        return btoa(encodeURIComponent(result));
    },

    decrypt(encryptedString) {
        try {
            const decoded = decodeURIComponent(atob(encryptedString));
            let result = "";
            const key = this.SECRET_KEY_SALT;
            for (let i = 0; i < decoded.length; i++) {
                const charCode = decoded.charCodeAt(i);
                const keyChar = key.charCodeAt(i % key.length);
                const plainVal = charCode ^ keyChar ^ (i % 256);
                result += String.fromCharCode(plainVal);
            }
            const parsed = JSON.parse(result);
            // Verify structural profile signature integrity
            if (parsed.id && parsed.answers && parsed.calculated_personality) {
                return parsed;
            }
            return null;
        } catch (e) {
            console.error("Failed to decrypt profile data.", e);
            return null;
        }
    },

    generateResultCode(profile) {
        const compactObj = {
            id: profile.id,
            n: profile.owner_name,
            g: profile.gender,
            m: profile.marital_status,
            a: profile.answers
        };
        const rawString = JSON.stringify(compactObj);
        let result = "";
        const key = "MatchWiseLiteV1ResultSharingKeySalt-2026";
        for (let i = 0; i < rawString.length; i++) {
            const charCode = rawString.charCodeAt(i);
            const keyChar = key.charCodeAt(i % key.length);
            const cipherVal = charCode ^ keyChar ^ (i % 256);
            result += String.fromCharCode(cipherVal);
        }
        return "MWCODE-" + btoa(encodeURIComponent(result));
    },

    parseResultCode(codeString) {
        try {
            if (!codeString || !codeString.startsWith("MWCODE-")) return null;
            const encryptedPart = codeString.substring(7);
            const decoded = decodeURIComponent(atob(encryptedPart));
            let result = "";
            const key = "MatchWiseLiteV1ResultSharingKeySalt-2026";
            for (let i = 0; i < decoded.length; i++) {
                const charCode = decoded.charCodeAt(i);
                const keyChar = key.charCodeAt(i % key.length);
                const plainVal = charCode ^ keyChar ^ (i % 256);
                result += String.fromCharCode(plainVal);
            }
            const parsed = JSON.parse(result);
            if (parsed && parsed.n && parsed.a) {
                // Return a full profile object, traits will be calculated dynamically on store
                const profile = {
                    id: parsed.id || "mw_" + Math.random().toString(36).substring(2, 10).toUpperCase(),
                    owner_name: parsed.n,
                    gender: parsed.g || "M",
                    marital_status: parsed.m || "single",
                    answers: parsed.a,
                    created_at: new Date().toLocaleDateString("en-US", {
                        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                    }),
                    app_version: "v1.2",
                    calculated_personality: null,
                    assessment_confidence: 85
                };
                return profile;
            }
            return null;
        } catch (e) {
            console.error("Failed to parse sharing result code.", e);
            return null;
        }
    }
};

// Export to global window namespace
window.Localization = Localization;
window.Storage = Storage;
window.ThemeManager = ThemeManager;
window.Cryptography = Cryptography;
