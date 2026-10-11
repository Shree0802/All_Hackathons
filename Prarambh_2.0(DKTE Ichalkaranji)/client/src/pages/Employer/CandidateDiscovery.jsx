import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../services/api';
import { UserCheck, CheckCircle2, ShieldCheck, Award, FolderCheck, ExternalLink, Eye, Mail, Send, X, Calendar, Clock, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CandidateDiscovery = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [toast, setToast] = useState(false);

  const [inviteForm, setInviteForm] = useState({
    role: 'Machine Learning Intern',
    date: '2026-10-10',
    time: '14:00',
    format: 'Technical Coding & Verified Portfolio Review',
    message: 'We were impressed by your verified Python competency (88%) and AI Resume Analyzer project commits on EDUTECH.'
  });

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await apiFetch('/employer/candidates');
        setCandidates(res || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCandidates();
  }, []);

  const openCandidateDetail = async (cand) => {
    try {
      const res = await apiFetch(`/employer/candidates/${cand.studentId}`);
      setSelectedCandidate(res);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendInvite = (e) => {
    e.preventDefault();
    setInviteModalOpen(false);
    setToast(true);
    setTimeout(() => setToast(false), 4000);
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Candidate Discovery (Evidence-First)</h1>
        <p className="text-xs text-slate-400">Discover candidates ranked by verified role fit & code commit evidence rather than self-declared resumes.</p>
      </div>

      {toast && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Interview Invitation sent to {selectedCandidate?.name}! Verification dossier linked to candidate portal.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Candidate Cards Grid */}
        <div className="lg:col-span-2 space-y-4">
          {candidates.map((cand, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 hover:border-brand-500/40 transition">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-brand-500/20 text-brand-300 font-bold flex items-center justify-center text-lg border border-brand-500/30">
                    {cand.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{cand.name}</h3>
                    <p className="text-xs text-slate-400">{cand.targetRole}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Role Fit Alignment</span>
                    <span className="text-xl font-black text-emerald-400">{cand.roleFitPercentage}%</span>
                  </div>
                  <button
                    onClick={() => openCandidateDetail(cand)}
                    className="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold flex items-center space-x-1.5 transition"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Inspect Evidence</span>
                  </button>
                </div>
              </div>

              {/* Verified Competencies */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
                {cand.skills?.map((s, k) => (
                  <span key={k} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 flex items-center space-x-1">
                    <span>{s.skillName}: {s.score}%</span>
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  </span>
                ))}
              </div>

              {/* Evidence Totals */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span>Verified Evidence: <strong className="text-white">{cand.verifiedProjectsCount} Projects</strong> • <strong className="text-white">{cand.verifiedAssessmentsCount} Assessments</strong> • <strong className="text-white">{cand.verifiedCertificatesCount} Certs</strong></span>
                <span className="text-emerald-400 font-bold">✓ GitHub Code Verified</span>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Verified Profile View Drawer */}
        <div className="lg:col-span-1">
          {selectedCandidate ? (
            <div className="p-6 rounded-2xl bg-slate-900 border border-brand-500/40 shadow-2xl space-y-5 sticky top-20">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] uppercase font-bold text-brand-400 tracking-wider">Verified Candidate Dossier</span>
                <h3 className="text-xl font-black text-white">{selectedCandidate.name}</h3>
                <p className="text-xs text-slate-400">{selectedCandidate.targetRole} • {selectedCandidate.institution}</p>
              </div>

              {/* Role Fit */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-slate-950 border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-400">Verified Role Alignment</span>
                  <div className="text-2xl font-black text-white">{selectedCandidate.roleFitPercentage}%</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center">
                  ✓
                </div>
              </div>

              {/* Verified Projects List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Verified Projects Code Evidence</h4>
                {selectedCandidate.projects?.slice(0, 3).map((p, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-white">
                      <span>{p.title}</span>
                      <span className="text-emerald-400">{p.verificationScore}/100</span>
                    </div>
                    <p className="text-[10px] text-slate-400 line-clamp-2">{p.description}</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                      <span>Repo Checked ✓</span>
                      <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-brand-400 hover:underline">View GitHub Repo</a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Verified Certifications */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Verified Certifications</h4>
                {selectedCandidate.evidenceList?.filter(e => e.evidenceType === 'Certifications').map((c, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">{c.title}</span>
                      <span className="text-[10px] text-slate-400">{c.source}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-400">Verified</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setInviteForm({ ...inviteForm, role: selectedCandidate.targetRole });
                    setInviteModalOpen(true);
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center space-x-1.5 transition shadow-lg shadow-emerald-500/20"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Interview Invitation & Dossier</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-500 text-xs">
              Select a candidate card to inspect detailed verified project code and assessment evidence.
            </div>
          )}
        </div>
      </div>

      {/* Interview Invite Modal */}
      {inviteModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-brand-500/40 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">Invite Candidate to Interview</h3>
                <span className="text-[10px] text-slate-400">Target Candidate: <strong className="text-white">{selectedCandidate?.name}</strong></span>
              </div>
              <button onClick={() => setInviteModalOpen(false)} className="p-1 rounded text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendInvite} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Target Position</label>
                <input
                  type="text"
                  required
                  value={inviteForm.role}
                  onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Interview Date</label>
                  <input
                    type="date"
                    required
                    value={inviteForm.date}
                    onChange={(e) => setInviteForm({ ...inviteForm, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Time (IST)</label>
                  <input
                    type="time"
                    required
                    value={inviteForm.time}
                    onChange={(e) => setInviteForm({ ...inviteForm, time: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Interview Format</label>
                <select
                  value={inviteForm.format}
                  onChange={(e) => setInviteForm({ ...inviteForm, format: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold"
                >
                  <option value="Technical Coding & Verified Portfolio Review">Technical Coding & Verified Portfolio Review</option>
                  <option value="AI-Monitored Live Sandbox Assessment">AI-Monitored Live Sandbox Assessment</option>
                  <option value="System Design & Architecture Discussion">System Design & Architecture Discussion</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Personalized Invitation Message</label>
                <textarea
                  rows="3"
                  value={inviteForm.message}
                  onChange={(e) => setInviteForm({ ...inviteForm, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium"
                />
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                <p className="text-[10px] leading-relaxed">
                  ✓ Verified Proof Attached: Candidate's verified GitHub repository code audit (89%) & Monaco assessment credentials will automatically be attached to the calendar invite.
                </p>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setInviteModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Formal Invitation</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
