import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HowItWorks from "./components/Howitworks";
import FeaturedSkills from "./components/featured";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./pages/Dashboard";
import SkillDetails from "./pages/SkillDetails";
import BrowseSkills from "./pages/BrowseSkills";
import UserProfile from "./pages/UserProfile";



function Layout() {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/signup"];
  const currentPath = location.pathname.toLowerCase();
  const hideHeader = hideHeaderRoutes.some((path) =>
    currentPath.startsWith(path)
  );

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
          <Route path="/browse" element={<BrowseSkills />} />
          <Route path="/profile/:userId" element={<UserProfile />} />



          {/* ✅ Dashboard inside layout (so Header stays) */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/skills/:id" element={<SkillDetails />} />
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
