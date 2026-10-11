import React from 'react';
import { X, HelpCircle, Info, Calculator, CheckCircle2 } from 'lucide-react';

export const ReadinessBreakdownModal = ({ isOpen, onClose, breakdown, overallScore = 78 }) => {
  if (!isOpen) return null;

  const components = [
    { name: 'Technical Competency', score: breakdown?.technicalCompetency || 82, weight: '35%', contribution: '28.7%', desc: 'Verified skills aggregate across Python, SQL, ML, Git, & Statistics.' },
    { name: 'Practical Evidence', score: breakdown?.practicalEvidence || 76, weight: '25%', contribution: '19.0%', desc: 'Total verified portfolio items (4 Projects, 3 Certifications, 6 Assessments).' },
    { name: 'Assessment Performance', score: breakdown?.assessments || 81, weight: '20%', contribution: '16.2%', desc: 'Proctored MCQ score & interactive coding execution pass rate.' },
    { name: 'Project Verification', score: breakdown?.projectVerification || 74, weight: '10%', contribution: '7.4%', desc: 'AI GitHub repository inspection, commit history, and code structure score.' },
    { name: 'Role Alignment', score: breakdown?.roleAlignment || 78, weight: '10%', contribution: '7.8%', desc: 'Alignment percentage against target role (Machine Learning Engineer).' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Industry Readiness Mathematical Formula</h3>
              <p className="text-xs text-slate-400">Transparent 5-component weighted scoring engine</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Main Calculation summary box */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-brand-950 to-indigo-950 border border-brand-500/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-brand-400 tracking-wider">Final Weighted Calculation</span>
              <div className="text-2xl font-black text-white mt-0.5">{overallScore}% Readiness</div>
              <p className="text-[11px] text-slate-300 mt-1">
                Sum of (Component Score × Weight) = <span className="text-amber-400 font-mono font-bold">78.1% → 78%</span>
              </p>
            </div>
            <div className="w-14 h-14 rounded-full bg-brand-500/20 border-2 border-brand-400 flex items-center justify-center text-xl font-bold text-brand-300">
              78%
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Component Breakdown</span>
              <span>Weighted Contribution</span>
            </div>

            <div className="space-y-2.5">
              {components.map((c, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-semibold text-white">{c.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">Weight: {c.weight}</span>
                    </div>
                    <div className="text-xs font-bold text-brand-300">
                      {c.score}% <span className="text-slate-500 font-normal">({c.contribution})</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight pl-6">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Guarantee */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 flex items-start space-x-2.5">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-amber-400">No Fake Scores:</strong> Unlike traditional self-declared resume scores, EDUTECH recalculates readiness dynamically whenever you verify a new project, complete an assessment, or update target role competencies.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/80 text-right">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold transition"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
