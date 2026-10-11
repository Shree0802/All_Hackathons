import React, { useState } from 'react';
import { X, Github, CheckCircle2, Loader2, Sparkles, Code2, Cpu } from 'lucide-react';
import { apiFetch } from '../services/api';

export const ProjectVerificationModal = ({ isOpen, onClose, onProjectSubmitted }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    githubUrl: '',
    demoUrl: '',
    technologies: 'Python, React, Flask, MongoDB',
    projectCategory: 'AI/ML'
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiFetch('/projects/submit', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      setResult(res);
      if (onProjectSubmitted) onProjectSubmitted(res.project);
    } catch (err) {
      alert(err.message || 'Failed to submit project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden text-slate-100">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center">
              <Github className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Submit Project for AI Code Verification</h3>
              <p className="text-xs text-slate-400">Extract tech stack, verify commit evidence, and update skill score</p>
            </div>
          </div>
          <button onClick={() => { setResult(null); onClose(); }} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!result ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Project Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. AI Resume Analyzer"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub Repository URL *</label>
              <input
                type="url"
                required
                placeholder="https://github.com/username/repository"
                value={formData.githubUrl}
                onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Demo / Live URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://my-demo-app.vercel.app"
                  value={formData.demoUrl}
                  onChange={e => setFormData({ ...formData, demoUrl: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Category</label>
                <select
                  value={formData.projectCategory}
                  onChange={e => setFormData({ ...formData, projectCategory: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="AI/ML">AI / Machine Learning</option>
                  <option value="Web App">Full Stack Web</option>
                  <option value="Data Analytics">Data Science & Analytics</option>
                  <option value="Cloud/DevOps">Cloud & DevOps</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Technologies Used (Comma Separated)</label>
              <input
                type="text"
                placeholder="Python, Flask, React, MongoDB, NLP"
                value={formData.technologies}
                onChange={e => setFormData({ ...formData, technologies: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Description *</label>
              <textarea
                required
                rows={3}
                placeholder="Describe your project's problem statement, architecture, and key technical implementation details..."
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500 resize-none"
              ></textarea>
            </div>

            <div className="pt-2 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white text-xs font-semibold flex items-center space-x-2 transition disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-amber-300" />}
                <span>{loading ? 'Running AI Repository Verification...' : 'Submit & Analyze'}</span>
              </button>
            </div>
          </form>
        ) : (
          /* Verification Output View */
          <div className="p-6 space-y-5">
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-slate-950 border border-emerald-500/40 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">AI Verification Score Result</span>
                <div className="text-2xl font-black text-white mt-0.5">{result.project.verificationScore}/100</div>
                <p className="text-xs text-slate-300 mt-0.5">{result.message}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-lg border border-emerald-400/40">
                ✓
              </div>
            </div>

            {/* Verification Timeline */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Verification Stage Timeline</h4>
              <div className="space-y-2">
                {result.project.verificationTimeline?.map((t, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="font-semibold text-white">{t.stage}</span>
                    </div>
                    <span className="text-slate-400 text-[11px]">{t.detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Extracted Skills */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Detected Tech Competencies</h4>
              <div className="flex flex-wrap gap-2">
                {result.project.technologies?.map((tech, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => { setResult(null); onClose(); }}
                className="px-5 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold transition"
              >
                Close & View Skill Updates
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
