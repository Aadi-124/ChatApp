import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoomCreateJoin from "./Components/RoomCreateJoin";
import ChatPage from "./Components/ChatPage";
import './index.css';
import NotFound from "./Components/NotFound";
import LoginPage from "./Components/LoginPage";
import Register from "./Components/Register";
import HomePage from "./Components/HomePage";
import Navbar from "./Components/NavBar";
import Contacts from "./Components/Contacts";
import { ChatAppLoader } from "./Components/ChatAppLoader";
import ContactCard from "./Components/ContactCard";
import ContactCardPage from "./Components/ContactCArdPage";
import BackArrowButton from "./Components/BackArrowButton";

function App() {

  return (
      <Router>

        <BackArrowButton/>
          {/* <Navbar/> */}
          
        <Routes>
          <Route  path="/contacts" element={<Contacts/>} />
          <Route  path="/login" element={<LoginPage/>} />
          <Route  path="/home" element={<HomePage/>} />
          <Route  path="/register"element={<Register/>} />
          <Route path="/" element=  {<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/card" element={<ContactCardPage/>}/>
          </Routes>
      </Router>
  );
}


export default App;
