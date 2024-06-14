import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EventLogin from "./components/EventLogin";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default App;
