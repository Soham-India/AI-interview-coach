package com.soham.aiinterviewcoach.controller;

import com.soham.aiinterviewcoach.dto.auth.AuthResponse;
import com.soham.aiinterviewcoach.dto.auth.LoginRequest;
import com.soham.aiinterviewcoach.dto.auth.RegisterRequest;
import com.soham.aiinterviewcoach.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(userService.login(request));
    }
}
