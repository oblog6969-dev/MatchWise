# MatchWise Lite v2.5.2

**MatchWise Lite v2.5.2** is a production-quality, offline relationship compatibility assessment tool and dyadic psychological consultation platform. It runs entirely inside the browser without requiring any mandatory backend, database, or login, with native English & Arabic localization, Google Website Translator (100+ languages), and optional AI consultation powered by **DeepSeek Pro**, **NVIDIA NIM**, and Autonomous AI.

---

## 🌟 What's New in v2.5.2

### 0. Global Reach Google Website Translator (100+ Languages)
- **Top Bar Language Switcher**: Fast one-click translation into 18 world languages plus Google's full 100+ language library.
- **Zero-Crash SPA Protection**: Custom defensive `Node.prototype` patch preventing Google Translate text-wrapping from breaking single-page app DOM mutations.
- **Psychometrics & Code Shield**: Complete `notranslate` protection for personality acronyms (MBTI, DISC, Hartman colors), score formulas, and encrypted result-sharing codes.


### 1. Unified 10-Framework Psychometric Engine
Maps responses polytomously across 10 validated behavioral and psychological frameworks:
1. **Big Five Personality Model (OCEAN)**: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism.
2. **MBTI / Jungian Cognitive Functions**: Extroversion vs. Introversion, Sensing vs. Intuition, Thinking vs. Feeling, Judging vs. Perceiving.
3. **Hartman Color Code (Core Motives)**: Red (Power & Progress), Blue (Intimacy & Loyalty), White (Peace & Clarity), Yellow (Joy & Spontaneity).
4. **DISC Behavioral Assessment**: Dominance, Influence, Steadiness, Conscientiousness with Pace (Fast vs. Reflective) and Focus (Task vs. People).
5. **The Birkman Method**: Tri-layer model capturing Outward Usual Style, Hidden Underlying Needs, and Stress Derailer Triggers.
6. **FIRO-B Interpersonal Compatibility**: Expressed vs. Wanted scores across Decision Leadership (Control), Inclusion, and Affection.
7. **Thomas-Kilmann Conflict Modes (TKI)**: Collaborating, Compromising, Accommodating, Avoiding, Competing.
8. **Gottman Sound Relationship House**: Four Horsemen vulnerability tracking (Criticism, Defensiveness, Stonewalling, Contempt) and Emotional Safety Radar.
9. **Adult Attachment Theory (ECR)**: Secure, Anxious-Preoccupied, Dismissive-Avoidant, Fearful-Avoidant 2D Cartesian plane.
10. **Schwartz Theory of Basic Human Values**: Trans-situational life priorities and cultural alignment.

### 2. Storytelling Narrative Dossier (Chapters & Acts)
- **Individual Dossier (5 Chapters)**:
  - *Chapter 1: The Core Operating Engine* (Hartman Motives & DISC Rhythm)
  - *Chapter 2: The Emotional Iceberg* (Birkman Surface vs. Submerged Needs vs. Stress)
  - *Chapter 3: The Attachment Safe Harbor & Trust* (Adult Attachment ECR Coordinates & FIRO-B Reciprocal Balance)
  - *Chapter 4: The Fire & Healing Script* (TKI Conflict Modes & Gottman Emotional Safety Radar)
  - *Chapter 5: Worldview & The Shared Horizon* (Schwartz Human Values & Life Domain Priorities)
- **Dyadic Comparison Dossier (4 Acts)**:
  - *Act 1: The Chemistry & Energy Flow* (How Motives and Tempos Harmonize)
  - *Act 2: The Invisible Tripwires* (Birkman Cross-Need Vulnerabilities & Control Dynamics)
  - *Act 3: The Argument Simulation & Circuit Breaker* (Step-by-Step Conflict Cycle Flowchart)
  - *Act 4: The Lifelong Playbook & Bridge Scripts* (Tailored Fair-Fighting Rules & Verbatim Reconciliation Scripts)

### 3. 7 Interactive Multi-Framework SVG Visualizations
- **Hartman Motive Spectrum Donut**: Percentage breakdown with core fuel and vulnerability callouts.
- **DISC Behavioral Rhythm 2x2 Matrix**: Cartesian plane with plotted nodes for both partners and tempo delta bridge.
- **Birkman Tri-Layer Iceberg**: Cross-section illustrating Level 1 (Usual Style) vs. Level 2 (Hidden Needs) vs. Level 3 (Stress Derailer).
- **Attachment Security 2D Coordinate Field**: Continuous Anxiety vs. Avoidance plane across 4 quadrants.
- **FIRO-B Interpersonal Exchange Scales**: Comparative Giving vs. Craving scales for Leadership, Inclusion, and Affection.
- **Gottman Emotional Safety & Risk Gauge**: Radial safety index paired with Four Horsemen risk monitors.
- **Interactive Dyadic Conflict Cycle Flowchart**: 5-step visual flow tracing the exact trigger, hidden need alarm, defensive reflex, escalation spiral, and circuit breaker antidote.

### 4. Static Printing & PDF Export Engine
- On-screen **Toggle Print View** mode for instantaneous review before exporting.
- Ink-friendly `@media print` stylesheet with zero dark bleed, automatic page breaks per chapter (`.page-break-chapter`), and static expanded legends.

### 5. Pre-Seeded Clinical Test Archetypes
- **Tariq Al-Mansoor**: Red Motive (64%), DISC DC (Fast-Paced, Task-Driven), Birkman Assertive / Structure Need, Secure Attachment.
- **Nour Al-Sabah**: Blue Motive (46%), DISC SC (Reflective, People-Driven), Birkman Supportive / Freedom Need, Secure-Preoccupied Attachment.
- Auto-seeded into local storage and resettable via the **✨ Load Live Demo Profiles** button on the Dashboard.

### 6. AI-Assisted Adaptive Intelligence
- Integrated support for **DeepSeek Pro** (`api.deepseek.com`) and **NVIDIA NIM** (`deepseek-ai/deepseek-v4-flash`), alongside Google Gemini, OpenAI, and Groq.
- Adaptive question path selection (`determineNextQuestion`), clinical qualitative reporting (`analyzeReport`), and dyadic consultation with conversational bridge scripts (`compareProfilesWithAI`).

---

## 🛠 Tech Stack
- **Frontend**: Semantic HTML5, Vanilla JavaScript (ES6+), Vanilla CSS3.
- **Design System**: Glassmorphism, tailored dark/light modes, full LTR and RTL Arabic typography.
- **Storage & Security**: Browser `localStorage` with XOR/base64 encryption for shareable codes and downloaded JSON profiles.
- **Zero Build Dependencies**: Runs directly by opening `index.html` in any modern desktop or mobile browser.

---

## 🚀 Getting Started
1. Clone or download the repository.
2. Open `index.html` directly in any web browser.
3. Use the **✨ Load Live Demo Profiles (Tariq & Nour)** button on the Dashboard for an instant, deep demonstration of the multi-framework comparison engine.
