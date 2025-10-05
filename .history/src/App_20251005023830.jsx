import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HowItWorks from "./components/Howitworks";
import Featured from "./components/featured";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PrivateRoute from "./components/PrivateRoute"; // ✅ our guard
import Dashboard from "./pages/Dashboard"; // placeholder for now

function App() {
  const hideHeaderRoutes = ["/login", "/signup"];
  const currentPath = window.location.pathname;

  return (
    <Router>
      {/* ✅ Only show Header on allowed pages */}
      {!hideHeaderRoutes.includes(currentPath) && <Header />}

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <HowItWorks />
              <Featured />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ✅ PROTECTED ROUTES — minimal addition */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
