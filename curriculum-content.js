// Original objective-level teaching and diagnostic content for OCR GCSE Computer Science J277.
// `id` is the app strand; `officialSpecificationPointId` is the traceable OCR reference.
(function initialiseCurriculumContent(root, factory) {
  const curriculumContent = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = curriculumContent;
  if (root) {
    root.StudySpiceContent = root.StudySpiceContent || {};
    root.StudySpiceContent.curriculum = curriculumContent;
  }
})(typeof window !== 'undefined' ? window : globalThis, function buildCurriculumContent() {
  const content = [
  {
    id: '1.1.1', officialSpecificationPointId: '1.1.1', sourcePages: '6',
    scope: 'CPU purpose; fetch-execute cycle; ALU, CU, cache and registers; MAR, MDR, PC and accumulator.',
    explanation: 'The CPU processes instructions. The control unit coordinates the fetch-execute cycle and sends control signals; the ALU carries out arithmetic and logical operations; cache stores frequently used data and instructions close to the CPU. The program counter stores the address of the next instruction, the MAR stores an address being accessed, the MDR stores data or an instruction being transferred, and the accumulator stores intermediate arithmetic or logic results.',
    workedExample: 'If the PC stores address 42, the next instruction is fetched from address 42. The PC then changes so it identifies the following instruction. The MAR stores an address, whereas the MDR stores the instruction or data at that address.',
    keyTerms: ['CPU', 'control unit', 'ALU', 'cache', 'program counter', 'MAR', 'MDR', 'accumulator'],
    misconception: 'The MAR stores an address, not the data held at that address.',
    diagnostic: { question: 'Which register stores the address of the next instruction?', options: ['Program counter', 'MDR', 'Accumulator', 'ALU'], answer: 'Program counter', explanation: 'The program counter stores the address of the next instruction. The MAR stores the address currently being accessed.', retryHint: 'Follow the fetch stage and ask which register must identify the memory location to fetch before that location is copied elsewhere.' }
  },
  {
    id: '1.1.2', officialSpecificationPointId: '1.1.2', sourcePages: '6',
    scope: 'Effects of clock speed, cache size and number of cores on CPU performance, separately and together.',
    explanation: 'A higher clock speed allows more clock cycles per second. A larger cache can reduce the time spent waiting for frequently used data and instructions. More cores can execute more instructions at the same time when software can divide work between them. Performance depends on the combination of these characteristics and the task, so changing one characteristic does not guarantee a proportional speed increase.',
    workedExample: 'A video encoder designed for parallel processing may benefit from additional cores. A sequential task may gain little because later instructions depend on earlier results.',
    keyTerms: ['clock speed', 'cache size', 'core', 'parallel processing'],
    misconception: 'A 4 GHz processor does not necessarily execute four billion complete instructions per second.',
    diagnostic: { question: 'Why might doubling the number of CPU cores fail to halve a program’s running time?', options: ['The program may not divide its work between cores', 'Each core removes half the cache', 'Clock speed becomes zero', 'RAM becomes read-only'], answer: 'The program may not divide its work between cores', explanation: 'Extra cores help only when work can be performed in parallel.', retryHint: 'Consider whether every instruction can run at the same time or whether some parts of the task must wait for earlier parts to finish.' }
  },
  {
    id: '1.1.3', officialSpecificationPointId: '1.1.3', sourcePages: '6',
    scope: 'Purpose, characteristics and examples of embedded systems.',
    explanation: 'An embedded system is a computer system built into a larger device to perform a specific function. It is commonly designed around limited, known requirements and may need low power use, small size, low cost or reliable real-time responses. Examples include a washing-machine controller, a car braking controller and a digital thermostat.',
    workedExample: 'A thermostat reads a temperature sensor and switches heating on or off. Its computing system has a dedicated purpose and is embedded in the thermostat.',
    keyTerms: ['embedded system', 'dedicated function', 'sensor'],
    misconception: 'A device can contain software and still be embedded; embedded does not mean “no program”.',
    diagnostic: { question: 'Which is the best example of an embedded system?', options: ['A controller inside a washing machine', 'A general-purpose desktop PC', 'A laptop used for homework', 'A cloud file server'], answer: 'A controller inside a washing machine', explanation: 'The controller is built into a larger device for a specific purpose.', retryHint: 'Look for computing hardware built into a larger product to carry out one dedicated job, rather than a device intended for many user-chosen tasks.' }
  },
  {
    id: '1.2.1', officialSpecificationPointId: '1.2.1', sourcePages: '7',
    scope: 'Need for primary storage; RAM, ROM, virtual memory and cache.',
    explanation: 'Primary storage holds instructions and data the processor needs. RAM is volatile and stores programs and data currently in use. ROM is non-volatile and stores instructions that should remain available when power is removed. When RAM is full, the operating system can move some data between RAM and an area of slower secondary storage called virtual memory. Cache is faster storage close to the CPU for frequently used data and instructions.',
    workedExample: 'Opening several large applications may fill RAM. Less-used data is moved to virtual memory and returned to RAM when required, but repeated transfers make the system slower.',
    keyTerms: ['RAM', 'ROM', 'volatile', 'virtual memory', 'cache'],
    misconception: 'Virtual memory is secondary storage used as an overflow area; it is not extra physical RAM.',
    diagnostic: { question: 'What happens when a system uses virtual memory?', options: ['Data is transferred between RAM and secondary storage', 'ROM becomes volatile', 'The CPU gains another core', 'All files are compressed'], answer: 'Data is transferred between RAM and secondary storage', explanation: 'Virtual memory uses part of secondary storage when RAM does not have enough space.', retryHint: 'Think about what the operating system does with less-used program data when the available main memory is full, and why this is slower.' }
  },
  {
    id: '1.2.2', officialSpecificationPointId: '1.2.2', sourcePages: '7',
    scope: 'Need for secondary storage; optical, magnetic and solid-state media; contextual comparison.',
    explanation: 'Secondary storage keeps programs and data when power is off. Magnetic, optical and solid-state technologies offer different capacity, speed, portability, durability, reliability and cost. A suitable choice depends on the scenario rather than one technology always being best.',
    workedExample: 'For a camera used during sport, a solid-state memory card is small and has no moving parts. For a large low-cost archive, magnetic storage may offer more capacity for the budget.',
    keyTerms: ['secondary storage', 'magnetic', 'optical', 'solid state'],
    misconception: 'Storage media and storage capacity are different ideas: a device type does not have one fixed capacity.',
    diagnostic: { question: 'Which factor most directly supports choosing solid-state storage for a camera used while cycling?', options: ['Durability because it has no moving parts', 'It is always the cheapest per gigabyte', 'It requires mains power', 'It is volatile'], answer: 'Durability because it has no moving parts', explanation: 'A device used while moving benefits from storage that is resistant to shocks.', retryHint: 'Use the cycling context: compare how each storage technology copes with vibration and impacts while the camera is moving.' }
  },
  {
    id: '1.2.3', officialSpecificationPointId: '1.2.3', sourcePages: '8',
    scope: 'Storage units, binary representation and capacity calculations for sound, image and text files.',
    explanation: 'A bit is one binary digit, a nibble is four bits and a byte is eight bits. OCR uses decimal units: 1 KB is 1,000 bytes, then each larger unit is 1,000 of the previous unit; using 1,024 is also accepted. Computers process data in binary. File-size calculations multiply the amount of stored data and then convert units carefully.',
    workedExample: 'A text file with 2,000 characters at 8 bits per character contains 16,000 bits, which is 2,000 bytes or 2 KB using decimal units.',
    keyTerms: ['bit', 'nibble', 'byte', 'kilobyte', 'capacity'],
    misconception: 'Bits and bytes are not interchangeable: divide a number of bits by eight to obtain bytes.',
    diagnostic: { question: 'How many bytes are in 24,000 bits?', options: ['3,000', '24,000', '192,000', '30'], answer: '3,000', explanation: 'There are eight bits in a byte, so 24,000 / 8 = 3,000 bytes.', retryHint: 'Write down how many bits make one byte, then decide whether converting a quantity of bits into the larger unit needs multiplication or division.' }
  },
  {
    id: '1.2.4a', officialSpecificationPointId: '1.2.4', sourcePages: '8',
    scope: 'Positive denary, binary and hexadecimal conversion; binary addition, overflow and binary shifts.',
    explanation: 'Eight bits represent unsigned denary values from 0 to 255 and hexadecimal values from 00 to FF. Each hexadecimal digit corresponds to four binary bits. Binary addition follows place-value rules; overflow occurs when a result cannot fit in the available bits. A left shift moves bits left and usually multiplies an unsigned value by a power of two; a right shift usually divides it, with shifted-out bits lost.',
    workedExample: '00101101 is 45 in denary and 2D in hexadecimal. Shifting it left once in eight bits gives 01011010, which is 90.',
    keyTerms: ['denary', 'binary', 'hexadecimal', 'overflow', 'binary shift'],
    misconception: 'A shift does not preserve bits that leave the fixed-width representation.',
    diagnostic: { question: 'What is the eight-bit binary value 11111111 in denary?', options: ['255', '256', '127', 'FF'], answer: '255', explanation: 'Adding the place values 128+64+32+16+8+4+2+1 gives 255.', retryHint: 'Label all eight binary place values from the most significant bit to the least significant bit, then total every position containing a one.' }
  },
  {
    id: '1.2.4b', officialSpecificationPointId: '1.2.4', sourcePages: '9',
    scope: 'Binary character representation, character sets, bit capacity, ASCII and Unicode.',
    explanation: 'A character set assigns each character a numeric code that is stored in binary. With n bits, up to 2^n different codes can be represented. ASCII covers a limited collection of characters; Unicode supports a much wider range of writing systems and symbols. Character codes are logically ordered, so adjacent letters have adjacent codes.',
    workedExample: 'If A has code 65, B has code 66. In an exam, the ASCII binary code is shown using eight bits.',
    keyTerms: ['character set', 'ASCII', 'Unicode', 'character code'],
    misconception: 'Students do not need to memorise ASCII codes; they must understand how codes represent characters.',
    diagnostic: { question: 'How many different codes can a six-bit character set represent?', options: ['64', '6', '12', '36'], answer: '64', explanation: 'Six bits have 2^6, or 64, possible patterns.', retryHint: 'Each added bit doubles the number of available patterns. Start with one bit and double the pattern count once for every further bit.' }
  },
  {
    id: '1.2.4c', officialSpecificationPointId: '1.2.4', sourcePages: '9',
    scope: 'Bitmap pixels, binary colour codes, metadata, resolution, colour depth, quality and file size.',
    explanation: 'A bitmap image is a grid of pixels. Each pixel colour is represented by a binary code. Resolution describes the pixel dimensions, while colour depth is the number of bits used for each pixel. Increasing either can improve image quality but increases file size. Metadata stores information such as width, height and colour depth.',
    workedExample: 'An uncompressed 100 by 50 pixel image at 8-bit colour depth needs 100 x 50 x 8 = 40,000 bits, or 5,000 bytes, before metadata.',
    keyTerms: ['pixel', 'resolution', 'colour depth', 'metadata'],
    misconception: 'Colour depth is bits per pixel, not the total number of colours in the image.',
    diagnostic: { question: 'What is the main file-size effect of increasing colour depth?', options: ['More bits are stored for every pixel', 'The image has fewer pixels', 'Metadata is removed', 'The image becomes lossless'], answer: 'More bits are stored for every pixel', explanation: 'Colour depth specifies how many bits represent each pixel.' }
  },
  {
    id: '1.2.4d', officialSpecificationPointId: '1.2.4', sourcePages: '9',
    scope: 'Digital sound sampling; sample rate, duration and bit depth effects on quality and size.',
    explanation: 'A microphone produces an analogue signal. Sampling measures its amplitude at regular intervals and stores each measurement in binary. Sample rate is the number of samples per second in hertz; bit depth is the bits used for each sample. Higher sample rate or bit depth can improve playback quality but increases file size, and longer duration also increases size.',
    workedExample: 'A mono recording sampled at 8,000 Hz for 10 seconds with an 8-bit depth contains 8,000 x 10 x 8 = 640,000 bits.',
    keyTerms: ['sample', 'sample rate', 'hertz', 'bit depth', 'duration'],
    misconception: 'Bit depth controls the precision of each sample; sample rate controls how often samples are taken.',
    diagnostic: { question: 'Which change records the sound wave more frequently?', options: ['Increasing sample rate', 'Increasing duration', 'Reducing bit depth', 'Adding metadata'], answer: 'Increasing sample rate', explanation: 'Sample rate is the number of measurements taken each second.' }
  },
  {
    id: '1.2.5', officialSpecificationPointId: '1.2.5', sourcePages: '9',
    scope: 'Need for compression; lossy and lossless methods, effects and scenarios.',
    explanation: 'Compression reduces file size, which can save storage and reduce transmission time. Lossless compression allows the original data to be reconstructed exactly. Lossy compression permanently removes some data and can achieve a smaller file at the cost of quality. The choice depends on whether exact recovery matters.',
    workedExample: 'A program source file needs lossless compression because every character matters. A streamed photograph may use lossy compression when a small quality reduction is acceptable.',
    keyTerms: ['compression', 'lossy', 'lossless'],
    misconception: 'Lossless compression still reduces file size; “lossless” means no information is permanently lost.',
    diagnostic: { question: 'Why is lossless compression appropriate for source code?', options: ['The original must be reconstructed exactly', 'It always creates the smallest possible file', 'It removes unimportant instructions', 'It increases colour depth'], answer: 'The original must be reconstructed exactly', explanation: 'Any missing or changed source-code character could alter or break the program.' }
  },
  {
    id: '1.3.1', officialSpecificationPointId: '1.3.1', sourcePages: '10',
    scope: 'LAN/WAN, performance, client-server and peer-to-peer, network hardware, Internet services, cloud, star and mesh.',
    explanation: 'A LAN covers a limited area and is normally owned by one organisation; a WAN connects networks over a wider area using third-party infrastructure. Network performance is affected by factors such as bandwidth and connected devices. Clients request services, while servers provide them. Switches connect devices within a LAN, routers connect networks, NICs give network connectivity and wireless access points provide wireless access. The Internet links networks; DNS resolves domain names, hosting makes resources available, and cloud computing provides remote storage, software or processing.',
    workedExample: 'A school file server centrally stores work for clients. A switch directs frames within the LAN and a router forwards traffic to other networks.',
    keyTerms: ['LAN', 'WAN', 'client', 'server', 'switch', 'router', 'DNS', 'cloud'],
    misconception: 'The Internet and the World Wide Web are not identical: the web is one service that uses the Internet.',
    diagnostic: { question: 'Which device normally connects a school LAN to another network?', options: ['Router', 'Switch', 'NIC', 'Wireless mouse'], answer: 'Router', explanation: 'A router forwards data between different networks.', retryHint: 'Choose the device that inspects network addressing information and selects where a packet should travel next when it leaves the local network.' }
  },
  {
    id: '1.3.2', officialSpecificationPointId: '1.3.2', sourcePages: '11',
    scope: 'Wired/wireless connections, encryption, IP and MAC addressing, standards, named protocols and layers.',
    explanation: 'Ethernet is a wired connection; Wi-Fi and Bluetooth are wireless. A choice depends on mobility, range, reliability, speed and interference. Encryption makes intercepted data unreadable without the key. IP addresses identify network destinations; IPv4 and IPv6 have different formats. A MAC address identifies a network interface within a network. Standards allow products to work together. Protocols are communication rules: TCP/IP supports network transmission, HTTP/HTTPS transfer web content, FTP transfers files, SMTP sends email, and POP or IMAP retrieves or manages email. Layers separate responsibilities, helping development and troubleshooting.',
    workedExample: 'A desktop that needs a stable high-speed connection may use Ethernet. A phone uses Wi-Fi for mobility. HTTPS adds encrypted communication for web traffic.',
    keyTerms: ['Ethernet', 'Wi-Fi', 'encryption', 'IP address', 'MAC address', 'protocol', 'layer'],
    misconception: 'OCR requires the benefits of layers, but not the names and functions of every TCP/IP layer.',
    diagnostic: { question: 'Which protocol is used to send email from a client to a mail server?', options: ['SMTP', 'IMAP', 'POP', 'FTP'], answer: 'SMTP', explanation: 'SMTP sends email; POP and IMAP are used to retrieve or manage received email.', retryHint: 'Separate the protocol used for outgoing mail transfer from protocols used by a client to retrieve or synchronise messages already received.' }
  },
  {
    id: '1.4.1', officialSpecificationPointId: '1.4.1', sourcePages: '12',
    scope: 'Malware, social engineering, brute force, denial of service, interception/theft and SQL injection.',
    explanation: 'Security threats target devices, services or data. Malware is malicious software. Social engineering manipulates people, for example through phishing. Brute-force attacks try many credentials. Denial-of-service attacks overwhelm a service so legitimate users cannot access it. Interception captures data in transit. SQL injection places malicious database commands into unprotected input. For each threat, learners must explain how it works and its purpose.',
    workedExample: 'A fake password-reset message directs a user to a copied login page. This is phishing: the attacker exploits trust to steal credentials.',
    keyTerms: ['malware', 'social engineering', 'brute force', 'denial of service', 'SQL injection'],
    misconception: 'Phishing is social engineering, not necessarily malware.',
    diagnostic: { question: 'Which attack attempts many possible passwords until one succeeds?', options: ['Brute force', 'Denial of service', 'Data interception', 'Phishing'], answer: 'Brute force', explanation: 'A brute-force attack systematically tries credential combinations.', retryHint: 'Focus on the repeated automated guessing of credentials, rather than tricking a person, overwhelming a service or reading traffic in transit.' }
  },
  {
    id: '1.4.2', officialSpecificationPointId: '1.4.2', sourcePages: '12',
    scope: 'Penetration testing, anti-malware, firewalls, access levels, passwords, encryption and physical security.',
    explanation: 'Security controls reduce vulnerabilities or limit attacks. Penetration testing finds weaknesses with permission. Anti-malware detects or removes malicious software. Firewalls filter network traffic using rules. Access levels restrict what authenticated users can do. Strong passwords resist guessing. Encryption protects confidentiality if data is intercepted. Physical controls prevent unauthorised access to equipment. A good answer links a control to the specific threat it reduces.',
    workedExample: 'Giving pupils read-only access to shared records uses access levels to prevent unauthorised changes even after a valid login.',
    keyTerms: ['penetration testing', 'firewall', 'access level', 'physical security'],
    misconception: 'A firewall does not guarantee that all malware is blocked; it controls network traffic according to rules.',
    diagnostic: { question: 'Which control deliberately searches a system for exploitable weaknesses?', options: ['Penetration testing', 'Defragmentation', 'Compression', 'File management'], answer: 'Penetration testing', explanation: 'Authorised penetration testing simulates attacks to identify vulnerabilities.', retryHint: 'Look for an authorised security activity that imitates attack techniques so weaknesses can be discovered and repaired before a real attacker uses them.' }
  },
  {
    id: '1.5.1', officialSpecificationPointId: '1.5.1', sourcePages: '13',
    scope: 'Operating-system purpose: user interface, memory/multitasking, peripherals/drivers, users and files.',
    explanation: 'An operating system manages hardware and provides services for users and applications. Its interface accepts user commands. Memory management allocates memory and supports multitasking. Peripheral management coordinates data transfer and uses drivers to communicate with particular devices. User management creates accounts and access rights. File management supports naming, saving, moving and organising files.',
    workedExample: 'When two applications run, the operating system allocates memory to each and schedules access to the processor while continuing to respond to input devices.',
    keyTerms: ['operating system', 'multitasking', 'driver', 'access rights', 'file management'],
    misconception: 'A driver is software that lets the operating system communicate with hardware; it is not the physical device.',
    diagnostic: { question: 'Which operating-system function allocates RAM to running applications?', options: ['Memory management', 'File management', 'User interface', 'Encryption'], answer: 'Memory management', explanation: 'Memory management assigns memory to applications and supports multitasking.', retryHint: 'Match the resource named in the question to the operating-system responsibility that tracks free space and assigns that resource to active processes.' }
  },
  {
    id: '1.5.2', officialSpecificationPointId: '1.5.2', sourcePages: '13',
    scope: 'Purpose of utility software; encryption, defragmentation and data compression utilities.',
    explanation: 'Utility software performs maintenance or additional housekeeping tasks. Encryption utilities transform readable data so it requires a key. Compression utilities reduce file size. Defragmentation reorganises parts of files on magnetic disks so they are stored more contiguously, reducing head movement. These utilities perform tasks that may not be part of the operating system itself.',
    workedExample: 'After files on a magnetic hard disk become fragmented, a defragmentation utility reorganises their blocks. It is not used to gain the same benefit on solid-state storage, which has no moving read head.',
    keyTerms: ['utility software', 'encryption', 'defragmentation', 'compression'],
    misconception: 'Defragmentation reorganises file blocks; it does not compress the files.',
    diagnostic: { question: 'What is the purpose of a defragmentation utility?', options: ['Reorganise file blocks on magnetic storage', 'Encrypt files with a key', 'Remove all metadata', 'Allocate RAM to programs'], answer: 'Reorganise file blocks on magnetic storage', explanation: 'More contiguous blocks can reduce mechanical head movement on a hard disk.', retryHint: 'Consider a hard disk whose parts of one file are scattered across many locations and how reducing mechanical head travel could improve access time.' }
  },
  {
    id: '1.6.1', officialSpecificationPointId: '1.6.1', sourcePages: '14',
    scope: 'Ethical, cultural, environmental and privacy impacts of digital technology.',
    explanation: 'Digital technology can create benefits and harms for individuals, organisations and society. Ethical questions concern what ought to be done; cultural impacts affect behaviour and communities; environmental impacts include energy use, resource extraction and electronic waste; privacy concerns arise from collecting, analysing and sharing personal data. Strong discussion applies several perspectives to a scenario and reaches a justified conclusion.',
    workedExample: 'Remote working can reduce commuting but increases reliance on devices and data centres. It can improve access for some people while excluding those without suitable equipment or connectivity.',
    keyTerms: ['ethical issue', 'cultural impact', 'environmental impact', 'privacy'],
    misconception: 'An ethical concern is not automatically illegal; law and ethics overlap but are different tests.',
    diagnostic: { question: 'Which is primarily an environmental impact of digital technology?', options: ['Electronic waste from replaced devices', 'A software licence condition', 'A password length rule', 'A syntax error'], answer: 'Electronic waste from replaced devices', explanation: 'Discarded hardware creates waste and uses resources in manufacture and disposal.', retryHint: 'Identify the option that affects physical resources, pollution or disposal, rather than a legal condition, security rule or programming fault.' }
  },
  {
    id: '1.6.2', officialSpecificationPointId: '1.6.1', sourcePages: '14',
    scope: 'Data Protection Act 2018, Computer Misuse Act 1990, Copyright Designs and Patents Act 1988, and software licences.',
    explanation: 'The Data Protection Act 2018 governs responsible processing of personal data. The Computer Misuse Act 1990 prohibits unauthorised access and related unauthorised acts. The Copyright, Designs and Patents Act 1988 protects creators’ work from unauthorised copying or distribution. Software licences state how software may be used. Open-source licences provide source-code access and permission to modify under their terms; proprietary software normally withholds source code and grants restricted use.',
    workedExample: 'A business may choose open-source software to inspect and adapt the code, but it must follow the licence and consider support needs. Buying proprietary software does not transfer copyright ownership.',
    keyTerms: ['Data Protection Act 2018', 'Computer Misuse Act 1990', 'copyright', 'software licence'],
    misconception: '“Open source” does not mean there are no licence conditions or copyright.',
    diagnostic: { question: 'Which law addresses unauthorised access to computer systems?', options: ['Computer Misuse Act 1990', 'Data Protection Act 2018', 'Copyright, Designs and Patents Act 1988', 'Health and Safety at Work Act'], answer: 'Computer Misuse Act 1990', explanation: 'The Computer Misuse Act covers unauthorised access and related unauthorised acts.', retryHint: 'Distinguish legislation about accessing computer systems without permission from laws about personal information, creative ownership and workplace safety.' }
  },
  {
    id: '2.1.1', officialSpecificationPointId: '2.1.1', sourcePages: '15',
    scope: 'Abstraction, decomposition and algorithmic thinking to define and refine problems.',
    explanation: 'Decomposition breaks a problem into smaller parts. Abstraction removes detail that is not relevant to the solution. Algorithmic thinking develops a clear sequence of steps. These principles work together when defining and refining a problem.',
    workedExample: 'For a journey planner, decomposition separates route input, route search and output. Abstraction ignores the colour of buildings, and algorithmic thinking orders the route-search steps.',
    keyTerms: ['decomposition', 'abstraction', 'algorithmic thinking'],
    misconception: 'Abstraction removes irrelevant detail; it does not mean making every part less detailed.',
    diagnostic: { question: 'A developer ignores the colour of cars when modelling traffic flow. Which principle is used?', options: ['Abstraction', 'Decomposition', 'Iteration', 'Validation'], answer: 'Abstraction', explanation: 'The irrelevant colour detail is removed from the model.', retryHint: 'Ask which computational-thinking process removes details that do not affect the model, rather than splitting the problem or checking input.' }
  },
  {
    id: '2.1.2', officialSpecificationPointId: '2.1.2', sourcePages: '15',
    scope: 'Inputs/processes/outputs, structure diagrams, algorithm representations, errors, tracing and nesting.',
    explanation: 'Algorithm design begins by identifying inputs, processes and outputs. Structure diagrams decompose a problem and show links. Algorithms can be created, interpreted, corrected, completed and refined as pseudocode, flowcharts, OCR Exam Reference Language or a high-level language. Trace tables record changing values step by step and reveal logic errors. Selection and iteration can be nested.',
    workedExample: 'For an average calculator, inputs are the values, the process totals and divides them, and the output is the average. A trace table records the running total after each iteration.',
    keyTerms: ['input', 'process', 'output', 'flowchart', 'trace table', 'nesting'],
    misconception: 'A trace-table row should represent a meaningful execution step, not merely copy every source-code line.',
    diagnostic: { question: 'What is the main purpose of a trace table?', options: ['Follow variable values as an algorithm executes', 'Translate code into machine code', 'Store files permanently', 'Draw a network topology'], answer: 'Follow variable values as an algorithm executes', explanation: 'Tracing records how state changes so behaviour and logic errors can be identified.', retryHint: 'Think about recording program state after each instruction or loop pass so you can see where an algorithm begins to behave unexpectedly.' }
  },
  {
    id: '2.1.3', officialSpecificationPointId: '2.1.3', sourcePages: '16',
    scope: 'Linear and binary search; bubble, merge and insertion sort; steps, prerequisites, application and recognition.',
    explanation: 'Linear search checks items in order and needs no sorting. Binary search repeatedly halves a sorted search area, so the data must be ordered first. Bubble sort compares adjacent pairs over repeated passes. Insertion sort builds a sorted section by inserting each item. Merge sort divides data, sorts smaller parts and merges them. Learners apply and recognise these algorithms but need not memorise their code.',
    workedExample: 'To find 31 in [4, 12, 20, 31, 45], binary search checks 20, keeps the right half, then checks 31.',
    keyTerms: ['linear search', 'binary search', 'bubble sort', 'insertion sort', 'merge sort'],
    misconception: 'Binary search cannot correctly discard half of an unsorted list.',
    diagnostic: { question: 'Which algorithm requires the data to be sorted before searching?', options: ['Binary search', 'Linear search', 'Bubble sort', 'Insertion sort'], answer: 'Binary search', explanation: 'Binary search relies on order to decide which half cannot contain the target.', retryHint: 'Choose the search method that repeatedly rules out half of the remaining items; that decision is reliable only when the items are already ordered.' }
  },
  {
    id: '2.2.1', officialSpecificationPointId: '2.2.1', sourcePages: '17',
    scope: 'Variables, constants, input/output/assignment, sequence, selection, iteration and specified operators.',
    explanation: 'Variables and constants give names to values; assignment stores a value. Input obtains data and output presents a result. Sequence runs instructions in order, selection chooses a path from a condition, and iteration repeats instructions using count-controlled or condition-controlled loops. Programs use comparison, arithmetic and Boolean operators, including MOD for remainder, DIV for integer quotient and ^ for exponentiation in OCR Exam Reference Language.',
    workedExample: 'If score is 17, score MOD 5 is 2 and score DIV 5 is 3. A selection can output “pass” only when score >= the threshold.',
    keyTerms: ['variable', 'constant', 'assignment', 'selection', 'iteration', 'MOD', 'DIV'],
    misconception: 'The assignment operator changes a stored value; it is not the same operation as testing equality.',
    diagnostic: { question: 'What is the result of 17 MOD 5?', options: ['2', '3', '3.4', '85'], answer: '2', explanation: 'MOD returns the remainder after integer division.', retryHint: 'Divide the first number by the second using whole groups, then use the amount left over after those complete groups have been removed.' }
  },
  {
    id: '2.2.2', officialSpecificationPointId: '2.2.2', sourcePages: '18',
    scope: 'Integer, real, Boolean, character, string and casting; practical choice in context.',
    explanation: 'An integer stores a whole number, a real stores a number with a fractional part, a Boolean stores true or false, a character stores one character and a string stores a sequence of characters. A suitable type reflects valid values and required operations. Casting temporarily converts a value to another type.',
    workedExample: 'An age may be an integer, a price a real, a login status a Boolean and a postcode a string. Casting the input string “12” to an integer allows arithmetic.',
    keyTerms: ['integer', 'real', 'Boolean', 'character', 'string', 'casting'],
    misconception: 'Numeric-looking input is often received as a string and may need casting before arithmetic.',
    diagnostic: { question: 'Which data type is most suitable for a value that can only be true or false?', options: ['Boolean', 'Integer', 'Character', 'Real'], answer: 'Boolean', explanation: 'A Boolean represents exactly two logical values.', retryHint: 'Look for the data type designed for exactly two logical states, rather than a whole number, decimal value or single symbol.' }
  },
  {
    id: '2.2.3', officialSpecificationPointId: '2.2.3', sourcePages: '18',
    scope: 'Strings, files, records, SQL, 1D/2D arrays, subprograms, scope, arrays and random numbers.',
    explanation: 'Strings can be concatenated and sliced. File handling opens, reads, writes and closes files. Records group related fields. SELECT, FROM and WHERE retrieve matching data with SQL. Fixed-length 1D and 2D arrays store indexed values, with 2D arrays able to model rows and fields. Functions return values; procedures perform named tasks. Local names exist inside a subprogram, global names have wider scope, and arrays can be passed or returned. Programs can generate random numbers.',
    workedExample: 'SELECT Name FROM Pupil WHERE House = "Red" returns the Name field for records whose House field is Red.',
    keyTerms: ['concatenation', 'slicing', 'record', 'SQL', 'array', 'function', 'procedure', 'local variable'],
    misconception: 'WHERE filters records; it does not choose which fields are displayed.',
    diagnostic: { question: 'Which SQL clause specifies the condition records must satisfy?', options: ['WHERE', 'SELECT', 'FROM', 'RETURN'], answer: 'WHERE', explanation: 'WHERE filters rows; SELECT chooses fields and FROM identifies the table.', retryHint: 'Separate the clause that chooses output fields from the clause that names the table; you need the remaining clause that filters rows using a condition.' }
  },
  {
    id: '2.2.PY', officialSpecificationPointId: '2d / 2.2', sourcePages: '17-22',
    scope: 'Practical use of specification programming techniques in the centre’s chosen high-level language (Python pathway).',
    explanation: 'Python practice applies the J277 programming techniques by reading, tracing, completing, debugging, writing, testing and refining executable programs. Learners should progress from small constructs to complete solutions using inputs, processing and outputs, and should justify test data and refinements.',
    workedExample: 'A learner first predicts a loop’s output, then corrects its boundary condition, writes a similar loop, and tests it with normal and boundary values.',
    keyTerms: ['Python', 'trace', 'debug', 'test', 'refine'],
    misconception: 'Passing a few syntax exercises is not evidence that a learner can design, test and refine a complete solution.',
    diagnostic: { question: 'Which activity best demonstrates practical programming rather than recall?', options: ['Writing and testing a program for a new scenario', 'Naming the three constructs', 'Defining an integer', 'Listing IDE tools'], answer: 'Writing and testing a program for a new scenario', explanation: 'Practical programming requires applying techniques to produce and test working code.' }
  },
  {
    id: '2.2.ERL', officialSpecificationPointId: '3c / 2.1-2.3', sourcePages: '25-31',
    scope: 'Read, trace, complete, write and refine algorithms using OCR Exam Reference Language.',
    explanation: 'OCR Exam Reference Language is the notation supplied in assessment materials. Learners must recognise its assignment, input/output, selection, iteration, string, array, file and subprogram forms and use it where an exam response requires that language. It should be taught separately from Python so syntax can be translated accurately without confusing the two.',
    workedExample: 'Python `if score >= 50:` corresponds to the OCR form `if score >= 50 then`; the OCR selection ends explicitly with `endif`.',
    keyTerms: ['OCR Exam Reference Language', 'assignment', 'selection', 'iteration'],
    misconception: 'Loose natural-language pseudocode may not satisfy a question that explicitly requires OCR Exam Reference Language or a high-level language.',
    diagnostic: { question: 'Why should OCR Exam Reference Language be tracked separately from Python?', options: ['Its notation differs and may be required in exam responses', 'It runs faster than Python', 'It is a low-level language', 'It replaces all practical programming'], answer: 'Its notation differs and may be required in exam responses', explanation: 'Learners need to read and produce the required notation without mixing language syntax.' }
  },
  {
    id: '2.3.1', officialSpecificationPointId: '2.3.1', sourcePages: '19',
    scope: 'Anticipating misuse, authentication, validation and maintainability.',
    explanation: 'Defensive design anticipates likely misuse and invalid values. Authentication confirms identity, while validation checks that input follows rules; neither proves that entered data is factually correct. Maintainability improves through suitable subprograms, meaningful naming, consistent indentation and useful comments.',
    workedExample: 'An age input can use a type and range check, repeat the prompt after invalid data, and keep the validation in a clearly named subprogram.',
    keyTerms: ['defensive design', 'authentication', 'validation', 'maintainability'],
    misconception: 'Validation checks acceptability, not truth: a plausible but incorrect date can pass validation.',
    diagnostic: { question: 'What does authentication confirm?', options: ['The identity of a user', 'That input is factually true', 'That code has no logic errors', 'That a file is compressed'], answer: 'The identity of a user', explanation: 'Authentication checks that a user is who they claim to be.', retryHint: 'Think about what a login check establishes about the person requesting access, rather than whether entered data is sensible or software is correct.' }
  },
  {
    id: '2.3.2', officialSpecificationPointId: '2.3.2', sourcePages: '19',
    scope: 'Purpose and stages of testing, syntax/logic errors, test-data categories, test plans and refinement.',
    explanation: 'Iterative testing checks parts of a program during development; final or terminal testing checks the completed program. Syntax errors break language grammar and prevent translation or execution. Logic errors allow a program to run but produce an unexpected result. Normal data is typical valid data. Boundary data is valid data at an allowed limit. Invalid or erroneous data should be rejected; examples include a value outside the permitted range or data of the wrong type. A test plan includes the test data, its category, the expected result and the actual result.',
    workedExample: 'For an integer range 1 to 10: 5 is normal, 1 and 10 are boundaries, 11 is invalid, and “five” is erroneous.',
    keyTerms: ['iterative testing', 'terminal testing', 'normal data', 'boundary data', 'invalid data', 'erroneous data'],
    misconception: 'A value just outside a valid range is invalid, not boundary data.',
    diagnostic: { question: 'For an integer input from 1 to 10, how should the value 11 be classified?', options: ['Invalid', 'Boundary', 'Normal', 'Erroneous'], answer: 'Invalid', explanation: 'It has the correct type but lies outside the accepted range.', retryHint: 'Write the two allowed edge values first, then check whether the supplied value lies inside or outside that inclusive range.' }
  },
  {
    id: '2.4.1', officialSpecificationPointId: '2.4.1', sourcePages: '20',
    scope: 'AND, OR and NOT symbols, diagrams, truth tables, combinations and scenarios.',
    explanation: 'AND outputs 1 only when both inputs are 1. OR outputs 1 when at least one input is 1. NOT reverses its single input. Truth tables list every input combination and resulting output. Combined diagrams are evaluated gate by gate, and can be created or edited to model scenario rules.',
    workedExample: 'For (A AND B) OR NOT C with A=1, B=0 and C=0: A AND B is 0, NOT C is 1, so the final output is 1.',
    keyTerms: ['AND', 'OR', 'NOT', 'truth table', 'logic diagram'],
    misconception: 'OR is inclusive in this specification: it outputs 1 when either or both inputs are 1.',
    diagnostic: { question: 'What is the output of an OR gate when both inputs are 1?', options: ['1', '0', 'Undefined', 'It alternates'], answer: '1', explanation: 'OR outputs 1 when at least one input is 1, including when both are 1.', retryHint: 'Recall the condition that makes this gate active, then check whether the pair of inputs satisfies that condition at least once.' }
  },
  {
    id: '2.5.1', officialSpecificationPointId: '2.5.1', sourcePages: '21',
    scope: 'High- and low-level languages, need for translators, compilers and interpreters.',
    explanation: 'High-level languages are more readable, portable and abstracted from hardware. Low-level languages are closer to machine instructions and hardware control. A translator is needed because a processor executes machine code. A compiler translates a whole program before execution and can create executable code; an interpreter translates and executes one instruction at a time. Their speed, portability, error reporting and distribution trade-offs depend on the scenario.',
    workedExample: 'A compiler can prepare a release build that runs without translating each source instruction again. An interpreter can give immediate feedback while developing and testing.',
    keyTerms: ['high-level language', 'low-level language', 'translator', 'compiler', 'interpreter'],
    misconception: 'Assembler knowledge is not required by OCR J277 2.5.1.',
    diagnostic: { question: 'Why does high-level source code require a translator?', options: ['The CPU executes machine code', 'The CPU only stores images', 'High-level code is encrypted', 'RAM cannot store text'], answer: 'The CPU executes machine code', explanation: 'A compiler or interpreter translates high-level instructions into operations the processor can execute.', retryHint: 'Compare the human-readable instructions written by a programmer with the low-level instruction format that processor hardware can carry out.' }
  },
  {
    id: '2.5.2', officialSpecificationPointId: '2.5.2', sourcePages: '21',
    scope: 'IDE editors, error diagnostics, run-time environments and translators; practical use.',
    explanation: 'An integrated development environment combines tools for producing programs. The editor supports entering and changing source code. Error diagnostics identify problems and locations. A run-time environment lets the programmer execute the program. An included translator converts or executes the source. Learners need practical experience using these facilities.',
    workedExample: 'A programmer uses the editor to change a condition, reads the diagnostic that identifies a missing delimiter, then runs the corrected program in the IDE.',
    keyTerms: ['IDE', 'editor', 'error diagnostics', 'run-time environment', 'translator'],
    misconception: 'Syntax highlighting may help reading, but the OCR-required editor category is broader than that one feature.',
    diagnostic: { question: 'Which IDE facility reports where a syntax problem has occurred?', options: ['Error diagnostics', 'Run-time environment', 'File compression', 'User management'], answer: 'Error diagnostics', explanation: 'Diagnostic tools identify errors and help the programmer locate them.', retryHint: 'Choose the development-environment tool that marks or reports problems in source code and points the programmer towards their location.' }
  }
  ];

  const supportedPractice = {
    '1.1.1': 'Draw five boxes: PC, MAR, Memory (RAM), MDR and Control Unit.|Draw an arrow from the PC to the MAR. Label it “address”.|Draw arrows from Memory (RAM) to the MDR, then to the Control Unit. Label them “instruction”.|Show when the PC increases.|Write one sentence: What is the difference between the MAR and MDR?',
    '1.1.2': 'Compare two processors for a video-editing task. Change one characteristic at a time, explain the likely effect, then explain why software that cannot run work in parallel may gain little from extra cores.',
    '1.1.3': 'For a washing machine, games console and desktop PC, identify the larger device, the computing purpose and whether users can choose many unrelated tasks. Justify which examples are embedded systems.',
    '1.2.1': 'Complete a RAM-versus-ROM table for volatility, purpose and typical contents. Then trace what happens when several applications fill RAM and explain why repeated virtual-memory transfers reduce performance.',
    '1.2.2': 'Choose storage for a moving camera, an archive and distributing a film. Rank capacity, speed, portability, durability, reliability and cost for each scenario before recommending a technology.',
    '1.2.3': 'Convert 32,000 bits to bytes and KB using the stated decimal convention. Write every conversion step and unit; if KiB is requested, use 1,024 bytes and label it explicitly.',
    '1.2.4a': 'Convert 3A from hexadecimal to binary and denary, add two eight-bit values, identify whether overflow occurs, then trace a two-place binary shift including any bits lost.',
    '1.2.4b': 'Calculate how many codes are available with five bits. Explain why Unicode supports more writing systems than ASCII and use adjacent character codes without memorising a code table.',
    '1.2.4c': 'For a 320 by 200 bitmap at 8-bit colour depth, calculate bits and bytes. Then predict separately how increased resolution and colour depth affect quality and uncompressed size.',
    '1.2.4d': 'For a mono recording, multiply sample rate by duration and bit depth. Annotate which factor measures frequency, precision and recording length, then predict quality and size changes.',
    '1.2.5': 'Recommend lossy or lossless compression for source code, a streamed photograph and a medical image. Link exact reconstruction, quality, storage and transmission time to each decision.',
    '1.3.1': 'Design a school LAN. Choose client-server or peer-to-peer, label switch, router, NIC, access point and transmission media, then compare star and mesh resilience, cost and fault impact.',
    '1.3.2': 'Choose Ethernet, Wi-Fi or Bluetooth for three devices. Match each named protocol to its purpose, distinguish IPv4, IPv6 and MAC formats, then explain two benefits of protocol layering without naming individual layers.',
    '1.4.1': 'For each attack, write how it operates and what the attacker intends. Distinguish malicious software, manipulation of people, repeated credential guesses, service flooding, interception and malicious SQL input.',
    '1.4.2': 'Match each threat to a proportionate prevention method and explain the mechanism. Include why access levels limit damage after login and why encryption protects intercepted data but does not stop interception.',
    '1.5.1': 'Trace what the operating system manages when two applications run and a printer is used. Link memory allocation, processor access, drivers, user rights and file operations to the correct OS function.',
    '1.5.2': 'For encryption, compression and defragmentation utilities, state the housekeeping task, when it is useful and one limitation. Apply defragmentation only to storage with a moving read head.',
    '1.6.1': 'For facial-recognition attendance, build a balanced table covering ethical, legal, cultural, environmental and privacy effects. Use affected stakeholders and evidence before reaching a justified conclusion.',
    '1.6.2': 'For each named law, identify its purpose and a permitted or prohibited action. Then recommend open-source or proprietary licensing for a school scenario with one benefit and drawback.',
    '2.1.1': 'Decompose a library system into linked parts, abstract away details that do not affect borrowing, and write an ordered algorithmic plan. Explain how each principle changes the problem representation.',
    '2.1.2': 'Draw an IPO table and structure diagram, then translate a decision into a flowchart. Trace a nested loop in a table, locate the first incorrect value and refine the algorithm.',
    '2.1.3': 'Apply linear and binary search to the same ordered list. Perform one full pass of bubble and insertion sort and one split-and-merge stage, stating prerequisites and recognising each algorithm from its steps.',
    '2.2.1': 'Write a short algorithm containing input, assignment, sequence, selection and both loop types. Trace DIV, MOD, comparison and Boolean conditions before translating the design into executable code.',
    '2.2.2': 'Choose types for age, price, login state, initial and postcode. Cast a numeric input string before arithmetic and explain why an unsuitable type would reject values or permit invalid operations.',
    '2.2.3': 'Complete linked examples for slicing and concatenation, file open/read/write/close, record fields, SELECT-FROM-WHERE, 1D and 2D arrays, functions, procedures, local/global scope and random numbers.',
    '2.2.PY': 'Progress through reading, tracing, completing, debugging, writing and testing Python. For each constructed program, state inputs, processes and outputs and run normal, boundary and invalid tests before refinement.',
    '2.2.ERL': 'Translate a short Python selection and loop into current OCR ERL using = for assignment, == for equality and endif. Trace it, complete a missing construct, then write and refine an equivalent solution.',
    '2.3.1': 'Design a login input routine that handles likely misuse, checks identity and checks the input format. Then refine it: split the code into clearly named subprograms, use meaningful names and indentation, and add comments that explain its purpose.',
    '2.3.2': 'Create a test plan with normal, both boundary, invalid and erroneous values. Record expected and actual results, identify syntax versus logic faults and refine the program before final testing.',
    '2.4.1': 'Complete AND, OR and NOT truth tables, then evaluate a two-gate diagram one intermediate output at a time. Finally draw or edit a diagram that matches a stated access-control rule.',
    '2.5.1': 'Compare high- and low-level languages for readability and hardware control. Choose a compiler or interpreter for development and distribution, linking translation timing, diagnostics and execution.',
    '2.5.2': 'In an IDE, edit a faulty program, use diagnostics to locate the syntax problem, run the corrected version and identify the translator involved. Record what each facility contributed.'
  };
  const assessmentModes = {
    '1.1.1': ['recall', 'explanation', 'application'], '1.1.2': ['explanation', 'comparison', 'application'], '1.1.3': ['recall', 'application'],
    '1.2.1': ['recall', 'comparison', 'explanation'], '1.2.2': ['comparison', 'recommendation', 'application'], '1.2.3': ['recall', 'calculation'],
    '1.2.4a': ['conversion', 'calculation', 'application'], '1.2.4b': ['recall', 'calculation', 'explanation'], '1.2.4c': ['calculation', 'explanation', 'application'],
    '1.2.4d': ['calculation', 'explanation', 'application'], '1.2.5': ['comparison', 'recommendation'], '1.3.1': ['explanation', 'comparison', 'application'],
    '1.3.2': ['recall', 'comparison', 'recommendation'], '1.4.1': ['explanation', 'application'], '1.4.2': ['explanation', 'recommendation', 'application'],
    '1.5.1': ['recall', 'explanation', 'application'], '1.5.2': ['recall', 'explanation', 'application'], '1.6.1': ['discussion', 'evaluation', 'extended response'],
    '1.6.2': ['recall', 'recommendation', 'application'], '2.1.1': ['explanation', 'application'], '2.1.2': ['design', 'trace', 'complete', 'refine'],
    '2.1.3': ['trace', 'apply', 'compare'], '2.2.1': ['read', 'trace', 'write', 'programming'], '2.2.2': ['selection', 'explanation', 'programming'],
    '2.2.3': ['programming', 'trace', 'SQL', 'application'], '2.2.PY': ['design', 'write', 'test', 'refine'], '2.2.ERL': ['read', 'trace', 'complete', 'write', 'refine'],
    '2.3.1': ['design', 'explanation', 'programming'], '2.3.2': ['design', 'complete', 'application'], '2.4.1': ['truth table', 'diagram', 'application'],
    '2.5.1': ['explanation', 'comparison', 'recommendation'], '2.5.2': ['recall', 'practical use']
  };
  const prerequisites = {
    '1.1.2': ['1.1.1'],
    '1.2.3': [],
    '1.2.4a': ['1.2.3'],
    '1.2.4b': ['1.2.3'],
    '1.2.4c': ['1.2.3'],
    '1.2.4d': ['1.2.3'],
    '1.3.2': ['1.3.1'],
    '1.4.2': ['1.4.1'],
    '2.1.2': ['2.1.1'],
    '2.1.3': ['2.1.2'],
    '2.2.2': ['2.2.1'],
    '2.2.3': ['2.2.1', '2.2.2'],
    '2.2.PY': ['2.1.2', '2.2.1', '2.2.2'],
    '2.2.ERL': ['2.1.2', '2.2.1', '2.2.2'],
    '2.3.1': ['2.2.1'],
    '2.3.2': ['2.2.1', '2.2.2'],
    '2.5.2': ['2.5.1']
  };
  const teachingSections = {
    '1.1.1': [
      {
        heading: 'Central Processing Unit (CPU) Core Components',
        body: 'The CPU is the primary processing unit that executes instructions. The Control Unit (CU) coordinates all CPU activities, decodes instructions, and sends control signals. The Arithmetic Logic Unit (ALU) performs mathematical calculations and logical comparisons. Cache memory is high-speed temporary storage positioned close to the processor to hold frequently accessed data and instructions.',
        html: `
          <p style="font-size: 15px; color: var(--text-muted); margin-bottom: 16px; line-height: 1.5;">The CPU processes instructions and coordinates the movement and processing of data. These components have different roles:</p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-bottom: 24px;">
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-top: 4px solid var(--teal); padding: 18px 20px; border-radius: 10px;">
              <strong style="color: var(--teal); font-size: 15.5px; display: block; margin-bottom: 8px;">🕹️ Control Unit (CU)</strong>
              <ul style="font-size: 14.5px; color: var(--text-main); padding-left: 18px; margin: 0; line-height: 1.6;">
                <li>Coordinates all CPU activities &amp; F-D-E cycle</li>
                <li>Decodes fetched instructions</li>
                <li>Sends control signals to hardware</li>
              </ul>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-top: 4px solid #3B82F6; padding: 18px 20px; border-radius: 10px;">
              <strong style="color: #60A5FA; font-size: 15.5px; display: block; margin-bottom: 8px;">🧮 Arithmetic Logic Unit (ALU)</strong>
              <ul style="font-size: 14.5px; color: var(--text-main); padding-left: 18px; margin: 0; line-height: 1.6;">
                <li>Performs arithmetic math (+ - * /)</li>
                <li>Performs logical decisions (AND, OR, NOT)</li>
                <li>Sends output results to Accumulator</li>
              </ul>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-top: 4px solid #10B981; padding: 18px 20px; border-radius: 10px;">
              <strong style="color: #6EE7B7; font-size: 15.5px; display: block; margin-bottom: 8px;">⚡ Cache Memory</strong>
              <ul style="font-size: 14.5px; color: var(--text-main); padding-left: 18px; margin: 0; line-height: 1.6;">
                <li>Extremely fast memory inside/near CPU</li>
                <li>Stores frequently used data &amp; instructions</li>
                <li>Faster access than RAM</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        heading: 'The 4 Special-Purpose Registers',
        body: 'Registers are small, extremely fast storage locations built directly into the CPU. The Program Counter (PC) holds the address of the next instruction. The Memory Address Register (MAR) holds any memory address currently being accessed. The Memory Data Register (MDR) holds the actual data or instruction value fetched from or written to RAM. The Accumulator (ACC) holds intermediate arithmetic results.',
        html: `
          <p style="font-size: 15px; color: var(--text-muted); margin-bottom: 16px; line-height: 1.5;">Registers are small, very fast storage locations inside the CPU. You need to distinguish the value held by each named register:</p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-bottom: 20px;">
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-left: 4px solid #F59E0B; padding: 18px 20px; border-radius: 10px;">
              <strong style="color: #FCD34D; font-size: 15px; display: block; margin-bottom: 6px;">📍 Program Counter (PC)</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">
                Holds the memory address of the <strong>NEXT instruction</strong> to be fetched from RAM. Increments by 1 after each fetch.
              </p>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-left: 4px solid #EC4899; padding: 18px 20px; border-radius: 10px;">
              <strong style="color: #F472B6; font-size: 15px; display: block; margin-bottom: 6px;">🔍 Memory Address Register (MAR)</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">
                Holds the memory <strong>address</strong> of the data or instruction currently being read from (or written to) RAM.
              </p>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-left: 4px solid #38BDF8; padding: 18px 20px; border-radius: 10px;">
              <strong style="color: #38BDF8; font-size: 15px; display: block; margin-bottom: 6px;">📦 Memory Data Register (MDR)</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">
                Holds the actual <strong>data or instruction value</strong> fetched from RAM (or waiting to be written back to RAM).
              </p>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-left: 4px solid #10B981; padding: 18px 20px; border-radius: 10px;">
              <strong style="color: #6EE7B7; font-size: 15px; display: block; margin-bottom: 6px;">🎯 Accumulator (ACC)</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">
                Temporarily holds the <strong>intermediate results</strong> of arithmetic calculations performed by the ALU.
              </p>
            </div>
          </div>
          <div style="background: rgba(59, 130, 246, 0.08); border-left: 4px solid #3B82F6; padding: 16px 20px; border-radius: 0 10px 10px 0; margin-top: 16px; font-size: 14.5px; color: var(--text-main); line-height: 1.6;">
            <strong style="color: #60A5FA; font-size: 15px; display: block; margin-bottom: 6px;">💡 15-Second Desk Analogy for Revision:</strong>
            <strong>Registers</strong> = The pen in your active hand (instant access).<br>
            <strong>Cache</strong> = The pencil case open on your desk (very quick access).<br>
            <strong>RAM</strong> = The exercise book in your backpack (fast, but wiped clean when you leave!).<br>
            <strong>Secondary storage (SSD/HDD)</strong> = The school library down the corridor (much more space and keeps its contents without power).
          </div>
        `
      },
      {
        heading: 'Step-by-Step Fetch-Decode-Execute Cycle',
        body: 'In the Fetch phase, the address in the Program Counter is copied to the Memory Address Register, and the instruction is retrieved from RAM into the Memory Data Register before PC increments. In the Decode phase, the Control Unit decodes the instruction. In the Execute phase, the instruction is carried out and results are stored in the Accumulator.',
        html: `
          <div style="background: rgba(45, 156, 145, 0.08); border: 1px solid var(--teal); padding: 18px 20px; border-radius: 10px;">
            <strong style="color: var(--teal); font-size: 15.5px; display: block; margin-bottom: 10px;">🔄 How Registers Work Together in the F-D-E Cycle:</strong>
            <ol style="font-size: 14.5px; color: var(--text-main); padding-left: 20px; margin: 0; line-height: 1.65;">
              <li><strong>Fetch:</strong> The address in <code>PC</code> is copied to <code>MAR</code>. The CPU fetches the instruction from RAM at that address into <code>MDR</code>. <code>PC</code> increments by 1.</li>
              <li><strong>Decode:</strong> The <code>Control Unit (CU)</code> decodes the instruction in <code>MDR</code> to determine the action required.</li>
              <li><strong>Execute:</strong> The instruction is executed (e.g. <code>ALU</code> performs math). Any intermediate calculation result is stored in the <code>Accumulator (ACC)</code>.</li>
            </ol>
          </div>
        `
      }
    ],
    '1.1.2': [
      {
        heading: '3 Factors Affecting CPU Performance',
        body: 'CPU performance is affected by three main hardware factors: clock speed (the number of processor clock cycles per second, measured in hertz), cache size (fast memory storing frequently used data and instructions), and number of cores (processing units that may work on different instructions at the same time). A complete instruction can require more than one clock cycle.',
        html: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-bottom: 24px;">
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-top: 4px solid var(--teal); padding: 18px 20px; border-radius: 10px;">
              <strong style="color: var(--teal); font-size: 15.5px; display: block; margin-bottom: 8px;">⏱️ Clock Speed (GHz)</strong>
              <ul style="font-size: 14.5px; color: var(--text-main); padding-left: 18px; margin: 0; line-height: 1.6;">
                <li>Number of processor clock cycles per second.</li>
                <li>1 GHz = 1 billion clock cycles per second.</li>
                <li>A higher clock speed can allow more instructions to be processed in the same time when other factors are similar.</li>
              </ul>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-top: 4px solid #3B82F6; padding: 18px 20px; border-radius: 10px;">
              <strong style="color: #3B82F6; font-size: 15.5px; display: block; margin-bottom: 8px;">🧠 Number of CPU Cores</strong>
              <ul style="font-size: 14.5px; color: var(--text-main); padding-left: 18px; margin: 0; line-height: 1.6;">
                <li>Each core is an independent processor inside the CPU.</li>
                <li>Dual-core (2) / Quad-core (4) allow parallel task processing.</li>
                <li>Does not automatically multiply speed (software must support it).</li>
              </ul>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-top: 4px solid #10B981; padding: 18px 20px; border-radius: 10px;">
              <strong style="color: #10B981; font-size: 15.5px; display: block; margin-bottom: 8px;">⚡ Cache Memory Size</strong>
              <ul style="font-size: 14.5px; color: var(--text-main); padding-left: 18px; margin: 0; line-height: 1.6;">
                <li>Very fast memory located on or close to the CPU.</li>
                <li>Larger cache stores more frequent data near CPU.</li>
                <li>Reduces slow data transfers from RAM.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        heading: 'CPU Speed Trade-offs & Limitations',
        body: 'A higher clock speed can allow more processing in a given time, but the result also depends on the processor design, cache, cores, software and task. Extra cores do not guarantee a proportional speed increase because some work must run in sequence.'
      }
    ],
    '1.1.3': [
      { heading: 'Purpose and characteristics', body: 'An embedded system is a computer built into a larger product to perform a dedicated function. Its hardware and software are selected for that job, often with limits on cost, power use, memory and processing. Unlike a general-purpose computer, it is not designed for the user to install many unrelated applications.' },
      { heading: 'Inputs, processing and outputs', body: 'Embedded systems commonly read sensors, process their data and control an output. A washing machine controller reads settings and sensors before controlling valves and a motor. A traffic-light controller reads timing or traffic inputs before changing lights. The whole product is not the embedded system; the controller inside it is.' }
    ],
    '1.2.1': [
      {
        heading: 'RAM vs ROM Comparison Matrix',
        body: 'RAM is volatile storage for programs and data currently in use. ROM is non-volatile storage for instructions that must remain available when power is removed, such as firmware used when a computer starts. ROM is not limited to one named firmware product.',
        html: `
          <div style="overflow-x: auto; margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left;">
              <thead>
                <tr style="background: rgba(45, 156, 145, 0.12); color: var(--teal); border-bottom: 2px solid var(--teal);">
                  <th style="padding: 12px 14px; font-size: 14.5px;">Feature</th>
                  <th style="padding: 12px 14px; font-size: 14.5px;">⚡ RAM (Random Access Memory)</th>
                  <th style="padding: 12px 14px; font-size: 14.5px;">🔒 ROM (Read Only Memory)</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 12px 14px; font-weight: 700; color: var(--text-main);">Volatility</td>
                  <td style="padding: 12px 14px; color: #EF4444; font-weight: 600;">Volatile (Contents lost when power off)</td>
                  <td style="padding: 12px 14px; color: #10B981; font-weight: 600;">Non-Volatile (Retains data when power off)</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 12px 14px; font-weight: 700; color: var(--text-main);">Read / Write</td>
                  <td style="padding: 12px 14px; color: #3B82F6;">Read and Writeable</td>
                  <td style="padding: 12px 14px; color: #F59E0B;">Read-Only (Factory written)</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 12px 14px; font-weight: 700; color: var(--text-main);">Primary Purpose</td>
                  <td style="padding: 12px 14px; color: var(--text-main);">Stores active OS, open software &amp; data in use</td>
                  <td style="padding: 12px 14px; color: var(--text-main);">Can store firmware used when the system starts</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 12px 14px; font-weight: 700; color: var(--text-main);">Capacity Size</td>
                  <td style="padding: 12px 14px; color: var(--text-main);">Large (Typically 4GB – 32GB)</td>
                  <td style="padding: 12px 14px; color: var(--text-main);">Small (Typically 4MB – 8MB)</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: 'Virtual Memory (When RAM fills up)',
        body: 'Virtual memory is an area of secondary storage used when RAM is full. The operating system transfers some data from RAM to secondary storage and brings it back when needed. Because secondary storage is slower than RAM, repeated transfers can reduce performance.',
        html: `
          <div style="border-left: 4px solid #F59E0B; background: rgba(245, 158, 11, 0.05); border-radius: 0 10px 10px 0; padding: 18px 20px;">
            <strong style="color: #F59E0B; font-size: 15.5px; display: block; margin-bottom: 8px;">💾 How Virtual Memory Works:</strong>
            <p style="font-size: 14.5px; color: var(--text-main); margin: 0 0 12px 0; line-height: 1.6;">
              When physical RAM is completely filled by open applications, the Operating System allocates a portion of Secondary Storage (HDD/SSD) to act as <strong>Virtual Memory</strong>.
            </p>
            <ul style="font-size: 14.5px; color: var(--text-main); padding-left: 18px; margin: 0; line-height: 1.6;">
              <li><strong>Move out:</strong> Some data is moved from RAM into the virtual-memory area.</li>
              <li><strong>Bring back:</strong> When needed again, that data is moved back into RAM.</li>
              <li><strong>Drawback:</strong> Secondary storage is slower than RAM, so repeated transfers can make the system respond more slowly.</li>
            </ul>
          </div>
        `
      }
    ],
    '1.2.2': [
      {
        heading: 'The 3 Main Storage Technologies (Magnetic, Optical, Solid State)',
        body: 'Secondary storage provides non-volatile storage so programs and data remain available when power is switched off. Magnetic storage uses magnetised surfaces, optical storage uses discs read by laser, and solid-state storage uses electronic memory with no moving parts. Their capacity, speed, portability, durability, reliability and cost vary between devices, so the best choice depends on the scenario.',
        html: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-bottom: 24px;">
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-left: 4px solid var(--teal); border-radius: 10px; padding: 18px 20px;">
              <strong style="color: var(--teal); font-size: 15.5px; display: block; margin-bottom: 8px;">🧲 Magnetic Storage (HDD / Tape)</strong>
              <ul style="font-size: 14.5px; color: var(--text-main); padding-left: 18px; margin: 0; line-height: 1.6;">
                <li><strong>How it works:</strong> Magnetises mechanical spinning platters.</li>
                <li><strong>Pros:</strong> High capacity (1TB–16TB+), cheap cost per GB.</li>
                <li><strong>Cons:</strong> Mechanical moving parts; prone to damage if dropped.</li>
              </ul>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-left: 4px solid #3B82F6; border-radius: 10px; padding: 18px 20px;">
              <strong style="color: #3B82F6; font-size: 15.5px; display: block; margin-bottom: 8px;">💿 Optical Storage (CD / DVD / Blu-ray)</strong>
              <ul style="font-size: 14.5px; color: var(--text-main); padding-left: 18px; margin: 0; line-height: 1.6;">
                <li><strong>How it works:</strong> Lasers read physical pits &amp; lands on reflective disc.</li>
                <li><strong>Possible benefits:</strong> Portable and inexpensive for distributing some media.</li>
                <li><strong>Cons:</strong> Low capacity (700MB–50GB), slow read/write, easily scratched.</li>
              </ul>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-left: 4px solid #10B981; border-radius: 10px; padding: 18px 20px;">
              <strong style="color: #10B981; font-size: 15.5px; display: block; margin-bottom: 8px;">⚡ Solid State Storage (SSD / USB Flash)</strong>
              <ul style="font-size: 14.5px; color: var(--text-main); padding-left: 18px; margin: 0; line-height: 1.6;">
                <li><strong>How it works:</strong> Traps electrons in NAND flash memory chips.</li>
                <li><strong>Pros:</strong> Extremely fast, highly durable (no moving parts), silent, low power.</li>
                <li><strong>Cons:</strong> Expensive cost per GB, finite write cycle lifespan.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        heading: '6 Key Storage Characteristics Comparison Matrix',
        body: 'OCR exam questions require evaluating storage choices using six characteristics: Capacity, Speed, Portability, Durability, Reliability, and Cost. For example, a handheld gaming console requires SSD storage due to portability, fast load speeds, and high durability against drops.',
        html: `
          <div style="overflow-x: auto; margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left;">
              <thead>
                <tr style="background: rgba(45, 156, 145, 0.12); color: var(--teal); border-bottom: 2px solid var(--teal);">
                  <th style="padding: 12px 14px; font-size: 14.5px;">Characteristic</th>
                  <th style="padding: 12px 14px; font-size: 14.5px;">🧲 Magnetic (HDD)</th>
                  <th style="padding: 12px 14px; font-size: 14.5px;">💿 Optical (DVD/BD)</th>
                  <th style="padding: 12px 14px; font-size: 14.5px;">⚡ Solid State (SSD)</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 12px 14px; font-weight: 700; color: var(--text-main);">💾 Capacity</td>
                  <td style="padding: 12px 14px; color: #10B981;">Very High (Up to 16TB)</td>
                  <td style="padding: 12px 14px; color: #EF4444;">Low (700MB–50GB)</td>
                  <td style="padding: 12px 14px; color: #3B82F6;">High (256GB–4TB)</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 12px 14px; font-weight: 700; color: var(--text-main);">⚡ Speed</td>
                  <td style="padding: 12px 14px; color: #F59E0B;">Medium (~100 MB/s)</td>
                  <td style="padding: 12px 14px; color: #EF4444;">Slow (~10 MB/s)</td>
                  <td style="padding: 12px 14px; color: #10B981;">Extremely Fast (500–7000 MB/s)</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 12px 14px; font-weight: 700; color: var(--text-main);">🎒 Portability</td>
                  <td style="padding: 12px 14px; color: #F59E0B;">Heavy / Bulky</td>
                  <td style="padding: 12px 14px; color: #10B981;">Very Portable (Small discs)</td>
                  <td style="padding: 12px 14px; color: #10B981;">Highly Portable (Small / Light)</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 12px 14px; font-weight: 700; color: var(--text-main);">🛡️ Durability</td>
                  <td style="padding: 12px 14px; color: #EF4444;">Low (Moving parts break if dropped)</td>
                  <td style="padding: 12px 14px; color: #F59E0B;">Medium (Scratches easily)</td>
                  <td style="padding: 12px 14px; color: #10B981;">Excellent (No moving parts)</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 12px 14px; font-weight: 700; color: var(--text-main);">🔒 Reliability</td>
                  <td style="padding: 12px 14px; color: #10B981;">High (Long lifespan if static)</td>
                  <td style="padding: 12px 14px; color: #F59E0B;">Medium (Degrades in sunlight)</td>
                  <td style="padding: 12px 14px; color: #10B981;">High (Limited write cycles)</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 12px 14px; font-weight: 700; color: var(--text-main);">💰 Cost per GB</td>
                  <td style="padding: 12px 14px; color: #10B981;">Very Cheap (~£0.02 / GB)</td>
                  <td style="padding: 12px 14px; color: #10B981;">Cheap for small files</td>
                  <td style="padding: 12px 14px; color: #EF4444;">Expensive (~£0.10 / GB)</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      }
    ],
    '1.2.3': [
      { heading: 'Units and binary storage', body: 'A bit is one binary digit and eight bits make one byte. Larger units are kilobyte, megabyte, gigabyte, terabyte and petabyte. Questions may state whether to use decimal multiples such as 1,000 or binary multiples such as 1,024; use the convention given and show each conversion with its unit.' },
      { heading: 'Capacity calculations', body: 'Convert values into compatible units before comparing or combining them. To convert bits to bytes, divide by eight. To find how many files fit, first express the storage capacity and file size in the same unit, then divide the capacity by the size of one file and use a whole number of complete files.' }
    ],
    '1.2.4a': [
      { heading: 'Binary, denary and hexadecimal', body: 'Each binary position has a power-of-two place value. Convert binary to denary by adding the place values containing a one. Hexadecimal groups binary into four-bit nibbles: values ten to fifteen use A to F. Convert through four-bit groups rather than treating a hexadecimal number as a denary number.' },
      { heading: 'Addition and overflow', body: 'Binary addition uses the same place-value principle as denary addition, with carries into the next column. In a fixed-width register, overflow occurs when the result needs more bits than are available. The discarded carry does not mean the full mathematical result was represented correctly.' },
      { heading: 'Binary shifts', body: 'A left shift moves bits towards more significant positions and fills vacated positions with zeroes; for an unsigned value, each retained one-place shift multiplies by two. A right shift divides by two and discards any remainder. Bits shifted beyond the fixed width are lost, so always show the stated register size.' }
    ],
    '1.2.4b': [
      { heading: 'Character sets', body: 'A character set gives each character a numeric code which is stored in binary. With n bits there are 2 to the power n different bit patterns, so using more bits allows more distinct characters. Codes also give characters a logical order, which programs can use when sorting or comparing text.' },
      { heading: 'ASCII and Unicode', body: 'ASCII represents a limited collection of characters, while Unicode supports far more writing systems and symbols. More bits per character can increase the size of text data. Use the bit width or code table supplied in a question; pupils are not expected to memorise character codes.' }
    ],
    '1.2.4c': [
      { heading: 'Representing a bitmap', body: 'A bitmap is a grid of pixels. Each pixel stores a binary colour code, and colour depth is the number of bits available for that code. Resolution is the number of pixels, usually expressed as width by height. Metadata describes the image, including dimensions or creation information, but is separate from its pixel data.' },
      { heading: 'Quality and file size', body: 'More pixels can capture finer spatial detail, while a greater colour depth can represent more colours. Both changes increase the uncompressed pixel-data size. Calculate width multiplied by height multiplied by colour depth for bits, then divide by eight for bytes; add metadata only if the question supplies its size.' }
    ],
    '1.2.4d': [
      { heading: 'Sampling sound', body: 'A microphone produces an analogue signal whose amplitude changes continuously. An analogue-to-digital converter measures the signal at regular intervals and stores each measurement as a binary value. Sample rate is the number of measurements each second; sample depth is the bits used for each measurement.' },
      { heading: 'Quality and file size', body: 'A higher sample rate captures the signal more frequently and a higher sample depth records each measurement with greater precision. Both can improve the digital representation but increase file size. For mono uncompressed audio, multiply sample rate by sample depth by duration to obtain bits, then convert the unit requested.' }
    ],
    '1.2.5': [
      { heading: 'Why files are compressed', body: 'Compression reduces the number of bits needed to store or transmit a file. Smaller files require less storage space and normally transfer more quickly. The appropriate method depends on whether exact reconstruction is required and whether some loss of quality is acceptable.' },
      { heading: 'Lossy and lossless', body: 'Lossy compression permanently removes data judged less important, often producing a smaller file but reducing quality. Lossless compression represents the same information more efficiently and can reconstruct the original exactly. Program code and other exact data require lossless compression; media may use either depending on its purpose.' }
    ],
    '1.3.1': [
      {
        heading: 'Network Types (LAN vs WAN)',
        body: 'A Local Area Network (LAN) covers a small geographical site like a school or office with hardware owned by the organisation. A Wide Area Network (WAN) connects networks across large geographical distances using external telecommunication infrastructure such as satellites or undersea fiber optic cables.',
        html: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-bottom: 24px;">
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-top: 4px solid var(--teal); border-radius: 10px; padding: 18px 20px;">
              <strong style="color: var(--teal); font-size: 15.5px; display: block; margin-bottom: 8px;">🏢 Local Area Network (LAN)</strong>
              <ul style="font-size: 14.5px; color: var(--text-main); padding-left: 18px; margin: 0; line-height: 1.6;">
                <li>Covers a small geographical site (e.g. school, office, home).</li>
                <li>Hardware &amp; cabling owned and managed by one organisation.</li>
              </ul>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-top: 4px solid #3B82F6; border-radius: 10px; padding: 18px 20px;">
              <strong style="color: #3B82F6; font-size: 15.5px; display: block; margin-bottom: 8px;">🌍 Wide Area Network (WAN)</strong>
              <ul style="font-size: 14.5px; color: var(--text-main); padding-left: 18px; margin: 0; line-height: 1.6;">
                <li>Connects networks across large geographical distances (cities/countries).</li>
                <li>Uses third-party telecommunication infrastructure (e.g. satellites, undersea fiber).</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        heading: 'Client-Server vs Peer-to-Peer (P2P) Networks',
        body: 'In a Client-Server network, central servers manage files, security, backups, and user logins for client computers. In a Peer-to-Peer (P2P) network, all devices are equal (peers), sharing files directly with no central server or administration.',
        html: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-bottom: 24px;">
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-left: 4px solid var(--teal); border-radius: 10px; padding: 18px 20px;">
              <strong style="color: var(--teal); font-size: 15.5px; display: block; margin-bottom: 8px;">🖥️ Client-Server Network</strong>
              <ul style="font-size: 14.5px; color: var(--text-main); padding-left: 18px; margin: 0; line-height: 1.6;">
                <li><strong>Centralised control:</strong> Central server manages security, files &amp; user logins.</li>
                <li><strong>Backups &amp; Software:</strong> Managed centrally from server.</li>
                <li><strong>Drawback:</strong> Server failure disables whole network; expensive setup.</li>
              </ul>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-left: 4px solid #F59E0B; border-radius: 10px; padding: 18px 20px;">
              <strong style="color: #F59E0B; font-size: 15.5px; display: block; margin-bottom: 8px;">🤝 Peer-to-Peer (P2P) Network</strong>
              <ul style="font-size: 14.5px; color: var(--text-main); padding-left: 18px; margin: 0; line-height: 1.6;">
                <li><strong>Decentralised:</strong> All devices (peers) are equal and connect directly.</li>
                <li><strong>No Central Server:</strong> Easy to set up and very cheap.</li>
                <li><strong>Drawback:</strong> No central security or backup; files get duplicated.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        heading: 'Essential Network Hardware & Roles',
        body: 'Switches connect devices inside a LAN by reading MAC addresses to direct data packets to specific target ports. Routers connect different networks together using IP addresses to route data across networks. Wireless Access Points (WAPs) convert wired network signals into Wi-Fi radio waves. Network Interface Controllers (NICs) allow devices to physically connect to a network.',
        html: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-bottom: 24px;">
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-left: 4px solid var(--teal); border-radius: 10px; padding: 18px 20px;">
              <strong style="color: var(--teal); font-size: 15px; display: block; margin-bottom: 6px;">🔌 Switch</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">
                Connects devices inside a LAN. Reads MAC addresses to direct data packets to the specific target device.
              </p>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-left: 4px solid #3B82F6; border-radius: 10px; padding: 18px 20px;">
              <strong style="color: #3B82F6; font-size: 15px; display: block; margin-bottom: 6px;">🌐 Router</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">
                Connects different networks together (e.g. LAN to Internet). Routes data packets across networks using IP addresses.
              </p>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-left: 4px solid #10B981; border-radius: 10px; padding: 18px 20px;">
              <strong style="color: #10B981; font-size: 15px; display: block; margin-bottom: 6px;">📶 WAP (Wireless Access Point)</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">
                Converts wired network data into wireless radio signals (Wi-Fi) so mobile devices can connect to the LAN.
              </p>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-left: 4px solid #F59E0B; border-radius: 10px; padding: 18px 20px;">
              <strong style="color: #F59E0B; font-size: 15px; display: block; margin-bottom: 6px;">💳 NIC (Network Interface Controller)</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">
                Hardware component inside a computer that enables physical or wireless connection to a network.
              </p>
            </div>
          </div>
        `
      },
      {
        heading: 'Network Topologies: Star vs Mesh',
        body: 'In a Star topology, all devices connect to a central switch. If one cable fails, only that device is disconnected, but if the central switch fails, the entire network fails. In a Mesh topology, devices connect directly to multiple other nodes, creating high resilience without a single point of failure.',
        html: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;">
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-top: 4px solid #38BDF8; border-radius: 10px; padding: 18px 20px;">
              <strong style="color: #38BDF8; font-size: 15.5px; display: block; margin-bottom: 8px;">⭐ Star Topology</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">
                All devices connect individually to a central switch. If one cable fails, only that device is affected. However, if central switch fails, whole network goes down.
              </p>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-top: 4px solid #8B5CF6; border-radius: 10px; padding: 18px 20px;">
              <strong style="color: #8B5CF6; font-size: 15.5px; display: block; margin-bottom: 8px;">🕸️ Mesh Topology</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">
                Devices connect directly to multiple other nodes. Highly resilient with no single point of failure, but requires more cabling and setup cost.
              </p>
            </div>
          </div>
        `
      }
    ],
    '1.3.2': [
      {
        heading: 'MAC Address vs IP Address Comparison Matrix',
        body: 'A MAC address identifies a network interface on a local network and is commonly written as a 48-bit hexadecimal value. It is normally assigned to the interface, but software can present a different value, so it should not be described as guaranteed permanent. An IP address identifies a network destination; IPv4 and IPv6 use different formats and an address may change between networks.',
        html: `
          <div style="overflow-x: auto; margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left;">
              <thead>
                <tr style="background: rgba(45, 156, 145, 0.12); color: var(--teal); border-bottom: 2px solid var(--teal);">
                  <th style="padding: 12px 14px; font-size: 14.5px;">Feature</th>
                  <th style="padding: 12px 14px; font-size: 14.5px;">💳 MAC Address (Media Access Control)</th>
                  <th style="padding: 12px 14px; font-size: 14.5px;">🌐 IP Address (Internet Protocol)</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 12px 14px; font-weight: 700; color: var(--text-main);">Address Type</td>
                  <td style="padding: 12px 14px; color: var(--teal); font-weight: 600;">Network-interface address used on a local network</td>
                  <td style="padding: 12px 14px; color: #3B82F6; font-weight: 600;">Logical Network Address (Dynamic/Static)</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 12px 14px; font-weight: 700; color: var(--text-main);">Format &amp; Length</td>
                  <td style="padding: 12px 14px; color: var(--text-main);">Hexadecimal (e.g. <code>00:1A:2B:3C:4D:5E</code>) - 48 bits</td>
                  <td style="padding: 12px 14px; color: var(--text-main);">IPv4 (e.g. <code>192.168.1.1</code>) - 32 bits / IPv6 - 128 bits</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 12px 14px; font-weight: 700; color: var(--text-main);">Network Scope</td>
                  <td style="padding: 12px 14px; color: var(--text-main);">Used by <strong>Switches</strong> inside a local LAN</td>
                  <td style="padding: 12px 14px; color: var(--text-main);">Used by <strong>Routers</strong> to direct packets across WANs</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: 'Network Protocols Cheatsheet (OCR Specification)',
        body: 'Protocols are rules for data communication. TCP/IP supports transmission across networks. HTTP and HTTPS transfer web content, with HTTPS adding encrypted communication. FTP transfers files. SMTP sends email. POP retrieves messages to a client, while IMAP keeps messages on the server and synchronises their state across clients.',
        html: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-bottom: 24px;">
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-left: 4px solid var(--teal); border-radius: 10px; padding: 18px 20px;">
              <strong style="color: var(--teal); font-size: 15px; display: block; margin-bottom: 6px;">🌐 HTTP / HTTPS</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">
                Transfers web content between client &amp; server. <strong>HTTPS</strong> adds SSL/TLS encryption for secure data transfer.
              </p>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-left: 4px solid #3B82F6; border-radius: 10px; padding: 18px 20px;">
              <strong style="color: #3B82F6; font-size: 15px; display: block; margin-bottom: 6px;">📁 FTP (File Transfer Protocol)</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">
                Used to upload, download, and transfer files between computers across a network.
              </p>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-left: 4px solid #F59E0B; border-radius: 10px; padding: 18px 20px;">
              <strong style="color: #F59E0B; font-size: 15px; display: block; margin-bottom: 6px;">📧 SMTP (Simple Mail Transfer)</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">
                Used exclusively to <strong>SEND</strong> emails from a client to a server, or between email servers.
              </p>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-left: 4px solid #EC4899; border-radius: 10px; padding: 18px 20px;">
              <strong style="color: #EC4899; font-size: 15px; display: block; margin-bottom: 6px;">📬 POP vs IMAP (Email Retrieval)</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">
                <strong>POP:</strong> Retrieves messages to a client; the client may remove or leave the server copy.<br>
                <strong>IMAP:</strong> Keeps messages on the server and synchronises their state across clients.
              </p>
            </div>
          </div>
        `
      }
    ],
    '1.4.1': [
      {
        heading: '6 Major Cyber Security Threats',
        body: 'Cyber threats exploit technical and human vulnerabilities. Malware includes viruses, worms, and ransomware. Social engineering manipulates people (e.g. phishing emails). Brute force attacks repeatedly guess passwords. Denial of Service (DoS) floods servers with traffic. Data interception uses packet sniffers. SQL Injection inserts malicious code into database forms.',
        html: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-bottom: 24px;">
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-top: 4px solid #EF4444; border-radius: 10px; padding: 18px 20px;">
              <strong style="color: #EF4444; font-size: 15.5px; display: block; margin-bottom: 8px;">👾 Malware</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">
                Hostile software including Viruses (attaches to files), Worms (self-replicating across networks), and Ransomware (encrypts files for money).
              </p>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-top: 4px solid #F59E0B; border-radius: 10px; padding: 18px 20px;">
              <strong style="color: #F59E0B; font-size: 15.5px; display: block; margin-bottom: 8px;">🎣 Social Engineering (Phishing)</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">
                Fake emails/websites posing as legitimate organisations to trick users into handing over login passwords or financial details.
              </p>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-top: 4px solid #8B5CF6; border-radius: 10px; padding: 18px 20px;">
              <strong style="color: #8B5CF6; font-size: 15.5px; display: block; margin-bottom: 8px;">💉 SQL Injection</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">
                Attacker inputs malicious SQL code into unvalidated web input fields to manipulate or steal database records.
              </p>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-top: 4px solid #3B82F6; border-radius: 10px; padding: 18px 20px;">
              <strong style="color: #3B82F6; font-size: 15.5px; display: block; margin-bottom: 8px;">🚫 Denial of Service (DoS / DDoS)</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">
                Flooding a web server with fake requests from botnets to overwhelm CPU/bandwidth and crash the service for real users.
              </p>
            </div>
          </div>
        `
      },
      {
        heading: 'Social Engineering & Human Vulnerabilities',
        body: 'Human error and social manipulation remain the largest security threats to computer networks. Phishing tricks users into disclosing credentials via deceptive emails, shoulder surfing steals passwords by direct observation, and weak password policies enable brute-force automated dictionary attacks.'
      }
    ],
    '1.4.2': [
      {
        heading: 'Technical Security Measures & Defences',
        body: 'Technical defenses protect hardware and data. Firewalls inspect network traffic against security rules. Anti-malware detects and quatantines viruses. Encryption scrambles data into ciphertext using a key. Passwords and Access Levels restrict data based on user roles. Penetration Testing is authorized simulated hacking to find weaknesses before criminals do.',
        html: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-bottom: 24px;">
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-left: 4px solid var(--teal); border-radius: 10px; padding: 18px 20px;">
              <strong style="color: var(--teal); font-size: 15px; display: block; margin-bottom: 6px;">🛡️ Firewall</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">
                Monitors incoming &amp; outgoing network traffic and blocks unauthorized packets based on security rules.
              </p>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-left: 4px solid #10B981; border-radius: 10px; padding: 18px 20px;">
              <strong style="color: #10B981; font-size: 15px; display: block; margin-bottom: 6px;">🔐 Encryption</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">
                Scrambles plain text into unreadable ciphertext using an encryption key, rendering stolen data useless.
              </p>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-left: 4px solid #3B82F6; border-radius: 10px; padding: 18px 20px;">
              <strong style="color: #3B82F6; font-size: 15px; display: block; margin-bottom: 6px;">🎯 Penetration Testing</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">
                Authorised ethical hacking tests that simulate real cyberattacks to discover system vulnerabilities.
              </p>
            </div>
          </div>
        `
      },
      {
        heading: 'Access Control, Passwords & Penetration Testing',
        body: 'User access levels ensure employees can only view or modify files necessary for their job role, enforcing the principle of least privilege. Strong password requirements prevent automated guessing. Penetration testing systematically scans networks to uncover and patch security vulnerabilities before cybercriminals exploit them.'
      }
    ],
    '1.5.1': [
      {
        heading: 'The 5 Core Functions of an Operating System (OS)',
        body: 'An Operating System manages computer hardware and software. Its 5 core functions are: 1) User Interface (GUI/CLI), 2) Memory Management (RAM allocation & Virtual Memory), 3) Multitasking (CPU scheduling), 4) Peripheral & Driver Management, 5) User & File Management (access rights, files/folders).',
        html: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-bottom: 24px;">
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-top: 4px solid var(--teal); border-radius: 10px; padding: 18px 20px;">
              <strong style="color: var(--teal); font-size: 15px; display: block; margin-bottom: 6px;">🖥️ User Interface (UI)</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">Provides GUI (windows, icons, menus) or CLI (command line) for user interaction.</p>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-top: 4px solid #3B82F6; border-radius: 10px; padding: 18px 20px;">
              <strong style="color: #3B82F6; font-size: 15px; display: block; margin-bottom: 6px;">💾 Memory Management</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">Allocates memory to programs that are currently running and keeps track of its use.</p>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-top: 4px solid #F59E0B; border-radius: 10px; padding: 18px 20px;">
              <strong style="color: #F59E0B; font-size: 15px; display: block; margin-bottom: 6px;">⏱️ Multitasking &amp; CPU Scheduling</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">Schedules CPU time slices across multiple running programs simultaneously.</p>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-top: 4px solid #10B981; border-radius: 10px; padding: 18px 20px;">
              <strong style="color: #10B981; font-size: 15px; display: block; margin-bottom: 6px;">🔌 Peripheral Drivers &amp; Files</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">Uses device drivers to communicate with hardware, and manages user access rights &amp; file structures.</p>
            </div>
          </div>
        `
      },
      {
        heading: 'Peripheral Drivers & File System Management',
        body: 'Device drivers translate general operating system commands into hardware-specific instructions for peripherals like printers and graphics cards. The OS file manager organizes storage into directory hierarchies, tracks file locations, and enforces access control permissions.'
      }
    ],
    '1.5.2': [
      {
        heading: 'Utility software: encryption, defragmentation and compression',
        body: 'Utility software performs additional maintenance or housekeeping tasks. For OCR, the named examples are encryption, defragmentation and compression. Defragmentation reorganises file blocks on magnetic disks, compression reduces file size and encryption protects readable data with a key.',
        html: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-bottom: 24px;">
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-left: 4px solid #F59E0B; border-radius: 10px; padding: 18px 20px;">
              <strong style="color: #F59E0B; font-size: 15px; display: block; margin-bottom: 6px;">🧩 Defragmentation (HDD Only!)</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">
                Reorganises fragmented file blocks on magnetic hard drives so related data is stored contiguously. <em>Exam Note: SSDs do NOT require defragmentation because they have no moving read head!</em>
              </p>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-left: 4px solid var(--teal); border-radius: 10px; padding: 18px 20px;">
              <strong style="color: var(--teal); font-size: 15px; display: block; margin-bottom: 6px;">📦 File Compression Utility</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">
                Reduces file size so files consume less storage space and download faster across network connections.
              </p>
            </div>
          </div>
        `
      },
      {
        heading: 'Defragmentation & Utility Housekeeping',
        body: 'Defragmentation reorganises scattered file blocks on magnetic hard drives so related data is stored contiguously, reducing read-head movement. Defragmentation is unnecessary for SSDs because solid-state memory has no moving mechanical parts. File compression utilities reduce file size for storage and transmission.'
      }
    ],
    '1.6.1': [
      { heading: 'People and society', body: 'Technology can affect privacy, employment, access to services, working patterns, culture and relationships. A balanced response identifies affected stakeholders and develops both benefits and harms in the given context. An unsupported list of generic issues is weaker than explaining how a specific design or use produces an effect.' },
      { heading: 'Environmental effects', body: 'Manufacturing devices consumes finite resources and energy, while operation and data centres consume electricity. Replacing equipment creates electronic waste, which can contain valuable and hazardous materials. Longer product life, repair, reuse, responsible recycling and lower-energy operation can reduce some effects but may involve trade-offs.' }
    ],
    '1.6.2': [
      {
        heading: 'UK Computing Legislation 4-Card Breakdown',
        body: 'Three named UK laws cover different digital responsibilities: 1) the Data Protection Act 2018 governs the lawful handling of personal data, 2) the Computer Misuse Act 1990 covers unauthorised access and unauthorised acts involving computer systems, and 3) the Copyright, Designs and Patents Act 1988 protects creative work, including software, from unauthorised copying and distribution.',
        html: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-bottom: 24px;">
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-top: 4px solid var(--teal); border-radius: 10px; padding: 18px 20px;">
              <strong style="color: var(--teal); font-size: 15px; display: block; margin-bottom: 6px;">📜 Data Protection Act 2018 (DPA / GDPR)</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">Governs fair, lawful &amp; secure handling of personal data by data controllers.</p>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-top: 4px solid #EF4444; border-radius: 10px; padding: 18px 20px;">
              <strong style="color: #EF4444; font-size: 15px; display: block; margin-bottom: 6px;">⚖️ Computer Misuse Act 1990 (CMA)</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">Covers access without permission, access intended to support another offence, and unauthorised acts intended to damage or disrupt a computer system.</p>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-top: 4px solid #3B82F6; border-radius: 10px; padding: 18px 20px;">
              <strong style="color: #3B82F6; font-size: 15px; display: block; margin-bottom: 6px;">©️ Copyright, Designs &amp; Patents Act 1988</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">Protects software code, media, and creative works from illegal copying and piracy.</p>
            </div>
          </div>
        `
      },
      {
        heading: 'Software Licences (Open Source vs Proprietary)',
        body: 'Proprietary software is supplied under licence terms set by its owner and its source code is normally not provided to users. Open-source software makes source code available under a licence that states how it may be inspected, changed and shared. Cost, support, modification and redistribution rights depend on the particular licence, so compare the stated scenario rather than assuming one universal rule.'
      }
    ],
    '2.1.1': [
      { heading: 'Decomposition', body: 'Break the problem into parts that can be understood, designed and tested separately. The parts must still fit together: for a library system, searching, borrowing and returning books exchange shared data rather than behaving as unrelated mini-programs.' },
      { heading: 'Abstraction', body: 'Keep the details that affect the solution and leave out details that do not. A route-planning model needs road connections and travel costs, but it may not need the colour of each building. Abstraction simplifies the model without ignoring information required for a correct result.' },
      { heading: 'Algorithmic thinking', body: 'Turn the chosen inputs, decisions, repetitions and outputs into an unambiguous sequence. Check unusual and boundary cases as the algorithm is refined; an ordered plan that works only for the first example is not yet a complete solution.' }
    ],
    '2.1.2': [
      { heading: 'Representing a solution', body: 'Identify inputs, processing and outputs before choosing a representation. Structure diagrams show decomposition. Flowcharts show sequence, decisions and repetition visually. Pseudocode or OCR Exam Reference Language expresses precise executable-style steps without requiring a complete program in a particular high-level language.' },
      { heading: 'Tracing and refining', body: 'A trace table records selected variables, conditions and outputs after each relevant instruction or loop pass. Use it to find the first point where actual behaviour differs from the intended result. Correct that cause, then repeat the trace with normal and unusual data rather than patching only the final value.' }
    ],
    '2.1.3': [
      { heading: 'Search algorithms', body: 'Linear search checks items in order and works on unsorted data. Binary search repeatedly checks the middle of a sorted list and discards the half that cannot contain the target. Binary search cannot be applied correctly to an unsorted list; this prerequisite matters as much as remembering its steps.' },
      { heading: 'Sort algorithms', body: 'Bubble sort repeatedly compares neighbouring items and swaps those in the wrong order. Insertion sort inserts an item into the correct place in an ordered part. Merge sort splits data into smaller lists and merges ordered lists. Pupils must trace and recognise the stated algorithms, not only name them.' }
    ],
    '2.2.1': [
      { heading: 'Variables, input and operators', body: 'Variables store values that may change; constants retain a declared value. Assignment places a value into storage. Programs receive input and produce output, while arithmetic, comparison and Boolean operators build calculations and conditions. DIV gives a whole-number quotient and MOD gives the remainder.' },
      { heading: 'Control structures', body: 'Sequence runs instructions in order. Selection chooses a path using a condition. Count-controlled iteration repeats a known number of times, while condition-controlled iteration repeats according to a Boolean test. Nested structures must be traced carefully because an inner structure can run several times for each outer iteration.' }
    ],
    '2.2.2': [
      { heading: 'Choosing data types', body: 'Integer stores whole numbers, real stores numbers with a fractional part, Boolean stores true or false, character stores one symbol and string stores a sequence of characters. Choose a type from the permitted values and operations, not from how a value happens to look on one occasion.' },
      { heading: 'Casting', body: 'Input is often received as text even when the user typed digits. Casting converts a value to another data type so suitable operations can be performed. A cast can fail when the value cannot be represented by the requested type, so validation and error handling may be needed before conversion.' }
    ],
    '2.2.3': [
      { heading: 'Working with structured data', body: 'Strings can be joined, measured and sliced. One-dimensional arrays use one index; two-dimensional arrays use a row and column index. Records group fields of different types about one item. A design should choose the structure that matches how the program must locate and update its data.' },
      { heading: 'Files and databases', body: 'Programs open files before reading or writing and close them afterwards. A SQL SELECT statement chooses fields, FROM names the table and WHERE filters records. File and database work should be traced with realistic data so that missing records, end-of-file behaviour and unsuitable types are considered.' },
      { heading: 'Subprograms and scope', body: 'Functions return a value, whereas procedures perform a named task and do not have to return one. Parameters pass data into a subprogram. Local variables exist within their subprogram; global variables are available more widely and should be used carefully because several parts of a program may change them.' },
      { heading: 'Random numbers', body: 'A random-number facility produces a value within stated bounds for uses such as simulations, games or selecting test data. Check whether both endpoints can be generated in the chosen language. The result should be stored or used like any other value, and tests should not assume that one particular random result will occur.' },
      { heading: 'File loop in OCR notation', body: 'A file-processing algorithm opens the file, repeats while the file has more data, reads one item inside the loop and closes the file afterwards. If numeric processing is required, convert each text line before arithmetic. Keep the supplied end-of-file and close syntax visible when completing an OCR Exam Reference Language task.' }
    ],
    '2.2.PY': [
      { heading: 'Read before writing', body: 'Trace short Python programs one statement at a time. Record variable values, decisions, loop iterations and output. This separates understanding the algorithm from guessing what a whole program might do.' },
      { heading: 'Build in small steps', body: 'Start from defined inputs and outputs, then add one construct at a time. Use clear names and small functions where they make the program easier to test. Syntax that runs is not enough: the produced result must also match the requirement.' },
      { heading: 'Test and refine', body: 'Run normal, boundary, invalid and erroneous test cases where relevant. Record the expected result before running the program, compare it with the actual result, locate the cause of any difference and repeat the test after making a correction.' },
      { heading: 'Function pattern', body: 'A Python function begins with def, names its parameters in brackets and uses an indented body. Initialise an accumulator before a loop, update it only when the condition is met, and return the result after the loop. Test a parameterised function with typical data and an edge case such as an empty list or no matches.' }
    ],
    '2.2.ERL': [
      { heading: 'Read the supplied notation', body: 'OCR Exam Reference Language is the notation used for algorithms in OCR assessments. Follow its syntax consistently: assignment uses a single equals sign, equality uses two, blocks use terminators such as endif, and count-controlled loops include their stated end value. Do not silently replace it with Python syntax.' },
      { heading: 'Trace, complete and write', body: 'Trace existing algorithms to understand variables and control flow. When completing code, preserve the surrounding notation and meet the stated requirement. When writing, plan inputs, processing, outputs and edge cases, then check loop bounds, array indexes, return values and block endings.' },
      { heading: 'Function and file patterns', body: 'A function names its parameters, performs its processing, returns a value and ends with endfunction. Count-controlled loop bounds are inclusive in OCR notation, so an array of size n normally uses indexes zero to n minus one. File tasks should follow the open, end-of-file check, read and close forms supplied in the question or reference material.' }
    ],
    '2.3.1': [
      { heading: 'Defensive design', body: 'A program should anticipate accidental and deliberate misuse. Authentication checks identity, while validation checks whether supplied data follows rules such as type, range, presence or length. Validation does not prove that data is true, and authentication does not prove that every value entered by an authorised user is suitable.' },
      { heading: 'Maintainability', body: 'Clear names, indentation, comments that explain purpose, and well-defined subprograms make code easier to understand and change. Repeated code can often be placed in a reusable subprogram. Maintainability is about reducing future misunderstanding and error, not adding comments that merely repeat every instruction.' }
    ],
    '2.3.2': [
      { heading: 'Testing during development', body: 'Iterative testing checks components and changes while a program is being developed, making faults easier to locate near the work that introduced them. Terminal testing checks the completed product. A test plan records test data, expected results, actual results and whether each test passed.' },
      { heading: 'Test data and errors', body: 'Normal data is valid and typical; boundary data is at an accepted limit; invalid data is outside the permitted rules; erroneous data has the wrong type or cannot be processed as expected. Syntax errors break language rules, while logic errors allow the program to run but produce an incorrect result.' }
    ],
    '2.4.1': [
      {
        heading: '1. Standard Logic Gate Symbols & Rules',
        body: 'AND outputs 1 only when both inputs are 1. OR outputs 1 when at least one input is 1. NOT inverts its single input (0 -> 1, 1 -> 0).',
        html: `
          <p style="margin-bottom: 16px;">Logic gates are the fundamental building blocks of digital circuits. Study the standard symbols and rules for AND, OR, and NOT gates below:</p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 24px;">
            <!-- AND Gate Card -->
            <div style="padding: 16px; border: 1px solid var(--border-color); border-top: 4px solid var(--teal); border-radius: 10px; background: var(--bg-card); text-align: center;">
              <h4 style="margin: 0 0 8px 0; font-size: 16px; color: var(--text-main);">AND Gate</h4>
              <svg width="140" height="70" viewBox="0 0 140 70" style="margin: 0 auto; display: block;" aria-label="AND logic gate diagram">
                <line x1="10" y1="20" x2="40" y2="20" stroke="#2D9C91" stroke-width="3"/>
                <text x="5" y="24" font-size="12" font-weight="700" fill="#07111F">A</text>
                <line x1="10" y1="50" x2="40" y2="50" stroke="#2D9C91" stroke-width="3"/>
                <text x="5" y="54" font-size="12" font-weight="700" fill="#07111F">B</text>
                <path d="M 40 10 L 65 10 A 25 25 0 0 1 65 60 L 40 60 Z" fill="#FAF8F2" stroke="#07111F" stroke-width="3"/>
                <text x="48" y="39" font-size="11" font-weight="800" fill="#2D9C91">AND</text>
                <line x1="90" y1="35" x2="125" y2="35" stroke="#2D9C91" stroke-width="3"/>
                <text x="128" y="39" font-size="12" font-weight="700" fill="#07111F">Q</text>
              </svg>
              <div style="font-size: 12px; color: var(--text-muted); margin-top: 8px;"><strong>Rule:</strong> Output = 1 ONLY if BOTH A = 1 AND B = 1.</div>
            </div>

            <!-- OR Gate Card -->
            <div style="padding: 16px; border: 1px solid var(--border-color); border-top: 4px solid var(--teal); border-radius: 10px; background: var(--bg-card); text-align: center;">
              <h4 style="margin: 0 0 8px 0; font-size: 16px; color: var(--text-main);">OR Gate</h4>
              <svg width="140" height="70" viewBox="0 0 140 70" style="margin: 0 auto; display: block;" aria-label="OR logic gate diagram">
                <line x1="10" y1="20" x2="42" y2="20" stroke="#2D9C91" stroke-width="3"/>
                <text x="5" y="24" font-size="12" font-weight="700" fill="#07111F">A</text>
                <line x1="10" y1="50" x2="42" y2="50" stroke="#2D9C91" stroke-width="3"/>
                <text x="5" y="54" font-size="12" font-weight="700" fill="#07111F">B</text>
                <path d="M 40 10 Q 55 35 40 60 Q 75 60 90 35 Q 75 10 40 10 Z" fill="#FAF8F2" stroke="#07111F" stroke-width="3"/>
                <text x="54" y="39" font-size="11" font-weight="800" fill="#2D9C91">OR</text>
                <line x1="90" y1="35" x2="125" y2="35" stroke="#2D9C91" stroke-width="3"/>
                <text x="128" y="39" font-size="12" font-weight="700" fill="#07111F">Q</text>
              </svg>
              <div style="font-size: 12px; color: var(--text-muted); margin-top: 8px;"><strong>Rule:</strong> Output = 1 if AT LEAST ONE input is 1.</div>
            </div>

            <!-- NOT Gate Card -->
            <div style="padding: 16px; border: 1px solid var(--border-color); border-top: 4px solid var(--teal); border-radius: 10px; background: var(--bg-card); text-align: center;">
              <h4 style="margin: 0 0 8px 0; font-size: 16px; color: var(--text-main);">NOT Gate (Inverter)</h4>
              <svg width="140" height="70" viewBox="0 0 140 70" style="margin: 0 auto; display: block;" aria-label="NOT logic gate diagram">
                <line x1="10" y1="35" x2="40" y2="35" stroke="#2D9C91" stroke-width="3"/>
                <text x="5" y="39" font-size="12" font-weight="700" fill="#07111F">A</text>
                <path d="M 40 15 L 80 35 L 40 55 Z" fill="#FAF8F2" stroke="#07111F" stroke-width="3"/>
                <circle cx="85" cy="35" r="5" fill="#FAF8F2" stroke="#07111F" stroke-width="2"/>
                <text x="45" y="39" font-size="10" font-weight="800" fill="#2D9C91">NOT</text>
                <line x1="90" y1="35" x2="125" y2="35" stroke="#2D9C91" stroke-width="3"/>
                <text x="128" y="39" font-size="12" font-weight="700" fill="#07111F">Q</text>
              </svg>
              <div style="font-size: 12px; color: var(--text-muted); margin-top: 8px;"><strong>Rule:</strong> Inverts input (0 -> 1, 1 -> 0).</div>
            </div>
          </div>
        `
      },
      {
        heading: '2. Standard Gate Truth Tables',
        body: 'A truth table lists all possible binary input combinations (0 and 1) and the resulting output for each gate.',
        html: `
          <p style="margin-bottom: 12px;">Truth tables document the complete input-to-output mapping for any logic circuit:</p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px;">
            <!-- AND Truth Table -->
            <div>
              <h5 style="margin: 0 0 6px 0; font-size: 14px; font-weight: 700; color: var(--teal);">AND Truth Table</h5>
              <table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: center; border: 1px solid var(--border-color);">
                <thead>
                  <tr style="background: var(--teal); color: #fff; font-weight: 700;">
                    <th style="padding: 6px; border: 1px solid var(--border-color);">Input A</th>
                    <th style="padding: 6px; border: 1px solid var(--border-color);">Input B</th>
                    <th style="padding: 6px; border: 1px solid var(--border-color);">A AND B</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style="padding: 4px; border: 1px solid var(--border-color);">0</td><td style="padding: 4px; border: 1px solid var(--border-color);">0</td><td style="padding: 4px; border: 1px solid var(--border-color); font-weight: 700;">0</td></tr>
                  <tr><td style="padding: 4px; border: 1px solid var(--border-color);">0</td><td style="padding: 4px; border: 1px solid var(--border-color);">1</td><td style="padding: 4px; border: 1px solid var(--border-color); font-weight: 700;">0</td></tr>
                  <tr><td style="padding: 4px; border: 1px solid var(--border-color);">1</td><td style="padding: 4px; border: 1px solid var(--border-color);">0</td><td style="padding: 4px; border: 1px solid var(--border-color); font-weight: 700;">0</td></tr>
                  <tr style="background: rgba(45, 156, 145, 0.1);"><td style="padding: 4px; border: 1px solid var(--border-color);">1</td><td style="padding: 4px; border: 1px solid var(--border-color);">1</td><td style="padding: 4px; border: 1px solid var(--border-color); font-weight: 800; color: var(--teal);">1</td></tr>
                </tbody>
              </table>
            </div>

            <!-- OR Truth Table -->
            <div>
              <h5 style="margin: 0 0 6px 0; font-size: 14px; font-weight: 700; color: var(--teal);">OR Truth Table</h5>
              <table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: center; border: 1px solid var(--border-color);">
                <thead>
                  <tr style="background: var(--teal); color: #fff; font-weight: 700;">
                    <th style="padding: 6px; border: 1px solid var(--border-color);">Input A</th>
                    <th style="padding: 6px; border: 1px solid var(--border-color);">Input B</th>
                    <th style="padding: 6px; border: 1px solid var(--border-color);">A OR B</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style="padding: 4px; border: 1px solid var(--border-color);">0</td><td style="padding: 4px; border: 1px solid var(--border-color);">0</td><td style="padding: 4px; border: 1px solid var(--border-color); font-weight: 700;">0</td></tr>
                  <tr style="background: rgba(45, 156, 145, 0.05);"><td style="padding: 4px; border: 1px solid var(--border-color);">0</td><td style="padding: 4px; border: 1px solid var(--border-color);">1</td><td style="padding: 4px; border: 1px solid var(--border-color); font-weight: 800; color: var(--teal);">1</td></tr>
                  <tr style="background: rgba(45, 156, 145, 0.05);"><td style="padding: 4px; border: 1px solid var(--border-color);">1</td><td style="padding: 4px; border: 1px solid var(--border-color);">0</td><td style="padding: 4px; border: 1px solid var(--border-color); font-weight: 800; color: var(--teal);">1</td></tr>
                  <tr style="background: rgba(45, 156, 145, 0.1);"><td style="padding: 4px; border: 1px solid var(--border-color);">1</td><td style="padding: 4px; border: 1px solid var(--border-color);">1</td><td style="padding: 4px; border: 1px solid var(--border-color); font-weight: 800; color: var(--teal);">1</td></tr>
                </tbody>
              </table>
            </div>

            <!-- NOT Truth Table -->
            <div>
              <h5 style="margin: 0 0 6px 0; font-size: 14px; font-weight: 700; color: var(--teal);">NOT Truth Table</h5>
              <table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: center; border: 1px solid var(--border-color);">
                <thead>
                  <tr style="background: var(--teal); color: #fff; font-weight: 700;">
                    <th style="padding: 6px; border: 1px solid var(--border-color);">Input A</th>
                    <th style="padding: 6px; border: 1px solid var(--border-color);">NOT A</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="background: rgba(45, 156, 145, 0.05);"><td style="padding: 4px; border: 1px solid var(--border-color);">0</td><td style="padding: 4px; border: 1px solid var(--border-color); font-weight: 800; color: var(--teal);">1</td></tr>
                  <tr><td style="padding: 4px; border: 1px solid var(--border-color);">1</td><td style="padding: 4px; border: 1px solid var(--border-color); font-weight: 700;">0</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        `
      },
      {
        heading: '3. Evaluating Combined Logic Circuits',
        body: 'For combined circuits (e.g. (A AND B) OR NOT C), evaluate gate-by-gate, recording intermediate outputs first.',
        html: `
          <p style="margin-bottom: 12px;">In OCR GCSE exams, you will evaluate multi-gate circuits step-by-step. Work through one gate at a time from left to right:</p>
          
          <div style="padding: 16px; border: 1px solid var(--border-color); border-radius: 10px; background: rgba(0,0,0,0.01); margin-bottom: 16px;">
            <h5 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: var(--teal);">Combined Circuit Diagram: (A AND B) OR NOT C</h5>
            <svg width="340" height="120" viewBox="0 0 340 120" style="margin: 0 auto; display: block; max-width: 100%;" aria-label="Combined logic circuit diagram">
              <line x1="10" y1="20" x2="50" y2="20" stroke="#2D9C91" stroke-width="2"/>
              <text x="2" y="24" font-size="12" font-weight="700" fill="#07111F">A</text>
              <line x1="10" y1="50" x2="50" y2="50" stroke="#2D9C91" stroke-width="2"/>
              <text x="2" y="54" font-size="12" font-weight="700" fill="#07111F">B</text>
              <path d="M 50 10 L 75 10 A 25 25 0 0 1 75 60 L 50 60 Z" fill="#FAF8F2" stroke="#07111F" stroke-width="2"/>
              <text x="56" y="39" font-size="11" font-weight="800" fill="#2D9C91">AND</text>
              <line x1="100" y1="35" x2="180" y2="35" stroke="#2D9C91" stroke-width="2"/>
              <text x="110" y="28" font-size="11" font-weight="700" fill="#2D9C91">X = A AND B</text>

              <line x1="10" y1="95" x2="50" y2="95" stroke="#2D9C91" stroke-width="2"/>
              <text x="2" y="99" font-size="12" font-weight="700" fill="#07111F">C</text>
              <path d="M 50 80 L 85 95 L 50 110 Z" fill="#FAF8F2" stroke="#07111F" stroke-width="2"/>
              <circle cx="90" cy="95" r="4" fill="#FAF8F2" stroke="#07111F" stroke-width="2"/>
              <text x="54" y="99" font-size="10" font-weight="800" fill="#2D9C91">NOT</text>
              <line x1="94" y1="95" x2="180" y2="75" stroke="#2D9C91" stroke-width="2"/>
              <text x="110" y="105" font-size="11" font-weight="700" fill="#2D9C91">Y = NOT C</text>

              <path d="M 180 25 Q 195 55 180 85 Q 220 85 240 55 Q 220 25 180 25 Z" fill="#FAF8F2" stroke="#07111F" stroke-width="2"/>
              <text x="195" y="59" font-size="12" font-weight="800" fill="#2D9C91">OR</text>

              <line x1="240" y1="55" x2="310" y2="55" stroke="#2D9C91" stroke-width="3"/>
              <text x="315" y="59" font-size="13" font-weight="800" fill="#07111F">Q</text>
            </svg>
          </div>

          <h5 style="margin: 16px 0 8px 0; font-size: 14px; font-weight: 700; color: var(--teal);">Complete Combined Truth Table</h5>
          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: center; border: 1px solid var(--border-color);">
              <thead>
                <tr style="background: var(--teal); color: #fff; font-weight: 700;">
                  <th style="padding: 6px; border: 1px solid var(--border-color);">A</th>
                  <th style="padding: 6px; border: 1px solid var(--border-color);">B</th>
                  <th style="padding: 6px; border: 1px solid var(--border-color);">C</th>
                  <th style="padding: 6px; border: 1px solid var(--border-color); background: rgba(0,0,0,0.15);">X (A AND B)</th>
                  <th style="padding: 6px; border: 1px solid var(--border-color); background: rgba(0,0,0,0.15);">Y (NOT C)</th>
                  <th style="padding: 6px; border: 1px solid var(--border-color);">Output Q (X OR Y)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style="padding: 4px; border: 1px solid var(--border-color);">0</td><td style="padding: 4px; border: 1px solid var(--border-color);">0</td><td style="padding: 4px; border: 1px solid var(--border-color);">0</td><td style="padding: 4px; border: 1px solid var(--border-color);">0</td><td style="padding: 4px; border: 1px solid var(--border-color);">1</td><td style="padding: 4px; border: 1px solid var(--border-color); font-weight: 800; color: var(--teal);">1</td></tr>
                <tr><td style="padding: 4px; border: 1px solid var(--border-color);">0</td><td style="padding: 4px; border: 1px solid var(--border-color);">0</td><td style="padding: 4px; border: 1px solid var(--border-color);">1</td><td style="padding: 4px; border: 1px solid var(--border-color);">0</td><td style="padding: 4px; border: 1px solid var(--border-color);">0</td><td style="padding: 4px; border: 1px solid var(--border-color); font-weight: 700;">0</td></tr>
                <tr><td style="padding: 4px; border: 1px solid var(--border-color);">0</td><td style="padding: 4px; border: 1px solid var(--border-color);">1</td><td style="padding: 4px; border: 1px solid var(--border-color);">0</td><td style="padding: 4px; border: 1px solid var(--border-color);">0</td><td style="padding: 4px; border: 1px solid var(--border-color);">1</td><td style="padding: 4px; border: 1px solid var(--border-color); font-weight: 800; color: var(--teal);">1</td></tr>
                <tr><td style="padding: 4px; border: 1px solid var(--border-color);">0</td><td style="padding: 4px; border: 1px solid var(--border-color);">1</td><td style="padding: 4px; border: 1px solid var(--border-color);">1</td><td style="padding: 4px; border: 1px solid var(--border-color);">0</td><td style="padding: 4px; border: 1px solid var(--border-color);">0</td><td style="padding: 4px; border: 1px solid var(--border-color); font-weight: 700;">0</td></tr>
                <tr><td style="padding: 4px; border: 1px solid var(--border-color);">1</td><td style="padding: 4px; border: 1px solid var(--border-color);">0</td><td style="padding: 4px; border: 1px solid var(--border-color);">0</td><td style="padding: 4px; border: 1px solid var(--border-color);">0</td><td style="padding: 4px; border: 1px solid var(--border-color);">1</td><td style="padding: 4px; border: 1px solid var(--border-color); font-weight: 800; color: var(--teal);">1</td></tr>
                <tr><td style="padding: 4px; border: 1px solid var(--border-color);">1</td><td style="padding: 4px; border: 1px solid var(--border-color);">0</td><td style="padding: 4px; border: 1px solid var(--border-color);">1</td><td style="padding: 4px; border: 1px solid var(--border-color);">0</td><td style="padding: 4px; border: 1px solid var(--border-color);">0</td><td style="padding: 4px; border: 1px solid var(--border-color); font-weight: 700;">0</td></tr>
                <tr style="background: rgba(45, 156, 145, 0.08);"><td style="padding: 4px; border: 1px solid var(--border-color);">1</td><td style="padding: 4px; border: 1px solid var(--border-color);">1</td><td style="padding: 4px; border: 1px solid var(--border-color);">0</td><td style="padding: 4px; border: 1px solid var(--border-color); font-weight: 700;">1</td><td style="padding: 4px; border: 1px solid var(--border-color); font-weight: 700;">1</td><td style="padding: 4px; border: 1px solid var(--border-color); font-weight: 800; color: var(--teal);">1</td></tr>
                <tr style="background: rgba(45, 156, 145, 0.08);"><td style="padding: 4px; border: 1px solid var(--border-color);">1</td><td style="padding: 4px; border: 1px solid var(--border-color);">1</td><td style="padding: 4px; border: 1px solid var(--border-color);">1</td><td style="padding: 4px; border: 1px solid var(--border-color); font-weight: 700;">1</td><td style="padding: 4px; border: 1px solid var(--border-color);">0</td><td style="padding: 4px; border: 1px solid var(--border-color); font-weight: 800; color: var(--teal);">1</td></tr>
              </tbody>
            </table>
          </div>
        `
      }
    ],
    '2.5.1': [
      {
        heading: 'High-Level vs Low-Level Languages',
        body: 'High-level languages (e.g. Python) use English-like syntax, are easy to read and write, and are portable across different CPU architectures. Low-level languages (Assembly and Machine Code) interact directly with CPU hardware registers and memory, offering maximum execution speed and direct memory control.',
        html: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-bottom: 24px;">
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-top: 4px solid var(--teal); border-radius: 10px; padding: 18px 20px;">
              <strong style="color: var(--teal); font-size: 15.5px; display: block; margin-bottom: 8px;">🐍 High-Level Languages (Python, Java, C#)</strong>
              <ul style="font-size: 14.5px; color: var(--text-main); padding-left: 18px; margin: 0; line-height: 1.6;">
                <li>English-like statements; easy to read, write, &amp; debug.</li>
                <li>Portable across different types of computer CPU hardware.</li>
                <li>Must be translated into machine code before CPU execution.</li>
              </ul>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-top: 4px solid #F59E0B; border-radius: 10px; padding: 18px 20px;">
              <strong style="color: #F59E0B; font-size: 15.5px; display: block; margin-bottom: 8px;">⚙️ Low-Level Languages (Assembly &amp; Machine Code)</strong>
              <ul style="font-size: 14.5px; color: var(--text-main); padding-left: 18px; margin: 0; line-height: 1.6;">
                <li><strong>Assembly:</strong> Uses mnemonics to represent machine instructions.</li>
                <li><strong>Machine code:</strong> Binary instructions executed directly by the processor.</li>
                <li>Can provide close control of hardware, but is harder for people to read, write and maintain.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        heading: 'Compiler vs Interpreter Comparison Matrix',
        body: 'A compiler translates a whole program before that translated form is run; a compiled program can be distributed without the source and does not need to be translated instruction by instruction on each run. An interpreter translates and executes source code one statement at a time. Exact implementation details vary, so compare their usual development, distribution, error-reporting and execution trade-offs in context.',
        html: `
          <div style="overflow-x: auto; margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left;">
              <thead>
                <tr style="background: rgba(45, 156, 145, 0.12); color: var(--teal); border-bottom: 2px solid var(--teal);">
                  <th style="padding: 12px 14px; font-size: 14.5px;">Feature</th>
                  <th style="padding: 12px 14px; font-size: 14.5px;">📦 Compiler</th>
                  <th style="padding: 12px 14px; font-size: 14.5px;">⚡ Interpreter</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 12px 14px; font-weight: 700; color: var(--text-main);">Translation Method</td>
                  <td style="padding: 12px 14px; color: var(--teal); font-weight: 600;">Translates the program before it is run</td>
                  <td style="padding: 12px 14px; color: #3B82F6; font-weight: 600;">Translates and runs one instruction or statement at a time</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 12px 14px; font-weight: 700; color: var(--text-main);">Output File</td>
                  <td style="padding: 12px 14px; color: var(--text-main);">Translates the whole program before execution and can produce a distributable translated form</td>
                  <td style="padding: 12px 14px; color: var(--text-main);">Normally needs the interpreter when the source program is run</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 12px 14px; font-weight: 700; color: var(--text-main);">Execution Speed</td>
                  <td style="padding: 12px 14px; color: #10B981; font-weight: 600;">Fast execution after initial compilation</td>
                  <td style="padding: 12px 14px; color: #EF4444; font-weight: 600;">Translation happens while the source program runs</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 12px 14px; font-weight: 700; color: var(--text-main);">Error Reporting</td>
                  <td style="padding: 12px 14px; color: var(--text-main);">Can report problems found while translating the program before execution</td>
                  <td style="padding: 12px 14px; color: var(--text-main);">Reports an error when execution reaches a statement it cannot translate or run</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      }
    ],
    '2.5.2': [
      {
        heading: '4 Essential Features of an IDE (Integrated Development Environment)',
        body: 'An IDE brings together the four facilities named by OCR: an editor for creating and changing source code, error diagnostics for locating reported problems, a run-time environment for executing the program, and a translator for converting or executing source code. Some IDEs also provide debugging tools such as breakpoints and variable inspection, but these are useful additional context rather than one of the four named facilities.',
        html: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-bottom: 24px;">
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-left: 4px solid var(--teal); border-radius: 10px; padding: 18px 20px;">
              <strong style="color: var(--teal); font-size: 15px; display: block; margin-bottom: 6px;">📝 Code Editor</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">
                Text editor with line numbering, automatic indentation, and syntax highlighting to colour-code keywords.
              </p>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-left: 4px solid #EF4444; border-radius: 10px; padding: 18px 20px;">
              <strong style="color: #EF4444; font-size: 15px; display: block; margin-bottom: 6px;">🚨 Error Diagnostics</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">
                Highlights syntax errors in real-time and provides clear error messages indicating line numbers.
              </p>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-left: 4px solid #10B981; border-radius: 10px; padding: 18px 20px;">
              <strong style="color: #10B981; font-size: 15px; display: block; margin-bottom: 6px;">▶️ Run-time Environment</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">
                Allows programmers to execute code directly inside the IDE without opening external command prompts.
              </p>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-left: 4px solid #F59E0B; border-radius: 10px; padding: 18px 20px;">
              <strong style="color: #F59E0B; font-size: 15px; display: block; margin-bottom: 6px;">Translator</strong>
              <p style="font-size: 14.5px; color: var(--text-main); margin: 0; line-height: 1.55;">
                Converts or executes source code so the program can be run.
              </p>
            </div>
          </div>
        `
      },
      {
        heading: 'Useful extra: debugging tools',
        body: 'Many IDEs also provide breakpoints, step-by-step execution and variable inspection. These can help find logic errors, but they are additional practical features rather than one of the four IDE facilities named in the OCR specification.'
      }
    ]
  };
  const coverageExpansionSections = {
    '1.1.2': [
      {
        heading: 'Compare the three factors together', minutes: 3,
        body: 'Judge performance in context. A higher clock speed can increase the rate of processing, a larger cache can reduce waiting for frequently used data and instructions, and extra cores can process more instructions at once when the software can divide its work. The benefit of one change can be limited by the other factors and by the task, so no single number proves that one CPU is always faster.',
        items: [
          { label: 'Clock speed', text: 'Clock cycles per second. More cycles can allow more processing in the same time when other factors are comparable.' },
          { label: 'Cache size', text: 'More frequently used data and instructions may be held close to the CPU, reducing slower memory access.' },
          { label: 'Number of cores', text: 'More processing units help when work can run in parallel; a mainly sequential task may gain little.' }
        ]
      }
    ],
    '1.2.1': [
      {
        heading: 'Why primary storage is needed', minutes: 3,
        body: 'The processor needs quick access to the instructions and data used by running programs. RAM supplies the main working area, ROM keeps selected instructions available without power, and cache keeps frequently used data and instructions close to the CPU. They are all primary storage, but they have different purposes and characteristics.',
        items: [
          { label: 'RAM', text: 'Volatile working storage for programs and data currently in use.' },
          { label: 'ROM', text: 'Non-volatile storage for instructions that must remain available, such as startup firmware.' },
          { label: 'Cache', text: 'Small, fast storage close to the CPU for frequently used data and instructions.' }
        ]
      }
    ],
    '1.2.2': [
      {
        heading: 'Device, medium and technology', minutes: 3,
        body: 'A storage device reads from or writes to a storage medium. A hard-disk drive uses magnetic platters, an optical drive uses removable discs, and an SSD or memory card uses solid-state memory. Questions may show a device or medium and ask you to recognise the technology before comparing it.',
        items: [
          { label: 'Magnetic', text: 'Often offers high capacity for its cost, but moving parts can affect portability and resistance to impact.' },
          { label: 'Optical', text: 'Removable discs can suit distribution or physical archives, but capacity and access speed may be limited.' },
          { label: 'Solid state', text: 'No moving parts can support fast access and portability, but cost per unit of capacity varies.' }
        ]
      },
      {
        heading: 'Make a recommendation from the scenario', minutes: 4,
        body: 'Choose the features that matter in the scenario: capacity, speed, portability, durability, reliability or cost. Explain how your choice meets the user’s needs. Then give one relevant drawback. For example, a wildlife camera needs low power use, portability and durability. A large backup archive may need capacity and low cost instead.',
        items: [
          { label: 'Need', text: 'Identify which comparison factors matter for this user and task.' },
          { label: 'Evidence', text: 'Explain how a named device or medium meets those particular needs.' },
          { label: 'Trade-off', text: 'State one relevant limitation rather than claiming a technology is always best.' }
        ]
      }
    ],
    '1.2.3': [
      {
        heading: 'Use the complete unit ladder', minutes: 4,
        body: 'A bit is one binary digit, a nibble is 4 bits and a byte is 8 bits. OCR normally uses 1 KB = 1,000 bytes, 1 MB = 1,000 KB, 1 GB = 1,000 MB, 1 TB = 1,000 GB and 1 PB = 1,000 TB; a question may also accept or state 1,024. Write units at every step and use the convention given.',
        items: [
          { label: 'Bits to bytes', text: 'Divide by 8 because one byte contains eight bits.' },
          { label: 'Move to a larger unit', text: 'Divide by 1,000 for each step when using OCR decimal units.' },
          { label: 'Move to a smaller unit', text: 'Multiply by 1,000 for each step when using OCR decimal units.' }
        ]
      },
      {
        heading: 'Calculate file sizes and capacity', minutes: 6,
        body: 'Text size in bits = bits per character x number of characters. Image size in bits = width in pixels x height in pixels x colour depth. Sound size in bits = sample rate x duration in seconds x bit depth. For several files, calculate one file, multiply by the quantity, convert units and include the final unit. To find how many files fit, convert capacity and file size to the same unit before dividing.',
        items: [
          { label: '1. Formula', text: 'Choose the formula that matches text, image or sound data.' },
          { label: '2. Substitute', text: 'Insert every value, including duration or number of files.' },
          { label: '3. Convert', text: 'Show bits-to-bytes and larger-unit conversions separately.' },
          { label: '4. Answer', text: 'Give the requested quantity with the correct unit.' }
        ]
      }
    ],
    '1.3.1': [
      {
        heading: 'Build and compare network layouts', minutes: 6,
        body: 'Network questions involve three different decisions. Scope describes the area: a local area network (LAN) covers a limited site, while a wide area network (WAN) links networks over a larger geographical area and can link several LANs. The resource model can be client-server or peer-to-peer. The connection layout can be a star network or mesh network. These terms answer different questions and can describe the same network together.',
        items: [
          { label: 'School star LAN', text: 'Network interface cards connect devices. A switch directs local traffic. A router connects the LAN to other networks. A wireless access point connects wireless devices.' },
          { label: 'Client-server', text: 'Central accounts, files and backups are easier to manage, but the server costs money and can become a critical point of failure.' },
          { label: 'Peer-to-peer', text: 'Simple and inexpensive for a few devices, but security, backups and shared resources are harder to manage consistently.' },
          { label: 'Star or mesh', text: 'Star is simpler and cheaper. Mesh offers alternative routes but needs more connections and is more complex.' },
          { label: 'Try it now — use paper', text: 'A school wants central accounts, managed backups and simple fault-finding. Choose a resource model and layout, then justify both choices. Reveal the guidance below.' }
        ]
      },
      {
        heading: 'Performance and transmission media', minutes: 4,
        body: 'Network performance can change as more devices share the connection and as available bandwidth changes. The chosen transmission medium, interference, distance and hardware can also affect a real network. Transmission media carry signals between devices and may be wired or wireless. In an exam scenario, identify the factor, state what changes and explain the effect on communication.',
        items: [
          { label: 'More connected devices', text: 'More devices may compete for the same available bandwidth.' },
          { label: 'Bandwidth', text: 'Greater available bandwidth can carry more data in a given time.' },
          { label: 'Transmission medium', text: 'The connection choice affects range, mobility, reliability and possible data rate.' }
        ]
      },
      {
        heading: 'Internet, DNS, hosting and services', minutes: 5,
        body: 'The Internet is a worldwide network of networks. A user enters a URL; the Domain Name System uses multiple domain name servers to find the matching IP address, allowing the client to contact the correct server. Hosting places a website or service on an available server. A web server provides web pages, a file server provides file storage and retrieval, and clients request or use those services.',
        items: [
          { label: '1. URL entered', text: 'The client needs the IP address of the server named in the URL.' },
          { label: '2. DNS lookup', text: 'Domain name servers cooperate to return the matching IP address.' },
          { label: '3. Service requested', text: 'The client contacts the server and requests the hosted page or service.' }
        ]
      },
      {
        heading: 'Cloud services and trade-offs', minutes: 4,
        body: 'Cloud computing provides storage, software or processing on remote servers reached through a network. It can support access from different locations, shared work, flexible capacity and provider-managed services. It also creates dependence on connectivity and the provider, may involve ongoing cost, and requires suitable security, privacy and backup arrangements. Apply only the points relevant to the scenario.',
        items: [
          { label: 'Possible benefit', text: 'Remote access, collaboration or flexible capacity may suit the organisation.' },
          { label: 'Possible drawback', text: 'Loss of connectivity or a provider problem can prevent access to the service.' },
          { label: 'Recommendation', text: 'Balance the relevant benefit and drawback for the named user.' }
        ]
      }
    ],
    '1.3.2': [
      {
        heading: 'Choose a wired or wireless connection', minutes: 4,
        body: 'Ethernet is a wired connection. Wi-Fi and Bluetooth are wireless. Compare mobility, range, reliability, speed, interference, installation and the devices involved. Ethernet may suit a fixed computer needing a stable link; Wi-Fi may suit a mobile device on a LAN; Bluetooth may suit a short-range connection between nearby devices.',
        items: [
          { label: 'Ethernet', text: 'Wired; often chosen for a stable fixed connection.' },
          { label: 'Wi-Fi', text: 'Wireless LAN access; supports mobility but can be affected by range and interference.' },
          { label: 'Bluetooth', text: 'Short-range wireless connection commonly used between nearby devices.' }
        ]
      },
      {
        heading: 'Encryption, addresses and standards', minutes: 5,
        body: 'Encryption changes readable data into an unreadable form using a key so intercepted data is not useful without the correct key. IPv4 is commonly written as four decimal values separated by dots; IPv6 uses a longer hexadecimal format. A MAC address is commonly a 48-bit hexadecimal identifier used for a network interface within a network. Standards are agreed rules that help hardware and software from different producers work together.',
        items: [
          { label: 'IP address', text: 'Identifies a network destination; IPv4 and IPv6 have different formats.' },
          { label: 'MAC address', text: 'Identifies a network interface for communication within a local network.' },
          { label: 'Standard', text: 'An agreed rule that supports compatibility between products.' }
        ]
      },
      {
        heading: 'Protocol purposes and layers', minutes: 6,
        body: 'A protocol is a set of rules for transferring data. TCP/IP supports communication across networks; HTTP transfers web content and HTTPS does so with encrypted communication; FTP transfers files; SMTP sends email; POP retrieves messages to a client; IMAP manages messages kept on a server and synchronises their state. Layers divide communication into parts so one layer can change without redesigning everything, different technologies can work together, and development or fault-finding can focus on one part. You do not need to memorise TCP/IP layer names.',
        items: [
          { label: 'Web', text: 'HTTP transfers web content; HTTPS adds encrypted communication.' },
          { label: 'Files and email', text: 'FTP transfers files; SMTP sends mail; POP and IMAP retrieve or manage received mail.' },
          { label: 'Layers', text: 'Separation supports compatibility, independent development and easier troubleshooting.' }
        ]
      }
    ],
    '1.4.1': [
      {
        heading: 'Malware, social engineering and brute force', minutes: 5,
        body: 'Malware is software designed to cause harm, steal data or gain unwanted control. Social engineering manipulates a person into revealing information or taking an unsafe action; phishing is one example. A brute-force attack repeatedly tries possible passwords or keys. For each threat, distinguish how it enters or operates, what the attacker wants and what harm may follow.',
        items: [
          { label: 'Malware', text: 'Malicious software may damage data, spy on activity or give an attacker control.' },
          { label: 'Social engineering', text: 'The attacker exploits trust or pressure rather than only a technical weakness.' },
          { label: 'Brute force', text: 'Many possible credentials are tried until one succeeds or the attack is stopped.' }
        ]
      },
      {
        heading: 'Denial of service and interception', minutes: 4,
        body: 'A denial-of-service attack overwhelms a service or resource so legitimate users cannot use it. Data interception captures data while it travels between devices; theft may expose or remove confidential information. One targets availability, while the other targets the confidentiality or possession of data.',
        items: [
          { label: 'Denial of service', text: 'Purpose: make a service unavailable by exhausting a resource or flooding it with traffic.' },
          { label: 'Interception', text: 'Purpose: capture data in transit, which is especially harmful when it is readable.' },
          { label: 'Theft', text: 'Purpose: obtain data without permission for misuse, disclosure or financial gain.' }
        ]
      },
      {
        heading: 'SQL injection', minutes: 4,
        body: 'SQL injection occurs when unsafe input is combined with a database query and changes the command the database executes. An attacker may read, change or delete data, or bypass a login, depending on the system and permissions. The key idea is not merely entering SQL words: the application fails to treat input safely and the database receives an unintended query.',
        items: [
          { label: 'Input', text: 'The attacker enters characters designed to alter a query.' },
          { label: 'Unsafe query', text: 'The program combines the input with SQL without suitable protection.' },
          { label: 'Impact', text: 'The database performs an action the developer did not intend.' }
        ]
      }
    ],
    '1.4.2': [
      {
        heading: 'Optional context: policies and incident investigation', minutes: 0,
        body: 'These are useful school and workplace context, but they are not additional J277 1.4.2 prevention methods to memorise. A network policy states what users and administrators may do. Network forensics analyses records such as logs and captured traffic after an incident. A policy does not itself filter traffic, and investigation does not replace prevention.',
        items: [
          { label: 'Network policy', text: 'Sets permitted behaviour and required security practice; people and technical controls must enforce it.' },
          { label: 'Network forensics', text: 'Uses network records to reconstruct an incident and identify its source, path or impact.' },
          { label: 'Use together', text: 'The policy defines expected behaviour; forensic evidence helps show where behaviour or controls failed.' }
        ]
      },
      {
        heading: 'Find and remove vulnerabilities', minutes: 4,
        body: 'Authorised penetration testing imitates attack techniques to find weaknesses before a real attacker uses them. Anti-malware software detects, blocks or removes known or suspicious malicious software. Neither is a complete defence: testing identifies weaknesses that must then be fixed, while anti-malware depends on detection and updates.',
        items: [
          { label: 'Penetration testing', text: 'Authorised search for exploitable weaknesses, followed by reporting and repair.' },
          { label: 'Anti-malware', text: 'Scans for malicious behaviour or known patterns and can quarantine or remove threats.' }
        ]
      },
      {
        heading: 'Control access to systems', minutes: 5,
        body: 'Firewalls filter network traffic using rules. User access levels restrict what an authenticated account can view or change. Passwords support authentication and should be difficult to guess; rate limits or account lockouts can reduce repeated attempts. Physical security limits direct access to devices and rooms. Match the control to the threat and explain the mechanism.',
        items: [
          { label: 'Firewall', text: 'Allows or blocks network traffic according to configured rules.' },
          { label: 'Access level', text: 'Gives each user only the permissions needed for their role.' },
          { label: 'Physical security', text: 'Locks, controlled entry and secure equipment locations restrict direct access.' }
        ]
      },
      {
        heading: 'Protect data with encryption', minutes: 3,
        body: 'Encryption makes data unreadable without the correct key. It helps protect confidentiality if data is intercepted or storage is stolen, but it does not prevent the data being copied, deleted or made unavailable. The authorised recipient needs the appropriate key to recover the readable data.',
        items: [
          { label: 'What it limits', text: 'An interceptor should not be able to understand the protected data without the key.' },
          { label: 'What it does not stop', text: 'Interception, deletion and denial of service can still occur.' }
        ]
      }
    ],
    '1.5.1': [
      {
        heading: 'Follow one task through the operating system', minutes: 5,
        body: 'Imagine a pupil edits an image while music plays, then prints the image. The operating system gives both programs processor time, allocates memory, reads their files and sends the print request to the correct device driver. The user interface lets the pupil control each task. User permissions decide whether the files and printer may be used.',
        items: [
          { label: 'While both programs run', text: 'Multitasking schedules processor time and memory management allocates RAM.' },
          { label: 'When a file opens', text: 'File management finds the stored data and checks the user has suitable access.' },
          { label: 'When the image prints', text: 'Peripheral management uses the printer driver to communicate with that model of printer.' },
          { label: 'Try it now — use paper', text: 'Match these events to an OS function: switching between programs; opening a folder; blocking another user from a file; sending data to a printer.' }
        ]
      },
      {
        heading: 'User interface, memory and multitasking', minutes: 5,
        body: 'The user interface lets a person interact with the system through features such as windows, icons, menus or a command line. Memory management allocates RAM to applications and transfers data as needed. Multitasking shares processor time and other resources so several programs can make progress while the system remains responsive.',
        items: [
          { label: 'User interface', text: 'Provides controls and feedback so the user can issue commands and see results.' },
          { label: 'Memory management', text: 'Allocates memory to applications and manages transfers involving memory.' },
          { label: 'Multitasking', text: 'Schedules access to the processor and resources for multiple running programs.' }
        ]
      },
      {
        heading: 'Peripherals, drivers and data transfer', minutes: 4,
        body: 'The operating system manages communication between peripherals and the processor. A device driver translates general operating-system requests into instructions suitable for a particular device. When an application prints, the application requests the service, the operating system manages it and the driver communicates with the printer.',
        items: [
          { label: 'Application', text: 'Requests an operation such as printing.' },
          { label: 'Operating system', text: 'Manages the request and transfer of data.' },
          { label: 'Device driver', text: 'Provides the device-specific communication needed by the hardware.' }
        ]
      },
      {
        heading: 'Users and files', minutes: 4,
        body: 'User management creates accounts, applies access rights and supports security. File management lets users name files, organise them into folders, move them and save changes while the operating system tracks their locations. Access rights can prevent one user reading or changing another user’s files.',
        items: [
          { label: 'User management', text: 'Accounts identify users; access rights control permitted actions.' },
          { label: 'File management', text: 'Naming, folders, moving and saving keep stored data organised and available.' }
        ]
      }
    ],
    '1.5.2': [
      {
        heading: 'Three required utility types', minutes: 4,
        body: 'For OCR, focus on encryption, defragmentation and compression utilities. Encryption protects confidentiality by requiring a key. Defragmentation rearranges file blocks on magnetic disks to reduce read-head movement. Compression reduces the number of bits needed for storage or transmission. State the purpose, when the utility helps and one relevant limitation.',
        items: [
          { label: 'Encryption', text: 'Protects readable data with a key; it does not prevent all attacks.' },
          { label: 'Defragmentation', text: 'Reorganises file blocks on magnetic disks; it does not provide the same benefit on solid-state storage.' },
          { label: 'Compression', text: 'Reduces file size; the exact effect depends on the method and data.' }
        ]
      },
      {
        heading: 'Choose the utility that fits the problem', minutes: 4,
        body: 'Start with the problem in the scenario, then name the utility and explain how it helps. Do not claim that one utility solves a different problem.',
        items: [
          { label: 'Stolen laptop', text: 'Encryption can stop someone reading protected files without the key. It does not stop the laptop being stolen.' },
          { label: 'Large attachment', text: 'Compression can reduce transfer time and storage use. Lossy compression may reduce quality.' },
          { label: 'Slow magnetic hard disk', text: 'Defragmentation can place parts of a file together to reduce head movement. Do not recommend it for an SSD.' },
          { label: 'Try it now — use paper', text: 'A photographer needs smaller preview images and accepts some loss of quality. Choose a utility, explain how it helps and state the trade-off.' }
        ]
      }
    ],
    '1.6.1': [
      {
        heading: 'Use five impact lenses', minutes: 5,
        body: 'Ethical issues ask what ought to be done. Legal issues ask what the law allows or prohibits. Cultural issues concern behaviour, participation and communities. Environmental issues concern energy, materials, manufacture and waste. Privacy issues concern how information about people is collected, used and shared. One consequence may fit more than one lens, but explain the connection rather than only naming a category.',
        items: [
          { label: 'Ethical', text: 'Is the action fair, responsible and respectful of those affected?' },
          { label: 'Legal', text: 'Which law or legal duty is relevant to the action?' },
          { label: 'Cultural', text: 'How might behaviour, access, relationships or communities change?' },
          { label: 'Environmental', text: 'What resources, energy, emissions or electronic waste are involved?' },
          { label: 'Privacy', text: 'What personal information is collected, inferred, shared or retained?' }
        ]
      },
      {
        heading: 'Explain how the technology affects someone', minutes: 4,
        body: 'Name an affected stakeholder, describe the immediate change and then explain a consequence. For example, remote monitoring may let a patient receive support at home, but collection of detailed health data can create privacy and security risks. Generic claims earn little unless they are linked to the technology and people in the scenario.',
        items: [
          { label: 'Stakeholder', text: 'Identify the person, group or organisation affected.' },
          { label: 'Change', text: 'State what the technology enables, prevents or makes more likely.' },
          { label: 'Consequence', text: 'Explain why that change matters in this scenario.' }
        ]
      },
      {
        heading: 'Reach a justified conclusion', minutes: 4,
        body: 'Consider the relevant benefits, harms and alternatives, then decide which matter most in the stated context. A strong conclusion follows from the developed points; it is not a new unsupported opinion. OCR does not require one fixed layout: paragraphs, developed key points or a table can all communicate a reasoned response.',
        items: [
          { label: 'Balance', text: 'Consider relevant competing effects rather than forcing an artificial equal list.' },
          { label: 'Judgement', text: 'Give your decision. Support it with the most important facts from the scenario.' }
        ]
      }
    ],
    '1.6.2': [
      {
        heading: 'Match the action to the law', minutes: 5,
        body: 'Apply legislation to the action, not just the topic name. You do not need Act section numbers. State what the person or organisation did, whether permission or a lawful basis existed, and the relevant harm or duty.',
        items: [
          { label: 'Computer Misuse Act', text: 'Covers access without permission, unauthorised acts intended to impair a system, and making or supplying tools with relevant criminal intent.' },
          { label: 'Data Protection Act', text: 'Personal data must be processed lawfully and fairly, for a proper purpose, and protected with appropriate security.' },
          { label: 'Copyright law', text: 'Copying, adapting or distributing protected software without permission can infringe the owner’s rights.' }
        ]
      },
      {
        heading: 'Three laws: purpose and actions', minutes: 6,
        body: 'The Data Protection Act 2018 governs lawful, fair and secure processing of personal data. The Computer Misuse Act 1990 covers access without permission and other unauthorised acts involving computer systems. The Copyright, Designs and Patents Act 1988 protects software and other creative work from unauthorised copying, adaptation or distribution. In a scenario, name the law, identify the action and explain why it is allowed or prohibited.',
        items: [
          { label: 'Data Protection Act 2018', text: 'Personal data must be handled for a lawful purpose and protected appropriately.' },
          { label: 'Computer Misuse Act 1990', text: 'Access or acts involving a computer system require proper authorisation.' },
          { label: 'Copyright, Designs and Patents Act 1988', text: 'Creators control copying, adaptation and distribution of protected work.' }
        ]
      },
      {
        heading: 'Why software licences are needed', minutes: 4,
        body: 'Copyright normally prevents a user doing anything they want with software. A licence grants stated permissions and sets conditions. Open-source software provides source-code access and permission to inspect or modify it under the licence terms. Proprietary software normally withholds source code and grants restricted use. Open source does not mean no copyright, no conditions or necessarily no cost.',
        items: [
          { label: 'Open source', text: 'Source is available and modification is permitted under the licence conditions.' },
          { label: 'Proprietary', text: 'The owner keeps control of source code and grants limited rights to use the software.' }
        ]
      },
      {
        heading: 'Recommend a licence in context', minutes: 3,
        body: 'Identify whether the organisation needs to inspect or adapt source code, what support and compatibility it needs, how it will distribute the software and what cost or security concerns apply. Recommend one licence type using those needs, then acknowledge a relevant drawback. Buying a copy of proprietary software does not transfer its copyright.',
        items: [
          { label: 'Requirement', text: 'Identify the source access, modification, support, distribution and cost needs.' },
          { label: 'Recommendation', text: 'Link the chosen licence type directly to those needs.' },
          { label: 'Trade-off', text: 'State one relevant limitation or responsibility.' }
        ]
      }
    ],
    '2.1.2': [
      {
        heading: 'Worked trace and correction', minutes: 5,
        body: 'For total = 0 and values [3, 5, 2], trace total after each addition: 3, 8, 10. If faulty code starts its loop at index 1, its trace is 5, 7 and exposes the missing first value. Correct the start index, repeat the original test and then try an empty or boundary case where the question permits it.',
        items: [
          { label: 'Expected states', text: 'Start 0 → after 3: 3 → after 5: 8 → after 2: 10.' },
          { label: 'Faulty states', text: 'Start 0 → after 5: 5 → after 2: 7; the first divergence identifies the skipped item.' },
          { label: 'Retest', text: 'After correcting the index, the same input must produce 10 before another suitable test is tried.' }
        ]
      },
      {
        heading: 'Plan with inputs, processes and outputs', minutes: 4,
        body: 'Start by defining the data entering the solution, the operations and decisions applied to it, and the information produced. A structure diagram then breaks the problem into linked subproblems. For a quiz program, input may be an answer, processes include checking and updating a score, and output includes feedback and the final score.',
        items: [
          { label: 'Input', text: 'Data supplied to the algorithm.' },
          { label: 'Process', text: 'Calculations, comparisons, decisions and updates performed.' },
          { label: 'Output', text: 'Information produced for a user, file or another part of the system.' }
        ]
      },
      {
        heading: 'Choose and read an algorithm representation', minutes: 5,
        body: 'A flowchart uses a terminal for start/end, a parallelogram for input/output, a rectangle for a process, a diamond for a decision and arrows for flow. Label both outcomes from a decision. Pseudocode, OCR Exam Reference Language or a high-level language can express the same sequence precisely. A structure diagram shows subproblems and their links rather than execution order.',
        items: [
          { label: 'Flowchart', text: 'Best for seeing control flow, decisions and repetition.' },
          { label: 'Structure diagram', text: 'Best for showing decomposition into linked parts.' },
          { label: 'Code-style notation', text: 'Best for precise values, conditions, loops and updates.' }
        ]
      },
      {
        heading: 'Trace, correct and refine', minutes: 6,
        body: 'Choose columns for important variables, conditions and output. Add a row after each meaningful change or loop pass. Compare the trace with the intended result and locate the first wrong value. A syntax error breaks the notation rules; a logic error lets the algorithm run but produces an unexpected result. Correct the cause, then repeat the trace with another suitable input. Nested selection or iteration requires the inner structure to be followed each time the outer path reaches it.',
        items: [
          { label: 'Trace', text: 'Record the state after meaningful execution steps.' },
          { label: 'Diagnose', text: 'Find the first point where actual and intended behaviour differ.' },
          { label: 'Refine and retest', text: 'Change the cause, then confirm the correction with suitable data.' }
        ]
      }
    ],
    '2.1.3': [
      {
        heading: 'Linear search: check one item at a time', minutes: 4,
        body: 'Linear search starts at the first item and checks each item in order. Stop as soon as the target is found. If every item has been checked, report that the target is not present. The data does not need to be sorted.',
        items: [
          { label: 'Worked example', text: 'Find 7 in [4, 9, 7, 2]: check 4, then 9, then 7. Stop at index 2; do not check 2.' },
          { label: 'Not found', text: 'To show that 6 is absent, check 4, 9, 7 and 2 before reporting not found.' },
          { label: 'Index reminder', text: 'Array positions are normally numbered from 0, so the first item is index 0 and the third item is index 2.' },
          { label: 'Try it now — use paper', text: 'Trace a search for 2. Write each checked value and the final index, then reveal the trace below.' }
        ]
      },
      {
        heading: 'Binary search: keep the possible half', minutes: 5,
        body: 'Binary search only works on sorted data. Check the middle item. If two middle items are possible, use the convention stated in the question; if none is stated, choose one consistently. If the checked item is too small, discard it and everything below it. If it is too large, discard it and everything above it. Repeat until the target is found or no items remain.',
        items: [
          { label: 'Worked example', text: 'Find 7 in [1, 3, 5, 7, 9]. Check 5: too small, so keep [7, 9]. This example chooses the lower middle, 7: found.' },
          { label: 'Common mistake', text: 'Do not use binary search on unsorted data. Discarding half could remove the target.' },
          { label: 'Recognition clue', text: 'Pseudocode that repeatedly changes lower or upper search bounds after checking a middle index is binary search.' },
          { label: 'Try it now — use paper', text: 'Find 9 in [1, 3, 5, 7, 9]. Use the lower-middle convention and record each remaining search area, then reveal the trace below.' }
        ]
      },
      {
        heading: 'Bubble sort: show every comparison and pass', minutes: 5,
        body: 'Bubble sort compares neighbouring items. Swap them when they are in the wrong order, then move one place along. A pass reaches the end of the unsorted part of the list. Repeat passes until a complete pass makes no swaps.',
        items: [
          { label: 'Pass 1 on [3, 1, 2]', text: 'Compare 3 and 1, then swap: [1, 3, 2]. Compare 3 and 2, then swap: [1, 2, 3].' },
          { label: 'Pass 2', text: 'Compare 1 and 2: no swap. Compare 2 and 3: no swap. The no-swap pass proves the list is sorted.' },
          { label: 'Common mistake', text: 'One swap is not one pass. Show the state after each comparison that changes the list.' },
          { label: 'Recognition clue', text: 'Nested passes that compare neighbouring indexes and swap them identify bubble sort.' },
          { label: 'Try it now — use paper', text: 'Show every comparison in the first pass of bubble sort on [4, 2, 3, 1], then reveal the trace below.' }
        ]
      },
      {
        heading: 'Insertion sort: grow a sorted section', minutes: 5,
        body: 'Insertion sort treats the first item as a sorted section. Take the next item, move larger items to the right and insert the item into the gap. Repeat with the next unsorted item.',
        items: [
          { label: 'Start [3 | 1, 2]', text: 'The bar separates the sorted section from items not processed yet.' },
          { label: 'Insert 1', text: 'Move 3 right and place 1 before it: [1, 3 | 2].' },
          { label: 'Insert 2', text: 'Move 3 right and place 2 after 1: [1, 2, 3].' },
          { label: 'Recognition clue', text: 'A sorted section grows by one item at a time.' },
          { label: 'Try it now — use paper', text: 'Show the sorted section after each insertion for [5, 2, 4, 1], then reveal the trace below.' }
        ]
      },
      {
        heading: 'Merge sort: split, then merge in order', minutes: 6,
        body: 'Merge sort divides the list until every sub-list contains one item. It then merges neighbouring sub-lists in sorted order. Compare the first unused item in each sub-list and take the smaller one. The ordering happens during each merge.',
        items: [
          { label: 'Split [6, 2, 5, 1]', text: 'Split into [6, 2] and [5, 1], then into [6] [2] [5] [1].' },
          { label: 'Merge pairs', text: 'Merge [6] with [2] to get [2, 6]. Merge [5] with [1] to get [1, 5].' },
          { label: 'Final merge', text: 'Compare front items: take 1, then 2, then 5, then 6. The result is [1, 2, 5, 6].' },
          { label: 'Common mistake', text: 'Do not join unsorted sub-lists and sort afterwards. Show the ordered result of every merge.' },
          { label: 'Try it now — use paper', text: 'Show every split and merge for [7, 3, 6, 2], then reveal the trace below.' }
        ]
      }
    ],
    '2.2.1': [
      {
        heading: 'Worked selection and loop traces', minutes: 6,
        body: 'Trace the condition before choosing a path, and record values after each loop pass. For nested structures, show when the inner structure runs.',
        items: [
          { label: 'Selection', text: 'age = 15; age >= 16 is false, so the else path runs. Test 16 as the boundary where the first path begins.' },
          { label: 'Count loop', text: 'total = 0; add i for i = 1 to 3: total becomes 1, 3, then 6.' },
          { label: 'Nested', text: 'For two rows and three columns, the inner action runs three times for each row: six times in total.' }
        ]
      },
      {
        heading: 'Store, input and output values', minutes: 4,
        body: 'A variable is a named value that may change; a constant is a named value intended not to change. Assignment stores a value in a variable. Input obtains data and output communicates a result. Keep assignment separate from equality testing: OCR Exam Reference Language uses one equals sign for assignment and two equals signs when comparing values.',
        items: [
          { label: 'Assignment', text: 'total = total + score updates the stored value of total.' },
          { label: 'Input', text: 'Receives a value that may need casting or validation.' },
          { label: 'Output', text: 'Displays or sends a value after processing.' }
        ]
      },
      {
        heading: 'Use the required operators', minutes: 5,
        body: 'Arithmetic operators are +, -, *, /, MOD, DIV and ^. DIV gives the whole-number quotient and MOD gives the remainder. Comparison operators are ==, !=, <, <=, > and >=. Boolean operators AND, OR and NOT combine or reverse conditions. Work out arithmetic values and comparisons before evaluating the final Boolean condition.',
        items: [
          { label: 'Arithmetic', text: '17 DIV 5 is 3; 17 MOD 5 is 2; 3 ^ 2 is 9.' },
          { label: 'Comparison', text: 'Returns a Boolean result such as true or false.' },
          { label: 'Boolean', text: 'AND needs both conditions true; OR needs at least one; NOT reverses a result.' }
        ]
      },
      {
        heading: 'Choose a control structure', minutes: 5,
        body: 'Sequence performs instructions in order. Selection chooses a path according to a condition. Count-controlled iteration suits a known number of repetitions; condition-controlled iteration suits repetition that stops or continues according to a condition. With nested structures, trace the inner structure every time execution reaches it.',
        items: [
          { label: 'Known number of repeats', text: 'Use a count-controlled loop.' },
          { label: 'Repeat until a condition changes', text: 'Use a condition-controlled loop and make sure its controlling value can change.' },
          { label: 'Choose between paths', text: 'Use selection with complete, logically valid conditions.' }
        ]
      }
    ],
    '2.2.3': [
      {
        heading: 'Worked data examples', minutes: 6,
        body: 'Follow each operation and identify the resulting value before writing a similar operation yourself.',
        items: [
          { label: 'String', text: 'name = "Ada"; message = "Hi " + name gives "Hi Ada". "COMPUTER".substring(0, 3) gives "COM" in OCR ERL.' },
          { label: '1D array', text: 'scores = [4, 7, 2]; scores[1] = 9 changes the array to [4, 9, 2].' },
          { label: '2D array', text: 'grid[1][2] selects row 1, column 2. Both indexes must stay inside the declared array.' }
        ]
      },
      {
        heading: 'Worked file, record and SQL examples', minutes: 6,
        body: 'A file operation needs a complete open–process–close lifecycle. A record keeps related named fields together. A query returns only the fields and records requested.',
        items: [
          { label: 'Text file', text: 'file = open("scores.txt"); while NOT file.endOfFile() ... line = file.readLine() ... endwhile; file.close().' },
          { label: 'Record diagram', text: 'One pupil record has fields Name → Sam and Score → 12. The representation groups related fields; no particular record-declaration syntax is required here.' },
          { label: 'SQL result', text: 'SELECT Name FROM Pupil WHERE Score >= 10 returns the Name value for records whose Score is at least 10.' }
        ]
      },
      {
        heading: 'Worked subprogram and scope example', minutes: 6,
        body: 'Trace the argument into the parameter and the returned value back to the caller. A local value is separate from a same-named value outside the subprogram.',
        items: [
          { label: 'Function', text: 'function double(n) return n * 2 endfunction; result = double(6) stores 12 in result.' },
          { label: 'Procedure', text: 'procedure showScore(score) print(score) endprocedure performs output but does not supply a value to an assignment.' },
          { label: 'Array parameter', text: 'function first(items) return items[0] endfunction reads the array passed by the caller; use the returned value explicitly.' }
          ,{ label: 'Local and global trace', text: 'With global score = 10, a function that creates local score = 3 returns 3 while the separate global score remains 10.' }
          ,{ label: 'Array return trace', text: 'function addEnd(items, value) appends value and returns items; updated = addEnd([2,4], 6) gives updated = [2,4,6].' }
        ]
      },
      {
        heading: 'Manipulate strings and arrays', minutes: 6,
        body: 'Concatenation joins strings; slicing selects part of a string using positions. A fixed one-dimensional array uses one index, while a two-dimensional array uses a row and column and can represent records and fields in a table. Check starting indexes and bounds in the language or notation provided. Changing an element updates the array; outputting an element does not return a whole array from a subprogram.',
        items: [
          { label: 'String', text: 'Join values with concatenation and select a range with slicing.' },
          { label: '1D array', text: 'Use one index to access an item in a fixed list.' },
          { label: '2D array', text: 'Use row and column indexes to access a table cell.' }
        ]
      },
      {
        heading: 'Use records, files and SQL', minutes: 6,
        body: 'A record groups related fields about one item, and fields may have different data types. File handling follows a lifecycle: open the file in a suitable mode, read from or write to it, then close it. SQL SELECT chooses fields, FROM names the table and WHERE filters records. For example, SELECT Name FROM Pupil WHERE House = "Red" returns the Name field only for matching records.',
        items: [
          { label: 'Record', text: 'One structured item containing named fields, such as name, age and score.' },
          { label: 'File', text: 'Open, read or write, then close; use the supplied end-of-file form when reading repeatedly.' },
          { label: 'SQL', text: 'SELECT fields FROM table WHERE condition.' }
        ]
      },
      {
        heading: 'Design functions and procedures', minutes: 6,
        body: 'A function returns a value to the instruction that called it. A procedure performs a named task and does not have to return a value. Parameters pass values or arrays into a subprogram. Local variables and constants exist inside their subprogram; global values have wider scope. Arrays can be passed into and returned from subprograms where the notation permits. Use parameters and return values rather than asking for unrelated input inside a reusable calculation.',
        items: [
          { label: 'Parameter', text: 'A named input supplied by the caller.' },
          { label: 'Return value', text: 'The value a function sends back to the caller.' },
          { label: 'Scope', text: 'Local names belong to one subprogram; global names are available more widely.' }
        ]
      },
      {
        heading: 'Generate and test random values', minutes: 4,
        body: 'A random-number facility creates a value in a stated range for uses such as a game, simulation or sample selection. Confirm whether each endpoint can occur in the chosen language. Store or use the returned value like any other value. Tests should check that results remain within the permitted range rather than expecting one particular random result.',
        items: [
          { label: 'Bounds', text: 'Identify the lowest and highest possible value.' },
          { label: 'Worked Python example', text: 'roll = random.randint(1, 6) stores an integer from 1 to 6 inclusive after importing random.' },
          { label: 'Worked OCR ERL example', text: 'roll = random(1, 6) uses the reference-language random form with the stated inclusive range.' },
          { label: 'Test', text: 'Check valid range and behaviour, not one predicted result.' }
        ]
      }
    ],
    '2.2.PY': [
      {
        heading: 'Cumulative Python pathway', minutes: 5,
        body: 'Python skill develops across several practical sessions rather than one reading page. Begin by predicting output and tracing values, then complete missing code, find syntax and logic errors, write one construct with support, combine constructs into a solution, design tests and refine the program. Support should reduce as the same ideas are revisited. A successful run is not enough unless the program meets the stated requirement and passes suitable tests.',
        items: [
          { label: 'Understand', text: 'Read and trace code before changing it.' },
          { label: 'Build', text: 'Complete, debug and then construct increasingly independent solutions.' },
          { label: 'Prove', text: 'Compare expected and actual results, fix faults and retest.' }
        ]
      },
      {
        heading: 'Use one dependable problem-solving routine', minutes: 6,
        body: 'Before coding, write the inputs, required processing and outputs. Build the smallest working step, run it and inspect the values. Add selection, loops, lists or subprograms one at a time. When a test fails, find the first value that differs from the expected value, correct the cause and rerun the failed and earlier tests.',
        items: [
          { label: '1. Plan', text: 'Write a small example by hand and decide what each variable represents.' },
          { label: '2. Build', text: 'Add one meaningful part at a time instead of writing the whole program before running it.' },
          { label: '3. Test', text: 'Use normal input, a boundary such as the lowest accepted value, and unsuitable input such as text where a number is required.' },
          { label: '4. Explain', text: 'Be ready to trace the code and explain why each control structure fits the task.' }
        ]
      }
    ],
    '2.2.ERL': [
      {
        heading: 'Worked ERL control-flow trace', minutes: 6,
        body: 'For score = 7, the comparison score >= 5 is true, so the first branch prints "pass" and the else branch is skipped. In a loop, record changed values after every pass.',
        items: [
          { label: 'Selection', text: 'if score >= 5 then print("pass") else print("retry") endif' },
          { label: 'Count loop', text: 'total = 0; for i = 1 to 3; total = total + i; next i gives totals 1, 3, 6.' },
          { label: 'While loop', text: 'x = 1; while x < 4; x = x + 1; endwhile gives x values 2, 3, 4.' }
        ]
      },
      {
        heading: 'Worked ERL data and subprogram forms', minutes: 6,
        body: 'Use one consistent notation and trace the value produced by each operation. Questions may supply relevant reference-language forms, so read them carefully.',
        items: [
          { label: 'Array and string', text: 'values[2] accesses one element; word.substring(1, 3) selects three characters starting at index 1.' },
          { label: 'File loop', text: 'file = open("data.txt"); while NOT file.endOfFile(); print(file.readLine()); endwhile; file.close().' },
          { label: 'Function call', text: 'function add(a, b) return a + b endfunction; answer = add(2, 5) stores 7.' }
        ]
      },
      {
        heading: 'Assignment, input, output and selection', minutes: 5,
        body: 'OCR Exam Reference Language uses input("Prompt") to obtain a value and print(value) for output. Assignment uses one equals sign, while equality comparison uses two. A selection begins with if condition then, may include elseif or else, and ends with endif. Keep the supplied notation consistent rather than mixing in Python colons or relying on indentation alone.',
        items: [
          { label: 'Assignment', text: 'score = 0 stores a value; score == 0 compares values.' },
          { label: 'Input/output', text: 'Use the OCR forms shown in the reference language.' },
          { label: 'Selection', text: 'if ... then, optional elseif/else, endif.' }
        ]
      },
      {
        heading: 'Count-controlled and condition-controlled loops', minutes: 5,
        body: 'A count-controlled loop uses for variable = start to end and closes with next variable; the stated end value is included. A condition-controlled loop uses while condition and closes with endwhile. Initialise values before the loop, update any value that controls a while loop, and check array bounds carefully.',
        items: [
          { label: 'for loop', text: 'Use when the number or range of repetitions is known.' },
          { label: 'while loop', text: 'Use while a condition remains true; ensure the condition can eventually become false.' },
          { label: 'Trace', text: 'Record the loop variable and changed values after each iteration.' }
        ]
      },
      {
        heading: 'Strings, arrays and files', minutes: 6,
        body: 'Use the string and array operations supplied in OCR Exam Reference Language, including length, substring access and indexed elements. Arrays use fixed positions and may have one or two dimensions. A file is opened, checked or read using the supplied file operations, processed inside the loop and closed afterwards. Follow the exact forms provided in the reference sheet or question.',
        items: [
          { label: 'String', text: 'Use the supplied length and substring forms; indexes start at zero in the reference language.' },
          { label: 'Array', text: 'Use indexes within the declared range; a 2D array needs row and column.' },
          { label: 'File', text: 'Open, check for more data, read or write, and close.' }
        ]
      },
      {
        heading: 'Functions and procedures', minutes: 5,
        body: 'A function declaration names its parameters, processes them, returns a value and ends with endfunction. A procedure performs a named task and ends with endprocedure. Pass required data through parameters and use the returned value in the calling instruction. Do not add new input inside a function when the question says the value is supplied as a parameter.',
        items: [
          { label: 'Function', text: 'Receives parameters and returns a value.' },
          { label: 'Procedure', text: 'Receives any parameters and performs a task without requiring a return value.' },
          { label: 'Caller', text: 'Supplies arguments and stores or uses a returned result.' }
        ]
      }
    ],
    '2.3.1': [
      {
        heading: 'Worked login-input design', minutes: 6,
        body: 'A login form first checks that required fields are present and within the allowed length. It should reject unsuitable input with a clear retry, rather than crash or continue. Authentication then checks the claimed identity using securely stored verification data. The two checks have different jobs: valid-looking input is not proof of identity.',
        items: [
          { label: 'Validate', text: 'Reject a blank username or a value outside the allowed length and explain what the user should change.' },
          { label: 'Authenticate', text: 'Compare the supplied credentials using the system\'s secure authentication process.' },
          { label: 'Limit misuse', text: 'Do not reveal which credential was correct. A short delay, rate limit or temporary lockout can reduce rapid repeated attempts.' },
          { label: 'Maintain', text: 'Put validation and authentication work in clearly named subprograms so each responsibility can be tested and changed.' }
        ]
      },
      {
        heading: 'Design validation and authentication', minutes: 5,
        body: 'Validation checks whether input follows rules such as type, range, length, presence or format, and should reject or re-request unsuitable data. It does not prove that a plausible value is true. Authentication checks identity, for example by comparing supplied credentials with securely stored verification data. Anticipate accidental and deliberate misuse rather than assuming every user follows instructions.',
        items: [
          { label: 'Validate', text: 'Check the stated rules and give the user a safe retry route.' },
          { label: 'Authenticate', text: 'Confirm that the user is allowed to act as the claimed identity.' },
          { label: 'Anticipate misuse', text: 'Handle unexpected order, repeated actions and invalid values safely.' }
        ]
      },
      {
        heading: 'Make code maintainable', minutes: 4,
        body: 'Use meaningful names, consistent indentation, comments that explain purpose or non-obvious decisions, and subprograms with one clear responsibility. A comment that merely repeats an instruction adds little. Replacing repeated code with a well-named subprogram makes one future correction apply everywhere that subprogram is called.',
        items: [
          { label: 'Names', text: 'Describe the role of a value or subprogram.' },
          { label: 'Layout and comments', text: 'Make structure visible and explain decisions that code alone does not make clear.' },
          { label: 'Subprograms', text: 'Separate reusable tasks and reduce duplication.' }
        ]
      }
    ],
    '2.3.2': [
      {
        heading: 'Worked test rows and retest', minutes: 6,
        body: 'For an integer age accepted from 11 to 16: normal 14 should be accepted; boundary 11 and 16 should be accepted; invalid 10 and 17 should be rejected; erroneous "fourteen" should be rejected without a crash. If 16 is rejected, correct the comparison from age < 16 to age <= 16, rerun 16, then rerun nearby passing tests.',
        items: [
          { label: 'Before running', text: 'Record the input, data category and precise expected result.' },
          { label: 'After running', text: 'Record the actual result and compare it with the expected result.' },
          { label: 'After a fix', text: 'Repeat the failed boundary and relevant earlier tests to check the change did not break them.' }
        ]
      },
      {
        heading: 'Build a complete test plan', minutes: 5,
        body: 'A test plan records the feature being tested, test data, test type, expected result and later the actual result and pass/fail outcome. Normal data is typical and valid. Boundary data is valid and at an accepted limit. Invalid data has the correct type but breaks a rule. Erroneous data has the wrong type. Include both lower and upper boundaries when a range has two limits.',
        items: [
          { label: 'Expected result', text: 'Write this before running the program so the test has an objective check.' },
          { label: 'Actual result', text: 'Record what the program really did.' },
          { label: 'Outcome', text: 'Compare expected and actual results and mark pass or fail.' }
        ]
      },
      {
        heading: 'Test, refine and retest', minutes: 4,
        body: 'Iterative testing happens while modules and changes are developed; terminal or final testing checks the completed program. A syntax error breaks language rules and prevents suitable translation or execution. A logic error lets the program run but gives an unexpected result. When a test fails, locate the cause, refine the algorithm or code, repeat the failed test and run relevant earlier tests to check that the change caused no regression.',
        items: [
          { label: 'Fail', text: 'Identify the first difference between expected and actual behaviour.' },
          { label: 'Fix', text: 'Correct the underlying algorithm or code, not only the displayed answer.' },
          { label: 'Retest', text: 'Repeat the failed test and relevant previous tests.' }
        ]
      }
    ],
    '2.4.1': [
      {
        heading: 'Worked combined-gate row', minutes: 4,
        body: 'For Q = (A AND B) OR NOT C with A = 1, B = 0 and C = 0: first A AND B = 0; then NOT C = 1; finally 0 OR 1 = 1. Keep separate columns for the two intermediate results before Q.',
        html: `
          <figure class="logic-worked-visual" aria-labelledby="logic-worked-title logic-worked-caption">
            <figcaption id="logic-worked-title"><strong>Follow the signals from left to right</strong></figcaption>
            <svg class="logic-worked-diagram" viewBox="0 0 900 250" role="img" aria-labelledby="logic-svg-title logic-svg-desc">
              <title id="logic-svg-title">Combined logic circuit for Q equals A AND B, OR NOT C</title>
              <desc id="logic-svg-desc">A is one and B is zero, so the AND gate produces zero. C is zero, so the NOT gate produces one. The final OR gate receives zero and one, so Q is one.</desc>
              <g class="logic-input"><rect x="20" y="25" width="95" height="48" rx="8"/><text x="67" y="55">A = 1</text></g>
              <g class="logic-input"><rect x="20" y="92" width="95" height="48" rx="8"/><text x="67" y="122">B = 0</text></g>
              <g class="logic-input"><rect x="20" y="180" width="95" height="48" rx="8"/><text x="67" y="210">C = 0</text></g>
              <path class="logic-wire" d="M115 49 H185 V83 H235"/><path class="logic-wire" d="M115 116 H185 V83"/>
              <g class="logic-gate logic-gate--and"><path d="M235 55 H300 A29 29 0 0 1 300 113 H235 Z"/><text x="292" y="85">AND</text></g>
              <path class="logic-wire" d="M365 84 H505 V110 H610"/><text class="logic-signal" x="415" y="73">0</text>
              <path class="logic-wire" d="M115 204 H235"/>
              <g class="logic-gate"><path d="M235 175 L320 204 L235 233 Z"/><circle cx="330" cy="204" r="10"/><text x="270" y="209">NOT</text></g>
              <path class="logic-wire" d="M340 204 H505 V145 H610"/><text class="logic-signal" x="415" y="222">1</text>
              <g class="logic-gate"><path d="M610 90 Q665 88 710 128 Q665 168 610 166 Q635 128 610 90 Z"/><text x="663" y="134">OR</text></g>
              <path class="logic-wire" d="M710 128 H790"/>
              <g class="logic-output"><rect x="790" y="103" width="90" height="50" rx="8"/><text x="835" y="134">Q = 1</text></g>
            </svg>
            <div class="logic-worked-steps" aria-label="Calculation steps">
              <div><span>1</span><strong>AND first</strong><small>1 AND 0 = 0</small></div>
              <div><span>2</span><strong>Reverse C</strong><small>NOT 0 = 1</small></div>
              <div><span>3</span><strong>Final OR</strong><small>0 OR 1 = 1</small></div>
            </div>
            <p id="logic-worked-caption">Keep a separate truth-table column for each intermediate signal. That makes the final output easier to calculate and check.</p>
          </figure>
        `,
        items: [
          { label: 'Inputs', text: 'A = 1, B = 0, C = 0.' },
          { label: 'Intermediate columns', text: 'A AND B = 0; NOT C = 1.' },
          { label: 'Final output', text: '0 OR 1 gives Q = 1.' }
        ]
      },
      {
        heading: 'Create a circuit from a scenario', minutes: 5,
        body: 'Turn each scenario statement into a Boolean condition, then connect the gates in the same logical order. Use AND when all conditions must be true, OR when at least one may be true and NOT when a value must be reversed. Label inputs, intermediate outputs and the final output. The small circle on a NOT gate shows inversion and must not be omitted.',
        items: [
          { label: 'Translate', text: 'Write the Boolean expression represented by the scenario.' },
          { label: 'Draw or edit', text: 'Choose standard gate symbols and connect them in expression order.' },
          { label: 'Check', text: 'Test relevant input combinations and compare the circuit with the rule.' }
        ]
      },
      {
        heading: 'Complete every truth-table row', minutes: 4,
        body: 'A circuit with n inputs needs 2^n input combinations. List them systematically so none are missed. For a combined circuit, add a column for each intermediate gate, evaluate those columns first and then calculate the final output. Colour may highlight a column, but labels and column headings must carry the meaning.',
        items: [
          { label: 'Two inputs', text: 'Four rows: 00, 01, 10 and 11.' },
          { label: 'Three inputs', text: 'Eight rows, counting systematically from 000 to 111.' },
          { label: 'Combined circuit', text: 'Calculate one named intermediate output at a time.' }
        ]
      }
    ],
    '2.5.1': [
      {
        heading: 'Why translation is required', minutes: 4,
        body: 'A processor executes machine-code instructions. High-level source code is designed for people to read and is more portable across systems; low-level code is closer to a particular processor and can provide close hardware control. A translator converts source code into a form the processor can execute. OCR does not require knowledge of assemblers for this strand.',
        items: [
          { label: 'High level', text: 'Easier for people to read, write, debug and maintain; generally portable.' },
          { label: 'Low level', text: 'Closer to processor instructions and hardware; harder for people to work with.' },
          { label: 'Translator', text: 'Bridges the source language and executable machine instructions.' }
        ]
      },
      {
        heading: 'Recommend a compiler or interpreter', minutes: 5,
        body: 'A compiler translates the program before execution, so a translated form can be run or distributed without translating each instruction as it executes. An interpreter translates and runs source statements during execution, which can support immediate development feedback but normally requires the interpreter. Use typical characteristics as contextual trade-offs rather than universal rules about every implementation.',
        items: [
          { label: 'Development', text: 'Interpretation can give feedback as execution reaches source statements.' },
          { label: 'Distribution', text: 'Compilation can allow a translated form to be supplied without the source.' },
          { label: 'Execution', text: 'Compiled code has been translated before it runs; interpreted source is translated during execution.' }
        ]
      }
    ],
    '2.5.2': [
      {
        heading: 'Use the four required IDE facilities', minutes: 5,
        body: 'The four facilities named by OCR are the editor, error diagnostics, run-time environment and translator. The editor is where source code is created and changed. Error diagnostics report detected problems and their locations. The run-time environment lets the program execute so behaviour and output can be observed. The translator converts or executes the source code. Debugging tools are useful additional context, not a fifth required facility.',
        items: [
          { label: '1. Editor', text: 'Create and change source code.' },
          { label: '2. Error diagnostics', text: 'Identify reported errors and where they were detected.' },
          { label: '3. Run-time environment', text: 'Execute the program and observe its behaviour.' },
          { label: '4. Translator', text: 'Compile or interpret the source code as required.' }
        ]
      }
    ]
  };

  const escapeTeachingHTML = value => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const visualTeachingPatterns = {
    '1.2.1:0': `
      <figure class="concept-visual" aria-labelledby="memory-path-title">
        <figcaption id="memory-path-title"><strong>Where the CPU gets instructions and data</strong></figcaption>
        <div class="memory-map" role="img" aria-label="The CPU uses three types of primary storage. Cache holds frequently used data and instructions close to the CPU. RAM holds programs and data currently in use. ROM keeps startup instructions without power. When RAM is full, less-used data can move between RAM and virtual memory, which is an area of slower secondary storage.">
          <span class="concept-node concept-node--strong">CPU<small>executes instructions</small></span>
          <span class="concept-arrow" aria-hidden="true">↔</span>
          <div class="memory-map__stores"><strong>Primary storage</strong><span class="concept-node">Cache<small>frequently used data and instructions</small></span><span class="concept-node">RAM<small>programs and data currently in use</small></span><span class="concept-node concept-node--side">ROM<small>startup instructions retained without power</small></span></div>
          <div class="memory-map__virtual"><strong>When RAM is full:</strong> less-used data ↔ <b>virtual memory</b><small>an area of slower secondary storage</small></div>
        </div>
        <p class="concept-visual-note">RAM is volatile. ROM is non-volatile. Cache reduces the time the CPU waits for frequently used data and instructions.</p>
      </figure>`,
    '1.2.3:0': `
      <figure class="concept-visual" aria-labelledby="unit-ladder-title">
        <figcaption id="unit-ladder-title"><strong>Move along the storage-unit ladder</strong></figcaption>
        <div class="unit-ladder" role="img" aria-label="Bit to byte uses eight bits per byte. Byte to kilobyte, megabyte, gigabyte, terabyte and petabyte uses one thousand of each smaller unit under the OCR convention.">
          <span>bit</span><b>÷ 8 →</b><span>byte</span><b>÷ 1,000 →</b><span>KB</span><b>÷ 1,000 →</b><span>MB</span><b>÷ 1,000 →</b><span>GB</span><b>÷ 1,000 →</b><span>TB</span><b>÷ 1,000 →</b><span>PB</span>
        </div>
        <p class="concept-visual-note"><strong>Going back:</strong> multiply at each step. Always follow the convention stated in the question.</p>
      </figure>`,
    '1.2.4a:0': `
      <figure class="concept-visual" aria-labelledby="binary-place-title">
        <figcaption id="binary-place-title"><strong>Use place values to read a binary number</strong></figcaption>
        <div class="binary-place-grid" role="img" aria-label="Binary 101101 has place values 32, 16, 8, 4, 2 and 1. The active place values are 32, 8, 4 and 1, which total 45.">
          <div><small>place value</small><span>32</span><span>16</span><span>8</span><span>4</span><span>2</span><span>1</span></div>
          <div><small>binary digit</small><b class="is-on">1</b><b>0</b><b class="is-on">1</b><b class="is-on">1</b><b>0</b><b class="is-on">1</b></div>
        </div>
        <p class="concept-visual-note"><strong>101101 = 32 + 8 + 4 + 1 = 45.</strong> For hexadecimal, group a binary number into sets of four bits from the right.</p>
      </figure>`,
    '1.2.4d:0': `
      <figure class="concept-visual" aria-labelledby="sound-sampling-title">
        <figcaption id="sound-sampling-title"><strong>Sampling measures a sound wave at regular times</strong></figcaption>
        <svg class="sampling-wave" viewBox="0 0 760 190" role="img" aria-labelledby="sampling-wave-title sampling-wave-desc">
          <title id="sampling-wave-title">A sound wave measured at regular sample points</title>
          <desc id="sampling-wave-desc">A curved sound wave crosses eight evenly spaced sample lines. Dots show the measured amplitude at each sample time. More samples per second represent the wave in more detail.</desc>
          <path class="sampling-axis" d="M35 95 H730 M35 20 V170"/>
          <path class="sampling-line" d="M35 95 C90 15 145 15 200 95 S310 175 365 95 S475 15 530 95 S640 175 695 95"/>
          <g class="sampling-points"><circle cx="90" cy="37" r="7"/><circle cx="175" cy="65" r="7"/><circle cx="260" cy="153" r="7"/><circle cx="345" cy="123" r="7"/><circle cx="430" cy="37" r="7"/><circle cx="515" cy="75" r="7"/><circle cx="600" cy="153" r="7"/><circle cx="685" cy="110" r="7"/></g>
          <g class="sampling-guides"><path d="M90 25 V165 M175 25 V165 M260 25 V165 M345 25 V165 M430 25 V165 M515 25 V165 M600 25 V165 M685 25 V165"/></g>
        </svg>
        <div class="visual-equation"><strong>file size in bits</strong><span>=</span><span>sample rate</span><span>×</span><span>duration</span><span>×</span><span>bit depth</span></div>
        <p class="concept-visual-note">A higher sample rate records the wave more often. A greater bit depth provides more possible amplitude values. Both normally improve representation and increase file size.</p>
      </figure>`,
    '1.2.5:0': `
      <figure class="concept-visual" aria-labelledby="compression-title">
        <figcaption id="compression-title"><strong>Compression represents the same content with fewer bits</strong></figcaption>
        <div class="compression-strip" role="img" aria-label="Six repeated letter A values followed by four letter B values can be represented as six A and four B using run-length encoding.">
          <div><small>before</small><span>A</span><span>A</span><span>A</span><span>A</span><span>A</span><span>A</span><span>B</span><span>B</span><span>B</span><span>B</span></div>
          <b aria-hidden="true">→</b>
          <div><small>RLE</small><span>6 × A</span><span>4 × B</span></div>
        </div>
        <p class="concept-visual-note">This run-length example is lossless: the original sequence can be rebuilt exactly. Lossy compression permanently removes selected data.</p>
      </figure>`,
    '1.3.1:0': `
      <figure class="concept-visual" aria-labelledby="school-network-title">
        <figcaption id="school-network-title"><strong>A school star network</strong></figcaption>
        <div class="concept-map" role="img" aria-label="A central switch has separate direct connections to desktop computers, a server, a wireless access point and a router. The router then connects the local network to the Internet."><div><strong>Central switch</strong><span>direct connection</span><small>Computers with NICs</small></div><div><strong>Central switch</strong><span>direct connection</span><small>Server</small></div><div><strong>Central switch</strong><span>direct connection</span><small>Wireless access point</small></div><div><strong>Central switch</strong><span>direct connection</span><small>Router → Internet</small></div></div>
        <p class="concept-visual-note">A wireless access point also connects to the switch. If one device cable fails, other devices can still work; if the central switch fails, connected devices lose the LAN connection.</p>
        <details><summary>Check the school-network recommendation</summary><p>Client-server fits central accounts and managed backups. A star layout through switches makes individual links easier to trace and a single device-link failure does not stop every device. A complete answer should also note server/switch cost or the central-switch risk.</p></details>
      </figure>`,
    '1.5.1:0': `
      <figure class="concept-visual" aria-labelledby="os-task-title">
        <figcaption id="os-task-title"><strong>One pupil task uses several OS functions</strong></figcaption>
        <div class="concept-map"><div><strong>Edit and play audio</strong><span>multitasking</span><small>shares processor time</small></div><div><strong>Keep both running</strong><span>memory management</span><small>allocates RAM</small></div><div><strong>Open and save</strong><span>file management</span><small>finds and stores files</small></div><div><strong>Print</strong><span>peripheral management</span><small>uses the printer driver</small></div></div>
        <details><summary>Check the OS-function matching task</summary><p>Switching programs: multitasking. Opening a folder: file management. Blocking another user: user management and access rights. Printing: peripheral management through a device driver.</p></details>
      </figure>`,
    '1.3.1:2': `
      <figure class="concept-visual" aria-labelledby="dns-journey-title">
        <figcaption id="dns-journey-title"><strong>From a web address to a web page</strong></figcaption>
        <ol class="concept-steps">
          <li><span>1</span><strong>Enter URL</strong><small>The client knows the domain name.</small></li>
          <li><span>2</span><strong>Ask DNS</strong><small>DNS returns the matching IP address.</small></li>
          <li><span>3</span><strong>Contact server</strong><small>The client requests the hosted page.</small></li>
          <li><span>4</span><strong>Receive page</strong><small>The server sends the requested content.</small></li>
        </ol>
      </figure>`,
    '1.3.2:2': `
      <figure class="concept-visual" aria-labelledby="protocol-journey-title">
        <figcaption id="protocol-journey-title"><strong>Choose the protocol for the job</strong></figcaption>
        <div class="concept-map concept-map--protocols">
          <div><strong>Web page</strong><span>HTTP</span><small>HTTPS adds encrypted communication</small></div>
          <div><strong>Send email</strong><span>SMTP</span><small>Moves outgoing mail</small></div>
          <div><strong>Receive email</strong><span>POP / IMAP</span><small>Download or synchronise messages</small></div>
          <div><strong>Transfer files</strong><span>FTP</span><small>Moves files between systems</small></div>
        </div>
        <p class="concept-visual-note">TCP/IP supports communication across networks. Layers separate jobs so systems can remain compatible and faults are easier to isolate.</p>
      </figure>`,
    '2.1.2:0': `
      <figure class="concept-visual" aria-labelledby="trace-table-title">
        <figcaption id="trace-table-title"><strong>Find the first point where the trace goes wrong</strong></figcaption>
        <div class="table-scroll" tabindex="0"><table class="concept-table"><thead><tr><th>Value used</th><th>Expected total</th><th>Faulty total</th></tr></thead><tbody><tr><td>Start</td><td>0</td><td>0</td></tr><tr class="concept-table-alert"><td>3</td><td>3</td><td>skipped</td></tr><tr><td>5</td><td>8</td><td>5</td></tr><tr><td>2</td><td>10</td><td>7</td></tr></tbody></table></div>
        <p class="concept-visual-note">The first difference is the skipped value 3. Correct the starting index, then repeat the test.</p>
      </figure>`,
    '2.1.3:0': `
      <figure class="concept-visual" aria-labelledby="search-steps-title">
        <figcaption id="search-steps-title"><strong>Linear search follows one clear route</strong></figcaption>
        <div class="algorithm-strips">
          <div><strong>Find 7</strong><small>indexes: 0 · 1 · 2 · 3</small><span><i class="is-checked">4</i><i class="is-checked">9</i><i class="is-found">7</i><i>2</i></span><small>Stop when 7 is found at index 2.</small></div>
        </div>
        <details><summary>Check your trace for finding 2</summary><p>Check 4, 9, 7, then 2. The target is at index 3.</p></details>
      </figure>`,
    '2.1.3:1': `
      <figure class="concept-visual" aria-labelledby="binary-search-title">
        <figcaption id="binary-search-title"><strong>Binary search reduces the search area</strong></figcaption>
        <div class="algorithm-strips"><div><strong>Find 7</strong><span><i>1</i><i>3</i><i class="is-checked">5</i><i class="is-found">7</i><i>9</i></span><small>5 is too small: discard 1, 3 and 5. Then check 7.</small></div></div>
        <details><summary>Check your trace for finding 9</summary><p>Check 5; keep [7, 9]. Using the lower middle, check 7; keep [9]. Check 9: found.</p></details>
      </figure>`,
    '2.1.3:2': `
      <figure class="concept-visual" aria-labelledby="bubble-sort-title">
        <figcaption id="bubble-sort-title"><strong>Bubble sort: one complete pass</strong></figcaption>
        <div class="algorithm-strips"><div><strong>Compare neighbours</strong><span><i class="is-checked">3</i><i class="is-checked">1</i><i>2</i></span><span class="algorithm-next" aria-hidden="true">→</span><span><i>1</i><i class="is-checked">3</i><i class="is-checked">2</i></span><span class="algorithm-next" aria-hidden="true">→</span><span><i>1</i><i>2</i><i>3</i></span></div></div>
        <details><summary>Check your first pass for [4, 2, 3, 1]</summary><p>[2, 4, 3, 1] → [2, 3, 4, 1] → [2, 3, 1, 4]. The 4 has moved to its final position.</p></details>
      </figure>`,
    '2.1.3:3': `
      <figure class="concept-visual" aria-labelledby="insertion-sort-title">
        <figcaption id="insertion-sort-title"><strong>Insertion sort grows the sorted section</strong></figcaption>
        <div class="algorithm-strips"><div><strong>Insert one item</strong><span><i class="is-found">3</i><i>1</i><i>2</i></span><span class="algorithm-next" aria-hidden="true">→</span><span><i class="is-found">1</i><i class="is-found">3</i><i>2</i></span><span class="algorithm-next" aria-hidden="true">→</span><span><i class="is-found">1</i><i class="is-found">2</i><i class="is-found">3</i></span></div></div>
        <details><summary>Check your insertions for [5, 2, 4, 1]</summary><p>[5 | 2, 4, 1] → [2, 5 | 4, 1] → [2, 4, 5 | 1] → [1, 2, 4, 5].</p></details>
      </figure>`,
    '2.1.3:4': `
      <figure class="concept-visual" aria-labelledby="merge-sort-title">
        <figcaption id="merge-sort-title"><strong>Merge sort: show every split and merge</strong></figcaption>
        <div class="state-trace" role="img" aria-label="The list 6, 2, 5, 1 splits into two pairs, then single items. The items merge into sorted pairs, then into 1, 2, 5, 6."><span>[6, 2, 5, 1]</span><b aria-hidden="true">split →</b><span>[6, 2] [5, 1]</span><b aria-hidden="true">split →</b><span>[6] [2] [5] [1]</span><b aria-hidden="true">merge →</b><span>[2, 6] [1, 5]</span><b aria-hidden="true">merge →</b><span class="is-result">[1, 2, 5, 6]</span></div>
        <details><summary>Check your split and merge for [7, 3, 6, 2]</summary><p>Split to [7, 3] [6, 2], then [7] [3] [6] [2]. Merge to [3, 7] [2, 6], then merge to [2, 3, 6, 7].</p></details>
      </figure>`,
    '2.2.1:0': `
      <figure class="concept-visual" aria-labelledby="loop-trace-title">
        <figcaption id="loop-trace-title"><strong>Watch the variable change after each loop</strong></figcaption>
        <div class="state-trace" role="img" aria-label="Total starts at zero. After adding one it is one, after adding two it is three, and after adding three it is six.">
          <span><small>start</small>total = 0</span><b aria-hidden="true">+ 1 →</b><span><small>pass 1</small>total = 1</span><b aria-hidden="true">+ 2 →</b><span><small>pass 2</small>total = 3</span><b aria-hidden="true">+ 3 →</b><span class="is-result"><small>pass 3</small>total = 6</span>
        </div>
        <p class="concept-visual-note">Record the value after every pass. For a nested loop, repeat the inner loop each time the outer loop advances.</p>
      </figure>`,
    '2.2.3:0': `
      <figure class="concept-visual" aria-labelledby="array-change-title">
        <figcaption id="array-change-title"><strong>Indexes identify positions in an array</strong></figcaption>
        <div class="array-change" role="img" aria-label="The array contains 4, 7 and 2 at indexes zero, one and two. Assigning nine to index one changes only the middle value, giving 4, 9 and 2.">
          <div><small>index</small><span>0</span><span>1</span><span>2</span></div>
          <div><small>before</small><b>4</b><b class="is-changing">7</b><b>2</b></div>
          <p>scores[1] = 9</p>
          <div><small>after</small><b>4</b><b class="is-result">9</b><b>2</b></div>
        </div>
      </figure>`,
    '2.3.1:0': `
      <figure class="concept-visual" aria-labelledby="login-design-title">
        <figcaption id="login-design-title"><strong>Keep validation and authentication separate</strong></figcaption>
        <ol class="concept-steps">
          <li><span>1</span><strong>Input</strong><small>Receive username and password.</small></li>
          <li><span>2</span><strong>Validate</strong><small>If a field is blank or too long, explain the rule and ask again.</small></li>
          <li><span>3</span><strong>Authenticate</strong><small>Only valid-form input reaches the secure identity check.</small></li>
          <li><span>4</span><strong>Respond safely</strong><small>Allow access or give a neutral retry message without revealing which field matched.</small></li>
        </ol>
        <p class="concept-visual-note"><strong>Pseudocode plan:</strong> repeat input until presence and length checks pass; call the authentication process; then allow access or record a failed attempt.</p>
      </figure>`,
    '2.3.2:0': `
      <figure class="concept-visual" aria-labelledby="test-cycle-title">
        <figcaption id="test-cycle-title"><strong>A failed test is the start of a cycle</strong></figcaption>
        <ol class="concept-steps concept-steps--cycle">
          <li><span>1</span><strong>Predict</strong><small>Write the expected result.</small></li>
          <li><span>2</span><strong>Run</strong><small>Record the actual result.</small></li>
          <li><span>3</span><strong>Fix</strong><small>Correct the underlying cause.</small></li>
          <li><span>4</span><strong>Retest</strong><small>Repeat this and relevant earlier tests.</small></li>
        </ol>
      </figure>`,
    '2.5.1:0': `
      <figure class="concept-visual" aria-labelledby="translation-flow-title">
        <figcaption id="translation-flow-title"><strong>Why source code needs translating</strong></figcaption>
        <div class="concept-flow" role="img" aria-label="A programmer writes human-readable source code. A compiler or interpreter translates it into instructions that a processor can execute.">
          <span class="concept-node">Source code<small>readable by people</small></span><span class="concept-arrow" aria-hidden="true">→</span><span class="concept-node concept-node--strong">Translator<small>compiler or interpreter</small></span><span class="concept-arrow" aria-hidden="true">→</span><span class="concept-node">Machine instructions<small>executed by the CPU</small></span>
        </div>
      </figure>`,
    '2.5.2:0': `
      <figure class="concept-visual" aria-labelledby="ide-map-title">
        <figcaption id="ide-map-title"><strong>The four OCR IDE facilities working together</strong></figcaption>
        <div class="ide-map" role="img" aria-label="The editor contains source code, diagnostics identify reported errors, the translator converts or executes the code, and the run-time environment shows the running program and output.">
          <div class="ide-editor"><strong>Editor</strong><code>score = score + 1</code><code>print(score)</code></div>
          <div class="ide-diagnostic"><strong>Error diagnostics</strong><small>Reports a problem and its location</small></div>
          <div class="ide-translator"><strong>Translator</strong><small>Compiles or interprets source code</small></div>
          <div class="ide-runtime"><strong>Run-time environment</strong><samp>Output: 6</samp></div>
        </div>
      </figure>`
  };

  const renderStructuredTeaching = (section, visual) => `
    <p>${escapeTeachingHTML(section.body)}</p>
    ${visual}
    ${Array.isArray(section.items) && section.items.length ? `<dl class="student-teaching-points">${section.items.map(point => `<div><dt>${escapeTeachingHTML(point.label)}</dt><dd>${escapeTeachingHTML(point.text)}</dd></div>`).join('')}</dl>` : ''}
  `;

  return content.map(item => {
    const reviewedExpansion = coverageExpansionSections[item.id] || [];
    let sections = reviewedExpansion.length ? reviewedExpansion : (teachingSections[item.id] || []);
    if (item.id === '2.2.3') sections = [reviewedExpansion[0], reviewedExpansion[1], reviewedExpansion[2], reviewedExpansion[reviewedExpansion.length - 1]];
    if (item.id === '2.2.ERL') sections = reviewedExpansion.slice(0, 2);
    sections = sections.map((section, index) => {
      const visual = visualTeachingPatterns[`${item.id}:${index}`];
      return visual ? { ...section, html: renderStructuredTeaching(section, visual) } : section;
    });
    const honestReviewMinutes = sections.reduce((total, section) => total + (Number(section.minutes) || 3), 0);
    return {
      ...item,
      requiredKnowledge: item.scope.split(';').map(part => part.trim()).filter(Boolean),
      prerequisiteSpecificationPointIds: prerequisites[item.id] || [],
      teachingSections: sections,
      requiredSkills: assessmentModes[item.id] || ['recall'],
      assessmentModes: assessmentModes[item.id] || ['recall'],
      supportedPractice: supportedPractice[item.id],
      workload: {
        coreLearningMinutes: honestReviewMinutes,
        retrievalMinutes: 5,
        retryMinutes: 5,
        retrievalIsOptional: true
      },
      qualityStatus: 'implemented-against-j277-v3.1-awaiting-qualified-teacher-qa'
    };
  });
});
