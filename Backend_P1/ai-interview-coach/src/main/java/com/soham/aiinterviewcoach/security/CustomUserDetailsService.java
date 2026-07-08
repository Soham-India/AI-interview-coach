package com.soham.aiinterviewcoach.security;

import com.soham.aiinterviewcoach.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        return userRepository.findByEmail(email)
                .map(user -> new User(
                        user.getEmail(),
                        user.getPasswordHash(),
                        Collections.emptyList()
                ))
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found: " + email));
    }
}
