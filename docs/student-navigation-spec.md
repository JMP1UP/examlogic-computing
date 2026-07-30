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

1. **My desk**
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
| Flashcards | Practice > Flashcards |
| Exam preparation and written answers | Practice > Exam questions |
| Number practice | Practice > Number skills |
| Programming and pseudocode | Practice > Programming |
| Simulators | Contextual tools from the relevant topic |
| Progress | Progress |
| Messages | Messages |

Existing internal route identifiers remain valid. A route-parent helper maps
every nested or legacy student route to the correct top-level navigation item.
Unknown or unavailable routes show a controlled recovery state with links to
My desk and Topics.

## My desk

My desk is the pupil's personal Computing study space alongside school. It
presents one recommended next action and the topics whose flashcards the pupil
has chosen to keep fresh.

- Required teacher work takes priority.
- Without required work, the next weekly-rhythm activity is primary.
- The full weekly plan is secondary and may be collapsed.
- Engagement and checked performance remain separate.
- **Flashcards on your desk** shows at most three active topics, due topics
  first, plus the hidden-topic count and an **Organise my topics** route.
- **Your card confidence** is based only on the pupil's latest self-rating for
  each card and is explicitly not an exam grade.
- My desk does not contain a grid of alternative pathways.

Orientation copy:

- **Purpose:** Continue the most useful task in your plan.
- **Evidence label:** `Checked work`, `Study rhythm`, `Awaiting review` or
  `Practice only`.
- **Next:** Return to My desk after the task for the next recommendation.

## Topics: OCR specification control centre

The page heading is **Computer Science topics** with the supporting copy:

> Organise the topics you study alongside your lessons at school.

Paper 1 and Paper 2 contain topic groups, and topic groups contain specification
objectives. At narrow widths these are native, keyboard-operable disclosures.
There is no horizontal topic scroller.

Each objective shows whether its flashcards are on the pupil's desk. Adding cards
and opening a refresher are independent actions: StudySpice must not assume the
topic was taught inside the product.

The permanent explanation gives the workflow:

> Met it at school? Add its flashcards now. Need a reminder? Review the topic
> first. Your card choices guide future retrieval practice; checked
> questions are recorded separately in Progress.

### Objective actions

Every objective offers two direct study choices:

- cards not active: **Add flashcards to my desk** and **Review topic**;
- cards active: **Review topic flashcards** and **Review topic**. The flashcard
  action currently opens the whole topic set, so its label must not imply an
  objective-only filter.

Pausing cards, trying a checked question and opening Progress sit under
**More choices and progress**.

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
5. secondary action: **Add flashcards to my desk**;
6. text link: **Back to Topics**.

The screen states that reading does not update Progress. Generic topic quizzes,
unrelated objective navigation and universal blank writing scaffolds are not
primary completion routes.

## Practice

Practice begins with one **Recommended now** activity, followed by four plain
mode cards:

1. **Flashcards** — three flashcards, about five minutes; builds the study
   routine but is not marked in Progress, while choices schedule cards only.
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
affect Progress and provides a clear return to My desk.

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
- No active cards: offer Topics and explain how to add flashcards to My desk.
- No due cards: state that nothing is due and offer optional review or Practice.
- No checked evidence: state `No checked work yet` and offer an exact exam
  question where available.
- Missing simulator or challenge: return to the originating topic or Practice.

## Acceptance criteria

1. Student navigation contains exactly My desk, Topics, Practice, Progress and
   Messages; teacher navigation is unchanged.
2. Every legacy student route resolves and highlights one of those five
   parents.
3. My desk has one primary next action and a concise view of flashcard topics.
4. A pupil can find an objective and independently choose to add its flashcards
   or review its content without additional explanation.
5. Adding flashcards changes neither checked evidence nor mastery.
6. Pausing cards preserves rating and scheduling history.
7. Focused learning has one primary exam action and no competing topic chooser.
8. Practice exposes exactly four named modes and retains every existing
   activity engine.
9. Exact objective-to-exam mapping never falls back to an unrelated section.
10. Ratings affect scheduling and recall confidence only.
11. Existing attempts, submissions, assignments, settings and progress remain
    unchanged by any persistence upgrade.
12. Empty states always provide My desk, Topics or Practice recovery.
13. Keyboard-only and screen-reader users can complete every core journey.
14. At 320px and 200% zoom, no primary action or question is clipped.
15. Behavioural tests execute navigation and data effects rather than merely
    inspecting source text.
