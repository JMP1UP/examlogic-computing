// Database state layer for GCSE Computer Science Learning Platform (StudySpice)
const DB_KEY = 'studyspice_db';

const defaultDatabase = {
  schemaVersion: 10,
  schools: [
    {
      id: 'school_1',
      name: 'Leicester High School',
      city: 'Leicester',
      country: 'United Kingdom',
      domain: 'leicesterhigh.edu',
      tenantId: 'leicester-high-tenant-uuid',
      logoUrl: '/assets/leicester_logo.jpg'
    }
  ],
  coordinators: [
    {
      id: 'coord_1',
      name: 'Mrs. Smith',
      email: 'smith@leicesterhigh.edu',
      schoolId: 'school_1',
      role: 'Teacher',
      approved: true,
      bio: 'Head of Computer Science at Leicester High School.'
    },
    {
      id: 'coord_999',
      name: 'System Admin',
      email: 'john@25Thirty.com',
      schoolId: 'school_1',
      role: 'Admin',
      approved: true,
      bio: '25Thirty Platform Administrator.'
    }
  ],
  students: [
    {
      id: 'stud_1',
      name: 'Harriet Potter',
      email: 'harriet@leicesterhigh.edu',
      schoolId: 'school_1',
      yearGroup: 'Year 10',
      active: true,
      classId: 'class_1',
      streak: 4,
      lastActive: new Date().toISOString(),
      achievements: ['Four-Week Habit', 'Binary Fluent'],
      personalRevisionPriorities: ['hexadecimal conversions', 'validation and authentication']
    },
    {
      id: 'stud_2',
      name: 'Emily Watson',
      email: 'emily@leicesterhigh.edu',
      schoolId: 'school_1',
      yearGroup: 'Year 10',
      active: true,
      classId: 'class_1',
      streak: 1,
      lastActive: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
      achievements: ['Debugging Detective'],
      personalRevisionPriorities: ['image file-size calculations']
    },
    {
      id: 'stud_3',
      name: 'Jessica Smith',
      email: 'jessica@leicesterhigh.edu',
      schoolId: 'school_1',
      yearGroup: 'Year 10',
      active: true,
      classId: 'class_1',
      streak: 0,
      lastActive: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
      achievements: [],
      personalRevisionPriorities: []
    }
  ],
  classes: [
    {
      id: 'class_1',
      name: 'Year 10 CS - Group A',
      teacherId: 'coord_1',
      schoolId: 'school_1'
    }
  ],
  units: [
    {
      id: 'unit_1',
      paper: 'Paper 1',
      name: 'Computer Systems',
      topics: [
        { id: 'topic_1_1', code: '1.1', name: 'Systems Architecture', objectives: [
          { id: '1.1.1', name: 'Architecture of the CPU' }, { id: '1.1.2', name: 'CPU performance' }, { id: '1.1.3', name: 'Embedded systems' }
        ] },
        { id: 'topic_1_2', code: '1.2', name: 'Memory and Storage', objectives: [
          { id: '1.2.1', name: 'Primary storage (memory)' }, { id: '1.2.2', name: 'Secondary storage' }
        ] },
        { id: 'topic_1_3', code: '1.2', name: 'Data Representation', objectives: [
          { id: '1.2.3', name: 'Units' },
          { id: '1.2.4a', name: 'Data storage: numbers' }, { id: '1.2.4b', name: 'Data storage: characters' }, { id: '1.2.4c', name: 'Data storage: images' },
          { id: '1.2.4d', name: 'Data storage: sound' }, { id: '1.2.5', name: 'Compression' }
        ] },
        { id: 'topic_1_4', code: '1.3', name: 'Computer Networks, Connections and Protocols', objectives: [
          { id: '1.3.1', name: 'Networks and topologies' }, { id: '1.3.2', name: 'Wired and wireless networks, protocols and layers' }
        ] },
        { id: 'topic_1_5', code: '1.4', name: 'Network Security', objectives: [
          { id: '1.4.1', name: 'Threats to computer systems and networks' }, { id: '1.4.2', name: 'Identifying and preventing vulnerabilities' }
        ] },
        { id: 'topic_1_6', code: '1.5', name: 'Systems Software', objectives: [
          { id: '1.5.1', name: 'Operating systems' }, { id: '1.5.2', name: 'Utility software' }
        ] },
        { id: 'topic_1_7', code: '1.6', name: 'Ethical, Legal, Cultural and Environmental Impacts', objectives: [
          { id: '1.6.1', name: 'Ethical, legal, cultural and environmental impact' }, { id: '1.6.2', name: 'Legislation and privacy' }
        ] }
      ]
    },
    {
      id: 'unit_2',
      paper: 'Paper 2',
      name: 'Computational Thinking, Algorithms and Programming',
      topics: [
        { id: 'topic_2_1', code: '2.1', name: 'Algorithms', objectives: [
          { id: '2.1.1', name: 'Computational thinking' }, { id: '2.1.2', name: 'Designing, creating and refining algorithms' }, { id: '2.1.3', name: 'Searching and sorting algorithms' }
        ] },
        { id: 'topic_2_2', code: '2.2', name: 'Programming Fundamentals', objectives: [
          { id: '2.2.1', name: 'Programming fundamentals' }, { id: '2.2.2', name: 'Data types' }, { id: '2.2.3', name: 'Additional programming techniques' },
          { id: '2.2.PY', name: 'Practical Python: design, write, test and refine' }, { id: '2.2.ERL', name: 'OCR Exam Reference Language: read, trace, complete and write' }
        ] },
        { id: 'topic_2_3', code: '2.3', name: 'Producing Robust Programs', objectives: [
          { id: '2.3.1', name: 'Defensive design' }, { id: '2.3.2', name: 'Testing' }
        ] },
        { id: 'topic_2_4', code: '2.4', name: 'Boolean Logic', objectives: [{ id: '2.4.1', name: 'Boolean logic' }] },
        { id: 'topic_2_5', code: '2.5', name: 'Programming Languages and IDEs', objectives: [
          { id: '2.5.1', name: 'Languages' }, { id: '2.5.2', name: 'The Integrated Development Environment' }
        ] }
      ]
    }
  ],
  classroomControls: {
    'topic_1_4': 'teaching', // Currently teaching
    'topic_1_3': 'recent',   // Recently taught
    'topic_1_1': 'practice', // Ready for independent practice
    'topic_1_2': 'priority', // Assessment priority
    'topic_2_4': 'hidden'    // Hidden until later
  },
  assignments: [
    {
      id: 'assign_1',
      title: 'Spaced Theory Check - Data Rep',
      classId: 'class_1',
      topicId: 'topic_1_3',
      dueDate: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString().split('T')[0],
      status: 'Recommended',
      estimatedMinutes: 10,
      completedCount: 1
    },
    {
      id: 'assign_2',
      title: 'Programming Practice - Loops and Selection',
      classId: 'class_1',
      topicId: 'topic_2_2',
      dueDate: new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString().split('T')[0],
      status: 'Recommended',
      estimatedMinutes: 15,
      completedCount: 0
    }
  ],
  testPreps: [
    {
      id: 'prep_1',
      title: 'Data Representation Check',
      classId: 'class_1',
      testDate: new Date(Date.now() + 12 * 24 * 3600 * 1000).toISOString().split('T')[0],
      weeklyMinutes: 20,
      sessionMinutes: 10,
      status: 'Active',
      specificationPointIds: ['1.2.3', '1.2.4a', '1.2.4b', '1.2.4c', '1.2.4d'],
      includePython: false,
      includePseudocode: false
    }
  ],
  supportSessions: [
    {
      id: 'session_1',
      title: 'Data representation revision clinic',
      type: 'Revision',
      date: new Date(Date.now() + 6 * 24 * 3600 * 1000).toISOString().split('T')[0],
      startTime: '15:45',
      durationMinutes: 30,
      location: 'Computer Room 2',
      recipientType: 'students',
      recipientIds: ['stud_1', 'stud_2'],
      notes: 'Bring your last data representation assessment.',
      published: true
    }
  ],
  examTransferTasks: [
    {
      id: 'transfer_1', specificationPointId: '1.2.4c', topicId: 'topic_1_3', paper: 'Paper 1', commandWord: 'Calculate', marks: 4, minutes: 6,
      question: 'A bitmap image is 800 pixels wide and 600 pixels high. Its colour depth is 16 bits. Calculate the uncompressed file size in bytes. Show your working.',
      decodePrompt: 'Identify the three values needed by the image file-size formula and the unit conversion required at the end.',
      requiredElements: ['800 × 600 × 16', '7,680,000 bits', 'divide by 8', '960,000 bytes'],
      planningLabels: ['Formula', 'Substitution', 'Unit conversion', 'Answer with unit'],
      modelPlan: ['width × height × colour depth', '800 × 600 × 16', 'convert bits to bytes by dividing by 8', '960,000 bytes'],
      retryQuestion: 'A 400 × 300 pixel bitmap uses a colour depth of 24 bits. Calculate its uncompressed size in bytes.'
    },
    {
      id: 'transfer_2', specificationPointId: '1.3.2', topicId: 'topic_1_4', paper: 'Paper 1', commandWord: 'Explain', marks: 4, minutes: 7,
      question: 'A student enters a web address into a browser. Explain how DNS and an IP address help the browser connect to the correct web server.',
      decodePrompt: 'The command word requires linked reasons, not a list. Identify what DNS does and what the resulting IP address is used for.',
      requiredElements: ['DNS translates or looks up the domain name', 'returns the server IP address', 'IP address identifies or locates the server', 'browser uses it to send the request'],
      planningLabels: ['DNS action', 'DNS result', 'Purpose of IP address', 'Link to browser request'],
      modelPlan: ['look up the human-readable domain', 'obtain the corresponding IP address', 'IP uniquely identifies the destination server', 'send packets/request to that address'],
      retryQuestion: 'Explain why both MAC addresses and IP addresses may be used when data travels across a network.'
    },
    {
      id: 'transfer_3', specificationPointId: '2.3.2', topicId: 'topic_2_3', paper: 'Paper 2', commandWord: 'Design', marks: 6, minutes: 9,
      question: 'A program accepts an exam mark from 0 to 100. Design a test plan containing normal, boundary, invalid and erroneous test data. Give an expected result for each test.',
      decodePrompt: 'Separate the four requested test-data categories. Every test needs both a value and an expected result.',
      requiredElements: ['normal value within range', 'boundary value such as 0 or 100', 'invalid value outside range', 'erroneous value of the wrong data type', 'expected result for every test'],
      planningLabels: ['Normal', 'Boundary', 'Invalid', 'Erroneous', 'Expected results'],
      modelPlan: ['50 → accepted', '0 and/or 100 → accepted', '101 or -1 → rejected', '"ten" → rejected as wrong type', 'state accepted/rejected for each'],
      retryQuestion: 'Design test data for an age input that accepts whole numbers from 11 to 18 inclusive.'
    },
    {
      id: 'transfer_4', specificationPointId: '1.6.1', topicId: 'topic_1_7', paper: 'Paper 1', commandWord: 'Discuss', marks: 8, minutes: 12,
      question: 'A school is considering using facial-recognition cameras to record attendance. Discuss ethical, legal and privacy issues the school should consider.',
      decodePrompt: 'A discussion needs developed arguments on more than one side, application to the school, and a justified conclusion.',
      requiredElements: ['privacy or surveillance concern', 'personal/biometric data', 'data protection responsibilities', 'accuracy or bias', 'potential benefit', 'justified conclusion'],
      planningLabels: ['Potential benefit', 'Privacy risk', 'Legal/data issue', 'Accuracy or bias', 'Conclusion'],
      modelPlan: ['efficient attendance/safeguarding benefit', 'continuous monitoring may feel intrusive', 'biometric data needs lawful secure handling', 'false matches may affect groups unfairly', 'weigh safeguards against benefit'],
      retryQuestion: 'Discuss whether a school should use monitoring software on every pupil-owned device connected to its Wi-Fi.'
    }
  ],
  keyTerms: [
    { id: 'term_cpu', term: 'CPU', topicId: 'topic_1_1', definition: 'The processor that fetches, decodes and executes instructions.', keywords: ['processor', 'instructions'] },
    { id: 'term_alu', term: 'ALU', topicId: 'topic_1_1', definition: 'The CPU component that carries out arithmetic calculations and logical comparisons.', keywords: ['arithmetic', 'logic'] },
    { id: 'term_cache', term: 'Cache', topicId: 'topic_1_1', definition: 'Small, fast memory close to the CPU that stores frequently used instructions and data.', keywords: ['fast', 'cpu', 'instructions'] },
    { id: 'term_ram', term: 'RAM', topicId: 'topic_1_2', definition: 'Volatile primary memory that stores programs and data currently in use.', keywords: ['volatile', 'programs', 'data'] },
    { id: 'term_rom', term: 'ROM', topicId: 'topic_1_2', definition: 'Non-volatile primary memory that stores instructions which do not normally change.', keywords: ['non-volatile', 'instructions'] },
    { id: 'term_virtual_memory', term: 'Virtual memory', topicId: 'topic_1_2', definition: 'A section of secondary storage used temporarily when RAM is full.', keywords: ['secondary storage', 'ram', 'full'] },
    { id: 'term_bit', term: 'Bit', topicId: 'topic_1_3', definition: 'A single binary digit with a value of either 0 or 1.', keywords: ['binary', '0', '1'] },
    { id: 'term_overflow', term: 'Overflow', topicId: 'topic_1_3', definition: 'An error that occurs when a binary result is too large to fit in the available number of bits.', keywords: ['too large', 'bits'] },
    { id: 'term_metadata', term: 'Metadata', topicId: 'topic_1_3', definition: 'Data that describes other data, such as an image’s width, height or creation date.', keywords: ['describes', 'data'] },
    { id: 'term_lossy', term: 'Lossy compression', topicId: 'topic_1_3', definition: 'Compression that permanently removes some data to reduce file size.', keywords: ['removes', 'data', 'file size'] },
    { id: 'term_lan', term: 'LAN', topicId: 'topic_1_4', definition: 'A network covering a small geographical area, such as one school site.', keywords: ['network', 'small', 'area'] },
    { id: 'term_protocol', term: 'Protocol', topicId: 'topic_1_4', definition: 'An agreed set of rules for communication between devices.', keywords: ['rules', 'communication'] },
    { id: 'term_phishing', term: 'Phishing', topicId: 'topic_1_5', definition: 'A social-engineering attack that uses deceptive messages to trick people into revealing information or opening malicious content.', keywords: ['trick', 'message', 'information'] },
    { id: 'term_encryption', term: 'Encryption', topicId: 'topic_1_5', definition: 'Scrambling data so it can only be read using the correct decryption key.', keywords: ['scrambling', 'data', 'key'] },
    { id: 'term_os', term: 'Operating system', topicId: 'topic_1_6', definition: 'System software that manages hardware and provides services and an interface for applications and users.', keywords: ['system software', 'hardware', 'interface'] },
    { id: 'term_open_source', term: 'Open-source software', topicId: 'topic_1_7', definition: 'Software whose source code is available for people to inspect, modify and redistribute under its licence.', keywords: ['source code', 'modify', 'licence'] },
    { id: 'term_abstraction', term: 'Abstraction', topicId: 'topic_2_1', definition: 'Removing unnecessary detail so attention can be focused on the important parts of a problem.', keywords: ['unnecessary', 'detail', 'important'] },
    { id: 'term_decomposition', term: 'Decomposition', topicId: 'topic_2_1', definition: 'Breaking a problem into smaller, more manageable parts.', keywords: ['breaking', 'problem', 'smaller'] },
    { id: 'term_algorithm', term: 'Algorithm', topicId: 'topic_2_1', definition: 'A precise sequence of steps used to solve a problem.', keywords: ['sequence', 'steps', 'solve'] },
    { id: 'term_variable', term: 'Variable', topicId: 'topic_2_2', definition: 'A named storage location whose value can change while a program runs.', keywords: ['named', 'value', 'change'] },
    { id: 'term_selection', term: 'Selection', topicId: 'topic_2_2', definition: 'Choosing which instructions to execute based on whether a condition is true or false.', keywords: ['condition', 'true', 'false'] },
    { id: 'term_iteration', term: 'Iteration', topicId: 'topic_2_2', definition: 'Repeating a set of instructions using a loop.', keywords: ['repeating', 'instructions', 'loop'] },
    { id: 'term_array', term: 'Array', topicId: 'topic_2_2', definition: 'A data structure that stores multiple values of the same data type under one name, accessed using an index.', keywords: ['multiple', 'same data type', 'index'] },
    { id: 'term_syntax_error', term: 'Syntax error', topicId: 'topic_2_3', definition: 'An error that breaks the grammatical rules of a programming language and prevents translation or execution.', keywords: ['rules', 'language', 'prevents'] },
    { id: 'term_logic_error', term: 'Logic error', topicId: 'topic_2_3', definition: 'An error where a program runs but produces an unexpected result.', keywords: ['runs', 'unexpected', 'result'] },
    { id: 'term_validation', term: 'Validation', topicId: 'topic_2_3', definition: 'Checking that input data meets specified rules before it is processed.', keywords: ['checking', 'input', 'rules'] },
    { id: 'term_boolean', term: 'Boolean', topicId: 'topic_2_4', definition: 'A data value or expression that can be only true or false.', keywords: ['true', 'false'] },
    { id: 'term_compiler', term: 'Compiler', topicId: 'topic_2_5', definition: 'A translator that converts an entire high-level program into machine code before it is run.', keywords: ['translator', 'entire', 'machine code'] },
    { id: 'term_interpreter', term: 'Interpreter', topicId: 'topic_2_5', definition: 'A translator that translates and executes a high-level program one instruction at a time.', keywords: ['translator', 'one', 'instruction'] },
    { id: 'term_pseudocode', term: 'Pseudocode', topicId: 'topic_2_1', definition: 'A structured, language-independent way to describe the steps of an algorithm.', keywords: ['structured', 'language-independent', 'algorithm'] }
  ],
  questions: [
    {
      "id": "q_2_1_a",
      "topicId": "topic_2_1",
      "type": "mcq",
      "question": "What is the definition of 'abstraction' in computational thinking?",
      "options": [
            "Removing unnecessary details from a problem to focus on the essential features",
            "Breaking a complex problem down into smaller, more manageable sub-problems",
            "Writing step-by-step instructions to solve a programming task",
            "Using a trace table to track variable values in an algorithm"
      ],
      "answer": "Removing unnecessary details from a problem to focus on the essential features",
      "explanation": "Abstraction is the process of filtering out detail that is not needed in order to focus on the key parts of a problem."
},
    {
      "id": "q_2_1_b",
      "topicId": "topic_2_1",
      "type": "mcq",
      "question": "What is a mandatory pre-requisite for running a Binary Search algorithm?",
      "options": [
            "The data set must be sorted in alphabetical or numerical order",
            "The data set must contain only integer data types",
            "The program must be compiled rather than interpreted",
            "The data set must have an odd number of items"
      ],
      "answer": "The data set must be sorted in alphabetical or numerical order",
      "explanation": "Binary search repeatedly divides the search list in half based on whether the target value is larger or smaller than the middle item. This only works if the list is sorted."
},
    {
      "id": "q_2_1_c",
      "topicId": "topic_2_1",
      "type": "mcq",
      "question": "Which sorting algorithm repeatedly steps through a list, compares adjacent elements, and swaps them if they are in the wrong order?",
      "options": [
            "Bubble sort",
            "Merge sort",
            "Insertion sort",
            "Binary sort"
      ],
      "answer": "Bubble sort",
      "explanation": "Bubble sort works by comparing adjacent pairs of items, swapping them if necessary, and repeating this pass until a complete pass occurs with no swaps."
},
    {
      "id": "q_2_1_d",
      "topicId": "topic_2_1",
      "type": "mcq",
      "question": "How does a Merge Sort algorithm operate?",
      "options": [
            "It splits the list into single items, then systematically merges them in order",
            "It inserts each element into its correct position one-by-one",
            "It compares elements with a pivot and sorts around it",
            "It swaps elements that are far apart to quickly sort the list"
      ],
      "answer": "It splits the list into single items, then systematically merges them in order",
      "explanation": "Merge sort is a divide-and-conquer algorithm. It divides the unsorted list into n sublists containing 1 element each, and then repeatedly merges them back in sorted order."
},
    {
      "id": "q_2_1_e",
      "topicId": "topic_2_1",
      "type": "matching",
      "question": "Match the flowchart symbol with its correct meaning:",
      "items": [
            {
                  "label": "Parallelogram",
                  "match": "Represents Input or Output of data"
            },
            {
                  "label": "Rectangle",
                  "match": "Represents a Process or calculation block"
            },
            {
                  "label": "Diamond",
                  "match": "Represents a Decision block (e.g. Yes/No)"
            },
            {
                  "label": "Oval / Rounded Rectangle",
                  "match": "Represents a Terminal start or end point"
            }
      ],
      "explanation": "Parallelograms represent input/output; rectangles represent processes; diamonds represent decisions; ovals/rounded rectangles represent terminals."
},
    {
      "id": "q_2_2_a",
      "topicId": "topic_2_2",
      "type": "mcq",
      "question": "What is the main difference between a variable and a constant?",
      "options": [
            "A variable's value can change during execution, while a constant's value cannot change",
            "Variables store numbers, while constants store text strings",
            "Variables are stored in RAM, while constants are stored in ROM",
            "Variables require explicit user input, while constants do not"
      ],
      "answer": "A variable's value can change during execution, while a constant's value cannot change",
      "explanation": "Both variables and constants represent memory locations, but a variable's value can be overwritten (assigned new data) during runtime, whereas a constant's value remains fixed."
},
    {
      "id": "q_2_2_b",
      "topicId": "topic_2_2",
      "type": "mcq",
      "question": "What is selection in programming?",
      "options": [
            "A decision point where the program executes different paths depending on a condition",
            "Executing instructions one after another in order",
            "Repeating a set of instructions a fixed number of times",
            "Selecting a specific file from secondary storage"
      ],
      "answer": "A decision point where the program executes different paths depending on a condition",
      "explanation": "Selection is implemented using structures like `if-else` or `switch-case` statements to control flow based on conditions."
},
    {
      "id": "q_2_2_c",
      "topicId": "topic_2_2",
      "type": "mcq",
      "question": "What is the output of the Modulo operation (MOD / %)?",
      "options": [
            "The remainder left over after integer division",
            "The integer quotient of a division (disregarding remainder)",
            "A fractional float result of a division",
            "The exponent result of a power calculation"
      ],
      "answer": "The remainder left over after integer division",
      "explanation": "Modulo yields the remainder of a division. For example, 10 MOD 3 equals 1, because 3 goes into 10 three times with a remainder of 1."
},
    {
      "id": "q_2_2_d",
      "topicId": "topic_2_2",
      "type": "matching",
      "question": "Match the division operator with its correct description:",
      "items": [
            {
                  "label": "DIV (//)",
                  "match": "Quotient division - returns the whole number of times a division fits"
            },
            {
                  "label": "MOD (%)",
                  "match": "Modulo division - returns only the remainder left over from a division"
            },
            {
                  "label": "/ (slash)",
                  "match": "Real division - returns the full mathematical division result including decimal"
            }
      ],
      "explanation": "DIV returns the quotient; MOD returns the remainder; / returns a decimal float."
},
    {
      "id": "q_2_3_a",
      "topicId": "topic_2_3",
      "type": "mcq",
      "question": "What is the primary purpose of input validation?",
      "options": [
            "To check if input data is sensible and meets specific rules before processing",
            "To check if the user is authorized to log in to the system",
            "To convert text strings into upper case letters automatically",
            "To check if the source code contains any syntax errors"
      ],
      "answer": "To check if input data is sensible and meets specific rules before processing",
      "explanation": "Input validation is a defensive design technique that filters out erroneous data before it is processed, preventing code crashes."
},
    {
      "id": "q_2_3_b",
      "topicId": "topic_2_3",
      "type": "mcq",
      "question": "What distinguishes a syntax error from a logic error?",
      "options": [
            "Syntax errors stop the program from compiling/running; logic errors produce incorrect outputs",
            "Syntax errors happen in RAM; logic errors happen in the CPU registers",
            "Syntax errors happen at runtime; logic errors happen during coding phases",
            "Syntax errors are caught by user testing; logic errors are caught by compilers"
      ],
      "answer": "Syntax errors stop the program from compiling/running; logic errors produce incorrect outputs",
      "explanation": "Syntax errors violate the grammar rules of the language, preventing translation. Logic errors translate fine, but the program behaves incorrectly (e.g. subtracting instead of adding)."
},
    {
      "id": "q_2_3_c",
      "topicId": "topic_2_3",
      "type": "mcq",
      "question": "If a program requires an input score between 0 and 100 inclusive, what is a valid example of boundary test data?",
      "options": [
            "0 and 100",
            "50 and 75",
            "-1 and 101",
            "Score of 'A'"
      ],
      "answer": "0 and 100",
      "explanation": "Boundary test data is data that lies on the absolute edge of being valid. In this case, 0 and 100 are the boundaries."
},
    {
      "id": "q_2_3_d",
      "topicId": "topic_2_3",
      "type": "matching",
      "question": "Match the test data type with its correct definition:",
      "items": [
            {
                  "label": "Normal Test Data",
                  "match": "Data that the system should accept easily without errors"
            },
            {
                  "label": "Boundary Test Data",
                  "match": "Valid data that is on the absolute limits of acceptability"
            },
            {
                  "label": "Invalid Test Data",
                  "match": "Data of the correct type but outside the valid range that should be rejected"
            },
            {
                  "label": "Erroneous Test Data",
                  "match": "Data of the completely wrong data type that should be rejected"
            }
      ],
      "explanation": "Normal is standard valid data; Boundary is edge valid data; Invalid is out-of-range data; Erroneous is wrong type data (e.g., text instead of number)."
},
    {
      "id": "q_2_4_a",
      "topicId": "topic_2_4",
      "type": "mcq",
      "question": "What is the condition for an AND gate to output a value of 1?",
      "options": [
            "Both inputs must be 1",
            "At least one input must be 1",
            "Both inputs must be 0",
            "The inputs must be different values"
      ],
      "answer": "Both inputs must be 1",
      "explanation": "An AND gate output is only true (1) if all of its input lines are true (1)."
},
    {
      "id": "q_2_4_b",
      "topicId": "topic_2_4",
      "type": "mcq",
      "question": "What is the condition for an OR gate to output a value of 1?",
      "options": [
            "At least one input must be 1",
            "Both inputs must be 1",
            "Both inputs must be 0",
            "No inputs can be 1"
      ],
      "answer": "At least one input must be 1",
      "explanation": "An OR gate output is true (1) if input A is true, input B is true, or both inputs are true."
},
    {
      "id": "q_2_4_c",
      "topicId": "topic_2_4",
      "type": "mcq",
      "question": "Evaluate the Boolean expression (A AND B) OR NOT C when A = 1, B = 0, C = 0:",
      "options": [
            "1",
            "0",
            "Invalid expression",
            "Depends on clock speed"
      ],
      "answer": "1",
      "explanation": "A AND B = 1 AND 0 = 0. NOT C = NOT 0 = 1. Therefore, 0 OR 1 = 1."
},
    {
      "id": "q_2_4_d",
      "topicId": "topic_2_4",
      "type": "matching",
      "question": "Match the logic gate with its standard truth table behavior:",
      "items": [
            {
                  "label": "AND Gate",
                  "match": "Output is 1 only when A is 1 and B is 1"
            },
            {
                  "label": "OR Gate",
                  "match": "Output is 1 if A is 1, or B is 1, or both are 1"
            },
            {
                  "label": "NOT Gate",
                  "match": "Output is the exact opposite of the input line"
            }
      ],
      "explanation": "AND requires both; OR requires either or both; NOT inverts input."
},
    {
      "id": "q_2_5_a",
      "topicId": "topic_2_5",
      "type": "mcq",
      "question": "How does a compiler translate high-level code?",
      "options": [
            "It translates the entire source code at once into an executable file before execution",
            "It translates the source code line-by-line during execution",
            "It converts low-level assembly language directly into machine code",
            "It formats variable names and comments to make code readable"
      ],
      "answer": "It translates the entire source code at once into an executable file before execution",
      "explanation": "Compilers read the whole program and produce machine code (an .exe file). Once compiled, it runs quickly without the original source code."
},
    {
      "id": "q_2_5_b",
      "topicId": "topic_2_5",
      "type": "mcq",
      "question": "How does an interpreter translate high-level code?",
      "options": [
            "It translates and executes the source code line-by-line at runtime",
            "It compiles the program into a standalone executable file",
            "It translates assembly language into binary code",
            "It runs syntax diagnostic checks on the source code without executing it"
      ],
      "answer": "It translates and executes the source code line-by-line at runtime",
      "explanation": "Interpreters translate a single instruction into machine code, execute it immediately, and then move to the next line. This is great for debugging but slower."
},
    {
      "id": "q_2_5_c",
      "topicId": "topic_2_5",
      "type": "mcq",
      "question": "What is the purpose of an Assembler?",
      "options": [
            "To translate low-level assembly language instructions into machine code",
            "To coordinate multiple CPU cores during compilation tasks",
            "To connect external device drivers to operating system memory",
            "To format source code indentation automatically"
      ],
      "answer": "To translate low-level assembly language instructions into machine code",
      "explanation": "Assembly language uses mnemonics (like ADD, SUB, LDR) which correspond 1-to-1 with machine instructions. An assembler translates these into binary."
},
    {
      "id": "q_2_5_d",
      "topicId": "topic_2_5",
      "type": "matching",
      "question": "Match the IDE feature with its correct function:",
      "items": [
            {
                  "label": "Editor",
                  "match": "Text entry area with auto-indentation and syntax color highlighting"
            },
            {
                  "label": "Error Diagnostics",
                  "match": "Highlights syntax errors and points out where bugs exist before execution"
            },
            {
                  "label": "Debugger",
                  "match": "Allows stepping through code line-by-line and viewing variable states in real-time"
            },
            {
                  "label": "Runtime Environment",
                  "match": "Enables the user to run the program within a controlled test area"
            }
      ],
      "explanation": "Editor supports typing; Diagnostics highlights compile-time errors; Debugger checks values in real-time; Runtime environment executes the code."
},
    {
      "id": "q_1_1_a",
      "topicId": "topic_1_1",
      "type": "mcq",
      "question": "What is the primary purpose of the Central Processing Unit (CPU)?",
      "options": [
            "To execute instructions and process data in the fetch-decode-execute cycle",
            "To store all files and folders permanently",
            "To connect the computer to a local network",
            "To display the graphical user interface"
      ],
      "answer": "To execute instructions and process data in the fetch-decode-execute cycle",
      "explanation": "The CPU's primary role is to process data by fetching, decoding, and executing instructions stored in memory."
},
    {
      "id": "q_1_1_b",
      "topicId": "topic_1_1",
      "type": "mcq",
      "question": "How does increasing cache size affect CPU performance?",
      "options": [
            "It gives the CPU faster access to frequently used instructions and data",
            "It increases the clock speed of the processor core",
            "It adds more physical cores to process tasks in parallel",
            "It increases the permanent storage capacity of the system"
      ],
      "answer": "It gives the CPU faster access to frequently used instructions and data",
      "explanation": "Cache is extremely fast memory inside the CPU. A larger cache means more instructions can be accessed without having to wait to fetch them from slower RAM."
},
    {
      "id": "q_1_1_c",
      "topicId": "topic_1_1",
      "type": "mcq",
      "question": "Which CPU register holds the actual data or instruction currently being read from or written to memory?",
      "options": [
            "Memory Data Register (MDR)",
            "Memory Address Register (MAR)",
            "Program Counter (PC)",
            "Accumulator (ACC)"
      ],
      "answer": "Memory Data Register (MDR)",
      "explanation": "The Memory Data Register (MDR) holds the actual contents (data or instruction) fetched from RAM or waiting to be written to RAM."
},
    {
      "id": "q_1_1_d",
      "topicId": "topic_1_1",
      "type": "mcq",
      "question": "What are typical characteristics of an embedded system?",
      "options": [
            "Dedicated to a single task, low power consumption, and built into a larger device",
            "General-purpose, high cost, and easily upgraded by the user",
            "Designed to run multiple operating systems simultaneously",
            "Requires active internet connectivity to function"
      ],
      "answer": "Dedicated to a single task, low power consumption, and built into a larger device",
      "explanation": "Embedded systems are specialized microcontrollers dedicated to one specific task within a larger system, like a microwave or washing machine."
},
    {
      "id": "q_1_1_e",
      "topicId": "topic_1_1",
      "type": "matching",
      "question": "Match the CPU component with its correct description:",
      "items": [
            {
                  "label": "Control Unit (CU)",
                  "match": "Manages the fetch-decode-execute cycle and controls the flow of data"
            },
            {
                  "label": "Arithmetic Logic Unit (ALU)",
                  "match": "Carries out mathematical calculations and logical comparisons"
            },
            {
                  "label": "Accumulator (ACC)",
                  "match": "Temporarily stores the results of calculations performed by the ALU"
            },
            {
                  "label": "Program Counter (PC)",
                  "match": "Holds the memory address of the next instruction to be fetched"
            }
      ],
      "explanation": "The CU manages flow; the ALU performs math/logic; the ACC holds ALU results; the PC keeps track of the next instruction address."
},
    {
      "id": "q_1_2_a",
      "topicId": "topic_1_2",
      "type": "mcq",
      "question": "What is the key difference between RAM and ROM?",
      "options": [
            "RAM is volatile (loses data when powered off) while ROM is non-volatile",
            "RAM is read-only while ROM can be modified by any program",
            "RAM stores the BIOS startup instructions while ROM stores active software",
            "RAM is secondary storage while ROM is primary memory"
      ],
      "answer": "RAM is volatile (loses data when powered off) while ROM is non-volatile",
      "explanation": "RAM requires continuous electrical power to retain its data, making it volatile. ROM holds permanent startup instructions (BIOS) and is non-volatile."
},
    {
      "id": "q_1_2_b",
      "topicId": "topic_1_2",
      "type": "mcq",
      "question": "When does a computer system use Virtual Memory?",
      "options": [
            "When physical RAM is nearly full and the OS needs temporary space on secondary storage",
            "When the computer needs to access files stored in cloud servers",
            "When the CPU needs to overclock its speed beyond safety limits",
            "When secondary storage drives are fully disconnected"
      ],
      "answer": "When physical RAM is nearly full and the OS needs temporary space on secondary storage",
      "explanation": "Virtual memory is a partition on secondary storage (like an HDD/SSD) used as temporary RAM when the physical RAM is full."
},
    {
      "id": "q_1_2_c",
      "topicId": "topic_1_2",
      "type": "mcq",
      "question": "Which type of secondary storage has no moving parts, is highly durable, and uses flash memory?",
      "options": [
            "Solid State Drive (SSD)",
            "Magnetic Hard Disk Drive (HDD)",
            "Optical Blu-ray Disc",
            "Magnetic Tape Drive"
      ],
      "answer": "Solid State Drive (SSD)",
      "explanation": "Solid State Drives (SSDs) use flash memory circuits to store data. With no moving parts, they are durable, silent, and have very fast read/write speeds."
},
    {
      "id": "q_1_2_d",
      "topicId": "topic_1_2",
      "type": "mcq",
      "question": "Select the option that lists storage capacity units in ascending order (smallest to largest):",
      "options": [
            "Kilobyte, Megabyte, Gigabyte, Terabyte, Petabyte",
            "Megabyte, Kilobyte, Gigabyte, Petabyte, Terabyte",
            "Petabyte, Terabyte, Gigabyte, Megabyte, Kilobyte",
            "Gigabyte, Megabyte, Kilobyte, Terabyte, Petabyte"
      ],
      "answer": "Kilobyte, Megabyte, Gigabyte, Terabyte, Petabyte",
      "explanation": "Data storage capacities scale by factors of 1000 (or 1024) in the sequence: KB < MB < GB < TB < PB."
},
    {
      "id": "q_1_2_e",
      "topicId": "topic_1_2",
      "type": "matching",
      "question": "Match the secondary storage category with its typical characteristic:",
      "items": [
            {
                  "label": "Magnetic Storage",
                  "match": "High capacity and low cost per gigabyte, but has moving parts"
            },
            {
                  "label": "Solid State Storage",
                  "match": "Extremely fast and durable, but has a higher cost per gigabyte"
            },
            {
                  "label": "Optical Storage",
                  "match": "Cheap and highly portable, but has low capacity and is easily scratched"
            }
      ],
      "explanation": "Magnetic uses platters (cheap, high capacity); Solid State uses microchips (fast, durable); Optical uses laser reflections (portable, cheap, low capacity)."
},
    {
      "id": "q_1_3_a",
      "topicId": "topic_1_3",
      "type": "mcq",
      "question": "What is an overflow error in binary addition?",
      "options": [
            "When the result of an addition exceeds the maximum value that the bit register can hold",
            "When the system transfers too much data to a printer",
            "When a binary shift divides a number resulting in a fraction",
            "When a security vulnerability causes a buffer malfunction"
      ],
      "answer": "When the result of an addition exceeds the maximum value that the bit register can hold",
      "explanation": "In an 8-bit register, the maximum value is 255. If the sum of two numbers is 256 or higher, it requires a 9th bit, causing an overflow error."
},
    {
      "id": "q_1_3_b",
      "topicId": "topic_1_3",
      "type": "mcq",
      "question": "Why is Unicode preferred over ASCII in modern systems?",
      "options": [
            "It uses more bits (e.g., 16/32) allowing it to represent characters from all global languages",
            "It uses fewer bits, reducing the file sizes of text documents",
            "It is executed directly by the CPU ALU without decoding",
            "It prevents cybercriminals from intercepting text communications"
      ],
      "answer": "It uses more bits (e.g., 16/32) allowing it to represent characters from all global languages",
      "explanation": "ASCII is limited to 7 or 8 bits (128-256 characters), which only covers English and some European letters. Unicode can represent thousands of characters, including foreign scripts and emojis."
},
    {
      "id": "q_1_3_c",
      "topicId": "topic_1_3",
      "type": "mcq",
      "question": "How does increasing the sound sampling rate affect a digital recording?",
      "options": [
            "It increases audio quality and increases the file size",
            "It decreases audio quality and decreases the file size",
            "It increases audio quality but has no impact on file size",
            "It decreases audio quality and increases the file size"
      ],
      "answer": "It increases audio quality and increases the file size",
      "explanation": "A higher sampling rate means the amplitude of the analogue wave is measured more times per second. This produces a more accurate digital wave (better quality) but generates more data points (larger file size)."
},
    {
      "id": "q_1_3_d",
      "topicId": "topic_1_3",
      "type": "matching",
      "question": "Match the compression type with its correct definition:",
      "items": [
            {
                  "label": "Lossy Compression",
                  "match": "Permanently removes data from the file to drastically reduce size"
            },
            {
                  "label": "Lossless Compression",
                  "match": "Reduces file size without losing any data, allowing perfect reconstruction"
            }
      ],
      "explanation": "Lossy removes data (lower quality, very small size); Lossless reorganizes data (same quality, moderate size reduction)."
},
    {
      "id": "q_1_4_a",
      "topicId": "topic_1_4",
      "type": "mcq",
      "question": "What is the primary difference between a LAN and a WAN?",
      "options": [
            "LAN covers a small geographical area, while WAN covers a large geographical area",
            "LAN uses wireless connections, while WAN only uses fibre-optic cabling",
            "LAN stands for Local Access Node, while WAN stands for Wide Area Node",
            "LAN connects only computers, while WAN connects only smart devices"
      ],
      "answer": "LAN covers a small geographical area, while WAN covers a large geographical area",
      "explanation": "A Local Area Network (LAN) covers a single site like a home or school. A Wide Area Network (WAN) connects LANs across cities or countries, often using external infrastructure (like the Internet)."
},
    {
      "id": "q_1_4_b",
      "topicId": "topic_1_4",
      "type": "mcq",
      "question": "What is the role of a Router on a network?",
      "options": [
            "To connect different networks together and route data packets between them",
            "To connect peripheral devices like printers to a single PC",
            "To convert digital signals into analogue sound signals",
            "To store local user logins and manage file permissions"
      ],
      "answer": "To connect different networks together and route data packets between them",
      "explanation": "Routers read destination IP addresses in data packets and forward them across different networks to their correct destination."
},
    {
      "id": "q_1_4_c",
      "topicId": "topic_1_4",
      "type": "mcq",
      "question": "Which address is permanently embedded into a network interface card (NIC) at the factory?",
      "options": [
            "MAC Address",
            "IP Address",
            "DNS Address",
            "TCP Address"
      ],
      "answer": "MAC Address",
      "explanation": "A Media Access Control (MAC) address is a unique hardware identifier assigned to a network interface card during manufacture. It cannot be changed."
},
    {
      "id": "q_1_4_d",
      "topicId": "topic_1_4",
      "type": "matching",
      "question": "Match the network protocol with its correct description:",
      "items": [
            {
                  "label": "HTTP / HTTPS",
                  "match": "Used by web browsers to request and load web pages from web servers"
            },
            {
                  "label": "TCP",
                  "match": "Splits data into packets and reassembles them at the destination, checking for errors"
            },
            {
                  "label": "SMTP",
                  "match": "Used to send emails from a client device to an email server"
            },
            {
                  "label": "IMAP",
                  "match": "Retrieves emails from a server while keeping a copy on the server for multi-device sync"
            }
      ],
      "explanation": "HTTP/HTTPS loads web pages; TCP manages packets and reliability; SMTP sends mail; IMAP syncs mailbox across devices."
},
    {
      "id": "q_1_5_a",
      "topicId": "topic_1_5",
      "type": "mcq",
      "question": "What is phishing?",
      "options": [
            "Sending fraudulent communications designed to trick users into revealing sensitive data",
            "A software program that automatically records every keystroke a user types",
            "Flooding a server with traffic until it crashes and becomes unavailable",
            "Injecting malicious database query commands into a web input field"
      ],
      "answer": "Sending fraudulent communications designed to trick users into revealing sensitive data",
      "explanation": "Phishing involves sending fake emails, texts, or websites mimicking legitimate brands to trick targets into logging in or entering credit card details."
},
    {
      "id": "q_1_5_b",
      "topicId": "topic_1_5",
      "type": "mcq",
      "question": "What is SQL Injection?",
      "options": [
            "Entering database queries into user input fields to access or manipulate database records without authorization",
            "Flooding a network connection with excessive dummy packets to disable a server",
            "Intercepting wireless data packets as they travel through the air",
            "Guessing a user's password by systematically trying every dictionary word"
      ],
      "answer": "Entering database queries into user input fields to access or manipulate database records without authorization",
      "explanation": "SQL Injection occurs when poorly validated input fields allow hackers to input SQL queries that bypass authentication and directly query or destroy the underlying SQL database."
},
    {
      "id": "q_1_5_c",
      "topicId": "topic_1_5",
      "type": "mcq",
      "question": "How does a firewall protect a network?",
      "options": [
            "By monitoring and filtering incoming and outgoing network traffic based on security rules",
            "By physically locking the server room door to prevent access",
            "By encrypting all files stored on local secondary storage hard drives",
            "By replacing old Ethernet cables with secure wireless routing links"
      ],
      "answer": "By monitoring and filtering incoming and outgoing network traffic based on security rules",
      "explanation": "A firewall acts as a barrier, inspecting all packets entering or leaving a network and blocking unauthorized traffic based on predefined security rules."
},
    {
      "id": "q_1_5_d",
      "topicId": "topic_1_5",
      "type": "matching",
      "question": "Match the cyber attack countermeasure with its correct description:",
      "items": [
            {
                  "label": "Penetration Testing",
                  "match": "Simulating authorized attacks to identify and fix security vulnerabilities"
            },
            {
                  "label": "Encryption",
                  "match": "Scrambling data using an algorithm so it cannot be read without a key"
            },
            {
                  "label": "User Access Levels",
                  "match": "Limiting user privileges to ensure they only access files required for their role"
            }
      ],
      "explanation": "Pen testing finds weak spots; Encryption scrambles data; User Access Levels restrict access to prevent data leaks."
},
    {
      "id": "q_1_6_a",
      "topicId": "topic_1_6",
      "type": "mcq",
      "question": "How does an operating system manage multitasking?",
      "options": [
            "By allocating small slices of CPU processing time to each running application in turn",
            "By downloading extra physical RAM from cloud servers on demand",
            "By running only one program and shutting down all background tasks",
            "By converting high-level Python code directly into assembly code"
      ],
      "answer": "By allocating small slices of CPU processing time to each running application in turn",
      "explanation": "The OS scheduler controls which instructions get CPU time, switching between applications so rapidly that they appear to run simultaneously (multitasking)."
},
    {
      "id": "q_1_6_b",
      "topicId": "topic_1_6",
      "type": "mcq",
      "question": "What is the purpose of a device driver?",
      "options": [
            "To translate operating system commands into commands the specific hardware peripheral understands",
            "To run defragmentation cycles on magnetic storage disks",
            "To track when school buses leave and arrive on school premises",
            "To authenticate user passwords during the network login phase"
      ],
      "answer": "To translate operating system commands into commands the specific hardware peripheral understands",
      "explanation": "Device drivers act as translators between the operating system and external hardware devices (like printers or graphics cards)."
},
    {
      "id": "q_1_6_c",
      "topicId": "topic_1_6",
      "type": "mcq",
      "question": "Why does defragmenting a magnetic hard drive improve performance?",
      "options": [
            "It groups related file sectors back together so the read head travels less distance",
            "It permanently deletes all unused system cache files",
            "It increases the physical spin rate of the magnetic platters",
            "It converts the hard drive files into compressed zip folders"
      ],
      "answer": "It groups related file sectors back together so the read head travels less distance",
      "explanation": "On HDDs, files get split up (fragmented) across different sectors. Defragmentation reorganises sectors so files are contiguous, reducing read head movement and speeding up file access."
},
    {
      "id": "q_1_6_d",
      "topicId": "topic_1_6",
      "type": "matching",
      "question": "Match the operating system function with its correct role:",
      "items": [
            {
                  "label": "Memory Management",
                  "match": "Allocates space in RAM for active programs and handles virtual memory swap"
            },
            {
                  "label": "Peripheral Management",
                  "match": "Controls input and output hardware devices using device drivers"
            },
            {
                  "label": "User Management",
                  "match": "Handles usernames, passwords, user login sessions and permissions"
            }
      ],
      "explanation": "Memory management oversees RAM; Peripheral management communicates with devices; User management controls logins and permissions."
},
    {
      "id": "q_1_7_a",
      "topicId": "topic_1_7",
      "type": "mcq",
      "question": "Which Act of Parliament governs the rights of individuals regarding their personal data stored by organisations?",
      "options": [
            "Data Protection Act 2018",
            "Computer Misuse Act 1990",
            "Copyright Designs and Patents Act 1988",
            "Freedom of Information Act 2000"
      ],
      "answer": "Data Protection Act 2018",
      "explanation": "The Data Protection Act 2018 (which implements GDPR in the UK) sets rules for how organisations can collect, store, and process personal data."
},
    {
      "id": "q_1_7_b",
      "topicId": "topic_1_7",
      "type": "mcq",
      "question": "What behavior is made illegal under the Computer Misuse Act 1990?",
      "options": [
            "Accessing computer systems or data without authorization (hacking)",
            "Sharing copyrighted music and movies without permission",
            "Throwing electronic equipment into household garbage bins",
            "Declining to share network data requested by journalists"
      ],
      "answer": "Accessing computer systems or data without authorization (hacking)",
      "explanation": "The Computer Misuse Act 1990 criminalises unauthorised access to computer systems, unauthorised access with intent to commit further offences, and unauthorised modification of files (malware)."
},
    {
      "id": "q_1_7_c",
      "topicId": "topic_1_7",
      "type": "mcq",
      "question": "What is the environmental concern associated with the mining of raw materials for smartphones?",
      "options": [
            "Destruction of habitats, water contamination, and consumption of finite mineral resources",
            "A decrease in the power consumption of local network servers",
            "The reduction of carbon emissions during device shipping stages",
            "The rapid growth of the digital divide in developing nations"
      ],
      "answer": "Destruction of habitats, water contamination, and consumption of finite mineral resources",
      "explanation": "Mining materials like lithium, cobalt, and copper destroys ecosystems, pollutes local water sources with toxic chemicals, and depletes finite earth elements."
},
    {
      "id": "q_1_7_d",
      "topicId": "topic_1_7",
      "type": "matching",
      "question": "Match the legislation with its primary purpose:",
      "items": [
            {
                  "label": "Freedom of Information Act 2000",
                  "match": "Allows public access to data held by public authorities (like schools/councils)"
            },
            {
                  "label": "Copyright Designs and Patents Act 1988",
                  "match": "Protects intellectual property, making it illegal to copy software/media without license"
            },
            {
                  "label": "Data Protection Act 2018",
                  "match": "Forces organisations to process personal data lawfully and keep it secure"
            }
      ],
      "explanation": "FOIA provides public transparency; CDPA protects creators' intellectual work; DPA regulates data privacy."
},

    {
      id: 'q_1',
      topicId: 'topic_1_1',
      type: 'mcq',
      question: 'Which CPU register holds the address of the next instruction to be fetched from memory?',
      options: [
        'Program Counter (PC)',
        'Memory Address Register (MAR)',
        'Memory Data Register (MDR)',
        'Accumulator (ACC)'
      ],
      answer: 'Program Counter (PC)',
      explanation: 'The Program Counter (PC) stores the memory address of the next instruction. This is updated at the start of each fetch-decode-execute cycle.'
    },
    {
      id: 'q_2',
      topicId: 'topic_1_2',
      type: 'mcq',
      question: 'Which of the following is volatile memory?',
      options: [
        'RAM',
        'ROM',
        'Solid State Drive (SSD)',
        'Flash Memory'
      ],
      answer: 'RAM',
      explanation: 'RAM is volatile memory. It loses its contents when power is turned off. ROM, SSDs, and Flash are non-volatile.'
    },
    {
      id: 'q_3',
      topicId: 'topic_1_2',
      type: 'matching',
      question: 'Match the secondary storage categories with their typical physical characteristics:',
      items: [
        { label: 'Magnetic', match: 'Uses spinning platters and read/write heads' },
        { label: 'Optical', match: 'Uses laser beams to read pits and lands on a disc' },
        { label: 'Solid State', match: 'Uses electronic circuits/flash memory with no moving parts' }
      ],
      explanation: 'Magnetic drives use magnetism on magnetic discs (platters). Optical drives use light/lasers to read discs. Solid State uses electronic flash memory transistors.'
    },
    {
      id: 'q_4',
      topicId: 'topic_1_4',
      type: 'missing_words',
      question: 'Complete the sentence about network routing: A packet contains a header which includes the destination [word1] address. The device responsible for directing packets across different networks is a [word2].',
      blanks: {
        word1: 'IP',
        word2: 'router'
      },
      explanation: 'Packets contain destination IP addresses which are used by routers to direct data packets to their destinations.'
    },
    {
      id: 'q_5',
      topicId: 'topic_2_1',
      type: 'sequencing',
      question: 'Place the steps of a Binary Search in the correct order:',
      sequence: [
        'Find the midpoint of the sorted list',
        'Compare the item at midpoint to the target item',
        'If it matches, return the position and stop',
        'If target is smaller, repeat search on left half',
        'If target is larger, repeat search on right half'
      ],
      explanation: 'A binary search works by repeatedly dividing the sorted list in half and checking the middle element.'
    },
    {
      id: 'q_6',
      topicId: 'topic_2_4',
      type: 'mcq',
      question: 'Confusing RAM with secondary storage is a common misconception. What is the main difference?',
      options: [
        'RAM stores active programs currently in use; secondary storage holds files and software long-term',
        'RAM is permanent; secondary storage is temporary',
        'Secondary storage is faster to access than RAM',
        'Secondary storage holds instructions for booting up the computer (BIOS)'
      ],
      answer: 'RAM stores active programs currently in use; secondary storage holds files and software long-term',
      explanation: 'RAM is high-speed temporary storage used by the CPU for running tasks. Secondary storage is non-volatile long-term storage.'
    }
  ],
  writtenQuestions: [
    {
      "id": "wq_7",
      "topicId": "topic_2_1",
      "commandWord": "Describe",
      "marks": 3,
      "question": "Show how a binary search will be used to find the number 10 in the following sorted data set. Describe the steps taken: 1, 2, 5, 6, 7, 10, 20.",
      "scenario": "Binary search steps to find value 10 in list: 1, 2, 5, 6, 7, 10, 20.",
      "indicativeContent": [
            "Find midpoint: Midpoint of list is index 3 (value 6).",
            "Compare midpoint: Compare target (10) with midpoint (6). 10 is greater than 6, so discard left half (1, 2, 5, 6).",
            "Sublist: New search sublist is (7, 10, 20).",
            "Second Midpoint: Find midpoint of sublist (value 10). Compare target (10) to 10. Match found, search stops."
      ],
      "rubric": [
            "1 Mark: Mentions finding the midpoint or splitting the list.",
            "2 Marks: Explains comparing the target with 6, discarding the left side, and creating the sublist (7, 10, 20).",
            "3 Marks: Correctly outlines the entire process, including comparing with the second midpoint (10) and identifying a successful search match."
      ],
      "modelAnswer": "First, the algorithm finds the middle item of the list, which is 6. It compares the target number 10 with 6. Since 10 is greater than 6, the left half of the list (1, 2, 5, 6) is discarded. The sublist remaining is 7, 10, 20. The middle item of this sublist is 10. The algorithm compares the target 10 with the middle item 10, finds a match, and the search completes successfully.",
      "misconceptions": [
            {
                  "phrase": "search one-by-one",
                  "feedback": "Searching one-by-one describes a Linear Search. Binary Search must divide the list in half."
            }
      ]
},
    {
      "id": "wq_8",
      "topicId": "topic_2_3",
      "commandWord": "Explain",
      "marks": 6,
      "question": "A programmer is designing a login console for a school gradebook database. Explain three methods of defensive design that can be used to ensure the program is secure and robust.",
      "scenario": "Implementing defensive design methods for a school database login portal.",
      "indicativeContent": [
            "Authentication: Ensuring the user is who they claim to be, e.g. using usernames, strong passwords, and multi-factor codes.",
            "Input Validation: Restricting input fields to verify that data fits expected formats, lengths, and ranges (e.g. ensuring password fits length constraints, rating is integer).",
            "Input Sanitisation: Cleaning inputs by stripping out characters that could execute SQL code (preventing SQL Injection).",
            "Maintainability: Using commenting, indentation, and clear naming conventions so other programmers can audit and fix bugs in code."
      ],
      "rubric": [
            "1-2 Marks: Lists defensive design concepts (like validation or authentication) but fails to explain them.",
            "3-4 Marks: Explains two defensive design methods with moderate detail linked to the login scenario.",
            "5-6 Marks: Explains three methods (e.g., authentication, validation, sanitisation) thoroughly, linking them to security and robustness in the login console."
      ],
      "modelAnswer": "Firstly, the programmer should implement input validation to ensure that user inputs fit specific criteria, such as checking password length or ensuring the username contains only legal characters. Secondly, authentication should be used to verify the user's identity, such as checking password records in a database before granting access. Thirdly, input sanitisation should be applied to remove characters like quotes or semicolons from text boxes, preventing hackers from executing SQL Injection attacks on the school database.",
      "misconceptions": [
            {
                  "phrase": "physical security",
                  "feedback": "Defensive design refers to code-level safeguards and input handling, not physical security like locking server rooms."
            }
      ]
},
    {
      "id": "wq_9",
      "topicId": "topic_2_5",
      "commandWord": "Discuss",
      "marks": 6,
      "question": "A developer is choosing between using a compiler or an interpreter to distribute their new Python software. Discuss the advantages and disadvantages of each translation method.",
      "scenario": "Choosing between compilers and interpreters for software distribution.",
      "indicativeContent": [
            "Compiler advantages: Fast execution speed (translated once). Standalone executable file (.exe) which hides source code (protects IP).",
            "Compiler disadvantages: Platform-dependent. Compilation takes time and must be redone after any change.",
            "Interpreter advantages: Multi-platform (runs anywhere with interpreter). Faster debugging cycle (errors highlighted instantly).",
            "Interpreter disadvantages: Slower execution speed (translated line-by-line). Requires client to install the interpreter; source code is exposed."
      ],
      "rubric": [
            "1-2 Marks: Lists simple attributes of compilers or interpreters (e.g. interpreters are slower).",
            "3-4 Marks: Explains advantages and disadvantages of both, including speed differences and source code visibility.",
            "5-6 Marks: Balanced, comparative discussion detailing execution speed, visibility of source code (IP security), debugging ease, and execution requirements for both compilers and interpreters."
      ],
      "modelAnswer": "A compiler translates the entire source code at once into an executable file. This means it executes very quickly and hides the original source code, protecting intellectual property. However, compilation can be slow, and the output is specific to one operating system. On the other hand, an interpreter translates and executes code line-by-line. This is great for debugging as errors are found immediately. However, interpreted programs run slower because they must be translated every runtime, and the user must have the interpreter installed, which exposes the source code.",
      "misconceptions": [
            {
                  "phrase": "both at once",
                  "feedback": "A programming language translator cannot compile and interpret a program at the same time; it must choose one translation pipeline."
            }
      ]
},
    {
      "id": "wq_3",
      "topicId": "topic_1_1",
      "commandWord": "Explain",
      "marks": 6,
      "question": "A school ICT technician is choosing new CPUs for the computer labs. Explain how CPU clock speed, the number of cores, and cache size affect CPU performance.",
      "scenario": "Comparing CPU specifications (clock speed, cores, cache) for school lab workstations.",
      "indicativeContent": [
            "Clock speed: Determines the number of fetch-decode-execute cycles per second. Higher clock speed means faster instruction processing.",
            "Cores: Multiple cores allow parallel processing (executing different instructions simultaneously) or multitasking. More cores increase throughput for multi-threaded applications, but performance doesn't scale linearly if software isn't optimized.",
            "Cache: Extremely fast memory built into the CPU. Larger cache means more instructions/data are stored locally, reducing the frequency of slower RAM access."
      ],
      "rubric": [
            "1-2 Marks: Mentions CPU characteristics briefly but lacks clear explanations of how they affect performance.",
            "3-4 Marks: Explains how one or two characteristics affect performance with moderate technical detail.",
            "5-6 Marks: Explains all three characteristics (clock speed, cores, cache) clearly, demonstrating a thorough understanding of their impact on CPU processing speeds."
      ],
      "modelAnswer": "Clock speed determines how many fetch-decode-execute cycles a CPU can perform per second (measured in Gigahertz). A higher clock speed means instructions are processed faster. Increasing the number of cores allows the CPU to process multiple instructions in parallel or run different tasks simultaneously, boosting multitasking speed. Cache is small, high-speed memory on the CPU chip. A larger cache size stores more frequently used instructions closer to the core, which speeds up processing by reducing the time spent fetching data from the slower main RAM.",
      "misconceptions": [
            {
                  "phrase": "double the speed",
                  "feedback": "Avoid claiming that doubling cores will 'double the speed' of the computer, as there is communication overhead and some programs cannot run in parallel."
            }
      ]
},
    {
      "id": "wq_4",
      "topicId": "topic_1_2",
      "commandWord": "Explain",
      "marks": 4,
      "question": "A developer runs multiple memory-intensive programs simultaneously, causing the physical RAM to become fully occupied. Explain how the operating system handles this using virtual memory and its effect on system performance.",
      "scenario": "Using virtual memory to run multiple heavy applications when RAM is full.",
      "indicativeContent": [
            "Virtual memory: The OS allocates temporary space on secondary storage (HDD/SSD) to act as extended RAM.",
            "Process: Inactive data pages in RAM are transferred/pushed to virtual memory, freeing up physical RAM for active instructions.",
            "System Performance: Page switching/swapping takes time because secondary storage is much slower than physical RAM.",
            "Disk thrashing: Excessive swapping can lead to system lag/freezing (disk thrashing)."
      ],
      "rubric": [
            "1-2 Marks: Identifies virtual memory as temporary space on disk but lacks explanation of page swapping or performance impact.",
            "3-4 Marks: Explains that data is swapped between RAM and secondary storage when RAM is full, and correctly identifies that this reduces performance due to slower read/write speeds of HDDs/SSDs."
      ],
      "modelAnswer": "When RAM is full, the operating system allocates temporary space on secondary storage (like a hard drive) to act as virtual memory. The OS moves inactive pages of data out of RAM and writes them to virtual memory to free up RAM space. When those pages are needed again, they are swapped back. This allows the computer to run more programs than its physical RAM capacity supports, but system performance will slow down drastically because secondary storage is much slower to access than RAM, which can lead to disk thrashing.",
      "misconceptions": [
            {
                  "phrase": "adds memory",
                  "feedback": "Note that virtual memory does not add physical RAM; it only uses secondary storage space as a temporary overflow."
            }
      ]
},
    {
      "id": "wq_5",
      "topicId": "topic_1_4",
      "commandWord": "Discuss",
      "marks": 6,
      "question": "Leicester High School is updating its networking layout. Discuss the advantages and disadvantages of implementing a mesh network topology instead of a traditional star network topology.",
      "scenario": "Deciding between a mesh topology and a star topology for a school network.",
      "indicativeContent": [
            "Mesh advantages: High reliability/redundancy (if one node fails, packets route through other nodes; no single point of failure). High performance under heavy load.",
            "Mesh disadvantages: High cost (extensive cabling/nodes required). Complex administration and installation.",
            "Star advantages: Simple to set up and manage. Failure of one device does not affect the rest of the network.",
            "Star disadvantages: Single point of failure (if the central switch/hub fails, the entire network goes down)."
      ],
      "rubric": [
            "1-2 Marks: Lists simple points of star or mesh networks but lacks balanced discussion of advantages and disadvantages.",
            "3-4 Marks: Discusses advantages and disadvantages of both topologies, mentioning failure states and setup complexity.",
            "5-6 Marks: Provides a well-structured, comparative discussion covering reliability (single point of failure), cost, setup complexity, and performance for both topologies."
      ],
      "modelAnswer": "A mesh network has no single point of failure because all devices are interconnected; if one node fails, data packets can automatically find a different route, making it highly reliable. However, mesh topologies are expensive to install and complex to manage due to the amount of cabling and hardware configuration required. In contrast, a star network connects all devices to a central switch. This is cheaper and simpler to set up, but it has a single point of failure\u2014if the central switch fails, the entire network goes down, whereas in a mesh, the network remains active.",
      "misconceptions": [
            {
                  "phrase": "internet connection",
                  "feedback": "Topologies define how computers connect to each other locally, not how they connect to the global Internet."
            }
      ]
},
    {
      "id": "wq_6",
      "topicId": "topic_1_3",
      "commandWord": "Describe",
      "marks": 4,
      "question": "Describe how an analogue sound wave is converted into a digital audio file and stored by a computer. Refer to sampling in your response.",
      "scenario": "Analogue-to-digital sound sampling and storage.",
      "indicativeContent": [
            "Analogue sound: Continuous wave inputs are received (e.g., from a microphone).",
            "Sampling: The amplitude of the sound wave is measured at regular intervals.",
            "Quantization: The measured values are converted into binary numbers.",
            "Storage: The binary numbers are stored in order as a file, along with metadata (sample rate, bit depth)."
      ],
      "rubric": [
            "1-2 Marks: Identifies sampling as taking sound measurements, but lacks explanation of amplitude or binary storage.",
            "3-4 Marks: Describes the process clearly: the amplitude of the continuous wave is measured at regular intervals (sampling), and these measurements are converted to binary and stored in sequence."
      ],
      "modelAnswer": "An analogue sound wave is continuous. To store it digitally, a microphone converts the sound into an electrical signal, and an analogue-to-digital converter (ADC) samples the wave. The amplitude of the wave is measured at regular time intervals. These measurements are converted into binary integer values (quantized) based on the sample bit depth. These binary numbers are then stored in chronological order in a file.",
      "misconceptions": [
            {
                  "phrase": "continuous binary",
                  "feedback": "A computer cannot store continuous values; sound must be broken down into distinct, discrete numeric samples."
            }
      ]
},

    {
      id: 'wq_1',
      topicId: 'topic_1_7',
      commandWord: 'Explain',
      marks: 4,
      question: 'A local school wants to upgrade all of its desktop computers. Explain one ethical and one environmental issue the school should consider when disposing of their old computer hardware.',
      scenario: 'Disposal of old computers by a school upgrading their desktop machines.',
      indicativeContent: [
        'Ethical: Disposal must protect student/staff privacy (securely wiping data to prevent data leakage / GDPR issues).',
        'Ethical: Landfills in developing nations expose locals to hazardous scavenging.',
        'Environmental: Computer components contain toxic substances (lead, mercury) that can leak into soil/water if landfilled.',
        'Environmental: Precious metals (gold, copper) should be recycled to conserve resources and reduce mining impact.'
      ],
      rubric: [
        '1-2 Marks: Identifies one or two issues but lacks developed explanation or application to school context.',
        '3-4 Marks: Explains both ethical and environmental issues clearly, showing developed points linked to disposal.'
      ],
      modelAnswer: 'Ethically, the school must ensure all student and teacher data is securely destroyed before disposal to protect privacy and comply with data protection laws. Environmentally, the school should not send the computers to landfill because they contain toxic chemicals like lead which can leach into the soil. Instead, they should use a certified e-waste recycling centre.',
      misconceptions: [
        { phrase: 'throw them away', feedback: 'Avoid saying "just throw them away". Use technical terms like "e-waste recycling" or "secure data destruction".' }
      ]
    },
    {
      id: 'wq_2',
      topicId: 'topic_1_5',
      commandWord: 'Discuss',
      marks: 6,
      question: 'Leicester High School is considering implementing a cloud-based network for storing school files. Discuss the security advantages and disadvantages of this decision.',
      scenario: 'Implementing cloud-based storage for files at a school network.',
      indicativeContent: [
        'Advantages: Cloud providers have dedicated security teams and advanced firewalls / backup strategies.',
        'Advantages: Files are encrypted in transit and at rest.',
        'Disadvantages: Access relies on internet connection; if internet is down, access is blocked.',
        'Disadvantages: Vulnerable to credential phishing and unauthorized access if weak passwords are used.',
        'Disadvantages: Data is held by a third party, raising data ownership/GDPR compliance questions.'
      ],
      rubric: [
        '1-2 Marks: Lists basic advantages/disadvantages without discussion or application to a school.',
        '3-4 Marks: Provides a balanced discussion with details on both sides, with minor application.',
        '5-6 Marks: Balanced, detailed discussion covering both advantages and disadvantages, directly applied to a school environment, with a justified conclusion.'
      ],
      modelAnswer: 'One security advantage is that cloud storage providers have advanced security measures like automatic encryption and professional backup routines, protecting the school from data loss due to fire or local drive failures. However, a disadvantage is that school files are now accessible over the internet, increasing the risk of unauthorized login via credential phishing or weak passwords. Overall, the security is generally superior to local storage, provided robust authentication like MFA is enforced.',
      misconceptions: []
    }
  ],
  programmingChallenges: [
    {
      id: 'pc_1',
      level: 1,
      concept: 'Variables & Output',
      title: 'Reading Code: String Output',
      instructions: 'Review the Python code below. Identify what the code will output when run.',
      problem: 'Determine the printed output of this program:\n\n```python\nusername = "Harriet"\nsubject = "Computer Science"\nprint("Welcome " + username + " to " + subject)\n```',
      code: 'username = "Harriet"\nsubject = "Computer Science"\nprint("Welcome " + username + " to " + subject)',
      expectedOutput: 'Welcome Harriet to Computer Science',
      supportLadder: [
        'The variable "username" stores "Harriet".',
        'The variable "subject" stores "Computer Science".',
        'The program concatenates the strings together with spaces in between.'
      ],
      testCases: [
        { input: '', inputs: [], expected: 'Welcome Harriet to Computer Science' }
      ],
      explainQuestion: 'Explain why strings are concatenated using the + operator in Python.',
      explainModelAnswer: 'The + operator is used to join or concatenate two or more strings together to create a single string.'
    },
    {
      id: 'pc_2',
      level: 2,
      concept: 'Selection (if/else)',
      title: 'Completing Code: Exam Grade',
      instructions: 'Complete the selection structure to print "Pass" if score is 50 or above, otherwise print "Fail".',
      problem: 'Complete the conditional statements in the editor.',
      code: 'score = int(input("Score: "))\n# Complete the selection below\nif score >= 50:\n    pass\nelse:\n    pass',
      expectedOutput: 'Pass',
      supportLadder: [
        'We need to check if the score is greater than or equal to 50.',
        'The syntax is `if score >= 50:`.',
        'Make sure to indent the print statements.'
      ],
      testCases: [
        { input: '65', inputs: ['65'], expected: 'Pass' },
        { input: '45', inputs: ['45'], expected: 'Fail' }
      ],
      explainQuestion: 'What is the purpose of the colon (:) at the end of the if statement in Python?',
      explainModelAnswer: 'The colon indicates the start of an indented block of code that should be executed if the condition is true.'
    },
    {
      id: 'pc_3',
      level: 3,
      concept: 'Iteration (loops)',
      title: 'Debugging Code: Counting Loop',
      instructions: 'The programmer wants to print numbers from 1 to 5. Find and correct the error in the loop boundary.',
      problem: 'The current code prints 1 to 4 because range is exclusive. Correct it to print 1 to 5.',
      code: '# Debug this loop to print 1 to 5 inclusive\nfor i in range(1, 5):\n    print(i)',
      expectedOutput: '1\n2\n3\n4\n5',
      supportLadder: [
        'In Python, `range(start, stop)` goes up to but does not include `stop`.',
        'To include 5, the stop parameter must be 6.',
        'Change range(1, 5) to range(1, 6).'
      ],
      testCases: [
        { input: '', inputs: [], expected: '1\n2\n3\n4\n5' }
      ],
      explainQuestion: 'Explain why loops are a crucial programming construct in algorithm design.',
      explainModelAnswer: 'Loops allow a block of instructions to be repeated multiple times without duplicating the code, reducing file sizes and error rates.'
    },
    {
      id: 'pc_4',
      level: 4,
      concept: 'Functions & Arithmetic',
      title: 'Writing Code: Hex to Denary conversion',
      instructions: 'Write a Python function called `hex_char_to_val(char)` that takes a single hex character (0-9 or A-F) and returns its integer denary value.',
      problem: 'Create a function that handles A=10, B=11, C=12, D=13, E=14, F=15, and digit strings 0-9.',
      code: 'def hex_char_to_val(char):\n    # Return 0-9 directly and convert A-F to 10-15\n    return 0',
      expectedOutput: '10', // Test input "A"
      supportLadder: [
        'If the character is between "0" and "9", convert it directly to an integer.',
        'Use an if/elif structure or a dictionary mapping to handle letters A through F.',
        'Ensure letters are converted to uppercase using `.upper()` before checking.'
      ],
      testCases: [
        { input: 'A', inputs: [], functionArg: 'A', expected: '10' },
        { input: '5', inputs: [], functionArg: '5', expected: '5' },
        { input: 'F', inputs: [], functionArg: 'F', expected: '15' }
      ],
      explainQuestion: 'Explain why hexadecimal is used in Computer Science instead of binary.',
      explainModelAnswer: 'Hexadecimal is used because it is shorter and easier for humans to read, write, and debug compared to long strings of binary digits. It does not consume less storage space in memory.'
    },
    {
      id: 'pc_5',
      level: 5,
      concept: 'File Handling & Loops',
      title: 'Writing Code: File Total',
      instructions: 'Write a Python program that opens a file named "scores.txt", reads each line (containing an integer score), calculates the sum, and prints the total.',
      problem: 'Implement the file opening, reading loop, casting to integer, accumulating the sum, and printing it.',
      code: '# Open scores.txt, read line by line, accumulate sum and print it\ntotal = 0\n# Write your code here',
      expectedOutput: '150',
      supportLadder: [
        'Use `with open("scores.txt", "r") as file:` to open the file safely.',
        'Iterate over the file using a `for line in file:` loop.',
        'Convert each line to an integer using `int(line)` and add it to `total` before printing.'
      ],
      testCases: [
        { input: 'scores.txt: 50, 60, 40', inputs: [], fileContent: '50\n60\n40\n', expected: '150' }
      ],
      explainQuestion: 'Explain why we should close files or use "with open" in Python.',
      explainModelAnswer: 'Using "with open" automatically closes the file after the block finishes, releasing lock files and saving system memory resources.'
    },
    {
      id: 'pc_6', level: 6, concept: 'Validation & Selection', title: 'Complete Code: Valid Age Range',
      instructions: 'Complete the program so ages from 11 to 18 inclusive print "Accepted" and all other integers print "Rejected".', problem: 'Use a compound condition so both boundaries are included.',
      code: 'age = int(input("Age: "))\n# Complete the validation\nif __________:\n    print("Accepted")\nelse:\n    print("Rejected")', expectedOutput: 'Accepted',
      supportLadder: ['The value must pass a lower-bound and an upper-bound check.', 'Join the two comparisons using `and`.', 'Both 11 and 18 must be accepted.'],
      testCases: [{ input: '11', inputs: ['11'], expected: 'Accepted' }, { input: '18', inputs: ['18'], expected: 'Accepted' }, { input: '10', inputs: ['10'], expected: 'Rejected' }, { input: '19', inputs: ['19'], expected: 'Rejected' }],
      explainQuestion: 'Explain why boundary values 11 and 18 must be included in the test data.', explainModelAnswer: 'Boundary tests check the exact limits where program behaviour changes and often reveal comparison errors.'
    },
    {
      id: 'pc_7', level: 7, concept: 'Lists & Iteration', title: 'Debug Code: Count Even Values', instructions: 'The program should count the even values in the list. Find and fix the logic error.', problem: 'Trace the condition and accumulator. The expected count is 3.',
      code: 'values = [3, 8, 11, 14, 20]\ncount = 0\nfor value in values:\n    if value % 2 == 1:\n        count = count + 1\nprint(count)', expectedOutput: '3',
      supportLadder: ['The remainder after division by 2 identifies even and odd values.', 'Even numbers have a remainder of 0.', 'Change only the comparison in the if condition.'], testCases: [{ input: 'fixed list', inputs: [], expected: '3' }],
      explainQuestion: 'Explain the role of the accumulator variable `count`.', explainModelAnswer: 'The accumulator stores a running total and is increased each time a value meets the condition.'
    },
    {
      id: 'pc_8', level: 8, concept: 'Functions & Lists', title: 'Write Code: Calculate an Average', instructions: 'Write `calculate_average(values)` to return the arithmetic mean of a non-empty list of numbers.', problem: 'The function must work for different lists rather than one fixed example.',
      code: 'def calculate_average(values):\n    # Return the mean of all values\n    pass', expectedOutput: '20.0', supportLadder: ['The mean is the total divided by the number of values.', 'Python provides `sum()` and `len()`.', 'Return the result rather than printing inside the function.'],
      testCases: [{ input: '[10, 20, 30]', inputs: [], functionName: 'calculate_average', functionArgs: [[10, 20, 30]], expected: '20.0' }, { input: '[2, 4]', inputs: [], functionName: 'calculate_average', functionArgs: [[2, 4]], expected: '3.0' }],
      explainQuestion: 'Why is a parameter preferable to using a fixed list inside the function?', explainModelAnswer: 'A parameter lets the same function operate on many different lists, improving reuse and testability.'
    },
    {
      id: 'pc_9', level: 9, concept: 'Exam Transfer: Search Function', title: 'Exam Bridge: Linear Search', instructions: 'Write `linear_search(values, target)` to return the index of the first matching value, or -1 if it is absent.', problem: 'Translate the inputs, process and outputs in the exam-style requirement into a tested function.',
      code: 'def linear_search(values, target):\n    # Examine each index in order\n    pass', expectedOutput: '2', supportLadder: ['The inputs are a list and a target; the output is an index.', 'Use a loop over the valid indexes.', 'Return immediately on a match; return -1 only after the loop.'],
      testCases: [{ input: '[4, 7, 9, 7], 9', inputs: [], functionName: 'linear_search', functionArgs: [[4, 7, 9, 7], 9], expected: '2' }, { input: '[4, 7, 9], 5', inputs: [], functionName: 'linear_search', functionArgs: [[4, 7, 9], 5], expected: '-1' }, { input: '[7, 7, 9], 7', inputs: [], functionName: 'linear_search', functionArgs: [[7, 7, 9], 7], expected: '0' }],
      explainQuestion: 'Explain why `return -1` must be placed after the loop.', explainModelAnswer: 'The complete list must be checked before the program can conclude that the target is absent.'
    }
  ],
  attempts: [
    { id: 'att_1', studentId: 'stud_1', type: 'number_skills', topic: 'binary conversions', score: '3/4', date: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString() },
    { id: 'att_2', studentId: 'stud_2', type: 'spaced_theory', topic: 'Systems Architecture', score: '5/5', date: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString() }
  ],
  programmingSubmissions: [
    {
      id: 'psub_1',
      studentId: 'stud_1',
      challengeId: 'pc_1',
      code: 'output = "Welcome Harriet to Computer Science"',
      status: 'Passed',
      supportUsed: 'None', // None, Low, Medium, High
      date: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString(),
      explanationResponse: 'Because joining strings together requires standard concatenation operators.'
    }
  ],
  writtenSubmissions: [
    {
      id: 'wsub_1',
      studentId: 'stud_1',
      questionId: 'wq_1',
      response: 'Ethically, the school should securely erase all hard drives so that student and teacher personal data is not stolen when they are thrown away. Environmentally, computers contain toxic metals like lead that can pollute water if sent to landfill, so the school should send them to an e-waste recycling centre instead.',
      planningScaffoldUsed: true,
      estimatedMark: '4',
      strengths: 'Identified secure data erasing for ethical issues and leaching of toxic metals for environmental issues.',
      improvements: 'Good application. Use formal terms like GDPR/data protection regulations.',
      actionItem: 'Ensure you reference relevant laws like the Data Protection Act 2018.',
      status: 'Awaiting Teacher Review', // 'Awaiting Teacher Review', 'Teacher Reviewed'
      teacherMark: null,
      teacherFeedback: null,
      date: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString()
    }
  ],
  matches: [
    { id: 'match_1', studentIds: ['stud_1', 'stud_7'], active: true, status: 'Active', paused: false }
  ],
  flags: [],
  messages: [
    { id: 'msg_1', senderId: 'stud_1', receiverId: 'coord_1', text: 'Hello Mrs. Smith, I am struggling with hex conversions on question 2. Can you help?', timestamp: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(), read: true, flagged: false },
    { id: 'msg_2', senderId: 'coord_1', receiverId: 'stud_1', text: 'Of course, Harriet! Remember that each hexadecimal character represents exactly four bits (a nibble). Split your binary byte in half and convert each side individually.', timestamp: new Date(Date.now() - 2 * 24 * 3600 * 1000 + 30 * 60 * 1000).toISOString(), read: true, flagged: false }
  ],
  auditLogs: [
    { id: 'alog_1', timestamp: new Date().toISOString(), action: 'Sign In', details: 'Harriet Potter signed in using Microsoft School SSO.', user: 'Harriet Potter' }
  ],
  settings: {
    flaggedKeywords: ['phone number', 'address', 'meet up', 'whatsapp', 'instagram', 'secret', 'treffen', 'handynummer', 'adresse', 'heimlich', 'skype'],
    aiFeaturesEnabled: true,
    communicationHours: '08:30 - 17:00'
  }
};

