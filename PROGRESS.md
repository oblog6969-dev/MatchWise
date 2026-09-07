# MatchWise Lite - Project Progress & Changelog

## Current Version: v2.8.0
**Release Name:** Hartman Motive Spectrum Circle Chart Visualizer & Dynamic Focus/Shadow Interactivity  
**Date:** September 7, 2026  
**Status:** ✅ Production Ready & Fully Verified

---

## 📋 Milestone Tracker

| Milestone | Description | Status | Verification |
| :--- | :--- | :--- | :--- |
| **M1: Baseline Offline SPA** | Assessment flow, 70 questions, MBTI + Big Five calculations, dark/light theme, Arabic RTL. | ✅ Complete | Browser & Unit Tested |
| **M2: AI Integration** | DeepSeek Pro direct API & NVIDIA NIM support, adaptive question sequencing, qualitative AI report. | ✅ Complete | Automated & Browser Tested |
| **M3: 10 Behavioral Frameworks** | Unified polytomous scoring across 10 frameworks (Hartman, DISC, Birkman, FIRO-B, TKI, Gottman, Attachment, Schwartz). | ✅ Complete | Node psychometric test suite |
| **M4: Narrative Storytelling** | 5 Individual Chapters & 4 Dyadic Acts transforming raw data into an emotionally resonant story. | ✅ Complete | Browser Subagent Tested |
| **M5: Interactive Visualizations** | 7 Custom SVG visualizers (Donut, 2x2 Matrix, Iceberg, 2D Grid, Reciprocity Scales, Safety Gauge, Conflict Flowchart). | ✅ Complete | DOM & Visual Verification |
| **M6: Static Printing Engine** | On-screen print view toggle and clean `@media print` rules with chapter-based page breaks. | ✅ Complete | CSS Print Tested |
| **M7: Clinical Archetype Profiles** | Pre-seeded Tariq Al-Mansoor & Nour Al-Sabah profiles for immediate live testing without manual answering. | ✅ Complete | Full Dyadic Verification (67%) |
| **M8: Zero-Key AI & Bilingual Polish** | MatchWise Autonomous AI default (zero key required, unlimited requests) & seamless instant report language switching. | ✅ Complete | Browser & Node Tested |
| **M9: Global Google Translate** | Seamless 100+ language translation, defensive Node DOM crash prevention, notranslate badges, Apple-grade UI dropdown. | ✅ Complete | End-to-End Browser Tested |
| **M10: Consciousness & Resonance** | Hawkins Map of Consciousness (20-600+, 200 Courage threshold), Hicks 22-level Emotional Guidance, 10 polytomous questions (q76-q85), dual-ladder SVG visualizer, dyadic resonance. | ✅ Complete | Node & Browser Subagent Tested |
| **M11: Interactive Popovers & Print Fidelity** | Interactive JS visualizers with bilingual hover/touch popovers explaining every framework component; vector SVG print fidelity with zero popover artifacts. | ✅ Complete | Browser Subagent & Multi-Device Tested |
| **M12: Hartman Circle Chart & Dynamic Focus/Shadow** | Exact SVG donut arc paths (`<path d="...">`), direct slice percentages, dynamic center hub, interactive person focus/shadowing, and organized compact comparison micro-rows. | ✅ Complete | Visual Verification & Browser Tested |

---

## 🔬 Framework Implementation Matrix

