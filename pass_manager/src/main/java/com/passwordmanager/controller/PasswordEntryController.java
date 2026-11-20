package com.passwordmanager.controller;

import com.passwordmanager.dto.PasswordEntryResponse;
import com.passwordmanager.service.LoginService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import com.passwordmanager.dto.UpdatePasswordEntryRequest;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import com.passwordmanager.dto.CreatePasswordEntryRequest;
import org.springframework.web.bind.annotation.PostMapping;
import jakarta.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/entries")
public class PasswordEntryController {
    private final LoginService loginService;

    public PasswordEntryController(LoginService loginService){
        this.loginService = loginService;
    }

    @GetMapping
    public List<PasswordEntryResponse> getAllEntries(Principal principal) {
        return loginService.getAllEntries(principal);
    }

    @GetMapping("/{id}")
    public PasswordEntryResponse getEntryById(
            @PathVariable Long id,
            Principal principal
    ) {
        return loginService.getEntryById(id, principal);
    }

    @PutMapping("/{id}")
    public PasswordEntryResponse updateEntry(
            @PathVariable Long id,
            @Valid @RequestBody UpdatePasswordEntryRequest request,
            Principal principal
    ) {
        return loginService.updateEntry(id, request, principal);
    }

    @DeleteMapping("/{id}")
    public void deleteEntry(
            @PathVariable Long id,
            Principal principal
    ) {
        loginService.deleteEntry(id, principal);
    }

    @PostMapping
    public PasswordEntryResponse createPasswordEntry(
            @Valid @RequestBody CreatePasswordEntryRequest request,
            Principal principal
    ) {
        return loginService.createPasswordEntry(request, principal);
    }

}
