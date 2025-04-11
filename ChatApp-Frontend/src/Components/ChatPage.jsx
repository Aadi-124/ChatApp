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
import { getMessages } from "../Service/ApiService";

const ChatPage = () => {

    const [stompClient, setStompClient] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const baseURL = "http://localhost:8080";
    const { roomId, currentUser, connected, setRoomId,setCurrentUser,setConnected} = useChatContext();
    
  const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (location.state?.showToast && location.state.toastMessage) {
            toast.success(location.state.toastMessage);
        }
        navigate(location.pathname, { replace: true, state: {} });
    }, [location]);


    useEffect(() => {
      async function loadMessages() {
        try {
          getMessages(roomId).then((response)=>{
            setMessages(response.data.messages);
          });
        } catch (error) {
          console.log(error);
        }
      }
      if (connected) {
        loadMessages();
      }
    }, []);

    useEffect(()=>{
      if(!connected){
        console.log("I Executed!");
        console.log(navigate("/"));
      }
    },[connected,roomId,currentUser])


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
          console.log("Received:", newMessage); // 👀 log sender

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
      console.log("Sending...");
        const message = {
          sender: currentUser,
          content: newMessage,
          roomId:roomId
        };

        const M = stompClient.send(`/app/sendMessage/${roomId}`,{},JSON.stringify(message));
          
        // setMessages([...prev, M]);
        setNewMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>Room: {roomId}</h3>
        <br />
        <h3>Username: {currentUser}</h3>
      </div>
      
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-bubble ${msg.sender === currentUser ? "sent" : "received"}`}
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
