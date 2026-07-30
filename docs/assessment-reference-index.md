# OCR J277 assessment reference index

## Purpose and boundaries

This index connects StudySpice's original assessment content to authoritative
OCR evidence without copying protected questions, mark schemes or teaching
materials into the product.

The source order is:

1. OCR J277 specification version 3.1 (May 2026);
2. OCR question papers, mark schemes, examiner reports and candidate exemplars;
3. OCR delivery materials and topic tests;
4. other teaching and revision resources.

The specification defines scope. Assessment materials inform command words,
response form, mark allocation and markability. Supporting resources may inform
sequencing or misconceptions but cannot add, remove or rename requirements.

All source files are held locally under `resources/past papers/`. That directory
is ignored by Git and must not be deployed. Application content must be written
originally. This index records patterns and provenance, not protected wording.

## Local source inventory

The July 2026 local reference set contains 641 files:

| Type | Count | Intended use |
|---|---:|---|
| PDF | 84 | Specification, papers, mark schemes, reports and supporting guidance |
| PowerPoint | 254 | Supporting teaching sequence and worked examples |
| Word | 135 | Topic tests, answers, activities and teacher notes |
| Python | 48 | Read-only programming-task reference; never execute automatically |
| Text | 42 | Read-only task and code reference |
| Spreadsheet | 12 | Read-only calculation and practice reference |
| Archives | 11 | Do not unpack or execute automatically |
| Other media/data | 55 | Supporting classroom resources; treat databases and macros as untrusted |

The authoritative assessment subset includes the current specification, both
papers and mark schemes across the available 2020-2025 series, examiner reports
for both papers, candidate exemplars and OCR Exam Reference Language material.

## Current StudySpice assessment coverage

Counts below describe live content objects, not quality assurance. `Recall`
includes diagnostic and short objective questions. `Application` is written
practice that remains awaiting review where it cannot be marked safely.
`Exam` is a mapped exam-transfer task.

| Strand | Recall | Application | Exam |
|---|---:|---:|---:|
| 1.1.1 | 7 | 1 | 1 |
| 1.1.2 | 3 | 1 | 1 |
| 1.1.3 | 2 | 1 | 1 |
| 1.2.1 | 6 | 1 | 1 |
| 1.2.2 | 5 | 1 | 1 |
| 1.2.3 | 2 | 1 | 1 |
| 1.2.4a | 4 | 1 | 1 |
| 1.2.4b | 2 | 1 | 1 |
| 1.2.4c | 2 | 1 | 1 |
| 1.2.4d | 3 | 1 | 1 |
| 1.2.5 | 2 | 1 | 1 |
| 1.3.1 | 4 | 1 | 1 |
| 1.3.2 | 6 | 1 | 1 |
| 1.4.1 | 3 | 1 | 1 |
| 1.4.2 | 4 | 1 | 1 |
| 1.5.1 | 5 | 1 | 1 |
| 1.5.2 | 2 | 1 | 1 |
| 1.6.1 | 2 | 1 | 1 |
| 1.6.2 | 5 | 1 | 1 |
| 2.1.1 | 2 | 1 | 1 |
| 2.1.2 | 5 | 2 | 1 |
| 2.1.3 | 5 | 1 | 1 |
| 2.2.1 | 8 | 2 | 1 |
| 2.2.2 | 1 | 1 | 1 |
| 2.2.3 | 5 | 2 | 1 |
| 2.2.PY | 1 | 0 | 1 |
| 2.2.ERL | 5 | 2 | 1 |
| 2.3.1 | 2 | 1 | 1 |
| 2.3.2 | 7 | 2 | 2 |
| 2.4.1 | 6 | 1 | 1 |
| 2.5.1 | 5 | 1 | 1 |
| 2.5.2 | 2 | 1 | 1 |

All 32 strands now have at least one mapped exam-transfer task. This is a route
baseline, not complete assessment coverage: broad strands still need alternate
unseen questions and explicit sub-requirement coverage. A short recall set must
never be presented as equivalent exam preparation.

## Review fields

The assessment review records the following for each internal strand:

- official J277 reference and specification depth;
- observed response formats;
- command-word range;
- typical mark bands;
- calculation, trace, code or extended-writing requirements;
- examiner-reported misconceptions and weak-answer patterns;
- markability requirements;
- current StudySpice recall, application and exam-transfer supply;
- recommended original task types;
- teacher and examiner review status.

## Independent review findings

The July 2026 OCR-examiner and experienced-teacher reviews agreed that:

- a two-question recall set is not an exam-section plan;
- calculations require visible method credit and units;
- scaffolds must match the response form rather than use one generic essay
  planner;
- one specification point per 8-12 minute session is a defensible focused task,
  but later mixed practice is required;
- test preparation must remain inside the existing weekly allocation;
- broad strands need prerequisite checks and unseen alternatives before they can
  be described as exam ready.

Frequent design targets include bits/bytes and conversion direction, omitted
units, MAR/MDR confusion, unsupported claims about processor cores, quality
statements not linked to file size, generic scenario-free explanations and
informal prose where code or OCR Exam Reference Language is required.

## Initial priority

The active Data Representation test plan selects `1.2.3` and `1.2.4a-d`.
Each now has a separate original exam-transfer task. Evidence remains separate:
units, number representation, characters, images and sound cannot demonstrate
one another. Calculation tasks carry explicit stages for formula or values,
arithmetic, conversion and final unit. Number representation separately checks
conversion, shifting and overflow; the character task requires applied
explanation rather than naming a character set.

Image and sound calculation tasks carry `traceabilitySpecificationPointIds`
references to official point `1.2.3`. These references support curriculum audit
only: they do not award extra evidence or allow one activity to count twice.
The separate units and text-size tasks provide assessed practice directly
against `1.2.3`.

This remains partial coverage rather than an exam-readiness claim. In
particular, the new binary-addition variant awaits qualified-teacher validation,
every point needs an unseen alternative, and a later mixed session must check
whether pupils can select the correct method without being told the strand.
