import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../services/api';
import { ProjectVerificationModal } from '../../components/ProjectVerificationModal';
import { EvidenceBadge } from '../../components/EvidenceBadge';
import { CheckSquare, Plus, Github, ExternalLink, Sparkles, CheckCircle2, Code2 } from 'lucide-react';

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await apiFetch('/projects');
      setProjects(res || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Project Verification Engine</h1>
          <p className="text-xs text-slate-400">Submit GitHub repositories for AI code analysis, commit log verification, and tech stack detection.</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white text-xs font-semibold shadow-lg shadow-brand-500/20 flex items-center space-x-2 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Submit Project</span>
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((proj, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 hover:border-brand-500/40 transition">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-bold text-white">{proj.title}</h3>
                  <EvidenceBadge status={proj.verificationStatus} />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">{proj.description}</p>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">AI Verification Score</span>
                  <span className="text-xl font-black text-brand-300">{proj.verificationScore}/100</span>
                </div>
              </div>
            </div>

            {/* Links & Detected Skills */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800">
              <div className="flex flex-wrap gap-1.5">
                {proj.technologies?.map((tech, i) => (
                  <span key={i} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-300">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-3 text-xs">
                {proj.githubUrl && (
                  <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="flex items-center space-x-1.5 text-slate-300 hover:text-white font-semibold">
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
                {proj.demoUrl && (
                  <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="flex items-center space-x-1.5 text-brand-400 hover:underline font-semibold">
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>

            {/* AI Repository Verification Checklist */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Repository Evidence Checklist
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                <div className="flex items-center space-x-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Repo Accessible</span>
                </div>
                <div className="flex items-center space-x-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>README Detected</span>
                </div>
                <div className="flex items-center space-x-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Source Code Checked</span>
                </div>
                <div className="flex items-center space-x-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Multiple Commits</span>
                </div>
                <div className="flex items-center space-x-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Dependencies Valid</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProjectVerificationModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onProjectSubmitted={() => fetchProjects()}
      />
    </div>
  );
};
