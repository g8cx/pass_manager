package com.passwordmanager.service;

import com.passwordmanager.dto.LoginRequest;
import com.passwordmanager.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.passwordmanager.dto.AuthResponse;
import com.passwordmanager.dto.RegisterRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import com.passwordmanager.model.User;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
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
        String passwordHash = passwordEncoder.encode(request.getPassword());
        User user = new User(request.getNickname(), request.getEmail(), passwordHash);
        User savedUser = userRepository.save(user);
        String token = jwtService.generateToken(savedUser.getId());
        AuthResponse authResponse = new AuthResponse(token, "Bearer");
        return authResponse;
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Неверный email или пароль"
                ));
        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPasswordHash()
        )) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Неверный email или пароль"
            );
        }
        String token = jwtService.generateToken(user.getId());
        return new AuthResponse(token, "Bearer");
    }
}
