package com.chatapp.ChatApp.Controller;


import com.chatapp.ChatApp.Entities.User;
import com.chatapp.ChatApp.Entities.UserContact;
import com.chatapp.ChatApp.Repository.UserContactRepository;
import com.chatapp.ChatApp.Repository.UserProjection;
import com.chatapp.ChatApp.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
public class ContactController {

    @Autowired
    public UserRepository userRepo;

    @Autowired
    public UserContactRepository userContactRepository;

    @PreAuthorize("hasRole('NORMAL')")
    @GetMapping("/private/getUsers")
    public ResponseEntity<?> getAllUsers(){
        System.out.println("Executed!");
        return ResponseEntity.ok().body(userRepo.findAll());
    }

    @PostMapping("/private/saveBulkContacts")
    public ResponseEntity<?> saveContacts(@RequestBody List<Long> contactIds, @RequestParam("ownerId") Long ownerId) {

        User owner = userRepo.findById(ownerId).orElse(null);
        if (owner == null) {
            return ResponseEntity.badRequest().body("Owner not found");
        }

        List<UserContact> toSave = new ArrayList<>();

        for (Long contactId : contactIds) {
            User contact = userRepo.findById(contactId).orElse(null);
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
        return ResponseEntity.ok("Saved " + toSave.size() + " contacts");
    }



}
