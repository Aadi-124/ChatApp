// // import { useRef, useEffect, useCallback, useState } from 'react';
// // import ContactCard from './ContactCard';
// // import photo1 from '../assets/profilepic1.png';
// // import photo2 from '../assets/profilepic2.png';
// // import { motion, AnimatePresence } from 'framer-motion';

// // const ContactCardPage = () => {
// //     const containerRef = useRef(null);
// //     const cardsRef = useRef([]);
// //     const animationFrameRef = useRef();
// //     const lastScrollTimeRef = useRef(0);
// //     const [selectedCards, setSelectedCards] = useState({});

// //     // Track selected cards
// //     const handleCardSelect = (username, isSelected) => {
// //         setSelectedCards(prev => ({
// //             ...prev,
// //             [username]: isSelected
// //         }));
// //     };

// //     // Memoized card animation function
// //     const updateCardStyles = useCallback(() => {
// //         const now = performance.now();
// //         if (now - lastScrollTimeRef.current < 16) {
// //             animationFrameRef.current = requestAnimationFrame(updateCardStyles);
// //             return;
// //         }
// //         lastScrollTimeRef.current = now;

// //         const container = containerRef.current;
// //         if (!container) return;

// //         const containerRect = container.getBoundingClientRect();
// //         const containerCenter = containerRect.width / 2;
// //         const scrollLeft = container.scrollLeft;

// //         cardsRef.current.forEach((card) => {
// //             if (!card) return;
            
// //             const cardRect = card.getBoundingClientRect();
// //             const cardCenter = cardRect.left - containerRect.left + (cardRect.width / 2);
// //             const distanceFromCenter = Math.abs(containerCenter - cardCenter);
            
// //             const normalizedDist = Math.min(distanceFromCenter / (containerRect.width * 0.4), 1);
// //             const scale = 0.9 + (1 - normalizedDist) * 0.1;
// //             const opacity = 0.6 + (1 - normalizedDist) * 0.4;
// //             const translateX = (containerCenter - cardCenter) * 0.15;
            
// //             card.style.transform = `translateX(${translateX}px) scale(${scale})`;
// //             card.style.opacity = opacity;
// //             card.style.zIndex = Math.floor((1 - normalizedDist) * 10);
// //         });

// //         animationFrameRef.current = requestAnimationFrame(updateCardStyles);
// //     }, []);

// //     useEffect(() => {
// //         const container = containerRef.current;
// //         if (!container) return;

// //         const observer = new IntersectionObserver((entries) => {
// //             entries.forEach(entry => {
// //                 if (entry.isIntersecting) {
// //                     animationFrameRef.current = requestAnimationFrame(updateCardStyles);
// //                 }
// //             });
// //         }, { threshold: 0.1, root: container });

// //         cardsRef.current.forEach(card => {
// //             if (card) observer.observe(card);
// //         });

// //         animationFrameRef.current = requestAnimationFrame(updateCardStyles);

// //         return () => {
// //             observer.disconnect();
// //             cancelAnimationFrame(animationFrameRef.current);
// //         };
// //     }, [updateCardStyles]);

// //     const selectedCount = Object.values(selectedCards).filter(Boolean).length;

// //     return (
// //         <div className=" ">
// //             {/* Header */}
// //             <center>
// //                 <h1 className="font-bold pt-20 pb-10 text-blue-950 text-3xl">
// //                     {selectedCount === 0 
// //                         ? "✨ Unlock amazing chats - who's joining your inner circle first?" 
// //                         : `🎉 ${selectedCount} selected! Ready to connect?`}
// //                 </h1>
// //             </center>

