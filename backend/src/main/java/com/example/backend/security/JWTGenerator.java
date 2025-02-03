package com.example.backend.security;

import io.jsonwebtoken.*;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Date;

@Component
public class JWTGenerator {

    public String generateToken(Authentication authentication){
        String username = authentication.getName();
        Date currentDate = new Date();
        Date expireDate = new Date(currentDate.getTime() + SecurityConstants.JWT_EXPIRATION);

        String token = Jwts
                .builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(expireDate)
                .signWith(SecurityConstants.JWT_SECRET_KEY)
                .compact();
        return token;
    }

    public String getUsernameFromJwt(String token) {

        Claims claims = Jwts.parser()
                .verifyWith(SecurityConstants.JWT_SECRET_KEY)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claims.getSubject();
    }


    public boolean validateToken(String token){
        try {
            Jwts.parser().verifyWith(SecurityConstants.JWT_SECRET_KEY).build().parseSignedClaims(token);
            return true;
        } catch (ExpiredJwtException ex) {
            throw new AuthenticationCredentialsNotFoundException("JWT is expired!");
        } catch (UnsupportedJwtException ex) {
            throw new AuthenticationCredentialsNotFoundException("JWT is unsupported!");
        } catch (MalformedJwtException ex) {
            throw new AuthenticationCredentialsNotFoundException("JWT is malformed!");
        } catch (SignatureException ex) {
            throw new AuthenticationCredentialsNotFoundException("JWT signature validation failed!");
        } catch (IllegalArgumentException ex) {
            throw new AuthenticationCredentialsNotFoundException("JWT claims string is empty!");
        }
    }


}
