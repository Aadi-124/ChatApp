
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const BackArrowButton = () =>{

    const navigate = useNavigate();

    return(
         <motion.div
      initial={{ x: -15, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      onClick={() => navigate(-1)}
      className="absolute top-5 left-5 cursor-pointer z-50 rounded-full p-2 hover:bg-green-300 dark:hover:bg-green-800 transition duration-200"
    >
      <svg
        className="w-6 h-6 text-green-600 dark:text-green-400"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </motion.div>
    );
}

export default BackArrowButton;