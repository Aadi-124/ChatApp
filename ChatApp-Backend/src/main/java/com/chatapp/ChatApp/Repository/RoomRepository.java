package com.chatapp.ChatApp.Repository;

import com.chatapp.ChatApp.Entities.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room,Integer> {
    public Optional<Room> findByRoomId(String roomId);
}
