# OCR J277 theory coverage audit

## Audit purpose

This audit asks a stricter question than whether every OCR strand has a route:
does the student-facing site provide a concise, accurate and sufficiently
detailed review of every assessable theory requirement, without relying on a
teacher or textbook to fill gaps?

The initial answer on 1 August 2026 was **no**. The staged correction described
below has now added the missing concise theory and worked representations,
corrected the confirmed inaccuracies and passed the project’s examiner,
experienced-teacher and mixed-attainment persona checks. This remains an
implementation audit, not a substitute for final review by a named qualified
human teacher using the deployed site.

This is a content-depth finding. It does not invalidate the existing learning
integrity, migration or operational work.

## Sources and method

The source hierarchy in `resources/COVERAGE_AUDIT.md` is sound and was retained:

1. OCR J277 specification version 3.1 (2026) defines scope and depth.
2. Current papers, mark schemes, examiner reports and candidate exemplars show
   assessment demand and recurring misconceptions.
3. OCR delivery resources, quizzes, workbooks and revision cards inform useful
   sequencing and representations but do not add specification requirements.
4. Other material is supporting evidence only.

The local resource folder contains 641 files. Text was extracted successfully
from all 563 text-bearing files in the main formats: 84 PDFs, 135 Word files,
253 PowerPoints, 48 Python files, 42 text files and one CSV. The remaining 78
files are archives, spreadsheets, images, links, video, databases, macros or
design-source files. They were inventoried but not executed. Archives and
databases were treated as untrusted; equivalent unpacked delivery resources
already present in the folder supplied the readable teaching evidence.

The audit then compared the printed specification content pages 6-21 against:

- `curriculum-content.js` explanations, worked examples, misconceptions and
  all `teachingSections`;
- the rendered student topic route (`Topics` -> strand -> review);
- mapped diagnostics, flashcards, supported practice and exam-transfer tasks;
- `docs/curriculum-map.md` and `docs/assessment-reference-index.md`;
- the curriculum tests, to distinguish structural presence from content depth.

Published questions and mark-scheme wording were not copied.

## Whole-course finding

The current `docs/curriculum-map.md` correctly says the application is a
structured baseline rather than a course-readiness claim. Its numeric columns
show that objects exist, not that all specification bullets are taught. The
tests likewise require at least two sections and two cards for many strands;
those thresholds cannot prove completeness. Several broad sections contain
only 65-100 words of expanded teaching.

The live renderer genuinely displays the explanation and teaching sections.
That is positive, but it also means omissions in `curriculum-content.js` are
student-facing omissions. A rendered check of `1.3.1` showed coverage of
LAN/WAN, client-server/peer-to-peer, four devices and star/mesh, while the
required detail on transmission media, network-performance factors, DNS,
hosting, web clients/servers and cloud trade-offs was absent from the visible
step-by-step teaching.

## Confirmed accuracy problems

These should be corrected before claiming even a concise revision baseline:

1. `1.1.2` describes clock speed as the number of complete fetch-decode-execute
   cycles per second. Clock speed counts clock cycles; one instruction may need
   multiple cycles.
2. `1.2.2` calls solid-state storage the maximum for speed and durability. That
   is an unsafe absolute and bypasses the scenario-based comparison OCR expects.
3. `1.3.2` calls a MAC address permanent, burned into the NIC and unchanging.
   This contradicts the project's own correction note and is not reliably true.
4. `1.3.2` says POP downloads and deletes mail from the server. POP clients may
   be configured to leave a server copy; the key contrast should not depend on
   automatic deletion.
5. `1.6.2` says the Computer Misuse Act simply makes malware creation illegal.
   The explanation must distinguish unauthorised access/acts and the relevant
   intent or supply offences rather than make an unconditional claim.
6. `2.5.1` presents compilation as always producing a standalone executable and
   interpretation as always stopping immediately at the first error. These are
   over-generalisations, not dependable definitions.
7. `2.5.2` visually combines the required translator facility with a debugger,
   even though debugger knowledge is not one of the four named J277 facilities.
   Extra useful context must be labelled as such and not blur required scope.

## Strand-by-strand theory audit

Ratings mean:

- **Baseline sufficient**: concise theory covers the stated OCR requirement;
  examples or variation can still improve it.
- **Targeted expansion**: the core is useful but one or more required elements
  need clearer or fuller treatment.
