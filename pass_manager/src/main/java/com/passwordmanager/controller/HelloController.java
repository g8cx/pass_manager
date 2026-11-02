package com.passwordmanager.controller;

import com.passwordmanager.dto.ApiStatusResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.passwordmanager.dto.LoginRequest;

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello(){
        return "Password Manager API is running";
    }

    @GetMapping("/status")
    public ApiStatusResponse status(){
        return new ApiStatusResponse("Password Manager","running", "1.0", "test");
    }

    @PostMapping("/logins")
    public LoginRequest logins(@RequestBody LoginRequest request){
        return request;
    }


}
