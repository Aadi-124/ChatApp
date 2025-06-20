

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useChatContext from "../Service/ChatAppContext";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { getMessages } from "../Service/ApiService";
import moment from "moment";
import { BaseURL } from "../Service/URLService";
import { AnimatePresence, motion } from "framer-motion";

const ChatPage = () => {
  const { roomId, currentUser, connected, darkMode, setDarkMode } = useChatContext();
  const [newMessage, setNewMessage] = useState("");
  const chatBoxRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();


  const [messages, setMessages] = useState([
    {
      sender: "Alice",
      content: "Hey! How are you?",
      time: new Date().toISOString()
    },
    {
      sender: currentUser,
      content: "I'm good! How about you?",
      time: new Date().toISOString()
    },
    {
      sender: "Alice",
      content: "Doing great, thanks for asking!",
      time: new Date().toISOString()
    }
  ]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({ top: chatBoxRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSend = () => {
    if (newMessage.trim() !== "" && connected) {
      stompClient.send(`/app/sendMessage/${roomId}`, {}, JSON.stringify({ sender: currentUser, content: newMessage, roomId }));
      setNewMessage("");
    }
  };


  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} transition-colors duration-300 min-h-screen flex flex-col pb-24`}>
      

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            ref={menuRef}
            className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} fixed top-12 right-4 rounded-md shadow-md p-3 w-40`}
          >
            <ul>
              <li className="hover:scale-110 p-2 hover:text-gray-600 font-semibold cursor-pointer">Profile</li>
              <li className="hover:scale-110 p-2 hover:text-gray-600 font-semibold cursor-pointer">
                <button 
                  className="cursor-pointer transition-transform duration-300 hover:scale-110"
                  onClick={() => setDarkMode(!darkMode)}
                >
                  {darkMode ? "Theme:Dark 🌜" : "Theme:Light 🌞"}
                </button>
              </li>
              <li className="hover:scale-110 p-2 hover:text-gray-600 font-semibold cursor-pointer">Settings</li>
              <li className="hover:scale-110 p-2 hover:text-red-600 font-semibold cursor-pointer">Logout</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={chatBoxRef} className="flex-grow overflow-auto p-4 space-y-2 pt-24">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className={`flex items-center ${msg.sender === currentUser ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-xs p-3 rounded-lg ${msg.sender === currentUser ? "bg-green-500 text-white" : "bg-gray-300 text-gray-900"}`}>
              <span className="font-semibold block">{msg.sender !== currentUser && msg.sender}</span>
              {msg.content}
              <div className="text-xs text-gray-700 mt-1 text-right">{moment(msg.time).format("h:mm A")}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className={`${darkMode ? "bg-gray-800" : "bg-gray-300"} flex p-4 fixed bottom-0 left-0 right-0`}>
        <input
          type="text"
          className={`${darkMode ? "bg-gray-800 text-white" : "bg-gray-300 text-gray-900"} flex-grow p-2 rounded focus:outline-none`}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <motion.button 
          whileTap={{ scale: 0.9 }} 
          className="ml-2 px-4 py-2 rounded bg-green-500 text-white cursor-pointer"
          onClick={handleSend}
        >
          Send
        </motion.button>
      </div>
   


      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
};

export default ChatPage;









