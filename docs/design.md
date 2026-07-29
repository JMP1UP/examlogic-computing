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
10. **Restrained motivation**: The dashboard keeps the current task dominant and shows section progress as secondary evidence. A quiet achievement link appears only when the learner record contains an earned award; empty learners are not shown a zero count. Progress shows earned badges in colour and no more than two readable `Not earned yet` goals, each with an exact evidence requirement and direct activity route. Retired historical awards remain visible as `Previously earned` but are not advertised as obtainable. Additional assignments and progress remain in an accessible disclosure to reduce distraction.
11. **Weekly practice rhythm**: Engagement is shown separately from attainment. The default plan uses recall on two separate days, one number-fluency activity and one programming activity each week, plus a 4–6 mark exam answer every other week. When required work is active, the detailed rhythm, total and action are replaced by a compact paused summary so the interface presents one workload and one next action. It has no punitive streak, leaderboard or carried backlog. Same-day repetition counts as one recall day; page views, examples, confidence and retries cannot inflate the rhythm. Awaiting-review exam work may be labelled submitted but cannot affect attainment.
12. **Recall deck**: Only covered or teacher-released topics enter the deck. A bounded session uses up to three distinct cards, adapts when fewer are available and can be paused without losing its place. A learner must attempt a card before revealing its answer and must choose `Not yet`, `Needed effort` or `Easy to recall`. Per-card ratings schedule the next due date only; the weekly rhythm records the day only when the standard session is complete. Neither ratings nor extra cards are attainment evidence.

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

## 8. Student art direction: Signal / Paste

Student pages use a **Signal / Paste — Cut Through** visual language: precise
computing metadata and routes combined with the controlled energy of editorial
paste-up graphics. On Home, large navy/cyan colour fields, an overlapping task
sheet, a continuous signal strip and an explicit checkpoint route establish a
confident identity. Teaching and assessment surfaces remain substantially calmer.

- The required task remains the single dominant action.
- Expressive details are limited to page openings, task identity, checkpoints and
  navigation state.
- Monospace type is reserved for short metadata; learning copy remains in Inter.
- Checkpoints and achievements describe demonstrated evidence and never reward
  visits, model-answer views, confidence or self-marking.
- Badge status is expressed in text and shape as well as colour. Unearned badges
  retain normal text contrast rather than using low-opacity cards, and the interface
  does not use confetti, sound, streak pressure, rankings or speed rewards.
- Teacher pages retain the established professional 25Thirty Learning treatment.
- Decorative marks carry no meaning, disappear safely in forced-colour layouts and
  must not interfere with keyboard focus, zoom or 320px reflow.

Signal / Paste explicitly excludes graffiti fonts, fake youth slang, hacker-terminal
clichés, glitch effects, neon overload, points, streaks, leaderboards and decorative
texture behind questions or teaching text.

The student routes use three deliberate intensity levels:

- Home may use the strongest composition around the single required task.
- Route openings, results and Progress summaries use compact orientation headers.
- Teaching, answer construction, retry feedback, messages and code remain visually quiet.
- Every state presents one primary action and describes required, optional and evidence-producing work explicitly.
- Learn uses a literal Read → Try → Check sequence; optional tools use bounded briefs and clear stopping points.
- Student styling remains scoped beneath the authenticated student shell and must not alter teacher routes.

## 9. Pupil language

Student instructions use direct verbs, short sentences and one clear next action.
Required GCSE Computer Science and OCR exam terms remain visible, but unfamiliar
terms are explained at first use. Product and engineering language such as
“refactor”, “registry”, “objective-level” and raw stored activity identifiers must
not appear in pupil-facing copy.

Progress language states plainly whether work counts. A section goal may be shown
as met only when the current evidence rule is satisfied; the interface must not
describe that as permanent mastery or full curriculum completion. Keyword matching,
self-checks and model answers are labelled as practice and must not imply an
examiner-awarded mark.
