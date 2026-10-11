import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Play, ShieldCheck, Code, BookOpen, Briefcase, ChevronDown, ChevronUp, CheckCircle, ArrowRight, X } from 'lucide-react';

export const JuryShowcaseBanner = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeScenario, setActiveScenario] = useState(null);
  const { loginDemoAccount } = useAuth();
  const navigate = useNavigate();

  const scenarios = [
    {
      id: 'gap-remediation',
      title: '1. Skill Gap & Remediation',
      icon: Sparkles,
      role: 'student',
      route: '/student/skill-gaps',
      badge: 'Student Workflow',
      color: 'from-amber-500 to-orange-600',
      description: 'Identifies 51% gap in Statistics/Cloud, recommends micro-course, takes assessment, boosts readiness to 86%.',
      steps: [
        'Switched to Student Profile (Prathamesh Patil)',
        'Navigated to AI Skill Gap Analysis (/student/skill-gaps)',
        'Detected 51% competency gap against Machine Learning Engineer role',
        'Auto-assigned personalized learning path: "Advanced Probability & Inference"',
        'Completed assessment & updated readiness score to 86%'
      ]
    },
    {
      id: 'repo-verification',
      title: '2. AI Repo & Anti-Fraud',
      icon: ShieldCheck,
      role: 'admin',
      route: '/admin/verification-center',
      badge: 'Integrity Engine',
      color: 'from-emerald-500 to-teal-600',
      description: 'Parses GitHub repos, checks commit depth, author identity, originality score (89%), and issue audit hash.',
      steps: [
        'Switched to System Admin / Verification Engine',
        'Loaded Admin Anti-Fraud Verification Center (/admin/verification-center)',
        'Ran AI Repository Auditor on "AI Resume Analyzer" repository',
        'Verified commit depth (28 commits), code originality (89%), and non-tutorial status',
        'Generated immutable verification hash: 0x8f2a...9c41'
      ]
    },
    {
      id: 'monaco-sandbox',
      title: '3. Monaco Code Sandbox',
      icon: Code,
      role: 'student',
      route: '/student/assessments',
      badge: 'Execution Engine',
      color: 'from-blue-500 to-indigo-600',
      description: 'Executes Python Kadane\'s algorithm & SQL Join queries in live web worker sandbox with automated test suites.',
      steps: [
        'Navigated to Practical Skill Assessments (/student/assessments)',
        'Launched Interactive Monaco Editor sandbox',
        'Loaded Python algorithm challenge: "Kadane\'s Maximum Subarray"',
        'Executed code against 4 automated unit test cases',
        'All test cases passed (100% Score) -> Competency updated in real-time'
      ]
    },
    {
      id: 'faculty-intervention',
      title: '4. Faculty Curriculum Alignment',
      icon: BookOpen,
      role: 'faculty',
      route: '/faculty/curriculum-gaps',
      badge: 'Institutional View',
      color: 'from-purple-500 to-pink-600',
      description: 'Analyzes CS department heatmaps, flags 58% Cloud gap, and launches 1-click curriculum intervention builder.',
      steps: [
        'Switched to Faculty / Department Head Profile (Dr. Aris Thorne)',
        'Navigated to Institutional Curriculum Gap Analysis (/faculty/curriculum-gaps)',
        'Identified 58% Cloud Computing deficit across 3rd year cohort',
        'Triggered Curriculum Intervention Builder',
        'Auto-assigned Cloud Infrastructure lab workshop to 42 affected students'
      ]
    },
    {
      id: 'employer-discovery',
      title: '5. Employer Precision Search',
      icon: Briefcase,
      role: 'employer',
      route: '/employer/candidates',
      badge: 'Recruiter Engine',
      color: 'from-cyan-500 to-blue-600',
      description: 'Filters candidates by Python >= 80% & verified evidence, inspects code dossiers, and sends direct interview invites.',
      steps: [
        'Switched to Employer Profile (TechNova Recruiting Team)',
        'Opened Evidence-First Candidate Discovery (/employer/candidates)',
        'Applied precision filter: Python >= 80% & Verified Evidence = HIGH',
        'Inspected candidate verified GitHub code dossier & assessment proof',
        'Sent formal interview invitation with required competency targets'
      ]
    }
  ];

  const handleRunScenario = (sc) => {
    loginDemoAccount(sc.role);
    setActiveScenario(sc);
    navigate(sc.route);
  };

  return (
    <>
      {/* Sticky Jury Banner */}
      <div className="bg-slate-900 border-b border-brand-500/30 px-4 py-2.5 shadow-2xl relative z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Header & Toggle */}
          <div className="flex items-center justify-between w-full md:w-auto space-x-3">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500"></span>
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-white flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Jury Demo Control Panel</span>
              </span>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-white text-xs font-semibold flex items-center space-x-1 md:hidden"
            >
              <span>{isOpen ? 'Hide' : 'Show Scenarios'}</span>
              {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Scenario Action Buttons */}
          {isOpen && (
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-1.5 w-full md:w-auto">
              {scenarios.map((sc) => {
                const IconComponent = sc.icon;
                return (
                  <button
                    key={sc.id}
                    onClick={() => handleRunScenario(sc)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-brand-500/50 text-slate-200 text-xs font-semibold flex items-center space-x-1.5 transition group"
                  >
                    <IconComponent className="w-3.5 h-3.5 text-brand-400 group-hover:scale-110 transition-transform" />
                    <span>{sc.title}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Scenario Walkthrough Modal */}
      {activeScenario && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-brand-500/40 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${activeScenario.color} flex items-center justify-center text-white shadow-md`}>
                  <activeScenario.icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{activeScenario.title}</h3>
                  <span className="text-[10px] uppercase font-bold text-brand-400">{activeScenario.badge}</span>
                </div>
              </div>
              <button
                onClick={() => setActiveScenario(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {activeScenario.description}
            </p>

            <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Executed Demo Sequence</span>
              {activeScenario.steps.map((step, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-[10px] text-slate-400">Target Role: <strong className="text-white capitalize">{activeScenario.role}</strong></span>
              <button
                onClick={() => setActiveScenario(null)}
                className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold flex items-center space-x-1.5 transition"
              >
                <span>Explore Interactive Screen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
