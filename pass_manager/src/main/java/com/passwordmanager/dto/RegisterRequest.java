package com.passwordmanager.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;

public class RegisterRequest {
    @NotBlank(message = "Никнейм не может быть пустым")
    private String nickname;
    @NotBlank(message = "Email не может быть пустым")
    @Email(message = "Некорректный формат email")
    private String email;
    @NotBlank(message = "Пароль не может быть пустым")
    private String password;

    public RegisterRequest(String nickname, String email, String password){
        this.nickname = nickname;
        this.email = email;
        this.password = password;
    }

    public String getNickname(){
        return nickname;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
