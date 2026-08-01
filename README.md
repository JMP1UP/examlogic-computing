# examlogic-computing

## Workspace information

**Purpose:** GCSE Computer Science revision and assessment platform with deterministic activities, review-held responses, curriculum coverage, and teacher insight.

**Current status:** Active repository; review `TASKS.md` and `docs/roadmap.md` for current priorities.

**Technology stack:** Browser JavaScript, Vercel server functions, Jest, and a Supabase-compatible persistence layer.

**Local setup:**

1. Install the runtime versions expected by the repository.
2. Run `npm ci` when a lockfile is present, otherwise follow the repository-specific setup.
3. Copy `.env.example` to the appropriate local environment file and provide values through an approved secret store.
4. Never commit local environment files.

**Development, test, and build commands:**

- `npm run test` â€” `jest`
- `npm run lint` â€” `node -c app.js api/*.js`

**Deployment:** Inspect the checked-in hosting configuration and deployment provider before releasing. Use `docs/release-checklist.md` for every release.

**External services:** Inspect configuration and `docs/architecture.md`. Never place credentials in documentation.

**Repository:** https://github.com/JMP1UP/examlogic-computing.git
