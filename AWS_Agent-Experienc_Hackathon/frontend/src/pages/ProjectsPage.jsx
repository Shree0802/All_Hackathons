import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Code2, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  Calendar, 
  Award, 
  ArrowRight 
} from 'lucide-react';
import { api } from '../services/api';

export default function ProjectsPage({ profile, onQuickPrompt }) {
  const [projectsData, setProjectsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, [filterDifficulty]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const resp = await api.getProjects(filterDifficulty === 'all' ? null : filterDifficulty);
      setProjectsData(resp);
    } catch (e) {
      console.error("Failed to load projects:", e);
    } finally {
      setLoading(false);
    }
  };

  const projects = projectsData?.all_recommendations || [];
  const primaryProject = projectsData?.recommended_project || projects[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <h1 className="text-lg font-bold text-white">Recommended Capstone Projects</h1>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Tailored engineering blueprints to showcase on your portfolio and GitHub.
          </p>
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center space-x-1.5 text-xs bg-gray-900 border border-gray-800 p-1 rounded-lg">
          {['all', 'Intermediate', 'Advanced'].map((diff) => (
            <button
              key={diff}
              onClick={() => setFilterDifficulty(diff)}
              className={`px-3 py-1 rounded text-xs font-medium capitalize transition-all ${
                filterDifficulty === diff
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-gray-400 font-mono">Curating portfolio projects...</p>
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Featured Top Match */}
          {primaryProject && (
            <div className="bg-gradient-to-br from-[#111827] via-gray-900 to-[#111827] border border-blue-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  ★ Top Portfolio Recommendation
                </span>
                <span className="text-xs font-mono text-gray-400 flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" />
                  <span>Est: {primaryProject.estimated_effort}</span>
                </span>
              </div>

              <h2 className="text-xl font-bold text-white mb-2">
                {primaryProject.title}
              </h2>
              <p className="text-xs text-gray-300 leading-relaxed mb-4 max-w-3xl">
                {primaryProject.problem_statement}
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {primaryProject.tech_stack?.map((t, idx) => (
                  <span key={idx} className="text-xs font-mono bg-gray-800 text-blue-300 border border-gray-700 px-2.5 py-1 rounded-md">
                    {t}
                  </span>
                ))}
              </div>

              {/* Features & Milestones Grid */}
              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-800/80 text-xs">
                <div>
                  <h4 className="font-semibold text-gray-200 mb-2 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Architectural Features:</span>
                  </h4>
                  <ul className="space-y-1.5 text-gray-300">
                    {primaryProject.key_features?.map((f, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-blue-400">•</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-200 mb-2 flex items-center space-x-1.5">
                    <Award className="w-3.5 h-3.5 text-violet-400" />
                    <span>Implementation Milestones:</span>
                  </h4>
                  <ul className="space-y-1.5 text-gray-400 font-mono text-[11px]">
                    {primaryProject.implementation_milestones?.map((m, idx) => (
                      <li key={idx} className="truncate">
                        ▸ {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Resume Tip from Bedrock */}
              {projectsData?.resume_impact_tip && (
                <div className="mt-5 p-3.5 bg-blue-950/20 border border-blue-900/30 rounded-xl text-xs text-blue-200/90 leading-relaxed">
                  <div className="flex items-center space-x-1.5 font-semibold text-blue-300 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>How to Showcase on Your Resume:</span>
                  </div>
                  <p className="whitespace-pre-line text-[11px]">
                    {projectsData.resume_impact_tip}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* All Project Options Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((proj, idx) => (
              <div key={idx} className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono text-[10px] text-gray-400 uppercase">
                      Domain: {proj.domain}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-800 text-gray-300 border border-gray-700">
                      {proj.difficulty}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-sm mb-2">{proj.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">
                    {proj.problem_statement}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.tech_stack?.map((t, tIdx) => (
                      <span key={tIdx} className="text-[11px] font-mono bg-gray-900 text-gray-300 border border-gray-800 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-800 flex items-center justify-between text-xs text-gray-500">
                  <span>Effort: {proj.estimated_effort}</span>
                  <button
                    onClick={() => onQuickPrompt(`How do I start building the '${proj.title}' project step-by-step?`)}
                    className="text-blue-400 hover:text-blue-300 font-medium flex items-center space-x-1"
                  >
                    <span>Ask Agent</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
