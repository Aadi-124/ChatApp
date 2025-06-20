package com.chatapp.ChatApp.Controller;

import com.chatapp.ChatApp.Entities.ChatGroup;
import com.chatapp.ChatApp.Entities.Message;
import com.chatapp.ChatApp.Repository.ChatGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/group")
@CrossOrigin("http://localhost:5173")
public class GroupChatController {

    @Autowired
    private ChatGroupRepository groupRepo;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // POST /group/create
    @PostMapping("/create")
    public ResponseEntity<?> createGroup(@RequestBody ChatGroup group) {
        if (groupRepo.findByGroupId(group.getGroupId()).isPresent()) {
            return ResponseEntity.badRequest().body("Group already exists!");
        }
        group.setMemberIds(new ArrayList<>());
        group.getMemberIds().add(group.getAdminId());
        return ResponseEntity.status(201).body(groupRepo.save(group));
    }

    // POST /group/addUser
    @PostMapping("/addUser")
    public ResponseEntity<?> addUser(@RequestParam String groupId, @RequestParam String userId) {
        Optional<Object> optionalGroup = groupRepo.findByGroupId(groupId);
        if (optionalGroup.isEmpty()) return ResponseEntity.notFound().build();

        ChatGroup group = (ChatGroup) optionalGroup.get();
        if (!group.getMemberIds().contains(userId)) {
            group.getMemberIds().add(userId);
            groupRepo.save(group);
        }
        return ResponseEntity.ok().body("User added to group");
    }

    // POST /group/sendMessage
    @PostMapping("/sendMessage")
    public ResponseEntity<?> sendMessageToGroup(@RequestBody Message message) {
        Optional<Object> groupOpt = groupRepo.findByGroupId(message.getGroupId());
        if (groupOpt.isEmpty()) return ResponseEntity.badRequest().body("Group not found");

        message.setTime(LocalDateTime.now());
        messagingTemplate.convertAndSend("/topic/group/" + message.getGroupId(), message);
        return ResponseEntity.ok(message);
    }

}

