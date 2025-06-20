package com.chatapp.ChatApp.Repository;

public interface UserProjection {
    Long getId();
    String getUserName(); // assuming User entity has username field
    String getEmail();    // assuming User entity has email field
}