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
      retryHint: 'Think about a cycle in which a programmer changes a module, tests it, and uses the result to guide the next change before the product is finished.'
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
    }
  ],
  writtenQuestions: [
    {
      id: 'priority_app_223_1', topicId: 'topic_2_2', specificationPointId: '2.2.3', purpose: 'application',
      commandWord: 'Write', marks: 5,
      question: 'Write an SQL query that returns Title and Author from a table called Book for books whose Genre is "Mystery". Explain the role of each clause.',
      scenario: 'A library searches its Book table by genre.',
      indicativeContent: ['SELECT Title, Author', 'FROM Book', 'WHERE Genre = "Mystery"', 'SELECT chooses fields, FROM chooses the table and WHERE filters records'],
      rubric: ['1-3 marks: one mark for each correct clause.', '4-5 marks: accurate explanation of the roles of the clauses.'],
      modelAnswer: 'SELECT Title, Author FROM Book WHERE Genre = "Mystery". SELECT chooses the fields to return, FROM identifies the Book table and WHERE keeps only records whose Genre field matches Mystery.',
      misconceptions: [{ phrase: 'SELECT Book', feedback: 'SELECT names the fields to return; FROM names the table.' }]
    },
    {
      id: 'priority_app_223_2', topicId: 'topic_2_2', specificationPointId: '2.2.3', purpose: 'application',
      commandWord: 'Design', marks: 6,
      question: 'A program stores temperatures for seven days. Design a solution using an array and a function that returns the highest temperature. State why the array and function are suitable.',
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
      question: 'A cinema charges £7 for a child ticket and £11 for an adult ticket. Identify the inputs, processes and outputs for an algorithm that calculates the total price for a group.',
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
      question: 'A program tests `age >= 13 OR age <= 17` to decide whether an age is from 13 to 17 inclusive. Explain why this logic is incorrect and give the corrected condition.',
      scenario: 'A compound Boolean condition validates an age range.',
      indicativeContent: ['OR requires only one comparison to be true', 'almost every number passes', 'both boundaries must be satisfied', 'age >= 13 AND age <= 17'],
      rubric: ['1-2 marks: identifies OR as wrong or gives corrected condition.', '3-4 marks: explains why and supplies the inclusive correction.'],
      modelAnswer: 'OR accepts almost every number because values below 13 still satisfy age <= 17 and values above 17 still satisfy age >= 13. Use age >= 13 AND age <= 17.',
      misconceptions: []
    },
    {
      id: 'priority_app_232_1', topicId: 'topic_2_3', specificationPointId: '2.3.2', purpose: 'application',
      commandWord: 'Design', marks: 6,
      question: 'Design a test plan for an integer month input that accepts values 1 to 12 inclusive. Include normal, both boundaries, invalid and erroneous data with expected results.',
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
      id: 'priority_transfer_223', specificationPointId: '2.2.3', topicId: 'topic_2_2', paper: 'Paper 2', purpose: 'exam-transfer',
      commandWord: 'Write', marks: 8, minutes: 12,
      question: 'A file contains one integer score on each line. Write an OCR Exam Reference Language algorithm that reads every score, counts scores of 50 or more, closes the file and prints the count.',
      decodePrompt: 'Identify the required file operations, loop condition, selection and accumulator.',
      requiredElements: ['open the file and store it in a variable', 'loop while NOT endOfFile()', 'read each line', 'cast or treat the score as an integer', 'test score >= 50', 'increment a counter', 'close the file', 'print the counter'],
      planningLabels: ['Initialise and open', 'Loop and read', 'Selection and count', 'Close and output'],
      modelPlan: ['count = 0 and scores = open("scores.txt")', 'while NOT scores.endOfFile(), read and cast a line', 'if score >= 50 then count = count + 1', 'end loop, close file, print count'],
      retryQuestion: 'Write an OCR Exam Reference Language algorithm that reads names from a file and prints only names with a length greater than five.'
    },
    {
      id: 'priority_transfer_erl', specificationPointId: '2.2.ERL', topicId: 'topic_2_2', paper: 'Paper 2', purpose: 'exam-transfer',
      commandWord: 'Write', marks: 7, minutes: 11,
      question: 'Using OCR Exam Reference Language, write a function `countEven(values, numberOfValues)` that receives an array and its number of elements, counts the even values and returns the count.',
      decodePrompt: 'The response must be OCR Exam Reference Language, use both parameters, examine every valid index, test with MOD and return a value.',
      requiredElements: ['function declaration with both parameters', 'counter initialised to zero', 'loop from index 0 to numberOfValues - 1', 'MOD 2 == 0 test', 'counter increment', 'return counter', 'endfunction'],
      planningLabels: ['Function and parameter', 'Initialise', 'Loop and condition', 'Return and close'],
      modelPlan: ['function countEven(values, numberOfValues)', 'count = 0', 'for index=0 to numberOfValues - 1; if values[index] MOD 2 == 0 then increment', 'return count; endfunction'],
      retryQuestion: 'Using OCR Exam Reference Language, write a function that receives an array and its size, then returns the total of all values.'
    },
    {
      id: 'priority_transfer_212', specificationPointId: '2.1.2', topicId: 'topic_2_1', paper: 'Paper 2', purpose: 'exam-transfer',
      commandWord: 'Refine', marks: 6, minutes: 9,
      question: 'An algorithm should output the first index containing target. It currently continues searching after a match and returns the final matching index. Refine the algorithm so it returns the first index, or -1 when absent.',
      decodePrompt: 'Identify where the successful return belongs and when -1 may safely be returned.',
      requiredElements: ['iterate indexes from the start', 'compare each element with target', 'return the index immediately on a match', 'do not overwrite a found index', 'return -1 only after the loop', 'works with duplicate and absent targets'],
      planningLabels: ['Loop order', 'Match test', 'Successful return', 'Absent return'],
      modelPlan: ['visit indexes in ascending order', 'if values[index] == target', 'return index inside the match branch', 'after the loop return -1'],
      retryQuestion: 'Refine a minimum-search algorithm that incorrectly initialises its minimum to zero.'
    },
    {
      id: 'priority_transfer_221', specificationPointId: '2.2.1', topicId: 'topic_2_2', paper: 'Paper 2', purpose: 'exam-transfer',
      commandWord: 'Write', marks: 6, minutes: 9,
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
