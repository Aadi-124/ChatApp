package com.chatapp.ChatApp.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private UUID id;

    @Column(nullable = false)
    private String firstName;

    private String lastName;

    @Column(unique = true)
    private String email;

    @Column(unique = true)
    private String phoneNumber;

    @Column(unique = true)
    private String userName;

    private String gender;
    private LocalDate DOB;
    private String profilePictureUrl;
    private String statusMessage;
    private String role;
    private String password;
    private LocalDateTime createdAt;
    private LocalDateTime lastActiveAt;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", userName='" + userName + '\'' +
                ", gender='" + gender + '\'' +
                ", DOB=" + DOB +
                ", profilePictureUrl='" + profilePictureUrl + '\'' +
                ", statusMessage='" + statusMessage + '\'' +
                ", role='" + role + '\'' +
                ", password='[PROTECTED]'" + // hide actual password
                ", createdAt=" + createdAt +
                ", lastActiveAt=" + lastActiveAt +
                '}';
    }


}
