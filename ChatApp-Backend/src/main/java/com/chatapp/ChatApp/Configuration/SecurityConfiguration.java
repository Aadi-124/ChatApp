package com.chatapp.ChatApp.Configuration;


import com.chatapp.ChatApp.Service.JWTFilter;
import com.chatapp.ChatApp.Service.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfiguration {


    @Autowired
    private JWTFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{

        System.out.println("securityFilterChain Started!");


                httpSecurity.authorizeHttpRequests(request ->
                                request.requestMatchers("/public/*").permitAll()
                                        .requestMatchers("/private/*").hasAnyRole("ADMIN","NORMAL")
                                        .requestMatchers("/admin/*").hasRole("ADMIN")
                                        .anyRequest().authenticated()
                        )
                        .anonymous(a->a.disable())
                        .userDetailsService(customUserDetailsService)
                        .authenticationProvider(authenticationProvider())
                        .formLogin(formlogin->formlogin.disable())
                        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                        .csrf(csrf -> csrf.disable())
                        .cors(Customizer.withDefaults())
                        .httpBasic(Customizer.withDefaults()
                        ).addFilterBefore(jwtFilter,UsernamePasswordAuthenticationFilter.class);

                       return httpSecurity.build();

    }

    @Autowired
    public MyUserDetailsService customUserDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder(){

        System.out.println("passwordEncoder Started!");
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){

        System.out.println("authenticationProvider Started!");
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(customUserDetailsService);

        System.out.println("authenticationProvider Finished!");
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {

        System.out.println("authenticationManager Started!");
        return config.getAuthenticationManager();
    }

}
