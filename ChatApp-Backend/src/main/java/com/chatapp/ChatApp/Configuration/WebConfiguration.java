package com.chatapp.ChatApp.Configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.chatapp.ChatApp.Constants.AppConstants;

@Configuration
public class WebConfiguration{

    @Autowired
    AppConstants constants;

    @Bean
    public WebMvcConfigurer corsConfigurer(){

        System.out.println("WebMvcConfigurer Started!");
        return new WebMvcConfigurer(){
            
            @Override
            public void addCorsMappings(CorsRegistry registry){
                registry.addMapping("/**")
                .allowedOrigins(constants.FrontEndBaseURL)
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowedHeaders("Authorization", "Content-Type")
                .allowCredentials(true);
            }
        };
    }

}