import React from 'react';
import { Award } from 'lucide-react';

export const CompetencyLevelBadge = ({ level = 4, label = 'Advanced' }) => {
  let style = 'bg-sky-500/10 text-sky-400 border-sky-500/30';
  if (level === 5) style = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-bold';
  else if (level === 3) style = 'bg-brand-500/10 text-brand-300 border-brand-500/30';
  else if (level === 2) style = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
  else if (level === 1) style = 'bg-slate-500/10 text-slate-400 border-slate-500/30';

  return (
    <span className={`inline-flex items-center space-x-1.5 text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full border ${style}`}>
      <Award className="w-3 h-3" />
      <span>L{level}: {label}</span>
    </span>
  );
};
