import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";  // ✅ import

import Header from "./components/Header";
import Hero from "./components/Hero";
import HowItWorks from "./components/Howitworks";
import Featured from "./components/featured";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./pages/Dashboard"; // (we'll add this page next)

function App() {
  const hideHeaderRoutes = ["/login", "/signup"];

  return (
    <>
      {!hideHeaderRoutes.includes(window.location.pathname) && <Header />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<>
          <Hero />
          <HowItWorks />
          <Featured />
        </>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ✅ Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* later we can add /wallet, /transactions etc. */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
