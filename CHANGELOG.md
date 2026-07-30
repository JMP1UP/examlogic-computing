# Changelog — ExamLogic Computing

All notable changes to ExamLogic Computing are recorded here.

## [Unreleased] - 2026-07-26

### Added
- Replaced the nine-item student sidebar with five clear destinations: Home,
  Topics, Practice, Progress and Messages, while retaining every existing
  activity through parent-route mapping.
- Added a student Topics control centre that separates learner-declared coverage,
  recall confidence and checked work, with learner-owned recall-card controls
  that do not alter classroom settings or evidence.
- Made recall-card eligibility genuinely objective-scoped where explicit or
  uniquely traceable metadata exists, while retaining honest legacy topic-level
  handling for ambiguous cards and preserving all rating history.
- Added a four-mode Practice hub and a focused objective-learning route with one
  exact exam-question action and contextual tools.
- Added a restrained Progress badge collection with earned, previously earned and `Not earned yet` states, exact evidence requirements and direct activity routes.
- Added stable internal achievement identifiers while preserving existing schema-13 learner records and stored badge names.
- Bound programming awards to the exact tested code snapshot so editing after a successful test run requires the learner to run the tests again.
- Extended Cut Through across student routes with compact orientation, a recommended Learn start, an explicit Read → Try → Check sequence and bounded simulator tasks.
- Added direct Learn actions from incomplete Progress sections without changing evidence or milestone calculations.
- Rebuilt the student dashboard with the bolder Signal / Paste — Cut Through
  composition: split weekly brief, overlapping task sheet, continuous status strip,
  semantic checkpoint route and evidence-backed achievement marks.
- Added the student-only Signal / Paste visual direction, with restrained route
  framing, task identity and checkpoint cues while leaving teacher screens unchanged.
- Reframed dashboard reporting as checked work, a required study plan and a
  task-linked next checkpoint without changing evidence or completion rules.
- Added dark-mode, forced-colour and narrow-layout safeguards for the new student
  surfaces.
- Added restrained, evidence-backed section milestones across Learn, Dashboard and Progress.
- Added quiet checkpoint acknowledgement after qualifying assessed activities, without points, streaks, leaderboards or page-view rewards.
- Added versioned, focus-based checkpoint rules so only representative demonstrated evidence can secure a section; retries replace the latest outcome for the same activity and concept.
- Added validation that formative work, awaiting-review work, legacy reduced-precision records, duplicate-concept questions and repeated retries cannot inflate section checkpoints.
- Enabled checkpoints for 27 sufficiently assessed sections. Five under-assessed sections remain visible but excluded from the achievable denominator: `1.2.4c`, `1.5.2`, `2.1.1`, `2.2.2` and `2.2.PY`.

