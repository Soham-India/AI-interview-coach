package com.soham.aiinterviewcoach.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    // This grabs the exact URL you defined in application.properties
    @Value("${cors.allowed.origins}")
    private String[] allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Apply to all API endpoints
                .allowedOrigins(allowedOrigins) // Only allow your React frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE","PATCH", "OPTIONS") // Allowed HTTP methods
                .allowedHeaders("*").allowCredentials(true);
    }
}