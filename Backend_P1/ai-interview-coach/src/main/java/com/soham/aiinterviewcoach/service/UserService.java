package com.soham.aiinterviewcoach.service;

import com.soham.aiinterviewcoach.dto.auth.AuthResponse;
import com.soham.aiinterviewcoach.dto.auth.LoginRequest;
import com.soham.aiinterviewcoach.dto.auth.RegisterRequest;
import com.soham.aiinterviewcoach.dto.user.ProfileUpdateRequest;
import com.soham.aiinterviewcoach.dto.user.UserPreferencesDTO;
import com.soham.aiinterviewcoach.dto.user.UserResponse;
import com.soham.aiinterviewcoach.dto.user.UserStatsResponse;
import com.soham.aiinterviewcoach.entity.User;
import com.soham.aiinterviewcoach.entity.UserPreferences;
import com.soham.aiinterviewcoach.entity.UserStats;
import com.soham.aiinterviewcoach.repository.UserPreferencesRepository;
import com.soham.aiinterviewcoach.repository.UserRepository;
import com.soham.aiinterviewcoach.repository.UserStatsRepository;
import com.soham.aiinterviewcoach.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import com.soham.aiinterviewcoach.security.AuthenticatedUser;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.security.SecureRandom;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserStatsRepository userStatsRepository;
    private final UserPreferencesRepository userPreferencesRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private static final SecureRandom RANDOM = new SecureRandom();


    @Transactional
    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.email())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email already registered"
            );
        }

        String callsign;
        if (request.callsign() != null && !request.callsign().isBlank()) {
            if (userRepository.existsByCallsign(request.callsign())) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Callsign already taken");
            }
            callsign = request.callsign();
        } else {
            callsign = generateUniqueCallsign();
        }

        User user = new User();

        user.setName(request.name());
        user.setEmail(request.email());
        user.setPasswordHash(
                passwordEncoder.encode(request.password())
        );

        user.setCallsign(callsign);

        user.setRole(
                request.role() != null
                        ? request.role()
                        : "Candidate"
        );

        User savedUser = userRepository.save(user);

        // Create default stats
        UserStats stats = new UserStats();
        stats.setUser(savedUser);
        stats.setInterviewsCompleted(0);
        stats.setBestScore(0);
        stats.setStreak(0);
        stats.setStudyHours(0);

        userStatsRepository.save(stats);

        // Create default preferences
        UserPreferences preferences = new UserPreferences();
        preferences.setUser(savedUser);
        preferences.setInterviewLength(10);
        preferences.setDifficulty("ADAPTIVE");
        preferences.setTheme("CYBER");

        userPreferencesRepository.save(preferences);

        AuthenticatedUser principal = new AuthenticatedUser(
                savedUser.getId(), savedUser.getEmail(), savedUser.getPasswordHash()
        );

        String token = jwtService.generateToken(principal, savedUser.getId());
        return new AuthResponse(token, mapToUserResponse(savedUser));
    }

    public AuthResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(), request.password()
                )
        );

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED, "Invalid credentials"
                ));

        AuthenticatedUser principal = new AuthenticatedUser(
                user.getId(), user.getEmail(), user.getPasswordHash()
        );

        String token = jwtService.generateToken(principal, user.getId());
        return new AuthResponse(token, mapToUserResponse(user));
    }


    public UserResponse getProfile(Long userId) {
        return mapToUserResponse(
                findUserOrThrow(userId)
        );
    }

    @Transactional
    public UserResponse updateProfile(Long userId, ProfileUpdateRequest request) {

        User user = findUserOrThrow(userId);

        if (request.name() != null) {
            user.setName(request.name());
        }

        if (request.callsign() != null && !request.callsign().isBlank()
                && !request.callsign().equals(user.getCallsign())) {
            if (userRepository.existsByCallsign(request.callsign())) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Callsign already taken");
            }
            user.setCallsign(request.callsign());
        }

        if (request.role() != null) {
            user.setRole(request.role());
        }

        if (request.avatarUrl() != null) {
            user.setAvatarUrl(request.avatarUrl());
        }

        return mapToUserResponse(userRepository.save(user));
    }

    public UserPreferencesDTO getPreferences(Long userId) {

        UserPreferences preferences =
                userPreferencesRepository.findByUserId(userId)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Preferences not found"
                                )
                        );

        return new UserPreferencesDTO(
                preferences.getInterviewLength(),
                preferences.getDifficulty(),
                preferences.getTheme()
        );
    }

    @Transactional
    public UserPreferencesDTO updatePreferences(
            Long userId,
            UserPreferencesDTO request
    ) {

        UserPreferences preferences =
                userPreferencesRepository.findByUserId(userId)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Preferences not found"
                                )
                        );

        if (request.interviewLength() != null) {
            preferences.setInterviewLength(
                    request.interviewLength()
            );
        }

        if (request.difficulty() != null) {
            preferences.setDifficulty(
                    request.difficulty()
            );
        }

        if (request.theme() != null) {
            preferences.setTheme(
                    request.theme()
            );
        }

        userPreferencesRepository.save(preferences);

        return new UserPreferencesDTO(
                preferences.getInterviewLength(),
                preferences.getDifficulty(),
                preferences.getTheme()
        );
    }


    public UserStatsResponse getUserStats(Long userId) {

        UserStats stats = userStatsRepository.findByUserId(userId)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "User stats not found"
                        )
                );

        return new UserStatsResponse(
                stats.getInterviewsCompleted(),
                stats.getBestScore(),
                stats.getStreak(),
                stats.getStudyHours()
        );
    }

    private String generateUniqueCallsign() {
        String candidate;
        int attempts = 0;
        do {
            candidate = "OPERATOR-" + (100000 + RANDOM.nextInt(900000));
            attempts++;
            if (attempts > 20) {
                throw new ResponseStatusException(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        "Could not generate a unique callsign, try again"
                );
            }
        } while (userRepository.existsByCallsign(candidate));
        return candidate;
    }


    private User findUserOrThrow(Long userId) {

        return userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "User not found"
                        )
                );
    }

    private UserResponse mapToUserResponse(User user) {

        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getCallsign(),
                user.getRole(),
                user.getAvatarUrl()
        );
    }
}