| Framework | Implementation File | Key Metric Plotted | Visualization Type |
| :--- | :--- | :--- | :--- |
| **Hawkins Map of Consciousness** | `traits.js` / `compatibility.js` | Logarithmic score (20-600+), 200 Courage pivot, Force vs. Power | Calibrated Scale Spectrum with 200 Threshold Pin |
| **Hicks Emotional Guidance Scale** | `traits.js` / `compatibility.js` | 22 Emotional set-points (1 Joy to 22 Fear), Pivot Agility, Alignment | Vibrational Gradient Continuum Bar |
| **Hartman Color Code** | `traits.js` / `compatibility.js` | Red, Blue, White, Yellow motive breakdown | Interactive Multi-Color SVG Donut |
| **DISC Assessment** | `traits.js` / `compatibility.js` | Fast vs. Steady Pace, Task vs. People Focus | 2x2 Quadrant Cartesian Matrix with Tempo Bridge |
| **The Birkman Method** | `traits.js` / `compatibility.js` | Level 1: Usual Style, Level 2: Needs, Level 3: Stress | Tri-Layer Submerged Iceberg Cross-Section |
| **Adult Attachment (ECR)** | `traits.js` / `compatibility.js` | Attachment Anxiety vs. Avoidance Coordinates | 2D Continuous Coordinate Plane (4 Quadrants) |
| **FIRO-B Reciprocity** | `traits.js` / `compatibility.js` | Expressed Initiation vs. Wanted Reciprocity | Comparative Scale Bars (Control, Affection, Inclusion) |
| **Gottman Relationship House** | `traits.js` / `compatibility.js` | Emotional Safety Index & Four Horsemen Vulnerability | Radial Arc Gauge & Risk Threat Monitors |
| **TKI & Conflict Cycle** | `traits.js` / `compatibility.js` | 5 Conflict Modes & Demand-Withdrawal Escalation | 5-Step Interactive Conflict Cycle Flowchart |
| **Schwartz Basic Values** | `traits.js` / `compatibility.js` | Trans-situational values & Cultural worldview | Multivariable Radar Chart |
| **Big Five (OCEAN)** | `traits.js` / `compatibility.js` | Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism | Comparative Horizontal Bar Chart |
| **MBTI / Cognitive Functions** | `traits.js` / `compatibility.js` | 4 Dichotomies (E/I, S/N, T/F, J/P) | Archetype Badges & Analytical Matrix |

---

## 📝 Changelog (v2.5.0)

### Added
- **`demo_profiles.js`**: Calibrated clinical archetypes for Tariq Al-Mansoor (Executive Leader, Red/DC) and Nour Al-Sabah (Empathetic Harmonizer, Blue/SC).
- **`sample_tariq_almansoor.json` & `sample_nour_alsabah.json`**: Standalone JSON files for export, import, and offline sharing test cases.
- **Interactive SVG Visualizers**:
  - `renderHartmanDonut()`
  - `renderDiscQuadrantMap()`
  - `renderBirkmanIceberg()`
  - `renderAttachmentCoordinateMap()`
  - `renderFiroExchange()`
  - `renderGottmanSafetyGauge()`
  - `renderDyadicConflictLoop()`
- **Print Preview Toggle**: Added `#btnTogglePrintPreview` and `body.print-preview-active` stylesheet for instant on-screen print inspection.
- **One-Click Demo Loader**: Added `#btnLoadDemoProfiles` in Dashboard for instant testing.
- **`.gitignore`**: Excluded IDE metadata, cache directories, and local logs.

### Changed
- Refactored `#panelReport` into 5 narrative chapters for individual reports and 4 acts for dyadic comparisons.
- Enriched all 70 legacy questions in `questions.json` with multi-framework trait scores and appended 5 situational diagnostic questions (`q71` to `q75`).
- Updated `traits.js` to normalize Gottman Four Horsemen accumulation and scale Emotional Safety Index to 35-96%.
- Updated all version references to **v2.5**.

### Fixed
- Guarded all badge element references (`dom.mbtiBadgeA`, `dom.commBadgeA`, etc.) against missing DOM nodes in both single and comparison report views.
- Safeguarded `ai_service.js` for execution in Node.js automated test environments.
- Fixed report preview and comparison language switching by caching active profiles and re-rendering dynamically on language switch.
- Fixed hardcoded text alignments and borders across AI recommendations, conflict loops, and operating manuals to use logical start alignments.
- Fixed radar chart translation map to include all 12 dyadic categories in Arabic.
- Corrected ECR attachment coordinate calculation to inspect `traits.attachment` properly.
- Audited 100% of HTML `data-i18n` tags, resolving all missing keys in English and Arabic.
- Added dedicated `.fair-fighting-box` and `.fair-fighting-num` styles with complete RTL support.

