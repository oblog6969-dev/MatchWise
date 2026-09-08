---
name: obsidian-vault
description: >-
  Expert guidelines and workflows for interacting with, creating, and maintaining
  Obsidian vaults. Teaches Gemini how to format Obsidian-flavored Markdown, manage
  YAML frontmatter properties, generate Dataview and Tasks queries, construct Maps
  of Content (MOCs), build Obsidian Canvas files (.canvas), and preserve bi-directional
  wikilinks without broken references.
---

# Obsidian Vault Skill for Gemini & Antigravity

This skill defines standard operating procedures and formatting rules when working within or generating content for **Obsidian** vaults (`.obsidian`, Markdown files, canvas boards, and Dataview workflows).

---

## 1. Vault File Structure Conventions

Always organize vaults with intentional folder hierarchies and clean naming conventions:

```text
Vault/
├── .obsidian/              # Vault configuration (app.json, community-plugins, etc.)
├── 00 - Start Here.md      # Vault entrypoint / Map of Content (MOC)
├── 01 - Dashboards/        # High-level overview dashboards (Dataview, Canvas)
├── Progress/               # Milestones, sprint logs, and version changelogs
│   ├── 00 - Dashboard.md   # Progress dashboard
│   ├── Milestones/         # Granular milestone breakdown notes
│   ├── Changelogs/         # Version release and changelog records
│   └── Templates/          # Note creation templates
├── Frameworks/             # Domain knowledge / architecture notes
└── Assets/                 # Images, SVGs, and attachments
```

---

## 2. YAML Frontmatter (Properties)

Every note in the vault must begin with clean, consistent YAML frontmatter enclosed by `---`:

```yaml
---
title: "Note Title"
created: 2026-09-08
updated: 2026-09-08
type: milestone # milestone | changelog | concept | task | framework
status: complete # in-progress | complete | blocked | planned
priority: high # high | medium | low
progress: 100 # percentage integer (0-100)
tags:
  - project/matchwise
  - status/completed
  - type/milestone
aliases:
  - M13
  - EducationalGuidance
---
```

### Property Rules
- Use lower_case or kebab-case for property keys.
- Always provide `type`, `status`, and relevant nested tags (`#project/...`, `#status/...`).
- Add `aliases` for notes that have acronyms or short codes (e.g., `M13` for `M13 - AI Educational Guidance`).

---

## 3. Obsidian Markdown Syntax

Use Obsidian's rich Markdown features:

### 3.1 Wikilinks & Aliases
- Link to other notes using `[[Target Note Name]]`.
- Use display aliases when appropriate: `[[Target Note Name|Display Label]]`.
- Link to specific headings: `[[Target Note Name#Section Header|Custom Text]]`.
- Link to block references: `[[Target Note Name#^block-id]]`.

### 3.2 Obsidian Callouts
Use callouts to highlight status, warnings, technical debt, and clinical decisions:

```markdown
> [!info]
> Informational context and background details.

> [!check] Completed Milestone
> All unit tests and browser subagent flows passed.

> [!warning] Breaking Change
> Deprecated legacy dashoffset calculation in favor of exact SVG trigonometry paths.

> [!tip] Pro Tip
> Use Dataview queries to aggregate child tasks automatically.
```

Common callout types: `[!note]`, `[!info]`, `[!todo]`, `[!tip]`, `[!check]`, `[!warning]`, `[!danger]`, `[!quote]`, `[!summary]`.

### 3.3 Progress Bars (Pure Markdown / HTML)
When visual progress is needed without Dataview plugins enabled:
```html
<progress value="100" max="100"></progress> **100%**
```
Or with text blocks:
`[██████████] 100%` / `[██████░░░░] 60%`

---

## 4. Dataview & Task Compatibility

Write notes so they can be easily aggregated by the **Dataview** and **Tasks** community plugins:

### Dataview Table Example
```dataview
TABLE status, priority, progress + "%" AS Progress, updated AS "Last Updated"
FROM "Progress/Milestones"
SORT file.name ASC
```

### Dataview Task Query Example
```dataview
TASK
FROM "Progress/Milestones"
WHERE !completed
GROUP BY file.link
```

### Standard Checkbox Tasks
- `[ ]` Incomplete task
- `[/]` In-progress task
- `[x]` Completed task
- `[-]` Cancelled / dropped task

---

## 5. Obsidian Canvas (`.canvas`) Format

Obsidian Canvas files are JSON files with `.canvas` extension containing `nodes` and `edges`:
- `nodes`: list of objects with `id`, `x`, `y`, `width`, `height`, `type` (`"text"` or `"file"`), and `text` or `file`.
- `edges`: list of objects with `id`, `fromNode`, `fromSide`, `toNode`, `toSide`, and optional `label` or `color`.

---

## 6. Vault Maintenance Checklist for Gemini

When creating or modifying notes in the vault:
1. **Never break existing wikilinks**: Ensure target note filenames match exact string in `[[...]]`.
2. **Always update frontmatter**: Keep `updated: YYYY-MM-DD` and `progress` current.
3. **Link upstream & downstream**: Provide a link back to parent MOC (`[[00 - Progress Dashboard]]`) at top or bottom.
4. **Use clear file naming**: Prefix with numbers or codes (e.g., `M01 - ...`, `v2.9.0 - ...`) for logical sorting in Obsidian's file explorer.
