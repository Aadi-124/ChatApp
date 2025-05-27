import React, { useState, useEffect, useRef} from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./ChatPage.css";
import useChatContext from "../Service/ChatAppContext";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { getMessages } from "../Service/ApiService";
import moment from "moment"; // ✅ Import moment

const ChatPage = () => {
  const [stompClient, setStompClient] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const baseURL = "http://localhost:8080";
  const { roomId, currentUser, connected, setRoomId, setCurrentUser, setConnected } = useChatContext();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatBoxRef = useRef(null);
  const [toastShown, setToastShown] = useState(false);

  useEffect(() => {
    if (!toastShown && location.state?.showToast && location.state.toastMessage) {
      setToastShown(true);
      toast.success(location.state.toastMessage);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location]);

  useEffect(() => {
    if (chatBoxRef.current) {
     chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      chatBoxRef.current.scrollTo({
      top: chatBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
    }
  }, [messages]);

  useEffect(() => {
    async function loadMessages() {
      try {
        getMessages(roomId).then((response) => {
          console.log("MEssages fetched Successfulyy!:-");
          console.log(response.data);
          // console.log("Actual Response:-");
          // console.log(response.data);
          setMessages(response.data); // ✅ Load message history
        });
      } catch (error) {
        console.log("THIS IS THE ERROR!!! ");
        console.log(error);
      }
    }
    if (connected) {
      loadMessages();
    }
  }, [connected,roomId]);

  useEffect(() => {
    if (!connected) {
      console.log("Not Connected!!!");
      navigate("/");
    }
  }, [connected, roomId, currentUser]);

  useEffect(() => {
    const connectWebSocket = () => {
      const sock = new SockJS(`${baseURL}/chat`);
      const client = Stomp.over(sock);

      client.connect({}, () => {
        setStompClient(client);
        toast.success("Connected Successfully!");

        client.subscribe(`/topic/room/${roomId}`, (message) => {
          const newMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, newMessage]);
        });
      });
    };

    if (connected) {
      connectWebSocket();
    }
  }, []);

  const handleSend = () => {
    console.log("Handel Send!");
    if (newMessage.trim() === "") return;

    if (stompClient && connected && newMessage.trim() !== "") {
      const message = {
        sender: currentUser,
        content: newMessage,
        roomId: roomId
      };

      stompClient.send(`/app/sendMessage/${roomId}`, {}, JSON.stringify(message));
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

      <div className="chat-messages" ref={chatBoxRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-bubble ${msg.sender === currentUser ? "sent" : "received"}`}
          >
            <div className="message-content">{msg.content}</div>
            <div className="message-time">
              {moment(msg.time).calendar(null, {
                sameDay: 'h:mm A',
                lastDay: '[Yesterday]',
                lastWeek: 'ddd',
                sameElse: 'DD/MM/YYYY'
              })}
            </div>
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
