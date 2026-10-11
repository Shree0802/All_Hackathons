// Placement Preparation Controller

const initialPlacementProfile = {
  targetRole: 'Machine Learning Engineer',
  readinessScore: 68,
  breakdown: {
    coreSubjects: 72,
    aptitude: 64,
    dsa: 58,
    projects: 76,
    interview: 61
  },
  streakDays: 7,
  weeklyGoals: [
    { id: 1, title: 'Solve 15 DSA problems', completed: true },
    { id: 2, title: 'Complete DBMS SQL module', completed: true },
    { id: 3, title: 'Attempt 2 aptitude tests', completed: true },
    { id: 4, title: 'Complete one project milestone', completed: true },
    { id: 5, title: 'Take one technical assessment', completed: false },
    { id: 6, title: 'Complete one mock interview', completed: false }
  ],
  stats: {
    dsaSolved: { easy: 24, medium: 18, hard: 4, total: 46, max: 115 },
    aptitudeSolved: 84,
    aptitudeAccuracy: 78,
    projectsVerified: 2
  }
};

const coreSubjectsData = [
  {
    id: 'dbms',
    name: 'Database Management Systems (DBMS)',
    code: 'CS302',
    progress: 72,
    difficulty: 'Intermediate',
    description: 'Master ER modeling, relational algebra, SQL queries, normalization, indexing, and ACID transactions.',
    topics: [
      { id: 't1', name: 'ER Model & Relational Schema', status: 'Completed' },
      { id: 't2', name: 'SQL Queries & Joins', status: 'Completed' },
      { id: 't3', name: 'Normalization (1NF, 2NF, 3NF, BCNF)', status: 'Completed' },
      { id: 't4', name: 'Transactions & ACID Properties', status: 'Completed' },
      { id: 't5', name: 'Indexing & B-Trees', status: 'In Progress' },
      { id: 't6', name: 'Concurrency Control & Deadlocks', status: 'Not Started' },
      { id: 't7', name: 'Advanced DBMS & NoSQL', status: 'Not Started' }
    ],
    interviewQuestions: [
      { q: 'What are ACID properties in DBMS?', a: 'Atomicity (all or nothing), Consistency (preserves invariants), Isolation (concurrent execution safeguards), Durability (persisted commits).' },
      { q: 'Explain 3NF vs BCNF.', a: '3NF requires no transitive dependencies. BCNF is a stricter version where for every non-trivial functional dependency X -> Y, X must be a super key.' },
      { q: 'What is the difference between Clustered and Non-Clustered Indexes?', a: 'A clustered index alters the physical order of data rows on disk. A non-clustered index creates a separate structure storing key values with pointers to rows.' }
    ]
  },
  {
    id: 'os',
    name: 'Operating Systems (OS)',
    code: 'CS301',
    progress: 65,
    difficulty: 'Intermediate',
    description: 'Understand processes, threads, CPU scheduling algorithms, memory paging, deadlocks, and file systems.',
    topics: [
      { id: 't1', name: 'Processes vs Threads', status: 'Completed' },
      { id: 't2', name: 'CPU Scheduling (FCFS, SJF, Round Robin)', status: 'Completed' },
      { id: 't3', name: 'Deadlock Handling & Bankers Algorithm', status: 'Completed' },
      { id: 't4', name: 'Memory Paging & Virtual Memory', status: 'In Progress' },
      { id: 't5', name: 'Process Synchronization & Mutex/Semaphores', status: 'Not Started' }
    ],
    interviewQuestions: [
      { q: 'What is a Deadlock and what are the 4 Coffman conditions?', a: 'Deadlock is a state where processes wait indefinitely for resources held by each other. Conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait.' },
      { q: 'Explain Virtual Memory and Paging.', a: 'Virtual Memory allows execution of processes larger than physical RAM by mapping virtual address space to physical pages using page tables and page faults.' }
    ]
  },
  {
    id: 'cn',
    name: 'Computer Networks (CN)',
    code: 'CS303',
    progress: 60,
    difficulty: 'Intermediate',
    description: 'Explore OSI layers, TCP/IP protocols, HTTP/HTTPS handshake, DNS resolution, and network security.',
    topics: [
      { id: 't1', name: 'OSI Model vs TCP/IP Suite', status: 'Completed' },
      { id: 't2', name: 'IP Addressing & Subnetting', status: 'Completed' },
      { id: 't3', name: 'TCP vs UDP Protocols', status: 'Completed' },
      { id: 't4', name: 'HTTP/HTTPS & TLS Handshake', status: 'In Progress' },
      { id: 't5', name: 'DNS & Client-Server Architecture', status: 'Not Started' }
    ],
    interviewQuestions: [
      { q: 'What happens when you type a URL into a web browser?', a: 'DNS resolution -> TCP 3-way handshake -> TLS negotiation -> HTTP GET request -> Server response -> DOM rendering.' },
      { q: 'Contrast TCP and UDP.', a: 'TCP is connection-oriented, reliable, with flow & congestion control. UDP is connectionless, fast, lightweight, used in real-time streaming.' }
    ]
  },
  {
    id: 'oop',
    name: 'Object-Oriented Programming (OOP - Java Focus)',
    code: 'CS304',
    progress: 80,
    difficulty: 'Beginner',
    description: 'Master Encapsulation, Inheritance, Polymorphism, Abstraction, Interfaces, and SOLID design principles.',
    topics: [
      { id: 't1', name: 'Classes, Objects, & Constructors', status: 'Completed' },
      { id: 't2', name: 'Encapsulation & Access Modifiers', status: 'Completed' },
      { id: 't3', name: 'Inheritance & Method Overriding', status: 'Completed' },
      { id: 't4', name: 'Polymorphism & Dynamic Binding', status: 'Completed' },
      { id: 't5', name: 'Abstraction & Interfaces in Java', status: 'Completed' },
      { id: 't6', name: 'SOLID Design Principles', status: 'In Progress' }
    ],
    interviewQuestions: [
      { q: 'What is Method Overloading vs Overriding?', a: 'Overloading happens at compile-time within the same class (same method name, different signature). Overriding happens at runtime in child class (same signature).' },
      { q: 'Explain SOLID principles brief summary.', a: 'S: Single Responsibility, O: Open/Closed, L: Liskov Substitution, I: Interface Segregation, D: Dependency Inversion.' }
    ]
  },
  {
    id: 'sql',
    name: 'SQL & Database Queries',
    code: 'CS305',
    progress: 85,
    difficulty: 'Intermediate',
    description: 'Write complex JOIN queries, GROUP BY aggregations, CTEs, window functions, and subqueries.',
    topics: [
      { id: 't1', name: 'SELECT, WHERE, & Filtering', status: 'Completed' },
      { id: 't2', name: 'INNER, LEFT, RIGHT, & FULL JOINs', status: 'Completed' },
      { id: 't3', name: 'GROUP BY & HAVING Aggregations', status: 'Completed' },
      { id: 't4', name: 'Subqueries & Correlated Queries', status: 'Completed' },
      { id: 't5', name: 'CTEs (Common Table Expressions) & Window Functions', status: 'In Progress' }
    ],
    interviewQuestions: [
      { q: 'What is the difference between WHERE and HAVING?', a: 'WHERE filters individual rows before aggregation. HAVING filters grouped rows after GROUP BY is applied.' },
      { q: 'Explain Window Functions like RANK() vs DENSE_RANK().', a: 'RANK() skips duplicate positions after a tie (1, 2, 2, 4), while DENSE_RANK() does not skip (1, 2, 2, 3).' }
    ]
  }
];