const QUESTION_SPECIFICATION_MAP = {
  q_1_1_a: '1.1.1', q_1_1_b: '1.1.2', q_1_1_c: '1.1.1', q_1_1_d: '1.1.3', q_1_1_e: '1.1.1', q_1: '1.1.1',
  q_1_2_a: '1.2.1', q_1_2_b: '1.2.1', q_1_2_c: '1.2.2', q_1_2_d: '1.2.3', q_1_2_e: '1.2.2', q_2: '1.2.1', q_3: '1.2.2',
  q_1_3_a: '1.2.4a', q_1_3_b: '1.2.4b', q_1_3_c: '1.2.4d', q_1_3_d: '1.2.5',
  q_1_4_a: '1.3.1', q_1_4_b: '1.3.2', q_1_4_c: '1.3.2', q_1_4_d: '1.3.2', q_4: '1.3.2',
  q_1_5_a: '1.4.1', q_1_5_b: '1.4.1', q_1_5_c: '1.4.2', q_1_5_d: '1.4.2',
  q_1_6_a: '1.5.1', q_1_6_b: '1.5.1', q_1_6_c: '1.5.2', q_1_6_d: '1.5.1',
  q_1_7_a: '1.6.2', q_1_7_b: '1.6.2', q_1_7_c: '1.6.1', q_1_7_d: '1.6.2',
  q_2_1_a: '2.1.1', q_2_1_b: '2.1.3', q_2_1_c: '2.1.3', q_2_1_d: '2.1.3', q_2_1_e: '2.1.2', q_5: '2.1.3',
  q_2_2_a: '2.2.2', q_2_2_b: '2.2.1', q_2_2_c: '2.2.1', q_2_2_d: '2.2.1',
  q_2_3_a: '2.3.1', q_2_3_b: '2.3.1', q_2_3_c: '2.3.2', q_2_3_d: '2.3.2',
  q_2_4_a: '2.4.1', q_2_4_b: '2.4.1', q_2_4_c: '2.4.1', q_2_4_d: '2.4.1',
  q_6: '1.2.1',
  q_2_5_a: '2.5.1', q_2_5_b: '2.5.1', q_2_5_c: '2.5.1', q_2_5_d: '2.5.2'
};

