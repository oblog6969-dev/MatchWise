# MatchWise Lite v2.0

MatchWise Lite v2.0 is a production-quality, offline relationship compatibility assessment web application. It is designed to run entirely inside the browser without requiring any backend, database, login, API, or internet connection.

## New in v2.0
- **Physical Appearance & Fitness Priority**: Evaluates physical attraction importance, fitness maintenance routines, weight care, and skincare effort.
- **Fashion Style Harmony**: Cross-matches fashion preferences (Traditional Thobe/Abaya, Modern High Fashion, Casual Minimalist).
- **Public & Private Modesty Dynamics**: Measures Public Modesty Index (Hijab/Niqab standards, mixed-gender gatherings, beach/vacation attire) vs. Private Modesty Freedom (domestic dress comfort and intimacy openness).
- **Social Media Privacy Index**: Evaluates comfort levels regarding posting personal or family photos online.
- **Demographic Adaptive Engine**: Filters questions based on Gender (Male/Female) and Marital Status (Single, Married, Used to be married).
- **Saudi Relationship Dynamics**: Integrates Saudi cultural factors including extended family housing vs. private apartment, Nafaqah vs. salary sharing, mixed workplace boundaries, and Qiwamah decisional leadership.
- **Compact Result Sharing Code**: Generates lightweight encrypted `MWCODE-` strings for sharing profile results offline.

## Tech Stack
- HTML5
- CSS3 (Apple-inspired UI, dark/light modes, glassmorphism, responsive, LTR & RTL Arabic support)
- Vanilla JavaScript (ES6)

## Architecture
- `index.html`: Semantic modern SPA entry point with custom modal prompts and printable report layout.
- `style.css`: Clean Apple-like responsive design system.
- `script.js`: App controller coordinating adaptive question flow, state, result code parsing, and SVG visual charts.
- `questions.json`: Comprehensive 80-question bilingual database with situation-based scenario and Likert items.
- `traits.js`: Psychometric and modesty scoring engine computing Big Five (OCEAN), MBTI tendencies, Attachment, Communication, Conflict, Decision Style, Love Languages, Ideology Profile, Modesty Profile, and Physical Appearance Profile.
- `compatibility.js`: Deep multivariable compatibility scoring engine evaluating 14 distinct category metrics, deal-breaker alerts, and localized Saudi conflict drivers.
- `utils.js`: Localization dictionary (EN/AR), localStorage wrapper, ThemeManager, and offline Base64 XOR cryptography.

## Getting Started
Open `index.html` directly in any modern desktop or mobile browser. Everything works completely offline without installation or setup.