---

## 📝 Changelog (v2.6.1) - Unified Arabic Report & Zero English Remnants
- **`utils.js`**: Added missing qualitative section keys to `TRANSLATIONS.ar` and `TRANSLATIONS.en` (`strengths`, `challenges`, `deal_breakers`, `discussion_topics`, `growth_opps`, `recommendations`, `import_code_title`, `import_code_btn`), resolving fallback to English headers in Arabic mode.
- **`compatibility.js`**: Added `SCHWARTZ_TRANSLATIONS` dictionary; translated Schwartz values interpolated into strength bullets (`(الأمان والاستقرار و الأصالة والتقاليد و الاستقلالية وحرية الاختيار)`) with proper closing parenthesis.
- **`index.html`**: Renamed duplicate overview DOM IDs in Chapter 1 grid to `mbtiOverviewA/B`, `hartmanOverviewA/B`, `discOverviewA/B`, `attachmentOverviewA/B`, ensuring full dynamic synchronization.
- **`traits.js`, `demo_profiles.js`, `sample_*.json`**: Removed English parentheticals `(Power)` and `(Force)` from Hawkins domain names in Arabic (`"القوة الروحية البنّاءة"` and `"القوة القسرية الضاغطة"`).
- **`script.js`**:
  - Added localized dictionaries: `ATTACHMENT_MAP`, `COMMUNICATION_MAP`, `CONFLICT_MAP`, `HARTMAN_MAP`, `BIRKMAN_NEED_MAP`, `BIRKMAN_STYLE_MAP`, `BIRKMAN_STRESS_MAP`.
  - Localized executive badges and Chapter 1 cards to render pure Arabic terms instead of uppercase English strings.
  - Stripped English model labels from Operating Manual (`(Birkman Usual)`, `(Underlying Needs)`, etc.) and localized Gottman Four Horsemen risk labels.
  - Localized Big Five "vs" separator to `"مقابل"`.
  - Added localized profile display names (`owner_name_ar`) for demo archetypes (طارق المنصور and نور الصباح).
- **`ai_service.js`**: Added comprehensive `AI_TRANSLATIONS` psychometric dictionary, localizing all autonomous single and dyadic AI consultation outputs into pure Arabic.

---

## 📝 Changelog (v2.7.0) - Interactive Visualizers & Touch Popovers with Vector Print Fidelity
- **`style.css`**:
  - Added `.chart-node`, `.chart-interactive-element`, hover scaling (`scale(1.04)`), and focus dimming (`opacity: 0.35` on siblings).
  - Implemented glassmorphic popover card (`.mw-chart-popup`) with dynamic colored badge, title, subtitle, descriptive body, metric, and close button (`.mw-popup-close`).
  - Added mobile tap backdrop (`.mw-chart-touch-backdrop`) for backdrop tap dismissal.
  - Added `@keyframes mwPulseRing` for pulsing coordinate indicators (`.pin-pulse-ring`).
  - Enforced strict `@media print` and `body.print-preview-active` rules hiding all popovers, backdrops, and pulse rings with `display: none !important; opacity: 0 !important; visibility: hidden !important;`, keeping 100% clean vector SVG graphics.
- **`script.js`**:
  - Implemented `CHART_EXPLANATION_DICTIONARY` containing rich clinical explanations for every segment across Hartman, DISC, Birkman, Attachment, FIRO-B, Gottman, Hawkins/Hicks, and Big Five in both Arabic and English.
  - Implemented `ChartTooltipManager` with real-time viewport boundary detection and collision clamping for both desktop hover and mobile/tablet touch.
  - Attached interactive tooltips to Hartman donut slices & hub, DISC quadrants & coordinate pins, Birkman iceberg tip & base cards, Attachment quadrants & partner points, FIRO-B reciprocity bars, Gottman emotional safety gauge & Four Horsemen bars, Dyadic Conflict Loop cards, Consciousness dual spectrum ladders, SVG Radar vertices, and Big Five rows.