const WRITTEN_SPECIFICATION_MAP = {
  wq_1: '1.6.1', wq_2: '1.4.2', wq_3: '1.1.2', wq_4: '1.2.1', wq_5: '1.3.1',
  wq_6: '1.2.4d', wq_7: '2.1.3', wq_8: '2.3.1', wq_9: '2.5.1'
};

const KEY_TERM_SPECIFICATION_MAP = {
  term_cpu: '1.1.1', term_alu: '1.1.1', term_cache: '1.1.2', term_ram: '1.2.1', term_rom: '1.2.1',
  term_virtual_memory: '1.2.1', term_bit: '1.2.3', term_overflow: '1.2.4a', term_metadata: '1.2.4c',
  term_lossy: '1.2.5', term_lan: '1.3.1', term_protocol: '1.3.2', term_phishing: '1.4.1',
  term_encryption: '1.4.2', term_os: '1.5.1', term_open_source: '1.6.1', term_abstraction: '2.1.1',
  term_decomposition: '2.1.1', term_algorithm: '2.1.2', term_variable: '2.2.1', term_selection: '2.2.1',
  term_iteration: '2.2.1', term_array: '2.2.3', term_syntax_error: '2.3.1', term_logic_error: '2.3.1',
  term_validation: '2.3.1', term_boolean: '2.4.1', term_compiler: '2.5.1', term_interpreter: '2.5.1',
  term_pseudocode: '2.2.ERL'
};

