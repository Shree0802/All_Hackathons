import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../services/api';
import { CompetencyLevelBadge } from '../../components/CompetencyLevelBadge';
import { EvidenceStrengthIndicator } from '../../components/EvidenceStrengthIndicator';
import { Award, CheckCircle2, ChevronRight, Layers, HelpCircle } from 'lucide-react';

export const SkillGraphPage = () => {
  const [graph, setGraph] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGraph = async () => {
      try {
        const res = await apiFetch('/skill-graph');
        setGraph(res);
        if (res.skills && res.skills.length > 0) setSelectedSkill(res.skills[0]);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchGraph();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Dynamic Student Skill Graph</h1>
        <p className="text-xs text-slate-400">Connected graph visualization linking Student Competency → Verified Evidence → Code Repositories → Target Roles.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Connected Node Tree View */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
            <Layers className="w-4 h-4 text-brand-400" />
            <span>Connected Competency Nodes</span>
          </h3>

          <div className="space-y-3">
            {graph?.skills?.map((sk, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedSkill(sk)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedSkill?.skillName === sk.skillName
                    ? 'bg-brand-500/10 border-brand-500/60 shadow-lg'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-2.5">
                    <Award className="w-4 h-4 text-brand-400" />
                    <span className="text-base font-bold text-white">{sk.skillName}</span>
                    <CompetencyLevelBadge level={sk.competencyLevel} label={sk.competencyLevelLabel} />
                  </div>

                  <div className="flex items-center space-x-2">
                    <EvidenceStrengthIndicator strength={sk.evidenceStrength} reason={sk.evidenceStrengthReason} />
                    <span className="text-xs font-extrabold text-white">{sk.scorePercentage}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2.5 pt-2 border-t border-slate-800/80">
                  <span>Linked Nodes: {sk.evidenceCount} Verified Items</span>
                  <span className="text-brand-300 font-semibold hover:underline">Inspect Proof Tree →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Node Detail Drawer: 5-Source Formula Calculation */}
        <div className="lg:col-span-1">
          {selectedSkill ? (
            <div className="p-6 rounded-2xl bg-slate-900 border border-brand-500/40 shadow-2xl space-y-5 sticky top-20">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] uppercase font-bold text-brand-400">Node Calculation Inspector</span>
                <h3 className="text-xl font-black text-white">{selectedSkill.skillName}</h3>
                <div className="mt-1 flex items-center space-x-2">
                  <CompetencyLevelBadge level={selectedSkill.competencyLevel} label={selectedSkill.competencyLevelLabel} />
                  <EvidenceStrengthIndicator strength={selectedSkill.evidenceStrength} reason={selectedSkill.evidenceStrengthReason} />
                </div>
              </div>

              {/* 5-Source Evidence Weighting */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  5-Source Score Formula Breakdown
                </h4>

                <div className="space-y-2 text-xs">
                  {selectedSkill.calculationBreakdown?.map((item, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-white block">{item.name}</span>
                        <span className="text-[10px] text-slate-400">Weight: {item.weight}</span>
                      </div>
                      <span className="font-bold text-brand-300">{item.score}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evidence Strength Rationale */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-400 block">Evidence Strength Rationale</span>
                <p className="leading-relaxed">{selectedSkill.evidenceStrengthReason}</p>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-500 text-xs">
              Select a skill node to inspect evidence strength and calculation formula.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
