import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../services/api';
import { EvidenceBadge } from '../../components/EvidenceBadge';
import { FolderCheck, Filter, Plus, Calendar, ShieldCheck, CheckSquare, Award } from 'lucide-react';

export const MyEvidence = () => {
  const [evidence, setEvidence] = useState([]);
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    const fetchEvidence = async () => {
      try {
        const res = await apiFetch('/students/dashboard');
        setEvidence(res.recentEvidence || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchEvidence();
  }, []);

  const categories = ['All', 'Projects', 'Certifications', 'Assessments', 'Hackathons', 'Internships'];

  const filteredEvidence = filterType === 'All' 
    ? evidence 
    : evidence.filter(e => e.evidenceType?.toLowerCase() === filterType.toLowerCase());

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Evidence & Portfolio Proof</h1>
          <p className="text-xs text-slate-400">Categorized evidence backing your practical competency profile for industry recruiters.</p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterType(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              filterType === cat
                ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Evidence Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvidence.map((item, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3 hover:border-brand-500/40 transition">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-brand-400 tracking-wider">
                  {item.evidenceType}
                </span>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
              </div>
              <EvidenceBadge status={item.verificationStatus} />
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1 text-xs text-slate-400">
              <p>Source: <span className="font-semibold text-slate-200">{item.source}</span></p>
              <p>Method: <span className="text-slate-300">{item.verificationMethod}</span></p>
              {item.date && (
                <p className="flex items-center space-x-1 text-[10px] text-slate-500 mt-1">
                  <Calendar className="w-3 h-3" />
                  <span>Verified: {item.date}</span>
                </p>
              )}
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex flex-wrap gap-1">
                {item.linkedSkills?.map((sk, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-brand-500/10 border border-brand-500/20 text-brand-300 font-medium">
                    {sk}
                  </span>
                ))}
              </div>
              <span className="text-xs font-extrabold text-white bg-slate-800 px-2.5 py-1 rounded-lg">
                Score: {item.verificationScore}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
