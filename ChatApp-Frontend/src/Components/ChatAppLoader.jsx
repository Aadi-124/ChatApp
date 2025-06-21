// import { motion } from "framer-motion";
// import { useEffect } from "react";
// import useChatContext from "../Service/ChatAppContext";
// import { useNavigate } from "react-router-dom";

// export const ChatAppLoader = ({ loadingText = "Loading your chat experience...", duration = 3000, redirectTo = "/chat" }) => {

//     const navigate = useNavigate();
//     const {darkMode} = useChatContext();

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1,
//       transition: { staggerChildren: 0.2 }
//     },
//     exit: { opacity: 0 }
//   };

//   const dotVariants = {
//     hidden: { y: 0 },
//     visible: { 
//       y: [0, -15, 0],
//       transition: { 
//         repeat: Infinity,
//         duration: 1.5,
//         ease: "easeInOut"
//       }
//     }
//   };

//   // Auto-redirect after duration
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       window.location.href = redirectTo;
//     }, duration);

//     return () => clearTimeout(timer);
//   }, [duration, redirectTo]);

//   return (
//     <motion.div 
//       className={`${darkMode ?'from-blue-950 to-green-950 text-white':'from-blue-100 to-green-100 text-black'} fixed inset-0 bg-gradient-to-br  flex flex-col items-center justify-center z-50"`}
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       exit="exit"
//     >
//       {/* Custom animated logo */}
//       <motion.div 
//         className="mb-8"
//         animate={{ 
//           rotate: [0, 360],
//           scale: [1, 1.1, 1]
//         }}
//         transition={{
//           repeat: Infinity,
//           duration: 2,
//           ease: "linear"
//         }}
//       >
//         <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
//           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
//           <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="currentColor"/>
//         </svg>
//       </motion.div>

//       {/* Animated text and dots */}
//       <div className="flex items-center mb-8">
//         <motion.p className="text-xl mr-2">{loadingText}</motion.p>
//         {[...Array(3)].map((_, i) => (
//           <motion.span 
//             key={i}
//             className={`${darkMode? 'bg-white' : 'bg-black' } w-2 h-2  rounded-full mx-1`}
//             variants={dotVariants}
//             custom={i}
//           />
//         ))}
//       </div>

//       {/* Progress bar */}
//       <motion.div 
//         className={`${darkMode? 'bg-white' :' bg-black' } h-1 bg-opacity-30 w-64 rounded-full overflow-hidden`}
//         initial={{ width: 0 }}
//         animate={{ width: "100%" }}
//         transition={{ duration: duration / 1000, ease: "linear" }}
//       >
//         <motion.div 
//           className={`${darkMode? 'bg-white' : 'bg-black' }h-full`}
//           initial={{ width: 0 }}
//           animate={{ width: "100%" }}
//           transition={{ duration: duration / 1000, ease: "linear" }}
//         />
//       </motion.div>

    
//     </motion.div>
//   );
// };




// import { motion } from "framer-motion";
// import useChatContext from "../Service/ChatAppContext";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

// export const ChatAppLoader = ({ loadingText = "Loading your chat experience...", duration = 3000, redirectTo=""}) => {
//   const { darkMode } = useChatContext();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (redirectTo) {
//       const timer = setTimeout(() => {
//         navigate(redirectTo); // not added to history
//       }, duration);
//       return () => clearTimeout(timer);
//     }
//   }, [duration, redirectTo, navigate]);



  // const containerVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: { staggerChildren: 0.2 },
  //   },
  //   exit: { opacity: 0 },
  // };

  // const dotVariants = {
  //   hidden: { y: 0 },
  //   visible: {
  //     y: [0, -15, 0],
  //     transition: {
  //       repeat: Infinity,
  //       duration: 1.5,
  //       ease: "easeInOut",
  //     },
  //   },
  // };

//   return (
//     <motion.div
//       className={`${darkMode ? 'from-blue-950 to-green-950 text-white' : 'from-blue-100 to-green-100 text-black'} 
//         fixed inset-0 bg-gradient-to-br flex flex-col items-center justify-center z-[9999]`}
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       exit="exit"
//     >
//       <motion.div
//         className="mb-8"
//         animate={{
//           rotate: [0, 360],
//           scale: [1, 1.1, 1],
//         }}
//         transition={{
//           repeat: Infinity,
//           duration: 2,
//           ease: "linear",
//         }}
//       >
//         <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
//           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor" />
//           <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="currentColor" />
//         </svg>
//       </motion.div>

//       <div className="flex items-center mb-8">
//         <motion.p className="text-xl mr-2">{loadingText}</motion.p>
//         {[...Array(3)].map((_, i) => (
//           <motion.span
//             key={i}
//             className={`${darkMode ? 'bg-white' : 'bg-black'} w-2 h-2 rounded-full mx-1`}
//             variants={dotVariants}
//             custom={i}
//           />
//         ))}
//       </div>

//       <motion.div
//         className={`${darkMode ? 'bg-white' : 'bg-black'} h-1 w-64 bg-opacity-30 rounded-full overflow-hidden`}
//         initial={{ width: 0 }}
//         animate={{ width: "100%" }}
//         transition={{ duration: duration / 1000, ease: "linear" }}
//       >
//         <motion.div
//           className={`${darkMode ? 'bg-white' : 'bg-black'} h-full`}
//           initial={{ width: 0 }}
//           animate={{ width: "100%" }}
//           transition={{ duration: duration / 1000, ease: "linear" }}
//         />
//       </motion.div>
//     </motion.div>
//   );
// };



import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useChatContext from '../Service/ChatAppContext';

export const ChatAppLoader = ({loadingText = "Loading your chat experience...",
  children, 
  duration = 3000, 
  show = true,
  onDurationEnd = () => {},
  overlayClass = "bg-black bg-opacity-90",
  contentClass = "bg-white dark:bg-gray-800"
}) => {
  useEffect(() => {
    if (show && duration) {
      const timer = setTimeout(() => {
        onDurationEnd();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onDurationEnd]);

  

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
    exit: { opacity: 0 },
  };

  const dotVariants = {
    hidden: { y: 0 },
    visible: {
      y: [0, -15, 0],
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  const {darkMode} = useChatContext();

  return (
     <motion.div
      className={`${darkMode ? 'from-blue-950 to-green-950 text-white' : 'from-blue-100 to-green-100 text-black'} 
        fixed inset-0 bg-gradient-to-br flex flex-col items-center justify-center z-[9999]`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="mb-8"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear",
        }}
      >
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor" />
          <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="currentColor" />
        </svg>
      </motion.div>

      <div className="flex items-center mb-8">
        <motion.p className="text-xl mr-2">{loadingText}</motion.p>
        {[...Array(3)].map((_, i) => (
          <motion.span
            key={i}
            className={`${darkMode ? 'bg-white' : 'bg-black'} w-2 h-2 rounded-full mx-1`}
            variants={dotVariants}
            custom={i}
          />
        ))}
      </div>

      <motion.div
        className={`${darkMode ? 'bg-white' : 'bg-black'} h-1 w-64 bg-opacity-30 rounded-full overflow-hidden`}
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: duration / 1000, ease: "linear" }}
      >
        <motion.div
          className={`${darkMode ? 'bg-white' : 'bg-black'} h-full`}
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: duration / 1000, ease: "linear" }}
        />
      </motion.div>
    </motion.div>
  );
};
