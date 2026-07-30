// Original Examiner Intelligence, Misconception Matrix, Command Rubrics, Spec-Mapped Key Terms Glossary and Parametric Question Blueprints for OCR GCSE Computer Science J277.
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

  const glossaryKeyTerms = [
    {
      strandId: '1.1.1',
      specificationPointId: '1.1.1',
      term: 'CPU (Central Processing Unit)',
      definition: 'The main electronic component in a computer that fetches, decodes, and executes instructions.',
      flashcard: {
        front: 'What is the Central Processing Unit (CPU)?',
        back: 'The primary electronic component that carries out instructions by running the fetch-decode-execute cycle.'
      }
    },
    {
      strandId: '1.1.1',
      specificationPointId: '1.1.1',
      term: 'Control Unit (CU)',
      definition: 'The CPU component that coordinates processor operations, manages the fetch-execute cycle, and sends control signals.',
      flashcard: {
        front: 'What is the function of the Control Unit (CU)?',
        back: 'It coordinates CPU operations, manages the fetch-execute cycle, and sends control signals to hardware.'
      }
    },
    {
      strandId: '1.1.1',
      specificationPointId: '1.1.1',
      term: 'Arithmetic Logic Unit (ALU)',
      definition: 'The CPU component that performs arithmetic calculations (addition/subtraction) and logical operations (AND/OR/NOT).',
      flashcard: {
        front: 'What does the Arithmetic Logic Unit (ALU) do?',
        back: 'It executes mathematical calculations and binary logical comparisons.'
      }
    },
    {
      strandId: '1.1.1',
      specificationPointId: '1.1.1',
      term: 'Memory Address Register (MAR)',
      definition: 'A register that holds the RAM memory address currently being read from or written to.',
      flashcard: {
        front: 'What does the Memory Address Register (MAR) store?',
        back: 'The RAM memory location address currently being accessed by the CPU.'
      }
    },
    {
      strandId: '1.1.1',
      specificationPointId: '1.1.1',
      term: 'Memory Data Register (MDR)',
      definition: 'A register that holds the actual data or instruction fetched from or to be written to memory.',
      flashcard: {
        front: 'What is stored in the Memory Data Register (MDR)?',
        back: 'The actual data or instruction retrieved from RAM or queued to be written to RAM.'
      }
    },
    {
      strandId: '1.1.1',
      specificationPointId: '1.1.1',
      term: 'Program Counter (PC)',
      definition: 'A register that holds the memory address of the next instruction to be fetched.',
      flashcard: {
        front: 'What is the role of the Program Counter (PC)?',
        back: 'It holds the RAM address of the next instruction waiting to be fetched.'
      }
    },
    {
      strandId: '1.1.1',
      specificationPointId: '1.1.1',
      term: 'Accumulator (ACC)',
      definition: 'A register that holds the intermediate results of calculations performed by the ALU.',
      flashcard: {
        front: 'What is the Accumulator used for?',
        back: 'It temporarily stores the immediate output/results produced by ALU operations.'
      }
    },
    {
      strandId: '1.1.2',
      specificationPointId: '1.1.2',
      term: 'Clock Speed',
      definition: 'The number of fetch-decode-execute cycles a CPU can perform per second, measured in Hertz (Hz) or Gigahertz (GHz).',
      flashcard: {
        front: 'Define Clock Speed.',
        back: 'The frequency of fetch-execute cycles per second (GHz). Higher clock speed allows more instructions per second.'
      }
    },
    {
      strandId: '1.1.2',
      specificationPointId: '1.1.2',
      term: 'Cache Memory',
      definition: 'High-speed SRAM located near/on the CPU that stores frequently accessed instructions and data.',
      flashcard: {
        front: 'Why does larger Cache Memory improve CPU performance?',
        back: 'It stores frequently used data/instructions closer to the CPU, reducing slow data fetches from main RAM.'
      }
    },
    {
      strandId: '1.1.3',
      specificationPointId: '1.1.3',
      term: 'Embedded System',
      definition: 'A computer system built into a larger mechanical/electrical device to perform a dedicated function.',
      flashcard: {
        front: 'What is an Embedded System?',
        back: 'A specialized computer system built into a larger device (e.g. washing machine) designed for one specific task.'
      }
    },
    {
      strandId: '1.2.1',
      specificationPointId: '1.2.1',
      term: 'RAM (Random Access Memory)',
      definition: 'Volatile main memory storing active programs and data currently processed by the CPU.',
      flashcard: {
        front: 'What is RAM and is it volatile?',
        back: 'Random Access Memory stores open applications and data. It is volatile (loses contents when powered off).'
      }
    },
    {
      strandId: '1.2.1',
      specificationPointId: '1.2.1',
      term: 'ROM (Read Only Memory)',
      definition: 'Non-volatile memory storing non-modifiable boot instructions (BIOS/firmware).',
      flashcard: {
        front: 'What is ROM used for?',
        back: 'Non-volatile memory that permanently holds startup instructions needed to boot the computer.'
      }
    },
    {
      strandId: '1.2.1',
      specificationPointId: '1.2.1',
      term: 'Virtual Memory',
      definition: 'A section of secondary storage used as temporary overflow memory when RAM is full.',
      flashcard: {
        front: 'How does Virtual Memory work?',
        back: 'When physical RAM is full, the OS moves inactive pages of data to secondary storage, returning them when needed.'
      }
    },
    {
      strandId: '1.2.2',
      specificationPointId: '1.2.2',
      term: 'Secondary Storage',
      definition: 'Non-volatile long-term storage used to retain files, operating systems, and programs when power is off.',
      flashcard: {
        front: 'Why is Secondary Storage necessary?',
        back: 'It provides non-volatile permanent storage for programs and data when the computer is turned off.'
      }
    },
    {
      strandId: '1.2.3',
      specificationPointId: '1.2.3',
      term: 'Bit',
      definition: 'The smallest unit of digital data, representing a single binary value of 0 or 1.',
      flashcard: {
        front: 'What is a Bit?',
        back: 'A single binary digit (0 or 1).'
      }
    },
    {
      strandId: '1.2.3',
      specificationPointId: '1.2.3',
      term: 'Byte',
      definition: 'A unit of digital data consisting of 8 bits.',
      flashcard: {
        front: 'How many bits are in 1 Byte?',
        back: '8 bits = 1 Byte.'
      }
    },
    {
      strandId: '1.2.4a',
      specificationPointId: '1.2.4',
      term: 'Hexadecimal',
      definition: 'A base-16 number system using digits 0-9 and letters A-F (where A=10 and F=15).',
      flashcard: {
        front: 'What is Hexadecimal?',
        back: 'Base-16 notation (0-9, A-F) used to make long binary numbers shorter and easier for humans to read.'
      }
    },
    {
      strandId: '1.2.4b',
      specificationPointId: '1.2.4',
      term: 'ASCII',
      definition: 'American Standard Code for Information Interchange; a 7/8-bit character set representing 128-256 characters.',
      flashcard: {
        front: 'What is ASCII?',
        back: 'A character encoding standard using 7 or 8 bits per character, supporting English letters and basic symbols.'
      }
    },
    {
      strandId: '1.2.4b',
      specificationPointId: '1.2.4',
      term: 'Unicode',
      definition: 'A 16/32-bit character set capable of representing characters and symbols across all global languages.',
      flashcard: {
        front: 'Why is Unicode preferred over ASCII for international applications?',
        back: 'Unicode uses 16 or 32 bits per character, supporting thousands of global alphabets and emojis.'
      }
    },
    {
      strandId: '1.2.4c',
      specificationPointId: '1.2.4',
      term: 'Pixel',
      definition: 'The smallest individual picture element in a grid-based bitmap image.',
      flashcard: {
        front: 'What is a Pixel?',
        back: 'A single dot or picture element in a digital bitmap image.'
      }
    },
    {
      strandId: '1.2.4c',
      specificationPointId: '1.2.4',
      term: 'Colour Depth',
      definition: 'The number of binary bits allocated to represent the colour of each individual pixel.',
      flashcard: {
        front: 'What is Colour Depth?',
        back: 'The number of bits per pixel in a bitmap image. Higher colour depth allows more unique colours.'
      }
    },
    {
      strandId: '1.2.4d',
      specificationPointId: '1.2.4',
      term: 'Sample Rate',
      definition: 'The number of audio amplitude samples recorded per second, measured in Hertz (Hz).',
      flashcard: {
        front: 'Define Sample Rate in audio recording.',
        back: 'The frequency (Hz) at which sound amplitude is measured per second.'
      }
    },
    {
      strandId: '1.2.5',
      specificationPointId: '1.2.5',
      term: 'Lossy Compression',
      definition: 'A compression method that permanently discards non-essential data to significantly reduce file size.',
      flashcard: {
        front: 'What is Lossy Compression?',
        back: 'A method that permanently removes data to achieve smaller file sizes (used for media like MP3/JPEG).'
      }
    },
    {
      strandId: '1.2.5',
      specificationPointId: '1.2.5',
      term: 'Lossless Compression',
      definition: 'A compression method that reduces file size without losing any original data, allowing exact reconstruction.',
      flashcard: {
        front: 'What is Lossless Compression?',
        back: 'A method that compresses data without discarding any information (essential for code and text documents).'
      }
    },
    {
      strandId: '1.3.1',
      specificationPointId: '1.3.1',
      term: 'LAN (Local Area Network)',
      definition: 'A network covering a small geographical site (e.g. school/office) using private cabling and hardware.',
      flashcard: {
        front: 'Define Local Area Network (LAN).',
        back: 'A network spanning a single geographic site using infrastructure owned by the organization.'
      }
    },
    {
      strandId: '1.3.1',
      specificationPointId: '1.3.1',
      term: 'WAN (Wide Area Network)',
      definition: 'A network connecting LANs across wide geographical locations using external telecommunication infrastructure.',
      flashcard: {
        front: 'Define Wide Area Network (WAN).',
        back: 'A network connecting geographically separate sites over shared or leased telecommunication lines.'
      }
    },
    {
      strandId: '1.3.2',
      specificationPointId: '1.3.2',
      term: 'Protocol',
      definition: 'An agreed set of rules governing how data is transmitted and received across a network.',
      flashcard: {
        front: 'What is a Network Protocol?',
        back: 'A set of agreed rules for data formatting, transmission, and error checking between devices.'
      }
    },
    {
      strandId: '1.4.1',
      specificationPointId: '1.4.1',
      term: 'Social Engineering',
      definition: 'Manipulating individuals into disclosing confidential information or performing security errors.',
      flashcard: {
        front: 'What is Social Engineering?',
        back: 'Tricking humans into granting unauthorized access or revealing sensitive security credentials (e.g. phishing).'
      }
    },
    {
      strandId: '1.4.2',
      specificationPointId: '1.4.2',
      term: 'Firewall',
      definition: 'Software or hardware that monitors and filters incoming/outgoing network packets against security rules.',
      flashcard: {
        front: 'What is the function of a Firewall?',
        back: 'It inspects network traffic packets and blocks unauthorized data transmissions based on security rules.'
      }
    },
    {
      strandId: '1.5.1',
      specificationPointId: '1.5.1',
      term: 'Operating System (OS)',
      definition: 'System software managing computer hardware, memory allocation, process scheduling, user interfaces, and file storage.',
      flashcard: {
        front: 'What is the main role of an Operating System?',
        back: 'To manage system hardware, allocate RAM, control process execution, handle files, and provide a user interface.'
      }
    },
    {
      strandId: '1.5.2',
      specificationPointId: '1.5.2',
      term: 'Defragmentation',
      definition: 'Reorganizing fragmented file sectors on a magnetic hard disk so related file data is stored contiguously.',
      flashcard: {
        front: 'Why is Defragmentation performed on magnetic HDDs?',
        back: 'It groups file segments together, reducing drive read-head movement and speeding up file access times.'
      }
    },
    {
      strandId: '1.6.1',
      specificationPointId: '1.6.1',
      term: 'E-waste (Electronic Waste)',
      definition: 'Discarded electronic equipment containing toxic metals that pose environmental hazards if dumped in landfill.',
      flashcard: {
        front: 'What environmental concern is associated with E-waste?',
        back: 'Toxic heavy metals (e.g. lead, mercury) leaching into soil and water supplies when devices are improperly landfilled.'
      }
    },
    {
      strandId: '1.6.2',
      specificationPointId: '1.6.1',
      term: 'Computer Misuse Act (CMA)',
      definition: 'UK legislation criminalizing unauthorized access to computer material, hacking, and virus creation.',
      flashcard: {
        front: 'What offences are covered under the Computer Misuse Act?',
        back: 'Unauthorized access to files/systems, unauthorized access with intent to commit a crime, and unauthorized alteration of data.'
      }
    },
    {
      strandId: '2.1.1',
      specificationPointId: '2.1.1',
      term: 'Abstraction',
      definition: 'Removing unnecessary details from a problem to focus only on the essential features required to solve it.',
      flashcard: {
        front: 'Define Abstraction in computational thinking.',
        back: 'Filtering out non-essential detail so you can focus on the core information relevant to the solution.'
      }
    },
    {
      strandId: '2.1.1',
      specificationPointId: '2.1.1',
      term: 'Decomposition',
      definition: 'Breaking down a complex problem into smaller, manageable sub-problems that can be analyzed and solved individually.',
      flashcard: {
        front: 'Define Decomposition.',
        back: 'Splitting a complex problem into smaller, simpler sub-problems that are easier to understand and code.'
      }
    },
    {
      strandId: '2.1.2',
      specificationPointId: '2.1.2',
      term: 'Trace Table',
      definition: 'A technique used to test algorithms step-by-step to track variable values and output states during execution.',
      flashcard: {
        front: 'What is a Trace Table used for?',
        back: 'To manually step through an algorithm line-by-line, recording how variable values change at each step.'
      }
    },
    {
      strandId: '2.1.3',
      specificationPointId: '2.1.3',
      term: 'Binary Search',
      definition: 'An efficient search algorithm that repeatedly divides a sorted list in half to find a target value.',
      flashcard: {
        front: 'What pre-condition is required before performing a Binary Search?',
        back: 'The data list must be sorted into ascending or descending order.'
      }
    },
    {
      strandId: '2.2.1',
      specificationPointId: '2.2.1',
      term: 'Iteration',
      definition: 'A control structure that repeats a sequence of statements (loops: FOR, WHILE, DO UNTIL).',
      flashcard: {
        front: 'What is Iteration in programming?',
        back: 'Repeating a block of code multiple times using a loop structure.'
      }
    },
    {
      strandId: '2.2.2',
      specificationPointId: '2.2.2',
      term: 'Casting',
      definition: 'Converting a value from one data type to another (e.g. converting string "42" to integer 42).',
      flashcard: {
        front: 'What is Data Type Casting?',
        back: 'Explicitly converting a variable or value from one data type to another (e.g. int("15")).'
      }
    },
    {
      strandId: '2.2.3',
      specificationPointId: '2.2.3',
      term: 'Function',
      definition: 'A reusable subprogram that takes parameters, performs a task, and returns a value to the caller.',
      flashcard: {
        front: 'What distinguishes a Function from a Procedure?',
        back: 'A Function returns a value using a RETURN statement, whereas a Procedure does not return a value.'
      }
    },
    {
      strandId: '2.3.1',
      specificationPointId: '2.3.1',
      term: 'Input Validation',
      definition: 'Automated checks ensuring user input meets specific rules (e.g. length check, range check) before processing.',
      flashcard: {
        front: 'What is Input Validation?',
        back: 'Checking input data against validation rules to ensure it is sensible and acceptable before processing.'
      }
    },
    {
      strandId: '2.3.2',
      specificationPointId: '2.3.2',
      term: 'Boundary Test Data',
      definition: 'Test values selected at the extreme minimum and maximum limits of acceptable input data.',
      flashcard: {
        front: 'Give an example of Boundary Test Data for an age limit of 11 to 18.',
        back: 'Test values 11 and 18 (the exact edge values allowed by the validation rule).'
      }
    },
    {
      strandId: '2.4.1',
      specificationPointId: '2.4.1',
      term: 'Truth Table',
      definition: 'A mathematical table showing all possible input combinations for a logic circuit and their resulting outputs.',
      flashcard: {
        front: 'What is a Truth Table?',
        back: 'A table listing every possible binary input combination (0s and 1s) and the corresponding output.'
      }
    },
    {
      strandId: '2.5.1',
      specificationPointId: '2.5.1',
      term: 'Compiler',
      definition: 'A translator that converts high-level source code into machine code all at once before execution.',
      flashcard: {
        front: 'How does a Compiler translate code?',
        back: 'It translates the entire source code into an executable machine code file prior to running.'
      }
    },
    {
      strandId: '2.5.2',
      specificationPointId: '2.5.2',
      term: 'IDE (Integrated Development Environment)',
      definition: 'Software providing comprehensive tools for programming, including editor, debugger, and build automation.',
      flashcard: {
        front: 'List three core features of an IDE.',
        back: 'Code editor (with syntax highlighting), stepping debugger, and translator/run facilities.'
      }
    }
  ];

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
    glossaryKeyTerms,
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

    getKeyTermsBySpecPoint(specificationPointId) {
      return glossaryKeyTerms.filter(item => item.specificationPointId === specificationPointId || item.strandId === specificationPointId);
    },

    getFlashcardsByStrand(strandId) {
      return glossaryKeyTerms
        .filter(item => item.strandId === strandId || item.specificationPointId === strandId)
        .map(item => item.flashcard);
    },

    generateBlueprintQuestion(strandId, seed = 1) {
      if (blueprintGenerators[strandId]) {
        return blueprintGenerators[strandId](seed);
      }
      return null;
    }
  };
});