function applyContentMappings(data) {
  (data.questions || []).forEach(question => {
    question.specificationPointId = QUESTION_SPECIFICATION_MAP[question.id] || question.specificationPointId || null;
    question.purpose = question.purpose || 'retrieval';
    if (question.id === 'q_1_2_d') question.topicId = 'topic_1_3';
    if (question.id === 'q_6') question.topicId = 'topic_1_2';
  });
  (data.writtenQuestions || []).forEach(question => {
    question.specificationPointId = WRITTEN_SPECIFICATION_MAP[question.id] || question.specificationPointId || null;
    question.purpose = question.purpose || 'application';
  });
  (data.keyTerms || []).forEach(term => {
    term.specificationPointId = KEY_TERM_SPECIFICATION_MAP[term.id] || term.specificationPointId || null;
  });
  (data.examTransferTasks || []).forEach(task => {
    task.purpose = 'exam-transfer';
  });
  (data.programmingChallenges || []).forEach(challenge => {
    challenge.specificationPointId = '2.2.PY';
    challenge.purpose = challenge.id === 'pc_9' ? 'exam-transfer' : 'application';
  });
  return data;
}

applyContentMappings(defaultDatabase);

class LocalDB {
  constructor() {
    this.cachedData = null;
    this.sessionToken = null;
    this.loadData();
  }

