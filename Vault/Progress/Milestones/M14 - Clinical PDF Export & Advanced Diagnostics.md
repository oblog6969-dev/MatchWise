---
title: "M14 - Clinical PDF Export & Advanced Diagnostics"
created: 2026-09-08
updated: 2026-09-08
type: milestone
status: planned
priority: high
progress: 15
tags:
  - project/matchwise
  - status/planned
  - type/milestone
  - feature/pdf-export
aliases:
  - M14
  - PDFExportRoadmap
---

# 📄 M14: Clinical PDF Export & Longitudinal Assessment (Roadmap)

> [!todo] Upcoming Milestone
> **Target:** Q4 2026  
> **Status:** 🟡 In Design & Prototyping (15%)  
> **Pre-requisites:** [[M11 - Interactive Popovers & Print Fidelity]], [[M12 - Hartman Circle Chart & Dynamic Focus]]

Upstream Link: [[00 - Progress Dashboard]]

---

## 🎯 Objective
Provide native client-side PDF document generation (e.g. via jsPDF / html2pdf / Canvas rendering) with formal clinical headers, customizable branding, confidentiality watermarks, and longitudinal assessment tracking (comparing individual scores across time).

---

## 📋 Planned Scope & Tasks
- [ ] Research lightweight client-side PDF generation engines without heavy external bloat.
- [ ] Design formal clinical dossier cover sheet with assessment metadata, date, and practitioner signature line.
- [ ] Add confidential watermark toggle in export options.
- [ ] Implement multi-session JSON storage to graph psychometric growth over months.
- [ ] Add encrypted JSON export/import with passphrase protection for HIPAA/GDPR clinical compliance.
