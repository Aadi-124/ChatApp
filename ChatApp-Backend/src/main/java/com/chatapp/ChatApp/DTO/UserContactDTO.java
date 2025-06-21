package com.chatapp.ChatApp.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserContactDTO {

    private UUID id;
    private String userName;
    private String profilePictureUrl;
    private boolean isBlocked;
    private boolean isFavourite;

}
