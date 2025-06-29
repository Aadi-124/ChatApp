package com.chatapp.ChatApp.Repository;

import com.chatapp.ChatApp.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByUserNameIgnoreCase(String userName);
    boolean existsByUserNameIgnoreCase(String userName);
    boolean existsByPhoneNumberIgnoreCase(String phone);
    boolean existsByEmailIgnoreCase(String email);
    List<UserProjection> findAllProjectedBy();
    Optional<User> findByUserName(String username);


//    Optional<User> findByEmailIgnoreCase(String email);
//    Optional<User> findByPhoneNumber(String phoneNumber);
}
