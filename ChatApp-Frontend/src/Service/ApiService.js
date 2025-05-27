

import customAxios from "./AxiosService"

export const createRoom = (room) =>{ return customAxios.post("/room/createRoom",room)};

export const joinRoom = (roomId) =>{return customAxios.get(`/room/${roomId}`)};

export const getMessages = (roomId) =>{return customAxios.get(`/room/messages/${roomId}`)};




