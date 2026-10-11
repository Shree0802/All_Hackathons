import React from 'react';
import { Layers, CheckCircle2, ShieldCheck, Award, Target, TrendingUp, Grid, Building, Bot } from 'lucide-react';

export const TraceabilityPage = () => {
  const mappings = [
    {
      psReq: 'Practical Skill Assessment',
      feature: 'Assessment Engine & Monaco Coding Runner',
      component: 'Assessments.jsx + /api/assessments/code/run',
      evidence: 'Proctored MCQs and Kadane algorithm live test suite runner'
    },
    {
      psReq: 'Verified Portfolio Evidence',
      feature: 'Evidence Verification System & AI GitHub Analyzer',
      component: 'MyEvidence.jsx + Projects.jsx + /api/projects/submit',
      evidence: 'Verification status badges (Verified, Under Review) + repo timeline (Score: 84/100)'
    },
    {
      psReq: 'Skill-Role Mapping',
      feature: 'Industry Role Catalog & Requirements Matrix',
      component: 'TargetRoles.jsx + /api/roles',
      evidence: 'Role requirements matrix (e.g. ML Engineer requiring Python 80, ML 80, Stats 70)'
    },
    {
      psReq: 'Skill Gap Analysis',
      feature: 'AI Skill Gap Engine',
      component: 'SkillGapAnalysis.jsx + /api/skill-gaps',
      evidence: 'Student vs Required competency comparison table (Stats 51% vs 70% gap highlighted)'
    },
    {
      psReq: 'Personalized Recommendations',
      feature: 'AI Personalized Multi-Phase Roadmap',
      component: 'LearningPath.jsx + /api/learning-paths',
      evidence: '4-Phase roadmap with "Why this is recommended" explanations'
    },
    {
      psReq: 'Institutional Insights',
      feature: 'Faculty Skill Heatmap & AI Curriculum Gaps',
      component: 'SkillHeatmap.jsx + CurriculumGaps.jsx',
      evidence: 'FY/SY/TY/LY heatmap grid + 58% Cloud gap curriculum recommendation'
    },
    {
      psReq: 'Employer Usability',
      feature: 'Employer Portal & Candidate Discovery',
      component: 'CandidateDiscovery.jsx + CreateJob.jsx',
      evidence: 'Evidence-first candidate cards ranked by role fit % and verified code repos'
    },
    {
      psReq: 'Dynamic Readiness Calculation',
      feature: 'Transparent 5-Component Math Formula',
      component: 'CircularProgress.jsx + ReadinessBreakdownModal.jsx',
      evidence: '35% Technical + 25% Evidence + 20% Assessment + 10% Project + 10% Alignment = 78%'
    }
  ];

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-bold">
          <Layers className="w-4 h-4 text-brand-400" />
          <span>Hackathon Evaluation & Requirements Traceability</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">EDUTECH Requirements Traceability Matrix</h1>
        <p className="text-xs text-slate-400 max-w-2xl mx-auto">
          Direct 1-to-1 mapping demonstrating how EDUTECH fulfills every hackathon problem statement requirement.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Problem Statement Requirement</th>
                <th className="py-3.5 px-4">EDUTECH MVP Feature</th>
                <th className="py-3.5 px-4">Implementation Component</th>
                <th className="py-3.5 px-4 text-right">Verification Proof</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {mappings.map((m, idx) => (
                <tr key={idx} className="hover:bg-slate-850/50 transition">
                  <td className="py-3.5 px-4 font-bold text-white flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{m.psReq}</span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-brand-300">{m.feature}</td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">{m.component}</td>
                  <td className="py-3.5 px-4 text-right text-[11px] text-slate-300">{m.evidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
