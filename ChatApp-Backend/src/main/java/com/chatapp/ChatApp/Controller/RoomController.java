package com.chatapp.ChatApp.Controller;


import com.chatapp.ChatApp.Entities.Room;
import com.chatapp.ChatApp.Repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/room")
@CrossOrigin("http://localhost:5173")
public class RoomController {

    @Autowired
    RoomRepository repository;


    @PostMapping("/createRoom")
    public ResponseEntity<?> createRoom(@RequestBody Room room){
        System.out.println("Request Accessed!");
        if(repository.findByRoomId(room.getRoomId()).isPresent()){
            return ResponseEntity.badRequest().body("Room Already Exists!");
        } else {
            Room newRoom = new Room();
            newRoom.setRoomId(room.getRoomId());
            Room savedRoom = repository.save(newRoom);
            return ResponseEntity.status(201).body(savedRoom);
        }    
    }



    @GetMapping("/{roomId}")
    public ResponseEntity<?> joinRoom(@PathVariable String roomId){
        System.out.println(roomId);
        if(repository.findByRoomId(roomId).isPresent()){
            Room room = repository.findByRoomId(roomId).get();
            return ResponseEntity.ok().body(room);
        } else {
            return ResponseEntity.ok().body("Room Not Found!");
        }
    }

    @GetMapping("/messages/{roomId}")
    public ResponseEntity<?> getMessages(@RequestParam String roomId){
        if(repository.findByRoomId(roomId).isPresent()){
            Room room = repository.findByRoomId(roomId).get();
            return ResponseEntity.ok().body(room.getMessages());
        } else {
            return ResponseEntity.badRequest().body("Room Not Found!");
        }
    }


}
