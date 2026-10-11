import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../../services/api';
import { CheckSquare, Clock, ArrowLeft, Play, CheckCircle2, Award, AlertCircle, Sparkles, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const defaultMockTests = [
  {
    id: 'full-mock-1',
    title: 'Full-Length Campus Screening Mock Drive',
    timeMinutes: 60,
    questionsCount: 45,
    lastScore: '82% (Passed)',
    attempted: true,
    topics: ['Aptitude', 'Logical', 'DBMS', 'OS', 'CN', 'DSA']
  },
  {
    id: 'cs-core-mock',
    title: 'Core Computer Science Screening Test',
    timeMinutes: 40,
    questionsCount: 30,
    lastScore: '76% (Passed)',
    attempted: true,
    topics: ['DBMS SQL', 'Operating Systems', 'Computer Networks', 'OOP Java']
  },
  {
    id: 'aptitude-speed-run',
    title: 'Aptitude & Speed Reasoning Sprint',
    timeMinutes: 30,
    questionsCount: 25,
    lastScore: '88% (Passed)',
    attempted: true,
    topics: ['Percentages', 'Time & Work', 'Number Series', 'Syllogisms']
  },
  {
    id: 'dsa-coding-assessment',
    title: 'DSA & Algorithmic Problem Solving Test',
    timeMinutes: 45,
    questionsCount: 3,
    lastScore: 'Not Attempted',
    attempted: false,
    topics: ['Arrays & Hashing', 'Two Pointers', 'Binary Search', 'Trees']
  }
];

export const PlacementMockTestsPage = () => {
  const [mockTests, setMockTests] = useState(defaultMockTests);
  const [loading, setLoading] = useState(false);
  const [activeTest, setActiveTest] = useState(null);
  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const data = await apiFetch('/placement/mock-tests');
        if (data && Array.isArray(data) && data.length > 0) {
          setMockTests(data);
        }
      } catch (e) {
        console.error('Using default mock tests dataset:', e);
      }
    };
    fetchTests();
  }, []);

  const handleStartMockTest = (test) => {
    setActiveTest(test);
    setTestResult(null);
  };

  const handleSubmitMockTest = () => {
    setTestResult({
      scorePct: 84,
      correctCount: 25,
      totalCount: 30,
      timeTaken: '28m 42s',
      feedback: 'Great performance! Your speed and accuracy meet campus recruitment standards.'
    });
  };

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
            <CheckSquare className="w-6 h-6 text-emerald-400" />
            <span>Placement Proctored Mock Tests</span>
          </h1>
          <p className="text-xs text-slate-400">Simulate official campus drive online tests for Aptitude, Core CS, DSA, and Full Mock Screening.</p>
        </div>
      </div>

      {/* Mock Test Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockTests.map((t) => (
          <div key={t.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 hover:border-emerald-500/40 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400">{t.questionsCount} Questions • {t.timeMinutes} Mins</span>
              <span className="text-xs font-bold text-amber-400">{t.lastScore}</span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">{t.title}</h3>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {t.topics.map((tp, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 font-mono">
                    {tp}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Status: <strong className="text-white">{t.attempted ? 'Attempted' : 'New'}</strong></span>
              <button
                onClick={() => handleStartMockTest(t)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1.5 transition"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Start Mock Test</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Active Mock Test Modal */}
      {activeTest && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-6 max-w-xl w-full shadow-2xl space-y-4">
            {!testResult ? (
              <>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-400">Proctored Assessment Simulation</span>
                    <h3 className="text-base font-bold text-white">{activeTest.title}</h3>
                  </div>
                  <button onClick={() => setActiveTest(null)} className="text-slate-400 hover:text-white font-bold text-sm">✕</button>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300">
                  <p className="font-bold text-white">Assessment Guidelines:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Total Duration: {activeTest.timeMinutes} Minutes.</li>
                    <li>Questions: {activeTest.questionsCount} Multiple Choice & Coding Challenge items.</li>
                    <li>Results are evaluated immediately and linked to your Placement Readiness score.</li>
                  </ul>
                </div>

                <div className="flex items-center justify-end space-x-2 pt-2">
                  <button onClick={() => setActiveTest(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold">
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitMockTest}
                    className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center space-x-1"
                  >
                    <CheckSquare className="w-4 h-4" />
                    <span>Submit Completed Test</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950 to-slate-900 border border-emerald-500/40 text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-400">Mock Test Result</span>
                  <div className="text-3xl font-black text-white">{testResult.scorePct}%</div>
                  <p className="text-slate-300">{testResult.correctCount} of {testResult.totalCount} Questions Correct • Time: {testResult.timeTaken}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                  <p className="leading-relaxed font-semibold">✓ {testResult.feedback}</p>
                </div>

                <div className="flex justify-end pt-2">
                  <button onClick={() => setActiveTest(null)} className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold">
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
