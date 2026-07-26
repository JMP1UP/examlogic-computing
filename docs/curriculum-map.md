# OCR GCSE Computer Science J277 curriculum map

## Authority and use

The primary source is **OCR GCSE (9-1) Computer Science J277, version 3.1, 2026**, specifically the content tables on printed pages 6-21 and the OCR Exam Reference Language on printed pages 25-31.

The app uses some internal strand IDs to make broad OCR points teachable and trackable. These IDs are not presented as extra OCR specification points:

- `1.2.4a` to `1.2.4d` divide official point `1.2.4` into numbers, characters, images and sound.
- `1.6.2` separates legislation and licensing from the impacts strand but maps to official point `1.6.1`.
- `2.2.PY` tracks practical programming in the centre's chosen high-level language and maps to the practical programming requirement and the techniques in section 2.2.
- `2.2.ERL` tracks the distinct OCR Exam Reference Language requirement across sections 2.1-2.3 and 3c.

Supporting revision resources may help identify misconceptions or useful contexts, but they do not define scope. All live teaching and questions must be original.

## Evidence model

Coverage is recorded per internal strand. A strand is not complete because it has a title or a broad topic note. The application checks separately for:

1. an objective-level explanation and worked example;
2. key terminology and a misconception;
3. a diagnostic check;
4. at least three retrieval alternatives;
5. at least two application activities;
6. at least one exam-transfer activity;
7. at least eight assessment alternatives in total;
8. teacher quality assurance.

The status **Awaiting QA** means the quantitative evidence is present; it does not claim that teacher review has happened. **Developing** and **Foundation** identify remaining gaps.

## Current audited coverage

This table records the implemented evidence after the July 2026 integrity pass. `Teach` means an objective-level explanation, worked example, key terms and misconception are present.

| App strand | Official OCR reference | Printed page(s) | Teach | Diagnostic | Retrieval | Application | Exam transfer |
|---|---|---:|---:|---:|---:|---:|---:|
| 1.1.1 Architecture of the CPU | 1.1.1 | 6 | 1 | 1 | 6 | 0 | 1 |
| 1.1.2 CPU performance | 1.1.2 | 6 | 1 | 1 | 2 | 1 | 0 |
| 1.1.3 Embedded systems | 1.1.3 | 6 | 1 | 1 | 1 | 0 | 0 |
| 1.2.1 Primary storage | 1.2.1 | 7 | 1 | 1 | 6 | 1 | 1 |
| 1.2.2 Secondary storage | 1.2.2 | 7 | 1 | 1 | 3 | 0 | 0 |
| 1.2.3 Units | 1.2.3 | 8 | 1 | 1 | 1 | 0 | 0 |
| 1.2.4a Numbers | 1.2.4 | 8 | 1 | 1 | 2 | 0 | 0 |
| 1.2.4b Characters | 1.2.4 | 9 | 1 | 1 | 2 | 0 | 0 |
| 1.2.4c Images | 1.2.4 | 9 | 1 | 1 | 0 | 0 | 1 |
| 1.2.4d Sound | 1.2.4 | 9 | 1 | 1 | 2 | 1 | 0 |
| 1.2.5 Compression | 1.2.5 | 9 | 1 | 1 | 1 | 0 | 0 |
| 1.3.1 Networks and topologies | 1.3.1 | 10 | 1 | 1 | 2 | 1 | 0 |
| 1.3.2 Connections, protocols and layers | 1.3.2 | 11 | 1 | 1 | 5 | 0 | 1 |
| 1.4.1 Threats | 1.4.1 | 12 | 1 | 1 | 2 | 0 | 0 |
| 1.4.2 Preventing vulnerabilities | 1.4.2 | 12 | 1 | 1 | 3 | 1 | 0 |
| 1.5.1 Operating systems | 1.5.1 | 13 | 1 | 1 | 4 | 0 | 0 |
| 1.5.2 Utility software | 1.5.2 | 13 | 1 | 1 | 1 | 0 | 0 |
| 1.6.1 Impacts | 1.6.1 | 14 | 1 | 1 | 1 | 1 | 1 |
| 1.6.2 Legislation and licensing | 1.6.1 | 14 | 1 | 1 | 4 | 0 | 0 |
| 2.1.1 Computational thinking | 2.1.1 | 15 | 1 | 1 | 1 | 0 | 0 |
| 2.1.2 Designing and refining algorithms | 2.1.2 | 15 | 1 | 1 | 4 | 2 | 1 |
| 2.1.3 Searching and sorting | 2.1.3 | 16 | 1 | 1 | 4 | 1 | 1 |
| 2.2.1 Programming fundamentals | 2.2.1 | 17 | 1 | 1 | 6 | 2 | 1 |
| 2.2.2 Data types | 2.2.2 | 18 | 1 | 1 | 1 | 0 | 0 |
| 2.2.3 Additional techniques | 2.2.3 | 18 | 1 | 1 | 4 | 2 | 1 |
| 2.2.PY Practical Python | 2d and 2.2 | 17-22 | 1 | 1 | 0 | 10 | 1 |
| 2.2.ERL OCR reference language | 3c and 2.1-2.3 | 25-31 | 1 | 1 | 4 | 2 | 1 |
| 2.3.1 Defensive design | 2.3.1 | 19 | 1 | 1 | 2 | 1 | 0 |
| 2.3.2 Testing | 2.3.2 | 19 | 1 | 1 | 6 | 2 | 2 |
| 2.4.1 Boolean logic | 2.4.1 | 20 | 1 | 1 | 5 | 0 | 0 |
| 2.5.1 Languages | 2.5.1 | 21 | 1 | 1 | 4 | 1 | 1 |
| 2.5.2 IDE | 2.5.2 | 21 | 1 | 1 | 1 | 0 | 0 |

