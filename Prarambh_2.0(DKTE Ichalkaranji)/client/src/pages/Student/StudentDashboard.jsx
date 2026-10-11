import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../../services/api';
import { CircularProgress } from '../../components/CircularProgress';
import { ReadinessBreakdownModal } from '../../components/ReadinessBreakdownModal';
import { EvidenceBadge } from '../../components/EvidenceBadge';
import { ProjectVerificationModal } from '../../components/ProjectVerificationModal';
import { CompetencyLevelBadge } from '../../components/CompetencyLevelBadge';
import { EvidenceStrengthIndicator } from '../../components/EvidenceStrengthIndicator';
import { NextBestActionCard } from '../../components/NextBestActionCard';
import { CompetencyGrowthChart } from '../../components/CompetencyGrowthChart';
import { OnboardingWizardModal } from '../../components/OnboardingWizardModal';
import { PublicPortfolioModal } from '../../components/PublicPortfolioModal';
import { PlacementReportModal } from '../../components/PlacementReportModal';

import { 
  Target, 
  Sparkles, 
  Award, 
  FolderCheck, 
  ArrowRight, 
  TrendingUp, 
  Brain,
  CheckSquare,
  ChevronRight,
  Calculator,
  Globe,
  FileText,
  HelpCircle,
  Layers
} from 'lucide-react';

