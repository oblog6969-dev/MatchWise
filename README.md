# MatchWise Lite v3.0.0

**MatchWise Lite v3.0.0** is a production-quality, offline relationship compatibility assessment tool and dyadic psychological consultation platform. It runs entirely inside the browser without requiring any mandatory backend, database, or login, with native English & Arabic localization, Google Website Translator (100+ languages), and optional AI consultation powered by **DeepSeek Pro**, **NVIDIA NIM**, **Google Gemini 3.8 Flash**, and Autonomous AI.

---

## 🌟 What's New in v3.0.0: Maslow's Hierarchy of Needs & Human Development Frameworks

### 1. Abraham Maslow's Hierarchy of Needs (6-Tier Spectrum)
- **6-Tier Accumulation & Normalization**: Measures energetic distribution across **Somatic/Physiological**, **Safety/Stability**, **Love & Belonging**, **Esteem & Mastery**, **Self-Actualization**, and **Self-Transcendence**, normalized strictly to 100%.
- **Primary Center of Gravity**: Identifies the primary dominant motivational tier driving each individual's life decisions, security baseline, and relational expectations.
- **Deficiency Needs (D-Needs) vs. Being Needs (B-Needs)**: Explicit mathematical tracking of physiological/safety/belonging/esteem foundation vs. actualization and transcendence, categorizing orientation (*Deficiency Anchored*, *Growth Driven*, or *Balanced Integrative*).

### 2. Robert Kegan's Orders of Mind & Murray Bowen Differentiation
- **Continuous Kegan Orders ($2.0 \le K \le 5.0$)**: Measures cognitive developmental maturity across:
  - *Stage 2: Instrumental Mind* (Self-interest and immediate reciprocity).
  - *Stage 3: Socialized Mind* (Identity derived from relationship, internalized norms, and group consensus).
  - *Stage 4: Self-Authoring Mind* (Autonomous internal compass, self-definition, and distinct value systems).
  - *Stage 5: Self-Transforming Mind* (Fluid self-conception, holding paradoxes, and inter-systemic awareness).
- **Murray Bowen Differentiation of Self ($1.0 \le D \le 5.0$)**: Evaluates the capacity to maintain a calm, solid self and make reasoned choices without emotional fusion or reactive avoidance during dyadic anxiety.

### 3. 5 Dyadic Developmental Asymmetry Archetypes
Automated clinical categorization evaluating the developmental distance ($\Delta K$) and need spectrum overlap:
1. **The Anchor & The Explorer** (*رابط الأمان والمستكشف*): One partner provides stabilizing grounding and domestic order (D-Needs / Stage 3–4), while the other ventures into creative expansion and growth horizons (B-Needs / Stage 4+).
2. **The Fusionist & The Sovereign** (*التوأمة الاندماجية والشراكة المستقلة*): One partner experiences connection through shared consensus and enmeshment (Stage 3), while the other requires autonomous self-definition (Stage 4).
3. **Mutual Self-Actualizing Crucible** (*محراب الارتقاء المشترك والنمو الذاتي*): Both partners operate from high differentiation and growth metaneeds, viewing relationship as an evolutionary growth vehicle.
4. **Dual Deficiency Stability Lock** (*التحالف الوقائي والاستقرار العملي*): Shared conservative focus on financial and domestic safety, providing exceptional crisis durability with potential risk of stagnation.
5. **Complementary Mastery & Legacy** (*التكامل الإنجازي وبناء الأثر*): Harmonious partnership uniting professional mastery, social esteem, and intergenerational generativity.

### 4. 10 Deep Polytomous Scenario Questions (`q86`–`q95`)
Realistic relational scenarios covering:
- `q86`: The Anchor vs. The Explorer (Calculated venture risk vs. domestic security).
- `q87`: Relational Intimacy (Kegan Stage 3 Fusion vs. Kegan Stage 4 Sovereignty).
- `q88`: Esteem/Status vs. Meaning (External executive prestige vs. authentic self-actualization).
- `q89`: Stress Regression & Holding (Somatic grounding when a partner drops into survival panic).
- `q90`: Somatic Nervous System Homeostasis (Honoring biological downtime vs. adrenal burnout).
- `q91`: The Relational Contract (Transactional sanctuary vs. evolutionary growth crucible).
- `q92`: Generativity & Legacy (Erikson generativity and multi-generational impact).
- `q93`: Need Articulation vs. Armor (Clean vulnerability disclosure vs. passive hints vs. avoidant armor).
- `q94`: Cognitive Metaneeds & Meaning (Philosophical/existential depth vs. domestic pragmatism).
- `q95`: Conflict Transcendence (Dismantling ego illusions in service of deeper truth vs. score-keeping).
Total diagnostic question bank: **96 comprehensive questions**.

