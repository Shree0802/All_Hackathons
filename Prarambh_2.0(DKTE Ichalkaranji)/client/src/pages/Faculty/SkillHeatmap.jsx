import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../services/api';
import { Grid, Filter } from 'lucide-react';

export const SkillHeatmap = () => {
  const [heatmap, setHeatmap] = useState([]);
  const [branch, setBranch] = useState('Computer Science (AI & ML)');

  useEffect(() => {
    const fetchHeatmap = async () => {
      try {
        const res = await apiFetch('/faculty/skill-heatmap');
        setHeatmap(res.skillHeatmap || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchHeatmap();
  }, []);

  const getHeatmapBg = (val) => {
    if (val >= 75) return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold';
    if (val >= 60) return 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold';
    if (val >= 45) return 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold';
    return 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold';
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Institutional Skill Gap Heatmap</h1>
          <p className="text-xs text-slate-400">Competency progression matrix across academic cohorts (FY, SY, TY, LY).</p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2 text-xs">
            <Filter className="w-3.5 h-3.5 text-brand-400" />
            <span className="text-slate-400">Branch:</span>
            <select
              value={branch}
              onChange={e => setBranch(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500"
            >
              <option value="Computer Science (AI & ML)">CS (AI & ML)</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics & CS">Electronics & CS</option>
            </select>
          </div>
        </div>
      </div>

      {/* Heatmap Grid Table */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-6">Skill Name</th>
                <th className="py-3.5 px-6 text-center">First Year (FY)</th>
                <th className="py-3.5 px-6 text-center">Second Year (SY)</th>
                <th className="py-3.5 px-6 text-center">Third Year (TY)</th>
                <th className="py-3.5 px-6 text-center">Final Year (LY)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {heatmap.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-850/50 transition">
                  <td className="py-4 px-6 font-bold text-white text-sm">{row.skillName}</td>
                  <td className="py-4 px-6 text-center">
                    <span className={`inline-block w-16 py-1.5 rounded-xl border ${getHeatmapBg(row.fy)}`}>
                      {row.fy}%
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`inline-block w-16 py-1.5 rounded-xl border ${getHeatmapBg(row.sy)}`}>
                      {row.sy}%
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`inline-block w-16 py-1.5 rounded-xl border ${getHeatmapBg(row.ty)}`}>
                      {row.ty}%
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`inline-block w-16 py-1.5 rounded-xl border ${getHeatmapBg(row.ly)}`}>
                      {row.ly}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-end space-x-4 text-[11px] text-slate-400">
          <span className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded bg-emerald-500/40 border border-emerald-400"></span>
            <span>75%+ (Advanced)</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded bg-sky-500/40 border border-sky-400"></span>
            <span>60-74% (Proficient)</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded bg-amber-500/40 border border-amber-400"></span>
            <span>45-59% (Developing)</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded bg-rose-500/40 border border-rose-400"></span>
            <span>&lt;45% (Critical Gap)</span>
          </span>
        </div>
      </div>
    </div>
  );
};
