// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Landing from "./pages/Landing";
import Menu from "./components/navbar/Menu";
import SimulationChamber from "./pages/chamber/SimulationChamber";
import InitializePortal from "./pages/chamber/Initialization";
import { useSelector } from "react-redux";
import LoadingPortal from "./components/ui/LoadingPortal";
import ReportDashboard from "./pages/ReportDashboard";

const App = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);
  const isInitialized = useSelector((state) => state.interview.isInitialized);

  return (
    <div>
      {isLoading && <LoadingPortal />}
      <Navbar />
      <Menu />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/initialize" element={<InitializePortal />} />
        <Route 
          path="/interview" 
          element={
            isInitialized ? <SimulationChamber /> : <Navigate to="/initialize" replace />
          } 
        />
        <Route path="/report" element={<ReportDashboard />} />
      </Routes>
    </div>
  );
};

export default App;
