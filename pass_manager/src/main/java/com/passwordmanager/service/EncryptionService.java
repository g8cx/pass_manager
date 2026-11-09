package com.passwordmanager.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.Base64;
import javax.crypto.spec.SecretKeySpec;
import javax.crypto.Cipher;
import javax.crypto.spec.GCMParameterSpec;
import java.security.SecureRandom;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

@Service
public class EncryptionService {

    @Value("${PASSWORD_ENCRYPTION_KEY}")
    private String encryptionKey;

    private byte[] getKeyBytes(){
        byte[] keyBytes = Base64.getDecoder().decode(encryptionKey);

        if (keyBytes.length != 32){
            throw new IllegalStateException("Invalid encryption key length");
        }

        return keyBytes;
    }

    private SecretKeySpec getSecretKey(){
        return new SecretKeySpec(getKeyBytes(), "AES");
    }

    private byte[] generateNonce() {
        byte[] nonce = new byte[12];

        SecureRandom secureRandom = new SecureRandom();
        secureRandom.nextBytes(nonce);

        return nonce;
    }

    public String encrypt(String password) throws Exception {

        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");

        byte[] nonce = generateNonce();

        GCMParameterSpec parameterSpec = new GCMParameterSpec(128, nonce);

        cipher.init(Cipher.ENCRYPT_MODE, getSecretKey(), parameterSpec);

        byte[] encryptedBytes = cipher.doFinal(password.getBytes(StandardCharsets.UTF_8));

        byte[] result = new byte[nonce.length + encryptedBytes.length];

        System.arraycopy(nonce, 0, result, 0, nonce.length);

        System.arraycopy(encryptedBytes, 0, result, nonce.length, encryptedBytes.length);

        return Base64.getEncoder().encodeToString(result);
    }

    public String decrypt(String encryptedPassword) throws Exception{

        byte[] decodedBytes = Base64.getDecoder().decode(encryptedPassword);

        byte[] nonce = Arrays.copyOfRange(decodedBytes, 0, 12);

        byte[] encryptedBytes = Arrays.copyOfRange(decodedBytes, 12, decodedBytes.length);

        GCMParameterSpec parameterSpec = new GCMParameterSpec(128, nonce);

        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");

        cipher.init(Cipher.DECRYPT_MODE, getSecretKey(), parameterSpec);

        byte[] decryptedBytes = cipher.doFinal(encryptedBytes);

        return new String(decryptedBytes, StandardCharsets.UTF_8);
    }

}