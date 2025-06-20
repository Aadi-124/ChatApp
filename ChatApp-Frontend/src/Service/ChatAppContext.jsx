// import { createContext, useContext, useState } from "react";

// const ChatContext = createContext();

// export const ChatAppContext = ({ children }) => {
//   const [roomId, setRoomId] = useState("");
//   const [currentUser, setCurrentUser] = useState("");
//   const [connected, setConnected] = useState(false);
//   // const [darkMode, setDarkMode] = useState(false);
//   const [jwtToken, setJwtToken ] = useState(null);
//   const [isAuthenticated, setIsAuthenticated ] = useState(false);
//   const [isLoggedIn, setIsLoggedIn ] = useState(false);

//   const darkMode = ()=>{

//   }

//   const setDarkMode =() =>{

//   }


//   return (
//     <ChatContext.Provider
//       value={{
//         roomId,
//         currentUser,
//         connected,
//         setRoomId,
//         setCurrentUser,
//         setConnected,
//         darkMode,
//         setDarkMode,
//         jwtToken,
//         setJwtToken,
//         isAuthenticated,
//         setIsAuthenticated,
//         isLoggedIn,
//         setIsLoggedIn
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };

// const useChatContext = () => useContext(ChatContext);
// export default useChatContext;





import { createContext, useContext, useState, useEffect } from "react";

const ChatContext = createContext();

export const ChatAppContext = ({ children }) => {
  const [roomId, setRoomId] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [connected, setConnected] = useState(false);

  // ✅ Load from localStorage
  const [darkMode, setDarkModeState] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });

  const [userId, setUserId] = useState(() => {
    return JSON.parse(localStorage.getItem("userId")) || false;
  });

  const [jwtToken, setJwtTokenState] = useState(() => {
    return localStorage.getItem("jwt") || null;
  });

  const [isAuthenticated, setIsAuthenticatedState] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  const [isLoggedIn, setIsLoggedInState] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  // ✅ Custom setters to sync with localStorage
  const setDarkMode = (val) => {
    localStorage.setItem("darkMode", JSON.stringify(val));
    setDarkModeState(val);
  };

  const setJwtToken = (token) => {
    if (token) {
      localStorage.setItem("jwt", token);
    } else {
      localStorage.removeItem("jwt");
    }
    setJwtTokenState(token);
  };

  const setIsAuthenticated = (val) => {
    localStorage.setItem("isAuthenticated", val);
    setIsAuthenticatedState(val);
  };

  const setIsLoggedIn = (val) => {
    localStorage.setItem("isLoggedIn", val);
    setIsLoggedInState(val);
  };

  // ✅ Optional: clear all on logout
  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("darkMode");

    setJwtTokenState(null);
    setIsLoggedInState(false);
    setIsAuthenticatedState(false);
    setDarkModeState(false);
    setCurrentUser("");
    setRoomId("");
    setConnected(false);
  };

  return (
    <ChatContext.Provider
      value={{
        roomId,
        setRoomId,
        currentUser,
        setCurrentUser,
        connected,
        setConnected,
        darkMode,
        setDarkMode,
        jwtToken,
        setJwtToken,
        isAuthenticated,
        setIsAuthenticated,
        isLoggedIn,
        setIsLoggedIn,
        setUserId,
        userId,
        logout, // 👈 Add this to easily call logout
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const useChatContext = () => useContext(ChatContext);
export default useChatContext;
