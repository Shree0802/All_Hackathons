import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../../services/api';
import { BookOpen, CheckCircle2, HelpCircle, ArrowLeft, Play, Sparkles, Code, CheckSquare, Layers, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const defaultSubjects = [
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
      { id: 't5', name: 'Indexing & B-Trees', status: 'In Progress' }
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
      { id: 't4', name: 'Memory Paging & Virtual Memory', status: 'In Progress' }
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
      { id: 't4', name: 'HTTP/HTTPS & TLS Handshake', status: 'In Progress' }
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
      { id: 't4', name: 'Polymorphism & Dynamic Binding', status: 'Completed' }
    ],
    interviewQuestions: [
      { q: 'What is Method Overloading vs Overriding?', a: 'Overloading happens at compile-time within the same class (same method name, different signature). Overriding happens at runtime in child class.' },
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
      { id: 't3', name: 'GROUP BY & HAVING Aggregations', status: 'Completed' }
    ],
    interviewQuestions: [
      { q: 'What is the difference between WHERE and HAVING?', a: 'WHERE filters individual rows before aggregation. HAVING filters grouped rows after GROUP BY is applied.' },
      { q: 'Explain Window Functions like RANK() vs DENSE_RANK().', a: 'RANK() skips duplicate positions after a tie (1, 2, 2, 4), while DENSE_RANK() does not skip (1, 2, 2, 3).' }
    ]
  }
];

