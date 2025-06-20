package com.chatapp.ChatApp.Service;

import com.chatapp.ChatApp.Entities.User;
import com.chatapp.ChatApp.Entities.UserPrinciples;
import com.chatapp.ChatApp.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("loadUserByUsername started!");
        if(userRepo.findByUserNameIgnoreCase(username).isPresent()){
            User user = userRepo.findByUserNameIgnoreCase(username).get();
            System.out.println("loadUserByUsername finished!");
            return new UserPrinciples(user);
        } else{
            System.out.println("loadUserByUsername finished!");
            throw new UsernameNotFoundException("UserName : "+username);
        }
    }
}
