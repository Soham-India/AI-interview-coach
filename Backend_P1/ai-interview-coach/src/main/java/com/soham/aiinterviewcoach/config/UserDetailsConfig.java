package com.soham.aiinterviewcoach.config;

import com.soham.aiinterviewcoach.repository.UserRepository;
import com.soham.aiinterviewcoach.security.AuthenticatedUser;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Configuration
@RequiredArgsConstructor
public class UserDetailsConfig {

    private final UserRepository userRepository;

    @Bean
    public UserDetailsService userDetailsService() {
        return email -> userRepository.findByEmail(email)
                .map(user -> new AuthenticatedUser(
                        user.getId(),
                        user.getEmail(),
                        user.getPasswordHash()
                ))
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found: " + email)
                );
    }
}
