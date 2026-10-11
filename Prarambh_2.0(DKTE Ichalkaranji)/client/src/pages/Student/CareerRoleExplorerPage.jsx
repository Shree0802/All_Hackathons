import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../services/api';
import { Target, CheckCircle2, TrendingUp, DollarSign, Award, ChevronRight, BarChart2 } from 'lucide-react';

export const CareerRoleExplorerPage = () => {
  const [comparisons, setComparisons] = useState([]);
  const [selectedRoleGap, setSelectedRoleGap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComparisons = async () => {
      try {
        const res = await apiFetch('/roles/compare');
        setComparisons(res.comparisons || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchComparisons();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Explore Career Roles & Multi-Role Readiness Comparison</h1>
        <p className="text-xs text-slate-400">Compare your verified skill profile against multiple industry roles simultaneously without ranking against other students.</p>
      </div>

      {/* Role Comparison Matrix Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {comparisons.map((item, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 hover:border-brand-500/40 transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-brand-400 tracking-wider">{item.category}</span>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                  {item.demandLevel}
                </span>
              </div>

              {/* Progress Bar for Readiness */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">Readiness Fit:</span>
                  <span className="text-brand-300 font-extrabold">{item.readinessPct}% Fit</span>
                </div>
                <div className="h-2 rounded-full bg-slate-950 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-500 to-emerald-400 rounded-full"
                    style={{ width: `${item.readinessPct}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span>Matched Skills: <strong className="text-white">{item.matchedSkillsCount}/{item.totalRequiredSkills}</strong></span>
                <span>Gaps: <strong className="text-rose-400">{item.skillGapCount} Skills</strong></span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">{item.avgSalary}</span>
              <button
                onClick={() => setSelectedRoleGap(item)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-brand-300 border border-brand-500/30 text-xs font-bold transition flex items-center space-x-1"
              >
                <span>View Gap</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Role Gap Breakdown Modal / Drawer */}
      {selectedRoleGap && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-brand-500/40 shadow-2xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-brand-400">Detailed Role Gap Matrix</span>
              <h3 className="text-lg font-bold text-white">{selectedRoleGap.title} ({selectedRoleGap.readinessPct}% Fit)</h3>
            </div>
            <button onClick={() => setSelectedRoleGap(null)} className="px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-400 hover:text-white">
              Close
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-4">Skill Required</th>
                  <th className="py-2.5 px-4">Current Score</th>
                  <th className="py-2.5 px-4">Required Score</th>
                  <th className="py-2.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {selectedRoleGap.gaps?.map((g, i) => (
                  <tr key={i}>
                    <td className="py-2.5 px-4 font-bold text-white">{g.skillName}</td>
                    <td className="py-2.5 px-4 font-bold text-slate-200">{g.currentScore}%</td>
                    <td className="py-2.5 px-4 font-bold text-slate-400">{g.requiredScore}%</td>
                    <td className="py-2.5 px-4 font-bold">
                      {g.gap > 0 ? (
                        <span className="text-rose-400">Gap -{g.gap}%</span>
                      ) : (
                        <span className="text-emerald-400">✓ Ready</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
