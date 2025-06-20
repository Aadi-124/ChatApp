package com.chatapp.ChatApp.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserContact {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner; // The user who saved the contact

    @ManyToOne
    @JoinColumn(name = "contact_id", nullable = false)
    private User contact; // The person being saved as a contact

    private Boolean isBlocked = false;
    private Boolean isFavorite = false;

    private LocalDateTime createdAt;

}