- **Significant gap**: important required content is absent, too compressed or
  affected by a material accuracy issue.

| Strand | Rating | Confirmed theory need | Purposeful visual treatment |
|---|---|---|---|
| `1.1.1` CPU architecture | Baseline sufficient | Keep the current component/register distinctions; avoid implying that detailed register transfers beyond the required stage actions must be memorised. | Three-stage fetch/decode/execute flow with address and data paths distinguished by colour and a MAR/MDR comparison card. |
| `1.1.2` CPU performance | **Significant gap** | Correct the clock-cycle claim. Teach each factor, combined effects, task/software limits, heat/power constraints as context rather than specification facts, and why changes are not proportional. | Three-factor comparison grid plus two contrasting workload scenarios; no decorative speedometer. |
| `1.1.3` Embedded systems | Baseline sufficient | Retain purpose, characteristics, varied examples and input-process-output distinction. | Annotated everyday device showing sensor, controller and output. |
| `1.2.1` Primary storage | Targeted expansion | Make the need for primary storage explicit; compare volatility, purpose and typical use of RAM/ROM/cache; explain virtual-memory transfer without unnecessary paging detail. | RAM/ROM/cache comparison grid and a simple RAM-full transfer diagram. |
| `1.2.2` Secondary storage | Targeted expansion | Remove absolutes. Cover device/media recognition and scenario comparison across capacity, speed, portability, durability, reliability and cost. | Technology-by-factor matrix with scenario callouts; icons may aid scanning but must not replace reasons. |
| `1.2.3` Units and capacity | Targeted expansion | Put the complete unit ladder and all required text/image/sound formulas in this review, including multi-file capacity and clear decimal/1,024 handling. | Unit ladder and colour-separated worked calculations where formula, substitution, conversion and final unit occupy distinct rows. |
| `1.2.4a` Numbers | Baseline sufficient | Current conversion, addition, overflow and shifts baseline is sound; add a worked addition/overflow example alongside the conversion example. | Place-value strip, nibble grouping and column addition with carries; animate only if controls remain accessible. |
| `1.2.4b` Characters | Baseline sufficient | Retain codes, capacity, order and ASCII/Unicode comparison without asking pupils to memorise codes. | Small code-table extract and `n bits -> 2^n codes` relationship. |
| `1.2.4c` Images | Baseline sufficient | Current representation, metadata, quality and size relationship is concise and suitable. | Pixel-grid zoom, labelled metadata card and staged size calculation. |
| `1.2.4d` Sound | Baseline sufficient | Standardise on OCR's term `bit depth`; retain analogue sampling, quality and size effects. | Sample points on an analogue wave, with separate rate/depth annotations and a calculation strip. |
| `1.2.5` Compression | Baseline sufficient | Current need, lossy/lossless effects and scenario choice are suitable. | Side-by-side decision grid showing exact recovery, quality and typical use. |
| `1.3.1` Networks/topologies | **Strengthened; human QA pending** | The review now separates scope, resource model and topology; applies LAN/WAN, client-server/peer-to-peer and star/mesh; connects school-network hardware; and retains performance, DNS, hosting and cloud teaching. | Switch-centred school network, DNS sequence and short trade-off parts. |
| `1.3.2` Connections/protocols/layers | **Significant gap** | Correct MAC and POP claims. Teach wired/wireless comparison, Ethernet/Wi-Fi/Bluetooth recommendations, encryption principle, IPv4/IPv6 formats, standards, all named protocol purposes and benefits of layers. | Connection decision table, address-format examples, protocol-purpose cards and an unnamed stacked-layer diagram focused on benefits. |
| `1.4.1` Security threats | **Strengthened; human QA pending** | The six named threat types now have mechanism, purpose and impact teaching, plus a fresh linked social-engineering/malware scenario with concealed feedback. | Short threat groups, SQL-injection pathway and applied scenario. |
| `1.4.2` Preventing vulnerabilities | **Strengthened; human QA pending** | The named controls explain their mechanism and limitations; an applied task now matches repeated password attempts and physical access to suitable controls. | Control groups and a threat-control application check. |
| `1.5.1` Operating systems | **Strengthened; human QA pending** | A pupil editing, playing audio and printing now links all five functions in one believable task before the functions are studied separately. | Follow-one-task example, followed by short function groups. |
| `1.5.2` Utility software | **Strengthened; human QA pending** | Encryption, defragmentation and compression now use problem-benefit-limitation scenarios, including the HDD/SSD distinction. | Three scenario checks plus a fresh application prompt. |
| `1.6.1` Impacts | **Strengthened; human QA pending** | Five impact lenses, stakeholder-consequence development and justified conclusions are now followed by a fresh facial-recognition scenario and marking guidance. | Stakeholder-impact prompts and balanced-response guidance. |
| `1.6.2` Law/licensing | **Strengthened; human QA pending** | The three Acts use accurate purpose/action language; open/proprietary licensing is applied in context; a three-action law check has concealed answers. | Law-purpose-action and licensing decision checks. |
| `2.1.1` Computational thinking | Baseline sufficient | Current three principles, connection between them and contextual example are suitable. | One problem progressively decomposed, abstracted and expressed as ordered steps. |
| `2.1.2` Designing/refining algorithms | **Strengthened; human QA pending** | Trace/correction, IPO, structure diagrams, flowchart symbols and refine/retest teaching now each include a fresh formative task with a concealed check. | Trace table plus checkable IPO, symbol and off-by-one activities. |
| `2.1.3` Search/sort algorithms | **Strengthened; human QA pending** | Five separate cycles now teach linear, binary, bubble, insertion and merge, including prerequisites, stopping conditions, complete states, common mistakes and formative paper checks with concealed worked traces. | Indexed search strips, adjacent comparisons, growing sorted section and full split/merge sequence. |
| `2.2.1` Programming fundamentals | **Strengthened; human QA pending** | Variables, constants, assignment, I/O, operators, sequence, selection and both loop types now have worked traces and four checkable construction/application tasks. | Code snippets, loop trace and concealed operator/control-structure answers. |
| `2.2.2` Data types | Baseline sufficient | Current types, contextual choice and casting baseline is suitable. | Data-card sorting activity and one input/cast transformation. |
| `2.2.3` Additional techniques | **Strengthened; human QA pending** | The four displayed study parts now combine worked syntax/traces with checkable tasks for strings/arrays, files/SQL, subprograms/scope and random values. | Array grid and concealed code/SQL/subprogram/test checks across four sessions. |
| `2.2.PY` Practical Python | **Strengthened; variants still needed** | The challenge pathway is now preceded by a novice routine that connects planning, incremental construction, test categories, debugging and explanation. More variants are still needed before claiming a two-year non-repeating pathway. | Retain the responsive code/trace/test workspace and add reviewed variants per construct rather than more levels. |
| `2.2.ERL` OCR reference language | **Baseline sufficient** | The reference and nine-stage practice now cover assignment, I/O, selection, loops, strings, arrays, files, functions, parameters, return values and scope through read, trace, complete, write and refine tasks. | Add search/filter only if learner testing shows the segmented reference is still difficult to navigate. |
| `2.3.1` Defensive design | **Strengthened; human QA pending** | A login flow now keeps validation and authentication separate, gives a safe retry route, limits rapid attempts and links responsibilities to named subprograms. | Four-stage input, validation, authentication and response flow. |
| `2.3.2` Testing | Targeted expansion | Add complete test-plan construction, iterative versus terminal examples, expected/actual results and algorithm refinement after failure. Preserve the precise normal/boundary/invalid/erroneous distinctions. | Test-plan table with colour-independent category labels and a fail-fix-retest loop. |
| `2.4.1` Boolean logic | Targeted expansion | Existing SVG gates and truth tables are valuable. Add explicit create/edit-from-scenario modelling and ensure combined diagrams are explained gate by gate, not just displayed. | Retain accessible SVGs, highlight one intermediate output at a time and pair every colour with labels/patterns. |
| `2.5.1` Languages/translators | **Strengthened; human QA pending** | High/low-level purpose and translation are taught without absolute performance claims; compiler/interpreter trade-offs now end in a contextual recommendation with concealed guidance. | Source-to-machine flow and translator decision check. |
| `2.5.2` IDE | Targeted expansion | Teach the four named facilities and how each supports development, with practical examples. Label debugger features as useful extension context rather than a named specification facility. | Annotated IDE mock-up with editor, diagnostics, runtime and translator callouts. |

