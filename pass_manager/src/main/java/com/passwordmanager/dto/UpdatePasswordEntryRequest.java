package com.passwordmanager.dto;

import jakarta.validation.constraints.NotBlank;

public class UpdatePasswordEntryRequest {
    @NotBlank(message = "Название не может быть пустым")
    private String title;
    @NotBlank(message = "Сайт не может быть пустым")
    private String website;
    @NotBlank(message = "Логин не может быть пустым")
    private String username;
    @NotBlank(message = "Пароль не может быть пустым")
    private String encryptedPassword;
    private String notes;

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public void setEncryptedPassword(String encryptedPassword) {
        this.encryptedPassword = encryptedPassword;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getNotes() {
        return notes;
    }

    public String getEncryptedPassword() {
        return encryptedPassword;
    }

    public String getUsername() {
        return username;
    }

    public String getWebsite() {
        return website;
    }

    public String getTitle() {
        return title;
    }
}
