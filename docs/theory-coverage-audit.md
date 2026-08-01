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
| `1.3.1` Networks/topologies | **Significant gap** | Add transmission media, bandwidth/device effects, full server/client roles, DNS URL-to-IP process, hosting, web services, cloud advantages/disadvantages and scenario application. | Layered network map, DNS sequence, star/mesh diagrams and a cloud trade-off grid split into short sections. |
| `1.3.2` Connections/protocols/layers | **Significant gap** | Correct MAC and POP claims. Teach wired/wireless comparison, Ethernet/Wi-Fi/Bluetooth recommendations, encryption principle, IPv4/IPv6 formats, standards, all named protocol purposes and benefits of layers. | Connection decision table, address-format examples, protocol-purpose cards and an unnamed stacked-layer diagram focused on benefits. |
| `1.4.1` Security threats | **Significant gap** | Each of the six attacks needs mechanism, purpose, impact and a distinct scenario. Current two short sections compress them too far. | Attack pathway cards using the same four labels; SQL-injection input-to-query diagram and DoS traffic diagram. Avoid alarming imagery. |
| `1.4.2` Preventing vulnerabilities | **Significant gap** | Explain how each of seven controls limits specific threats and where it does not help. Include authorised penetration testing and physical security. | Threat-control mapping matrix, with colour used for relationship not good/bad decoration. |
| `1.5.1` Operating systems | **Significant gap** | Expand all five functions to required detail: UI features; memory allocation/transfer and multitasking; device/processor transfer and drivers; accounts/rights/security; naming, folders, moving and saving files. | Five-function tab/accordion set, memory allocation diagram and device-driver bridge. Keep one function open at a time. |
| `1.5.2` Utility software | Targeted expansion | Keep focus on encryption, defragmentation and compression. Remove backup from the required-content heading or label it clearly as additional context. | Three utility cards using purpose, when useful and limitation; HDD before/after block diagram. |
| `1.6.1` Impacts | **Significant gap** | Supply several current but durable contexts and explicitly model ethical, legal, cultural, environmental and privacy analysis, stakeholders, consequences, trade-offs and justified conclusions. | Stakeholder-impact matrix and balanced argument scaffold; colour must not pre-label one side as correct. |
| `1.6.2` Law/licensing | **Significant gap** | Correct legal phrasing. Teach the purpose and specific allowed/prohibited actions for all three Acts, then open-source/proprietary features, licensing need and contextual recommendation. | Law-purpose-action cards plus a licensing comparison/decision grid. Include a clear “law is not the same as ethics” separator. |
| `2.1.1` Computational thinking | Baseline sufficient | Current three principles, connection between them and contextual example are suitable. | One problem progressively decomposed, abstracted and expressed as ordered steps. |
| `2.1.2` Designing/refining algorithms | **Significant gap** | Add standard flowchart symbols, structure diagrams and links, input-process-output, create/interpret/correct/complete/refine across representations, trace-table conventions, syntax/logic errors and nested selection/iteration. | IPO and structure diagrams, symbol key, trace table with highlighted changed cells, and before/after refinement. This strand should be visually led. |
| `2.1.3` Search/sort algorithms | **Significant gap** | Pupils need to apply and recognise the steps and prerequisites of all five algorithms. One-sentence summaries and one binary-search example are insufficient. | Step sequences over one consistent data set; split/merge tree for merge sort; adjacent-comparison and insertion markers. |
| `2.2.1` Programming fundamentals | **Significant gap** | Teach practical use of variables/constants, assignment, I/O, sequence, both selection paths, both loop types and every listed arithmetic/comparison/Boolean operator. | Small executable-style code panels paired with traces; operator table grouped by purpose; loop decision diagrams. |
| `2.2.2` Data types | Baseline sufficient | Current types, contextual choice and casting baseline is suitable. | Data-card sorting activity and one input/cast transformation. |
| `2.2.3` Additional techniques | **Significant gap** | The broadest strand needs worked syntax and traces for strings, files, records, SQL, 1D/2D arrays, functions/procedures, parameters, local/global values, passing/returning arrays and random numbers. Current prose names most items but does not teach all of them sufficiently. | Progressive examples grouped into data, files/SQL and subprograms; array grids, record table, file lifecycle and scope diagram. Avoid one enormous page. |
| `2.2.PY` Practical Python | **Significant gap** | The route describes a progression but the theory review is not a substitute for cumulative worked programming instruction. Audit the 13 challenges against reading, tracing, completing, debugging, constructing, testing and refining before claiming pathway sufficiency. | Side-by-side code/trace/test panes with fading scaffolds; use syntax colour only with a non-colour cue. |
| `2.2.ERL` OCR reference language | **Significant gap** | A 145-word overview is not a usable reference. Teach and compare all required notation for assignment, I/O, selection, loops, strings, arrays, files and subprograms, while keeping Python differences explicit. | Searchable or segmented syntax reference, Python-to-ERL comparison rows and annotated trace examples. |
| `2.3.1` Defensive design | Targeted expansion | Add concrete validation and authentication designs and clearer examples of naming, indentation, comments and subprograms improving maintainability. | Input-validation flow, authentication boundary and before/after maintainability code sample. |
| `2.3.2` Testing | Targeted expansion | Add complete test-plan construction, iterative versus terminal examples, expected/actual results and algorithm refinement after failure. Preserve the precise normal/boundary/invalid/erroneous distinctions. | Test-plan table with colour-independent category labels and a fail-fix-retest loop. |
| `2.4.1` Boolean logic | Targeted expansion | Existing SVG gates and truth tables are valuable. Add explicit create/edit-from-scenario modelling and ensure combined diagrams are explained gate by gate, not just displayed. | Retain accessible SVGs, highlight one intermediate output at a time and pair every colour with labels/patterns. |
| `2.5.1` Languages/translators | **Significant gap** | Correct compiler/interpreter absolutes. Fully compare high/low-level purpose and contextual benefits/drawbacks, need for translation, compiler/interpreter characteristics and suitable recommendations. | Two comparison matrices and one source-to-machine-code flow; scenario decision cards. |
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

## Implementation status — 1 August 2026

- **Phase 1 complete:** the seven confirmed accuracy issues and unsafe blanket
  extended-response rules were corrected.
- **Phase 2 complete in code:** Paper 1 omissions were added as reviewed,
  specification-mapped teaching parts.
- **Phase 3 complete in code:** Paper 2 now includes worked traces, code forms,
  test rows, SQL, arrays, files, subprograms, scope, random values and Boolean
  intermediates rather than description alone.
- **Phase 4 automated/persona verification complete:** the curriculum suite
  contains an explicit OCR-bullet registry; both learning routes share one
  progressive renderer; large strands are divided into timed study sessions;
  only three small exact-strand visuals are currently enabled.
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

The implementation now provides a complete, specification-mapped concise theory
baseline and has cleared the staged internal checks in this audit. StudySpice
must still be described as **awaiting qualified-teacher QA**, because simulated
expert/persona review and automated tests do not constitute named human sign-off.
The remaining visual debt is deliberately withheld from students; any future
diagram must be audited before it is enabled.
