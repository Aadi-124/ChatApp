package com.chatapp.ChatApp.Repository;

import com.chatapp.ChatApp.Entities.UserContact;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface UserContactRepository extends JpaRepository<UserContact,Long> {
    List<UserContact> findByOwnerId(UUID ownerId);
}