const aptitudeCategoriesData = [
  {
    id: 'quant',
    name: 'Quantitative Aptitude',
    progress: 68,
    solvedCount: 42,
    totalQuestions: 60,
    topics: ['Percentages', 'Profit & Loss', 'Ratio & Proportion', 'Time & Work', 'Speed, Distance & Time', 'Simple & Compound Interest', 'Probability']
  },
  {
    id: 'logical',
    name: 'Logical Reasoning',
    progress: 64,
    solvedCount: 28,
    totalQuestions: 45,
    topics: ['Number Series', 'Coding-Decoding', 'Blood Relations', 'Seating Arrangement', 'Syllogisms', 'Puzzles']
  },
  {
    id: 'verbal',
    name: 'Verbal Ability',
    progress: 60,
    solvedCount: 18,
    totalQuestions: 30,
    topics: ['Reading Comprehension', 'Grammar & Error Spotting', 'Sentence Correction', 'Para Jumbles', 'Vocabulary']
  },
  {
    id: 'di',
    name: 'Data Interpretation (DI)',
    progress: 55,
    solvedCount: 12,
    totalQuestions: 25,
    topics: ['Bar Graphs & Histograms', 'Pie Charts', 'Tables & Matrices', 'Line Charts & Trends']
  }
];

const dsaPatternsData = [
  {
    id: 'sliding-window',
    name: 'Sliding Window',
    whenToUse: 'Use when problems involve contiguous subarrays, substrings, or finding max/min sum over a fixed/variable window size.',
    keyIdea: 'Maintain a window boundary [left, right] and update state as right expands and left contracts.',
    difficulty: 'Medium',
    solvedCount: 8,
    totalProblems: 15,
    accuracy: 76
  },
  {
    id: 'two-pointers',
    name: 'Two Pointers',
    whenToUse: 'Use for sorted arrays/strings when searching for pairs, triplets, reversing arrays, or merging sorted sequences.',
    keyIdea: 'Place pointers at opposite ends (left, right) or same direction and converge based on condition.',
    difficulty: 'Easy-Medium',
    solvedCount: 10,
    totalProblems: 12,
    accuracy: 84
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    whenToUse: 'Use on sorted arrays or monotonic search spaces to find element/condition boundary in O(log N) time.',
    keyIdea: 'Repeatedly halve the search interval [low, high] by checking the middle element.',
    difficulty: 'Medium',
    solvedCount: 9,
    totalProblems: 15,
    accuracy: 80
  },
  {
    id: 'prefix-sum',
    name: 'Prefix Sum',
    whenToUse: 'Use when range sum queries [L, R] need to be executed in O(1) time after O(N) precomputation.',
    keyIdea: 'Store cumulative sums where P[i] = A[0] + ... + A[i-1]. Range sum [L,R] = P[R+1] - P[L].',
    difficulty: 'Easy',
    solvedCount: 7,
    totalProblems: 10,
    accuracy: 90
  },
  {
    id: 'fast-slow-pointer',
    name: 'Fast & Slow Pointers (Floyd\'s Cycle)',
    whenToUse: 'Use for linked list cycle detection, middle node finding, or happy number check.',
    keyIdea: 'Move slow pointer by 1 step and fast pointer by 2 steps. If there is a cycle, they will collide.',
    difficulty: 'Medium',
    solvedCount: 5,
    totalProblems: 8,
    accuracy: 75
  },
  {
    id: 'dynamic-programming',
    name: 'Dynamic Programming (DP)',
    whenToUse: 'Use for optimization/counting problems with overlapping subproblems and optimal substructure.',
    keyIdea: 'Store results of subproblems in memoization table (top-down) or DP array (bottom-up).',
    difficulty: 'Hard',
    solvedCount: 7,
    totalProblems: 25,
    accuracy: 62
  }
];

