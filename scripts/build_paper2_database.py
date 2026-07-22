import os

# New Paper 2 questions to add
paper2_questions = [
    # Topic 2.1: Algorithms
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
            {"label": "Parallelogram", "match": "Represents Input or Output of data"},
            {"label": "Rectangle", "match": "Represents a Process or calculation block"},
            {"label": "Diamond", "match": "Represents a Decision block (e.g. Yes/No)"},
            {"label": "Oval / Rounded Rectangle", "match": "Represents a Terminal start or end point"}
        ],
        "explanation": "Parallelograms represent input/output; rectangles represent processes; diamonds represent decisions; ovals/rounded rectangles represent terminals."
    },

    # Topic 2.2: Programming Fundamentals
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
            {"label": "DIV (//)", "match": "Quotient division - returns the whole number of times a division fits"},
            {"label": "MOD (%)", "match": "Modulo division - returns only the remainder left over from a division"},
            {"label": "/ (slash)", "match": "Real division - returns the full mathematical division result including decimal"}
        ],
        "explanation": "DIV returns the quotient; MOD returns the remainder; / returns a decimal float."
    },

    # Topic 2.3: Robust Programming
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
            {"label": "Normal Test Data", "match": "Data that the system should accept easily without errors"},
            {"label": "Boundary Test Data", "match": "Valid data that is on the absolute limits of acceptability"},
            {"label": "Invalid Test Data", "match": "Data of the correct type but outside the valid range that should be rejected"},
            {"label": "Erroneous Test Data", "match": "Data of the completely wrong data type that should be rejected"}
        ],
        "explanation": "Normal is standard valid data; Boundary is edge valid data; Invalid is out-of-range data; Erroneous is wrong type data (e.g., text instead of number)."
    },

    # Topic 2.4: Boolean Logic
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
            {"label": "AND Gate", "match": "Output is 1 only when A is 1 and B is 1"},
            {"label": "OR Gate", "match": "Output is 1 if A is 1, or B is 1, or both are 1"},
            {"label": "NOT Gate", "match": "Output is the exact opposite of the input line"}
        ],
        "explanation": "AND requires both; OR requires either or both; NOT inverts input."
    },

    # Topic 2.5: Translators and IDEs
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
            {"label": "Editor", "match": "Text entry area with auto-indentation and syntax color highlighting"},
            {"label": "Error Diagnostics", "match": "Highlights syntax errors and points out where bugs exist before execution"},
            {"label": "Debugger", "match": "Allows stepping through code line-by-line and viewing variable states in real-time"},
            {"label": "Runtime Environment", "match": "Enables the user to run the program within a controlled test area"}
        ],
        "explanation": "Editor supports typing; Diagnostics highlights compile-time errors; Debugger checks values in real-time; Runtime environment executes the code."
    }
]

paper2_written_questions = [
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
            {"phrase": "search one-by-one", "feedback": "Searching one-by-one describes a Linear Search. Binary Search must divide the list in half."}
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
            {"phrase": "physical security", "feedback": "Defensive design refers to code-level safeguards and input handling, not physical security like locking server rooms."}
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
            {"phrase": "both at once", "feedback": "A programming language translator cannot compile and interpret a program at the same time; it must choose one translation pipeline."}
        ]
    }
]

def append_paper2_database():
    db_file = os.path.join("C:\\Users\\johnp\\.gemini\\antigravity\\scratch\\gcse-computer-science", "database.js")
    
    with open(db_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Let's check if the new questions are already present
    if "q_2_1_a" in content:
        print("Paper 2 questions already expanded.")
        return

    print("Expanding database with Paper 2...")
    
    # Let's locate the 'questions: [' line in defaultDatabase
    parts = content.split("  questions: [\n")
    if len(parts) != 2:
        print("Error: Could not find questions array in database.js")
        return
        
    import json
    questions_js = ""
    for q in paper2_questions:
        questions_js += f"    {json.dumps(q, indent=6).strip()},\n"
        
    questions_part = parts[0] + "  questions: [\n" + questions_js + parts[1]
    
    # Now let's do the same for writtenQuestions
    parts = questions_part.split("  writtenQuestions: [\n")
    if len(parts) != 2:
        print("Error: Could not find writtenQuestions array in database.js")
        return
        
    wq_js = ""
    for wq in paper2_written_questions:
        wq_js += f"    {json.dumps(wq, indent=6).strip()},\n"
        
    expanded_content = parts[0] + "  writtenQuestions: [\n" + wq_js + parts[1]
    
    # Increment schemaVersion to 3
    expanded_content = expanded_content.replace("schemaVersion: 2,", "schemaVersion: 3,")
    
    with open(db_file, 'w', encoding='utf-8') as f:
        f.write(expanded_content)
        
    print("Database successfully expanded with Paper 2 questions and answers!")

if __name__ == "__main__":
    append_paper2_database()
