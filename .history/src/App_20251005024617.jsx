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
import Dashboard from './pages/Dashboard'; // ✅ sidebar dashboard

function Layout() {
  const location = useLocation();

  // Only hide blobs (not header) on login/signup
  const hideBlobRoutes = ["/login", "/signup"];
  const currentPath = location.pathname.toLowerCase();
  const hideBlobs = hideBlobRoutes.some(path => currentPath.startsWith(path));

  return (
    <div className="relative overflow-x-hidden min-h-screen">
      {/* ✅ Always show Header */}
      <Header />

      {/* Gradient blobs (hidden only on login/signup) */}
      {!hideBlobs && (
        <>
          <div className="gradient-blob w-[500px] h-[500px] bg-teal-400 top-[-100px] left-[-200px]"></div>
          <div className="gradient-blob w-[600px] h-[600px] bg-gray-100 bottom-0 right-[-250px]"></div>
        </>
      )}

      <main className="pt-20"> {/* adds space so content not hidden behind navbar */}
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

          {/* 🔒 Protected Dashboard (with sidebar) */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