export const StudentDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [breakdownModalOpen, setBreakdownModalOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [portfolioModalOpen, setPortfolioModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  const fetchDashboard = async () => {
    try {
      const res = await apiFetch('/students/dashboard');
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleRunReassessment = async () => {
    try {
      const res = await apiFetch('/students/reassessment', {
        method: 'POST',
        body: JSON.stringify({ skillName: 'Statistics' })
      });
      alert(res.message);
      fetchDashboard();
    } catch (e) {
      alert(e.message);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs text-slate-400 font-medium">Loading Readiness Command Center...</p>
        </div>
      </div>
    );
  }

  const { 
    studentName, 
    targetRoleTitle, 
    readinessScore, 
    competencyLevelLabel,
    competencyLevelNumber,
    badgeStyle,
    breakdown, 
    skills, 
    competencyGrowthHistory,
    nextBestAction,
    recentEvidence 
  } = data || {};

  return (
    <div className="space-y-6 pb-12">
      {/* Top Welcome Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Readiness Command Center Active</span>
            </span>
            <CompetencyLevelBadge level={competencyLevelNumber || 4} label={competencyLevelLabel || 'Advanced'} />
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, <span className="text-brand-400">{studentName || 'Prathamesh'}</span>
          </h1>

          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <span>Target Role:</span>
            <span className="font-bold text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700 flex items-center space-x-1">
              <Target className="w-3.5 h-3.5 text-amber-400" />
              <span>{targetRoleTitle || 'Machine Learning Engineer'}</span>
            </span>
          </div>
        </div>

        {/* Command Center Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setPortfolioModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition"
          >
            <Globe className="w-4 h-4 text-brand-400" />
            <span>Public Portfolio & QR</span>
          </button>

          <button
            onClick={() => setReportModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition"
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Readiness Report</span>
          </button>

          <button
            onClick={() => setOnboardingOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold transition"
          >
            Wizard
          </button>
        </div>
      </div>

      {/* AI Next Best Action Banner */}
      <NextBestActionCard actionData={nextBestAction} onRunReassessment={handleRunReassessment} />

      {/* Main Readiness Score & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Readiness Circular Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden">
          <button 
            onClick={() => setBreakdownModalOpen(true)}
            className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-brand-300 transition"
            title="Explain Calculation"
          >
            <Calculator className="w-4 h-4" />
          </button>

          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Industry Readiness Score
          </h2>

          <CircularProgress 
            percentage={readinessScore || 78} 
            onClick={() => setBreakdownModalOpen(true)} 
          />

          <p className="text-xs text-slate-400 mt-4 max-w-xs leading-relaxed">
            Derived from 5 weighted competency vectors.
          </p>

          <button
            onClick={() => setBreakdownModalOpen(true)}
            className="mt-3 text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center space-x-1 transition"
          >
            <span>View Math Formula & Breakdown</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Competency Vector Breakdown */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Readiness Vector Breakdown (Weighted Math Model)
            </h3>
            <span className="text-xs text-slate-500 font-mono">100% Total Formula</span>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Technical Competency', score: breakdown?.technicalCompetency || 82, weight: '35%', color: 'from-sky-500 to-blue-600' },
              { label: 'Practical Evidence', score: breakdown?.practicalEvidence || 76, weight: '25%', color: 'from-emerald-500 to-teal-600' },
              { label: 'Assessment Performance', score: breakdown?.assessments || 81, weight: '20%', color: 'from-indigo-500 to-violet-600' },
              { label: 'Project Verification', score: breakdown?.projectVerification || 74, weight: '10%', color: 'from-amber-500 to-orange-600' },
              { label: 'Role Alignment', score: breakdown?.roleAlignment || 78, weight: '10%', color: 'from-fuchsia-500 to-pink-600' }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-200">{item.label} <span className="text-slate-500 text-[10px]">({item.weight})</span></span>
                  <span className="font-bold text-white">{item.score}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-950 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-700`}
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Score is recalculated when you verify code repos or complete assessments.</span>
            <button 
              onClick={() => setBreakdownModalOpen(true)}
              className="text-brand-400 font-semibold hover:underline shrink-0"
            >
              Math Details →
            </button>
          </div>
        </div>
      </div>

      {/* Competency Growth Line Chart */}
      <CompetencyGrowthChart data={competencyGrowthHistory} />

      {/* Skills & Evidence Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verified Skills with Levels & Evidence Strength */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Verified Skill Competencies</span>
            </h3>
            <Link to="/student/skill-graph" className="text-xs font-semibold text-brand-400 hover:underline">
              Inspect Skill Graph →
            </Link>
          </div>

          <div className="space-y-2.5">
            {(skills || []).slice(0, 5).map((skill, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-white">{skill.skillName}</span>
                    <CompetencyLevelBadge level={skill.levelInfo?.level} label={skill.levelInfo?.label} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <EvidenceStrengthIndicator strength={skill.evidenceStrengthInfo?.strength} reason={skill.evidenceStrengthInfo?.reason} />
                    <span className="text-xs font-extrabold text-brand-400">{skill.scorePercentage}%</span>
                  </div>
                </div>

                <div className="h-1.5 rounded-full bg-slate-900 overflow-hidden">
                  <div 
                    className="h-full bg-brand-500 rounded-full"
                    style={{ width: `${skill.scorePercentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Portfolio Evidence */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
              <FolderCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Portfolio Feed</span>
            </h3>
            <Link to="/student/evidence" className="text-xs font-semibold text-brand-400 hover:underline">
              My Evidence →
            </Link>
          </div>

          <div className="space-y-3">
            {(recentEvidence || []).map((ev, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-white">{ev.title}</span>
                    <EvidenceBadge status={ev.verificationStatus} />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Source: <span className="text-slate-300">{ev.source}</span>
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-brand-300 block">{ev.verificationScore}%</span>
                  <span className="text-[10px] text-slate-500">{ev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <ReadinessBreakdownModal 
        isOpen={breakdownModalOpen} 
        onClose={() => setBreakdownModalOpen(false)} 
        breakdown={breakdown}
        overallScore={readinessScore}
      />

      <ProjectVerificationModal 
        isOpen={projectModalOpen} 
        onClose={() => setProjectModalOpen(false)} 
        onProjectSubmitted={() => fetchDashboard()}
      />

      <OnboardingWizardModal
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
      />

      <PublicPortfolioModal
        isOpen={portfolioModalOpen}
        onClose={() => setPortfolioModalOpen(false)}
      />

      <PlacementReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
      />
    </div>
  );
};
