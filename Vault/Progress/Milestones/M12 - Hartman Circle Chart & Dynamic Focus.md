---
title: "M12 - Hartman Circle Chart & Dynamic Focus"
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
  - feature/hartman-visualizer
aliases:
  - M12
  - HartmanGeometry
---

# 🎨 M12: Hartman Circle Chart Visualizer & Dynamic Focus/Shadow

> [!check] Milestone Verification
> **Completed:** September 2026  
> **Status:** Production Ready  
> **Tested In:** Chrome, Edge, Firefox, Mobile Safari, Vector Print Preview

Upstream Link: [[00 - Progress Dashboard]]  
Related Changelog: [[v2.8.0 - Hartman Donut Geometry & Focus Interactivity]]  
Related Framework: [[Hartman Color Code]]  
Core Code: `script.js`, `style.css`

---

## 🎯 Objective
Re-engineer the Hartman Color Code visualizer from standard CSS stroke rings to exact trigonometry-based SVG arc geometry (`<path d="...">`), providing dynamic person filtering (`Tariq`, `Nour`, `Both`), concentric dual-ring comparison, and interactive center-hub spotlighting.

---

## 🔑 Key Engineering Highlights

### 1. Trigonometric SVG Geometry (`describeDonutSlice`)
- Completely removed Chromium-dependent `stroke-dashoffset` circles.
- Implemented parametric polar-to-cartesian coordinate mapper:
  $$x = c_x + r \cdot \cos(\theta), \quad y = c_y + r \cdot \sin(\theta)$$
- Generated mathematically closed SVG path strings (`M ... A ... L ... A ... Z`) supporting inner and outer radii.

### 2. Dual Concentric Rings in Dyadic Mode
- **Person A Outer Ring:** $r = 88\text{--}122\text{px}$
- **Person B Inner Ring:** $r = 52\text{--}84\text{px}$
- **Dynamic Center Hub:** $r = 45\text{px}$

### 3. Dynamic Focus & Silhouette Shadowing
- Interactive person buttons: `[Tariq Al-Mansoor]`, `[Nour Al-Sabah]`, `[Both / كلاهما]`.
- Clicking a person highlights their ring while gracefully transitioning the partner's ring into a subtle 14% opacity silhouette.
- Center hub automatically spotlights the selected partner's dominant motive, percentage, and core psychological drive.

---

## ✅ Acceptance Criteria & Checklist
- [x] Zero visual distortion or clipping across high-DPI displays.
- [x] Direct percentage labels embedded inside slices with high-contrast luminance calculation.
- [x] Comparison micro-rows below donut stay synchronized with the active filter state.
- [x] Seamless print export hides all interactive buttons and shows both rings in full fidelity.
