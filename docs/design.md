# ExamLogic Computing — Product Design

> **by 25Thirty**

## 1. Product Purpose
ExamLogic Computing is an interactive GCSE Computer Science revision, exam preparation, and logic puzzle platform. It provides topic revision modules, interactive pseudocode challenges and practice questions. Deterministic activities can give immediate feedback; meaningful responses that cannot be marked safely are held for review.

## 2. Intended Users & Needs
- **GCSE Computer Science Students**: Need clear, structured topic breakdowns, useful feedback on logic/code exercises, and interactive revision tools.
- **Computer Science Teachers**: Need topic progress tracking, revision module assignment, and exam topic analytics.
- **Accessibility Needs**: High-contrast code/text snippets, screen-reader accessible quiz controls, full keyboard navigation, and customizable text scaling.

## 3. Design Mode: 25Thirty Learning
ExamLogic Computing strictly adheres to the **25Thirty Learning** design mode.

- **Intended Feeling**: Welcoming, purposeful, safe, engaging, inclusive, age-appropriate.
- **Primary Surfaces**:
  - Top Bar & Navigation: 25Thirty Navy (`#07111F`).
  - Page Backgrounds: Warm White (`#FAF8F2`) and Light Cool Grey (`#F1F5F9`).
  - Code & Logic Snippets: High-contrast monospaced blocks with clear syntax highlighting.
  - Primary Actions: 25Thirty Teal (`#2D9C91`) for "Run code", "Check answer", and "Start topic".
- **Supporting Accents**:
  - Topic Tags & Progress: Muted Amber (Logic & Algorithms), Soft Blue (Systems), Green (Mastered), Coral (Requires Revision).
- **Typography**: Inter (`font-family: Inter, Arial, Helvetica, sans-serif`) for UI, monospaced font for code snippets. Sentence case for all headings and UI buttons.
- **Emojis**: Restrained use for category badges (e.g. 💻 Algorithms, ⚡ Data Structures).

## 4. Key Screens & Features
1. **Topic Curriculum Hub**: Grid of Computing specification modules (Algorithms, Hardware, Networking, Python/Pseudocode, Logic Gates).
2. **Interactive Question & Logic Runner**: Practice environment with immediate feedback, test cases, and mark scheme breakdowns.
3. **Revision Flashcards & Quizzes**: Multiple-choice and fill-in-the-blank revision exercises.
4. **Student Progress Tracker**: Evidence-based summaries showing demonstrated results; page views, model answers, confidence and awaiting-review work do not create mastery.
5. **Section Milestones**: A quiet evidence indicator (`Not started`, `Practice completed`, `Checkpoint secured`) derived from assessed question-level evidence. A section is labelled `Checkpoint unavailable` and excluded from the achievable total when it lacks enough mapped assessment. There are no points, streaks, leaderboards or rewards for opening content.

## 5. Copy Style & Voice
- Direct, encouraging, clear language.
- Examples:
  - *Your next revision activity is ready*
  - *Test your algorithm logic*
  - *Check your mark scheme*
  - *See topic progress*
- Avoid childish praise or corporate technical jargon.

## 6. Accessibility & Code Standards
- **WCAG AA Compliance**: High-contrast contrast ratios across code blocks and UI surfaces.
- **Focus Management**: Visible 2px teal focus ring (`ring-2 ring-[#2D9C91]`) on all interactive controls.
- **Code Block Formatting**: Distinct background contrast with accessible font size (minimum 14px for code).
- **Mobile Responsive**: Stacked layout with scrollable code containers for mobile viewports.

## 7. Branding Standards
- Product Name: **ExamLogic Computing**
- Endorsement: **by 25Thirty** (Header), **A 25Thirty product** (Footer)
