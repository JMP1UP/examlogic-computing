// Database state layer for GCSE Computer Science Learning Platform (StudySpice)
(function initialiseStudySpiceDatabase(root) {
'use strict';

const curriculumContent = typeof module !== 'undefined' && module.exports
  ? require('./curriculum-content')
  : root.StudySpiceContent?.curriculum;
const priorityAssessments = typeof module !== 'undefined' && module.exports
  ? require('./priority-assessments')
  : root.StudySpiceContent?.priorityAssessments;
const examinerKnowledge = typeof module !== 'undefined' && module.exports
  ? require('./curriculum-examiner-knowledge')
  : root.StudySpiceContent?.examinerKnowledge;
const mixedExamEngine = typeof module !== 'undefined' && module.exports
  ? require('./mixed-exam-engine')
  : root.StudySpiceContent?.mixedExamEngine;
const extendedWritingBuilder = typeof module !== 'undefined' && module.exports
  ? require('./extended-writing-builder')
  : root.StudySpiceContent?.extendedWritingBuilder;
const visualTracers = typeof module !== 'undefined' && module.exports
  ? require('./visual-tracers')
  : root.StudySpiceContent?.visualTracers;

if (!curriculumContent || !priorityAssessments) {
  throw new Error('StudySpice curriculum content must load before the database.');
}

const curriculumDiagnosticQuestions = curriculumContent.map(item => {
  const topicId = item.id.startsWith('1.1.') ? 'topic_1_1'
    : item.id === '1.2.1' || item.id === '1.2.2' ? 'topic_1_2'
      : item.id.startsWith('1.2.') ? 'topic_1_3'
        : item.id.startsWith('1.3.') ? 'topic_1_4'
          : item.id.startsWith('1.4.') ? 'topic_1_5'
            : item.id.startsWith('1.5.') ? 'topic_1_6'
              : item.id.startsWith('1.6.') ? 'topic_1_7'
                : item.id.startsWith('2.1.') ? 'topic_2_1'
                  : item.id.startsWith('2.2.') ? 'topic_2_2'
                    : item.id.startsWith('2.3.') ? 'topic_2_3'
                      : item.id.startsWith('2.4.') ? 'topic_2_4'
                        : 'topic_2_5';
  return {
    id: `diagnostic_${item.id.replaceAll('.', '_')}`,
    topicId,
    specificationPointId: item.id,
    purpose: 'diagnostic',
    type: 'mcq',
    ...item.diagnostic
  };
});

const DB_KEY = 'studyspice_db';

const CHECKPOINT_RULES = {
  '1.1.1': { version: 1, minimumRatio: 0.8, requiredFocuses: ['cpu-component-roles', 'register-and-fetch-roles', 'control-unit-coordination'] },
  '1.1.2': { version: 1, minimumRatio: 0.8, requiredFocuses: ['multicore-limitations', 'cache-performance'] },
  '1.1.3': { version: 1, minimumRatio: 0.8, requiredFocuses: ['embedded-context', 'embedded-characteristics'] },
  '1.2.1': { version: 1, minimumRatio: 0.8, requiredFocuses: ['virtual-memory-use', 'ram-rom-properties'] },
  '1.2.2': { version: 1, minimumRatio: 0.8, requiredFocuses: ['storage-context-choice', 'storage-technology-characteristics'] },
  '1.2.3': { version: 1, minimumRatio: 0.8, requiredFocuses: ['bit-byte-conversion', 'storage-unit-order'] },
  '1.2.4a': { version: 1, minimumRatio: 0.8, requiredFocuses: ['binary-conversion', 'binary-manipulation', 'binary-overflow'] },
  '1.2.4b': { version: 1, minimumRatio: 0.8, requiredFocuses: ['character-set-capacity', 'character-encoding-range'] },
  '1.2.4d': { version: 1, minimumRatio: 0.8, requiredFocuses: ['sampling-frequency', 'sound-file-size'] },
  '1.2.5': { version: 1, minimumRatio: 0.8, requiredFocuses: ['lossless-context', 'compression-type'] },
  '1.3.1': { version: 1, minimumRatio: 0.8, requiredFocuses: ['router-role', 'lan-wan-scope'] },
  '1.3.2': { version: 1, minimumRatio: 0.8, requiredFocuses: ['protocol-purpose', 'layered-model', 'network-addressing'] },
  '1.4.1': { version: 1, minimumRatio: 0.8, requiredFocuses: ['password-attack', 'social-engineering', 'injection-attack'] },
  '1.4.2': { version: 1, minimumRatio: 0.8, requiredFocuses: ['vulnerability-testing', 'network-filtering'] },
  '1.5.1': { version: 1, minimumRatio: 0.8, requiredFocuses: ['resource-management', 'device-management'] },
  '1.6.1': { version: 1, minimumRatio: 0.8, requiredFocuses: ['electronic-waste', 'resource-extraction'] },
  '1.6.2': { version: 1, minimumRatio: 0.8, requiredFocuses: ['computer-misuse-law', 'data-protection-law'] },
  '2.1.2': { version: 1, minimumRatio: 0.8, requiredFocuses: ['trace-table-use', 'input-process-output', 'flowchart-representation'] },
  '2.1.3': { version: 1, minimumRatio: 0.8, requiredFocuses: ['binary-search', 'bubble-sort', 'merge-sort'] },
  '2.2.1': { version: 1, minimumRatio: 0.8, requiredFocuses: ['variables-and-constants', 'operators', 'control-structures'] },
  '2.2.3': { version: 1, minimumRatio: 0.8, requiredFocuses: ['string-operations', 'sql-querying', 'subprograms', 'two-dimensional-arrays'] },
  '2.2.ERL': { version: 1, minimumRatio: 0.8, requiredFocuses: ['language-separation', 'erl-control-structures', 'erl-string-operations'] },
  '2.3.1': { version: 1, minimumRatio: 0.8, requiredFocuses: ['authentication', 'input-validation'] },
  '2.3.2': { version: 1, minimumRatio: 0.8, requiredFocuses: ['test-data-selection', 'testing-process', 'error-types'] },
  '2.4.1': { version: 1, minimumRatio: 0.8, requiredFocuses: ['logic-gate-behaviour', 'boolean-expression-evaluation'] },
  '2.5.1': { version: 1, minimumRatio: 0.8, requiredFocuses: ['translator-purpose', 'compiler-interpreter', 'language-level'] },
  '2.5.2': { version: 1, minimumRatio: 0.8, requiredFocuses: ['error-diagnostics', 'ide-facilities'] }
};

const QUESTION_FOCUS_GROUPS = [
  ['register-and-fetch-roles', ['diagnostic_1_1_1', 'q_1_1_b', 'q_1', 'q_1_1_mdr']],
  ['control-unit-coordination', ['q_1_1_a']],
  ['cpu-component-roles', ['q_1_1_cpu_purpose', 'q_1_1_e']],
  ['multicore-limitations', ['diagnostic_1_1_2']],
  ['cache-performance', ['q_1_1_c', 'q_1_1_cache_performance']],
  ['embedded-context', ['diagnostic_1_1_3']],
  ['embedded-characteristics', ['q_1_1_d']],
  ['virtual-memory-use', ['diagnostic_1_2_1', 'q_1_2_virtual_memory']],
  ['ram-rom-properties', ['q_1_2_a', 'q_1_2_ram_rom_difference_alt', 'q_2', 'q_6']],
  ['storage-context-choice', ['diagnostic_1_2_2', 'q_1_2_b']],
  ['storage-technology-characteristics', ['q_1_2_c', 'q_1_2_e', 'q_3']],
  ['bit-byte-conversion', ['diagnostic_1_2_3']],
  ['storage-unit-order', ['q_1_2_d']],
  ['binary-conversion', ['diagnostic_1_2_4a', 'q_1_3_a']],
  ['binary-manipulation', ['q_1_3_b']],
  ['binary-overflow', ['q_1_3_binary_overflow']],
  ['character-set-capacity', ['diagnostic_1_2_4b']],
  ['character-encoding-range', ['q_1_3_unicode']],
  ['image-colour-depth', ['diagnostic_1_2_4c', 'q_1_3_image_size_effect']],
  ['sampling-frequency', ['diagnostic_1_2_4d', 'q_1_3_sampling_rate']],
  ['sound-file-size', ['q_1_3_c']],
  ['lossless-context', ['diagnostic_1_2_5']],
  ['compression-type', ['q_1_3_d']],
  ['router-role', ['diagnostic_1_3_1', 'q_1_4_a', 'q_1_4_router_role_alt']],
  ['lan-wan-scope', ['q_1_4_lan_wan']],
  ['protocol-purpose', ['diagnostic_1_3_2', 'q_1_4_d']],
  ['layered-model', ['q_1_4_b', 'q_1_4_layer_benefits']],
  ['network-addressing', ['q_1_4_c', 'q_4']],
  ['password-attack', ['diagnostic_1_4_1']],
  ['social-engineering', ['q_1_5_a']],
  ['injection-attack', ['q_1_5_b']],
  ['vulnerability-testing', ['diagnostic_1_4_2']],
  ['network-filtering', ['q_1_5_c', 'q_1_5_firewall_alt', 'q_1_5_d']],
  ['resource-management', ['diagnostic_1_5_1', 'q_1_6_multitasking', 'q_1_6_d']],
  ['device-management', ['q_1_6_a', 'q_1_6_b']],
  ['disk-defragmentation', ['diagnostic_1_5_2', 'q_1_6_c']],
  ['electronic-waste', ['diagnostic_1_6_1']],
  ['resource-extraction', ['q_1_7_c']],
  ['computer-misuse-law', ['diagnostic_1_6_2', 'q_1_7_a', 'q_1_7_b']],
  ['data-protection-law', ['q_1_7_data_protection_act', 'q_1_7_d']],
  ['abstraction', ['diagnostic_2_1_1', 'q_2_1_a']],
  ['trace-table-use', ['diagnostic_2_1_2', 'priority_212_2']],
  ['input-process-output', ['priority_212_1']],
  ['flowchart-representation', ['priority_212_3', 'q_2_1_e']],
  ['binary-search', ['diagnostic_2_1_3', 'q_2_1_b', 'q_5']],
  ['bubble-sort', ['q_2_1_c']],
  ['merge-sort', ['q_2_1_d']],
  ['operators', ['diagnostic_2_2_1', 'priority_221_2', 'q_2_2_c', 'q_2_2_d']],
  ['control-structures', ['priority_221_1', 'priority_221_3', 'q_2_2_b']],
  ['variables-and-constants', ['q_2_2_a']],
  ['data-types', ['diagnostic_2_2_2']],
  ['sql-querying', ['diagnostic_2_2_3', 'priority_223_2']],
  ['string-operations', ['priority_223_1']],
  ['subprograms', ['priority_223_3']],
  ['two-dimensional-arrays', ['priority_223_4']],
  ['practical-programming', ['diagnostic_2_2_PY']],
  ['language-separation', ['diagnostic_2_2_ERL']],
  ['erl-control-structures', ['priority_erl_1', 'priority_erl_2', 'priority_erl_3']],
  ['erl-string-operations', ['priority_erl_4']],
  ['authentication', ['diagnostic_2_3_1']],
  ['input-validation', ['q_2_3_a']],
  ['test-data-selection', ['diagnostic_2_3_2', 'q_2_3_c', 'q_2_3_d']],
  ['testing-process', ['priority_232_1', 'priority_232_3']],
  ['error-types', ['priority_232_2', 'q_2_3_b']],
  ['logic-gate-behaviour', ['diagnostic_2_4_1', 'q_2_4_e', 'q_2_4_a', 'q_2_4_b', 'q_2_4_d']],
  ['boolean-expression-evaluation', ['q_2_4_c']],
  ['translator-purpose', ['diagnostic_2_5_1']],
  ['compiler-interpreter', ['q_2_5_e', 'q_2_5_a', 'q_2_5_b']],
  ['language-level', ['q_2_5_c']],
  ['error-diagnostics', ['diagnostic_2_5_2']],
  ['ide-facilities', ['q_2_5_d']]
];

const QUESTION_ASSESSMENT_FOCUS = Object.fromEntries(
  QUESTION_FOCUS_GROUPS.flatMap(([focus, questionIds]) => questionIds.map(questionId => [questionId, focus]))
);

const defaultDatabase = {
  schemaVersion: 13,
  curriculumContent,
  theoryNotes: [
    {
      id: 'tn_1_1',
      topicId: 'topic_1_1',
      code: '1.1',
      paper: 'Paper 1',
      title: 'Systems Architecture',
      subtitle: 'CPU Architecture, Registers, Fetch-Decode-Execute Cycle & Embedded Systems',
      summary: 'Learn about the central processing unit: Von Neumann architecture, internal registers, performance factors, and embedded firmware.',
      specificationPoints: [
        '1.1.1 Architecture of the CPU: Purpose of CPU, ALU, CU, Cache, Registers (MAR, MDR, PC, ACC)',
        '1.1.2 CPU Performance: Clock speed, Cache size, Number of Cores',
        '1.1.3 Embedded Systems: Purpose and characteristics'
      ],
      sections: [
        {
          heading: '1. Architecture & Components of the CPU',
          content: `The <strong>Central Processing Unit (CPU)</strong> is the brain of the computer system. Its primary purpose is to fetch, decode, and execute instructions.<br><br>
          <strong>Core Components:</strong>
          <ul>
            <li><strong>Control Unit (CU):</strong> Manages the execution of instructions by sending timing and control signals to other CPU components. It decodes instructions and controls the FDE cycle flow.</li>
            <li><strong>Arithmetic Logic Unit (ALU):</strong> Performs all arithmetic calculations (e.g. addition, subtraction) and logical comparisons (e.g. AND, OR, equal to, greater than).</li>
            <li><strong>Cache Memory:</strong> Extremely fast, small static RAM (SRAM) memory located directly on or near the CPU die. It stores frequently used instructions and data to avoid slow trips to main RAM.</li>
          </ul>`,
          workedExample: `<strong>CPU Registers Breakdown:</strong><br>
          • <strong>Program Counter (PC):</strong> Holds the memory address of the <em>NEXT</em> instruction to be fetched.<br>
          • <strong>Memory Address Register (MAR):</strong> Holds the RAM memory address currently being read from or written to.<br>
          • <strong>Memory Data Register (MDR):</strong> Holds the actual data or instruction fetched from RAM, or data waiting to be written to RAM.<br>
          • <strong>Accumulator (ACC):</strong> Temporarily holds the mathematical result of calculations performed by the ALU.`,
          examinerTip: 'Examiner Warning: Do not confuse MAR and MDR! MAR holds the ADDRESS (location); MDR holds the DATA/INSTRUCTION (content).'
        },
        {
          heading: '2. The Fetch-Decode-Execute (FDE) Cycle',
          content: `Every instruction processed by the CPU goes through three continuous phases:
          <ol>
            <li><strong>FETCH:</strong> The memory address in the <strong>PC</strong> is copied to the <strong>MAR</strong>. The CPU fetches the instruction stored at that MAR address in RAM and places it into the <strong>MDR</strong>. The <strong>PC</strong> is incremented by 1 to point to the next instruction.</li>
            <li><strong>DECODE:</strong> The <strong>Control Unit (CU)</strong> decodes the instruction in the MDR to determine what operation needs to be performed (opcode) and what data to use (operand).</li>
            <li><strong>EXECUTE:</strong> The instruction is carried out. For arithmetic or logic, the <strong>ALU</strong> performs the calculation and stores the output in the <strong>Accumulator (ACC)</strong> or writes it back to RAM via MAR/MDR.</li>
          </ol>`,
          workedExample: `<strong>Step-by-Step FDE Execution Example:</strong><br>
          1. <em>PC = 0100</em> $\\rightarrow$ MAR receives 0100.<br>
          2. RAM at 0100 returns instruction <code>ADD #5</code> $\\rightarrow$ MDR receives <code>ADD #5</code>.<br>
          3. PC increments to <em>0101</em>.<br>
          4. CU decodes <code>ADD #5</code> $\\rightarrow$ ALU adds 5 to current Accumulator value (e.g. $10 + 5 = 15$).<br>
          5. ACC now holds <em>15</em>.`,
          examinerTip: 'In 4-mark exam questions on the FDE cycle, make sure to explicitly state that the PC increments during the Fetch stage!'
        },
        {
          heading: '3. Factors Affecting CPU Performance',
          content: `Three hardware variables determine how fast a CPU can process instructions:
          <ul>
            <li><strong>Clock Speed:</strong> Measured in Hertz (Hz) or Gigahertz (GHz). It represents the number of FDE cycles the CPU can execute per second. A 3.5 GHz CPU performs 3.5 billion cycles per second.</li>
            <li><strong>Cache Size & Levels:</strong> Larger cache allows more instructions to be retrieved in nanoseconds without waiting for RAM. <strong>L1 Cache</strong> is fastest but smallest; <strong>L3 Cache</strong> is larger but slightly slower.</li>
            <li><strong>Number of Cores:</strong> A core is an independent processing unit containing its own ALU, CU, and registers. Dual-core CPUs have 2 cores; Quad-core CPUs have 4 cores.</li>
          </ul>`,
          workedExample: `<strong>Why doubling cores doesn't always double speed:</strong><br>
          If a software program is sequential (e.g. Step B requires the result of Step A), it cannot be split across multiple cores. Extra cores only boost speed when software supports <em>parallel processing</em> or multi-tasking.`,
          examinerTip: 'Always mention that higher clock speeds generate more heat and consume more power!'
        },
        {
          heading: '4. Embedded Systems',
          content: `An <strong>embedded system</strong> is a dedicated computer system built inside a larger mechanical or electrical hardware device to perform one specific task.<br><br>
          <strong>Key Characteristics:</strong>
          <ul>
            <li>Fixed function (cannot install new general-purpose software like a PC).</li>
            <li>Firmware usually stored on ROM or Flash memory.</li>
            <li>Low energy consumption, high reliability, and low unit cost.</li>
            <li>Examples: Dishwashers, Microwave ovens, Car ABS braking systems, Digital watches, Traffic lights.</li>
          </ul>`,
          workedExample: `<strong>Embedded vs General Purpose Systems:</strong><br>
          • <em>Laptop / Smartphone:</em> General purpose (runs games, web browsers, spreadsheets).<br>
          • <em>Washing Machine Controller:</em> Embedded system (monitors water level, controls drum speed).`,
          examinerTip: 'Do not give desktop PCs, laptops, or tablets as examples of embedded systems on exams!'
        }
      ],
      keyTerms: ['CPU', 'ALU', 'CU', 'Cache', 'MAR', 'MDR', 'Program Counter', 'Accumulator', 'FDE Cycle', 'Clock Speed', 'Cores', 'Embedded System'],
      examTraps: [
        'Confusing MAR (Memory Address Register) with MDR (Memory Data Register). Remember: MAR = Address, MDR = Data.',
        'Claiming 4 cores makes a computer 4x faster in all situations. Extra cores only help if software supports parallel processing.'
      ]
    },
    {
      id: 'tn_1_2',
      topicId: 'topic_1_2',
      code: '1.2',
      paper: 'Paper 1',
      title: 'Memory and Storage',
      subtitle: 'Primary Memory (RAM/ROM), Virtual Memory & Secondary Storage Technologies',
      summary: 'Understand the difference between volatile primary memory and non-volatile secondary storage technologies.',
      specificationPoints: [
        '1.2.1 Primary Storage: RAM, ROM, Volatility, Virtual Memory',
        '1.2.2 Secondary Storage: Magnetic, Optical, Solid State technologies (Capacity, Speed, Portability, Durability, Reliability, Cost)'
      ],
      sections: [
        {
          heading: '1. Primary Storage: RAM vs ROM',
          content: `Primary storage directly interacts with the CPU.
          <table class="table" style="width:100%; border-collapse:collapse; margin: 12px 0;">
            <thead>
              <tr style="border-bottom: 2px solid var(--border-color); text-align:left;">
                <th style="padding: 8px;">Feature</th>
                <th style="padding: 8px;">RAM (Random Access Memory)</th>
                <th style="padding: 8px;">ROM (Read Only Memory)</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 8px;"><strong>Volatility</strong></td>
                <td style="padding: 8px;">Volatile (loses contents when power is turned off)</td>
                <td style="padding: 8px;">Non-Volatile (retains contents permanently)</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 8px;"><strong>Access Rights</strong></td>
                <td style="padding: 8px;">Read and Write</td>
                <td style="padding: 8px;">Read-Only</td>
              </tr>
              <tr>
                <td style="padding: 8px;"><strong>Purpose</strong></td>
                <td style="padding: 8px;">Stores open programs, OS files, and active data currently in use</td>
                <td style="padding: 8px;">Stores BIOS / UEFI startup bootloader instructions</td>
              </tr>
            </tbody>
          </table>`,
          workedExample: `<strong>Why is RAM needed?</strong><br>
          Secondary storage (e.g. SSD/HDD) is too slow for the CPU to fetch instructions directly. RAM acts as a high-speed workspace operating at gigabytes per second.`,
          examinerTip: 'Always use the word "volatile" or "non-volatile" explicitly when describing RAM vs ROM.'
        },
        {
          heading: '2. Virtual Memory',
          content: `When RAM becomes full (e.g. running 15 heavy browser tabs and video editor simultaneously), the operating system allocates a portion of secondary storage (hard drive/SSD) to act as <strong>Virtual Memory</strong>.<br><br>
          <strong>How Virtual Memory Works:</strong>
          <ul>
            <li>Inactive memory blocks (pages) are moved from RAM to Virtual Memory on the disk.</li>
            <li>When those pages are needed again, they are swapped back into RAM.</li>
          </ul>`,
          workedExample: `<strong>Disadvantage of Virtual Memory (Disk Thrashing):</strong><br>
          Secondary storage is significantly slower than RAM. Constant swapping of data between RAM and Virtual Memory causes severe system slowdown known as <em>disk thrashing</em>.`,
          examinerTip: 'Virtual memory is a temporary fallback when RAM is full, NOT a replacement for physical RAM.'
        },
        {
          heading: '3. Secondary Storage Technologies',
          content: `Secondary storage is <strong>non-volatile</strong> memory used to permanently store files, programs, and operating systems.<br><br>
          <strong>Three Main Media Types:</strong>
          <ul>
            <li><strong>Magnetic Storage (e.g. HDD, Magnetic Tape):</strong> Uses spinning magnetic platters and read/write heads. <em>Pros:</em> Very high capacity, lowest cost per GB. <em>Cons:</em> Slow read/write speeds, damaged by drops or magnetic fields.</li>
            <li><strong>Optical Storage (e.g. CD, DVD, Blu-Ray):</strong> Uses lasers to read/write pits and lands on reflective discs. <em>Pros:</em> Extremely portable, low cost per disc. <em>Cons:</em> Very low capacity (CD 700MB, DVD 4.7GB, Blu-ray 25GB), easily scratched.</li>
            <li><strong>Solid State Storage (e.g. SSD, USB Flash Drives, SD cards):</strong> Uses flash memory transistors (floating-gate MOSFETs) with zero moving parts. <em>Pros:</em> Extremely fast, durable, silent, power-efficient. <em>Cons:</em> More expensive per GB than HDDs.</li>
          </ul>`,
          workedExample: `<strong>Exam Comparison Matrix (6 Characteristics):</strong><br>
          1. <em>Capacity:</em> HDD > SSD > Optical<br>
          2. <em>Speed:</em> SSD >> HDD > Optical<br>
          3. <em>Portability:</em> USB/SD/Optical > SSD > HDD<br>
          4. <em>Durability:</em> SSD > HDD > Optical<br>
          5. <em>Reliability:</em> SSD > HDD > Optical<br>
          6. <em>Cost per GB:</em> Optical < HDD < SSD`,
          examinerTip: 'When asked to recommend storage for a specific scenario (e.g. GoPro action camera), justify using key metrics: SSD/SD card due to durability (no moving parts) and portability.'
        }
      ],
      keyTerms: ['RAM', 'ROM', 'Volatile', 'Non-Volatile', 'Virtual Memory', 'Secondary Storage', 'Magnetic Storage', 'Optical Storage', 'Solid State Storage', 'Durability', 'Portability'],
      examTraps: [
        'Writing that ROM stores personal files or photos. Personal files are saved to secondary storage (SSD/HDD), not ROM!',
        'Thinking Virtual Memory increases physical RAM capacity. It only uses secondary storage space as temporary overflow.'
      ]
    },
    {
      id: 'tn_1_3',
      topicId: 'topic_1_3',
      code: '1.3',
      paper: 'Paper 1',
      title: 'Data Representation',
      subtitle: 'Binary, Hexadecimal, Binary Arithmetic, Characters, Images, Sound & Compression',
      summary: 'Learn how numbers, text, images, and audio are encoded into binary digits (bits) and compressed.',
      specificationPoints: [
        '1.2.3 Units of Data: bit, nibble, byte, KB, MB, GB, TB, PB',
        '1.2.4a Data Storage - Numbers: Binary, Denary, Hexadecimal, Binary Addition, Logical Shifts',
        '1.2.4b Data Storage - Characters: Character sets (ASCII, Unicode)',
        '1.2.4c Data Storage - Images: Bitmap, Pixels, Resolution, Colour Depth, Metadata',
        '1.2.4d Data Storage - Sound: Sampling rate, Bit depth, Sample interval',
        '1.2.5 Compression: Lossy vs Lossless compression'
      ],
      sections: [
        {
          heading: '1. Units of Data & Number Conversions',
          content: `All computer data is represented in binary (0s and 1s).<br>
          <strong>Data Units Hierarchy:</strong><br>
          Bit (b) $\\rightarrow$ Nibble (4 bits) $\\rightarrow$ Byte (8 bits) $\\rightarrow$ Kilobyte (1,000 Bytes / 1 KiB = 1,024 B) $\\rightarrow$ Megabyte (1,000 KB) $\\rightarrow$ Gigabyte (1,000 MB) $\\rightarrow$ Terabyte (1,000 GB).<br><br>
          <strong>Base Number Systems:</strong>
          <ul>
            <li><strong>Denary (Base 10):</strong> Uses digits 0-9.</li>
            <li><strong>Binary (Base 2):</strong> Uses digits 0 and 1. Place values: 128, 64, 32, 16, 8, 4, 2, 1.</li>
            <li><strong>Hexadecimal (Base 16):</strong> Uses digits 0-9 and A=10, B=11, C=12, D=13, E=14, F=15. One hex digit represents 4 binary bits (1 nibble).</li>
          </ul>`,
          workedExample: `<strong>Converting 1B (Hex) to Denary:</strong><br>
          • Split hex digits: <code>1</code> and <code>B</code> (B = 11).<br>
          • Formula: $(1 \\times 16) + (11 \\times 1) = 16 + 11 = 27$ in denary.<br>
          • In 8-bit binary: <code>0001 1011</code>.`,
          examinerTip: 'Why use Hexadecimal? Hex is shorter and easier for humans to read and remember than long binary strings (e.g. RGB color codes #FF0000), reducing transcription errors.'
        },
        {
          heading: '2. Binary Addition & Logical Binary Shifts',
          content: `<strong>Binary Addition Rules:</strong><br>
          $0 + 0 = 0$<br>
          $0 + 1 = 1$<br>
          $1 + 1 = 0 \\text{ (carry 1)}$<br>
          $1 + 1 + 1 = 1 \\text{ (carry 1)}$<br><br>
          <strong>Overflow Error:</strong> Occurs when the sum of two 8-bit numbers requires 9 bits (exceeds 255). The CPU drops or flags the 9th bit, causing incorrect mathematical results.<br><br>
          <strong>Logical Binary Shifts:</strong>
          <ul>
            <li><strong>Left shift by $n$ places:</strong> Moves bits left by $n$ places, filling empty right positions with 0s. Multiplies the unsigned value by $2^n$.</li>
            <li><strong>Right shift by $n$ places:</strong> Moves bits right by $n$ places. Divides the unsigned value by $2^n$ (truncating remainder).</li>
          </ul>`,
          workedExample: `<strong>Left Shift Example:</strong><br>
          Binary <code>0000 0110</code> (Denary 6).<br>
          Left shift by 2 places: <code>0001 1000</code>.<br>
          New denary value: $16 + 8 = 24$ ($6 \\times 2^2 = 24$).`,
          examinerTip: 'Make sure to explicitly write down carry bits above columns during binary addition in exam papers!'
        },
        {
          heading: '3. Character Sets: ASCII vs Unicode',
          content: `A <strong>character set</strong> is a defined collection of characters and symbols mapped to unique binary codes.<br><br>
          <ul>
            <li><strong>ASCII (American Standard Code for Information Interchange):</strong> Uses 7 bits per character (128 unique characters) or 8 bits in Extended ASCII (256 characters). <em>Limitation:</em> Only covers English alphabet, basic numbers, and symbols.</li>
            <li><strong>Unicode:</strong> Uses 16-bit to 32-bit encodings (over 1.1 million unique characters). <em>Advantage:</em> Represents characters from all global languages (Chinese, Arabic, Cyrillic), emojis, and technical symbols. <em>Disadvantage:</em> Requires more storage space per character (2-4 bytes vs 1 byte).</li>
          </ul>`,
          workedExample: `If 'A' is ASCII code 65 (binary <code>01000001</code>), then 'B' is 66 (<code>01000010</code>) and 'a' is 97 (<code>01100001</code>).`,
          examinerTip: 'Remember that Unicode is backwards compatible with ASCII for the first 128 character codes.'
        },
        {
          heading: '4. Image & Sound Representation',
          content: `<strong>Bitmap Images:</strong> Made of a grid of pixels.<br>
          • <strong>Resolution:</strong> Total number of pixels ($\text{width} \\times \\text{height}$).<br>
          • <strong>Colour Depth:</strong> Number of bits allocated per pixel ($n$ bits = $2^n$ unique colours).<br>
          • <strong>Metadata:</strong> Information stored in the image file describing width, height, colour depth, camera model, and date.<br>
          • <strong>Image File Size Formula:</strong> $\\text{Width} \\times \\text{Height} \\times \\text{Colour Depth (in bits)}$<br><br>
          <strong>Sound Representation:</strong> Continuous analogue sound waves sampled at fixed intervals.<br>
          • <strong>Sample Rate:</strong> Number of samples taken per second (measured in Hertz / Hz).<br>
          • <strong>Bit Depth / Sample Resolution:</strong> Number of bits allocated per sample.<br>
          • <strong>Sound File Size Formula:</strong> $\\text{Sample Rate (Hz)} \\times \\text{Bit Depth} \\times \\text{Duration (seconds)}$`,
          workedExample: `<strong>Calculate Image File Size in Bytes:</strong><br>
          Image width = 800 px, height = 600 px, colour depth = 16 bits.<br>
          1. Total bits = $800 \\times 600 \\times 16 = 7,680,000$ bits.<br>
          2. Convert to Bytes: $7,680,000 \\div 8 = 960,000$ Bytes ($\approx 960$ KB).`,
          examinerTip: 'Always check what unit the question asks for! If it asks for Bytes, divide total bits by 8.'
        },
        {
          heading: '5. Data Compression',
          content: `Compression reduces file size to save storage space and increase transfer speeds across networks.<br><br>
          <ul>
            <li><strong>Lossy Compression (e.g. JPEG, MP3, MP4):</strong> Permanently removes unnoticeable or high-frequency data. <em>Pros:</em> Drastic reduction in file size. <em>Cons:</em> Original quality cannot be restored.</li>
            <li><strong>Lossless Compression (e.g. PNG, ZIP, FLAC, RLE):</strong> Reduces file size by encoding patterns without losing any original data. <em>Pros:</em> Original file is perfectly restored when decompressed. <em>Cons:</em> Smaller file size reduction compared to lossy.</li>
          </ul>`,
          workedExample: `<strong>Where Lossless is Mandatory:</strong><br>
          Executable software programs (<code>.exe</code>), database files, and text documents MUST use lossless compression. Removing even a single byte from executable code would break the program!`,
          examinerTip: 'Do not just say "lossy loses quality". Specify that it *permanently removes data*.'
        }
      ],
      keyTerms: ['Bit', 'Nibble', 'Byte', 'Binary', 'Hexadecimal', 'Overflow', 'Binary Shift', 'ASCII', 'Unicode', 'Resolution', 'Colour Depth', 'Metadata', 'Sample Rate', 'Lossy Compression', 'Lossless Compression'],
      examTraps: [
        'Forgetting to divide by 8 when an exam question asks for file size in Bytes rather than bits.',
        'Assuming lossy compression can be used on text or python script files. Lossy ruins text and code!'
      ]
    },
    {
      id: 'tn_1_4',
      topicId: 'topic_1_4',
      code: '1.4',
      paper: 'Paper 1',
      title: 'Computer Networks, Connections & Protocols',
      subtitle: 'Topologies, hardware, client-server vs peer-to-peer, protocol layering and DNS',
      summary: 'Explore network structures, hardware devices, wireless protocols, and how data travels across the internet.',
      specificationPoints: [
        '1.3.1 Networks and Topologies: LAN vs WAN, Star & Mesh topologies, Routers, Switches, NICs, Wireless Encryption',
        '1.3.2 Protocols and Layers: HTTP/S, FTP, POP, IMAP, SMTP, benefits of protocol layers, DNS lookup process'
      ],
      sections: [
        {
          heading: '1. LAN vs WAN & Network Topologies',
          content: `<strong>LAN (Local Area Network):</strong> Covers a small geographical site (e.g. school, house, office). Infrastructure is owned and maintained by the organization.<br>
          <strong>WAN (Wide Area Network):</strong> Covers a large geographical area (e.g. the Internet connecting global cities). Relies on leased telecommunication infrastructure.<br><br>
          <strong>Network Topologies:</strong>
          <ul>
            <li><strong>Star Topology:</strong> All devices connect to a central switch or hub. <em>Pros:</em> If one cable fails, only that device is disconnected; easy to add new nodes. <em>Cons:</em> If the central switch fails, the entire network drops.</li>
            <li><strong>Mesh Topology:</strong> Every node connects to multiple other nodes (Full vs Partial Mesh). <em>Pros:</em> Highly resilient (packets reroute if a node drops). <em>Cons:</em> High cabling cost and complex setup.</li>
          </ul>`,
          workedExample: `Star topology is the standard topology for school computer labs because isolating cable faults is easy and network traffic is efficiently directed by switches.`,
          examinerTip: 'Remember that switches inspect MAC addresses to send data only to the specific target node in a Star topology.'
        },
        {
          heading: '2. Network Hardware & Wireless Encryption',
          content: `<strong>Core Network Hardware:</strong>
          <ul>
            <li><strong>Network Interface Card (NIC):</strong> Internal hardware component giving a device a unique physical <strong>MAC address</strong> to connect to a network.</li>
            <li><strong>Switch:</strong> Connects devices on a LAN. Inspects packet MAC addresses to forward data only to the intended destination node.</li>
            <li><strong>Router:</strong> Connects different networks together (e.g. connects a home LAN to the ISP WAN internet). Inspects <strong>IP addresses</strong> to route packets.</li>
            <li><strong>Wireless Access Point (WAP):</strong> Uses radio waves to allow wireless-enabled devices to connect to a wired network.</li>
          </ul>
          <strong>Wireless Encryption (WPA2 / WPA3):</strong> Scrambles data transmitted over radio waves so it can only be decoded by devices holding the network security key.`,
          workedExample: `<strong>MAC Address vs IP Address:</strong><br>
          • <em>MAC Address:</em> Assigned to a network interface and commonly represented as hexadecimal pairs (e.g. <code>00:1A:2B:3C:4D:5E</code>). Used to identify an interface within a network.<br>
          • <em>IP Address:</em> Assigned dynamically by network router (e.g. IPv4 <code>192.168.1.15</code>). Logical address used for routing across global WAN networks.`,
          examinerTip: 'Switches operate on MAC addresses inside a LAN; Routers operate on IP addresses across networks!'
        },
        {
          heading: '3. Application Protocols & DNS Lookup',
          content: `A <strong>protocol</strong> is an agreed set of rules governing communication between network devices.<br><br>
          <strong>Common Protocols:</strong>
          <ul>
            <li><strong>HTTP / HTTPS:</strong> Web page retrieval (HTTPS encrypts web traffic using SSL/TLS).</li>
            <li><strong>FTP:</strong> File Transfer Protocol for uploading/downloading files.</li>
            <li><strong>SMTP:</strong> Simple Mail Transfer Protocol used to <em>send</em> emails to a server.</li>
            <li><strong>POP3:</strong> Downloads email from server to client device and <em>deletes</em> it from the server.</li>
            <li><strong>IMAP:</strong> Syncs email with server, keeping copies so emails can be read across multiple devices.</li>
          </ul>
          <strong>DNS (Domain Name System) Lookup Steps:</strong>
          <ol>
            <li>User enters domain name URL (e.g. <code>studyspice.co.uk</code>) in browser.</li>
            <li>Browser queries DNS server for the IP address matching that domain.</li>
            <li>DNS server looks up domain in its database and returns IP address (e.g. <code>185.199.108.153</code>).</li>
            <li>Browser sends HTTP request directly to that IP address.</li>
          </ol>`,
          workedExample: `If the DNS server does not have the domain IP cached, it queries higher-level TLD (Top-Level Domain) root servers until the IP address is found.`,
          examinerTip: 'In 4-mark DNS questions, clearly separate domain names (human readable) from IP addresses (numerical machine routing).'
        },
        {
          heading: '4. Why protocols use layers',
          content: `Protocol layers divide a complex communication process into manageable responsibilities. Each layer provides a service to the layer above and uses a service from the layer below. This separation allows one part to be developed, tested or replaced without redesigning the whole system, encourages interoperability and makes faults easier to locate. OCR J277 does not require the names or functions of individual TCP/IP layers.`,
          workedExample: `<strong>Benefits of Layering:</strong><br>
          Layering separates complex networking into self-contained modules. Developers can change Layer 1 (e.g. upgrade Wi-Fi hardware) without needing to rewrite Layer 4 web browser software!`,
          examinerTip: 'Explain the benefits of layering; do not spend revision time memorising individual TCP/IP layer names or functions.'
        }
      ],
      keyTerms: ['LAN', 'WAN', 'Star Topology', 'Mesh Topology', 'Router', 'Switch', 'NIC', 'MAC Address', 'IP Address', 'DNS', 'HTTP', 'HTTPS', 'protocol', 'layer'],
      examTraps: [
        'Confusing POP3 and IMAP. POP3 deletes emails from server after downloading; IMAP syncs emails across devices.',
        'Confusing Routers and Switches. Switches operate on MAC addresses within a LAN; Routers operate on IP addresses between networks.'
      ]
    },
    {
      id: 'tn_1_5',
      topicId: 'topic_1_5',
      code: '1.5',
      paper: 'Paper 1',
      title: 'Network Security',
      subtitle: 'Cyber Security Threats & Defensive Prevention Technologies',
      summary: 'Learn to identify digital vulnerabilities, social engineering tactics, malware, and technical counter-measures.',
      specificationPoints: [
        '1.4.1 Threats to computer systems and networks: Malware, Phishing, Social engineering, Brute force, DDoS, SQL injection',
        '1.4.2 Identifying and preventing vulnerabilities: Firewalls, Encryption, Passwords, Penetration testing, User access levels'
      ],
      sections: [
        {
          heading: '1. Threats to Computer Systems & Networks',
          content: `Cyber attacks exploit technical or human vulnerabilities to compromise data confidentiality, integrity, or availability.<br><br>
          <strong>Major Cyber Security Threats:</strong>
          <ul>
            <li><strong>Malware (Malicious Software):</strong>
              <ul>
                <li><em>Virus:</em> Program attached to files that replicates when opened.</li>
                <li><em>Worm:</em> Self-replicating program that spreads independently across networks.</li>
                <li><em>Trojans:</em> Malware disguised as legitimate software.</li>
                <li><em>Ransomware:</em> Encrypts victim files and demands payment for the decryption key.</li>
                <li><em>Spyware / Keyloggers:</em> Secretly records user keystrokes to steal passwords.</li>
              </ul>
            </li>
            <li><strong>Phishing:</strong> Deceptive emails or fraudulent links pretending to be trusted institutions to trick users into revealing sensitive credentials.</li>
            <li><strong>Social Engineering:</strong> Manipulating people into breaking security procedures (e.g. <em>Shoulder Surfing</em>, <em>Pretexting</em>).</li>
            <li><strong>Brute Force Attack:</strong> Automated software testing thousands of password combinations until the correct one is found.</li>
            <li><strong>DDoS (Distributed Denial of Service):</strong> Flooding a web server with artificial traffic from a network of infected devices (botnet) to crash the server.</li>
            <li><strong>SQL Injection:</strong> Inserting malicious SQL database code into an unsecured web form field to view, alter, or delete database tables.</li>
          </ul>`,
          workedExample: `<strong>SQL Injection Example:</strong><br>
          Entering <code>' OR '1'='1</code> into an unsecured login text box can force the database query to evaluate to TRUE, granting unauthorized admin access without a password!`,
          examinerTip: 'Parameterised queries are the main defence against SQL injection because input is treated as data rather than as part of an SQL instruction. Validation and sanitisation may provide additional input checks.'
        },
        {
          heading: '2. Defensive Prevention Methods',
          content: `Organisations use layered technical and administrative controls to protect networks:<br><br>
          <ul>
            <li><strong>Firewall:</strong> Software or hardware that monitors incoming and outgoing network traffic, blocking unauthorized packets based on strict rules.</li>
            <li><strong>Encryption:</strong> Scrambling plain text data into unreadable ciphertext using an algorithm. Data can only be decrypted using the corresponding decryption key.</li>
            <li><strong>Penetration Testing (Pen Testing):</strong> Authorized ethical hackers intentionally attempting to breach a network to identify and patch security holes before criminal hackers exploit them.</li>
            <li><strong>User Access Levels:</strong> Restricting file access permissions based on employee roles (e.g. students have read-only access to homework drives; teachers have write access).</li>
            <li><strong>Strong Passwords & 2FA:</strong> Multi-factor authentication requiring two verification steps (e.g. password + SMS/authenticator code).</li>
            <li><strong>Anti-Malware & Software Patching:</strong> Scanning files against known virus signatures and updating software to fix security bugs.</li>
          </ul>`,
          workedExample: `<strong>How Firewalls Protect Networks:</strong><br>
          A firewall inspects packet headers (source IP, destination port). If a packet attempts to access blocked port 21 (FTP) from an unknown external IP, the firewall drops the packet.`,
          examinerTip: 'In security answers, match each threat to a suitable prevention. Parameterised queries are the main defence against SQL injection because input is treated as data, not as part of an SQL instruction. Validation and sanitisation can add further input checks.'
        }
      ],
      keyTerms: ['Malware', 'Phishing', 'Social Engineering', 'Brute Force Attack', 'DDoS', 'SQL Injection', 'Firewall', 'Encryption', 'Penetration Testing', 'User Access Levels', '2FA'],
      examTraps: [
        'Confusing Phishing with Pharming. Phishing uses fake emails/messages; Pharming redirects website traffic to fake sites via DNS poisoning.',
        'Thinking a firewall stops viruses inside an opened email attachment. Firewalls filter network traffic packets; anti-virus software scans files.'
      ]
    },
    {
      id: 'tn_1_6',
      topicId: 'topic_1_6',
      code: '1.6',
      paper: 'Paper 1',
      title: 'Systems Software',
      subtitle: 'Operating System Functions & Utility Software Tools',
      summary: 'Understand how operating systems manage hardware resources and how utility programs optimize computer performance.',
      specificationPoints: [
        '1.5.1 Operating Systems: User interface, Memory management & multitasking, Peripheral management & drivers, File and user management',
        '1.5.2 Utility Software: Purpose of utility software (Defragmentation, Backup, Encryption, Compression)'
      ],
      sections: [
        {
          heading: '1. Operating System (OS) Core Functions',
          content: `The <strong>Operating System</strong> is system software that manages hardware components, provides an interface for users, and provides a platform for application software to run.<br><br>
          <strong>5 Key OS Functions:</strong>
          <ol>
            <li><strong>User Interface (UI):</strong> Provides a way for humans to interact with the computer.
              <ul>
                <li><em>GUI (Graphical User Interface):</em> Visual WIMP interface (Windows, Icons, Menus, Pointer). Easy for non-technical users.</li>
                <li><em>CLI (Command Line Interface):</em> Text-based interface. Fast, resource-light, powerful for advanced administrators.</li>
              </ul>
            </li>
            <li><strong>Memory Management & Multitasking:</strong> Allocates RAM blocks to active applications. Enables multitasking by allocating CPU time slices to processes using scheduling algorithms.</li>
            <li><strong>Peripheral Management & Drivers:</strong> Uses <em>device drivers</em> (translator software) allowing the OS to communicate with hardware peripherals (printers, keyboards, graphics cards).</li>
            <li><strong>File Management:</strong> Organizes files into hierarchical folder directory structures; manages file access permissions (Read/Write/Execute).</li>
            <li><strong>User Management:</strong> Handles user authentication (logins, passwords), user account privileges, and audit logging.</li>
          </ol>`,
          workedExample: `<strong>What is a Device Driver?</strong><br>
          A driver acts as a translator between the operating system and hardware. If you plug in a new printer, the OS uses the printer driver to convert generic print commands into the specific control signals required by that printer model.`,
          examinerTip: 'Always mention device drivers when asked how the OS manages peripherals!'
        },
        {
          heading: '2. Utility Software',
          content: `<strong>Utility software</strong> comprises specialized maintenance programs that help maintain, optimize, and configure a computer system.<br><br>
          <strong>Key Utility Tools:</strong>
          <ul>
            <li><strong>Defragmentation Software:</strong> Reorganizes fragmented file clusters on a magnetic Hard Disk Drive (HDD) so related file sectors are stored contiguously. <em>Benefit:</em> Reduces read/write head movement, speeding up file access times.</li>
            <li><strong>Backup Utilities:</strong> Creates duplicate copies of files to protect against data loss.
              <ul>
                <li><em>Full Backup:</em> Copies every single file on the system. Takes long to run, but quick to restore.</li>
                <li><em>Incremental Backup:</em> Copies only files modified since the last backup. Fast to run, but slower to restore.</li>
              </ul>
            </li>
            <li><strong>Encryption Utilities:</strong> Scrambles stored files on disk using encryption keys to prevent unauthorized access if the device is stolen.</li>
            <li><strong>Compression Utilities:</strong> Compresses file sizes to save disk space (e.g. creating <code>.zip</code> archives).</li>
          </ul>`,
          workedExample: `<strong>Why SSDs should NOT be defragmented:</strong><br>
          Solid State Drives (SSDs) have no moving read/write heads, so fragmentation does not slow them down. Defragmenting an SSD causes unnecessary write cycles, wearing out the flash memory transistors early!`,
          examinerTip: 'Examiner Trap: Defragmentation is ONLY useful for magnetic HDDs, NOT optical discs or SSDs!'
        }
      ],
      keyTerms: ['Operating System', 'GUI', 'CLI', 'Memory Management', 'Multitasking', 'Device Driver', 'File Management', 'User Management', 'Defragmentation', 'Full Backup', 'Incremental Backup'],
      examTraps: [
        'Stating that defragmentation creates extra free storage space. Defragmentation only reorganizes existing files into contiguous blocks; it does NOT delete data to increase free space!',
        'Recommending defragmentation for Solid State Drives (SSDs).'
      ]
    },
    {
      id: 'tn_1_7',
      topicId: 'topic_1_7',
      code: '1.7',
      paper: 'Paper 1',
      title: 'Ethical, Legal, Cultural & Environmental Impacts',
      subtitle: 'UK Computer Legislation, Licensing Models, E-Waste & Digital Privacy',
      summary: 'Evaluate the broader societal impacts of technology, UK computer laws, open-source licensing, and environmental footprints.',
      specificationPoints: [
        '1.6.1 Ethical, legal, cultural and environmental impact of technology',
        '1.6.2 Legislation: Data Protection Act 2018 (GDPR), Computer Misuse Act 1990, Copyright Designs and Patents Act 1988, Software licences (Open-source vs Proprietary)'
      ],
      sections: [
        {
          heading: '1. UK Computer Legislation',
          content: `Technology is governed by three primary UK acts of parliament:<br><br>
          <ul>
            <li><strong>Data Protection Act 2018 (incorporating UK GDPR):</strong> Regulates how organizations collect, store, and process personal data.<br>
            <em>Core Principles:</em> Data must be processed lawfully and fairly, used for specified explicit purposes, accurate and up-to-date, kept no longer than necessary, and secured against unauthorized access.</li>
            <li><strong>Computer Misuse Act 1990:</strong> Criminalises unauthorized access to computer systems.<br>
            <em>3 Primary Offences:</em>
            <ol>
              <li>Unauthorized access to computer material (e.g. guessing a friend's password).</li>
              <li>Unauthorized access with intent to commit a further crime (e.g. hacking into a bank system to steal money).</li>
              <li>Unauthorized modification of computer material (e.g. spreading viruses, deleting files, or launching DDoS attacks).</li>
            </ol>
            </li>
            <li><strong>Copyright, Designs and Patents Act 1988:</strong> Protects intellectual property (software code, music, images, videos) from unauthorized copying, modification, or distribution.</li>
          </ul>`,
          workedExample: `<strong>Applying Legislation in Exam Scenarios:</strong><br>
          If an employee accesses and downloads customer credit card records without permission, the unauthorised access may be an offence under the <em>Computer Misuse Act 1990</em>. The organisation's handling and security of that personal data may also raise issues under the <em>Data Protection Act 2018</em>.`,
          examinerTip: 'Always name the exact law in 6-8 mark essay questions (e.g. "Computer Misuse Act 1990", not just "hacking law").'
        },
        {
          heading: '2. Software Licensing: Open-Source vs Proprietary',
          content: `<table class="table" style="width:100%; border-collapse:collapse; margin: 12px 0;">
            <thead>
              <tr style="border-bottom: 2px solid var(--border-color); text-align:left;">
                <th style="padding: 8px;">Feature</th>
                <th style="padding: 8px;">Open-Source Software (e.g. Linux, Python, VLC)</th>
                <th style="padding: 8px;">Proprietary Software (e.g. MS Windows, Adobe Photoshop)</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 8px;"><strong>Source Code Access</strong></td>
                <td style="padding: 8px;">Publicly available to inspect, modify, and adapt</td>
                <td style="padding: 8px;">Compiled secret code; protected by copyright law</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 8px;"><strong>Cost & Licensing</strong></td>
                <td style="padding: 8px;">Usually free to use and distribute under open licences</td>
                <td style="padding: 8px;">Requires paid licence fee or recurring subscription</td>
              </tr>
              <tr>
                <td style="padding: 8px;"><strong>Support & Quality</strong></td>
                <td style="padding: 8px;">Community driven; no official corporate guarantee</td>
                <td style="padding: 8px;">Official vendor support, regular tested updates, documentation</td>
              </tr>
            </tbody>
          </table>`,
          workedExample: `A start-up company with a low budget might choose Open-Source OS (Linux) to avoid initial licensing fees, but must train staff to manage community updates.`,
          examinerTip: 'Do not assume open-source software has no copyright. It uses licenses (e.g. MIT, GPL) that govern how modified code can be shared.'
        },
        {
          heading: '3. Environmental, Cultural & Ethical Concerns',
          content: `<strong>Environmental Impacts:</strong>
          <ul>
            <li><em>E-Waste (Electronic Waste):</em> Old devices dumped in landfills leak toxic heavy metals (lead, mercury) into groundwater.</li>
            <li><em>Energy Consumption:</em> Massive server farms and AI data centers consume huge amounts of electricity, contributing to carbon emissions.</li>
            <li><em>Precious Metal Extraction:</em> Mining gold, copper, and lithium causes deforestation and habitat destruction.</li>
          </ul>
          <strong>Cultural & Ethical Issues:</strong>
          <ul>
            <li><em>Digital Divide:</em> Inequality between those with access to high-speed internet/computers and those without (affecting education and job opportunities).</li>
            <li><em>Privacy vs Surveillance:</em> Facial recognition cameras and mobile tracking enhance public safety, but risk infringing on personal privacy.</li>
          </ul>`,
          workedExample: `<strong>Structure for 8-Mark Extended Prose Questions:</strong><br>
          1. <em>Introduction:</em> Define the context.<br>
          2. <em>Paragraph 1 (Ethical/Cultural):</em> Impact on privacy or digital divide.<br>
          3. <em>Paragraph 2 (Legal):</em> Reference Data Protection Act 2018 / GDPR.<br>
          4. <em>Paragraph 3 (Environmental):</em> E-waste or power usage.<br>
          5. <em>Justified Conclusion:</em> Summarize and weigh balance.`,
          examinerTip: 'Ensure extended essay answers present a balanced argument with points on both sides before reaching a conclusion!'
        }
      ],
      keyTerms: ['Data Protection Act', 'GDPR', 'Computer Misuse Act', 'Copyright Act', 'Open-Source', 'Proprietary', 'E-Waste', 'Digital Divide', 'Surveillance'],
      examTraps: [
        'Writing "Data Protection Act" without the year 2018 or GDPR reference.',
        'Confusing open-source with illegal file sharing. Open-source is legitimate software published with open source code!'
      ]
    },
    {
      id: 'tn_2_1',
      topicId: 'topic_2_1',
      code: '2.1',
      paper: 'Paper 2',
      title: 'Algorithms',
      subtitle: 'Computational Thinking, Searching & Sorting Algorithms & Trace Tables',
      summary: 'Master algorithm design, pseudocode tracing, searching (Linear vs Binary), and sorting (Bubble, Merge, Insertion).',
      specificationPoints: [
        '2.1.1 Computational Thinking: Abstraction, Decomposition, Algorithmic Thinking',
        '2.1.2 Designing, Creating & Refining Algorithms: Flowcharts, Pseudocode, Trace Tables',
        '2.1.3 Searching & Sorting Algorithms: Linear Search, Binary Search, Bubble Sort, Merge Sort, Insertion Sort'
      ],
      sections: [
        {
          heading: '1. Computational Thinking Pillars',
          content: `Computational thinking is the problem-solving process used to formulate problems so their solutions can be carried out by a computer.<br><br>
          <ul>
            <li><strong>Abstraction:</strong> Removing unnecessary details from a problem to focus only on the essential characteristics needed to solve it. <em>Example:</em> London Underground map removes precise geographical distances to show clear station connections.</li>
            <li><strong>Decomposition:</strong> Breaking down a complex problem into smaller, more manageable sub-problems. <em>Example:</em> Breaking a game project into player movement, scoring system, graphics, and sound modules.</li>
            <li><strong>Algorithmic Thinking:</strong> Creating a logical step-by-step sequence of instructions to solve a problem.</li>
          </ul>`,
          workedExample: `<strong>Abstraction vs Decomposition:</strong><br>
          • <em>Decomposition</em> splits a task into parts.<br>
          • <em>Abstraction</em> simplifies details within those parts.`,
          examinerTip: 'Memorize the exact definition of Abstraction for 2-mark recall questions!'
        },
        {
          heading: '2. Searching Algorithms',
          content: `<strong>1. Linear Search:</strong> Examines every item in a list sequentially from index 0 to the end.<br>
          • <em>Requirement:</em> Works on <strong>unsorted</strong> or sorted lists.<br>
          • <em>Efficiency:</em> Slow for large datasets ($O(n)$).<br><br>
          <strong>2. Binary Search:</strong> Repeatedly divides a list in half.<br>
          • <em>Mandatory Requirement:</em> The list MUST be <strong>sorted</strong> in alphabetical or numerical order!<br>
          • <em>Algorithm Steps:</em>
          <ol>
            <li>Find middle item of the list.</li>
            <li>If middle item == target, search complete.</li>
            <li>If target < middle item, discard the right half.</li>
            <li>If target > middle item, discard the left half.</li>
            <li>Repeat until target is found or sublist is empty.</li>
          </ol>`,
          workedExample: `<strong>Binary Search Tracing Example:</strong><br>
          Target = 7 in sorted list: <code>[2, 4, 7, 9, 12, 15, 18]</code> (7 items).<br>
          1. Mid index = 3 (Value = 9). Target (7) < 9 $\\rightarrow$ Keep left sublist: <code>[2, 4, 7]</code>.<br>
          2. Mid index = 1 (Value = 4). Target (7) > 4 $\\rightarrow$ Keep right sublist: <code>[7]</code>.<br>
          3. Mid index = 0 (Value = 7). Target match found in 3 comparisons! (Linear search would take 3 comparisons here, but Binary is far faster on 10,000 items).`,
          examinerTip: 'If an exam question asks why Binary Search cannot be used on a given list, check if the list is unsorted!'
        },
        {
          heading: '3. Sorting Algorithms',
          content: `<strong>1. Bubble Sort:</strong> Compares adjacent pairs of items. If out of order, swaps them. Repeats full passes until a pass occurs with ZERO swaps.<br>
          • <em>Pros:</em> Simple, requires little memory.<br>
          • <em>Cons:</em> Inefficient and slow ($O(n^2)$).<br><br>
          <strong>2. Merge Sort:</strong> Divide-and-conquer algorithm.<br>
          • <em>Step 1 (Divide):</em> Recursively splits list into sublists of size 1.<br>
          • <em>Step 2 (Conquer/Merge):</em> Merges adjacent sublists back together in sorted order.<br>
          • <em>Pros:</em> Extremely fast for large lists ($O(n \\log n)$).<br>
          • <em>Cons:</em> Requires additional RAM memory to hold temporary sublists.<br><br>
          <strong>3. Insertion Sort:</strong> Takes elements from unsorted list one-by-one and inserts them into their correct position in a growing sorted sublist.`,
          workedExample: `<strong>Bubble Sort Pass 1:</strong><br>
          Unsorted: <code>[5, 1, 4, 2]</code><br>
          • Compare 5 and 1 $\\rightarrow$ Swap: <code>[1, 5, 4, 2]</code><br>
          • Compare 5 and 4 $\\rightarrow$ Swap: <code>[1, 4, 5, 2]</code><br>
          • Compare 5 and 2 $\\rightarrow$ Swap: <code>[1, 4, 2, 5]</code> (Largest item 5 has "bubbled" to the end).`,
          examinerTip: 'Know how to identify which sort has taken place based on intermediate pass outputs!'
        },
        {
          heading: '4. Flowchart Symbols & Trace Tables',
          content: `<strong>Standard Flowchart Symbols:</strong><br>
          • <strong>Oval / Rounded Box:</strong> Terminal Start / End.<br>
          • <strong>Rectangle:</strong> Process / Calculation block (e.g. <code>x = x + 1</code>).<br>
          • <strong>Parallelogram:</strong> Input / Output block (e.g. <code>INPUT age</code>, <code>PRINT name</code>).<br>
          • <strong>Diamond:</strong> Decision block (e.g. <code>is score >= 50?</code>) with Yes/No branches.<br><br>
          <strong>Trace Tables:</strong> Used to track variable values line-by-line during algorithm execution to identify logic errors.`,
          workedExample: `<strong>Trace Table Layout:</strong><br>
          Columns represent variables (e.g. <code>count</code>, <code>total</code>, <code>output</code>). Every time a variable changes value, write the new value on a NEW row below.`,
          examinerTip: 'In trace table questions, never write multiple variable changes on the same line if they happen on different loop iterations!'
        }
      ],
      keyTerms: ['Abstraction', 'Decomposition', 'Algorithmic Thinking', 'Linear Search', 'Binary Search', 'Bubble Sort', 'Merge Sort', 'Insertion Sort', 'Flowchart', 'Trace Table'],
      examTraps: [
        'Attempting a Binary Search on an unsorted list.',
        'Forgetting that Bubble Sort must complete one full pass with ZERO swaps before stopping.'
      ]
    },
    {
      id: 'tn_2_2',
      topicId: 'topic_2_2',
      code: '2.2',
      paper: 'Paper 2',
      title: 'Programming Fundamentals',
      subtitle: 'Constructs, Data Types, Arrays, String Handling, Subprograms & OCR ERL',
      summary: 'Master procedural programming concepts in Python and OCR Exam Reference Language (ERL).',
      specificationPoints: [
        '2.2.1 Programming Fundamentals: Variables, Constants, Sequence, Selection, Iteration',
        '2.2.2 Data Types: Integer, Real, Boolean, Character, String, Casting, Operators (DIV, MOD)',
        '2.2.3 Additional Programming Techniques: 1D & 2D Arrays, File Handling, String Operations, Subprograms (Functions/Procedures, Parameters, Scope)'
      ],
      sections: [
        {
          heading: '1. Three Basic Programming Constructs',
          content: `All computer programs are built from three fundamental control structures:
          <ol>
            <li><strong>Sequence:</strong> Executing code statements line-by-line in sequential order from top to bottom.</li>
            <li><strong>Selection:</strong> Decision points where different code paths are executed based on conditional evaluation (<code>IF ... THEN ... ELSE</code>).</li>
            <li><strong>Iteration:</strong> Repeating a block of code using loops.
              <ul>
                <li><em>Count-Controlled Loop (FOR loop):</em> Repeats a fixed number of times.</li>
                <li><em>Condition-Controlled Loop (WHILE loop):</em> Repeats while a condition evaluates to TRUE.</li>
              </ul>
            </li>
          </ol>`,
          workedExample: `<strong>Variables vs Constants:</strong><br>
          • <em>Variable:</em> Named RAM memory location whose value CAN change during execution (e.g. <code>score = score + 10</code>).<br>
          • <em>Constant:</em> Named memory location whose value CANNOT be altered during execution (e.g. <code>VAT_RATE = 0.20</code>).`,
          examinerTip: 'In OCR exam questions, constants are usually written in UPPERCASE letters.'
        },
        {
          heading: '2. Division Operators: DIV vs MOD',
          content: `Beyond standard mathematical division (<code>/</code> returning float decimals), computer science uses integer division operators:<br><br>
          <ul>
            <li><strong>DIV (Quotient Division - <code>//</code> in Python):</strong> Returns the whole integer number of times a division fits, discarding the remainder.</li>
            <li><strong>MOD (Modulo Division - <code>%</code> in Python):</strong> Returns ONLY the remainder left over from integer division.</li>
          </ul>`,
          workedExample: `<strong>DIV and MOD Calculations:</strong><br>
          Calculate $17 \\div 5$:<br>
          • $17 \\text{ DIV } 5 = 3$ (because 5 fits into 17 three times).<br>
          • $17 \\text{ MOD } 5 = 2$ (because $17 - (3 \\times 5) = 2$ remainder).<br><br>
          <em>Real-World Use Case:</em> Checking if a number is even: <code>IF num MOD 2 == 0 THEN ...</code>`,
          examinerTip: 'Memorize: DIV = Quotient (whole number), MOD = Remainder!'
        },
        {
          heading: '3. 1D & 2D Arrays',
          content: `An <strong>array</strong> is a data structure storing multiple data items of the same data type under a single variable name, accessed using zero-based indices.<br><br>
          <ul>
            <li><strong>1D Array:</strong> Linear list. e.g. <code>scores = [45, 88, 92]</code> $\\rightarrow$ <code>scores[0]</code> is 45.</li>
            <li><strong>2D Array:</strong> Grid layout structured as rows and columns. e.g. <code>grid[row][col]</code>.</li>
          </ul>`,
          workedExample: `<strong>Accessing 2D Arrays:</strong><br>
          <code>board = [["X", "O", "X"], ["-", "X", "-"], ["O", "-", "O"]]</code><br>
          • <code>board[0][1]</code> accesses Row 0, Column 1 $\\rightarrow$ <code>"O"</code>.`,
          examinerTip: 'Remember arrays in Python/ERL use 0-based indexing! The first element is always index 0.'
        },
        {
          heading: '4. Subprograms: Functions vs Procedures',
          content: `Subprograms are self-contained blocks of code executed when called by name.<br><br>
          <ul>
            <li><strong>Procedure:</strong> Executes a set of instructions but DOES NOT return a value to the main program.</li>
            <li><strong>Function:</strong> Executes instructions and <strong>RETURNS a value</strong> back to the calling code using a <code>return</code> statement.</li>
            <li><strong>Parameters vs Arguments:</strong> <em>Parameters</em> are variable placeholders in the subprogram definition. <em>Arguments</em> are actual values passed into parameters during a call.</li>
            <li><strong>Variable Scope:</strong> <em>Local variables</em> exist only inside the subprogram; <em>Global variables</em> exist throughout the entire script.</li>
          </ul>`,
          workedExample: `<strong>Python Subprogram Example:</strong><br>
          <pre><code>def calculate_tax(price): # price is parameter
    tax = price * 0.20 # tax is local variable
    return tax # Function returns value

final_tax = calculate_tax(100) # 100 is argument</code></pre>`,
          examinerTip: 'If a subprogram ends with `return result`, it is a FUNCTION. If it has no return statement, it is a PROCEDURE.'
        }
      ],
      keyTerms: ['Sequence', 'Selection', 'Iteration', 'Variable', 'Constant', 'Casting', 'DIV', 'MOD', '1D Array', '2D Array', 'Subprogram', 'Function', 'Procedure', 'Parameter', 'Scope'],
      examTraps: [
        'Confusing DIV and MOD. DIV gives the whole quotient; MOD gives the remainder.',
        'Forgetting that array indexes start at 0, not 1.'
      ]
    },
    {
      id: 'tn_2_3',
      topicId: 'topic_2_3',
      code: '2.3',
      paper: 'Paper 2',
      title: 'Producing Robust Programs',
      subtitle: 'Defensive Design, Input Validation, Maintainability & Testing Strategies',
      summary: 'Learn how to build resilient programs using input validation, maintainability rules, and structured test plans.',
      specificationPoints: [
        '2.3.1 Defensive Design: Input validation (range, length, presence, type, format), Authentication, Maintainability (comments, indentation, naming)',
        '2.3.2 Testing: Purpose of testing, Normal, Boundary, Invalid, Erroneous test data, Syntax vs Logic errors'
      ],
      sections: [
        {
          heading: '1. Defensive Design & Input Validation',
          content: `<strong>Defensive design</strong> ensures programs keep running smoothly even under unexpected user input or system failures.<br><br>
          <strong>Input Validation Checks:</strong>
          <ul>
            <li><strong>Range Check:</strong> Checks if a number falls within specified minimum and maximum limits (e.g. month between 1 and 12).</li>
            <li><strong>Length Check:</strong> Checks if string length meets minimum/maximum character requirements (e.g. password $\ge 8$ chars).</li>
            <li><strong>Presence Check:</strong> Checks that a field has not been left empty.</li>
            <li><strong>Type Check:</strong> Checks that input matches the expected data type (e.g. age must be an Integer).</li>
            <li><strong>Format Check:</strong> Checks input matches a required pattern (e.g. postcode format <code>AA11 1AA</code>).</li>
          </ul>`,
          workedExample: `<strong>Validation vs Verification:</strong><br>
          • <em>Validation:</em> Automated computer check testing if input is sensible and meets rules.<br>
          • <em>Verification:</em> Checking if data matches the original source (e.g. entering password twice or double-entry verification).`,
          examinerTip: 'Validation checks if data is SENSIBLE; it cannot check if data is 100% truthful (e.g. entering fake valid DOB).'
        },
        {
          heading: '2. Code Maintainability Techniques',
          content: `Maintainable code can be easily understood, debugged, and updated by other programmers.<br><br>
          <strong>4 Maintainability Rules:</strong>
          <ol>
            <li><strong>Comments (<code>#</code>):</strong> Explains non-obvious logic to future developers.</li>
            <li><strong>Indentation:</strong> Clearly demarcates code blocks inside loops, subprograms, and <code>IF</code> statements.</li>
            <li><strong>Meaningful Variable Names:</strong> Use clear names like <code>total_score</code> instead of single letters like <code>x</code>.</li>
            <li><strong>Modular Code:</strong> Splitting program into reusable subprograms (functions/procedures).</li>
          </ol>`,
          workedExample: `Unmaintainable: <code>def f(a,b): return a*b</code><br>
          Maintainable:
          <pre><code># Calculate rectangle area
def calculate_area(width, height):
    return width * height</code></pre>`,
          examinerTip: 'When asked how to improve code maintainability on exam code snippets, list indentation, comments, and clear identifier names.'
        },
        {
          heading: '3. Testing Strategies & Test Data Types',
          content: `<strong>Syntax Errors vs Logic Errors:</strong><br>
          • <em>Syntax Error:</em> Violation of language grammar rules (e.g. missing colon <code>if x == 5</code>). Prevents code from compiling/running.<br>
          • <em>Logic Error:</em> Program runs without crashing but produces incorrect output due to bad logic (e.g. <code>average = a + b / 2</code> missing brackets).<br><br>
          <strong>4 Categories of Test Data:</strong>
          <ul>
            <li><strong>Normal Data:</strong> Typical valid data within expected range (e.g. score = 50 for range 0-100).</li>
            <li><strong>Boundary Data:</strong> Values on the exact minimum and maximum edges of acceptance (e.g. 0 and 100).</li>
            <li><strong>Invalid Data:</strong> Out-of-range data of the correct data type that should be rejected (e.g. -1 or 105).</li>
            <li><strong>Erroneous Data:</strong> Data of the wrong data type that should be rejected (e.g. "fifty" instead of number).</li>
          </ul>`,
          workedExample: `<strong>Designing a Test Plan Table:</strong><br>
          Every test plan entry requires 4 columns: <em>Test Number</em>, <em>Test Data Category</em>, <em>Input Value</em>, and <em>Expected Result</em>.`,
          examinerTip: 'Always include both the value AND the expected result (e.g. "Input 100 -> Expected: Accepted") in test plan questions!'
        }
      ],
      keyTerms: ['Defensive Design', 'Input Validation', 'Range Check', 'Length Check', 'Presence Check', 'Type Check', 'Maintainability', 'Syntax Error', 'Logic Error', 'Normal Data', 'Boundary Data', 'Invalid Data', 'Erroneous Data'],
      examTraps: [
        'Confusing Validation (computer check) with Verification (source comparison check).',
        'Writing boundary test data without specifying expected output.'
      ]
    },
    {
      id: 'tn_2_4',
      topicId: 'topic_2_4',
      code: '2.4',
      paper: 'Paper 2',
      title: 'Boolean Logic',
      subtitle: 'Logic Gates (AND, OR, NOT), Truth Tables & Circuit Diagrams',
      summary: 'Learn Boolean logic operations, 2-input and 3-input truth tables, and logic gate circuit diagrams.',
      specificationPoints: [
        '2.4.1 Boolean Logic: Logic gate symbols (AND, OR, NOT), Truth tables (2 and 3 inputs), Combining logic gates'
      ],
      sections: [
        {
          heading: '1. Three Fundamental Logic Gates',
          content: `Logic gates process binary inputs (0 or 1) and produce a single binary output.<br><br>
          <ul>
            <li><strong>AND Gate:</strong> Output is 1 ONLY if <em>both</em> Input A AND Input B are 1.</li>
            <li><strong>OR Gate:</strong> Output is 1 if <em>at least one</em> input (A OR B) is 1.</li>
            <li><strong>NOT Gate (Inverter):</strong> Takes 1 input and flips it (0 becomes 1; 1 becomes 0).</li>
          </ul>`,
          workedExample: `<strong>Truth Table for 2-Input Gates:</strong><br>
          <table class="table" style="width:100%; border-collapse:collapse; margin: 12px 0;">
            <thead>
              <tr style="border-bottom: 2px solid var(--border-color); text-align:left;">
                <th style="padding: 6px;">A</th>
                <th style="padding: 6px;">B</th>
                <th style="padding: 6px;">A AND B</th>
                <th style="padding: 6px;">A OR B</th>
                <th style="padding: 6px;">NOT A</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style="padding: 6px;">0</td><td style="padding: 6px;">0</td><td style="padding: 6px;">0</td><td style="padding: 6px;">0</td><td style="padding: 6px;">1</td></tr>
              <tr><td style="padding: 6px;">0</td><td style="padding: 6px;">1</td><td style="padding: 6px;">0</td><td style="padding: 6px;">1</td><td style="padding: 6px;">1</td></tr>
              <tr><td style="padding: 6px;">1</td><td style="padding: 6px;">0</td><td style="padding: 6px;">0</td><td style="padding: 6px;">1</td><td style="padding: 6px;">0</td></tr>
              <tr><td style="padding: 6px;">1</td><td style="padding: 6px;">1</td><td style="padding: 6px;">1</td><td style="padding: 6px;">1</td><td style="padding: 6px;">0</td></tr>
            </tbody>
          </table>`,
          examinerTip: 'Ensure you recognize standard gate shapes: AND gate has a D-shaped flat back; OR gate has a curved back; NOT gate is a triangle with a circle at the tip.'
        },
        {
          heading: '2. 3-Input Truth Tables & Combined Circuits',
          content: `Complex logic circuits combine multiple gates into Boolean expressions.<br>
          A 3-input truth table (Inputs A, B, C) requires $2^3 = 8$ rows to cover all combinations (000 to 111).<br><br>
          <strong>Step-by-Step Strategy for Evaluating Circuits:</strong>
          <ol>
            <li>Evaluate intermediate gate outputs first and write them in dedicated sub-columns.</li>
            <li>Combine intermediate values into the final output column $Q$.</li>
          </ol>`,
          workedExample: `<strong>Evaluating $Q = (A \\text{ AND } B) \\text{ OR } (\\text{NOT } C)$:</strong><br>
          Let $A=1, B=1, C=1$:<br>
          1. Intermediate $P = A \\text{ AND } B = 1 \\text{ AND } 1 = 1$.<br>
          2. Intermediate $R = \\text{NOT } C = \\text{NOT } 1 = 0$.<br>
          3. Final $Q = P \\text{ OR } R = 1 \\text{ OR } 0 = 1$.`,
          examinerTip: 'Always double-check that a 3-input truth table has exactly 8 rows!'
        }
      ],
      keyTerms: ['Boolean Logic', 'AND Gate', 'OR Gate', 'NOT Gate', 'Truth Table', 'Logic Circuit'],
      examTraps: [
        'Drawing an AND gate with a curved back (which looks like an OR gate). Keep AND D-shaped!',
        'Missing rows in 3-input truth tables. 3 inputs = 8 rows total.'
      ]
    },
    {
      id: 'tn_2_5',
      topicId: 'topic_2_5',
      code: '2.5',
      paper: 'Paper 2',
      title: 'Programming Languages & IDEs',
      subtitle: 'High-Level vs Low-Level Languages, Translators & IDE Development Tools',
      summary: 'Compare high-level and low-level languages, understand compilers and interpreters, and explore IDE tools.',
      specificationPoints: [
        '2.5.1 Languages & Translators: High-level vs Low-level languages, Compilers vs Interpreters',
        '2.5.2 IDE Tools: Editors, Error Diagnostics, Run-time Environment, Translators'
      ],
      sections: [
        {
          heading: '1. High-Level vs Low-Level Languages',
          content: `Computer code exists at different levels of abstraction from physical CPU hardware:<br><br>
          <ul>
            <li><strong>High-Level Languages (e.g. Python, Java, C#):</strong>
              <ul>
                <li>Human-readable code using English-like keywords (<code>if</code>, <code>while</code>, <code>print</code>).</li>
                <li>Portable (runs on different CPU hardware architectures).</li>
                <li>Uses data structures (variables, arrays) and subprograms.</li>
                <li>Must be translated into machine code before CPU execution.</li>
              </ul>
            </li>
            <li><strong>Low-Level Languages:</strong>
              <ul>
                <li><em>Assembly Language:</em> Uses short mnemonic codes (e.g. <code>INP</code>, <code>STA</code>, <code>ADD</code>). Translated by an <strong>Assembler</strong>.</li>
                <li><em>Machine Code:</em> Raw binary (1s and 0s) directly executed by the CPU. Hardware-specific (non-portable).</li>
              </ul>
            </li>
          </ul>`,
          workedExample: `High-Level: <code>total = x + y</code><br>
          Assembly: <code>LDA x</code> $\\rightarrow$ <code>ADD y</code> $\\rightarrow$ <code>STA total</code><br>
          Machine Code: <code>01010000 00011011</code>`,
          examinerTip: 'Low-level code runs faster and gives direct hardware memory control, but is hard to write and non-portable.'
        },
        {
          heading: '2. Translators: Compilers vs Interpreters',
          content: `CPU hardware ONLY executes machine code. High-level languages require a translator program.<br><br>
          <table class="table" style="width:100%; border-collapse:collapse; margin: 12px 0;">
            <thead>
              <tr style="border-bottom: 2px solid var(--border-color); text-align:left;">
                <th style="padding: 8px;">Feature</th>
                <th style="padding: 8px;">Compiler</th>
                <th style="padding: 8px;">Interpreter</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 8px;"><strong>Translation Process</strong></td>
                <td style="padding: 8px;">Translates entire source code into a standalone machine code executable file (<code>.exe</code>) in one pass</td>
                <td style="padding: 8px;">Translates and executes source code line-by-line in real time</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 8px;"><strong>Execution Speed</strong></td>
                <td style="padding: 8px;">Fast execution after compilation is complete</td>
                <td style="padding: 8px;">Slower execution (must re-translate lines in loops)</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 8px;"><strong>Error Reporting</strong></td>
                <td style="padding: 8px;">Reports all errors at the end of compilation</td>
                <td style="padding: 8px;">Stops immediately on the line where an error occurs</td>
              </tr>
              <tr>
                <td style="padding: 8px;"><strong>Code Protection</strong></td>
                <td style="padding: 8px;">Source code is hidden inside compiled machine code file</td>
                <td style="padding: 8px;">Source code must be provided to user along with interpreter</td>
              </tr>
            </tbody>
          </table>`,
          workedExample: `Developers use an <strong>Interpreter</strong> during coding for fast debugging, then compile the final project with a <strong>Compiler</strong> to produce a fast <code>.exe</code> for commercial release.`,
          examinerTip: 'Remember: Compilers produce standalone executable files; Interpreters require the interpreter software installed on the destination computer.'
        },
        {
          heading: '3. Integrated Development Environment (IDE) Tools',
          content: `An <strong>IDE</strong> is a software application providing comprehensive tools for programmers:<br><br>
          <ul>
            <li><strong>Code Editor:</strong> Provides syntax highlighting (colouring keywords), line numbering, and auto-indentation.</li>
            <li><strong>Error Diagnostics / Linting:</strong> Highlights syntax errors in real-time before code is executed.</li>
            <li><strong>Debugger:</strong> Helps locate logic errors using <em>breakpoints</em> (pausing execution), <em>single-stepping</em> (line-by-line execution), and <em>variable watch windows</em>.</li>
            <li><strong>Run-time Environment:</strong> Allows programmers to run and test code instantly within the IDE with a single click.</li>
          </ul>`,
          workedExample: `Python IDLE, VS Code, and PyCharm are examples of IDEs containing editors, run-time environments, and debuggers.`,
          examinerTip: 'List specific IDE features (e.g. Breakpoints, Syntax Highlighting, Variable Watch) when answering 4-mark questions on IDE capabilities.'
        }
      ],
      keyTerms: ['High-Level Language', 'Low-Level Language', 'Assembly Language', 'Machine Code', 'Compiler', 'Interpreter', 'Assembler', 'IDE', 'Debugger', 'Syntax Highlighting', 'Breakpoint'],
      examTraps: [
        'Thinking interpreters produce executable files. Only compilers produce standalone `.exe` files!',
        'Confusing low-level assembly language with machine code. Assembly uses mnemonics; Machine code is binary 1s and 0s.'
      ]
    }
  ],
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
      title: 'Quick Recall Check - Data Representation',
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
  assessmentReports: [],
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
    ...priorityAssessments.examTransferTasks,
    {
      id: 'transfer_1', specificationPointId: '1.2.4c', topicId: 'topic_1_3', paper: 'Paper 1', commandWord: 'Calculate', marks: 4, minutes: 6, traceabilitySpecificationPointIds: ['1.2.3'],
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
      retryQuestion: 'A pupil enters a domain name for the school website. Explain how DNS and an IP address help the browser reach the correct server.'
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
    },
    {
      id: 'transfer_5', specificationPointId: '1.1.1', topicId: 'topic_1_1', paper: 'Paper 1', commandWord: 'Explain', marks: 4, minutes: 6, purpose: 'exam-transfer',
      question: 'Explain how the Program Counter (PC), Memory Address Register (MAR) and Memory Data Register (MDR) are used while an instruction is fetched. [4 marks]',
      decodePrompt: 'Explain the linked movement of the instruction address and instruction data. Keep the roles of the MAR and MDR distinct.',
      requiredElements: ['PC holds the address of the next instruction', 'PC address is copied to the MAR', 'instruction at that address is fetched from memory into the MDR', 'PC is incremented ready for the next instruction'],
      planningLabels: ['PC role', 'Address moves to MAR', 'Instruction moves to MDR', 'PC increment'],
      modelPlan: ['PC stores the address of the next instruction', 'copy that address from the PC to the MAR', 'fetch the instruction stored at that address into the MDR', 'increment the PC ready for the next fetch'],
      retryQuestion: 'Explain how the PC, MAR and MDR are used when the CPU fetches an instruction from memory address 24.'
    },
    {
      id: 'transfer_6', specificationPointId: '1.2.1', topicId: 'topic_1_2', paper: 'Paper 1', commandWord: 'Compare', marks: 3, minutes: 5, purpose: 'exam-transfer',
      question: 'Compare RAM and ROM in terms of volatility, access rights, and primary function within a computer system.',
      decodePrompt: 'A comparison requires contrasting pairs of points for both memory types.',
      requiredElements: ['RAM is volatile, ROM is non-volatile', 'RAM is read-write, ROM is normally read-only', 'RAM holds active programs and data, ROM holds startup or boot instructions'],
      planningLabels: ['Volatility contrast', 'Access rights contrast', 'Function contrast'],
      modelPlan: ['RAM volatile loses contents / ROM non-volatile retains data', 'RAM read/write / ROM normally read-only', 'RAM stores active programs and data / ROM stores startup instructions'],
      retryQuestion: 'Compare RAM and ROM in terms of whether their contents are lost without power, whether their contents normally change, and what each stores.'
    },
    {
      id: 'transfer_7', specificationPointId: '2.1.3', topicId: 'topic_2_1', paper: 'Paper 2', commandWord: 'Explain', marks: 4, minutes: 6, purpose: 'exam-transfer',
      question: 'Explain why a Binary Search is usually more efficient than a Linear Search for a large sorted list.',
      decodePrompt: 'Compare how each search moves through the list and explain why binary search reduces the remaining search area faster.',
      requiredElements: ['Linear search checks items one at a time', 'Binary search checks the middle item', 'Binary search discards half of the remaining list after each comparison', 'The list must be sorted'],
      planningLabels: ['Linear search method', 'Binary search method', 'How the search area changes', 'Sorted-list requirement'],
      modelPlan: ['Linear search checks each item in order until the target is found', 'binary search checks the middle item', 'each comparison removes half of the remaining search area', 'this requires the data to be in order'],
      retryQuestion: 'Explain why a Binary Search cannot be performed on an unsorted list.'
    },
    {
      id: 'transfer_8', specificationPointId: '2.5.1', topicId: 'topic_2_5', paper: 'Paper 2', commandWord: 'Discuss', marks: 6, minutes: 9, purpose: 'exam-transfer',
      question: 'A software company is choosing how to translate a commercial video game during development and for its final release. Discuss the use of a compiler and an interpreter in this scenario.',
      decodePrompt: 'Consider relevant benefits and drawbacks of each translator during development and release, then give a justified recommendation.',
      requiredElements: ['Compiler translates the whole program and reports errors after compilation', 'Compiled code can run without the translator', 'Interpreter translates and executes one statement at a time', 'Interpreter can support testing by stopping at an error', 'Recommendation linked to development or release needs'],
      planningLabels: ['Compiler benefit or drawback', 'Interpreter benefit or drawback', 'Development context', 'Release context', 'Justified recommendation'],
      modelPlan: ['an interpreter can help during development because execution stops where an error is found', 'a compiler translates the whole program and creates executable code', 'users can run compiled code without having the compiler', 'a justified approach may use an interpreter during development and compile the release'],
      retryQuestion: 'A developer is choosing a translator while testing a program and when distributing its final version. Discuss the use of a compiler and an interpreter, then justify a choice for each stage.'
    }
  ],
  keyTerms: [
    { id: 'term_control_unit', term: 'Control unit', topicId: 'topic_1_1', specificationPointId: '1.1.1', definition: 'The CPU component that decodes instructions and coordinates their execution by sending control signals.', keywords: ['decodes', 'coordinates', 'control signals'] },
    { id: 'term_program_counter', term: 'Program counter', topicId: 'topic_1_1', specificationPointId: '1.1.1', definition: 'A register that stores the memory address of the next instruction to be fetched.', keywords: ['register', 'address', 'next instruction'] },
    { id: 'term_mar', term: 'MAR', topicId: 'topic_1_1', specificationPointId: '1.1.1', definition: 'The memory address register, which stores the address of a memory location being accessed.', keywords: ['register', 'address', 'memory location'] },
    { id: 'term_mdr', term: 'MDR', topicId: 'topic_1_1', specificationPointId: '1.1.1', definition: 'The memory data register, which stores data or an instruction being transferred to or from memory.', keywords: ['register', 'data', 'instruction'] },
    { id: 'term_clock_speed', term: 'Clock speed', topicId: 'topic_1_1', specificationPointId: '1.1.2', definition: 'The number of processor clock cycles completed each second, measured in hertz.', keywords: ['cycles', 'second', 'hertz'] },
    { id: 'term_processor_core', term: 'Processor core', topicId: 'topic_1_1', specificationPointId: '1.1.2', definition: 'An individual processing unit within a CPU that can execute its own instruction stream.', keywords: ['processing unit', 'instruction stream'] },
    { id: 'term_optical_storage', term: 'Optical storage', topicId: 'topic_1_2', specificationPointId: '1.2.2', definition: 'Storage in which a laser reads marks recorded on the surface of a disc.', keywords: ['laser', 'disc', 'marks'] },
    { id: 'term_byte', term: 'Byte', topicId: 'topic_1_3', specificationPointId: '1.2.3', definition: 'A group of eight bits that can represent a value or part of a stored item.', keywords: ['eight', 'bits'] },
    { id: 'term_petabyte', term: 'Petabyte', topicId: 'topic_1_3', specificationPointId: '1.2.3', definition: 'A large storage-capacity unit above the terabyte in the standard unit sequence.', keywords: ['storage', 'unit', 'terabyte'] },
    { id: 'term_hexadecimal', term: 'Hexadecimal', topicId: 'topic_1_3', specificationPointId: '1.2.4a', definition: 'A base-16 number system using digits zero to nine and letters A to F.', keywords: ['base 16', 'A to F'] },
    { id: 'term_binary_shift', term: 'Binary shift', topicId: 'topic_1_3', specificationPointId: '1.2.4a', definition: 'Moving every bit left or right by a stated number of positions in a fixed-width binary value.', keywords: ['bits', 'left', 'right'] },
    { id: 'term_ascii', term: 'ASCII', topicId: 'topic_1_3', specificationPointId: '1.2.4b', definition: 'A character-encoding standard representing a limited set of characters with binary codes.', keywords: ['character', 'encoding', 'binary codes'] },
    { id: 'term_pixel', term: 'Pixel', topicId: 'topic_1_3', specificationPointId: '1.2.4c', definition: 'One picture element in a bitmap image, represented using a binary colour code.', keywords: ['picture element', 'bitmap', 'colour code'] },
    { id: 'term_colour_depth', term: 'Colour depth', topicId: 'topic_1_3', specificationPointId: '1.2.4c', definition: 'The number of bits used to represent the colour of each pixel in a bitmap.', keywords: ['bits', 'colour', 'pixel'] },
    { id: 'term_sound_duration', term: 'Duration', topicId: 'topic_1_3', specificationPointId: '1.2.4d', definition: 'The length of time covered by a sound recording, usually measured in seconds.', keywords: ['length', 'recording', 'seconds'] },
    { id: 'term_lossless', term: 'Lossless compression', topicId: 'topic_1_3', specificationPointId: '1.2.5', definition: 'Compression that allows every part of the original file to be reconstructed exactly.', keywords: ['original', 'reconstructed', 'exactly'] },
    { id: 'term_compression', term: 'Compression', topicId: 'topic_1_3', specificationPointId: '1.2.5', definition: 'Reducing the number of bits needed to store or transmit a file.', keywords: ['reducing', 'bits', 'file'] },
    { id: 'term_wan', term: 'WAN', topicId: 'topic_1_4', specificationPointId: '1.3.1', definition: 'A network connecting devices or smaller networks across a large geographical area.', keywords: ['network', 'large', 'geographical area'] },
    { id: 'term_switch', term: 'Switch', topicId: 'topic_1_4', specificationPointId: '1.3.1', definition: 'A network device that connects devices on a LAN and forwards frames to the appropriate connection.', keywords: ['LAN', 'forwards', 'connection'] },
    { id: 'term_router', term: 'Router', topicId: 'topic_1_4', specificationPointId: '1.3.1', definition: 'A network device that forwards packets between different networks using addressing information.', keywords: ['packets', 'between networks', 'addressing'] },
    { id: 'term_ip_address', term: 'IP address', topicId: 'topic_1_4', specificationPointId: '1.3.2', definition: 'A logical address used to identify a device and route data across networks.', keywords: ['logical address', 'device', 'route'] },
    { id: 'term_mac_address', term: 'MAC address', topicId: 'topic_1_4', specificationPointId: '1.3.2', definition: 'A hardware address assigned to a network interface and used for communication on a local network.', keywords: ['hardware address', 'network interface', 'local'] },
    { id: 'term_malware', term: 'Malware', topicId: 'topic_1_5', specificationPointId: '1.4.1', definition: 'Software designed to damage a system, disrupt it or gain unauthorised access.', keywords: ['software', 'damage', 'unauthorised access'] },
    { id: 'term_brute_force', term: 'Brute-force attack', topicId: 'topic_1_5', specificationPointId: '1.4.1', definition: 'An attack that repeatedly tries possible credentials until a valid combination is found.', keywords: ['repeatedly', 'credentials', 'combination'] },
    { id: 'term_sql_injection', term: 'SQL injection', topicId: 'topic_1_5', specificationPointId: '1.4.1', definition: 'An attack that places malicious database instructions into input which a program fails to handle safely.', keywords: ['database', 'instructions', 'input'] },
    { id: 'term_firewall', term: 'Firewall', topicId: 'topic_1_5', specificationPointId: '1.4.2', definition: 'Hardware or software that examines network traffic and permits or blocks it using configured rules.', keywords: ['network traffic', 'rules', 'blocks'] },
    { id: 'term_penetration_testing', term: 'Penetration testing', topicId: 'topic_1_5', specificationPointId: '1.4.2', definition: 'Authorised testing that uses attack techniques to find security weaknesses so they can be corrected.', keywords: ['authorised', 'attack techniques', 'weaknesses'] },
    { id: 'term_driver', term: 'Device driver', topicId: 'topic_1_6', specificationPointId: '1.5.1', definition: 'Software that allows an operating system to communicate with and control a hardware device.', keywords: ['operating system', 'communicate', 'hardware'] },
    { id: 'term_multitasking', term: 'Multitasking', topicId: 'topic_1_6', specificationPointId: '1.5.1', definition: 'The operating system sharing processor time so several active programs can make progress.', keywords: ['processor time', 'active programs', 'progress'] },
    { id: 'term_data_protection_act', term: 'Data Protection Act 2018', topicId: 'topic_1_7', specificationPointId: '1.6.2', definition: 'UK legislation governing how organisations collect, store and use personal data.', keywords: ['legislation', 'organisations', 'personal data'] },
    { id: 'term_computer_misuse_act', term: 'Computer Misuse Act 1990', topicId: 'topic_1_7', specificationPointId: '1.6.2', definition: 'UK legislation addressing unauthorised access to computer systems and related unauthorised acts.', keywords: ['legislation', 'unauthorised access', 'computer systems'] },
    { id: 'term_trace_table', term: 'Trace table', topicId: 'topic_2_1', specificationPointId: '2.1.2', definition: 'A table used to record variable values, conditions and output while following an algorithm step by step.', keywords: ['record', 'values', 'step by step'] },
    { id: 'term_flowchart', term: 'Flowchart', topicId: 'topic_2_1', specificationPointId: '2.1.2', definition: 'A diagram using standard symbols and arrows to represent the control flow of an algorithm.', keywords: ['diagram', 'symbols', 'control flow'] },
    { id: 'term_sql_select', term: 'SQL SELECT', topicId: 'topic_2_2', specificationPointId: '2.2.3', definition: 'A database query statement that retrieves named fields from records, optionally using a condition.', keywords: ['database', 'retrieves', 'fields'] },
    { id: 'term_function', term: 'Function', topicId: 'topic_2_2', specificationPointId: '2.2.3', definition: 'A named subprogram that performs a task and returns a value to the calling code.', keywords: ['subprogram', 'returns', 'value'] },
    { id: 'term_ocr_erl', term: 'OCR Exam Reference Language', topicId: 'topic_2_2', specificationPointId: '2.2.ERL', definition: 'The standard notation OCR uses to present and accept algorithms in examination questions.', keywords: ['OCR', 'notation', 'algorithms'] },
    { id: 'term_authentication', term: 'Authentication', topicId: 'topic_2_3', specificationPointId: '2.3.1', definition: 'Checking that a person or system is the identity it claims to be.', keywords: ['checking', 'identity', 'claims'] },
    { id: 'term_maintainability', term: 'Maintainability', topicId: 'topic_2_3', specificationPointId: '2.3.1', definition: 'How easily code can be understood, corrected and changed after it has been written.', keywords: ['understood', 'corrected', 'changed'] },
    { id: 'term_logic_gate', term: 'Logic gate', topicId: 'topic_2_4', specificationPointId: '2.4.1', definition: 'A component that applies a Boolean operation such as AND, OR or NOT to binary inputs.', keywords: ['Boolean', 'operation', 'binary inputs'] },
    { id: 'term_embedded_system', term: 'Embedded system', topicId: 'topic_1_1', specificationPointId: '1.1.3', definition: 'A computer built into a larger device to perform a specific function.', keywords: ['larger device', 'specific function'] },
    { id: 'term_sensor', term: 'Sensor', topicId: 'topic_1_1', specificationPointId: '1.1.3', definition: 'An input device that detects a physical change and sends data to a computer system.', keywords: ['input', 'physical change', 'data'] },
    { id: 'term_magnetic_storage', term: 'Magnetic storage', topicId: 'topic_1_2', specificationPointId: '1.2.2', definition: 'Storage that represents data by magnetising areas of a surface.', keywords: ['magnetising', 'surface', 'data'] },
    { id: 'term_solid_state_storage', term: 'Solid-state storage', topicId: 'topic_1_2', specificationPointId: '1.2.2', definition: 'Electronic storage with no moving parts that keeps data when power is removed.', keywords: ['electronic', 'no moving parts', 'non-volatile'] },
    { id: 'term_character_set', term: 'Character set', topicId: 'topic_1_3', specificationPointId: '1.2.4b', definition: 'A defined collection of characters in which each character has its own binary code.', keywords: ['characters', 'binary code'] },
    { id: 'term_unicode', term: 'Unicode', topicId: 'topic_1_3', specificationPointId: '1.2.4b', definition: 'A character-encoding standard designed to represent characters from many writing systems.', keywords: ['character', 'encoding', 'writing systems'] },
    { id: 'term_sample_rate', term: 'Sample rate', topicId: 'topic_1_3', specificationPointId: '1.2.4d', definition: 'The number of sound samples captured each second, measured in hertz.', keywords: ['samples', 'second', 'hertz'] },
    { id: 'term_sample_depth', term: 'Sample depth', topicId: 'topic_1_3', specificationPointId: '1.2.4d', definition: 'The number of bits used to store each sound sample.', keywords: ['bits', 'sound sample'] },
    { id: 'term_utility_software', term: 'Utility software', topicId: 'topic_1_6', specificationPointId: '1.5.2', definition: 'System software that performs a maintenance or housekeeping task for a computer.', keywords: ['system software', 'maintenance', 'housekeeping'] },
    { id: 'term_defragmentation', term: 'Defragmentation', topicId: 'topic_1_6', specificationPointId: '1.5.2', definition: 'Rearranging parts of files on magnetic storage so each file is stored in adjacent blocks.', keywords: ['magnetic storage', 'files', 'adjacent'] },
    { id: 'term_privacy', term: 'Privacy', topicId: 'topic_1_7', specificationPointId: '1.6.1', definition: 'A person’s ability to control how information about them is collected and used.', keywords: ['control', 'information', 'collected'] },
    { id: 'term_e_waste', term: 'Electronic waste', topicId: 'topic_1_7', specificationPointId: '1.6.1', definition: 'Discarded electrical or electronic equipment that may contain reusable and hazardous materials.', keywords: ['discarded', 'equipment', 'materials'] },
    { id: 'term_binary_search', term: 'Binary search', topicId: 'topic_2_1', specificationPointId: '2.1.3', definition: 'A search of sorted data that repeatedly discards the half which cannot contain the target.', keywords: ['sorted', 'half', 'target'] },
    { id: 'term_merge_sort', term: 'Merge sort', topicId: 'topic_2_1', specificationPointId: '2.1.3', definition: 'A sorting algorithm that splits data into smaller lists, sorts them and merges them in order.', keywords: ['splits', 'sorts', 'merges'] },
    { id: 'term_integer', term: 'Integer', topicId: 'topic_2_2', specificationPointId: '2.2.2', definition: 'A whole-number data type with no fractional part.', keywords: ['whole number', 'data type'] },
    { id: 'term_casting', term: 'Casting', topicId: 'topic_2_2', specificationPointId: '2.2.2', definition: 'Converting a value from one data type to another.', keywords: ['converting', 'data type'] },
    { id: 'term_python_trace', term: 'Trace', topicId: 'topic_2_2', specificationPointId: '2.2.PY', definition: 'Following a program step by step and recording how its values and output change.', keywords: ['step by step', 'values', 'output'] },
    { id: 'term_python_test_case', term: 'Test case', topicId: 'topic_2_2', specificationPointId: '2.2.PY', definition: 'A set of input data and an expected result used to check a program.', keywords: ['input', 'expected result', 'program'] },
    { id: 'term_ide', term: 'IDE', topicId: 'topic_2_5', specificationPointId: '2.5.2', definition: 'Software that provides tools for writing, translating, running and debugging programs.', keywords: ['writing', 'running', 'debugging'] },
    { id: 'term_error_diagnostics', term: 'Error diagnostics', topicId: 'topic_2_5', specificationPointId: '2.5.2', definition: 'IDE messages and highlighting that help a programmer locate and understand errors.', keywords: ['messages', 'highlighting', 'errors'] },
    { id: 'term_cpu', term: 'CPU', topicId: 'topic_1_1', specificationPointId: '1.1.1', definition: 'The processor that fetches, decodes and executes instructions.', keywords: ['processor', 'instructions'] },
    { id: 'term_alu', term: 'ALU', topicId: 'topic_1_1', specificationPointId: '1.1.1', definition: 'The CPU component that carries out arithmetic calculations and logical comparisons.', keywords: ['arithmetic', 'logic'] },
    { id: 'term_cache', term: 'Cache', topicId: 'topic_1_1', specificationPointId: '1.1.2', definition: 'Small, fast memory close to the CPU that stores frequently used instructions and data.', keywords: ['fast', 'cpu', 'instructions'] },
    { id: 'term_ram', term: 'RAM', topicId: 'topic_1_2', specificationPointId: '1.2.1', definition: 'Volatile primary memory that stores programs and data currently in use.', keywords: ['volatile', 'programs', 'data'] },
    { id: 'term_rom', term: 'ROM', topicId: 'topic_1_2', specificationPointId: '1.2.1', definition: 'Non-volatile primary memory that stores instructions which do not normally change.', keywords: ['non-volatile', 'instructions'] },
    { id: 'term_virtual_memory', term: 'Virtual memory', topicId: 'topic_1_2', specificationPointId: '1.2.1', definition: 'A section of secondary storage used temporarily when RAM is full.', keywords: ['secondary storage', 'ram', 'full'] },
    { id: 'term_bit', term: 'Bit', topicId: 'topic_1_3', specificationPointId: '1.2.3', definition: 'A single binary digit with a value of either 0 or 1.', keywords: ['binary', '0', '1'] },
    { id: 'term_overflow', term: 'Overflow', topicId: 'topic_1_3', specificationPointId: '1.2.4a', definition: 'An error that occurs when a binary result is too large to fit in the available number of bits.', keywords: ['too large', 'bits'] },
    { id: 'term_metadata', term: 'Metadata', topicId: 'topic_1_3', definition: 'Data that describes other data, such as an image’s width, height or creation date.', keywords: ['describes', 'data'] },
    { id: 'term_lossy', term: 'Lossy compression', topicId: 'topic_1_3', specificationPointId: '1.2.5', definition: 'Compression that permanently removes some data to reduce file size.', keywords: ['removes', 'data', 'file size'] },
    { id: 'term_lan', term: 'LAN', topicId: 'topic_1_4', specificationPointId: '1.3.1', definition: 'A network covering a small geographical area, such as one school site.', keywords: ['network', 'small', 'area'] },
    { id: 'term_protocol', term: 'Protocol', topicId: 'topic_1_4', specificationPointId: '1.3.2', definition: 'An agreed set of rules for communication between devices.', keywords: ['rules', 'communication'] },
    { id: 'term_phishing', term: 'Phishing', topicId: 'topic_1_5', specificationPointId: '1.4.1', definition: 'A social-engineering attack that uses deceptive messages to trick people into revealing information or opening malicious content.', keywords: ['trick', 'message', 'information'] },
    { id: 'term_encryption', term: 'Encryption', topicId: 'topic_1_5', specificationPointId: '1.4.2', definition: 'Scrambling data so it can only be read using the correct decryption key.', keywords: ['scrambling', 'data', 'key'] },
    { id: 'term_os', term: 'Operating system', topicId: 'topic_1_6', specificationPointId: '1.5.1', definition: 'System software that manages hardware and provides services and an interface for applications and users.', keywords: ['system software', 'hardware', 'interface'] },
    { id: 'term_open_source', term: 'Open-source software', topicId: 'topic_1_7', specificationPointId: '1.6.2', definition: 'Software whose source code is available for people to inspect, modify and redistribute under its licence.', keywords: ['source code', 'modify', 'licence'] },
    { id: 'term_abstraction', term: 'Abstraction', topicId: 'topic_2_1', specificationPointId: '2.1.1', definition: 'Removing unnecessary detail so attention can be focused on the important parts of a problem.', keywords: ['unnecessary', 'detail', 'important'] },
    { id: 'term_decomposition', term: 'Decomposition', topicId: 'topic_2_1', specificationPointId: '2.1.1', definition: 'Breaking a problem into smaller, more manageable parts.', keywords: ['breaking', 'problem', 'smaller'] },
    { id: 'term_algorithm', term: 'Algorithm', topicId: 'topic_2_1', specificationPointId: '2.1.2', definition: 'A precise sequence of steps used to solve a problem.', keywords: ['sequence', 'steps', 'solve'] },
    { id: 'term_variable', term: 'Variable', topicId: 'topic_2_2', specificationPointId: '2.2.1', definition: 'A named storage location whose value can change while a program runs.', keywords: ['named', 'value', 'change'] },
    { id: 'term_selection', term: 'Selection', topicId: 'topic_2_2', specificationPointId: '2.2.1', definition: 'Choosing which instructions to execute based on whether a condition is true or false.', keywords: ['condition', 'true', 'false'] },
    { id: 'term_iteration', term: 'Iteration', topicId: 'topic_2_2', specificationPointId: '2.2.1', definition: 'Repeating a set of instructions using a loop.', keywords: ['repeating', 'instructions', 'loop'] },
    { id: 'term_array', term: 'Array', topicId: 'topic_2_2', specificationPointId: '2.2.3', definition: 'A data structure that stores multiple values of the same data type under one name, accessed using an index.', keywords: ['multiple', 'same data type', 'index'] },
    { id: 'term_syntax_error', term: 'Syntax error', topicId: 'topic_2_3', specificationPointId: '2.3.2', definition: 'An error that breaks the grammatical rules of a programming language and prevents translation or execution.', keywords: ['rules', 'language', 'prevents'] },
    { id: 'term_logic_error', term: 'Logic error', topicId: 'topic_2_3', specificationPointId: '2.3.2', definition: 'An error where a program runs but produces an unexpected result.', keywords: ['runs', 'unexpected', 'result'] },
    { id: 'term_validation', term: 'Validation', topicId: 'topic_2_3', specificationPointId: '2.3.1', definition: 'Checking that input data meets specified rules before it is processed.', keywords: ['checking', 'input', 'rules'] },
    { id: 'term_boolean', term: 'Boolean', topicId: 'topic_2_4', specificationPointId: '2.4.1', definition: 'A data value or expression that can be only true or false.', keywords: ['true', 'false'] },
    { id: 'term_compiler', term: 'Compiler', topicId: 'topic_2_5', specificationPointId: '2.5.1', definition: 'A translator that converts an entire high-level program into machine code before it is run.', keywords: ['translator', 'entire', 'machine code'] },
    { id: 'term_interpreter', term: 'Interpreter', topicId: 'topic_2_5', specificationPointId: '2.5.1', definition: 'A translator that translates and executes a high-level program one instruction at a time.', keywords: ['translator', 'one', 'instruction'] },
    { id: 'term_pseudocode', term: 'Pseudocode', topicId: 'topic_2_1', specificationPointId: '2.2.ERL', definition: 'A structured, language-independent way to describe the steps of an algorithm.', keywords: ['structured', 'language-independent', 'algorithm'] }
  ],
  questions: [
    ...curriculumDiagnosticQuestions,
    ...priorityAssessments.questions,
    {
      "id": "q_1_1_a",
      "topicId": "topic_1_1",
      "specificationPointId": "1.1.1",
      "purpose": "retrieval",
      "type": "mcq",
      "question": "What is the primary function of the Control Unit (CU) inside the CPU?",
      "options": [
        "To manage the execution of instructions and control the flow of data through the CPU",
        "To perform arithmetic calculations and logical comparisons",
        "To hold the RAM memory address of the next instruction",
        "To store frequently used instructions close to the processor die"
      ],
      "answer": "To manage the execution of instructions and control the flow of data through the CPU",
      "explanation": "The Control Unit (CU) decodes instructions, sends timing signals, and coordinates the FDE cycle.",
      "retryHint": "Separate coordination from calculation: look for the component that decodes each instruction and signals other CPU parts to act in the required sequence."
    },
    {
      "id": "q_1_1_b",
      "topicId": "topic_1_1",
      "specificationPointId": "1.1.1",
      "purpose": "retrieval",
      "type": "mcq",
      "question": "Which CPU register holds the memory address of the NEXT instruction to be fetched?",
      "options": [
        "Program Counter (PC)",
        "Memory Address Register (MAR)",
        "Memory Data Register (MDR)",
        "Accumulator (ACC)"
      ],
      "answer": "Program Counter (PC)",
      "explanation": "The Program Counter (PC) holds the memory address of the next instruction to fetch, and increments during each fetch phase.",
      "retryHint": "Track the fetch cycle before data moves: identify the register whose value advances to point towards the following instruction, not one carrying the current memory transfer."
    },
    {
      "id": "q_1_1_c",
      "topicId": "topic_1_1",
      "specificationPointId": "1.1.2",
      "purpose": "retrieval",
      "type": "mcq",
      "question": "Why does increasing CPU Cache size improve overall system performance?",
      "options": [
        "Cache is faster than RAM, so storing frequently used data in Cache reduces slow RAM fetch delays",
        "Cache increases the clock speed frequency of the CPU cores",
        "Cache allows the CPU to run 64-bit applications instead of 32-bit",
        "Cache prevents the CPU from overheating under heavy workloads"
      ],
      "answer": "Cache is faster than RAM, so storing frequently used data in Cache reduces slow RAM fetch delays",
      "explanation": "Cache memory operates at near-CPU speeds. Having more cache reduces the frequency of slow RAM access trips."
    },
    {
      "id": "q_1_2_a",
      "topicId": "topic_1_2",
      "specificationPointId": "1.2.1",
      "purpose": "retrieval",
      "type": "mcq",
      "question": "Which statement correctly describes the difference between RAM and ROM?",
      "options": [
        "RAM is volatile and read/write; ROM is non-volatile and read-only",
        "RAM is non-volatile and read-only; ROM is volatile and read/write",
        "RAM holds the BIOS boot instructions; ROM holds open applications",
        "RAM is secondary storage; ROM is primary memory"
      ],
      "answer": "RAM is volatile and read/write; ROM is non-volatile and read-only",
      "explanation": "RAM loses its data when power is lost (volatile). ROM retains data permanently (non-volatile) and stores bootloader instructions.",
      "retryHint": "Compare what happens to each memory type when power is removed and whether the processor can normally change the stored contents."
    },
    {
      "id": "q_1_2_b",
      "topicId": "topic_1_2",
      "specificationPointId": "1.2.2",
      "purpose": "retrieval",
      "type": "mcq",
      "question": "Why is a Solid State Drive (SSD) more suitable for an action camera than a hard disk drive (HDD)?",
      "options": [
        "SSDs have zero moving parts, making them durable against bumps and drops",
        "SSDs have lower cost per gigabyte than HDDs",
        "SSDs use optical lasers to read data through water",
        "SSDs do not require power from the camera battery"
      ],
      "answer": "SSDs have zero moving parts, making them durable against bumps and drops",
      "explanation": "SSDs use flash memory transistors with no mechanical heads, making them shock-resistant and ideal for mobile devices."
    },
    {
      "id": "q_1_3_a",
      "topicId": "topic_1_3",
      "specificationPointId": "1.2.4a",
      "purpose": "retrieval",
      "type": "mcq",
      "question": "What is the denary equivalent of the 8-bit binary number 0010 1100?",
      "options": [
        "44",
        "36",
        "52",
        "28"
      ],
      "answer": "44",
      "explanation": "Place values: 32 + 8 + 4 = 44."
    },
    {
      "id": "q_1_3_b",
      "topicId": "topic_1_3",
      "specificationPointId": "1.2.4a",
      "purpose": "retrieval",
      "type": "mcq",
      "question": "What happens when an 8-bit binary left shift by 2 places is performed on 0000 0101 (5)?",
      "options": [
        "The number becomes 0001 0100 (20) because a left shift by 2 multiplies by 4",
        "The number becomes 0000 0001 (1) because it divides by 4",
        "The number becomes 0000 1010 (10) because it multiplies by 2",
        "An overflow error immediately occurs"
      ],
      "answer": "The number becomes 0001 0100 (20) because a left shift by 2 multiplies by 4",
      "explanation": "Shifting left by 2 places multiplies the binary value by 2^2 = 4 (5 * 4 = 20)."
    },
    {
      "id": "q_1_3_c",
      "topicId": "topic_1_3",
      "specificationPointId": "1.2.4d",
      "purpose": "retrieval",
      "type": "mcq",
      "question": "Which formula correctly calculates the uncompressed file size of a sound file in bits?",
      "options": [
        "Sample Rate (Hz) × Bit Depth × Duration (seconds)",
        "Width × Height × Colour Depth",
        "Sample Rate (Hz) ÷ Bit Depth × 8",
        "Resolution × Compression Ratio"
      ],
      "answer": "Sample Rate (Hz) × Bit Depth × Duration (seconds)",
      "explanation": "Sound size in bits = samples per second * bits per sample * total seconds."
    },
    {
      "id": "q_1_4_a",
      "topicId": "topic_1_4",
      "specificationPointId": "1.3.1",
      "purpose": "retrieval",
      "type": "mcq",
      "question": "What is the main function of a router in a network?",
      "options": [
        "To forward data packets between different networks using IP addresses",
        "To connect devices on a single LAN using MAC addresses",
        "To convert digital signals into analogue sound waves",
        "To store website files for local network caching"
      ],
      "answer": "To forward data packets between different networks using IP addresses",
      "explanation": "Routers connect distinct networks (e.g. LAN to internet WAN) by inspecting IP packet headers.",
      "retryHint": "Focus on the device that reads destination addressing information and chooses the next network path for each packet."
    },
    {
      "id": "q_1_4_b",
      "topicId": "topic_1_4",
      "specificationPointId": "1.3.2",
      "purpose": "historical",
      "retired": true,
      "assessmentStatus": "retired_out_of_scope",
      "type": "mcq",
      "question": "Which layer of the TCP/IP model handles web protocols such as HTTP, HTTPS, and FTP?",
      "options": [
        "Application Layer",
        "Transport Layer",
        "Internet Layer",
        "Link Layer"
      ],
      "answer": "Application Layer",
      "explanation": "The Application Layer (Layer 4) provides user-facing application protocols like HTTP, FTP, and SMTP."
    },
    {
      "id": "q_1_4_layer_benefits",
      "topicId": "topic_1_4",
      "specificationPointId": "1.3.2",
      "purpose": "retrieval",
      "type": "mcq",
      "question": "Why are communication protocols organised into layers?",
      "options": [
        "Each layer can be developed or changed without redesigning the entire protocol system",
        "Every device must use a different protocol at each layer",
        "Layering removes the need for standards between manufacturers",
        "Each layer gives a network device a new MAC address"
      ],
      "answer": "Each layer can be developed or changed without redesigning the entire protocol system",
      "explanation": "Layers separate responsibilities, supporting interoperability, independent development and easier troubleshooting.",
      "retryHint": "Think about how separating a complex communication process into independent responsibilities helps developers replace one part and locate faults."
    },
    {
      "id": "q_1_3_image_size_effect",
      "topicId": "topic_1_3",
      "specificationPointId": "1.2.4c",
      "purpose": "retrieval",
      "type": "mcq",
      "question": "An uncompressed bitmap keeps the same resolution but changes from 4-bit to 8-bit colour depth. What happens to the pixel-data size?",
      "options": [
        "It doubles because twice as many bits are stored for every pixel",
        "It halves because more colours can be represented",
        "It stays unchanged because the resolution is unchanged",
        "It becomes lossless because metadata is added"
      ],
      "answer": "It doubles because twice as many bits are stored for every pixel",
      "explanation": "Pixel-data size is resolution multiplied by colour depth. With the same number of pixels, doubling bits per pixel doubles the uncompressed pixel data.",
      "retryHint": "Keep the dimensions fixed. Work out the per-pixel storage under each setting, then compare those two quantities to find the scale factor."
    },
    {
      "id": "q_1_5_c",
      "topicId": "topic_1_5",
      "specificationPointId": "1.4.2",
      "purpose": "retrieval",
      "type": "mcq",
      "question": "How does a firewall protect a computer network?",
      "options": [
        "By monitoring network traffic and blocking packets that do not meet security rules",
        "By encrypting all files stored on local hard drives",
        "By automatically scanning downloaded files for virus signatures",
        "By preventing physical theft of server hardware"
      ],
      "answer": "By monitoring network traffic and blocking packets that do not meet security rules",
      "explanation": "A firewall acts as a filter on network ports to block unauthorized packet transmissions.",
      "retryHint": "Think about a boundary control that compares incoming and outgoing traffic with configured rules before allowing it to pass."
    },
    {
      "id": "q_1_6_a",
      "topicId": "topic_1_6",
      "specificationPointId": "1.5.1",
      "purpose": "retrieval",
      "type": "mcq",
      "question": "What is the purpose of a device driver in an operating system?",
      "options": [
        "To act as a translator allowing the OS to communicate with hardware peripherals",
        "To defragment hard disk drive sectors for faster access",
        "To compile high-level Python code into machine code",
        "To manage user logins and access privileges"
      ],
      "answer": "To act as a translator allowing the OS to communicate with hardware peripherals",
      "explanation": "Device drivers translate generic OS hardware commands into specific peripheral control signals.",
      "retryHint": "Consider why an operating system needs device-specific software between its general commands and the instructions understood by a peripheral."
    },
    {
      "id": "q_1_7_a",
      "topicId": "topic_1_7",
      "specificationPointId": "1.6.2",
      "purpose": "retrieval",
      "type": "mcq",
      "question": "Which UK law makes it a criminal offence to access a computer system without authorization?",
      "options": [
        "Computer Misuse Act 1990",
        "Data Protection Act 2018",
        "Copyright, Designs and Patents Act 1988",
        "Freedom of Information Act 2000"
      ],
      "answer": "Computer Misuse Act 1990",
      "explanation": "The Computer Misuse Act 1990 criminalises unauthorized access, hacking, and malware creation.",
      "retryHint": "Match the offence to legislation concerned with entering or changing computer systems without permission, not personal-data handling or copyright."
    },
    {
      "id": "q_2_4_e",
      "topicId": "topic_2_4",
      "specificationPointId": "2.4.1",
      "purpose": "retrieval",
      "type": "mcq",
      "question": "What is the output of an OR gate when Input A is 0 and Input B is 1?",
      "options": [
        "1",
        "0",
        "Undefined",
        "-1"
      ],
      "answer": "1",
      "explanation": "An OR gate outputs 1 if at least one input is 1.",
      "retryHint": "Apply the gate rule by checking whether either input is active; do not require both inputs to have the same state."
    },
    {
      "id": "q_2_5_e",
      "topicId": "topic_2_5",
      "specificationPointId": "2.5.1",
      "purpose": "retrieval",
      "type": "mcq",
      "question": "What is the main difference between a Compiler and an Interpreter?",
      "options": [
        "A compiler translates entire source code into an executable file at once; an interpreter translates and runs code line-by-line",
        "A compiler is used for low-level assembly; an interpreter is used for machine code",
        "A compiler finds logic errors; an interpreter finds syntax errors",
        "A compiler runs code slower than an interpreter during runtime"
      ],
      "answer": "A compiler translates entire source code into an executable file at once; an interpreter translates and runs code line-by-line",
      "retryHint": "Compare when translation occurs and whether a separate executable is produced before considering how each translated program is run.",
      "explanation": "Compilers produce standalone executable files; interpreters translate and execute source code line-by-line."
    },
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
      "specificationPointId": "2.2.1",
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
      "explanation": "Input validation checks whether data follows specified rules before it is processed. If a check fails, the program should reject the data or ask for it again."
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
      "explanation": "An AND gate output is only true (1) if all of its input lines are true (1).",
      "retryHint": "Use the gate rule that every input condition must be satisfied together, then test each option against that requirement."
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
      "question": "Why is a high-level language generally easier for a programmer to use than a low-level language?",
      "options": [
            "It uses more human-readable instructions and abstracts hardware details",
            "It is executed directly by the CPU without translation",
            "It can only run on one processor architecture",
            "It is written entirely as binary digits"
      ],
      "answer": "It uses more human-readable instructions and abstracts hardware details",
      "explanation": "High-level languages provide readable constructs and hide many hardware-specific details, making programs faster to develop and easier to maintain."
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
                  "label": "Translator",
                  "match": "Converts or executes source instructions so the processor can run the program"
            },
            {
                  "label": "Runtime Environment",
                  "match": "Enables the user to run the program within a controlled test area"
            }
      ],
        "explanation": "The editor supports writing code; diagnostics identify errors; the translator converts or executes source instructions; the run-time environment runs the program."
},
    {
      "id": "q_1_1_cpu_purpose",
      "legacyQuestionId": "q_1_1_a",
      "topicId": "topic_1_1",
      "specificationPointId": "1.1.1",
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
      "id": "q_1_1_cache_performance",
      "legacyQuestionId": "q_1_1_b",
      "topicId": "topic_1_1",
      "specificationPointId": "1.1.2",
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
      "id": "q_1_1_mdr",
      "legacyQuestionId": "q_1_1_c",
      "topicId": "topic_1_1",
      "specificationPointId": "1.1.1",
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
      "id": "q_1_2_ram_rom_difference_alt",
      "legacyQuestionId": "q_1_2_a",
      "topicId": "topic_1_2",
      "specificationPointId": "1.2.1",
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
      "id": "q_1_2_virtual_memory",
      "legacyQuestionId": "q_1_2_b",
      "topicId": "topic_1_2",
      "specificationPointId": "1.2.1",
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
      "id": "q_1_3_binary_overflow",
      "legacyQuestionId": "q_1_3_a",
      "topicId": "topic_1_3",
      "specificationPointId": "1.2.4a",
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
      "id": "q_1_3_unicode",
      "legacyQuestionId": "q_1_3_b",
      "topicId": "topic_1_3",
      "specificationPointId": "1.2.4b",
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
      "id": "q_1_3_sampling_rate",
      "legacyQuestionId": "q_1_3_c",
      "topicId": "topic_1_3",
      "specificationPointId": "1.2.4d",
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
      "id": "q_1_4_lan_wan",
      "legacyQuestionId": "q_1_4_a",
      "topicId": "topic_1_4",
      "specificationPointId": "1.3.1",
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
      "id": "q_1_4_router_role_alt",
      "legacyQuestionId": "q_1_4_b",
      "topicId": "topic_1_4",
      "specificationPointId": "1.3.1",
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
      "question": "Which address identifies a network interface within a network and is normally written as hexadecimal pairs?",
      "options": [
            "MAC Address",
            "IP Address",
            "DNS Address",
            "TCP Address"
      ],
      "answer": "MAC Address",
      "explanation": "A Media Access Control (MAC) address is assigned to a network interface and is normally represented as hexadecimal pairs. It is used for communication within a network.",
      "retryHint": "Distinguish the address used to identify a network interface on the local network from the logical address used when routing between networks."
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
      "id": "q_1_5_firewall_alt",
      "legacyQuestionId": "q_1_5_c",
      "topicId": "topic_1_5",
      "specificationPointId": "1.4.2",
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
      "id": "q_1_6_multitasking",
      "legacyQuestionId": "q_1_6_a",
      "topicId": "topic_1_6",
      "specificationPointId": "1.5.1",
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
      "id": "q_1_7_data_protection_act",
      "legacyQuestionId": "q_1_7_a",
      "topicId": "topic_1_7",
      "specificationPointId": "1.6.2",
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
    ...priorityAssessments.writtenQuestions,
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
            "Parameterised Queries: Keeping input separate from the SQL instruction so it is treated as data rather than executable SQL. Validation and sanitisation may add further input checks.",
            "Maintainability: Using commenting, indentation, and clear naming conventions so other programmers can audit and fix bugs in code."
      ],
      "rubric": [
            "1-2 Marks: Lists defensive design concepts (like validation or authentication) but fails to explain them.",
            "3-4 Marks: Explains two defensive design methods with moderate detail linked to the login scenario.",
            "5-6 Marks: Explains three methods (for example authentication, validation and parameterised queries) thoroughly, linking them to security and robustness in the login console."
      ],
      "modelAnswer": "Firstly, the programmer should implement input validation to ensure that user inputs fit specific criteria, such as checking password length or ensuring the username uses an allowed format. Secondly, authentication should be used to verify the user's identity, such as checking password records in a database before granting access. Thirdly, parameterised queries should keep user input separate from SQL instructions, so input is treated as data rather than executable SQL.",
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
      title: 'First edit: complete a welcome message',
      instructions: 'Read the Python, predict what the unfinished version prints, then set subject so the complete welcome message passes the check.',
      problem: 'The subject string is empty. Set it to "Computer Science" without changing the print statement.',
      code: 'username = "Harriet"\nsubject = ""\nprint("Welcome " + username + " to " + subject)',
      expectedOutput: 'Welcome Harriet to Computer Science',
      supportLadder: [
        'The variable "username" stores "Harriet".',
        'The variable "subject" needs to store the missing subject name.',
        'Put the text Computer Science between the quotation marks assigned to subject.'
      ],
      testCases: [
        { input: '', inputs: [], expected: 'Welcome Harriet to Computer Science' }
      ],
      explainQuestion: 'Explain why strings are concatenated using the + operator in Python.',
      explainModelAnswer: 'The + operator is used to join or concatenate two or more strings together to create a single string.',
      awardsCompletion: false,
      learningMode: 'guided-reading'
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
      explainModelAnswer: 'Loops repeat a block without duplicating instructions, making the program shorter, easier to maintain and less likely to contain inconsistent repeated code.'
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
      explainModelAnswer: 'Using "with open" closes the file when the block finishes, flushes buffered writes and releases the operating-system file handle even if an error occurs.'
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
    },
    {
      id: 'pc_10', level: 10, concept: 'Core: 2D Array Search', title: 'Core Practice: 2D Grid Search', instructions: 'Write `search_grid(grid, target)` to return the coordinate list [row, col] of the target in a 2D grid, or [-1, -1] if not found.', problem: 'Iterate through nested 2D array rows and columns.',
      code: 'def search_grid(grid, target):\n    # Return [row, col] or [-1, -1]\n    pass', expectedOutput: '[1, 0]', supportLadder: ['Use nested loops: `for r in range(len(grid)):` and `for c in range(len(grid[r])):`', 'Access elements using `grid[r][c]`.', 'Return `[r, c]` as soon as `grid[r][c] == target`.'],
      testCases: [{ input: 'grid=[[1,2],[5,6]], target=5', inputs: [], functionName: 'search_grid', functionArgs: [[[1,2],[5,6]], 5], expected: '[1, 0]' }, { input: 'grid=[[1,2],[5,6]], target=9', inputs: [], functionName: 'search_grid', functionArgs: [[[1,2],[5,6]], 9], expected: '[-1, -1]' }],
      explainQuestion: 'Explain how 2D array indexing differs from 1D array indexing.', explainModelAnswer: '1D arrays require a single index `arr[i]` to access a row element; 2D arrays require two indexes `grid[row][col]` to specify both the row and column coordinates.'
    },
    {
      id: 'pc_11', level: 11, concept: 'Core: Subprograms and Records', title: 'Core Practice: Process Student Scores', instructions: 'Write `get_high_scorers(names, scores, threshold)` that returns a list of names whose corresponding score meets the threshold.', problem: 'Use corresponding positions in two fixed-length lists to model fields in a collection of records.',
      code: 'def get_high_scorers(names, scores, threshold):\n    # Return names whose corresponding score meets the threshold\n    pass', expectedOutput: "['Harriet', 'Alex']", supportLadder: ['Use an index to visit the same position in both fixed-length lists.', 'Append names[index] when scores[index] meets the threshold.', 'Return the result list after every record has been considered.'],
      testCases: [
        { input: "['Harriet','Dev','Alex'], [85,40,92], 50", inputs: [], functionName: 'get_high_scorers', functionArgs: [['Harriet', 'Dev', 'Alex'], [85, 40, 92], 50], expected: "['Harriet', 'Alex']" },
        { input: "['Sam','Lee'], [49,50], 50", inputs: [], functionName: 'get_high_scorers', functionArgs: [['Sam', 'Lee'], [49, 50], 50], expected: "['Lee']" }
      ],
      explainQuestion: 'Explain why return values are preferable to global variable mutations in modular programming.', explainModelAnswer: 'Return values allow functions to pass data cleanly back to callers without creating side-effects or mutating global states.'
    },
    {
      id: 'pc_12', level: 12, concept: 'Core: Random Number Generation', title: 'Core Practice: Reproducible Dice Roll', instructions: 'Write `roll_die(seed_value)` so it seeds Python’s random generator and returns an integer from 1 to 6 inclusive.', problem: 'Import random, seed the generator with the parameter and return a bounded random integer.',
      code: 'def roll_die(seed_value):\n    # Seed the generator, then return an integer from 1 to 6\n    pass', expectedOutput: '4', supportLadder: ['Import the random module.', 'Call `random.seed(seed_value)` so tests are reproducible.', 'Use `random.randint(1, 6)` and return the result.'],
      testCases: [{ input: 'seed 0', inputs: [], functionName: 'roll_die', functionArgs: [0], expected: '4' }, { input: 'seed 1', inputs: [], functionName: 'roll_die', functionArgs: [1], expected: '2' }],
      explainQuestion: 'Why must both bounds be stated when generating a simulated die roll?', explainModelAnswer: 'The program must restrict generated integers to the six valid outcomes, 1 through 6 inclusive.'
    },
    {
      id: 'pc_13', level: 13, concept: 'Core: Simple Authentication', title: 'Core Practice: Authenticate a User', instructions: 'Write `authenticate(usernames, passwords, entered_username, entered_password)` to return True only when both entered values match the same stored record.', problem: 'Use corresponding positions in two fixed-length lists and do not accept a password belonging to a different username.',
      code: 'def authenticate(usernames, passwords, entered_username, entered_password):\n    # Return True only for a matching username/password record\n    pass', expectedOutput: 'True', supportLadder: ['Search each username by index.', 'When a username matches, compare the password at the same index.', 'Return False only after no matching record succeeds.'],
      testCases: [
        { input: 'known matching record', inputs: [], functionName: 'authenticate', functionArgs: [['sam', 'lee'], ['red7', 'blue9'], 'lee', 'blue9'], expected: 'True' },
        { input: 'password belongs to another user', inputs: [], functionName: 'authenticate', functionArgs: [['sam', 'lee'], ['red7', 'blue9'], 'lee', 'red7'], expected: 'False' },
        { input: 'unknown user', inputs: [], functionName: 'authenticate', functionArgs: [['sam', 'lee'], ['red7', 'blue9'], 'alex', 'blue9'], expected: 'False' }
      ],
      explainQuestion: 'Why is checking that a password appears anywhere in the password list insecure?', explainModelAnswer: 'Authentication must verify that the password belongs to the same record as the entered username; an unrelated user’s password must not grant access.'
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

// Every official teaching strand needs an honest route from supported practice
// to a reviewable application response. Existing authored application tasks take
// precedence; this fills only strands that previously had no open-response or
// executable application route.
const objectiveLocations = new Map(defaultDatabase.units.flatMap(unit =>
  unit.topics.flatMap(topic => topic.objectives.map(objective => [objective.id, topic.id]))
));
const preMappedWrittenStrands = {
  wq_1: '1.6.1', wq_2: '1.4.2', wq_3: '1.1.2', wq_4: '1.2.1', wq_5: '1.3.1',
  wq_6: '1.2.4d', wq_7: '2.1.3', wq_8: '2.3.1', wq_9: '2.5.1'
};
const applicationStrands = new Set([
  ...defaultDatabase.writtenQuestions.map(item => item.specificationPointId || preMappedWrittenStrands[item.id]),
  ...defaultDatabase.programmingChallenges
    .filter(item => item.purpose === 'application')
    .map(item => item.specificationPointId)
]);
const applicationCommandWord = modes => {
  if (modes.includes('calculate') || modes.includes('calculation')) return 'Calculate';
  if (modes.includes('compare') || modes.includes('comparison')) return 'Compare';
  if (modes.includes('recommendation')) return 'Recommend';
  if (modes.includes('discussion') || modes.includes('evaluation')) return 'Discuss';
  if (modes.includes('design')) return 'Design';
  if (modes.includes('trace')) return 'Trace';
  return 'Explain';
};
const concreteApplicationDetails = {
  '1.1.1': {
    question: 'A CPU fetches an instruction from memory location 4. Trace the fetch cycle by describing the specific contents of the PC, MAR, MDR, and Control Unit during this step, and explain which register stores an address versus actual data.',
    scenario: 'Tracing the CPU fetch-execute cycle for address 4.',
    rubric: [
      'States that PC contains address 4 initially.',
      'Explains that address 4 is copied to MAR while the instruction at address 4 is loaded into MDR.',
      'Identifies PC and MAR as address registers, whereas MDR holds data/instructions.'
    ],
    modelAnswer: 'The PC starts holding address 4. To fetch the instruction, address 4 is copied into the MAR. The CPU reads memory address 4 and copies the instruction content into the MDR. The PC is then incremented to 5. MAR and PC store memory addresses, while MDR stores the data or instruction fetched.'
  },
  '1.1.3': {
    question: 'Compare a washing machine controller, a PlayStation 5, and an office desktop PC. Identify which device contains an embedded system and justify your choice based on hardware flexibility, purpose, and operating system requirements.',
    scenario: 'Classifying embedded systems versus general-purpose computers.',
    rubric: [
      'Identifies the washing machine controller as an embedded system.',
      'Explains that general-purpose PCs can perform arbitrary user-selected tasks.',
      'Justifies embedded status using dedicated function, limited user interface, and fixed firmware.'
    ],
    modelAnswer: 'The washing machine controller is an embedded system because it is built into a larger device to perform one dedicated purpose (controlling wash cycles). In contrast, a desktop PC and PlayStation 5 are general-purpose devices capable of running multiple unrelated applications chosen by the user.'
  },
  '1.2.2': {
    question: 'A cyclist needs a camera attached to a bike helmet, a school needs a 10 TB nightly backup system, and a publisher needs to distribute 500 physical textbook DVDs. Recommend the best storage technology (Solid State, Magnetic, Optical) for each scenario and justify each choice using capacity, durability, and portability.',
    scenario: 'Selecting secondary storage media for specific operational constraints.',
    rubric: [
      'Recommends Solid State for helmet camera due to high durability and lack of moving parts.',
      'Recommends Magnetic storage (HDD/tape) for 10 TB backup due to low cost per gigabyte at high capacity.',
      'Recommends Optical storage for distributing physical textbook DVDs due to low mass production cost.'
    ],
    modelAnswer: 'For the helmet camera, solid-state flash storage is best because it has no moving parts and will not be damaged by movement/shocks. For 10 TB nightly backups, magnetic storage (HDD) is best because it provides high capacity at the lowest cost per GB. For distributing physical media, optical storage (DVD) is inexpensive to produce and portable.'
  },
  '1.2.3': {
    question: 'Convert a file size of 32,000 bits into bytes, and then convert bytes into KB using the OCR decimal convention (1 KB = 1,000 bytes). Show all calculation steps clearly.',
    scenario: 'Calculating data storage units from bits to kilobytes.',
    rubric: [
      'Divides 32,000 bits by 8 to obtain 4,000 bytes.',
      'Divides 4,000 bytes by 1,000 to obtain 4 KB.',
      'Shows complete arithmetic steps and correct unit labels.'
    ],
    modelAnswer: '32,000 bits / 8 = 4,000 bytes. 4,000 bytes / 1,000 = 4 KB. The file size is 4 KB.'
  },
  '1.2.4a': {
    question: 'Convert hexadecimal 3A to 8-bit binary and denary. Next, add the 8-bit binary values 01011100 (92) and 01100101 (101), state whether an overflow error occurs, and trace a 2-place right shift on 01011100.',
    scenario: 'Performing binary conversions, 8-bit addition, overflow detection, and binary shifts.',
    rubric: [
      'Converts 3A to binary 00111010 and denary 58.',
      'Adds 01011100 + 01100101 to get 11000001 (193) and confirms no overflow occurs (fits in 8 bits).',
      'Performs right shift of 01011100 by 2 places to produce 00010111 (23).'
    ],
    modelAnswer: 'Hexadecimal 3A: 3 = 0011, A = 1010 -> Binary 00111010. Denary: (3 * 16) + 10 = 58. Addition: 01011100 + 01100101 = 11000001 (193 denary). No overflow error occurs because 193 <= 255 (fits in 8 bits). Right shift of 01011100 by 2 bits gives 00010111 (denary 23).'
  },
  '1.2.4b': {
    question: 'Calculate the total number of unique character codes that can be represented using a 7-bit ASCII character set versus a 16-bit Unicode character set. If the ASCII code for character "A" is 65 (01000001), state the binary representation for character "D".',
    scenario: 'Comparing character set capacities and calculating ASCII binary codes.',
    rubric: [
      'Calculates 2^7 = 128 codes for 7-bit ASCII and 2^16 = 65,536 codes for 16-bit Unicode.',
      'Identifies character "D" as denary code 68.',
      'Converts 68 to 8-bit binary 01000100.'
    ],
    modelAnswer: '7-bit ASCII can represent 2^7 = 128 characters. 16-bit Unicode can represent 2^16 = 65,536 characters. If "A" = 65, then "D" = 68. 68 in 8-bit binary is 01000100.'
  },
  '1.2.4c': {
    question: 'Calculate the uncompressed file size in bytes for a bitmap image with dimensions of 320 by 200 pixels and an 8-bit colour depth. Explain how increasing the colour depth to 16 bits affects both image quality and file size.',
    scenario: 'Calculating bitmap image file size and evaluating colour depth changes.',
    rubric: [
      'Calculates total pixels: 320 * 200 = 64,000 pixels.',
      'Multiplies 64,000 * 8 bits = 512,000 bits, then divides by 8 = 64,000 bytes (64 KB).',
      'Explains that 16-bit colour depth doubles file size to 128 KB while allowing 65,536 colours for higher quality.'
    ],
    modelAnswer: 'Total pixels = 320 * 200 = 64,000 pixels. File size in bits = 64,000 * 8 = 512,000 bits. File size in bytes = 512,000 / 8 = 64,000 bytes (64 KB). Increasing colour depth to 16 bits doubles the stored bits per pixel, doubling file size to 128 KB while supporting up to 65,536 unique colours for smoother gradients and higher image fidelity.'
  },
  '1.2.5': {
    question: 'Recommend either Lossy or Lossless compression for: (1) Python source code file main.py, (2) a high-resolution photograph on a mobile news app, and (3) a medical chest X-ray. Justify each recommendation.',
    scenario: 'Choosing lossy versus lossless compression based on data integrity requirements.',
    rubric: [
      'Recommends Lossless for Python source code because losing characters creates syntax errors.',
      'Recommends Lossy for mobile photo to reduce file size and transmission time with negligible visual quality loss.',
      'Recommends Lossless for medical X-ray because precision cannot be compromised.'
    ],
    modelAnswer: '(1) Python source code requires Lossless compression because any data loss would corrupt code syntax. (2) Mobile news photograph should use Lossy compression to significantly cut file size and speed up download times without noticeably impairing viewing quality. (3) Medical X-ray requires Lossless compression because accurate diagnostic details must be preserved with zero data degradation.'
  },
  '1.3.2': {
    question: 'A user has three network tasks: (1) connecting a wireless keyboard to a laptop 1 metre away, (2) streaming 4K video to a smart TV across a house, and (3) connecting a desktop PC directly to a high-speed router. Match Bluetooth, Wi-Fi, and Ethernet to these tasks. Then state the roles of MAC addresses versus IP addresses.',
    scenario: 'Matching network connection media and distinguishing MAC vs IP addresses.',
    rubric: [
      'Matches Task 1 to Bluetooth, Task 2 to Wi-Fi, Task 3 to Ethernet.',
      'Explains MAC address is a permanent physical identifier burnt into the NIC.',
      'Explains IP address is a logical network address used for routing across global WAN networks.'
    ],
    modelAnswer: 'Task 1 (keyboard) -> Bluetooth (short-range wireless). Task 2 (smart TV) -> Wi-Fi (longer-range wireless LAN). Task 3 (desktop PC) -> Ethernet (high-speed reliable wired connection). A MAC address is a unique, fixed physical address assigned to the NIC hardware. An IP address is a logical address assigned dynamically or statically to locate devices across interconnected networks (WANs/Internet).'
  },
  '1.4.1': {
    question: 'Identify the specific network attack in each scenario and explain how to mitigate it: (A) An employee receives an email claiming to be from IT requesting their password on a fake login page. (B) A company web server becomes unresponsive due to a flood of traffic from thousands of infected bots. (C) An attacker enters "\' OR \'1\'=\'1" into a web form to view unauthorized user data.',
    scenario: 'Identifying attack vectors (Phishing, DDoS, SQL Injection) and prevention methods.',
    rubric: [
      'Identifies Scenario A as Phishing (Social Engineering), B as DDoS, C as SQL Injection.',
      'Recommends staff training/MFA for Phishing, firewalls/traffic filtering for DDoS, and input validation/parameterized queries for SQL Injection.'
    ],
    modelAnswer: 'Scenario A is Phishing: mitigate with staff awareness training, email filters, and multi-factor authentication. Scenario B is a Distributed Denial of Service (DDoS) attack: mitigate using web application firewalls and traffic scrubbing services. Scenario C is SQL Injection: mitigate by using input sanitisation, validation, and parameterized SQL queries.'
  },
  '1.5.1': {
    question: 'Trace the operating system functions involved when a user runs a photo editor while playing audio and sending a file to a printer. Describe how memory management, multitasking, and device drivers coordinate these actions.',
    scenario: 'Tracing Operating System management of memory, processes, and peripherals.',
    rubric: [
      'Describes memory management allocating RAM for photo editor and audio player.',
      'Explains CPU scheduling (multitasking) switching processing time between active threads.',
      'Explains printer device driver translating print commands into printer-specific format.'
    ],
    modelAnswer: 'Memory management allocates separate RAM areas for the photo editor and audio player to prevent memory overwrites. The OS multitasking scheduler allocates CPU time slices to both applications so audio plays smoothly while photos render. Device drivers communicate with the printer by translating OS print data into hardware-specific control signals.'
  },
  '1.5.2': {
    question: 'Explain the utility tasks performed by Disk Defragmentation, File Compression, and Disk Encryption. Explain why Disk Defragmentation should be run on a magnetic Hard Disk Drive (HDD) but MUST NOT be run on a Solid State Drive (SSD).',
    scenario: 'Evaluating utility software and HDD vs SSD defragmentation principles.',
    rubric: [
      'Explains Defragmentation reorganises split file blocks to adjacent sectors on disk.',
      'Explains Compression reduces file size and Encryption protects data at rest.',
      'Explains HDDs benefit because moving read heads read contiguous sectors faster, whereas SSDs have no moving parts and defragmentation causes unnecessary write wear.'
    ],
    modelAnswer: 'Disk Defragmentation reorganises fragmented file blocks into contiguous storage blocks. File Compression reduces file size to conserve space. Disk Encryption scrambles data using a key to protect against unauthorized access. HDDs benefit from defragmentation because moving read/write heads read contiguous sectors much faster. SSDs must not be defragmented because they have near-instant random access (no moving parts) and unnecessary writes degrade SSD flash memory lifespans.'
  },
  '1.6.2': {
    question: 'A school is choosing software for 500 student laptops. Option A is Proprietary Commercial Software (£15/user/year, closed source). Option B is Open Source Software (Free, open source). Recommend one option, comparing cost, source code access, and support. Then state which UK law prohibits unauthorized modification of software source code.',
    scenario: 'Recommending software licensing models and identifying relevant legislation.',
    rubric: [
      'Recommends Open Source or Proprietary with valid justification of cost versus official support.',
      'Compares source code visibility and license terms.',
      'Identifies the Computer Misuse Act 1990 (or Copyright, Designs and Patents Act 1988 for copyright infringement).'
    ],
    modelAnswer: 'Open Source Software is recommended for the school because it eliminates £7,500 annual licensing costs and permits customisation of source code. However, Proprietary Software provides official dedicated technical support. Unauthorized modification of software without permission or hacking into source systems violates the Computer Misuse Act 1990, while distributing unauthorized copies violates the Copyright, Designs and Patents Act 1988.'
  },
  '2.1.1': {
    question: 'Decompose a School Library System into three smaller sub-problems. Then explain how abstraction is applied when modeling a "Book" record by stating two essential attributes included and two non-essential details removed.',
    scenario: 'Applying decomposition and abstraction to a library software design.',
    rubric: [
      'Decomposes library system into 3 logical sub-problems (e.g. User Login, Book Search, Loan Tracking).',
      'Identifies essential attributes (e.g. ISBN, Title, Borrower ID).',
      'Identifies abstracted/removed details (e.g. cover font style, physical paper weight, author biography).'
    ],
    modelAnswer: 'Decomposition breaks the system into: (1) Book Catalog Search, (2) Student Loan Management, and (3) Overdue Fine Calculation. Abstraction includes essential attributes needed for borrowing: ISBN and Title. It removes irrelevant details such as book cover color, paper thickness, or author font choices.'
  },
  '2.2.2': {
    question: 'A programmer declares pupil variables: name = "Alex", age = "15", score = 84.5, passed = True. (A) Identify the data type of each variable. (B) Explain what error will occur if the programmer attempts `age + 1` without casting, and write the corrected expression.',
    scenario: 'Identifying data types, diagnosing type mismatch errors, and applying casting.',
    rubric: [
      'Identifies name as String, age as String, score as Real/Float, passed as Boolean.',
      'Explains attempting age + 1 causes a TypeError because string "15" cannot be added to integer 1.',
      'Provides corrected cast expression: int(age) + 1 (or str(int(age) + 1)).'
    ],
    modelAnswer: '(A) name: String, age: String, score: Real/Float, passed: Boolean. (B) Attempting age + 1 results in a Type Error because age is currently a String ("15") and cannot undergo arithmetic addition with integer 1. Corrected expression: `int(age) + 1`.'
  },
  '2.4.1': {
    question: 'A security door opens when keycard A is valid AND passcode B is valid. However, an override switch C disables the door if active. Construct the Boolean expression for door opening, and evaluate the truth value when A=1, B=1, C=0 versus when A=1, B=1, C=1.',
    scenario: 'Evaluating multi-gate Boolean logic expressions and truth values.',
    rubric: [
      'Constructs expression: (A AND B) AND NOT C.',
      'Evaluates A=1, B=1, C=0 -> Output 1 (Door Opens).',
      'Evaluates A=1, B=1, C=1 -> Output 0 (Door Disabled).'
    ],
    modelAnswer: 'Boolean expression: Output = (A AND B) AND NOT C. Evaluation 1: A=1, B=1 -> (1 AND 1)=1. C=0 -> NOT 0 = 1. 1 AND 1 = 1 (Door Opens). Evaluation 2: A=1, B=1 -> 1. C=1 -> NOT 1 = 0. 1 AND 0 = 0 (Door Remains Closed).'
  },
  '2.5.2': {
    question: 'A Python programmer encounters a ZeroDivisionError on line 14 when running a program in an IDE. Describe how the IDE\'s (1) Syntax Highlighting, (2) Step-by-step Debugger, and (3) Error Console assist the programmer in locating and resolving this fault.',
    scenario: 'Using IDE tools to locate and fix runtime logic errors.',
    rubric: [
      'Describes Error Console pinpointing line number 14 and error type.',
      'Describes Debugger inspecting variable values at line 14 to see divisor equals 0.',
      'Describes Syntax Highlighting identifying keywords and variables for code correction.'
    ],
    modelAnswer: '(1) The Error Console displays the exact line (line 14) and exception type (ZeroDivisionError). (2) The Step-by-step Debugger allows the programmer to pause execution at line 14 and inspect variable values to confirm the divisor evaluated to 0. (3) Syntax Highlighting visually distinguishes variables and mathematical operators, helping the programmer write a conditional check (`if divisor != 0`) to prevent division by zero.'
  }
};
curriculumContent.forEach(item => {
  if (applicationStrands.has(item.id) || item.id === '2.2.PY') return;
  const concrete = concreteApplicationDetails[item.id];
  defaultDatabase.writtenQuestions.push({
    id: `curriculum_app_${item.id.replace(/\./g, '_')}`,
    topicId: objectiveLocations.get(item.id),
    specificationPointId: item.id,
    purpose: 'application',
    evidenceType: 'unassessed_submission',
    contributesToMastery: false,
    commandWord: applicationCommandWord(item.assessmentModes),
    marks: item.assessmentModes.includes('extended response') ? 8 : 4,
    question: concrete ? concrete.question : item.supportedPractice,
    scenario: concrete ? concrete.scenario : `Supported-to-independent application for OCR ${item.officialSpecificationPointId}.`,
    indicativeContent: [...item.requiredKnowledge, ...item.keyTerms],
    rubric: concrete ? concrete.rubric : [
      'Accurate use of the named computing concepts.',
      'A complete method, comparison or explanation appropriate to the command word.',
      'Reasoning linked to the supplied values or scenario rather than unsupported statements.'
    ],
    modelAnswer: concrete ? concrete.modelAnswer : `Responses vary by the learner's chosen values or design. Teacher review should check the listed criteria and the worked example for OCR ${item.officialSpecificationPointId}; viewing this guidance does not award credit.`,
    misconceptions: [{ phrase: item.misconception, feedback: item.misconception }],
    completionStatus: 'awaiting_review'
  });
});

const QUESTION_SPECIFICATION_MAP = {
  q_1_1_a: '1.1.1', q_1_1_b: '1.1.1', q_1_1_c: '1.1.2', q_1_1_d: '1.1.3', q_1_1_e: '1.1.1', q_1: '1.1.1',
  q_1_2_a: '1.2.1', q_1_2_b: '1.2.2', q_1_2_c: '1.2.2', q_1_2_d: '1.2.3', q_1_2_e: '1.2.2', q_2: '1.2.1', q_3: '1.2.2',
  q_1_3_a: '1.2.4a', q_1_3_b: '1.2.4a', q_1_3_c: '1.2.4d', q_1_3_d: '1.2.5', q_1_3_image_size_effect: '1.2.4c',
  q_1_4_a: '1.3.1', q_1_4_b: '1.3.2', q_1_4_layer_benefits: '1.3.2', q_1_4_c: '1.3.2', q_1_4_d: '1.3.2', q_4: '1.3.2',
  q_1_5_a: '1.4.1', q_1_5_b: '1.4.1', q_1_5_c: '1.4.2', q_1_5_d: '1.4.2',
  q_1_6_a: '1.5.1', q_1_6_b: '1.5.1', q_1_6_c: '1.5.2', q_1_6_d: '1.5.1',
  q_1_7_a: '1.6.2', q_1_7_b: '1.6.2', q_1_7_c: '1.6.1', q_1_7_d: '1.6.2',
  q_2_1_a: '2.1.1', q_2_1_b: '2.1.3', q_2_1_c: '2.1.3', q_2_1_d: '2.1.3', q_2_1_e: '2.1.2', q_5: '2.1.3',
  q_2_2_a: '2.2.1', q_2_2_b: '2.2.1', q_2_2_c: '2.2.1', q_2_2_d: '2.2.1',
  q_2_3_a: '2.3.1', q_2_3_b: '2.3.2', q_2_3_c: '2.3.2', q_2_3_d: '2.3.2',
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
  term_encryption: '1.4.2', term_os: '1.5.1', term_open_source: '1.6.2', term_abstraction: '2.1.1',
  term_decomposition: '2.1.1', term_algorithm: '2.1.2', term_variable: '2.2.1', term_selection: '2.2.1',
  term_iteration: '2.2.1', term_array: '2.2.3', term_syntax_error: '2.3.2', term_logic_error: '2.3.2',
  term_validation: '2.3.1', term_boolean: '2.4.1', term_compiler: '2.5.1', term_interpreter: '2.5.1',
  term_pseudocode: '2.2.ERL'
};

const PROGRAMMING_TECHNIQUE_MAP = {
  pc_1: ['variables', 'output', 'strings', 'read'],
  pc_2: ['selection', 'input', 'complete'],
  pc_3: ['count-controlled iteration', 'debug'],
  pc_4: ['function', 'selection', 'casting', 'write'],
  pc_5: ['file handling', 'iteration', 'casting', 'write'],
  pc_6: ['validation', 'selection', 'boundary testing', 'complete'],
  pc_7: ['arrays', 'iteration', 'MOD', 'debug'],
  pc_8: ['function', 'arrays', 'arithmetic', 'write', 'test'],
  pc_9: ['linear search', 'function', 'arrays', 'exam transfer', 'write', 'test'],
  pc_10: ['2D arrays', 'nested iteration', 'write', 'test'],
  pc_11: ['records', 'arrays', 'function', 'local variables', 'write', 'test'],
  pc_12: ['random numbers', 'function', 'write', 'test'],
  pc_13: ['authentication', 'arrays', 'function', 'selection', 'write', 'test']
};

// Human-reviewed conceptual anchors support validation without claiming to automate pedagogical quality.
const RECALL_HINT_REVIEW = {
  q_1_1_a: /decodes|signals other CPU parts|required sequence/i,
  q_1_1_b: /value advances|following instruction|current memory transfer/i,
  q_1_1_cpu_purpose: /processor|instruction cycle|performs operations/i,
  q_1_1_c: /access delay|main memory|reduces waiting/i,
  q_1_1_cache_performance: /access time|close to the processor|likely-needed/i,
  q_1_1_d: /fixed purpose|inside another product|limited resources/i,
  q_1_2_ram_rom_difference_alt: /power is removed|currently in use|startup instructions/i,
  q_1_2_c: /spinning|lasers|movement and impact/i,
  q_1_2_b: /movement|mechanical drive|shaken or dropped/i,
  q_1_2_d: /storage prefix ladder|larger prefix|above bytes/i,
  q_1_3_b: /two positions|vacated positions|eight bits/i,
  q_1_3_binary_overflow: /largest pattern|fixed number of bits|represented/i,
  q_1_3_unicode: /writing systems|limited character repertoire|code space/i,
  q_1_3_image_size_effect: /dimensions fixed|per-pixel storage|scale factor/i,
  diagnostic_1_2_4c: /image dimensions|binary digits|picture element/i,
  diagnostic_1_2_4d: /measurements are taken|measurements per second|precisely/i,
  q_1_3_c: /measurements each second|binary digits|recording time/i,
  q_1_3_sampling_rate: /measurements of the wave|closely|how much data/i,
  diagnostic_1_2_5: /one character|program behaves|original symbol/i,
  q_1_3_d: /discarded permanently|complete original|recovered/i,
  q_1_4_lan_wan: /physical area|controls the infrastructure|wired/i,
  q_1_4_layer_benefits: /independent responsibilities|replace one part|locate faults/i,
  q_1_4_c: /network interface|local network|routing between networks/i,
  q_1_5_a: /social-engineering|message or website|disclose credentials/i,
  q_1_5_b: /unchecked text|instruction|stored records/i,
  q_1_5_firewall_alt: /network boundary|configured policies|permit/i,
  q_1_6_multitasking: /switches rapidly|schedules short turns|active programs/i,
  q_1_6_c: /distant disk locations|closer together|drive mechanism/i,
  q_1_7_c: /extraction sites|polluted water|cannot be replaced/i,
  q_1_7_data_protection_act: /collect, store and use|identifiable people|access and correction rights/i,
  q_2_1_a: /simplifying a model|details that affect|dividing the task/i,
  priority_212_1: /known before|operation performed|produced afterwards/i,
  priority_212_3: /yes-or-no condition|different paths|branching point/i,
  q_2_1_c: /repeated passes|neighbouring items|exchange/i,
  q_2_1_d: /dividing|smaller halves|rebuild larger ordered groups/i,
  q_2_2_a: /named storage location|different value|retain its declared value/i,
  priority_221_1: /stopping point|true-or-false test|predetermined number/i,
  priority_223_1: /second argument|number of characters|final index/i,
  priority_223_3: /subprogram|within an expression|sends a result back/i,
  priority_223_4: /each dimension|square brackets|rows.*columns/i,
  diagnostic_2_2_PY: /executable solution|test data|recalling terminology/i,
  diagnostic_2_2_ERL: /practical programs|examination paper|syntax is not identical/i,
  priority_erl_1: /inclusive upper bound|loop terminator|counter/i,
  priority_erl_4: /backwards from the end|three characters|left-to-right order/i,
  q_2_3_a: /type, range or length|who supplied|program contains errors/i,
  priority_232_2: /program can run|grammar|consistently wrong result/i,
  q_2_4_c: /brackets first|invert|intermediate truth value/i,
  q_2_5_c: /mathematical or English|registers|processor operations/i,
  q_2_5_d: /entering source text|locating faults|converting instructions|test setting/i,
  diagnostic_1_1_1: /fetch|memory location|register/i,
  diagnostic_1_1_2: /same time|wait|parallel/i,
  diagnostic_1_1_3: /larger product|dedicated job|many user-chosen tasks/i,
  diagnostic_1_2_1: /main memory|less-used program data|slower/i,
  diagnostic_1_2_2: /vibration|impacts|moving/i,
  q_1_2_a: /power is removed|change the stored contents/i,
  diagnostic_1_2_3: /bits make one byte|multiplication or division/i,
  diagnostic_1_2_4a: /binary place values|position containing a one/i,
  diagnostic_1_2_4b: /doubles|pattern count/i,
  diagnostic_1_3_1: /addressing information|packet|local network/i,
  diagnostic_1_3_2: /outgoing mail|retrieve|synchronise/i,
  q_1_4_a: /destination addressing|network path|packet/i,
  diagnostic_1_4_1: /automated guessing|credentials/i,
  diagnostic_1_4_2: /authorised security activity|attack techniques|weaknesses/i,
  q_1_5_c: /traffic|configured rules|boundary control/i,
  diagnostic_1_5_1: /tracks free space|active processes|resource/i,
  diagnostic_1_5_2: /scattered|mechanical head travel|access time/i,
  q_1_6_a: /device-specific software|peripheral|general commands/i,
  diagnostic_1_6_1: /physical resources|pollution|disposal/i,
  diagnostic_1_6_2: /without permission|personal information|creative ownership/i,
  q_1_7_a: /without permission|personal-data handling|copyright/i,
  diagnostic_2_1_1: /removes details|splitting the problem|checking input/i,
  diagnostic_2_1_2: /program state|instruction|loop pass/i,
  diagnostic_2_1_3: /half|already ordered|search method/i,
  diagnostic_2_2_1: /whole groups|left over|complete groups/i,
  diagnostic_2_2_2: /two logical states|whole number|single symbol/i,
  diagnostic_2_2_3: /filters rows|condition|output fields/i,
  diagnostic_2_3_1: /login check|person requesting access|entered data/i,
  diagnostic_2_3_2: /allowed edge values|inside or outside|inclusive range/i,
  priority_232_1: /cycle|changes a module|before the product is finished/i,
  diagnostic_2_4_1: /gate active|pair of inputs|at least once/i,
  q_2_4_e: /either input|gate rule|same state/i,
  q_2_4_a: /every input condition|satisfied together/i,
  diagnostic_2_5_1: /human-readable|processor hardware|instruction format/i,
  diagnostic_2_5_2: /source code|points the programmer|location/i,
  q_2_5_e: /when translation occurs|separate executable|program is run/i
};
const RECALL_HINT_FORBIDDEN = {
  diagnostic_1_5_2: /reorganis(?:e|ing)|file blocks?|contiguous/i
};

const REVIEWED_RECALL_HINTS = {
  q_1_1_cpu_purpose: 'Distinguish the processor from storage and display devices: follow the component that coordinates the instruction cycle and performs operations on data.',
  q_1_1_c: 'Compare the access delay of memory beside the processor with main memory, then consider why keeping likely-needed items nearby reduces waiting.',
  q_1_1_cache_performance: 'Focus on access time rather than clock rate or core count: consider the benefit of keeping likely-needed items in memory close to the processor.',
  q_1_1_d: 'Look for computing hardware designed around one fixed purpose inside another product, where limited resources and energy use are often priorities.',
  q_1_2_ram_rom_difference_alt: 'Compare what each memory keeps after power is removed; one holds the programs currently in use, while the other retains startup instructions.',
  q_1_2_c: 'Eliminate technologies that depend on spinning media or lasers, then choose the electronic storage designed to tolerate movement and impact.',
  q_1_2_b: "Use the camera's movement as the deciding context: compare a mechanical drive with electronic storage when the device is shaken or dropped.",
  q_1_2_d: 'Use the storage prefix ladder: begin with the first named unit above bytes, then move through each larger prefix in order.',
  q_1_3_b: 'Move every bit two positions towards the most-significant end, fill the vacated positions with zeroes, and discard anything beyond eight bits.',
  q_1_3_binary_overflow: 'First identify the largest pattern available in the fixed number of bits, then ask whether the calculated result can be represented within that limit.',
  q_1_3_unicode: 'Compare the range of writing systems needed worldwide with the limited character repertoire of the older standard; consider how a larger code space helps.',
  diagnostic_1_2_4c: 'Keep the image dimensions unchanged and consider how many binary digits must be recorded for each individual picture element after the change.',
  diagnostic_1_2_4d: 'Separate how often measurements are taken from how precisely each measurement is stored; the question asks about measurements per second.',
  q_1_3_c: 'For mono audio, identify the number of measurements each second, the binary digits in each measurement and the recording time, then combine all three.',
  q_1_3_sampling_rate: 'More measurements of the wave are captured each second; consider both how closely the digital signal follows the original and how much data is stored.',
  diagnostic_1_2_5: 'Ask whether losing or changing even one character could alter how the program behaves; choose the method that can restore every original symbol.',
  q_1_3_d: 'For each method, ask whether any information is discarded permanently or whether the complete original can be recovered after decompression.',
  q_1_4_lan_wan: 'Classify the networks by the physical area they span and who usually controls the infrastructure, rather than by whether their links are wired.',
  q_1_5_a: 'Look for a social-engineering attack in which a convincing message or website pressures a person to disclose credentials or other private information.',
  q_1_5_b: 'Focus on unchecked text being joined into an instruction sent to stored records; ask how crafted text could change what that instruction does.',
  q_1_5_firewall_alt: 'Think of the control at a network boundary that examines communication against configured policies before deciding whether to permit it through.',
  q_1_6_multitasking: 'A single processor switches rapidly between active programs; consider how the operating system schedules short turns so each can continue making progress.',
  q_1_6_c: 'Picture one file split across distant disk locations: consider how arranging its pieces closer together changes the movement required from the drive mechanism.',
  q_1_7_c: 'Trace the materials before manufacture: consider damage at extraction sites, polluted water and the fact that metal ores cannot be replaced once exhausted.',
  q_1_7_data_protection_act: 'Choose the legislation concerned with how organisations collect, store and use information about identifiable people, including their access and correction rights.',
  q_2_1_a: 'Imagine simplifying a model by keeping only details that affect its purpose; distinguish this from dividing the task into smaller parts.',
  priority_212_1: 'Name the values known before the calculation, the operation performed on them, and the value produced afterwards; keep those three roles in order.',
  priority_212_3: 'Follow the branch where a yes-or-no condition sends control along different paths; choose the shape reserved for that branching point.',
  q_2_1_c: 'Look for the method that makes repeated passes, checks neighbouring items and may exchange their positions; do not confuse it with divide-and-combine methods.',
  q_2_1_d: 'Think recursively: keep dividing the data into smaller halves, then rebuild larger ordered groups by repeatedly choosing the next item.',
  q_2_2_a: 'Compare whether a named storage location may be assigned a different value while the program runs or must retain its declared value throughout.',
  priority_221_1: 'Look for repetition whose stopping point depends on a true-or-false test evaluated during execution, rather than a predetermined number of turns.',
  priority_223_1: 'In this notation, the second argument is the number of characters to take, not the final index; count the required characters from the stated start.',
  priority_223_3: 'Ask which type of named subprogram can be used within an expression because it sends a result back to the calling code.',
  priority_223_4: 'Represent each dimension inside one pair of square brackets, with one size for the rows and another for the columns.',
  diagnostic_2_2_PY: 'Choose the activity that requires constructing an executable solution, running it with test data and improving it, rather than merely recalling terminology.',
  diagnostic_2_2_ERL: 'Separate the language used to build practical programs from the notation expected when writing algorithms on an examination paper; their syntax is not identical.',
  priority_erl_1: "Check this notation's inclusive upper bound and its matching loop terminator; the counter should begin at the first required value and finish at the last.",
  priority_erl_4: 'Count three characters backwards from the end of the string while preserving their original left-to-right order.',
  q_2_3_a: 'Distinguish checking whether supplied data obeys rules such as type, range or length from checking who supplied it or whether the program contains errors.',
  priority_232_2: 'Because the program can run, its grammar has already been accepted; trace the calculation or condition that produces the consistently wrong result.',
  q_2_4_c: 'Evaluate the brackets first, then invert the final input before applying the outer gate; work with one intermediate truth value at each step.',
  q_2_5_c: 'Compare notation resembling everyday mathematical or English expressions with instructions tied closely to registers and processor operations.',
  q_2_5_d: 'Match each tool to a stage of development: entering source text, locating faults, converting instructions, and running the work in a test setting.'
};

function applyContentMappings(data) {
  (data.questions || []).forEach(question => {
    question.specificationPointId = question.specificationPointId || QUESTION_SPECIFICATION_MAP[question.id] || null;
    question.purpose = question.purpose || 'retrieval';
    if (!question.retryHint && REVIEWED_RECALL_HINTS[question.id]) {
      question.retryHint = REVIEWED_RECALL_HINTS[question.id];
    }
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
    challenge.programmingTechniques = PROGRAMMING_TECHNIQUE_MAP[challenge.id] || [];
    challenge.assessmentRoute = 'deterministic-tests-plus-explanation';
    challenge.marks = challenge.marks || (challenge.purpose === 'exam-transfer' ? 6 : 4);
    challenge.suggestedMinutes = challenge.suggestedMinutes || (challenge.purpose === 'exam-transfer' ? 12 : 10);
    challenge.awardsCompletion = challenge.id === 'pc_1' ? false : challenge.awardsCompletion !== false;
    challenge.learningMode = challenge.id === 'pc_1' ? 'guided-reading' : (challenge.learningMode || 'guided-code');
    challenge.requiresCodeChange = challenge.requiresCodeChange !== false;
    (challenge.testCases || []).forEach((testCase, index) => {
      testCase.visibility = testCase.visibility || (index === 0 ? 'example' : 'hidden');
    });
  });
  return data;
}

defaultDatabase.questions.forEach(question => {
  question.assessmentFocus = QUESTION_ASSESSMENT_FOCUS[question.id] || null;
});

applyContentMappings(defaultDatabase);

function selectObjectiveRecallQuestions(questions, objectiveId, checkpointRules = CHECKPOINT_RULES, demonstratedFocuses = []) {
  const objectiveQuestions = (questions || []).filter(question =>
    question.retired !== true && question.specificationPointId === objectiveId
  );
  const rule = checkpointRules[objectiveId];
  if (!rule) return objectiveQuestions.slice(0, 3);
  const demonstrated = new Set(demonstratedFocuses);
  const orderedFocuses = [
    ...rule.requiredFocuses.filter(focus => !demonstrated.has(focus)),
    ...rule.requiredFocuses.filter(focus => demonstrated.has(focus))
  ];
  const selected = [];
  orderedFocuses.forEach(focus => {
    if (selected.length >= 3) return;
    const question = objectiveQuestions.find(candidate =>
      candidate.assessmentFocus === focus && !selected.includes(candidate)
    );
    if (question) selected.push(question);
  });
  objectiveQuestions.forEach(question => {
    if (selected.length < 3 && !selected.includes(question)) selected.push(question);
  });
  return selected.slice(0, 3);
}

function selectTopicRecallQuestions(questions) {
  const liveQuestions = (questions || []).filter(question => question.retired !== true);
  const specificationPoints = [...new Set(liveQuestions.map(question => question.specificationPointId).filter(Boolean))];
  if (specificationPoints.length <= 1) return liveQuestions.slice(0, 3);
  const selected = [];
  specificationPoints.forEach(specificationPointId => {
    const question = liveQuestions.find(candidate =>
      candidate.specificationPointId === specificationPointId && !selected.includes(candidate)
    );
    if (question && selected.length < 3) selected.push(question);
  });
  liveQuestions.forEach(question => {
    if (selected.length < 3 && !selected.includes(question)) selected.push(question);
  });
  return selected.slice(0, 3);
}

function enumerateReachableRecallQuestions(data, checkpointRules = CHECKPOINT_RULES) {
  const reachable = new Map();
  (data.units || []).forEach(unit => {
    (unit.topics || []).forEach(topic => {
      const topicQuestions = (data.questions || []).filter(question =>
        question.topicId === topic.id && question.retired !== true
      );
      selectTopicRecallQuestions(topicQuestions).forEach(question => reachable.set(question.id, question));
      (topic.objectives || []).forEach(objective => {
        const requiredFocuses = checkpointRules[objective.id]?.requiredFocuses || [];
        const focusStates = requiredFocuses.length
          ? Array.from({ length: 2 ** requiredFocuses.length }, (_, mask) =>
            requiredFocuses.filter((focus, index) => mask & (1 << index))
          )
          : [[]];
        focusStates.forEach(demonstratedFocuses => {
          const matching = selectObjectiveRecallQuestions(
            topicQuestions,
            objective.id,
            checkpointRules,
            demonstratedFocuses
          );
          const other = topicQuestions.filter(question => question.specificationPointId !== objective.id);
          [...matching, ...other].slice(0, 3).forEach(question => reachable.set(question.id, question));
        });
      });
    });
  });
  return [...reachable.values()];
}

function validateQuestionBank(data, checkpointRules = CHECKPOINT_RULES) {
  const objectivesByTopic = new Map();
  const validSpecificationIds = new Set();

  (data.units || []).forEach(unit => {
    (unit.topics || []).forEach(topic => {
      const ids = new Set((topic.objectives || []).map(objective => objective.id));
      objectivesByTopic.set(topic.id, ids);
      ids.forEach(id => validSpecificationIds.add(id));
    });
  });

  const seenIds = new Set();
  (data.questions || []).forEach(question => {
    if (!question.id || typeof question.id !== 'string') {
      throw new Error('Every StudySpice question must have a stable ID.');
    }
    if (seenIds.has(question.id)) {
      throw new Error(`Duplicate StudySpice question ID: ${question.id}`);
    }
    seenIds.add(question.id);

    if (!validSpecificationIds.has(question.specificationPointId)) {
      throw new Error(`Question ${question.id} has unknown specification reference ${question.specificationPointId}.`);
    }
    const topicObjectives = objectivesByTopic.get(question.topicId);
    if (!topicObjectives || !topicObjectives.has(question.specificationPointId)) {
      throw new Error(`Question ${question.id} conflicts with topic ${question.topicId} and specification ${question.specificationPointId}.`);
    }
    const mappedSpecification = QUESTION_SPECIFICATION_MAP[question.id];
    if (mappedSpecification && mappedSpecification !== question.specificationPointId) {
      throw new Error(`Question ${question.id} has conflicting semantic specification mappings.`);
    }
    if (question.retired !== true && (!question.assessmentFocus || typeof question.assessmentFocus !== 'string')) {
      throw new Error(`Question ${question.id} requires a stable assessment focus.`);
    }
  });

  Object.entries(checkpointRules).forEach(([sectionId, rule]) => {
    if (!validSpecificationIds.has(sectionId)) {
      throw new Error(`Checkpoint rule references unknown specification section ${sectionId}.`);
    }
    if (!Number.isInteger(rule.version) || rule.version < 1) {
      throw new Error(`Checkpoint rule ${sectionId} requires a positive integer version.`);
    }
    if (typeof rule.minimumRatio !== 'number' || rule.minimumRatio <= 0 || rule.minimumRatio > 1) {
      throw new Error(`Checkpoint rule ${sectionId} requires a minimum ratio above 0 and no greater than 1.`);
    }
    if (!Array.isArray(rule.requiredFocuses) || new Set(rule.requiredFocuses).size !== rule.requiredFocuses.length || rule.requiredFocuses.length < 2) {
      throw new Error(`Checkpoint rule ${sectionId} requires distinct assessment focuses.`);
    }
    const liveFocuses = new Set((data.questions || [])
      .filter(question => question.retired !== true && question.specificationPointId === sectionId)
      .map(question => question.assessmentFocus));
    rule.requiredFocuses.forEach(focus => {
      if (!liveFocuses.has(focus)) {
        throw new Error(`Checkpoint rule ${sectionId} requires unreachable focus ${focus}.`);
      }
    });
  });

  const normaliseGuidanceText = value => String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const guidanceWords = value => String(value || '').toLowerCase().match(/[a-z0-9]+/g) || [];
  const meaningfulAnswerPhrases = answer => {
    const stopWords = new Set(['a', 'an', 'and', 'as', 'at', 'be', 'between', 'by', 'for', 'from', 'in', 'into', 'is', 'it', 'of', 'on', 'or', 'the', 'to', 'using', 'with']);
    const words = guidanceWords(answer).filter(word => !stopWords.has(word));
    return words.slice(0, -1).map((word, index) => `${word} ${words[index + 1]}`);
  };
  const correctAnswerMaterial = question => {
    if (question.answer !== undefined && question.answer !== null) return [String(question.answer)];
    if (question.type === 'matching') {
      return (question.items || []).flatMap(item => [
        String(item.match || ''),
        `${String(item.label || '')} ${String(item.match || '')}`.trim()
      ]);
    }
    if (question.blanks && typeof question.blanks === 'object') {
      const blanks = Array.isArray(question.blanks) ? question.blanks : Object.values(question.blanks);
      return blanks.map(blank => typeof blank === 'object'
        ? String(blank.answer ?? blank.value ?? blank.word ?? '')
        : String(blank)
      );
    }
    if (Array.isArray(question.sequence)) {
      return [question.sequence.map(item => typeof item === 'string' ? item : item.value || item.label || '').join(' ')];
    }
    return [];
  };
  const reachableRecallQuestions = enumerateReachableRecallQuestions(data, checkpointRules);
  const seenHints = new Map();
  reachableRecallQuestions.forEach(question => {
    const hint = String(question.retryHint || '').trim();
    if (hint.length < 50 || /reread|read the question|try again|review the question wording|review this topic|check your notes|think carefully/i.test(hint)) {
      throw new Error(`Question ${question.id} requires actionable conceptual retry guidance.`);
    }
    if (!Object.prototype.hasOwnProperty.call(question, 'retryHint')) {
      throw new Error(`Question ${question.id} must own its retry guidance.`);
    }
    const normalisedHint = normaliseGuidanceText(hint);
    const normalisedQuestion = normaliseGuidanceText(question.question);
    if (normalisedQuestion.length >= 12 && normalisedHint.includes(normalisedQuestion)) {
      throw new Error(`Question ${question.id} retry guidance copies the question.`);
    }
    const hintWordList = guidanceWords(hint);
    const answerMaterials = correctAnswerMaterial(question).filter(Boolean);
    const repeatsAnswer = answerMaterials.some(answerMaterial => {
      const answerWords = guidanceWords(answerMaterial);
      return answerWords.length === 1
        ? hintWordList.includes(answerWords[0])
        : hintWordList.join(' ').includes(answerWords.join(' '));
    });
    if (repeatsAnswer) {
      throw new Error(`Question ${question.id} retry guidance reveals its answer.`);
    }
    const hintWords = ` ${hintWordList.join(' ')} `;
    if (answerMaterials.some(answerMaterial =>
      meaningfulAnswerPhrases(answerMaterial).some(phrase => hintWords.includes(` ${phrase} `))
    )) {
      throw new Error(`Question ${question.id} retry guidance closely paraphrases its answer.`);
    }
    const copiedDistractor = (question.options || [])
      .filter(option => option !== question.answer)
      .some(option => {
        const optionWords = guidanceWords(option);
        if (!optionWords.length || (optionWords.length === 1 && ['a', 'an', 'and', 'at', 'from', 'in', 'of', 'on', 'or', 'the', 'to'].includes(optionWords[0]))) return false;
        return optionWords.join(' ').length >= 4 && hintWords.includes(` ${optionWords.join(' ')} `);
      });
    if (copiedDistractor) {
      throw new Error(`Question ${question.id} retry guidance repeats a distractor.`);
    }
    const conceptualAnchor = RECALL_HINT_REVIEW[question.id];
    if (!conceptualAnchor || !conceptualAnchor.test(hint)) {
      throw new Error(`Question ${question.id} retry guidance does not match its reviewed conceptual focus.`);
    }
    const forbiddenParaphrase = RECALL_HINT_FORBIDDEN[question.id];
    if (forbiddenParaphrase && forbiddenParaphrase.test(hint)) {
      throw new Error(`Question ${question.id} retry guidance closely paraphrases its answer.`);
    }
    if (seenHints.has(normalisedHint)) {
      throw new Error(`Questions ${seenHints.get(normalisedHint)} and ${question.id} reuse identical retry guidance.`);
    }
    seenHints.set(normalisedHint, question.id);
  });

  return true;
}

validateQuestionBank(defaultDatabase);

const SYSTEM_CONTENT_COLLECTIONS = [
  'curriculumContent',
  'theoryNotes',
  'units',
  'examTransferTasks',
  'keyTerms',
  'questions',
  'writtenQuestions',
  'programmingChallenges'
];

function cloneData(value) {
  return JSON.parse(JSON.stringify(value));
}

function mergeSystemRecords(existingRecords, defaultRecords) {
  const existing = Array.isArray(existingRecords) ? existingRecords : [];
  const defaults = Array.isArray(defaultRecords) ? defaultRecords : [];
  const defaultsById = new Map(defaults.filter(item => item?.id).map(item => [item.id, item]));
  const merged = defaults.map(item => cloneData(item));

  existing.forEach(item => {
    if (!item?.id || defaultsById.has(item.id)) return;
    merged.push(cloneData(item));
  });

  return merged;
}

function migrateSchema12To13(storedData) {
  const migrated = cloneData(storedData);

  SYSTEM_CONTENT_COLLECTIONS.forEach(key => {
    migrated[key] = mergeSystemRecords(migrated[key], defaultDatabase[key]);
  });

  Object.keys(defaultDatabase).forEach(key => {
    if (!Object.prototype.hasOwnProperty.call(migrated, key)) {
      migrated[key] = cloneData(defaultDatabase[key]);
    }
  });

  migrated.schemaVersion = 13;
  return applyContentMappings(migrated);
}

const DATA_MIGRATIONS = {
  12: migrateSchema12To13
};

function prepareLegacyDataForSchema12(storedData) {
  const migrated = cloneData(storedData);
  migrated.schemaVersion = 12;
  return migrated;
}

function isRecognisableLegacyData(storedData) {
  if (!storedData || typeof storedData !== 'object' || Array.isArray(storedData)) return false;
  const knownCollections = [
    'schools',
    'students',
    'classes',
    'attempts',
    'assignments',
    'questions',
    'units',
    'writtenSubmissions',
    'programmingSubmissions',
    'studentProgress'
  ];
  const presentCollections = knownCollections.filter(key =>
    Object.prototype.hasOwnProperty.call(storedData, key) && Array.isArray(storedData[key])
  );
  const hasCoreStudySpiceCollection = ['students', 'attempts', 'questions', 'units']
    .some(key => presentCollections.includes(key));
  return hasCoreStudySpiceCollection && presentCollections.length >= 3;
}

function migrateStoredData(storedData) {
  let migrated = cloneData(storedData);
  let version = Number(migrated.schemaVersion);

  if (!Number.isInteger(version) || version === 11) {
    if (!isRecognisableLegacyData(migrated)) {
      throw new Error('Stored browser data is not a recognisable StudySpice dataset.');
    }
    migrated = prepareLegacyDataForSchema12(migrated);
    version = migrated.schemaVersion;
  }
  if (version < 11) {
    throw new Error(`Stored StudySpice schema ${version} predates the safe migration path.`);
  }
  if (version > defaultDatabase.schemaVersion) {
    throw new Error('Stored StudySpice data is newer than this application.');
  }

  while (version < defaultDatabase.schemaVersion) {
    const migration = DATA_MIGRATIONS[version];
    if (!migration) throw new Error(`No StudySpice data migration exists for schema ${version}.`);
    migrated = migration(migrated);
    version = Number(migrated.schemaVersion);
  }

  SYSTEM_CONTENT_COLLECTIONS.forEach(key => {
    migrated[key] = mergeSystemRecords(migrated[key], defaultDatabase[key]);
  });

  Object.keys(defaultDatabase).forEach(key => {
    if (!Object.prototype.hasOwnProperty.call(migrated, key)) {
      migrated[key] = cloneData(defaultDatabase[key]);
    }
  });

  return applyContentMappings(migrated);
}

class LocalDB {
  constructor() {
    this.cachedData = null;
    this.sessionToken = null;
    this.readOnly = false;
    this.recoveryState = null;
    this.loadData();
  }

  getExaminerInsights(strandId) {
    if (examinerKnowledge && typeof examinerKnowledge.getExaminerInsights === 'function') {
      return examinerKnowledge.getExaminerInsights(strandId);
    }
    return null;
  }

  getCommandWordRubric(commandWord) {
    if (examinerKnowledge && typeof examinerKnowledge.getCommandWordRubric === 'function') {
      return examinerKnowledge.getCommandWordRubric(commandWord);
    }
    return null;
  }

  generateBlueprintQuestion(strandId, seed = 1) {
    if (examinerKnowledge && typeof examinerKnowledge.generateBlueprintQuestion === 'function') {
      return examinerKnowledge.generateBlueprintQuestion(strandId, seed);
    }
    return null;
  }

  getKeyTermsBySpecPoint(specificationPointId) {
    if (examinerKnowledge && typeof examinerKnowledge.getKeyTermsBySpecPoint === 'function') {
      return examinerKnowledge.getKeyTermsBySpecPoint(specificationPointId);
    }
    return [];
  }

  getFlashcardsByStrand(strandId) {
    if (examinerKnowledge && typeof examinerKnowledge.getFlashcardsByStrand === 'function') {
      return examinerKnowledge.getFlashcardsByStrand(strandId);
    }
    return [];
  }

  createMixedExamSession(paperType = 'all', durationMinutes = 20) {
    if (mixedExamEngine && typeof mixedExamEngine.createMixedExamSession === 'function') {
      return mixedExamEngine.createMixedExamSession(paperType, durationMinutes, curriculumContent, priorityAssessments.examTransferTasks || [], examinerKnowledge);
    }
    return null;
  }

  evaluateExamPerformance(userAnswers, session) {
    if (mixedExamEngine && typeof mixedExamEngine.evaluateExamPerformance === 'function') {
      return mixedExamEngine.evaluateExamPerformance(userAnswers, session);
    }
    return null;
  }

  getExtendedWritingScaffold(strandId = '1.6.1') {
    if (extendedWritingBuilder && typeof extendedWritingBuilder.getExtendedWritingScaffold === 'function') {
      return extendedWritingBuilder.getExtendedWritingScaffold(strandId);
    }
    return null;
  }

  evaluateExtendedResponse(strandId, userSelections) {
    if (extendedWritingBuilder && typeof extendedWritingBuilder.evaluateExtendedResponse === 'function') {
      return extendedWritingBuilder.evaluateExtendedResponse(strandId, userSelections);
    }
    return null;
  }

  simulateBinaryShift(binaryString, direction, shiftCount) {
    if (visualTracers && typeof visualTracers.simulateBinaryShift === 'function') {
      return visualTracers.simulateBinaryShift(binaryString, direction, shiftCount);
    }
    return null;
  }

  simulateLogicGate(gateType, inputA, inputB) {
    if (visualTracers && typeof visualTracers.simulateLogicGate === 'function') {
      return visualTracers.simulateLogicGate(gateType, inputA, inputB);
    }
    return null;
  }

  loadData() {
    let parsedRaw = null;
    let migratedData = null;
    try {
      const raw = localStorage.getItem(DB_KEY);
      parsedRaw = raw ? JSON.parse(raw) : null;
      migratedData = parsedRaw ? migrateStoredData(parsedRaw) : cloneData(defaultDatabase);
      this.cachedData = migratedData;
      localStorage.setItem(DB_KEY, JSON.stringify(this.cachedData));
    } catch (e) {
      console.error('Error loading LocalDB; stored data has not been overwritten:', e);
      this.cachedData = migratedData || cloneData(defaultDatabase);
      this.readOnly = true;
      this.recoveryState = {
        active: true,
        reason: migratedData ? 'storage_write' : 'migration'
      };
    }
  }

  saveData() {
    if (this.readOnly) {
      console.warn('StudySpice is in read-only recovery mode; browser data was not changed.');
      return false;
    }
    try {
      localStorage.setItem(DB_KEY, JSON.stringify(this.cachedData));
      return true;
    } catch (e) {
      console.error('Error saving LocalDB:', e);
      this.readOnly = true;
      this.recoveryState = { active: true, reason: 'storage_write' };
      return false;
    }
  }

  getRecoveryState() {
    return this.recoveryState ? { ...this.recoveryState } : null;
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
  getClassroomControls(classId = null) {
    if (!classId) return this.cachedData.classroomControls;
    const scoped = {};
    Object.entries(this.cachedData.classroomControls || {}).forEach(([key, value]) => {
      if (!key.includes(':')) scoped[key] = value;
    });
    Object.entries(this.cachedData.classroomControls || {}).forEach(([key, value]) => {
      const prefix = `${classId}:`;
      if (key.startsWith(prefix)) scoped[key.slice(prefix.length)] = value;
    });
    return scoped;
  }
  getAssignments() { return this.cachedData.assignments; }
  getTestPreps() { return this.cachedData.testPreps || []; }
  getAssessmentReports() { return this.cachedData.assessmentReports || []; }
  getSupportSessions() { return this.cachedData.supportSessions || []; }
  getCurriculumContent() { return this.cachedData.curriculumContent || []; }
  getExamTransferTasks() { return this.cachedData.examTransferTasks || []; }
  getKeyTerms() { return this.cachedData.keyTerms || []; }
  getQuestions(options = {}) {
    return options.includeRetired
      ? this.cachedData.questions
      : this.cachedData.questions.filter(question => question.retired !== true);
  }
  getCheckpointRules() { return CHECKPOINT_RULES; }
  selectTopicRecallQuestions(questions) { return selectTopicRecallQuestions(questions); }
  selectObjectiveRecallQuestions(questions, objectiveId, demonstratedFocuses = []) {
    return selectObjectiveRecallQuestions(questions, objectiveId, CHECKPOINT_RULES, demonstratedFocuses);
  }
  getWrittenQuestions() { return this.cachedData.writtenQuestions; }
  getProgrammingChallenges() { return this.cachedData.programmingChallenges; }
  getAttempts() { return this.cachedData.attempts; }
  getProgrammingSubmissions() { return this.cachedData.programmingSubmissions; }
  getWrittenSubmissions() { return this.cachedData.writtenSubmissions; }
  getMessages() { return this.cachedData.messages; }
  getAuditLogs() { return this.cachedData.auditLogs; }
  getSettings() { return this.cachedData.settings; }

  resetCleanDemoLearnerData(studentId) {
    if (studentId !== 'student_release_fixture') {
      throw new Error('Clean-demo reset is restricted to the dedicated fixture learner.');
    }
    this.cachedData.attempts = this.cachedData.attempts.filter(item => item.studentId !== studentId);
    this.cachedData.programmingSubmissions = this.cachedData.programmingSubmissions.filter(item => item.studentId !== studentId);
    this.cachedData.writtenSubmissions = this.cachedData.writtenSubmissions.filter(item => item.studentId !== studentId);
    this.cachedData.students = this.cachedData.students.filter(item => item.id !== studentId);
    this.saveData();
  }

  // Modifiers
  updateStudent(studentId, updates) {
    const student = this.cachedData.students.find(s => s.id === studentId);
    if (student) {
      Object.assign(student, updates);
      this.saveData();
    }
  }

  updateClassroomControl(topicId, status, classId = null) {
    const key = classId ? `${classId}:${topicId}` : topicId;
    this.cachedData.classroomControls[key] = status;
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

  addAssessmentReport(report) {
    const newReport = {
      id: 'assessment_report_' + Date.now(),
      recordedAt: new Date().toISOString(),
      ...report
    };
    if (!Array.isArray(this.cachedData.assessmentReports)) this.cachedData.assessmentReports = [];
    this.cachedData.assessmentReports.push(newReport);
    this.saveData();
    this.addAuditLog('Assessment report recorded', `Assessment report recorded for learner ${newReport.studentId}.`, 'Teacher');
    return newReport;
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

  getTheoryNotes() { return this.cachedData.theoryNotes || []; }
  getTheoryNoteByTopic(topicId) { return (this.cachedData.theoryNotes || []).find(t => t.topicId === topicId); }
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

root.db = new LocalDB();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    LocalDB,
    defaultDatabase,
    CHECKPOINT_RULES,
    selectTopicRecallQuestions,
    selectObjectiveRecallQuestions,
    enumerateReachableRecallQuestions,
    applyContentMappings,
    validateQuestionBank,
    migrateSchema12To13,
    migrateStoredData
  };
}
})(typeof window !== 'undefined' ? window : globalThis);
