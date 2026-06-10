// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Landing from "./pages/Landing";
import Menu from "./components/navbar/Menu";

const App = () => { 
  return (
    <div>
      <Navbar />
      <Menu />
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </div>
  );
};

export default App;
