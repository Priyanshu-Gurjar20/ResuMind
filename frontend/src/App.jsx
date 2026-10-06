import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Builder from "./pages/Builder";
import LandingV2 from "./pages/LandingV2";
import Templates from "./pages/Templates";
import ATSChecker from "./pages/ATSChecker";
import AITools from "./pages/AITools";
import MyResumes from "./pages/MyResumes";

function isAuthenticated() {
  return localStorage.getItem("resumind_user") === "true";
}

function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

function App() {
  const [theme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LandingV2 />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/templates" element={<Templates />} />

        <Route path="/ats-checker" element={<ATSChecker />} />

        <Route path="/ai-tools" element={<AITools />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        <Route path="/builder" element={<ProtectedRoute><Builder /></ProtectedRoute>} />

        <Route path="/preview" element={<LandingV2 />} />

        <Route path="*" element={<Navigate to="/" replace />} />

        <Route path="/my-resumes" element={<ProtectedRoute><MyResumes /></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
