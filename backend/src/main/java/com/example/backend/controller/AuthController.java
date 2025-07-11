package com.example.backend.controller;

import com.example.backend.dto.AuthResponseDto;
import com.example.backend.dto.LoginDto;
import com.example.backend.dto.RegisterDto;
import com.example.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginDto loginDto){
        return authService.authenticateUser(loginDto);
    }

    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto){
        return authService.registerUser(registerDto);
    }

    @GetMapping("check-username")
    public ResponseEntity<Boolean> checkUsername(@RequestParam String username){
        return authService.checkUsername(username);
    }


}
