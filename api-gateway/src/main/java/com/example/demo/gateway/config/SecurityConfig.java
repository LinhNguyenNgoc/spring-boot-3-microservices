package com.example.demo.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final String[] freeResourceUrls = {
            "/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**",
            "/swagger-resources/**", "/api-docs/**", "/aggregate/**"
    };

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                // 1. Kích hoạt CORS với cấu hình bên dưới
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                
                // 2. Tắt CSRF (Thường tắt khi viết REST API dùng JWT / OAuth2 Resource Server)
                .csrf(csrf -> csrf.disable())
                
                // 3. Phân quyền Request
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(freeResourceUrls).permitAll()
                        .anyRequest().authenticated()
                )
                
                // 4. Cấu hình Resource Server xác thực JWT
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))
                .build();
    }

    // Bean cấu hình chi tiết cho CORS
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Cho phép frontend React Vite truy cập
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));

        // Cho phép các HTTP Method cơ bản và OPTIONS (Preflight request)
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"));

        // Cho phép gửi tất cả các Header (Bao gồm Header chứa Bearer Token: Authorization)
        configuration.setAllowedHeaders(List.of("*"));

        // Cho phép gửi kèm cookie/credentials nếu cần
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Áp dụng cấu hình này cho tất cả các endpoint (/**)
        source.registerCorsConfiguration("/**", configuration);
        
        return source;
    }
}