/**
 * MatchWise Lite v2.5
 * utils.js - Core Utilities
 * Contains: Localization/Translations, LocalStorage wrapper, Theme Controller,
 * and robust UTF-8 byte-level profile encryption & result-sharing code utilities.
 */

// --- GOOGLE TRANSLATE SPA DOM CRASH PREVENTION PATCH ---
// When Google Translate mutates DOM text nodes into <font> tags, standard
// DOM removal/insertion in SPAs throws NotFoundError. This defensive polyfill ensures zero crashes.
if (typeof Node === "function" && Node.prototype) {
    const originalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function(child) {
        if (child.parentNode !== this) {
            if (typeof console !== "undefined" && console.warn) {
                console.warn("[GoogleTranslateSafety] Suppressed removeChild mismatch:", child);
            }
            return child;
        }
        return originalRemoveChild.apply(this, arguments);
    };

    const originalInsertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function(newNode, referenceNode) {
        if (referenceNode && referenceNode.parentNode !== this) {
            if (typeof console !== "undefined" && console.warn) {
                console.warn("[GoogleTranslateSafety] Suppressed insertBefore mismatch:", referenceNode);
            }
            return newNode;
        }
        return originalInsertBefore.apply(this, arguments);
    };
}

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
        hartman_label: "Core Motive (Hartman)",
        disc_label: "Pace & Focus (DISC)",
        birkman_label: "Underlying Need (Birkman)",
        gottman_label: "Emotional Safety (Gottman)",
        operating_manual_title: "Relationship Operating Manual & Stress Triggers",
        conflict_protocol_title: "De-escalation Protocol & Fair-Fighting Rules",
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
        please_answer: "Please select an answer to proceed.",
        question_count: "Question {current} of {total}",
        auto_advance_hint: "Auto-advances on selection",

        // Storytelling & Print Mode Keys
        print_preview_mode: "Toggle Print View",
        chapter_1_title: "Chapter 1: The Core Operating Engine",
        chapter_1_desc: "Who you are at your core: Hartman Core Motives and DISC Pace & Focus dynamics.",
        chapter_2_title: "Chapter 2: The Emotional Iceberg",
        chapter_2_desc: "The Birkman Method: Outward visible habits vs. hidden emotional needs and reactive stress.",
        chapter_3_title: "Chapter 3: The Attachment Safe Harbor & Trust",
        chapter_3_desc: "Adult Attachment (ECR) & FIRO-B: How you bond, seek closeness, and balance shared leadership.",
        chapter_4_title: "Chapter 4: The Fire & Healing Script",
        chapter_4_desc: "TKI Conflict Modes & Gottman Emotional Safety: Your argument reflexes and fair-fighting rules.",
        chapter_5_title: "Chapter 5: Worldview & The Shared Horizon",
        chapter_5_desc: "Schwartz Human Values & Life Domain Priorities: Financial, familial, and lifestyle compatibility.",
        act_1_title: "Act 1: The Chemistry & Energy Flow",
        act_1_desc: "How your core motives and daily tempos meet, energize, or challenge one another.",
        act_2_title: "Act 2: The Invisible Tripwires",
        act_2_desc: "Birkman Cross-Need Vulnerabilities & FIRO-B Power Balance: Where unintended friction sparks.",
        act_3_title: "Act 3: The Argument Simulation & Circuit Breaker",
        act_3_desc: "Tracing your interactive conflict cycle: Trigger, defensive reflex, and the exact steps to de-escalate.",
        act_4_title: "Act 4: The Lifelong Playbook & Bridge Scripts",
        act_4_desc: "Tailored couple rules, growth opportunities, and verbatim bridge scripts for difficult moments.",
        load_demo_profiles: "Load Live Demo Profiles (Tariq & Nour)",
        report_dossier_title: "MatchWise Lite v2.5",
        report_dossier_subtitle: "Executive Multi-Framework Behavioral & Relationship Dossier",
        executive_overview: "Executive Overview",
        hartman_card_title: "Hartman Motive Spectrum (Fuel & Motives)",
        disc_card_title: "DISC Behavioral Rhythm & Tempo (2x2 Matrix)",
        birkman_card_title: "The Tri-Layer Iceberg: Usual Style vs. Hidden Needs vs. Stress Reaction",
        attachment_card_title: "Attachment Security Field (Anxiety vs. Avoidance)",
        firo_card_title: "FIRO-B Interpersonal Exchange (Control & Affection)",
        gottman_card_title: "Gottman Emotional Safety & Four Horsemen Risk Radar",
        conflict_card_title: "Interactive Dyadic Conflict Cycle & Circuit Breaker",
        ai_provider_label: "AI Provider:",
        ai_key_label: "API Key (Optional for Built-in AI):",
        ai_key_help: "MatchWise Autonomous AI works 100% free with unlimited requests and zero setup. External API keys are optional.",
        mbti_type: "Cognitive Style (MBTI)",
        attachment_style: "Attachment Dynamic",
        save_pdf: "Export PDF",
        print_page: "Print Report",
        export_pdf_loading: "Generating PDF Report...",
        export_pdf_success: "PDF generated and downloaded successfully!",
        ai_settings_btn: "MatchWise AI",
        start_desc: "Begin a structured 45-70 question session. Understand your individual communication patterns, attachment dynamics, and life priorities.",
        compare_desc: "Load or import completed personality assessments to generate an extremely comprehensive, printable multi-dimensional compatibility report.",
        hero_badge: "v2.5 • AI-Powered Insights",
        parameter_label: "Parameter",
        radar_title: "Multivariable Compatibility Index (12 Axes)",
        bar_title: "Big Five / Temperament Alignment",
        ai_consultation_title: "Deep Psychological Consultation & Bridge Scripts",
        ai_generating: "Generating AI analysis...",
        ai_failed: "Could not generate deep analysis at this time.",
        ai_dyadic_failed: "Could not generate dyadic consultation at this time.",
        enter_name_placeholder: "e.g. Tariq / Sarah",
        btn_compare_selected: "Compare / View Selected",
        btn_view_selected: "View Selected Profile",
        btn_compare_two: "Compare Selected (2)",
        core_fuel_label: "Core Emotional Fuel:",
        avoid_label: "Avoid:",
        drag_rank_desc: "Reorder options by priority (1 = Highest priority)",
        move_up: "Move up",
        move_down: "Move down"
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
        import_desc_code: "أو الصق رمز النتيجة النصي المشفر هنا:",
        import_code_placeholder: "MW1:...",
        import_btn_code: "استيراد من الرمز",
        saved_profiles_heading: "الملفات الشخصية المحفوظة",
        saved_profiles_desc: "حدد ملفاً واحداً للمعاينة، أو حدد ملفين شخصيين للبدء في مقارنة التوافق التلقائية.",
        compare_btn_text: "مقارنة / عرض المحدد",
        export_profiles: "تصدير الملفات",
        print_pdf: "طباعة / تصدير PDF",
        export_all: "تصدير النسخة الاحتياطية",
        delete: "حذف",
        compare: "مقارنة الملفين المحددين",
        export: "تصدير JSON",
        theme_toggle: "وضع المظهر",
        question_header: "جلسة التقييم",
        progress: "التقدم",
        back: "السابق",
        next: "التالي",
        finish: "إكمال وحفظ النتيجة",
        confirm_delete: "هل أنت متأكد من رغبتك في حذف هذا الملف الشخصي نهائياً؟",
        enter_name: "أدخل اسم صاحب الملف الشخصي:",
        gender: "الجنس:",
        gender_male: "ذكر",
        gender_female: "أنثى",
        marital_status: "الحالة الاجتماعية:",
        marital_single: "أعزب / عزباء",
        marital_married: "متزوج / متزوجة",
        marital_used_to_be_married: "سبق له / لها الزواج",
        no_profiles: "لم يتم العثور على ملفات شخصية محفوظة. ابدأ تقييماً أو استورد ملفاً للبدء.",
        invalid_file: "بيانات الملف غير صحيحة أو صيغة الملف غير مدعومة.",
        success_import: "تم استيراد الملف الشخصي بنجاح!",
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
        hartman_label: "الدافع الجوهري (Hartman)",
        disc_label: "الإيقاع والتركيز (DISC)",
        birkman_label: "الاحتياج الخفي (Birkman)",
        gottman_label: "الأمان العاطفي (Gottman)",
        operating_manual_title: "دليل إدارة العلاقة ومحفزات التوتر",
        conflict_protocol_title: "بروتوكول التهدئة وقواعد الحوار العادل",
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
        please_answer: "يرجى اختيار إجابة للمتابعة.",
        question_count: "السؤال {current} من {total}",
        auto_advance_hint: "انتقال تلقائي فور الاختيار",

        // Storytelling & Print Mode Keys (Arabic)
        print_preview_mode: "معاينة الطباعة",
        chapter_1_title: "الفصل الأول: محرك الشخصية والإيقاع اليومي",
        chapter_1_desc: "جوهر دوافعك الحقيقية: دوافع هارتمان الأساسية وإيقاعك اليومي في اتخاذ القرارات والتعامل.",
        chapter_2_title: "الفصل الثاني: جبل الجليد النفسي",
        chapter_2_desc: "نموذج بيركمان: ما يظهر للناس في تصرفاتك مقابل ما تحتاجه سراً في قلبك وما يحدث عند الإرهاق.",
        chapter_3_title: "الفصل الثالث: ملاذ الأمان والتعلق العاطفي",
        chapter_3_desc: "نظرية الارتباط العاطفي وتبادل العلاقات: كيف تبني الثقة، وتطلب القرب، وتدير قيادة العلاقة.",
        chapter_4_title: "الفصل الرابع: إدارة الخلافات والتهدئة الذكية",
        chapter_4_desc: "أنماط توماس-كيلمان ومؤشر غوتمان للأمان: كيف تتصرف في الأزمات وقواعد الحوار العادل.",
        chapter_5_title: "الفصل الخامس: منظومة القيم وبناء المستقبل",
        chapter_5_desc: "منظومة شوارتز للقيم والأولويات الحياتية: التوافق المالي، والأسري، ومسار الحياة المشترك.",
        act_1_title: "المحور الأول: كيمياء اللقاء وتناغم الطاقة",
        act_1_desc: "كيف تتلاقى دوافعكما الأساسية وإيقاعكما اليومي لإنشاء طاقة مشتركة نابضة بالحياة.",
        act_2_title: "المحور الثاني: حساسية الاحتياجات الخفية",
        act_2_desc: "توافق احتياجات بيركمان وتبادل القيادة: مواضع الاحتكاك غير المقصود وكيفية احتوائها.",
        act_3_title: "المحور الثالث: محاكاة دورة الخلاف وكيفية كسرها",
        act_3_desc: "تتبع مسار الخلاف التفاعلي: الشرارة، وردة الفعل الدفاعية، والخطوات الدقيقة لإعادة الهدوء.",
        act_4_title: "المحور الرابع: دليل الحوار المشترك وجسور التفاهم",
        act_4_desc: "القواعد الذهبية للزوجين، وفرص النمو، ونصوص الحوار الحرفية لنقاش المسائل الحساسة بودية.",
        load_demo_profiles: "تحميل الملفات التجريبية الحية (طارق ونور)",
        report_dossier_title: "ماتش وايز لايت v2.5",
        report_dossier_subtitle: "الملف التحليلي التنفيذي للتوافق النفسي والسلوكي والعاطفي",
        executive_overview: "نظرة عامة تنفيذية",
        hartman_card_title: "طيف دوافع هارتمان (الوقود النفسي والاحتياجات)",
        disc_card_title: "إيقاع السلوك والسرعة (مصفوفة DISC الثنائية)",
        birkman_card_title: "جبل الجليد النفسي: السلوك الظاهر والاحتياج الخفي وتأثير التوتر",
        attachment_card_title: "حقل الأمان والارتباط العاطفي (القلق مقابل التجنب)",
        firo_card_title: "تبادل العلاقات والقيادة والمودة (FIRO-B)",
        gottman_card_title: "مؤشر الأمان العاطفي ورادار فرسان الهلاك الأربعة",
        conflict_card_title: "دورة الخلاف التفاعلية وقاطع الدائرة لإعادة الهدوء",
        ai_provider_label: "مزود الذكاء الاصطناعي:",
        ai_key_label: "مفتاح الربط (اختياري للذكاء المدمج المجاني):",
        ai_key_help: "الذكاء الاصطناعي المدمج في ماتش وايز مجاني 100% بلا حدود وبلا حاجة لأي إعدادات أو مفاتيح خارجية.",
        mbti_type: "النمط المعرفي (MBTI)",
        attachment_style: "ديناميكية الارتباط العاطفي",
        save_pdf: "تصدير تقرير PDF",
        print_page: "طباعة التقرير",
        export_pdf_loading: "جارٍ تجهيز ملف الـ PDF عالي الجودة...",
        export_pdf_success: "تم تحميل تقرير الـ PDF بنجاح!",
        ai_settings_btn: "ذكاء ماتش وايز",
        start_desc: "ابدأ جلسة تقييم متقدمة من 45 إلى 70 سؤالاً تفاعلياً لفهم أنماط التواصل، وديناميكية الارتباط العاطفي، والأولويات الحياتية.",
        compare_desc: "حمّل أو استورد ملفات التقييم المكتملة لإنشاء تقرير توافق شامل ومفصل متعدد الأبعاد وقابل للطباعة والتصدير.",
        hero_badge: "v2.5 • رؤى مدعومة بالذكاء الاصطناعي",
        parameter_label: "المؤشر / المعيار",
        radar_title: "مؤشر التوافق متعدد الأبعاد (12 محوراً)",
        bar_title: "محاذاة السمات الخمس الكبرى",
        ai_consultation_title: "الاستشارة النفسية المعمقة وجسور التفاهم",
        ai_generating: "جارٍ توليد الاستشارة والتحليل المعمق عبر الذكاء الاصطناعي...",
        ai_failed: "تعذر إنشاء التحليل المعمق حالياً.",
        ai_dyadic_failed: "تعذر إنشاء استشارة التوافق الثنائي حالياً.",
        enter_name_placeholder: "مثال: طارق / نور",
        btn_compare_selected: "مقارنة / عرض المحدد",
        btn_view_selected: "عرض الملف المحدد",
        btn_compare_two: "مقارنة الملفين المحددين (2)",
        core_fuel_label: "الوقود العاطفي الأساسي:",
        avoid_label: "تجنب معه:",
        drag_rank_desc: "قم بإعادة ترتيب الخيارات حسب الأولوية (1 = الأولوية القصوى)",
        move_up: "تحريك لأعلى",
        move_down: "تحريك لأسفل"
    }
};

