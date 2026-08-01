// Original assessment bank for the highest-priority OCR J277 Paper 2 gaps.
(function initialisePriorityAssessments(root, factory) {
  const priorityAssessments = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = priorityAssessments;
  if (root) {
    root.StudySpiceContent = root.StudySpiceContent || {};
    root.StudySpiceContent.priorityAssessments = priorityAssessments;
  }
})(typeof window !== 'undefined' ? window : globalThis, function buildPriorityAssessments() {
  return {
  questions: [
    {
      id: 'priority_223_1', topicId: 'topic_2_2', specificationPointId: '2.2.3', purpose: 'retrieval', type: 'mcq',
      question: 'Which expression returns characters at indexes 2, 3 and 4 from an OCR Exam Reference Language string called word?',
      options: ['word.substring(2,3)', 'word.substring(2,4)', 'word.left(3)', 'word.right(3)'],
      answer: 'word.substring(2,3)',
      explanation: 'OCR substring uses a zero-based starting index followed by the number of characters, so it starts at index 2 and takes three characters.'
    },
    {
      id: 'priority_223_2', topicId: 'topic_2_2', specificationPointId: '2.2.3', purpose: 'retrieval', type: 'mcq',
      question: 'Which SQL statement returns the Name field from records in Pupil where House is "Blue"?',
      options: ['SELECT Name FROM Pupil WHERE House = "Blue"', 'SELECT Pupil FROM Name WHERE House = "Blue"', 'FROM Pupil SELECT House = "Blue"', 'WHERE Name FROM Pupil SELECT "Blue"'],
      answer: 'SELECT Name FROM Pupil WHERE House = "Blue"',
      explanation: 'SELECT identifies the required field, FROM identifies the table and WHERE supplies the record condition.'
    },
    {
      id: 'priority_223_3', topicId: 'topic_2_2', specificationPointId: '2.2.3', purpose: 'retrieval', type: 'mcq',
      question: 'What is the most important difference between a function and a procedure in OCR Exam Reference Language?',
      options: ['A function returns a value', 'A procedure cannot have parameters', 'A function cannot use local variables', 'A procedure must read a file'],
      answer: 'A function returns a value',
      explanation: 'Both can have parameters, but a function uses return to give a value back to its caller.'
    },
    {
      id: 'priority_223_4', topicId: 'topic_2_2', specificationPointId: '2.2.3', purpose: 'retrieval', type: 'mcq',
      question: 'Which declaration creates a two-dimensional array with eight rows and eight columns in OCR Exam Reference Language?',
      options: ['array board[8,8]', 'array board[8]', 'board = array(8)', 'array[board,8,8]'],
      answer: 'array board[8,8]',
      explanation: 'OCR declares a two-dimensional array using two dimensions inside square brackets.'
    },
    {
      id: 'priority_erl_1', topicId: 'topic_2_2', specificationPointId: '2.2.ERL', purpose: 'retrieval', type: 'mcq',
      question: 'Which OCR Exam Reference Language loop prints the integers 1 to 5 inclusive?',
      options: ['for i=1 to 5 ... next i', 'for i=1 to 6 ... next i', 'for i in range(1,5) ... endfor', 'while i=1 to 5 ... endwhile'],
      answer: 'for i=1 to 5 ... next i',
      explanation: 'The end value of an OCR count-controlled for loop is inclusive.'
    },
    {
      id: 'priority_erl_2', topicId: 'topic_2_2', specificationPointId: '2.2.ERL', purpose: 'retrieval', type: 'mcq',
      question: 'Which keyword closes an OCR Exam Reference Language IF statement?',
      options: ['endif', 'end if', 'next', 'endselection'],
      answer: 'endif',
      explanation: 'OCR Exam Reference Language uses endif as one word.'
    },
    {
      id: 'priority_erl_3', topicId: 'topic_2_2', specificationPointId: '2.2.ERL', purpose: 'retrieval', type: 'mcq',
      question: 'Which loop always executes its body at least once in OCR Exam Reference Language?',
      options: ['do ... until', 'while ... endwhile', 'for ... next', 'if ... endif'],
      answer: 'do ... until',
      explanation: 'The until condition is checked after the body, so the body runs before the first check.'
    },
    {
      id: 'priority_erl_4', topicId: 'topic_2_2', specificationPointId: '2.2.ERL', purpose: 'retrieval', type: 'mcq',
      question: 'What value is produced by "Computer".right(3) in OCR Exam Reference Language?',
      options: ['ter', 'Com', 'put', 'ComputerComputerComputer'],
      answer: 'ter',
      explanation: 'right(3) returns the three characters at the right-hand end of the string.'
    },
    {
      id: 'priority_212_1', topicId: 'topic_2_1', specificationPointId: '2.1.2', purpose: 'retrieval', type: 'mcq',
      question: 'Which set correctly identifies the inputs, process and output for a rectangle-area algorithm?',
      options: ['width and height; multiply them; area', 'area; divide by width; height and width', 'width; print it; height', 'multiply; width and height; area'],
      answer: 'width and height; multiply them; area',
      explanation: 'The two dimensions are supplied, multiplication processes them, and the resulting area is output.'
    },
    {
      id: 'priority_212_2', topicId: 'topic_2_1', specificationPointId: '2.1.2', purpose: 'retrieval', type: 'mcq',
      question: 'What should a trace table record?',
      options: ['Values as they change during execution', 'Only the final output', 'The file size of the source code', 'A list of syntax rules'],
      answer: 'Values as they change during execution',
      explanation: 'A trace table follows program state across meaningful execution steps.'
    },
    {
      id: 'priority_212_3', topicId: 'topic_2_1', specificationPointId: '2.1.2', purpose: 'retrieval', type: 'mcq',
      question: 'Which flowchart symbol represents a decision?',
      options: ['Diamond', 'Rectangle', 'Parallelogram', 'Terminal oval'],
      answer: 'Diamond',
      explanation: 'A diamond represents a decision whose outcome selects a path.'
    },
    {
      id: 'priority_221_1', topicId: 'topic_2_2', specificationPointId: '2.2.1', purpose: 'retrieval', type: 'mcq',
      question: 'Which construct repeats instructions while a condition remains true?',
      options: ['Condition-controlled iteration', 'Sequence', 'Assignment', 'Casting'],
      answer: 'Condition-controlled iteration',
      explanation: 'A condition-controlled loop checks a condition to decide whether repetition continues.'
    },
    {
      id: 'priority_221_2', topicId: 'topic_2_2', specificationPointId: '2.2.1', purpose: 'retrieval', type: 'mcq',
      question: 'What is the result of 19 DIV 4?',
      options: ['4', '3', '4.75', '5'],
      answer: '4',
      explanation: 'DIV returns the integer quotient and discards the remainder.'
    },
    {
      id: 'priority_221_3', topicId: 'topic_2_2', specificationPointId: '2.2.1', purpose: 'retrieval', type: 'mcq',
      question: 'Which condition is true only when age is from 11 to 16 inclusive?',
      options: ['age >= 11 AND age <= 16', 'age >= 11 OR age <= 16', 'age > 11 AND age < 16', 'NOT age == 11'],
      answer: 'age >= 11 AND age <= 16',
      explanation: 'Both inclusive boundary comparisons must be true, so they are joined with AND.'
    },
    {
      id: 'priority_232_1', topicId: 'topic_2_3', specificationPointId: '2.3.2', purpose: 'retrieval', type: 'mcq',
      question: 'When does iterative testing take place?',
      options: ['During development as modules are produced', 'Only after the product is released', 'Only before any code is written', 'After deleting the source code'],
      answer: 'During development as modules are produced',
      explanation: 'Iterative testing checks parts of the program throughout development.',
      retryHint: 'Iterative testing happens while the program is being developed. Which option describes testing after a programmer changes one part?'
    },
    {
      id: 'priority_232_2', topicId: 'topic_2_3', specificationPointId: '2.3.2', purpose: 'retrieval', type: 'mcq',
      question: 'A program runs but calculates every total incorrectly. Which type of error is most likely?',
      options: ['Logic error', 'Syntax error', 'Authentication error', 'Compression error'],
      answer: 'Logic error',
      explanation: 'A logic error allows execution but causes an unexpected result.'
    },
    {
      id: 'priority_232_3', topicId: 'topic_2_3', specificationPointId: '2.3.2', purpose: 'retrieval', type: 'mcq',
      question: 'Which pair belongs in every useful test-plan row?',
      options: ['Test data and expected result', 'Variable name and file size', 'Username and password', 'Source code and compiler name'],
      answer: 'Test data and expected result',
      explanation: 'The expected result is needed so the actual behaviour can be judged.'
    },
    {
      id: 'priority_213_linear', topicId: 'topic_2_1', specificationPointId: '2.1.3', purpose: 'retrieval', type: 'mcq',
      question: 'A linear search looks for 7 in [4, 7, 7, 9]. Which index is returned if the algorithm stops at the first match and indexing starts at 0?',
      options: ['1', '2', '0', '3'], answer: '1',
      explanation: 'The values at indexes 0 and 1 are checked in order, and the first 7 is at index 1.',
      retryHint: 'Trace from the beginning of the list, writing down each position checked. Stop the trace as soon as the target is encountered.'
    },
    {
      id: 'priority_213_insertion', topicId: 'topic_2_1', specificationPointId: '2.1.3', purpose: 'retrieval', type: 'mcq',
      question: 'Insertion sort has the ordered section [3, 8, 12] and the next value is 6. What does the ordered section become?',
      options: ['[3, 6, 8, 12]', '[6, 3, 8, 12]', '[3, 8, 12, 6]', '[3, 8, 6, 12]'], answer: '[3, 6, 8, 12]',
      explanation: 'Insertion sort places the next value into its correct position in the already ordered section.',
      retryHint: 'Keep the existing ordered section in sequence, then compare the new item backwards until you find the gap where it belongs.'
    },
    {
      id: 'priority_213_bubble_pass', topicId: 'topic_2_1', specificationPointId: '2.1.3', purpose: 'retrieval', type: 'mcq',
      question: 'After a complete bubble-sort pass makes no swaps, what should the algorithm do?',
      options: ['Stop because the list is sorted', 'Repeat until the largest value changes', 'Run binary search', 'Split the list into single items'], answer: 'Stop because the list is sorted',
      explanation: 'No swaps during a complete pass means every adjacent pair is already in the required order.',
      retryHint: 'A full pass checked every neighbouring pair. If none needed swapping, could another pass change the order?'
    }
  ],
  writtenQuestions: [
    {
      id: 'priority_app_223_1', topicId: 'topic_2_2', specificationPointId: '2.2.3', purpose: 'application',
      commandWord: 'Write', marks: 5,
      question: 'Write an SQL query that returns Title and Author from a table called Book for books whose Genre is "Mystery". Then explain what SELECT, FROM and WHERE do.',
      scenario: 'A library searches its Book table by genre.',
      indicativeContent: ['SELECT Title, Author', 'FROM Book', 'WHERE Genre = "Mystery"', 'SELECT chooses fields, FROM chooses the table and WHERE filters records'],
      rubric: ['1-3 marks: one mark for each correct clause.', '4-5 marks: accurate explanation of the roles of the clauses.'],
      modelAnswer: 'SELECT Title, Author FROM Book WHERE Genre = "Mystery". SELECT chooses the fields to return, FROM identifies the Book table and WHERE keeps only records whose Genre field matches Mystery.',
      misconceptions: [{ phrase: 'SELECT Book', feedback: 'SELECT names the fields to return; FROM names the table.' }]
    },
    {
      id: 'priority_app_223_2', topicId: 'topic_2_2', specificationPointId: '2.2.3', purpose: 'application',
      commandWord: 'Design', marks: 6,
      question: 'Design a function that receives an array of seven temperatures and returns the highest value. Explain why an array and a function are suitable.',
      scenario: 'A weekly weather program processes seven temperature values.',
      indicativeContent: ['fixed one-dimensional array of seven numeric values', 'function accepts the array as a parameter', 'iteration examines every element', 'running maximum is updated', 'function returns the maximum', 'array groups same-type values and function supports reuse'],
      rubric: ['1-2 marks: identifies an array or maximum process.', '3-4 marks: coherent function design with iteration.', '5-6 marks: complete design plus justified data structure and subprogram choices.'],
      modelAnswer: 'Store the seven numeric values in a one-dimensional array. Pass the array to a function. Set highest to the first element, compare each remaining value with highest and replace highest when a larger value is found. Return highest. The fixed array suits seven same-type values, and a function is suitable because the calculated value is returned and the code can be reused.',
      misconceptions: [{ phrase: 'procedure returns', feedback: 'In OCR terminology a function returns the calculated value.' }]
    },
    {
      id: 'priority_app_erl_1', topicId: 'topic_2_2', specificationPointId: '2.2.ERL', purpose: 'application',
      commandWord: 'Trace', marks: 5,
      question: 'Trace this OCR Exam Reference Language and give the final output:\n\n`total = 0`\n`for i=2 to 8 step 2`\n`    total = total + i`\n`next i`\n`print(total)`\n\nShow the value of i and total after each iteration.',
      scenario: 'A count-controlled loop accumulates even values.',
      indicativeContent: ['i=2 total=2', 'i=4 total=6', 'i=6 total=12', 'i=8 total=20', 'output 20'],
      rubric: ['One mark for each correct trace row and final output.'],
      modelAnswer: 'The rows are (2,2), (4,6), (6,12) and (8,20). The final output is 20.',
      misconceptions: [{ phrase: 'i=10', feedback: 'The loop endpoint is 8 and is inclusive; 10 is not executed.' }]
    },
    {
      id: 'priority_app_erl_2', topicId: 'topic_2_2', specificationPointId: '2.2.ERL', purpose: 'application',
      commandWord: 'Complete', marks: 5,
      question: 'Complete an OCR Exam Reference Language algorithm that repeatedly asks for a whole-number mark until a value from 0 to 100 inclusive is entered, then prints "Accepted".',
      scenario: 'An exam-mark input must be validated using a condition-controlled loop.',
      indicativeContent: ['input before or inside a do-until loop', 'correct lower comparison', 'correct upper comparison', 'AND combines the valid-range checks', 'print after validation'],
      rubric: ['1-2 marks: partial input or loop.', '3-4 marks: working inclusive validation.', '5 marks: correct OCR notation and output placement.'],
      modelAnswer: 'do\n    mark = int(input("Mark"))\nuntil mark >= 0 AND mark <= 100\nprint("Accepted")',
      misconceptions: [{ phrase: 'OR', feedback: 'A value is valid only when it meets both the lower and upper limits, so use AND.' }]
    },
    {
      id: 'priority_app_212_1', topicId: 'topic_2_1', specificationPointId: '2.1.2', purpose: 'application',
      commandWord: 'Design', marks: 6,
      question: 'Inputs: child tickets cost £7; adult tickets cost £11. Identify the inputs, processing and output needed to calculate a group\'s total price.',
      scenario: 'A booking algorithm calculates a group ticket price.',
      indicativeContent: ['inputs: child count and adult count', 'multiply child count by 7', 'multiply adult count by 11', 'add subtotals', 'output total price', 'appropriate numeric values'],
      rubric: ['1-2 marks: identifies some IPO elements.', '3-4 marks: mostly complete calculation.', '5-6 marks: complete, correctly ordered and clearly classified design.'],
      modelAnswer: 'Inputs are the number of child and adult tickets. Multiply the child count by 7 and the adult count by 11, then add both subtotals. Output the total price.',
      misconceptions: []
    },
    {
      id: 'priority_app_212_2', topicId: 'topic_2_1', specificationPointId: '2.1.2', purpose: 'application',
      commandWord: 'Refine', marks: 6,
      question: 'An algorithm sets `largest = 0` before searching an array that may contain only negative integers. Explain the logic error and refine the algorithm.',
      scenario: 'A maximum-search algorithm must work with negative data.',
      indicativeContent: ['zero may be greater than every array value', 'zero may be returned even though it is absent', 'initialise largest to the first array element', 'iterate from the next element', 'compare and update', 'works for negative and positive arrays'],
      rubric: ['1-2 marks: identifies incorrect output.', '3-4 marks: proposes valid initialisation.', '5-6 marks: explains and refines the complete process.'],
      modelAnswer: 'If all values are negative, largest remains 0 even though 0 is not in the array. Set largest to the first array element, then compare each remaining element and update largest when a greater value is found.',
      misconceptions: [{ phrase: 'smallest negative', feedback: 'The refinement should initialise from actual data, not guess a sentinel value.' }]
    },
    {
      id: 'priority_app_221_1', topicId: 'topic_2_2', specificationPointId: '2.2.1', purpose: 'application',
      commandWord: 'Write', marks: 5,
      question: 'Write an algorithm that inputs 10 temperatures, counts how many are below zero and outputs the count.',
      scenario: 'A weather station counts freezing readings.',
      indicativeContent: ['counter initialised to zero', 'count-controlled loop repeats ten times', 'input inside loop', 'selection checks temperature < 0', 'counter increment and output after loop'],
      rubric: ['One mark for each required element.'],
      modelAnswer: 'Set count to 0. Repeat ten times: input a temperature; if it is less than 0, add 1 to count. After the loop, output count.',
      misconceptions: [{ phrase: '<= 0', feedback: 'The question says below zero, so zero itself must not be counted.' }]
    },
    {
      id: 'priority_app_221_2', topicId: 'topic_2_2', specificationPointId: '2.2.1', purpose: 'application',
      commandWord: 'Explain', marks: 4,
      question: 'The program uses `age >= 13 OR age <= 17`.\n(a) Explain why this accepts values outside 13 to 17.\n(b) Write the corrected condition.',
      scenario: 'A compound Boolean condition validates an age range.',
      indicativeContent: ['OR requires only one comparison to be true', 'almost every number passes', 'both boundaries must be satisfied', 'age >= 13 AND age <= 17'],
      rubric: ['1-2 marks: identifies OR as wrong or gives corrected condition.', '3-4 marks: explains why and supplies the inclusive correction.'],
      modelAnswer: 'OR accepts almost every number because values below 13 still satisfy age <= 17 and values above 17 still satisfy age >= 13. Use age >= 13 AND age <= 17.',
      misconceptions: []
    },
    {
      id: 'priority_app_232_1', topicId: 'topic_2_3', specificationPointId: '2.3.2', purpose: 'application',
      commandWord: 'Design', marks: 6,
      question: 'Complete a test plan for a whole-number month from 1 to 12. Include one normal value, both boundary values, one invalid value and one erroneous value. Give the expected result for each.',
      scenario: 'A date program validates a month number.',
      indicativeContent: ['normal e.g. 6 accepted', 'boundary 1 accepted', 'boundary 12 accepted', 'invalid 0 or 13 rejected', 'erroneous text rejected', 'expected result for each'],
      rubric: ['1 mark for each suitable category/value and complete expected results.'],
      modelAnswer: '6 normal - accepted; 1 lower boundary - accepted; 12 upper boundary - accepted; 13 invalid - rejected; "May" erroneous - rejected.',
      misconceptions: [{ phrase: '13 boundary', feedback: 'Thirteen is outside the valid range and is invalid, not boundary data.' }]
    },
    {
      id: 'priority_app_232_2', topicId: 'topic_2_3', specificationPointId: '2.3.2', purpose: 'application',
      commandWord: 'Explain', marks: 5,
      question: 'A team tests only the completed program one day before release. Explain how iterative testing and a test plan would improve the development process.',
      scenario: 'A team currently relies only on terminal testing.',
      indicativeContent: ['test modules during development', 'find errors nearer to when introduced', 'easier isolation and correction', 'planned normal/boundary/invalid/erroneous cases', 'expected results make pass/fail objective'],
      rubric: ['1-2 marks: describes iterative testing or a test plan.', '3-5 marks: linked explanation of both and their benefits.'],
      modelAnswer: 'The team should test each module as it is developed so defects are found earlier and are easier to locate. A test plan should include suitable normal, boundary, invalid and erroneous data with expected results, allowing actual results to be compared objectively.',
      misconceptions: []
    }
  ],
  examTransferTasks: [
    {
      id: 'priority_transfer_213_linear', specificationPointId: '2.1.3', topicId: 'topic_2_1', paper: 'Paper 2', purpose: 'exam-transfer',
      commandWord: 'Trace', marks: 4, minutes: 5, responseForm: 'algorithm-trace', variantFamilyId: 'search-linear-trace',
      question: 'Trace a linear search for 12 in [5, 12, 9, 12, 20]. Indexing starts at 0 and the algorithm stops at the first match. State each value checked, the returned index and how the result would change if the target were 7.',
      decodePrompt: 'Follow the array from index 0. Keep the found and absent cases separate.',
      requiredElements: ['checks 5 at index 0', 'checks 12 at index 1', 'returns index 1 for the first match', 'search for 7 checks every item and returns not found or -1'],
      planningLabels: ['First check', 'Matching check', 'Returned index', 'Absent target'],
      modelPlan: ['index 0 contains 5', 'index 1 contains 12', 'return 1 immediately', '7 is absent so all five values are checked before -1/not found'],
      retryQuestion: 'Trace a linear search for 4 in [8, 6, 4, 4, 1], then state what happens when searching for 9.'
    },
    {
      id: 'priority_transfer_213_binary', specificationPointId: '2.1.3', topicId: 'topic_2_1', paper: 'Paper 2', purpose: 'exam-transfer',
      commandWord: 'Trace', marks: 5, minutes: 6, responseForm: 'algorithm-trace', variantFamilyId: 'search-binary-trace',
      question: '(a) Trace a binary search for 26 in [3, 8, 14, 19, 26, 31, 42, 55]. When two middle positions are available, use the lower one. State each middle value checked.\n(b) State the final index.\n(c) Explain why an unsorted list is unsuitable for binary search.',
      decodePrompt: 'Record the remaining search area after each comparison and use zero-based indexes.',
      requiredElements: ['first checks 19 at index 3', 'keeps indexes 4 to 7', 'checks 31 at index 5 then keeps index 4', 'finds 26 at index 4', 'explains that order is needed to decide which half cannot contain the target'],
      planningLabels: ['First middle', 'Remaining half', 'Next comparison', 'Result and prerequisite'],
      modelPlan: ['middle index 3 gives 19', '26 is larger so keep indexes 4-7', 'lower middle is index 5 giving 31, so keep index 4', 'index 4 is 26', 'without sorted data a comparison cannot justify discarding either half'],
      retryQuestion: 'Using the lower middle when needed, trace a binary search for 7 in [1, 4, 7, 11, 18, 25].'
    },
    {
      id: 'priority_transfer_213_bubble', specificationPointId: '2.1.3', topicId: 'topic_2_1', paper: 'Paper 2', purpose: 'exam-transfer',
      commandWord: 'Complete', marks: 5, minutes: 6, responseForm: 'algorithm-trace', variantFamilyId: 'sort-bubble-trace',
      question: 'Apply bubble sort in ascending order to [6, 2, 5, 1]. Show the list after each complete pass and include the final pass that proves the algorithm can stop.',
      decodePrompt: 'Compare adjacent pairs from left to right. A stopping pass must contain no swaps.',
      requiredElements: ['after pass 1: [2, 5, 1, 6]', 'after pass 2: [2, 1, 5, 6]', 'after pass 3: [1, 2, 5, 6]', 'performs or states a complete no-swap pass', 'links the no-swap pass to stopping'],
      planningLabels: ['Pass 1', 'Pass 2', 'Pass 3', 'Stopping check'],
      modelPlan: ['[2,5,1,6]', '[2,1,5,6]', '[1,2,5,6]', 'one further complete pass makes no swaps, so stop'],
      retryQuestion: 'Apply bubble sort to [4, 3, 1, 2], showing each full pass and the no-swap stopping pass.'
    },
    {
      id: 'priority_transfer_213_insertion', specificationPointId: '2.1.3', topicId: 'topic_2_1', paper: 'Paper 2', purpose: 'exam-transfer',
      commandWord: 'Complete', marks: 5, minutes: 6, responseForm: 'algorithm-trace', variantFamilyId: 'sort-insertion-trace',
      question: 'Complete an insertion-sort trace for [7, 3, 5, 2] in ascending order. Show the initial ordered section, then show it after inserting each new value.',
      decodePrompt: 'Treat the first item as the initial ordered section, then insert one value at a time.',
      requiredElements: ['initial ordered section [7]', 'after inserting 3: [3, 7]', 'after inserting 5: [3, 5, 7]', 'after inserting 2: [2, 3, 5, 7]', 'intermediate states are clearly associated with the inserted values'],
      planningLabels: ['Initial section', 'Insert 3', 'Insert 5', 'Insert 2'],
      modelPlan: ['[7]', '[3,7]', '[3,5,7]', '[2,3,5,7]'],
      retryQuestion: 'Apply insertion sort to [8, 4, 6, 1], showing the ordered section after each insertion.'
    },
    {
      id: 'priority_transfer_213_merge', specificationPointId: '2.1.3', topicId: 'topic_2_1', paper: 'Paper 2', purpose: 'exam-transfer',
      commandWord: 'Complete', marks: 6, minutes: 7, responseForm: 'algorithm-trace', variantFamilyId: 'sort-merge-trace',
      question: 'Apply merge sort in ascending order to [9, 4, 7, 2, 6]. Show the split into single-item lists, the ordered merges and the final list.',
      decodePrompt: 'The list has an odd number of items. Keep every item and show that ordering happens while lists are merged.',
      requiredElements: ['all five values split until each is in a single-item list', 'first ordered merges include [4,9] and [2,7] or an equivalent valid split', 'remaining single value 6 is retained', 'ordered sublists are merged by comparing their front values', 'final list [2,4,6,7,9]', 'intermediate split and merge stages are coherent'],
      planningLabels: ['Split stages', 'First merges', 'Merge remaining value', 'Final merge'],
      modelPlan: ['split until [9] [4] [7] [2] [6]', 'merge to ordered groups such as [4,9], [2,7] and [6]', 'merge the ordered groups by taking the smallest front value', '[2,4,6,7,9]'],
      retryQuestion: 'Apply merge sort to [5, 1, 8, 3, 2], showing all split and ordered merge stages.'
    },
    {
      id: 'priority_transfer_112', specificationPointId: '1.1.2', topicId: 'topic_1_1', paper: 'Paper 1', purpose: 'exam-transfer',
      commandWord: 'Compare', marks: 6, minutes: 9, responseForm: 'explanation',
      question: 'Processor A has a higher clock speed and a smaller cache than Processor B. Both have four cores. Compare how clock speed, cache size and number of cores could affect their performance when editing video.',
      decodePrompt: 'Explain the possible effect of each characteristic and relate it to the video-editing workload. Do not assume one figure alone guarantees the faster processor.',
      requiredElements: ['higher clock speed can allow more processor cycles each second', 'larger cache can reduce waiting for frequently used data or instructions', 'multiple cores can process suitable tasks at the same time', 'software must divide work for multiple cores to help', 'other hardware or software factors also affect performance', 'comparison linked to the video-editing scenario'],
      planningLabels: ['Clock speed', 'Cache', 'Cores and software', 'Overall comparison'],
      modelPlan: ['Processor A may complete more cycles each second', 'Processor B may retrieve likely-needed items from cache with less waiting', 'four cores help only where the editor can run work in parallel', 'the information is insufficient to guarantee which processor finishes first'],
      retryQuestion: 'Two processors have different clock speeds, cache sizes and core counts. Compare how each characteristic could affect performance when rendering an animation, including one reason extra cores may give limited improvement.'
    },
    {
      id: 'priority_transfer_113', specificationPointId: '1.1.3', topicId: 'topic_1_1', paper: 'Paper 1', purpose: 'exam-transfer',
      commandWord: 'Explain', marks: 4, minutes: 6, responseForm: 'explanation',
      question: 'A greenhouse controller reads temperature and moisture sensors and operates fans and water valves. Explain why the controller is an embedded system.',
      decodePrompt: 'Identify the larger product, the controller’s dedicated purpose and how its inputs and outputs support that purpose.',
      requiredElements: ['computer system is built into the greenhouse equipment', 'performs a dedicated monitoring and control function', 'sensor readings provide input data', 'controller processes the data and controls fans or valves as outputs'],
      planningLabels: ['Larger system', 'Dedicated purpose', 'Inputs', 'Processing and outputs'],
      modelPlan: ['the controller is part of the greenhouse equipment', 'it is designed for one monitoring and control purpose', 'temperature and moisture sensors supply data', 'the controller processes readings and operates the appropriate output'],
      retryQuestion: 'A dishwasher contains a controller that reads buttons and sensors before operating pumps and heaters. Explain why the controller is an embedded system.'
    },
    {
      id: 'priority_transfer_122', specificationPointId: '1.2.2', topicId: 'topic_1_2', paper: 'Paper 1', purpose: 'exam-transfer',
      commandWord: 'Recommend', marks: 6, minutes: 9, responseForm: 'explanation',
      question: 'A wildlife camera is carried over rough ground and must store many high-resolution photographs before they are transferred. Recommend a suitable secondary-storage technology and justify your choice.',
      decodePrompt: 'Use the camera’s storage capacity, movement, reliability, speed, portability and cost needs. Compare the recommendation with at least one realistic alternative.',
      requiredElements: ['clear recommendation of solid-state storage', 'no moving parts improves resistance to movement or impact', 'suitable capacity for many high-resolution photographs', 'fast enough for saving or transferring images', 'portable and low-power suitability linked to the camera', 'comparison or limitation involving cost, magnetic or optical storage'],
      planningLabels: ['Scenario priorities', 'Recommended technology', 'Linked benefits', 'Alternative or limitation'],
      modelPlan: ['the camera needs portable, durable storage with enough capacity', 'solid-state storage has no moving parts', 'it resists movement and offers suitable speed and capacity', 'it can cost more per unit than magnetic storage, while optical discs are impractical in the moving camera'],
      retryQuestion: 'Recommend a secondary-storage technology for a lightweight action camera used during cycling. Justify the choice using capacity, durability, portability, speed and one limitation or alternative.'
    },
    {
      id: 'priority_transfer_125', specificationPointId: '1.2.5', topicId: 'topic_1_3', paper: 'Paper 1', purpose: 'exam-transfer',
      commandWord: 'Explain', marks: 4, minutes: 6, responseForm: 'explanation',
      question: 'A developer must compress a program source-code file before sending it. Explain why lossless compression should be used instead of lossy compression.',
      decodePrompt: 'Link the need to reconstruct every source-code character to how lossless and lossy compression handle data.',
      requiredElements: ['compression reduces file size or transmission requirements', 'lossless compression reconstructs the original exactly', 'every source-code character may affect program meaning or syntax', 'lossy compression permanently removes data and could change or break the program'],
      planningLabels: ['Purpose of compression', 'Lossless property', 'Why exact code matters', 'Lossy risk'],
      modelPlan: ['a compressed file needs fewer bits to transmit', 'lossless compression restores every original character', 'a changed character can alter or invalidate the code', 'lossy compression removes information permanently and is unsuitable'],
      retryQuestion: 'A school is archiving spreadsheet files containing examination marks. Explain why lossless compression is appropriate and why lossy compression could damage the usefulness of the files.'
    },
    {
      id: 'priority_transfer_131', specificationPointId: '1.3.1', topicId: 'topic_1_4', paper: 'Paper 1', purpose: 'exam-transfer',
      commandWord: 'Recommend', marks: 6, minutes: 9, responseForm: 'explanation',
      question: 'A school plans to replace its peer-to-peer network with a client-server network in a star topology. Recommend whether it should make this change. Explain relevant benefits and drawbacks.',
      decodePrompt: 'Consider central management, security, backup and performance as well as the central server, switch and cabling risks or costs.',
      requiredElements: ['central user or security management benefit', 'central file storage or backup benefit', 'server can provide shared services or resources', 'server failure can make services unavailable', 'central switch failure can disrupt the star network', 'cost or administration comparison linked to the school'],
      planningLabels: ['Client-server benefits', 'Star benefits', 'Failure risks', 'Recommendation'],
      modelPlan: ['accounts, permissions and files can be managed centrally', 'individual cable failure normally affects one device', 'server or switch failure can affect many users', 'recommend if the school accepts equipment and administration costs for central control'],
      retryQuestion: 'A small college is considering client-server networking with a star topology instead of peer-to-peer networking. Recommend an approach using management, backup, performance, reliability and cost.'
    },
    {
      id: 'priority_transfer_141', specificationPointId: '1.4.1', topicId: 'topic_1_5', paper: 'Paper 1', purpose: 'exam-transfer',
      commandWord: 'Explain', marks: 6, minutes: 9, responseForm: 'explanation',
      question: 'An online shop accepts a login and a product-search input. Explain how brute-force login attempts, phishing and SQL injection could each threaten the shop or its customers.',
      decodePrompt: 'For each named threat, explain how it operates and a likely consequence in this scenario.',
      requiredElements: ['brute force repeatedly guesses login credentials', 'successful guessing may give unauthorised account access', 'phishing uses deceptive communication or a false site', 'phishing may obtain customer credentials or information', 'SQL injection places malicious database instructions in unchecked input', 'SQL injection may expose, alter or delete stored data'],
      planningLabels: ['Brute force', 'Phishing', 'SQL injection', 'Scenario consequences'],
      modelPlan: ['automated guesses may enter customer accounts', 'convincing messages or pages may trick customers into disclosing credentials', 'malicious search text may change a database query', 'customer or product records could be read or changed'],
      retryQuestion: 'A school portal contains a login form and database-backed search. Explain how brute force, phishing and SQL injection could threaten the portal, including one consequence of each.'
    },
    {
      id: 'priority_transfer_142', specificationPointId: '1.4.2', topicId: 'topic_1_5', paper: 'Paper 1', purpose: 'exam-transfer',
      commandWord: 'Recommend', marks: 6, minutes: 9, responseForm: 'explanation',
      question: 'A clinic stores sensitive records and allows staff to connect over a network. Recommend three complementary security measures. Include a way to control access and a way to protect data sent across the network.',
      decodePrompt: 'Choose complementary measures and explain the mechanism of each. Include access control and protection for transmitted data.',
      requiredElements: ['strong authentication or passwords reduce unauthorised login', 'access levels limit records or actions available to each role', 'firewall filters network traffic using rules', 'encryption makes intercepted data unreadable without the key', 'updates or anti-malware reduce exploitation or malicious software', 'measures are combined because each addresses a different risk'],
      planningLabels: ['Login protection', 'Access after login', 'Network boundary', 'Data and layered protection'],
      modelPlan: ['authenticate each staff member', 'give roles only the records and actions needed', 'filter traffic at the network boundary', 'encrypt traffic and keep systems updated because no single control covers every threat'],
      retryQuestion: 'A legal firm stores confidential files and supports remote staff access. Recommend a combination of authentication, access levels, firewall rules, encryption and one further security measure.'
    },
    {
      id: 'priority_transfer_151', specificationPointId: '1.5.1', topicId: 'topic_1_6', paper: 'Paper 1', purpose: 'exam-transfer',
      commandWord: 'Explain', marks: 4, minutes: 6, responseForm: 'explanation',
      question: 'A pupil prints a document while music and a web browser are also running. Explain two operating-system functions involved in this situation.',
      decodePrompt: 'Choose two distinct operating-system functions and explain how each supports the stated activity.',
      requiredElements: ['processor or memory management supports several active applications', 'multitasking schedules processor time or allocates memory', 'a device driver allows communication with the printer', 'explanations are linked to printing or the simultaneously running applications'],
      planningLabels: ['First OS function', 'Link to scenario', 'Second OS function', 'Link to scenario'],
      modelPlan: ['the OS schedules processor time and allocates memory among the active programs', 'a printer driver translates general print requests into commands the printer can use'],
      retryQuestion: 'A user scans a photograph while a video call and word processor are running. Explain two operating-system functions involved, linking each function to the scenario.'
    },
    {
      id: 'priority_transfer_152', specificationPointId: '1.5.2', topicId: 'topic_1_6', paper: 'Paper 1', purpose: 'exam-transfer',
      commandWord: 'Explain', marks: 4, minutes: 6, responseForm: 'explanation',
      question: 'A magnetic hard disk stores parts of files in separated locations. Explain how a defragmentation utility may improve access speed and why the same process is unnecessary for solid-state storage.',
      decodePrompt: 'Describe what is rearranged and link the performance effect specifically to moving disk hardware.',
      requiredElements: ['defragmentation rearranges separated parts or blocks of files', 'related blocks are placed closer together or contiguously', 'magnetic read-write head needs less movement', 'solid-state storage has no moving read-write head'],
      planningLabels: ['What is rearranged', 'New arrangement', 'Magnetic-disk effect', 'Solid-state distinction'],
      modelPlan: ['move fragmented file blocks into adjacent locations', 'the magnetic head travels less distance to read a file', 'solid-state access does not depend on mechanical head movement'],
      retryQuestion: 'Explain how defragmentation can improve file access on a magnetic disk and why it should not be presented as a speed improvement for a solid-state drive.'
    },
    {
      id: 'priority_transfer_162', specificationPointId: '1.6.2', topicId: 'topic_1_7', paper: 'Paper 1', purpose: 'exam-transfer',
      commandWord: 'Explain', marks: 6, minutes: 9, responseForm: 'explanation',
      question: 'An employee uses another person\'s password to enter a company system. Explain how each issue applies.\n(a) Unauthorised system access.\n(b) Copying customer personal data.\n(c) Copying licensed software.',
      decodePrompt: 'Match each action to the correct legal or licensing concern. Do not describe every action as the same offence.',
      requiredElements: ['Computer Misuse Act linked to unauthorised system access', 'using a known password does not make access authorised', 'Data Protection Act linked to handling or copying customer personal data', 'organisation must process personal data lawfully and securely', 'copyright or licence terms restrict unauthorised software copying', 'actions are distinguished and applied to the scenario'],
      planningLabels: ['Unauthorised access', 'Personal data', 'Software copying', 'Applied distinction'],
      modelPlan: ['another person’s password does not provide permission under the Computer Misuse Act', 'customer records are personal data requiring lawful and secure handling', 'copying licensed software may breach copyright and its licence terms'],
      retryQuestion: 'A contractor enters a school system without permission, downloads pupil details and distributes a copy of licensed software. Explain how two named laws and the software licence apply.'
    },
    {
      id: 'priority_transfer_123', specificationPointId: '1.2.3', topicId: 'topic_1_3', paper: 'Paper 1', purpose: 'exam-transfer',
      commandWord: 'Calculate', marks: 4, minutes: 7, responseForm: 'calculation',
      question: 'A backup contains 3,500 files. Each file is 240 KB. Calculate the total size of the backup in MB. Use 1 MB = 1,000 KB and show your working.',
      decodePrompt: 'Multiply to find the total in KB, then convert KB to MB. Keep the unit with each stage.',
      requiredElements: ['3,500 multiplied by 240 KB', 'total of 840,000 KB', 'divide by 1,000 to convert KB to MB', 'final answer of 840 MB with the unit'],
      planningLabels: ['Values and starting unit', 'Total in KB', 'Conversion operation', 'Final answer and unit'],
      modelPlan: ['3,500 × 240 KB', '= 840,000 KB', '840,000 ÷ 1,000', '= 840 MB'],
      retryQuestion: 'A collection contains 2,400 images of 750 KB each. Calculate its total size in GB using 1 GB = 1,000,000 KB. Show your working.'
    },
    {
      id: 'priority_transfer_123_text', specificationPointId: '1.2.3', topicId: 'topic_1_3', paper: 'Paper 1', purpose: 'exam-transfer',
      commandWord: 'Calculate', marks: 4, minutes: 7, responseForm: 'calculation',
      question: 'A plain-text file contains 12,000 characters. Each character is stored using 8 bits. Calculate the file size in bytes and kilobytes using 1 KB = 1,000 bytes. Show your working.',
      decodePrompt: 'Find the total bits, convert bits to bytes, then convert bytes to kilobytes using the convention supplied.',
      requiredElements: ['12,000 multiplied by 8 gives 96,000 bits', 'divide by 8 to convert to 12,000 bytes', 'divide by 1,000 to convert bytes to kilobytes', 'final answer of 12 KB with correct units'],
      planningLabels: ['Total bits', 'Bits to bytes', 'Bytes to KB', 'Final unit'],
      modelPlan: ['12,000 × 8 = 96,000 bits', '96,000 ÷ 8 = 12,000 bytes', '12,000 ÷ 1,000', '= 12 KB'],
      retryQuestion: 'A text file contains 25,000 characters stored using 16 bits per character. Calculate its size in bytes and KB using 1 KB = 1,000 bytes. Show your working.'
    },
    {
      id: 'priority_transfer_124a', specificationPointId: '1.2.4a', topicId: 'topic_1_3', paper: 'Paper 1', purpose: 'exam-transfer',
      commandWord: 'Complete', marks: 5, minutes: 8, responseForm: 'number-representation',
      question: '(a) Convert 10110110 to denary.\n(b) Convert it to hexadecimal.\n(c) Shift it one place left and state the stored 8-bit result.\n(d) State the usual numerical effect of a one-place left shift.\n(e) State whether a significant bit is discarded.',
      decodePrompt: 'Answer each part separately. For the shift, check whether the left-most bit is lost. Do not call this binary-addition overflow.',
      requiredElements: ['denary value 182', 'hexadecimal value B6', 'left shift gives 01101100 in 8 bits', 'a one-place left shift usually multiplies an unsigned value by two', 'the leading 1 is discarded so the fixed-width stored result does not represent 364'],
      planningLabels: ['Binary to denary', 'Binary to hexadecimal', 'Shifted 8-bit result', 'Effect and discarded bit'],
      modelPlan: ['128 + 32 + 16 + 4 + 2 = 182', '1011 0110 = B6', 'shift left gives 01101100', 'a leading 1 is discarded, so the stored 8-bit result is not the full doubled value'],
      retryQuestion: '(a) Convert 11100101 to denary.\n(b) Convert it to hexadecimal.\n(c) Shift it one place left and state the stored 8-bit result.\n(d) State the usual numerical effect.\n(e) State whether a significant bit is discarded.'
    },
    {
      id: 'priority_transfer_124a_add', specificationPointId: '1.2.4a', topicId: 'topic_1_3', paper: 'Paper 1', purpose: 'exam-transfer',
      commandWord: 'Calculate', marks: 4, minutes: 6, responseForm: 'number-representation',
      question: 'Add the two 8-bit binary values 11001010 and 01110101. Show the binary addition, give the stored 8-bit result and state whether binary-addition overflow occurs.',
      decodePrompt: 'Add from the least-significant bit, show carries and compare the full result with the eight available bits.',
      requiredElements: ['correct column-by-column binary addition or carries', 'full mathematical result requires a ninth bit', 'stored 8-bit result is 00111111', 'binary-addition overflow occurs because the result does not fit in 8 bits'],
      planningLabels: ['Set out operands', 'Carries', 'Stored result', 'Overflow decision'],
      modelPlan: ['align both 8-bit values', 'add each column and record carries', 'the full result is 1 00111111', 'the ninth bit cannot fit, so 8-bit overflow occurs'],
      retryQuestion: 'Add the 8-bit binary values 10110110 and 10011101. Show the addition, give the stored 8-bit result and state whether binary-addition overflow occurs.'
    },
    {
      id: 'priority_transfer_124b', specificationPointId: '1.2.4b', topicId: 'topic_1_3', paper: 'Paper 1', purpose: 'exam-transfer',
      commandWord: 'Explain', marks: 4, minutes: 7, responseForm: 'explanation',
      question: 'A messaging service stores text in many languages and includes emoji. Explain why Unicode is more suitable than ASCII. Explain how using more bits per character affects file size.',
      decodePrompt: 'Link the size of the character set to the available symbols, then link bits per character to storage.',
      requiredElements: ['characters are represented using binary codes', 'Unicode can represent a wider range of characters than ASCII', 'the wider range supports multiple writing systems or emoji', 'using more bits per character can increase the storage required for the same number of characters'],
      planningLabels: ['How characters are represented', 'Character-set range', 'Application to the service', 'Storage consequence'],
      modelPlan: ['each character is stored as a binary code', 'Unicode provides codes for many more characters than ASCII', 'this supports different languages and emoji', 'more bits for each stored character can increase the text file size'],
      retryQuestion: 'Explain why Unicode is appropriate for a worldwide travel website and how character encoding can affect the size of its text data.'
    },
    {
      id: 'priority_transfer_124d', specificationPointId: '1.2.4d', topicId: 'topic_1_3', paper: 'Paper 1', purpose: 'exam-transfer',
      commandWord: 'Calculate', marks: 5, minutes: 8, responseForm: 'calculation', traceabilitySpecificationPointIds: ['1.2.3'],
      question: 'A mono sound recording uses a sample rate of 40,000 Hz and a sample depth of 16 bits. The recording lasts 30 seconds. Calculate its file size in bytes and show your working.',
      decodePrompt: 'Use sample rate × sample depth × duration to find bits, then convert bits to bytes.',
      requiredElements: ['40,000 × 16 × 30', '19,200,000 bits', 'divide by 8 to convert bits to bytes', '2,400,000 bytes', 'correct units shown in the working and final answer'],
      planningLabels: ['Formula and values', 'File size in bits', 'Bits-to-bytes conversion', 'Final answer and unit'],
      modelPlan: ['40,000 × 16 × 30', '= 19,200,000 bits', '19,200,000 ÷ 8', '= 2,400,000 bytes'],
      retryQuestion: 'A mono recording uses 20,000 samples per second, 8 bits per sample and lasts 45 seconds. Calculate its size in bytes and show your working.'
    },
    {
      id: 'priority_transfer_211', specificationPointId: '2.1.1', topicId: 'topic_2_1', paper: 'Paper 2', purpose: 'exam-transfer',
      commandWord: 'Explain', marks: 4, minutes: 6, responseForm: 'explanation',
      question: 'A team is designing a parcel-delivery system. Explain how decomposition and abstraction could help the team produce its initial design.',
      decodePrompt: 'Apply each computational-thinking method to the parcel system rather than only defining the two terms.',
      requiredElements: ['decomposition breaks the system into smaller parts', 'relevant parts such as booking, routing or tracking are identified', 'abstraction removes details that do not affect the required solution', 'example of a relevant detail kept or an irrelevant detail omitted'],
      planningLabels: ['Decomposition', 'Applied parts', 'Abstraction', 'Applied detail'],
      modelPlan: ['split booking, route planning, tracking and delivery confirmation', 'design and test these linked parts', 'keep addresses, routes and parcel status', 'omit details such as vehicle colour when it does not affect delivery'],
      retryQuestion: 'A team is designing a cinema-booking system. Explain how decomposition and abstraction could help create the initial solution, using examples from the scenario.'
    },
    {
      id: 'priority_transfer_222', specificationPointId: '2.2.2', topicId: 'topic_2_2', paper: 'Paper 2', purpose: 'exam-transfer',
      commandWord: 'Explain', marks: 4, minutes: 6, responseForm: 'explanation',
      question: 'A program inputs an age as the string "15" and then needs to calculate the age next year. Explain the data-type problem and how casting can correct it.',
      decodePrompt: 'Identify the current and required types, explain why arithmetic is unsuitable before conversion, and give the corrected operation.',
      requiredElements: ['input value is currently a string', 'arithmetic addition requires a numeric type', 'cast or convert the string to an integer', 'calculate the converted value plus one, giving 16'],
      planningLabels: ['Current type', 'Problem', 'Conversion', 'Correct operation'],
      modelPlan: ['"15" is text', 'string concatenation or a type error would not produce the intended arithmetic', 'convert with an integer cast', 'int(age) + 1 gives 16'],
      retryQuestion: 'A program inputs a price as the string "7.50" and must add 2.25. Explain the data-type problem and how casting can produce the correct arithmetic result.'
    },
    {
      id: 'priority_transfer_22py', specificationPointId: '2.2.PY', topicId: 'topic_2_2', paper: 'Paper 2', purpose: 'exam-transfer',
      commandWord: 'Write', marks: 6, minutes: 10, responseForm: 'constructed', assessmentObjective: 'AO3',
      question: 'Write a Python function count_above(values, limit) that returns how many values in a list are greater than limit. Give two test calls and the expected result for each.',
      decodePrompt: 'The response must be executable Python, use both parameters, examine every list item, return a count and include tests.',
      requiredElements: ['valid Python function with both parameters', 'counter initialised before the loop', 'iteration through every value', 'selection tests value greater than limit', 'counter returned after the loop', 'two test calls with stated expected results including a useful edge case'],
      planningLabels: ['Function and parameters', 'Loop and condition', 'Return', 'Tests and expected results'],
      modelPlan: ['def count_above(values, limit):', 'start count at zero and loop through values', 'increment where value > limit and return after the loop', 'test a mixed list and an empty or no-match list'],
      retryQuestion: 'Write a Python function count_negative(values) that returns the number of negative values in a list. Give two test calls and the expected result for each, including an empty list or a list with no negative values.'
    },
    {
      id: 'priority_transfer_231', specificationPointId: '2.3.1', topicId: 'topic_2_3', paper: 'Paper 2', purpose: 'exam-transfer',
      commandWord: 'Design', marks: 6, minutes: 9, responseForm: 'constructed', assessmentObjective: 'AO3',
      question: 'Using OCR Exam Reference Language, design a routine for creating a pupil username. Check the user\'s identity first. Accept usernames from 6 to 20 characters. Use a named subprogram for the validation so the rule can be changed in one place.',
      decodePrompt: 'Write OCR Exam Reference Language that separates authentication from validation and uses maintainable names and structure.',
      requiredElements: ['authenticate the user before allowing the change', 'length validation accepts 6 to 20 characters inclusive', 'rejects or repeats input outside the range', 'clear meaningful variable or subprogram names', 'routine split into suitable subprograms or reusable checks', 'indentation or purposeful comments support maintainability'],
      planningLabels: ['Authentication', 'Validation', 'Response to invalid input', 'Maintainability'],
      modelPlan: ['verify the current account credentials', 'use a username-length check for the inclusive range', 'show an error and request another value', 'place checks in clearly named functions with readable structure'],
      retryQuestion: 'Using OCR Exam Reference Language, design a defensive routine for changing an email address. Authenticate the account, validate that a non-empty value contains an @ symbol, handle rejected input and use maintainable code.'
    },
    {
      id: 'priority_transfer_241', specificationPointId: '2.4.1', topicId: 'topic_2_4', paper: 'Paper 2', purpose: 'exam-transfer',
      commandWord: 'Complete', marks: 5, minutes: 8, responseForm: 'constructed',
      question: '(a) Write the Boolean expression for a door that opens when card A AND code B are valid and override C is NOT active.\n(b) Evaluate it for A=1, B=1, C=0.\n(c) Evaluate it for A=1, B=1, C=1.',
      decodePrompt: 'Translate the two-part access rule first, apply NOT to the override, then evaluate one intermediate result at a time.',
      requiredElements: ['expression includes A AND B', 'expression applies NOT to C', 'complete expression is (A AND B) AND NOT C or equivalent', 'first input set evaluates to 1 or door open', 'second input set evaluates to 0 or door closed'],
      planningLabels: ['Access condition', 'Override condition', 'Combined expression', 'Two evaluations'],
      modelPlan: ['valid access is A AND B', 'enabled state is NOT C', 'combine as (A AND B) AND NOT C', '1,1,0 gives 1; 1,1,1 gives 0'],
      retryQuestion: 'An alarm sounds when sensor A OR sensor B is active, provided disable switch C is NOT active.\n(a) Write the Boolean expression.\n(b) Evaluate it for A=0, B=1, C=0.\n(c) Evaluate it for A=0, B=1, C=1.'
    },
    {
      id: 'priority_transfer_252', specificationPointId: '2.5.2', topicId: 'topic_2_5', paper: 'Paper 2', purpose: 'exam-transfer',
      commandWord: 'Explain', marks: 4, minutes: 6, responseForm: 'explanation',
      question: 'A program stops with an error while calculating an average. Explain how error diagnostics and the IDE run-time environment could help the programmer locate and correct the fault.',
      decodePrompt: 'Explain the evidence produced when the program is run and how the programmer uses the diagnostic location and message.',
      requiredElements: ['run-time environment executes the program with test data', 'error diagnostics report an error type or message', 'diagnostics identify or highlight a relevant source-code location', 'programmer corrects the cause and repeats the test'],
      planningLabels: ['Run the program', 'Diagnostic message', 'Source location', 'Correction and retest'],
      modelPlan: ['use the run-time environment to execute the program with known test data', 'read the reported error type and line', 'inspect the calculation and values used at that location', 'correct the cause and run the same test again'],
      retryQuestion: 'A program stops while converting an input value. Explain how the IDE run-time environment and error diagnostics could help locate and correct the fault, including how the programmer should retest it.'
    },
    {
      id: 'priority_transfer_223', specificationPointId: '2.2.3', topicId: 'topic_2_2', paper: 'Paper 2', purpose: 'exam-transfer',
      commandWord: 'Write', marks: 8, minutes: 12, assessmentObjective: 'AO3',
      question: 'A file contains one integer score on each line. Write an OCR Exam Reference Language algorithm that reads every score, counts scores of 50 or more, closes the file and prints the count.',
      decodePrompt: 'Identify the required file operations, loop condition, selection and accumulator.',
      requiredElements: ['open the file and store it in a variable', 'loop while NOT endOfFile()', 'read each line', 'cast or treat the score as an integer', 'test score >= 50', 'increment a counter', 'close the file', 'print the counter'],
      planningLabels: ['Initialise and open', 'Loop and read', 'Selection and count', 'Close and output'],
      modelPlan: ['count = 0 and scores = open("scores.txt")', 'while NOT scores.endOfFile(), read and cast a line', 'if score >= 50 then count = count + 1', 'end loop, close file, print count'],
      retryQuestion: 'Write an OCR Exam Reference Language algorithm that reads names from a file and prints only names with a length greater than five.'
    },
    {
      id: 'priority_transfer_erl', specificationPointId: '2.2.ERL', topicId: 'topic_2_2', paper: 'Paper 2', purpose: 'exam-transfer',
      commandWord: 'Write', marks: 7, minutes: 11, assessmentObjective: 'AO3',
      question: 'Using OCR Exam Reference Language, write a function `countEven(values, numberOfValues)` that receives an array and its number of elements, counts the even values and returns the count.',
      decodePrompt: 'Use OCR Exam Reference Language. Use both parameters, check every valid array index, use MOD to test each value, and return the count.',
      requiredElements: ['function declaration with both parameters', 'counter initialised to zero', 'loop from index 0 to numberOfValues - 1', 'MOD 2 == 0 test', 'counter increment', 'return counter', 'endfunction'],
      planningLabels: ['Function and parameter', 'Initialise', 'Loop and condition', 'Return and close'],
      modelPlan: ['function countEven(values, numberOfValues)', 'count = 0', 'for index=0 to numberOfValues - 1; if values[index] MOD 2 == 0 then increment', 'return count; endfunction'],
      retryQuestion: 'Using OCR Exam Reference Language, write a function that receives an array and its size, then returns the total of all values.'
    },
    {
      id: 'priority_transfer_212', specificationPointId: '2.1.2', topicId: 'topic_2_1', paper: 'Paper 2', purpose: 'exam-transfer',
      commandWord: 'Refine', marks: 6, minutes: 9, assessmentObjective: 'AO3',
      question: 'The OCR Exam Reference Language below should input five integers and output how many are positive.\n\ncount = 1\nfor index = 1 to 5\n    value = input("Integer")\n    if value >= 0 then\n        count = count + 1\n    endif\nnext index\nprint(count)\n\n(a) Trace the code using 4, 0, -2, 7 and 1.\n(b) State the output.\n(c) Find the two faulty lines.\n(d) Write the two corrected lines.',
      decodePrompt: 'Record the count after each input, compare the output with the intended result, then correct the initial value and positive-number condition.',
      requiredElements: ['trace begins from the stated incorrect count of 1', 'zero is counted by the incorrect condition', 'incorrect final count is identified as 5', 'correct number of positive inputs is 3', 'refine count initialisation from 1 to 0', 'refine the condition so only values greater than zero are counted'],
      planningLabels: ['Trace values', 'Incorrect output', 'First fault and correction', 'Second fault and correction'],
      modelPlan: ['record count as the five inputs are processed', 'the faulty algorithm counts 4, 0, 7 and 1 on top of its initial 1', 'initialise count to zero', 'use value > 0 rather than value >= 0'],
      retryQuestion: 'This algorithm should count how many of four temperatures are below zero, but uses `count = 1` and `temperature <= 0`. Trace it for -3, 0, 4, -1, then write the two corrected lines.'
    },
    {
      id: 'priority_transfer_221', specificationPointId: '2.2.1', topicId: 'topic_2_2', paper: 'Paper 2', purpose: 'exam-transfer',
      commandWord: 'Write', marks: 6, minutes: 9, assessmentObjective: 'AO3',
      question: 'Write an algorithm that repeatedly inputs a positive integer, outputs whether it is even or odd, and stops only after the user enters 0.',
      decodePrompt: 'Choose a condition-controlled loop, place the sentinel check correctly and use MOD for parity.',
      requiredElements: ['input a number', 'condition-controlled repetition', '0 acts as the stopping value', 'MOD 2 tests parity', 'outputs even for non-zero even values', 'outputs odd for odd values'],
      planningLabels: ['First input', 'Loop condition', 'Even/odd selection', 'Next input'],
      modelPlan: ['input number', 'while number != 0', 'if number MOD 2 == 0 print even else print odd', 'input the next number before endwhile'],
      retryQuestion: 'Write an algorithm that repeatedly inputs words and stops when the word "END" is entered, counting all earlier words.'
    },
    {
      id: 'priority_transfer_232', specificationPointId: '2.3.2', topicId: 'topic_2_3', paper: 'Paper 2', purpose: 'exam-transfer',
      commandWord: 'Complete', marks: 6, minutes: 9,
      question: 'Complete a test plan for a password-length check that accepts strings from 8 to 20 characters inclusive. Include normal, both boundaries, invalid and erroneous data and an expected result for each.',
      decodePrompt: 'The input is a string, so choose values that distinguish length limits from wrong data types.',
      requiredElements: ['normal string length between 8 and 20', '8-character lower boundary accepted', '20-character upper boundary accepted', 'string shorter than 8 rejected', 'string longer than 20 rejected', 'non-string erroneous value rejected and expected result for each'],
      planningLabels: ['Normal', 'Boundaries', 'Invalid lengths', 'Erroneous and expected results'],
      modelPlan: ['12-character string accepted', '8 and 20 characters accepted', '7 and 21 characters rejected', 'non-string input rejected'],
      retryQuestion: 'Complete a test plan for a whole-number quantity from 1 to 99 inclusive.'
    }
  ]
  };
});
