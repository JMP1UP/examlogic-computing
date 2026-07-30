// Original Examiner Intelligence, Misconception Matrix, Command Rubrics and Parametric Question Blueprints for OCR GCSE Computer Science J277.
(function initialiseExaminerKnowledge(root, factory) {
  const knowledge = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = knowledge;
  if (root) {
    root.StudySpiceContent = root.StudySpiceContent || {};
    root.StudySpiceContent.examinerKnowledge = knowledge;
  }
})(typeof window !== 'undefined' ? window : globalThis, function buildExaminerKnowledge() {
  'use strict';

  const misconceptions = {
    '1.1.1': {
      strandId: '1.1.1',
      topic: 'Architecture of the CPU',
      commonErrors: [
        {
          error: 'Confusing MAR and MDR roles',
          explanation: 'Candidates frequently state that MAR holds data. MAR holds the memory address being accessed, while MDR holds the actual data or instruction transferred.',
          examinerAdvice: 'Remember: Address goes in MAR, Data/Instruction goes in MDR.'
        },
        {
          error: 'Stating PC holds instruction instead of address',
          explanation: 'The Program Counter holds the memory address of the next instruction, not the instruction text itself.',
          examinerAdvice: 'PC points to the next location in memory to fetch from.'
        }
      ]
    },
    '1.1.2': {
      strandId: '1.1.2',
      topic: 'CPU Performance',
      commonErrors: [
        {
          error: 'Assuming doubling cores doubles speed for all software',
          explanation: 'Extra cores improve performance only when software is designed for multi-threading/parallel processing.',
          examinerAdvice: 'Always link core count to software capability for parallel execution.'
        },
        {
          error: 'Confusing cache with RAM or secondary storage',
          explanation: 'Cache is small, fast SRAM inside/near the CPU storing frequently used instructions, whereas RAM is main memory.',
          examinerAdvice: 'Cache speeds up retrieval of repeated instructions, avoiding slower RAM fetches.'
        }
      ]
    },
    '1.1.3': {
      strandId: '1.1.3',
      topic: 'Embedded Systems',
      commonErrors: [
        {
          error: 'Thinking embedded systems have no software/programs',
          explanation: 'Embedded systems run firmware for a single dedicated task.',
          examinerAdvice: 'Embedded systems have dedicated hardware/software integrated into a larger mechanical/electrical system.'
        }
      ]
    },
    '1.2.1': {
      strandId: '1.2.1',
      topic: 'Primary Storage',
      commonErrors: [
        {
          error: 'Treating virtual memory as extra physical RAM',
          explanation: 'Virtual memory uses a section of secondary storage (HDD/SSD) as temporary RAM overflow.',
          examinerAdvice: 'Virtual memory is slower because transferring data to/from disk is far slower than RAM.'
        },
        {
          error: 'Confusing RAM volatility with ROM',
          explanation: 'RAM loses contents when powered off (volatile); ROM is read-only and non-volatile.',
          examinerAdvice: 'ROM holds boot instructions (BIOS/loader) that must persist across reboots.'
        }
      ]
    },
    '1.2.2': {
      strandId: '1.2.2',
      topic: 'Secondary Storage',
      commonErrors: [
        {
          error: 'Attributing fixed capacity to a storage type',
          explanation: 'Optical, magnetic, and solid-state media exist in varied capacities; compare media by speed, durability, portability, and cost per GB.',
          examinerAdvice: 'Focus on physical characteristics (moving parts vs flash) and scenario constraints.'
        }
      ]
    },
    '1.2.3': {
      strandId: '1.2.3',
      topic: 'Units and File Size Calculations',
      commonErrors: [
        {
          error: 'Omitting units in calculation final answers',
          explanation: 'Failing to state whether an answer is in bits, bytes, KB, or MB loses credit in OCR mark schemes.',
          examinerAdvice: 'Show working step-by-step and write final unit explicitly (e.g., 2.4 MB or 2,400,000 bytes).'
        },
        {
          error: 'Confusing bits and bytes in size formulas',
          explanation: 'File calculations often produce bits first (e.g. sample rate x resolution x duration). Divide by 8 to convert to bytes.',
          examinerAdvice: 'Divide bits by 8 to get Bytes, then divide by 1,000 to get KB.'
        }
      ]
    },
    '1.2.4a': {
      strandId: '1.2.4a',
      topic: 'Numbers (Binary & Hexadecimal)',
      commonErrors: [
        {
          error: 'Ignoring overflow during 8-bit binary addition',
          explanation: 'When binary addition produces a 9th bit, an overflow error occurs because the result exceeds 255.',
          examinerAdvice: 'Identify the 9th bit as overflow and note that extra capacity is needed.'
        },
        {
          error: 'Incorrect bit shift direction',
          explanation: 'Left shifts multiply by powers of 2; right shifts divide by powers of 2.',
          examinerAdvice: 'Shift left = multiply by 2^n; Shift right = divide by 2^n.'
        }
      ]
    },
    '1.2.4b': {
      strandId: '1.2.4b',
      topic: 'Characters',
      commonErrors: [
        {
          error: 'Assuming ASCII can represent all world languages',
          explanation: 'Standard ASCII uses 7/8 bits (128-256 characters) for basic Latin alphabet. Unicode uses 16/32 bits for global scripts.',
          examinerAdvice: 'Unicode uses more bits per character to support global character sets and symbols.'
        }
      ]
    },
    '1.2.4c': {
      strandId: '1.2.4c',
      topic: 'Images',
      commonErrors: [
        {
          error: 'Confusing resolution with colour depth',
          explanation: 'Resolution is pixel dimensions (width x height); colour depth is bits per pixel.',
          examinerAdvice: 'Total bits = width x height x colour depth.'
        }
      ]
    },
    '1.2.4d': {
      strandId: '1.2.4d',
      topic: 'Sound',
      commonErrors: [
        {
          error: 'Confusing sample rate with bit depth in sound recording',
          explanation: 'Sample rate is samples per second (Hz); bit depth is bits used to store amplitude per sample.',
          examinerAdvice: 'Higher sample rate or bit depth improves audio fidelity but increases file size.'
        }
      ]
    },
    '1.2.5': {
      strandId: '1.2.5',
      topic: 'Compression',
      commonErrors: [
        {
          error: 'Suggesting lossy compression for executable code or text files',
          explanation: 'Lossy removes data permanently, corrupting text/programs. Lossless must be used for text and executable code.',
          examinerAdvice: 'Use lossy for audio/video/images where slight quality loss is acceptable; lossless for code/documents.'
        }
      ]
    },
    '1.3.1': {
      strandId: '1.3.1',
      topic: 'Networks and Topologies',
      commonErrors: [
        {
          error: 'Confusing LAN and WAN geographical boundaries',
          explanation: 'A LAN covers a single site/building; a WAN covers multiple geographical sites connected by telecommunication infrastructure.',
          examinerAdvice: 'Identify ownership of infrastructure: LAN uses internal cabling/hardware; WAN uses third-party telecoms.'
        }
      ]
    },
    '1.3.2': {
      strandId: '1.3.2',
      topic: 'Connections, Protocols and Layers',
      commonErrors: [
        {
          error: 'Naming wrong protocol for email transfer vs retrieval',
          explanation: 'SMTP is used to send email; POP/IMAP are used to retrieve email.',
          examinerAdvice: 'SMTP = Send; POP3/IMAP = Receive/Retrieve.'
        },
        {
          error: 'Vague protocol definitions',
          explanation: 'A protocol is a set of agreed rules for data communication.',
          examinerAdvice: 'Always define a protocol as an agreed set of rules governing data transmission.'
        }
      ]
    },
    '1.4.1': {
      strandId: '1.4.1',
      topic: 'Threats to Computer Systems',
      commonErrors: [
        {
          error: 'Confusing phishing with malware',
          explanation: 'Phishing relies on social engineering (tricky emails/websites) to deceive users; malware is malicious code.',
          examinerAdvice: 'Phishing targets human weakness; malware targets software/system vulnerability.'
        }
      ]
    },
    '1.4.2': {
      strandId: '1.4.2',
      topic: 'Preventing Vulnerabilities',
      commonErrors: [
        {
          error: 'Confusing firewall with antivirus software',
          explanation: 'A firewall monitors and filters network traffic; antivirus scans and removes malicious files on a host.',
          examinerAdvice: 'Firewall inspects network packets against security rules; antivirus inspects local files.'
        }
      ]
    },
    '1.5.1': {
      strandId: '1.5.1',
      topic: 'Operating Systems',
      commonErrors: [
        {
          error: 'Attributing application-level tasks to operating system',
          explanation: 'The OS manages hardware, memory, files, user interface, and process scheduling.',
          examinerAdvice: 'Focus OS functions on user interface, memory allocation, multi-tasking, file management, and peripheral drivers.'
        }
      ]
    },
    '1.5.2': {
      strandId: '1.5.2',
      topic: 'Utility Software',
      commonErrors: [
        {
          error: 'Claiming defragmentation is useful on Solid State Drives (SSDs)',
          explanation: 'Defragmentation reorganizes fragmented files on magnetic HDDs to reduce read head movement. SSDs have no moving parts and unnecessary writes wear out flash cells.',
          examinerAdvice: 'Defragmentation benefits magnetic hard drives only, not SSDs.'
        }
      ]
    },
    '1.6.1': {
      strandId: '1.6.1',
      topic: 'Ethical, Cultural & Environmental Impacts',
      commonErrors: [
        {
          error: 'Giving scenario-free generic moral opinions',
          explanation: 'OCR 6-8 mark extended writing requires balanced, technical arguments addressing specific stakeholders in context.',
          examinerAdvice: 'Structure 6-8 mark answers with clear paragraphs: technical impact, stakeholder perspectives, ethical/environmental context, and a reasoned conclusion.'
        }
      ]
    },
    '1.6.2': {
      strandId: '1.6.2',
      topic: 'Legislation and Licensing',
      commonErrors: [
        {
          error: 'Confusing Data Protection Act with Computer Misuse Act',
          explanation: 'DPA regulates organizations storing personal data; CMA criminalizes unauthorized access, hacking, and malware creation.',
          examinerAdvice: 'DPA = handling personal data lawfully; CMA = unauthorized access/hacking offences; Copyright Act = IP protection.'
        }
      ]
    },
    '2.1.1': {
      strandId: '2.1.1',
      topic: 'Computational Thinking',
      commonErrors: [
        {
          error: 'Confusing abstraction with decomposition',
          explanation: 'Abstraction removes unnecessary detail; decomposition breaks a complex problem into smaller sub-problems.',
          examinerAdvice: 'Abstraction = focus on essential details; Decomposition = break down into manageable parts.'
        }
      ]
    },
    '2.1.2': {
      strandId: '2.1.2',
      topic: 'Designing and Refining Algorithms',
      commonErrors: [
        {
          error: 'Updating multiple variables on one trace table row',
          explanation: 'In OCR trace tables, record a change in a variable on a new line when the line of code executes.',
          examinerAdvice: 'Each variable change occurs on its respective line step in execution order.'
        }
      ]
    },
    '2.1.3': {
      strandId: '2.1.3',
      topic: 'Searching and Sorting Algorithms',
      commonErrors: [
        {
          error: 'Attempting binary search on an unsorted list',
          explanation: 'Binary search requires the list to be sorted first. Linear search works on unsorted or sorted lists.',
          examinerAdvice: 'Always check if the list is sorted before applying binary search.'
        }
      ]
    },
    '2.2.1': {
      strandId: '2.2.1',
      topic: 'Programming Fundamentals',
      commonErrors: [
        {
          error: 'Confusing assignment (=) with equality comparison (==)',
          explanation: 'Assignment stores a value in a variable; comparison evaluates whether two expressions are equal.',
          examinerAdvice: 'Use single = for assignment and double == for equality check in algorithm pseudocode.'
        }
      ]
    },
    '2.2.2': {
      strandId: '2.2.2',
      topic: 'Data Types',
      commonErrors: [
        {
          error: 'Storing numeric strings as integers for arithmetic',
          explanation: 'Phone numbers or postal codes should be stored as strings because leading zeros must be preserved and no arithmetic is performed.',
          examinerAdvice: 'Use String for codes/numbers requiring leading zeros or formatting.'
        }
      ]
    },
    '2.2.3': {
      strandId: '2.2.3',
      topic: 'Additional Techniques',
      commonErrors: [
        {
          error: 'Confusing functions and procedures',
          explanation: 'A function returns a value to the calling code; a procedure carries out instructions without returning a value.',
          examinerAdvice: 'Functions always contain a RETURN statement.'
        }
      ]
    },
    '2.2.PY': {
      strandId: '2.2.PY',
      topic: 'Practical Python',
      commonErrors: [
        {
          error: 'Type error when adding string and integer without casting',
          explanation: 'In Python, concatenating input() (which returns string) with integer causes a TypeError.',
          examinerAdvice: 'Convert user input explicitly using int() or float() before arithmetic operations.'
        }
      ]
    },
    '2.2.ERL': {
      strandId: '2.2.ERL',
      topic: 'OCR Exam Reference Language',
      commonErrors: [
        {
          error: 'Using 0-based inclusive range for OCR FOR loops',
          explanation: 'In OCR ERL, `for i = 1 to 5` executes with i = 1, 2, 3, 4, 5 (inclusive of end limit).',
          examinerAdvice: 'OCR ERL count-controlled FOR loops are INCLUSIVE of both start and end bounds.'
        }
      ]
    },
    '2.3.1': {
      strandId: '2.3.1',
      topic: 'Defensive Design',
      commonErrors: [
        {
          error: 'Confusing validation with verification',
          explanation: 'Validation checks if input data complies with rules (range, type, presence); verification checks if data matches original source.',
          examinerAdvice: 'Validation = sensible/allowable according to rules; Verification = matches source.'
        }
      ]
    },
    '2.3.2': {
      strandId: '2.3.2',
      topic: 'Testing',
      commonErrors: [
        {
          error: 'Selecting invalid test data instead of boundary/erroneous data',
          explanation: 'Boundary test data is at the extreme acceptable limits; erroneous test data is outside acceptable data type or range.',
          examinerAdvice: 'State exact test values and expected results for Normal, Boundary, and Erroneous categories.'
        }
      ]
    },
    '2.4.1': {
      strandId: '2.4.1',
      topic: 'Boolean Logic',
      commonErrors: [
        {
          error: 'Confusing XOR with OR logic gate truth tables',
          explanation: 'OR is true if either or both inputs are 1; XOR is true if exactly one input is 1.',
          examinerAdvice: 'XOR = exclusively one input is 1.'
        }
      ]
    },
    '2.5.1': {
      strandId: '2.5.1',
      topic: 'Programming Languages & Translators',
      commonErrors: [
        {
          error: 'Confusing compiler and interpreter execution models',
          explanation: 'A compiler translates entire source code into machine code prior to execution; an interpreter translates and executes code line-by-line.',
          examinerAdvice: 'Compiler produces standalone executable; Interpreter translates on the fly.'
        }
      ]
    },
    '2.5.2': {
      strandId: '2.5.2',
      topic: 'Integrated Development Environments (IDE)',
      commonErrors: [
        {
          error: 'Claiming compiler is a feature exclusive to IDEs',
          explanation: 'IDEs combine code editor, error diagnostics, debugger, and translator interface into one environment.',
          examinerAdvice: 'Identify IDE features as code editor, auto-completion, syntax highlighting, stepping debugger, and build/run tool.'
        }
      ]
    }
  };

  const commandRubrics = {
    'State': {
      commandWord: 'State',
      description: 'Specify a name, term, or concise fact.',
      marks: 1,
      requirement: 'Provide a single, precise technical term or value without length explanation.'
    },
    'Identify': {
      commandWord: 'Identify',
      description: 'Select or name a component, feature, or item from a scenario.',
      marks: 1,
      requirement: 'Extract the correct item directly linked to the context provided.'
    },
    'Describe': {
      commandWord: 'Describe',
      description: 'State the characteristics or key features of a concept.',
      marks: 2,
      requirement: 'Provide two distinct factual features or sequential stages of the item.'
    },
    'Explain': {
      commandWord: 'Explain',
      description: 'Set out purposes, causes, or relationships.',
      marks: 2,
      requirement: 'State a clear point AND provide a linked expansion/justification (Point + Because/Therefore).'
    },
    'Compare': {
      commandWord: 'Compare',
      description: 'Identify similarities and/or differences between items.',
      marks: 4,
      requirement: 'Direct comparison points for both items highlighting key differences or trade-offs.'
    },
    'Evaluate': {
      commandWord: 'Evaluate',
      description: 'Assess facts or scenarios to make a contextual judgment.',
      marks: 6,
      requirement: 'Structured response with technical points, stakeholder impacts, context-specific evaluation, and reasoned conclusion.'
    },
    'Write algorithm': {
      commandWord: 'Write algorithm',
      description: 'Produce pseudocode or Python code solving a specified problem.',
      marks: 4,
      requirement: 'Correct input handling, correct selection/iteration structures, accurate variable updates, and correct output.'
    }
  };

  const blueprintGenerators = {
    '1.2.3': function generateStorageCalculation(seed) {
      const width = 800 + (seed % 5) * 200;
      const height = 600 + (seed % 4) * 200;
      const depth = (seed % 2 === 0) ? 8 : 24;
      const totalBits = width * height * depth;
      const totalBytes = totalBits / 8;
      const totalKB = totalBytes / 1000;
      return {
        strandId: '1.2.3',
        title: 'Image File Size Calculation',
        questionStem: `Calculate the file size in Kilobytes (KB) for an uncompressed bitmap image with dimensions ${width} x ${height} pixels and a colour depth of ${depth} bits. Show your working and state the units.`,
        workingSteps: [
          `Total bits = ${width} x ${height} x ${depth} = ${totalBits} bits`,
          `Total bytes = ${totalBits} / 8 = ${totalBytes} bytes`,
          `Total KB = ${totalBytes} / 1000 = ${totalKB} KB`
        ],
        finalAnswer: `${totalKB} KB`,
        marks: 3
      };
    },
    '1.2.4a': function generateBinaryAddition(seed) {
      const val1 = 15 + (seed % 10) * 3;
      const val2 = 20 + (seed % 8) * 4;
      const bin1 = val1.toString(2).padStart(8, '0');
      const bin2 = val2.toString(2).padStart(8, '0');
      const sum = val1 + val2;
      const binSum = sum.toString(2).padStart(8, '0');
      return {
        strandId: '1.2.4a',
        title: '8-Bit Binary Addition',
        questionStem: `Add the following two 8-bit binary numbers: ${bin1} + ${bin2}. State whether an overflow error occurs.`,
        workingSteps: [
          `${bin1} (${val1} in decimal)`,
          `+ ${bin2} (${val2} in decimal)`,
          `= ${binSum} (${sum} in decimal)`
        ],
        finalAnswer: binSum,
        hasOverflow: sum > 255,
        marks: 2
      };
    },
    '2.4.1': function generateLogicGateTruthTable(seed) {
      const gates = ['AND', 'OR', 'XOR'];
      const gate = gates[seed % gates.length];
      const outputs = [];
      for (let a = 0; a <= 1; a++) {
        for (let b = 0; b <= 1; b++) {
          let out = 0;
          if (gate === 'AND') out = (a && b) ? 1 : 0;
          if (gate === 'OR') out = (a || b) ? 1 : 0;
          if (gate === 'XOR') out = (a !== b) ? 1 : 0;
          outputs.push({ a, b, out });
        }
      }
      return {
        strandId: '2.4.1',
        title: 'Boolean Logic Truth Table',
        questionStem: `Complete the truth table for a 2-input ${gate} gate.`,
        truthTable: outputs,
        gate,
        marks: 4
      };
    }
  };

  return {
    misconceptions,
    commandRubrics,
    blueprintGenerators,

    getExaminerInsights(strandId) {
      return misconceptions[strandId] || {
        strandId,
        topic: 'GCSE Computer Science Topic',
        commonErrors: [
          {
            error: 'Generic answer without technical depth',
            explanation: 'OCR examiners require precise computing terminology and contextual application.',
            examinerAdvice: 'Always link key terms directly to the scenario.'
          }
        ]
      };
    },

    getCommandWordRubric(commandWord) {
      return commandRubrics[commandWord] || commandRubrics['Explain'];
    },

    generateBlueprintQuestion(strandId, seed = 1) {
      if (blueprintGenerators[strandId]) {
        return blueprintGenerators[strandId](seed);
      }
      return null;
    }
  };
});
