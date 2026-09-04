# MatchWise Lite - Project Progress & Changelog

## Current Version: v2.6.0
**Release Name:** Consciousness & Vibrational Alignment (David Hawkins LoC & Abraham Hicks Emotional Guidance)  
**Date:** September 4, 2026  
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
