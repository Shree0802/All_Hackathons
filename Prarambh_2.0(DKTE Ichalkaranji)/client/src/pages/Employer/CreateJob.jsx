import React, { useState } from 'react';
import { apiFetch } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Sliders, CheckCircle2 } from 'lucide-react';

export const CreateJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: 'Machine Learning Intern',
    description: 'Looking for an ML Intern to build statistical models, feature extraction pipelines, and evaluate neural network metrics.',
    location: 'Bengaluru / Hybrid',
    jobType: 'Internship',
    stipendOrSalary: '₹45,000 / month'
  });

  const [skills, setSkills] = useState([
    { skillName: 'Python', minScore: 75 },
    { skillName: 'Machine Learning', minScore: 70 },
    { skillName: 'SQL', minScore: 60 },
    { skillName: 'Statistics', minScore: 65 },
    { skillName: 'Git', minScore: 50 }
  ]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiFetch('/employer/jobs', {
        method: 'POST',
        body: JSON.stringify({ ...formData, requiredSkills: skills })
      });
      alert('Job requisition created with minimum verified skill thresholds!');
      navigate('/employer');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Create Job Requisition</h1>
        <p className="text-xs text-slate-400">Define minimum verified competency thresholds for candidate discovery filtering.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Job Title *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={e => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Job Type</label>
            <select
              value={formData.jobType}
              onChange={e => setFormData({ ...formData, jobType: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500"
            >
              <option value="Internship">Internship</option>
              <option value="Full-time">Full-time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Stipend / Salary Range</label>
          <input
            type="text"
            value={formData.stipendOrSalary}
            onChange={e => setFormData({ ...formData, stipendOrSalary: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Description *</label>
          <textarea
            required
            rows={3}
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-brand-500 resize-none"
          ></textarea>
        </div>

        {/* Required Skill Threshold Sliders */}
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
            <Sliders className="w-4 h-4 text-brand-400" />
            <span>Minimum Verified Competency Thresholds (%)</span>
          </label>

          <div className="space-y-3">
            {skills.map((s, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-white">{s.skillName}</span>
                  <span className="text-brand-400 font-extrabold">{s.minScore}% Minimum Required</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="95"
                  value={s.minScore}
                  onChange={e => {
                    const newSkills = [...skills];
                    newSkills[idx].minScore = parseInt(e.target.value);
                    setSkills(newSkills);
                  }}
                  className="w-full accent-brand-500 bg-slate-900"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white text-xs font-bold transition disabled:opacity-50"
          >
            {loading ? 'Creating Job...' : 'Publish Job Requisition'}
          </button>
        </div>
      </form>
    </div>
  );
};
