import React, { useState } from 'react';
import './ChatApp.css';
import { createRoom, joinRoom } from '../Service/ApiService';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import useChatContext from '../Service/ChatAppContext';


const RoomCreateJoin = () => {
    const [username, setUsername] = useState('');
    const [roomid, setroomid] = useState('');
    const [loading, setLoading] = useState(false); // loader state
    const [loadingjoin, setLoadingJoin] = useState(false); // loader state
    const navigate = useNavigate();

    const { roomId, currentUser, connected, setRoomId,setCurrentUser,setConnected} = useChatContext();

    const handleJoin = () => {
        setLoadingJoin(true);
        joinRoom(roomid).then((response)=>{
            toast.success("Room Joined Successfully!");
            setRoomId(roomid);
            setCurrentUser(username);
            setConnected(true);
            navigate("/chat", {state: {
                showToast: true,
                toastMessage: "Room joined successfully!"
              }
            });

        }) .catch((error) => {
            
            toast.error("Room Not Exisits!");
        })
        .finally(() => {
            setLoadingJoin(false); // stop loader
        });
    };

 
    const handleCreate = () => {
        setLoading(true); // start loader
        const room = { roomId: roomid };
    
        createRoom(room)
            .then((response) => {

                setCurrentUser(username);
                setRoomId(roomid);
                setConnected(true);

                navigate("/chat", {state: {
                      showToast: true,
                      toastMessage: "Room created successfully!"
                    }
                  });


            })
            .catch((error) => {
                toast.error("Room Already Exists!");
            })
            .finally(() => {
                setLoading(false); // stop loader
            });
    };
    

    
        return (
            <div className="container">
                <h2>Join or Create a Chat Room</h2>
        
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your name"
                        required
                    />
                </div>
        
                <div className="form-group">
                    <label>Room ID</label>
                    <input
                        type="text"
                        value={roomid}
                        onChange={(e) => setroomid(e.target.value)}
                        placeholder="Enter room ID"
                        required
                    />
                </div>
        
                <div className="button-group">
                    <button onClick={handleJoin} className="btn join" disabled={loading}>
                    {loadingjoin ? 'Joining...' : 'Join Room'}
                    </button>
                    <button onClick={handleCreate} className="btn create" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Room'}
                    </button>
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

export default RoomCreateJoin;
