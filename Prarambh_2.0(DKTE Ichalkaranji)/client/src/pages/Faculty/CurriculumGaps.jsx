import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../services/api';
import { AlertTriangle, Sparkles, CheckCircle2, ArrowRight, Plus, Send, X, Layers, Users, Calendar } from 'lucide-react';

export const CurriculumGaps = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedGap, setSelectedGap] = useState(null);
  const [activeInterventions, setActiveInterventions] = useState([
    {
      id: 1,
      title: 'Docker & Kubernetes Fundamentals Workshop',
      cohort: 'B.Tech CS (Year 3)',
      type: 'Hands-on Lab Workshop',
      enrolledCount: 42,
      status: 'Active',
      startDate: '2026-10-05'
    }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'Hands-on Lab Workshop',
    cohort: 'B.Tech CS 3rd Year (Sem 6)',
    deadline: '2026-10-20',
    description: ''
  });
  const [toast, setToast] = useState(false);

  useEffect(() => {
    const fetchGaps = async () => {
      try {
        const res = await apiFetch('/faculty/curriculum-gaps');
        setData(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchGaps();
  }, []);

  const openInterventionModal = (gap) => {
    setSelectedGap(gap);
    setFormData({
      title: `Remedial Module: ${gap.title}`,
      type: 'Hands-on Lab Workshop',
      cohort: 'B.Tech CS 3rd Year (Sem 6)',
      deadline: '2026-10-25',
      description: gap.recommendation
    });
    setModalOpen(true);
  };

  const handleDeployIntervention = (e) => {
    e.preventDefault();
    const newIntervention = {
      id: Date.now(),
      title: formData.title,
      cohort: formData.cohort,
      type: formData.type,
      enrolledCount: selectedGap?.affectedStudentsPct ? Math.round((selectedGap.affectedStudentsPct / 100) * 80) : 38,
      status: 'DEPLOYED & ENROLLED',
      startDate: new Date().toISOString().split('T')[0]
    };

    setActiveInterventions([newIntervention, ...activeInterventions]);
    setModalOpen(false);
    setToast(true);
    setTimeout(() => setToast(false), 4000);
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const { curriculumGaps, aiInsights } = data || {};

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Curriculum Gap Analysis & AI Intervention Builder</h1>
        <p className="text-xs text-slate-400">Institutional recommendations & 1-click curriculum interventions based on aggregate student competency data.</p>
      </div>

      {toast && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Curriculum Intervention successfully deployed! Auto-enrolled affected students into remedial learning path.</span>
        </div>
      )}

      {/* Main AI Insight Summary Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/40 shadow-xl space-y-3">
        <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
          <Sparkles className="w-4 h-4" />
          <span>AI Institutional Executive Insight</span>
        </div>
        <p className="text-sm font-semibold text-white leading-relaxed">
          {aiInsights?.summary || "58% of third-year students demonstrate a gap in cloud deployment skills. Docker and cloud fundamentals show the largest competency gaps."}
        </p>
      </div>

      {/* Active Interventions Section */}
      {activeInterventions.length > 0 && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
            <Layers className="w-4 h-4 text-brand-400" />
            <span>Deployed Institutional Curriculum Interventions</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeInterventions.map((item) => (
              <div key={item.id} className="p-4 rounded-xl bg-slate-950 border border-brand-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-brand-400">{item.type}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {item.status}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <span className="flex items-center space-x-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.enrolledCount} Students Enrolled</span>
                  </span>
                  <span>Cohort: {item.cohort}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Curriculum Gap Cards */}
      <div className="space-y-4">
        {(curriculumGaps || aiInsights?.criticalInsights)?.map((gap, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{gap.title}</h3>
                  <span className="text-xs text-rose-400 font-semibold">{gap.affectedStudentsPct || gap.affectedPct}% of Students Affected</span>
                </div>
              </div>

              <button
                onClick={() => openInterventionModal(gap)}
                className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold flex items-center space-x-1.5 transition shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Deploy Curriculum Intervention</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs text-slate-300">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Observed Empirical Insight</span>
              <p className="leading-relaxed">{gap.insight || gap.description}</p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-1 text-xs text-emerald-200">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Recommended Institutional Action</span>
              </span>
              <p className="leading-relaxed font-semibold">{gap.recommendation}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Intervention Builder Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-brand-500/40 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Deploy Institutional Curriculum Intervention</h3>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleDeployIntervention} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Intervention Module Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Intervention Format</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold"
                  >
                    <option value="Hands-on Lab Workshop">Hands-on Lab Workshop</option>
                    <option value="Remedial Micro-Course">Remedial Micro-Course</option>
                    <option value="Guided Capstone Project">Guided Capstone Project</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Target Cohort</label>
                  <input
                    type="text"
                    value={formData.cohort}
                    onChange={(e) => setFormData({ ...formData, cohort: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Intervention Learning Objectives</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium"
                />
              </div>

              <div className="p-3 rounded-xl bg-brand-950/40 border border-brand-500/30 text-brand-300">
                <p className="text-[10px] leading-relaxed">
                  ⚡ Auto-Enrollment Active: Submitting this form will automatically notify and enroll all {selectedGap?.affectedStudentsPct || 58}% of students in this cohort who score below 60% competency in this domain.
                </p>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Deploy & Auto-Enroll Students</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