  loadData() {
    try {
      const raw = localStorage.getItem(DB_KEY);
      const parsedRaw = raw ? JSON.parse(raw) : null;
      if (!raw || !parsedRaw.schemaVersion || parsedRaw.schemaVersion < defaultDatabase.schemaVersion) {
        this.cachedData = JSON.parse(JSON.stringify(defaultDatabase));
        localStorage.setItem(DB_KEY, JSON.stringify(this.cachedData));
      } else {
        this.cachedData = parsedRaw;
        // Merge missing keys if schema was updated
        Object.keys(defaultDatabase).forEach(key => {
          if (!this.cachedData.hasOwnProperty(key)) {
            this.cachedData[key] = JSON.parse(JSON.stringify(defaultDatabase[key]));
          }
        });
        applyContentMappings(this.cachedData);
      }
    } catch (e) {
      console.error('Error loading LocalDB, using defaults:', e);
      this.cachedData = JSON.parse(JSON.stringify(defaultDatabase));
    }
  }

  saveData() {
    try {
      localStorage.setItem(DB_KEY, JSON.stringify(this.cachedData));
    } catch (e) {
      console.error('Error saving LocalDB:', e);
    }
  }

  // Auth helper
  setSessionToken(token) {
    this.sessionToken = token;
    localStorage.setItem('studyspice_session_token', token);
  }

