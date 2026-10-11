import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../services/api';
import { GraduationCap, Award, CheckCircle2, BookOpen, Calculator, Sparkles, Plus, Edit2, Save } from 'lucide-react';

export const AcademicProfilePage = () => {
  const [academic, setAcademic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [cgpa, setCgpa] = useState(8.6);
  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    const fetchAcademic = async () => {
      try {
        const res = await apiFetch('/academic');
        setAcademic(res);
        if (res?.subjects) {
          setSubjects(res.subjects);
        } else {
          setSubjects([
            { code: 'CS301', name: 'Data Structures & Algorithms', marks: 88, grade: 'A', mappedSkills: ['Python', 'Problem Solving'] },
            { code: 'CS302', name: 'Database Management Systems', marks: 92, grade: 'O', mappedSkills: ['SQL', 'Database Design'] },
            { code: 'CS303', name: 'Machine Learning Fundamentals', marks: 74, grade: 'B+', mappedSkills: ['Machine Learning', 'Data Analysis'] },
            { code: 'CS304', name: 'Software Engineering & Agile', marks: 85, grade: 'A', mappedSkills: ['System Architecture', 'Git'] }
          ]);
        }
        if (res?.cgpa) setCgpa(res.cgpa);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchAcademic();
  }, []);

  const handleMarkChange = (idx, newMarks) => {
    const val = Math.min(100, Math.max(0, parseInt(newMarks) || 0));
    const updated = [...subjects];
    updated[idx].marks = val;
    
    // Auto-calculate grade
    let grade = 'F';
    if (val >= 90) grade = 'O';
    else if (val >= 80) grade = 'A';
    else if (val >= 70) grade = 'B+';
    else if (val >= 60) grade = 'B';
    else if (val >= 50) grade = 'C';
    updated[idx].grade = grade;

    setSubjects(updated);

    // Recalculate CGPA (approx grade points average / 10)
    const avgMarks = updated.reduce((acc, curr) => acc + curr.marks, 0) / updated.length;
    setCgpa((avgMarks / 10).toFixed(2));
  };

  const handleSave = () => {
    setEditing(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Academic Record & Subject-to-Skill Mapper</h1>
          <p className="text-xs text-slate-400">Academic coursework grades are tracked separately from demonstrated practical competency so CGPA does not artificially skew industry readiness.</p>
        </div>
        <button
          onClick={() => editing ? handleSave() : setEditing(true)}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition ${editing ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-slate-900 border border-slate-800 hover:border-brand-500/50 text-slate-200'}`}
        >
          {editing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
          <span>{editing ? 'Save Marks & Recalculate' : 'Edit Subject Marks'}</span>
        </button>
      </div>

      {saveToast && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Academic Record updated successfully! CGPA recalculated to {cgpa} / 10.0.</span>
        </div>
      )}

      {/* Overview Cards: Academic vs Practical */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-400">Academic CGPA (Cumulative)</span>
          <div className="text-3xl font-black text-amber-400">{cgpa} <span className="text-xs text-slate-500 font-normal">/ 10.0</span></div>
          <p className="text-xs text-slate-400">Degree: {academic?.degree || 'B.Tech Computer Science'}</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-400">Current Progress</span>
          <div className="text-xl font-bold text-white">{academic?.currentYear || '3rd Year'}</div>
          <p className="text-xs text-slate-400">Semester {academic?.semester || 6} • {academic?.branch || 'Computer Science'}</p>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-950 to-slate-900 border border-brand-500/30 shadow-xl space-y-2">
          <span className="text-[10px] uppercase font-bold text-brand-400 flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Separation Architecture</span>
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            CGPA reflects theoretical coursework grades. Practical Competency Index (78%) is derived exclusively from verified code repositories, Monaco live test runners, and anti-fraud assessments.
          </p>
        </div>
      </div>

      {/* Subject to Skill Mapping Table */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-brand-400" />
            <span>Course Subject-to-Industry Skill Mapping Matrix</span>
          </h3>
          {editing && (
            <span className="text-xs text-emerald-400 font-bold">Editing Mode Active — Modify marks below</span>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Subject Code</th>
                <th className="py-3 px-4">Subject Name</th>
                <th className="py-3 px-4">Marks (Out of 100)</th>
                <th className="py-3 px-4">Grade</th>
                <th className="py-3 px-4">Mapped Industry Competencies</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {subjects.map((sub, i) => (
                <tr key={i} className="hover:bg-slate-850/50 transition">
                  <td className="py-3.5 px-4 font-mono text-brand-400 font-bold">{sub.code}</td>
                  <td className="py-3.5 px-4 font-bold text-white">{sub.name}</td>
                  <td className="py-3.5 px-4">
                    {editing ? (
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={sub.marks}
                        onChange={(e) => handleMarkChange(i, e.target.value)}
                        className="w-20 px-2 py-1 bg-slate-950 border border-brand-500 rounded text-white font-bold text-xs"
                      />
                    ) : (
                      <span className="font-bold text-slate-200">{sub.marks} / 100</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded font-bold border ${
                      sub.grade === 'O' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      sub.grade === 'A' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      {sub.grade}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1">
                      {sub.mappedSkills?.map((sk, k) => (
                        <span key={k} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
