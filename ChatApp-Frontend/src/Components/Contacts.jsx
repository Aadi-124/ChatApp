import React, { useState, useRef, useEffect } from 'react';
import useChatContext from '../Service/ChatAppContext';
import { motion, AnimatePresence } from 'framer-motion';
import photo1 from '../assets/profilepic1.png';
import photo2 from '../assets/profilepic2.png';
import { retrieveUserContact } from '../Service/ApiService';

// const contacts = [
//   { id: 1, name: 'Aaditya', lastMessage: 'Hello', online: true, avatar: photo1 },
//   { id: 2, name: 'Priya', lastMessage: 'Typing...', online: false, avatar: photo2 },
// ];

const Contacts = ({ onSelectChat }) => {
  const { darkMode, setDarkMode,jwtToken,userId } = useChatContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const menuRef = useRef(null);
  const [contacts, setContacts] = useState([]);



  useEffect(()=>{
    retrieveUserContact(jwtToken,userId).then((response)=>{
      console.log(response);
      setContacts(response.data);
    }).catch((error)=>{
      console.log(error);
    })
  },[])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const bgClass = darkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200';
  const hoverBg = darkMode ? 'hover:bg-gray-800' : 'hover:bg-blue-50';
  const menuBg = darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200';

  const filteredContacts = contacts.filter(contact =>
    contact.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className={`min-h-screen flex flex-col border-r ${bgClass}`}>
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <div className={`w-full max-w-2xl h-lvh p-6 rounded-xl shadow-xl border-8 flex flex-col transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>

          {/* Header Row with Search and Menu */}
          <div className="flex items-center gap-4 mb-4 flex-shrink-0 relative">

            {/* Animated Heading */}
            <AnimatePresence>
              {!isSearchFocused && (
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`text-2xl font-bold whitespace-nowrap 
                ${isSearchFocused ? 'hidden sm:block' : 'block'}`}
                >
                  Contacts
                </motion.h2>
              )}
            </AnimatePresence>

            {/* Animated Search Bar */}
            <motion.input
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`flex-grow px-4 py-2 rounded-md max-[450px]:w-5 focus:outline-none border transition-all ${
                darkMode
                  ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400'
                  : 'bg-gray-100 text-gray-800 border-gray-300 placeholder-gray-500'
              }`}
            />

            {/* Menu */}
            <div className="relative" ref={menuRef}>
              <button
                className={`text-xl cursor-pointer px-2 py-1 rounded-full transform transition-transform duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-800'
                } ${menuOpen ? 'rotate-90' : 'rotate-0'}`}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                ⋮
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute right-0 mt-2 w-44 rounded-md shadow-md z-20 border font-semibold ${menuBg}`}
                  >
                    <ul>
                      {[{ icon: '👤', label: 'Profile' }, { icon: '⚙️', label: 'Settings' }, { icon: '📁', label: 'Files' }, { icon: '📞', label: 'Calls' }, { icon: '📊', label: 'Analytics' }, { icon: '💬', label: 'Feedback' }].map((item, i) => (
                        <li
                          key={i}
                          className={`px-4 py-2 cursor-pointer transition-all hover:scale-105 ${
                            darkMode ? 'hover:text-gray-300' : 'hover:text-gray-600'
                          }`}
                        >
                          {item.icon} {item.label}
                        </li>
                      ))}
                      <li
                        onClick={() => {
                          setDarkMode(!darkMode);
                          setMenuOpen(false);
                        }}
                        className={`px-4 py-2 cursor-pointer hover:scale-105 ${
                          darkMode ? 'hover:text-gray-300' : 'hover:text-gray-600'
                        }`}
                      >
                        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                      </li>
                      <li
                        className={`px-4 py-2 text-red-500 cursor-pointer hover:scale-105 ${
                          darkMode ? 'hover:text-red-400' : 'hover:text-red-600'
                        }`}
                      >
                        🚪 Logout
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Contact List with Animation */}
          <ul className={`divide-y overflow-y-auto rounded-md flex-grow ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            <AnimatePresence>
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    onClick={() => onSelectChat(contact)}
                    className={`flex items-center gap-4 p-4 cursor-pointer rounded-md ${hoverBg}`}
                  >
                    <div className="relative">
                      <img
                        src={contact.profilePictureUrl}
                        alt={contact.userName}
                        className={`w-12 h-12 rounded-full object-cover border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
                      />
                      <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${contact.online ? 'bg-green-400' : 'bg-gray-400'} ${darkMode ? 'border-gray-800' : 'border-white'}`} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">{contact.userName}</span>
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{contact.lastMessage}</span>
                    </div>
                  </motion.li>
                ))
              ) : (
                <motion.li
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-sm text-gray-500 py-4"
                >
                  No contacts found.
                </motion.li>
              )}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Contacts;
