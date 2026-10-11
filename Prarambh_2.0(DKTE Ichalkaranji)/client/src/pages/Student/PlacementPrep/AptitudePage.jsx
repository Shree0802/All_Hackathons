import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../../services/api';
import { Zap, Clock, CheckCircle2, ArrowLeft, Play, HelpCircle, CheckSquare, Sparkles, Filter, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const defaultCategories = [
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

const defaultSampleQuestions = [
  {
    id: 1,
    category: 'Quantitative Aptitude',
    topic: 'Percentages & Weighted Average',
    question: 'A student scored 85% in Math (weight 60%) and 75% in Science (weight 40%). What is the overall weighted average percentage?',
    options: ['81%', '80%', '82%', '79%'],
    correctOption: 0,
    explanation: 'Weighted Average = (0.60 * 85) + (0.40 * 75) = 51 + 30 = 81%.'
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
    question: 'Choose the grammatically correct sentence:',
    options: [
      'Neither the student nor the teachers was present.',
      'Neither the student nor the teachers were present.',
      'Neither the student or the teachers were present.',
      'Neither the student nor teachers is present.'
    ],
    correctOption: 1,
    explanation: 'When using "neither...nor", the verb agrees with the subject closest to it ("teachers" -> "were").'
  },
  {
    id: 4,
    category: 'Quantitative Aptitude',
    topic: 'Time & Work',
    question: 'Worker A takes 6 hours to complete a job and Worker B takes 12 hours. How long will they take working together?',
    options: ['4 hours', '3 hours', '5 hours', '4.5 hours'],
    correctOption: 0,
    explanation: 'Combined rate = 1/6 + 1/12 = 3/12 = 1/4 job per hour. Time required = 1 / (1/4) = 4 hours.'
  },
  {
    id: 5,
    category: 'Data Interpretation',
    topic: 'Bar Graphs & Ratios',
    question: 'Company X revenue grew from $20M in 2022 to $35M in 2024. What is the percentage increase in revenue?',
    options: ['75%', '60%', '50%', '80%'],
    correctOption: 0,
    explanation: 'Percentage Increase = ((35 - 20) / 20) * 100 = (15 / 20) * 100 = 75%.'
  },
  {
    id: 6,
    category: 'Logical Reasoning',
    topic: 'Blood Relations',
    question: 'Pointing to a photograph, a man said, "I have no brother or sister, but that man\'s father is my father\'s son." Whose photograph was it?',
    options: ['His Son\'s', 'His Father\'s', 'His Own', 'His Nephew\'s'],
    correctOption: 0,
    explanation: 'Since he has no siblings, "my father\'s son" is himself. Thus, "that man\'s father is myself", meaning the photo is of his son.'
  }
];

export const AptitudePage = () => {
  const [data, setData] = useState({ categories: defaultCategories, sampleQuestions: defaultSampleQuestions });
  const [loading, setLoading] = useState(false);
  const [testActive, setTestActive] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [testResult, setTestResult] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(300);

  // Interactive inline practice state
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');
  const [inlineAnswers, setInlineAnswers] = useState({});
  const [expandedExplanations, setExpandedExplanations] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiFetch('/placement/aptitude');
        if (res && res.categories) {
          setData(res);
        }
      } catch (e) {
        console.error('Using default aptitude dataset:', e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let interval = null;
    if (testActive && !testResult && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds(s => s - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [testActive, testResult, timerSeconds]);

  const handleStartTest = () => {
    setTestActive(true);
    setCurrentQIndex(0);
    setSelectedAnswers({});
    setTestResult(null);
    setTimerSeconds(300);
  };

  const handleSelectOption = (qId, optionIdx) => {
    setSelectedAnswers({ ...selectedAnswers, [qId]: optionIdx });
  };

  const handleInlineSelect = (qId, optionIdx) => {
    setInlineAnswers({ ...inlineAnswers, [qId]: optionIdx });
  };

  const toggleExplanation = (qId) => {
    setExpandedExplanations(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleSubmitTest = async () => {
    try {
      const res = await apiFetch('/placement/aptitude/submit', {
        method: 'POST',
        body: JSON.stringify({
          answers: selectedAnswers,
          totalQuestions: data?.sampleQuestions?.length || defaultSampleQuestions.length,
          timeTakenSeconds: 300 - timerSeconds
        })
      });
      setTestResult(res);
    } catch (e) {
      console.error(e);
      // Fallback local score calculation
      const correctCount = Object.keys(selectedAnswers).filter(
        qId => selectedAnswers[qId] === (data?.sampleQuestions?.find(q => q.id === Number(qId))?.correctOption || 0)
      ).length;
      const totalQ = data?.sampleQuestions?.length || defaultSampleQuestions.length;
      setTestResult({
        score: Math.round((correctCount / totalQ) * 100),
        correctCount,
        totalQuestions: totalQ,
        timeTaken: `${Math.floor((300 - timerSeconds) / 60)}m ${(300 - timerSeconds) % 60}s`,
        message: 'Aptitude screening evaluated successfully! Your speed and accuracy score updated.'
      });
    }
  };

  const categories = data?.categories || defaultCategories;
  const sampleQuestions = data?.sampleQuestions || defaultSampleQuestions;

  const filteredInlineQuestions = activeCategoryFilter === 'All'
    ? sampleQuestions
    : sampleQuestions.filter(q => q.category === activeCategoryFilter);

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
            <Zap className="w-6 h-6 text-purple-400" />
            <span>Aptitude & Logical Reasoning Preparation</span>
          </h1>
          <p className="text-xs text-slate-400">Improve speed, accuracy, and logical problem-solving for campus recruitment screening tests.</p>
        </div>

        <button
          onClick={handleStartTest}
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center space-x-2 transition shadow-lg shadow-purple-500/20 shrink-0"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Take Timed Aptitude Practice Test</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 hover:border-purple-500/40 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400">{cat.name}</span>
              <span className="text-xs font-bold text-emerald-400">{cat.solvedCount} / {cat.totalQuestions} Solved</span>
            </div>

            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500" style={{ width: `${cat.progress}%` }}></div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Topics Evaluated:</span>
              <div className="flex flex-wrap gap-1.5">
                {cat.topics.map((t, idx) => (
                  <span key={idx} className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Inline Sample Practice Questions Showcase Section */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-bold text-white tracking-tight">Sample Aptitude Practice Questions</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Solve sample aptitude problems directly with instant answer verification and step-by-step explanations.</p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {['All', 'Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability', 'Data Interpretation'].map((filterCat) => (
              <button
                key={filterCat}
                onClick={() => setActiveCategoryFilter(filterCat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  activeCategoryFilter === filterCat
                    ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-500/20'
                    : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {filterCat}
              </button>
            ))}
          </div>
        </div>

        {/* Question Cards Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredInlineQuestions.map((qItem, qIdx) => {
            const userChosen = inlineAnswers[qItem.id];
            const isAnswered = userChosen !== undefined;
            const isCorrect = userChosen === qItem.correctOption;
            const isExpVisible = expandedExplanations[qItem.id];

            return (
              <div key={qItem.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 hover:border-purple-500/30 transition">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {qItem.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">• {qItem.topic}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-500">Question #{qIdx + 1}</span>
                </div>

                <p className="text-sm font-semibold text-white leading-relaxed">{qItem.question}</p>

                {/* Options List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {qItem.options.map((opt, optIdx) => {
                    const isSelected = userChosen === optIdx;
                    let optionStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (isAnswered) {
                      if (optIdx === qItem.correctOption) {
                        optionStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'bg-rose-500/20 border-rose-500 text-rose-200 font-bold';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleInlineSelect(qItem.id, optIdx)}
                        className={`p-3.5 rounded-xl border text-left transition flex items-center justify-between ${optionStyle}`}
                      >
                        <span className="flex items-center space-x-2">
                          <span className="font-mono text-slate-400 font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                          <span>{opt}</span>
                        </span>
                        {isAnswered && optIdx === qItem.correctOption && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback & Explanation Footer */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-900">
                  <div className="text-xs">
                    {isAnswered ? (
                      isCorrect ? (
                        <span className="text-emerald-400 font-bold flex items-center space-x-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Correct Answer! Well done.</span>
                        </span>
                      ) : (
                        <span className="text-rose-400 font-bold flex items-center space-x-1">
                          <AlertCircle className="w-4 h-4" />
                          <span>Incorrect. Correct option is ({String.fromCharCode(65 + qItem.correctOption)}).</span>
                        </span>
                      )
                    ) : (
                      <span className="text-slate-500 italic">Select an option to test your answer instantly.</span>
                    )}
                  </div>

                  <button
                    onClick={() => toggleExplanation(qItem.id)}
                    className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center space-x-1 shrink-0 self-end sm:self-auto"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isExpVisible ? 'Hide Explanation' : 'View Step-by-Step Explanation'}</span>
                    {isExpVisible ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Expanded Explanation Box */}
                {isExpVisible && (
                  <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/40 to-slate-900 border border-purple-500/30 text-xs space-y-1 animate-fadeIn">
                    <span className="text-[10px] uppercase font-bold text-purple-400 block">Step-by-Step Explanation:</span>
                    <p className="text-slate-200 leading-relaxed font-medium">{qItem.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Practice Test Runner Modal */}
      {testActive && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-purple-500/40 rounded-2xl p-6 max-w-xl w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            {!testResult ? (
              <>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-purple-400">Timed Aptitude Screening Engine</span>
                    <h3 className="text-base font-bold text-white">Question {currentQIndex + 1} of {sampleQuestions.length}</h3>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}</span>
                    </span>
                    <button onClick={() => setTestActive(false)} className="text-slate-400 hover:text-white font-bold text-sm">✕</button>
                  </div>
                </div>

                {/* Question */}
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                    <span className="text-[10px] uppercase font-bold text-purple-400 block">{sampleQuestions[currentQIndex]?.category} • {sampleQuestions[currentQIndex]?.topic}</span>
                    <p className="text-sm font-semibold text-white leading-relaxed">{sampleQuestions[currentQIndex]?.question}</p>
                  </div>

                  {/* Options */}
                  <div className="space-y-2 text-xs">
                    {sampleQuestions[currentQIndex]?.options.map((opt, oIdx) => {
                      const isSelected = selectedAnswers[sampleQuestions[currentQIndex].id] === oIdx;
                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectOption(sampleQuestions[currentQIndex].id, oIdx)}
                          className={`w-full text-left p-3.5 rounded-xl border transition flex items-center justify-between ${
                            isSelected
                              ? 'bg-purple-500/20 border-purple-500 text-white font-semibold'
                              : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span>{opt}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    disabled={currentQIndex === 0}
                    onClick={() => setCurrentQIndex(i => i - 1)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 disabled:opacity-40 text-xs font-bold"
                  >
                    Previous
                  </button>

                  {currentQIndex < sampleQuestions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQIndex(i => i + 1)}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold"
                    >
                      Next Question
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitTest}
                      className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center space-x-1"
                    >
                      <CheckSquare className="w-4 h-4" />
                      <span>Submit Aptitude Test</span>
                    </button>
                  )}
                </div>
              </>
            ) : (
              /* Test Result View */
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950 to-slate-900 border border-purple-500/40 text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold text-purple-400">Test Evaluation Summary</span>
                  <div className="text-3xl font-black text-white">{testResult.score}% Accuracy</div>
                  <p className="text-slate-300">{testResult.correctCount} of {testResult.totalQuestions} Questions Correct • Time: {testResult.timeTaken}</p>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                  <p className="leading-relaxed font-semibold">
                    ✓ {testResult.message || testResult.recommendation}
                  </p>
                </div>

                <div className="flex justify-end pt-2">
                  <button onClick={() => setTestActive(false)} className="px-5 py-2 rounded-xl bg-purple-600 text-white font-bold">
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
