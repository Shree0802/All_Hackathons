import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../../services/api';
import { Target, CheckCircle2, ArrowLeft, Clock, Sparkles, Flag, Calendar, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

const defaultRoadmap = {
  phases: [
    {
      phaseId: 1,
      name: 'Phase 1: Fundamentals & Core CS (Weeks 1-4)',
      description: 'Strengthen DBMS, OS, Networking, and OOP concepts alongside basic DSA.',
      tasks: [
        { id: 'r1', title: 'Complete DBMS SQL JOINs and Window Functions', completed: true },
        { id: 'r2', title: 'Master Process Synchronization and Memory Paging in OS', completed: true },
        { id: 'r3', title: 'Solve 30 Easy-Medium Arrays & String DSA problems', completed: true }
      ]
    },
    {
      phaseId: 2,
      name: 'Phase 2: Pattern Mastery & Aptitude Speed (Weeks 5-8)',
      description: 'Focus on Sliding Window, Two Pointers, Binary Search, and Quantitative Aptitude.',
      tasks: [
        { id: 'r4', title: 'Master 6 core DSA coding patterns with 50 solved problems', completed: true },
        { id: 'r5', title: 'Achieve >75% accuracy in Quantitative Aptitude screening tests', completed: true },
        { id: 'r6', title: 'Build and verify AI Resume Analyzer project on GitHub', completed: true }
      ]
    },
    {
      phaseId: 3,
      name: 'Phase 3: Advanced DSA, System Design & Mocks (Weeks 9-12)',
      description: 'Trees, Graphs, DP, System Architecture, and full AI Mock Interviews.',
      tasks: [
        { id: 'r7', title: 'Complete 3 Proctored Full-Length Campus Mock Drives', completed: false },
        { id: 'r8', title: 'Attempt 2 Technical AI Voice Mock Interviews', completed: false },
        { id: 'r9', title: 'Final Resume Audit & Portfolio Deployment', completed: false }
      ]
    }
  ]
};

export const PlacementRoadmapPage = () => {
  const [roadmap, setRoadmap] = useState(defaultRoadmap);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const res = await apiFetch('/placement/roadmap');
        if (res && res.phases) setRoadmap(res);
      } catch (e) {
        console.error('Using default placement roadmap:', e);
      }
    };
    fetchRoadmap();
  }, []);

  const handleToggleTask = async (taskId) => {
    try {
      const res = await apiFetch('/placement/roadmap/toggle-task', {
        method: 'POST',
        body: JSON.stringify({ taskId })
      });
      if (res.roadmap) setRoadmap(res.roadmap);
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const { studentName, branch, year, targetRole, phases } = roadmap || {};

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <Link to="/student/placement-prep" className="text-xs text-brand-400 hover:underline flex items-center space-x-1 mb-1 font-semibold">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Placement Dashboard</span>
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
            <Target className="w-6 h-6 text-brand-400" />
            <span>Personalized Placement Roadmap</span>
          </h1>
          <p className="text-xs text-slate-400">Generated dynamically for {studentName || 'Prathamesh'} ({branch || 'CS AI & ML'} • {year || '3rd Year'}) targeting {targetRole || 'Machine Learning Engineer'}.</p>
        </div>
      </div>

      {/* Phase Timeline Cards */}
      <div className="space-y-6">
        {phases?.map((p) => {
          const completedCount = p.tasks.filter(t => t.completed).length;
          const pct = Math.round((completedCount / p.tasks.length) * 100);

          return (
            <div key={p.phaseNumber} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 hover:border-brand-500/40 transition">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-brand-500/20 text-brand-400 font-bold flex items-center justify-center text-sm border border-brand-500/30">
                    P{p.phaseNumber}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{p.title}</h3>
                    <span className="text-xs text-slate-400">Duration: <strong className="text-white">{p.duration}</strong> • Priority: <strong className="text-brand-400">{p.priority}</strong></span>
                  </div>
                </div>

                <span className="text-xs font-bold text-emerald-400">{completedCount} / {p.tasks.length} Completed ({pct}%)</span>
              </div>

              {/* Tasks List */}
              <div className="space-y-2">
                {p.tasks.map((t) => (
                  <div key={t.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className={`w-4 h-4 ${t.completed ? 'text-emerald-400' : 'text-slate-600'}`} />
                      <span className={`font-semibold ${t.completed ? 'text-slate-200 line-through' : 'text-white'}`}>{t.text}</span>
                    </div>

                    <button
                      onClick={() => handleToggleTask(t.id)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold transition ${
                        t.completed ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-brand-500 hover:bg-brand-600 text-white'
                      }`}
                    >
                      {t.completed ? 'Done ✓' : 'Mark Completed'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
