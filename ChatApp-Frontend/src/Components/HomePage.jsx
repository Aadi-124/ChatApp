// // import React from "react";
// // import { useNavigate } from "react-router-dom";
// // import { motion } from "framer-motion";
// // import useChatContext from "../Service/ChatAppContext";
// // import homepageImage from '../assets/homepageImage.png';

// // const HomePage = () => {
// //   const { darkMode } = useChatContext();
// //   const navigate = useNavigate();

//   // return (
//   //   <motion.div
//   //     initial={{ opacity: 0, y: -20 }}
//   //     animate={{ opacity: 1, y: 0 }}
//   //     exit={{ opacity: 0, y: 20 }}
//   //     transition={{ duration: 0.6 }}
//   //     className={`relative min-h-screen flex flex-col lg:flex-row items-center justify-center p-4 md:p-10 transition-all duration-500 ${
//   //       darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"
//   //     }`}
//   //   >
//   //     {/* Left Section (Text & Buttons) - Full width on mobile, half on desktop */}
//   //     <motion.div
//   //       initial={{ opacity: 0, x: -30 }}
//   //       animate={{ opacity: 1, x: 0 }}
//   //       transition={{ duration: 0.8 }}
//   //       className="w-full lg:w-1/2 mb-10 lg:mb-0 px-4 lg:px-10 order-2 lg:order-1 text-center lg:text-left"
//   //     >
//   //       <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 lg:mb-6">
//   //         Welcome to ChatSphere
//   //       </h2>
//   //       <p className="text-base sm:text-lg md:text-xl mb-6 lg:mb-8 font-medium">
//   //         Connect instantly, chat seamlessly, and experience real-time conversations like never before.
//   //       </p>

//   //       {/* Buttons - Stacked on mobile, inline on desktop */}
//   //       <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
//   //         <motion.button
//   //           onClick={() => navigate("/login")}
//   //           className="px-4 py-2 sm:px-6 sm:py-3 rounded-lg bg-green-500 text-white hover:bg-green-400 transition cursor-pointer text-sm sm:text-base"
//   //           whileHover={{ scale: 1.05 }}
//   //           whileTap={{ scale: 0.95 }}
//   //         >
//   //           Sign In
//   //         </motion.button>
//   //         <motion.button
//   //           onClick={() => navigate("/register")}
//   //           className="px-4 py-2 sm:px-6 sm:py-3 rounded-lg bg-green-500 text-white hover:bg-green-400 transition cursor-pointer text-sm sm:text-base"
//   //           whileHover={{ scale: 1.05 }}
//   //           whileTap={{ scale: 0.95 }}
//   //         >
//   //           Sign Up
//   //         </motion.button>
//   //       </div>
//   //     </motion.div>

//   //     {/* Right Section (Image) - Full width on mobile, half on desktop */}
//   //     <motion.div
//   //       initial={{ opacity: 0, x: 30 }}
//   //       animate={{ opacity: 1, x: 0 }}
//   //       transition={{ duration: 0.8 }}
//   //       className="w-full lg:w-1/2 flex justify-center order-1 lg:order-2 mb-8 lg:mb-0"
//   //     >
//   //       <img 
//   //         src={homepageImage} 
//   //         alt="Chat Preview" 
//   //         className="rounded-lg w-full max-w-md lg:max-w-none lg:w-2/3"
//   //       />
//   //     </motion.div>
//   //   </motion.div>
//   // );
// // };

// // export default HomePage;



// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import useChatContext from "../Service/ChatAppContext";
// import homepageImage from '../assets/homepageImage.png';

// const HomePageDesktop = () => {
//   const { darkMode } = useChatContext();
//   const navigate = useNavigate();

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//       className={`min-h-screen flex items-center justify-between px-24 py-16 transition-colors duration-300 ${
//         darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
//       }`}
//     >
//       {/* Left Content */}
//       <motion.div 
//         initial={{ x: -50, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.8, delay: 0.2 }}
//         className="w-1/2 pr-12"
//       >
//         <h1 className="text-6xl font-bold leading-tight mb-6">
//           Welcome to <span className="text-green-500">ChatSphere</span>
//         </h1>
//         <p className="text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-lg">
//           Connect instantly, chat seamlessly, and experience real-time conversations like never before.
//         </p>
        
//         <div className="flex gap-6">
//           <motion.button
//             onClick={() => navigate("/login")}
//             className="px-8 py-4 rounded-xl bg-green-500 text-white text-lg font-semibold shadow-lg"
//             whileHover={{ 
//               scale: 1.05,
//               boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.3)"
//             }}
//             whileTap={{ scale: 0.98 }}
//           >
//             Sign In
//           </motion.button>
//           <motion.button
//             onClick={() => navigate("/register")}
//             className="px-8 py-4 rounded-xl border-2 border-green-500 text-green-500 dark:text-green-400 text-lg font-semibold"
//             whileHover={{ 
//               scale: 1.05,
//               backgroundColor: darkMode ? "rgba(16, 185, 129, 0.1)" : "rgba(16, 185, 129, 0.05)"
//             }}
//             whileTap={{ scale: 0.98 }}
//           >
//             Sign Up
//           </motion.button>
//         </div>
//       </motion.div>

//       {/* Right Image */}
      

//       <img
//   src={homepageImage}
//   alt="Chat Preview"
//   className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl object-contain"
// />  
//     </motion.div>
//   );
// };

// export default HomePageDesktop;



import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useChatContext from "../Service/ChatAppContext";
import homepageImage from "../assets/homepageImage.png";

const HomePage = () => {
  const { darkMode } = useChatContext();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={` justify-center lg:justify-between min-h-screen content-center flex flex-wrap-reverse lg:flex-row  px-6 sm:px-10 lg:px-24 py-10 lg:py-16 transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Left Section - Text + Buttons */}
    

      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-fitlg:w-1/2 2xl:mr-50 lg:text-left px-2 sm:px-4 lg:pr-12 h-fit md:mb-16"
      >
        <center><h1 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 lg:mb-6">
          Welcome to <span className="text-green-500">ChatSphere</span>
        </h1></center>
        {/* <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6 lg:mb-10 max-w-xl mx-auto lg:mx-0"> */}
        <p className=" sm:text-lg  md:text-xl w-full sm:items-center text-gray-600 dark:text-gray-400 mb-6 lg:mb-10 max-w-xl lg:mx-0">
          Connect instantly, chat seamlessly, and experience real-time conversations like never before.
        </p>

        {/* Buttons */}
        <div className="flex max-sm:flex-col flex-grow  gap-3 sm:gap-10 lg:justify-start">
          <motion.button
            onClick={() => navigate("/login")}
            className="px-5 cursor-pointer py-3 sm:px-6 sm:py-3 w-full rounded-lg bg-green-500 text-white hover:bg-green-400 transition text-sm sm:text-base font-semibold shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
          <motion.button
            onClick={() => navigate("/register")}
            className="px-5 cursor-pointer py-3 w-full sm:px-6 sm:py-3 rounded-lg border-2 border-green-500 text-green-500 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/10 transition text-sm sm:text-base font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.button>
        </div>
      </motion.div>

      {/* Right Section - Image */}
      <motion.div
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-fit lg:w-1/2 flex justify-center items-center lg:mb-0"
      >
        <img
          src={homepageImage}
          alt="Chat Preview"
          className=" w-100"
          />
      </motion.div>
    
    </motion.div>
  );
};

export default HomePage;
