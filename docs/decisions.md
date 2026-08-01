# Architecture decisions

## 2026-08-01 — Separate deterministic marking from human review

**Status:** Accepted

Only explicitly rule-based, tested responses receive immediate marks. Extended writing and meaningful code that cannot be assessed safely remain pending review.

## 2026-08-01 — Base progress on representative assessed evidence

**Status:** Accepted

Progress views disclose the contributing activities, dates, and assessment focuses. Unassessed practice and incomplete topic coverage must not be presented as mastery.

## 2026-08-01 — Keep curriculum content auditable

**Status:** Accepted

OCR J277 mapping, examiner knowledge, questions, and coverage rules remain versioned content with automated validation. Curriculum changes require coverage evidence and changelog updates.

## 2026-08-01 — Enforce school scope on the server

**Status:** Accepted

Demo browser storage is separate from authenticated shared data. Server routes validate sessions, school membership, role, and record scope for every protected operation.