// //             {/* Cards Container */}
// //             <div className="pb-32 "> {/* Extra padding for button space */}
// //                 <div 
// //                     ref={containerRef}
// //                     className="flex overflow-x-auto w-3/4 mx-auto snap-x snap-mandatory scrollbar-hide"
// //                     style={{
// //                         scrollSnapType: 'x mandatory',
// //                         scrollPadding: '0 30%',
// //                     }}
// //                 >
// //                     {[...Array(10)].map((_, index) => {
// //                         const username = `user${index}`;
// //                         return (
// //                             <div 
// //                                 key={`card-${index}`}
// //                                 ref={el => cardsRef.current[index] = el}
// //                                 className="flex-shrink-0 w-[80vw] max-w-xs px-1 snap-center"
// //                                 style={{
// //                                     transition: 'transform 150ms ease-out, opacity 150ms ease-out',
// //                                     willChange: 'transform, opacity'
// //                                 }}
// //                             >
// //                                 <ContactCard
// //                                     username={username}
// //                                     firstName={index % 2 === 0 ? 'Aaditya' : 'Jacklin'}
// //                                     lastname={index % 2 === 0 ? 'Thakare' : 'Goslin'}
// //                                     profilePictureUrl={index % 2 === 0 ? photo1 : photo2}
// //                                     onSelect={handleCardSelect}
// //                                     isSelected={selectedCards[username] || false}
// //                                 />
// //                             </div>
// //                         );
// //                     })}
// //                 </div>
// //             </div>

// //             {/* Next Button */}
// //             <AnimatePresence>
// //                 {selectedCount > 0 && (
// //                     <motion.div
// //                         initial={{ opacity: 0, y: 50 }}
// //                         animate={{ opacity: 1, y: 0 }}
// //                         exit={{ opacity: 0, y: 50 }}
// //                         transition={{ type: 'spring', stiffness: 300 }}
// //                         className="fixed bottom-10 left-0 right-0 flex justify-center"
// //                     >
// //                         <button
// //                             onClick={() => console.log('Selected cards:', selectedCards)}
// //                             className="px-8 py-3 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
// //                         >
// //                             Next → Connect with {selectedCount} {selectedCount === 1 ? 'person' : 'people'}
// //                         </button>
// //                     </motion.div>
// //                 )}
// //             </AnimatePresence>

// //             <style jsx global>{`
// //                 .scrollbar-hide::-webkit-scrollbar {
// //                     display: none;
// //                 }
// //                 .scrollbar-hide {
// //                     -ms-overflow-style: none;
// //                     scrollbar-width: none;
// //                 }
// //             `}</style>
// //         </div>
// //     );
// // };

// // export default ContactCardPage;




// import { useRef, useEffect, useCallback, useState } from 'react';
// import ContactCard from './ContactCard';
// import photo1 from '../assets/profilepic1.png';
// import photo2 from '../assets/profilepic2.png';
// import { motion, AnimatePresence } from 'framer-motion';
// import useChatContext from '../Service/ChatAppContext'; // Assuming you have this context
// import { loadUsers } from '../Service/ApiService';

// const ContactCardPage = () => {
//     const containerRef = useRef(null);
//     const cardsRef = useRef([]);
//     const animationFrameRef = useRef();
//     const lastScrollTimeRef = useRef(0);
//     const [selectedCards, setSelectedCards] = useState({});
//     const { darkMode, jwtToken } = useChatContext(); // Get darkMode from context
//     const [users,setUsers] = useState([]);

//     useEffect(()=>{
//         console.log(jwtToken);
//          loadUsers(jwtToken).then((response)=>{
//             console.log(response.data);
//             setUsers(response.data);
//             console.log(users);
//         }).catch((error)=>{
//             console.log(error);
//         });
//     },[])


//     // Track selected cards
//     const handleCardSelect = (username, isSelected) => {
//         setSelectedCards(prev => ({
//             ...prev,
//             [username]: isSelected
//         }));
//     };



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
//         const scrollLeft = container.scrollLeft;

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
//     }, [updateCardStyles]);

//     const selectedCount = Object.values(selectedCards).filter(Boolean).length;

//     return (
//         <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
//             {/* Header */}
//             <center>
//                 <h1 className={`font-bold pt-20 pb-10 text-3xl transition-colors duration-300 ${
//                     darkMode ? 'text-white' : 'text-blue-950'
//                 }`}>
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
//                     {users.map((_, index) => {
//                         const username = `user${index}`;
//                         return (
//                             <div 
//                                 key={`card-${index}`}
//                                 ref={el => cardsRef.current[index] = el}
//                                 className="flex-shrink-0 w-[80vw] max-w-xs px-1 snap-center"
//                                 style={{
//                                     transition: 'transform 150ms ease-out, opacity 150ms ease-out',
//                                     willChange: 'transform, opacity'
//                                 }}
//                             >
//                                 <ContactCard
//                                     username={username}
//                                     firstName={'Aaditya'}
//                                     lastname={'Goslin'}
//                                     profilePictureUrl={index % 2 === 0 ? photo1 : photo2}
//                                     onSelect={handleCardSelect}
//                                     isSelected={selectedCards[username] || false}
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
//                             onClick={() => console.log('Selected cards:', selectedCards)}
//                             className={`px-8 py-3 font-bold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ${
//                                 darkMode 
//                                     ? 'bg-blue-700 hover:bg-blue-600 text-white' 
//                                     : 'bg-blue-600 hover:bg-blue-700 text-white'
//                             }`}
//                         >
//                             Next → Connect with {selectedCount} {selectedCount === 1 ? 'person' : 'people'}
//                         </button>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             <style jsx="true" global="true" >{`
//                 .scrollbar-hide::-webkit-scrollbar {
//                     display: none;
//                 }
//                 .scrollbar-hide {
//                     -ms-overflow-style: none;
//                     scrollbar-width: none;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default ContactCardPage;



