import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import PrivateRoute from "./components/PrivateRoute";
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/Howitworks';
import FeaturedSkills from './components/featured';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './pages/Dashboard'; // ✅ full-screen dashboard

function Layout() {
  const location = useLocation();

  // Hide UI (header, blobs) only for login, signup, and dashboard
  const hideHeaderRoutes = ["/login", "/signup", "/dashboard"];

  const currentPath = location.pathname.toLowerCase();
  const hideUI = hideHeaderRoutes.some(path => currentPath.startsWith(path));

  return (
    <div className="relative overflow-x-hidden min-h-screen">
      {/* ✅ Background Blobs + Header (hidden only for specific routes) */}
      {!hideUI && (
        <>
          <div className="gradient-blob w-[500px] h-[500px] bg-teal-400 top-[-100px] left-[-200px]"></div>
          <div className="gradient-blob w-[600px] h-[600px] bg-gray-100 bottom-0 right-[-250px]"></div>
          <Header />
        </>
      )}

      <main>
        <Routes>
          {/* 🏠 Public Routes */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <HowItWorks />
                <FeaturedSkills />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* 🌐 All normal pages inside Layout */}
        <Route path="/*" element={<Layout />} />

        {/* 🔒 Protected Dashboard route (full screen, no header) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
