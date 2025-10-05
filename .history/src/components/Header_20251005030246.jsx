import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, User } from "lucide-react";

const Header = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-slate-900/60 backdrop-blur-md border-b border-slate-800 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"
        >
          <span className="text-teal-400">Skill</span>
          <span className="text-orange-400">Barter</span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-gray-300 font-medium">
          <Link to="/" className="hover:text-teal-400 transition">
            Home
          </Link>
          <Link to="/browse" className="hover:text-teal-400 transition">
            Browse Skills
          </Link>
          <Link to="/about" className="hover:text-teal-400 transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-teal-400 transition">
            Contact
          </Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {!user ? (
            // Join Button when user is not logged in
            <Link
              to="/signup"
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-md transition"
            >
              Join
            </Link>
          ) : (
            // Logged in user avatar
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700 text-white px-3 py-2 rounded-lg transition"
              >
                <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center font-semibold text-sm uppercase">
                  {user.name?.charAt(0) || "U"}
                </div>
                <span className="hidden sm:block font-medium text-gray-200 capitalize">
                  {user.name?.split(" ")[0]}
                </span>
                <ChevronDown size={16} className="text-gray-400" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-slate-900/90 border border-slate-700 rounded-lg shadow-lg backdrop-blur-xl">
                  <ul className="text-gray-300 text-sm">
                    <li>
                      <Link
                        to="/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 hover:bg-slate-800 rounded-t-lg transition"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-slate-800 rounded-b-lg flex items-center gap-2 transition"
                      >
                        <LogOut size={14} /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