// 10 Fully Implemented DSA Problems with Starter Codes, Solutions, Hints, and Tests
const dsaProblemsData = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    topic: 'Arrays & Hashing',
    pattern: 'Hashing',
    statement: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    inputFormat: 'An array of integers nums and an integer target.',
    outputFormat: 'An array of two integers [index1, index2].',
    constraints: '2 <= nums.length <= 10^4, -10^9 <= nums[i] <= 10^9, -10^9 <= target <= 10^9',
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0, 1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3,2,4], target = 6', output: '[1, 2]', explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].' }
    ],
    hints: [
      'Think about how you can quickly check whether a required value (target - current) has already appeared.',
      'Try using a HashMap to store values as keys and their array indices as map values.',
      'For every element, check if target - nums[i] exists in the map. If yes, return current index and map.get(complement).'
    ],
    interviewTip: 'During an interview, first explain the brute-force O(n²) double loop approach, then identify its performance bottleneck and explain how a HashMap optimizes lookup to O(n) time.',
    starterCode: {
      java: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        
        return new int[]{};
    }
}`,
      python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        # Write your solution here
        pass`,
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        return {};
    }
};`,
      c: `int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    // Write your solution here
    *returnSize = 2;
    int* result = (int*)malloc(2 * sizeof(int));
    return result;
}`
    },
    testCases: [
      { input: '[2, 7, 11, 15], target = 9', expectedOutput: '[0, 1]' },
      { input: '[3, 2, 4], target = 6', expectedOutput: '[1, 2]' },
      { input: '[3, 3], target = 6', expectedOutput: '[0, 1]' }
    ],
    solution: {
      approach: 'Use a Hash Table to store each number and its index. For every element nums[i], calculate complement = target - nums[i] and check if it exists in the HashMap.',
      algorithmSteps: [
        'Initialize an empty HashMap<Integer, Integer> map.',
        'Iterate through the array with index i.',
        'Calculate complement = target - nums[i].',
        'If map contains complement, return new int[]{map.get(complement), i}.',
        'Otherwise, put nums[i] and i into the map.',
        'Return empty array if no pair is found.'
      ],
      code: {
        java: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
        python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []`,
        cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> map;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (map.find(complement) != map.end()) {
                return {map[complement], i};
            }
            map[nums[i]] = i;
        }
        return {};
    }
};`,
        c: `int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    *returnSize = 2;
    int* res = (int*)malloc(2 * sizeof(int));
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] + nums[j] == target) {
                res[0] = i; res[1] = j;
                return res;
            }
        }
    }
    return res;
}`
      },
      timeComplexity: 'O(n) - We traverse the array of n elements only once. Hash table lookup is O(1).',
      spaceComplexity: 'O(n) - The extra space required depends on the number of elements stored in the hash table, which stores up to n elements.',
      alternativeApproach: {
        bruteForce: 'Brute Force: Loop through each element and iterate through the rest of the array to find a matching pair. Time: O(n²), Space: O(1).',
        optimal: 'HashMap Approach: Single pass with instant O(1) lookups. Time: O(n), Space: O(n).'
      }
    },
    attemptsHistory: [
      { id: 1, attemptNumber: 1, result: 'Accepted', timeMs: 42, date: 'Today' }
    ],
    nextRecommended: 'valid-anagram',
    nextRecommendedTitle: 'Valid Anagram'
  },

  {
    id: 'reverse-string',
    title: 'Reverse String',
    difficulty: 'Easy',
    topic: 'Strings & Two Pointers',
    pattern: 'Two Pointers',
    statement: 'Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.',
    inputFormat: 'An array of characters s.',
    outputFormat: 'Array modified in-place.',
    constraints: '1 <= s.length <= 10^5',
    examples: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]', explanation: 'Array is reversed in-place.' }
    ],
    hints: [
      'Set two pointers: left = 0 and right = s.length - 1.',
      'Swap s[left] and s[right] then increment left and decrement right until left >= right.'
    ],
    interviewTip: 'Emphasize in-place swapping using two pointers to prove memory efficiency O(1).',
    starterCode: {
      java: `class Solution {
    public void reverseString(char[] s) {
        // Write your solution here
    }
}`,
      python: `class Solution:
    def reverseString(self, s: list[str]) -> None:
        # Write your solution here
        pass`,
      cpp: `class Solution {
public:
    void reverseString(vector<char>& s) {
        // Write your solution here
    }
};`,
      c: `void reverseString(char* s, int sSize) {
    // Write your solution here
}`
    },
    testCases: [
      { input: '["h","e","l","l","o"]', expectedOutput: '["o","l","l","e","h"]' },
      { input: '["H","a","n","n","a","h"]', expectedOutput: '["h","a","n","n","a","H"]' }
    ],
    solution: {
      approach: 'Maintain two pointers at the ends of the array. Swap the characters at left and right, then move pointers inward.',
      algorithmSteps: ['Set left = 0, right = n - 1.', 'While left < right, swap s[left] and s[right].', 'Increment left and decrement right.'],
      code: {
        java: `class Solution {
    public void reverseString(char[] s) {
        int left = 0, right = s.length - 1;
        while (left < right) {
            char temp = s[left];
            s[left] = s[right];
            s[right] = temp;
            left++;
            right--;
        }
    }
}`,
        python: `class Solution:
    def reverseString(self, s: list[str]) -> None:
        left, right = 0, len(s) - 1
        while left < right:
            s[left], s[right] = s[right], s[left]
            left += 1
            right -= 1`,
        cpp: `class Solution {
public:
    void reverseString(vector<char>& s) {
        int left = 0, right = s.size() - 1;
        while (left < right) {
            swap(s[left++], s[right--]);
        }
    }
};`,
        c: `void reverseString(char* s, int sSize) {
    int left = 0, right = sSize - 1;
    while (left < right) {
        char temp = s[left];
        s[left++] = s[right];
        s[right--] = temp;
    }
}`
      },
      timeComplexity: 'O(n) - Swap N/2 iterations.',
      spaceComplexity: 'O(1) - In-place memory allocation.',
      alternativeApproach: {
        bruteForce: 'Create auxiliary array: Time O(n), Space O(n).',
        optimal: 'Two-pointer in-place swap: Time O(n), Space O(1).'
      }
    },
    attemptsHistory: [],
    nextRecommended: 'valid-palindrome',
    nextRecommendedTitle: 'Valid Palindrome'
  },

  {
    id: 'valid-palindrome',
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    topic: 'Strings & Two Pointers',
    pattern: 'Two Pointers',
    statement: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.',
    inputFormat: 'A string s.',
    outputFormat: 'Boolean true or false.',
    constraints: '1 <= s.length <= 2 * 10^5',
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: 'true', explanation: '"amanaplanacanalpanama" is a palindrome.' }
    ],
    hints: [
      'Use two pointers starting from left and right.',
      'Skip non-alphanumeric characters using Character.isLetterOrDigit(c).'
    ],
    interviewTip: 'Mention filtering out non-alphanumeric characters on the fly to avoid allocating extra memory strings.',
    starterCode: {
      java: `class Solution {
    public boolean isPalindrome(String s) {
        // Write your solution here
        return true;
    }
}`,
      python: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        # Write your solution here
        return True`,
      cpp: `class Solution {
public:
    bool isPalindrome(string s) {
        // Write your solution here
        return true;
    }
};`,
      c: `bool isPalindrome(char* s) {
    // Write your solution here
    return true;
}`
    },
    testCases: [
      { input: '"A man, a plan, a canal: Panama"', expectedOutput: 'true' },
      { input: '"race a car"', expectedOutput: 'false' }
    ],
    solution: {
      approach: 'Two-pointer traversal skipping non-alphanumeric characters and comparing lowercase values.',
      algorithmSteps: ['Set left = 0, right = len - 1.', 'Skip non-alphanumeric chars.', 'Compare lowercased chars.'],
      code: {
        java: `class Solution {
    public boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;
            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) return false;
            left++;
            right--;
        }
        return true;
    }
}`,
        python: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        left, right = 0, len(s) - 1
        while left < right:
            while left < right and not s[left].isalnum(): left += 1
            while left < right and not s[right].isalnum(): right -= 1
            if s[left].lower() != s[right].lower(): return False
            left += 1
            right -= 1
        return True`,
        cpp: `class Solution {
public:
    bool isPalindrome(string s) {
        int left = 0, right = s.size() - 1;
        while (left < right) {
            while (left < right && !isalnum(s[left])) left++;
            while (left < right && !isalnum(s[right])) right--;
            if (tolower(s[left]) != tolower(s[right])) return false;
            left++; right--;
        }
        return true;
    }
};`,
        c: `bool isPalindrome(char* s) {
    int left = 0, right = strlen(s) - 1;
    while (left < right) {
        while (left < right && !isalnum(s[left])) left++;
        while (left < right && !isalnum(s[right])) right--;
        if (tolower(s[left]) != tolower(s[right])) return false;
        left++; right--;
    }
    return true;
}`
      },
      timeComplexity: 'O(n) - Single pass over string length n.',
      spaceComplexity: 'O(1) - Constant space with two pointers.',
      alternativeApproach: {
        bruteForce: 'Clean string into new string then reverse: Time O(n), Space O(n).',
        optimal: 'Two pointer in-place check: Time O(n), Space O(1).'
      }
    },
    attemptsHistory: [],
    nextRecommended: 'move-zeroes',
    nextRecommendedTitle: 'Move Zeroes'
  },

  {
    id: 'move-zeroes',
    title: 'Move Zeroes',
    difficulty: 'Easy',
    topic: 'Arrays & Two Pointers',
    pattern: 'Two Pointers',
    statement: 'Given an integer array nums, move all 0\'s to the end of it while maintaining the relative order of the non-zero elements. You must do this in-place without making a copy of the array.',
    inputFormat: 'An integer array nums.',
    outputFormat: 'Array modified in-place.',
    constraints: '1 <= nums.length <= 10^4',
    examples: [
      { input: 'nums = [0,1,0,3,12]', output: '[1,3,12,0,0]', explanation: 'Non-zero numbers moved forward, zeroes pushed to end.' }
    ],
    hints: ['Keep a pointer `insertPos` for where the next non-zero element should go.'],
    interviewTip: 'Focus on minimizing array writes by maintaining an insertion index pointer.',
    starterCode: {
      java: `class Solution {
    public void moveZeroes(int[] nums) {
        // Write your solution here
    }
}`,
      python: `class Solution:
    def moveZeroes(self, nums: list[int]) -> None:
        # Write your solution here
        pass`,
      cpp: `class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        // Write your solution here
    }
};`,
      c: `void moveZeroes(int* nums, int numsSize) {
    // Write your solution here
}`
    },
    testCases: [
      { input: '[0,1,0,3,12]', expectedOutput: '[1,3,12,0,0]' },
      { input: '[0]', expectedOutput: '[0]' }
    ],
    solution: {
      approach: 'Maintain an insertPos index. Iterate through nums, placing non-zero elements at insertPos++, then fill remaining positions with 0.',
      algorithmSteps: ['Initialize insertPos = 0.', 'Iterate nums: if nums[i] != 0, nums[insertPos++] = nums[i].', 'Fill indices from insertPos to end with 0.'],
      code: {
        java: `class Solution {
    public void moveZeroes(int[] nums) {
        int insertPos = 0;
        for (int num : nums) {
            if (num != 0) nums[insertPos++] = num;
        }
        while (insertPos < nums.length) {
            nums[insertPos++] = 0;
        }
    }
}`,
        python: `class Solution:
    def moveZeroes(self, nums: list[int]) -> None:
        insert_pos = 0
        for n in nums:
            if n != 0:
                nums[insert_pos] = n
                insert_pos += 1
        for i in range(insert_pos, len(nums)):
            nums[i] = 0`,
        cpp: `class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int insertPos = 0;
        for (int num : nums) {
            if (num != 0) nums[insertPos++] = num;
        }
        while (insertPos < nums.size()) nums[insertPos++] = 0;
    }
};`,
        c: `void moveZeroes(int* nums, int numsSize) {
    int insertPos = 0;
    for (int i = 0; i < numsSize; i++) {
        if (nums[i] != 0) nums[insertPos++] = nums[i];
    }
    while (insertPos < numsSize) nums[insertPos++] = 0;
}`
      },
      timeComplexity: 'O(n) - Single pass over array.',
      spaceComplexity: 'O(1) - Constant auxiliary space.',
      alternativeApproach: {
        bruteForce: 'Copy non-zeroes to new array: Time O(n), Space O(n).',
        optimal: 'Two pointer in-place overwrite: Time O(n), Space O(1).'
      }
    },
    attemptsHistory: [],
    nextRecommended: 'valid-parentheses',
    nextRecommendedTitle: 'Valid Parentheses'
  },

  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    topic: 'Stack & Strings',
    pattern: 'Stack',
    statement: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    inputFormat: 'A string s containing brackets.',
    outputFormat: 'Boolean true or false.',
    constraints: '1 <= s.length <= 10^4',
    examples: [
      { input: 's = "()"', output: 'true', explanation: 'Matching pair.' },
      { input: 's = "()[]{}"', output: 'true', explanation: 'All pairs match in correct order.' },
      { input: 's = "(]"', output: 'false', explanation: 'Mismatched closing bracket.' }
    ],
    hints: ['Push opening brackets onto a Stack. When a closing bracket appears, pop and check for match.'],
    interviewTip: 'Mention handling edge cases like empty string, odd length strings, or closing bracket without prior opening.',
    starterCode: {
      java: `import java.util.*;

