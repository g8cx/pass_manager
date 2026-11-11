package com.passwordmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.passwordmanager.model.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByNickname(String nickname);
}
