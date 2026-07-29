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
- **Section Milestones**: Learning pages show the current state beside each specification objective. Progress shows a syllabus-wide checkpoint summary and an expandable Paper 1/Paper 2 list. Sections without enough mapped assessment remain visible as `Checkpoint unavailable` but are excluded from the achievable total. The dashboard shows one restrained next section without competing with its primary task. Retry evidence is grouped by activity, so repeated attempts cannot multiply milestone evidence.

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