### 5. Interactive Dual-Pyramid SVG Visualizer (Chapter 5)
- **6-Tier Stacked Pyramid**: Color-coded SVG trapezoids displaying percentage shares, Center-of-Gravity pins, and D-Need/B-Need brackets.
- **Kegan Consciousness Continuum**: Gradient spectrum track from Stage 2.0 to 5.0 with plotted pins for Partner A and Partner B.
- **Interactive Tooltip Popovers**: Bilingual clinical explanations via `ChartTooltipManager` on desktop hover and mobile touch.
- **Executive Badges**: Instant summary badges for Maslow Center of Gravity and Kegan Order of Mind in the report header.

---

## 🌟 Previous Highlights

### AI Educational Guidance System (v2.9.0)
- **Landing Page Clinical Readiness Tip**: Guides users to answer from spontaneous reality to maximize assessment diagnostic fidelity.
- **In-Test Psychological Reflection Angles**: Dynamic contextual prompts explaining why each question matters with a 1-click **Clarify** button.
- **Dossier Reading Guides**: Educational blueprints for single-profile self-discovery and dyadic comparative communication.
- **User Preference Toggle**: Enable/disable educational instructions via AI Configuration modal.

### Hawkins Map of Consciousness & Abraham Hicks Emotional Guidance
- **David Hawkins Map of Consciousness**: Logarithmic scale (20 to 600+) measuring spiritual awareness, emotional ownership, and the critical **200 Courage threshold** separating reactive **Force** from life-affirming **Power**.
- **Abraham Hicks Emotional Guidance Scale**: 22 calibrated vibrational set-points from Joy/Appreciation (Level 1) down to Fear/Despair (Level 22), identifying emotional pivots and resistance tiers.
- **Dual-Ladder Calibrated Spectrum Visualizer**: High-precision SVG visualizer displaying Hawkins LoC and Hicks vibrational gradient with pins for Partner A and Partner B.

### Global Reach Google Website Translator (100+ Languages)
- **Top Bar Language Switcher**: Fast one-click translation into 18 world languages plus Google's full 100+ language library.
- **Zero-Crash SPA Protection**: Custom defensive `Node.prototype` patch preventing Google Translate text-wrapping from breaking single-page app DOM mutations.
- **Psychometrics & Code Shield**: Complete `notranslate` protection for personality acronyms (MBTI, DISC, Hartman colors), score formulas, and encrypted result-sharing codes.

---

## 🔬 Unified 14-Framework Psychometric Engine
Maps responses polytomously across 14 validated behavioral and psychological frameworks:
1. **Maslow Hierarchy of Needs**: 6 Tiers (Somatic, Safety, Belonging, Esteem, Actualization, Transcendence), D-Need vs. B-Need Ratio, Primary Center of Gravity.
2. **Kegan Orders of Mind & Bowen Differentiation**: Continuous Orders (Stage 2 to 5), Bowen Differentiation Index (1 to 5).
3. **Hawkins Map of Consciousness**: Logarithmic score (20–600+), 200 Courage threshold, Force vs. Power.
4. **Hicks Emotional Guidance Scale**: 22 calibrated emotional set-points (Joy to Fear) and pivot agility.
5. **Hartman Color Code (Core Motives)**: Red (Power & Progress), Blue (Intimacy & Loyalty), White (Peace & Clarity), Yellow (Joy & Spontaneity).
6. **DISC Behavioral Assessment**: Dominance, Influence, Steadiness, Conscientiousness with Pace and Focus axes.
7. **The Birkman Method**: Tri-layer model capturing Outward Usual Style, Hidden Underlying Needs, and Stress Derailers.
8. **Adult Attachment Theory (ECR)**: Secure, Anxious-Preoccupied, Dismissive-Avoidant, Fearful-Avoidant 2D Cartesian plane.
9. **FIRO-B Interpersonal Compatibility**: Expressed vs. Wanted scores across Control, Inclusion, and Affection.
10. **Gottman Sound Relationship House**: Four Horsemen vulnerability tracking (Criticism, Defensiveness, Stonewalling, Contempt) and Emotional Safety Radar.
11. **Thomas-Kilmann Conflict Modes (TKI)**: Collaborating, Compromising, Accommodating, Avoiding, Competing.
12. **Schwartz Theory of Basic Human Values**: Trans-situational life priorities and cultural worldview.
13. **Big Five Personality Model (OCEAN)**: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism.
14. **MBTI / Jungian Cognitive Functions**: Extroversion vs. Introversion, Sensing vs. Intuition, Thinking vs. Feeling, Judging vs. Perceiving.

---

