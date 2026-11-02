package com.passwordmanager.service;

import com.passwordmanager.dto.LoginRequest;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    public LoginRequest createLogin(LoginRequest request){
        return request;
    }
}
