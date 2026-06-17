// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./components/navbar/Navbar";
import Menu from "./components/navbar/Menu";
import LoadingPortal from "./components/ui/LoadingPortal";

import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import ReportDashboard from "./pages/ReportDashboard";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";

import LoginPortal from "./pages/auth/Login";               
import RegistrationPortal from "./pages/auth/RegistrationPortal"; 

import InitializePortal from "./pages/chamber/Initialization";
import SimulationChamber from "./pages/chamber/SimulationChamber";
import ArchiveVault from "./pages/Archive";           

const App = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);
  const isInitialized = useSelector((state) => state.interview.isInitialized);

  return (
    <div>
      {/* Universal Cinematic Overlay Layer */}
      {isLoading && <LoadingPortal />}
      
      <Navbar />
      <Menu />
      
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<LoginPortal />} />
        <Route path="/register" element={<RegistrationPortal />} />

        {/* Workspace Operations Setup */}
        <Route path="/initialize" element={<InitializePortal />} />
        
        {/* Protected Workspace Active Simulation Run */}
        <Route
          path="/interview"
          element={
            isInitialized ? (
              <SimulationChamber />
            ) : (
              <Navigate to="/initialize" replace />
            )
          }
        />

        {/* Session Evaluation Report Guard (Recommended Guard) */}
        <Route 
          path="/report" 
          element={
            isInitialized ? (
              <ReportDashboard />
            ) : (
              <Navigate to="/initialize" replace />
            )
          } 
        />

        {/* Global Repositories & Performance Matrices */}
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="/archive" element={<ArchiveVault />} />
        <Route path="/profile" element={<Profile />} />

        {/* Catch-All Fallback Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;