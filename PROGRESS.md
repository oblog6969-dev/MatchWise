# MatchWise Lite - Project Progress & Changelog

## Current Version: v3.1.0
**Release Name:** Maslow 18 Major Segments & Creative Multi-Perspective Visualizer  
**Date:** September 26, 2026  
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
| **M13: AI Educational Guidance** | Multi-stage AI educational tips (landing readiness, in-test reflection angles with dynamic re-clarification, and single/dyadic report reading guides), Gemini 3.8 Flash support, caching, and user preference toggle. | ✅ Complete | Browser Subagent & End-to-End Tested |
| **M15: Production Hardening & Test Suite** | Stored XSS eradication, schema validation, demo button export, AI offline fallback, and zero-dependency Node test suite. | ✅ Complete | Node 10/10 Tests Passed & Browser Verified |
| **M16: Maslow Needs & Human Development** | Maslow 6-tier hierarchy (Somatic, Safety, Belonging, Esteem, Actualization, Transcendence), Kegan Orders of Mind (Stages 2-5), Bowen Differentiation, 10 new scenario questions (q86-q95), dual pyramid & continuum SVG visualizer, and dyadic asymmetry archetypes. | ✅ Complete | Node 10/10 Tests Passed & Browser Verified |


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
| **Maslow Hierarchy of Needs** | `traits.js` / `compatibility.js` | 6 Tiers (Somatic to Transcendence), D-Need vs. B-Need Ratio, Center of Gravity | Dual-Pyramid Tiered Stack with Overlap Gauge |
| **Kegan Orders of Mind & Bowen** | `traits.js` / `compatibility.js` | Continuous Orders (Stage 2 to 5), Bowen Differentiation Index (1 to 5) | Developmental Gradient Continuum Track & Pins |

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

---

## 📝 Changelog (v2.9.0) - AI Educational Guidance System

### Added
- **Multi-Stage Contextual Guidance**:
  - **Landing Page Readiness Card (`#landingInstructionContainer`)**: Guides test takers to approach questions from spontaneous everyday reality rather than idealized expectations.
  - **In-Test Psychological Reflection Angle (`#questionInstructionContainer`)**: Injects contextual reflection guidance above question cards based on current question category and frameworks.
  - **Interactive Clarification Button (`#btnClarifyTip`)**: Allows users to re-prompt the AI for alternative angles of reflection if a question feels ambiguous.
  - **Dossier Reading Guides (`#reportInstructionContainer`)**: Educational guidance cards for both individual profiles (interpreting core motives and stress baseline) and dyadic comparisons (interpreting differences as complementary strengths and using bridge scripts).
- **Core AI Service Enhancements (`ai_service.js`)**:
  - Added `generateInstruction(context, language)` supporting Gemini 3.8 Flash / 1.5 Flash, DeepSeek, Groq, OpenAI, and autonomous offline clinical fallbacks.
  - Added persistent `localStorage` caching (`instruction_${context}_${language}`) preventing duplicate network calls.
- **User Preference Control**:
  - Added `🎓 AI Educational Guidance` toggle (`#inputAiGuidanceToggle`) in MatchWise AI Settings modal with `localStorage` persistence (`mw_ai_guide_enabled`).
- **Glassmorphic Styling (`style.css`)**:
  - Added `.ai-instruction-box`, `.landing-guide`, `.in-test-guide`, `.report-guide`, `.ai-instruction-icon`, `.ai-instruction-title`, `.ai-instruction-text`, `.ai-instruction-refresh-btn`, and `@keyframes fadeInInstruction`.

---

## 📝 Changelog (v2.9.1) - Production Security Hardening, Audit Remediation & Test Suite

### Security & Integrity
- **Stored XSS Elimination**: Refactored profile card rendering in `script.js` to create DOM elements safely using `createElement` and `.textContent`, eliminating `innerHTML` interpolation of user-supplied fields (`owner_name`, `created_at`, `owner_name_ar`).
- **Profile Schema Validation & Sanitization**: Added `Cryptography.validateAndSanitizeProfile()` in `utils.js` to strip HTML/script tags, control characters, and validate answers and demographics before saving or importing JSON or `MWCODE-` shareable strings.
- **Content Security Policy (CSP)**: Added `<meta http-equiv="Content-Security-Policy">` in `index.html` to prevent execution of unauthorized inline scripts.

