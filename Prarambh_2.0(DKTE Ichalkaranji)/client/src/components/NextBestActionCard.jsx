import React from 'react';
import { Sparkles, ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NextBestActionCard = ({ actionData, onRunReassessment }) => {
  if (!actionData) return null;

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-950 via-slate-900 to-indigo-950 border border-brand-500/40 shadow-xl space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>AI Next Best Action</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 font-semibold border border-brand-500/30">
          Highest Impact
        </span>
      </div>

      <div className="space-y-1">
        <h3 className="text-base font-bold text-white">{actionData.title}</h3>
        <p className="text-xs text-slate-300 leading-relaxed">{actionData.reason}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
        <div className="text-xs text-slate-400">
          Current: <span className="font-bold text-rose-400">{actionData.currentScore}%</span> → Target: <span className="font-bold text-emerald-400">{actionData.requiredScore}%</span>
        </div>

        <div className="flex space-x-2">
          <Link
            to="/student/learning-hub"
            className="px-3.5 py-1.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold transition"
          >
            Start Learning Module
          </Link>
          {onRunReassessment && (
            <button
              onClick={onRunReassessment}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-emerald-400 border border-emerald-500/40 text-xs font-bold flex items-center space-x-1 transition"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Run Re-assessment</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
