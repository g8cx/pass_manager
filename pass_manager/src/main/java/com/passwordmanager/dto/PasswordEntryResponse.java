
package com.passwordmanager.dto;


public class PasswordEntryResponse {

    private Long id;
    private String title;
    private String website;
    private String username;
    private String password;
    private String notes;

    public PasswordEntryResponse(
            Long id,
            String title,
            String website,
            String username,
            String password,
            String notes
    ) {
        this.id = id;
        this.title = title;
        this.website = website;
        this.username = username;
        this.password = password;
        this.notes = notes;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getWebsite() {
        return website;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getNotes() {
        return notes;
    }
}
