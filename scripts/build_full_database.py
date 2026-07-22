import os

# New questions to add
new_questions = [
    # Topic 1.1: Systems Architecture
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
            {"label": "Control Unit (CU)", "match": "Manages the fetch-decode-execute cycle and controls the flow of data"},
            {"label": "Arithmetic Logic Unit (ALU)", "match": "Carries out mathematical calculations and logical comparisons"},
            {"label": "Accumulator (ACC)", "match": "Temporarily stores the results of calculations performed by the ALU"},
            {"label": "Program Counter (PC)", "match": "Holds the memory address of the next instruction to be fetched"}
        ],
        "explanation": "The CU manages flow; the ALU performs math/logic; the ACC holds ALU results; the PC keeps track of the next instruction address."
    },

    # Topic 1.2: Memory and Storage
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
            {"label": "Magnetic Storage", "match": "High capacity and low cost per gigabyte, but has moving parts"},
            {"label": "Solid State Storage", "match": "Extremely fast and durable, but has a higher cost per gigabyte"},
            {"label": "Optical Storage", "match": "Cheap and highly portable, but has low capacity and is easily scratched"}
        ],
        "explanation": "Magnetic uses platters (cheap, high capacity); Solid State uses microchips (fast, durable); Optical uses laser reflections (portable, cheap, low capacity)."
    },

    # Topic 1.3: Data Representation
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
            {"label": "Lossy Compression", "match": "Permanently removes data from the file to drastically reduce size"},
            {"label": "Lossless Compression", "match": "Reduces file size without losing any data, allowing perfect reconstruction"}
        ],
        "explanation": "Lossy removes data (lower quality, very small size); Lossless reorganizes data (same quality, moderate size reduction)."
    },

    # Topic 1.4: Networks and Protocols
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
            {"label": "HTTP / HTTPS", "match": "Used by web browsers to request and load web pages from web servers"},
            {"label": "TCP", "match": "Splits data into packets and reassembles them at the destination, checking for errors"},
            {"label": "SMTP", "match": "Used to send emails from a client device to an email server"},
            {"label": "IMAP", "match": "Retrieves emails from a server while keeping a copy on the server for multi-device sync"}
        ],
        "explanation": "HTTP/HTTPS loads web pages; TCP manages packets and reliability; SMTP sends mail; IMAP syncs mailbox across devices."
    },

    # Topic 1.5: Network Security
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
            {"label": "Penetration Testing", "match": "Simulating authorized attacks to identify and fix security vulnerabilities"},
            {"label": "Encryption", "match": "Scrambling data using an algorithm so it cannot be read without a key"},
            {"label": "User Access Levels", "match": "Limiting user privileges to ensure they only access files required for their role"}
        ],
        "explanation": "Pen testing finds weak spots; Encryption scrambles data; User Access Levels restrict access to prevent data leaks."
    },

    # Topic 1.6: Systems Software
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
            {"label": "Memory Management", "match": "Allocates space in RAM for active programs and handles virtual memory swap"},
            {"label": "Peripheral Management", "match": "Controls input and output hardware devices using device drivers"},
            {"label": "User Management", "match": "Handles usernames, passwords, user login sessions and permissions"}
        ],
        "explanation": "Memory management oversees RAM; Peripheral management communicates with devices; User management controls logins and permissions."
    },

    # Topic 1.7: Ethical, Legal, Cultural & Environmental
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
            {"label": "Freedom of Information Act 2000", "match": "Allows public access to data held by public authorities (like schools/councils)"},
            {"label": "Copyright Designs and Patents Act 1988", "match": "Protects intellectual property, making it illegal to copy software/media without license"},
            {"label": "Data Protection Act 2018", "match": "Forces organisations to process personal data lawfully and keep it secure"}
        ],
        "explanation": "FOIA provides public transparency; CDPA protects creators' intellectual work; DPA regulates data privacy."
    }
]

