package com.chatapp.ChatApp.Configuration;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import com.chatapp.ChatApp.Constants.AppConstants;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer {

    @Autowired
    AppConstants constants;

    // Here We need to implement two methods
    public void configureMessageBroker(MessageBrokerRegistry registry){

        System.out.println("configureMessageBroker Started!");
        registry.enableSimpleBroker("/user", "/topic");
        registry.setUserDestinationPrefix("/user");
        registry.setApplicationDestinationPrefixes("/app");

        System.out.println("configureMesageBorker finished!");

    }


    public void registerStompEndpoints(StompEndpointRegistry registry){

        System.out.println("registerStompEndpoint Started!");
        registry.addEndpoint("/chat")
                .setAllowedOriginPatterns(constants.FrontEndBaseURL)
                .withSockJS();
        System.out.println("RegisterStompEndpoint finished!");
    }

}
