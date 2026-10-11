import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp } from 'lucide-react';

export const CompetencyGrowthChart = ({ data }) => {
  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>Closed Re-assessment Competency Growth</span>
        </h3>
        <span className="text-[10px] text-slate-500 font-mono">Measurable Progress History</span>
      </div>

      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
            <YAxis domain={[30, 100]} stroke="#64748b" tick={{ fontSize: 11 }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
            />
            <Line type="monotone" dataKey="Statistics" stroke="#f43f5e" strokeWidth={2.5} dot={{ r: 4 }} name="Statistics Gap" />
            <Line type="monotone" dataKey="MachineLearning" stroke="#38bdf8" strokeWidth={2.5} dot={{ r: 4 }} name="Machine Learning" />
            <Line type="monotone" dataKey="Readiness" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} name="Overall Readiness %" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center space-x-6 text-[11px] text-slate-400">
        <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span><span>Statistics (Gap Closed 40% → 68%)</span></span>
        <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span><span>Machine Learning</span></span>
        <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span><span>Overall Readiness (62% → 86%)</span></span>
      </div>
    </div>
  );
};
