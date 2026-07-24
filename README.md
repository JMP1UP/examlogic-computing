# examlogic-computing

## Workspace information

**Purpose:** See the product and repository documentation above. Confirm the product purpose with stakeholders before changing behaviour.

**Current status:** Active repository; review `TASKS.md` and `docs/roadmap.md` for current priorities.

**Technology stack:** JavaScript web application.

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
