import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../services/api';
import { Target, CheckCircle2, TrendingUp, DollarSign, Award, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const TargetRoles = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState('role_ml_engineer');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await apiFetch('/roles');
        setRoles(res || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchRoles();
  }, []);

  const handleSelectRole = async (role) => {
    try {
      await apiFetch('/students/target-role', {
        method: 'PUT',
        body: JSON.stringify({ roleId: role.roleId, roleTitle: role.title })
      });
      setSelectedRoleId(role.roleId);
      navigate('/student/skill-gaps');
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Industry Target Role Library</h1>
          <p className="text-xs text-slate-400">Select your target industry role to compare your verified competencies against employer requirements.</p>
        </div>
      </div>

      {/* Role Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 hover:border-brand-500/40 transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-brand-400 tracking-wider">{role.category}</span>
                  <h3 className="text-lg font-bold text-white">{role.title}</h3>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  {role.demandLevel}
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">{role.description}</p>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Required Competencies Matrix</span>
                <div className="flex flex-wrap gap-1">
                  {role.requiredSkills?.map((req, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                      {req.skillName}: {req.requiredScore}%
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">{role.avgSalary}</span>
              <button
                onClick={() => handleSelectRole(role)}
                className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold flex items-center space-x-1.5 transition"
              >
                <span>Select & Analyze Gaps</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
