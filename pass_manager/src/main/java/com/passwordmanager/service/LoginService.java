package com.passwordmanager.service;

import com.passwordmanager.dto.CreatePasswordEntryRequest;
import com.passwordmanager.dto.LoginRequest;
import org.springframework.stereotype.Service;
import com.passwordmanager.model.PasswordEntry;
import com.passwordmanager.repository.PasswordEntryRepository;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import com.passwordmanager.dto.UpdatePasswordEntryRequest;
import com.passwordmanager.dto.PasswordEntryResponse;

import java.util.List;

@Service
public class LoginService {
    private final EncryptionService encryptionService;
    private final PasswordEntryRepository passwordEntryRepository;

    public LoginService(PasswordEntryRepository passwordEntryRepository, EncryptionService encryptionService){
        this.encryptionService = encryptionService;
        this.passwordEntryRepository = passwordEntryRepository;
    }
    public LoginRequest createLogin(LoginRequest request){
        return request;
    }

    public PasswordEntry createTestEntry(){
        PasswordEntry entry = new PasswordEntry("git", "git", "g8cx", "biwerg", "gg");
        return entry;
    }

    private String encryptPassword(String password) {
        try {
            return encryptionService.encrypt(password);
        } catch (Exception e) {
            throw new IllegalStateException("Не удалось зашифровать пароль", e);
        }
    }

    private String decryptPassword(String encryptedPassword){
        try {
            return encryptionService.decrypt(encryptedPassword);
        }catch (Exception e){
            throw new IllegalStateException("Не удалось расшифровать пароль", e);
        }
    }

    public PasswordEntryResponse createPasswordEntry(CreatePasswordEntryRequest request){
        PasswordEntry entry = new PasswordEntry(
                request.getTitle(),
                request.getWebsite(),
                request.getUsername(),
                encryptPassword(request.getEncryptedPassword()),
                request.getNotes()
        );
        return toResponse(passwordEntryRepository.save(entry));    }

    public List<PasswordEntryResponse> getAllEntries() {
        return passwordEntryRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }
    public PasswordEntryResponse getEntryById(Long id) {
        PasswordEntry entry = passwordEntryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return toResponse(entry);
    }

    public PasswordEntryResponse updateEntry(Long id, UpdatePasswordEntryRequest request) {
        PasswordEntry entry = passwordEntryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        entry.setTitle(request.getTitle());
        entry.setWebsite(request.getWebsite());
        entry.setUsername(request.getUsername());
        entry.setEncryptedPassword(encryptPassword(request.getEncryptedPassword()));
        entry.setNotes(request.getNotes());

        return toResponse(passwordEntryRepository.save(entry));    }

    public void deleteEntry(Long id) {
        PasswordEntry entry = passwordEntryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        passwordEntryRepository.delete(entry);
    }

    private PasswordEntryResponse toResponse(PasswordEntry entry) {
        return new PasswordEntryResponse(
                entry.getId(),
                entry.getTitle(),
                entry.getWebsite(),
                entry.getUsername(),
                decryptPassword(entry.getEncryptedPassword()),
                entry.getNotes()
        );
    }
}
