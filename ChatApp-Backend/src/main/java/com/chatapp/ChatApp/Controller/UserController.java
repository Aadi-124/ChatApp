package com.chatapp.ChatApp.Controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/user")
public class UserController {


    @GetMapping("/login")
    public ResponseEntity<?> registerUser(){
        return ResponseEntity.status(200).body("user Registered Successfully!");
    }



}
