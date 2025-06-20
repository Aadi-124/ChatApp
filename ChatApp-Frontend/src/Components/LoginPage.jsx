import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import useChatContext from '../Service/ChatAppContext';
import { Link } from 'react-router-dom';
import { loginuser } from '../Service/ApiService';
import { ChatAppLoader } from './ChatAppLoader';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const { darkMode, setDarkMode, jwtToken, setJwtToken, isAuthenticated, setIsAuthenticated, isLoggedIn, setIsLoggedIn } = useChatContext();
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!username || !password) {
            toast.error("Please enter both username and password!");
            return;
        }
        setLoading(true);

        const credentials = {
            'userName': username,
            'password': password
        }

        loginuser(credentials).then((response) => {
            setLoading(false);
            console.log("response.data = " + response.data);
            toast.success("Logged in Successfully!");
            setShowLoader(true);

            //userstate:-
            setJwtToken(response.data);
            setIsLoggedIn(true);
            setIsAuthenticated(true);
        }).catch((error) => {
            setLoading(false);
            console.log("error = " + error);
            toast.error("Incorrect UserName or Password!");
        })

    };


    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
        >

            <div className={`relative flex flex-col items-center justify-center min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>

                {/* Theme Toggle in Top-Right Corner */}
                <div className="absolute top-4 right-4">

                </div>


                <div className={`w-full max-w-md p-6 bg-opacity-90 backdrop-blur-lg rounded-xl shadow-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Login to Chat</h2>

                    <div className="space-y-5">
                        <div>
                            <label className="block mb-1 text-sm font-medium">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                required
                                disabled={loading}
                                className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 transition-colors duration-200 ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-600'} disabled:opacity-50`}
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                disabled={loading}
                                className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 transition-colors duration-200 ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-600'} disabled:opacity-50`}
                            />
                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={handleLogin}
                                disabled={loading}
                                className={`w-full cursor-pointer py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${darkMode ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-600'} disabled:opacity-50`}
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>

                        </div>
                        <div className="flex justify-around font-medium">

                            <Link
                                to="/register"
                                aria-label="Create new account"
                            >
                                Sign Up
                            </Link>
                            <Link
                                to="/forgotpassword"
                                aria-label="Create new account"
                            >
                                Forgot Password?
                            </Link>
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
            {showLoader && (
                <ChatAppLoader
                    loadingText="Preparing your Chat Environment"
                    duration={5000}
                    redirectTo="/card"
                />
            )}
        </motion.div>


    );
};

export default LoginPage;