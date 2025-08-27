import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Quiz", path: "/quiz" },
    { name: "Summary", path: "/summary" },
    { name: "AI Chat", path: "/aichat" },
  ];

  return (
    <nav
      className={`flex items-center justify-between p-6 fixed top-0 left-0 right-0 z-50 shadow-md transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white"
      }`}
    >
      {/* Logo */}
      <Link
        to="/home"
        className="text-2xl font-bold tracking-wide hover:text-yellow-300 transition duration-300"
      >
        Study Genie
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 items-center">
        <Link
          to="/"
          className={`hover:text-yellow-300 transition duration-300 ${
            location.pathname === "/" ? "underline font-semibold" : ""
          }`}
        >
          Get Started
        </Link>

        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`hover:text-yellow-300 transition duration-300 ${
              location.pathname === link.path ? "underline font-semibold" : ""
            }`}
          >
            {link.name}
          </Link>
        ))}

        {/* Clerk Auth UI */}
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <Link
            to="/sign-in"
            className="px-4 py-1 bg-white text-indigo-600 font-semibold rounded hover:bg-gray-100 transition"
          >
            Sign In
          </Link>
        </SignedOut>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-white dark:bg-gray-700 p-2 rounded-full transition-all duration-300 hover:scale-105 shadow-sm"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-indigo-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center space-x-3">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-white dark:bg-gray-700 p-2 rounded-full transition-all duration-300 hover:scale-105 shadow-sm"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-indigo-700" />
          )}
        </button>

        {/* Hamburger / Close Icon */}
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 px-6 py-4 flex flex-col space-y-4 md:hidden transition-all duration-300`}
        >
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className={`hover:text-yellow-500 ${
              location.pathname === "/" ? "underline font-semibold" : ""
            }`}
          >
            Get Started
          </Link>

          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`hover:text-yellow-500 ${
                location.pathname === link.path ? "underline font-semibold" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link
              to="/sign-in"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-1 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition"
            >
              Sign In
            </Link>
          </SignedOut>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