import { useRef, useEffect, useCallback, useState } from 'react';
import ContactCard from './ContactCard';
import photo1 from '../assets/profilepic1.png';
import photo2 from '../assets/profilepic2.png';
import { motion, AnimatePresence } from 'framer-motion';
import useChatContext from '../Service/ChatAppContext';
import { loadUsers } from '../Service/ApiService';

const ContactCardPage = () => {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);
    const animationFrameRef = useRef();
    const lastScrollTimeRef = useRef(0);
    const [selectedCards, setSelectedCards] = useState({});
    const { darkMode, jwtToken } = useChatContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                console.log('Loading users with token:', jwtToken);
                const response = await loadUsers(jwtToken);
                console.log('Users data:', response.data);
                setUsers(response.data);
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
    }, [jwtToken]);

    // Track selected cards
    const handleCardSelect = (userId, isSelected) => {
        setSelectedCards(prev => ({
            ...prev,
            [userId]: isSelected
        }));
    };

    // Memoized card animation function
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
    }, [updateCardStyles, users]); // Added users to dependencies

    const selectedCount = Object.values(selectedCards).filter(Boolean).length;

    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
                darkMode ? 'bg-gray-900' : 'bg-gray-100'
            }`}>
                <div className="text-2xl font-bold">Loading users...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
                darkMode ? 'bg-gray-900' : 'bg-gray-100'
            }`}>
                <div className="text-2xl font-bold text-red-500">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
            {/* Header */}
            <center>
                <h1 className={`font-bold pt-20 pb-10 text-3xl transition-colors duration-300 ${
                    darkMode ? 'text-white' : 'text-blue-950'
                }`}>
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
                    {users.map((user, index) => {
                        // Use actual user data instead of hardcoded values
                        const username = user.username || `user${index}`;
                        const firstName = user.firstName || 'Unknown';
                        const lastName = user.lastName || 'User';
                        
                        // Alternate between photos if no profile picture is provided
                        const profilePictureUrl = user.profilePictureUrl || (index % 2 === 0 ? photo1 : photo2);

                        return (
                            <div 
                                key={user.id || index}
                                ref={el => cardsRef.current[index] = el}
                                className="flex-shrink-0 w-[80vw] max-w-xs px-1 snap-center"
                                style={{
                                    transition: 'transform 150ms ease-out, opacity 150ms ease-out',
                                    willChange: 'transform, opacity'
                                }}
                            >
                                <ContactCard
                                    username={username}
                                    firstName={firstName}
                                    lastname={lastName}
                                    profilePictureUrl={profilePictureUrl}
                                    onSelect={(isSelected) => handleCardSelect(user.id || index, isSelected)}
                                    isSelected={selectedCards[user.id || index] || false}
                                    darkMode={darkMode}
                                />
                            </div>
                        );
                    })}
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
    onClick={() => {
        // Get array of selected user IDs
        const selectedUserIds = Object.entries(selectedCards)
            .filter(([_, isSelected]) => isSelected)
            .map(([userId]) => userId);

        // Get full user objects for selected users
        const selectedUsers = users.filter(user => 
            selectedUserIds.includes(user.id.toString())
        );

        console.log('Selected User IDs:', selectedUserIds);
        console.log('Selected Users:', selectedUsers);
        
        // Here you can also make an API call to connect with these users
        // connectWithUsers(selectedUserIds);
    }}
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
        </div>
    );
};

export default ContactCardPage;