### Fixed
- Added an evidence-safe weekly practice rhythm: two separate recall days, weekly Number and Programming, and a fortnightly exam answer, with awaiting-review work separated from attainment and no carried backlog.
- Added a covered-topic recall deck with attempt-before-reveal, bounded distinct-card sessions, pause/resume, scheduling-only ratings and due dates that cannot inflate mastery or weekly engagement before session completion.
- Prevented focused section checks from filling their question set with other objectives, and linked focused Learn sections to matched exam application where available.
- Kept the exam question visible throughout its journey and aligned the 1.1.1 CPU fetch application with a clear four-mark requirement and rubric.
- Mixed multiple-choice option order per activity while preserving the same order for retries, removing the authored first-answer pattern without changing marking.
- Routed `Try an exam-style question` to the current specification section, or a task from the same topic only, and hid the action when no relevant task exists.
- Ordered the exam-question scenario selector by paper and specification point instead of internal record order.
- Relabelled the section-check action after assessed practice so completed work is visibly remembered and any repeat is clearly a recheck.
- Simplified the CPU fetch guided task to one three-step diagram and a focused MAR/MDR explanation.
- Escaped persisted pupil, teacher and assignment content at every reviewed student/staff render boundary so stored markup is displayed as text without rewriting saved records.
- Scoped teacher rosters, evidence, submissions, messages, broadcasts, assignments, test preparation, support sessions and topic controls to the signed-in teacher's selected authorised class.
- Replaced the unconditional message-monitoring clear state with an accurate class-scoped flagged count and direct route to the affected conversation.
- Removed automated estimated-mark presentation and pre-filling from written review; teachers must now enter a valid independent mark against a confirmed question.
- Prevented orphaned historical written submissions from being marked against an invented mark total while preserving the original response.
- Clarified student section controls, workload, recall terminology, pseudocode hints and Progress next actions without changing curriculum scope or evidence rules.
- Rewrote pupil-facing Progress, Learn, programming and exam-answer instructions in plain English while retaining the OCR terms pupils must recognise.
- Replaced the exam-answer keyword scanner's marking implication with an explicitly formative suggested-term check.
- Corrected SQL-injection prevention, validation, testing-data and legislation explanations after examiner review.
- Replaced the unexplained software-development instruction “refactor” with the OCR-aligned term “refine” and a concrete description of the required changes.
- Replaced the horizontally scrolling Learn topic strip with a responsive wrapping grid so every topic remains visible and keyboard-accessible.
- Replaced potentially misleading message identity and presence copy with the assigned teacher and factual monitoring hours.
- Clarified formative exam-transfer status and practice-result storage.
- Replaced low-contrast yellow and reused accent foregrounds with WCAG AA text tokens, and raised small interface labels to a readable minimum across student, teacher, public and dark-mode views.
- Corrected out-of-scope TCP/IP layer-name assessment, misleading MAC permanence and storage-unit feedback, ERL terminator syntax, a variables/constants mapping, and inaccurate programming explanations.
- Reclassified the old layer-name item as a preserved historical record and added an in-scope layers-benefit replacement.
- Restored core status and executable practice for two-dimensional arrays, subprograms, reproducible randomness and authentication.
- Isolated curriculum and assessment scripts behind the `StudySpiceContent` browser namespace so production-order script loading no longer creates top-level identifier collisions.
- Replaced the schema 12-to-13 local-data reset with a versioned migration that preserves learner, teacher and school-generated records while merging current system content.
- Assigned stable unique IDs to 13 duplicated retrieval questions, retaining each legacy ID on the renamed content for audit interpretation.
- Consolidated the student Learn page to one curriculum-backed renderer with controlled missing-content states.
- Preserved full question-set evidence across partial retries so reduced retry denominators cannot inflate mastery.
- Added individually reviewed, question-owned retry guidance to all 84 questions reachable through topic or objective five-minute recall routes.
- Grouped version-2 retry snapshots by activity in Progress so only the latest counted evidence is presented while storage history remains intact.
- Classified definition keyword checks as formative-only evidence and labelled reduced-precision historical evidence.
- Added a recovery route for unavailable programming challenges and aligned earned-badge wording with stored awards.
- Routed meaningful non-matching pseudocode submissions to teacher review without awarding completion or mastery.
- Made the selectable clean new-learner demo repeatable: each entry clears only its dedicated fixture evidence, badges, transient answers and namespaced drafts while preserving assignments, settings and other learners' records.
- Labelled static teacher examples as demonstration narrative rather than calculated learner judgements.
- Improved code-display typography, keyboard focus coverage and responsive pseudocode layout.
- Added semantic quiz groups and labels, current-page navigation state, route/result focus management, live score announcements, scoped table headers and named recovery actions for unavailable content.
- Made dense grid and action layouts reflow on narrow screens, provided keyboard-labelled scrolling table regions, and respected reduced-motion preferences.
- Focused objective-level Learn journeys on one selected section and one primary checkpoint action while retaining an explicit route to the full topic.
- Corrected dashboard workload wording to combine required assignments and test preparation, and separated retry, optional confidence reflection and onward navigation after recall.
- Replaced broad mastery labels with latest-evidence wording and exposed each section checkpoint's contributing activity count, latest date, demonstrated focuses and remaining focuses.
- Restored the dashboard's expandable secondary details with accessible state and focus handling, and surfaced genuinely earned achievements quietly beside section checkpoints.
- Added conservative migration support for recognisable pre-versioned browser data, preserving user-owned records before applying the existing schema 12-to-13 migration.
- Added a focused read-only recovery screen for unrecognisable data or browser-storage write failures, without overwriting the original saved value.
- Aligned stylesheet, database and application cache tokens so compatibility and dashboard fixes load together.

### Tests
- Added executed staff-integrity coverage for stored-content injection, class isolation, cross-class write rejection, safeguarding routing, independent marking and orphaned written questions.
- Added whole-specification traceability, workload, supported-practice, retired-content and application-route validation.
- Added production-order browser startup and Student Demo smoke coverage.
- Added realistic schema 12 migration fixtures and preservation assertions.
- Added question-bank ID and specification-mapping validation.
- Added Learn-renderer behaviour coverage for objective teaching, worked examples and every selectable topic.
- Added question-level retry, Progress presentation, adversarial definition-response, exhaustive recall-route/hint and clean-learner fixture coverage.
- Added browser coverage for the selectable clean learner and integrity coverage for pseudocode awaiting review.
- Added regression coverage for narrow-layout safeguards, reduced motion, scrolling table semantics, focused learning and explicit post-quiz choices.
- Added unversioned/schema-11 preservation, unrecognisable-data recovery, storage-write failure and coupled-asset release-token tests.

## [Unreleased] - 2026-07-24

### Changed
- Aligned product design documentation (`docs/design.md`) to **25Thirty Learning** standards.
- Updated main user flows (`docs/user-flows.md`) for practice questions and logic challenges.
- Updated task priorities in `TASKS.md`.
