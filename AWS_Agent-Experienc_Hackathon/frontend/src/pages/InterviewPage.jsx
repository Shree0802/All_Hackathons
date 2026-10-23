import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Code2, 
  CheckCircle2, 
  HelpCircle, 
  Calendar, 
  Sparkles, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { api } from '../services/api';

export default function InterviewPage({ profile, onQuickPrompt }) {
  const [prepData, setPrepData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterviewPrep();
  }, [profile]);

  const fetchInterviewPrep = async () => {
    setLoading(true);
    try {
      const resp = await api.getInterviewPrep(profile?.target_role || "Full-Stack AI Engineer");
      setPrepData(resp);
    } catch (e) {
      console.error("Failed to load interview prep:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-purple-400" />
            <h1 className="text-lg font-bold text-white">Technical Interview Preparation Kit</h1>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Role: <strong className="text-blue-300">{prepData?.target_role || profile?.target_role}</strong>
          </p>
        </div>

        <button
          onClick={fetchInterviewPrep}
          className="px-3 py-1.5 bg-gray-800 hover:bg-gray-750 text-gray-200 border border-gray-700 rounded-lg text-xs font-medium transition-all"
        >
          Regenerate Kit
        </button>
      </div>

      {loading ? (
        <div className="py-16 text-center">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-gray-400 font-mono">Compiling technical interview questions...</p>
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* 7-Day Timetable */}
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-lg">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <h3 className="font-semibold text-white text-sm">7-Day Study Timetable</h3>
            </div>

            <div className="grid sm:grid-cols-5 gap-3">
              {prepData?.prep_schedule?.map((item, idx) => (
                <div key={idx} className="bg-gray-900/80 border border-gray-800 p-3 rounded-lg text-xs">
                  <span className="font-mono font-bold text-emerald-400 text-[11px] block mb-1">
                    {item.day}
                  </span>
                  <p className="text-gray-300 text-[11px] leading-relaxed">
                    {item.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* DSA Patterns & Technical Topics Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* High Frequency DSA Topics */}
            <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-lg">
              <div className="flex items-center space-x-2 mb-4">
                <Code2 className="w-4 h-4 text-blue-400" />
                <h3 className="font-semibold text-white text-sm">Key Coding & DSA Patterns</h3>
              </div>

              <div className="space-y-3">
                {prepData?.dsa_topics?.map((dsa, idx) => (
                  <div key={idx} className="bg-gray-900/60 border border-gray-800 p-3 rounded-lg text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-200">{dsa.topic}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                        Freq: {dsa.frequency}
                      </span>
                    </div>
                    <span className="text-gray-400 text-[11px] block">
                      Sample Problem: <code className="text-blue-300 font-mono">{dsa.sample}</code>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Subject Questions */}
            <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-lg">
              <div className="flex items-center space-x-2 mb-4">
                <HelpCircle className="w-4 h-4 text-violet-400" />
                <h3 className="font-semibold text-white text-sm">Core Engineering & System Questions</h3>
              </div>

              <div className="space-y-2.5">
                {prepData?.core_subject_questions?.map((q, idx) => (
                  <div key={idx} className="bg-gray-900/60 border border-gray-800 p-3 rounded-lg text-xs text-gray-300">
                    <span className="text-violet-400 font-bold mr-1">Q{idx + 1}:</span>
                    <span>{q}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Project & Behavioral Discussion */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Project Deep-Dive Prompts */}
            <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-lg">
              <h3 className="font-semibold text-white text-sm mb-3">Portfolio Defense Questions</h3>
              <div className="space-y-2 text-xs text-gray-300">
                {prepData?.project_discussion_questions?.map((pq, idx) => (
                  <p key={idx} className="bg-gray-900/60 p-2.5 rounded-lg border border-gray-800">
                    • {pq}
                  </p>
                ))}
              </div>
            </div>

            {/* Behavioral Questions */}
            <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-lg">
              <h3 className="font-semibold text-white text-sm mb-3">Behavioral & STAR Method</h3>
              <div className="space-y-2 text-xs text-gray-300">
                {prepData?.behavioral_questions?.map((bq, idx) => (
                  <p key={idx} className="bg-gray-900/60 p-2.5 rounded-lg border border-gray-800">
                    • {bq}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* AI Tailored Interviewer Prompt */}
          {prepData?.custom_interviewer_questions && (
            <div className="bg-purple-950/20 border border-purple-500/30 rounded-xl p-5">
              <div className="flex items-center space-x-2 text-purple-300 text-xs font-semibold uppercase mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Interviewer Screen Simulation</span>
              </div>
              <p className="text-xs text-gray-300 whitespace-pre-line leading-relaxed font-mono">
                {prepData.custom_interviewer_questions}
              </p>
              <div className="mt-4 pt-3 border-t border-purple-900/40 flex justify-end">
                <button
                  onClick={() => onQuickPrompt("Conduct a technical mock interview with me for Full-Stack AI Engineer")}
                  className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all shadow-sm"
                >
                  <span>Start Mock Interview Session</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