export const CoreSubjectsPage = () => {
  const [subjects, setSubjects] = useState(defaultSubjects);
  const [loading, setLoading] = useState(false);
  const [activeSubject, setActiveSubject] = useState(null);
  const [activeQuestionsModal, setActiveQuestionsModal] = useState(null);

  // Inline Questions Filter
  const [activeSubjectFilter, setActiveSubjectFilter] = useState('All');
  const [expandedQuestionId, setExpandedQuestionId] = useState({});

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await apiFetch('/placement/core-subjects');
        if (data && Array.isArray(data) && data.length > 0) {
          setSubjects(data);
        }
      } catch (e) {
        console.error('Using default core subjects dataset:', e);
      }
    };
    fetchSubjects();
  }, []);

  const handleToggleTopic = async (subjectId, topicId) => {
    try {
      const res = await apiFetch('/placement/core-subjects/toggle-topic', {
        method: 'POST',
        body: JSON.stringify({ subjectId, topicId })
      });
      if (res.subjects) {
        setSubjects(res.subjects);
        if (activeSubject && activeSubject.id === subjectId) {
          const updatedActive = res.subjects.find(s => s.id === subjectId);
          setActiveSubject(updatedActive);
        }
      }
    } catch (e) {
      console.error(e);
      // Local toggle fallback
      setSubjects(prev => prev.map(s => {
        if (s.id === subjectId) {
          const updatedTopics = s.topics.map(t => t.id === topicId ? {
            ...t,
            status: t.status === 'Completed' ? 'In Progress' : 'Completed'
          } : t);
          return { ...s, topics: updatedTopics };
        }
        return s;
      }));
    }
  };

  const toggleAnswerExpand = (key) => {
    setExpandedQuestionId(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const allInterviewQuestions = subjects.flatMap(s =>
    (s.interviewQuestions || []).map(iq => ({ ...iq, subjectName: s.name, subjectCode: s.code, subjectId: s.id }))
  );

  const filteredQuestions = activeSubjectFilter === 'All'
    ? allInterviewQuestions
    : allInterviewQuestions.filter(q => q.subjectId === activeSubjectFilter);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <Link to="/student/placement-prep" className="text-xs text-brand-400 hover:underline flex items-center space-x-1 mb-1 font-semibold">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Placement Dashboard</span>
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
            <BookOpen className="w-6 h-6 text-blue-400" />
            <span>Core Computer Science Subjects</span>
          </h1>
          <p className="text-xs text-slate-400">Strengthen the technical CS fundamentals expected in placement technical screening interviews.</p>
        </div>
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((sub) => (
          <div key={sub.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 hover:border-blue-500/40 transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">{sub.code}</span>
                <span className="text-xs font-bold text-emerald-400">{sub.progress}% Complete</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">{sub.name}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{sub.description}</p>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500" style={{ width: `${sub.progress}%` }}></div>
              </div>

              <div className="space-y-2 pt-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Topics Covered:</span>
                <div className="flex flex-wrap gap-1.5">
                  {sub.topics.map((t) => (
                    <span
                      key={t.id}
                      className={`text-[10px] px-2.5 py-1 rounded-lg font-semibold border flex items-center space-x-1 ${
                        t.status === 'Completed'
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                          : t.status === 'In Progress'
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      <span>{t.name}</span>
                      {t.status === 'Completed' && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-wrap gap-2">
              <button
                onClick={() => setActiveSubject(sub)}
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center space-x-1.5 transition"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>View Topics & Study</span>
              </button>
              <button
                onClick={() => setActiveQuestionsModal(sub)}
                className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-bold flex items-center space-x-1.5 transition"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Interview Q&A ({sub.interviewQuestions?.length || 0})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Inline Technical Interview Q&A Showcase Section */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-white tracking-tight">Core CS Technical Interview Questions</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Read real campus interview questions asked by top tech companies for DBMS, OS, CN, OOP, and SQL.</p>
          </div>

          {/* Subject Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[{ id: 'All', name: 'All Subjects' }, ...subjects.map(s => ({ id: s.id, name: s.code }))].map((fItem) => (
              <button
                key={fItem.id}
                onClick={() => setActiveSubjectFilter(fItem.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  activeSubjectFilter === fItem.id
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                    : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {fItem.name}
              </button>
            ))}
          </div>
        </div>

        {/* Questions Cards List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredQuestions.map((qObj, qIdx) => {
            const key = `${qObj.subjectId}-${qIdx}`;
            const isExp = expandedQuestionId[key];

            return (
              <div key={key} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-blue-500/30 transition">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    {qObj.subjectCode} • {qObj.subjectName}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">Q#{qIdx + 1}</span>
                </div>

                <h3 className="text-sm font-bold text-white leading-relaxed flex items-start space-x-2">
                  <span className="text-amber-400 font-bold">Q:</span>
                  <span>{qObj.q}</span>
                </h3>

                <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                  <button
                    onClick={() => toggleAnswerExpand(key)}
                    className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isExp ? 'Hide Verified Answer' : 'Show Verified Answer'}</span>
                    {isExp ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {isExp && (
                  <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/40 to-slate-900 border border-blue-500/30 text-xs space-y-1 animate-fadeIn">
                    <span className="text-[10px] uppercase font-bold text-blue-400 block">Verified Answer Explanation:</span>
                    <p className="text-slate-200 leading-relaxed font-medium">{qObj.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Topic Study Modal */}
      {activeSubject && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-brand-500/40 rounded-2xl p-6 max-w-xl w-full shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-400">{activeSubject.code}</span>
                <h3 className="text-lg font-bold text-white">{activeSubject.name}</h3>
              </div>
              <button onClick={() => setActiveSubject(null)} className="text-slate-400 hover:text-white font-bold text-sm">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Overall Subject Progress:</span>
                <span className="font-bold text-emerald-400 text-sm">{activeSubject.progress}% Completed</span>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Topic Checklist:</span>
                {activeSubject.topics.map((top) => (
                  <div key={top.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">{top.name}</span>
                      <span className={`text-[10px] font-semibold ${top.status === 'Completed' ? 'text-emerald-400' : 'text-slate-500'}`}>
                        Status: {top.status}
                      </span>
                    </div>

                    <button
                      onClick={() => handleToggleTopic(activeSubject.id, top.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        top.status === 'Completed'
                          ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                      }`}
                    >
                      {top.status === 'Completed' ? 'Mark Incomplete' : 'Mark as Completed ✓'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button onClick={() => setActiveSubject(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interview Q&A Modal */}
      {activeQuestionsModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-brand-500/40 rounded-2xl p-6 max-w-xl w-full shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">{activeQuestionsModal.name} — Technical Interview Q&A</h3>
              <button onClick={() => setActiveQuestionsModal(null)} className="text-slate-400 hover:text-white font-bold text-sm">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              {activeQuestionsModal.interviewQuestions?.map((qa, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <span className="font-bold text-brand-300 text-sm block">Q: {qa.q}</span>
                  <p className="text-slate-300 leading-relaxed font-medium">A: {qa.a}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button onClick={() => setActiveQuestionsModal(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
