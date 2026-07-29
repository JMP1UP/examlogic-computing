# Architecture

## Framework and language

**Detected stack:** JavaScript web application

Confirm supported runtime versions against package metadata and deployment settings.

## Frontend

The application is a static, client-rendered JavaScript interface. `index.html`
loads safeguarding, curriculum content, priority assessments, the local database
and the app controller in that order. Curriculum scripts publish through the
single `window.StudySpiceContent` namespace; their internal declarations remain
file-scoped. `database.js` validates those dependencies before publishing
`window.db`, and `app.js` publishes `window.app`.

Student navigation uses internal route IDs such as `stud-dashboard`,
`stud-learn`, `stud-recall` and `stud-progress`. The Learn route has one canonical
renderer backed by objective-level curriculum content.

## Backend

Describe server components, services, jobs, and business-logic boundaries.

## Authentication and authorization

Document identity providers, session handling, roles, and permission enforcement.

## Database

The browser prototype stores its local state under the `studyspice_db`
`localStorage` key. `database.js` owns the schema and an ordered migration
registry. Schema 12 is upgraded to schema 13 non-destructively: system-owned
curriculum collections are merged by stable ID, while learner-, teacher- and
school-generated records remain unchanged. Failed or unsupported migrations do
not overwrite the stored payload.

Question objects carry their own specification reference. Legacy duplicate IDs
remain on renamed objects as `legacyQuestionId` metadata; historical attempts
continue to resolve to the retained canonical object with the original ID.

New scored quiz and number-skills records use evidence version 2. Each original
set has stable `activityId` and `attemptSetId` values, its original question IDs
and denominator, the latest outcome for every question, each question's
specification section and assessment focus, and the applicable checkpoint-rule
version. A partial retry
writes a new snapshot for the same activity instead of creating reduced-
denominator evidence. Schema-12 and earlier schema-13 attempts remain unchanged
in storage; calculations identify records without versioned activity metadata
as reduced-precision legacy evidence.

Checkpoint eligibility is governed by an explicit versioned rule registry rather
than raw question counts. Each rule lists the distinct assessment focuses that
must all be demonstrated. New evidence snapshots the applicable rule version;
older or mismatched evidence can remain visible and contribute to its supported
score calculation, but cannot be treated as representative section breadth.

The Progress evidence list groups version-2 assessed snapshots by `activityId`
and presents only the latest snapshot as counted evidence. Earlier snapshots
remain in storage for audit history. Legacy, formative and awaiting-review
records remain individually visible because their existing metadata does not
support safe version-2 grouping.

Each question reachable in a five-minute recall set owns its `retryHint` in its
source content object. Validation enforces structural safety and reviewed
conceptual anchors, but human curriculum review remains responsible for judging
the teaching quality of each hint. Production and validation share the same
topic- and objective-selection functions. Validation enumerates every objective
route across all combinations of previously demonstrated checkpoint focuses, so
newly reachable questions cannot bypass the hint contract.

Definition keyword checks are formative records only. They do not contribute to
completion, attainment or mastery until a trustworthy assessor is available.

The selectable clean-learner demo uses a dedicated non-persisted persona ID, so
it begins without seeded attempts, submissions, progress or badges. It is a
product demonstration state rather than a new authentication or database role.

Pseudocode uses strict normalised matching only to recognise the defined
reference answer. A meaningful non-matching response is stored as
`pseudocode_review` with `completionStatus: awaiting_review` and does not
contribute to completion or mastery. This preserves potentially valid equivalent
algorithms for human review without claiming an unsupported automated judgement.

## APIs and integrations

List internal APIs and external services without recording credentials.

## Hosting and environments

Document hosting, development, test, staging, and production environments.

## Logging and monitoring

Describe operational logs, alerts, metrics, privacy controls, and incident handling.

## Known technical debt

Curriculum completeness and teacher quality assurance still require qualified
human review. Semantic/equivalence marking and any confidence-driven scheduling
policy require separately validated designs. Historical evidence without stable
question IDs, focus metadata or checkpoint rule versions remains visible with
reduced precision rather than being rewritten.
