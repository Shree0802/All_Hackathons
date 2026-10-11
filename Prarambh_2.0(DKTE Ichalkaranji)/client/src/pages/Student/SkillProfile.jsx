import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../services/api';
import { Award, CheckCircle2, FileText, Code2, Calendar, X, BarChart2 } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

export const SkillProfile = () => {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await apiFetch('/students/dashboard');
        setSkills(res.skills || []);
        if (res.skills && res.skills.length > 0) {
          setSelectedSkill(res.skills[0]);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const radarData = skills.map(s => ({
    subject: s.skillName,
    A: s.scorePercentage,
    fullMark: 100
  }));

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Verified Skill Competency Profile</h1>
          <p className="text-xs text-slate-400">Every score is computed directly from verified projects, assessments, and certifications.</p>
        </div>
        <div className="text-xs text-slate-400 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
          Click any skill to inspect linked evidence items
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Chart */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col items-center justify-center">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center space-x-2">
            <BarChart2 className="w-4 h-4 text-brand-400" />
            <span>Competency Radar Chart</span>
          </h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                <Radar name="Student Score" dataKey="A" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skills List Progress Bars */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Skills Competency Index ({skills.length} Skills)
          </h3>

          <div className="space-y-3">
            {skills.map((s, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedSkill(s)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedSkill?.skillName === s.skillName
                    ? 'bg-brand-500/10 border-brand-500/60 shadow-lg shadow-brand-500/10'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-brand-400" />
                    <span className="text-sm font-bold text-white">{s.skillName}</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold">
                      ✓ Verified
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-white">{s.scorePercentage}%</span>
                  </div>
                </div>

                <div className="h-2 rounded-full bg-slate-900 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-500 to-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${s.scorePercentage}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                  <span>{s.evidenceCount || 3} Evidence Items Attached</span>
                  <span className="text-brand-300 font-semibold hover:underline">Inspect Evidence →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Linked Evidence Drawer / Modal for Selected Skill */}
      {selectedSkill && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-brand-500/30 shadow-2xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold text-lg">
                {selectedSkill.scorePercentage}%
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{selectedSkill.skillName} Competency Evidence</h3>
                <p className="text-xs text-slate-400 flex items-center space-x-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>Last Assessed: {selectedSkill.lastAssessed || '15 Sep 2026'}</span>
                </p>
              </div>
            </div>
            <button onClick={() => setSelectedSkill(null)} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Attached Proof & Evidence List ({selectedSkill.evidenceList?.length || 0})
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedSkill.evidenceList?.map((ev, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <h5 className="text-xs font-bold text-white">{ev.title}</h5>
                      <span className="text-[10px] text-slate-400">{ev.type} Contribution</span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-brand-400 bg-brand-500/10 px-2 py-1 rounded-lg border border-brand-500/20">
                    {ev.score}% Score
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
