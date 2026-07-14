package com.soham.aiinterviewcoach.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.resource.NoResourceFoundException;
import com.soham.aiinterviewcoach.exception.InvalidEmailException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // ============================================================
    // 409 CONFLICT / 404 NOT FOUND / 400 BAD REQUEST
    // Handles all ResponseStatusException thrown in services
    // ============================================================
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ErrorResponse> handleResponseStatus(
            ResponseStatusException ex,
            HttpServletRequest request
    ) {
        return build(ex.getStatusCode().value(), ex.getReason(), request);
    }

    // ============================================================
    // 401 UNAUTHORIZED
    // Handles bad credentials during login
    // ============================================================
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentials(
            BadCredentialsException ex,
            HttpServletRequest request
    ) {
        return build(HttpStatus.UNAUTHORIZED.value(), "Invalid email or password", request);
    }

    // ============================================================
    // 401 UNAUTHORIZED
    // Handles missing or invalid JWT token
    // ============================================================
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorResponse> handleAuthentication(
            AuthenticationException ex,
            HttpServletRequest request
    ) {
        return build(HttpStatus.UNAUTHORIZED.value(), "Authentication required", request);
    }

    // ============================================================
    // 403 FORBIDDEN
    // Handles access to resources the user doesn't own
    // ============================================================
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDenied(
            AccessDeniedException ex,
            HttpServletRequest request
    ) {
        return build(HttpStatus.FORBIDDEN.value(), "Access denied", request);
    }

    // ============================================================
    // 400 BAD REQUEST
    // Handles malformed JSON body
    // ============================================================
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> handleNotReadable(
            HttpMessageNotReadableException ex,
            HttpServletRequest request
    ) {
        return build(HttpStatus.BAD_REQUEST.value(), "Malformed or missing request body", request);
    }

    // ============================================================
    // 400 BAD REQUEST
    // Handles missing required @RequestParam
    // ============================================================
    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<ErrorResponse> handleMissingParam(
            MissingServletRequestParameterException ex,
            HttpServletRequest request
    ) {
        return build(
                HttpStatus.BAD_REQUEST.value(),
                "Missing required parameter: " + ex.getParameterName(),
                request
        );
    }

    // ============================================================
    // 400 BAD REQUEST
    // Handles wrong type for path variable or request param
    // ============================================================
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> handleTypeMismatch(
            MethodArgumentTypeMismatchException ex,
            HttpServletRequest request
    ) {
        return build(
                HttpStatus.BAD_REQUEST.value(),
                "Invalid value for parameter: " + ex.getName(),
                request
        );
    }

    // ============================================================
    // 405 METHOD NOT ALLOWED
    // ============================================================
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ErrorResponse> handleMethodNotAllowed(
            HttpRequestMethodNotSupportedException ex,
            HttpServletRequest request
    ) {
        return build(HttpStatus.METHOD_NOT_ALLOWED.value(), "Method not allowed", request);
    }

    // ============================================================
    // 415 UNSUPPORTED MEDIA TYPE
    // The Content-Type header is wrong
    // ============================================================
    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<ErrorResponse> handleMediaType(
            HttpMediaTypeNotSupportedException ex,
            HttpServletRequest request
    ) {
        return build(
                HttpStatus.UNSUPPORTED_MEDIA_TYPE.value(),
                "Content-Type must be application/json",
                request
        );
    }

    // ============================================================
    // 404 NOT FOUND
    // Handles requests to non-existent endpoints
    // ============================================================
    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ErrorResponse> handleNoResource(
            NoResourceFoundException ex,
            HttpServletRequest request
    ) {
        return build(HttpStatus.NOT_FOUND.value(), "Endpoint not found", request);
    }

    // ============================================================
    // 400 BAD REQUEST
    // Handles InvalidEmailException
    // ============================================================
    @ExceptionHandler(InvalidEmailException.class)
    public ResponseEntity<ErrorResponse> handleInvalidEmail(
            InvalidEmailException ex,
            HttpServletRequest request
    ) {
        return build(HttpStatus.BAD_REQUEST.value(), ex.getMessage(), request);
    }

    // ============================================================
    // 500 INTERNAL SERVER ERROR
    // Catch-all for anything unhandled
    // ============================================================
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneric(
            Exception ex,
            HttpServletRequest request
    ) {
        return build(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "An unexpected error occurred",
                request
        );
    }

    // ========================================================================
    // Handles DTO Validation Exceptions (@Valid failures)
    // Example: A user submits a blank email or a password that is too short
    // ========================================================================
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(
            MethodArgumentNotValidException ex,
            HttpServletRequest request
    ) {

        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult()
                .getFieldErrors()
                .forEach(error ->
                        errors.put(error.getField(), error.getDefaultMessage())
                );

        ErrorResponse body = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                "Validation failed",
                request.getRequestURI(),
                LocalDateTime.now(),
                errors
        );

        return ResponseEntity.badRequest().body(body);
    }

    // ============================================================
    // PRIVATE BUILDER
    // ============================================================
    private ResponseEntity<ErrorResponse> build(
            int status,
            String message,
            HttpServletRequest request
    ) {
        ErrorResponse body = new ErrorResponse(
                status,
                HttpStatus.resolve(status) != null
                        ? HttpStatus.resolve(status).getReasonPhrase()
                        : "Error",
                message,
                request.getRequestURI(),
                LocalDateTime.now(),
                null
        );
        return ResponseEntity.status(status).body(body);
    }
}