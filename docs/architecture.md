# Architecture

## Framework and language

**Detected stack:** JavaScript web application

The product uses browser JavaScript, Node-compatible Vercel functions, Jest, and a Supabase-compatible data layer. Runtime support is governed by the deployed Vercel/Node environment and the checked-in package lock.

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

Server routes support application sessions plus Microsoft and Google identity integrations. Session validation, school scope, roles, and administrative permissions must be enforced in server helpers and APIs; browser role state and the demo boundary are not authorization.

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

Recognisable browser datasets created before schema versioning are conservatively
treated as the schema-12 baseline, then passed through the same non-destructive
12-to-13 migration. Recognition requires several known StudySpice collections
and at least one core collection; arbitrary browser JSON is never inferred to be
StudySpice data. If recognition, migration or persistence fails, the original
stored value is not overwritten. The data layer enters read-only recovery mode
and the application presents an accessible reload/recovery screen rather than
continuing to write against an incompatible shape.

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
Re-entry uses an ID-guarded reset that removes only that fixture's attempts,
submissions and any stale fixture student record. Assignments, settings and
other learners' records are not reset. Locally saved guided-practice drafts are
namespaced by learner ID; clean-demo entry clears only its own namespace and
also resets learner-owned in-memory answer and message state.

Pseudocode uses strict normalised matching only to recognise the defined
reference answer. A meaningful non-matching response is stored as
`pseudocode_review` with `completionStatus: awaiting_review` and does not
contribute to completion or mastery. This preserves potentially valid equivalent
algorithms for human review without claiming an unsupported automated judgement.

Student routes retain their legacy internal identifiers, but a route-parent
resolver maps them to five visible destinations: My desk, Topics, Practice,
Progress and Messages. This preserves deep links and activity state while
removing legacy engines from the top-level sidebar. Teacher route identifiers
and navigation are unchanged.

Learner topic controls are stored as an optional `learnerObjectiveStates` array
on the existing pupil record. Each record includes the pupil ID, specification
point ID, study state, card state, timestamp and learner source. This additive
schema-13 shape does not alter classroom controls, attempts, submissions or
progress, and older pupil records require no migration. The stored pupil record
is the source of truth after session reload; the smaller session identity is not
used as persistence.

Personal flashcard selection and legacy availability are deliberately separate.
**Flashcards on your desk**, its topic filters and personal flashcard sessions
use only explicit active `learnerObjectiveStates`. Classroom controls and
legacy inferred coverage remain readable for compatibility but never silently
place content on a pupil's personal desk. This does not combine self-rated
recall confidence with checked attainment evidence.

The My desk weekly notebook is derived from existing learner activity records;
it does not introduce a second progress store. Flashcard completion uses
distinct local calendar days, while number-systems and programming practice use
recorded weekly sessions and exam-style practice uses the existing fortnightly
submission state. The nearest active teacher test is read from the existing test
preparation record and its specification-point identifiers are resolved against
curriculum objectives for display and navigation.
Cards use an explicit `specificationPointId` where present. A legacy topic-only
card is mapped to an objective only when its term occurs in exactly one
curriculum objective inside that same topic. Ambiguous cards retain honest
`legacy_topic` metadata and historical interpretation, but cannot enter the
personal desk without a safe objective mapping. Pausing never deletes ratings
or scheduling history.

## APIs and integrations

Current integrations include the configured database/Supabase service, Microsoft and Google identity, translation support, real-time messaging helpers, and AI-assisted programming or writing feedback routes. All keys remain server-side, and AI routes receive the minimum response context required.

## Hosting and environments

Static assets and server functions are configured for Vercel. Local development uses the repository files and Jest suite. Demo mode must stay clearly separated from authenticated school data; production requires verified identity, database, tenant, secret, and monitoring configuration.

## Logging and monitoring

Describe operational logs, alerts, metrics, privacy controls, and incident handling.

## Known technical debt

Curriculum completeness and teacher quality assurance still require qualified
human review. Semantic/equivalence marking and any confidence-driven scheduling
policy require separately validated designs. Historical evidence without stable
question IDs, focus metadata or checkpoint rule versions remains visible with
reduced precision rather than being rewritten.

Teacher-authored assessment reports are stored in `assessmentReports`. Each
record names its class, learner, assessment, specification-point judgements and
optional exam-technique tags. Reports create curriculum and practice links but
do not become demonstrated attempts, alter learner-rated confidence or award
checkpoints. Existing schema-13 browsers gain the empty collection through
non-destructive reconciliation; the schema version remains 13.
