package com.chatapp.ChatApp.Controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
public class TestController {

//    @PreAuthorize("hasRole('PUBLIC')")
    @GetMapping("/public/testPublicAPI")
    public String publicMethod(){
        System.out.println("publicMethod Started!");
        return "Public Route Accessed!";
    }


    @PreAuthorize("hasRole('NORMAL')")
    @GetMapping("/private/testPrivateAPI")
    public String privateMethod(){
        System.out.println("privateMethod Started!");
        return "Private Route Accessed!";
    }


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/testAdminAPI")
    public String adminMethod(){
        System.out.println("adminMethod Started!");
        return "Admin Route Accessed!";
    }

}
