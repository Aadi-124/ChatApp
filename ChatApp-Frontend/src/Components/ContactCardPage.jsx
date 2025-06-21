



// import { useRef, useEffect, useCallback, useState } from 'react';
// import ContactCard from './ContactCard';
// import { motion, AnimatePresence } from 'framer-motion';
// import useChatContext from '../Service/ChatAppContext';
// import { loadUsers, saveBulkContacts } from '../Service/ApiService';
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import { ChatAppLoader } from './ChatAppLoader';

// const ContactCardPage = () => {
//     const containerRef = useRef(null);
//     const cardsRef = useRef([]);
//     const animationFrameRef = useRef();
//     const lastScrollTimeRef = useRef(0);
//     const [selectedCards, setSelectedCards] = useState({});
//     const { darkMode, jwtToken, userId } = useChatContext();
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [showLoader, setShowLoader] = useState(false);


//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 console.log('Loading users with token:', jwtToken);
//                 const response = await loadUsers(jwtToken);
//                 console.log('Users data:', response.data);
//                 const filteredUsers = response.data.filter(user => user.id !== userId);
//                 setUsers(filteredUsers);
//             } catch (err) {
//                 console.error('Error loading users:', err);
//                 setError(err.message || 'Failed to load users');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (jwtToken) {
//             fetchUsers();
//         }
//     }, [jwtToken]);

//     useEffect(()=>{
//         console.log(users);
//     },[users])

   

//     // Track selected cards
//     const handleCardSelect = (userId, isSelected) => {
//         // console.log(userId);
//         // // const key = userId.toString();
//         // setSelectedCards(prev => ({
//         //     ...prev,
//         //     [userId]: isSelected
//         // }));
//     const key = userId.toString();
//     setSelectedCards(prev => {
//         const updated = { ...prev };
//         if (isSelected) {
//             updated[key] = true;
//         } else {
//             delete updated[key];  // important: fully remove deselected user
//         }
//         return updated;
//     });
//     };


//     const handleSelectedContacts = () => {
//         const selectedUserIds = Object.entries(selectedCards)
//             .filter(([_, isSelected]) => isSelected)
//             .map(([userId]) => userId);
//         const selectedUsers = users.filter(user =>
//             selectedUserIds.includes(user.id.toString())
//         );

//         saveBulkContacts(jwtToken, userId, selectedUserIds).then((response) => {
//             console.log(response.data);
//             toast.success(response.data);
//             setShowLoader(true);
//         }).catch((error) => {
//             console.log(error);
//         });


//     }


//     // Memoized card animation function
//     const updateCardStyles = useCallback(() => {
//         const now = performance.now();
//         if (now - lastScrollTimeRef.current < 16) {
//             animationFrameRef.current = requestAnimationFrame(updateCardStyles);
//             return;
//         }
//         lastScrollTimeRef.current = now;

//         const container = containerRef.current;
//         if (!container) return;

//         const containerRect = container.getBoundingClientRect();
//         const containerCenter = containerRect.width / 2;

//         cardsRef.current.forEach((card) => {
//             if (!card) return;

//             const cardRect = card.getBoundingClientRect();
//             const cardCenter = cardRect.left - containerRect.left + (cardRect.width / 2);
//             const distanceFromCenter = Math.abs(containerCenter - cardCenter);

//             const normalizedDist = Math.min(distanceFromCenter / (containerRect.width * 0.4), 1);
//             const scale = 0.9 + (1 - normalizedDist) * 0.1;
//             const opacity = 0.6 + (1 - normalizedDist) * 0.4;
//             const translateX = (containerCenter - cardCenter) * 0.15;

//             card.style.transform = `translateX(${translateX}px) scale(${scale})`;
//             card.style.opacity = opacity;
//             card.style.zIndex = Math.floor((1 - normalizedDist) * 10);
//         });

//         animationFrameRef.current = requestAnimationFrame(updateCardStyles);
//     }, []);

//     useEffect(() => {
//         const container = containerRef.current;
//         if (!container) return;

//         const observer = new IntersectionObserver((entries) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                     animationFrameRef.current = requestAnimationFrame(updateCardStyles);
//                 }
//             });
//         }, { threshold: 0.1, root: container });

//         cardsRef.current.forEach(card => {
//             if (card) observer.observe(card);
//         });

//         animationFrameRef.current = requestAnimationFrame(updateCardStyles);

//         return () => {
//             observer.disconnect();
//             cancelAnimationFrame(animationFrameRef.current);
//         };
//     }, [updateCardStyles, users]); // Added users to dependencies

//     const selectedCount = Object.values(selectedCards).filter(Boolean).length;

//     if (loading) {
//         return (
//             <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'
//                 }`}>
//                 <div className="text-2xl font-bold">Loading users...</div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'
//                 }`}>
//                 <div className="text-2xl font-bold text-red-500">Error: {error}</div>
//             </div>
//         );
//     }

