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
5. **Section Milestones**: A quiet evidence indicator (`Not started`, `Practice completed`, `Checkpoint secured`) derived from assessed question-level evidence. A checkpoint requires every focus in the section's current versioned rule; several question IDs assessing one focus cannot manufacture breadth. A section is labelled `Checkpoint unavailable` and excluded from the achievable total when it lacks a representative rule. There are no points, streaks, leaderboards or rewards for opening content.
6. **Accessible interaction state**: Route changes and retry rerenders move focus to the new content heading. Quiz questions use semantic groups and explicitly labelled controls; results are announced separately from milestone acknowledgements. Navigation exposes the current page, tables declare column headers, and unavailable activities provide a named recovery route.
7. **Focused learning state**: An objective-level Learn route leads with the selected section, its core teaching and one primary checkpoint action. Extended topic material remains available through a secondary `View full topic` action instead of competing with the immediate task.
8. **Honest workload and reflection**: Dashboard workload combines every required assignment and active test-preparation plan. Confidence is an optional reflection after retry or continuation choices and never changes a score, checkpoint or route automatically.
9. **Explainable evidence**: Progress uses `Strong latest evidence`, `Developing latest evidence` and `More practice needed` rather than claiming topic mastery. Section rows expose their evidence source count, latest date, demonstrated assessment focuses and remaining focuses; unavailable checkpoints state why they are excluded.
10. **Restrained motivation**: The dashboard keeps the current task dominant and shows section progress as secondary evidence. A quiet achievement link appears only when the learner record contains an earned award; empty learners are not shown a zero count. Additional assignments and progress remain in an accessible disclosure to reduce distraction.

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
- **Reflow and Zoom**: Dense grids, action rows and binary controls remain operable at a 320 CSS-pixel viewport and when page content is enlarged.
- **Motion Preferences**: Decorative transitions and transforms are suppressed when the learner requests reduced motion.
- **Scrollable Regions**: Wide tables remain horizontally scrollable and receive a keyboard focus target and accessible region name.

## 7. Branding Standards
- Product Name: **ExamLogic Computing**
- Endorsement: **by 25Thirty** (Header), **A 25Thirty product** (Footer)
