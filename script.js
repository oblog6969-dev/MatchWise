/**
 * MatchWise Lite v2.9.0
 * script.js - Core SPA Coordinator & Adaptive Question Engine
 */

document.addEventListener("DOMContentLoaded", () => {
    // --- 1. STATE INITIALIZATION ---
    let questions = [];
    let state = {
        currentPanel: "panelHome",
        localization: new window.Localization(),
        themeManager: new window.ThemeManager(),
        sessionAnswers: {}, // Stores currently running assessment answers
        assessmentSession: {
            personName: "",
            history: [] // question ID history to support dynamic backing up
        },
        isAiMode: true,
        aiService: null,
        activeReportA: null,
        activeReportB: null
    };

    // --- 2. DOM ELEMENT CACHE ---
    const dom = {
        languageSelector: document.getElementById("languageSelector"),
        googleTranslateQuickSelector: document.getElementById("googleTranslateQuickSelector"),
        googleTranslateElement: document.getElementById("google_translate_element"),
        themeToggleBtn: document.getElementById("themeToggleBtn"),
        
        // Panels
        panelHome: document.getElementById("panelHome"),
        panelAssessment: document.getElementById("panelAssessment"),
        panelDashboard: document.getElementById("panelDashboard"),
        panelReport: document.getElementById("panelReport"),
        
        // Navigation Buttons
        btnStartNewAssessment: document.getElementById("btnStartNewAssessment"),
        btnStartAIAssessment: document.getElementById("btnStartAIAssessment"),
        btnGoToDashboard: document.getElementById("btnGoToDashboard"),
        btnHomeFromDashboard: document.getElementById("btnHomeFromDashboard"),
        btnDashboardFromReport: document.getElementById("btnDashboardFromReport"),
        btnExportPDF: document.getElementById("btnExportPDF"),
        btnPrintReport: document.getElementById("btnPrintReport"),
        
        // Assessment elements
        questionCategory: document.getElementById("questionCategory"),
        questionCountBadge: document.getElementById("questionCountBadge"),
        autoAdvanceBadge: document.getElementById("autoAdvanceBadge"),
        questionCard: document.getElementById("questionCard"),
        progressPercent: document.getElementById("progressPercent"),
        progressBarFill: document.getElementById("progressBarFill"),
        questionText: document.getElementById("questionText"),
        answerOptionsContainer: document.getElementById("answerOptionsContainer"),
        btnBackQuestion: document.getElementById("btnBackQuestion"),
        btnNextQuestion: document.getElementById("btnNextQuestion"),
        
        // Dashboard elements
        profileFileInput: document.getElementById("profileFileInput"),
        profileCodeInput: document.getElementById("profileCodeInput"),
        btnImportCode: document.getElementById("btnImportCode"),
        btnCompareSelected: document.getElementById("btnCompareSelected"),
        btnCompareText: document.getElementById("btnCompareText"),
        btnLoadDemoProfiles: document.getElementById("btnLoadDemoProfiles"),
        profilesListContainer: document.getElementById("profilesListContainer"),
        
        // Report Elements
        reportSectionSummary: document.getElementById("reportSectionSummary"),
        gaugeCardContainer: document.getElementById("gaugeCardContainer"),
        radarChartCard: document.getElementById("radarChartCard"),
        radarChartTitle: document.getElementById("radarChartTitle"),
        barChartTitle: document.getElementById("barChartTitle"),
        reportOverallIndex: document.getElementById("reportOverallIndex"),
        circleProgressFill: document.getElementById("circleProgressFill"),
        reportConfidence: document.getElementById("reportConfidence"),
        reportExecutiveSummaryText: document.getElementById("reportExecutiveSummaryText"),
        reportHeaderPersonA: document.getElementById("reportHeaderPersonA"),
        reportHeaderPersonB: document.getElementById("reportHeaderPersonB"),
        reportIdA: document.getElementById("reportIdA"),
        reportIdB: document.getElementById("reportIdB"),
        reportDateA: document.getElementById("reportDateA"),
        reportDateB: document.getElementById("reportDateB"),
        reportVerA: document.getElementById("reportVerA"),
        reportVerB: document.getElementById("reportVerB"),
        reportConfidenceA: document.getElementById("reportConfidenceA"),
        reportConfidenceB: document.getElementById("reportConfidenceB"),
        
        radarChartContainer: document.getElementById("radarChartContainer"),
        bigFiveBarChartContainer: document.getElementById("bigFiveBarChartContainer"),
        
        mbtiBadgeA: document.getElementById("mbtiBadgeA"),
        mbtiBadgeB: document.getElementById("mbtiBadgeB"),
        attachmentBadgeA: document.getElementById("attachmentBadgeA"),
        attachmentBadgeB: document.getElementById("attachmentBadgeB"),
        commBadgeA: document.getElementById("commBadgeA"),
        commBadgeB: document.getElementById("commBadgeB"),
        conflictBadgeA: document.getElementById("conflictBadgeA"),
        conflictBadgeB: document.getElementById("conflictBadgeB"),

        // Multi-Framework Badges (Executive Overview Table)
        hartmanBadgeA: document.getElementById("hartmanBadgeA"),
        hartmanBadgeB: document.getElementById("hartmanBadgeB"),
        discBadgeA: document.getElementById("discBadgeA"),
        discBadgeB: document.getElementById("discBadgeB"),
        birkmanBadgeA: document.getElementById("birkmanBadgeA"),
        birkmanBadgeB: document.getElementById("birkmanBadgeB"),
        gottmanBadgeA: document.getElementById("gottmanBadgeA"),
        gottmanBadgeB: document.getElementById("gottmanBadgeB"),

        // Chapter 1 Overview Badges
        mbtiOverviewA: document.getElementById("mbtiOverviewA"),
        mbtiOverviewB: document.getElementById("mbtiOverviewB"),
        hartmanOverviewA: document.getElementById("hartmanOverviewA"),
        hartmanOverviewB: document.getElementById("hartmanOverviewB"),
        discOverviewA: document.getElementById("discOverviewA"),
        discOverviewB: document.getElementById("discOverviewB"),
        attachmentOverviewA: document.getElementById("attachmentOverviewA"),
        attachmentOverviewB: document.getElementById("attachmentOverviewB"),

        // Multi-Framework Sections
        operatingManualContainer: document.getElementById("operatingManualContainer"),
        operatingManualSection: document.getElementById("operatingManualSection"),
        conflictProtocolSection: document.getElementById("conflictProtocolSection"),
        fairFightingContainer: document.getElementById("fairFightingContainer"),

        // Storytelling Chapters & Interactive Visualizers
        btnTogglePrintPreview: document.getElementById("btnTogglePrintPreview"),
        hartmanChartContainer: document.getElementById("hartmanChartContainer"),
        discQuadrantContainer: document.getElementById("discQuadrantContainer"),
        birkmanIcebergContainer: document.getElementById("birkmanIcebergContainer"),
        attachmentGridContainer: document.getElementById("attachmentGridContainer"),
        firoExchangeContainer: document.getElementById("firoExchangeContainer"),
        gottmanGaugeContainer: document.getElementById("gottmanGaugeContainer"),
        dyadicConflictLoopContainer: document.getElementById("dyadicConflictLoopContainer"),
        dyadicConflictCard: document.getElementById("dyadicConflictCard"),
        consciousnessSpectrumContainer: document.getElementById("consciousnessSpectrumContainer"),
        hawkinsBadgeA: document.getElementById("hawkinsBadgeA"),
        hawkinsBadgeB: document.getElementById("hawkinsBadgeB"),
        hicksBadgeA: document.getElementById("hicksBadgeA"),
        hicksBadgeB: document.getElementById("hicksBadgeB"),
        
        chapter1Badge: document.getElementById("chapter1Badge"),
        chapter1Title: document.getElementById("chapter1Title"),
        chapter1Desc: document.getElementById("chapter1Desc"),
        chapter2Badge: document.getElementById("chapter2Badge"),
        chapter2Title: document.getElementById("chapter2Title"),
        chapter2Desc: document.getElementById("chapter2Desc"),
        chapter3Badge: document.getElementById("chapter3Badge"),
        chapter3Title: document.getElementById("chapter3Title"),
        chapter3Desc: document.getElementById("chapter3Desc"),
        chapter4Badge: document.getElementById("chapter4Badge"),
        chapter4Title: document.getElementById("chapter4Title"),
        chapter4Desc: document.getElementById("chapter4Desc"),
        chapter5Badge: document.getElementById("chapter5Badge"),
        chapter5Title: document.getElementById("chapter5Title"),
        chapter5Desc: document.getElementById("chapter5Desc"),

        // AI Configuration Elements
        btnOpenAiSettings: document.getElementById("btnOpenAiSettings"),
        modalAiConfigForm: document.getElementById("modalAiConfigForm"),
        selectAiProvider: document.getElementById("selectAiProvider"),
        inputAiApiKey: document.getElementById("inputAiApiKey"),
        inputAiGuidanceToggle: document.getElementById("inputAiGuidanceToggle"),
        aiInsightsSection: document.getElementById("aiInsightsSection"),
        reportAIInsightsContainer: document.getElementById("reportAIInsightsContainer"),

        // AI Educational Guidance Elements
        landingInstructionContainer: document.getElementById("landingInstructionContainer"),
        landingInstructionTitle: document.getElementById("landingInstructionTitle"),
        landingInstructionText: document.getElementById("landingInstructionText"),
        questionInstructionContainer: document.getElementById("questionInstructionContainer"),
        questionInstructionTitle: document.getElementById("questionInstructionTitle"),
        questionInstructionText: document.getElementById("questionInstructionText"),
        btnClarifyTip: document.getElementById("btnClarifyTip"),
        btnClarifyText: document.getElementById("btnClarifyText"),
        reportInstructionContainer: document.getElementById("reportInstructionContainer"),
        reportInstructionTitle: document.getElementById("reportInstructionTitle"),
        reportInstructionText: document.getElementById("reportInstructionText"),
        
        reportStrengthsList: document.getElementById("reportStrengthsList"),
        reportChallengesList: document.getElementById("reportChallengesList"),
        reportSectionDealbreakers: document.getElementById("reportSectionDealbreakers"),
        reportDealbreakersList: document.getElementById("reportDealbreakersList"),
        reportDiscussionList: document.getElementById("reportDiscussionList"),
        reportGrowthList: document.getElementById("reportGrowthList"),
        reportRecommendationsContainer: document.getElementById("reportRecommendationsContainer"),
        
        // Modals
        modalBackdrop: document.getElementById("modalBackdrop"),
        modalTitle: document.getElementById("modalTitle"),
        modalBody: document.getElementById("modalBody"),
        btnModalCancel: document.getElementById("btnModalCancel"),
        btnModalSubmit: document.getElementById("btnModalSubmit")
    };

    // --- 3. PURGE POISONED CACHE & INITIALIZE QUESTIONS ---
    try {
        if (typeof localStorage !== "undefined") {
            Object.keys(localStorage).forEach(k => {
                if (k.startsWith("instruction_")) {
                    const val = localStorage.getItem(k);
                    if (val && (val.includes("Quick tip:") || val.includes("نصيحة سريعة:"))) {
                        localStorage.removeItem(k);
                    }
                }
            });
        }
    } catch(e) {}

    if (typeof window !== "undefined" && window.MATCHWISE_QUESTIONS && Array.isArray(window.MATCHWISE_QUESTIONS) && window.MATCHWISE_QUESTIONS.length > 0) {
        questions = window.MATCHWISE_QUESTIONS;
        renderSavedProfiles();
    } else {
        fetch("questions.json")
            .then(response => response.json())
            .then(data => {
                if (data && Array.isArray(data) && data.length > 0) {
                    questions = data;
                    renderSavedProfiles();
                }
            })
            .catch(err => {
                console.warn("fetch failed, using offline embedded questions data if available.", err);
            });
    }


    // --- 4. LANGUAGE & THEME EVENTS ---
    dom.languageSelector.value = state.localization.currentLang;
    state.localization.translateDOM();

    dom.languageSelector.addEventListener("change", (e) => {
        state.localization.setLanguage(e.target.value);
        renderLandingInstruction();
        if (state.currentPanel === "panelAssessment") {
            renderCurrentQuestion();
        } else if (state.currentPanel === "panelDashboard") {
            renderSavedProfiles();
        } else if (state.currentPanel === "panelReport" && state.activeReportA) {
            generateAndRenderReport(state.activeReportA, state.activeReportB);
        }

        // Keep compare button text in sync with new language
        if (dom.btnCompareText) {
            const selectedCount = dom.profilesListContainer ? dom.profilesListContainer.querySelectorAll(".premium-checkbox:checked").length : 0;
            if (selectedCount === 2) {
                dom.btnCompareText.textContent = state.localization.get("btn_compare_two");
            } else if (selectedCount === 1) {
                dom.btnCompareText.textContent = state.localization.get("btn_view_selected");
            } else {
                dom.btnCompareText.textContent = state.localization.get("btn_compare_selected");
            }
        }
    });

    // Google Translate Multi-Language Switcher Events
    if (dom.googleTranslateQuickSelector) {
        dom.googleTranslateQuickSelector.addEventListener("change", (e) => {
            const val = e.target.value;
            if (val === "more") {
                // Toggle the full Google Translate official gadget box
                if (dom.googleTranslateElement) {
                    dom.googleTranslateElement.classList.toggle("active");
                }
            } else if (val === "reset") {
                if (window.GoogleTranslateHelper) {
                    window.GoogleTranslateHelper.reset();
                }
            } else if (val) {
                if (window.GoogleTranslateHelper) {
                    window.GoogleTranslateHelper.setLanguage(val);
                }
            }
        });
    }

    // Dismiss Google Translate gadget box when clicking outside
    document.addEventListener("click", (e) => {
        if (dom.googleTranslateElement && dom.googleTranslateElement.classList.contains("active")) {
            const wrapper = e.target.closest(".google-translate-wrapper");
            if (!wrapper) {
                dom.googleTranslateElement.classList.remove("active");
            }
        }
    });

    dom.themeToggleBtn.addEventListener("click", () => {
        state.themeManager.toggleTheme();
    });

    window.addEventListener("matchwise_theme_changed", () => {
        if (state.currentPanel === "panelReport" && state.activeReportA) {
            generateAndRenderReport(state.activeReportA, state.activeReportB);
        }
    });

    // --- 5. PANEL SPA COORDINATOR ---
    function navigateTo(panelId) {
        // Hide all
        const panels = document.querySelectorAll(".spa-panel");
        panels.forEach(p => {
            p.classList.remove("active-panel");
        });
        
        // Show target
        const target = document.getElementById(panelId);
        if (target) {
            target.classList.add("active-panel");
            state.currentPanel = panelId;
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

    dom.btnStartNewAssessment.addEventListener("click", () => {
        promptForName((userData) => {
            if (userData && userData.name && userData.name.trim()) {
                state.isAiMode = true;
                if (!state.aiService) state.aiService = new window.AIService();
                state.assessmentSession.personName = userData.name.trim();
                state.assessmentSession.gender = userData.gender;
                state.assessmentSession.maritalStatus = userData.maritalStatus;
                state.sessionAnswers = {};
                state.assessmentSession.history = ["q1"]; // Force q1 as starting point
                navigateTo("panelAssessment");
                renderCurrentQuestion();
            }
        });
    });

    // AI Settings Modal Opener
    if (dom.btnOpenAiSettings) {
        dom.btnOpenAiSettings.addEventListener("click", () => {
            if (!state.aiService) state.aiService = new window.AIService();
            dom.modalTitle.textContent = state.localization.currentLang === "ar" ? "إعدادات الذكاء الاصطناعي (DeepSeek Pro)" : "AI Settings (DeepSeek Pro)";
            
            // Hide other modal forms
            document.getElementById("modalStartForm").style.display = "none";
            document.getElementById("modalFeedbackContent").style.display = "none";
            dom.modalAiConfigForm.style.display = "block";
            
            // Populate current values
            dom.selectAiProvider.value = state.aiService.provider || "builtin";
            dom.inputAiApiKey.value = (state.aiService.apiKey && state.aiService.apiKey !== "YOUR_API_KEY_HERE") ? state.aiService.apiKey : "";
            if (dom.inputAiGuidanceToggle) {
                dom.inputAiGuidanceToggle.checked = state.aiGuidanceEnabled !== false;
            }

            dom.modalBackdrop.classList.add("active-backdrop");
            dom.btnModalSubmit.style.display = "block";

            const saveAiSettings = () => {
                const prov = dom.selectAiProvider.value;
                const key = dom.inputAiApiKey.value.trim();
                state.aiService.setConfiguration(prov, key);
                state.isAiMode = true;
                if (dom.inputAiGuidanceToggle) {
                    const isEnabled = dom.inputAiGuidanceToggle.checked;
                    state.aiGuidanceEnabled = isEnabled;
                    localStorage.setItem("mw_ai_guide_enabled", isEnabled ? "true" : "false");
                    renderLandingInstruction();
                }
                cleanup();
                dom.modalBackdrop.classList.remove("active-backdrop");
                showFeedbackModal(
                    state.localization.currentLang === "ar" ? "تم الحفظ" : "Settings Saved",
                    state.localization.currentLang === "ar" ? `تم تحديث مزود الذكاء الاصطناعي إلى: ${prov}` : `AI Provider successfully set to: ${prov}`
                );
            };

            const cancelAiSettings = () => {
                cleanup();
                dom.modalBackdrop.classList.remove("active-backdrop");
            };

            function cleanup() {
                dom.btnModalSubmit.removeEventListener("click", saveAiSettings);
                dom.btnModalCancel.removeEventListener("click", cancelAiSettings);
            }

            dom.btnModalSubmit.addEventListener("click", saveAiSettings);
            dom.btnModalCancel.addEventListener("click", cancelAiSettings);
        });
    }

    // --- AI EDUCATIONAL GUIDANCE CONTROLLER ---
    state.aiGuidanceEnabled = localStorage.getItem("mw_ai_guide_enabled") !== "false";

    async function renderLandingInstruction() {
        if (!dom.landingInstructionContainer) return;
        if (!state.aiGuidanceEnabled) {
            dom.landingInstructionContainer.style.display = "none";
            return;
        }

        const isAr = state.localization.currentLang === "ar";
        dom.landingInstructionContainer.style.display = "flex";
        dom.landingInstructionTitle.textContent = isAr ? "✨ نصيحة الجاهزية الذكية للتقييم" : "✨ AI Clinical Readiness Tip";
        dom.landingInstructionText.textContent = isAr ? "جارٍ تحضير إرشادات الاستعداد للتقييم..." : "Preparing assessment guidance...";

        try {
            if (!state.aiService) state.aiService = new window.AIService();
            const tip = await state.aiService.generateInstruction("landing", isAr ? "ar" : "en");
            dom.landingInstructionText.textContent = tip;
        } catch (e) {
            dom.landingInstructionText.textContent = isAr
                ? "أجب بعفوية وصدق بناءً على واقعك الحقيقي وتصرفاتك التلقائية، وليس ما تتمنى أن تكون عليه، لضمان أعلى دقة في كشف محركات الشخصية."
                : "Answer spontaneously reflecting your real everyday self rather than ideal wishes, ensuring deep psychological precision across all 10 frameworks.";
        }
    }

    // Trigger landing instruction initially
    renderLandingInstruction();

    // Toggle Print Preview Mode
    if (dom.btnTogglePrintPreview) {
        dom.btnTogglePrintPreview.addEventListener("click", () => {
            document.body.classList.toggle("print-preview-active");
            dom.btnTogglePrintPreview.classList.toggle("active");
            const isActive = document.body.classList.contains("print-preview-active");
            const isAr = state.localization.currentLang === "ar";
            const span = dom.btnTogglePrintPreview.querySelector("span");
            if (span) {
                span.textContent = isActive
                    ? (isAr ? "إغلاق معاينة الطباعة" : "Exit Print View")
                    : (isAr ? "معاينة الطباعة" : "Toggle Print View");
            }
        });
    }

    dom.btnGoToDashboard.addEventListener("click", () => {
        navigateTo("panelDashboard");
        renderSavedProfiles();
    });

    // Load Live Demo Profiles Button
    if (dom.btnLoadDemoProfiles) {
        dom.btnLoadDemoProfiles.addEventListener("click", () => {
            if (window.DEMO_PROFILES && window.DEMO_PROFILES.length > 0) {
                localStorage.setItem("matchwise_profiles", JSON.stringify(window.DEMO_PROFILES));
                renderSavedProfiles();
                showFeedbackModal(
                    state.localization.currentLang === "ar" ? "تم تحميل الملفات بنجاح" : "Live Demo Profiles Loaded",
                    state.localization.currentLang === "ar"
                        ? "تم تحميل ملفين نفسيين متكاملين (طارق المنصور ونور الصباح) لتجربة المقارنة التفاعلية الفورية."
                        : "Successfully loaded clinical test archetypes: Tariq Al-Mansoor (Executive Leader) & Nour Al-Sabah (Empathetic Harmonizer)!"
                );
            }
        });
    }

    dom.btnHomeFromDashboard.addEventListener("click", () => navigateTo("panelHome"));
    dom.btnDashboardFromReport.addEventListener("click", () => navigateTo("panelDashboard"));
    
    // PDF Export & Native Print
    if (dom.btnExportPDF) {
        dom.btnExportPDF.addEventListener("click", exportReportToPDF);
    }

    dom.btnPrintReport.addEventListener("click", () => {
        window.print();
    });

    async function exportReportToPDF() {
        const reportElem = document.getElementById("printableReportDocument");
        if (!reportElem) return;
        const btn = dom.btnExportPDF;
        const originalContent = btn ? btn.innerHTML : "";
        const isAr = state.localization.currentLang === "ar";
        
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = `<span style="display:inline-block; animation: pulse 1s infinite;">⏳</span> <span>${state.localization.get("export_pdf_loading")}</span>`;
        }

        try {
            window.scrollTo({ top: 0, behavior: "instant" });

            if (!window.html2canvas || !(window.jspdf || window.jsPDF)) {
                window.print();
                return;
            }

            // 1. Apply Executive Light Dossier styling (clean pure white background, dark high-contrast typography)
            reportElem.classList.add("exporting-pdf");
            await new Promise(r => setTimeout(r, 80)); // Allow styles to reflow

            const { jsPDF } = window.jspdf || window;
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
                compress: true
            });

            const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm
            const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm
            const marginX = 8;
            const marginY = 8;
            const maxUsableW = pageWidth - (marginX * 2); // 194mm
            const maxUsableH = pageHeight - (marginY * 2); // 281mm

            // 2. Select logical pages (only visible ones)
            let pages = Array.from(reportElem.querySelectorAll(".print-dossier-page")).filter(p => {
                return p.offsetHeight > 40 && window.getComputedStyle(p).display !== "none";
            });

            if (pages.length === 0) {
                pages = [reportElem];
            }

            for (let i = 0; i < pages.length; i++) {
                const pageContainer = pages[i];

                const canvas = await window.html2canvas(pageContainer, {
                    scale: 2, // Crisp 2x supersampling for text, icons and SVGs
                    useCORS: true,
                    logging: false,
                    allowTaint: true,
                    backgroundColor: "#ffffff",
                    windowWidth: 1050
                });

                const imgData = canvas.toDataURL("image/jpeg", 0.95);

                // Calculate aspect-ratio fit
                let imgW = maxUsableW;
                let imgH = (canvas.height * imgW) / canvas.width;

                // Scale down slightly if content exceeds A4 height to prevent awkward clipping
                if (imgH > maxUsableH) {
                    const shrinkRatio = maxUsableH / imgH;
                    imgH = maxUsableH;
                    imgW = imgW * shrinkRatio;
                }

                // Center horizontally on page
                const posX = marginX + (maxUsableW - imgW) / 2;
                const posY = marginY;

                pdf.addImage(imgData, "JPEG", posX, posY, imgW, imgH, undefined, "FAST");

                // Add page break if there's an upcoming page
                if (i < pages.length - 1) {
                    pdf.addPage();
                }
            }

            const nameA = (state.activeReportA?.owner_name || "Profile").replace(/[^\w\u0600-\u06FF]/gi, "_");
            const nameB = state.activeReportB ? `-${state.activeReportB.owner_name.replace(/[^\w\u0600-\u06FF]/gi, "_")}` : "";
            const filename = `MatchWise_${isAr ? "تقرير_التوافق" : "Compatibility_Report"}_${nameA}${nameB}.pdf`;
            pdf.save(filename);
        } catch (err) {
            console.error("PDF Export error:", err);
            window.print();
        } finally {
            if (reportElem) {
                reportElem.classList.remove("exporting-pdf");
            }
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = originalContent;
            }
        }
    }

    // --- 6. ADAPTIVE QUESTION ENGINE ---
    const CATEGORY_TRANSLATIONS = {
        "Personality": "سمات الشخصية",
        "Communication": "أسلوب التواصل",
        "Conflict": "إدارة الخلافات",
        "Decision making": "اتخاذ القرارات",
        "Money": "الشؤون المالية والإنفاق",
        "Boundaries": "الحدود والخصوصية",
        "Children": "الأطفال والتربية",
        "Religion": "القيم الدينية والروحية",
        "Career": "الطموح والمسار المهني",
        "Lifestyle": "أسلوب الحياة والسكن",
        "Trust": "الثقة والاطمئنان",
        "Emotional intelligence": "الذكاء العاطفي",
        "Affection": "لغات الحب والمودة",
        "Marriage": "الرؤية الزوجية والشراكة",
        "Future planning": "التخطيط المستقبلي",
        "Family": "العلاقات والحدود الأسرية",
        "Awareness & Consciousness": "مستوى الوعي والاتزان"
    };

    const RADAR_CATEGORY_TRANSLATIONS = {
        "Personality": "سمات الشخصية",
        "Emotional Safety": "الأمان العاطفي",
        "Conflict Dynamics": "ديناميكية الخلاف",
        "Core Values": "منظومة القيم",
        "Finances": "الشؤون المالية",
        "Housing & Boundaries": "السكن والحدود",
        "Children & Parenting": "الأطفال والتربية",
        "Cultural & Spiritual": "القيم الروحية والثقافية",
        "Aesthetic Alignment": "التناغم الشكلي والجمالي",
        "Awareness & Consciousness": "طيف الوعي والرنين الترددي",
        "Communication": "أسلوب التواصل",
        "Conflict": "إدارة الخلافات",
        "Money": "التوافق المالي",
        "Lifestyle": "نمط الحياة",
        "Family": "الحدود العائلية",
        "Children": "الأطفال والتربية",
        "Religion": "القيم الدينية",
        "Emotional Needs": "الاحتياجات العاطفية",
        "Marriage": "الرؤية الزوجية",
        "Ideology Alignment": "التوافق الفكري"
    };

    const BIG_FIVE_TRANSLATIONS = {
        "openness": { ar: "الانفتاح على التجارب", en: "Openness to Experience" },
        "conscientiousness": { ar: "الانضباط والتنظيم", en: "Conscientiousness" },
        "extroversion": { ar: "الانبساطية والاجتماعية", en: "Extraversion" },
        "agreeableness": { ar: "الوفاق والتعاطف", en: "Agreeableness" },
        "neuroticism": { ar: "الحساسية للضغوط", en: "Emotional Reactivity (Neuroticism)" }
    };

    const ATTACHMENT_MAP = {
        secure: { ar: "آمن ومتزن", en: "SECURE" },
        anxious: { ar: "قلق وباحث عن الاطمئنان", en: "ANXIOUS" },
        avoidant: { ar: "تجنبي ومستقل", en: "AVOIDANT" },
        fearful: { ar: "متردد وحذر", en: "FEARFUL" }
    };

    const COMMUNICATION_MAP = {
        assertive: { ar: "حازم ومباشر", en: "ASSERTIVE" },
        passive: { ar: "هادئ ومساير", en: "PASSIVE" },
        passive_aggressive: { ar: "غير مباشر", en: "PASSIVE-AGGRESSIVE" },
        reserved: { ar: "متحفظ ومتأنٍ", en: "RESERVED" }
    };

    const CONFLICT_MAP = {
        collaborating: { ar: "تعاوني بنّاء", en: "COLLABORATING" },
        competing: { ar: "حازم وتنافسي", en: "COMPETING" },
        avoiding: { ar: "تجنبي وهادئ", en: "AVOIDING" },
        compromising: { ar: "توافقي ومرن", en: "COMPROMISING" },
        accommodating: { ar: "مبادر بالإرضاء", en: "ACCOMMODATING" }
    };

    const HARTMAN_MAP = {
        red: { ar: "الأحمر (القيادة والإنجاز)", en: "RED" },
        blue: { ar: "الأزرق (العمق والوفاء)", en: "BLUE" },
        white: { ar: "الأبيض (السلام والسكينة)", en: "WHITE" },
        yellow: { ar: "الأصفر (المرح والبهجة)", en: "YELLOW" }
    };

    const BIRKMAN_NEED_MAP = {
        empathy: { ar: "التعاطف والتفهم الصادق", en: "EMPATHY" },
        freedom: { ar: "المساحة والاستقلالية", en: "FREEDOM" },
        structure: { ar: "الوضوح والنظام المحدد", en: "STRUCTURE" },
        respect: { ar: "الاحترام والتقدير", en: "RESPECT" },
        affirmation: { ar: "التشجيع والاطمئنان", en: "AFFIRMATION" },
        directness: { ar: "الصراحة والوضوح", en: "DIRECTNESS" },
        patience: { ar: "التأني والرفق", en: "PATIENCE" }
    };

    const BIRKMAN_STYLE_MAP = {
        assertive: { ar: "الحزم والمبادرة المباشرة", en: "Assertive" },
        supportive: { ar: "الدعم والتعاطف الوجداني", en: "Supportive" },
        reflective: { ar: "التأمل والتروي الهادئ", en: "Reflective" },
        organized: { ar: "التنظيم والمنهجية الواضحة", en: "Organized" }
    };

    const BIRKMAN_STRESS_MAP = {
        withdrawing: { ar: "الانعزال والصمت الدفاعي", en: "withdrawing" },
        demanding: { ar: "الإلحاح والمطالبة المباشرة", en: "demanding" },
        impatient: { ar: "الاستعجال ونفاد الصبر", en: "impatient" },
        resisting: { ar: "المقاومة السلبية", en: "resisting" },
        compliant: { ar: "المسايرة مع كتمان الضيق", en: "compliant" }
    };

    /**
     * Checks if a question is eligible for the user based on gender and marital status constraints.
     */
    function isQuestionEligibleForUser(q, gender, maritalStatus, answers = null) {
        if (!q) return false;
        if (answers && answers[q.id] !== undefined) return false;
        if (q.gender_constraint && gender && q.gender_constraint !== gender) return false;
        if (q.marital_constraint && maritalStatus && q.marital_constraint !== maritalStatus) return false;
        return true;
    }

    /**
     * Returns all unanswered questions strictly eligible for the current user's demographic profile.
     */
    function getEligibleRemainingQuestions() {
        const currentGender = state.assessmentSession.gender;
        const currentMarital = state.assessmentSession.maritalStatus;
        return questions.filter(q => isQuestionEligibleForUser(q, currentGender, currentMarital, state.sessionAnswers));
    }

    /**
     * Checks if any eligible unanswered question remains in the pool.
     */
    function hasNextQuestion() {
        return getEligibleRemainingQuestions().length > 0;
    }

    /**
     * Finds the next question dynamically.
     * Evaluates followups and selects optimal adaptive candidate from demographically eligible questions.
     */
    function getNextQuestionId(currentQId) {
        const currentGender = state.assessmentSession.gender;
        const currentMarital = state.assessmentSession.maritalStatus;

        // Check for specific follow-ups if present
        const currentQ = questions.find(q => q.id === currentQId);
        if (currentQ && currentQ.followups && currentQ.followups.length > 0) {
            const answer = state.sessionAnswers[currentQId];
            for (const followup of currentQ.followups) {
                const targetQ = questions.find(q => q.id === followup.next_id);
                if (targetQ && isQuestionEligibleForUser(targetQ, currentGender, currentMarital, state.sessionAnswers)) {
                    if (followup.condition === "agree" && parseInt(answer, 10) >= 5) {
                        return followup.next_id;
                    }
                    if (followup.condition === "disagree" && parseInt(answer, 10) <= 3) {
                        return followup.next_id;
                    }
                }
            }
        }

        const eligibleRemaining = getEligibleRemainingQuestions();
        if (eligibleRemaining.length === 0) return null;

        // Use autonomous psychometric CAT selector to find optimal next question
        if (state.aiService && typeof state.aiService.determineNextQuestionAutonomous === "function") {
            let currentProfile = {};
            try {
                if (window.PersonalityEngine) {
                    currentProfile = window.PersonalityEngine.calculate(state.sessionAnswers, questions);
                }
            } catch (e) {
                console.warn(e);
            }
            const autonomousResult = state.aiService.determineNextQuestionAutonomous(
                state.sessionAnswers,
                eligibleRemaining,
                currentProfile,
                state.localization.currentLang,
                { gender: currentGender, maritalStatus: currentMarital, name: state.assessmentSession.personName },
                state.assessmentSession.history,
                questions
            );
            if (autonomousResult && autonomousResult.nextQuestionId) {
                state.currentClinicalReason = autonomousResult.clinicalReason;
                return autonomousResult.nextQuestionId;
            }
        }

        // Direct fallback: pick first eligible remaining question
        return eligibleRemaining[0].id;
    }

    // Auto-advance controller for single-select questions
    let isAutoAdvancing = false;
    let autoAdvanceTimer = null;

    function clearAutoAdvance() {
        if (autoAdvanceTimer) {
            clearTimeout(autoAdvanceTimer);
            autoAdvanceTimer = null;
        }
        isAutoAdvancing = false;
    }

    function triggerAutoAdvance(delay = 300) {
        clearAutoAdvance();
        // Do not auto-advance on the last question; allow the user to review and click Finish intentionally
        if (!hasNextQuestion()) return;

        isAutoAdvancing = true;
        autoAdvanceTimer = setTimeout(async () => {
            try {
                await advanceToNextQuestion();
            } finally {
                isAutoAdvancing = false;
                autoAdvanceTimer = null;
            }
        }, delay);
    }

    async function advanceToNextQuestion() {
        const history = state.assessmentSession.history;
        const currentQId = history[history.length - 1];
        
        // Ensure user answered before going forward
        if (state.sessionAnswers[currentQId] === undefined) {
            const isAr = state.localization.currentLang === "ar";
            alert(isAr ? "يرجى الإجابة على السؤال الحالي للمتابعة." : "Please answer the current question to proceed.");
            return;
        }

        // Show loading state
        const nextSpan = dom.btnNextQuestion.querySelector("span");
        const oldText = nextSpan ? nextSpan.textContent : "";
        if (nextSpan) nextSpan.textContent = "...";
        dom.btnNextQuestion.disabled = true;

        let nextQId = null;
        const currentGender = state.assessmentSession.gender;
        const currentMarital = state.assessmentSession.maritalStatus;
        const userDemographics = {
            gender: currentGender,
            maritalStatus: currentMarital,
            name: state.assessmentSession.personName
        };

        try {
            if (state.isAiMode && state.aiService) {
                const aiResponse = await state.aiService.determineNextQuestion(
                    history,
                    state.sessionAnswers,
                    questions,
                    state.localization.currentLang,
                    userDemographics
                );
                if (aiResponse && aiResponse.clinicalReason) {
                    state.currentClinicalReason = aiResponse.clinicalReason;
                }
                if (aiResponse && aiResponse.next_id === "NEW" && aiResponse.new_question) {
                    questions.push(aiResponse.new_question);
                    nextQId = aiResponse.new_question.id;
                } else if (aiResponse && aiResponse.nextQuestionId) {
                    const candQ = questions.find(q => q.id === aiResponse.nextQuestionId);
                    if (candQ && isQuestionEligibleForUser(candQ, currentGender, currentMarital, state.sessionAnswers)) {
                        nextQId = aiResponse.nextQuestionId;
                    } else {
                        nextQId = getNextQuestionId(currentQId);
                    }
                } else {
                    nextQId = getNextQuestionId(currentQId);
                }
            } else {
                nextQId = getNextQuestionId(currentQId);
            }
        } catch (e) {
            console.error(e);
            nextQId = getNextQuestionId(currentQId); // fallback
        }

        dom.btnNextQuestion.disabled = false;
        if (nextSpan && oldText !== undefined && oldText !== null) nextSpan.textContent = oldText;

        if (nextQId) {
            state.assessmentSession.history.push(nextQId);
            renderCurrentQuestion();
        } else {
            // Assessment is complete! Save and Export Profile
            completeAndExportSession();
        }
    }

    function renderCurrentQuestion() {
        clearAutoAdvance();

        const history = state.assessmentSession.history;
        const currentQId = history[history.length - 1];
        const q = questions.find(qu => qu.id === currentQId);

        if (!q) return;

        const isAr = state.localization.currentLang === "ar";

        // Card entrance animation
        if (dom.questionCard) {
            dom.questionCard.classList.remove("q-fade-in");
            void dom.questionCard.offsetWidth; // trigger reflow
            dom.questionCard.classList.add("q-fade-in");
        }

        // Update translations & metadata
        dom.questionCategory.textContent = isAr
            ? (CATEGORY_TRANSLATIONS[q.category] || q.category)
            : q.category;
        
        // Accurate Progress Calculation
        const currentGender = state.assessmentSession.gender;
        const currentMarital = state.assessmentSession.maritalStatus;
        const matchingQuestionsCount = questions.filter(candidate => {
            if (candidate.gender_constraint && candidate.gender_constraint !== currentGender) return false;
            if (candidate.marital_constraint && candidate.marital_constraint !== currentMarital) return false;
            return true;
        }).length || 83;

        const currentLength = history.length;
        const progressPercentage = Math.min(100, Math.round((currentLength / matchingQuestionsCount) * 100));
        dom.progressPercent.textContent = `${progressPercentage}%`;
        dom.progressBarFill.style.width = `${progressPercentage}%`;

        // Question count badge update
        if (dom.questionCountBadge) {
            dom.questionCountBadge.textContent = isAr
                ? `السؤال ${currentLength} من ${matchingQuestionsCount}`
                : `Question ${currentLength} of ${matchingQuestionsCount}`;
        }

        // Dynamic Adaptive Clinical Indicator
        const adaptiveBadgeEl = document.querySelector(".adaptive-note-mini");
        if (adaptiveBadgeEl) {
            if (q.gender_constraint || q.marital_constraint) {
                adaptiveBadgeEl.textContent = isAr ? "🎯 سؤال مخصص لملفك الشخصي" : "🎯 Demographically Targeted Item";
                adaptiveBadgeEl.style.color = "var(--primary-color)";
                adaptiveBadgeEl.title = isAr ? "تم تخصيص هذا السؤال بناءً على حالتك وظروفك الاجتماعية" : "Targeted specifically to your demographic profile";
            } else if (state.currentClinicalReason) {
                adaptiveBadgeEl.textContent = `✨ ${state.currentClinicalReason}`;
                adaptiveBadgeEl.style.color = "var(--text-secondary)";
                adaptiveBadgeEl.title = state.currentClinicalReason;
            } else {
                adaptiveBadgeEl.textContent = isAr ? "✨ محرك التشخيص التكيفي الذكي" : "✨ Adaptive Psychometric Engine";
                adaptiveBadgeEl.style.color = "var(--text-tertiary)";
            }
        }

        // Bilingual Text Support
        const localizedText = isAr ? q.arabic.text : q.english.text;
        dom.questionText.textContent = localizedText;

        // In-Test Educational Guidance Context Injection
        if (dom.questionInstructionContainer) {
            if (state.aiGuidanceEnabled) {
                dom.questionInstructionContainer.style.display = "flex";
                if (dom.questionInstructionTitle) {
                    dom.questionInstructionTitle.textContent = isAr ? "✨ زاوية التأمل النفسي للسؤال" : "✨ AI Reflection Angle";
                }
                if (dom.btnClarifyText) {
                    dom.btnClarifyText.textContent = isAr ? "توضيح أكثر" : "Clarify";
                }
                if (dom.questionInstructionText) {
                    dom.questionInstructionText.textContent = isAr ? "جارٍ تحليل عمق السؤال..." : "Formulating reflection guidance...";
                }

                const catContext = q.category || "General";
                if (state.aiService) {
                    state.aiService.generateInstruction(`question_${q.id}_${catContext}`, isAr ? "ar" : "en").then(tip => {
                        if (dom.questionInstructionText) dom.questionInstructionText.textContent = tip;
                    }).catch(e => {
                        if (dom.questionInstructionText) {
                            dom.questionInstructionText.textContent = isAr 
                                ? "تذكر أن هذا السؤال يقيس أسلوبك التلقائي، لا توجد إجابة صحيحة أو خاطئة."
                                : "Remember, this item assesses your spontaneous baseline; there are no right or wrong answers.";
                        }
                    });
                }
            } else {
                dom.questionInstructionContainer.style.display = "none";
            }
        }

        // Clear previous options
        dom.answerOptionsContainer.innerHTML = "";

        // Toggle auto-advance hint badge for non-ranking questions
        if (dom.autoAdvanceBadge) {
            dom.autoAdvanceBadge.style.display = (q.type === "rank") ? "none" : "inline-flex";
        }

        // Render Inputs by type
        if (q.type === "likert") {
            renderLikertOptions(q);
        } else if (q.type === "choice" || q.type === "scenario") {
            renderMultipleChoiceOptions(q);
        } else if (q.type === "rank") {
            renderPriorityRankingOptions(q);
        }

        // Adjust Next Button text dynamically at end of test
        const hasNext = hasNextQuestion();
        const nextSpan = dom.btnNextQuestion.querySelector("span");
        if (nextSpan) {
            if (!hasNext) {
                nextSpan.textContent = state.localization.get("finish");
                dom.btnNextQuestion.classList.add("btn-finish-pulse");
            } else {
                nextSpan.textContent = state.localization.get("next");
                dom.btnNextQuestion.classList.remove("btn-finish-pulse");
            }
        }

        // Disable back button on first question
        dom.btnBackQuestion.disabled = history.length <= 1;

        // Clarify button event
        if (dom.btnClarifyTip) {
            dom.btnClarifyTip.onclick = async () => {
                if (!state.aiService) return;
                const oldText = dom.btnClarifyText.textContent;
                dom.btnClarifyText.textContent = isAr ? "..." : "...";
                try {
                    const freshTip = await state.aiService.generateInstruction(`question_clarify_${q.id}_${Date.now()}`, isAr ? "ar" : "en");
                    if (dom.questionInstructionText) dom.questionInstructionText.textContent = freshTip;
                } finally {
                    dom.btnClarifyText.textContent = oldText;
                }
            };
        }
    }

    // Input renderer: Modernized Likert Scale (1 to 7) with sentiment badge & auto-advance
    function renderLikertOptions(question) {
        const scaleContainer = document.createElement("div");
        scaleContainer.className = "likert-scale-container";

        const labelsRow = document.createElement("div");
        labelsRow.className = "likert-labels-row";
        labelsRow.innerHTML = `
            <span class="likert-label-end">${state.localization.get("likert_sd")}</span>
            <span class="likert-label-mid">${state.localization.get("likert_n")}</span>
            <span class="likert-label-end">${state.localization.get("likert_sa")}</span>
        `;

        const optionsRow = document.createElement("div");
        optionsRow.className = "likert-options-row";

        const LIKERT_INFO = [
            { key: "likert_sd", color: "#ef4444", bg: "rgba(239, 68, 68, 0.12)" },
            { key: "likert_d",  color: "#f87171", bg: "rgba(248, 113, 113, 0.12)" },
            { key: "likert_sld",color: "#fb923c", bg: "rgba(251, 146, 60, 0.12)" },
            { key: "likert_n",  color: "#64748b", bg: "rgba(100, 116, 139, 0.12)" },
            { key: "likert_sla",color: "#0284c7", bg: "rgba(2, 132, 199, 0.12)" },
            { key: "likert_a",  color: "#2563eb", bg: "rgba(37, 99, 235, 0.12)" },
            { key: "likert_sa", color: "#16a34a", bg: "rgba(22, 163, 74, 0.12)" }
        ];

        // Dynamic sentiment feedback indicator
        const sentimentBadge = document.createElement("div");
        sentimentBadge.className = "likert-sentiment-badge";

        function updateSentiment(val) {
            if (!val || val < 1 || val > 7) {
                sentimentBadge.innerHTML = `<span class="sentiment-placeholder">${state.localization.currentLang === "ar" ? "اضغط على رقم لتحديد مستوى الموافقة" : "Tap a number to rate your agreement"}</span>`;
                return;
            }
            const info = LIKERT_INFO[val - 1];
            const label = state.localization.get(info.key);
            sentimentBadge.innerHTML = `
                <span class="sentiment-pill" style="border-color: ${info.color}; color: ${info.color}; background: ${info.bg};">
                    <span class="sentiment-val">${val}</span>
                    <span class="sentiment-bullet">•</span>
                    <span class="sentiment-text">${label}</span>
                </span>
            `;
        }

        // Show initial sentiment if answer already exists
        const initialVal = state.sessionAnswers[question.id];
        updateSentiment(initialVal);

        // 7 Touch-Friendly Circles (1 to 7)
        optionsRow.setAttribute("role", "radiogroup");
        optionsRow.setAttribute("aria-label", "Agreement scale from 1 to 7");
        for (let i = 1; i <= 7; i++) {
            const circle = document.createElement("div");
            circle.className = "likert-option-circle";
            circle.setAttribute("role", "radio");
            circle.setAttribute("tabindex", "0");
            const isSelected = state.sessionAnswers[question.id] == i;
            circle.setAttribute("aria-checked", isSelected ? "true" : "false");
            circle.setAttribute("aria-label", `${i}: ${state.localization.get(LIKERT_INFO[i - 1].key)}`);
            circle.textContent = i;

            if (isSelected) {
                circle.classList.add("selected-likert");
            }

            const selectLikert = () => {
                if (isAutoAdvancing) return;
                const elements = optionsRow.querySelectorAll(".likert-option-circle");
                elements.forEach(el => {
                    el.classList.remove("selected-likert");
                    el.setAttribute("aria-checked", "false");
                });
                circle.classList.add("selected-likert");
                circle.setAttribute("aria-checked", "true");
                state.sessionAnswers[question.id] = i;
                updateSentiment(i);
                triggerAutoAdvance(300);
            };

            circle.addEventListener("click", selectLikert);
            circle.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    selectLikert();
                }
            });

            optionsRow.appendChild(circle);
        }

        scaleContainer.appendChild(labelsRow);
        scaleContainer.appendChild(optionsRow);
        scaleContainer.appendChild(sentimentBadge);
        dom.answerOptionsContainer.appendChild(scaleContainer);
    }

    // Input renderer: Modernized Multiple Choice & Scenario Questions with card tiles & auto-advance
    function renderMultipleChoiceOptions(question) {
        const list = document.createElement("div");
        list.className = "choice-list";
        list.setAttribute("role", "radiogroup");
        list.setAttribute("aria-label", "Answer options");

        question.options.forEach(opt => {
            const row = document.createElement("div");
            row.className = "choice-option-row";
            row.setAttribute("role", "radio");
            row.setAttribute("tabindex", "0");

            const isSelected = state.sessionAnswers[question.id] === opt.id;
            row.setAttribute("aria-checked", isSelected ? "true" : "false");

            if (isSelected) {
                row.classList.add("selected-choice");
            }

            const radio = document.createElement("div");
            radio.className = "choice-radio-indicator";
            radio.innerHTML = `<span class="radio-inner-dot"></span>`;

            const textDiv = document.createElement("div");
            textDiv.className = "choice-text";
            textDiv.textContent = state.localization.currentLang === "ar" ? opt.arabic : opt.english;

            row.appendChild(radio);
            row.appendChild(textDiv);

            const selectChoice = () => {
                if (isAutoAdvancing) return;
                const siblings = list.querySelectorAll(".choice-option-row");
                siblings.forEach(s => {
                    s.classList.remove("selected-choice");
                    s.setAttribute("aria-checked", "false");
                });
                row.classList.add("selected-choice");
                row.setAttribute("aria-checked", "true");
                state.sessionAnswers[question.id] = opt.id;
                triggerAutoAdvance(300);
            };

            row.addEventListener("click", selectChoice);
            row.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    selectChoice();
                }
            });

            list.appendChild(row);
        });


        dom.answerOptionsContainer.appendChild(list);
    }

    // Input renderer: Priority Ranking Questions (Interactive drag / click lists)
    function renderPriorityRankingOptions(question) {
        const list = document.createElement("div");
        list.className = "ranking-list";

        // Description instructions
        const desc = document.createElement("p");
        desc.className = "drag-rank-desc";
        desc.textContent = state.localization.get("drag_rank_desc");
        list.appendChild(desc);

        // Get current rank state or default to metadata array order
        let itemsOrder = state.sessionAnswers[question.id] || question.items.map(i => i.id);

        function drawItems() {
            // Remove previous rows (excluding description)
            const rows = list.querySelectorAll(".ranking-item-row");
            rows.forEach(r => r.remove());

            itemsOrder.forEach((itemId, index) => {
                const itemMeta = question.items.find(i => i.id === itemId);
                if (!itemMeta) return;

                const row = document.createElement("div");
                row.className = "ranking-item-row";

                const textCol = document.createElement("div");
                textCol.className = "rank-text-col";

                const badge = document.createElement("div");
                badge.className = "rank-index-badge";
                badge.textContent = index + 1;

                const label = document.createElement("span");
                label.textContent = state.localization.currentLang === "ar" ? itemMeta.arabic : itemMeta.english;

                textCol.appendChild(badge);
                textCol.appendChild(label);

                const controlsCol = document.createElement("div");
                controlsCol.className = "rank-controls-col";

                // Up Button
                const btnUp = document.createElement("button");
                btnUp.className = "rank-btn";
                btnUp.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>`;
                btnUp.title = state.localization.get("move_up");
                btnUp.disabled = index === 0;
                btnUp.addEventListener("click", () => {
                    if (index > 0) {
                        const temp = itemsOrder[index - 1];
                        itemsOrder[index - 1] = itemsOrder[index];
                        itemsOrder[index] = temp;
                        state.sessionAnswers[question.id] = itemsOrder;
                        drawItems();
                    }
                });

                // Down Button
                const btnDown = document.createElement("button");
                btnDown.className = "rank-btn";
                btnDown.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>`;
                btnDown.title = state.localization.get("move_down");
                btnDown.disabled = index === itemsOrder.length - 1;
                btnDown.addEventListener("click", () => {
                    if (index < itemsOrder.length - 1) {
                        const temp = itemsOrder[index + 1];
                        itemsOrder[index + 1] = itemsOrder[index];
                        itemsOrder[index] = temp;
                        state.sessionAnswers[question.id] = itemsOrder;
                        drawItems();
                    }
                });

                controlsCol.appendChild(btnUp);
                controlsCol.appendChild(btnDown);

                row.appendChild(textCol);
                row.appendChild(controlsCol);
                list.appendChild(row);
            });
        }

        // Save initial default rank if none existed
        if (!state.sessionAnswers[question.id]) {
            state.sessionAnswers[question.id] = itemsOrder;
        }

        drawItems();
        dom.answerOptionsContainer.appendChild(list);
    }

    // Navigation Controls handling
    dom.btnBackQuestion.addEventListener("click", () => {
        clearAutoAdvance();
        if (state.assessmentSession.history.length > 1) {
            state.assessmentSession.history.pop();
            renderCurrentQuestion();
        }
    });

    dom.btnNextQuestion.addEventListener("click", () => {
        clearAutoAdvance();
        advanceToNextQuestion();
    });

    // --- 7. COMPLETE & PROFILE EXPORT ---
    function completeAndExportSession() {
        // Run Trait calculations
        const calculatedTraits = window.PersonalityEngine.calculate(state.sessionAnswers, questions);
        
        // Build Profile object
        const profileId = "mw_" + Math.random().toString(36).substring(2, 10).toUpperCase();
        const profile = {
            id: profileId,
            owner_name: state.assessmentSession.personName,
            gender: state.assessmentSession.gender || "M",
            marital_status: state.assessmentSession.maritalStatus || "single",
            created_at: new Date().toLocaleDateString(state.localization.currentLang === "ar" ? "ar-EG" : "en-US", {
                year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
            }),
            app_version: "v2.9.0",
            answers: state.sessionAnswers,
            calculated_personality: calculatedTraits,
            assessment_confidence: calculatedTraits.assessment_confidence
        };

        // Save Profile to local storage
        window.Storage.saveProfile(profile);

        // Export encrypted profile as JSON file download
        const encryptedData = window.Cryptography.encrypt(profile);
        const exportObj = {
            matchwise_lite_payload: encryptedData,
            signature_checksum: "MW_SIGN_" + profileId
        };

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
        const downloadAnchor = document.createElement("a");
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `MatchWise_Profile_${profile.owner_name}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();

        // Prompt user of successful save and direct to dashboard
        showFeedbackModal(
            state.localization.get("finish"),
            state.localization.get("export_success_msg"),
            () => {
                navigateTo("panelDashboard");
                renderSavedProfiles();
            }
        );
    }

    // --- 8. DASHBOARD RENDERING & ACTIONS ---
    function renderSavedProfiles() {
        dom.profilesListContainer.innerHTML = "";
        let saved = window.Storage.getProfiles();

        // Auto-seed demo profiles if storage is completely empty
        if (saved.length === 0 && window.DEMO_PROFILES && window.DEMO_PROFILES.length > 0) {
            localStorage.setItem("matchwise_profiles", JSON.stringify(window.DEMO_PROFILES));
            saved = window.DEMO_PROFILES;
        }

        if (saved.length === 0) {
            dom.profilesListContainer.innerHTML = `
                <p class="summary-p" style="text-align: center; padding: 24px;" data-i18n="no_saved_profiles">
                    ${state.localization.get("no_saved_profiles")}
                </p>
            `;
            return;
        }

        saved.forEach(p => {
            const row = document.createElement("div");
            row.className = "profile-item-row";

            const selectCol = document.createElement("div");
            selectCol.className = "profile-select-col";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "premium-checkbox";
            checkbox.value = p.id;
            checkbox.addEventListener("change", () => {
                // Update button text dynamically on checking boxes
                const selectedCount = dom.profilesListContainer.querySelectorAll(".premium-checkbox:checked").length;
                if (selectedCount === 2) {
                    dom.btnCompareText.textContent = state.localization.get("compare");
                } else if (selectedCount === 1) {
                    dom.btnCompareText.textContent = state.localization.currentLang === "ar" ? "عرض الملف المحدد" : "View Selected Profile";
                } else {
                    dom.btnCompareText.textContent = state.localization.currentLang === "ar" ? "مقارنة / عرض المحدد" : "Compare / View Selected";
                }
            });

            const traits = p.calculated_personality || {};
            const hColor = (traits.hartman?.primary || "blue").toUpperCase();
            const discType = traits.disc?.type || "D";
            const mbti = traits.mbti?.type || "INFP";
            const need = (traits.birkman?.underlying_need || "empathy").toUpperCase();

            const meta = document.createElement("div");
            meta.className = "profile-meta-info";

            const headerRow = document.createElement("div");
            headerRow.style.cssText = "display: flex; align-items: center; gap: 8px; flex-wrap: wrap;";

            const nameEl = document.createElement("h4");
            nameEl.style.cssText = "margin: 0; font-size: 1.05rem;";
            nameEl.textContent = (state.localization.currentLang === "ar" && p.owner_name_ar) ? p.owner_name_ar : (p.owner_name || "Profile");

            const badgeH = document.createElement("span");
            badgeH.className = `person-type-badge hartman-badge-${hColor.toLowerCase()} notranslate`;
            badgeH.setAttribute("translate", "no");
            badgeH.style.cssText = "padding: 2px 8px; font-size: 0.72rem;";
            badgeH.textContent = hColor;

            const badgeD = document.createElement("span");
            badgeD.className = "person-type-badge type-a notranslate";
            badgeD.setAttribute("translate", "no");
            badgeD.style.cssText = "padding: 2px 8px; font-size: 0.72rem;";
            badgeD.textContent = `DISC: ${discType}`;

            const badgeM = document.createElement("span");
            badgeM.className = "person-type-badge type-b notranslate";
            badgeM.setAttribute("translate", "no");
            badgeM.style.cssText = "padding: 2px 8px; font-size: 0.72rem;";
            badgeM.textContent = mbti;

            headerRow.appendChild(nameEl);
            headerRow.appendChild(badgeH);
            headerRow.appendChild(badgeD);
            headerRow.appendChild(badgeM);

            const subP = document.createElement("p");
            subP.style.cssText = "margin-top: 4px; font-size: 0.82rem; color: var(--text-secondary);";
            subP.textContent = `${state.localization.get("created_at")}: ${p.created_at || ""} • ${state.localization.get("birkman_label")}: `;
            const strongNeed = document.createElement("strong");
            strongNeed.textContent = need;
            subP.appendChild(strongNeed);

            meta.appendChild(headerRow);
            meta.appendChild(subP);


            selectCol.appendChild(checkbox);
            selectCol.appendChild(meta);

            const actionsCol = document.createElement("div");
            actionsCol.className = "profile-actions-col";

            // View Profile row action icon
            const btnViewDirect = document.createElement("button");
            btnViewDirect.className = "icon-btn";
            btnViewDirect.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
            btnViewDirect.title = state.localization.currentLang === "ar" ? "عرض الملف" : "View Profile";
            btnViewDirect.addEventListener("click", () => {
                generateAndRenderReport(p, null);
            });

            // Download file button
            const btnDownload = document.createElement("button");
            btnDownload.className = "icon-btn";
            btnDownload.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
            btnDownload.title = state.localization.get("export");
            btnDownload.addEventListener("click", () => {
                const encryptedData = window.Cryptography.encrypt(p);
                const exportObj = {
                    matchwise_lite_payload: encryptedData,
                    signature_checksum: "MW_SIGN_" + p.id
                };
                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
                const a = document.createElement("a");
                a.href = dataStr;
                a.download = `MatchWise_Profile_${p.owner_name}.json`;
                a.click();
            });

            // Share Result Code Button
            const btnShareCode = document.createElement("button");
            btnShareCode.className = "icon-btn";
            btnShareCode.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>`;
            btnShareCode.title = state.localization.currentLang === "ar" ? "نسخ رمز المشاركة" : "Copy Share Code";
            btnShareCode.addEventListener("click", () => {
                const code = window.Cryptography.generateResultCode(p);
                navigator.clipboard.writeText(code).then(() => {
                    showFeedbackModal(
                        state.localization.currentLang === "ar" ? "تم نسخ الرمز" : "Code Copied",
                        (state.localization.currentLang === "ar" ? "تم نسخ رمز المشاركة الخاص بـ " : "Shareable result code for ") + p.owner_name + (state.localization.currentLang === "ar" ? " بنجاح إلى الحافظة. يمكنك مشاركته الآن!" : " successfully copied to clipboard. You can share it now!")
                    );
                }).catch(() => {
                    // Fallback if clipboard API fails
                    showFeedbackModal(
                        state.localization.currentLang === "ar" ? "مشاركة الرمز" : "Shareable Code",
                        `<p style="margin-bottom:8px;">${state.localization.currentLang === "ar" ? "يرجى نسخ الرمز يدويًا:" : "Please copy the code manually:"}</p><textarea class="premium-text-input" readonly style="width:100%; height:120px; font-family:monospace; font-size:12px; white-space:pre-wrap; word-break:break-all;">${code}</textarea>`
                    );
                });
            });

            // Delete Button
            const btnDelete = document.createElement("button");
            btnDelete.className = "icon-btn";
            btnDelete.style.color = "var(--danger)";
            btnDelete.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`;
            btnDelete.title = state.localization.get("delete");
            btnDelete.addEventListener("click", () => {
                if (confirm(state.localization.get("confirm_delete"))) {
                    window.Storage.deleteProfile(p.id);
                    renderSavedProfiles();
                }
            });

            actionsCol.appendChild(btnViewDirect);
            actionsCol.appendChild(btnDownload);
            actionsCol.appendChild(btnShareCode);
            actionsCol.appendChild(btnDelete);

            row.appendChild(selectCol);
            row.appendChild(actionsCol);
            dom.profilesListContainer.appendChild(row);
        });
    }

    // Handle JSON imports
    dom.profileFileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(evt) {
            try {
                const json = JSON.parse(evt.target.result);
                let validProfile = null;
                if (json && json.matchwise_lite_payload) {
                    validProfile = window.Cryptography.decrypt(json.matchwise_lite_payload);
                } else if (json && (json.answers || json.a) && (json.owner_name || json.n)) {
                    validProfile = window.Cryptography.validateAndSanitizeProfile(json);
                }

                if (validProfile) {
                    if (!validProfile.calculated_personality && window.PersonalityEngine) {
                        validProfile.calculated_personality = window.PersonalityEngine.calculate(validProfile.answers, questions);
                        validProfile.assessment_confidence = validProfile.calculated_personality.assessment_confidence;
                    }
                    window.Storage.saveProfile(validProfile);
                    showFeedbackModal(
                        state.localization.get("import_profile"),
                        state.localization.get("success_import")
                    );
                    renderSavedProfiles();
                } else {
                    throw new Error("Invalid format");
                }

            } catch (err) {
                alert(state.localization.get("invalid_file"));
            } finally {
                dom.profileFileInput.value = "";
            }
        };
        reader.readAsText(file);
    });

    // Handle Sharing Code imports
    dom.btnImportCode.addEventListener("click", () => {
        const code = dom.profileCodeInput.value.trim();
        if (!code) {
            alert(state.localization.currentLang === "ar" ? "يرجى لصق رمز النتيجة أولاً." : "Please paste a result code first.");
            return;
        }

        const parsedProfile = window.Cryptography.parseResultCode(code);
        if (parsedProfile) {
            // Recalculate traits on import
            const calculatedTraits = window.PersonalityEngine.calculate(parsedProfile.answers, questions);
            parsedProfile.calculated_personality = calculatedTraits;
            parsedProfile.assessment_confidence = calculatedTraits.assessment_confidence;
            
            window.Storage.saveProfile(parsedProfile);
            showFeedbackModal(
                state.localization.get("import_profile"),
                state.localization.get("success_import")
            );
            dom.profileCodeInput.value = "";
            renderSavedProfiles();
        } else {
            alert(state.localization.get("invalid_file"));
        }
    });

    // Compare / View action
    dom.btnCompareSelected.addEventListener("click", () => {
        const checkedBoxes = dom.profilesListContainer.querySelectorAll(".premium-checkbox:checked");
        if (checkedBoxes.length !== 1 && checkedBoxes.length !== 2) {
            alert(state.localization.get("select_profiles_to_compare"));
            return;
        }

        const saved = window.Storage.getProfiles();
        if (checkedBoxes.length === 2) {
            const profileA = saved.find(p => p.id === checkedBoxes[0].value);
            const profileB = saved.find(p => p.id === checkedBoxes[1].value);

            if (profileA && profileB) {
                generateAndRenderReport(profileA, profileB);
            }
        } else {
            const profileA = saved.find(p => p.id === checkedBoxes[0].value);
            if (profileA) {
                generateAndRenderReport(profileA, null);
            }
        }
    });

    // --- 9. GENERATE & RENDER GRAPHIC REPORTS ---
    function generateAndRenderReport(profileA, profileB) {
        state.activeReportA = profileA;
        state.activeReportB = profileB;
        if (!state.aiService) state.aiService = new window.AIService();
        navigateTo("panelReport");
        const isAr = state.localization.currentLang === "ar";
        const getDisplayName = (p, ar) => (ar && p?.owner_name_ar ? p.owner_name_ar : p?.owner_name || "");
        const nameA = getDisplayName(profileA, isAr);
        const nameB = profileB ? getDisplayName(profileB, isAr) : "";

        // Show/hide comparison elements dynamically using css class .hidden
        const bCols = document.querySelectorAll(".person-b-col");
        if (!profileB) {
            // SINGLE VIEW
            bCols.forEach(el => el.classList.add("hidden"));
            dom.gaugeCardContainer.classList.add("hidden");
            dom.radarChartCard.classList.add("hidden");
            dom.reportSectionDealbreakers.classList.add("hidden");
            
            // Educational Guidance for Single Report
            if (dom.reportInstructionContainer) {
                if (state.aiGuidanceEnabled) {
                    dom.reportInstructionContainer.style.display = "flex";
                    if (dom.reportInstructionTitle) {
                        dom.reportInstructionTitle.textContent = isAr 
                            ? "✨ دليل الذكاء الاصطناعي: كيف تقرأ ملفك الشخصي وتستفيد منه"
                            : "✨ AI Guide: How to Read & Apply Your Individual Dossier";
                    }
                    if (dom.reportInstructionText) {
                        dom.reportInstructionText.textContent = isAr ? "جارٍ إعداد دليل قراءة التقرير..." : "Preparing report reading guidance...";
                    }
                    if (state.aiService) {
                        state.aiService.generateInstruction("single_report_overview", isAr ? "ar" : "en").then(tip => {
                            if (dom.reportInstructionText) dom.reportInstructionText.textContent = tip;
                        }).catch(() => {
                            if (dom.reportInstructionText) {
                                dom.reportInstructionText.textContent = isAr
                                    ? "ركّز على التناغم بين دافعك الجوهري ونمط تعاملك مع الضغوط لفهم محركاتك العميقة."
                                    : "Focus on the alignment between your core motive and stress response to understand your deep operating baseline.";
                            }
                        });
                    }
                } else {
                    dom.reportInstructionContainer.style.display = "none";
                }
            }
            
            dom.barChartTitle.textContent = isAr ? "تحليل السمات الشخصية الخمس الكبرى" : "Big Five Personality Analysis";

            const traitsA = profileA.calculated_personality;
            dom.reportConfidence.textContent = `${profileA.assessment_confidence || 85}%`;

            let summaryText = isAr
                ? `هذا هو تقرير التحليل الشخصي الخاص بـ ${profileA.owner_name}. يوضح هذا الملف السمات الفكرية والاجتماعية الفريدة ومستويات الثقة في تقييمك.`
                : `This is the individual personality assessment report for ${profileA.owner_name}. Below is a comprehensive breakdown of your Big Five traits, MBTI tendency, attachment style, and love languages.`;
            dom.reportExecutiveSummaryText.textContent = summaryText;

            // Meta parameters
            dom.reportHeaderPersonA.textContent = profileA.owner_name;
            dom.reportIdA.textContent = profileA.id;
            dom.reportDateA.textContent = profileA.created_at;
            dom.reportVerA.textContent = profileA.app_version;
            dom.reportConfidenceA.textContent = `${profileA.assessment_confidence || 85}%`;

            // Render Legacy & Multi-Framework Badges for Person A
            if (dom.mbtiBadgeA) dom.mbtiBadgeA.textContent = traitsA.mbti?.type || "--";
            if (dom.attachmentBadgeA) {
                const attA = (traitsA.attachment?.primary || "").toLowerCase();
                dom.attachmentBadgeA.textContent = isAr ? (ATTACHMENT_MAP[attA]?.ar || attA) : attA.toUpperCase();
            }
            if (dom.commBadgeA) {
                const commA = (traitsA.communication?.primary || "").toLowerCase();
                dom.commBadgeA.textContent = isAr ? (COMMUNICATION_MAP[commA]?.ar || commA) : commA.toUpperCase();
            }
            if (dom.conflictBadgeA) {
                const confA = (traitsA.conflict?.primary || "collaborating").toLowerCase();
                dom.conflictBadgeA.textContent = isAr ? (CONFLICT_MAP[confA]?.ar || confA) : confA.toUpperCase();
            }

            // Hartman Badge
            const hColorA = (traitsA.hartman?.primary || "blue").toLowerCase();
            if (dom.hartmanBadgeA) {
                dom.hartmanBadgeA.textContent = isAr
                    ? (HARTMAN_MAP[hColorA]?.ar || hColorA)
                    : `${hColorA.toUpperCase()} (${traitsA.hartman?.metadata?.motive_en || ""})`;
                dom.hartmanBadgeA.className = `person-type-badge type-a hartman-badge-${hColorA}`;
            }

            // DISC Badge
            const discStyleA = traitsA.disc?.primary || "D";
            if (dom.discBadgeA) {
                dom.discBadgeA.textContent = `${discStyleA} (${isAr ? (traitsA.disc?.pace_ar || "متوازن") : (traitsA.disc?.pace || "Balanced")})`;
            }

            // Birkman Badge
            const needA = (traitsA.birkman?.underlying_need || "empathy").toLowerCase();
            if (dom.birkmanBadgeA) {
                dom.birkmanBadgeA.textContent = isAr ? (BIRKMAN_NEED_MAP[needA]?.ar || needA) : needA.toUpperCase();
            }

            // Gottman Safety Badge
            if (dom.gottmanBadgeA) {
                dom.gottmanBadgeA.textContent = `${traitsA.gottman_safety?.emotional_safety_index || 85}% ${isAr ? "أمان" : "Safety"}`;
            }

            // Chapter 1 Overview Badges
            if (dom.mbtiOverviewA) dom.mbtiOverviewA.textContent = traitsA.mbti?.type || "--";
            if (dom.attachmentOverviewA) {
                const attA = (traitsA.attachment?.primary || "").toLowerCase();
                dom.attachmentOverviewA.textContent = isAr ? (ATTACHMENT_MAP[attA]?.ar || attA) : attA.toUpperCase();
            }
            if (dom.hartmanOverviewA) {
                dom.hartmanOverviewA.textContent = isAr ? (HARTMAN_MAP[hColorA]?.ar || hColorA) : hColorA.toUpperCase();
                dom.hartmanOverviewA.className = `person-type-badge type-a hartman-badge-${hColorA}`;
            }
            if (dom.discOverviewA) {
                dom.discOverviewA.textContent = `${discStyleA} (${isAr ? (traitsA.disc?.pace_ar || "متوازن") : (traitsA.disc?.pace || "Balanced")})`;
            }
            if (dom.mbtiOverviewB) dom.mbtiOverviewB.textContent = "--";
            if (dom.attachmentOverviewB) dom.attachmentOverviewB.textContent = "--";
            if (dom.hartmanOverviewB) dom.hartmanOverviewB.textContent = "--";
            if (dom.discOverviewB) dom.discOverviewB.textContent = "--";

            // Update Narrative Chapter Headers for SINGLE VIEW
            if (dom.chapter1Badge) dom.chapter1Badge.textContent = isAr ? "الفصل الأول" : "Chapter 1";
            if (dom.chapter1Title) dom.chapter1Title.textContent = state.localization.get("chapter_1_title");
            if (dom.chapter1Desc) dom.chapter1Desc.textContent = state.localization.get("chapter_1_desc");

            if (dom.chapter2Badge) dom.chapter2Badge.textContent = isAr ? "الفصل الثاني" : "Chapter 2";
            if (dom.chapter2Title) dom.chapter2Title.textContent = state.localization.get("chapter_2_title");
            if (dom.chapter2Desc) dom.chapter2Desc.textContent = state.localization.get("chapter_2_desc");

            if (dom.chapter3Badge) dom.chapter3Badge.textContent = isAr ? "الفصل الثالث" : "Chapter 3";
            if (dom.chapter3Title) dom.chapter3Title.textContent = state.localization.get("chapter_3_title");
            if (dom.chapter3Desc) dom.chapter3Desc.textContent = state.localization.get("chapter_3_desc");

            if (dom.chapter4Badge) dom.chapter4Badge.textContent = isAr ? "الفصل الرابع" : "Chapter 4";
            if (dom.chapter4Title) dom.chapter4Title.textContent = state.localization.get("chapter_4_title");
            if (dom.chapter4Desc) dom.chapter4Desc.textContent = state.localization.get("chapter_4_desc");

            if (dom.chapter5Badge) dom.chapter5Badge.textContent = isAr ? "الفصل الخامس" : "Chapter 5";
            if (dom.chapter5Title) dom.chapter5Title.textContent = state.localization.get("chapter_5_title");
            if (dom.chapter5Desc) dom.chapter5Desc.textContent = state.localization.get("chapter_5_desc");

            if (dom.dyadicConflictCard) dom.dyadicConflictCard.style.display = "none";

            // Render Interactive Multi-Framework SVG Visualizers for Single View
            renderHartmanDonut(dom.hartmanChartContainer, traitsA, null, true, nameA, null, isAr);
            renderDiscQuadrantMap(dom.discQuadrantContainer, traitsA.disc, null, true, nameA, null, isAr);
            renderBirkmanIceberg(dom.birkmanIcebergContainer, traitsA, null, true, nameA, null, isAr);
            renderAttachmentCoordinateMap(dom.attachmentGridContainer, traitsA, null, true, nameA, null, isAr);
            renderFiroExchange(dom.firoExchangeContainer, traitsA, null, true, nameA, null, isAr);
            renderGottmanSafetyGauge(dom.gottmanGaugeContainer, traitsA, null, true, nameA, null, isAr);

            // Populate Awareness Badges & Spectrum
            if (dom.hawkinsBadgeA) {
                dom.hawkinsBadgeA.textContent = isAr ? (traitsA.consciousness?.hawkins?.level_ar || "المنطق (400)") : (traitsA.consciousness?.hawkins?.level || "Reason (400)");
            }
            if (dom.hawkinsBadgeB) dom.hawkinsBadgeB.textContent = "--";
            if (dom.hicksBadgeA) {
                dom.hicksBadgeA.textContent = isAr ? (traitsA.consciousness?.hicks?.state_ar || "التوقع الإيجابي") : (traitsA.consciousness?.hicks?.state || "Positive Expectation");
            }
            if (dom.hicksBadgeB) dom.hicksBadgeB.textContent = "--";
            renderConsciousnessSpectrum(dom.consciousnessSpectrumContainer, traitsA, null, true, nameA, null, isAr);

            // Render Relationship Operating Manual for Person A
            renderOperatingManual(profileA, null, isAr);

            // Render Personal De-escalation Box
            renderFairFightingBox(null, profileA, isAr);

            // Big Five rendering (just pass A for both to render single)
            renderBigFiveBarCharts(traitsA.big_five, traitsA.big_five, true, nameA, null);

            // Lists
            dom.reportStrengthsList.innerHTML = "";
            const sampleStrengths = [
                { en: `High emotional self-awareness using an adaptable ${traitsA.communication.primary} communication style.`, ar: `وعي ذاتي عاطفي مرتفع باستخدام أسلوب تواصل مرن.` },
                { en: `Understands personal needs and can formulate firm boundaries to avoid burnouts.`, ar: `يفهم الاحتياجات الشخصية ويمكنه صياغة حدود حاسمة لتجنب الإرهاق.` },
                { en: `Core emotional fuel driven by ${traitsA.hartman?.metadata ? traitsA.hartman.metadata.fuel_en : 'authentic connection'}.`, ar: `وقودك العاطفي الأساسي مدفوع بـ: ${traitsA.hartman?.metadata ? traitsA.hartman.metadata.fuel_ar : 'الاهتمام الصادق والتقارب'}.` }
            ];
            sampleStrengths.forEach(item => {
                const li = document.createElement("li");
                li.textContent = isAr ? item.ar : item.en;
                dom.reportStrengthsList.appendChild(li);
            });

            dom.reportChallengesList.innerHTML = "";
            const sampleChallenges = [
                { en: `Operating under high pressure might trigger the defensive ${traitsA.birkman?.stress_trigger || 'withdrawal'} stress reaction.`, ar: `قد يؤدي العمل تحت ضغط مرتفع إلى تفعيل ردة الفعل الدفاعية الناتجة عن التوتر (${traitsA.birkman?.stress_trigger || 'الانعزال'}).` }
            ];
            sampleChallenges.forEach(item => {
                const li = document.createElement("li");
                li.textContent = isAr ? item.ar : item.en;
                dom.reportChallengesList.appendChild(li);
            });

            dom.reportDiscussionList.innerHTML = "";
            const sampleTopics = [
                { en: "How to communicate your deep emotional boundaries safely to close friends or future partners.", ar: "كيفية مشاركة حدودك العاطفية العميقة بأمان مع أصدقائك أو شريك حياتك المستقبلي." }
            ];
            sampleTopics.forEach(item => {
                const li = document.createElement("li");
                li.textContent = isAr ? item.ar : item.en;
                dom.reportDiscussionList.appendChild(li);
            });

            dom.reportGrowthList.innerHTML = "";
            const sampleGrowth = [
                { en: `Practice active mindfulness to balance the identified ${traitsA.mbti.type} cognitive preferences.`, ar: `تدرب على اليقظة الذهنية المتواصلة لموازنة التفضيلات المعرفية المحددة لنمطك.` }
            ];
            sampleGrowth.forEach(item => {
                const li = document.createElement("li");
                li.textContent = isAr ? item.ar : item.en;
                dom.reportGrowthList.appendChild(li);
            });

            dom.reportRecommendationsContainer.innerHTML = "";
            const p = document.createElement("p");
            p.className = "summary-p";
            p.textContent = isAr
                ? "يُنصح بمشاركة هذا التقرير الفردي مع شريكك المقرب لتيسير المحادثات وبناء جسور عاطفية وثيقة."
                : "We highly recommend saving this individual report and comparing it with your partner's completed profile to generate a full Compatibility Index.";
            dom.reportRecommendationsContainer.appendChild(p);

        } else {
            // COMPARISON VIEW
            bCols.forEach(el => el.classList.remove("hidden"));
            dom.gaugeCardContainer.classList.remove("hidden");
            dom.radarChartCard.classList.remove("hidden");
            if (dom.dyadicConflictCard) dom.dyadicConflictCard.style.display = "block";

            // Educational Guidance for Comparative Report
            if (dom.reportInstructionContainer) {
                if (state.aiGuidanceEnabled) {
                    dom.reportInstructionContainer.style.display = "flex";
                    if (dom.reportInstructionTitle) {
                        dom.reportInstructionTitle.textContent = isAr 
                            ? "✨ دليل الذكاء الاصطناعي: كيف تقرأ وتناقش تقرير التوافق المشترك"
                            : "✨ AI Guide: How to Interpret & Discuss This Compatibility Report";
                    }
                    if (dom.reportInstructionText) {
                        dom.reportInstructionText.textContent = isAr ? "جارٍ إعداد دليل النقاش الزوجي..." : "Preparing shared discussion guidance...";
                    }
                    if (state.aiService) {
                        state.aiService.generateInstruction("compare_overview", isAr ? "ar" : "en").then(tip => {
                            if (dom.reportInstructionText) dom.reportInstructionText.textContent = tip;
                        }).catch(() => {
                            if (dom.reportInstructionText) {
                                dom.reportInstructionText.textContent = isAr
                                    ? "لا تنظر إلى الفروقات كعيوب بل كنقاط تكامل وفرص لبناء تفاهم متبادل وجسور صريحة."
                                    : "View personality differences not as flaws, but as complementary strengths and blueprints for proactive communication.";
                            }
                        });
                    }
                } else {
                    dom.reportInstructionContainer.style.display = "none";
                }
            }
            
            dom.radarChartTitle.textContent = isAr ? "مؤشر التوافق متعدد الأبعاد (12 محوراً)" : "Multivariable Compatibility Index (12 Axes)";
            dom.barChartTitle.textContent = isAr ? "محاذاة السمات الخمس الكبرى" : "Big Five / Temperament Alignment";

            const report = window.CompatibilityEngine.compare(profileA, profileB);

            // Update Narrative Chapter Headers for COMPARISON (Acts 1-4)
            if (dom.chapter1Badge) { dom.chapter1Badge.textContent = isAr ? "المحور الأول" : "Act 1"; dom.chapter1Badge.classList.add("act-badge"); }
            if (dom.chapter1Title) dom.chapter1Title.textContent = state.localization.get("act_1_title");
            if (dom.chapter1Desc) dom.chapter1Desc.textContent = state.localization.get("act_1_desc");

            if (dom.chapter2Badge) { dom.chapter2Badge.textContent = isAr ? "المحور الثاني" : "Act 2"; dom.chapter2Badge.classList.add("act-badge"); }
            if (dom.chapter2Title) dom.chapter2Title.textContent = state.localization.get("act_2_title");
            if (dom.chapter2Desc) dom.chapter2Desc.textContent = state.localization.get("act_2_desc");

            if (dom.chapter3Badge) { dom.chapter3Badge.textContent = isAr ? "التناغم العاطفي" : "Intimacy & Bond"; }
            if (dom.chapter3Title) dom.chapter3Title.textContent = state.localization.get("chapter_3_title");
            if (dom.chapter3Desc) dom.chapter3Desc.textContent = state.localization.get("chapter_3_desc");

            if (dom.chapter4Badge) { dom.chapter4Badge.textContent = isAr ? "المحور الثالث" : "Act 3"; dom.chapter4Badge.classList.add("act-badge"); }
            if (dom.chapter4Title) dom.chapter4Title.textContent = state.localization.get("act_3_title");
            if (dom.chapter4Desc) dom.chapter4Desc.textContent = state.localization.get("act_3_desc");

            if (dom.chapter5Badge) { dom.chapter5Badge.textContent = isAr ? "المحور الرابع" : "Act 4"; dom.chapter5Badge.classList.add("act-badge"); }
            if (dom.chapter5Title) dom.chapter5Title.textContent = state.localization.get("act_4_title");
            if (dom.chapter5Desc) dom.chapter5Desc.textContent = state.localization.get("act_4_desc");

            // Top overall summaries
            dom.reportOverallIndex.textContent = `${report.overall_index}%`;
            dom.circleProgressFill.setAttribute("stroke-dasharray", `${report.overall_index}, 100`);
            dom.reportConfidence.textContent = `${report.report_confidence}%`;

            // Dynamic Summary Builder
            let summaryText = "";
            if (report.overall_index >= 85) {
                summaryText = isAr 
                    ? `تناغم استثنائي وتوافق فكري وعاطفي عميق تم رصده بين ${nameA} و ${nameB}. تتلاقى الأهداف الحياتية والرؤى المستقبلية لإنشاء علاقة مستدامة للغاية.`
                    : `Outstanding structural synergy and deep emotional alignment detected between ${nameA} and ${nameB}. Core life visions and communication patterns are beautifully synchronized.`;
            } else if (report.overall_index >= 70) {
                summaryText = isAr
                    ? `توافق أساسي قوي للغاية بين ${nameA} و ${nameB}. هناك بعض النقاط الحوارية الهامة حول إدارة الشؤون المالية والحدود العائلية التي تتطلب تفاهمات واعية.`
                    : `Solid foundational compatibility with minor functional frictions between ${nameA} and ${nameB}. Minor discrepancies in household management and boundaries represent opportunities for proactive communication.`;
            } else {
                summaryText = isAr
                    ? `تم اكتشاف اختلافات فكرية واجتماعية واضحة في رؤية العلاقة بين ${nameA} و ${nameB}. يتطلب البناء السليم صياغة التزامات تفصيلية حول أسلوب المعيشة والاتفاق المالي.`
                    : `Significant thematic contrasts and personality divergence observed between ${nameA} and ${nameB}. Bridging these boundaries will require high intentionality, empathetic listening, and structural compromises.`;
            }
            dom.reportExecutiveSummaryText.textContent = summaryText;

            // Meta parameters
            dom.reportHeaderPersonA.textContent = nameA;
            dom.reportHeaderPersonB.textContent = nameB;
            
            dom.reportIdA.textContent = profileA.id;
            dom.reportIdB.textContent = profileB.id;
            dom.reportDateA.textContent = profileA.created_at;
            dom.reportDateB.textContent = profileB.created_at;
            dom.reportVerA.textContent = profileA.app_version;
            dom.reportVerB.textContent = profileB.app_version;
            dom.reportConfidenceA.textContent = `${profileA.assessment_confidence || 85}%`;
            dom.reportConfidenceB.textContent = `${profileB.assessment_confidence || 85}%`;

            // Render Legacy Badges
            if (dom.mbtiBadgeA) dom.mbtiBadgeA.textContent = profileA.calculated_personality.mbti?.type || "--";
            if (dom.mbtiBadgeB) dom.mbtiBadgeB.textContent = profileB.calculated_personality.mbti?.type || "--";
            
            const attA_raw = (profileA.calculated_personality.attachment?.primary || "").toLowerCase();
            const attB_raw = (profileB.calculated_personality.attachment?.primary || "").toLowerCase();
            if (dom.attachmentBadgeA) dom.attachmentBadgeA.textContent = isAr ? (ATTACHMENT_MAP[attA_raw]?.ar || attA_raw) : attA_raw.toUpperCase();
            if (dom.attachmentBadgeB) dom.attachmentBadgeB.textContent = isAr ? (ATTACHMENT_MAP[attB_raw]?.ar || attB_raw) : attB_raw.toUpperCase();

            const commA_raw = (profileA.calculated_personality.communication?.primary || "").toLowerCase();
            const commB_raw = (profileB.calculated_personality.communication?.primary || "").toLowerCase();
            if (dom.commBadgeA) dom.commBadgeA.textContent = isAr ? (COMMUNICATION_MAP[commA_raw]?.ar || commA_raw) : commA_raw.toUpperCase();
            if (dom.commBadgeB) dom.commBadgeB.textContent = isAr ? (COMMUNICATION_MAP[commB_raw]?.ar || commB_raw) : commB_raw.toUpperCase();

            const confA_raw = (profileA.calculated_personality.conflict?.primary || "collaborating").toLowerCase();
            const confB_raw = (profileB.calculated_personality.conflict?.primary || "collaborating").toLowerCase();
            if (dom.conflictBadgeA) dom.conflictBadgeA.textContent = isAr ? (CONFLICT_MAP[confA_raw]?.ar || confA_raw) : confA_raw.toUpperCase();
            if (dom.conflictBadgeB) dom.conflictBadgeB.textContent = isAr ? (CONFLICT_MAP[confB_raw]?.ar || confB_raw) : confB_raw.toUpperCase();

            // Render Multi-Framework Badges for A & B
            const traitsCompA = profileA.calculated_personality;
            const traitsCompB = profileB.calculated_personality;

            const colA_raw = (traitsCompA.hartman?.primary || "blue").toLowerCase();
            const colB_raw = (traitsCompB.hartman?.primary || "white").toLowerCase();
            if (dom.hartmanBadgeA && dom.hartmanBadgeB) {
                dom.hartmanBadgeA.textContent = isAr ? (HARTMAN_MAP[colA_raw]?.ar || colA_raw) : colA_raw.toUpperCase();
                dom.hartmanBadgeA.className = `person-type-badge type-a hartman-badge-${colA_raw}`;
                dom.hartmanBadgeB.textContent = isAr ? (HARTMAN_MAP[colB_raw]?.ar || colB_raw) : colB_raw.toUpperCase();
                dom.hartmanBadgeB.className = `person-type-badge type-b hartman-badge-${colB_raw}`;
            }

            if (dom.discBadgeA && dom.discBadgeB) {
                dom.discBadgeA.textContent = `${traitsCompA.disc?.primary || "D"} (${isAr ? (traitsCompA.disc?.pace_ar || "متوازن") : (traitsCompA.disc?.pace || "Balanced")})`;
                dom.discBadgeB.textContent = `${traitsCompB.disc?.primary || "S"} (${isAr ? (traitsCompB.disc?.pace_ar || "متوازن") : (traitsCompB.disc?.pace || "Balanced")})`;
            }

            const needA_raw = (traitsCompA.birkman?.underlying_need || "empathy").toLowerCase();
            const needB_raw = (traitsCompB.birkman?.underlying_need || "freedom").toLowerCase();
            if (dom.birkmanBadgeA && dom.birkmanBadgeB) {
                dom.birkmanBadgeA.textContent = isAr ? (BIRKMAN_NEED_MAP[needA_raw]?.ar || needA_raw) : needA_raw.toUpperCase();
                dom.birkmanBadgeB.textContent = isAr ? (BIRKMAN_NEED_MAP[needB_raw]?.ar || needB_raw) : needB_raw.toUpperCase();
            }

            // Also update Chapter 1 Overview Badges for Comparison View
            if (dom.mbtiOverviewA) dom.mbtiOverviewA.textContent = profileA.calculated_personality.mbti?.type || "--";
            if (dom.mbtiOverviewB) dom.mbtiOverviewB.textContent = profileB.calculated_personality.mbti?.type || "--";
            if (dom.attachmentOverviewA) dom.attachmentOverviewA.textContent = isAr ? (ATTACHMENT_MAP[attA_raw]?.ar || attA_raw) : attA_raw.toUpperCase();
            if (dom.attachmentOverviewB) dom.attachmentOverviewB.textContent = isAr ? (ATTACHMENT_MAP[attB_raw]?.ar || attB_raw) : attB_raw.toUpperCase();
            if (dom.hartmanOverviewA) {
                dom.hartmanOverviewA.textContent = isAr ? (HARTMAN_MAP[colA_raw]?.ar || colA_raw) : colA_raw.toUpperCase();
                dom.hartmanOverviewA.className = `person-type-badge type-a hartman-badge-${colA_raw}`;
            }
            if (dom.hartmanOverviewB) {
                dom.hartmanOverviewB.textContent = isAr ? (HARTMAN_MAP[colB_raw]?.ar || colB_raw) : colB_raw.toUpperCase();
                dom.hartmanOverviewB.className = `person-type-badge type-b hartman-badge-${colB_raw}`;
            }
            if (dom.discOverviewA) dom.discOverviewA.textContent = `${traitsCompA.disc?.primary || "D"} (${isAr ? (traitsCompA.disc?.pace_ar || "متوازن") : (traitsCompA.disc?.pace || "Balanced")})`;
            if (dom.discOverviewB) dom.discOverviewB.textContent = `${traitsCompB.disc?.primary || "S"} (${isAr ? (traitsCompB.disc?.pace_ar || "متوازن") : (traitsCompB.disc?.pace || "Balanced")})`;

            if (dom.gottmanBadgeA && dom.gottmanBadgeB) {
                dom.gottmanBadgeA.textContent = `${traitsCompA.gottman_safety?.emotional_safety_index || 85}%`;
                dom.gottmanBadgeB.textContent = `${traitsCompB.gottman_safety?.emotional_safety_index || 80}%`;
            }

            if (dom.hawkinsBadgeA && dom.hawkinsBadgeB) {
                dom.hawkinsBadgeA.textContent = isAr ? (traitsCompA.consciousness?.hawkins?.level_ar || "القبول (350)") : (traitsCompA.consciousness?.hawkins?.level || "Acceptance (350)");
                dom.hawkinsBadgeB.textContent = isAr ? (traitsCompB.consciousness?.hawkins?.level_ar || "المنطق (400)") : (traitsCompB.consciousness?.hawkins?.level || "Reason (400)");
            }
            if (dom.hicksBadgeA && dom.hicksBadgeB) {
                dom.hicksBadgeA.textContent = isAr ? (traitsCompA.consciousness?.hicks?.state_ar || "التفاؤل") : (traitsCompA.consciousness?.hicks?.state || "Optimism");
                dom.hicksBadgeB.textContent = isAr ? (traitsCompB.consciousness?.hicks?.state_ar || "التوقع الإيجابي") : (traitsCompB.consciousness?.hicks?.state || "Positive Expectation");
            }

            // Render Interactive Multi-Framework SVG Visualizers for Comparison View
            renderHartmanDonut(dom.hartmanChartContainer, traitsCompA, traitsCompB, false, nameA, nameB, isAr);
            renderDiscQuadrantMap(dom.discQuadrantContainer, traitsCompA.disc, traitsCompB.disc, false, nameA, nameB, isAr);
            renderBirkmanIceberg(dom.birkmanIcebergContainer, traitsCompA, traitsCompB, false, nameA, nameB, isAr);
            renderAttachmentCoordinateMap(dom.attachmentGridContainer, traitsCompA, traitsCompB, false, nameA, nameB, isAr);
            renderFiroExchange(dom.firoExchangeContainer, traitsCompA, traitsCompB, false, nameA, nameB, isAr);
            renderGottmanSafetyGauge(dom.gottmanGaugeContainer, traitsCompA, traitsCompB, false, nameA, nameB, isAr);
            renderDyadicConflictLoop(dom.dyadicConflictLoopContainer, report, profileA, profileB, isAr);
            renderConsciousnessSpectrum(dom.consciousnessSpectrumContainer, traitsCompA, traitsCompB, false, nameA, nameB, isAr);

            // Render Relationship Operating Manual for BOTH
            renderOperatingManual(profileA, profileB, isAr);

            // Render Dyadic Conflict & De-escalation Protocol
            renderFairFightingBox(report, profileA, isAr);

            // Render Interactive Multi-Variable Radar Chart (Chart.js or responsive SVG)
            renderRadarChart(report.category_scores);

            // Render Custom SVG Bar Charts (Big Five OCEAN differences)
            renderBigFiveBarCharts(
                profileA.calculated_personality.big_five,
                profileB.calculated_personality.big_five,
                false,
                nameA,
                nameB
            );

            // Bullets rendering helper
            function fillList(container, list) {
                container.innerHTML = "";
                list.forEach(item => {
                    const li = document.createElement("li");
                    li.textContent = isAr ? item.ar : item.en;
                    container.appendChild(li);
                });
            }

            fillList(dom.reportStrengthsList, report.strengths);
            fillList(dom.reportChallengesList, report.challenges);
            fillList(dom.reportDiscussionList, report.discussion_topics);
            fillList(dom.reportGrowthList, report.growth_opportunities);

            // Dealbreaker Alerts (Render only if any exists)
            if (report.deal_breakers.length > 0) {
                dom.reportSectionDealbreakers.classList.remove("hidden");
                fillList(dom.reportDealbreakersList, report.deal_breakers);
            } else {
                dom.reportSectionDealbreakers.classList.add("hidden");
            }

            // Recommendations
            dom.reportRecommendationsContainer.innerHTML = "";
            report.recommendations.forEach(rec => {
                const p = document.createElement("p");
                p.className = "summary-p";
                p.textContent = isAr ? rec.ar : rec.en;
                dom.reportRecommendationsContainer.appendChild(p);
            });
        }

        // --- DEEPSEEK PRO AI INSIGHTS GENERATION ---
        const aiSection = document.getElementById("aiInsightsSection");
        const aiContainer = document.getElementById("reportAIInsightsContainer");
        
        if (state.isAiMode && state.aiService) {
            aiSection.style.display = "block";
            aiContainer.innerHTML = `<p>${isAr ? "جارٍ توليد الاستشارة والتحليل المعمق عبر الذكاء الاصطناعي (DeepSeek Pro)..." : "Generating deep psychological consultation via DeepSeek Pro AI..."}</p>`;
            
            if (!profileB) {
                // SINGLE REPORT AI INSIGHTS
                state.aiService.analyzeReport(profileA, isAr ? "ar" : "en").then(aiData => {
                    if (!aiData) {
                        aiContainer.innerHTML = `<p>${isAr ? "تعذر إنشاء التحليل المعمق حالياً." : "Could not generate deep analysis at this time."}</p>`;
                        return;
                    }
                    aiContainer.innerHTML = "";

                    const appendBlock = (title, text, color) => {
                        if (!text) return;
                        const card = document.createElement("div");
                        card.className = "chart-card";
                        card.style.marginBottom = "14px";
                        card.innerHTML = `<h4 style="color: ${color}; text-align: start;">${title}</h4><p style="font-size: 0.92rem; line-height: 1.6;">${text}</p>`;
                        aiContainer.appendChild(card);
                    };

                    appendBlock(isAr ? "تحليل الدافع الجوهري والمحرك النفسي" : "Core Motive Analysis (Hartman)", aiData.coreMotiveAnalysis, "var(--accent-color)");
                    appendBlock(isAr ? "بروفايل الأمان العاطفي وإدارة الخلافات" : "Conflict & Emotional Safety Profile (TKI & Gottman)", aiData.conflictAndSafety, "#8b5cf6");
                    appendBlock(isAr ? "نمط الارتباط العاطفي والاحتواء" : "Attachment & Intimacy Dynamic", aiData.attachmentProfile, "#10b981");

                    if (aiData.watchouts && aiData.watchouts.length > 0) {
                        const warnDiv = document.createElement("div");
                        warnDiv.className = "chart-card";
                        warnDiv.style.borderInlineStart = "4px solid var(--danger)";
                        warnDiv.innerHTML = `<h4 style="color: var(--danger); text-align: start;">${isAr ? "نقاط الحذر والتنبيه" : "Vulnerability Watchouts"}</h4>`;
                        const ul = document.createElement("ul");
                        ul.className = "report-bullet-list";
                        aiData.watchouts.forEach(w => {
                            const li = document.createElement("li");
                            li.textContent = w;
                            ul.appendChild(li);
                        });
                        warnDiv.appendChild(ul);
                        aiContainer.appendChild(warnDiv);
                    }
                }).catch(err => {
                    aiContainer.innerHTML = `<p style="color: var(--text-secondary); text-align: start;">${isAr ? "تعذر إنشاء التحليل المعمق حالياً." : "Failed to generate AI insights."}</p>`;
                    console.error("AI Single Analysis Error:", err);
                });
            } else {
                // COMPARISON DYADIC AI CONSULTATION
                state.aiService.compareProfilesWithAI(profileA, profileB, isAr ? "ar" : "en").then(aiData => {
                    if (!aiData) {
                        aiContainer.innerHTML = `<p style="color: var(--text-secondary); text-align: start;">${isAr ? "تعذر إنشاء استشارة التوافق الثنائي حالياً." : "Could not generate dyadic consultation at this time."}</p>`;
                        return;
                    }
                    aiContainer.innerHTML = "";

                    const appendBlock = (title, text, color) => {
                        if (!text) return;
                        const card = document.createElement("div");
                        card.className = "chart-card";
                        card.style.marginBottom = "14px";
                        card.innerHTML = `<h4 style="color: ${color}; text-align: start;">${title}</h4><p style="font-size: 0.92rem; line-height: 1.6;">${text}</p>`;
                        aiContainer.appendChild(card);
                    };

                    appendBlock(isAr ? "الملخص التنفيذي للاستشارة والتوافق الزوجي" : "Executive Dyadic Consultation (DeepSeek Pro)", aiData.executiveSummary, "#8b5cf6");
                    appendBlock(isAr ? "تفاعل الدوافع النفسية والإيقاع اليومي" : "Motive & Pace Dynamic (Hartman & DISC)", aiData.motiveAndPaceDynamic, "var(--accent-color)");
                    appendBlock(isAr ? "توافق الاحتياجات الوجدانية ومحفزات التوتر" : "Cross-Need Satisfaction & Stress Triggers (Birkman)", aiData.crossNeedCollision, "#f59e0b");
                    appendBlock(isAr ? "دورة الخلاف التفاعلية وقواعد كسرها" : "The Reactive Conflict Dance & Cycle Breaker", aiData.reactiveConflictDance, "#ef4444");

                    // Conversational Bridge Scripts
                    if (aiData.conversationalBridgeScripts && aiData.conversationalBridgeScripts.length > 0) {
                        const scriptWrapper = document.createElement("div");
                        scriptWrapper.style.marginTop = "20px";
                        scriptWrapper.innerHTML = `<h4 style="color: var(--accent-color); margin-bottom: 12px; text-align: start;">${isAr ? "نصوص الحوار وجسور التفاهم المقترحة" : "Conversational Bridge Scripts (What to Say in Tough Moments)"}</h4>`;
                        
                        aiData.conversationalBridgeScripts.forEach(bs => {
                            const sc = document.createElement("div");
                            sc.className = "bridge-script-card";
                            sc.innerHTML = `
                                <div class="bridge-script-scenario">${bs.scenario}</div>
                                <div class="bridge-quote"><strong>${nameA}:</strong> "${bs.scriptA}"</div>
                                <div class="bridge-quote"><strong>${nameB}:</strong> "${bs.scriptB}"</div>
                            `;
                            scriptWrapper.appendChild(sc);
                        });
                        aiContainer.appendChild(scriptWrapper);
                    }
                }).catch(err => {
                    aiContainer.innerHTML = `<p style="color: var(--text-secondary); text-align: start;">${isAr ? "تعذر إنشاء استشارة التوافق الثنائي حالياً." : "Failed to generate dyadic AI consultation."}</p>`;
                    console.error("Dyadic AI Consultation Error:", err);
                });
            }
        } else {
            aiSection.style.display = "none";
        }
    }

    // Helper: Render Operating Manual Card
    function renderOperatingManual(profileA, profileB, isAr) {
        if (!dom.operatingManualContainer) return;
        dom.operatingManualContainer.innerHTML = "";

        const createManualCard = (profile, typeClass) => {
            const traits = profile.calculated_personality;
            const b = traits.birkman || {};
            const h = traits.hartman || {};

            const usualDesc = b.summary?.usual ? (isAr ? b.summary.usual.ar : b.summary.usual.en) : "Assertive and active.";
            const needDesc = b.summary?.needs ? (isAr ? b.summary.needs.ar : b.summary.needs.en) : "Validation and patience.";
            const stressDesc = b.summary?.stress ? (isAr ? b.summary.stress.ar : b.summary.stress.en) : "Withdrawing or impatient.";
            const fuelDesc = h.metadata ? (isAr ? h.metadata.fuel_ar : h.metadata.fuel_en) : "Intimacy and respect.";
            const hazardDesc = h.metadata ? (isAr ? h.metadata.hazard_ar : h.metadata.hazard_en) : "Over-sensitivity.";

            const card = document.createElement("div");
            card.className = "manual-profile-card";
            const ownerName = (isAr && profile.owner_name_ar) ? profile.owner_name_ar : profile.owner_name;
            const safeOwnerName = (window.escapeHtml) ? window.escapeHtml(ownerName) : String(ownerName).replace(/</g, "&lt;");
            const hTitle = isAr ? (HARTMAN_MAP[(h.primary || "blue").toLowerCase()]?.ar || h.primary) : (h.primary || "Blue").toUpperCase();
            card.innerHTML = `
                <div class="manual-profile-header">
                    <div class="manual-owner-title">${safeOwnerName}</div>
                    <span class="person-type-badge ${typeClass}">${hTitle} • ${(traits.disc?.primary || "D")}</span>
                </div>

                <div class="manual-point">
                    <div class="manual-point-label">
                        <span>🌟</span>
                        <span>${isAr ? "الأسلوب المعتاد في الحياة اليومية" : "Natural Everyday Style (Birkman Usual)"}</span>
                    </div>
                    <div class="manual-point-content">${usualDesc}</div>
                </div>
                <div class="manual-point">
                    <div class="manual-point-label">
                        <span>🛡️</span>
                        <span>${isAr ? "الاحتياج العاطفي والوجداني الخفي" : "Hidden Emotional Needs (Birkman Needs)"}</span>
                    </div>
                    <div class="manual-point-content">${needDesc}</div>
                </div>
                <div class="manual-point">
                    <div class="manual-point-label">
                        <span>⚠️</span>
                        <span>${isAr ? "ردة الفعل الانفعالية عند الضغط والإنهاك" : "Reaction Under Pressure (Stress Derailer)"}</span>
                    </div>
                    <div class="manual-point-content">${stressDesc}</div>
                </div>
                <div class="manual-point">
                    <div class="manual-point-label">
                        <span>🔋</span>
                        <span>${isAr ? "الوقود العاطفي ومصدر التهدئة" : "Core Emotional Fuel & Soothing"}</span>
                    </div>
                    <div class="manual-point-content">${fuelDesc} • ${isAr ? "تجنب معه: " : "Avoid: "} ${hazardDesc}</div>
                </div>
            `;
            return card;
        };

        dom.operatingManualContainer.appendChild(createManualCard(profileA, "type-a"));
        if (profileB) {
            dom.operatingManualContainer.appendChild(createManualCard(profileB, "type-b person-b-col"));
        }
    }

    // Helper: Render De-escalation & Fair Fighting Protocol
    function renderFairFightingBox(report, profileA, isAr) {
        if (!dom.fairFightingContainer) return;
        dom.fairFightingContainer.innerHTML = "";

        const rules = report?.multi_framework_dynamics?.fair_fighting_rules || [
            {
                en: "The 20-Minute Cool-Down: If either partner feels emotionally flooded, pause immediately with reassurance.",
                ar: "قاعدة الـ 20 دقيقة للتهدئة: عند شعور أي طرف بالضغط أو ارتفاع نبرة الصوت، يتم إيقاف النقاش فوراً مع التأكيد على العودة له بهدوء."
            },
            {
                en: "Soft Startup: Begin sensitive feedback with 'I feel' and appreciation rather than accusations.",
                ar: "البداية اللطيفة: بدء الحوارات الحساسة بعبارات مودة وتقدير والتعبير عن المشاعر بدلاً من توجيه الاتهامات."
            },
            {
                en: "One Topic at a Time: Resolve the immediate issue without bringing up the past or extended family matters.",
                ar: "حصر النقاش في موضوع واحد: مناقشة مسألة واحدة محددة دون فتح ملفات الماضي أو إقحام مواقف سابقة."
            }
        ];

        rules.forEach((rule, idx) => {
            const item = document.createElement("div");
            item.className = "fair-fighting-item";
            item.innerHTML = `
                <div class="fair-fighting-num">${idx + 1}</div>
                <div class="manual-point-content" style="font-weight: 500;">
                    ${isAr ? rule.ar : rule.en}
                </div>
            `;
            dom.fairFightingContainer.appendChild(item);
        });
    }

// --- 9A. UNIVERSAL INTERACTIVE CHART TOOLTIP & EXPLANATION ENGINE ---
    const CHART_EXPLANATION_DICTIONARY = {
        hartman: {
            red: {
                icon: "🔴",
                color: "#ef4444",
                title_ar: "الأحمر: دافع القوة والقيادة",
                title_en: "RED: Power & Progress Motive",
                subtitle_ar: "الدافع الجوهري: الكفاءة، الحسم، الإنتاجية، والمباشرة",
                subtitle_en: "Core Motive: Decisive leadership, results, efficiency, and directness",
                body_ar: "يمثل الطاقة القيادية التي تحرك الحياة الزوجية للأمام. يفضل الصراحة التامة وحل المشكلات دون تسويف. في الزواج يقدم الأمان التنفيذي والوضوح، لكنه يحتاج لتدريب النفس على اللين والصبر والاستماع الوجداني للشريك.",
                body_en: "Represents forward drive, goal clarity, and strategic resolution. Red provides strong structural security in marriage, while benefiting from cultivating emotional gentleness and patience with softer feelings."
            },
            blue: {
                icon: "🔵",
                color: "#3b82f6",
                title_ar: "الأزرق: دافع الحميمية والعمق",
                title_en: "BLUE: Intimacy & Connection Motive",
                subtitle_ar: "الدافع الجوهري: الوفاء، الصدق، المشاعر، والتواصل الإنساني",
                subtitle_en: "Core Motive: Deep intimacy, moral loyalty, empathy, and sincere devotion",
                body_ar: "يمثل قلب العلاقة الدافئ وأصالة المشاعر. يضع الأسرة والروابط في قمة أولوياته ويهتم بأدق تفاصيل راحة الشريك. يقدم وفاءً استثنائياً، لكنه حساس للنقد ويحتاج للشعور الدائم بالتقدير والأمان الصادق.",
                body_en: "The emotional heartbeat of partnership. Blue values profound relational authenticity, thoughtful care, and dedicated loyalty, thriving when affirmed with sincere appreciation."
            },
            white: {
                icon: "⚪",
                color: "#94a3b8",
                title_ar: "الأبيض: دافع السلام والسكينة",
                title_en: "WHITE: Peace & Clarity Motive",
                subtitle_ar: "الدافع الجوهري: الهدوء الداخلي، تجنب الصدام، والدبلوماسية",
                subtitle_en: "Core Motive: Inner tranquility, harmony, rational diplomacy, and quiet space",
                body_ar: "يمثل واحة الهدوء والاتزان في المنزل. مستمع صبور، يتجنب المشاحنات المفتعلة، ويتعامل بمرونة ودبلوماسية. يحتاج لمساحته المستقلة ولا يستجيب للإلحاح أو الضغط الانفعالي السريع.",
                body_en: "The oasis of calm and rational balance. White avoids petty conflict, offering patient acceptance and quiet resilience, needing respectful autonomy and low-pressure processing time."
            },
            yellow: {
                icon: "🟡",
                color: "#eab308",
                title_ar: "الأصفر: دافع المرح والبهجة",
                title_en: "YELLOW: Fun & Passion Motive",
                subtitle_ar: "الدافع الجوهري: التفاؤل، الحيوية، الاحتفال بالحياة، والتجديد",
                subtitle_en: "Core Motive: Joyful celebration, spontaneous enthusiasm, social warmth, and play",
                body_ar: "يمثل بهجة البيت وطاقة التفاؤل الإيجابي. يكسر رتابة الروتين بالمفاجآت والمرح ويخفف من وطأة الأزمات. يحتاج للشريك الذي يحتفي بروحه الحيوية ويشاركه لحظات الاستمتاع بالحياة.",
                body_en: "Infuses radiant optimism, humor, and spontaneity into partnership. Yellow turns everyday routines into joyful celebrations, flourishing when affection and playful connection are shared."
            },
            hub: {
                icon: "🎯",
                color: "#0284c7",
                title_ar: "مركز الدافع الجوهري (Primary Motive)",
                title_en: "Core Motive Hub",
                subtitle_ar: "البوصلة العاطفية المحركة للقرارات وردود الفعل",
                subtitle_en: "Subconscious psychological compass shaping relationship needs",
                body_ar: "اللون المهيمن يحدد ما يحتاجه قلبك لكي يشعر بالاكتمال، بينما توفر الألوان الأخرى دعائم تكميلية لشخصيتك المتزنة.",
                body_en: "Your dominant Hartman color reveals your primary psychological craving, integrated with secondary color strengths."
            }
        },
        disc: {
            D: {
                icon: "⚡",
                color: "#ef4444",
                title_ar: "نمط القيادة والحسم (Dominance - D)",
                title_en: "Dominance (D) Behavioral Style",
                subtitle_ar: "إيقاع سريع + تركيز مباشر على المهام والنتائج",
                subtitle_en: "Fast-paced tempo + high task & outcome orientation",
                body_ar: "مبادر وجريء، يعالج التحديات بسرعة ويفضل الإيجاز. في العلاقة يقود الخطط اللوجستية ويحسم التردد، ويقدر الصراحة والشفافية التامة دون التفاف.",
                body_en: "Decisive and action-oriented. D cuts through hesitation, drives joint plans forward, and values transparent, direct communication without beating around the bush."
            },
            I: {
                icon: "✨",
                color: "#eab308",
                title_ar: "نمط التأثير والتفاعل (Influence - I)",
                title_en: "Influence (I) Behavioral Style",
                subtitle_ar: "إيقاع سريع + تركيز عاطفي على الناس والعلاقات",
                subtitle_en: "Fast-paced tempo + high people & emotional orientation",
                body_ar: "معبر ومتفائل، يمتلك طاقة اجتماعية عالية ويحب مشاركة المشاعر والتشجيع المتبادل. يضفي على العلاقة حيوية عاطفية وتواصلاً دافئاً محفزاً.",
                body_en: "Charismatic, expressive, and optimistic. I brings romantic enthusiasm and verbal warmth, thriving when mutual appreciation and social vitality are high."
            },
            S: {
                icon: "🌱",
                color: "#10b981",
                title_ar: "نمط الاستقرار والدعم (Steadiness - S)",
                title_en: "Steadiness (S) Behavioral Style",
                subtitle_ar: "إيقاع متأنٍ وهادئ + تركيز عميق على الناس والوفاء",
                subtitle_en: "Steady tempo + deep people orientation & loyalty",
                body_ar: "صبور ومخلص، ركيزة أمان واستقرار للمنزل. مستمع ممتاز يتجنب التسرع ويدعم الشريك بعطاء هادئ مستمر. يفضل التدرج والوضوح عند أي تغيير.",
                body_en: "Patient, reliable, and deeply empathetic. S provides domestic continuity, emotional safety, and peaceful support, preferring predictable, thoughtful transitions."
            },
            C: {
                icon: "📐",
                color: "#3b82f6",
                title_ar: "نمط الدقة والتحليل (Conscientiousness - C)",
                title_en: "Conscientiousness (C) Behavioral Style",
                subtitle_ar: "إيقاع متأنٍ وهادئ + تركيز تحليلي على المهام والأنظمة",
                subtitle_en: "Steady tempo + meticulous task & logic orientation",
                body_ar: "منهجي ومنظم، يزن القرارات بالعقل ويدرس التفاصيل والميزانيات بعناية. يحمي الأسرة من القرارات المتسرعة ويحب الالتزام بالوعود والخطط المحددة.",
                body_en: "Systematic, analytical, and thorough. C safeguards household plans and finances through careful foresight, valuing precision, logic, and consistent reliability."
            },
            tempo_fast: {
                icon: "⏩",
                color: "#f59e0b",
                title_ar: "محور الإيقاع السريع (Fast-Paced)",
                title_en: "Fast-Paced Tempo",
                subtitle_ar: "استجابة فورية ومبادرة عاجلة نحو الحسم",
                subtitle_en: "Quick processing, rapid execution, immediate closure",
                body_ar: "الميل لمعالجة المواضيع فوراً والتفاعل مع المتغيرات بسرعة دون تردد مطول.",
                body_en: "Tendency to resolve matters promptly with brisk energy and decisive forward motion."
            },
            tempo_steady: {
                icon: "🧘",
                color: "#06b6d4",
                title_ar: "محور الإيقاع المتأني (Deliberate Tempo)",
                title_en: "Deliberate Tempo",
                subtitle_ar: "تفكير هادئ، دراسة متأنية، استقرار قبل القرار",
                subtitle_en: "Reflective contemplation, thorough evaluation, steady pace",
                body_ar: "تفضيل أخذ الوقت الكافي للتأمل ووزن الخيارات بهدوء وتجنب القرارات العشوائية.",
                body_en: "Prefers adequate breathing room to synthesize information calmly before committing."
            },
            focus_task: {
                icon: "🎯",
                color: "#ef4444",
                title_ar: "محور التركيز على المهام (Task Focus)",
                title_en: "Task Focus Axis",
                subtitle_ar: "الأولوية للحقائق والنتائج والحلول المنطقية",
                subtitle_en: "Priority on objective facts, efficiency, and solutions",
                body_ar: "التركيز على حل الإشكالية وتفكيك المسائل العملية بالمنطق المجرد.",
                body_en: "Focuses primarily on pragmatic resolution, structural clarity, and concrete outcomes."
            },
            focus_people: {
                icon: "🤝",
                color: "#10b981",
                title_ar: "محور التركيز على العلاقات (People Focus)",
                title_en: "People Focus Axis",
                subtitle_ar: "الأولوية للمشاعر والتناغم والأثر الوجداني",
                subtitle_en: "Priority on relational harmony, validation, and warmth",
                body_ar: "التركيز على طريقة التواصل والحفاظ على مشاعر الشريك ودفء العلاقة.",
                body_en: "Focuses on interpersonal warmth, psychological safety, and reciprocal care."
            }
        },
        birkman: {
            usual: {
                icon: "🌟",
                color: "#0284c7",
                title_ar: "المستوى 1: السلوك الاجتماعي المعتاد (Usual Style)",
                title_en: "Level 1: Outward Everyday Style (Usual)",
                subtitle_ar: "السلوك الظاهري الملاحظ في التعامل اليومي العفوي",
                subtitle_en: "Natural day-to-day behavior observable under normal conditions",
                body_ar: "يمثل قمة الجبل الجليدي الظاهرة فوق الماء. يعكس كفاءتك الاجتماعية وطاقتك الطبيعية في قيادة الحوار أو الاستماع أو التنظيم عندما تكون مستقراً ومرتاحاً.",
                body_en: "The visible 20% of your psychological iceberg. Reflects your natural operational baseline in everyday domestic and social routines."
            },
            needs: {
                icon: "🛡️",
                color: "#38bdf8",
                title_ar: "المستوى 2: الاحتياج الوجداني الخفي (Underlying Needs)",
                title_en: "Level 2: Underlying Emotional Needs",
                subtitle_ar: "الأكسجين النفسي الخفي الذي تحتاجه لتزدهر وتطمئن",
                subtitle_en: "Submerged relational oxygen required to feel secure",
                body_ar: "يمثل عمق الجبل الجليدي تحت سطح الماء. يحدد كيف تحتاج أن يعاملك شريكك (منحك المساحة، أو التعبير الصريح عن التقدير، أو الوضوح). عند إشباع هذا الاحتياج، تشعر بأقصى درجات الرضا.",
                body_en: "The invisible foundation of emotional security. How you require your partner to treat you (autonomy, empathy, reassurance) to perform at your relational best."
            },
            stress: {
                icon: "⚠️",
                color: "#ef4444",
                title_ar: "المستوى 3: ردة فعل التوتر الارتدادي (Stress Derailer)",
                title_en: "Level 3: Stress Derailer Reaction",
                subtitle_ar: "السلوك الدفاعي التلقائي عند استنزاف الطاقة أو إهمال الاحتياج",
                subtitle_en: "Automated defensive reflex under prolonged fatigue",
                body_ar: "هو رد الفعل غير الواعي (كالانعزال، الإلحاح، أو نفاد الصبر) الذي يظهر لحماية النفس عند الإنهاك الشديد. فهم هذا النمط يساعد الشريك على احتوائه كإشارة تعب وليس كجفاء شخصي.",
                body_en: "The reactive defense mechanism triggered when reserves are depleted. Recognizing it allows partners to offer de-escalation rather than taking it personally."
            },
            iceberg_tip: {
                icon: "🏔️",
                color: "#ffffff",
                title_ar: "قمة الجبل الجليدي: السلوك الواعي",
                title_en: "Iceberg Tip: Conscious Expression",
                subtitle_ar: "ما يراه الناس في ضوء النهار (20% فقط من شخصيتك)",
                subtitle_en: "Visible interactions (only ~20% of psychological makeup)",
                body_ar: "التعاملات الاجتماعية واللغة والأسلوب المعتاد الملاحظ في العمل والزيارات العائلية.",
                body_en: "Social style, everyday cadence, and outward communication observable by others."
            },
            iceberg_base: {
                icon: "🌊",
                color: "#0369a1",
                title_ar: "عمق الجبل الجليدي: الدوافع غير المرئية",
                title_en: "Submerged Mass: Invisible Drivers",
                subtitle_ar: "80% من الطاقة النفسية المؤثرة في الزواج تقبع تحت السطح",
                subtitle_en: "~80% of marital dynamics reside beneath awareness",
                body_ar: "الاحتياجات الدفينة ومخاوف التوتر التي تحدد متانة التوافق الزوجي واستقراره طويل المدى.",
                body_en: "The profound emotional needs and stress triggers that govern lifelong marital flourishing."
            }
        },
        attachment: {
            secure: {
                icon: "🛡️",
                color: "#059669",
                title_ar: "نمط الارتباط الآمن (Secure Attachment)",
                title_en: "Secure Attachment Style",
                subtitle_ar: "انخفاض القلق + انخفاض التجنب (أمان وجداني متوازن)",
                subtitle_en: "Low Anxiety + Low Avoidance (Grounded intimacy & autonomy)",
                body_ar: "ثقة متبادلة وتوازن بين القرب العاطفي والمساحة الفردية. يتعامل مع الخلافات بتواصل ناضج ومباشر ويشكل ملاذاً آمناً للشريك في لحظات الضعف.",
                body_en: "Comfortable with both emotional closeness and personal independence. Manages conflict cooperatively and provides a steady anchor for the relationship."
            },
            anxious: {
                icon: "💛",
                color: "#d97706",
                title_ar: "نمط الارتباط القلق (Anxious Attachment)",
                title_en: "Anxious Attachment Style",
                subtitle_ar: "ارتفاع القلق + انخفاض التجنب (حساسية عالية للجفاء)",
                subtitle_en: "High Anxiety + Low Avoidance (Craves proximity & constant reassurance)",
                body_ar: "شديد الحرص على الوصل ويبحث عن التطمين الدائم. قد يفسر الصمت المؤقت للشريك على أنه فتور، ويزدهر عندما يُغدق عليه الشريك بالدفء والاهتمام المنتظم.",
                body_en: "Highly attuned to emotional cues with an intense desire for closeness. Flourishes when provided with consistent verbal affirmation and proactive reassurance."
            },
            avoidant: {
                icon: "💙",
                color: "#2563eb",
                title_ar: "نمط الارتباط التجنبي (Dismissive-Avoidant)",
                title_en: "Dismissive-Avoidant Style",
                subtitle_ar: "انخفاض القلق + ارتفاع التجنب (اعتماد كامل على الذات)",
                subtitle_en: "Low Anxiety + High Avoidance (Self-reliant, retreats under emotional pressure)",
                body_ar: "شديد الاستقلالية ويجد صعوبة في التعبير عن الضعف. عند احتدام المشاعر يميل للانسحاب واستعادة هدوئه بمفرده، ويحتاج لاحترام مساحته دون ملاحقة خانقة.",
                body_en: "Values extreme self-reliance and retreats when relational intensity peaks. Recharges in quiet autonomy and benefits from low-pressure emotional invitations."
            },
            fearful: {
                icon: "❤️",
                color: "#dc2626",
                title_ar: "نمط الارتباط المضطرب (Fearful-Avoidant)",
                title_en: "Fearful-Avoidant Style",
                subtitle_ar: "ارتفاع القلق + ارتفاع التجنب (شوق للقرب مقرون بالحذر)",
                subtitle_en: "High Anxiety + High Avoidance (Longing for closeness yet fearing hurt)",
                body_ar: "يشتاق للحب والعمق بشدة لكنه يخشى التعرض للخذلان. تتنازعه الرغبة في الاقتراب والخوف من الصدمة، ويحتاج إلى بيئة فائقة الأمان والصبر المتدرج لبناء الثقة.",
                body_en: "Longs for deep romantic intimacy yet anticipates rejection or betrayal. Requires patient consistency, high transparency, and a deeply safe environment."
            }
        },
        firo: {
            ctrl_exp: {
                icon: "👑",
                color: "#3b82f6",
                title_ar: "ممارسة القيادة والقرار (Control Expressed)",
                title_en: "Decision Leadership (Control Expressed)",
                subtitle_ar: "مدى رغبتك في إدارة الخطط واتخاذ القرارات الأسرية",
                subtitle_en: "Initiative in managing strategy, budgets, and plans",
                body_ar: "تحديد مدى مبادرتك بمسك زمام التوجيه الأسري. التناغم يحدث عندما تتطابق رغبة أحد الطرفين في المبادرة مع ترحيب الطرف الآخر بمشاركته.",
                body_en: "Measures appetite for directing household strategy and major decisions, harmonizing when matched with partner receptivity."
            },
            ctrl_wnt: {
                icon: "🧭",
                color: "#8b5cf6",
                title_ar: "قبول التوجيه والمشورة (Control Wanted)",
                title_en: "Receptivity to Guidance (Control Wanted)",
                subtitle_ar: "مدى ترحيبك بوضوح التوجيه ومشاركة الشريك في القيادة",
                subtitle_en: "Comfort with structure, direction, and partner leadership",
                body_ar: "الرغبة في الاعتماد على حسم الشريك وتفويضه لقيادة بعض الملفات دون الشعور بالتضييق أو التحكم السلبي.",
                body_en: "Comfort with relying on partner's decisive leadership and structure without feeling restricted."
            },
            aff_exp: {
                icon: "💖",
                color: "#ec4899",
                title_ar: "المبادرة بالدفء والتعبير (Affection Expressed)",
                title_en: "Affection Expression",
                subtitle_ar: "مدى إظهارك لمشاعر الود والاهتمام والكلمات الطيبة",
                subtitle_en: "Proactive display of warmth, praise, and emotional fondness",
                body_ar: "المبادرة اللفظية والوجدانية بالتعبير عن الحب والامتنان دون انتظار الطرف الآخر.",
                body_en: "Proactive verbal, emotional, and physical expressions of admiration and tender connection."
            },
            aff_wnt: {
                icon: "🌿",
                color: "#10b981",
                title_ar: "الاحتياج للتعبير العاطفي (Affection Wanted)",
                title_en: "Affection Craved",
                subtitle_ar: "مدى رغبتك في سماع كلمات المودة وتلقي الاهتمام الصادق",
                subtitle_en: "Need for verbal and emotional affirmation from partner",
                body_ar: "حجم خزانك العاطفي ومدى حاجتك للشعور بأنك محبوب ومميز في نظر شريك حياتك بانتظام.",
                body_en: "Depth of emotional need for explicit validation, attentive listening, and regular partner appreciation."
            }
        },
        gottman: {
            safety_gauge: {
                icon: "🏰",
                color: "#10b981",
                title_ar: "مؤشر الأمان العاطفي (Emotional Safety Index)",
                title_en: "Gottman Emotional Safety Index",
                subtitle_ar: "الركيزة الأساسية لبيت العلاقة السليم (Sound Relationship House)",
                subtitle_en: "Foundational bedrock protecting couples from emotional flooding",
                body_ar: "يقيس مدى شعور الشريكين بالأمان النفسي عند التعبير عن الضعف أو الاختلاف دون خوف من التجريح أو الاستهزاء. نسبة 75%+ تعني مناعة ممتازة واستقراراً طويلاً.",
                body_en: "Measures mutual psychological safety. Scores above 75% insulate couples from chronic flooding and sustain lifelong trust."
            },
            criticism: {
                icon: "⚡",
                color: "#ef4444",
                title_ar: "النقد واللوم الشخصي (Criticism)",
                title_en: "Criticism (1st Horseman)",
                subtitle_ar: "مهاجمة شخصية الشريك بدلاً من نقد الفعل المحدد",
                subtitle_en: "Attacking partner's personality rather than a specific issue",
                body_ar: "الترياق العلاجي: (البدء اللطيف) بالتعبير عن شعورك الخاص بصيغة 'أنا أشعر بـ...' مع صياغة طلب محدد وإيجابي دون استخدام 'أنت دائماً/أنت لا'.",
                body_en: "Clinical Antidote: (Gentle Start-up). Express internal feelings with 'I feel...' and state a concrete positive need, avoiding character blame."
            },
            defensiveness: {
                icon: "🛡️",
                color: "#f59e0b",
                title_ar: "الدفاعية والتبرير المفرط (Defensiveness)",
                title_en: "Defensiveness (2nd Horseman)",
                subtitle_ar: "لعب دور الضحية وتبرير الأخطاء أو رد الاتهام بالمثل",
                subtitle_en: "Self-defense through counter-attacking or perceived victimhood",
                body_ar: "الترياق العلاجي: (تحمل المسؤولية) بالاعتراف بجزء من المشكلة ولو كان بنسبة 10% لكسر دائرة التصعيد وتهدئة الشريك.",
                body_en: "Clinical Antidote: (Taking Responsibility). Validate even 10% of your partner's grievance to instantly disarm defensive escalation."
            },
            stonewalling: {
                icon: "🧱",
                color: "#64748b",
                title_ar: "الانعزال وبناء الجدار الصامت (Stonewalling)",
                title_en: "Stonewalling (3rd Horseman)",
                subtitle_ar: "الانغلاق التام وتجاهل الشريك عند ارتفاع التوتر",
                subtitle_en: "Total emotional shut-down and silent retreat",
                body_ar: "الترياق العلاجي: (التهدئة الذاتية الفسيولوجية) بطلب استراحة واعية لمدة 20 دقيقة لتهدئة نبضات القلب قبل إكمال الحديث الهادئ.",
                body_en: "Clinical Antidote: (Physiological Self-Soothing). Enforce a 20-minute de-escalation timeout to lower elevated heart rate before talking."
            },
            contempt: {
                icon: "☣️",
                color: "#991b1b",
                title_ar: "الازدراء والتقليل من المشاعر (Contempt)",
                title_en: "Contempt (4th & Most Toxic Horseman)",
                subtitle_ar: "السخرية أو النظرة الدونية (المؤشر الأول للانهيار إذا أهمل)",
                subtitle_en: "Sarcasm, mockery, or condescension (#1 divorce predictor)",
                body_ar: "الترياق العلاجي: (بناء ثقافة التقدير والامتنان) بالتركيز اليومي على محاسن الشريك والتعبير الصادق عن شكره على أبسط أفعاله الإيجابية.",
                body_en: "Clinical Antidote: (Culture of Appreciation). Actively scan for and verbally express daily gratitude for positive partner contributions."
            }
        },
        consciousness: {
            hawkins_track: {
                icon: "⚡",
                color: "#a855f7",
                title_ar: "خريطة مستويات الوعي (د. ديفيد هوكينز)",
                title_en: "Map of Consciousness (Dr. David R. Hawkins)",
                subtitle_ar: "مقياس لوغاريتمي من 20 (العار) إلى 600+ (السلام والاستنارة)",
                subtitle_en: "Calibrated logarithmic scale from 20 to 600+",
                body_ar: "يقيس التردد الشعوري الغالب على نظرة الإنسان للحياة. عتبة الشجاعة (200) هي الفاصل الحرج بين طاقة القسر التفاعلية وفضاء القوة الروحية البنّاءة.",
                body_en: "Measures habitual awareness baseline. The 200 Courage threshold separates reactive Force from creative constructive Power."
            },
            hawkins_200: {
                icon: "⚖️",
                color: "#ffffff",
                title_ar: "عتبة الشجاعة الحيوية (المستوى 200)",
                title_en: "200 Courage Pivotal Threshold",
                subtitle_ar: "الفاصل الوجودي بين ردود أفعال الضغط والقوة البنّاءة",
                subtitle_en: "The boundary between Force (Reaction) and Power (Creation)",
                body_ar: "تحت 200 (الخوف، الغضب، الكبرياء): لوم الشريك والتمترس خلف الأنا. فوق 200 (الشجاعة، القبول، المحبة): تحمل المسؤولية وسرعة التسامي والارتقاء بالعلاقة.",
                body_en: "Below 200 (Fear, Anger, Pride): contraction and blame. Above 200 (Courage, Acceptance, Love): personal ownership, empathy, and mutual flourishing."
            },
            hicks_track: {
                icon: "🌈",
                color: "#10b981",
                title_ar: "السلم التوجيهي للمشاعر (إبراهام هيكس)",
                title_en: "Emotional Guidance Scale (Abraham Hicks)",
                subtitle_ar: "22 درجة مشاعرية تحدد بوصلة التدفق الوجداني",
                subtitle_en: "22-tier vibrational emotional continuum",
                body_ar: "المستويات 1-7 (محاذاة عليا وبهجة)، المستويات 8-14 (احتكاك وتردد يتطلب انتباهاً)، المستويات 15-22 (مقاومة حادة تتطلب تهدئة عاجلة قبل النقاش).",
                body_en: "Levels 1-7 (Joy & Contentment), Levels 8-14 (Friction & Doubt), Levels 15-22 (Contraction & Fear requiring grounding before discussing issues)."
            }
        },
        big_five: {
            openness: {
                icon: "🎨",
                color: "#8b5cf6",
                title_ar: "الانفتاح على التجارب (Openness)",
                title_en: "Openness to Experience",
                subtitle_ar: "الفضول الفكري وتجربة أفكار ومناشط جديدة",
                subtitle_en: "Intellectual curiosity, imagination, and novelty appetite",
                body_ar: "ارتفاع السمة يعني حباً للتجديد ومناقشة الأفكار الفلسفية والمغامرات، بينما انخفاضها يعني تفضيل الاستقرار والروتين المألوف والواقعية المجربة.",
                body_en: "High scores crave novelty, philosophical depth, and creative exploration; lower scores prize predictable routines, grounded pragmatism, and tradition."
            },
            conscientiousness: {
                icon: "📋",
                color: "#06b6d4",
                title_ar: "يقظة الضمير والتنظيم (Conscientiousness)",
                title_en: "Conscientiousness & Orderliness",
                subtitle_ar: "الانضباط الذاتي، المنهجية، والوفاء بالالتزامات",
                subtitle_en: "Disciplined execution, orderliness, and reliability",
                body_ar: "ارتفاع السمة يعني عناية فائقة بالمواعيد، الميزانية، والتنظيم المنزلي، بينما انخفاضها يعكس مرونة وعفوية عالية وتفضيلاً للبساطة دون قيود.",
                body_en: "High scores bring rigorous punctuality, structured budgeting, and thorough planning; lower scores bring spontaneous adaptability and easygoing ease."
            },
            extraversion: {
                icon: "🗣️",
                color: "#f59e0b",
                title_ar: "الانبساطية والاجتماعية (Extraversion)",
                title_en: "Extraversion & Relational Vitality",
                subtitle_ar: "استمداد الطاقة من التجمعات والحديث والتعبير الخارجي",
                subtitle_en: "Drawing energy from social connection and verbal engagement",
                body_ar: "ارتفاع السمة يعني حيوية اجتماعية ورغبة في مشاركة الأنشطة والحديث، بينما انخفاضها (الانطوائية) يعني استمداد الطاقة من الهدوء والخلوة لاستعادة النشاط.",
                body_en: "High scores thrive on outward activities and conversational connection; lower scores (introversion) recharge through restorative, quiet personal space."
            },
            agreeableness: {
                icon: "🤝",
                color: "#10b981",
                title_ar: "الوفاق والتعاطف (Agreeableness)",
                title_en: "Agreeableness & Warmth",
                subtitle_ar: "مراعاة مشاعر الشريك، التعاون، والرغبة في الصلح",
                subtitle_en: "Interpersonal warmth, empathy, and harmony seeking",
                body_ar: "ارتفاع السمة يعني رقة قلب وميلاً طبيعياً للصلح ومراعاة خواطر الطرف الآخر، بينما انخفاضها يعني تمسكاً صارماً بالرأي وميلاً للصراحة النقدية الحازمة.",
                body_en: "High scores bring compassionate cooperativeness and peaceful accommodation; lower scores bring candid scrutiny and uncompromising assertiveness."
            },
            neuroticism: {
                icon: "🌊",
                color: "#ef4444",
                title_ar: "الاستقرار النفسي (Emotional Stability)",
                title_en: "Emotional Stability vs. Reactivity",
                subtitle_ar: "القدرة على الثبات في الأزمات وتجاوز المنغصات بهدوء",
                subtitle_en: "Grounded calmness during stress vs. emotional vulnerability",
                body_ar: "الاتزان العالي يعني قدرة على امتصاص ضغوط الحياة دون قلق مزمن أو تقلب مزاج، بينما الحساسية المرتفعة تعني حاجة للشعور بالأمان والتطمين الدائم.",
                body_en: "High stability fosters calm resilience during crises; higher reactivity brings deep sensitivity that flourishes with regular safety and soothing reassurance."
            }
        }
    };

    // Universal Chart Tooltip Manager (Mouse Hover + Mobile Touch Popover)
    const ChartTooltipManager = {
        popupEl: null,
        backdropEl: null,
        activeTarget: null,
        isTouchDevice: false,

        init() {
            if (this.popupEl) return;
            if (typeof document === "undefined") return;

            this.popupEl = document.createElement("div");
            this.popupEl.id = "mwChartPopup";
            this.popupEl.className = "mw-chart-popup";
            this.popupEl.setAttribute("role", "tooltip");
            this.popupEl.setAttribute("aria-hidden", "true");

            this.backdropEl = document.createElement("div");
            this.backdropEl.className = "mw-chart-touch-backdrop";
            this.backdropEl.addEventListener("click", () => this.hide());
            this.backdropEl.addEventListener("touchstart", () => this.hide(), { passive: true });

            document.body.appendChild(this.backdropEl);
            document.body.appendChild(this.popupEl);

            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape") this.hide();
            });

            window.addEventListener("touchstart", () => {
                this.isTouchDevice = true;
            }, { once: true, passive: true });
        },

        show(target, data, options = {}) {
            this.init();
            if (!target || !data || !this.popupEl) return;

            const isAr = typeof state !== "undefined" ? state.localization.currentLang === "ar" : true;
            this.activeTarget = target;
            const isTouch = options.isTouch || this.isTouchDevice;

            const icon = data.icon || "💡";
            const color = data.color || "var(--accent-color)";
            const title = isAr ? (data.title_ar || data.title) : (data.title_en || data.title);
            const subtitle = isAr ? (data.subtitle_ar || data.subtitle) : (data.subtitle_en || data.subtitle);
            const body = isAr ? (data.body_ar || data.body) : (data.body_en || data.body);
            const metric = isAr ? (data.metric_ar || data.metric) : (data.metric_en || data.metric);

            this.popupEl.innerHTML = `
                <div class="mw-chart-popup-header">
                    <div class="mw-chart-popup-title" style="color: ${color};">
                        <span class="mw-chart-popup-dot" style="background-color: ${color}; color: ${color};"></span>
                        <span>${icon} ${title || ""}</span>
                    </div>
                    <button class="mw-chart-popup-close" aria-label="Close" type="button">✕</button>
                </div>
                ${subtitle ? `<div class="mw-chart-popup-subtitle">${subtitle}</div>` : ""}
                ${body ? `<div class="mw-chart-popup-body">${body}</div>` : ""}
                ${metric ? `<div class="mw-chart-popup-metric"><span>📊</span><span>${metric}</span></div>` : ""}
            `;

            const closeBtn = this.popupEl.querySelector(".mw-chart-popup-close");
            if (closeBtn) {
                closeBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    this.hide();
                });
            }

            if (isTouch) {
                this.popupEl.classList.add("is-touch");
                if (this.backdropEl) this.backdropEl.classList.add("active");
                target.classList.add("active-touch");
            } else {
                this.popupEl.classList.remove("is-touch");
                if (this.backdropEl) this.backdropEl.classList.remove("active");
            }

            this.popupEl.setAttribute("dir", isAr ? "rtl" : "ltr");
            this.popupEl.classList.add("active");
            this.popupEl.setAttribute("aria-hidden", "false");

            this.position(target);
        },

        position(target) {
            if (!this.popupEl || !target) return;
            const rect = target.getBoundingClientRect();
            const popRect = this.popupEl.getBoundingClientRect();
            const padding = 12;

            let left = rect.left + rect.width / 2 - popRect.width / 2;
            if (left < padding) left = padding;
            if (left + popRect.width > window.innerWidth - padding) {
                left = window.innerWidth - popRect.width - padding;
            }

            let top = rect.top - popRect.height - 10;
            if (top < padding) {
                top = rect.bottom + 10;
            }
            if (top + popRect.height > window.innerHeight - padding) {
                top = window.innerHeight - popRect.height - padding;
            }

            this.popupEl.style.left = `${Math.round(left)}px`;
            this.popupEl.style.top = `${Math.round(top)}px`;
        },

        hide() {
            if (!this.popupEl) return;
            this.popupEl.classList.remove("active");
            this.popupEl.setAttribute("aria-hidden", "true");
            if (this.backdropEl) this.backdropEl.classList.remove("active");
            if (this.activeTarget) {
                this.activeTarget.classList.remove("active-touch");
                this.activeTarget = null;
            }
        }
    };

    function attachChartTooltip(element, dataGetter) {
        if (!element) return;
        element.classList.add("chart-interactive-element");

        element.addEventListener("mouseenter", (e) => {
            const data = typeof dataGetter === "function" ? dataGetter() : dataGetter;
            ChartTooltipManager.show(element, data, { isTouch: false });
        });

        element.addEventListener("mouseleave", () => {
            if (!ChartTooltipManager.isTouchDevice) {
                ChartTooltipManager.hide();
            }
        });

        element.addEventListener("click", (e) => {
            e.stopPropagation();
            const data = typeof dataGetter === "function" ? dataGetter() : dataGetter;
            ChartTooltipManager.show(element, data, { isTouch: true });
        });

        element.addEventListener("touchstart", (e) => {
            ChartTooltipManager.isTouchDevice = true;
        }, { passive: true });
    }

    // --- 9B. MULTI-FRAMEWORK INTERACTIVE SVG VISUALIZERS ---

// Helper to calculate SVG donut slice path using exact arc geometry
    function describeDonutSlice(cx, cy, rInner, rOuter, startDeg, endDeg, gapDeg = 0) {
        const span = endDeg - startDeg;
        if (span <= 0) return { path: "", midX: cx, midY: cy, midAngle: startDeg, span: 0 };

        let a1 = startDeg;
        let a2 = endDeg;
        if (gapDeg > 0 && span > gapDeg * 1.5) {
            a1 += gapDeg / 2;
            a2 -= gapDeg / 2;
        }

        const rad = (deg) => ((deg - 90) * Math.PI) / 180;
        const midDeg = (a1 + a2) / 2;
        const midR = (rInner + rOuter) / 2;
        const midX = cx + midR * Math.cos(rad(midDeg));
        const midY = cy + midR * Math.sin(rad(midDeg));

        if (span >= 359.9) {
            // Full circle donut
            const path = `
                M ${cx} ${cy - rOuter}
                A ${rOuter} ${rOuter} 0 1 1 ${cx} ${cy + rOuter}
                A ${rOuter} ${rOuter} 0 1 1 ${cx} ${cy - rOuter}
                M ${cx} ${cy - rInner}
                A ${rInner} ${rInner} 0 1 0 ${cx} ${cy + rInner}
                A ${rInner} ${rInner} 0 1 0 ${cx} ${cy - rInner}
                Z
            `;
            return { path, midX, midY, midAngle: midDeg, span };
        }

        const r1 = rad(a1);
        const r2 = rad(a2);

        const x1Out = cx + rOuter * Math.cos(r1);
        const y1Out = cy + rOuter * Math.sin(r1);
        const x2Out = cx + rOuter * Math.cos(r2);
        const y2Out = cy + rOuter * Math.sin(r2);

        const x1In = cx + rInner * Math.cos(r1);
        const y1In = cy + rInner * Math.sin(r1);
        const x2In = cx + rInner * Math.cos(r2);
        const y2In = cy + rInner * Math.sin(r2);

        const largeArc = (a2 - a1 > 180) ? 1 : 0;

        const path = [
            `M ${x1Out.toFixed(2)} ${y1Out.toFixed(2)}`,
            `A ${rOuter.toFixed(2)} ${rOuter.toFixed(2)} 0 ${largeArc} 1 ${x2Out.toFixed(2)} ${y2Out.toFixed(2)}`,
            `L ${x2In.toFixed(2)} ${y2In.toFixed(2)}`,
            `A ${rInner.toFixed(2)} ${rInner.toFixed(2)} 0 ${largeArc} 0 ${x1In.toFixed(2)} ${y1In.toFixed(2)}`,
            `Z`
        ].join(" ");

        return { path, midX, midY, midAngle: midDeg, span };
    }

    // 1. Hartman Motive Spectrum Donut & Percentage Visualizer
    function renderHartmanDonut(container, traitsA, traitsB, isSingle, nameA, nameB, isAr) {
        if (!container) return;
        container.innerHTML = "";

        const hA = (traitsA && traitsA.hartman) || { breakdown: { red: 25, blue: 25, white: 25, yellow: 25 }, primary: "red" };
        const bA = hA.breakdown || hA.scores || { red: 25, blue: 25, white: 25, yellow: 25 };

        const colors = {
            red: {
                hex: "#ef4444",
                gradStart: "#f87171",
                gradEnd: "#dc2626",
                stroke: "#b91c1c",
                label: isAr ? "الأحمر (القيادة والإنجاز)" : "Red (Power & Progress)",
                shortLabel: isAr ? "الأحمر" : "Red",
                motive: isAr ? "القوة والإنجاز والقيادة" : "Power & Progress",
                desc: isAr ? "الكفاءة، الحسم، والمباشرة" : "Efficiency, decisive leadership, and directness"
            },
            blue: {
                hex: "#3b82f6",
                gradStart: "#60a5fa",
                gradEnd: "#2563eb",
                stroke: "#1d4ed8",
                label: isAr ? "الأزرق (العمق والوفاء)" : "Blue (Intimacy & Depth)",
                shortLabel: isAr ? "الأزرق" : "Blue",
                motive: isAr ? "التقارب والعمق العاطفي والوفاء" : "Intimacy & Devotion",
                desc: isAr ? "الوفاء، الصدق، والتواصل العميق" : "Loyalty, sincere devotion, and empathy"
            },
            white: {
                hex: "#94a3b8",
                gradStart: "#e2e8f0",
                gradEnd: "#94a3b8",
                stroke: "#64748b",
                label: isAr ? "الأبيض (السلام والسكينة)" : "White (Peace & Clarity)",
                shortLabel: isAr ? "الأبيض" : "White",
                motive: isAr ? "السلام والوضوح والهدوء الداخلي" : "Peace & Clarity",
                desc: isAr ? "الهدوء، الدبلوماسية، والقبول" : "Inner tranquility, diplomacy, and quiet space"
            },
            yellow: {
                hex: "#f59e0b",
                gradStart: "#fde047",
                gradEnd: "#d97706",
                stroke: "#b45309",
                label: isAr ? "الأصفر (المرح والبهجة)" : "Yellow (Fun & Passion)",
                shortLabel: isAr ? "الأصفر" : "Yellow",
                motive: isAr ? "المرح والعفوية والتفاؤل الحيوي" : "Fun & Optimism",
                desc: isAr ? "التفاؤل، الحيوية، والاحتفال بالحياة" : "Joyful celebration, enthusiasm, and play"
            }
        };

        const colorKeys = ["red", "blue", "white", "yellow"];

        // Normalize Person A percentages so they sum to 100
        const rawSumA = colorKeys.reduce((acc, k) => acc + Math.max(0, Number(bA[k]) || 0), 0) || 100;
        const pctA = {};
        colorKeys.forEach(k => {
            pctA[k] = Math.round(((Math.max(0, Number(bA[k]) || 0)) / rawSumA) * 100);
        });
        // Correct rounding drift if any
        const sumPctA = colorKeys.reduce((acc, k) => acc + pctA[k], 0);
        if (sumPctA !== 100) {
            const sortedByVal = [...colorKeys].sort((a, b) => pctA[b] - pctA[a]);
            pctA[sortedByVal[0]] += (100 - sumPctA);
        }

        const primaryColorA = (hA.primary || Object.entries(pctA).sort((a, b) => b[1] - a[1])[0][0] || "red").toLowerCase();
        const primaryHexA = colors[primaryColorA]?.hex || "#ef4444";
        const motiveNameA = hA.metadata ? (isAr ? hA.metadata.motive_ar : hA.metadata.motive_en) : (colors[primaryColorA]?.motive || primaryColorA.toUpperCase());

        const getFirstName = (fullName, fallback) => {
            if (!fullName) return fallback;
            const parts = String(fullName).trim().split(/\s+/);
            return parts[0] || fallback;
        };
        const shortNameA = getFirstName(nameA, isAr ? "الطرف الأول" : "Person A");
        const shortNameB = getFirstName(nameB, isAr ? "الطرف الثاني" : "Person B");

        // Person B setup for comparison
        const hB = (traitsB && traitsB.hartman) || { breakdown: { red: 25, blue: 25, white: 25, yellow: 25 }, primary: "blue" };
        const bB = hB.breakdown || hB.scores || { red: 25, blue: 25, white: 25, yellow: 25 };
        const rawSumB = colorKeys.reduce((acc, k) => acc + Math.max(0, Number(bB[k]) || 0), 0) || 100;
        const pctB = {};
        colorKeys.forEach(k => {
            pctB[k] = Math.round(((Math.max(0, Number(bB[k]) || 0)) / rawSumB) * 100);
        });
        const sumPctB = colorKeys.reduce((acc, k) => acc + pctB[k], 0);
        if (sumPctB !== 100) {
            const sortedByValB = [...colorKeys].sort((a, b) => pctB[b] - pctB[a]);
            pctB[sortedByValB[0]] += (100 - sumPctB);
        }
        const primaryColorB = (hB.primary || Object.entries(pctB).sort((a, b) => b[1] - a[1])[0][0] || "blue").toLowerCase();
        const primaryHexB = colors[primaryColorB]?.hex || "#3b82f6";
        const motiveNameB = hB.metadata ? (isAr ? hB.metadata.motive_ar : hB.metadata.motive_en) : (colors[primaryColorB]?.motive || primaryColorB.toUpperCase());

        const width = 280, height = 280;
        const cx = 140, cy = 140;

        // Common SVG Definitions (Gradients & Filters)
        const defsSvg = `
            <defs>
                ${colorKeys.map(k => `
                    <linearGradient id="hartman_grad_${k}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="${colors[k].gradStart}" />
                        <stop offset="100%" stop-color="${colors[k].gradEnd}" />
                    </linearGradient>
                `).join('')}
                <filter id="hartmanGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>
        `;

        let ringsSvg = "";
        let hubSvg = "";
        let legendHtml = "";

        if (isSingle) {
            // --- SINGLE VIEW: Rich Segmented Donut ---
            const rOuter = 114, rInner = 68;
            const nonZeroCount = colorKeys.filter(k => pctA[k] > 0).length;
            const gapDeg = nonZeroCount > 1 ? 2.0 : 0;

            let currentAngle = 0;
            let slicesSvg = "";
            let textLabelsSvg = "";

            colorKeys.forEach(k => {
                const pct = pctA[k];
                if (pct <= 0) return;
                const span = (pct / 100) * 360;
                const startDeg = currentAngle;
                const endDeg = currentAngle + span;
                currentAngle += span;

                const slice = describeDonutSlice(cx, cy, rInner, rOuter, startDeg, endDeg, gapDeg);
                slicesSvg += `
                    <path class="hartman-slice chart-interactive-element"
                          data-color-key="${k}"
                          data-person="A"
                          data-pct="${pct}"
                          d="${slice.path}"
                          fill="url(#hartman_grad_${k})"
                          stroke="${colors[k].stroke}"
                          stroke-width="1.2">
                    </path>
                `;

                // Render percentage text directly on slice if span allows
                if (slice.span >= 20) {
                    textLabelsSvg += `
                        <text class="hartman-slice-text notranslate" translate="no"
                              x="${slice.midX.toFixed(1)}" y="${(slice.midY + 4).toFixed(1)}"
                              text-anchor="middle" font-size="12" font-weight="900" fill="#ffffff"
                              style="text-shadow: 0 1px 3px rgba(0,0,0,0.85);">
                            ${pct}%
                        </text>
                    `;
                }
            });

            ringsSvg = `
                <circle cx="${cx}" cy="${cy}" r="${(rInner + rOuter) / 2}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="${rOuter - rInner}" />
                ${slicesSvg}
                ${textLabelsSvg}
            `;

            // Interactive Center Hub
            hubSvg = `
                <g class="hartman-hub chart-interactive-element" data-hub="true">
                    <circle class="hartman-hub-circle" cx="${cx}" cy="${cy}" r="58" fill="var(--bg-secondary)" stroke="var(--border-color)" stroke-width="2" />
                    <circle id="hartmanHubRing" class="hub-accent-ring" cx="${cx}" cy="${cy}" r="53" fill="none" stroke="${primaryHexA}" stroke-width="2" opacity="0.4" />
                    <text id="hartmanHubPercent" class="notranslate" translate="no" x="${cx}" y="${cy - 12}" text-anchor="middle" fill="${primaryHexA}" font-size="22" font-weight="900">${pctA[primaryColorA]}%</text>
                    <text id="hartmanHubTitle" x="${cx}" y="${cy + 8}" text-anchor="middle" fill="var(--text-primary)" font-size="12" font-weight="800">${colors[primaryColorA]?.shortLabel || primaryColorA.toUpperCase()}</text>
                    <text id="hartmanHubSub" x="${cx}" y="${cy + 24}" text-anchor="middle" fill="var(--text-secondary)" font-size="9" font-weight="600">${motiveNameA}</text>
                </g>
            `;

            // Enhanced Compact Interactive Legend
            legendHtml = `
                <div class="hartman-legend-grid">
                    ${colorKeys.map(k => `
                        <div class="hartman-legend-card chart-interactive-element" data-color-key="${k}">
                            <div class="hartman-card-header">
                                <div class="hartman-header-title">
                                    <span class="hartman-color-pill" style="background-color: ${colors[k].hex};"></span>
                                    <strong>${colors[k].shortLabel}</strong>
                                    <span class="hartman-card-sub">${colors[k].motive}</span>
                                </div>
                                <strong class="hartman-row-val notranslate" translate="no" style="color: ${colors[k].hex}; font-size: 0.95rem;">${pctA[k]}%</strong>
                            </div>
                            <div class="hartman-row-bar-track" style="margin-top: 6px;">
                                <div class="hartman-row-bar-fill" style="width: ${pctA[k]}%; background: linear-gradient(90deg, ${colors[k].gradStart}, ${colors[k].gradEnd});"></div>
                            </div>
                            <div class="hartman-mini-desc">${colors[k].desc}</div>
                        </div>
                    `).join('')}
                </div>
            `;

        } else {
            // --- COMPARISON VIEW: Dual Concentric Rings with Interactive Person Focus/Shadow ---

            // Outer Ring: Person A
            const rOuterA = 122, rInnerA = 88;
            const gapDegA = colorKeys.filter(k => pctA[k] > 0).length > 1 ? 1.8 : 0;
            let currentAngleA = 0;
            let slicesSvgA = "";
            let textLabelsSvgA = "";

            colorKeys.forEach(k => {
                const pct = pctA[k];
                if (pct <= 0) return;
                const span = (pct / 100) * 360;
                const slice = describeDonutSlice(cx, cy, rInnerA, rOuterA, currentAngleA, currentAngleA + span, gapDegA);
                currentAngleA += span;

                slicesSvgA += `
                    <path class="hartman-slice chart-interactive-element"
                          data-color-key="${k}"
                          data-person="A"
                          data-pct="${pct}"
                          d="${slice.path}"
                          fill="url(#hartman_grad_${k})"
                          stroke="${colors[k].stroke}"
                          stroke-width="1.2">
                    </path>
                `;
                if (slice.span >= 24) {
                    textLabelsSvgA += `
                        <text class="hartman-slice-text notranslate" translate="no"
                              data-person="A"
                              x="${slice.midX.toFixed(1)}" y="${(slice.midY + 4).toFixed(1)}"
                              text-anchor="middle" font-size="11" font-weight="900" fill="#ffffff"
                              style="text-shadow: 0 1px 3px rgba(0,0,0,0.85);">
                            ${pct}%
                        </text>
                    `;
                }
            });

            // Inner Ring: Person B
            const rOuterB = 84, rInnerB = 52;
            const gapDegB = colorKeys.filter(k => pctB[k] > 0).length > 1 ? 1.8 : 0;
            let currentAngleB = 0;
            let slicesSvgB = "";
            let textLabelsSvgB = "";

            colorKeys.forEach(k => {
                const pct = pctB[k];
                if (pct <= 0) return;
                const span = (pct / 100) * 360;
                const slice = describeDonutSlice(cx, cy, rInnerB, rOuterB, currentAngleB, currentAngleB + span, gapDegB);
                currentAngleB += span;

                slicesSvgB += `
                    <path class="hartman-slice chart-interactive-element"
                          data-color-key="${k}"
                          data-person="B"
                          data-pct="${pct}"
                          d="${slice.path}"
                          fill="url(#hartman_grad_${k})"
                          stroke="${colors[k].stroke}"
                          stroke-width="1.2">
                    </path>
                `;
                if (slice.span >= 28) {
                    textLabelsSvgB += `
                        <text class="hartman-slice-text notranslate" translate="no"
                              data-person="B"
                              x="${slice.midX.toFixed(1)}" y="${(slice.midY + 3.5).toFixed(1)}"
                              text-anchor="middle" font-size="10" font-weight="900" fill="#ffffff"
                              style="text-shadow: 0 1px 3px rgba(0,0,0,0.85);">
                            ${pct}%
                        </text>
                    `;
                }
            });

            ringsSvg = `
                <circle cx="${cx}" cy="${cy}" r="${(rInnerA + rOuterA) / 2}" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="${rOuterA - rInnerA}" />
                <circle cx="${cx}" cy="${cy}" r="${(rInnerB + rOuterB) / 2}" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="${rOuterB - rInnerB}" />
                ${slicesSvgA}
                ${textLabelsSvgA}
                ${slicesSvgB}
                ${textLabelsSvgB}
            `;

            // Comparison Center Hub
            hubSvg = `
                <g class="hartman-hub chart-interactive-element" data-hub="true">
                    <circle class="hartman-hub-circle" cx="${cx}" cy="${cy}" r="45" fill="var(--bg-secondary)" stroke="var(--border-color)" stroke-width="1.8" />
                    <text id="hartmanHubPersonA" class="notranslate" translate="no" x="${cx}" y="${cy - 10}" text-anchor="middle" fill="${primaryHexA}" font-size="11" font-weight="900">${shortNameA}: ${pctA[primaryColorA]}%</text>
                    <text id="hartmanHubPersonB" class="notranslate" translate="no" x="${cx}" y="${cy + 8}" text-anchor="middle" fill="${primaryHexB}" font-size="11" font-weight="900">${shortNameB}: ${pctB[primaryColorB]}%</text>
                    <text id="hartmanHubSub" x="${cx}" y="${cy + 22}" text-anchor="middle" fill="var(--text-secondary)" font-size="8.5" font-weight="700">${isAr ? "تكامل الطيف" : "Spectrum Synergy"}</text>
                </g>
            `;

            // Interactive Ring Filter Badges (Buttons to shadow/focus)
            const ringBadgesHtml = `
                <div class="hartman-ring-legend">
                    <button type="button" class="hartman-ring-btn active-btn-both" data-person-toggle="both" title="${isAr ? 'عرض كلا الطرفين معاً' : 'Show both profiles together'}">
                        <span>👁️</span>
                        <span>${isAr ? "كلاهما معاً" : "Both"}</span>
                    </button>
                    <button type="button" class="hartman-ring-btn" data-person-toggle="A" title="${isAr ? 'التركيز على ' + shortNameA + ' وتظليل الشريك' : 'Focus on ' + shortNameA + ' and shadow partner'}">
                        <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#10b981;"></span>
                        <span>${shortNameA} (${isAr ? "الخارجية" : "Outer"}: ${pctA[primaryColorA]}%)</span>
                    </button>
                    <button type="button" class="hartman-ring-btn" data-person-toggle="B" title="${isAr ? 'التركيز على ' + shortNameB + ' وتظليل الشريك' : 'Focus on ' + shortNameB + ' and shadow partner'}">
                        <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#f59e0b;"></span>
                        <span>${shortNameB} (${isAr ? "الداخلية" : "Inner"}: ${pctB[primaryColorB]}%)</span>
                    </button>
                </div>
            `;

            // Organized Minimal Comparison Boxes
            legendHtml = `
                ${ringBadgesHtml}
                <div class="hartman-legend-grid">
                    ${colorKeys.map(k => `
                        <div class="hartman-legend-card chart-interactive-element" data-color-key="${k}">
                            <div class="hartman-card-header">
                                <div class="hartman-header-title">
                                    <span class="hartman-color-pill" style="background-color: ${colors[k].hex};"></span>
                                    <strong>${colors[k].shortLabel}</strong>
                                    <span class="hartman-card-sub">${colors[k].motive}</span>
                                </div>
                            </div>
                            <div class="hartman-comp-rows">
                                <div class="hartman-person-row row-person-a">
                                    <span class="hartman-row-label">${shortNameA}</span>
                                    <div class="hartman-row-bar-track">
                                        <div class="hartman-row-bar-fill" style="width: ${pctA[k]}%; background: ${colors[k].hex};"></div>
                                    </div>
                                    <strong class="hartman-row-val notranslate" translate="no" style="color: ${colors[k].hex};">${pctA[k]}%</strong>
                                </div>
                                <div class="hartman-person-row row-person-b">
                                    <span class="hartman-row-label">${shortNameB}</span>
                                    <div class="hartman-row-bar-track">
                                        <div class="hartman-row-bar-fill" style="width: ${pctB[k]}%; background: ${colors[k].hex}; opacity: 0.75;"></div>
                                    </div>
                                    <strong class="hartman-row-val notranslate" translate="no" style="color: ${colors[k].hex}; opacity: 0.9;">${pctB[k]}%</strong>
                                </div>
                            </div>
                            <div class="hartman-mini-desc">${colors[k].desc}</div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // Fuel Card Info
        const fuelText = isAr
            ? (hA.metadata?.fuel_ar || "الكفاءة والإنجاز العملي")
            : (hA.metadata?.fuel_en || "Competence and efficiency");

        const fuelHtml = `
            <div class="hartman-fuel-banner chart-interactive-element" data-hub="true">
                <span class="fuel-icon">⚡</span>
                <div>
                    <strong style="color: var(--accent-color);">${isAr ? "الوقود النفسي الحاكم:" : "Governing Core Fuel:"}</strong>
                    <span>${fuelText}</span>
                </div>
            </div>
        `;

        const fullSvg = `
            <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
                <svg class="interactive-svg" viewBox="0 0 ${width} ${height}" style="width: 100%; max-width: 290px; height: auto; aspect-ratio: 1 / 1; overflow: visible;">
                    ${defsSvg}
                    ${ringsSvg}
                    ${hubSvg}
                </svg>
                ${legendHtml}
                ${fuelHtml}
            </div>
        `;

        container.innerHTML = fullSvg;

        // Setup Dynamic Interactive Center Hub & Hover Sync
        const hubEl = container.querySelector("[data-hub='true']");
        const hubPercent = container.querySelector("#hartmanHubPercent");
        const hubTitle = container.querySelector("#hartmanHubTitle");
        const hubSub = container.querySelector("#hartmanHubSub");
        const hubRing = container.querySelector("#hartmanHubRing");

        let activeFocus = "both"; // 'both', 'A', or 'B'

        function applyFocus(targetPerson) {
            activeFocus = targetPerson;

            const btnBoth = container.querySelector('[data-person-toggle="both"]');
            const btnA = container.querySelector('[data-person-toggle="A"]');
            const btnB = container.querySelector('[data-person-toggle="B"]');

            if (btnBoth) btnBoth.className = `hartman-ring-btn ${targetPerson === "both" ? "active-btn-both" : "dimmed-btn"}`;
            if (btnA) btnA.className = `hartman-ring-btn ${targetPerson === "A" ? "active-btn-a" : (targetPerson === "B" ? "dimmed-btn" : "")}`;
            if (btnB) btnB.className = `hartman-ring-btn ${targetPerson === "B" ? "active-btn-b" : (targetPerson === "A" ? "dimmed-btn" : "")}`;

            const slicesA = container.querySelectorAll('.hartman-slice[data-person="A"]');
            const slicesB = container.querySelectorAll('.hartman-slice[data-person="B"]');
            const textsA = container.querySelectorAll('.hartman-slice-text[data-person="A"]');
            const textsB = container.querySelectorAll('.hartman-slice-text[data-person="B"]');
            const rowsA = container.querySelectorAll('.row-person-a');
            const rowsB = container.querySelectorAll('.row-person-b');

            const getFirstName = (fullName, fallback) => {
                if (!fullName) return fallback;
                const parts = fullName.trim().split(/\s+/);
                return parts[0] || fallback;
            };
            const sNameA = getFirstName(nameA, isAr ? "الطرف الأول" : "Person A");
            const sNameB = getFirstName(nameB, isAr ? "الطرف الثاني" : "Person B");

            if (targetPerson === "A") {
                // Focus Person A, Shadow Person B
                slicesA.forEach(el => { el.classList.remove("slice-shadowed"); el.classList.add("slice-focused"); });
                textsA.forEach(el => { el.classList.remove("text-shadowed"); el.classList.add("text-focused"); });
                slicesB.forEach(el => { el.classList.remove("slice-focused"); el.classList.add("slice-shadowed"); });
                textsB.forEach(el => { el.classList.remove("text-focused"); el.classList.add("text-shadowed"); });

                rowsA.forEach(el => { el.classList.remove("row-shadowed"); el.classList.add("row-focused"); });
                rowsB.forEach(el => { el.classList.remove("row-focused"); el.classList.add("row-shadowed"); });

                if (hubEl) {
                    hubEl.innerHTML = `
                        <circle class="hartman-hub-circle" cx="${cx}" cy="${cy}" r="45" fill="var(--bg-secondary)" stroke="${primaryHexA}" stroke-width="2.5" />
                        <text class="notranslate" translate="no" x="${cx}" y="${cy - 10}" text-anchor="middle" fill="${primaryHexA}" font-size="18" font-weight="900">${pctA[primaryColorA]}%</text>
                        <text x="${cx}" y="${cy + 8}" text-anchor="middle" fill="var(--text-primary)" font-size="11.5" font-weight="800">${sNameA}: ${colors[primaryColorA]?.shortLabel}</text>
                        <text x="${cx}" y="${cy + 22}" text-anchor="middle" fill="var(--text-secondary)" font-size="8.5" font-weight="600">${motiveNameA}</text>
                    `;
                }
            } else if (targetPerson === "B") {
                // Focus Person B, Shadow Person A
                slicesB.forEach(el => { el.classList.remove("slice-shadowed"); el.classList.add("slice-focused"); });
                textsB.forEach(el => { el.classList.remove("text-shadowed"); el.classList.add("text-focused"); });
                slicesA.forEach(el => { el.classList.remove("slice-focused"); el.classList.add("slice-shadowed"); });
                textsA.forEach(el => { el.classList.remove("text-focused"); el.classList.add("text-shadowed"); });

                rowsB.forEach(el => { el.classList.remove("row-shadowed"); el.classList.add("row-focused"); });
                rowsA.forEach(el => { el.classList.remove("row-focused"); el.classList.add("row-shadowed"); });

                if (hubEl) {
                    hubEl.innerHTML = `
                        <circle class="hartman-hub-circle" cx="${cx}" cy="${cy}" r="45" fill="var(--bg-secondary)" stroke="${primaryHexB}" stroke-width="2.5" />
                        <text class="notranslate" translate="no" x="${cx}" y="${cy - 10}" text-anchor="middle" fill="${primaryHexB}" font-size="18" font-weight="900">${pctB[primaryColorB]}%</text>
                        <text x="${cx}" y="${cy + 8}" text-anchor="middle" fill="var(--text-primary)" font-size="11.5" font-weight="800">${shortNameB}: ${colors[primaryColorB]?.shortLabel}</text>
                        <text x="${cx}" y="${cy + 22}" text-anchor="middle" fill="var(--text-secondary)" font-size="8.5" font-weight="600">${motiveNameB}</text>
                    `;
                }
            } else {
                // Reset to Both
                slicesA.forEach(el => el.classList.remove("slice-shadowed", "slice-focused"));
                slicesB.forEach(el => el.classList.remove("slice-shadowed", "slice-focused"));
                textsA.forEach(el => el.classList.remove("text-shadowed", "text-focused"));
                textsB.forEach(el => el.classList.remove("text-shadowed", "text-focused"));

                rowsA.forEach(el => el.classList.remove("row-shadowed", "row-focused"));
                rowsB.forEach(el => el.classList.remove("row-shadowed", "row-focused"));

                if (hubEl) {
                    hubEl.innerHTML = `
                        <circle class="hartman-hub-circle" cx="${cx}" cy="${cy}" r="45" fill="var(--bg-secondary)" stroke="var(--border-color)" stroke-width="1.8" />
                        <text id="hartmanHubPersonA" class="notranslate" translate="no" x="${cx}" y="${cy - 10}" text-anchor="middle" fill="${primaryHexA}" font-size="11" font-weight="900">${shortNameA}: ${pctA[primaryColorA]}%</text>
                        <text id="hartmanHubPersonB" class="notranslate" translate="no" x="${cx}" y="${cy + 8}" text-anchor="middle" fill="${primaryHexB}" font-size="11" font-weight="900">${shortNameB}: ${pctB[primaryColorB]}%</text>
                        <text id="hartmanHubSub" x="${cx}" y="${cy + 22}" text-anchor="middle" fill="var(--text-secondary)" font-size="8.5" font-weight="700">${isAr ? "تكامل الطيف" : "Spectrum Synergy"}</text>
                    `;
                }
            }
        }

        // Attach Click Listener to Filter Buttons
        container.querySelectorAll("[data-person-toggle]").forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const target = btn.getAttribute("data-person-toggle");
                if (activeFocus === target && target !== "both") {
                    applyFocus("both");
                } else {
                    applyFocus(target);
                }
            });
        });

        function highlightColor(k, pct, person) {
            if (isSingle) {
                if (hubPercent) {
                    hubPercent.textContent = `${pct || pctA[k]}%`;
                    hubPercent.setAttribute("fill", colors[k].hex);
                }
                if (hubTitle) {
                    hubTitle.textContent = colors[k].shortLabel;
                }
                if (hubSub) {
                    hubSub.textContent = colors[k].motive;
                }
                if (hubRing) {
                    hubRing.setAttribute("stroke", colors[k].hex);
                    hubRing.setAttribute("opacity", "0.9");
                }
            }
            container.querySelectorAll(`.hartman-slice[data-color-key="${k}"]`).forEach(el => el.classList.add("active-slice"));
            container.querySelectorAll(`.hartman-legend-card[data-color-key="${k}"]`).forEach(el => el.classList.add("active-card"));
        }

        function resetHighlight() {
            if (isSingle) {
                if (hubPercent) {
                    hubPercent.textContent = `${pctA[primaryColorA]}%`;
                    hubPercent.setAttribute("fill", primaryHexA);
                }
                if (hubTitle) {
                    hubTitle.textContent = colors[primaryColorA]?.shortLabel || primaryColorA.toUpperCase();
                }
                if (hubSub) {
                    hubSub.textContent = motiveNameA;
                }
                if (hubRing) {
                    hubRing.setAttribute("stroke", primaryHexA);
                    hubRing.setAttribute("opacity", "0.4");
                }
            } else {
                applyFocus(activeFocus);
            }
            container.querySelectorAll(".hartman-slice").forEach(el => el.classList.remove("active-slice"));
            container.querySelectorAll(".hartman-legend-card").forEach(el => el.classList.remove("active-card"));
        }

        container.querySelectorAll("[data-color-key]").forEach(el => {
            const k = el.getAttribute("data-color-key");
            const person = el.getAttribute("data-person") || "A";
            const val = person === "B" && !isSingle ? (pctB[k] || 0) : (pctA[k] || 0);

            el.addEventListener("mouseenter", () => highlightColor(k, val, person));
            el.addEventListener("mouseleave", resetHighlight);

            attachChartTooltip(el, () => ({
                ...CHART_EXPLANATION_DICTIONARY.hartman[k],
                metric_ar: `${isAr ? "النسبة المحسوبة" : "Calculated Share"}: ${val}% ${!isSingle ? `(${person === "A" ? nameA : nameB})` : ''}`,
                metric_en: `Calculated Share: ${val}% ${!isSingle ? `(${person === "A" ? nameA : nameB})` : ''}`
            }));
        });

        if (hubEl) {
            attachChartTooltip(hubEl, () => ({
                ...CHART_EXPLANATION_DICTIONARY.hartman.hub,
                title_ar: `${isAr ? "الدافع المهيمن" : "Primary Motive"}: ${motiveNameA}`,
                title_en: `Primary Motive: ${motiveNameA}`,
                metric_ar: `${isAr ? "الوقود العاطفي" : "Core Fuel"}: ${fuelText}`,
                metric_en: `Core Fuel: ${fuelText}`
            }));
        }
    }

    // 2. DISC Behavioral Rhythm & Tempo (2x2 Matrix)
    function renderDiscQuadrantMap(container, discA, discB, isSingle, nameA, nameB, isAr) {
        if (!container) return;
        container.innerHTML = "";

        const width = 320, height = 320;
        const cx = 160, cy = 160;

        const getCoords = (disc) => {
            if (!disc) return { x: cx, y: cy };
            const b = disc.breakdown || { D: 25, I: 25, S: 25, C: 25 };
            const taskPeople = ((b.I + b.S) - (b.D + b.C)) / 100;
            const fastSteady = ((b.D + b.I) - (b.S + b.C)) / 100;
            const x = cx + taskPeople * 95;
            const y = cy - fastSteady * 95;
            return { x: Math.max(50, Math.min(270, x)), y: Math.max(50, Math.min(270, y)) };
        };

        const ptA = getCoords(discA);
        const ptB = !isSingle ? getCoords(discB) : null;

        let connectingLine = "";
        if (ptB) {
            connectingLine = `<line x1="${ptA.x}" y1="${ptA.y}" x2="${ptB.x}" y2="${ptB.y}" stroke="var(--border-color)" stroke-width="2.5" stroke-dasharray="4 4" />`;
        }

        const labelXA = Math.max(50, Math.min(270, ptA.x));
        const labelXB = ptB ? Math.max(50, Math.min(270, ptB.x)) : 0;

        const svg = `
            <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
                <svg class="interactive-svg" viewBox="0 0 ${width} ${height}" style="width: 100%; max-width: 295px; height: auto; aspect-ratio: 1 / 1; direction: ltr;">
                    <!-- Quadrant backgrounds -->
                    <rect class="chart-node chart-interactive-element" data-disc-quadrant="D" x="35" y="35" width="125" height="125" fill="rgba(239, 68, 68, 0.11)" rx="10" />
                    <rect class="chart-node chart-interactive-element" data-disc-quadrant="I" x="160" y="35" width="125" height="125" fill="rgba(234, 179, 8, 0.11)" rx="10" />
                    <rect class="chart-node chart-interactive-element" data-disc-quadrant="S" x="160" y="160" width="125" height="125" fill="rgba(16, 185, 129, 0.11)" rx="10" />
                    <rect class="chart-node chart-interactive-element" data-disc-quadrant="C" x="35" y="160" width="125" height="125" fill="rgba(59, 130, 246, 0.11)" rx="10" />

                    <!-- Axes -->
                    <line x1="35" y1="${cy}" x2="285" y2="${cy}" stroke="var(--border-color)" stroke-width="1.8" />
                    <line x1="${cx}" y1="35" x2="${cx}" y2="285" stroke="var(--border-color)" stroke-width="1.8" />

                    <!-- Quadrant letters -->
                    <text class="chart-interactive-element" data-disc-quadrant="D" x="55" y="65" fill="#ef4444" font-size="16" font-weight="800" text-anchor="middle">D</text>
                    <text class="chart-interactive-element" data-disc-quadrant="I" x="265" y="65" fill="#eab308" font-size="16" font-weight="800" text-anchor="middle">I</text>
                    <text class="chart-interactive-element" data-disc-quadrant="S" x="265" y="275" fill="#10b981" font-size="16" font-weight="800" text-anchor="middle">S</text>
                    <text class="chart-interactive-element" data-disc-quadrant="C" x="55" y="275" fill="#3b82f6" font-size="16" font-weight="800" text-anchor="middle">C</text>

                    <!-- Axis descriptors -->
                    <text class="chart-interactive-element" data-disc-axis="fast" x="${cx}" y="20" fill="var(--text-secondary)" font-size="9.5" font-weight="700" text-anchor="middle">${isAr ? "سريع / مبادر (Fast-Paced)" : "Fast-Paced & Assertive"}</text>
                    <text class="chart-interactive-element" data-disc-axis="steady" x="${cx}" y="308" fill="var(--text-secondary)" font-size="9.5" font-weight="700" text-anchor="middle">${isAr ? "متأنٍ / رصين (Reflective)" : "Deliberate & Reflective"}</text>
                    <text class="chart-interactive-element" data-disc-axis="task" x="20" y="${cy + 4}" fill="var(--text-secondary)" font-size="9.5" font-weight="700" text-anchor="middle">${isAr ? "المهام" : "Task"}</text>
                    <text class="chart-interactive-element" data-disc-axis="people" x="300" y="${cy + 4}" fill="var(--text-secondary)" font-size="9.5" font-weight="700" text-anchor="middle">${isAr ? "الناس" : "People"}</text>

                    ${connectingLine}

                    <!-- Point A -->
                    <g class="chart-node chart-interactive-element" data-disc-node="A">
                        <circle class="pin-pulse-ring" cx="${ptA.x}" cy="${ptA.y}" fill="none" stroke="#10b981" stroke-width="1.5" />
                        <circle cx="${ptA.x}" cy="${ptA.y}" r="9" fill="#10b981" stroke="#fff" stroke-width="2.5" />
                        <text x="${labelXA}" y="${ptA.y - 13}" text-anchor="middle" fill="#10b981" font-size="11" font-weight="800">${nameA || "A"}</text>
                    </g>

                    ${ptB ? `
                        <g class="chart-node chart-interactive-element" data-disc-node="B">
                            <circle class="pin-pulse-ring" cx="${ptB.x}" cy="${ptB.y}" fill="none" stroke="#f59e0b" stroke-width="1.5" />
                            <circle cx="${ptB.x}" cy="${ptB.y}" r="9" fill="#f59e0b" stroke="#fff" stroke-width="2.5" />
                            <text x="${labelXB}" y="${ptB.y - 13}" text-anchor="middle" fill="#f59e0b" font-size="11" font-weight="800">${nameB || "B"}</text>
                        </g>
                    ` : ''}
                </svg>
                <div style="font-size: 0.88rem; margin-top: 10px; color: var(--text-secondary); text-align: center;">
                    <strong>${nameA}:</strong> ${discA?.type || "D"} (${isAr ? (discA?.pace_ar || "") : (discA?.pace || "")})
                    ${!isSingle ? `<br><strong>${nameB}:</strong> ${discB?.type || "S"} (${isAr ? (discB?.pace_ar || "") : (discB?.pace || "")})` : ''}
                </div>
            </div>
        `;
        container.innerHTML = svg;

        // Attach Tooltips
        container.querySelectorAll("[data-disc-quadrant]").forEach(el => {
            const q = el.getAttribute("data-disc-quadrant");
            const item = CHART_EXPLANATION_DICTIONARY.disc[q];
            if (item) attachChartTooltip(el, () => item);
        });

        const axisMap = {
            fast: CHART_EXPLANATION_DICTIONARY.disc.tempo_fast,
            steady: CHART_EXPLANATION_DICTIONARY.disc.tempo_steady,
            task: CHART_EXPLANATION_DICTIONARY.disc.focus_task,
            people: CHART_EXPLANATION_DICTIONARY.disc.focus_people
        };
        container.querySelectorAll("[data-disc-axis]").forEach(el => {
            const ax = el.getAttribute("data-disc-axis");
            const item = axisMap[ax];
            if (item) attachChartTooltip(el, () => item);
        });

        const nodeA = container.querySelector("[data-disc-node='A']");
        if (nodeA) {
            attachChartTooltip(nodeA, () => ({
                icon: "🟢",
                color: "#10b981",
                title_ar: `${nameA} (${discA?.type || "D"})`,
                title_en: `${nameA} (${discA?.type || "D"})`,
                subtitle_ar: `إيقاع ${isAr ? (discA?.pace_ar || "سريع") : (discA?.pace || "Fast")}`,
                subtitle_en: `${discA?.pace || "Fast"} Pace Behavioral Rhythm`,
                body_ar: `يعكس موقع ${nameA} في مخطط ديسك التوازن الخاص بين سرعة الإنجاز والاهتمام بالعلاقات.`,
                body_en: `Represents ${nameA}'s operational position balancing behavioral pace with interpersonal focus.`,
                metric_ar: `النمط الأساسي: ${discA?.type || "D"}`,
                metric_en: `Primary Style: ${discA?.type || "D"}`
            }));
        }

        const nodeB = container.querySelector("[data-disc-node='B']");
        if (nodeB && discB) {
            attachChartTooltip(nodeB, () => ({
                icon: "🟡",
                color: "#f59e0b",
                title_ar: `${nameB} (${discB?.type || "S"})`,
                title_en: `${nameB} (${discB?.type || "S"})`,
                subtitle_ar: `إيقاع ${isAr ? (discB?.pace_ar || "متأنٍ") : (discB?.pace || "Steady")}`,
                subtitle_en: `${discB?.pace || "Steady"} Pace Behavioral Rhythm`,
                body_ar: `يعكس موقع ${nameB} في مخطط ديسك التوازن الخاص بين سرعة الإنجاز والاهتمام بالعلاقات.`,
                body_en: `Represents ${nameB}'s operational position balancing behavioral pace with interpersonal focus.`,
                metric_ar: `النمط الأساسي: ${discB?.type || "S"}`,
                metric_en: `Primary Style: ${discB?.type || "S"}`
            }));
        }
    }

    // 3. Birkman Tri-Layer Iceberg Cross-Section
    function renderBirkmanIceberg(container, traitsA, traitsB, isSingle, nameA, nameB, isAr) {
        if (!container) return;
        container.innerHTML = "";

        const bA = traitsA.birkman || {};
        const bB = traitsB?.birkman || {};

        const bTrans = {
            assertive: isAr ? "حازم ومباشر" : "Assertive",
            structured: isAr ? "منهجي ومنظم" : "Structured",
            supportive: isAr ? "ودود وداعم" : "Supportive",
            social: isAr ? "اجتماعي وتعبيري" : "Social",
            structure: isAr ? "وضوح واستقرار" : "Structure",
            empathy: isAr ? "تعاطف وتفهم" : "Empathy",
            freedom: isAr ? "مرونة واستقلالية" : "Freedom",
            esteem: isAr ? "تقدير وطمأنة" : "Esteem",
            withdrawing: isAr ? "الانعزال والانسحاب" : "Withdrawing",
            demanding: isAr ? "التشدد والحدة" : "Demanding",
            impatient: isAr ? "نفاد الصبر" : "Impatient",
            defensive: isAr ? "التحسس والدفاعية" : "Defensive"
        };
        const getBirkmanLabel = (val) => {
            if (!val) return "--";
            const k = String(val).toLowerCase();
            return bTrans[k] || val;
        };

        const svg = `
            <div style="width: 100%; max-width: 660px; margin: 0 auto;">
                <svg class="interactive-svg" viewBox="0 0 600 270" style="width: 100%; height: auto; direction: ltr;">
                    <defs>
                        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="#f0f9ff" stop-opacity="0.85"/>
                            <stop offset="100%" stop-color="#e0f2fe" stop-opacity="0.55"/>
                        </linearGradient>
                        <linearGradient id="seaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="#0284c7" stop-opacity="0.3"/>
                            <stop offset="50%" stop-color="#0369a1" stop-opacity="0.65"/>
                            <stop offset="100%" stop-color="#0f172a" stop-opacity="0.95"/>
                        </linearGradient>
                        <linearGradient id="iceTip" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="#ffffff"/>
                            <stop offset="100%" stop-color="#e2e8f0"/>
                        </linearGradient>
                        <linearGradient id="iceDeep" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="#38bdf8"/>
                            <stop offset="60%" stop-color="#0284c7"/>
                            <stop offset="100%" stop-color="#1e3a8a"/>
                        </linearGradient>
                    </defs>

                    <!-- Sky & Sea Backgrounds -->
                    <rect x="0" y="0" width="600" height="75" fill="url(#skyGrad)" rx="10" />
                    <rect x="0" y="75" width="600" height="195" fill="url(#seaGrad)" rx="10" />

                    <!-- Iceberg Tip (Visible) -->
                    <polygon class="chart-node chart-interactive-element" data-iceberg="tip" points="300,16 240,75 360,75" fill="url(#iceTip)" stroke="#cbd5e1" stroke-width="1.8" />

                    <!-- Waterline Wave -->
                    <path d="M0,75 Q75,70 150,75 T300,75 T450,75 T600,75" fill="none" stroke="#38bdf8" stroke-width="3" stroke-dasharray="5 3" />

                    <!-- Iceberg Submerged Base -->
                    <polygon class="chart-node chart-interactive-element" data-iceberg="base" points="240,75 190,160 220,250 380,250 410,160 360,75" fill="url(#iceDeep)" opacity="0.88" stroke="#0ea5e9" stroke-width="1.8" />

                    <!-- Level Labels for Person A (Left side: centered at x=107) -->
                    <g class="chart-node chart-interactive-element" data-birkman-level="usual" data-person="A">
                        <rect x="12" y="18" width="190" height="40" rx="8" fill="rgba(255,255,255,0.95)" stroke="#94a3b8" stroke-width="1.2" />
                        <text x="107" y="34" font-size="10" font-weight="800" text-anchor="middle" fill="#0f172a">${isAr ? "المستوى 1: السلوك الظاهر" : "Level 1: Outward Style"}</text>
                        <text x="107" y="49" font-size="9.5" font-weight="700" text-anchor="middle" fill="#0284c7">${nameA}: ${getBirkmanLabel(bA.usual_style)}</text>
                    </g>

                    <g class="chart-node chart-interactive-element" data-birkman-level="needs" data-person="A">
                        <rect x="12" y="108" width="190" height="40" rx="8" fill="rgba(15,23,42,0.88)" stroke="#38bdf8" stroke-width="1.2" />
                        <text x="107" y="124" font-size="10" font-weight="800" text-anchor="middle" fill="#38bdf8">${isAr ? "المستوى 2: الاحتياج الخفي" : "Level 2: Hidden Needs"}</text>
                        <text x="107" y="139" font-size="9.5" font-weight="700" text-anchor="middle" fill="#e2e8f0">${nameA}: ${getBirkmanLabel(bA.underlying_need)}</text>
                    </g>

                    <g class="chart-node chart-interactive-element" data-birkman-level="stress" data-person="A">
                        <rect x="12" y="198" width="190" height="40" rx="8" fill="rgba(15,23,42,0.95)" stroke="#ef4444" stroke-width="1.2" />
                        <text x="107" y="214" font-size="10" font-weight="800" text-anchor="middle" fill="#ef4444">${isAr ? "المستوى 3: ردة فعل التوتر" : "Level 3: Stress Reaction"}</text>
                        <text x="107" y="229" font-size="9.5" font-weight="700" text-anchor="middle" fill="#fca5a5">${nameA}: ${getBirkmanLabel(bA.stress_trigger)}</text>
                    </g>

                    ${!isSingle ? `
                        <!-- Person B Callouts (Right side: centered at x=493) -->
                        <g class="chart-node chart-interactive-element" data-birkman-level="usual" data-person="B">
                            <rect x="398" y="18" width="190" height="40" rx="8" fill="rgba(255,255,255,0.95)" stroke="#f59e0b" stroke-width="1.2" />
                            <text x="493" y="34" font-size="10" font-weight="800" text-anchor="middle" fill="#b45309">${nameB} (${isAr ? "الظاهر" : "Usual"})</text>
                            <text x="493" y="49" font-size="9.5" font-weight="700" text-anchor="middle" fill="#334155">${getBirkmanLabel(bB.usual_style)}</text>
                        </g>

                        <g class="chart-node chart-interactive-element" data-birkman-level="needs" data-person="B">
                            <rect x="398" y="108" width="190" height="40" rx="8" fill="rgba(15,23,42,0.88)" stroke="#f59e0b" stroke-width="1.2" />
                            <text x="493" y="124" font-size="10" font-weight="800" text-anchor="middle" fill="#f59e0b">${nameB} (${isAr ? "الاحتياج" : "Needs"})</text>
                            <text x="493" y="139" font-size="9.5" font-weight="700" text-anchor="middle" fill="#e2e8f0">${getBirkmanLabel(bB.underlying_need)}</text>
                        </g>

                        <g class="chart-node chart-interactive-element" data-birkman-level="stress" data-person="B">
                            <rect x="398" y="198" width="190" height="40" rx="8" fill="rgba(15,23,42,0.95)" stroke="#ef4444" stroke-width="1.2" />
                            <text x="493" y="214" font-size="10" font-weight="800" text-anchor="middle" fill="#ef4444">${nameB} (${isAr ? "التوتر" : "Stress"})</text>
                            <text x="493" y="229" font-size="9.5" font-weight="700" text-anchor="middle" fill="#fca5a5">${getBirkmanLabel(bB.stress_trigger)}</text>
                        </g>
                    ` : ''}
                </svg>
            </div>
        `;
        container.innerHTML = svg;

        // Attach tooltips
        const tipEl = container.querySelector("[data-iceberg='tip']");
        if (tipEl) attachChartTooltip(tipEl, () => CHART_EXPLANATION_DICTIONARY.birkman.iceberg_tip);

        const baseEl = container.querySelector("[data-iceberg='base']");
        if (baseEl) attachChartTooltip(baseEl, () => CHART_EXPLANATION_DICTIONARY.birkman.iceberg_base);

        container.querySelectorAll("[data-birkman-level]").forEach(el => {
            const lvl = el.getAttribute("data-birkman-level");
            const person = el.getAttribute("data-person");
            const b = person === "A" ? bA : bB;
            const pName = person === "A" ? nameA : nameB;
            const dictItem = CHART_EXPLANATION_DICTIONARY.birkman[lvl];
            if (dictItem) {
                const label = lvl === "usual" ? getBirkmanLabel(b.usual_style) : (lvl === "needs" ? getBirkmanLabel(b.underlying_need) : getBirkmanLabel(b.stress_trigger));
                attachChartTooltip(el, () => ({
                    ...dictItem,
                    metric_ar: `${pName}: ${label}`,
                    metric_en: `${pName}: ${label}`
                }));
            }
        });
    }

    // 4. Attachment Security 2D Coordinate Field (ECR)
    function renderAttachmentCoordinateMap(container, traitsA, traitsB, isSingle, nameA, nameB, isAr) {
        if (!container) return;
        container.innerHTML = "";

        const width = 320, height = 320;
        const cx = 160, cy = 160;

        const getCoords = (traits) => {
            if (!traits) return { x: cx, y: cy, anx: 30, avoid: 30 };
            const ecr = traits.attachment || traits.attachment_ecr || { anxiety_score: 30, avoidance_score: 30 };
            const anx = Math.max(5, Math.min(95, ecr.anxiety_score !== undefined ? ecr.anxiety_score : 30));
            const avoid = Math.max(5, Math.min(95, ecr.avoidance_score !== undefined ? ecr.avoidance_score : 30));
            const x = 45 + (anx / 100) * 230;
            const y = 275 - (avoid / 100) * 230;
            return { x, y, anx, avoid };
        };

        const ptA = getCoords(traitsA);
        const ptB = !isSingle ? getCoords(traitsB) : null;

        const labelXA = Math.max(55, Math.min(265, ptA.x));
        const labelXB = ptB ? Math.max(55, Math.min(265, ptB.x)) : 0;

        const attTrans = {
            secure: isAr ? "الآمن والمتزن" : "Secure",
            anxious: isAr ? "القلق" : "Anxious",
            avoidant: isAr ? "التجنبي" : "Avoidant",
            dismissive: isAr ? "التجنبي" : "Dismissive",
            fearful: isAr ? "المضطرب" : "Fearful"
        };
        const getAttLabel = (style) => {
            if (!style) return "--";
            const k = String(style).toLowerCase();
            return attTrans[k] || style.toUpperCase();
        };

        const svg = `
            <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
                <svg class="interactive-svg" viewBox="0 0 ${width} ${height}" style="width: 100%; max-width: 295px; height: auto; aspect-ratio: 1 / 1; direction: ltr;">
                    <!-- 4 Quadrants -->
                    <rect class="chart-node chart-interactive-element" data-attachment-quadrant="secure" x="35" y="160" width="125" height="125" fill="rgba(16, 185, 129, 0.12)" rx="8" />
                    <rect class="chart-node chart-interactive-element" data-attachment-quadrant="anxious" x="160" y="160" width="125" height="125" fill="rgba(245, 158, 11, 0.12)" rx="8" />
                    <rect class="chart-node chart-interactive-element" data-attachment-quadrant="avoidant" x="35" y="35" width="125" height="125" fill="rgba(59, 130, 246, 0.12)" rx="8" />
                    <rect class="chart-node chart-interactive-element" data-attachment-quadrant="fearful" x="160" y="35" width="125" height="125" fill="rgba(239, 68, 68, 0.12)" rx="8" />

                    <!-- Axes -->
                    <line x1="35" y1="${cy}" x2="285" y2="${cy}" stroke="var(--border-color)" stroke-width="1.8" />
                    <line x1="${cx}" y1="35" x2="${cx}" y2="285" stroke="var(--border-color)" stroke-width="1.8" />

                    <!-- Centered Quadrant Labels -->
                    <text class="chart-interactive-element" data-attachment-quadrant="secure" x="97" y="275" fill="#059669" font-size="11" font-weight="800" text-anchor="middle">${isAr ? "الآمن (Secure)" : "SECURE"}</text>
                    <text class="chart-interactive-element" data-attachment-quadrant="anxious" x="223" y="275" fill="#d97706" font-size="11" font-weight="800" text-anchor="middle">${isAr ? "القلق (Anxious)" : "ANXIOUS"}</text>
                    <text class="chart-interactive-element" data-attachment-quadrant="avoidant" x="97" y="55" fill="#2563eb" font-size="11" font-weight="800" text-anchor="middle">${isAr ? "التجنبي (Dismissive)" : "DISMISSIVE"}</text>
                    <text class="chart-interactive-element" data-attachment-quadrant="fearful" x="223" y="55" fill="#dc2626" font-size="11" font-weight="800" text-anchor="middle">${isAr ? "المضطرب (Fearful)" : "FEARFUL"}</text>

                    <!-- Axis Descriptors -->
                    <text x="${cx}" y="20" fill="var(--text-secondary)" font-size="9.5" font-weight="700" text-anchor="middle">${isAr ? "ارتفاع التجنب (Avoidance)" : "High Avoidance"}</text>
                    <text x="${cx}" y="308" fill="var(--text-secondary)" font-size="9.5" font-weight="700" text-anchor="middle">${isAr ? "انخفاض التجنب (Low Avoidance)" : "Low Avoidance"}</text>

                    <!-- Point A -->
                    <g class="chart-node chart-interactive-element" data-attachment-node="A">
                        <circle class="pin-pulse-ring" cx="${ptA.x}" cy="${ptA.y}" fill="none" stroke="#10b981" stroke-width="1.5" />
                        <circle cx="${ptA.x}" cy="${ptA.y}" r="9" fill="#10b981" stroke="#fff" stroke-width="2.5" />
                        <text x="${labelXA}" y="${ptA.y - 13}" text-anchor="middle" fill="#059669" font-size="11" font-weight="800">${nameA}</text>
                    </g>

                    ${ptB ? `
                        <line x1="${ptA.x}" y1="${ptA.y}" x2="${ptB.x}" y2="${ptB.y}" stroke="var(--border-color)" stroke-width="2" stroke-dasharray="4 4" />
                        <g class="chart-node chart-interactive-element" data-attachment-node="B">
                            <circle class="pin-pulse-ring" cx="${ptB.x}" cy="${ptB.y}" fill="none" stroke="#f59e0b" stroke-width="1.5" />
                            <circle cx="${ptB.x}" cy="${ptB.y}" r="9" fill="#f59e0b" stroke="#fff" stroke-width="2.5" />
                            <text x="${labelXB}" y="${ptB.y - 13}" text-anchor="middle" fill="#d97706" font-size="11" font-weight="800">${nameB}</text>
                        </g>
                    ` : ''}
                </svg>
                <div style="font-size: 0.88rem; margin-top: 10px; color: var(--text-secondary); text-align: center;">
                    ${nameA}: <strong>${getAttLabel(traitsA.attachment?.primary)}</strong>
                    ${!isSingle ? ` | ${nameB}: <strong>${getAttLabel(traitsB.attachment?.primary)}</strong>` : ''}
                </div>
            </div>
        `;
        container.innerHTML = svg;

        // Attach tooltips
        container.querySelectorAll("[data-attachment-quadrant]").forEach(el => {
            const q = el.getAttribute("data-attachment-quadrant");
            const item = CHART_EXPLANATION_DICTIONARY.attachment[q];
            if (item) attachChartTooltip(el, () => item);
        });

        const nodeA = container.querySelector("[data-attachment-node='A']");
        if (nodeA) {
            attachChartTooltip(nodeA, () => ({
                icon: "🟢",
                color: "#10b981",
                title_ar: `${nameA}: ${getAttLabel(traitsA.attachment?.primary)}`,
                title_en: `${nameA}: ${getAttLabel(traitsA.attachment?.primary)}`,
                subtitle_ar: "إحداثيات نمط الارتباط العاطفي",
                subtitle_en: "Attachment Security Coordinates",
                body_ar: `يقع ${nameA} في نطاق (${getAttLabel(traitsA.attachment?.primary)}) بدرجة قلق (${Math.round(ptA.anx)}%) وتجنب (${Math.round(ptA.avoid)}%).`,
                body_en: `${nameA} is situated at ${getAttLabel(traitsA.attachment?.primary)} baseline (Anxiety: ${Math.round(ptA.anx)}%, Avoidance: ${Math.round(ptA.avoid)}%).`,
                metric_ar: `القلق: ${Math.round(ptA.anx)}% • التجنب: ${Math.round(ptA.avoid)}%`,
                metric_en: `Anxiety: ${Math.round(ptA.anx)}% • Avoidance: ${Math.round(ptA.avoid)}%`
            }));
        }

        const nodeB = container.querySelector("[data-attachment-node='B']");
        if (nodeB && traitsB) {
            attachChartTooltip(nodeB, () => ({
                icon: "🟡",
                color: "#f59e0b",
                title_ar: `${nameB}: ${getAttLabel(traitsB.attachment?.primary)}`,
                title_en: `${nameB}: ${getAttLabel(traitsB.attachment?.primary)}`,
                subtitle_ar: "إحداثيات نمط الارتباط العاطفي",
                subtitle_en: "Attachment Security Coordinates",
                body_ar: `يقع ${nameB} في نطاق (${getAttLabel(traitsB.attachment?.primary)}) بدرجة قلق (${Math.round(ptB.anx)}%) وتجنب (${Math.round(ptB.avoid)}%).`,
                body_en: `${nameB} is situated at ${getAttLabel(traitsB.attachment?.primary)} baseline (Anxiety: ${Math.round(ptB.anx)}%, Avoidance: ${Math.round(ptB.avoid)}%).`,
                metric_ar: `القلق: ${Math.round(ptB.anx)}% • التجنب: ${Math.round(ptB.avoid)}%`,
                metric_en: `Anxiety: ${Math.round(ptB.anx)}% • Avoidance: ${Math.round(ptB.avoid)}%`
            }));
        }
    }

    // 5. FIRO-B Interpersonal Exchange (Control & Affection)
    function renderFiroExchange(container, traitsA, traitsB, isSingle, nameA, nameB, isAr) {
        if (!container) return;
        container.innerHTML = "";

        const getFiroScore = (traits, domain, mode) => {
            if (!traits) return 50;
            const firo = traits.firo_b || {};
            if (firo[domain] && typeof firo[domain][mode] === "number") {
                const raw = firo[domain][mode];
                return raw <= 10 ? Math.round((raw / 9) * 100) : Math.min(100, Math.round(raw));
            }
            const flatKey = `${domain}_${mode}`;
            if (typeof firo[flatKey] === "number") {
                const raw = firo[flatKey];
                return raw <= 10 ? Math.round((raw / 9) * 100) : Math.min(100, Math.round(raw));
            }
            return 50;
        };

        const ctrlExpA = getFiroScore(traitsA, "control", "expressed");
        const ctrlWntA = getFiroScore(traitsA, "control", "wanted");
        const affExpA = getFiroScore(traitsA, "affection", "expressed");
        const affWntA = getFiroScore(traitsA, "affection", "wanted");

        const ctrlExpB = getFiroScore(traitsB, "control", "expressed");
        const ctrlWntB = getFiroScore(traitsB, "control", "wanted");
        const affExpB = getFiroScore(traitsB, "affection", "expressed");
        const affWntB = getFiroScore(traitsB, "affection", "wanted");

        const makeBar = (key, label, valA, valB, color) => `
            <div class="chart-node chart-interactive-element" data-firo-row="${key}" style="margin-bottom: 14px; width: 100%; cursor: pointer;">
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700; margin-bottom: 5px;">
                    <span>${label}</span>
                    <span>${nameA}: <strong style="color: ${color};">${valA}%</strong> ${!isSingle ? `| ${nameB}: <strong style="color: #f59e0b;">${valB}%</strong>` : ''}</span>
                </div>
                <div style="width: 100%; height: 12px; background: rgba(148, 163, 184, 0.15); border-radius: 6px; overflow: hidden; display: flex;">
                    <div style="width: ${valA}%; background: ${color}; height: 100%; opacity: 0.95;"></div>
                </div>
                ${!isSingle ? `
                    <div style="width: 100%; height: 8px; background: rgba(148, 163, 184, 0.1); border-radius: 4px; overflow: hidden; margin-top: 4px;">
                        <div style="width: ${valB}%; background: #f59e0b; height: 100%;"></div>
                    </div>
                ` : ''}
            </div>
        `;

        const wrapper = document.createElement("div");
        wrapper.style.cssText = "width: 100%; max-width: 380px; text-align: left;";
        if (isAr) wrapper.style.textAlign = "right";

        wrapper.innerHTML = `
            <div style="font-size: 0.88rem; font-weight: 700; color: var(--accent-color); margin-bottom: 14px; text-align: center;">
                ${isAr ? "موازين المبادرة والاحتياج في العلاقة" : "Expressed Initiation vs. Wanted Reciprocity"}
            </div>
            ${makeBar("ctrl_exp", isAr ? "القيادة واتخاذ القرار (Control Expressed)" : "Decision Leadership (Control)", ctrlExpA, ctrlExpB, "#3b82f6")}
            ${makeBar("ctrl_wnt", isAr ? "الحاجة لتوجيه الشريك (Control Wanted)" : "Receptivity to Guidance (Wanted)", ctrlWntA, ctrlWntB, "#8b5cf6")}
            ${makeBar("aff_exp", isAr ? "المبادرة العاطفية والتعبير (Affection Expressed)" : "Affection Expression", affExpA, affExpB, "#ec4899")}
            ${makeBar("aff_wnt", isAr ? "الاحتياج للتعبير العاطفي (Affection Wanted)" : "Affection Craved", affWntA, affWntB, "#10b981")}
        `;
        container.appendChild(wrapper);

        // Attach tooltips
        const scores = { ctrl_exp: [ctrlExpA, ctrlExpB], ctrl_wnt: [ctrlWntA, ctrlWntB], aff_exp: [affExpA, affExpB], aff_wnt: [affWntA, affWntB] };
        wrapper.querySelectorAll("[data-firo-row]").forEach(el => {
            const rowKey = el.getAttribute("data-firo-row");
            const item = CHART_EXPLANATION_DICTIONARY.firo[rowKey];
            if (item) {
                const [vA, vB] = scores[rowKey];
                attachChartTooltip(el, () => ({
                    ...item,
                    metric_ar: isSingle ? `${nameA}: ${vA}%` : `${nameA}: ${vA}% • ${nameB}: ${vB}%`,
                    metric_en: isSingle ? `${nameA}: ${vA}%` : `${nameA}: ${vA}% • ${nameB}: ${vB}%`
                }));
            }
        });
    }

    // 6. Gottman Emotional Safety & Four Horsemen Risk Gauge
    function renderGottmanSafetyGauge(container, traitsA, traitsB, isSingle, nameA, nameB, isAr) {
        if (!container) return;
        container.innerHTML = "";

        const gA = traitsA.gottman_safety || { emotional_safety_index: 85, four_horsemen_risk: { criticism: 10, defensiveness: 15, stonewalling: 10, contempt: 5 } };
        const gB = traitsB?.gottman_safety || { emotional_safety_index: 80, four_horsemen_risk: { criticism: 15, defensiveness: 20, stonewalling: 15, contempt: 5 } };

        const safetyScore = isSingle ? gA.emotional_safety_index : Math.round((gA.emotional_safety_index + gB.emotional_safety_index) / 2);
        const risks = gA.four_horsemen_risk || {};

        const makeRiskRow = (key, label, val, max = 100) => {
            const color = val > 40 ? "#ef4444" : (val > 25 ? "#f59e0b" : "#10b981");
            return `
                <div class="chart-node chart-interactive-element" data-gottman-risk="${key}" style="margin-bottom: 8px; cursor: pointer;">
                    <div style="display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 600; margin-bottom: 3px;">
                        <span>${label}</span>
                        <span style="color: ${color}; font-weight: 700;">${val}%</span>
                    </div>
                    <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.08); border-radius: 4px; overflow: hidden;">
                        <div style="width: ${val}%; background: ${color}; height: 100%;"></div>
                    </div>
                </div>
            `;
        };

        const wrapper = document.createElement("div");
        wrapper.style.cssText = "width: 100%; max-width: 380px; text-align: center;";
        wrapper.innerHTML = `
            <div class="chart-node chart-interactive-element" data-gottman="safety" style="display: inline-block; position: relative; margin-bottom: 14px; cursor: pointer;">
                <svg viewBox="0 0 140 140" style="width: 140px; height: 140px;">
                    <circle cx="70" cy="70" r="56" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="11" />
                    <circle cx="70" cy="70" r="56" fill="none" stroke="${safetyScore > 75 ? "#10b981" : "#f59e0b"}" stroke-width="11"
                        stroke-dasharray="${(safetyScore / 100) * 351.86} 351.86" stroke-dashoffset="0" transform="rotate(-90 70 70)" />
                    <text x="70" y="77" font-size="24" font-weight="800" text-anchor="middle" fill="var(--text-primary)">${safetyScore}%</text>
                </svg>
                <div style="font-size: 0.88rem; font-weight: 700; color: var(--text-secondary); margin-top: 4px;">
                    ${isAr ? "مؤشر الأمان العاطفي" : "Emotional Safety Index"}
                </div>
            </div>
            <div style="text-align: start; margin-top: 10px;">
                <div style="font-size: 0.84rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 8px; text-align: center;">
                    ${isAr ? "رادار فرسان الهلاك الأربعة في العلاقة" : "Four Horsemen Risk Monitors"}
                </div>
                ${makeRiskRow("criticism", isAr ? "النقد واللوم الشخصي" : "Criticism Tendency", risks.criticism || 15)}
                ${makeRiskRow("defensiveness", isAr ? "الدفاعية والتبرير المفرط" : "Defensiveness", risks.defensiveness || 20)}
                ${makeRiskRow("stonewalling", isAr ? "الانعزال وبناء الجدار الصامت" : "Stonewalling", risks.stonewalling || 15)}
                ${makeRiskRow("contempt", isAr ? "الازدراء والتقليل من المشاعر" : "Contempt (Toxic)", risks.contempt || 5)}
            </div>
        `;
        container.appendChild(wrapper);

        // Attach tooltips
        const safetyCircle = wrapper.querySelector("[data-gottman='safety']");
        if (safetyCircle) {
            attachChartTooltip(safetyCircle, () => ({
                ...CHART_EXPLANATION_DICTIONARY.gottman.safety_gauge,
                metric_ar: `${isAr ? "المؤشر العام" : "Safety Index"}: ${safetyScore}%`,
                metric_en: `Safety Index: ${safetyScore}%`
            }));
        }

        wrapper.querySelectorAll("[data-gottman-risk]").forEach(el => {
            const riskKey = el.getAttribute("data-gottman-risk");
            const val = risks[riskKey] || 10;
            const dictItem = CHART_EXPLANATION_DICTIONARY.gottman[riskKey];
            if (dictItem) {
                attachChartTooltip(el, () => ({
                    ...dictItem,
                    metric_ar: `${isAr ? "مستوى الخطر" : "Risk Level"}: ${val}%`,
                    metric_en: `Risk Level: ${val}%`
                }));
            }
        });
    }

    // 7. Interactive Dyadic Conflict Loop Flowchart
    function renderDyadicConflictLoop(container, report, profileA, profileB, isAr) {
        if (!container) return;
        container.innerHTML = "";

        if (!profileB) {
            container.innerHTML = `<p style="font-size: 0.88rem; color: var(--text-secondary);">${isAr ? "متاح في تقارير المقارنة الزوجية الثنائية." : "Active in dyadic 2-profile comparison mode."}</p>`;
            return;
        }

        const traitsA = profileA.calculated_personality;
        const traitsB = profileB.calculated_personality;
        const nameA = (isAr && profileA.owner_name_ar) ? profileA.owner_name_ar : profileA.owner_name;
        const nameB = (isAr && profileB.owner_name_ar) ? profileB.owner_name_ar : profileB.owner_name;
        const rawNeedB = (traitsB.birkman?.underlying_need || "empathy").toLowerCase();
        const bNeedText = isAr ? (BIRKMAN_NEED_MAP[rawNeedB]?.ar || rawNeedB) : (traitsB.birkman?.underlying_need || "freedom and empathy");

        const rawStressB = (traitsB.birkman?.stress_trigger || "withdrawing").toLowerCase();
        const bStressText = isAr ? (BIRKMAN_STRESS_MAP[rawStressB]?.ar || rawStressB) : (traitsB.birkman?.stress_trigger || "withdrawal / quiet defiance");

        const loopSteps = [
            {
                type: "trigger",
                title: isAr ? "1. شرارة الخلاف: التباين في أسلوب الحوار" : "1. The Spark: Pace & Delivery Discrepancy",
                desc: isAr 
                    ? `عندما يبادر ${nameA} بأسلوب مباشر أو نبرة سريعة في لحظة انشغال أو إرهاق.`
                    : `When ${nameA} uses a direct, urgent tone while discussing plans or concerns.`
            },
            {
                type: "need",
                title: isAr ? "2. جرس الإنذار الخفي: جرح الاحتياج" : "2. The Unspoken Alarm: Threatened Need",
                desc: isAr
                    ? `يشعر ${nameB} بأن احتياجه لـ (${bNeedText}) مهدد، مما يولد توتراً داخلياً صامتاً.`
                    : `${nameB}'s underlying need for (${bNeedText}) feels cornered or invalidated.`
            },
            {
                type: "reaction",
                title: isAr ? "3. ردة الفعل الدفاعية: التراجع أو الاحتداد" : "3. The Defensive Reflex",
                desc: isAr
                    ? `يفعل ${nameB} نمط التوتر (${bStressText})، مما يربك الطرف الآخر.`
                    : `${nameB} activates the stress derailer (${bStressText}).`
            },
            {
                type: "reaction",
                title: isAr ? "4. دورة التصعيد التفاعلي" : "4. The Escalation Loop",
                desc: isAr
                    ? `يشعر ${nameA} بعدم الاستجابة، فيرفع وتيرة الحزم، مما يعزز انغلاق الطرف الثاني.`
                    : `${nameA} perceives the silence as disinterest and pushes harder, deepening the withdrawal.`
            },
            {
                type: "breaker",
                title: isAr ? "5. قاطع الدائرة وقاعدة التهدئة الفورية" : "5. The Circuit Breaker & Antidote",
                desc: isAr
                    ? `التوقف فوراً لمدة 20 دقيقة مع التأكيد بالقول: "أنا أحترمك وأحبك، لنأخذ استراحة ونكمل بهدوء".`
                    : `Execute the 20-minute de-escalation timeout with emotional reassurance: "I value us; let's pause and resume calmly."`
            }
        ];

        const loopWrapper = document.createElement("div");
        loopWrapper.className = "conflict-loop-flow";

        loopSteps.forEach((step, idx) => {
            const card = document.createElement("div");
            card.className = `conflict-step-card ${step.type} chart-node chart-interactive-element`;
            card.setAttribute("data-loop-step", step.type);
            card.style.cursor = "pointer";
            card.innerHTML = `
                <div class="conflict-step-num">${idx + 1}</div>
                <div class="conflict-step-body">
                    <div class="conflict-step-title">${step.title}</div>
                    <div class="conflict-step-desc">${step.desc}</div>
                </div>
            `;
            loopWrapper.appendChild(card);

            attachChartTooltip(card, () => ({
                icon: step.type === "trigger" ? "⚡" : (step.type === "need" ? "🛡️" : (step.type === "breaker" ? "🛑" : "⚠️")),
                color: step.type === "breaker" ? "#10b981" : (step.type === "trigger" ? "#f59e0b" : "#ef4444"),
                title_ar: step.title,
                title_en: step.title,
                subtitle_ar: isAr ? "تحليل سلوكي لدورة النزاع" : "Conflict Cycle Behavioral Dynamics",
                subtitle_en: "Conflict Cycle Behavioral Dynamics",
                body_ar: step.desc,
                body_en: step.desc
            }));

            if (idx < loopSteps.length - 1) {
                const connector = document.createElement("div");
                connector.className = "conflict-step-connector";
                connector.innerHTML = "↓";
                loopWrapper.appendChild(connector);
            }
        });

        container.appendChild(loopWrapper);
    }

    // 8. Consciousness & Vibrational Guidance Spectrum (Hawkins & Hicks)
    function renderConsciousnessSpectrum(container, traitsA, traitsB, isSingle, nameA, nameB, isAr) {
        if (!container) return;
        container.innerHTML = "";

        const cA = traitsA?.consciousness || {
            hawkins: { score: 360, level: "Acceptance (350)", level_ar: "القبول (350)", is_above_200: true, domain: "Power", domain_ar: "القوة الروحية البنّاءة (Power)" },
            hicks: { level: 4, state: "Positive Expectation", state_ar: "التوقع الإيجابي", tier: "High Alignment", tier_ar: "محاذاة عليا" },
            stress_floor: { loc: 250 },
            pivot_agility: { score: 85, rating_en: "Rapid & Resilient", rating_ar: "سريع ومرن" }
        };
        const cB = traitsB?.consciousness || (isSingle ? null : {
            hawkins: { score: 310, level: "Willingness (310)", level_ar: "الاستعداد (310)", is_above_200: true, domain: "Power", domain_ar: "القوة الروحية البنّاءة (Power)" },
            hicks: { level: 5, state: "Optimism", state_ar: "التفاؤل", tier: "Constructive Harmony", tier_ar: "تناغم بنّاء" },
            stress_floor: { loc: 200 },
            pivot_agility: { score: 80, rating_en: "Rapid & Resilient", rating_ar: "سريع ومرن" }
        });

        const locA = cA.hawkins.score;
        const locB = cB ? cB.hawkins.score : locA;
        const hicksA = cA.hicks.level;
        const hicksB = cB ? cB.hicks.level : hicksA;

        const getLocPct = (score) => Math.max(4, Math.min(96, Math.round(((score - 20) / 580) * 100)));
        const pctA = getLocPct(locA);
        const pctB = cB ? getLocPct(locB) : 0;

        const getHicksPct = (lvl) => Math.max(4, Math.min(96, Math.round(100 - ((lvl - 1) / 21) * 92)));
        const hicksPctA = getHicksPct(hicksA);
        const hicksPctB = cB ? getHicksPct(hicksB) : 0;

        const wrapper = document.createElement("div");
        wrapper.className = "consciousness-spectrum-wrapper";
        wrapper.style.cssText = "width: 100%; max-width: 650px; margin: 0 auto; padding: 12px 0;";

        const titleHawkins = isAr ? "1. سلم مستويات الوعي (خريطة د. ديفيد هوكينز للوعي الإنساني)" : "1. Map of Consciousness Spectrum (Dr. David R. Hawkins)";
        const titleHicks = isAr ? "2. السلم التوجيهي للمشاعر (مقياس إبراهام هيكس للإرشاد المشاعري)" : "2. Emotional Guidance Scale (Abraham Hicks)";
        const thresholdLabel = isAr ? "عتبة الشجاعة (200) • الفاصل بين القوة الروحية والقسر" : "200 Courage Threshold • Force vs. Power";

        wrapper.innerHTML = `
            <!-- HAWKINS SCALE -->
            <div style="margin-bottom: 24px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span class="chart-node chart-interactive-element" data-spectrum="hawkins" style="font-weight: 700; font-size: 0.88rem; cursor: pointer;">${titleHawkins}</span>
                    <span class="translate-active-badge notranslate" translate="no" style="font-size: 0.72rem;">20 — 600+</span>
                </div>
                
                <!-- Calibrated Spectrum Track -->
                <div class="chart-node chart-interactive-element" data-spectrum="hawkins" style="position: relative; height: 26px; border-radius: 13px; background: linear-gradient(to right, #64748b 0%, #ef4444 20%, #f97316 32%, #22c55e 40%, #06b6d4 65%, #a855f7 90%, #eab308 100%); box-shadow: inset 0 2px 4px rgba(0,0,0,0.15); cursor: pointer;">
                    <!-- 200 Courage Marker -->
                    <div class="chart-node chart-interactive-element" data-spectrum="courage200" style="position: absolute; left: ${getLocPct(200)}%; top: -6px; bottom: -6px; width: 3px; background: #ffffff; box-shadow: 0 0 6px rgba(0,0,0,0.5); z-index: 5; cursor: pointer;">
                        <span style="position: absolute; top: -18px; left: 50%; transform: translateX(-50%); font-size: 0.65rem; font-weight: 800; background: var(--bg-secondary); padding: 1px 4px; border-radius: 4px; border: 1px solid var(--border-color); white-space: nowrap;">200</span>
                    </div>

                    <!-- Marker A -->
                    <div class="chart-node chart-interactive-element" data-hawkins-node="A" style="position: absolute; left: ${pctA}%; top: 50%; transform: translate(-50%, -50%); width: 24px; height: 24px; border-radius: 50%; background: #10b981; border: 3px solid #ffffff; box-shadow: 0 0 8px rgba(16,185,129,0.7); z-index: 10; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.65rem; font-weight: 800; cursor: pointer;" title="${nameA}: ${locA}">A</div>

                    <!-- Marker B (if comparison) -->
                    ${!isSingle && cB ? `
                        <div class="chart-node chart-interactive-element" data-hawkins-node="B" style="position: absolute; left: ${pctB}%; top: 50%; transform: translate(-50%, -50%); width: 24px; height: 24px; border-radius: 50%; background: #f59e0b; border: 3px solid #ffffff; box-shadow: 0 0 8px rgba(245,158,11,0.7); z-index: 11; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.65rem; font-weight: 800; cursor: pointer;" title="${nameB}: ${locB}">B</div>
                    ` : ''}
                </div>

                <!-- Labels below Hawkins Track -->
                <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: var(--text-secondary); margin-top: 6px;">
                    <span>${isAr ? "الخوف والذنب (<100)" : "Force: Fear / Guilt (<100)"}</span>
                    <span class="chart-node chart-interactive-element" data-spectrum="courage200" style="font-weight: 700; color: var(--accent-color); cursor: pointer;">${thresholdLabel}</span>
                    <span>${isAr ? "المحبة والسلام (500+)" : "Power: Love / Peace (500+)"}</span>
                </div>

                <!-- Hawkins Numerical Badges -->
                <div style="display: flex; gap: 12px; margin-top: 10px; font-size: 0.82rem; flex-wrap: wrap;">
                    <div class="chart-node chart-interactive-element" data-hawkins-node="A" style="background: rgba(16,185,129,0.1); border: 1px solid #10b981; border-radius: 8px; padding: 4px 10px; cursor: pointer;">
                        <strong>${nameA}</strong>: ${locA} • ${isAr ? cA.hawkins.level_ar : cA.hawkins.level} (${isAr ? cA.hawkins.domain_ar : cA.hawkins.domain})
                    </div>
                    ${!isSingle && cB ? `
                        <div class="chart-node chart-interactive-element" data-hawkins-node="B" style="background: rgba(245,158,11,0.1); border: 1px solid #f59e0b; border-radius: 8px; padding: 4px 10px; cursor: pointer;">
                            <strong>${nameB}</strong>: ${locB} • ${isAr ? cB.hawkins.level_ar : cB.hawkins.level} (${isAr ? cB.hawkins.domain_ar : cB.hawkins.domain})
                        </div>
                    ` : ''}
                </div>
            </div>

            <!-- HICKS EMOTIONAL GUIDANCE SCALE -->
            <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--border-color);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span class="chart-node chart-interactive-element" data-spectrum="hicks" style="font-weight: 700; font-size: 0.88rem; cursor: pointer;">${titleHicks}</span>
                    <span class="translate-active-badge notranslate" translate="no" style="font-size: 0.72rem;">${isAr ? "١ (البهجة والامتنان) — ٢٢ (الخوف واليأس)" : "1 (Joy) — 22 (Fear)"}</span>
                </div>

                <!-- Hicks Vibrational Gradient Track -->
                <div class="chart-node chart-interactive-element" data-spectrum="hicks" style="position: relative; height: 18px; border-radius: 9px; background: linear-gradient(to right, #475569 0%, #dc2626 25%, #d97706 45%, #65a30d 70%, #10b981 85%, #f59e0b 100%); box-shadow: inset 0 2px 4px rgba(0,0,0,0.15); cursor: pointer;">
                    <!-- Marker A -->
                    <div class="chart-node chart-interactive-element" data-hicks-node="A" style="position: absolute; left: ${hicksPctA}%; top: 50%; transform: translate(-50%, -50%); width: 20px; height: 20px; border-radius: 50%; background: #10b981; border: 2px solid #ffffff; box-shadow: 0 0 6px rgba(16,185,129,0.7); z-index: 10; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.6rem; font-weight: 800; cursor: pointer;">A</div>

                    <!-- Marker B (if comparison) -->
                    ${!isSingle && cB ? `
                        <div class="chart-node chart-interactive-element" data-hicks-node="B" style="position: absolute; left: ${hicksPctB}%; top: 50%; transform: translate(-50%, -50%); width: 20px; height: 20px; border-radius: 50%; background: #f59e0b; border: 2px solid #ffffff; box-shadow: 0 0 6px rgba(245,158,11,0.7); z-index: 11; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.6rem; font-weight: 800; cursor: pointer;">B</div>
                    ` : ''}
                </div>

                <!-- Labels below Hicks Track -->
                <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: var(--text-secondary); margin-top: 5px;">
                    <span>${isAr ? "مقاومة حادة / عجز (15-22)" : "Heavy Resistance (15-22)"}</span>
                    <span>${isAr ? "احتكاك / تردد (8-14)" : "Friction / Doubt (8-14)"}</span>
                    <span>${isAr ? "تناغم وتدفق عالي (1-7)" : "High Alignment / Joy (1-7)"}</span>
                </div>

                <!-- Hicks Detail Badges -->
                <div style="display: flex; gap: 12px; margin-top: 10px; font-size: 0.82rem; flex-wrap: wrap;">
                    <div class="chart-node chart-interactive-element" data-hicks-node="A" style="background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 8px; padding: 4px 10px; cursor: pointer;">
                        <strong>${nameA}</strong>: ${isAr ? cA.hicks.state_ar : cA.hicks.state} (${isAr ? `المستوى ${hicksA}` : `Lv ${hicksA}`}) • ${isAr ? cA.pivot_agility.rating_ar : cA.pivot_agility.rating_en}
                    </div>
                    ${!isSingle && cB ? `
                        <div class="chart-node chart-interactive-element" data-hicks-node="B" style="background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 8px; padding: 4px 10px; cursor: pointer;">
                            <strong>${nameB}</strong>: ${isAr ? cB.hicks.state_ar : cB.hicks.state} (${isAr ? `المستوى ${hicksB}` : `Lv ${hicksB}`}) • ${isAr ? cB.pivot_agility.rating_ar : cB.pivot_agility.rating_en}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;

        container.appendChild(wrapper);

        // Attach tooltips
        const hawkinsTrack = wrapper.querySelector("[data-spectrum='hawkins']");
        if (hawkinsTrack) attachChartTooltip(hawkinsTrack, () => CHART_EXPLANATION_DICTIONARY.consciousness.hawkins_track);

        const courage200 = wrapper.querySelector("[data-spectrum='courage200']");
        if (courage200) attachChartTooltip(courage200, () => CHART_EXPLANATION_DICTIONARY.consciousness.hawkins_200);

        const hicksTrack = wrapper.querySelector("[data-spectrum='hicks']");
        if (hicksTrack) attachChartTooltip(hicksTrack, () => CHART_EXPLANATION_DICTIONARY.consciousness.hicks_track);

        const nodeHawkinsA = wrapper.querySelectorAll("[data-hawkins-node='A']");
        nodeHawkinsA.forEach(el => {
            attachChartTooltip(el, () => ({
                icon: "🟢",
                color: "#10b981",
                title_ar: `${nameA}: مستوى هوكينز (${locA})`,
                title_en: `${nameA}: Hawkins LoC (${locA})`,
                subtitle_ar: `${isAr ? cA.hawkins.level_ar : cA.hawkins.level} • ${isAr ? cA.hawkins.domain_ar : cA.hawkins.domain}`,
                subtitle_en: `${cA.hawkins.level} • ${cA.hawkins.domain}`,
                body_ar: `يعكس خط الأساس الواعي لـ ${nameA} العمل في نطاق (${isAr ? cA.hawkins.domain_ar : cA.hawkins.domain}) مع استقرار عاطفي وقدرة على احتواء المشاعر.`,
                body_en: `Reflects ${nameA}'s operational baseline operating in the ${cA.hawkins.domain} realm with emotional grounding.`,
                metric_ar: `درجة الوعي: ${locA}`,
                metric_en: `Consciousness Score: ${locA}`
            }));
        });

        const nodeHawkinsB = wrapper.querySelectorAll("[data-hawkins-node='B']");
        nodeHawkinsB.forEach(el => {
            attachChartTooltip(el, () => ({
                icon: "🟡",
                color: "#f59e0b",
                title_ar: `${nameB}: مستوى هوكينز (${locB})`,
                title_en: `${nameB}: Hawkins LoC (${locB})`,
                subtitle_ar: `${isAr ? cB.hawkins.level_ar : cB.hawkins.level} • ${isAr ? cB.hawkins.domain_ar : cB.hawkins.domain}`,
                subtitle_en: `${cB.hawkins.level} • ${cB.hawkins.domain}`,
                body_ar: `يعكس خط الأساس الواعي لـ ${nameB} العمل في نطاق (${isAr ? cB.hawkins.domain_ar : cB.hawkins.domain}) مع استقرار عاطفي وقدرة على احتواء المشاعر.`,
                body_en: `Reflects ${nameB}'s operational baseline operating in the ${cB.hawkins.domain} realm with emotional grounding.`,
                metric_ar: `درجة الوعي: ${locB}`,
                metric_en: `Consciousness Score: ${locB}`
            }));
        });

        const nodeHicksA = wrapper.querySelectorAll("[data-hicks-node='A']");
        nodeHicksA.forEach(el => {
            attachChartTooltip(el, () => ({
                icon: "🟢",
                color: "#10b981",
                title_ar: `${nameA}: سلم هيكس للمشاعر (${isAr ? `المستوى ${hicksA}` : `Lv ${hicksA}`})`,
                title_en: `${nameA}: Hicks Emotional Scale (Lv ${hicksA})`,
                subtitle_ar: `${isAr ? cA.hicks.state_ar : cA.hicks.state} • ${isAr ? cA.hicks.tier_ar : cA.hicks.tier}`,
                subtitle_en: `${cA.hicks.state} • ${cA.hicks.tier}`,
                body_ar: `الحالة المشاعرية الغالبة لـ ${nameA} تتسم بـ (${isAr ? cA.hicks.state_ar : cA.hicks.state}) مع مرونة ارتداد (${isAr ? cA.pivot_agility.rating_ar : cA.pivot_agility.rating_en}).`,
                body_en: `${nameA}'s habitual emotional set-point centers around ${cA.hicks.state} with resilient agility.`,
                metric_ar: `المستوى: ${hicksA} / 22`,
                metric_en: `Level: ${hicksA} / 22`
            }));
        });

        const nodeHicksB = wrapper.querySelectorAll("[data-hicks-node='B']");
        nodeHicksB.forEach(el => {
            attachChartTooltip(el, () => ({
                icon: "🟡",
                color: "#f59e0b",
                title_ar: `${nameB}: سلم هيكس للمشاعر (${isAr ? `المستوى ${hicksA}` : `Lv ${hicksB}`})`,
                title_en: `${nameB}: Hicks Emotional Scale (Lv ${hicksB})`,
                subtitle_ar: `${isAr ? cB.hicks.state_ar : cB.hicks.state} • ${isAr ? cB.hicks.tier_ar : cB.hicks.tier}`,
                subtitle_en: `${cB.hicks.state} • ${cB.hicks.tier}`,
                body_ar: `الحالة المشاعرية الغالبة لـ ${nameB} تتسم بـ (${isAr ? cB.hicks.state_ar : cB.hicks.state}) مع مرونة ارتداد (${isAr ? cB.pivot_agility.rating_ar : cB.pivot_agility.rating_en}).`,
                body_en: `${nameB}'s habitual emotional set-point centers around ${cB.hicks.state} with resilient agility.`,
                metric_ar: `المستوى: ${hicksB} / 22`,
                metric_en: `Level: ${hicksB} / 22`
            }));
        });
    }

    // --- 10. MULTI-VARIABLE RADAR CHART (CHART.JS & RESPONSIVE SVG) ---
    function renderRadarChart(categoryScores) {
        if (!dom.radarChartContainer) return;
        dom.radarChartContainer.innerHTML = "";
        const isAr = state.localization.currentLang === "ar";
        const isDark = state.themeManager.isDark();
        const categories = Object.keys(categoryScores);
        const labels = categories.map(cat => isAr ? (RADAR_CATEGORY_TRANSLATIONS[cat] || cat) : cat);
        const dataValues = categories.map(cat => categoryScores[cat] || 70);

        if (window.Chart) {
            if (state.radarChartInstance) {
                try {
                    state.radarChartInstance.destroy();
                } catch (e) {}
                state.radarChartInstance = null;
            }

            const canvas = document.createElement("canvas");
            canvas.id = "radarChartCanvas";
            canvas.style.width = "100%";
            canvas.style.maxWidth = "460px";
            canvas.style.maxHeight = "460px";
            canvas.style.margin = "0 auto";
            dom.radarChartContainer.appendChild(canvas);

            const textColor = isDark ? "#f5f5f7" : "#1d1d1f";
            const gridColor = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)";
            const pointLabelColor = isDark ? "#a1a1a6" : "#424245";

            state.radarChartInstance = new window.Chart(canvas, {
                type: "radar",
                data: {
                    labels: labels,
                    datasets: [{
                        label: isAr ? "مؤشر التوافق" : "Compatibility Index",
                        data: dataValues,
                        fill: true,
                        backgroundColor: isDark ? "rgba(41, 151, 255, 0.25)" : "rgba(0, 113, 227, 0.2)",
                        borderColor: isDark ? "#2997ff" : "#0071e3",
                        borderWidth: 2.5,
                        pointBackgroundColor: isDark ? "#2997ff" : "#0071e3",
                        pointBorderColor: "#ffffff",
                        pointBorderWidth: 1.5,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    aspectRatio: 1,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: isDark ? "rgba(30, 30, 32, 0.95)" : "rgba(15, 23, 42, 0.92)",
                            titleFont: { size: 12, weight: "bold", family: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" },
                            bodyFont: { size: 12, family: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" },
                            padding: 10,
                            cornerRadius: 8,
                            callbacks: {
                                label: function(context) {
                                    return ` ${context.dataset.label}: ${context.raw}%`;
                                }
                            }
                        }
                    },
                    scales: {
                        r: {
                            min: 0,
                            max: 100,
                            ticks: {
                                stepSize: 25,
                                color: isDark ? "#86868b" : "#a1a1a6",
                                backdropColor: "transparent",
                                font: { size: 10, weight: "600" }
                            },
                            grid: {
                                color: gridColor,
                                circular: false
                            },
                            angleLines: {
                                color: gridColor
                            },
                            pointLabels: {
                                color: pointLabelColor,
                                font: {
                                    size: 11,
                                    weight: "bold",
                                    family: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
                                },
                                padding: 8
                            }
                        }
                    }
                }
            });
            return;
        }

        // High-definition responsive SVG fallback if Chart.js is unavailable
        renderSVGRadarChart(categoryScores);
    }

    function renderSVGRadarChart(categoryScores) {
        dom.radarChartContainer.innerHTML = "";
        const isAr = state.localization.currentLang === "ar";

        const width = 460;
        const height = 460;
        const center = 230;
        const maxRadius = 155;

        const categories = Object.keys(categoryScores);
        const numAxes = categories.length;

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
        svg.style.maxWidth = "460px";

        const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        defs.innerHTML = `
            <linearGradient id="radarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="var(--accent-color)" stop-opacity="0.45"/>
                <stop offset="100%" stop-color="var(--accent-hover)" stop-opacity="0.15"/>
            </linearGradient>
        `;
        svg.appendChild(defs);

        const gridLevels = [0.25, 0.5, 0.75, 1.0];
        gridLevels.forEach(lvl => {
            const points = [];
            for (let i = 0; i < numAxes; i++) {
                const angle = (i * 2 * Math.PI) / numAxes - Math.PI / 2;
                const r = maxRadius * lvl;
                const x = center + r * Math.cos(angle);
                const y = center + r * Math.sin(angle);
                points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
            }
            const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            polygon.setAttribute("points", points.join(" "));
            polygon.setAttribute("class", "radar-grid");
            polygon.setAttribute("fill", "none");
            polygon.setAttribute("stroke", "var(--border-color)");
            polygon.setAttribute("stroke-width", lvl === 1.0 ? "1.8" : "1");
            polygon.setAttribute("stroke-dasharray", lvl < 1.0 ? "2 3" : "none");
            svg.appendChild(polygon);
        });

        const dataPoints = [];
        categories.forEach((cat, idx) => {
            const angle = (idx * 2 * Math.PI) / numAxes - Math.PI / 2;
            const axX = center + maxRadius * Math.cos(angle);
            const axY = center + maxRadius * Math.sin(angle);
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", center);
            line.setAttribute("y1", center);
            line.setAttribute("x2", axX.toFixed(1));
            line.setAttribute("y2", axY.toFixed(1));
            line.setAttribute("class", "radar-axis");
            line.setAttribute("stroke", "var(--border-color)");
            line.setAttribute("stroke-width", "1");
            svg.appendChild(line);

            const labelDist = maxRadius + 28;
            const textX = center + labelDist * Math.cos(angle);
            const textY = center + labelDist * Math.sin(angle) + 4;
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", textX.toFixed(1));
            text.setAttribute("y", textY.toFixed(1));
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("class", "radar-label");
            text.setAttribute("fill", "var(--text-secondary)");
            text.setAttribute("font-size", "11px");
            text.setAttribute("font-weight", "700");
            text.textContent = isAr ? (RADAR_CATEGORY_TRANSLATIONS[cat] || cat) : cat;
            svg.appendChild(text);

            const valueRatio = (categoryScores[cat] || 75) / 100;
            const dataR = maxRadius * valueRatio;
            const dataX = center + dataR * Math.cos(angle);
            const dataY = center + dataR * Math.sin(angle);
            dataPoints.push({ x: dataX, y: dataY });
        });

        const pointsStr = dataPoints.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
        const areaPoly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        areaPoly.setAttribute("points", pointsStr);
        areaPoly.setAttribute("class", "radar-area");
        areaPoly.setAttribute("fill", "url(#radarGrad)");
        areaPoly.setAttribute("stroke", "var(--accent-color)");
        areaPoly.setAttribute("stroke-width", "2.5");
        svg.appendChild(areaPoly);

dataPoints.forEach((p, idx) => {
            const cat = categories[idx];
            const score = categoryScores[cat] || 75;
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", p.x.toFixed(1));
            circle.setAttribute("cy", p.y.toFixed(1));
            circle.setAttribute("r", "5.5");
            circle.setAttribute("fill", "var(--accent-color)");
            circle.setAttribute("stroke", "#ffffff");
            circle.setAttribute("stroke-width", "2");
            circle.setAttribute("class", "chart-node chart-interactive-element");
            svg.appendChild(circle);

            attachChartTooltip(circle, () => ({
                icon: "📊",
                color: "var(--accent-color)",
                title_ar: `محور: ${RADAR_CATEGORY_TRANSLATIONS[cat] || cat}`,
                title_en: `Category: ${cat}`,
                subtitle_ar: "نسبة التوافق في هذا البعد",
                subtitle_en: "Compatibility score in this dimension",
                body_ar: `يقيس هذا المحور درجة الانسجام والتوافق العملي بين الشريكين في ملف (${RADAR_CATEGORY_TRANSLATIONS[cat] || cat}).`,
                body_en: `Evaluates dyadic alignment, mutual expectations, and compatibility for ${cat}.`,
                metric_ar: `درجة التوافق: ${score}%`,
                metric_en: `Compatibility: ${score}%`
            }));
        });

        dom.radarChartContainer.appendChild(svg);
    }

    function renderBigFiveBarCharts(oceanA, oceanB, isSingle = false, nameA = "Partner A", nameB = "Partner B") {
        dom.bigFiveBarChartContainer.innerHTML = "";
        const isAr = state.localization.currentLang === "ar";
        const traits = Object.keys(oceanA);

        if (!isSingle) {
            const legend = document.createElement("div");
            legend.style.cssText = "display: flex; gap: 20px; margin-bottom: 18px; font-size: 0.88rem; font-weight: 700; flex-wrap: wrap;";
            legend.innerHTML = `
                <span style="display: flex; align-items: center; gap: 8px;">
                    <span style="width: 14px; height: 14px; border-radius: 4px; background-color: var(--success); display: inline-block;"></span>
                    ${nameA || (isAr ? "الطرف الأول" : "Partner A")}
                </span>
                <span style="display: flex; align-items: center; gap: 8px;">
                    <span style="width: 14px; height: 14px; border-radius: 4px; background-color: var(--warning); display: inline-block;"></span>
                    ${nameB || (isAr ? "الطرف الثاني" : "Partner B")}
                </span>
            `;
            dom.bigFiveBarChartContainer.appendChild(legend);
        }

        traits.forEach(trait => {
            const scoreA = oceanA[trait] || 50;
            const scoreB = oceanB[trait] || 50;

            const traitLabel = isAr
                ? (BIG_FIVE_TRANSLATIONS[trait]?.ar || trait)
                : (BIG_FIVE_TRANSLATIONS[trait]?.en || trait);

            const row = document.createElement("div");
            row.className = "bar-chart-row";
            row.style.marginBottom = "16px";

            const labelInfo = document.createElement("div");
            labelInfo.className = "bar-label-info";
            labelInfo.style.cssText = "display: flex; justify-content: space-between; font-size: 0.88rem; font-weight: 700; margin-bottom: 6px;";
            if (isSingle) {
                labelInfo.innerHTML = `
                    <span>${traitLabel}</span>
                    <span style="color: var(--success); font-weight: 800;">${scoreA}%</span>
                `;
            } else {
                labelInfo.innerHTML = `
                    <span>${traitLabel}</span>
                    <span>
                        <span style="color: var(--success); font-weight: 800;">${scoreA}%</span>
                        <span style="color: var(--text-tertiary); margin: 0 4px;">${isAr ? "مقابل" : "vs"}</span>
                        <span style="color: var(--warning); font-weight: 800;">${scoreB}%</span>
                    </span>
                `;
            }

            const track = document.createElement("div");
            track.className = "bar-track";
            track.style.cssText = "width: 100%; height: 20px; background-color: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 10px; overflow: hidden; position: relative; display: flex; flex-direction: column;";

            const fillA = document.createElement("div");
            fillA.className = "bar-fill";
            fillA.style.cssText = `width: ${scoreA}%; background-color: var(--success); height: ${isSingle ? "100%" : "50%"}; transition: width 0.6s ease;`;
            track.appendChild(fillA);

            if (!isSingle) {
                const fillB = document.createElement("div");
                fillB.className = "bar-fill";
                fillB.style.cssText = `width: ${scoreB}%; background-color: var(--warning); height: 50%; transition: width 0.6s ease;`;
                track.appendChild(fillB);
            }

row.appendChild(labelInfo);
            row.appendChild(track);

            attachChartTooltip(row, () => {
                const traitInfo = CHART_EXPLANATION_DICTIONARY.big_five[trait] || {};
                return {
                    icon: traitInfo.icon || "📊",
                    color: traitInfo.color || "var(--success)",
                    title_ar: traitInfo.title_ar || traitLabel,
                    title_en: traitInfo.title_en || traitLabel,
                    subtitle_ar: traitInfo.subtitle_ar || "سمة الشخصية في نموذج العوامل الخمسة الكبرى",
                    subtitle_en: traitInfo.subtitle_en || "Big Five OCEAN Factor Dimension",
                    body_ar: traitInfo.body_ar || "",
                    body_en: traitInfo.body_en || "",
                    metric_ar: isSingle ? `${nameA}: ${scoreA}%` : `${nameA}: ${scoreA}% • ${nameB}: ${scoreB}%`,
                    metric_en: isSingle ? `${nameA}: ${scoreA}%` : `${nameA}: ${scoreA}% • ${nameB}: ${scoreB}%`
                };
            });

            dom.bigFiveBarChartContainer.appendChild(row);
        });
    }

    // --- 11. MODAL HELPER FUNCTIONS ---
    function promptForName(callback) {
        dom.modalTitle.textContent = state.localization.get("start_new");
        
        // Clear name input
        document.getElementById("modalInputName").value = "";
        
        // Hide feedback, show form
        document.getElementById("modalFeedbackContent").style.display = "none";
        document.getElementById("modalStartForm").style.display = "block";
        
        dom.modalBackdrop.classList.add("active-backdrop");
        dom.btnModalSubmit.style.display = "block";
        
        // Remove old events cleanly
        const cleanSubmit = () => {
            const nameVal = document.getElementById("modalInputName").value;
            const genderVal = document.getElementById("modalInputGender").value;
            const maritalVal = document.getElementById("modalInputMarital").value;
            
            if (nameVal && nameVal.trim()) {
                dom.modalBackdrop.classList.remove("active-backdrop");
                cleanup();
                callback({
                    name: nameVal.trim(),
                    gender: genderVal,
                    maritalStatus: maritalVal
                });
            } else {
                alert("Please enter a valid name.");
            }
        };

        const cleanCancel = () => {
            dom.modalBackdrop.classList.remove("active-backdrop");
            cleanup();
        };

        function cleanup() {
            dom.btnModalSubmit.removeEventListener("click", cleanSubmit);
            dom.btnModalCancel.removeEventListener("click", cleanCancel);
        }

        dom.btnModalSubmit.addEventListener("click", cleanSubmit);
        dom.btnModalCancel.addEventListener("click", cleanCancel);
    }

    function showFeedbackModal(title, text, onCloseCallback) {
        dom.modalTitle.textContent = title;
        
        // Hide form, show feedback
        document.getElementById("modalStartForm").style.display = "none";
        const fb = document.getElementById("modalFeedbackContent");
        fb.style.display = "block";
        fb.innerHTML = "";
        if (typeof text === "string" && (text.startsWith("<p") || text.startsWith("<textarea") || text.startsWith("<div"))) {
            fb.innerHTML = text;
        } else {
            const p = document.createElement("p");
            p.className = "p-container";
            p.textContent = text;
            fb.appendChild(p);
        }

        
        dom.btnModalSubmit.style.display = "none";
        
        dom.modalBackdrop.classList.add("active-backdrop");

        const handler = () => {
            dom.modalBackdrop.classList.remove("active-backdrop");
            dom.btnModalCancel.removeEventListener("click", handler);
            if (onCloseCallback) onCloseCallback();
        };

        dom.btnModalCancel.addEventListener("click", handler);
    }
});