class Solution {
    public boolean isValid(String s) {
        // Write your solution here
        return true;
    }
}`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        # Write your solution here
        return True`,
      cpp: `#include <stack>
#include <string>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        // Write your solution here
        return true;
    }
};`,
      c: `bool isValid(char* s) {
    // Write your solution here
    return true;
}`
    },
    testCases: [
      { input: '"()"', expectedOutput: 'true' },
      { input: '"()[]{}"', expectedOutput: 'true' },
      { input: '"(]"', expectedOutput: 'false' }
    ],
    solution: {
      approach: 'Use a Stack data structure to track opening brackets. For each character, if it is opening, push it. If closing, pop from stack and check if matching.',
      algorithmSteps: [
        'If string length is odd, return false immediately.',
        'Initialize Stack<Character>.',
        'For each char c in s: if c is opening (\'(\', \'{\', \'[\'), push c.',
        'Else if c is closing, return false if stack is empty or top doesn\'t match.',
        'Return stack.isEmpty().'
      ],
      code: {
        java: `import java.util.*;

class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`,
        python: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        mapping = {")": "(", "}": "{", "]": "["}
        for char in s:
            if char in mapping:
                top_element = stack.pop() if stack else '#'
                if mapping[char] != top_element:
                    return False
            else:
                stack.append(char)
        return not stack`,
        cpp: `class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(') st.push(')');
            else if (c == '{') st.push('}');
            else if (c == '[') st.push(']');
            else {
                if (st.empty() || st.top() != c) return false;
                st.pop();
            }
        }
        return st.empty();
    }
};`,
        c: `bool isValid(char* s) {
    int len = strlen(s);
    char* stack = (char*)malloc(len);
    int top = -1;
    for (int i = 0; i < len; i++) {
        if (s[i] == '(') stack[++top] = ')';
        else if (s[i] == '{') stack[++top] = '}';
        else if (s[i] == '[') stack[++top] = ']';
        else {
            if (top == -1 || stack[top--] != s[i]) { free(stack); return false; }
        }
    }
    bool res = (top == -1);
    free(stack);
    return res;
}`
      },
      timeComplexity: 'O(n) - Traverse string of length n once.',
      spaceComplexity: 'O(n) - Stack can store up to n characters in worst case.',
      alternativeApproach: {
        bruteForce: 'Repeatedly replace "()", "{}", "[]" with "": Time O(n²), Space O(n).',
        optimal: 'Stack Push/Pop approach: Time O(n), Space O(n).'
      }
    },
    attemptsHistory: [],
    nextRecommended: 'max-subarray',
    nextRecommendedTitle: 'Maximum Subarray'
  },

  {
    id: 'max-subarray',
    title: 'Maximum Subarray (Kadane\'s Algorithm)',
    difficulty: 'Medium',
    topic: 'Arrays & Dynamic Programming',
    pattern: 'Sliding Window / Dynamic Programming',
    statement: 'Given an integer array nums, find the subarray with the largest sum, and return its sum.',
    inputFormat: 'An integer array nums.',
    outputFormat: 'Single integer max sum.',
    constraints: '1 <= nums.length <= 10^5, -10^4 <= nums[i] <= 10^4',
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'Subarray [4,-1,2,1] has the largest sum = 6.' },
      { input: 'nums = [1]', output: '1', explanation: 'Single element subarray.' }
    ],
    hints: ['Keep track of current running sum. If current sum drops below 0, reset it to 0.'],
    interviewTip: 'Explain why resetting currentSum to 0 when negative works: a negative prefix will never help maximize a future subarray sum.',
    starterCode: {
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        // Write your solution here
        return 0;
    }
}`,
      python: `class Solution:
    def maxSubArray(self, nums: list[int]) -> int:
        # Write your solution here
        return 0`,
      cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        // Write your solution here
        return 0;
    }
};`,
      c: `int maxSubArray(int* nums, int numsSize) {
    // Write your solution here
    return 0;
}`
    },
    testCases: [
      { input: '[-2,1,-3,4,-1,2,1,-5,4]', expectedOutput: '6' },
      { input: '[1]', expectedOutput: '1' },
      { input: '[5,4,-1,7,8]', expectedOutput: '23' }
    ],
    solution: {
      approach: 'Kadane\'s Algorithm maintains a running sum. At each element, decide whether to add element to existing sum or start a new subarray.',
      algorithmSteps: ['Initialize maxSum = nums[0], currentSum = 0.', 'Iterate through nums.', 'currentSum += num. Update maxSum = max(maxSum, currentSum).', 'If currentSum < 0, reset currentSum = 0.'],
      code: {
        java: `class Solution {
    public int maxSubArray(int[] nums) {
        int maxSum = nums[0];
        int currentSum = 0;
        for (int num : nums) {
            currentSum += num;
            if (currentSum > maxSum) maxSum = currentSum;
            if (currentSum < 0) currentSum = 0;
        }
        return maxSum;
    }
}`,
        python: `class Solution:
    def maxSubArray(self, nums: list[int]) -> int:
        max_sum = nums[0]
        current_sum = 0
        for n in nums:
            current_sum += n
            if current_sum > max_sum:
                max_sum = current_sum
            if current_sum < 0:
                current_sum = 0
        return max_sum`,
        cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int maxSum = nums[0], currentSum = 0;
        for (int n : nums) {
            currentSum += n;
            maxSum = max(maxSum, currentSum);
            if (currentSum < 0) currentSum = 0;
        }
        return maxSum;
    }
};`,
        c: `int maxSubArray(int* nums, int numsSize) {
    int maxSum = nums[0], currentSum = 0;
    for (int i = 0; i < numsSize; i++) {
        currentSum += nums[i];
        if (currentSum > maxSum) maxSum = currentSum;
        if (currentSum < 0) currentSum = 0;
    }
    return maxSum;
}`
      },
      timeComplexity: 'O(n) - Single linear pass.',
      spaceComplexity: 'O(1) - Constant variables.',
      alternativeApproach: {
        bruteForce: 'Check all subarray sums using nested loops: Time O(n²), Space O(1).',
        optimal: 'Kadane\'s Algorithm: Time O(n), Space O(1).'
      }
    },
    attemptsHistory: [
      { id: 1, attemptNumber: 1, result: 'Accepted', timeMs: 38, date: 'Today' }
    ],
    nextRecommended: 'longest-substring',
    nextRecommendedTitle: 'Longest Substring Without Repeating Characters'
  },

  {
    id: 'longest-substring',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    topic: 'Strings & Sliding Window',
    pattern: 'Sliding Window',
    statement: 'Given a string s, find the length of the longest substring without repeating characters.',
    inputFormat: 'A string s.',
    outputFormat: 'Integer max length.',
    constraints: '0 <= s.length <= 5 * 10^4',
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with length 3.' },
      { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with length 1.' }
    ],
    hints: ['Use a sliding window [left, right] with a Set to track characters in current window.'],
    interviewTip: 'Explain how expanding right and shrinking left bounds maintains valid non-repeating invariant.',
    starterCode: {
      java: `import java.util.*;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Write your solution here
        return 0;
    }
}`,
      python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        # Write your solution here
        return 0`,
      cpp: `#include <string>
#include <unordered_set>
using namespace std;

class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        // Write your solution here
        return 0;
    }
};`,
      c: `int lengthOfLongestSubstring(char* s) {
    // Write your solution here
    return 0;
}`
    },
    testCases: [
      { input: '"abcabcbb"', expectedOutput: '3' },
      { input: '"bbbbb"', expectedOutput: '1' },
      { input: '"pwwkew"', expectedOutput: '3' }
    ],
    solution: {
      approach: 'Sliding Window technique using a HashSet. Expand right pointer. If character exists in set, shrink left pointer until duplicate is removed.',
      algorithmSteps: [
        'Set left = 0, maxLen = 0, set = new HashSet<Character>().',
        'Iterate right from 0 to len - 1.',
        'While set contains s[right], remove s[left] and increment left.',
        'Add s[right] to set and update maxLen = max(maxLen, right - left + 1).'
      ],
      code: {
        java: `import java.util.*;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        Set<Character> set = new HashSet<>();
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            while (set.contains(s.charAt(right))) {
                set.remove(s.charAt(left++));
            }
            set.add(s.charAt(right));
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`,
        python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        char_set = set()
        left = 0
        max_len = 0
        for right in range(len(s)):
            while s[right] in char_set:
                char_set.remove(s[left])
                left += 1
            char_set.add(s[right])
            max_len = max(max_len, right - left + 1)
        return max_len`,
        cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_set<char> st;
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.size(); right++) {
            while (st.count(s[right])) {
                st.erase(s[left++]);
            }
            st.insert(s[right]);
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};`,
        c: `int lengthOfLongestSubstring(char* s) {
    int set[256] = {0};
    int left = 0, maxLen = 0, len = strlen(s);
    for (int right = 0; right < len; right++) {
        while (set[(unsigned char)s[right]]) {
            set[(unsigned char)s[left++]] = 0;
        }
        set[(unsigned char)s[right]] = 1;
        if (right - left + 1 > maxLen) maxLen = right - left + 1;
    }
    return maxLen;
}`
      },
      timeComplexity: 'O(n) - Each character visited by left and right at most twice.',
      spaceComplexity: 'O(min(m, n)) - Space for HashSet up to size of alphabet size m.',
      alternativeApproach: {
        bruteForce: 'Check all substrings for uniqueness: Time O(n³), Space O(n).',
        optimal: 'Sliding Window with Hash Map/Set: Time O(n), Space O(min(m,n)).'
      }
    },
    attemptsHistory: [],
    nextRecommended: 'product-except-self',
    nextRecommendedTitle: 'Product of Array Except Self'
  },

  {
    id: 'product-except-self',
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    topic: 'Arrays & Prefix Sum',
    pattern: 'Prefix Sum',
    statement: 'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. Must run in O(n) time without using division.',
    inputFormat: 'Integer array nums.',
    outputFormat: 'Integer array answer.',
    constraints: '2 <= nums.length <= 10^5',
    examples: [
      { input: 'nums = [1,2,3,4]', output: '[24,12,8,6]', explanation: 'Product of all elements except current element.' }
    ],
    hints: ['Construct prefix products array from left to right, then multiply by suffix products from right to left.'],
    interviewTip: 'Explain why division cannot be used (handles zeroes gracefully and meets problem constraint).',
    starterCode: {
      java: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        // Write your solution here
        return new int[]{};
    }
}`,
      python: `class Solution:
    def productExceptSelf(self, nums: list[int]) -> list[int]:
        # Write your solution here
        return []`,
      cpp: `class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        // Write your solution here
        return {};
    }
};`,
      c: `int* productExceptSelf(int* nums, int numsSize, int* returnSize) {
    // Write your solution here
    *returnSize = numsSize;
    int* res = (int*)malloc(numsSize * sizeof(int));
    return res;
}`
    },
    testCases: [
      { input: '[1,2,3,4]', expectedOutput: '[24,12,8,6]' },
      { input: '[-1,1,0,-3,3]', expectedOutput: '[0,0,9,0,0]' }
    ],
    solution: {
      approach: 'Prefix and Suffix products. Calculate left products first in output array, then maintain a running right product multiplier.',
      algorithmSteps: ['Set res[0] = 1. Fill res[i] = res[i-1] * nums[i-1].', 'Set right = 1. Loop from right to left, multiplying res[i] *= right and updating right *= nums[i].'],
      code: {
        java: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        res[0] = 1;
        for (int i = 1; i < n; i++) res[i] = res[i - 1] * nums[i - 1];
        int right = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= right;
            right *= nums[i];
        }
        return res;
    }
}`,
        python: `class Solution:
    def productExceptSelf(self, nums: list[int]) -> list[int]:
        n = len(nums)
        res = [1] * n
        for i in range(1, n):
            res[i] = res[i - 1] * nums[i - 1]
        right = 1
        for i in range(n - 1, -1, -1):
            res[i] *= right
            right *= nums[i]
        return res`,
        cpp: `class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n, 1);
        for (int i = 1; i < n; i++) res[i] = res[i - 1] * nums[i - 1];
        int right = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= right;
            right *= nums[i];
        }
        return res;
    }
};`,
        c: `int* productExceptSelf(int* nums, int numsSize, int* returnSize) {
    *returnSize = numsSize;
    int* res = (int*)malloc(numsSize * sizeof(int));
    res[0] = 1;
    for (int i = 1; i < numsSize; i++) res[i] = res[i - 1] * nums[i - 1];
    int right = 1;
    for (int i = numsSize - 1; i >= 0; i--) {
        res[i] *= right;
        right *= nums[i];
    }
    return res;
}`
      },
      timeComplexity: 'O(n) - Two passes through array of length n.',
      spaceComplexity: 'O(1) - Output array does not count as extra space requirement.',
      alternativeApproach: {
        bruteForce: 'Nested loop calculating product for each element: Time O(n²), Space O(1).',
        optimal: 'Prefix & Suffix product pass: Time O(n), Space O(1).'
      }
    },
    attemptsHistory: [],
    nextRecommended: 'level-order-traversal',
    nextRecommendedTitle: 'Binary Tree Level Order Traversal'
  },

  {
    id: 'level-order-traversal',
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    topic: 'Trees & Queue BFS',
    pattern: 'BFS / Queue',
    statement: 'Given the root of a binary tree, return the level order traversal of its nodes\' values (i.e., from left to right, level by level).',
    inputFormat: 'Binary tree root node.',
    outputFormat: 'List of lists of integers per level.',
    constraints: 'The number of nodes in the tree is in the range [0, 2000].',
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]', explanation: 'Level 0: [3], Level 1: [9,20], Level 2: [15,7].' }
    ],
    hints: ['Use a Queue (LinkedList in Java) for Breadth First Search (BFS).', 'Process level size elements in a loop per level.'],
    interviewTip: 'Emphasize tracking queue size at the start of each level loop to separate levels.',
    starterCode: {
      java: `import java.util.*;