  getSessionToken() {
    return this.sessionToken || localStorage.getItem('studyspice_session_token');
  }

  // Getters & Setters
  getSchools() { return this.cachedData.schools; }
  getCoordinators() { return this.cachedData.coordinators; }
  getStudents() { return this.cachedData.students; }
  getClasses() { return this.cachedData.classes; }
  getUnits() { return this.cachedData.units; }
  getClassroomControls() { return this.cachedData.classroomControls; }
  getAssignments() { return this.cachedData.assignments; }
  getTestPreps() { return this.cachedData.testPreps || []; }
  getSupportSessions() { return this.cachedData.supportSessions || []; }
  getExamTransferTasks() { return this.cachedData.examTransferTasks || []; }
  getKeyTerms() { return this.cachedData.keyTerms || []; }
  getQuestions() { return this.cachedData.questions; }
  getWrittenQuestions() { return this.cachedData.writtenQuestions; }
  getProgrammingChallenges() { return this.cachedData.programmingChallenges; }
  getAttempts() { return this.cachedData.attempts; }
  getProgrammingSubmissions() { return this.cachedData.programmingSubmissions; }
  getWrittenSubmissions() { return this.cachedData.writtenSubmissions; }
  getMessages() { return this.cachedData.messages; }
  getAuditLogs() { return this.cachedData.auditLogs; }
  getSettings() { return this.cachedData.settings; }

