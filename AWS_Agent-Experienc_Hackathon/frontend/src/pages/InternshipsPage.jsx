import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  ArrowRight,
  Info
} from 'lucide-react';
import { api } from '../services/api';

export default function InternshipsPage({ profile, onQuickPrompt }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    fetchInternships();
  }, [roleFilter, locationFilter]);

  const fetchInternships = async () => {
    setLoading(true);
    try {
      const resp = await api.getInternships(roleFilter, locationFilter);
      setData(resp);
    } catch (e) {
      console.error("Failed to load internships:", e);
    } finally {
      setLoading(false);
    }
  };

  const results = data?.results || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-2">
            <Briefcase className="w-5 h-5 text-blue-400" />
            <h1 className="text-lg font-bold text-white">Sample Internship Explorer</h1>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Discover opportunities matching your skill profile and check your qualification fit.
          </p>
        </div>

        {/* Clear Sample Data Badge */}
        <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-mono">
          <Info className="w-3.5 h-3.5" />
          <span>Curated Sample Dataset (Not Live Vacancies)</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#111827] border border-gray-800 p-4 rounded-xl flex flex-wrap gap-4 text-xs">
        <div className="flex-1 min-w-[200px]">
          <label className="text-gray-400 font-medium block mb-1">Filter by Role Category:</label>
          <input
            type="text"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            placeholder="e.g. AI Engineer, Backend, ML..."
            className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="text-gray-400 font-medium block mb-1">Filter by Location:</label>
          <input
            type="text"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            placeholder="e.g. Remote, Bengaluru, Seattle..."
            className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Results Feed */}
      {loading ? (
        <div className="py-16 text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-gray-400 font-mono">Querying internship dataset...</p>
        </div>
      ) : results.length === 0 ? (
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-8 text-center text-gray-400 text-xs">
          No matching sample internships found for the selected filters.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {results.map((item) => (
            <div 
              key={item.id}
              className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-bold text-white text-sm">{item.title}</h3>
                    <p className="text-xs text-blue-400 font-medium">{item.company}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-emerald-400 text-sm block">
                      {item.match_score}% Match
                    </span>
                    <span className={`text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded ${
                      item.is_eligible ? 'bg-emerald-500/10 text-emerald-300' : 'bg-gray-800 text-gray-400'
                    }`}>
                      {item.is_eligible ? 'Eligible' : 'Developing'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-400 my-2.5">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-500" />
                    <span>{item.location}</span>
                  </span>
                  <span>•</span>
                  <span>{item.stipend}</span>
                  <span>•</span>
                  <span>{item.duration}</span>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed mb-3">
                  {item.description}
                </p>

                {/* Match Reasoning */}
                <div className="bg-gray-900/80 p-2.5 rounded-lg border border-gray-800 text-[11px] text-gray-300 mb-3">
                  <strong className="text-blue-300">Matching Analysis:</strong> {item.matching_reason}
                </div>

                {/* Required Skills */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {item.required_skills?.map((s, idx) => {
                    const isMatched = item.matched_skills?.includes(s);
                    return (
                      <span 
                        key={idx}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                          isMatched 
                            ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800' 
                            : 'bg-gray-900 text-gray-400 border-gray-800'
                        }`}
                      >
                        {isMatched ? '✓ ' : '+ '}{s}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-500">
                <span className="text-[10px] font-mono text-amber-400/80">
                  {item.disclaimer}
                </span>
                <button
                  onClick={() => onQuickPrompt(`How can I optimize my resume and prepare for the '${item.title}' role at ${item.company}?`)}
                  className="text-blue-400 hover:text-blue-300 font-medium flex items-center space-x-1"
                >
                  <span>Prepare Application</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