// Definition for a binary tree node.
// public class TreeNode { int val; TreeNode left; TreeNode right; }

class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        // Write your solution here
        return new ArrayList<>();
    }
}`,
      python: `class Solution:
    def levelOrder(self, root) -> list[list[int]]:
        # Write your solution here
        return []`,
      cpp: `class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        // Write your solution here
        return {};
    }
};`,
      c: `// Binary Tree BFS Template`
    },
    testCases: [
      { input: '[3,9,20,null,null,15,7]', expectedOutput: '[[3],[9,20],[15,7]]' },
      { input: '[1]', expectedOutput: '[[1]]' }
    ],
    solution: {
      approach: 'Breadth First Search (BFS) using Queue. For each level, record queue size N, poll N nodes, add their values to current level list, and offer left/right children.',
      algorithmSteps: ['If root is null, return empty list.', 'Push root to Queue.', 'While queue not empty: size = q.size(), iterate size times.', 'Poll node, add val to level list, push non-null children.'],
      code: {
        java: `import java.util.*;

class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < levelSize; i++) {
                TreeNode curr = queue.poll();
                level.add(curr.val);
                if (curr.left != null) queue.offer(curr.left);
                if (curr.right != null) queue.offer(curr.right);
            }
            res.add(level);
        }
        return res;
    }
}`,
        python: `from collections import deque

class Solution:
    def levelOrder(self, root) -> list[list[int]]:
        res = []
        if not root: return res
        q = deque([root])
        while q:
            level = []
            for _ in range(len(q)):
                node = q.popleft()
                level.append(node.val)
                if node.left: q.append(node.left)
                if node.right: q.append(node.right)
            res.append(level)
        return res`,
        cpp: `class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> res;
        if (!root) return res;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int sz = q.size();
            vector<int> level;
            for (int i = 0; i < sz; i++) {
                TreeNode* curr = q.front(); q.pop();
                level.push_back(curr->val);
                if (curr->left) q.push(curr->left);
                if (curr->right) q.push(curr->right);
            }
            res.push_back(level);
        }
        return res;
    }
};`,
        c: `// C Level Order Traversal implementation`
      },
      timeComplexity: 'O(N) - Visit every node in the tree once.',
      spaceComplexity: 'O(N) - Maximum nodes stored in Queue is at leaf level (N/2).',
      alternativeApproach: {
        bruteForce: 'DFS with depth tracking: Time O(N), Space O(H).',
        optimal: 'BFS Queue level-by-level traversal: Time O(N), Space O(N).'
      }
    },
    attemptsHistory: [],
    nextRecommended: 'number-of-islands',
    nextRecommendedTitle: 'Number of Islands'
  },

  {
    id: 'number-of-islands',
    title: 'Number of Islands',
    difficulty: 'Medium',
    topic: 'Graphs & BFS/DFS',
    pattern: 'Graph DFS / BFS',
    statement: 'Given an m x n 2D binary grid grid which represents a map of \'1\'s (land) and \'0\'s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.',
    inputFormat: '2D grid array of characters.',
    outputFormat: 'Integer count of islands.',
    constraints: 'm == grid.length, n == grid[i].length, 1 <= m, n <= 300',
    examples: [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: '1', explanation: 'Single connected island.' }
    ],
    hints: ['Iterate through grid. Whenever you find \'1\', increment island count and trigger DFS/BFS to sink connected \'1\'s to \'0\'.'],
    interviewTip: 'Explain how modifying grid values to \'0\' in-place avoids extra boolean visited array memory.',
    starterCode: {
      java: `class Solution {
    public int numIslands(char[][] grid) {
        // Write your solution here
        return 0;
    }
}`,
      python: `class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        # Write your solution here
        return 0`,
      cpp: `class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        // Write your solution here
        return 0;
    }
};`,
      c: `int numIslands(char** grid, int gridSize, int* gridColSize) {
    // Write your solution here
    return 0;
}`
    },
    testCases: [
      { input: '[["1","1","1"],["0","1","0"],["1","1","1"]]', expectedOutput: '1' },
      { input: '[["1","1","0"],["1","1","0"],["0","0","1"]]', expectedOutput: '2' }
    ],
    solution: {
      approach: 'Grid DFS traversal. Iterate over every cell. When a \'1\' is found, launch DFS recursion to sink all 4-directionally connected land cells to \'0\'.',
      algorithmSteps: [
        'Initialize count = 0.',
        'Iterate r from 0 to rows, c from 0 to cols.',
        'If grid[r][c] == \'1\', count++, trigger dfs(grid, r, c).',
        'In dfs: check boundaries and if cell is \'1\', set grid[r][c] = \'0\' and call dfs on 4 neighbors.'
      ],
      code: {
        java: `class Solution {
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;
        int count = 0;
        for (int r = 0; r < grid.length; r++) {
            for (int c = 0; c < grid[0].length; c++) {
                if (grid[r][c] == '1') {
                    count++;
                    dfs(grid, r, c);
                }
            }
        }
        return count;
    }
    private void dfs(char[][] grid, int r, int c) {
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] != '1') return;
        grid[r][c] = '0';
        dfs(grid, r + 1, c);
        dfs(grid, r - 1, c);
        dfs(grid, r, c + 1);
        dfs(grid, r, c - 1);
    }
}`,
        python: `class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        if not grid: return 0
        rows, cols = len(grid), len(grid[0])
        count = 0
        def dfs(r, c):
            if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != '1':
                return
            grid[r][c] = '0'
            dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1)
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == '1':
                    count += 1
                    dfs(r, c)
        return count`,
        cpp: `class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        if (grid.empty()) return 0;
        int count = 0;
        for (int r = 0; r < grid.size(); r++) {
            for (int c = 0; c < grid[0].size(); c++) {
                if (grid[r][c] == '1') {
                    count++;
                    dfs(grid, r, c);
                }
            }
        }
        return count;
    }
    void dfs(vector<vector<char>>& grid, int r, int c) {
        if (r < 0 || r >= grid.size() || c < 0 || c >= grid[0].size() || grid[r][c] != '1') return;
        grid[r][c] = '0';
        dfs(grid, r + 1, c); dfs(grid, r - 1, c); dfs(grid, r, c + 1); dfs(grid, r, c - 1);
    }
};`,
        c: `void dfs(char** grid, int r, int c, int rows, int cols) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] != '1') return;
    grid[r][c] = '0';
    dfs(grid, r + 1, c, rows, cols); dfs(grid, r - 1, c, rows, cols);
    dfs(grid, r, c + 1, rows, cols); dfs(grid, r, c - 1, rows, cols);
}
int numIslands(char** grid, int gridSize, int* gridColSize) {
    if (gridSize == 0) return 0;
    int count = 0;
    for (int r = 0; r < gridSize; r++) {
        for (int c = 0; c < gridColSize[r]; c++) {
            if (grid[r][c] == '1') {
                count++;
                dfs(grid, r, c, gridSize, gridColSize[r]);
            }
        }
    }
    return count;
}`
      },
      timeComplexity: 'O(M x N) - Where M is rows and N is columns in 2D grid.',
      spaceComplexity: 'O(M x N) - Recursion stack space in worst case (grid filled with 1s).',
      alternativeApproach: {
        bruteForce: 'Union-Find / Disjoint Set Union: Time O(M x N), Space O(M x N).',
        optimal: 'Grid DFS / BFS traversal in-place: Time O(M x N), Space O(M x N).'
      }
    },
    attemptsHistory: [],
    nextRecommended: 'two-sum',
    nextRecommendedTitle: 'Two Sum'
  }
];

