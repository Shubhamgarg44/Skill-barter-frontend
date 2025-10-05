import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css';

import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/Howitworks';
import FeaturedSkills from './components/featured';
import Login from './components/Login';   
import Signup from './components/Signup';

function Layout() {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/signup"];

  // Make path matching case-insensitive and robust
  const currentPath = location.pathname.toLowerCase();
  const hideUI = hideHeaderRoutes.some(path => currentPath.startsWith(path));

  return (
    <div className="relative overflow-x-hidden">
      {/* Background Blobs + Header (only if not login/signup) */}
      {!hideUI && (
        <>
          <div className="gradient-blob w-[500px] h-[500px] bg-teal-400 top-[-100px] left-[-200px]"></div>
          <div className="gradient-blob w-[600px] h-[600px] bg-gray-100 bottom-0 right-[-250px]"></div>
          <Header />
        </>
      )}

      <main>
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
    <Layout /> 
  </Router> 
  ); 
}
export default App;