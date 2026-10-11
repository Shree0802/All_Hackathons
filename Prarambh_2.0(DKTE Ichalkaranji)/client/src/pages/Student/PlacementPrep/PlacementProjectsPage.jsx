import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../../services/api';
import { FileCode, CheckCircle2, ArrowLeft, Play, Sparkles, FolderCheck, ShieldCheck, Clock, Layers, Send, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const defaultProjects = [
  {
    id: 'proj-1',
    title: 'AI Resume & Portfolio Analyzer',
    domain: 'Machine Learning & Web',
    difficulty: 'Advanced',
    verificationStatus: 'Verified',
    verifiedScore: 92,
    techStack: ['Python', 'FastAPI', 'React', 'Tailwind', 'LangChain', 'OpenAI'],
    description: 'An AI-powered application that parses resume PDFs, evaluates ATS scores against job descriptions, and recommends skill upgrades.',
    milestones: [
      { phase: '1. Architecture & Design', status: 'Completed' },
      { phase: '2. PDF Parser & NLP Engine', status: 'Completed' },
      { phase: '3. API Endpoint Integration', status: 'Completed' },
      { phase: '4. React Dashboard UI', status: 'Completed' }
    ]
  },
  {
    id: 'proj-2',
    title: 'Distributed Task Queue Engine',
    domain: 'Systems & Backend',
    difficulty: 'Intermediate',
    verificationStatus: 'Verified',
    verifiedScore: 88,
    techStack: ['Java', 'Spring Boot', 'Redis', 'PostgreSQL', 'Docker'],
    description: 'High-throughput asynchronous task scheduler supporting exponential retry backoff, worker pooling, and dead-letter queues.',
    milestones: [
      { phase: '1. Core Queue Design', status: 'Completed' },
      { phase: '2. Redis Locking Mechanism', status: 'Completed' },
      { phase: '3. Worker Thread Pool', status: 'In Progress' }
    ]
  }
];

export const PlacementProjectsPage = () => {
  const [projects, setProjects] = useState(defaultProjects);
  const [loading, setLoading] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [githubUrl, setGithubUrl] = useState('https://github.com/Shree0802/ai-resume-analyzer');
  const [toast, setToast] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await apiFetch('/placement/projects');
        if (res && Array.isArray(res) && res.length > 0) {
          setProjects(res);
        }
      } catch (e) {
        console.error('Using default placement projects:', e);
      }
    };
    fetchProjects();
  }, []);

  const handleToggleMilestone = async (projectId, phase) => {
    try {
      const res = await apiFetch('/placement/projects/milestone', {
        method: 'POST',
        body: JSON.stringify({ projectId, phase })
      });
      if (res.projects) {
        setProjects(res.projects);
        if (activeProject && activeProject.id === projectId) {
          setActiveProject(res.projects.find(p => p.id === projectId));
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmitVerification = async (projectId) => {
    try {
      const res = await apiFetch('/placement/projects/verify', {
        method: 'POST',
        body: JSON.stringify({ projectId, githubUrl })
      });
      if (res.project) {
        setProjects(projects.map(p => p.id === projectId ? res.project : p));
        if (activeProject) setActiveProject(res.project);
      }
      setToast(true);
      setTimeout(() => setToast(false), 4000);
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
            <FileCode className="w-6 h-6 text-amber-400" />
            <span>Industry Placement Projects & Code Verification</span>
          </h1>
          <p className="text-xs text-slate-400">Build real-world engineering projects with phase milestone tracking and submit for EDUTECH AI Code Verification.</p>
        </div>
      </div>

      {toast && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Project submitted to EDUTECH Verification engine! Linked directly to your verified skill evidence dossier.</span>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj) => (
          <div key={proj.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between hover:border-amber-500/40 transition">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded border ${
                  proj.level === 'Advanced' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                }`}>{proj.level}</span>
                <span className={`text-xs font-bold flex items-center space-x-1 ${
                  proj.verificationStatus === 'Verified' ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{proj.verificationStatus}</span>
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">{proj.title}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{proj.description}</p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {proj.skills.map((s, k) => (
                  <span key={k} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 font-mono">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Est. Time: <strong className="text-white">{proj.estimatedTime}</strong></span>
              <button
                onClick={() => setActiveProject(proj)}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center space-x-1.5 transition"
              >
                <FolderCheck className="w-3.5 h-3.5" />
                <span>View Milestones & Verification</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Project Details & Verification Modal */}
      {activeProject && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 max-w-2xl w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400">{activeProject.category}</span>
                <h3 className="text-xl font-bold text-white">{activeProject.title}</h3>
              </div>
              <button onClick={() => setActiveProject(null)} className="text-slate-400 hover:text-white font-bold text-sm">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              <p className="text-slate-300 leading-relaxed font-medium">{activeProject.description}</p>

              {/* Phase Timeline Milestones */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Development Phase Milestones:</span>
                {activeProject.milestones.map((ms) => (
                  <div key={ms.phase} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-[10px]">
                        {ms.phase}
                      </span>
                      <span className="font-bold text-white">{ms.title}</span>
                    </div>

                    <button
                      onClick={() => handleToggleMilestone(activeProject.id, ms.phase)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        ms.status === 'Completed'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {ms.status === 'Completed' ? 'Completed ✓' : 'Mark Complete'}
                    </button>
                  </div>
                ))}
              </div>

              {/* Submit for Verification Box */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-950 to-slate-950 border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>EDUTECH Verification Engine Integration</span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400">Status: {activeProject.verificationStatus}</span>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">GitHub Repository URL</label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-xs"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <p className="text-[10px] text-slate-400">
                    Submitting triggers AI code audit checking commit depth, originality, and links to your verified Skill Profile.
                  </p>
                  <button
                    onClick={() => handleSubmitVerification(activeProject.id)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center space-x-1.5 shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit for Verification</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button onClick={() => setActiveProject(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
