# ExamLogic Computing — Main User Flows

> **A 25Thirty product**

## 1. Topic Practice & Evidence
- **User**: Computer Science Student
- **Starting Point**: Curriculum Hub
- **Intended Outcome**: Complete a practice question on a specific topic (e.g. Logic Gates or Sorting Algorithms) and check working against mark scheme.
- **Steps**:
  1. Student selects topic card (e.g. "Bubble Sort & Search Algorithms").
  2. Student reviews topic summary and selects "Start practice questions".
  3. Student types pseudocode solution or selects answer option.
  4. Student clicks "Check answer".
  5. A deterministic question is marked against its defined answer. A meaningful pseudocode answer that is not an exact normalised match is saved for review rather than marked wrong or awarded credit.
- **Decisions**: View hint, retry question, move to next topic.
- **Error States**: Submission with empty response -> prompt student ("Please enter an answer before checking").
- **Completion State**: Only assessed demonstrated performance updates completion and mastery. Model-answer views, confidence, formative definition checks and awaiting-review work remain visible but do not award credit.
- **Section Milestones**: Learning pages show the current state beside each specification objective. Progress shows a syllabus-wide checkpoint summary and an expandable Paper 1/Paper 2 list. A checkpoint is secured only when the learner demonstrates every required assessment focus in the section's current versioned rule. Retry outcomes replace earlier outcomes for the same activity and focus rather than multiplying evidence. Twenty-seven sections currently have representative rules; `1.2.4c`, `1.5.2`, `2.1.1`, `2.2.2` and `2.2.PY` remain visible as `Checkpoint unavailable` and are excluded from the achievable total. The dashboard shows one restrained next section without competing with its primary task.
- **Focused Learn Route**: When a learner opens a specific objective, the page presents that section's teaching and worked material first, followed by one primary `Check this section` action. `View full topic` is a secondary escape route for learners who need broader context.
- **Recall Result Route**: An incorrect recall response offers retry before optional confidence reflection. Confidence saves in place and explicitly leaves the score unchanged; the learner chooses whether to continue home or try the exam-style transfer activity.
- **Workload Summary**: The dashboard combines required assignment minutes with active test-preparation minutes. A learner without assessed evidence is offered one suggested ten-minute guided session rather than an inaccurately short optional task.
- **Progress Interpretation**: Topic summaries describe the latest assessed evidence rather than declaring mastery. Each section row shows the number and date of contributing assessed activities, the assessment focuses demonstrated and those still remaining. Sections without a representative checkpoint rule explain that they are excluded from the achievable total.
- **Achievement Route**: Progress shows badges already present in the learner record, including preserved historical awards, followed by at most two current goals. `Binary Fluent` requires a perfect complete Number skills activity, including permitted retries against the original question set. `Debugging Detective` requires the current loop-boundary solution to pass every automated test without being edited afterwards. Each unearned goal links directly to its activity. Dashboard remains earned-only so rewards do not compete with the required task.

## 2. Interactive Logic Challenge
- **User**: Computer Science Student
- **Starting Point**: Logic Challenges View
- **Intended Outcome**: Complete a logic truth table or pseudocode trace exercise.
- **Steps**:
  1. Student selects logic challenge level.
  2. Student completes truth table inputs or traces variable values.
  3. Student clicks "Run logic test".
  4. System runs test inputs and shows pass/fail visual status.
- **Decisions**: Reset inputs, view worked solution after 3 attempts.
- **Error States**: Logic errors highlighted inline with targeted hint.
- **Completion State**: A challenge is marked complete only after its defined tests pass. An unassessed response remains awaiting review.
