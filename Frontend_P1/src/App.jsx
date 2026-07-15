// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "./redux/features/authSlice";

import Navbar from "./components/navbar/Navbar";
import Menu from "./components/navbar/Menu";
import LoadingPortal from "./components/ui/LoadingPortal";
import QuotaBanner from "./components/ui/QuotaBanner";

import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import ReportDashboard from "./pages/ReportDashboard";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";

import LoginPortal from "./pages/auth/Login";               
import RegistrationPortal from "./pages/auth/RegistrationPortal"; 

import InitializePortal from "./pages/chamber/Initialization";
import SimulationChamber from "./pages/chamber/SimulationChamber";
import ArchiveVault from "./pages/Archive";           

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);
  const isInitialized = useSelector((state) => state.interview.isInitialized);

  return (
    <div>
      {/* Universal Cinematic Overlay Layer */}
      {isLoading && <LoadingPortal />}
      
      <Navbar />
      <QuotaBanner />
      <Menu />
      
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<LoginPortal />} />
        <Route path="/register" element={<RegistrationPortal />} />

        {/* Workspace Operations Setup */}
        <Route path="/initialize" element={<ProtectedRoute><InitializePortal /></ProtectedRoute>} />
        
        {/* Protected Workspace Active Simulation Run */}
        <Route
          path="/interview"
          element={
            <ProtectedRoute>
              {isInitialized ? (
                <SimulationChamber />
              ) : (
                <Navigate to="/initialize" replace />
              )}
            </ProtectedRoute>
          }
        />

        {/* Archive Report View — loads by sessionId from URL */}
        <Route path="/report/:sessionId" element={
          <ProtectedRoute><ReportDashboard /></ProtectedRoute>
        } />

        {/* Session Evaluation Report Guard (Recommended Guard) */}
        <Route 
          path="/report" 
          element={
            <ProtectedRoute>
              {isInitialized ? (
                <ReportDashboard />
              ) : (
                <Navigate to="/initialize" replace />
              )}
            </ProtectedRoute>
          } 
        />

        {/* Global Repositories & Performance Matrices */}
        <Route path="/analytics" element={<ProtectedRoute><AnalyticsDashboard /></ProtectedRoute>} />
        <Route path="/archive" element={<ProtectedRoute><ArchiveVault /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* Catch-All Fallback Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;