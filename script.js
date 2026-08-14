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
        }
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
        btnGoToDashboard: document.getElementById("btnGoToDashboard"),
        btnHomeFromDashboard: document.getElementById("btnHomeFromDashboard"),
        btnDashboardFromReport: document.getElementById("btnDashboardFromReport"),
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
    dom.languageSelector.addEventListener("change", (e) => {
        state.localization.setLanguage(e.target.value);
        if (state.currentPanel === "panelAssessment") {
            renderCurrentQuestion();
        } else if (state.currentPanel === "panelDashboard") {
            renderSavedProfiles();
        }
    });

    dom.themeToggleBtn.addEventListener("click", () => {
        state.themeManager.toggleTheme();
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

    dom.btnGoToDashboard.addEventListener("click", () => {
        navigateTo("panelDashboard");
        renderSavedProfiles();
    });

    dom.btnHomeFromDashboard.addEventListener("click", () => navigateTo("panelHome"));
    dom.btnDashboardFromReport.addEventListener("click", () => navigateTo("panelDashboard"));

    dom.btnPrintReport.addEventListener("click", () => {
        window.print();
    });

    // --- 6. ADAPTIVE QUESTION ENGINE ---
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

        // Update translations & metadata
        dom.questionCategory.textContent = q.category;

        // Progress Calculation
        // Estimate progress based on current history length vs 55 target questions
        const currentLength = history.length;
        const progressPercentage = Math.min(98, Math.round((currentLength / 55) * 100));
        dom.progressPercent.textContent = `${progressPercentage}%`;
        dom.progressBarFill.style.width = `${progressPercentage}%`;

        // Bilingual Text Support
        const localizedText = state.localization.currentLang === "ar" ? q.arabic.text : q.english.text;
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

        // Adjust Next Button text dynamically at end of test (usually above 45 questions)
        const hasNext = getNextQuestionId(currentQId);
        if (!hasNext && currentLength >= 45) {
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

    dom.btnNextQuestion.addEventListener("click", () => {
        const history = state.assessmentSession.history;
        const currentQId = history[history.length - 1];

        // Ensure user answered before going forward
        if (state.sessionAnswers[currentQId] === undefined) {
            alert("Please answer the current question to proceed.");
            return;
        }

        const nextQId = getNextQuestionId(currentQId);

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
            app_version: "v1.2",
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
        const saved = window.Storage.getProfiles();

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
                    dom.btnCompareText.textContent = "Compare / View Selected";
                }
            });

            const meta = document.createElement("div");
            meta.className = "profile-meta-info";
            meta.innerHTML = `
                <h4>${p.owner_name}</h4>
                <p>${state.localization.get("created_at")}: ${p.created_at} • MBTI: ${p.calculated_personality.mbti.type}</p>
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

            // Render Badges
            dom.mbtiBadgeA.textContent = traitsA.mbti.type;
            dom.attachmentBadgeA.textContent = traitsA.attachment.primary.toUpperCase();
            dom.commBadgeA.textContent = traitsA.communication.primary.toUpperCase();
            dom.conflictBadgeA.textContent = traitsA.conflict.primary.toUpperCase();

            // Big Five rendering (just pass A for both to render single)
            renderBigFiveBarCharts(traitsA.big_five, traitsA.big_five, true);

            // Lists
            dom.reportStrengthsList.innerHTML = "";
            const sampleStrengths = [
                { en: `High emotional self-awareness using an adaptable ${traitsA.communication.primary} communication style.`, ar: `وعي ذاتي عاطفي مرتفع باستخدام أسلوب تواصل مرن.` },
                { en: `Understands personal needs and can formulate firm boundaries to avoid burnouts.`, ar: `يفهم الاحتياجات الشخصية ويمكنه صياغة حدود حاسمة لتجنب الإرهاق.` },
                { en: `Personal self-presentation values matches individual expectation by 100%.`, ar: `تتوافق قيم مظهرك وهندامك مع تفضيلاتك بنسبة 100%.` }
            ];
            sampleStrengths.forEach(item => {
                const li = document.createElement("li");
                li.textContent = isAr ? item.ar : item.en;
                dom.reportStrengthsList.appendChild(li);
            });

            dom.reportChallengesList.innerHTML = "";
            const sampleChallenges = [
                { en: `Operating under high pressure might stress the underlying ${traitsA.attachment.primary} attachment tendency.`, ar: `قد يؤدي العمل تحت ضغط مرتفع إلى إجهاد نزعة الارتباط العاطفي لديك.` }
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

            dom.radarChartTitle.textContent = isAr ? "مؤشر التوافق متعدد الأبعاد" : "Multivariable Compatibility Index";
            dom.barChartTitle.textContent = isAr ? "محاذاة السمات الخمس الكبرى" : "Big Five / Temperament Alignment";

            const report = window.CompatibilityEngine.compare(profileA, profileB);

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

            // Render Badges
            dom.mbtiBadgeA.textContent = profileA.calculated_personality.mbti.type;
            dom.mbtiBadgeB.textContent = profileB.calculated_personality.mbti.type;
            dom.attachmentBadgeA.textContent = profileA.calculated_personality.attachment.primary.toUpperCase();
            dom.attachmentBadgeB.textContent = profileB.calculated_personality.attachment.primary.toUpperCase();
            dom.commBadgeA.textContent = profileA.calculated_personality.communication.primary.toUpperCase();
            dom.commBadgeB.textContent = profileB.calculated_personality.communication.primary.toUpperCase();
            dom.conflictBadgeA.textContent = profileA.calculated_personality.conflict.primary.toUpperCase();
            dom.conflictBadgeB.textContent = profileB.calculated_personality.conflict.primary.toUpperCase();

            // Render Custom SVG Radar Chart
            renderSVGRadarChart(report.category_scores);

            // Render Custom SVG Bar Charts (Big Five OCEAN differences)
            renderBigFiveBarCharts(profileA.calculated_personality.big_five, profileB.calculated_personality.big_five, false);

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
    }

    // --- 10. LIGHTWEIGHT CUSTOM SVG GRAPHICS ---
    function renderSVGRadarChart(categoryScores) {
        dom.radarChartContainer.innerHTML = "";

        const width = 280;
        const height = 280;
        const center = 140;
        const maxRadius = 100;

        const categories = Object.keys(categoryScores);
        const numAxes = categories.length;

        // Create root SVG element
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

        // Draw background Concentric Hexagons (Grid levels of 25%, 50%, 75%, 100%)
        const gridLevels = [0.25, 0.5, 0.75, 1.0];
        gridLevels.forEach(lvl => {
            const points = [];
            for (let i = 0; i < numAxes; i++) {
                const angle = (i * 2 * Math.PI) / numAxes - Math.PI / 2;
                const r = maxRadius * lvl;
                const x = center + r * Math.cos(angle);
                const y = center + r * Math.sin(angle);
                points.push(`${x},${y}`);
            }
            const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            polygon.setAttribute("points", points.join(" "));
            polygon.setAttribute("class", "radar-grid");
            polygon.setAttribute("fill", "none");
            svg.appendChild(polygon);
        });

        // Draw Axes & Labels
        const dataPoints = [];
        categories.forEach((cat, idx) => {
            const angle = (idx * 2 * Math.PI) / numAxes - Math.PI / 2;

            // Axis line
            const axX = center + maxRadius * Math.cos(angle);
            const axY = center + maxRadius * Math.sin(angle);
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", center);
            line.setAttribute("y1", center);
            line.setAttribute("x2", axX);
            line.setAttribute("y2", axY);
            line.setAttribute("class", "radar-axis");
            svg.appendChild(line);

            // Label text
            const labelDist = maxRadius + 22;
            const textX = center + labelDist * Math.cos(angle);
            const textY = center + labelDist * Math.sin(angle) + 4; // slight vertical adjust
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", textX);
            text.setAttribute("y", textY);
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("class", "radar-label");
            text.textContent = cat;
            svg.appendChild(text);

            // Compute data point position
            const valueRatio = categoryScores[cat] / 100;
            const dataR = maxRadius * valueRatio;
            const dataX = center + dataR * Math.cos(angle);
            const dataY = center + dataR * Math.sin(angle);
            dataPoints.push(`${dataX},${dataY}`);
        });

        // Draw shaded data area polygon
        const areaPoly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        areaPoly.setAttribute("points", dataPoints.join(" "));
        areaPoly.setAttribute("class", "radar-area");
        svg.appendChild(areaPoly);

        dom.radarChartContainer.appendChild(svg);
    }

    function renderBigFiveBarCharts(oceanA, oceanB, isSingle = false) {
        dom.bigFiveBarChartContainer.innerHTML = "";
        const traits = Object.keys(oceanA);

        traits.forEach(trait => {
            const scoreA = oceanA[trait];
            const scoreB = oceanB[trait];

            const row = document.createElement("div");
            row.className = "bar-chart-row";

            const labelInfo = document.createElement("div");
            labelInfo.className = "bar-label-info";
            if (isSingle) {
                labelInfo.innerHTML = `
                    <span style="text-transform: capitalize; font-weight: 700;">${trait}</span>
                    <span>${scoreA}%</span>
                `;
            } else {
                labelInfo.innerHTML = `
                    <span style="text-transform: capitalize; font-weight: 700;">${trait}</span>
                    <span>${scoreA}% vs ${scoreB}%</span>
                `;
            }

            const track = document.createElement("div");
            track.className = "bar-track";
            track.style.position = "relative";

            // Person A colored line
            const fillA = document.createElement("div");
            fillA.className = "bar-fill";
            fillA.style.width = `${scoreA}%`;
            fillA.style.backgroundColor = "var(--success)";
            if (isSingle) {
                fillA.style.height = "100%";
            } else {
                fillA.style.height = "50%";
            }
            track.appendChild(fillA);

            if (!isSingle) {
                // Person B colored line
                const fillB = document.createElement("div");
                fillB.className = "bar-fill";
                fillB.style.width = `${scoreB}%`;
                fillB.style.backgroundColor = "var(--warning)";
                fillB.style.height = "50%";
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
