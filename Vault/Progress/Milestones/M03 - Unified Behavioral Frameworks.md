---
title: "M03 - Unified Behavioral Frameworks"
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
  - feature/scoring-engine
aliases:
  - M03
  - BehavioralFrameworks
---

# 🧬 M03: Unified Polytomous Scoring Across 10 Frameworks

> [!check] Milestone Verification
> **Completed:** July 2026  
> **Status:** Production Ready  
> **Tested In:** Node psychometric test suite, mathematical verification scripts

Upstream Link: [[00 - Progress Dashboard]]  
Core Code: `traits.js`, `compatibility.js`, `questions.json`

---

## 🎯 Objective
Unify disparate psychological models into a coherent, polytomous scoring engine that evaluates multiple psychometric constructs simultaneously from a single 75-question diagnostic bank.

---

## 🔑 Framework Integration
- **MBTI / Cognitive Functions**: Extraversion, Intuition, Thinking, Judging tendencies.
- **Big Five (OCEAN)**: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism.
- **Hartman Color Code**: Primary & secondary motives (Red/Blue/White/Yellow).
- **DISC Assessment**: Dominance, Influence, Steadiness, Conscientiousness weights.
- **The Birkman Method**: Usual behavioral style vs. underlying needs vs. stress reaction.
- **Adult Attachment (ECR)**: Dimensional anxiety and avoidance coordinates.
- **FIRO-B**: Expressed vs. Wanted interpersonal needs.
- **Gottman Relationship House**: Four horsemen risk index & emotional safety buffer.
- **TKI Conflict Modes**: Competing, Collaborating, Compromising, Avoiding, Accommodating.
- **Schwartz Value Survey**: 10 universal motivational value dimensions.

---

## ✅ Acceptance Criteria & Checklist
- [x] Every question mapped to weighted traits across multiple frameworks.
- [x] Zero scoring collisions or floating-point rounding errors.
- [x] Normalized scores mapped to standard 0-100% scales.