## 📖 Storytelling Narrative Dossier (Chapters & Acts)
- **Individual Dossier (5 Chapters)**:
  - *Chapter 1: The Core Operating Engine* (Hartman Motives & DISC Rhythm)
  - *Chapter 2: The Emotional Iceberg* (Birkman Surface vs. Submerged Needs vs. Stress)
  - *Chapter 3: The Attachment Safe Harbor & Trust* (Adult Attachment ECR Coordinates & FIRO-B Reciprocal Balance)
  - *Chapter 4: The Fire & Healing Script* (TKI Conflict Modes & Gottman Emotional Safety Radar)
  - *Chapter 5: Worldview, Needs & The Shared Horizon* (Maslow Hierarchy of Needs, Kegan Orders of Mind, Schwartz Human Values & Life Domain Priorities)
- **Dyadic Comparison Dossier (4 Acts)**:
  - *Act 1: The Chemistry & Energy Flow* (How Motives, Tempos, and Consciousness Harmonize)
  - *Act 2: The Invisible Tripwires* (Birkman Cross-Need Vulnerabilities, Control Dynamics & Developmental Asymmetry)
  - *Act 3: The Argument Simulation & Circuit Breaker* (Step-by-Step Conflict Cycle Flowchart)
  - *Act 4: The Lifelong Playbook & Bridge Scripts* (Tailored Fair-Fighting Rules & Verbatim Reconciliation Scripts)

---

## 📊 8 Interactive Multi-Framework SVG Visualizations
1. **Maslow Dual-Pyramid Visualizer & Kegan Continuum Bar**: 6-tier stacked pyramid with percentage shares, Center-of-Gravity indicators, D/B need brackets, and horizontal developmental continuum.
2. **Hartman Motive Spectrum Donut**: Exact SVG arc trigonometry paths with percentage labels, center hub spotlighting, and interactive person focus/shadowing.
3. **DISC Behavioral Rhythm 2x2 Matrix**: Cartesian plane with plotted nodes for both partners and tempo delta bridge.
4. **Birkman Tri-Layer Iceberg**: Cross-section illustrating Level 1 (Usual Style) vs. Level 2 (Hidden Needs) vs. Level 3 (Stress Derailer).
5. **Attachment Security 2D Coordinate Field**: Continuous Anxiety vs. Avoidance plane across 4 quadrants.
6. **FIRO-B Interpersonal Exchange Scales**: Comparative Giving vs. Craving scales for Leadership, Inclusion, and Affection.
7. **Gottman Emotional Safety & Risk Gauge**: Radial safety index paired with Four Horsemen risk monitors.
8. **Interactive Dyadic Conflict Cycle Flowchart**: 5-step visual flow tracing the exact trigger, hidden need alarm, defensive reflex, escalation spiral, and circuit breaker antidote.

---

## 🖨️ Static Printing & PDF Export Engine
- On-screen **Toggle Print View** mode for instantaneous review before exporting.
- Ink-friendly `@media print` stylesheet with zero dark bleed, automatic page breaks per chapter (`.page-break-chapter`), and static expanded legends.
- Strict print isolation ensuring vector SVG print fidelity with zero popover or hover artifacts.

---

## 👥 Pre-Seeded Clinical Test Archetypes
- **Tariq Al-Mansoor**: Red Motive (64%), DISC DC (Fast-Paced, Task-Driven), Esteem / Mastery Center of Gravity, Kegan Stage 4 (Self-Authoring Mind), Secure Attachment.
- **Nour Al-Sabah**: Blue Motive (46%), DISC SC (Reflective, People-Driven), Love & Belonging Center of Gravity, Kegan Stage 4 (Self-Authoring Mind), Secure-Preoccupied Attachment.
- **Dyadic Evaluation**: Evaluates to *The Anchor & The Explorer* archetype with high developmental resonance.
- Auto-seeded into local storage and resettable via the **✨ Load Live Demo Profiles** button on the Dashboard.

---

## 🤖 AI-Assisted Adaptive Intelligence
- Integrated support for **DeepSeek Pro** (`api.deepseek.com`), **NVIDIA NIM** (`deepseek-ai/deepseek-v4-flash`), **Google Gemini 3.8 Flash**, alongside OpenAI, Groq, and Autonomous AI.
- Adaptive question path selection (`determineNextQuestion`), clinical qualitative reporting (`analyzeReport`), and dyadic consultation with conversational bridge scripts (`compareProfilesWithAI`).

---

## 🛠 Tech Stack
- **Frontend**: Semantic HTML5, Vanilla JavaScript (ES6+), Vanilla CSS3.
- **Design System**: Glassmorphism, tailored dark/light modes, full LTR and RTL Arabic typography.
- **Storage & Security**: Browser `localStorage` with XOR/base64 encryption for shareable codes and downloaded JSON profiles, stored XSS sanitization, and Content Security Policy.
- **Zero Build Dependencies**: Runs directly by opening `index.html` in any modern desktop or mobile browser.

---

## 🚀 Getting Started
1. Clone or download the repository.
2. Open `index.html` directly in any web browser.
3. Use the **✨ Load Live Demo Profiles (Tariq & Nour)** button on the Dashboard for an instant, deep demonstration of the multi-framework comparison engine.
