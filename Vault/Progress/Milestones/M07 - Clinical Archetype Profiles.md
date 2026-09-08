---
title: "M07 - Clinical Archetype Profiles"
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
  - feature/archetypes
aliases:
  - M07
  - ClinicalArchetypes
---

# 👥 M07: Clinical Archetype Profiles (Tariq & Nour)

> [!check] Milestone Verification
> **Completed:** August 2026  
> **Status:** Production Ready  
> **Tested In:** Dyadic comparison engine, JSON import/export

Upstream Link: [[00 - Progress Dashboard]]  
Related Changelog: [[v2.5.0 - Narrative Archetypes & Multi-Framework]]  
Core Code: `demo_profiles.js`, `sample_tariq_almansoor.json`, `sample_nour_alsabah.json`

---

## 🎯 Objective
Provide pre-calibrated psychological archetypes for instantaneous testing, demonstration, and clinician evaluation without requiring the user to manually answer 85 questions every time.

---

## 🔑 Archetype Profiles

### 1. Tariq Al-Mansoor (Executive Leader)
- **MBTI:** ENTJ (Commander)
- **Hartman Motive:** Red (Power, Results, Direct Action)
- **DISC:** High D / Low S (Dominant, Decisive, Fast-paced)
- **Birkman:** Task-oriented usual style; needs clarity & respect; stress displays as impatience.
- **Attachment:** Avoidant-leaning Secure.
- **Hawkins Level:** 350 (Acceptance).

### 2. Nour Al-Sabah (Empathetic Harmonizer)
- **MBTI:** INFJ (Advocate)
- **Hartman Motive:** Blue (Connection, Integrity, Quality Relationships)
- **DISC:** High S / High C (Steady, Conscientious, Deliberate pace)
- **Birkman:** Relational usual style; needs appreciation & emotional safety; stress displays as withdrawal.
- **Attachment:** Anxious-leaning Secure.
- **Hawkins Level:** 400 (Reason / Love).

---

## ✅ Acceptance Criteria & Checklist
- [x] `#btnLoadDemoProfiles` populates Person A and Person B with one click.
- [x] JSON export/import functions accurately reproduce all framework metrics.
- [x] Dyadic compatibility calculated at 67% with rich complementary dynamics.