### Fixed
- **Live Demo Profiles Activation**: Exported `DEMO_PROFILES` to `window.DEMO_PROFILES` and `globalThis.DEMO_PROFILES` in `demo_profiles.js`. The headline "Load Live Demo Profiles" button now works immediately in production.
- **AI Guidance Fallback (`generateInstruction`)**: Built a curated static dictionary (`BUILTIN_INSTRUCTIONS`) in `ai_service.js` for offline/builtin mode. Stopped caching failed API responses into `localStorage`, namespaced cache keys, and added startup auto-purging of legacy generic placeholders.

### Psychometrics & Legal Compliance
- **Couples Exploration Positioning**: Added a visible disclaimer badge on the landing page (*"🛡️ Educational & Self-Reflection Tool for Couples — Not a Clinical Diagnostic Instrument"*), and softened over-claimed clinical terminology in the UI.
- **Honest Confidence & Compatibility Clamping**: Adjusted `assessment_confidence` lower bound from an artificial 65% to 15% in `traits.js`, and lowered the compatibility index clamp floor from 30% to 10% in `compatibility.js` so low-completeness and severe incompatibilities are accurately reported.
- **Trademark Attribution Footnotes**: Added formal attribution footnotes for MBTI®, DISC®, The Birkman Method®, FIRO-B®, and Thomas-Kilmann (TKI)® in `index.html` and `utils.js`.

### Performance & Accessibility
- **Network Double-Load Removal**: Bypassed redundant network fetching of `questions.json` when questions are already loaded synchronously via `questions_data.js`, saving ~122KB per page load.
- **Scoped Google Translate DOM Safety Patch**: Restricted `removeChild` / `insertBefore` error suppression in `index.html` and `utils.js` to active Google Translate sessions only.
- **CDN Optimization**: Removed unused Chart.js (69KB) from `index.html` in favor of the custom responsive SVG radar chart, and added SRI hashes (`integrity`) to `jspdf` and `html2canvas`.
- **Accessibility & SEO**: Added `aria-label` to `#languageSelector` and `#profileCodeInput`, `aria-live="polite"` to `#questionCard`, `role="radiogroup"` / `role="radio"` / `aria-checked` to assessment options, inline SVG favicon, and Open Graph / Twitter card tags.
- **Privacy Protection**: Updated `.gitignore` to prevent committing personal exported assessment JSON files.

### Added
- **Automated Smoke Test Suite (`test_suite.js`)**: Added zero-dependency Node.js test script verifying 10 critical test vectors across exports, XSS sanitization, schema validation, psychometrics, compatibility, and offline AI fallbacks. Verified 10/10 tests pass.

## 📝 Changelog (v3.1.0) - Maslow 18 Major Segments & Creative Multi-Perspective Visualizer

### 18 Major Segments Architecture (`traits.js`)
- Deconstructed all 6 tiers of Maslow's hierarchy into 3 clinically grounded sub-segments each (18 total):
  1. **Self-Transcendence (Apex)**: *Transpersonal Mission & Generational Legacy*, *Altruism & Generative Compassion*, *Spiritual Unity & Sacred Meaning*.
  2. **Self-Actualization**: *Authenticity & Core Values Alignment*, *Creative Potential & Intellectual Expansion*, *Personal Sovereignty & Autonomous Freedom*.
  3. **Esteem & Mastery**: *Self-Worth, Dignity & Inner Sovereignty*, *Competence, Mastery & Achievement*, *Mutual Admiration & Partner Validation*.
  4. **Love & Belonging**: *Deep Emotional Intimacy & Attunement*, *Unconditional Acceptance & Tender Warmth*, *Companionship & Connection Rituals*.
  5. **Safety & Security**: *Financial Predictability & Resource Prudence*, *Emotional Safety & Non-Threatening Space*, *Domestic Order & External Boundary Clarity*.
  6. **Somatic Homeostasis**: *Rest, Sleep & Somatic Recovery*, *Nervous System Grounding & De-escalation*, *Vitality, Pacing & Sensory Ease*.
- Integrated psychometric algorithms evaluating each segment (0-100%) dynamically derived from OCEAN traits, emotional intelligence, attachment style, differentiation of self, and Kegan stages.
- Added comprehensive bilingual descriptions, relational impact dynamics, and actionable couple practices for every segment.

### Multi-Perspective Creative Graphics & UX (`script.js`, `style.css`, `utils.js`)
- **Tri-Perspective Switcher**:
  - **🏛️ Pyramid Spectrum**: Redesigned SVG pyramid featuring mini segment cells inside each tier, widened apex layout eliminating text overlap, and side-anchored partner share badges.
  - **🧩 Segment Matrix (18 Pillars)**: Side-by-side comparative dashboard displaying all 18 segments with dual partner meters and synergy classifications.
  - **💡 Dyadic Growth Compass**: Practical relationship blueprint offering tailored instructions to nourish each partner's primary need, along with weekly check-in synthesis accords.