## What examiner evidence adds

The 2022-2025 reports reinforce that complete revision cannot be definition-only:

- candidates lose marks when calculations omit working, conversions, carries,
  quantities or units;
- vague claims such as “faster” or “cheaper” fail without stating what changes
  and applying it to the scenario;
- network standards/protocol purposes and suitable security controls are often
  confused;
- extended responses need the named context, multiple perspectives, developed
  consequences and a justified conclusion;
- Paper 2 requires precise algorithm steps, trace-table discipline, correct SQL
  and function syntax, suitable parameters/returns, and separation of validation,
  testing and maintainability;
- truth-table and diagram work must systematically include all input
  combinations and recognise gate symbols.

The site therefore needs worked methods and representations, not just more
paragraphs or more multiple-choice questions.

## Visual and cognitive-load design rules

Use visuals when they express a relationship, process or comparison that prose
does poorly. The preferred patterns are:

1. **Process diagrams** for fetch/decode/execute, DNS, sampling, validation and
   compilation.
2. **Comparison grids** for storage, network choices, licences, translators and
   CPU factors.
3. **Worked-method strips** for binary and file-size calculations, with formula,
   substitution, working and final unit visibly separated.
4. **Trace tables and code annotations** for algorithms and programming.
5. **Accessible SVG diagrams** for networks, flowcharts and logic gates.
6. **Progressive disclosure** for broad strands: a short overview followed by
   named chunks, one worked example and a clear exam-transfer action.