//     return (
//         <>
//         {!showLoader && <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
//             {/* Header */}
//             <center>
//                 <h1 className={`font-bold pt-40 pb-10 text-3xl transition-colors duration-300 ${darkMode ? 'text-white' : 'text-blue-950'
//                     }`}>
//                     {selectedCount === 0
//                         ? "✨ Unlock amazing chats - who's joining your inner circle first?"
//                         : `🎉 ${selectedCount} selected! Ready to connect?`}
//                 </h1>
//             </center>

//             {/* Cards Container */}
//             <div className="pb-32">
//                 <div
//                     ref={containerRef}
//                     className="flex overflow-x-auto w-3/4 mx-auto snap-x snap-mandatory scrollbar-hide"
//                     style={{
//                         scrollSnapType: 'x mandatory',
//                         scrollPadding: '0 30%',
//                     }}
//                 >
//                     {users.map((user, index) => {
//                         // Use actual user data instead of hardcoded values
//                         const username = user.userName;
//                         const firstName = user.firstName;
//                         const lastName = user.lastName;

//                         // Alternate between photos if no profile picture is provided
//                         const profilePictureUrl = user.profilePictureUrl;
                        
//                         return (
//                             <div
//                                 key={user.id}
//                                 ref={el => cardsRef.current[user.id] = el}
//                                 className="flex-shrink-0 w-[80vw] max-w-xs px-1 snap-center"
//                                 style={{
//                                     transition: 'transform 150ms ease-out, opacity 150ms ease-out',
//                                     willChange: 'transform, opacity'
//                                 }}
//                             >
//                                 <ContactCard
//                                     username={username}
//                                     firstName={firstName}
//                                     lastname={lastName}
//                                     profilePictureUrl={profilePictureUrl}
//                                     onSelect={(isSelected) => handleCardSelect(user.id.toString(), isSelected)}
//                                     isSelected={selectedCards[user.id.toString()] || false}
//                                     darkMode={darkMode}
//                                 />
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>

//             {/* Next Button */}
//             <AnimatePresence>
//                 {selectedCount > 0 && (
//                     <motion.div
//                         initial={{ opacity: 0, y: 50 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: 50 }}
//                         transition={{ type: 'spring', stiffness: 300 }}
//                         className="fixed bottom-10 left-0 right-0 flex justify-center"
//                     >

//                         <button
//                             onClick={handleSelectedContacts}

//                             className={`px-8 py-3 cursor-pointer font-bold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ${darkMode
//                                     ? 'bg-blue-700 hover:bg-blue-600 text-white'
//                                     : 'bg-blue-600 hover:bg-blue-700 text-white'
//                                 }`}
//                         >
//                             Next → Connect with {selectedCount} {selectedCount === 1 ? 'person' : 'people'}
//                         </button>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             <style jsx global>{`
//                 .scrollbar-hide::-webkit-scrollbar {
//                     display: none;
//                 }
//                 .scrollbar-hide {
//                     -ms-overflow-style: none;
//                     scrollbar-width: none;
//                 }
//             `}</style>
//             <ToastContainer
//                 position="top-right"
//                 autoClose={3000}
//                 hideProgressBar
//                 closeOnClick
//                 pauseOnHover
//                 draggable
//                 theme={darkMode ? 'dark' : 'light'}
//                 newestOnTop={false}
//             />
//         </div>}
//             {showLoader && (
//                 <ChatAppLoader
//                     loadingText="Preparing your Chat Environment!"
//                     duration={5000}
//                     redirectTo="/contacts"
//                     style={{zIndex:100}}
//                 />
//             )}
//             </>
//     );
// };

// export default ContactCardPage;




import { useRef, useEffect, useCallback, useState } from 'react';
import ContactCard from './ContactCard';
import { motion, AnimatePresence } from 'framer-motion';
import useChatContext from '../Service/ChatAppContext';
import { loadUsers, saveBulkContacts } from '../Service/ApiService';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ChatAppLoader }from './ChatAppLoader';
import { useNavigate } from 'react-router-dom';

