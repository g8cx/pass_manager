package com.passwordmanager.service;

import com.passwordmanager.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.passwordmanager.dto.AuthResponse;
import com.passwordmanager.dto.RegisterRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {
    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public AuthResponse register(RegisterRequest request){
        boolean nickNameExists = userRepository.existsByNickname(request.getNickname());
        boolean emailExists = userRepository.existsByEmail(request.getEmail());

        if (nickNameExists){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Этот никнейм уже занят");
        }

        if (emailExists){
            throw new ResponseStatusException(HttpStatus.CONFLICT,"Пользователь с таким email уже зарегистрирован");
        }
    }
}
