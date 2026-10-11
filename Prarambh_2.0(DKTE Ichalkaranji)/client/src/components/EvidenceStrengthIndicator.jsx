import React, { useState } from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export const EvidenceStrengthIndicator = ({ strength = 'HIGH', reason }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  let style = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
  if (strength === 'MEDIUM') style = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
  if (strength === 'LOW') style = 'bg-rose-500/10 text-rose-400 border-rose-500/30';

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
        className={`inline-flex items-center space-x-1 text-[10px] font-extrabold px-2 py-0.5 rounded border ${style} cursor-pointer`}
      >
        <ShieldCheck className="w-3 h-3" />
        <span>Evidence: {strength}</span>
        <Info className="w-2.5 h-2.5 opacity-60 ml-0.5" />
      </button>

      {showTooltip && (
        <div className="absolute bottom-full left-0 mb-2 w-56 p-2.5 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl z-50 text-[11px] text-slate-200 leading-snug animate-fadeIn">
          <span className="font-bold text-white block mb-0.5">Evidence Strength: {strength}</span>
          <p className="text-slate-300">{reason || 'Calculated based on verified GitHub code repos, proctored assessments, and certificate checks.'}</p>
        </div>
      )}
    </div>
  );
};