---

## 📝 Changelog (v2.8.0) - Hartman Motive Spectrum Circle Chart Visualizer & Dynamic Focus/Shadow Interactivity

### Added
- **Exact SVG Arc Geometry (`describeDonutSlice`)**: Replaced deprecated stroke-dashoffset circle calculation with exact trigonometry-based SVG `<path d="M ... A ... L ... A ... Z">` arc geometry, eliminating Chromium `transform-origin` translation artifacts and guaranteeing pixel-perfect rendering across all screen densities.
- **Direct Percentage Badges on Slices**: Added embedded bold percentage labels placed along radial mid-angles on all slices $\ge 20^\circ$ with intelligent luminance-based fill colors for instant readability.
- **Dynamic Interactive Focus & Shadow Interactivity**:
  - Introduced interactive person filter buttons (`[Tariq Al-Mansoor]`, `[Nour Al-Sabah]`, `[Both / كلاهما]`) directly below the comparison donut.
  - Clicking a person's name isolates their concentric ring while gracefully shadowing the other person's ring to a 14% opacity desaturated silhouette.
  - Dynamic center hub spotlighting: toggling between Person A, Person B, or Both dynamically updates the center circular hub to show the active person's primary percentage, motive title, and fuel description with smooth CSS transitions.
- **Structured Comparison Micro-Rows**:
  - Completely reorganized the bottom motive comparison cards into sleek 3-column micro-rows (`[Short Name]` `[Progress Bar]` `[Percentage]`).
  - Switched from verbose full-name text strings to clean first names (`Tariq`, `Nour`), eliminating multi-line vertical wrapping and visual clutter.
  - Connected comparison card micro-rows to the dynamic focus state (`.row-focused` / `.row-shadowed`), highlighting the active partner's metrics in real time.

### Changed
- **Concentric Dual-Ring Comparison Architecture**:
  - Person A rendered on the outer ring ($r = 88\text{--}122\text{px}$).
  - Person B rendered on the inner ring ($r = 52\text{--}84\text{px}$).
  - Center hub ($r = 45\text{px}$) provides clear visual hierarchy and instant feedback on hover or selection.
- **Enhanced CSS Styling (`style.css`)**:
  - Added `.hartman-slice`, `.slice-shadowed`, `.slice-focused`, `.text-shadowed`, `.text-focused`.
  - Added `.hartman-ring-btn`, `.active-btn-a`, `.active-btn-b`, `.active-btn-both`, `.dimmed-btn`.
  - Added `.hartman-person-row` (`grid-template-columns: 52px 1fr 36px`), `.hartman-mini-desc`, and vertical padding on `.chart-center-wrapper`.
- **Script Cache Busting**: Updated script tag in `index.html` to `script.js?v=2.1` to ensure browsers load the updated visualizer instantly.

### Fixed
- **Dyadic AI Consultation Scope Resolution (`nameB`)**: Hoisted `nameB` to top of `generateAndRenderReport()` scope and localized catch error fallbacks, eliminating the runtime `ReferenceError: nameB is not defined` in conversational bridge scripts that previously triggered `.Failed to generate dyadic AI consultation`.
- **Variable Hoisting in Comparison Mode**: Resolved a scope issue in `renderHartmanDonut()` where Person B variables (`pctB`, `primaryColorB`, `primaryHexB`, `motiveNameB`) were block-scoped, ensuring `applyFocus("B")` updates the center hub cleanly to `46% Nour: Blue` without console errors.
- **Arabic / RTL Compatibility**: Full bidirectional support preserved with correct text anchors and RTL-compliant alignment in both single profile and dyadic comparison modes.
