import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoomCreateJoin from "./Components/RoomCreateJoin";
import ChatPage from "./Components/ChatPage";
import './index.css';
import NotFound from "./Components/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoomCreateJoin />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
