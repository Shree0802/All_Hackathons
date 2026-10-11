import React from 'react';
import { CheckCircle, Clock, AlertCircle, XCircle } from 'lucide-react';

export const EvidenceBadge = ({ status = 'Verified' }) => {
  let style = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
  let Icon = CheckCircle;
  let label = '✓ Verified';

  if (status === 'Under Review') {
    style = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    Icon = Clock;
    label = '◐ Under Review';
  } else if (status === 'Unverified') {
    style = 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    Icon = AlertCircle;
    label = '○ Unverified';
  } else if (status === 'Rejected') {
    style = 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    Icon = XCircle;
    label = '✕ Rejected';
  }

  return (
    <span className={`inline-flex items-center space-x-1 text-[11px] font-bold px-2 py-0.5 rounded-full border ${style}`}>
      <Icon className="w-3 h-3" />
      <span>{label}</span>
    </span>
  );
};