  // Modifiers
  updateStudent(studentId, updates) {
    const student = this.cachedData.students.find(s => s.id === studentId);
    if (student) {
      Object.assign(student, updates);
      this.saveData();
    }
  }

  updateClassroomControl(topicId, status) {
    this.cachedData.classroomControls[topicId] = status;
    this.saveData();
  }

  addAssignment(assignment) {
    const newAssign = {
      id: 'assign_' + Date.now(),
      completedCount: 0,
      ...assignment
    };
    this.cachedData.assignments.push(newAssign);
    this.saveData();
    this.addAuditLog('Assignment Created', `Assignment "${newAssign.title}" created.`, 'Teacher');
    return newAssign;
  }

  addTestPrep(testPrep) {
    const newPrep = {
      id: 'prep_' + Date.now(),
      status: 'Active',
      ...testPrep
    };
    this.cachedData.testPreps.push(newPrep);
    this.saveData();
    this.addAuditLog('Test preparation created', `Test preparation "${newPrep.title}" created.`, 'Teacher');
    return newPrep;
  }

  addSupportSession(session) {
    const newSession = { id: 'session_' + Date.now(), published: true, ...session };
    this.cachedData.supportSessions.push(newSession);
    this.saveData();
    this.addAuditLog('Support session published', `Session "${newSession.title}" published.`, 'Teacher');
    return newSession;
  }

