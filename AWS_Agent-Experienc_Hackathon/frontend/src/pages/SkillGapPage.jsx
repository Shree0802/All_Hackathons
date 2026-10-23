import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Sparkles, 
  HelpCircle,
  TrendingUp,
  Award
} from 'lucide-react';
import { api } from '../services/api';

export default function SkillGapPage({ profile, onQuickPrompt }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkillAssessment();
  }, [profile]);

  const fetchSkillAssessment = async () => {
    setLoading(true);
    try {
      const resp = await api.chatWithAgent(
        `Assess my skill gaps for ${profile?.target_role || "Full-Stack AI Engineer"}`,
        'auto'
      );
      if (resp && resp.result) {
        setData(resp.result);
      }
    } catch (e) {
      console.error("Failed to load skill assessment:", e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs text-gray-400 font-mono">Running Skill Gap Assessment Engine...</p>
      </div>
    );
  }

  const matchingSkills = data?.matching_skills || [];
  const missingSkills = data?.missing_skills || [];
  const readiness = data?.readiness_score || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-blue-400" />
            <h1 className="text-lg font-bold text-white">Skill Gap Analysis Matrix</h1>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Target Role: <strong className="text-blue-300">{data?.target_role || profile?.target_role}</strong>
          </p>
        </div>

        <button
          onClick={fetchSkillAssessment}
          className="px-3 py-1.5 bg-gray-800 hover:bg-gray-750 text-gray-200 border border-gray-700 rounded-lg text-xs font-medium transition-all"
        >
          Re-evaluate Matrix
        </button>
      </div>

      {/* Readiness Index & Educational Disclaimer */}
      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Readiness Meter Card */}
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 text-center shadow-lg">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-2">
            Curriculum Match Index
          </span>
          <div className="relative inline-flex items-center justify-center my-2">
            <span className="text-4xl font-extrabold text-white font-mono">
              {readiness}%
            </span>
          </div>
          <div className="w-full bg-gray-800 h-2.5 rounded-full overflow-hidden my-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(5, readiness))}%` }}
            />
          </div>
          <p className="text-[11px] text-gray-400">
            {matchingSkills.length} competencies verified out of {data?.total_required_skills || 10} required.
          </p>
        </div>

        {/* Career Advice from Bedrock */}
        <div className="md:col-span-2 bg-[#111827] border border-gray-800 rounded-xl p-6 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-violet-400 text-xs font-semibold uppercase mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Personalized Recommendations ({data?.advice_source || "AI Advisor"})</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-line">
              {data?.career_advice}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-800/80 flex items-center justify-between text-[11px] text-gray-500">
            <span>Metric note: {data?.readiness_explanation}</span>
          </div>
        </div>
      </div>

      {/* Breakdown: Matching vs Missing Skills */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Matching Skills */}
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-lg">
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <h3 className="font-semibold text-white text-sm">
              Matching Skills ({matchingSkills.length})
            </h3>
          </div>

          <div className="space-y-2.5">
            {matchingSkills.map((s, idx) => (
              <div key={idx} className="bg-gray-900/60 border border-gray-800 p-3 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-gray-200 block">{s.name}</span>
                  <span className="text-[10px] text-gray-400 uppercase font-mono">Importance: {s.importance}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {s.student_proficiency} / {s.required_proficiency}
                  </span>
                  <span className="text-[10px] text-gray-500 block">Proficient</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Missing or Developing Skills */}
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-lg">
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <h3 className="font-semibold text-white text-sm">
              Missing & Developing Areas ({missingSkills.length})
            </h3>
          </div>

          <div className="space-y-2.5">
            {missingSkills.map((s, idx) => (
              <div key={idx} className="bg-gray-900/60 border border-gray-800 p-3 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-gray-200 block">{s.name}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                    s.priority === 'Critical' 
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                  }`}>
                    Priority: {s.priority}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {s.student_proficiency} / {s.required_proficiency}
                  </span>
                  <span className="text-[10px] text-gray-500 block">Needs +{s.gap}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suggested Action Bar */}
      <div className="bg-blue-950/20 border border-blue-500/30 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="text-blue-200">
          Want a structured schedule to bridge these gaps?
        </span>
        <button
          onClick={() => onQuickPrompt("Generate a 6-week study roadmap addressing my skill gaps")}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all"
        >
          <span>Generate Gap-Focused Roadmap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
