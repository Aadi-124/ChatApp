

import React, { useState } from 'react';
import { createRoom, joinRoom } from '../Service/ApiService';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import useChatContext from '../Service/ChatAppContext';
import { motion } from 'framer-motion';


const RoomCreateJoin = () => {
    const [username, setUsername] = useState('');
    const [roomid, setRoomid] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingjoin, setLoadingJoin] = useState(false);
    const navigate = useNavigate();
    const { setRoomId, setCurrentUser, setConnected, darkMode,setDarkMode } = useChatContext();

    const handleJoin = () => {
        if (!username || !roomid) {
            toast.error("Please enter both username and room ID!");
            return;
        }
        setLoadingJoin(true);
        joinRoom(roomid)
            .then(() => {
                toast.success("Room Joined Successfully!");
                setRoomId(roomid);
                setCurrentUser(username);
                setConnected(true);
                navigate("/chat", {
                    state: {
                        showToast: true,
                        toastMessage: "Room joined successfully!"
                    }
                });
            })
            .catch(() => {
                toast.error("Room Not Exists!");
            })
            .finally(() => {
                setLoadingJoin(false);
            });
    };

    const handleCreate = () => {
        if (!username || !roomid) {
            toast.error("Please enter both username and room ID!");
            return;
        }
        setLoading(true);
        const room = { roomId: roomid };
        createRoom(room)
            .then(() => {
                setCurrentUser(username);
                setRoomId(roomid);
                setConnected(true);
                navigate("/chat", {
                    state: {
                        showToast: true,
                        toastMessage: "Room created successfully!"
                    }
                });
            })
            .catch(() => {
                toast.error("Room Already Exists!");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    return (
        <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className={`transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"
      }`}
    >
        <div className={`flex flex-col items-center justify-center min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
                    
            <div className="w-full max-w-md p-6 bg-opacity-90 backdrop-blur-lg rounded-xl shadow-xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold">Join or Create a Chat Room</h2>
                </div>

                <div className="space-y-5">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your name"
                            required
                            disabled={loading || loadingjoin}
                            className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 transition-colors duration-200 ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-600'} disabled:opacity-50`}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Room ID</label>
                        <input
                            type="text"
                            value={roomid}
                            onChange={(e) => setRoomid(e.target.value)}
                            placeholder="Enter room ID"
                            required
                            disabled={loading || loadingjoin}
                            className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 transition-colors duration-200 ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-600'} disabled:opacity-50`}
                        />
                    </div>

                    <div className="flex justify-between space-x-4">
                        <button
                            onClick={handleJoin}
                            disabled={loadingjoin || loading}
                            className={`flex-1 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${darkMode ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' : 'bg-green-500 hover:bg-green-600 focus:ring-green-600'} disabled:opacity-50`}
                        >
                            {loadingjoin ? 'Joining...' : 'Join Room'}
                        </button>
                        <button
                            onClick={handleCreate}
                            disabled={loading || loadingjoin}
                            className={`flex-1 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${darkMode ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-600'} disabled:opacity-50`}
                        >
                            {loading ? 'Creating...' : 'Create Room'}
                        </button>   
                    </div>
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
                closeOnClick
                pauseOnHover
                draggable
                theme={darkMode ? 'dark' : 'light'}
                newestOnTop={false}
            />
        </div>
        </motion.div>
    );
};

export default RoomCreateJoin;