// import { motion } from 'framer-motion';
// import useChatContext from '../Service/ChatAppContext';


// const ContactCard = ({ username, firstName, lastName, profilePictureUrl }) => {
//   const { darkMode } = useChatContext();


//   return (
//     <motion.div
//       className={`w-70 h-100 p-4 rounded-lg border-4 border-black transition-colors cursor-pointer ${
//         darkMode
//           ? 'bg-gray-800 border-gray-700 hover:bg-gray-700'
//           : 'bg-white border-gray-200 hover:bg-gray-50'
//       }`}
//       whileHover={{ 
//         y: -4,
//         boxShadow: darkMode 
//           ? '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
//           : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
//       }}
//       transition={{ type: 'spring', stiffness: 300 }}
//     >
//       <div className="flex flex-col justify-around items-center w-full h-full space-x-4">
//         {/* Avatar */}
//         <div className="">
//           <img
//             className="h-40 w-40 rounded-full object-cover"
//             src={profilePictureUrl || getDefaultAvatar(darkMode, firstName, lastName)}
//             alt={`${firstName}'s profile`}
//           />
//         </div>

//         {/* Name */}
//         <div className="min-w-0">
//           <p className={` font-medium truncate ${
//             darkMode ? 'text-white' : 'text-gray-900'
//           }`}>
//             {firstName} {lastName}
//           </p>
//           <br />
//           <p className={`text-sm truncate ${
//             darkMode ? 'text-gray-400' : 'text-gray-500'
//           }`}>
//             ${username}
//           </p>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // Helper for default avatar
// const getDefaultAvatar = (dark, first, last) => {
//   const bg = dark ? '4B5563' : 'E5E7EB';
//   const text = dark ? 'FFFFFF' : '111827';
//   return `https://ui-avatars.com/api/?name=${first}+${last}&background=${bg}&color=${text}`;
// };

// export default ContactCard;



// import { motion } from 'framer-motion';
// import { useState } from 'react';
// import useChatContext from '../Service/ChatAppContext';

// const ContactCard = ({ 
//   username, 
//   firstName, 
//   lastName, 
//   profilePictureUrl,
//   onSelect, // callback when card is selected/deselected
//   isSelected = false // controlled selection state
// }) => {
//   const { darkMode } = useChatContext();
//   const [isChecked, setIsChecked] = useState(isSelected);

//   const handleCardClick = (e) => {
//     // Prevent checkbox click from triggering card click
//     if (e.target.type !== 'checkbox') {
//       const newCheckedState = !isChecked;
//       setIsChecked(newCheckedState);
//       if (onSelect) {
//         onSelect(username, newCheckedState);
//       }
//     }
//   };

//   return (
//     <motion.div
//       className={`relative w-70 h-100 p-4 rounded-lg border-4 transition-colors cursor-pointer ${
//         darkMode
//           ? 'bg-gray-800 border-gray-700 hover:bg-gray-700'
//           : 'bg-white border-gray-200 hover:bg-gray-50'
//       } ${
//         isChecked 
//           ? darkMode 
//             ? 'ring-2 ring-blue-500' 
//             : 'ring-2 ring-blue-400'
//           : ''
//       }`}
//       whileHover={{ 
//         y: -4,
//         boxShadow: darkMode 
//           ? '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
//           : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
//       }}
//       transition={{ type: 'spring', stiffness: 300 }}
//       onClick={handleCardClick}
//     >
//       {/* Checkbox in top-right corner */}
//       <div className="absolute top-2 right-2">
//         <input
//           type="checkbox"
//           checked={isChecked}
//           onChange={(e) => {
//             setIsChecked(e.target.checked);
//             if (onSelect) {
//               onSelect(username, e.target.checked);
//             }
//           }}
//           onClick={(e) => e.stopPropagation()}
//           className={`w-5 h-5 rounded cursor-pointer ${
//             darkMode 
//               ? 'accent-blue-500 bg-gray-700 border-gray-600'
//               : 'accent-blue-400 bg-white border-gray-300'
//           }`}
//         />
//       </div>

//       <div className="flex flex-col justify-around items-center w-full h-full space-x-4">
//         {/* Avatar */}
//         <div className="">
//           <img
//             className="h-40 w-40 rounded-full object-cover"
//             src={profilePictureUrl || getDefaultAvatar(darkMode, firstName, lastName)}
//             alt={`${firstName}'s profile`}
//           />
//         </div>

//         {/* Name */}
//         <div className="min-w-0">
//           <p className={`font-medium truncate ${
//             darkMode ? 'text-white' : 'text-gray-900'
//           }`}>
//             {firstName} {lastName}
//           </p>
//           <br />
//           <p className={`text-sm truncate ${
//             darkMode ? 'text-gray-400' : 'text-gray-500'
//           }`}>
//             @{username}
//           </p>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // Helper for default avatar (unchanged)
// const getDefaultAvatar = (dark, first, last) => {
//   const bg = dark ? '4B5563' : 'E5E7EB';
//   const text = dark ? 'FFFFFF' : '111827';
//   return `https://ui-avatars.com/api/?name=${first}+${last}&background=${bg}&color=${text}`;
// };

// export default ContactCard;


import { motion } from 'framer-motion';
import useChatContext from '../Service/ChatAppContext';

const ContactCard = ({
  username,
  firstName,
  lastName,
  profilePictureUrl,
  onSelect,
  isSelected = false
}) => {
  const { darkMode } = useChatContext();

  const handleCardClick = (e) => {
    // Prevent toggling if the user clicks directly on the checkbox
    if (e.target.type !== 'checkbox') {
      onSelect(!isSelected);
    }
  };

  return (
    <motion.div
      className={`relative w-70 h-100 p-4 rounded-lg border-4 transition-colors cursor-pointer ${
        darkMode
          ? 'bg-gray-800 border-gray-700 hover:bg-gray-700'
          : 'bg-white border-gray-200 hover:bg-gray-50'
      } ${isSelected ? (darkMode ? 'ring-2 ring-blue-500' : 'ring-2 ring-blue-400') : ''}`}
      whileHover={{
        y: -4,
        boxShadow: darkMode
          ? '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
          : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
      }}
      transition={{ type: 'spring', stiffness: 300 }}
      onClick={handleCardClick}
    >
      {/* Checkbox */}
      <div className="absolute top-2 right-2">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(e.target.checked)}
          onClick={(e) => e.stopPropagation()}
          className={`w-5 h-5 rounded cursor-pointer ${
            darkMode
              ? 'accent-blue-500 bg-gray-700 border-gray-600'
              : 'accent-blue-400 bg-white border-gray-300'
          }`}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-around items-center w-full h-full space-x-4">
        <div>
          <img
            className="h-40 w-40 rounded-full object-cover"
            src={profilePictureUrl || getDefaultAvatar(darkMode, firstName, lastName)}
            alt={`${firstName}'s profile`}
          />
        </div>
        <div className="min-w-0 text-center">
          <p className={`font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {firstName} {lastName}
          </p>
          <br />
          <p className={`text-sm truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            @{username}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Utility for fallback avatar
const getDefaultAvatar = (dark, first, last) => {
  const bg = dark ? '4B5563' : 'E5E7EB';
  const text = dark ? 'FFFFFF' : '111827';
  return `https://ui-avatars.com/api/?name=${first}+${last}&background=${bg}&color=${text}`;
};

export default ContactCard;
