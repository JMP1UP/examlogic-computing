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
and denominator, and the latest outcome for every question. A partial retry
writes a new snapshot for the same activity instead of creating reduced-
denominator evidence. Schema-12 and earlier schema-13 attempts remain unchanged
in storage; calculations identify records without versioned activity metadata
as reduced-precision legacy evidence.

Definition keyword checks are formative records only. They do not contribute to
completion, attainment or mastery until a trustworthy assessor is available.

## APIs and integrations

List internal APIs and external services without recording credentials.

## Hosting and environments

Document hosting, development, test, staging, and production environments.

## Logging and monitoring

Describe operational logs, alerts, metrics, privacy controls, and incident handling.

## Known technical debt

Curriculum completeness, teacher quality assurance, evidence-based progress
scoring, quiz workload and semantic marking remain outside the release-blocker
correction phase. StudySpice must not be described as ready for student use on
the basis of the operational fixes alone.