  addAttempt(attempt) {
    const newAttempt = {
      id: 'att_' + Date.now(),
      date: new Date().toISOString(),
      ...attempt
    };
    this.cachedData.attempts.push(newAttempt);
    this.saveData();
    return newAttempt;
  }

  addProgrammingSubmission(submission) {
    const newSub = {
      id: 'psub_' + Date.now(),
      date: new Date().toISOString(),
      ...submission
    };
    // remove existing if same challenge
    this.cachedData.programmingSubmissions = this.cachedData.programmingSubmissions.filter(
      s => !(s.studentId === submission.studentId && s.challengeId === submission.challengeId)
    );
    this.cachedData.programmingSubmissions.push(newSub);
    this.saveData();
    return newSub;
  }

  addWrittenSubmission(wsub) {
    const newWsub = {
      id: 'wsub_' + Date.now(),
      date: new Date().toISOString(),
      status: 'Awaiting Teacher Review',
      ...wsub
    };
    this.cachedData.writtenSubmissions = this.cachedData.writtenSubmissions.filter(
      s => !(s.studentId === wsub.studentId && s.questionId === wsub.questionId)
    );
    this.cachedData.writtenSubmissions.push(newWsub);
    this.saveData();
    return newWsub;
  }

  updateWrittenSubmission(id, updates) {
    const sub = this.cachedData.writtenSubmissions.find(s => s.id === id);
    if (sub) {
      Object.assign(sub, updates);
      this.saveData();
    }
  }

  addMessage(matchId, senderId, text) {
    let msgObj;
    if (typeof matchId === 'object' && matchId !== null) {
      msgObj = matchId;
    } else {
      msgObj = {
        connectionId: matchId,
        senderId: senderId,
        text: text
      };
    }
    const newMsg = {
      id: 'msg_' + Date.now(),
      timestamp: new Date().toISOString(),
      read: false,
      flagged: false,
      ...msgObj
    };
    
    // Safeguarding check
    const sg = typeof BridgeSafeguarding !== 'undefined' ? BridgeSafeguarding : (typeof window !== 'undefined' ? window.BridgeSafeguarding : null);
    if (sg) {
      const check = sg.detectSafeguardingFlag(newMsg.text);
      if (check.flagged) {
        newMsg.flagged = true;
        newMsg.flagReason = check.reason;
        
        // Add to flags table
        if (!this.cachedData.flags) this.cachedData.flags = [];
        this.cachedData.flags.push({
          id: 'flag_' + Date.now(),
          messageId: newMsg.id,
          status: 'Pending',
          flaggedAt: new Date().toISOString()
        });

        // Auto-pause match for safety
        this.pauseMatch(newMsg.connectionId, true);
        
        const student = this.cachedData.students.find(s => s.id === msgObj.senderId);
        this.addAuditLog('Auto Safeguard Flag', `Message by ${student ? student.name : msgObj.senderId} flagged and chat paused. Reason: ${check.reason}`, 'System');
      }
    }
    
    this.cachedData.messages.push(newMsg);
    this.saveData();
    return newMsg;
  }

  getFlags() { return this.cachedData.flags || []; }
  getMatches() { return this.cachedData.matches || []; }

  pauseMatch(matchId, paused) {
    const matches = this.getMatches();
    const index = matches.findIndex(m => m.id === matchId);
    if (index !== -1) {
      matches[index].paused = paused;
      this.saveData();
      const studentNames = matches[index].studentIds.map(id => {
        const s = this.cachedData.students.find(st => st.id === id);
        return s ? s.name : id;
      }).join(' & ');
      this.addAuditLog(paused ? 'Match Paused' : 'Match Resumed', `Conversation between ${studentNames} ${paused ? 'paused' : 'resumed'}.`, 'Teacher');
    }
  }

  addLog(action, details, user) {
    this.addAuditLog(action, details, user);
  }

  addAuditLog(action, details, user) {
    const log = {
      id: 'alog_' + Date.now(),
      timestamp: new Date().toISOString(),
      action,
      details,
      user
    };
    this.cachedData.auditLogs.push(log);
    this.saveData();
  }

  resetDatabase() {
    this.cachedData = JSON.parse(JSON.stringify(defaultDatabase));
    this.saveData();
  }
}

window.db = new LocalDB();