Colour should group related information and show flow, not carry meaning alone.
Every diagram needs a text equivalent, readable labels, sufficient contrast and
keyboard-safe interaction. Avoid stock illustrations, decorative cyber imagery
or dense walls of same-shaped cards. A page should normally present one concept
chunk at a time rather than expose every subtopic simultaneously.

## Implementation status — 2 August 2026

- **Phase 1 complete:** the seven confirmed accuracy issues and unsafe blanket
  extended-response rules were corrected.
- **Phase 2 complete in code:** Paper 1 omissions were added as reviewed,
  specification-mapped teaching parts.
- **Phase 3 complete in code:** Paper 2 now includes worked traces, code forms,
  test rows, SQL, arrays, files, subprograms, scope, random values and Boolean
  intermediates rather than description alone.
- **Focused independent-revision strengthening in progress:** network models,
  operating systems, utilities, search/sort, practical-programming support and
  defensive design now use applied worked journeys. Objective-specific tests
  protect the new teaching details rather than merely looking for topic words.
- **Still required before a stronger external claim:** named qualified-human
  curriculum sign-off and accessibility checks on the deployed build.

### Phase 1 - accuracy and truthful status

- Correct the seven confirmed inaccuracies above.
- Change any status or copy that can be read as complete theory coverage.
- Extend validation beyond object counts so known scope bullets can be checked.

### Phase 2 - Paper 1 completeness

- Rebuild `1.3.1`, `1.3.2`, `1.4.1`, `1.4.2`, `1.5.1`, `1.6.1` and `1.6.2`.
- Add targeted depth to `1.2.1`, `1.2.2`, `1.2.3` and `1.5.2`.
- Use diagrams and comparison grids identified in the matrix.

### Phase 3 - Paper 2 completeness

- Rebuild `2.1.2`, `2.1.3`, `2.2.1`, `2.2.3`, `2.2.ERL` and `2.5.1`.
- Audit practical Python challenge progression separately.
- Add targeted depth to defensive design, testing, Boolean application and IDE.

### Phase 4 - verification

- Add specification-bullet-level tests, not uniform word or item quotas.
- Run qualified-teacher and OCR-examiner review against the current
  specification and original content.
- Test every revised route with high-attaining, typical and struggling pupils,
  including a pupil who benefits from exceptionally clear instructions.
- Verify readability, contrast, zoom/reflow, keyboard navigation and diagram
  text alternatives.
- Only then update the coverage table from `Awaiting QA` to a stronger status.

## Release judgement

The implementation is specification-mapped and materially stronger, but the
matrix above still identifies sections needing further depth. It must not yet
be described as a complete independent-revision course. StudySpice remains
**awaiting qualified-teacher QA**; simulated expert/persona review and automated
tests do not constitute named human sign-off.
The remaining visual debt is deliberately withheld from students; any future
diagram must be audited before it is enabled.
