import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiFetch } from '../../../services/api';
import { 
  Briefcase, 
  BookOpen, 
  Code, 
  CheckSquare, 
  Target, 
  Sparkles, 
  TrendingUp, 
  Award, 
  Zap, 
  Clock, 
  Flame, 
  CheckCircle2, 
  ArrowRight, 
  Calculator,
  HelpCircle,
  Play,
  FileCode,
  Building,
  Mic,
  BarChart2,
  ChevronRight
} from 'lucide-react';

const defaultProfile = {
  targetRole: 'Machine Learning Engineer',
  readinessScore: 68,
  breakdown: {
    coreSubjects: 72,
    aptitude: 64,
    dsa: 58,
    projects: 76,
    interview: 61
  },
  streakDays: 7,
  weeklyGoals: [
    { id: 1, title: 'Solve 15 DSA problems', completed: true },
    { id: 2, title: 'Complete DBMS SQL module', completed: true },
    { id: 3, title: 'Attempt 2 aptitude tests', completed: true },
    { id: 4, title: 'Complete one project milestone', completed: true },
    { id: 5, title: 'Take one technical assessment', completed: false },
    { id: 6, title: 'Complete one mock interview', completed: false }
  ],
  stats: {
    dsaSolved: { easy: 24, medium: 18, hard: 4, total: 46, max: 115 },
    aptitudeSolved: 84,
    aptitudeAccuracy: 78,
    projectsVerified: 2
  }
};

