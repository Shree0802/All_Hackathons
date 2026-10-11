import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const OnboardingWizardModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const steps = [
    { num: 1, title: 'Academic Profile', desc: 'Confirm institution, degree, and semester coursework.' },
    { num: 2, title: 'Self-Declared Skills', desc: 'Select technical skills you possess (Python, SQL, ML, Git).' },
    { num: 3, title: 'Connect Projects', desc: 'Attach GitHub repositories for AI code analysis.' },
    { num: 4, title: 'Upload Certifications', desc: 'Add Coursera/IBM credential verification URLs.' },
    { num: 5, title: 'Select Target Role', desc: 'Set target role: Machine Learning Engineer.' },
    { num: 6, title: 'Practical Assessment', desc: 'Take Python MCQ & Kadane algorithm code runner.' },
    { num: 7, title: 'Skill Gap Matrix', desc: 'AI compares your competency against ML Engineer matrix.' },
    { num: 8, title: 'Skill Profile Ready', desc: 'Your EDUTECH Skill Dossier is live!' }
  ];

  const current = steps[step - 1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden text-slate-100 p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base text-white">Student Onboarding Wizard ({step} of 8)</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Pills */}
        <div className="grid grid-cols-8 gap-1">
          {steps.map((s) => (
            <div
              key={s.num}
              className={`h-1.5 rounded-full transition-all ${
                s.num <= step ? 'bg-brand-500' : 'bg-slate-800'
              }`}
            ></div>
          ))}
        </div>

        {/* Step Card */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-center">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/20 text-brand-300 font-black flex items-center justify-center text-xl mx-auto border border-brand-500/30">
            {current.num}
          </div>
          <h4 className="text-lg font-extrabold text-white">{current.title}</h4>
          <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">{current.desc}</p>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-xs text-slate-500 font-mono">Step {step} of 8</span>
          <button
            onClick={() => {
              if (step < 8) setStep(step + 1);
              else onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white text-xs font-bold flex items-center space-x-2 shadow-lg shadow-brand-500/20 transition"
          >
            <span>{step === 8 ? 'Enter Readiness Command Center' : 'Next Step'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
