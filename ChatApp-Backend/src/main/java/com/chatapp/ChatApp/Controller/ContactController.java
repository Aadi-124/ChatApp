package com.chatapp.ChatApp.Controller;


import com.chatapp.ChatApp.DTO.UserContactDTO;
import com.chatapp.ChatApp.Entities.User;
import com.chatapp.ChatApp.Entities.UserContact;
import com.chatapp.ChatApp.Repository.UserContactRepository;
import com.chatapp.ChatApp.Repository.UserRepository;
import com.chatapp.ChatApp.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
public class ContactController {

    @Autowired
    public UserRepository userRepo;

    @Autowired
    UserService userService;

    @Autowired
    public UserContactRepository userContactRepository;

    @PreAuthorize("hasRole('NORMAL')")
    @GetMapping("/private/getUsers")
    public ResponseEntity<?> getAllUsers(){
        System.out.println("Executed!");
        return ResponseEntity.ok().body(userRepo.findAll());
    }

    @PostMapping("/private/saveBulkContacts")
    public ResponseEntity<?> saveBulkContacts(@RequestBody List<String> contactIds, @RequestParam("ownerId") String ownerId) {

        UUID ownerUUID = UUID.fromString(ownerId);

        System.out.println("ContactList = "+contactIds);
        System.out.println("ownerId = "+ownerId);
        User owner = userRepo.findById(ownerUUID).orElse(null);
        if (owner == null) {
            return ResponseEntity.badRequest().body("Owner not found");
        }

        List<UserContact> toSave = new ArrayList<>();

        for (String contactId : contactIds) {
            User contact = userRepo.findById(UUID.fromString(contactId)).orElse(null);
            if (contact == null || contact.getId().equals(owner.getId())) {
                continue;
            }

            UserContact uc = new UserContact();
            uc.setOwner(owner);
            uc.setContact(contact);
            uc.setIsBlocked(false);
            uc.setIsFavorite(false);
            uc.setCreatedAt(LocalDateTime.now());

            toSave.add(uc);
        }

        userContactRepository.saveAll(toSave);
        return ResponseEntity.ok(toSave.size() + " Contacts Saved Successfully!");
    }



    @GetMapping("/private/getContacts")
    public ResponseEntity<?> retrieveUserContacts(@RequestParam String ownerId){
        List<UserContactDTO> userContactDTOS = userService.getUserContacts(UUID.fromString(ownerId));
        return ResponseEntity.ok().body(userContactDTOS);
    }



}
