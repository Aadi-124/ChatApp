package com.chatapp.ChatApp.Controller;


import com.chatapp.ChatApp.Entities.Message;
import com.chatapp.ChatApp.Entities.Room;
import com.chatapp.ChatApp.Repository.RoomRepository;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.*;



// @RestController
@Controller
@RequestMapping("/chat")
@CrossOrigin("http://localhost:5173")
public class ChatController {

    @Autowired
    public RoomRepository repository;

    @MessageMapping("/sendMessage/{roomId}")
    @SendTo("/topic/room/{roomId}")
    public Message sendMessage(@DestinationVariable String roomId, Message message){
        if(repository.findByRoomId(roomId).isPresent()){
            Room room = repository.findByRoomId(roomId).get();
            Message newMessage = new Message();
            newMessage.setId(null);
            newMessage.setContent(message.getContent());
            newMessage.setRoomId(message.getRoomId());
            newMessage.setSender(message.getSender());
            newMessage.setTime(LocalDateTime.now());
            room.getMessages().add(newMessage);
            repository.save(room);
            return newMessage;
        } else {
            return null;
        }
    }



}
