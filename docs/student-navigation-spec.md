# Student Navigation and Practice Design Specification

## Purpose

This specification simplifies the student interface without removing learning or
practice capability. It applies to student routes only. Teacher navigation and
teacher workflows remain unchanged.

The interface must make four things clear on every student screen:

1. What am I here to do?
2. Why am I doing it?
3. Does it count, and towards what?
4. What happens next?

## Information architecture

The student sidebar contains exactly five top-level destinations:

1. **Home**
2. **Topics**
3. **Practice**
4. **Progress**
5. **Messages**

The Topics page is the student-facing view of the OCR specification. The word
`Specification` appears as curriculum context inside the page, not as the
sidebar label.

### Existing-route mapping

| Existing capability | New parent destination |
|---|---|
| Learn and objective teaching | Topics |
| Recall deck | Practice > Recall cards |
| Exam preparation and written answers | Practice > Exam questions |
| Number practice | Practice > Number skills |
| Programming and pseudocode | Practice > Programming |
| Simulators | Contextual tools from the relevant topic |
| Progress | Progress |
| Messages | Messages |

Existing internal route identifiers remain valid. A route-parent helper maps
every nested or legacy student route to the correct top-level navigation item.
Unknown or unavailable routes show a controlled recovery state with links to
Home and Topics.

## Home

Home presents one recommended next action.

- Required teacher work takes priority.
- Without required work, the next weekly-rhythm activity is primary.
- The full weekly plan is secondary and may be collapsed.
- Engagement and checked performance remain separate.
- Home does not contain a grid of alternative pathways.

Orientation copy:

- **Purpose:** Continue the most useful task in your plan.
- **Evidence label:** `Checked work`, `Study rhythm`, `Awaiting review` or
  `Practice only`.
- **Next:** Return to Home after the task for the next recommendation.

## Topics: OCR specification control centre

The page heading is **Computer Science topics** with the supporting copy:

> See what you have covered, choose what to learn and manage your recall cards.

Paper 1 and Paper 2 contain topic groups, and topic groups contain specification
objectives. At narrow widths these are native, keyboard-operable disclosures.
There is no horizontal topic scroller.

Each objective presents three separate states:

- **Study state:** `Not covered yet`, `Learning now`, or
  `Covered — cards added`.
- **Recall confidence:** derived only from recent card ratings.
- **Checked work:** derived only from assessed or reviewed evidence.

The permanent explanation is:

> Covered means you have studied this section and added its cards. It does not
> mean mastered. Checked questions show what you can do.

### Objective actions

Every objective has one primary action:

- Not covered yet: **Start learning**
- Learning now: **Continue learning**
- Covered: **Review section**

Secondary actions are contained in the expanded objective:

- Mark as covered and add cards
- Pause cards
- Try a matching exam question
- View checked progress

Pausing cards never erases ratings or recall history. An exam action appears
only when an exact specification-point mapping exists.

### Learner-owned state

Pupil choices must not overwrite teacher classroom controls or assessed
evidence. Store learner-owned objective controls using:

- student ID;
- specification point ID;
- state: `not_covered`, `learning` or `covered`;
- card state: `active` or `paused`;
- updated timestamp;
- source.

Legacy topic-level inferred coverage remains readable but is not silently
rewritten as an objective-level pupil choice.

### Recall confidence

Recall confidence is derived from recent `retrieval_rating` records:

- Not rated yet
- Needs another look
- Building confidence
- Usually recalled
- Consistently recalled

The interface states that it is based on recent recall ratings. Ratings affect
card scheduling and this display only. They never alter attainment, mastery,
checked accuracy, badges for demonstrated skill or teacher performance figures.

## Focused learning

A focused objective removes curriculum browsing and competing pathways.

The screen contains:

1. explanation;
2. worked example;
3. relevant contextual tool, when available;
4. primary action: **Try an exam question**;
5. secondary action: **Mark as covered and add recall cards**;
6. text link: **Back to Topics**.

The screen states that reading does not update Progress. Generic topic quizzes,
unrelated objective navigation and universal blank writing scaffolds are not
primary completion routes.

## Practice

Practice begins with one **Recommended now** activity, followed by four plain
mode cards:

1. **Recall cards** — three cards, about five minutes; contributes to study
   rhythm, while ratings schedule cards only.
2. **Exam questions** — one question with a stated mark value and duration;
   deterministic work is checked, other work awaits review.
3. **Number skills** — a bounded calculation set with checked results.
4. **Programming** — one resumable stage with tests or review.

Each card explains its purpose, expected duration, evidence status and one
Start or Continue action. Long answers sit within Exam questions rather than
forming a fifth mode. Simulators appear as contextual tools, not a fifth
practice pathway.

Assigned programming remains reachable directly from Home and within two
actions from every top-level student destination.

## Progress

Progress leads with checked evidence. It separately presents:

- checked performance;
- course coverage;
- recall confidence;
- study rhythm;
- demonstrated-skill achievements;
- study-habit achievements.

Coverage, card ratings, page visits, model-answer views, drafts and
awaiting-review submissions do not create mastery.

Progress presents one **Work on this next** action. Detailed curriculum tables
remain available in disclosures.

## Messages

Messages remain a separate destination. The page states that messages do not
affect Progress and provides a clear return to Home.

## Navigation and accessibility

- Student navigation uses links with `aria-current="page"`.
- Nested routes highlight their parent destination.
- Route changes focus the main heading.
- Mobile navigation exposes `aria-expanded` and `aria-controls`; Escape closes
  it and returns focus to the toggle.
- Body and instruction text is at least 16px; smaller text is limited to brief
  metadata.
- Interactive targets are at least 44 by 44 CSS pixels.
- Status is communicated with text, not colour alone.
- Every objective action includes the objective code and name in its accessible
  name.
- At 320px and 200% zoom, pages use one column with no horizontal page scroll.
- Essential next actions are never hidden inside a closed disclosure.
- Forced-colour, reduced-motion and keyboard-focus behavior remain supported.

## Empty and recovery states

- Missing curriculum: explain the unavailable section and return to Topics.
- No exact exam question: do not fall back; offer Review section and Topics.
- No active cards: offer Open Topics and explain how to mark a section covered.
- No due cards: state that nothing is due and offer optional review or Practice.
- No checked evidence: state `No checked work yet` and offer an exact exam
  question where available.
- Missing simulator or challenge: return to the originating topic or Practice.

## Acceptance criteria

1. Student navigation contains exactly Home, Topics, Practice, Progress and
   Messages; teacher navigation is unchanged.
2. Every legacy student route resolves and highlights one of those five
   parents.
3. Home has one primary next action.
4. A pupil can find an objective, understand its three separate statuses and
   begin learning without additional explanation.
5. Marking an objective covered adds eligible cards without changing mastery.
6. Pausing cards preserves rating and scheduling history.
7. Focused learning has one primary exam action and no competing topic chooser.
8. Practice exposes exactly four named modes and retains every existing
   activity engine.
9. Exact objective-to-exam mapping never falls back to an unrelated section.
10. Ratings affect scheduling and recall confidence only.
11. Existing attempts, submissions, assignments, settings and progress remain
    unchanged by any persistence upgrade.
12. Empty states always provide Home, Topics or Practice recovery.
13. Keyboard-only and screen-reader users can complete every core journey.
14. At 320px and 200% zoom, no primary action or question is clipped.
15. Behavioural tests execute navigation and data effects rather than merely
    inspecting source text.
