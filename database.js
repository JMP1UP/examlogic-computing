// Database state layer for GCSE Computer Science Learning Platform (ExamLogic Computing)
const DB_KEY = 'examlogic_db';

const defaultDatabase = {
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
        { id: 'topic_1_1', name: 'Systems Architecture', objectives: ['CPU architecture', 'Von Neumann architecture', 'CPU performance factors'] },
        { id: 'topic_1_2', name: 'Memory and Storage', objectives: ['RAM and ROM', 'Secondary storage categories', 'Storage capacity and calculations'] },
        { id: 'topic_1_3', name: 'Data Representation', objectives: ['Binary, denary and hex conversions', 'Binary addition and shifts', 'Character, image and sound storage'] },
        { id: 'topic_1_4', name: 'Networks and Protocols', objectives: ['Network types (LAN/WAN)', 'Network hardware', 'Client-server and peer-to-peer', 'Protocols and layers'] },
        { id: 'topic_1_5', name: 'Network Security', objectives: ['Threats to networks', 'Identifying and preventing vulnerabilities'] },
        { id: 'topic_1_6', name: 'Systems Software', objectives: ['Operating systems functions', 'Utility software'] },
        { id: 'topic_1_7', name: 'Ethical, Legal and Environmental Impacts', objectives: ['Legislation', 'Ethical and cultural issues', 'Environmental concerns'] }
      ]
    },
    {
      id: 'unit_2',
      paper: 'Paper 2',
      name: 'Computational Thinking, Algorithms and Programming',
      topics: [
        { id: 'topic_2_1', name: 'Algorithms', objectives: ['Computational thinking', 'Searching algorithms', 'Sorting algorithms', 'Creating and tracing algorithms'] },
        { id: 'topic_2_2', name: 'Programming Fundamentals', objectives: ['Variables, constants and assignment', 'Sequence, selection and iteration', 'Operators and string handling', 'File handling and records', 'Arrays'] },
        { id: 'topic_2_3', name: 'Robust Programming', objectives: ['Defensive design', 'Testing and validation'] },
        { id: 'topic_2_4', name: 'Boolean Logic', objectives: ['Logic gates (AND, OR, NOT)', 'Truth tables', 'Combining logic gates'] },
        { id: 'topic_2_5', name: 'Translators and IDEs', objectives: ['High-level and low-level languages', 'Compilers, interpreters and assemblers', 'IDE tools and features'] }
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
      status: 'Required',
      completedCount: 1
    },
    {
      id: 'assign_2',
      title: 'Programming Practice - Loops and Selection',
      classId: 'class_1',
      topicId: 'topic_2_2',
      dueDate: new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString().split('T')[0],
      status: 'Required',
      completedCount: 0
    }
  ],
  questions: [
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
      code: '# Reading exercise: Write what the output will be in the string box below\noutput = ""',
      expectedOutput: 'Welcome Harriet to Computer Science',
      supportLadder: [
        'The variable "username" stores "Harriet".',
        'The variable "subject" stores "Computer Science".',
        'The program concatenates the strings together with spaces in between.'
      ],
      testCases: [
        { input: '', expected: 'Welcome Harriet to Computer Science' }
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
      code: 'score = 65\n# Complete the conditional below\nif score >= 50:\n    print("Pass")\nelse:\n    print("Fail")',
      expectedOutput: 'Pass',
      supportLadder: [
        'We need to check if the score is greater than or equal to 50.',
        'The syntax is `if score >= 50:`.',
        'Make sure to indent the print statements.'
      ],
      testCases: [
        { input: '65', expected: 'Pass' },
        { input: '45', expected: 'Fail' }
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
        { input: '', expected: '1\n2\n3\n4\n5' }
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
      code: 'def hex_char_to_val(char):\n    # Write your solution here\n    if char.isdigit():\n        return int(char)\n    else:\n        # Convert letter to value\n        letters = {"A":10, "B":11, "C":12, "D":13, "E":14, "F":15}\n        return letters.get(char.upper(), 0)',
      expectedOutput: '10', // Test input "A"
      supportLadder: [
        'If the character is between "0" and "9", convert it directly to an integer.',
        'Use an if/elif structure or a dictionary mapping to handle letters A through F.',
        'Ensure letters are converted to uppercase using `.upper()` before checking.'
      ],
      testCases: [
        { input: 'A', expected: '10' },
        { input: '5', expected: '5' },
        { input: 'F', expected: '15' }
      ],
      explainQuestion: 'Explain why hexadecimal is used in Computer Science instead of binary.',
      explainModelAnswer: 'Hexadecimal is used because it is shorter and easier for humans to read, write, and debug compared to long strings of binary digits. It does not consume less storage space in memory.'
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

class LocalDB {
  constructor() {
    this.cachedData = null;
    this.sessionToken = null;
    this.loadData();
  }

  loadData() {
    try {
      const raw = localStorage.getItem(DB_KEY);
      if (!raw) {
        this.cachedData = JSON.parse(JSON.stringify(defaultDatabase));
        localStorage.setItem(DB_KEY, JSON.stringify(this.cachedData));
      } else {
        this.cachedData = JSON.parse(raw);
        // Merge missing keys if schema was updated
        Object.keys(defaultDatabase).forEach(key => {
          if (!this.cachedData.hasOwnProperty(key)) {
            this.cachedData[key] = JSON.parse(JSON.stringify(defaultDatabase[key]));
          }
        });
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
    localStorage.setItem('examlogic_session_token', token);
  }

  getSessionToken() {
    return this.sessionToken || localStorage.getItem('examlogic_session_token');
  }

  // Getters & Setters
  getSchools() { return this.cachedData.schools; }
  getCoordinators() { return this.cachedData.coordinators; }
  getStudents() { return this.cachedData.students; }
  getClasses() { return this.cachedData.classes; }
  getUnits() { return this.cachedData.units; }
  getClassroomControls() { return this.cachedData.classroomControls; }
  getAssignments() { return this.cachedData.assignments; }
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
