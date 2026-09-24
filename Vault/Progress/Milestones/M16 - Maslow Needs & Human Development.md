---
title: "M16 - Maslow Needs & Human Development"
created: 2026-09-25
updated: 2026-09-25
type: milestone
status: complete
priority: high
progress: 100
tags:
  - project/matchwise
  - status/completed
  - type/milestone
  - psychology/maslow
  - psychology/kegan
  - dyadic/asymmetry
aliases:
  - M16
  - MaslowAndDevelopment
---

# 🔺 M16: Maslow's Hierarchy of Needs, Kegan Orders of Mind & Dyadic Asymmetry Engine

> [!check] Milestone Verification
> **Completed:** September 25, 2026  
> **Status:** Production Ready & Verified (v3.0.0)  
> **Tested In:** Node.js v24 (`test_suite.js`), Automated Browser Verification Session (`localhost:8089`), Interactive Popovers & Static Print View

Upstream Link: [[00 - Progress Dashboard]]  
Core Code: `traits.js`, `compatibility.js`, `questions.json`, `questions_data.js`, `index.html`, `script.js`, `utils.js`, `demo_profiles.js`, `test_suite.js`

---

## 🎯 Objective
Integrate **Abraham Maslow's Hierarchy of Needs** (Somatic, Safety, Belonging, Esteem, Actualization, Transcendence) mapped onto foundational **Human Development Frameworks** (Robert Kegan’s Orders of Consciousness & Murray Bowen's Differentiation of Self). The goal is to define, measure, and visualize the structural differences in core needs and developmental maturity between two potential partners, predicting relationship friction tripwires, stress regression depths, and growth synergies.

---

## 🔑 Deliverables & Technical Architecture

### 1. Question Bank Upgrades (`q1` – `q95`)
* **Anchor Question Enhancements**: Enhanced existing questions `q29` (Future Planning & Financial Horizons), `q71` (Fundamental Home Atmosphere), and `q75` (Tradition vs. Individuality) with `maslow_*`, `kegan_stage`, and `differentiation_level` polytomous scoring tags.
* **10 New Dedicated Clinical Scenarios (`q86` to `q95`)**: Polytomously scored under the category `"Needs Hierarchy & Human Development"` (`"هرم الاحتياجات والارتقاء الإنساني"`):
  1. `q86` (Safety vs. Growth Horizon): The Anchor vs. The Explorer (Calculated venture risk vs. domestic security).
  2. `q87` (Relational Intimacy): Kegan Stage 3 Fusion ("we think as one") vs. Kegan Stage 4 Sovereignty ("two differentiated wholes").
  3. `q88` (Esteem/Status vs. Meaning): External executive prestige vs. authentic self-actualization.
  4. `q89` (Stress Regression & Holding): Somatic holding and grounding when a partner drops into survival panic.
  5. `q90` (Somatic Nervous System Homeostasis): Honoring biological rhythms and sensory downtime vs. adrenal burnout.
  6. `q91` (The Relational Contract): Transactional sanctuary vs. evolutionary growth crucible.
  7. `q92` (Generativity & Legacy): Erikson generativity, mentorship, and multi-generational impact.
  8. `q93` (Need Articulation vs. Armor): Clean vulnerability disclosure vs. passive hints vs. avoidant armor.
  9. `q94` (Cognitive Metaneeds & Meaning): Philosophical/existential depth vs. domestic pragmatism.
  10. `q95` (Conflict Transcendence): Dismantling ego illusions in service of deeper truth vs. defensive score-keeping.

### 2. Psychometric Calculation Engine (`traits.js`)
* **Maslow Accumulator & Normalized Spectrum**:
  - Accumulates across 6 tiers: `somatic`, `safety`, `belonging`, `esteem`, `actualization`, `transcendence` normalized to 100%.
  - Identifies the primary **Center of Gravity** (`primary_need`) with bilingual labels.
  - Computes the **Deficiency Needs (D-Needs)** vs. **Growth Needs (B-Needs)** ratio and orientation (*Deficiency Anchored*, *Growth Driven*, or *Balanced Integrative*).
* **Developmental Consciousness & Differentiation**:
  - Computes continuous **Kegan Order of Mind** ($2.0 \le K \le 5.0$) mapped across Stages 2 (Instrumental), 3 (Socialized), 3-to-4 Bridge, 4 (Self-Authoring), and 5 (Self-Transforming).
  - Computes **Bowen Differentiation of Self Index** ($1.0 \le D \le 5.0$).
* Returns `maslow_profile` and `developmental_profile` in `calculate()`.

### 3. Dyadic Asymmetry & Compatibility Engine (`compatibility.js`)
* Calculates tier overlap score and developmental stage distance ($\Delta K$).
* Evaluates 5 **Dyadic Asymmetry Archetypes**:
  1. **The Anchor & The Explorer** (*رابط الأمان والمستكشف*): D-Need stability grounding paired with B-Need creative growth.
  2. **The Fusionist & The Sovereign** (*التوأمة الاندماجية والشراكة المستقلة*): Stage 3 relational enmeshment vs. Stage 4 differentiation.
  3. **Mutual Self-Actualizing Crucible** (*محراب الارتقاء المشترك والنمو الذاتي*): Shared Stage 4+ sovereignty and high B-Needs.
  4. **Dual Deficiency Stability Lock** (*التحالف الوقائي والاستقرار العملي*): Shared conservative focus on financial and domestic safety.
  5. **Complementary Mastery & Legacy** (*التكامل الإنجازي وبناء الأثر*): Harmonious esteem and generativity.
* Generates tailored strengths, tripwires, discussion topics, and growth opportunities.

### 4. Interactive SVG Visualizer & UI Representation (`index.html`, `style.css`, `script.js`)
* **Executive Overview Table**: Added badges for **Primary Need (Maslow)** and **Consciousness Order (Kegan)**.
* **Chapter 5 Visualizer (`#maslowPyramidContainer`)**:
  - **6-Tier Stacked Pyramid**: Color-coded trapezoids with percentage shares, Center-of-Gravity indicator pins, and D-Need/B-Need brackets.
  - **Kegan Consciousness Continuum**: Horizontal gradient track from Stage 2.0 to 5.0 with plotted pins for Partner A and Partner B.
  - **Interactive Popover Cards**: Clicking or hovering any tier or track displays psychological meanings and comparative stats via `ChartTooltipManager`.
* **Bilingual Localization**: Added complete English and Arabic keys in `utils.js` and `script.js`.

### 5. Calibrated Demo Profiles (`demo_profiles.js`)
* Seeded answers for `q86`–`q95` for **Tariq Al-Mansoor** (Executive Leader: Esteem / Mastery Center of Gravity, Kegan Stage 4: Self-Authoring Mind) and **Nour Al-Sabah** (Empathetic Harmonizer: Love & Belonging Center of Gravity, Kegan Stage 4: Self-Authoring Mind).
* Dyadic dynamic evaluates to **The Anchor & The Explorer**.

---

## 🧪 Verification & Automated Testing
* **Node.js Automated Test Suite (`test_suite.js`)**:
  - Validated that 6 Maslow tiers sum to 100%.
  - Validated D-Need + B-Need sum to 100%.
  - Verified Kegan bounds $[2.0, 5.0]$ and Differentiation bounds $[1.0, 5.0]$.
  - Verified Dyadic Needs Dynamics categorization.
  - Passed **10/10 automated tests**.
* **Browser Automated Verification**:
  - Verified landing page, demo profile loader, executive badges, and Chapter 5 visualizer.
  - Interactive tooltips confirmed functional with zero console errors.
