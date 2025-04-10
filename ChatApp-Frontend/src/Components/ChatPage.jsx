import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./ChatPage.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useChatContext from "../Service/ChatAppContext";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const ChatPage = () => {

    const [stompClient, setStompClient] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const baseURL = "http://localhost:8080";
    const {username,connected, setConnected, setUsername, roomId, setRoomId} = useChatContext();
    
  const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (location.state?.showToast && location.state.toastMessage) {
            toast.success(location.state.toastMessage);
        }
        navigate(location.pathname, { replace: true, state: {} });
    }, [location]);


    useEffect(()=>{
      console.log("connected = ",!connected);
      if(!connected){
        console.log("I Executed!");
        console.log(navigate("/"));
      }
    },[connected,roomId,username])


    useEffect(()=>{
        const connectWebSocket = ()=>{
          const sock = new SockJS(`${baseURL}/chat`);
          const client = Stomp.over(sock);

          client.connect({},()=>{
            setStompClient(client);
            toast.success("Connected Successfully!");
            
        client.subscribe(`/topic/room/${roomId}`, (message) => {
          console.log(message);

          const newMessage = JSON.parse(message.body);

          setMessages((prev) => [...prev, newMessage]);

        });

          })
        }
        
    if (connected) {
      connectWebSocket();
    }

    },[])



  const { roomid } = useParams();
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim() === "") return;

    if(stompClient && connected && newMessage.trim () !== ""){
      console.log(newMessage);
        const message = {
          sender: "You",
          content: newMessage,
          roomId:roomId
        };

        stompClient.send(`/app/sendMessage/${roomId}`,{},JSON.stringify(message));
          
        // setMessages([...messages, message]);
        setNewMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>Room: {roomId}</h3>
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-bubble ${msg.sender === "You" ? "sent" : "received"}`}
          >
            <div className="message-content">{msg.content}</div>
            <div className="message-time">{msg.time}</div>
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
      
      <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={true}
                    closeOnClick
                    pauseOnHover
                    draggable
                    theme="colored"
                    newestOnTop={false}
                />
    </div>
  );
};

export default ChatPage;
