# Two-year question-bank strategy

## Purpose

The bank must support regular GCSE study for two academic years without making
repetition predictable or presenting weak generated material as exam practice.
The official OCR J277 specification is the coverage spine. Past papers and
examiner reports inform style and common misconceptions, but all live questions
are original.

## Honest scale target

The long-term target is 400–600 reviewed items, reached in controlled releases:

- each specification strand: 6–10 retrieval items, 3–5 short exam questions and
  2–4 constructed-response questions;
- programming: 60–100 written exam questions plus 30–50 executable challenges;
- every algorithm named in 2.1.3: retrieval, trace and practical application;
- variants must change the reasoning or data, not just names and numbers.

These are capacity targets, not a claim about current coverage. A strand is not
declared ready merely because one question maps to it.

## Required item record

Every assessed item needs a stable ID, specification point, assessment focus,
paper, command word, marks, expected time, response format, AO emphasis,
difficulty, prerequisite, variant-family ID, source/review status and review
date. Retired items keep their IDs so historical evidence remains interpretable.

Before release, validation must reject duplicate or missing IDs, unknown or
conflicting mappings, answer-revealing hints, incomplete mark schemes, copied
variants and checkpoint focuses with no reachable evidence.

## Selection and exposure

Custom papers select by specification coverage, response format, marks, time and
AO shape before randomisation. Programming practice is a supplementary mode,
not an official OCR paper, and initially offers 10- and 20-minute papers only.
It draws from reviewed written exam tasks; executable Python challenges remain a
separate practice route with deterministic tests and explanation evidence.
Question-level exposure history should eventually be stored through a versioned,
non-destructive data change. Until that exists, the product must not claim
two-year non-repetition. The future selector should prefer unseen variant
families, then least-recently-seen items, while still allowing deliberate retry.

Seeded selection is required to vary between equally strong combinations. A
many-seed regression check rejects any unrestricted short paper for which one
constructed task appears every time. This guards against immediately
predictable papers, but it is not a substitute for the future exposure history
or the reviewed 400–600-item capacity target.

## Controlled delivery

1. Correct factual errors and close named algorithm/programming gaps.
2. Establish metadata, validation and an inventory report.
3. Add reviewed variants in small specification batches with teacher and OCR
   examiner sign-off.
4. Add versioned exposure records and retirement/replacement rules.
5. Calibrate timing and difficulty using anonymised pilot evidence.

No batch is released solely to reach a numeric target.

## Bounded AI policy

Reviewed bank content remains the source for pupil papers. AI may help a teacher
draft a candidate item, or provide pupil-requested formative writing/programming
feedback, but a human must review any drafted question before publication. AI
does not invent live summative questions, award completion, update mastery or
write class judgements.

Cost and safety controls are: explicit pupil action, school opt-in, short input
limits, capped structured outputs, per-user cooldowns, deterministic fallbacks,
configurable models and no repeated call when a local rule can answer. Future
expansion requires a school-level budget cap, privacy/retention policy and usage
telemetry that records counts and failures without retaining pupil answers.
