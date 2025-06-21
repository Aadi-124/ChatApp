package com.chatapp.ChatApp.Controller;


import com.chatapp.ChatApp.Entities.User;
import com.chatapp.ChatApp.Repository.UserRepository;
import com.chatapp.ChatApp.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController()
public class UserController {

    @Autowired
    public UserService userService;

//    @Autowired
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);

    @PostMapping("/public/register")
    public ResponseEntity<?> registerUser(@RequestBody User user){
        System.out.println("registerUser Started!");
        try{
            user.setId(UUID.randomUUID());
            String encodedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(encodedPassword);
            user.setRole(user.getRole().toUpperCase());
            user.setCreatedAt(LocalDateTime.now());

            System.out.println("registerUser finished");
            return userService.addUser(user);
        } catch(Exception E){
            E.printStackTrace();
            System.out.println("registerUser finished!");
            return ResponseEntity.status(400).body(E.getMessage());
        }
    }

    @PostMapping("/public/login")
    public ResponseEntity<?> login(@RequestBody User user){
        String token = userService.verify(user);
        if(token != "INVALID_USER"){
            String userId = userService.getUserId(user.getUserName());
            Map<String,String> response = new HashMap<String,String>();
            response.put("token",token);
            response.put("userId",userId);
            return ResponseEntity.status(200).body(response);
        } else {
            return ResponseEntity.status(401).body(token);
        }
    }



    // Register Validations!:

//    @GetMapping("/public/checkUserName")
//    public ResponseEntity<Map<String,Boolean>> checkUserNameAvailability(@RequestParam String username){
//        boolean exists = userService.isUserNameExists(username);
//        return ResponseEntity.ok(Collections.singletonMap("exists",exists));
//    }

//    @GetMapping("/public/checkEmail")
//    public ResponseEntity<Map<String, Boolean>> checkEmailAvailability(@RequestParam String email) {
//        boolean exists = userService.isEmailExists(email);
//        return ResponseEntity.ok(Collections.singletonMap("exists", exists));
//    }
//
//    @GetMapping("/public/checkPhone")
//    public ResponseEntity<Map<String, Boolean>> checkPhoneNumberAvailability(@RequestParam String phone) {
//        boolean exists = userService.isPhoneNumberExists(phone);
//        return ResponseEntity.ok(Collections.singletonMap("exists", exists));
//    }



}
