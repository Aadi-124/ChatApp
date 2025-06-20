import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useChatContext from "../Service/ChatAppContext";
import homepageImage from '../assets/homepageImage.png';


const HomePage = () => {
  const { darkMode, setDarkMode } = useChatContext();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className={`relative min-h-screen flex items-center justify-between p-10 transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Left Section (Text & Buttons) */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-1/2"
      >
        <h2 className="text-6xl font-extrabold mb-6">Welcome to ChatSphere</h2>
        <p className="text-lg mb-6 font-medium">
          Connect instantly, chat seamlessly, and experience real-time conversations like never before.
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <motion.button
            onClick={() => navigate("/login")}
            className="px-6 py-3 rounded-lg bg-green-500 text-white hover:bg-green-400 transition cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Sign In
          </motion.button>
          <motion.button
            onClick={() => navigate("/register")}
            className="px-6 py-3 rounded-lg bg-green-500 text-white hover:bg-green-400 transition cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Sign Up
          </motion.button>
        </div>
      </motion.div>

      {/* Right Section (Video & Image) */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-1/2 flex justify-end gap-6"
      >
        {/* Video */}
        {/* <video className="rounded-lg shadow-lg w-1/2" autoPlay loop muted>
          <source src="/path-to-your-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}

        {/* Image */}
        <img src={homepageImage} alt="Chat Preview" className="rounded-lg w-2/3 right-10 mr-40" />
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
