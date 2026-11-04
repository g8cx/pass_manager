package com.passwordmanager.service;

import com.passwordmanager.dto.CreatePasswordEntryRequest;
import com.passwordmanager.dto.LoginRequest;
import org.springframework.stereotype.Service;
import com.passwordmanager.model.PasswordEntry;
import com.passwordmanager.repository.PasswordEntryRepository;

@Service
public class LoginService {
    private final PasswordEntryRepository passwordEntryRepository;
    public LoginService(PasswordEntryRepository passwordEntryRepository){
        this.passwordEntryRepository = passwordEntryRepository;
    }
    public LoginRequest createLogin(LoginRequest request){
        return request;
    }

    public PasswordEntry createTestEntry(){
        PasswordEntry entry = new PasswordEntry("git", "git", "g8cx", "biwerg", "gg");
        return entry;
    }

    public PasswordEntry createPasswordEntry(CreatePasswordEntryRequest request){
        PasswordEntry entry = new PasswordEntry(
                request.getTitle(),
                request.getWebsite(),
                request.getUsername(),
                request.getEncryptedPassword(),
                request.getNotes()
        );
        return passwordEntryRepository.save(entry);
    }
}
