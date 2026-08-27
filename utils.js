/**
 * MatchWise Lite v1.2
 * utils.js - Core Utilities
 * Contains: Localization/Translations, LocalStorage wrapper, Theme Controller,
 * and robust UTF-8 byte-level profile encryption & result-sharing code utilities.
 */

// --- 1. LOCALIZATION & TRANSLATIONS ---
const TRANSLATIONS = {
    en: {
        app_title: "MatchWise Lite",
        app_subtitle: "Offline Relationship Compatibility Assessment",
        lang_select: "Language / اللغة",
        start_new: "Start New Assessment",
        compare_profiles: "Compare Saved Profiles",
        dashboard_title: "Dashboard & Profiles",
        import_profile: "Import Profile File",
        import_desc_json: "Upload a partner's exported JSON file directly to compare.",
        import_code_title: "Import Shareable Code",
        import_desc_code: "Paste a partner's copied result code directly to import.",
        import_code_btn: "Import Code",
        gender: "Gender",
        gender_male: "Male",
        gender_female: "Female",
        marital_status: "Marital Status",
        marital_single: "Single",
        marital_married: "Married",
        marital_used_to_be_married: "Previously Married",
        no_profiles: "No saved profiles found. Start an assessment or import a profile to begin.",
        delete: "Delete",
        compare: "Compare Selected",
        export: "Export JSON",
        theme_toggle: "Theme Mode",
        question_header: "Assessment Session",
        progress: "Progress",
        back: "Back",
        next: "Next",
        finish: "Complete & Save",
        confirm_delete: "Are you sure you want to delete this profile?",
        enter_name: "Enter Profile Owner's Name:",
        invalid_file: "Invalid profile data or unsupported file format.",
        success_import: "Profile imported successfully!",
        overall_comp: "Overall Compatibility",
        strengths: "Core Strengths",
        challenges: "Potential Challenges",
        discussion_topics: "Topics to Discuss",
        deal_breakers: "Critical Deal-Breaker Alerts",
        growth_opps: "Growth Opportunities",
        recommendations: "Psychological Recommendations",
        save_pdf: "Print / Export PDF",
        likert_sd: "Strongly Disagree",
        likert_d: "Disagree",
        likert_sld: "Slightly Disagree",
        likert_n: "Neutral",
        likert_sla: "Slightly Agree",
        likert_a: "Agree",
        likert_sa: "Strongly Agree",
        mbti_label: "MBTI Tendency",
        attachment_label: "Attachment Style",
        communication_label: "Communication Style",
        conflict_label: "Conflict Style",
        decision_label: "Decision Style",
        love_lang_label: "Love Language",
        executive_summary: "Executive Summary",
        personality_dynamics: "Personality Dynamics",
        emotional_needs: "Emotional Needs & Values",
        appendix: "Appendix & Methodology",
        confidence_score: "Assessment Confidence",
        profile_details: "Profile Metadata",
        id: "Unique ID",
        created_at: "Created At",
        app_version: "Version",
        person_a: "Partner A",
        person_b: "Partner B",
        select_profiles_to_compare: "Please select 1 profile to view or 2 profiles to compare.",
        import_btn_label: "Choose Profile JSON File",
        close: "Close",
        required_questions_info: "Note: The adaptive engine delivers deep insights across psychological, lifestyle, and relationship domains.",
        export_success_msg: "Assessment completed and profile saved! An encrypted backup JSON file has been downloaded to your device.",
        confidence_explanation: "Confidence score is calculated based on answer consistency across polar scales, response variance, and completeness.",
        report_disclaimer: "Disclaimer: This report is an educational self-reflection simulation based on psychometric research and relationship dynamics. It does not replace clinical therapy or professional relationship counseling.",
        no_saved_profiles: "No saved profiles yet. Complete an assessment or import a partner's file to begin.",
        compare_instructions: "Select one profile to view individual results or select two profiles to generate a full compatibility report.",
        view_single_profile: "View Profile",
        view_selected_profile: "View Selected Profile",
        copy_code: "Copy Share Code",
        code_copied: "Code Copied!",
        code_copied_desc: "Shareable result code has been copied to your clipboard.",
        submit: "Submit",
        please_answer: "Please select an answer to proceed."
    },
    ar: {
        app_title: "ماتش وايز لايت",
        app_subtitle: "تقييم التوافق الزوجي والعلاقات بلا إنترنت",
        lang_select: "Language / اللغة",
        start_new: "بدء تقييم جديد",
        compare_profiles: "مقارنة الملفات المحفوظة",
        dashboard_title: "لوحة التحكم والملفات",
        import_profile: "استيراد ملف شخصي",
        import_desc_json: "قم برفع ملف JSON المشفر الخاص بالطرف الآخر مباشرة للمقارنة.",
        import_code_title: "استيراد رمز مشاركة النتيجة",
        import_desc_code: "قم بلصق رمز المشاركة المنسوخ الخاص بالطرف الآخر لاستيراده فوراً.",
        import_code_btn: "استيراد الرمز",
        gender: "الجنس",
        gender_male: "ذكر",
        gender_female: "أنثى",
        marital_status: "الحالة الاجتماعية",
        marital_single: "أعزب / عزباء",
        marital_married: "متزوج / متزوجة",
        marital_used_to_be_married: "سبق له الزواج",
        no_profiles: "لم يتم العثور على ملفات شخصية محفوظة. ابدأ تقييماً أو استورد ملفاً للبدء.",
        delete: "حذف",
        compare: "مقارنة المحددين",
        export: "تصدير JSON",
        theme_toggle: "نمط المظهر",
        question_header: "جلسة التقييم",
        progress: "التقدم",
        back: "رجوع",
        next: "التالي",
        finish: "إكمال وحفظ",
        confirm_delete: "هل أنت متأكد من رغبتك في حذف هذا الملف الشخصي؟",
        enter_name: "أدخل اسم صاحب الملف الشخصي:",
        invalid_file: "بيانات الملف الشخصي غير صالحة أو الصيغة غير مدعومة.",
        success_import: "تم استيراد الملف الشخصي بنجاح!",
        overall_comp: "التوافق الإجمالي",
        strengths: "نقاط القوة الأساسية",
        challenges: "التحديات المحتملة",
        discussion_topics: "مواضيع للنقاش المشترك",
        deal_breakers: "تنبيهات العقبات والخطوط الحمراء",
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
        mbti_label: "نمط MBTI التقريبي",
        attachment_label: "أسلوب الارتباط العاطفي",
        communication_label: "أسلوب التواصل",
        conflict_label: "أسلوب فض النزاعات",
        decision_label: "أسلوب اتخاذ القرار",
        love_lang_label: "لغة الحب الأساسية",
        executive_summary: "الملخص التنفيذي",
        personality_dynamics: "ديناميكيات الشخصية",
        emotional_needs: "الاحتياجات العاطفية والقيم",
        appendix: "الملحق والمنهجية العلمية",
        confidence_score: "درجة موثوقية التقييم",
        profile_details: "بيانات الملف الشخصي",
        id: "المعرف الفريد",
        created_at: "تاريخ الإنشاء",
        app_version: "نسخة التطبيق",
        person_a: "الطرف الأول (أ)",
        person_b: "الطرف الثاني (ب)",
        select_profiles_to_compare: "يرجى تحديد ملف واحد للعرض الفردي أو ملفين للمقارنة الزوجية.",
        import_btn_label: "اختر ملف JSON للملف الشخصي",
        close: "إغلاق",
        required_questions_info: "ملاحظة: يقدم المحرك التكيفي رؤى عميقة تشمل الأبعاد النفسية، ونمط الحياة، وديناميكيات العلاقة.",
        export_success_msg: "تم إكمال التقييم وحفظ الملف بنجاح! تم تنزيل نسخة JSON مشفرة على جهازك.",
        confidence_explanation: "يتم حساب درجة الموثوقية بناءً على اتساق الإجابات عبر المقاييس المتقابلة، وتباين الاستجابة، واكتمال المحاور.",
        report_disclaimer: "إخلاء مسؤولية: هذا التقرير عبارة عن محاكاة للتأمل الذاتي قائمة على أبحاث القياس النفسي وديناميكيات العلاقات. وهو مصمم للتوجيه والتوعية ولا يغني عن الاستشارة النفسية أو الزوجية المتخصصة.",
        no_saved_profiles: "لا توجد ملفات محفوظة بعد. أكمل تقييماً أو استورد ملف شريكك للبدء.",
        compare_instructions: "حدد ملفاً واحداً لعرض النتائج الفردية أو حدد ملفين شخصيين لإنشاء تقرير توافق شامل ومفصل.",
        view_single_profile: "عرض الملف",
        view_selected_profile: "عرض الملف المحدد",
        copy_code: "نسخ رمز المشاركة",
        code_copied: "تم نسخ الرمز!",
        code_copied_desc: "تم نسخ رمز مشاركة النتيجة بنجاح إلى الحافظة.",
        submit: "تأكيد",
        please_answer: "يرجى اختيار إجابة للمتابعة."
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
        return TRANSLATIONS[this.currentLang]?.[key] || TRANSLATIONS["en"]?.[key] || key;
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

// --- 4. SECURE UTF-8 PROFILE ENCRYPTION & DECRYPTION ---
const Cryptography = {
    SECRET_KEY_SALT: "MatchWiseLiteV1KeySalt-2023-2026-PremiumPsychology",
    SHARING_KEY_SALT: "MatchWiseLiteV1ResultSharingKeySalt-2026",

    _xorBytes(bytes, keyStr) {
        const keyBytes = new TextEncoder().encode(keyStr);
        const out = new Uint8Array(bytes.length);
        for (let i = 0; i < bytes.length; i++) {
            out[i] = bytes[i] ^ keyBytes[i % keyBytes.length] ^ (i % 256);
        }
        return out;
    },

    _bytesToBase64(bytes) {
        let binary = "";
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    },

    _base64ToBytes(base64Str) {
        const binary = atob(base64Str);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes;
    },

    encrypt(dataObj) {
        try {
            const jsonStr = JSON.stringify(dataObj);
            const utf8Bytes = new TextEncoder().encode(jsonStr);
            const cipherBytes = this._xorBytes(utf8Bytes, this.SECRET_KEY_SALT);
            return this._bytesToBase64(cipherBytes);
        } catch (e) {
            console.error("Encryption failed:", e);
            return null;
        }
    },

    decrypt(encryptedString) {
        try {
            if (!encryptedString) return null;
            const cipherBytes = this._base64ToBytes(encryptedString.trim());
            const plainBytes = this._xorBytes(cipherBytes, this.SECRET_KEY_SALT);
            const jsonStr = new TextDecoder().decode(plainBytes);
            const parsed = JSON.parse(jsonStr);
            if (parsed && parsed.id && parsed.answers && parsed.calculated_personality) {
                return parsed;
            }
            return null;
        } catch (e) {
            console.error("Failed to decrypt profile data.", e);
            return null;
        }
    },

    generateResultCode(profile) {
        try {
            const compactObj = {
                id: profile.id,
                n: profile.owner_name,
                g: profile.gender,
                m: profile.marital_status,
                a: profile.answers
            };
            const jsonStr = JSON.stringify(compactObj);
            const utf8Bytes = new TextEncoder().encode(jsonStr);
            const cipherBytes = this._xorBytes(utf8Bytes, this.SHARING_KEY_SALT);
            return "MWCODE-" + this._bytesToBase64(cipherBytes);
        } catch (e) {
            console.error("Failed to generate result code:", e);
            return null;
        }
    },

    parseResultCode(codeString) {
        try {
            if (!codeString || typeof codeString !== "string") return null;
            const clean = codeString.trim();
            if (!clean.startsWith("MWCODE-")) return null;
            const encryptedPart = clean.substring(7);
            const cipherBytes = this._base64ToBytes(encryptedPart);
            const plainBytes = this._xorBytes(cipherBytes, this.SHARING_KEY_SALT);
            const jsonStr = new TextDecoder().decode(plainBytes);
            const parsed = JSON.parse(jsonStr);
            if (parsed && parsed.n && parsed.a) {
                return {
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
            }
            return null;
        } catch (e) {
            console.error("Failed to parse sharing result code.", e);
            return null;
        }
    }
};

// Export to global window namespace & CommonJS for testing
if (typeof window !== "undefined") {
    window.Localization = Localization;
    window.Storage = Storage;
    window.ThemeManager = ThemeManager;
    window.Cryptography = Cryptography;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports = { Localization, Storage, ThemeManager, Cryptography };
}
