import React from "react";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/Signup"
import LoginPage from "./pages/Login"
import GrafanaDashboardPage from "./pages/Dashboard"
function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<GrafanaDashboardPage />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
