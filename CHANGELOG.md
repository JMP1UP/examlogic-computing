# Changelog — ExamLogic Computing

All notable changes to ExamLogic Computing are recorded here.

## [Unreleased] - 2026-07-26

### Fixed
- Isolated curriculum and assessment scripts behind the `StudySpiceContent` browser namespace so production-order script loading no longer creates top-level identifier collisions.
- Replaced the schema 12-to-13 local-data reset with a versioned migration that preserves learner, teacher and school-generated records while merging current system content.
- Assigned stable unique IDs to 13 duplicated retrieval questions, retaining each legacy ID on the renamed content for audit interpretation.
- Consolidated the student Learn page to one curriculum-backed renderer with controlled missing-content states.

### Tests
- Added production-order browser startup and Student Demo smoke coverage.
- Added realistic schema 12 migration fixtures and preservation assertions.
- Added question-bank ID and specification-mapping validation.
- Added Learn-renderer behaviour coverage for objective teaching, worked examples and every selectable topic.

## [Unreleased] - 2026-07-24

### Changed
- Aligned product design documentation (`docs/design.md`) to **25Thirty Learning** standards.
- Updated main user flows (`docs/user-flows.md`) for practice questions and logic challenges.
- Updated task priorities in `TASKS.md`.
