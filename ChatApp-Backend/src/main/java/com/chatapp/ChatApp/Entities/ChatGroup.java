package com.chatapp.ChatApp.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String groupId;
    private String groupName;

    @ElementCollection
    private List<String> memberIds; // userIds

    private String adminId;


}
