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
import Dashboard from './pages/Dashboard';

function Layout() {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/signup"];
  const currentPath = location.pathname.toLowerCase();
  const hideHeader = hideHeaderRoutes.some((path) => currentPath.startsWith(path));

  return (
    <div className="relative overflow-x-hidden min-h-screen">
      {!hideHeader && <Header />}
      <main className={!hideHeader ? "pt-[80px]" : ""}>
        <Routes>
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
        {/* All normal pages */}
        <Route path="/*" element={<Layout />} />

        {/* ✅ Dashboard outside layout (independent full screen) */}
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
