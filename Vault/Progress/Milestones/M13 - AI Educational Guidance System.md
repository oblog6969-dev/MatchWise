---
title: "M13 - AI Educational Guidance System"
created: 2026-09-08
updated: 2026-09-08
type: milestone
status: complete
priority: high
progress: 100
tags:
  - project/matchwise
  - status/completed
  - type/milestone
  - feature/ai-guidance
aliases:
  - M13
  - AIEducationalGuidance
---

# 🎓 M13: AI Educational Guidance System & Contextual Instructions

> [!check] Milestone Verification
> **Completed:** September 8, 2026  
> **Status:** Production Ready  
> **Tested In:** Chrome / Edge, Automated Test Suite, Bilingual Validation

Upstream Link: [[00 - Progress Dashboard]]  
Related Changelog: [[v2.9.0 - AI Educational Guidance System]]  
Core Code: `ai_service.js`, `script.js`, `style.css`, `index.html`

---

## 🎯 Objective
Transform the assessment experience from a mechanical survey into a reflective, educational self-discovery journey by injecting contextual AI guidance at three distinct psychological milestones:
1. **Pre-Assessment Readiness** (Landing Page)
2. **In-Assessment Reflection Angles** (Question View with dynamic re-clarification)
3. **Post-Assessment Dossier Navigation** (Individual & Dyadic Reports)

---

## 🔑 Deliverables & Technical Architecture

### 1. Multi-Stage Guidance Cards
- **Landing Readiness Card (`#landingInstructionContainer`)**:
  - Contextual mindset preparation.
  - Discourages idealized answers; encourages spontaneous authentic responses.
- **In-Test Reflection Card (`#questionInstructionContainer`)**:
  - Evaluates active question category and psychological frameworks in real time.
  - Dynamically injects an angle of psychological contemplation.
- **Interactive Re-Prompting (`#btnClarifyTip`)**:
  - Allows the user to click a refresh icon to trigger a different reflection perspective if a question feels nuanced or ambiguous.
- **Report Interpretation Guides (`#reportInstructionContainer`)**:
  - Individual mode: Guides user to differentiate baseline style vs. stress reactions.
  - Dyadic mode: Explains how differences act as complementary strengths rather than incompatibility.

### 2. Provider Integration & Fallbacks
- Added `generateInstruction(context, language)` to `ai_service.js`.
- Supported Models:
  - Google **Gemini 3.8 Flash** & **Gemini 1.5 Flash**
  - DeepSeek Chat / Reasoner
  - Groq LLaMA 3.3
  - OpenAI GPT-4o-mini
  - Autonomous Clinical Fallback Engine (offline resilient)

### 3. Client-Side Performance & Privacy
- Cached AI responses in `localStorage` under `instruction_${context}_${language}` to eliminate redundant network hits.
- User Settings Toggle (`#inputAiGuidanceToggle`) with preference memory (`mw_ai_guide_enabled`).

---

## ✅ Acceptance Criteria & Checklist
- [x] Landing page guidance shows warm, psychologically sound preparation.
- [x] In-test guidance updates seamlessly as question index advances without UI flicker.
- [x] `#btnClarifyTip` rotates prompts smoothly with loading spinner.
- [x] Offline fallback guarantees 100% availability even with zero network or missing API keys.
- [x] Full Arabic RTL and English LTR alignment with glassmorphic cards.
- [x] Print view automatically suppresses instruction boxes to maintain clean dossier output.
