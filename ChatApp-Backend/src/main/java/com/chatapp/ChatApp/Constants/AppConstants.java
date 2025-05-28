package com.chatapp.ChatApp.Constants;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AppConstants{
     @Value("${FRONTEND_URL:http://localhost:5173}")
    public String FrontEndBaseURL;
}