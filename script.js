/**
 * MatchWise Lite v1.0
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

        // Multi-Framework Badges
        hartmanBadgeA: document.getElementById("hartmanBadgeA"),
        hartmanBadgeB: document.getElementById("hartmanBadgeB"),
        discBadgeA: document.getElementById("discBadgeA"),
        discBadgeB: document.getElementById("discBadgeB"),
        birkmanBadgeA: document.getElementById("birkmanBadgeA"),
        birkmanBadgeB: document.getElementById("birkmanBadgeB"),
        gottmanBadgeA: document.getElementById("gottmanBadgeA"),
        gottmanBadgeB: document.getElementById("gottmanBadgeB"),

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
        aiInsightsSection: document.getElementById("aiInsightsSection"),
        reportAIInsightsContainer: document.getElementById("reportAIInsightsContainer"),
        
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

    // --- 3. FETCH AND INITIALIZE QUESTIONS ---
    fetch("questions.json")
        .then(response => response.json())
        .then(data => {
            questions = data;
            // Initialize Dashboard list on startup
            renderSavedProfiles();
        })
        .catch(err => {
            console.error("Failed to load questions database.", err);
        });

    // --- 4. LANGUAGE & THEME EVENTS ---
    dom.languageSelector.value = state.localization.currentLang;
    state.localization.translateDOM();

    dom.languageSelector.addEventListener("change", (e) => {
        state.localization.setLanguage(e.target.value);
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

            dom.modalBackdrop.classList.add("active-backdrop");
            dom.btnModalSubmit.style.display = "block";

            const saveAiSettings = () => {
                const prov = dom.selectAiProvider.value;
                const key = dom.inputAiApiKey.value.trim();
                state.aiService.setConfiguration(prov, key);
                state.isAiMode = true;
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
        "Family": "العلاقات والحدود الأسرية"
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
        "openness": { ar: "الانفتاح على التجارب (Openness)", en: "Openness to Experience" },
        "conscientiousness": { ar: "الانضباط والتنظيم (Conscientiousness)", en: "Conscientiousness" },
        "extroversion": { ar: "الانبساطية والاجتماعية (Extraversion)", en: "Extraversion" },
        "agreeableness": { ar: "الوفاق والتعاطف (Agreeableness)", en: "Agreeableness" },
        "neuroticism": { ar: "الحساسية للضغوط (Neuroticism)", en: "Emotional Reactivity (Neuroticism)" }
    };

    /**
     * Finds the next question dynamically.
     * Evaluates followups and maps paths intelligently based on answer scores.
     */
    function getNextQuestionId(currentQId) {
        const currentQ = questions.find(q => q.id === currentQId);
        if (!currentQ) return null;

        // Check for specific follow-ups
        if (currentQ.followups && currentQ.followups.length > 0) {
            const answer = state.sessionAnswers[currentQId];
            for (const followup of currentQ.followups) {
                // If Likert and condition is agree/disagree
                if (followup.condition === "agree" && parseInt(answer, 10) >= 5) {
                    return followup.next_id;
                }
                if (followup.condition === "disagree" && parseInt(answer, 10) <= 3) {
                    return followup.next_id;
                }
            }
        }

        // Default path: traverse linear questions.json index, skipping follow-ups and constraint mismatches
        const currentIndex = questions.findIndex(q => q.id === currentQId);
        const currentGender = state.assessmentSession.gender;
        const currentMarital = state.assessmentSession.maritalStatus;

        for (let i = currentIndex + 1; i < questions.length; i++) {
            const candidate = questions[i];
            if (candidate.is_followup) continue;

            // Skip if question is restricted to a different gender
            if (candidate.gender_constraint && candidate.gender_constraint !== currentGender) {
                continue;
            }

            // Skip if question is restricted to a different marital status
            if (candidate.marital_constraint && candidate.marital_constraint !== currentMarital) {
                continue;
            }

            return candidate.id;
        }
        return null;
    }

    function renderCurrentQuestion() {
        const history = state.assessmentSession.history;
        const currentQId = history[history.length - 1];
        const q = questions.find(qu => qu.id === currentQId);

        if (!q) return;

        const isAr = state.localization.currentLang === "ar";

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
        }).length || 70;

        const currentLength = history.length;
        const progressPercentage = Math.min(100, Math.round((currentLength / matchingQuestionsCount) * 100));
        dom.progressPercent.textContent = `${progressPercentage}%`;
        dom.progressBarFill.style.width = `${progressPercentage}%`;

        // Bilingual Text Support
        const localizedText = isAr ? q.arabic.text : q.english.text;
        dom.questionText.textContent = localizedText;

        // Clear previous options
        dom.answerOptionsContainer.innerHTML = "";

        // Render Inputs by type
        if (q.type === "likert") {
            renderLikertOptions(q);
        } else if (q.type === "choice" || q.type === "scenario") {
            renderMultipleChoiceOptions(q);
        } else if (q.type === "rank") {
            renderPriorityRankingOptions(q);
        }

        // Adjust Next Button text dynamically at end of test
        const hasNext = getNextQuestionId(currentQId);
        if (!hasNext) {
            dom.btnNextQuestion.querySelector("span").textContent = state.localization.get("finish");
        } else {
            dom.btnNextQuestion.querySelector("span").textContent = state.localization.get("next");
        }

        // Disable back button on first question
        dom.btnBackQuestion.disabled = history.length <= 1;
    }

    // Input renderer: Likert Scale (-3 to +3)
    function renderLikertOptions(question) {
        const scaleContainer = document.createElement("div");
        scaleContainer.className = "likert-scale-container";

        const labelsRow = document.createElement("div");
        labelsRow.className = "likert-labels-row";
        labelsRow.innerHTML = `
            <span>${state.localization.get("likert_sd")}</span>
            <span>${state.localization.get("likert_n")}</span>
            <span>${state.localization.get("likert_sa")}</span>
        `;

        const optionsRow = document.createElement("div");
        optionsRow.className = "likert-options-row";

        // 7 Options
        for (let i = 1; i <= 7; i++) {
            const circle = document.createElement("div");
            circle.className = "likert-option-circle";
            circle.textContent = i;
            if (state.sessionAnswers[question.id] == i) {
                circle.classList.add("selected-likert");
            }
            circle.addEventListener("click", () => {
                const elements = optionsRow.querySelectorAll(".likert-option-circle");
                elements.forEach(el => el.classList.remove("selected-likert"));
                circle.classList.add("selected-likert");
                state.sessionAnswers[question.id] = i;
            });
            optionsRow.appendChild(circle);
        }

        scaleContainer.appendChild(labelsRow);
        scaleContainer.appendChild(optionsRow);
        dom.answerOptionsContainer.appendChild(scaleContainer);
    }

    // Input renderer: Multiple Choice & Scenario Questions
    function renderMultipleChoiceOptions(question) {
        const list = document.createElement("div");
        list.className = "choice-list";

        question.options.forEach(opt => {
            const row = document.createElement("div");
            row.className = "choice-option-row";
            if (state.sessionAnswers[question.id] === opt.id) {
                row.classList.add("selected-choice");
            }

            const text = state.localization.currentLang === "ar" ? opt.arabic : opt.english;
            row.textContent = text;

            row.addEventListener("click", () => {
                const siblings = list.querySelectorAll(".choice-option-row");
                siblings.forEach(s => s.classList.remove("selected-choice"));
                row.classList.add("selected-choice");
                state.sessionAnswers[question.id] = opt.id;
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
        if (state.assessmentSession.history.length > 1) {
            state.assessmentSession.history.pop();
            renderCurrentQuestion();
        }
    });

    dom.btnNextQuestion.addEventListener("click", async () => {
        const history = state.assessmentSession.history;
        const currentQId = history[history.length - 1];
        
        // Ensure user answered before going forward
        if (state.sessionAnswers[currentQId] === undefined) {
            const isAr = state.localization.currentLang === "ar";
            alert(isAr ? "يرجى الإجابة على السؤال الحالي للمتابعة." : "Please answer the current question to proceed.");
            return;
        }

        // Show loading state
        const oldText = dom.btnNextQuestion.querySelector("span").textContent;
        dom.btnNextQuestion.querySelector("span").textContent = "...";
        dom.btnNextQuestion.disabled = true;

        let nextQId = null;

        try {
            if (state.isAiMode && state.aiService) {
                const askedCount = Object.keys(state.sessionAnswers).length;
                if (askedCount >= 45) {
                     nextQId = null; // AI test completion threshold (can be adjusted)
                } else {
                     const aiResponse = await state.aiService.determineNextQuestion(history, state.sessionAnswers, questions, state.localization.currentLang);
                     if (aiResponse.next_id === "NEW" && aiResponse.new_question) {
                         questions.push(aiResponse.new_question);
                         nextQId = aiResponse.new_question.id;
                     } else if (aiResponse.next_id === "STANDARD" || !aiResponse.next_id) {
                         nextQId = getNextQuestionId(currentQId);
                     } else {
                         nextQId = aiResponse.next_id;
                     }
                }
            } else {
                nextQId = getNextQuestionId(currentQId);
            }
        } catch (e) {
            console.error(e);
            nextQId = getNextQuestionId(currentQId); // fallback
        }

        dom.btnNextQuestion.disabled = false;
        dom.btnNextQuestion.querySelector("span").textContent = oldText;

        if (nextQId) {
            state.assessmentSession.history.push(nextQId);
            renderCurrentQuestion();
        } else {
            // Assessment is complete! Save and Export Profile
            completeAndExportSession();
        }
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
            app_version: "v2.5",
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
            meta.innerHTML = `
                <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                    <h4 style="margin: 0; font-size: 1.05rem;">${p.owner_name}</h4>
                    <span class="person-type-badge hartman-badge-${hColor.toLowerCase()}" style="padding: 2px 8px; font-size: 0.72rem;">${hColor}</span>
                    <span class="person-type-badge type-a" style="padding: 2px 8px; font-size: 0.72rem;">DISC: ${discType}</span>
                    <span class="person-type-badge type-b" style="padding: 2px 8px; font-size: 0.72rem;">${mbti}</span>
                </div>
                <p style="margin-top: 4px; font-size: 0.82rem; color: var(--text-secondary);">
                    ${state.localization.get("created_at")}: ${p.created_at} • ${state.localization.get("birkman_label")}: <strong>${need}</strong>
                </p>
            `;

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
                if (json && json.matchwise_lite_payload) {
                    const decrypted = window.Cryptography.decrypt(json.matchwise_lite_payload);
                    if (decrypted) {
                        window.Storage.saveProfile(decrypted);
                        showFeedbackModal(
                            state.localization.get("import_profile"),
                            state.localization.get("success_import")
                        );
                        renderSavedProfiles();
                    } else {
                        throw new Error("Decryption failed");
                    }
                } else {
                    throw new Error("Invalid format");
                }
            } catch (err) {
                alert(state.localization.get("invalid_file"));
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

        // Show/hide comparison elements dynamically using css class .hidden
        const bCols = document.querySelectorAll(".person-b-col");
        if (!profileB) {
            // SINGLE VIEW
            bCols.forEach(el => el.classList.add("hidden"));
            dom.gaugeCardContainer.classList.add("hidden");
            dom.radarChartCard.classList.add("hidden");
            dom.reportSectionDealbreakers.classList.add("hidden");
            
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
            if (dom.attachmentBadgeA) dom.attachmentBadgeA.textContent = (traitsA.attachment?.primary || "--").toUpperCase();
            if (dom.commBadgeA) dom.commBadgeA.textContent = (traitsA.communication?.primary || "--").toUpperCase();
            if (dom.conflictBadgeA) dom.conflictBadgeA.textContent = (traitsA.conflict?.primary || "collaborating").toUpperCase();

            // Hartman Badge
            if (dom.hartmanBadgeA) {
                const hColorA = traitsA.hartman?.primary || "blue";
                dom.hartmanBadgeA.textContent = `${hColorA.toUpperCase()} (${isAr ? (traitsA.hartman?.metadata?.motive_ar || "") : (traitsA.hartman?.metadata?.motive_en || "")})`;
                dom.hartmanBadgeA.className = `person-type-badge type-a hartman-badge-${hColorA}`;
            }

            // DISC Badge
            if (dom.discBadgeA) {
                const discStyleA = traitsA.disc?.primary || "D";
                dom.discBadgeA.textContent = `${discStyleA} (${isAr ? (traitsA.disc?.pace_ar || "") : (traitsA.disc?.pace || "")})`;
            }

            // Birkman Badge
            if (dom.birkmanBadgeA) {
                dom.birkmanBadgeA.textContent = (traitsA.birkman?.underlying_need || "empathy").toUpperCase();
            }

            // Gottman Safety Badge
            if (dom.gottmanBadgeA) {
                dom.gottmanBadgeA.textContent = `${traitsA.gottman_safety?.emotional_safety_index || 85}% ${isAr ? "أمان" : "Safety"}`;
            }

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
            renderHartmanDonut(dom.hartmanChartContainer, traitsA, null, true, profileA.owner_name, null, isAr);
            renderDiscQuadrantMap(dom.discQuadrantContainer, traitsA.disc, null, true, profileA.owner_name, null, isAr);
            renderBirkmanIceberg(dom.birkmanIcebergContainer, traitsA, null, true, profileA.owner_name, null, isAr);
            renderAttachmentCoordinateMap(dom.attachmentGridContainer, traitsA, null, true, profileA.owner_name, null, isAr);
            renderFiroExchange(dom.firoExchangeContainer, traitsA, null, true, profileA.owner_name, null, isAr);
            renderGottmanSafetyGauge(dom.gottmanGaugeContainer, traitsA, null, true, profileA.owner_name, null, isAr);

            // Render Relationship Operating Manual for Person A
            renderOperatingManual(profileA, null, isAr);

            // Render Personal De-escalation Box
            renderFairFightingBox(null, profileA, isAr);

            // Big Five rendering (just pass A for both to render single)
            renderBigFiveBarCharts(traitsA.big_five, traitsA.big_five, true, profileA.owner_name, null);

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

            // Bilingual Dynamic Summary Builder
            let summaryText = "";
            if (report.overall_index >= 85) {
                summaryText = isAr 
                    ? `تناغم استثنائي وتوافق فكري وعاطفي عميق تم رصده بين ${profileA.owner_name} و ${profileB.owner_name}. تتلاقى الأهداف الحياتية والرؤى المستقبلية لإنشاء علاقة مستدامة للغاية.`
                    : `Outstanding structural synergy and deep emotional alignment detected between ${profileA.owner_name} and ${profileB.owner_name}. Core life visions and communication patterns are beautifully synchronized.`;
            } else if (report.overall_index >= 70) {
                summaryText = isAr
                    ? `توافق أساسي قوي للغاية بين ${profileA.owner_name} و ${profileB.owner_name}. هناك بعض النقاط الحوارية الهامة حول إدارة الشؤون المالية والحدود العائلية التي تتطلب تفاهمات واعية.`
                    : `Solid foundational compatibility with minor functional frictions between ${profileA.owner_name} and ${profileB.owner_name}. Minor discrepancies in household management and boundaries represent opportunities for proactive communication.`;
            } else {
                summaryText = isAr
                    ? `تم اكتشاف اختلافات فكرية واجتماعية واضحة في رؤية العلاقة بين ${profileA.owner_name} و ${profileB.owner_name}. يتطلب البناء السليم صياغة التزامات تفصيلية حول أسلوب المعيشة والاتفاق المالي.`
                    : `Significant thematic contrasts and personality divergence observed between ${profileA.owner_name} and ${profileB.owner_name}. Bridging these boundaries will require high intentionality, empathetic listening, and structural compromises.`;
            }
            dom.reportExecutiveSummaryText.textContent = summaryText;

            // Meta parameters
            dom.reportHeaderPersonA.textContent = profileA.owner_name;
            dom.reportHeaderPersonB.textContent = profileB.owner_name;
            
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
            if (dom.attachmentBadgeA) dom.attachmentBadgeA.textContent = (profileA.calculated_personality.attachment?.primary || "--").toUpperCase();
            if (dom.attachmentBadgeB) dom.attachmentBadgeB.textContent = (profileB.calculated_personality.attachment?.primary || "--").toUpperCase();
            if (dom.commBadgeA) dom.commBadgeA.textContent = (profileA.calculated_personality.communication?.primary || "--").toUpperCase();
            if (dom.commBadgeB) dom.commBadgeB.textContent = (profileB.calculated_personality.communication?.primary || "--").toUpperCase();
            if (dom.conflictBadgeA) dom.conflictBadgeA.textContent = (profileA.calculated_personality.conflict?.primary || "collaborating").toUpperCase();
            if (dom.conflictBadgeB) dom.conflictBadgeB.textContent = (profileB.calculated_personality.conflict?.primary || "collaborating").toUpperCase();

            // Render Multi-Framework Badges for A & B
            const traitsCompA = profileA.calculated_personality;
            const traitsCompB = profileB.calculated_personality;

            if (dom.hartmanBadgeA && dom.hartmanBadgeB) {
                const colA = traitsCompA.hartman?.primary || "blue";
                const colB = traitsCompB.hartman?.primary || "white";
                dom.hartmanBadgeA.textContent = colA.toUpperCase();
                dom.hartmanBadgeA.className = `person-type-badge type-a hartman-badge-${colA}`;
                dom.hartmanBadgeB.textContent = colB.toUpperCase();
                dom.hartmanBadgeB.className = `person-type-badge type-b hartman-badge-${colB}`;
            }

            if (dom.discBadgeA && dom.discBadgeB) {
                dom.discBadgeA.textContent = `${traitsCompA.disc?.primary || "D"}`;
                dom.discBadgeB.textContent = `${traitsCompB.disc?.primary || "S"}`;
            }

            if (dom.birkmanBadgeA && dom.birkmanBadgeB) {
                dom.birkmanBadgeA.textContent = (traitsCompA.birkman?.underlying_need || "empathy").toUpperCase();
                dom.birkmanBadgeB.textContent = (traitsCompB.birkman?.underlying_need || "freedom").toUpperCase();
            }

            if (dom.gottmanBadgeA && dom.gottmanBadgeB) {
                dom.gottmanBadgeA.textContent = `${traitsCompA.gottman_safety?.emotional_safety_index || 85}%`;
                dom.gottmanBadgeB.textContent = `${traitsCompB.gottman_safety?.emotional_safety_index || 80}%`;
            }

            // Render Interactive Multi-Framework SVG Visualizers for Comparison View
            renderHartmanDonut(dom.hartmanChartContainer, traitsCompA, traitsCompB, false, profileA.owner_name, profileB.owner_name, isAr);
            renderDiscQuadrantMap(dom.discQuadrantContainer, traitsCompA.disc, traitsCompB.disc, false, profileA.owner_name, profileB.owner_name, isAr);
            renderBirkmanIceberg(dom.birkmanIcebergContainer, traitsCompA, traitsCompB, false, profileA.owner_name, profileB.owner_name, isAr);
            renderAttachmentCoordinateMap(dom.attachmentGridContainer, traitsCompA, traitsCompB, false, profileA.owner_name, profileB.owner_name, isAr);
            renderFiroExchange(dom.firoExchangeContainer, traitsCompA, traitsCompB, false, profileA.owner_name, profileB.owner_name, isAr);
            renderGottmanSafetyGauge(dom.gottmanGaugeContainer, traitsCompA, traitsCompB, false, profileA.owner_name, profileB.owner_name, isAr);
            renderDyadicConflictLoop(dom.dyadicConflictLoopContainer, report, profileA, profileB, isAr);

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
                profileA.owner_name,
                profileB.owner_name
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

                    appendBlock(isAr ? "تحليل الدافع الجوهري (Hartman Core Motive)" : "Core Motive Analysis (Hartman)", aiData.coreMotiveAnalysis, "var(--accent-color)");
                    appendBlock(isAr ? "بروفايل الأمان العاطفي وإدارة الخلاف (TKI & Gottman)" : "Conflict & Emotional Safety Profile (TKI & Gottman)", aiData.conflictAndSafety, "#8b5cf6");
                    appendBlock(isAr ? "نمط التعلق والاحتواء (Attachment Theory)" : "Attachment & Intimacy Dynamic", aiData.attachmentProfile, "#10b981");

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
                    aiContainer.innerHTML = "<p>Failed to generate AI insights.</p>";
                    console.error(err);
                });
            } else {
                // COMPARISON DYADIC AI CONSULTATION
                state.aiService.compareProfilesWithAI(profileA, profileB, isAr ? "ar" : "en").then(aiData => {
                    if (!aiData) {
                        aiContainer.innerHTML = `<p>${isAr ? "تعذر إنشاء استشارة التوافق الثنائي حالياً." : "Could not generate dyadic consultation at this time."}</p>`;
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

                    appendBlock(isAr ? "الملخص التنفيذي للتوافق الزوجي (DeepSeek Pro)" : "Executive Dyadic Consultation (DeepSeek Pro)", aiData.executiveSummary, "#8b5cf6");
                    appendBlock(isAr ? "تفاعل الدافع والإيقاع اليومي (Hartman & DISC)" : "Motive & Pace Dynamic (Hartman & DISC)", aiData.motiveAndPaceDynamic, "var(--accent-color)");
                    appendBlock(isAr ? "توافق الاحتياجات الخفية وحساسية التوتر (Birkman)" : "Cross-Need Satisfaction & Stress Triggers (Birkman)", aiData.crossNeedCollision, "#f59e0b");
                    appendBlock(isAr ? "دورة الخلاف التفاعلية وكيفية كسرها (Gottman & Attachment)" : "The Reactive Conflict Dance & Cycle Breaker", aiData.reactiveConflictDance, "#ef4444");

                    // Conversational Bridge Scripts
                    if (aiData.conversationalBridgeScripts && aiData.conversationalBridgeScripts.length > 0) {
                        const scriptWrapper = document.createElement("div");
                        scriptWrapper.style.marginTop = "20px";
                        scriptWrapper.innerHTML = `<h4 style="color: var(--accent-color); margin-bottom: 12px;">${isAr ? "نصوص الحوار وجسور التفاهم المقترحة" : "Conversational Bridge Scripts (What to Say in Tough Moments)"}</h4>`;
                        
                        aiData.conversationalBridgeScripts.forEach(bs => {
                            const sc = document.createElement("div");
                            sc.className = "bridge-script-card";
                            sc.innerHTML = `
                                <div class="bridge-script-scenario">${bs.scenario}</div>
                                <div class="bridge-quote"><strong>${profileA.owner_name}:</strong> "${bs.scriptA}"</div>
                                <div class="bridge-quote"><strong>${profileB.owner_name}:</strong> "${bs.scriptB}"</div>
                            `;
                            scriptWrapper.appendChild(sc);
                        });
                        aiContainer.appendChild(scriptWrapper);
                    }
                }).catch(err => {
                    aiContainer.innerHTML = "<p>Failed to generate dyadic AI consultation.</p>";
                    console.error(err);
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
            card.innerHTML = `
                <div class="manual-profile-header">
                    <div class="manual-owner-title">${profile.owner_name}</div>
                    <span class="person-type-badge ${typeClass}">${(h.primary || "Blue").toUpperCase()} • ${(traits.disc?.primary || "D")}</span>
                </div>
                <div class="manual-point">
                    <div class="manual-point-label">
                        <span>🌟</span>
                        <span>${isAr ? "الأسلوب المعتاد في الحياة اليومية (Birkman Usual)" : "Natural Everyday Style (Birkman Usual)"}</span>
                    </div>
                    <div class="manual-point-content">${usualDesc}</div>
                </div>
                <div class="manual-point">
                    <div class="manual-point-label">
                        <span>🛡️</span>
                        <span>${isAr ? "الاحتياج العاطفي الخفي (Underlying Needs)" : "Hidden Emotional Needs (Birkman Needs)"}</span>
                    </div>
                    <div class="manual-point-content">${needDesc}</div>
                </div>
                <div class="manual-point">
                    <div class="manual-point-label">
                        <span>⚠️</span>
                        <span>${isAr ? "ردة الفعل عند الضغط والإنهاك (Stress Derailer)" : "Reaction Under Pressure (Stress Derailer)"}</span>
                    </div>
                    <div class="manual-point-content">${stressDesc}</div>
                </div>
                <div class="manual-point">
                    <div class="manual-point-label">
                        <span>🔋</span>
                        <span>${isAr ? "الوقود العاطفي ومصدر التهدئة (Core Fuel)" : "Core Emotional Fuel & Soothing"}</span>
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

    // --- 9B. MULTI-FRAMEWORK INTERACTIVE SVG VISUALIZERS ---

    // 1. Hartman Motive Spectrum Donut
    function renderHartmanDonut(container, traitsA, traitsB, isSingle, nameA, nameB, isAr) {
        if (!container) return;
        container.innerHTML = "";

        const hA = traitsA.hartman || { breakdown: { red: 25, blue: 25, white: 25, yellow: 25 }, primary: "blue" };
        const bA = hA.breakdown || { red: 25, blue: 25, white: 25, yellow: 25 };

        const colors = {
            red: { hex: "#ef4444", label: isAr ? "أحمر (قيادة وإنجاز)" : "Red (Power & Progress)" },
            blue: { hex: "#3b82f6", label: isAr ? "أزرق (قرب وأصالة)" : "Blue (Intimacy & Depth)" },
            white: { hex: "#94a3b8", label: isAr ? "أبيض (سلام ووضوح)" : "White (Peace & Clarity)" },
            yellow: { hex: "#eab308", label: isAr ? "أصفر (حماس وبهجة)" : "Yellow (Fun & Passion)" }
        };

        const width = 280, height = 280;
        const cx = 140, cy = 140, r = 95, strokeW = 30;
        const circ = 2 * Math.PI * r;

        let offset = 0;
        const colorKeys = ["red", "blue", "white", "yellow"];

        let pathsSvg = "";
        colorKeys.forEach(k => {
            const val = Math.max(3, bA[k] || 0);
            const dashLen = (val / 100) * circ;
            const dashOffset = -offset;
            offset += dashLen;
            pathsSvg += `
                <circle class="chart-node" cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${colors[k].hex}" stroke-width="${strokeW}"
                    stroke-dasharray="${dashLen} ${circ - dashLen}" stroke-dashoffset="${dashOffset}"
                    transform="rotate(-90 ${cx} ${cy})">
                    <title>${colors[k].label}: ${Math.round(val)}%</title>
                </circle>
            `;
        });

        const primaryColor = (hA.primary || "blue").toLowerCase();
        const primaryHex = colors[primaryColor]?.hex || "#3b82f6";
        const motiveName = hA.metadata ? (isAr ? hA.metadata.motive_ar : hA.metadata.motive_en) : primaryColor.toUpperCase();

        const svg = `
            <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
                <svg class="interactive-svg" viewBox="0 0 ${width} ${height}" style="width: 100%; max-width: 270px; height: auto; aspect-ratio: 1 / 1;">
                    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="${strokeW}" />
                    ${pathsSvg}
                    <text x="${cx}" y="${cy - 8}" text-anchor="middle" fill="${primaryHex}" font-size="18" font-weight="800">${primaryColor.toUpperCase()}</text>
                    <text x="${cx}" y="${cy + 14}" text-anchor="middle" fill="var(--text-secondary)" font-size="11" font-weight="600">${motiveName}</text>
                </svg>
                <div class="visual-legend" style="margin-top: 16px; font-size: 0.85rem;">
                    ${colorKeys.map(k => `
                        <div class="legend-item" title="${colors[k].label}" style="display: inline-flex; align-items: center; gap: 6px; margin: 4px 8px;">
                            <span class="legend-color-dot" style="width: 12px; height: 12px; border-radius: 50%; background-color: ${colors[k].hex};"></span>
                            <span>${isAr ? k.toUpperCase() : k.charAt(0).toUpperCase() + k.slice(1)}: <strong>${Math.round(bA[k] || 0)}%</strong></span>
                        </div>
                    `).join('')}
                </div>
                ${hA.metadata ? `
                    <div style="font-size: 0.88rem; margin-top: 12px; color: var(--text-secondary); line-height: 1.5; text-align: center; max-width: 320px; background: rgba(0, 113, 227, 0.05); padding: 8px 14px; border-radius: 8px;">
                        <strong>${isAr ? "الوقود العاطفي:" : "Core Fuel:"}</strong> ${isAr ? hA.metadata.fuel_ar : hA.metadata.fuel_en}
                    </div>
                ` : ''}
            </div>
        `;
        container.innerHTML = svg;
    }

    // 2. DISC Behavioral Rhythm & Tempo (2x2 Matrix)
    function renderDiscQuadrantMap(container, discA, discB, isSingle, nameA, nameB, isAr) {
        if (!container) return;
        container.innerHTML = "";

        const width = 300, height = 300;
        const cx = 150, cy = 150;

        const getCoords = (disc) => {
            if (!disc) return { x: cx, y: cy };
            const b = disc.breakdown || { D: 25, I: 25, S: 25, C: 25 };
            const taskPeople = ((b.I + b.S) - (b.D + b.C)) / 100;
            const fastSteady = ((b.D + b.I) - (b.S + b.C)) / 100;
            const x = cx + taskPeople * 80;
            const y = cy - fastSteady * 80;
            return { x: Math.max(40, Math.min(260, x)), y: Math.max(40, Math.min(260, y)) };
        };

        const ptA = getCoords(discA);
        const ptB = !isSingle ? getCoords(discB) : null;

        let connectingLine = "";
        if (ptB) {
            connectingLine = `<line x1="${ptA.x}" y1="${ptA.y}" x2="${ptB.x}" y2="${ptB.y}" stroke="var(--border-color)" stroke-width="2.5" stroke-dasharray="4 4" />`;
        }

        const svg = `
            <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
                <svg class="interactive-svg" viewBox="0 0 ${width} ${height}" style="width: 100%; max-width: 290px; height: auto; aspect-ratio: 1 / 1;">
                    <!-- Quadrant backgrounds -->
                    <rect x="25" y="25" width="125" height="125" fill="rgba(239, 68, 68, 0.09)" rx="10" />
                    <rect x="150" y="25" width="125" height="125" fill="rgba(234, 179, 8, 0.09)" rx="10" />
                    <rect x="150" y="150" width="125" height="125" fill="rgba(16, 185, 129, 0.09)" rx="10" />
                    <rect x="25" y="150" width="125" height="125" fill="rgba(59, 130, 246, 0.09)" rx="10" />

                    <!-- Axes -->
                    <line x1="25" y1="${cy}" x2="275" y2="${cy}" stroke="var(--border-color)" stroke-width="1.8" />
                    <line x1="${cx}" y1="25" x2="${cx}" y2="275" stroke="var(--border-color)" stroke-width="1.8" />

                    <!-- Quadrant labels -->
                    <text x="38" y="50" fill="#ef4444" font-size="16" font-weight="800">D</text>
                    <text x="262" y="50" fill="#eab308" font-size="16" font-weight="800" text-anchor="end">I</text>
                    <text x="262" y="265" fill="#10b981" font-size="16" font-weight="800" text-anchor="end">S</text>
                    <text x="38" y="265" fill="#3b82f6" font-size="16" font-weight="800">C</text>

                    <!-- Axis descriptors -->
                    <text x="${cx}" y="18" fill="var(--text-secondary)" font-size="10" font-weight="700" text-anchor="middle">${isAr ? "سريع / مبادر (Fast-Paced)" : "Fast-Paced & Assertive"}</text>
                    <text x="${cx}" y="292" fill="var(--text-secondary)" font-size="10" font-weight="700" text-anchor="middle">${isAr ? "متأنٍ / رصين (Reflective)" : "Deliberate & Reflective"}</text>
                    <text x="14" y="${cy + 4}" fill="var(--text-secondary)" font-size="10" font-weight="700" text-anchor="end">${isAr ? "المهام" : "Task"}</text>
                    <text x="286" y="${cy + 4}" fill="var(--text-secondary)" font-size="10" font-weight="700" text-anchor="start">${isAr ? "الناس" : "People"}</text>

                    ${connectingLine}

                    <!-- Point A -->
                    <g class="chart-node">
                        <circle cx="${ptA.x}" cy="${ptA.y}" r="9" fill="#10b981" stroke="#fff" stroke-width="2.5" />
                        <text x="${ptA.x}" y="${ptA.y - 13}" text-anchor="middle" fill="#10b981" font-size="11" font-weight="800">${nameA || "A"}</text>
                    </g>

                    ${ptB ? `
                        <g class="chart-node">
                            <circle cx="${ptB.x}" cy="${ptB.y}" r="9" fill="#f59e0b" stroke="#fff" stroke-width="2.5" />
                            <text x="${ptB.x}" y="${ptB.y - 13}" text-anchor="middle" fill="#f59e0b" font-size="11" font-weight="800">${nameB || "B"}</text>
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
    }

    // 3. Birkman Tri-Layer Iceberg Cross-Section
    function renderBirkmanIceberg(container, traitsA, traitsB, isSingle, nameA, nameB, isAr) {
        if (!container) return;
        container.innerHTML = "";

        const bA = traitsA.birkman || {};
        const bB = traitsB?.birkman || {};

        const svg = `
            <div style="width: 100%; max-width: 660px; margin: 0 auto;">
                <svg class="interactive-svg" viewBox="0 0 600 270" style="width: 100%; height: auto;">
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
                    <polygon points="300,16 240,75 360,75" fill="url(#iceTip)" stroke="#cbd5e1" stroke-width="1.8" />

                    <!-- Waterline Wave -->
                    <path d="M0,75 Q75,70 150,75 T300,75 T450,75 T600,75" fill="none" stroke="#38bdf8" stroke-width="3" stroke-dasharray="5 3" />

                    <!-- Iceberg Submerged Base -->
                    <polygon points="240,75 190,160 220,250 380,250 410,160 360,75" fill="url(#iceDeep)" opacity="0.88" stroke="#0ea5e9" stroke-width="1.8" />

                    <!-- Level Labels for Person A -->
                    <rect x="15" y="20" width="185" height="38" rx="8" fill="rgba(255,255,255,0.95)" stroke="#94a3b8" stroke-width="1.2" />
                    <text x="25" y="36" font-size="10" font-weight="800" fill="#0f172a">${isAr ? "المستوى 1: السلوك الظاهر" : "Level 1: Outward Style"}</text>
                    <text x="25" y="50" font-size="9.5" font-weight="700" fill="#0284c7">${nameA}: ${bA.usual_style || "Assertive"}</text>

                    <rect x="15" y="110" width="185" height="38" rx="8" fill="rgba(15,23,42,0.88)" stroke="#38bdf8" stroke-width="1.2" />
                    <text x="25" y="126" font-size="10" font-weight="800" fill="#38bdf8">${isAr ? "المستوى 2: الاحتياج الخفي" : "Level 2: Hidden Needs"}</text>
                    <text x="25" y="140" font-size="9.5" font-weight="700" fill="#e2e8f0">${nameA}: ${bA.underlying_need || "Empathy"}</text>

                    <rect x="15" y="200" width="185" height="38" rx="8" fill="rgba(15,23,42,0.95)" stroke="#ef4444" stroke-width="1.2" />
                    <text x="25" y="216" font-size="10" font-weight="800" fill="#ef4444">${isAr ? "المستوى 3: ردة فعل التوتر" : "Level 3: Stress Derailer"}</text>
                    <text x="25" y="230" font-size="9.5" font-weight="700" fill="#fca5a5">${nameA}: ${bA.stress_trigger || "Withdrawal"}</text>

                    ${!isSingle ? `
                        <!-- Person B Callouts -->
                        <rect x="400" y="20" width="185" height="38" rx="8" fill="rgba(255,255,255,0.95)" stroke="#f59e0b" stroke-width="1.2" />
                        <text x="410" y="36" font-size="10" font-weight="800" fill="#b45309">${nameB} (${isAr ? "الظاهر" : "Usual"})</text>
                        <text x="410" y="50" font-size="9.5" font-weight="700" fill="#334155">${bB.usual_style || "Reflective"}</text>

                        <rect x="400" y="110" width="185" height="38" rx="8" fill="rgba(15,23,42,0.88)" stroke="#f59e0b" stroke-width="1.2" />
                        <text x="410" y="126" font-size="10" font-weight="800" fill="#f59e0b">${nameB} (${isAr ? "الاحتياج" : "Needs"})</text>
                        <text x="410" y="140" font-size="9.5" font-weight="700" fill="#e2e8f0">${bB.underlying_need || "Freedom"}</text>

                        <rect x="400" y="200" width="185" height="38" rx="8" fill="rgba(15,23,42,0.95)" stroke="#ef4444" stroke-width="1.2" />
                        <text x="410" y="216" font-size="10" font-weight="800" fill="#ef4444">${nameB} (${isAr ? "التوتر" : "Stress"})</text>
                        <text x="410" y="230" font-size="9.5" font-weight="700" fill="#fca5a5">${bB.stress_trigger || "Demanding"}</text>
                    ` : ''}
                </svg>
            </div>
        `;
        container.innerHTML = svg;
    }

    // 4. Attachment Security 2D Coordinate Field (ECR)
    function renderAttachmentCoordinateMap(container, traitsA, traitsB, isSingle, nameA, nameB, isAr) {
        if (!container) return;
        container.innerHTML = "";

        const width = 300, height = 300;
        const cx = 150, cy = 150;

        const getCoords = (traits) => {
            if (!traits) return { x: cx, y: cy };
            const ecr = traits.attachment || traits.attachment_ecr || { anxiety_score: 30, avoidance_score: 30 };
            const anx = Math.max(5, Math.min(95, ecr.anxiety_score !== undefined ? ecr.anxiety_score : 30));
            const avoid = Math.max(5, Math.min(95, ecr.avoidance_score !== undefined ? ecr.avoidance_score : 30));
            const x = 35 + (anx / 100) * 230;
            const y = 265 - (avoid / 100) * 230;
            return { x, y };
        };

        const ptA = getCoords(traitsA);
        const ptB = !isSingle ? getCoords(traitsB) : null;

        const svg = `
            <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
                <svg class="interactive-svg" viewBox="0 0 ${width} ${height}" style="width: 100%; max-width: 290px; height: auto; aspect-ratio: 1 / 1;">
                    <!-- 4 Quadrants -->
                    <rect x="30" y="150" width="120" height="120" fill="rgba(16, 185, 129, 0.12)" rx="8" /> <!-- Secure -->
                    <rect x="150" y="150" width="120" height="120" fill="rgba(245, 158, 11, 0.12)" rx="8" /> <!-- Anxious -->
                    <rect x="30" y="30" width="120" height="120" fill="rgba(59, 130, 246, 0.12)" rx="8" /> <!-- Avoidant -->
                    <rect x="150" y="30" width="120" height="120" fill="rgba(239, 68, 68, 0.12)" rx="8" /> <!-- Fearful -->

                    <!-- Axes -->
                    <line x1="30" y1="${cy}" x2="270" y2="${cy}" stroke="var(--border-color)" stroke-width="1.8" />
                    <line x1="${cx}" y1="30" x2="${cx}" y2="270" stroke="var(--border-color)" stroke-width="1.8" />

                    <!-- Labels -->
                    <text x="42" y="258" fill="#10b981" font-size="11" font-weight="800">${isAr ? "آمن (Secure)" : "SECURE"}</text>
                    <text x="258" y="258" fill="#f59e0b" font-size="11" font-weight="800" text-anchor="end">${isAr ? "قلق (Anxious)" : "ANXIOUS"}</text>
                    <text x="42" y="48" fill="#3b82f6" font-size="11" font-weight="800">${isAr ? "تجنبي (Dismissive)" : "DISMISSIVE"}</text>
                    <text x="258" y="48" fill="#ef4444" font-size="11" font-weight="800" text-anchor="end">${isAr ? "مضطرب (Fearful)" : "FEARFUL"}</text>

                    <text x="${cx}" y="18" fill="var(--text-secondary)" font-size="9" font-weight="700" text-anchor="middle">${isAr ? "ارتفاع التجنب (Avoidance)" : "High Avoidance"}</text>
                    <text x="282" y="${cy + 4}" fill="var(--text-secondary)" font-size="9" font-weight="700" text-anchor="start">${isAr ? "قلق" : "Anxiety"}</text>

                    <!-- Point A -->
                    <circle cx="${ptA.x}" cy="${ptA.y}" r="9" fill="#10b981" stroke="#fff" stroke-width="2.5" class="chart-node" />
                    <text x="${ptA.x}" y="${ptA.y - 13}" text-anchor="middle" fill="#10b981" font-size="11" font-weight="800">${nameA}</text>

                    ${ptB ? `
                        <line x1="${ptA.x}" y1="${ptA.y}" x2="${ptB.x}" y2="${ptB.y}" stroke="var(--border-color)" stroke-width="2" stroke-dasharray="4 4" />
                        <circle cx="${ptB.x}" cy="${ptB.y}" r="9" fill="#f59e0b" stroke="#fff" stroke-width="2.5" class="chart-node" />
                        <text x="${ptB.x}" y="${ptB.y - 13}" text-anchor="middle" fill="#f59e0b" font-size="11" font-weight="800">${nameB}</text>
                    ` : ''}
                </svg>
                <div style="font-size: 0.88rem; margin-top: 10px; color: var(--text-secondary); text-align: center;">
                    ${nameA}: <strong>${traitsA.attachment?.primary?.toUpperCase()}</strong>
                    ${!isSingle ? ` | ${nameB}: <strong>${traitsB.attachment?.primary?.toUpperCase()}</strong>` : ''}
                </div>
            </div>
        `;
        container.innerHTML = svg;
    }

    // 5. FIRO-B Interpersonal Exchange (Control & Affection)
    function renderFiroExchange(container, traitsA, traitsB, isSingle, nameA, nameB, isAr) {
        if (!container) return;
        container.innerHTML = "";

        const getFiroScore = (traits, domain, mode) => {
            if (!traits) return 50;
            const firo = traits.firo_b || {};
            // 1. Check nested object: firo.control.expressed (scale 1-9 or 10-100)
            if (firo[domain] && typeof firo[domain][mode] === "number") {
                const raw = firo[domain][mode];
                return raw <= 10 ? Math.round((raw / 9) * 100) : Math.min(100, Math.round(raw));
            }
            // 2. Check flat property: firo.control_expressed
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

        const makeBar = (label, valA, valB, color) => `
            <div style="margin-bottom: 14px; width: 100%;">
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
            ${makeBar(isAr ? "القيادة واتخاذ القرار (Control Expressed)" : "Decision Leadership (Control)", ctrlExpA, ctrlExpB, "#3b82f6")}
            ${makeBar(isAr ? "الحاجة لتوجيه الشريك (Control Wanted)" : "Receptivity to Guidance (Wanted)", ctrlWntA, ctrlWntB, "#8b5cf6")}
            ${makeBar(isAr ? "المبادرة العاطفية والتعبير (Affection Expressed)" : "Affection Expression", affExpA, affExpB, "#ec4899")}
            ${makeBar(isAr ? "الاحتياج للتعبير العاطفي (Affection Wanted)" : "Affection Craved", affWntA, affWntB, "#10b981")}
        `;
        container.appendChild(wrapper);
    }

    // 6. Gottman Emotional Safety & Four Horsemen Risk Gauge
    function renderGottmanSafetyGauge(container, traitsA, traitsB, isSingle, nameA, nameB, isAr) {
        if (!container) return;
        container.innerHTML = "";

        const gA = traitsA.gottman_safety || { emotional_safety_index: 85, four_horsemen_risk: { criticism: 10, defensiveness: 15, stonewalling: 10, contempt: 5 } };
        const gB = traitsB?.gottman_safety || { emotional_safety_index: 80, four_horsemen_risk: { criticism: 15, defensiveness: 20, stonewalling: 15, contempt: 5 } };

        const safetyScore = isSingle ? gA.emotional_safety_index : Math.round((gA.emotional_safety_index + gB.emotional_safety_index) / 2);
        const risks = gA.four_horsemen_risk || {};

        const makeRiskRow = (label, val, max = 100) => {
            const color = val > 40 ? "#ef4444" : (val > 25 ? "#f59e0b" : "#10b981");
            return `
                <div style="margin-bottom: 8px;">
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
            <div style="display: inline-block; position: relative; margin-bottom: 14px;">
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
                    ${isAr ? "رادار فرسان الهلاك الأربعة (Gottman)" : "Four Horsemen Risk Monitors"}
                </div>
                ${makeRiskRow(isAr ? "النقد واللوم (Criticism)" : "Criticism Tendency", risks.criticism || 15)}
                ${makeRiskRow(isAr ? "الدفاعية والتبرير (Defensiveness)" : "Defensiveness", risks.defensiveness || 20)}
                ${makeRiskRow(isAr ? "الانعزال والجدار الصامت (Stonewalling)" : "Stonewalling", risks.stonewalling || 15)}
                ${makeRiskRow(isAr ? "الازدراء والتقليل (Contempt)" : "Contempt (Toxic)", risks.contempt || 5)}
            </div>
        `;
        container.appendChild(wrapper);
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

        const loopSteps = [
            {
                type: "trigger",
                title: isAr ? `1. شرارة الخلاف: التباين في أسلوب الحوار` : `1. The Spark: Pace & Delivery Discrepancy`,
                desc: isAr 
                    ? `عندما يبادر ${profileA.owner_name} بأسلوب مباشر أو نبرة سريعة في لحظة انشغال أو إرهاق.`
                    : `When ${profileA.owner_name} uses a direct, urgent tone while discussing plans or concerns.`
            },
            {
                type: "need",
                title: isAr ? `2. جرس الإنذار الخفي: جرح الاحتياج` : `2. The Unspoken Alarm: Threatened Need`,
                desc: isAr
                    ? `يشعر ${profileB.owner_name} بأن احتياجه لـ (${traitsB.birkman?.underlying_need || "الهدوء والتقدير"}) مهدد، مما يولد توتراً داخلياً صامتاً.`
                    : `${profileB.owner_name}'s underlying need for (${traitsB.birkman?.underlying_need || "freedom and empathy"}) feels cornered or invalidated.`
            },
            {
                type: "reaction",
                title: isAr ? `3. ردة الفعل الدفاعية: التراجع أو الاحتداد` : `3. The Defensive Reflex`,
                desc: isAr
                    ? `يفعل ${profileB.owner_name} نمط التوتر (${traitsB.birkman?.stress_trigger || "الانعزال أو المقاومة"})، مما يربك الطرف الآخر.`
                    : `${profileB.owner_name} activates the stress derailer (${traitsB.birkman?.stress_trigger || "withdrawal / quiet defiance"}).`
            },
            {
                type: "reaction",
                title: isAr ? `4. دورة التصعيد التفاعلي` : `4. The Escalation Loop`,
                desc: isAr
                    ? `يشعر ${profileA.owner_name} بعدم الاستجابة، فيرفع وتيرة الحزم، مما يعزز انغلاق الطرف الثاني.`
                    : `${profileA.owner_name} perceives the silence as disinterest and pushes harder, deepening the withdrawal.`
            },
            {
                type: "breaker",
                title: isAr ? `5. قاطع الدائرة وقاعدة التهدئة (Circuit Breaker)` : `5. The Circuit Breaker & Antidote`,
                desc: isAr
                    ? `التوقف فوراً لمدة 20 دقيقة مع التأكيد بالقول: "أنا أحترمك وأحبك، لنأخذ استراحة ونكمل بهدوء".`
                    : `Execute the 20-minute de-escalation timeout with emotional reassurance: "I value us; let's pause and resume calmly."`
            }
        ];

        const loopWrapper = document.createElement("div");
        loopWrapper.className = "conflict-loop-flow";

        loopSteps.forEach((step, idx) => {
            const card = document.createElement("div");
            card.className = "conflict-step-card";
            card.innerHTML = `
                <div class="conflict-step-num ${step.type}">${idx + 1}</div>
                <div class="conflict-step-body">
                    <h5>${step.title}</h5>
                    <p>${step.desc}</p>
                </div>
            `;
            loopWrapper.appendChild(card);
        });

        container.appendChild(loopWrapper);
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

        dataPoints.forEach(p => {
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", p.x.toFixed(1));
            circle.setAttribute("cy", p.y.toFixed(1));
            circle.setAttribute("r", "4.5");
            circle.setAttribute("fill", "var(--accent-color)");
            circle.setAttribute("stroke", "#ffffff");
            circle.setAttribute("stroke-width", "1.8");
            svg.appendChild(circle);
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
                        <span style="color: var(--text-tertiary); margin: 0 4px;">vs</span>
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
        fb.innerHTML = `<p class="p-container">${text}</p>`;
        
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
