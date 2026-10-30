import React, { useState } from 'react';
import { 
  Sliders, 
  Cpu, 
  Play, 
  Clock, 
  ShieldCheck, 
  BarChart2, 
  CheckCircle2, 
  AlertTriangle,
  Zap,
  Code
} from 'lucide-react';
import { api } from '../services/api';

export default function DecisionLabPage({ systemStatus }) {
  const [testPrompt, setTestPrompt] = useState('Compare my skills against Full-Stack AI Engineer requirements');
  const [mode, setMode] = useState('auto'); // auto, real, demo
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const testCases = [
    {
      label: "1. Skill Gap Analysis",
      prompt: "Compare my skills against Full-Stack AI Engineer and highlight what is missing",
      expected: "assess_skill_gaps"
    },
    {
      label: "2. Project Blueprint",
      prompt: "Suggest a capstone project that proves my ability in Strands Decider and Bedrock",
      expected: "recommend_project"
    },
    {
      label: "3. Learning Roadmap",
      prompt: "Generate a weekly learning curriculum and milestones for my career goal",
      expected: "generate_learning_roadmap"
    },
    {
      label: "4. Internship Search",
      prompt: "Find sample internship openings matching my Python and FastAPI background",
      expected: "search_internships"
    },
    {
      label: "5. Interview Preparation",
      prompt: "Prepare technical interview questions, coding patterns, and a study plan",
      expected: "prepare_interview"
    },
    {
      label: "6. General Career Q&A",
      prompt: "What is the industry difference between an AI Engineer and a traditional Software Engineer?",
      expected: "answer_general_question"
    },
    {
      label: "7. Ambiguous Request (Guardrail)",
      prompt: "hey",
      expected: "request_clarification"
    }
  ];

  const runDecisionTest = async (promptToRun) => {
    const finalPrompt = promptToRun || testPrompt;
    setLoading(true);
    setError(null);
    try {
      const data = await api.testDecision(finalPrompt, mode);
      setResult(data);
    } catch (err) {
      setError(err.message || "Failed to execute decision test on backend");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const trace = result?.decision_trace;
  const probabilities = trace?.probabilities || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-2">
            <Sliders className="w-5 h-5 text-violet-400" />
            <h1 className="text-lg font-bold text-white">Strands Decider 2B Decision Lab</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 font-mono">
              Pattern: #tool-selection
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Test prompt routing across the 7 typed choices and observe calibrated probability distributions.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center space-x-2 text-xs bg-[#111827] border border-gray-800 p-1 rounded-lg">
          <span className="text-gray-400 pl-2">Mode:</span>
          {['auto', 'real', 'demo'].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1 rounded text-xs font-medium capitalize transition-all ${
                mode === m
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Test Case Launcher Buttons */}
      <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-lg">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
          Select Standard Hackathon Test Case:
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {testCases.map((tc, idx) => (
            <button
              key={idx}
              onClick={() => {
                setTestPrompt(tc.prompt);
                runDecisionTest(tc.prompt);
              }}
              className="text-left text-xs bg-gray-900/80 hover:bg-gray-850 border border-gray-800 hover:border-violet-500/40 p-3 rounded-lg transition-all group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-gray-200 group-hover:text-violet-300">
                  {tc.label}
                </span>
                <span className="text-[10px] font-mono text-gray-500">
                  {tc.expected}
                </span>
              </div>
              <p className="text-[11px] text-gray-400 truncate">
                "{tc.prompt}"
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Prompt Runner */}
      <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-blue-400" />
          <h3 className="font-semibold text-white text-sm">Custom Request Runner</h3>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={testPrompt}
            onChange={(e) => setTestPrompt(e.target.value)}
            placeholder="Type any career or development prompt to test Decider 2B routing..."
            className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-gray-100 placeholder-gray-500 focus:outline-none focus:border-violet-500"
          />
          <button
            onClick={() => runDecisionTest()}
            disabled={loading || !testPrompt.trim()}
            className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all shadow-md shadow-violet-600/20"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Evaluate Decision</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="p-3 bg-rose-950/30 border border-rose-800/40 rounded-lg text-rose-300 text-xs">
            {error}
          </div>
        )}
      </div>

      {/* Output Panel: Live Decision Trace & Probability Chart */}
      {result && trace && (
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Decision Outcome */}
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <span className="font-semibold text-gray-200">Execution Result</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                trace.is_live_decider 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                  : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
              }`}>
                {trace.source}
              </span>
            </div>

            <div>
              <span className="text-gray-400 text-[10px] uppercase font-semibold block mb-1">
                Dispatched Action Option:
              </span>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-violet-400" />
                <span className="font-mono font-bold text-base text-violet-300">
                  {trace.selected_action}
                </span>
              </div>
            </div>

            <div className="bg-gray-900 p-3 rounded-lg border border-gray-800 space-y-1">
              <span className="text-[10px] text-gray-500 uppercase font-semibold block">
                Matched Action Criteria Description:
              </span>
              <p className="text-gray-300 text-[11px] leading-relaxed">
                {result.matched_criteria}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-gray-900 p-3 rounded-lg border border-gray-800">
                <span className="text-gray-500 text-[10px] uppercase font-semibold block mb-0.5">
                  Calibrated Confidence
                </span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  {trace.confidence !== null ? `${(trace.confidence * 100).toFixed(1)}%` : 'N/A'}
                </span>
              </div>
              <div className="bg-gray-900 p-3 rounded-lg border border-gray-800">
                <span className="text-gray-500 text-[10px] uppercase font-semibold block mb-0.5">
                  Decision Latency
                </span>
                <span className="font-mono font-bold text-gray-200 text-sm">
                  {trace.latency_ms} ms
                </span>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 italic pt-2">
              Note: {trace.reasoning}
            </p>
          </div>

          {/* Probabilities Distribution Chart */}
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <span className="font-semibold text-gray-200 flex items-center space-x-1.5">
                <BarChart2 className="w-4 h-4 text-violet-400" />
                <span>Softmax Probability Mass</span>
              </span>
              <span className="text-[10px] font-mono text-gray-500">
                (N*p_max - 1)/(N - 1)
              </span>
            </div>

            <div className="space-y-2.5">
              {Object.entries(probabilities)
                .sort((a, b) => b[1] - a[1])
                .map(([opt, prob]) => {
                  const isTop = opt === trace.selected_action;
                  const pct = (prob * 100).toFixed(1);
                  return (
                    <div key={opt} className="space-y-1">
                      <div className="flex justify-between font-mono text-[11px]">
                        <span className={isTop ? 'text-violet-300 font-bold' : 'text-gray-400'}>
                          {isTop ? '★ ' : ''}{opt}
                        </span>
                        <span className={isTop ? 'text-emerald-400 font-bold' : 'text-gray-500'}>
                          {pct}%
                        </span>
                      </div>
                      <div className="bg-gray-800 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            isTop ? 'bg-violet-500' : 'bg-gray-600'
                          }`}
                          style={{ width: `${Math.min(100, Math.max(3, prob * 100))}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
