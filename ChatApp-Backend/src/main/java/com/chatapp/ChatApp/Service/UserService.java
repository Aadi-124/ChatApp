package com.chatapp.ChatApp.Service;

import com.chatapp.ChatApp.DTO.UserContactDTO;
import com.chatapp.ChatApp.Entities.User;
import com.chatapp.ChatApp.Entities.UserContact;
import com.chatapp.ChatApp.Repository.UserContactRepository;
import com.chatapp.ChatApp.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    public UserRepository repo;

    @Autowired
    public UserContactRepository userContactRepository;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    JWTService jwtService;

    public ResponseEntity<?> addUser(User user){

        try{
            if(repo.existsByEmailIgnoreCase(user.getEmail())){
                System.out.println("Email Exists!");
                return ResponseEntity.status(409).body("Email already Exists!");
            }
            if(repo.existsByUserNameIgnoreCase(user.getUserName())){
                System.out.println("USerName Exists!");
                return ResponseEntity.status(409).body("UserName already Exists!");
            }
            if(repo.existsByPhoneNumberIgnoreCase(user.getPhoneNumber())){
                System.out.println("Phone Exists!");
                return ResponseEntity.status(409).body("Phone Number already Exists!");
            } else{
                System.out.println("Invalid Phone!");
                if(user.getPhoneNumber().length() != 10) return ResponseEntity.status(400).body("Invalid Phone Number");
            }
            repo.save(user);
            System.out.println("SUCCESSSSSS!");
            return ResponseEntity.ok().body("SUCCESS");
        } catch(Exception E){
            System.out.println("Error!");
            return ResponseEntity.internalServerError().body(E);
        }
    }

    public String getUserId(String username){
        return repo.findByUserName(username).get().getId().toString();
    }


    public String verify(User user){
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUserName(),user.getPassword()));
        if(authentication.isAuthenticated()){
            return jwtService.generateToken(user.getUserName());
        }
        return "INVALID_USER";
    }


    public List<UserContactDTO> getUserContacts(UUID ownerId){
        List<UserContact> userContacts = userContactRepository.findByOwnerId(ownerId);

        return userContacts.stream().map(contact -> {
            User user = contact.getContact();
            UserContactDTO userContactDTO = new UserContactDTO();
            userContactDTO.setId(user.getId());
            userContactDTO.setUserName(user.getUserName());
            userContactDTO.setProfilePictureUrl(user.getProfilePictureUrl());
            userContactDTO.setBlocked(contact.getIsBlocked());
            userContactDTO.setFavourite(contact.getIsFavorite());
            return userContactDTO;
//            return new UserContactDTO(
//                    user.getId(),
//                    user.getUserName(),
//                    user.getProfilePictureUrl(),
//                    contact.getIsBlocked(),
//                    contact.getIsFavorite()
//            );
        }).collect(Collectors.toList());
    }

}
