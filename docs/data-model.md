# Data model

## Storage architecture

ExamLogic supports a browser/demo database in `database.js` and server persistence through the database helpers in `lib/db.js`. Authentication and session routes live under `lib/auth-routes/`; API modules provide programming and extended-writing feedback. Curriculum, examiner knowledge, question banks, and priority assessment rules are versioned JavaScript content.

## Main domains

The product models schools and users, student profiles, curriculum topics and assessment focuses, questions and activities, attempts and responses, marking or review state, evidence contributing to progress, teacher insight, achievements, sessions, and administrative configuration. The executable schema and compatibility behaviour are exercised by migration, concurrency, multischool, curriculum, and assessment tests.

## Evidence integrity

- Deterministic responses may be marked automatically only where the rule is explicit and tested.
- Meaningful writing or code that cannot be marked safely remains pending review.
- Progress summaries must state the contributing assessed evidence and must not infer mastery from unrepresentative activity.
- Curriculum and question changes require coverage and examiner-knowledge validation.

## Security and lifecycle

School and user data must be tenant-scoped on the server; browser-local demo storage is not production authorization. Student responses and progress are sensitive education data. Before production use, the deployed database, migrations, backups, restoration, retention, export, correction, and deletion procedures must be recorded and verified.
