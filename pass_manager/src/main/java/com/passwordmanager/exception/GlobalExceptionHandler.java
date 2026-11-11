package com.passwordmanager.exception;

import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;
import java.util.HashMap;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> handleValidationException(MethodArgumentNotValidException exception){
        Map<String, Object> response = new HashMap<>();

        response.put("status", 400);
        response.put("message", "Ошибка валидации");

        Map<String, String> errors = new HashMap<>();

        for(FieldError error : exception.getBindingResult().getFieldErrors()){
            errors.put(error.getField(), error.getDefaultMessage());
        }
        response.put("errors", errors);
        return response;
    }
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String, Object>> handleResponseStatusException(
            ResponseStatusException exception) {

        Map<String, Object> response = new HashMap<>();

        response.put("status", exception.getStatusCode().value());
        response.put("message", exception.getReason() != null
                ? exception.getReason()
                : "Запрашиваемая запись не найдена");

        return ResponseEntity
                .status(exception.getStatusCode())
                .body(response);
    }
}
