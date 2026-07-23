# ExamLogic multi-school architecture

ExamLogic uses one platform with a strict tenant boundary per school. Leicester
High is the first tenant, not a hard-coded special case.

## Customer journey

1. A school creates a trial organisation.
2. An ExamLogic operator verifies its email domain.
3. The school chooses Microsoft, Google, SAML, or temporary pilot accounts.
4. Staff and pupils are linked to that school when they first sign in.
5. Classes arrive through Veracross, another MIS connector, CSV, or manual setup.
6. The school moves from pilot to a paid subscription without data migration.

## Data boundary

Every person, class and configuration belongs to a school. New session tokens
carry `schoolId`, and the server checks that claim against the stored profile.
OAuth subjects are stored with both provider and provider tenant identifiers.
This avoids linking two people merely because their email addresses happen to
match.

The browser has no direct table access. Server routes use the Supabase service
role and must always derive the school from the validated session, never from a
school ID supplied by the browser.

## Identity and roster integrations

Identity providers are configured per school. Public client IDs and tenant IDs
may be returned to the sign-in page; secrets are represented only by deployment
secret references and are never stored in browser-readable configuration.

Veracross is an optional roster source, not the login dependency. ExamLogic
caches the minimum necessary class information so learning can continue during
an MIS outage. Other schools can use CSV/manual setup or a future connector.

## Commercial configuration

The school record holds lifecycle, onboarding, subscription tier and billing
reference fields. Billing systems remain the source of truth for payments;
ExamLogic uses the tier only to enable agreed product limits and features.

## Before general sale

- Complete Microsoft Entra sign-in for the Leicester pilot.
- Add tenant-scoped API helpers to every new staff/admin route.
- Add automated cross-school access tests for each new data type.
- Agree retention, deletion, DPA, subprocessor and incident processes.
- Add self-service school onboarding only after domain ownership verification.
- Complete a DPIA and independent security review before onboarding pupils from
  additional schools.