const ContactCardPage = () => {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);
    const animationFrameRef = useRef();
    const lastScrollTimeRef = useRef(0);
    const [selectedCards, setSelectedCards] = useState({});
    const { darkMode, jwtToken, userId } = useChatContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showLoader, setShowLoader] = useState(false);
    const navigate = useNavigate();

    // Fetch all users except current user
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await loadUsers(jwtToken);
                const filteredUsers = response.data.filter(user => user.id !== userId);
                setUsers(filteredUsers);
            } catch (err) {
                console.error('Error loading users:', err);
                setError(err.message || 'Failed to load users');
            } finally {
                setLoading(false);
            }
        };
        if (jwtToken) {
            fetchUsers();
        }
    }, [jwtToken, userId]);

    // Handle select/deselect logic
    const handleCardSelect = (userId, isSelected) => {
        const key = userId.toString();
        setSelectedCards(prev => {
            const updated = { ...prev };
            if (isSelected) {
                updated[key] = true;
            } else {
                delete updated[key];
            }
            return updated;
        });
    };

    // Submit selected users
    const handleSelectedContacts = () => {
        const selectedUserIds = Object.keys(selectedCards);
        saveBulkContacts(jwtToken, userId, selectedUserIds).then((response) => {
            toast.success(response.data);
            navigate("/contacts");

        }).catch((error) => {
            console.log(error);
            toast.error("Failed to save contacts.");
        });
    };

    // Animation logic
    const updateCardStyles = useCallback(() => {
        const now = performance.now();
        if (now - lastScrollTimeRef.current < 16) {
            animationFrameRef.current = requestAnimationFrame(updateCardStyles);
            return;
        }
        lastScrollTimeRef.current = now;

        const container = containerRef.current;
        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        const containerCenter = containerRect.width / 2;

        cardsRef.current.forEach((card) => {
            if (!card) return;

            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left - containerRect.left + (cardRect.width / 2);
            const distanceFromCenter = Math.abs(containerCenter - cardCenter);

            const normalizedDist = Math.min(distanceFromCenter / (containerRect.width * 0.4), 1);
            const scale = 0.9 + (1 - normalizedDist) * 0.1;
            const opacity = 0.6 + (1 - normalizedDist) * 0.4;
            const translateX = (containerCenter - cardCenter) * 0.15;

            card.style.transform = `translateX(${translateX}px) scale(${scale})`;
            card.style.opacity = opacity;
            card.style.zIndex = Math.floor((1 - normalizedDist) * 10);
        });

        animationFrameRef.current = requestAnimationFrame(updateCardStyles);
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animationFrameRef.current = requestAnimationFrame(updateCardStyles);
                }
            });
        }, { threshold: 0.1, root: container });

        cardsRef.current.forEach(card => {
            if (card) observer.observe(card);
        });

        animationFrameRef.current = requestAnimationFrame(updateCardStyles);

        return () => {
            observer.disconnect();
            cancelAnimationFrame(animationFrameRef.current);
        };
    }, [updateCardStyles, users]);

    const selectedCount = Object.keys(selectedCards).length;

    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <div className="text-2xl font-bold">Loading users...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <div className="text-2xl font-bold text-red-500">Error: {error}</div>
            </div>
        );
    }

    return (
        <>
            {!showLoader && <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                {/* Header */}
                <center>
                    <h1 className={`font-bold pt-40 pb-10 text-3xl ${darkMode ? 'text-white' : 'text-blue-950'}`}>
                        {selectedCount === 0
                            ? "✨ Unlock amazing chats - who's joining your inner circle first?"
                            : `🎉 ${selectedCount} selected! Ready to connect?`}
                    </h1>
                </center>

                {/* Cards Container */}
                <div className="pb-32">
                    <div
                        ref={containerRef}
                        className="flex overflow-x-auto w-3/4 mx-auto snap-x snap-mandatory scrollbar-hide"
                        style={{
                            scrollSnapType: 'x mandatory',
                            scrollPadding: '0 30%',
                        }}
                    >
                        {users.map((user, index) => (
                            <div
                                key={user.id}
                                ref={el => cardsRef.current[user.id] = el}
                                className="flex-shrink-0 w-[80vw] max-w-xs px-1 snap-center"
                                style={{
                                    transition: 'transform 150ms ease-out, opacity 150ms ease-out',
                                    willChange: 'transform, opacity'
                                }}
                            >
                                <ContactCard
                                    username={user.userName}
                                    firstName={user.firstName}
                                    lastname={user.lastName}
                                    profilePictureUrl={user.profilePictureUrl}
                                    onSelect={(isSelected) => handleCardSelect(user.id, isSelected)}
                                    isSelected={selectedCards[user.id.toString()] || false}
                                    darkMode={darkMode}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Next Button */}
                <AnimatePresence>
                    {selectedCount > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className="fixed bottom-10 left-0 right-0 flex justify-center"
                        >
                            <button
                                onClick={handleSelectedContacts}
                                className={`px-8 py-3 font-bold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ${
                                    darkMode
                                        ? 'bg-blue-700 hover:bg-blue-600 text-white'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                }`}
                            >
                                Next → Connect with {selectedCount} {selectedCount === 1 ? 'person' : 'people'}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <style jsx global>{`
                    .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                    }
                    .scrollbar-hide {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}</style>

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
            </div>}

        </>
    );
};

export default ContactCardPage;
