import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { TraceabilityPage } from './pages/TraceabilityPage';
import { PublicPortfolioPage } from './pages/PublicPortfolioPage';

import { StudentDashboard } from './pages/Student/StudentDashboard';
import { AcademicProfilePage } from './pages/Student/AcademicProfilePage';
import { SkillGraphPage } from './pages/Student/SkillGraphPage';
import { SkillProfile } from './pages/Student/SkillProfile';
import { MyEvidence } from './pages/Student/MyEvidence';
import { Projects } from './pages/Student/Projects';
import { Assessments } from './pages/Student/Assessments';
import { LearningHubPage } from './pages/Student/LearningHubPage';
import { TargetRoles } from './pages/Student/TargetRoles';
import { CareerRoleExplorerPage } from './pages/Student/CareerRoleExplorerPage';
import { SkillGapAnalysis } from './pages/Student/SkillGapAnalysis';
import { LearningPath } from './pages/Student/LearningPath';
import { MockInterviewPage } from './pages/Student/MockInterviewPage';
import { IndustrySkillIntelligencePage } from './pages/Student/IndustrySkillIntelligencePage';
import { AIMentor } from './pages/Student/AIMentor';

import { PlacementPrepDashboard } from './pages/Student/PlacementPrep/PlacementPrepDashboard';
import { CoreSubjectsPage } from './pages/Student/PlacementPrep/CoreSubjectsPage';
import { AptitudePage } from './pages/Student/PlacementPrep/AptitudePage';
import { DSAPage } from './pages/Student/PlacementPrep/DSAPage';
import { PlacementProjectsPage } from './pages/Student/PlacementPrep/PlacementProjectsPage';
import { PlacementRoadmapPage } from './pages/Student/PlacementPrep/PlacementRoadmapPage';
import { PlacementMockTestsPage } from './pages/Student/PlacementPrep/PlacementMockTestsPage';

import { FacultyDashboard } from './pages/Faculty/FacultyDashboard';
import { SkillHeatmap } from './pages/Faculty/SkillHeatmap';
import { CurriculumGaps } from './pages/Faculty/CurriculumGaps';
import { StudentAnalytics } from './pages/Faculty/StudentAnalytics';

import { EmployerDashboard } from './pages/Employer/EmployerDashboard';
import { CreateJob } from './pages/Employer/CreateJob';
import { CandidateDiscovery } from './pages/Employer/CandidateDiscovery';

import { AdminDashboard } from './pages/Admin/AdminDashboard';
import { AdminVerificationCenter } from './pages/Admin/AdminVerificationCenter';

const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export function AppContent() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/traceability" element={<AppLayout><TraceabilityPage /></AppLayout>} />
      <Route path="/portfolio/:userId" element={<PublicPortfolioPage />} />

      {/* Student Ecosystem */}
      <Route path="/student" element={<AppLayout><StudentDashboard /></AppLayout>} />
      <Route path="/student/academic" element={<AppLayout><AcademicProfilePage /></AppLayout>} />
      <Route path="/student/skill-graph" element={<AppLayout><SkillGraphPage /></AppLayout>} />
      <Route path="/student/skills" element={<AppLayout><SkillProfile /></AppLayout>} />
      <Route path="/student/evidence" element={<AppLayout><MyEvidence /></AppLayout>} />
      <Route path="/student/projects" element={<AppLayout><Projects /></AppLayout>} />
      <Route path="/student/assessments" element={<AppLayout><Assessments /></AppLayout>} />
      <Route path="/student/placement-prep" element={<AppLayout><PlacementPrepDashboard /></AppLayout>} />
      <Route path="/student/placement-preparation" element={<AppLayout><PlacementPrepDashboard /></AppLayout>} />
      <Route path="/student/placement-prep/core-subjects" element={<AppLayout><CoreSubjectsPage /></AppLayout>} />
      <Route path="/student/placement-prep/aptitude" element={<AppLayout><AptitudePage /></AppLayout>} />
      <Route path="/student/placement-prep/dsa" element={<AppLayout><DSAPage /></AppLayout>} />
      <Route path="/student/placement-prep/projects" element={<AppLayout><PlacementProjectsPage /></AppLayout>} />
      <Route path="/student/placement-prep/roadmap" element={<AppLayout><PlacementRoadmapPage /></AppLayout>} />
      <Route path="/student/placement-prep/mock-tests" element={<AppLayout><PlacementMockTestsPage /></AppLayout>} />
      <Route path="/student/learning-hub" element={<AppLayout><LearningHubPage /></AppLayout>} />
      <Route path="/student/target-roles" element={<AppLayout><TargetRoles /></AppLayout>} />
      <Route path="/student/career-roles" element={<AppLayout><CareerRoleExplorerPage /></AppLayout>} />
      <Route path="/student/skill-gaps" element={<AppLayout><SkillGapAnalysis /></AppLayout>} />
      <Route path="/student/learning-path" element={<AppLayout><LearningPath /></AppLayout>} />
      <Route path="/student/mock-interview" element={<AppLayout><MockInterviewPage /></AppLayout>} />
      <Route path="/student/market-intelligence" element={<AppLayout><IndustrySkillIntelligencePage /></AppLayout>} />
      <Route path="/student/ai-mentor" element={<AppLayout><AIMentor /></AppLayout>} />

      {/* Faculty Ecosystem */}
      <Route path="/faculty" element={<AppLayout><FacultyDashboard /></AppLayout>} />
      <Route path="/faculty/heatmap" element={<AppLayout><SkillHeatmap /></AppLayout>} />
      <Route path="/faculty/curriculum-gaps" element={<AppLayout><CurriculumGaps /></AppLayout>} />
      <Route path="/faculty/students" element={<AppLayout><StudentAnalytics /></AppLayout>} />

      {/* Employer Ecosystem */}
      <Route path="/employer" element={<AppLayout><EmployerDashboard /></AppLayout>} />
      <Route path="/employer/create-job" element={<AppLayout><CreateJob /></AppLayout>} />
      <Route path="/employer/candidates" element={<AppLayout><CandidateDiscovery /></AppLayout>} />

      {/* Admin Ecosystem */}
      <Route path="/admin" element={<AppLayout><AdminDashboard /></AppLayout>} />
      <Route path="/admin/verification-center" element={<AppLayout><AdminVerificationCenter /></AppLayout>} />

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
