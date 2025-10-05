import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

// A helper component for the animated navigation links
const NavLink = ({ href, children }) => {
  return (
    <a href={href} className="relative group font-semibold text-slate-700">
      {children}
      <span className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
    </a>
  );
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      // UPDATED: Kept the clean white background with a subtle shadow
      className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          // UPDATED: Logo gradient uses a dark, energetic combination
          className="text-3xl font-extrabold bg-gradient-to-r from-slate-800 to-orange-600 bg-clip-text text-transparent"
        >
          SkillBarter
        </motion.h1>

        {/* Desktop Menu with Underline Animation */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden md:flex space-x-8"
        >
          <NavLink href="#home">Home</NavLink>
          <NavLink href="#skills">Browse Skills</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </motion.nav>

        {/* Desktop CTA Button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hidden md:block"
        >
          {/* UPDATED: Button uses the primary orange accent color */}
          <Link to="/login">
          <button className="px-6 py-2 bg-orange-600 text-white font-bold rounded-lg shadow-md hover:bg-orange-500 transition-all duration-300 transform hover:-translate-y-0.5">
            Join
          </button>
          </Link>
        </motion.div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-800 focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="md:hidden bg-white/95 backdrop-blur-md shadow-lg px-6 pb-4 pt-2 space-y-4 border-t border-slate-200"
        >
          {/* UPDATED: Mobile links with orange hover text */}
          <a href="#home" className="block text-slate-700 hover:text-orange-600 font-semibold transition-colors duration-300">
            Home
          </a>
          <a href="#skills" className="block text-slate-700 hover:text-orange-600 font-semibold transition-colors duration-300">
            Browse Skills
          </a>
          <a href="#about" className="block text-slate-700 hover:text-orange-600 font-semibold transition-colors duration-300">
            About
          </a>
          <a href="#contact" className="block text-slate-700 hover:text-orange-600 font-semibold transition-colors duration-300">
            Contact
          </a>
          <Link to="/login">
          <button className="w-full px-4 py-3 bg-orange-600 text-white font-bold rounded-lg shadow-md hover:bg-orange-500 transition-all duration-300">
            Join
          </button>
          </Link>
        </motion.nav>
      )}
    </motion.header>
  );
}