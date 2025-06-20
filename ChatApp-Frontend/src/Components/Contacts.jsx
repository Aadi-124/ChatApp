


import React, { useState, useRef, useEffect } from 'react';
import useChatContext from '../Service/ChatAppContext';
import { motion, AnimatePresence } from 'framer-motion';
import photo1 from '../assets/profilepic1.png';
import photo2 from '../assets/profilepic2.png';

const contacts = [
  { id: 1, name: 'Aaditya', lastMessage: 'Hello', online: true, avatar: photo1 },
  { id: 2, name: 'Priya', lastMessage: 'Typing...', online: false, avatar: photo2 },
];


const Contacts = ({ onSelectChat }) => {
  const { darkMode, setDarkMode } = useChatContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

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
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';
  const hoverBg = darkMode ? 'hover:bg-gray-800' : 'hover:bg-blue-50';
  const menuBg = darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200';



  return (
    <aside className={`min-h-screen item-center justify-center transition-colors duration-300 flex flex-col border-r ${bgClass}`}>

      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 pt-24 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>

        <div className={`w-full max-w-2xl p-6 rounded-xl shadow-xl border transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Contacts</h2>
            <div className="relative" ref={menuRef}>
              <button
                className={`text-xl cursor-pointer px-2 py-1 rounded-full transform transition-transform duration-300 ${darkMode ? 'text-white' : 'text-gray-800'} ${menuOpen ? 'rotate-90' : 'rotate-0'}`}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                ⋮
              </button>

              {/* Animated Dropdown Menu */}
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
                      {[
                        { icon: '👤', label: 'Profile' },
                        { icon: '⚙️', label: 'Settings' },
                        { icon: '📁', label: 'Files' },
                        { icon: '📞', label: 'Calls' },
                        { icon: '📊', label: 'Analytics' },
                        { icon: '💬', label: 'Feedback' },
                      ].map((item, i) => (
                        <li
                          key={i}
                          className={`px-4 py-2 cursor-pointer transform transition-all duration-200 hover:scale-105 ${darkMode ? 'hover:text-gray-700' : 'hover:text-gray-600'
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
                        className={`px-4 py-2 cursor-pointer transform transition-all duration-200 hover:scale-105 ${darkMode ? 'hover:text-gray-700' : 'hover:text-gray-600'
                          }`}
                      >
                        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                      </li>
                      <li
                        className={`px-4 py-2 text-gray-800 cursor-pointer transform transition-all duration-200 hover:scale-105 ${darkMode ? 'hover:text-red-600' : 'hover:text-red-600'
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

          {/* Contact List */}
          <ul className={`divide-y max-h-[60vh] overflow-y-auto rounded-md ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {contacts.map(contact => (
              <li
                key={contact.id}
                onClick={() => onSelectChat(contact)}
                className={`flex items-center gap-4 p-4 cursor-pointer rounded-md ${hoverBg}`}
              >
                <div className="relative">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className={`w-12 h-12 rounded-full object-cover border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
                  />
                  <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${contact.online ? 'bg-green-400' : 'bg-gray-400'} ${darkMode ? 'border-gray-800' : 'border-white'}`} />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">{contact.name}</span>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{contact.lastMessage}</span>
                </div>
              </li>
            ))}
          </ul>

        </div>

      </div>


    </aside>
  );
};

export default Contacts;



