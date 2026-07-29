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
    '1.1.1': 'Use a four-column table headed fetch, decode, execute and store. For fetch, place the PC address in the MAR, copy memory contents to the MDR, copy the instruction to the control unit and increment the PC. Then annotate which register stores an address and which stores data.',
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
  const longerCoreStrands = new Set(['1.2.4a', '1.2.4c', '1.2.4d', '1.3.1', '1.3.2', '1.6.1', '2.1.2', '2.1.3', '2.2.1', '2.2.3', '2.2.PY', '2.2.ERL', '2.3.2', '2.4.1']);
  return content.map(item => ({
    ...item,
    requiredKnowledge: item.scope.split(';').map(part => part.trim()).filter(Boolean),
    requiredSkills: assessmentModes[item.id] || ['recall'],
    assessmentModes: assessmentModes[item.id] || ['recall'],
    supportedPractice: supportedPractice[item.id],
    workload: {
      coreLearningMinutes: longerCoreStrands.has(item.id) ? 15 : 10,
      retrievalMinutes: 5,
      retryMinutes: 5,
      retrievalIsOptional: true
    },
    qualityStatus: 'implemented-against-j277-v3.1-awaiting-qualified-teacher-qa'
  }));
});
