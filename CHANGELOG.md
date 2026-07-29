# Changelog — ExamLogic Computing

All notable changes to ExamLogic Computing are recorded here.

## [Unreleased] - 2026-07-26

### Added
- Added restrained, evidence-backed section milestones across Learn, Dashboard and Progress.
- Added quiet checkpoint acknowledgement after qualifying assessed activities, without points, streaks, leaderboards or page-view rewards.
- Added versioned, focus-based checkpoint rules so only representative demonstrated evidence can secure a section; retries replace the latest outcome for the same activity and concept.
- Added validation that formative work, awaiting-review work, legacy reduced-precision records, duplicate-concept questions and repeated retries cannot inflate section checkpoints.
- Enabled checkpoints for 27 sufficiently assessed sections. Five under-assessed sections remain visible but excluded from the achievable denominator: `1.2.4c`, `1.5.2`, `2.1.1`, `2.2.2` and `2.2.PY`.

### Fixed
- Replaced low-contrast yellow and reused accent foregrounds with WCAG AA text tokens, and raised small interface labels to a readable minimum across student, teacher, public and dark-mode views.
- Corrected out-of-scope TCP/IP layer-name assessment, misleading MAC permanence and storage-unit feedback, ERL terminator syntax, a variables/constants mapping, and inaccurate programming explanations.
- Reclassified the old layer-name item as a preserved historical record and added an in-scope layers-benefit replacement.
- Restored core status and executable practice for two-dimensional arrays, subprograms, reproducible randomness and authentication.
- Isolated curriculum and assessment scripts behind the `StudySpiceContent` browser namespace so production-order script loading no longer creates top-level identifier collisions.
- Replaced the schema 12-to-13 local-data reset with a versioned migration that preserves learner, teacher and school-generated records while merging current system content.
- Assigned stable unique IDs to 13 duplicated retrieval questions, retaining each legacy ID on the renamed content for audit interpretation.
- Consolidated the student Learn page to one curriculum-backed renderer with controlled missing-content states.
- Preserved full question-set evidence across partial retries so reduced retry denominators cannot inflate mastery.
- Added individually reviewed, question-owned retry guidance to every question reachable in a five-minute recall set.
- Grouped version-2 retry snapshots by activity in Progress so only the latest counted evidence is presented while storage history remains intact.
- Classified definition keyword checks as formative-only evidence and labelled reduced-precision historical evidence.
- Added a recovery route for unavailable programming challenges and aligned earned-badge wording with stored awards.
- Routed meaningful non-matching pseudocode submissions to teacher review without awarding completion or mastery.
- Added a selectable clean new-learner demo with no seeded evidence, progress or badges.
- Labelled static teacher examples as demonstration narrative rather than calculated learner judgements.
- Improved code-display typography, keyboard focus coverage and responsive pseudocode layout.

### Tests
- Added whole-specification traceability, workload, supported-practice, retired-content and application-route validation.
- Added production-order browser startup and Student Demo smoke coverage.
- Added realistic schema 12 migration fixtures and preservation assertions.
- Added question-bank ID and specification-mapping validation.
- Added Learn-renderer behaviour coverage for objective teaching, worked examples and every selectable topic.
- Added question-level retry, Progress presentation, adversarial definition-response, recall-hint and clean-learner fixture coverage.
- Added browser coverage for the selectable clean learner and integrity coverage for pseudocode awaiting review.

## [Unreleased] - 2026-07-24

### Changed
- Aligned product design documentation (`docs/design.md`) to **25Thirty Learning** standards.
- Updated main user flows (`docs/user-flows.md`) for practice questions and logic challenges.
- Updated task priorities in `TASKS.md`.