new_written_questions = [
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
            {"phrase": "double the speed", "feedback": "Avoid claiming that doubling cores will 'double the speed' of the computer, as there is communication overhead and some programs cannot run in parallel."}
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
            {"phrase": "adds memory", "feedback": "Note that virtual memory does not add physical RAM; it only uses secondary storage space as a temporary overflow."}
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
        "modelAnswer": "A mesh network has no single point of failure because all devices are interconnected; if one node fails, data packets can automatically find a different route, making it highly reliable. However, mesh topologies are expensive to install and complex to manage due to the amount of cabling and hardware configuration required. In contrast, a star network connects all devices to a central switch. This is cheaper and simpler to set up, but it has a single point of failure—if the central switch fails, the entire network goes down, whereas in a mesh, the network remains active.",
        "misconceptions": [
            {"phrase": "internet connection", "feedback": "Topologies define how computers connect to each other locally, not how they connect to the global Internet."}
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
            {"phrase": "continuous binary", "feedback": "A computer cannot store continuous values; sound must be broken down into distinct, discrete numeric samples."}
        ]
    }
]

# We will read database.js, parse it, merge the tables in defaultDatabase, and write it back.
def expand_database():
    db_file = os.path.join("C:\\Users\\johnp\\.gemini\\antigravity\\scratch\\gcse-computer-science", "database.js")
    
    with open(db_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Let's check if the new questions are already present
    if "q_1_1_a" in content:
        print("Database already expanded.")
        return

    print("Expanding database...")
    
    # Let's locate the 'questions: [' line in defaultDatabase
    # We can split the file by "questions: ["
    parts = content.split("  questions: [")
    if len(parts) != 2:
        print("Error: Could not find questions array in database.js")
        return
        
    # We want to insert our questions inside the array
    # Let's format the new questions to JSON/JS syntax
    import json
    questions_js = ""
    for q in new_questions:
        questions_js += f"    {json.dumps(q, indent=6).strip()},\n"
        
    questions_part = parts[0] + "  questions: [\n" + questions_js + parts[1]
    
    # Now let's do the same for writtenQuestions
    parts = questions_part.split("  writtenQuestions: [")
    if len(parts) != 2:
        print("Error: Could not find writtenQuestions array in database.js")
        return
        
    wq_js = ""
    for wq in new_written_questions:
        wq_js += f"    {json.dumps(wq, indent=6).strip()},\n"
        
    expanded_content = parts[0] + "  writtenQuestions: [\n" + wq_js + parts[1]
    
    # Update schemaVersion to 2
    # We can change `const defaultDatabase = {` to `const defaultDatabase = {\n  schemaVersion: 2,`
    expanded_content = expanded_content.replace("const defaultDatabase = {", "const defaultDatabase = {\n  schemaVersion: 2,")
    
    # In LocalDB loadData, ensure we check the schemaVersion:
    # Let's find:
    #       if (!raw) {
    #         this.cachedData = JSON.parse(JSON.stringify(defaultDatabase));
    #         localStorage.setItem(DB_KEY, JSON.stringify(this.cachedData));
    #       } else {
    #         this.cachedData = JSON.parse(raw);
    
    # We want to replace it with:
    #       if (!raw || !JSON.parse(raw).schemaVersion || JSON.parse(raw).schemaVersion < defaultDatabase.schemaVersion) {
    #         this.cachedData = JSON.parse(JSON.stringify(defaultDatabase));
    #         localStorage.setItem(DB_KEY, JSON.stringify(this.cachedData));
    #       } else {
    #         this.cachedData = JSON.parse(raw);
    
    old_load = """      if (!raw) {
        this.cachedData = JSON.parse(JSON.stringify(defaultDatabase));
        localStorage.setItem(DB_KEY, JSON.stringify(this.cachedData));
      } else {
        this.cachedData = JSON.parse(raw);"""
        
    new_load = """      const parsedRaw = raw ? JSON.parse(raw) : null;
      if (!raw || !parsedRaw.schemaVersion || parsedRaw.schemaVersion < defaultDatabase.schemaVersion) {
        this.cachedData = JSON.parse(JSON.stringify(defaultDatabase));
        localStorage.setItem(DB_KEY, JSON.stringify(this.cachedData));
      } else {
        this.cachedData = parsedRaw;"""

    expanded_content = expanded_content.replace(old_load, new_load)

    with open(db_file, 'w', encoding='utf-8') as f:
        f.write(expanded_content)
        
    print("Database successfully expanded with full Unit 1 questions and answers!")

if __name__ == "__main__":
    expand_database()
