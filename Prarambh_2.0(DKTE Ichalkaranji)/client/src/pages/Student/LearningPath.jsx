import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../services/api';
import { Compass, CheckCircle2, Clock, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

export const LearningPath = () => {
  const [pathData, setPathData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPath = async () => {
      try {
        const res = await apiFetch('/learning-paths');
        setPathData(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchPath();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const { targetRoleTitle, totalPhases, estimatedCompletionDays, phases } = pathData || {};

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">AI Personalized Learning Roadmap</h1>
          <p className="text-xs text-slate-400">Tailored 4-phase sequence designed by EDUTECH AI to bridge your exact competency gaps for <strong className="text-brand-300">{targetRoleTitle}</strong>.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
            Total Duration: <strong className="text-white">{estimatedCompletionDays} Days</strong>
          </span>
        </div>
      </div>

      {/* Roadmap Sequence */}
      <div className="space-y-6">
        {phases?.map((phase, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 hover:border-brand-500/40 transition">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 text-white font-extrabold flex items-center justify-center text-base shadow-lg shadow-brand-500/20">
                  P{phase.phaseNumber}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{phase.title}</h3>
                  <span className="text-xs text-slate-400 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-brand-400" />
                    <span>Duration: {phase.durationDays} Days</span>
                  </span>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold">
                Phase {phase.phaseNumber} of {totalPhases}
              </span>
            </div>

            {/* Why Recommended Explanation Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-brand-500/30 space-y-1 text-xs">
              <div className="flex items-center space-x-1.5 text-amber-400 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Why this is recommended for you</span>
              </div>
              <p className="text-slate-300 leading-relaxed pl-5">{phase.recommendedReason}</p>
            </div>

            {/* Topics List */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Curriculum Topics & Exercises</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {phase.topics?.map((topic, tIdx) => (
                  <div key={tIdx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