class Localization {
    constructor() {
        this.currentLang = localStorage.getItem("matchwise_lang") || "en";
        this.applyDirection();
        if (typeof document !== "undefined") {
            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", () => this.translateDOM());
            } else {
                this.translateDOM();
            }
        }
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
        if (typeof document === "undefined") return;
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
        if (typeof document === "undefined") return;
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

        const placeholderElements = document.querySelectorAll("[data-i18n-placeholder]");
        placeholderElements.forEach(el => {
            const key = el.getAttribute("data-i18n-placeholder");
            const translation = this.get(key);
            if (translation) {
                el.placeholder = translation;
            }
        });

        const titleElements = document.querySelectorAll("[data-i18n-title]");
        titleElements.forEach(el => {
            const key = el.getAttribute("data-i18n-title");
            const translation = this.get(key);
            if (translation) {
                el.setAttribute("title", translation);
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
        window.dispatchEvent(new CustomEvent("matchwise_theme_changed", { detail: { theme: this.theme } }));
    }

    isDark() {
        return this.theme === "dark";
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
                    app_version: "v2.5",
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

// --- 5. GOOGLE TRANSLATE HELPER ---
const GoogleTranslateHelper = {
    RTL_LANGS: ['ar', 'ur', 'he', 'fa', 'ps', 'sd', 'yi'],

    init() {
        // Observer for Google Translate HTML class additions (translated-rtl vs translated-ltr)
        if (typeof MutationObserver !== "undefined" && document.documentElement) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === "class") {
                        const htmlClass = document.documentElement.className;
                        if (htmlClass.includes("translated-rtl")) {
                            document.body.classList.add("rtl");
                            document.documentElement.setAttribute("dir", "rtl");
                        } else if (htmlClass.includes("translated-ltr")) {
                            // Only remove if not natively set to Arabic
                            const nativeLang = localStorage.getItem("matchwise_lang") || "en";
                            if (nativeLang !== "ar") {
                                document.body.classList.remove("rtl");
                                document.documentElement.setAttribute("dir", "ltr");
                            }
                        }
                    }
                });
            });
            observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        }

        // Sync dropdown with active cookie on load
        this.syncQuickSelector();
    },

    initElement() {
        if (typeof google !== "undefined" && google.translate && google.translate.TranslateElement) {
            try {
                new google.translate.TranslateElement({
                    pageLanguage: 'en',
                    autoDisplay: false,
                    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
                }, 'google_translate_element');
            } catch (err) {
                console.warn("[GoogleTranslate] Widget initialization notice:", err);
            }
        }
    },

    setLanguage(langCode) {
        if (!langCode || langCode === "reset") {
            this.reset();
            return;
        }

        // Set googtrans cookie across root and host domain
        const cookieVal = `/auto/${langCode}`;
        this.setCookie("googtrans", cookieVal);

        // Adjust RTL / LTR dynamically based on language code
        if (this.RTL_LANGS.includes(langCode)) {
            document.body.classList.add("rtl");
            document.documentElement.setAttribute("dir", "rtl");
        } else {
            const nativeLang = localStorage.getItem("matchwise_lang") || "en";
            if (nativeLang !== "ar") {
                document.body.classList.remove("rtl");
                document.documentElement.setAttribute("dir", "ltr");
            }
        }

        // If Google Translate combo dropdown is already rendered, trigger it directly
        const combo = document.querySelector(".goog-te-combo");
        if (combo) {
            combo.value = langCode;
            combo.dispatchEvent(new Event("change"));
        } else {
            // Reload page so Google Translate reads the newly saved cookie
            window.location.reload();
        }
    },

    reset() {
        this.deleteCookie("googtrans");
        const combo = document.querySelector(".goog-te-combo");
        if (combo) {
            combo.value = "";
            combo.dispatchEvent(new Event("change"));
        }
        window.location.reload();
    },

    setCookie(name, value) {
        const domain = window.location.hostname;
        document.cookie = `${name}=${value};path=/;domain=${domain}`;
        document.cookie = `${name}=${value};path=/;`;
    },

    deleteCookie(name) {
        const domain = window.location.hostname;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=${domain}`;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    },

    getSavedLanguage() {
        const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]*)/);
        if (match && match[1]) {
            const parts = match[1].split("/");
            return parts[parts.length - 1] || "";
        }
        return "";
    },

    syncQuickSelector() {
        const selector = document.getElementById("googleTranslateQuickSelector");
        if (!selector) return;
        const current = this.getSavedLanguage();
        if (current) {
            const option = selector.querySelector(`option[value="${current}"]`);
            if (option) {
                selector.value = current;
            }
        }
    }
};

window.googleTranslateElementInit = function() {
    GoogleTranslateHelper.initElement();
};

if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => GoogleTranslateHelper.init());
    } else {
        GoogleTranslateHelper.init();
    }
}

// Export to global window namespace & CommonJS for testing
if (typeof window !== "undefined") {
    window.Localization = Localization;
    window.Storage = Storage;
    window.ThemeManager = ThemeManager;
    window.Cryptography = Cryptography;
    window.GoogleTranslateHelper = GoogleTranslateHelper;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports = { Localization, Storage, ThemeManager, Cryptography, GoogleTranslateHelper };
}

