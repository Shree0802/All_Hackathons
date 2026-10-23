import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import WorkspacePage from './pages/WorkspacePage';
import SkillGapPage from './pages/SkillGapPage';
import ProjectsPage from './pages/ProjectsPage';
import RoadmapPage from './pages/RoadmapPage';
import InternshipsPage from './pages/InternshipsPage';
import InterviewPage from './pages/InterviewPage';
import DecisionLabPage from './pages/DecisionLabPage';
import SettingsPage from './pages/SettingsPage';
import { api } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [systemStatus, setSystemStatus] = useState(null);
  const [profile, setProfile] = useState(null);
  const [activities, setActivities] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentTrace, setCurrentTrace] = useState(null);
  const [chatLoading, setChatLoading] = useState(false);
  const [prefilledPrompt, setPrefilledPrompt] = useState('');

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [statusData, profileData, actData] = await Promise.allSettled([
        api.getStatus(),
        api.getProfile(),
        api.getActivities(10),
      ]);

      if (statusData.status === 'fulfilled') setSystemStatus(statusData.value);
      if (profileData.status === 'fulfilled') setProfile(profileData.value);
      if (actData.status === 'fulfilled') setActivities(actData.value);
    } catch (err) {
      console.warn("Backend not yet connected:", err);
    }
  };

  const handleSendMessage = async (text, mode = 'auto') => {
    const userMsg = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setChatLoading(true);

    try {
      const resp = await api.chatWithAgent(text, mode);
      const agentMsg = {
        role: 'agent',
        content: resp.summary_message,
        tool: resp.tool_name,
        data: resp.result,
        latency_ms: resp.execution_time_ms,
        bedrock_invoked: resp.bedrock_invoked,
        is_fallback: resp.is_fallback,
      };

      setMessages((prev) => [...prev, agentMsg]);
      setCurrentTrace(resp.decision_trace);

      // Refresh activities
      api.getActivities(10).then(setActivities).catch(() => {});
    } catch (err) {
      const errorMsg = {
        role: 'agent',
        content: `Error communicating with agent: ${err.message || 'Check backend connection.'}`,
        tool: 'error',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleQuickPrompt = (promptText) => {
    setPrefilledPrompt(promptText);
    setActiveTab('workspace');
    handleSendMessage(promptText, 'auto');
  };

  const handleClearChat = () => {
    setMessages([]);
    setCurrentTrace(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-gray-100">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        systemStatus={systemStatus} 
      />

      <main className="flex-1">
        {activeTab === 'landing' && (
          <LandingPage 
            setActiveTab={setActiveTab} 
            systemStatus={systemStatus} 
          />
        )}
        {activeTab === 'dashboard' && (
          <DashboardPage 
            profile={profile} 
            activities={activities} 
            setActiveTab={setActiveTab} 
            onQuickPrompt={handleQuickPrompt} 
          />
        )}
        {activeTab === 'workspace' && (
          <WorkspacePage 
            messages={messages} 
            onSendMessage={handleSendMessage} 
            loading={chatLoading} 
            onClearChat={handleClearChat} 
            currentTrace={currentTrace} 
            systemStatus={systemStatus} 
            prefilledPrompt={prefilledPrompt} 
          />
        )}
        {activeTab === 'skill-gaps' && (
          <SkillGapPage 
            profile={profile} 
            onQuickPrompt={handleQuickPrompt} 
          />
        )}
        {activeTab === 'projects' && (
          <ProjectsPage 
            profile={profile} 
            onQuickPrompt={handleQuickPrompt} 
          />
        )}
        {activeTab === 'roadmap' && (
          <RoadmapPage 
            profile={profile} 
            onQuickPrompt={handleQuickPrompt} 
          />
        )}
        {activeTab === 'internships' && (
          <InternshipsPage 
            profile={profile} 
            onQuickPrompt={handleQuickPrompt} 
          />
        )}
        {activeTab === 'interview' && (
          <InterviewPage 
            profile={profile} 
            onQuickPrompt={handleQuickPrompt} 
          />
        )}
        {activeTab === 'decision-lab' && (
          <DecisionLabPage 
            systemStatus={systemStatus} 
          />
        )}
        {activeTab === 'settings' && (
          <SettingsPage 
            systemStatus={systemStatus} 
            profile={profile} 
            onProfileUpdate={setProfile} 
            refreshStatus={loadInitialData} 
          />
        )}
      </main>
    </div>
  );
}
