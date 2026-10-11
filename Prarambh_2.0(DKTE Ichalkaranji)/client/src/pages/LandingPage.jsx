import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Target, 
  TrendingUp, 
  Award, 
  Bot, 
  Grid, 
  Building, 
  Zap,
  CheckSquare
} from 'lucide-react';

export const LandingPage = () => {
  const { loginDemoAccount } = useAuth();
  const navigate = useNavigate();

  const handleStartDemo = (role = 'student') => {
    loginDemoAccount(role);
    navigate(`/${role}`);
  };

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 px-4 max-w-6xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-bold animate-pulse">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>AI-Powered Evidence-Based Skill Intelligence Platform</span>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
            EDUTECH
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-indigo-300 to-emerald-400 mt-2">
              Prove Your Skills. Build Your Future.
            </span>
          </h1>

          <p className="text-base md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            An AI-powered skill intelligence platform that verifies practical competency, identifies industry skill gaps against target roles, and generates personalized learning paths for students.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => handleStartDemo('student')}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white text-sm font-bold shadow-xl shadow-brand-500/25 flex items-center space-x-2 transition transform hover:scale-105"
          >
            <span>Explore Student Platform</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleStartDemo('employer')}
            className="px-8 py-3.5 rounded-2xl bg-slate-900 border border-slate-700 hover:bg-slate-850 text-slate-200 text-sm font-bold flex items-center space-x-2 transition"
          >
            <Building className="w-4 h-4 text-emerald-400" />
            <span>Employer Candidate Portal</span>
          </button>
        </div>

        {/* Hero Dashboard Interactive Live Preview */}
        <div className="pt-8 max-w-5xl mx-auto">
          <div className="p-4 md:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6 text-left relative overflow-hidden backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-bold text-slate-400 ml-2">EDUTECH Verification Engine • Student: Prathamesh Patil</span>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Target Role: Machine Learning Engineer
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Score Box */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400">Industry Readiness Score</span>
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-400 my-1">78%</span>
                <p className="text-[11px] text-slate-400">Weighted sum of 5 competency vectors</p>
              </div>

              {/* Verified Competencies */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Verified Skill Matrix</span>
                <div className="space-y-1.5 text-xs font-semibold">
                  <div className="flex justify-between"><span>Python</span><span className="text-emerald-400">82% ✓</span></div>
                  <div className="flex justify-between"><span>Machine Learning</span><span className="text-brand-300">68% ✓</span></div>
                  <div className="flex justify-between"><span>Statistics</span><span className="text-rose-400">51% (Gap: 19%)</span></div>
                </div>
              </div>

              {/* AI Recommendation */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-brand-500/30 space-y-2">
                <span className="text-[10px] uppercase font-bold text-amber-400 block flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>AI Learning Path Next Phase</span>
                </span>
                <h4 className="text-xs font-bold text-white">Phase 1: Statistics & Probability (7 Days)</h4>
                <p className="text-[11px] text-slate-400 leading-snug">Closing your 19% Statistics gap will boost your ML readiness score to 86%+.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Core Workflow */}
      <section className="max-w-6xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-400">Proven End-to-End Workflow</span>
          <h2 className="text-3xl font-bold text-white">How EDUTECH Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { step: '01', title: 'Build Profile', desc: 'Connect projects, assessments, and certifications.' },
            { step: '02', title: 'Submit Evidence', desc: 'AI verifies GitHub code repos & commit logs.' },
            { step: '03', title: 'Verify Skills', desc: 'Proctored MCQs & live interactive coding test runners.' },
            { step: '04', title: 'Analyze Gaps', desc: 'Compare competencies vs industry role matrix.' },
            { step: '05', title: 'Become Ready', desc: 'AI generates personalized multi-phase learning roadmaps.' }
          ].map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-left space-y-2 relative">
              <span className="text-2xl font-black text-brand-500/40">{item.step}</span>
              <h3 className="text-sm font-bold text-white">{item.title}</h3>
              <p className="text-xs text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits for Students, Colleges, Employers */}
      <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">For Students</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Understand your actual competency, prove your skills with verified GitHub evidence, and close role gaps with personalized AI roadmaps.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
            <Grid className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">For Colleges & Faculty</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Gain real-time skill-gap visibility across FY, SY, TY, and LY cohorts with interactive heatmaps and AI curriculum insights.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Building className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">For Employers</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Evaluate candidates using verified code commit evidence and proctored assessment scores rather than self-declared resumes alone.
          </p>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="p-10 rounded-3xl bg-gradient-to-r from-brand-950 via-slate-900 to-indigo-950 border border-brand-500/30 space-y-6 shadow-2xl">
          <h2 className="text-3xl font-extrabold text-white">Start Building Your Verified Skill Profile</h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto">
            From learning to verified industry readiness. EDUTECH connects what students learn, what they build, and what industry requires.
          </p>
          <button
            onClick={() => handleStartDemo('student')}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white text-xs font-bold shadow-xl shadow-brand-500/30 transition transform hover:scale-105"
          >
            Launch EDUTECH Hackathon Prototype
          </button>
        </div>
      </section>
    </div>
  );
};
