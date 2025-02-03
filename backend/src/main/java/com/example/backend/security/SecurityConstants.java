package com.example.backend.security;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class SecurityConstants {
    // TODO danach zeit kürzer machen
    public static final long JWT_EXPIRATION = 60;

    public static final String JWT_SECRET = Base64.getEncoder().encodeToString("my-secure-secret-key-for-jwt-my-secure-secret-key-for-jwt".getBytes());

    public static final SecretKey JWT_SECRET_KEY = convertStringToSecretKeyto(JWT_SECRET);


    public static SecretKey convertStringToSecretKeyto(String encodedKey) {
        byte[] decodedKey = Base64.getDecoder().decode(encodedKey);
        return new SecretKeySpec(decodedKey, "HmacSHA256");
    }

}
