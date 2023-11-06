import React from "react";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import GrafanaDashbaordPage from "./pages/GrafanaDashboard";
function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/grafana-dashboard" element={<GrafanaDashbaordPage />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