## Audit findings and implementation decisions

- Objective-level teaching was absent from the data model even though broad topic notes existed. `curriculum-content.js` now supplies an original explanation, worked example, terminology, misconception and exact official reference for every strand.
- Every strand now has an original diagnostic question with explanatory feedback.
- The old assembler retrieval question was outside the required depth of 2.5.1 and has been replaced with a high-level versus low-level language question.
- The IDE assessment now covers the OCR-listed translator facility rather than counting a debugger as required evidence.
- Syntax and logic error items now map to testing (`2.3.2`), and open-source licensing maps to the internal legislation strand (`1.6.2` / official `1.6.1`).
- The first priority assessment pass adds complete quantitative evidence banks for `2.1.2`, `2.2.1`, `2.2.3`, `2.2.ERL` and `2.3.2`. These contain original retrieval, application and exam-transfer activities with explanatory feedback.
- Most strands still lack enough application, exam-transfer and alternate items. They remain honestly labelled as incomplete by the application.

## Next implementation priority

1. Conduct teacher quality assurance on the five completed Paper 2 banks; “Awaiting QA” is not a completeness claim.
2. Build equivalent application and exam-transfer banks for Paper 1, starting with `1.2.4a-c`, `1.3.1-2`, `1.4.1-2` and `1.5.1-2`.
3. Fill remaining Paper 2 gaps in data types, defensive design, Boolean logic, languages and IDE facilities.
4. Add spaced alternatives until every strand reaches the evidence thresholds, then conduct teacher QA before any readiness claim.

## Maintenance rule

When content changes, update this map and the objective-level source metadata in `curriculum-content.js`. Tests must reject unmapped content, missing official references, missing diagnostic answers and any readiness calculation that lacks the required evidence types.

## Question identifier integrity

The July 2026 blocker pass corrected duplicated retrieval IDs. The original ID
remains on the first canonical question so existing attempts remain
interpretable. Each renamed question carries `legacyQuestionId` plus its own
`specificationPointId`; the legacy field records provenance and is not used as
the live identity.

| Legacy duplicated ID | Stable ID assigned to the second question | Specification strand |
|---|---|---|
| `q_1_1_a` | `q_1_1_cpu_purpose` | `1.1.1` |
| `q_1_1_b` | `q_1_1_cache_performance` | `1.1.2` |
| `q_1_1_c` | `q_1_1_mdr` | `1.1.1` |
| `q_1_2_a` | `q_1_2_ram_rom_difference_alt` | `1.2.1` |
| `q_1_2_b` | `q_1_2_virtual_memory` | `1.2.1` |
| `q_1_3_a` | `q_1_3_binary_overflow` | `1.2.4a` |
| `q_1_3_b` | `q_1_3_unicode` | `1.2.4b` |
| `q_1_3_c` | `q_1_3_sampling_rate` | `1.2.4d` |
| `q_1_4_a` | `q_1_4_lan_wan` | `1.3.1` |
| `q_1_4_b` | `q_1_4_router_role_alt` | `1.3.2` |
| `q_1_5_c` | `q_1_5_firewall_alt` | `1.4.2` |
| `q_1_6_a` | `q_1_6_multitasking` | `1.5.1` |
| `q_1_7_a` | `q_1_7_data_protection_act` | `1.6.2` |

These operational corrections do not change the incomplete curriculum status
recorded above or replace teacher quality assurance.
