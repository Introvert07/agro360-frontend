import { FaLeaf, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import React, { useState, useRef, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState("English");
  const letterRefs = useRef([]);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleLanguageChange = (e) => setLanguage(e.target.value);

  const animateLetters = () => {
    letterRefs.current.forEach((el, i) => {
      gsap.to(el, {
        y: -10,
        rotation: gsap.utils.random(-15, 15),
        scale: gsap.utils.random(1.1, 1.3),
        duration: 0.3,
        ease: "power2.out",
        delay: i * 0.05,
      });
    });
  };

  const resetLetters = () => {
    letterRefs.current.forEach((el) => {
      gsap.to(el, {
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.inOut",
      });
    });
  };

  useEffect(() => {
    letterRefs.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 30, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          delay: i * 0.05,
          duration: 0.4,
          ease: "back.out(1.7)",
        }
      );
    });
  }, []);

  const navLinks = [
    { label: "Fertilizer Info", path: "/fertilizers" },
    { label: "Crop Doctor", path: "/crop-doctor" },
    { label: "Crop Scheduler", path: "/crop-scheduler" },
    { label: "AgriBazaar", path: "/agri-bazaar" },
    { label: "Schemes", path: "/schemes" },
  ];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
className="fixed top-0 left-0 w-full z-50 px-2"
    >
<div className="max-w-9xl mx-auto px-4 py-3 flex items-center justify-between bg-white/30 backdrop-blur-md border-b border-white/20 shadow-lg rounded-b-2xl">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <FaLeaf className="text-green-600 text-2xl glow" />
          <div
            className="flex gap-0.5"
            onMouseEnter={animateLetters}
            onMouseLeave={resetLetters}
          >
            {["A", "g", "r", "o", "3", "6", "0"].map((char, index) => (
              <span
                key={index}
                ref={(el) => (letterRefs.current[index] = el)}
                className="text-xl font-extrabold text-green-800 inline-block"
              >
                {char}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ label, path }) => (
            <motion.button
              key={label}
              onClick={() => navigate(path)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.96 }}
              className="relative text-gray-700 font-semibold py-1 px-2 hover:text-green-700 transition-all duration-300 group"
            >
              <span className="relative z-10">{label}</span>
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </motion.button>
          ))}
        </div>

        {/* Language + Auth */}
        <div className="hidden md:flex items-center gap-4">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="text-sm rounded-full px-3 py-1 bg-white/60 text-green-700 border border-green-300 hover:bg-green-100 transition"
          >
            <option value="English">English</option>
            <option value="Hindi">हिंदी</option>
          </select>

          {user ? (
            <>
              <div className="px-4 py-2 text-sm bg-white/50 text-green-800 border border-green-400 rounded-full font-semibold shadow-sm">
                {user.name?.split(" ").slice(0, 2).join(" ")}
              </div>
              <motion.button
                onClick={logout}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-full hover:bg-red-600 transition font-semibold shadow"
              >
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 text-sm text-green-800 border border-green-500 rounded-full hover:bg-green-100 transition font-medium shadow-sm"
                >
                  Login
                </motion.button>
              </Link>
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-green-600 to-green-500 text-white rounded-full hover:brightness-110 transition font-semibold shadow"
                >
                  Register
                </motion.button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-green-700 text-2xl"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/80 backdrop-blur-lg px-4 pb-4 shadow-lg rounded-b-2xl"
          >
            <div className="flex flex-col gap-4 pt-4">
              {navLinks.map(({ label, path }) => (
                <button
                  key={label}
                  onClick={() => {
                    navigate(path);
                    setMenuOpen(false);
                  }}
                  className="text-green-800 text-sm font-semibold rounded-md py-2 hover:bg-green-100 transition"
                >
                  {label}
                </button>
              ))}
              {user ? (
                <button
                  onClick={logout}
                  className="text-red-600 text-sm font-semibold rounded-md py-2 hover:bg-red-100 transition"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    <div className="text-sm text-green-700 hover:underline py-1">
                      Login
                    </div>
                  </Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)}>
                    <div className="text-sm text-green-700 hover:underline py-1">
                      Register
                    </div>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
