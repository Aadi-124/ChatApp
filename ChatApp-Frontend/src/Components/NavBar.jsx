import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import useChatContext from "../Service/ChatAppContext";

const Navbar = (props) => {
  const { darkMode, setDarkMode } = useChatContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={`absolute top-0 w-full px-6 py-4 shadow-md z-50  shadow-green-500 ${
      darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
    }`}>
      <div className="flex justify-between items-center">
        {/* Back Button */}
       

        {/* Title */}
        <h1 
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          ChatSphere
          {/* {props.heading} */}
        </h1>

        {/* Menu Toggle Button */}
        <button
          className={`${!darkMode ? "text-black hover:bg-gray-200" : "text-white hover:bg-gray-700"} cursor-pointer transition-colors duration-300 p-3 rounded-xl focus:outline-none`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            ref={menuRef}
            className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} transition-colors duration-300 fixed top-12 right-4 rounded-md shadow-md p-3 w-40`}
          >
            <ul>
              <li className="transition-transform duration-300 hover:scale-110 p-2 hover:text-gray-600 font-semibold cursor-pointer">Profile</li>
              <li className="transition-transform duration-300 hover:scale-110 p-2 hover:text-gray-600 font-semibold cursor-pointer">
                <button 
                  className="cursor-pointer transition-transform duration-300 hover:scale-110"
                  onClick={() => setDarkMode(!darkMode)}
                >
                  {darkMode ? "Theme:Dark 🌜" : "Theme:Light 🌞"}
                </button>
              </li>
              <li className="transition-transform duration-300 hover:scale-110 p-2 hover:text-gray-600 font-semibold cursor-pointer">Settings</li>
              <li className="transition-transform duration-300 hover:scale-110 p-2 hover:text-red-600 font-semibold cursor-pointer">Logout</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