export const PlacementPrepDashboard = () => {
  const [profile, setProfile] = useState(defaultProfile);
  const [loading, setLoading] = useState(false);
  const [showFormulaModal, setShowFormulaModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiFetch('/placement/profile');
        if (data) setProfile(data);
      } catch (e) {
        console.error('Using default placement profile:', e);
      }
    };
    fetchProfile();
  }, []);

  const { targetRole, readinessScore, breakdown, streakDays, weeklyGoals, stats } = profile || {};

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-brand-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5">
                <Briefcase className="w-3.5 h-3.5 text-brand-400" />
                <span>Placement Preparation Hub</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center space-x-1">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>{streakDays || 7} Day Streak</span>
              </span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">Placement Preparation</h1>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Build the skills, practice the patterns, and prove your verified competency to become placement ready.
            </p>
            <div className="pt-1 flex items-center space-x-2 text-xs text-slate-400">
              <span>Target Role:</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-brand-400 font-bold flex items-center space-x-1">
                <Target className="w-3.5 h-3.5" />
                <span>{targetRole || 'Machine Learning Engineer'}</span>
              </span>
            </div>
          </div>

          {/* Large Placement Readiness Circle */}
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col items-center justify-center text-center space-y-2 shrink-0 min-w-[220px]">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Placement Readiness</span>
            <div className="relative flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-brand-500 to-emerald-500 p-1 flex items-center justify-center shadow-lg shadow-brand-500/20">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center flex-col">
                  <span className="text-3xl font-black text-white">{readinessScore || 68}%</span>
                  <span className="text-[9px] uppercase font-bold text-emerald-400">Placement Ready</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowFormulaModal(true)}
              className="text-[11px] text-brand-400 hover:text-brand-300 font-semibold flex items-center space-x-1 transition"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>How is this calculated?</span>
            </button>
          </div>
        </div>
      </div>

      {/* Readiness Component Progress Breakdown */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
            <BarChart2 className="w-4 h-4 text-brand-400" />
            <span>Placement Readiness Component Breakdown</span>
          </h3>
          <span className="text-xs text-slate-400">Target Role Benchmark: <strong className="text-white">75% Min Target</strong></span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { label: 'Core Subjects', val: breakdown?.coreSubjects || 72, color: 'from-blue-500 to-indigo-600', route: '/student/placement-prep/core-subjects' },
            { label: 'Aptitude & Reasoning', val: breakdown?.aptitude || 64, color: 'from-purple-500 to-pink-600', route: '/student/placement-prep/aptitude' },
            { label: 'DSA & Coding', val: breakdown?.dsa || 58, color: 'from-emerald-500 to-teal-600', route: '/student/placement-prep/dsa' },
            { label: 'Placement Projects', val: breakdown?.projects || 76, color: 'from-amber-500 to-orange-600', route: '/student/placement-prep/projects' },
            { label: 'Interview Prep', val: breakdown?.interview || 61, color: 'from-cyan-500 to-blue-600', route: '/student/mock-interview' }
          ].map((item, idx) => (
            <Link
              key={idx}
              to={item.route}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-brand-500/40 transition space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 truncate">{item.label}</span>
                <span className="text-xs font-bold text-white">{item.val}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-500`} 
                  style={{ width: `${item.val}%` }}
                ></div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Dashboard Quick Actions */}
      <div className="flex flex-wrap gap-2.5">
        <button
          onClick={() => navigate('/student/placement-prep/dsa')}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white text-xs font-bold flex items-center space-x-2 transition shadow-lg shadow-brand-500/20"
        >
          <Code className="w-4 h-4" />
          <span>Practice DSA</span>
        </button>
        <button
          onClick={() => navigate('/student/placement-prep/aptitude')}
          className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 text-slate-200 text-xs font-bold flex items-center space-x-2 transition"
        >
          <Zap className="w-4 h-4 text-purple-400" />
          <span>Take Aptitude Test</span>
        </button>
        <button
          onClick={() => navigate('/student/placement-prep/core-subjects')}
          className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/40 text-slate-200 text-xs font-bold flex items-center space-x-2 transition"
        >
          <BookOpen className="w-4 h-4 text-blue-400" />
          <span>Study Core CS Subjects</span>
        </button>
        <button
          onClick={() => navigate('/student/placement-prep/projects')}
          className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-200 text-xs font-bold flex items-center space-x-2 transition"
        >
          <FileCode className="w-4 h-4 text-amber-400" />
          <span>Build & Verify Project</span>
        </button>
        <button
          onClick={() => navigate('/student/placement-prep/mock-tests')}
          className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-slate-200 text-xs font-bold flex items-center space-x-2 transition"
        >
          <CheckSquare className="w-4 h-4 text-emerald-400" />
          <span>Take Mock Test</span>
        </button>
        <button
          onClick={() => navigate('/student/mock-interview')}
          className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-200 text-xs font-bold flex items-center space-x-2 transition"
        >
          <Mic className="w-4 h-4 text-cyan-400" />
          <span>AI Mock Interview</span>
        </button>
      </div>

      {/* 4 Major Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 01 CORE SUBJECTS */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between hover:border-blue-500/40 transition">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">01 — Core CS Subjects</span>
              <span className="text-xs font-bold text-blue-400">{breakdown?.coreSubjects || 72}% Complete</span>
            </div>
            <h3 className="text-lg font-extrabold text-white">Core Computer Science Fundamentals</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Master DBMS, Operating Systems, Computer Networks, OOP (Java Focus), and SQL queries evaluated in technical screening interviews.
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {['DBMS (72%)', 'OS (65%)', 'CN (60%)', 'OOP Java (80%)', 'SQL (85%)'].map((tag, k) => (
                <span key={k} className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-semibold">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">7 Core CS Topics Active</span>
            <Link
              to="/student/placement-prep/core-subjects"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center space-x-1.5 transition"
            >
              <span>Start Learning Subjects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 02 APTITUDE */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between hover:border-purple-500/40 transition">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">02 — Aptitude & Reasoning</span>
              <span className="text-xs font-bold text-purple-400">{breakdown?.aptitude || 64}% Score</span>
            </div>
            <h3 className="text-lg font-extrabold text-white">Aptitude & Logical Reasoning</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Build speed, accuracy, and problem-solving patterns for campus placement aptitude screening tests.
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Questions Solved</span>
                <span className="font-bold text-white text-sm">{stats?.aptitudeSolved || 84} Questions</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Test Accuracy</span>
                <span className="font-bold text-emerald-400 text-sm">{stats?.aptitudeAccuracy || 78}% Accuracy</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">4 Categories: Quant, Logical, Verbal, DI</span>
            <Link
              to="/student/placement-prep/aptitude"
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center space-x-1.5 transition"
            >
              <span>Practice Aptitude</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 03 DSA */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between hover:border-emerald-500/40 transition">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">03 — Data Structures & Algorithms</span>
              <span className="text-xs font-bold text-emerald-400">{stats?.dsaSolved?.total || 46} / {stats?.dsaSolved?.max || 115} Solved</span>
            </div>
            <h3 className="text-lg font-extrabold text-white">DSA Pattern System</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Master coding patterns (Sliding Window, Two Pointers, Binary Search, Fast & Slow Pointers, DP) for technical interviews.
            </p>

            <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-emerald-400 font-bold">Easy: {stats?.dsaSolved?.easy || 24}</span>
              <span className="text-amber-400 font-bold">Medium: {stats?.dsaSolved?.medium || 18}</span>
              <span className="text-rose-400 font-bold">Hard: {stats?.dsaSolved?.hard || 4}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">4 Levels • Pattern-Based Practice</span>
            <Link
              to="/student/placement-prep/dsa"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1.5 transition"
            >
              <span>Practice DSA Patterns</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 04 PLACEMENT PROJECTS */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between hover:border-amber-500/40 transition">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">04 — Placement Projects</span>
              <span className="text-xs font-bold text-amber-400">{stats?.projectsVerified || 2} Projects Verified</span>
            </div>
            <h3 className="text-lg font-extrabold text-white">Industry-Grade Placement Projects</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Build real-world engineering projects with phase milestone tracking and submit them directly for EDUTECH GitHub verification.
            </p>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
              <span className="font-bold text-white block">Active Project: AI Resume Analyzer</span>
              <span className="text-[10px] text-emerald-400 font-semibold">Phase 7: Verified & Linked to Skill Profile ✓</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Beginner, Intermediate & Advanced</span>
            <Link
              to="/student/placement-prep/projects"
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center space-x-1.5 transition"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Weekly Goals & Company Preparation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly Goals */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
              <Clock className="w-4 h-4 text-brand-400" />
              <span>This Week's Placement Goals</span>
            </h3>
            <span className="text-xs font-bold text-emerald-400">4 / 6 Completed</span>
          </div>

          <div className="space-y-2">
            {weeklyGoals?.map((g) => (
              <div key={g.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className={`w-4 h-4 ${g.completed ? 'text-emerald-400' : 'text-slate-600'}`} />
                  <span className={`font-semibold ${g.completed ? 'text-slate-200 line-through' : 'text-white'}`}>{g.title}</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${g.completed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>
                  {g.completed ? 'Done' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Company Preparation */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
              <Building className="w-4 h-4 text-brand-400" />
              <span>Target Company Preparation Tracks</span>
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-brand-500/30 space-y-1.5">
              <div className="flex items-center justify-between font-bold text-white">
                <span>AI & DeepTech Startups (TechNova Labs)</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-brand-500/20 text-brand-300">Target Fit: 88%</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Requires Python, ML, NLP, FastAPI & Docker. Medium DSA + High Statistics focus.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between font-bold text-white">
                <span>Product Based Giants (Tier-1)</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">Target Fit: 72%</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Requires Advanced DSA (DP & Graphs), System Design, and Core CS Fundamentals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Formula Explanation Modal */}
      {showFormulaModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-brand-500/40 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Calculator className="w-5 h-5 text-brand-400" />
                <h3 className="text-base font-bold text-white">Placement Readiness Formula</h3>
              </div>
              <button onClick={() => setShowFormulaModal(false)} className="text-slate-400 hover:text-white text-sm font-bold">✕</button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300">
              <p className="font-bold text-white">Mathematical Formula:</p>
              <div className="p-3 rounded-lg bg-slate-900 border border-brand-500/30 font-mono text-[11px] text-brand-300 leading-relaxed">
                Placement Readiness (68%) =<br/>
                • 20% Core Subjects (72%) → 14.4%<br/>
                • 15% Aptitude (64%) → 9.6%<br/>
                • 25% DSA (58%) → 14.5%<br/>
                • 20% Projects (76%) → 15.2%<br/>
                • 10% Assessments (81%) → 8.1%<br/>
                • 10% Interview Prep (61%) → 6.1%
              </div>
              <p className="text-[11px] text-slate-400">
                Score updates dynamically whenever you complete core CS topics, solve DSA problems, take aptitude tests, or verify projects.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowFormulaModal(false)}
                className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
