package com.chatapp.ChatApp.Configuration;


import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer {

    // Here We need to implement two methods
    public void configureMessageBroker(MessageBrokerRegistry registry){
        registry.enableSimpleBroker("/topics"); // at this route the messages are broadcasted
        registry.setApplicationDestinationPrefixes("/app"); // at this routes messages are sent.
    }


    public void registerStompEndpoints(StompEndpointRegistry registry){
        registry.addEndpoint("/chat")
                .setAllowedOriginPatterns("localhost:5173")
                .withSockJS();
    }

}
