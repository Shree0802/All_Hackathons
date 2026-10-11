import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../services/api';
import { TrendingUp, AlertTriangle, CheckCircle2, ArrowRight, Sparkles, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SkillGapAnalysis = () => {
  const [gapData, setGapData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGap = async () => {
      try {
        const res = await apiFetch('/skill-gaps');
        setGapData(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchGap();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const { targetRoleTitle, readinessPct, matchedSkillsCount, totalRequiredSkills, skillGapCount, gaps } = gapData || {};

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">AI Skill Gap Engine</h1>
          <p className="text-xs text-slate-400">Comparing your verified competencies against employer requirements for <strong className="text-brand-300">{targetRoleTitle}</strong>.</p>
        </div>

        <Link
          to="/student/learning-path"
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white text-xs font-semibold shadow-lg shadow-brand-500/20 flex items-center space-x-2 transition"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Generate AI Learning Path</span>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Role Fit Alignment</span>
          <span className="text-2xl font-black text-brand-400">{readinessPct}%</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Matched Skills</span>
          <span className="text-2xl font-black text-emerald-400">{matchedSkillsCount} / {totalRequiredSkills}</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Identified Gaps</span>
          <span className="text-2xl font-black text-rose-400">{skillGapCount} Skills</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Target Role</span>
          <span className="text-sm font-bold text-white mt-1 block truncate">{targetRoleTitle}</span>
        </div>
      </div>

      {/* Skill Gap Comparison Table */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Competency Gap Matrix: Current vs Required
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Skill Name</th>
                <th className="py-3 px-4">Importance</th>
                <th className="py-3 px-4">Student Score</th>
                <th className="py-3 px-4">Required Score</th>
                <th className="py-3 px-4">Gap</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {gaps?.map((g, i) => {
                let statusBadge = (
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold flex items-center justify-end space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Ready</span>
                  </span>
                );
                if (g.status === 'major_gap') {
                  statusBadge = (
                    <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold flex items-center justify-end space-x-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Major Gap ({g.gap}%)</span>
                    </span>
                  );
                } else if (g.status === 'needs_improvement') {
                  statusBadge = (
                    <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold flex items-center justify-end space-x-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Needs Improvement ({g.gap}%)</span>
                    </span>
                  );
                }

                return (
                  <tr key={i} className="hover:bg-slate-850/50 transition">
                    <td className="py-3 px-4 font-bold text-white flex items-center space-x-2">
                      <span>{g.skillName}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
                        {g.importance}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-white">{g.currentScore}%</td>
                    <td className="py-3 px-4 font-bold text-slate-400">{g.requiredScore}%</td>
                    <td className="py-3 px-4 font-bold">
                      {g.gap > 0 ? <span className="text-rose-400">-{g.gap}%</span> : <span className="text-emerald-400">0%</span>}
                    </td>
                    <td className="py-3 px-4 text-right">{statusBadge}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
