import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, LogOut } from "lucide-react";

const Header = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white/30 backdrop-blur-md shadow-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-semibold tracking-tight flex items-center"
        >
          <span className="text-black font-bold">Skill</span>
          <span className="text-orange-500 font-bold">Barter</span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-gray-800 font-medium">
          <Link to="/" className="hover:text-orange-500 transition">
            Home
          </Link>
          <Link to="/browse" className="hover:text-orange-500 transition">
            Browse Skills
          </Link>
          <Link to="/about" className="hover:text-orange-500 transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-orange-500 transition">
            Contact
          </Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {!user ? (
            // ✅ Show Join when not logged in (original design)
            <Link
              to="/signup"
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-md transition"
            >
              Join
            </Link>
          ) : (
            // ✅ User avatar + dropdown (animated)
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg transition"
              >
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold uppercase">
                  {user.name?.charAt(0) || "U"}
                </div>
                <span className="hidden sm:block font-medium text-gray-900 capitalize">
                  {user.name?.split(" ")[0]}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-gray-700 transition-transform duration-300 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Animated dropdown */}
              <div
                className={`absolute right-0 mt-2 w-44 bg-white/90 border border-gray-200 rounded-lg shadow-lg backdrop-blur-lg transition-all duration-300 origin-top-right ${
                  dropdownOpen
                    ? "opacity-100 translate-y-0 scale-100 visible"
                    : "opacity-0 -translate-y-2 scale-95 invisible"
                }`}
              >
                <ul className="text-gray-800 text-sm">
                  <li>
                    <Link
                      to="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 hover:bg-orange-100 rounded-t-lg transition"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-12 py-2 hover:bg-orange-100 rounded-b-lg flex items-center gap-2 transition"
                    >
                      <LogOut size={14} /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
