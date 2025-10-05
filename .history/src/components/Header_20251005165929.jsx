import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-slate-950/80 backdrop-blur-md z-50 shadow-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-teal-400 font-bold text-xl tracking-wide hover:text-teal-300"
        >
          SkillBarter
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-gray-300">
          <Link to="/" className="hover:text-teal-400">
            Home
          </Link>
          <Link to="/skills" className="hover:text-teal-400">
            Skills
          </Link>
          <Link to="/about" className="hover:text-teal-400">
            About
          </Link>
          <Link to="/contact" className="hover:text-teal-400">
            Contact
          </Link>

          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-teal-400">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-1.5 rounded-lg ml-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-1.5 rounded-lg"
              >
                Join
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-950 border-t border-slate-800 flex flex-col items-center space-y-4 py-4 text-gray-300">
          <Link to="/">Home</Link>
          <Link to="/skills">Skills</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>

          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button
                onClick={handleLogout}
                className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-1.5 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-1.5 rounded-lg"
            >
              Join
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
