package com.passwordmanager.repository;

import com.passwordmanager.model.PasswordEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PasswordEntryRepository extends JpaRepository<PasswordEntry, Long> {
    List<PasswordEntry> findAllByUserId(UUID userId);

    Optional<PasswordEntry> findByIdAndUserId(Long id, UUID userId);
}