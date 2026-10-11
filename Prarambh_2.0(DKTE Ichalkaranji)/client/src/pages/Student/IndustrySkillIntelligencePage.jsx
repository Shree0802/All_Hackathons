import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../services/api';
import { TrendingUp, Sparkles, Cpu, Layers } from 'lucide-react';

export const IndustrySkillIntelligencePage = () => {
  const [intel, setIntel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIntel = async () => {
      try {
        const res = await apiFetch('/learning-modules');
        setIntel(res.marketIntelligence);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchIntel();
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
        <h1 className="text-2xl font-bold text-white tracking-tight">Industry Skill Demand Intelligence</h1>
        <p className="text-xs text-slate-400">Market skill demand analytics highlighting emerging technology competencies.</p>
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-950 via-slate-900 to-indigo-950 border border-brand-500/30 shadow-xl space-y-2">
        <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Market Hiring Summary</span>
        </div>
        <p className="text-sm font-semibold text-white leading-relaxed">{intel?.marketSummary}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {intel?.trendingSkills?.map((skill, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3 hover:border-brand-500/40 transition">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-brand-400">{skill.category}</span>
                <h3 className="text-base font-bold text-white">{skill.name}</h3>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-black border border-emerald-500/20">
                {skill.growthRate}
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">{skill.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
