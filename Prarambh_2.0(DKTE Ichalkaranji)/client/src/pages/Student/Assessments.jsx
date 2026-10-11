import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../services/api';
import Editor from '@monaco-editor/react';
import { CheckSquare, Play, CheckCircle2, Clock, Code2, Award, ArrowLeft } from 'lucide-react';

export const Assessments = () => {
  const [assessments, setAssessments] = useState([]);
  const [activeAssessment, setActiveAssessment] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submittedResult, setSubmittedResult] = useState(null);

  // Coding Challenge State
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [codeOutput, setCodeOutput] = useState(null);
  const [runningCode, setRunningCode] = useState(false);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const res = await apiFetch('/assessments');
        setAssessments(res || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchAssessments();
  }, []);

  const openAssessment = async (asm) => {
    setActiveAssessment(asm);
    setAnswers({});
    setSubmittedResult(null);
    if (asm.codingChallenge?.initialTemplate) {
      setCode(asm.codingChallenge.initialTemplate[selectedLanguage] || '# Write code here');
    }
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    if (activeAssessment?.codingChallenge?.initialTemplate) {
      setCode(activeAssessment.codingChallenge.initialTemplate[lang] || '');
    }
  };

  const handleRunCode = async () => {
    setRunningCode(true);
    try {
      const res = await apiFetch('/assessments/code/run', {
        method: 'POST',
        body: JSON.stringify({ code, language: selectedLanguage, problemId: 'max_subarray' })
      });
      setCodeOutput(res);
    } catch (e) {
      alert(e.message);
    } finally {
      setRunningCode(false);
    }
  };

  const handleSubmitMCQ = async () => {
    try {
      const res = await apiFetch(`/assessments/${activeAssessment.assessmentId}/submit`, {
        method: 'POST',
        body: JSON.stringify({ assessmentId: activeAssessment.assessmentId, userAnswers: answers })
      });
      setSubmittedResult(res);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Practical Assessment Engine</h1>
          <p className="text-xs text-slate-400">Proctored technical MCQs & interactive live coding challenges with automated test suite runners.</p>
        </div>
        {activeAssessment && (
          <button
            onClick={() => setActiveAssessment(null)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white flex items-center space-x-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Assessment List</span>
          </button>
        )}
      </div>

      {!activeAssessment ? (
        /* Catalog View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assessments.map((asm, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 hover:border-brand-500/40 transition">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-brand-400 tracking-wider">{asm.category}</span>
                  <h3 className="text-lg font-bold text-white mt-0.5">{asm.title}</h3>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-semibold text-amber-400">
                  {asm.difficulty}
                </span>
              </div>

              <div className="flex items-center space-x-4 text-xs text-slate-400">
                <span className="flex items-center space-x-1">
                  <CheckSquare className="w-3.5 h-3.5 text-brand-400" />
                  <span>{asm.questionCount} Questions</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{asm.timeLimitMinutes} Mins</span>
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {asm.skillsEvaluated?.map((sk, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-brand-500/10 border border-brand-500/20 text-brand-300 font-medium">
                    {sk}
                  </span>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => openAssessment(asm)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white text-xs font-semibold shadow-lg shadow-brand-500/20 transition"
                >
                  Start Assessment & Code Runner
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Assessment Runner View */
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">{activeAssessment.title}</h2>
              <p className="text-xs text-slate-400">Evaluate your practical problem solving skills.</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-brand-400 block">Time Remaining: {activeAssessment.timeLimitMinutes}:00</span>
            </div>
          </div>

          {/* MCQ Section */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Part 1: Multiple Choice Questions ({activeAssessment.questions?.length})
            </h3>

            {activeAssessment.questions?.map((q, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
                <h4 className="text-xs font-bold text-white">Q{idx + 1}. {q.text}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options?.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => setAnswers({ ...answers, [q.questionId]: optIdx })}
                      className={`p-3 rounded-xl text-left text-xs font-medium border transition ${
                        answers[q.questionId] === optIdx
                          ? 'bg-brand-500/20 border-brand-500 text-white font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                      }`}
                    >
                      <span className="font-bold mr-1.5">{String.fromCharCode(65 + optIdx)}.</span> {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex justify-end">
              <button
                onClick={handleSubmitMCQ}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition"
              >
                Submit MCQ Answers
              </button>
            </div>

            {submittedResult && (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs space-y-1">
                <p className="font-bold">{submittedResult.message}</p>
                <p>Score: {submittedResult.scorePercentage}% | Level: {submittedResult.competencyLevel}</p>
              </div>
            )}
          </div>

          {/* Interactive Coding Challenge Section */}
          {activeAssessment.codingChallenge && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
                  <Code2 className="w-4 h-4 text-brand-400" />
                  <span>Part 2: Interactive Coding Assessment</span>
                </h3>

                {/* Language Switcher */}
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-400">Language:</span>
                  {['python', 'javascript', 'java'].map(lang => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase transition ${
                        selectedLanguage === lang
                          ? 'bg-brand-500 text-white'
                          : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Problem Statement */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <h4 className="text-xs font-bold text-amber-400">{activeAssessment.codingChallenge.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{activeAssessment.codingChallenge.problemStatement}</p>
              </div>

              {/* Monaco Code Editor */}
              <div className="border border-slate-800 rounded-xl overflow-hidden h-64 bg-slate-950">
                <Editor
                  height="100%"
                  language={selectedLanguage === 'python' ? 'python' : selectedLanguage === 'javascript' ? 'javascript' : 'java'}
                  theme="vs-dark"
                  value={code}
                  onChange={val => setCode(val || '')}
                  options={{
                    fontSize: 12,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                  }}
                />
              </div>

              {/* Controls & Test Runner */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handleRunCode}
                  disabled={runningCode}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-bold flex items-center space-x-2 transition disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{runningCode ? 'Running Test Cases...' : 'Run Test Suite'}</span>
                </button>
              </div>

              {/* Output Sandbox Console */}
              {codeOutput && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 uppercase font-bold text-[10px]">Test Suite Execution Logs</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${codeOutput.success ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                      {codeOutput.testCasesPassed} / {codeOutput.totalTestCases} Passed ({codeOutput.executionTimeMs}ms)
                    </span>
                  </div>
                  <pre className="text-slate-200 whitespace-pre-wrap">{codeOutput.output}</pre>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