- **Dynamic Segment Inspector Panel**: Interactive tier selector chips and detailed segment cards displaying dyadic synergy badges (*Synergistic Alignment*, *Complementary Balance*, *Active Growth Area*), comparative score bars, and actionable couple practices.
- **Full Bilingual RTL Parity**: Seamless right-to-left layout and localized terminology for both English and Arabic.

---

## 📝 Changelog (v3.0.0) - Maslow Hierarchy of Needs, Kegan Orders of Mind & Dyadic Asymmetry Engine

### Psychometrics & Development Engines (`traits.js`, `compatibility.js`)
- **Maslow 6-Tier Hierarchy**: Polytomous accumulation across Somatic, Safety, Belonging, Esteem/Mastery, Self-Actualization, and Self-Transcendence, normalized strictly to 100%.
- **Needs Center of Gravity**: Identifies the primary dominant motivational tier for each partner with localized psychological definitions.
- **D-Need vs. B-Need Dynamics**: Quantifies Deficiency Needs (Somatic, Safety, Belonging, Esteem) vs. Being/Growth Needs (Self-Actualization, Self-Transcendence) and categorizes orientation.
- **Robert Kegan's Orders of Mind**: Computes continuous cognitive developmental maturity ($2.0 \le K \le 5.0$) across Stage 2 (Instrumental), Stage 3 (Socialized), Stage 4 (Self-Authoring), and Stage 5 (Self-Transforming).
- **Murray Bowen Differentiation of Self**: Measures emotional reactivity vs. autonomous solid self ($1.0 \le D \le 5.0$).
- **5 Dyadic Asymmetry Archetypes**:
  1. *The Anchor & The Explorer* (Complementary stability grounding paired with creative venture growth).
  2. *The Fusionist & The Sovereign* (Stage 3 relational fusion vs. Stage 4 autonomous differentiation).
  3. *Mutual Self-Actualizing Crucible* (Shared Stage 4+ sovereignty and high B-Need growth).
  4. *Dual Deficiency Stability Lock* (Shared conservative focus on financial and domestic security).
  5. *Complementary Mastery & Legacy* (Harmonious executive esteem and intergenerational generativity).
- **Category Compatibility Score**: Added `"Needs & Human Development"` category score and `multi_framework_dynamics.needs_dynamics` dyadic profile.

### Question Bank Expansion (`questions.json`, `questions_data.js`)
- **10 New Scenario Questions (`q86`–`q95`)**: Polytomous clinical scenarios covering risk horizons, relational intimacy, prestige vs. meaning, somatic holding in stress, nervous system homeostasis, relational contract paradigms, generativity & legacy, clean vulnerability disclosure, cognitive metaneeds, and conflict transcendence.
- **Enhanced Anchor Questions**: Enriched `q29`, `q71`, and `q75` with Maslow, Kegan, and Bowen scoring dimensions.
- Total question bank expanded from 86 to 96 questions.

### Interactive SVG Visualizers & UI Integration (`index.html`, `script.js`, `style.css`)
- **Chapter 5 Dual-Pyramid Visualizer**: 6-tier color-coded stacked SVG pyramid featuring percentage shares, Center-of-Gravity badges, and D-Need/B-Need brackets.
- **Kegan Developmental Continuum Track**: Horizontal gradient spectrum bar plotting Partner A and Partner B across Stages 2 through 5.
- **Executive Overview Badges**: Added real-time badges for Maslow Center of Gravity and Kegan Order of Mind for both partners in the report header.
- **Interactive Bilingual Tooltips**: Integrated with `ChartTooltipManager` providing clinical interpretations and comparison stats on hover and mobile touch.

### Test Profiles & Quality Assurance (`demo_profiles.js`, `sample_*.json`, `test_suite.js`)
- Seeded calibrated responses for Tariq Al-Mansoor (Esteem Center of Gravity, Kegan Stage 4) and Nour Al-Sabah (Belonging Center of Gravity, Kegan Stage 4), evaluating dyadically to *The Anchor & The Explorer*.
- Expanded `test_suite.js` to validate Maslow normalization, D/B need ratios, Kegan/Bowen bounds, and dyadic asymmetry outputs (10/10 automated tests passing).

