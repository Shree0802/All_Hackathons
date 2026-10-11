import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiFetch } from '../services/api';
import { CompetencyLevelBadge } from '../components/CompetencyLevelBadge';
import { QRCodeGenerator } from '../components/QRCodeGenerator';
import { ShieldCheck, CheckCircle2, Award, FolderCheck, ExternalLink, Github, Lock } from 'lucide-react';

export const PublicPortfolioPage = () => {
  const { userId } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await apiFetch(`/portfolio/${userId || '660a11111111111111111111'}`);
        setPortfolio(res);
      } catch (e) {
        setError(e.message || 'Portfolio is private or not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [userId]);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[70vh]">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-md mx-auto text-center space-y-4">
        <Lock className="w-12 h-12 text-rose-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">Private Portfolio</h2>
        <p className="text-xs text-slate-400">{error}</p>
        <Link to="/" className="inline-block px-4 py-2 rounded-xl bg-brand-500 text-white text-xs font-bold">Back to EDUTECH</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-10 space-y-8 max-w-5xl mx-auto font-sans">
      {/* Portfolio Header */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>EDUTECH Verified Digital Portfolio</span>
          </div>
          <h1 className="text-3xl font-black text-white">{portfolio.studentName}</h1>
          <p className="text-xs text-slate-400">{portfolio.degree} • {portfolio.branch} ({portfolio.institution})</p>
          <p className="text-xs text-slate-300 max-w-xl">{portfolio.bio}</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center shrink-0">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Verified Readiness</span>
          <span className="text-3xl font-black text-emerald-400">{portfolio.readinessScore}%</span>
          <span className="text-[10px] font-bold text-brand-300 block">{portfolio.targetRoleTitle}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Verified Skills Column */}
        <div className="md:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Verified Technical Competencies</h3>
            <div className="grid grid-cols-2 gap-3">
              {portfolio.skills?.map((sk, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">{sk.skillName}</span>
                    <span className="font-extrabold text-brand-400 text-xs">{sk.scorePercentage}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-900 overflow-hidden">
                    <div className="h-full bg-brand-500 rounded-full" style={{ width: `${sk.scorePercentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Projects */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Verified Project Code Evidence</h3>
            {portfolio.projects?.map((proj, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white">{proj.title}</h4>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                    Score: {proj.verificationScore}/100 ✓
                  </span>
                </div>
                <p className="text-slate-400">{proj.description}</p>
                {proj.githubUrl && (
                  <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-brand-400 font-semibold hover:underline flex items-center space-x-1">
                    <Github className="w-3.5 h-3.5" />
                    <span>View Verified GitHub Source Code</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* QR Code & Badges Sidebar */}
        <div className="space-y-6">
          <QRCodeGenerator portfolioUrl={portfolio.qrPayload} studentName={portfolio.studentName} />

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Verification Trust Badges</h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>GitHub Commit Log Verified</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Proctored MCQ & Coding Runner</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Credential ID Check Passed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
