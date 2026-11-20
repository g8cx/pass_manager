package com.passwordmanager.controller;

import com.passwordmanager.dto.ApiStatusResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/status")
    public ApiStatusResponse status() {
        return new ApiStatusResponse(
                "Password Manager",
                "running",
                "1.0",
                "test"
        );
    }
}