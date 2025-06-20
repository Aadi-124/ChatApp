package com.chatapp.ChatApp.Repository;

import com.chatapp.ChatApp.Entities.ChatGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChatGroupRepository extends JpaRepository <ChatGroup,Integer>{
    Optional<Object> findByGroupId(String groupId);
}
