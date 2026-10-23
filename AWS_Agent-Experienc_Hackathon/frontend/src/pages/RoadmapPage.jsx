import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  Circle, 
  Target, 
  Clock, 
  ArrowRight, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { api } from '../services/api';

export default function RoadmapPage({ profile, onQuickPrompt }) {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedStages, setCompletedStages] = useState({ 1: true });

  useEffect(() => {
    fetchRoadmap();
  }, [profile]);

  const fetchRoadmap = async () => {
    setLoading(true);
    try {
      const resp = await api.getRoadmap();
      setRoadmap(resp);
    } catch (e) {
      console.error("Failed to load roadmap:", e);
    } finally {
      setLoading(false);
    }
  };

  const toggleStage = (week) => {
    setCompletedStages(prev => ({
      ...prev,
      [week]: !prev[week]
    }));
  };

  const stages = roadmap?.stages || [];
  const totalStages = stages.length;
  const completedCount = Object.values(completedStages).filter(Boolean).length;
  const progressPercent = totalStages ? Math.round((completedCount / totalStages) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-emerald-400" />
            <h1 className="text-lg font-bold text-white">Career Learning Roadmap</h1>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Path: <strong className="text-blue-300">{roadmap?.target_role || profile?.target_role}</strong> ({totalStages} Weeks)
          </p>
        </div>

        {/* Progress Stats */}
        <div className="flex items-center space-x-3 bg-[#111827] border border-gray-800 px-4 py-2 rounded-xl">
          <div className="text-right">
            <span className="text-[10px] text-gray-400 uppercase font-semibold block">Roadmap Progress</span>
            <span className="font-mono font-bold text-emerald-400 text-sm">{progressPercent}% Completed</span>
          </div>
          <div className="w-16 bg-gray-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-300" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Recommended Next Action Banner */}
      {roadmap?.recommended_next_action && (
        <div className="bg-gradient-to-r from-emerald-950/30 to-blue-950/30 border border-emerald-500/20 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2.5">
            <Target className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="text-gray-200">
              <strong>Next Action:</strong> {roadmap.recommended_next_action}
            </span>
          </div>
          <button
            onClick={() => onQuickPrompt(roadmap.recommended_next_action)}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium text-xs transition-all shadow-sm"
          >
            Start Now
          </button>
        </div>
      )}

      {/* Weekly Stages Timeline */}
      <div className="space-y-4">
        {stages.map((stage) => {
          const isDone = Boolean(completedStages[stage.week]);
          return (
            <div 
              key={stage.week}
              className={`border rounded-xl p-5 transition-all ${
                isDone 
                  ? 'bg-[#111827]/70 border-gray-800' 
                  : 'bg-[#111827] border-gray-800 hover:border-blue-500/30 shadow-lg'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start space-x-3">
                  <button
                    onClick={() => toggleStage(stage.week)}
                    className="mt-0.5 text-gray-500 hover:text-emerald-400 transition-colors"
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-600" />
                    )}
                  </button>

                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs font-mono font-bold text-blue-400 uppercase">
                        Week {stage.week}
                      </span>
                      <span className="text-xs text-gray-500">•</span>
                      <h3 className={`text-sm font-semibold ${isDone ? 'text-gray-400 line-through' : 'text-white'}`}>
                        {stage.title}
                      </h3>
                    </div>

                    <p className="text-xs text-gray-400 mb-3">
                      Focus: <strong className="text-gray-300 font-medium">{stage.focus}</strong>
                    </p>

                    {/* Tasks checklist */}
                    <div className="space-y-1.5 mb-3">
                      {stage.tasks?.map((task, tIdx) => (
                        <div key={tIdx} className="flex items-start space-x-2 text-xs text-gray-300">
                          <span className="text-blue-500 font-bold">•</span>
                          <span>{task}</span>
                        </div>
                      ))}
                    </div>

                    {/* Checkpoint & Mini Project */}
                    <div className="flex flex-wrap gap-3 pt-3 border-t border-gray-800/80 text-[11px] text-gray-400 font-mono">
                      {stage.mini_project && (
                        <span className="bg-gray-900 border border-gray-800 px-2.5 py-1 rounded">
                          📦 Project: {stage.mini_project}
                        </span>
                      )}
                      {stage.checkpoint && (
                        <span className="bg-gray-900 border border-gray-800 px-2.5 py-1 rounded text-emerald-400">
                          ✓ Checkpoint: {stage.checkpoint}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onQuickPrompt(`Provide detailed tutorial and study resources for Week ${stage.week}: ${stage.title}`)}
                  className="text-xs text-gray-400 hover:text-blue-400 whitespace-nowrap hidden sm:flex items-center space-x-1"
                >
                  <span>Study Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
