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
    '1.1.1': 'Draw a three-step flow diagram for the fetch stage. Show the address moving from the PC to the MAR, then the instruction moving from memory to the MDR and on to the control unit. Add where the PC increases. Finish with one sentence explaining the difference between the MAR and MDR.',
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
          <p style="font-size: 13.5px; color: var(--text-muted); margin-bottom: 12px;">The CPU is the "brain" of the computer that processes data and instructions. It consists of three primary components:</p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; margin-bottom: 16px;">
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-top: 4px solid var(--teal); padding: 12px; border-radius: 8px;">
              <strong style="color: var(--teal); font-size: 13.5px; display: block; margin-bottom: 4px;">🕹️ Control Unit (CU)</strong>
              <ul style="font-size: 12px; color: var(--text-main); padding-left: 16px; margin: 0; line-height: 1.5;">
                <li>Coordinates all CPU activities &amp; F-D-E cycle</li>
                <li>Decodes fetched instructions</li>
                <li>Sends control signals to hardware</li>
              </ul>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-top: 4px solid #3B82F6; padding: 12px; border-radius: 8px;">
              <strong style="color: #60A5FA; font-size: 13.5px; display: block; margin-bottom: 4px;">🧮 Arithmetic Logic Unit (ALU)</strong>
              <ul style="font-size: 12px; color: var(--text-main); padding-left: 16px; margin: 0; line-height: 1.5;">
                <li>Performs arithmetic math (+ - * /)</li>
                <li>Performs logical decisions (AND, OR, NOT)</li>
                <li>Sends output results to Accumulator</li>
              </ul>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-top: 4px solid #10B981; padding: 12px; border-radius: 8px;">
              <strong style="color: #6EE7B7; font-size: 13.5px; display: block; margin-bottom: 4px;">⚡ Cache Memory</strong>
              <ul style="font-size: 12px; color: var(--text-main); padding-left: 16px; margin: 0; line-height: 1.5;">
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
          <p style="font-size: 13.5px; color: var(--text-muted); margin-bottom: 12px;">Registers are superfast, tiny memory locations built directly inside the CPU chip:</p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; margin-bottom: 16px;">
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-left: 4px solid #F59E0B; padding: 12px; border-radius: 8px;">
              <strong style="color: #FCD34D; font-size: 13px;">📍 Program Counter (PC)</strong>
              <p style="font-size: 12px; color: var(--text-main); margin: 4px 0 0 0; line-height: 1.4;">
                Holds the memory address of the <strong>NEXT instruction</strong> to be fetched from RAM. Increments by 1 after each fetch.
              </p>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-left: 4px solid #EC4899; padding: 12px; border-radius: 8px;">
              <strong style="color: #F472B6; font-size: 13px;">🔍 Memory Address Register (MAR)</strong>
              <p style="font-size: 12px; color: var(--text-main); margin: 4px 0 0 0; line-height: 1.4;">
                Holds the memory <strong>address</strong> of the data or instruction currently being read from (or written to) RAM.
              </p>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-left: 4px solid #38BDF8; padding: 12px; border-radius: 8px;">
              <strong style="color: #38BDF8; font-size: 13px;">📦 Memory Data Register (MDR)</strong>
              <p style="font-size: 12px; color: var(--text-main); margin: 4px 0 0 0; line-height: 1.4;">
                Holds the actual <strong>data or instruction value</strong> fetched from RAM (or waiting to be written back to RAM).
              </p>
            </div>
            <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-left: 4px solid #10B981; padding: 12px; border-radius: 8px;">
              <strong style="color: #6EE7B7; font-size: 13px;">🎯 Accumulator (ACC)</strong>
              <p style="font-size: 12px; color: var(--text-main); margin: 4px 0 0 0; line-height: 1.4;">
                Temporarily holds the <strong>intermediate results</strong> of arithmetic calculations performed by the ALU.
              </p>
            </div>
          </div>
        `
      },
      {
        heading: 'Step-by-Step Fetch-Decode-Execute Cycle',
        body: 'In the Fetch phase, the address in the Program Counter is copied to the Memory Address Register, and the instruction is retrieved from RAM into the Memory Data Register before PC increments. In the Decode phase, the Control Unit decodes the instruction. In the Execute phase, the instruction is carried out and results are stored in the Accumulator.',
        html: `
          <div style="background: rgba(45, 156, 145, 0.08); border: 1px solid var(--teal); padding: 14px; border-radius: 8px;">
            <strong style="color: var(--teal); font-size: 13.5px; display: block; margin-bottom: 8px;">🔄 How Registers Work Together in the F-D-E Cycle:</strong>
            <ol style="font-size: 12.5px; color: var(--text-main); padding-left: 18px; margin: 0; line-height: 1.6;">
              <li><strong>Fetch:</strong> The address in <code>PC</code> is copied to <code>MAR</code>. The CPU fetches the instruction from RAM at that address into <code>MDR</code>. <code>PC</code> increments by 1.</li>
              <li><strong>Decode:</strong> The <code>Control Unit (CU)</code> decodes the instruction in <code>MDR</code> to determine the action required.</li>
              <li><strong>Execute:</strong> The instruction is executed (e.g. <code>ALU</code> performs math). Any intermediate calculation result is stored in the <code>Accumulator (ACC)</code>.</li>
            </ol>
          </div>
        `
      }
    ],
    '1.1.2': [
      { heading: 'Clock speed and cache', body: 'Clock speed is the number of processor cycles per second. A higher clock speed can allow more instructions to be processed in a given time, but comparison is meaningful only when other factors are considered. A larger cache can reduce the time spent waiting for instructions and data from slower main memory.' },
      { heading: 'Cores and limitations', body: 'Each processor core can execute its own instruction stream. Multiple cores can improve performance when software divides work into parts that can run at the same time. They do not automatically multiply speed: sequential work, coordination overhead and other system bottlenecks can limit the gain.' }
    ],
    '1.1.3': [
      { heading: 'Purpose and characteristics', body: 'An embedded system is a computer built into a larger product to perform a dedicated function. Its hardware and software are selected for that job, often with limits on cost, power use, memory and processing. Unlike a general-purpose computer, it is not designed for the user to install many unrelated applications.' },
      { heading: 'Inputs, processing and outputs', body: 'Embedded systems commonly read sensors, process their data and control an output. A washing machine controller reads settings and sensors before controlling valves and a motor. A traffic-light controller reads timing or traffic inputs before changing lights. The whole product is not the embedded system; the controller inside it is.' }
    ],
    '1.2.1': [
      { heading: 'RAM and ROM', body: 'RAM stores programs and data currently being used. It is volatile, so its contents are lost when power is removed, and it can be read from and written to. ROM is non-volatile and normally stores instructions that should remain available, such as startup instructions; its contents do not normally change during ordinary use.' },
      { heading: 'Virtual memory and cache', body: 'When RAM is insufficient, the operating system can use part of secondary storage as virtual memory. This lets programs continue but is slower because secondary storage has a longer access time and data must be transferred between it and RAM. Cache is different: it is fast memory close to the CPU used to reduce waiting.' }
    ],
    '1.2.2': [
      { heading: 'Storage technologies', body: 'Magnetic storage records data by magnetising a surface and often offers high capacity at low cost. Optical storage uses laser-readable marks on removable discs. Solid-state storage uses electronic circuits with no moving parts, making it fast, quiet and resistant to movement, although cost per unit of capacity may be higher.' },
      { heading: 'Choosing storage in context', body: 'A justified choice must use the needs of the scenario. Compare capacity, speed, portability, durability, reliability and cost rather than claiming one technology is always best. An archive may prioritise capacity and cost, while a portable camera may prioritise low power use, durability and resistance to movement.' }
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
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; margin-bottom: 16px;">
            <div style="border-top: 3px solid var(--teal); padding-top: 8px;">
              <strong style="color: var(--teal); font-size: 13.5px; display: block; margin-bottom: 4px;">🏢 Local Area Network (LAN)</strong>
              <ul style="font-size: 12.5px; color: var(--text-main); padding-left: 16px; margin: 0; line-height: 1.5;">
                <li>Covers a small geographical site (e.g. school, office, home).</li>
                <li>Hardware &amp; cabling owned and managed by one organisation.</li>
              </ul>
            </div>
            <div style="border-top: 3px solid #3B82F6; padding-top: 8px;">
              <strong style="color: #3B82F6; font-size: 13.5px; display: block; margin-bottom: 4px;">🌍 Wide Area Network (WAN)</strong>
              <ul style="font-size: 12.5px; color: var(--text-main); padding-left: 16px; margin: 0; line-height: 1.5;">
                <li>Connects networks across large geographical distances (cities/countries).</li>
                <li>Uses third-party telecommunication infrastructure (e.g. satellites, undersea fiber).</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        heading: 'Essential Network Hardware & Roles',
        body: 'Switches connect devices inside a LAN by reading MAC addresses to direct data packets to specific target ports. Routers connect different networks together using IP addresses to route data across networks. Wireless Access Points (WAPs) convert wired network signals into Wi-Fi radio waves. Network Interface Controllers (NICs) allow devices to physically connect to a network.',
        html: `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin-bottom: 16px;">
            <div style="border-left: 3px solid var(--teal); padding-left: 12px;">
              <strong style="color: var(--teal); font-size: 13px;">🔌 Switch</strong>
              <p style="font-size: 12px; color: var(--text-main); margin: 3px 0 0 0; line-height: 1.4;">
                Connects devices inside a LAN. Reads MAC addresses to direct data packets to the specific target device.
              </p>
            </div>
            <div style="border-left: 3px solid #3B82F6; padding-left: 12px;">
              <strong style="color: #3B82F6; font-size: 13px;">🌐 Router</strong>
              <p style="font-size: 12px; color: var(--text-main); margin: 3px 0 0 0; line-height: 1.4;">
                Connects different networks together (e.g. LAN to Internet). Routes data packets across networks using IP addresses.
              </p>
            </div>
            <div style="border-left: 3px solid #10B981; padding-left: 12px;">
              <strong style="color: #10B981; font-size: 13px;">📶 WAP (Wireless Access Point)</strong>
              <p style="font-size: 12px; color: var(--text-main); margin: 3px 0 0 0; line-height: 1.4;">
                Converts wired network data into wireless radio signals (Wi-Fi) so mobile devices can connect to the LAN.
              </p>
            </div>
            <div style="border-left: 3px solid #F59E0B; padding-left: 12px;">
              <strong style="color: #F59E0B; font-size: 13px;">💳 NIC (Network Interface Controller)</strong>
              <p style="font-size: 12px; color: var(--text-main); margin: 3px 0 0 0; line-height: 1.4;">
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
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px;">
            <div style="border-top: 3px solid #38BDF8; padding-top: 8px;">
              <strong style="color: #38BDF8; font-size: 13.5px;">⭐ Star Topology</strong>
              <p style="font-size: 12px; color: var(--text-main); margin: 4px 0 0 0; line-height: 1.45;">
                All devices connect individually to a central switch. If one cable fails, only that device is affected. However, if central switch fails, whole network goes down.
              </p>
            </div>
            <div style="border-top: 3px solid #8B5CF6; padding-top: 8px;">
              <strong style="color: #8B5CF6; font-size: 13.5px;">🕸️ Mesh Topology</strong>
              <p style="font-size: 12px; color: var(--text-main); margin: 4px 0 0 0; line-height: 1.45;">
                Devices connect directly to multiple other nodes. Highly resilient with no single point of failure, but requires more cabling and setup cost.
              </p>
            </div>
          </div>
        `
      }
    ],
    '1.3.2': [
      { heading: 'Connections and addressing', body: 'Ethernet provides a wired connection, while Wi-Fi uses radio for local wireless networking and Bluetooth supports short-range device connections. An IP address identifies a device for communication across networks and may change; a MAC address identifies a network interface on the local network and is normally assigned to its hardware.' },
      { heading: 'Protocols', body: 'Protocols define how communicating devices format and exchange data. TCP/IP supports communication across networks; HTTP and HTTPS transfer web content, with HTTPS adding encryption and authentication; FTP transfers files; SMTP sends email, while POP and IMAP retrieve or synchronise it. Each answer should link a named protocol to its actual purpose.' },
      { heading: 'Standards and layers', body: 'Standards allow hardware and software from different organisations to work together. A layered protocol model separates communication into responsibilities. This supports independent development, replacement of one layer without redesigning everything, and easier fault finding. OCR does not require pupils to memorise the names and functions of every individual layer.' }
    ],
    '1.4.1': [
      { heading: 'Attacks on systems', body: 'Malware is software created to cause harm or gain unauthorised access. Brute-force attacks repeatedly guess credentials. Denial-of-service attacks overwhelm a service with requests. Data may also be intercepted or stolen while stored or transmitted. For each threat, distinguish how the attack operates from the damage it may cause.' },
      { heading: 'Attacks using people or input', body: 'Social engineering manipulates a person into revealing information or taking an unsafe action; phishing is one common method. SQL injection places malicious database instructions into unchecked input. These attacks exploit different weaknesses, so a useful explanation names the weakness, the attacker’s action and the intended outcome.' }
    ],
    '1.4.2': [
      { heading: 'Technical prevention', body: 'Anti-malware software detects or blocks malicious software. A firewall examines network traffic against configured rules. Encryption makes intercepted data unreadable without the key. Regular updates correct known weaknesses. Each measure reduces a particular risk but does not make a system immune to every attack.' },
      { heading: 'People, access and testing', body: 'Strong authentication, passwords and access levels limit who can reach data and what an authorised account can do. Physical security protects equipment directly. Penetration testing is authorised security work that uses attack techniques to identify weaknesses so they can be corrected; permission separates it from an illegal attack.' }
    ],
    '1.5.1': [
      { heading: 'Managing resources', body: 'An operating system provides a user interface and manages processor time, memory and multitasking. It allocates resources to running programs and keeps track of which memory is available. Multitasking rapidly schedules work from active programs; it does not mean one core literally executes every instruction at the same instant.' },
      { heading: 'Devices, users and files', body: 'The operating system uses drivers to communicate with peripherals. It creates and manages user accounts and access rights, and provides file operations such as naming, organising, saving and deleting files. These are operating-system responsibilities, while applications perform the user’s specific productive tasks.' }
    ],
    '1.5.2': [
      { heading: 'Utility software', body: 'Utilities perform maintenance or housekeeping tasks. Encryption utilities transform readable data so it needs the correct key; compression utilities reduce file size. Backup tools may also protect data in practice, but exam answers must use the utility functions named in the specification and match each one to its purpose.' },
      { heading: 'Defragmentation', body: 'On magnetic disks, parts of a file may be stored in separated locations. Defragmentation rearranges file blocks so related blocks are closer together, reducing movement of the read-write head. It is not a useful speed treatment for solid-state storage because solid-state devices have no moving read head.' }
    ],
    '1.6.1': [
      { heading: 'People and society', body: 'Technology can affect privacy, employment, access to services, working patterns, culture and relationships. A balanced response identifies affected stakeholders and develops both benefits and harms in the given context. An unsupported list of generic issues is weaker than explaining how a specific design or use produces an effect.' },
      { heading: 'Environmental effects', body: 'Manufacturing devices consumes finite resources and energy, while operation and data centres consume electricity. Replacing equipment creates electronic waste, which can contain valuable and hazardous materials. Longer product life, repair, reuse, responsible recycling and lower-energy operation can reduce some effects but may involve trade-offs.' }
    ],
    '1.6.2': [
      { heading: 'Data, access and creative work', body: 'The Data Protection Act 2018 governs responsible handling of personal data. The Computer Misuse Act 1990 addresses unauthorised access and related unauthorised acts. The Copyright, Designs and Patents Act 1988 protects creative work from unauthorised copying. Apply the correct law to the action rather than assuming every digital offence is “hacking”.' },
      { heading: 'Software licences', body: 'A proprietary licence restricts use, modification and redistribution according to its terms, and source code is normally unavailable. Open-source licences make source code available under stated conditions and may permit modification and redistribution. Open source does not mean there are no licence conditions, and proprietary software is not automatically paid software.' }
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
      { heading: 'Language levels and translators', body: 'High-level languages are designed to be readable and portable, while low-level languages are closely related to processor instructions and hardware. A processor cannot directly execute high-level source code, so a translator converts it into machine code.' },
      { heading: 'Compiler and interpreter', body: 'A compiler translates the whole program and reports errors after compilation, producing code that can run without the compiler. An interpreter translates and executes one statement at a time and normally stops at an error, which can support development. A justified choice depends on development, distribution and execution needs.' }
    ],
    '2.5.2': [
      { heading: 'Writing and running', body: 'An integrated development environment brings programming tools together. The editor supports entering and organising source code, syntax highlighting makes language elements easier to distinguish, and a translator or run-time environment allows the program to be executed during development.' },
      { heading: 'Finding faults', body: 'Error diagnostics identify a type and location of a detected problem. Debugging tools can pause execution, step through instructions and inspect variable values. These tools provide evidence about where a fault occurs, but the programmer must still understand the intended behaviour and correct its cause.' }
    ]
  };
  return content.map(item => ({
    ...item,
    requiredKnowledge: item.scope.split(';').map(part => part.trim()).filter(Boolean),
    prerequisiteSpecificationPointIds: prerequisites[item.id] || [],
    teachingSections: teachingSections[item.id] || [],
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