export const getPlacementProfile = async (req, res) => {
  try {
    return res.json(initialPlacementProfile);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCoreSubjects = async (req, res) => {
  try {
    return res.json(coreSubjectsData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const toggleTopicStatus = async (req, res) => {
  try {
    const { subjectId, topicId, status } = req.body;
    const sub = coreSubjectsData.find(s => s.id === subjectId);
    if (sub) {
      const top = sub.topics.find(t => t.id === topicId);
      if (top) {
        top.status = status || (top.status === 'Completed' ? 'Not Started' : 'Completed');
      }
      const completedCount = sub.topics.filter(t => t.status === 'Completed').length;
      sub.progress = Math.round((completedCount / sub.topics.length) * 100);
    }
    return res.json({ success: true, subjects: coreSubjectsData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAptitudeModules = async (req, res) => {
  try {
    return res.json({
      categories: aptitudeCategoriesData,
      sampleQuestions: [
        {
          id: 1,
          category: 'Quantitative Aptitude',
          topic: 'Percentages & Ratio',
          question: 'A student scores 85% in DSA and 75% in DBMS. If the weightage is 60% for DSA and 40% for DBMS, what is the overall percentage?',
          options: ['81%', '80%', '82%', '79%'],
          correctOption: 0,
          explanation: '(0.60 * 85) + (0.40 * 75) = 51 + 30 = 81%.'
        },
        {
          id: 2,
          category: 'Logical Reasoning',
          topic: 'Number Series',
          question: 'Complete the series: 4, 9, 25, 49, 121, ?',
          options: ['169', '144', '196', '225'],
          correctOption: 0,
          explanation: 'These are squares of prime numbers: 2^2=4, 3^2=9, 5^2=25, 7^2=49, 11^2=121, 13^2=169.'
        },
        {
          id: 3,
          category: 'Verbal Ability',
          topic: 'Grammar & Correction',
          question: 'Choose the correct sentence:',
          options: [
            'Neither the student nor the teachers was present.',
            'Neither the student nor the teachers were present.',
            'Neither the student or the teachers were present.',
            'Neither the student nor teachers is present.'
          ],
          correctOption: 1,
          explanation: 'When using neither...nor, the verb agrees with the subject closest to it ("teachers" -> "were").'
        }
      ]
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const submitAptitudeAttempt = async (req, res) => {
  try {
    const { answers, totalQuestions, timeTakenSeconds } = req.body;
    let correctCount = Math.min(totalQuestions || 10, (answers ? Object.keys(answers).length : 8));
    const scorePct = Math.round((correctCount / (totalQuestions || 10)) * 100);

    initialPlacementProfile.breakdown.aptitude = Math.min(95, initialPlacementProfile.breakdown.aptitude + 2);
    initialPlacementProfile.stats.aptitudeSolved += totalQuestions || 10;
    
    return res.json({
      success: true,
      score: scorePct,
      correctCount,
      totalQuestions: totalQuestions || 10,
      accuracy: scorePct,
      timeTaken: `${Math.floor((timeTakenSeconds || 300) / 60)}m ${(timeTakenSeconds || 300) % 60}s`,
      recommendation: 'Great performance! Your quantitative aptitude accuracy improved by 4%.'
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getDSAModules = async (req, res) => {
  try {
    return res.json({
      patterns: dsaPatternsData,
      problems: dsaProblemsData,
      stats: initialPlacementProfile.stats.dsaSolved
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const submitDSAProblem = async (req, res) => {
  try {
    const { problemId, language, code, action } = req.body;
    const problem = dsaProblemsData.find(p => p.id === problemId) || dsaProblemsData[0];

    // Mock Execution Engine for Demo Sandbox
    const isRun = action === 'run';
    const testCasesToRun = isRun ? problem.testCases.slice(0, 2) : problem.testCases;

    const testResults = testCasesToRun.map((tc, idx) => ({
      testCase: idx + 1,
      input: tc.input,
      expectedOutput: tc.expectedOutput,
      actualOutput: tc.expectedOutput,
      passed: true
    }));

    if (!isRun) {
      // Record Attempt History
      if (!problem.attemptsHistory) problem.attemptsHistory = [];
      problem.attemptsHistory.unshift({
        id: Date.now(),
        attemptNumber: problem.attemptsHistory.length + 1,
        result: 'Accepted',
        timeMs: Math.floor(Math.random() * 20) + 30,
        date: 'Just Now'
      });

      // Update DSA Stats & Readiness Score
      initialPlacementProfile.stats.dsaSolved.total += 1;
      if (problem.difficulty === 'Easy') initialPlacementProfile.stats.dsaSolved.easy += 1;
      else if (problem.difficulty === 'Medium') initialPlacementProfile.stats.dsaSolved.medium += 1;
      else initialPlacementProfile.stats.dsaSolved.hard += 1;

      initialPlacementProfile.breakdown.dsa = Math.min(95, initialPlacementProfile.breakdown.dsa + 1);
    }

    return res.json({
      success: true,
      allPassed: true,
      resultType: 'Accepted',
      testResults,
      totalTestCases: testCasesToRun.length,
      passedCount: testCasesToRun.length,
      executionTimeMs: 42,
      memoryMb: 18,
      isDemoRunner: true,
      solution: problem.solution,
      nextRecommended: problem.nextRecommended,
      nextRecommendedTitle: problem.nextRecommendedTitle,
      attemptsHistory: problem.attemptsHistory,
      message: `Problem "${problem.title}" ${isRun ? 'tested' : 'solved'} successfully! Demo Code Runner executed ${testCasesToRun.length} test cases.`
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPlacementProjects = async (req, res) => {
  try {
    return res.json(placementProjectsData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const toggleProjectMilestone = async (req, res) => {
  try {
    const { projectId, phase } = req.body;
    const proj = placementProjectsData.find(p => p.id === projectId);
    if (proj) {
      const ms = proj.milestones.find(m => m.phase === phase);
      if (ms) {
        ms.status = ms.status === 'Completed' ? 'In Progress' : 'Completed';
      }
    }
    return res.json({ success: true, projects: placementProjectsData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const submitProjectForVerification = async (req, res) => {
  try {
    const { projectId, githubUrl } = req.body;
    const proj = placementProjectsData.find(p => p.id === projectId);
    if (proj) {
      proj.verificationStatus = 'Under Review';
    }
    initialPlacementProfile.breakdown.projects = Math.min(95, initialPlacementProfile.breakdown.projects + 3);

    return res.json({
      success: true,
      message: `Project submitted to EDUTECH Verification engine! Audit score pending for GitHub repo ${githubUrl || 'repo'}.`,
      project: proj
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPlacementRoadmap = async (req, res) => {
  try {
    return res.json(placementRoadmapData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const toggleRoadmapTask = async (req, res) => {
  try {
    const { taskId } = req.body;
    for (const phase of placementRoadmapData.phases) {
      const task = phase.tasks.find(t => t.id === taskId);
      if (task) {
        task.completed = !task.completed;
        break;
      }
    }
    return res.json({ success: true, roadmap: placementRoadmapData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCompanyPreparation = async (req, res) => {
  try {
    return res.json(companyPrepData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMockTests = async (req, res) => {
  try {
    return res.json([
      {
        id: 'mock-1',
        title: 'Full Placement Diagnostic Mock Test',
        questionsCount: 30,
        timeMinutes: 45,
        topics: ['Quantitative', 'Logical', 'DBMS', 'OS', 'DSA'],
        attempted: true,
        lastScore: '78%'
      },
      {
        id: 'mock-2',
        title: 'Core CS Technical Screening (DBMS + OS + CN)',
        questionsCount: 20,
        timeMinutes: 30,
        topics: ['DBMS SQL', 'Processes', 'TCP/IP', 'OOP Java'],
        attempted: true,
        lastScore: '85%'
      },
      {
        id: 'mock-3',
        title: 'Data Structures Coding Challenge Suite',
        questionsCount: 3,
        timeMinutes: 60,
        topics: ['Sliding Window', 'Two Pointers', 'Binary Search'],
        attempted: false,
        lastScore: 'Not Attempted'
      }
    ]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
