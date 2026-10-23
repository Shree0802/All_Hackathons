import React, { useState } from 'react';
import { 
  Settings, 
  Cpu, 
  Cloud, 
  Database, 
  ShieldCheck, 
  ExternalLink, 
  RefreshCw, 
  FileText,
  User,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { api } from '../services/api';

export default function SettingsPage({ systemStatus, profile, onProfileUpdate, refreshStatus }) {
  const [profileForm, setProfileForm] = useState(profile || {});
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    try {
      const updated = await api.updateProfile(profileForm);
      onProfileUpdate(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to update profile:", err);
    } finally {
      setSaving(false);
    }
  };

  const isDeciderLive = systemStatus?.decider_2b_available;
  const isBedrockConfigured = systemStatus?.bedrock_configured;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-gray-400" />
            <h1 className="text-lg font-bold text-white">System Architecture & Integrations</h1>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Verified model endpoints, runtime configurations, and developer telemetry.
          </p>
        </div>

        <button
          onClick={refreshStatus}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-750 text-gray-200 border border-gray-700 rounded-lg text-xs font-medium transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Telemetry</span>
        </button>
      </div>

      {/* Integration Status Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Strands Decider 2B Status */}
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-blue-400" />
              <h3 className="font-semibold text-white text-sm">Strands Decider 2B</h3>
            </div>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
              isDeciderLive 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
            }`}>
              {isDeciderLive ? 'Online' : 'Demo Stub Mode'}
            </span>
          </div>

          <div className="space-y-2 text-xs border-t border-gray-800 pt-2 font-mono text-gray-300">
            <div>
              <span className="text-[10px] text-gray-500 uppercase block">Model ID:</span>
              <span className="text-blue-300 truncate block">
                {systemStatus?.decider_model || 'StrandsAgents/strands-decider-2B-hobson-v19'}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase block">Wire Protocol:</span>
              <span className="text-gray-300">POST /v1/systemone</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase block">Endpoint URL:</span>
              <span className="text-gray-400 truncate block">
                {systemStatus?.decider_endpoint || 'http://127.0.0.1:8000/v1/systemone'}
              </span>
            </div>
          </div>
        </div>

        {/* Amazon Bedrock Status */}
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Cloud className="w-4 h-4 text-purple-400" />
              <h3 className="font-semibold text-white text-sm">Amazon Bedrock</h3>
            </div>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
              isBedrockConfigured 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                : 'bg-gray-800 text-gray-400 border-gray-700'
            }`}>
              {isBedrockConfigured ? 'AWS Active' : 'Fallback Ready'}
            </span>
          </div>

          <div className="space-y-2 text-xs border-t border-gray-800 pt-2 font-mono text-gray-300">
            <div>
              <span className="text-[10px] text-gray-500 uppercase block">Model Identifier:</span>
              <span className="text-purple-300 truncate block">
                {systemStatus?.bedrock_model_id || 'anthropic.claude-3-5-sonnet-20241022-v2:0'}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase block">Region:</span>
              <span className="text-gray-300">{systemStatus?.bedrock_region || 'us-east-1'}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase block">Credentials:</span>
              <span className="text-gray-400">Environment / IAM Role</span>
            </div>
          </div>
        </div>

        {/* Strands Agents SDK & Storage */}
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Database className="w-4 h-4 text-emerald-400" />
              <h3 className="font-semibold text-white text-sm">Orchestration & Storage</h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Active
            </span>
          </div>

          <div className="space-y-2 text-xs border-t border-gray-800 pt-2 font-mono text-gray-300">
            <div>
              <span className="text-[10px] text-gray-500 uppercase block">Strands Agents SDK:</span>
              <span className="text-emerald-300">v{systemStatus?.strands_agents_version || '1.62.0'}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase block">Storage Adapter:</span>
              <span className="text-gray-300">JSON Storage (MongoDB compatible)</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase block">Security:</span>
              <span className="text-gray-400">Zero Client Credentials</span>
            </div>
          </div>
        </div>
      </div>

      {/* Student Profile Configuration Form */}
      <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center space-x-2 mb-4">
          <User className="w-4 h-4 text-blue-400" />
          <h3 className="font-semibold text-white text-sm">Student Profile Configuration</h3>
        </div>

        <form onSubmit={handleProfileSubmit} className="space-y-4 text-xs">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-gray-400 font-medium block mb-1">Student Name:</label>
              <input
                type="text"
                value={profileForm.name || ''}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-gray-400 font-medium block mb-1">Academic Branch:</label>
              <input
                type="text"
                value={profileForm.academic_branch || ''}
                onChange={(e) => setProfileForm({ ...profileForm, academic_branch: e.target.value })}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-gray-400 font-medium block mb-1">Target Career Role:</label>
              <input
                type="text"
                value={profileForm.target_role || ''}
                onChange={(e) => setProfileForm({ ...profileForm, target_role: e.target.value })}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            {saveSuccess && (
              <span className="text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Profile successfully saved!</span>
              </span>
            )}
            {!saveSuccess && <span />}
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all"
            >
              {saving ? 'Saving...' : 'Save Profile Changes'}
            </button>
          </div>
        </form>
      </div>

      {/* Official Documentation & Resources */}
      <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-lg text-xs space-y-3">
        <h3 className="font-semibold text-white text-sm flex items-center space-x-2">
          <FileText className="w-4 h-4 text-blue-400" />
          <span>Official Hackathon Documentation & References</span>
        </h3>
        <div className="grid sm:grid-cols-3 gap-3 pt-2">
          <a
            href="https://strandsagents.com/blog/introducing-strands-decider/"
            target="_blank"
            rel="noreferrer"
            className="p-3 bg-gray-900/80 hover:bg-gray-850 border border-gray-800 rounded-lg flex items-center justify-between text-gray-300 hover:text-blue-300"
          >
            <span>Strands Decider 2B Docs</span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
          </a>
          <a
            href="https://strandsagents.com/"
            target="_blank"
            rel="noreferrer"
            className="p-3 bg-gray-900/80 hover:bg-gray-850 border border-gray-800 rounded-lg flex items-center justify-between text-gray-300 hover:text-blue-300"
          >
            <span>Strands Agents SDK</span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
          </a>
          <a
            href="https://aws.amazon.com/bedrock/"
            target="_blank"
            rel="noreferrer"
            className="p-3 bg-gray-900/80 hover:bg-gray-850 border border-gray-800 rounded-lg flex items-center justify-between text-gray-300 hover:text-blue-300"
          >
            <span>Amazon Bedrock Service</span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
          </a>
        </div>
      </div>
    </div>
  );
}
