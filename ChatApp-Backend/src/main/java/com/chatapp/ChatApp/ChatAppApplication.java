package com.chatapp.ChatApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ChatAppApplication {

	public static void main(String[] args) {
		System.out.println("public static void main started!");
		SpringApplication.run(ChatAppApplication.class, args);
		System.out.println("public static void main finished!");
	}

}
