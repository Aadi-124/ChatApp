package com.chatapp.ChatApp.Repository;

import com.chatapp.ChatApp.Entities.UserContact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserContactRepository extends JpaRepository<UserContact,Long> {
}
