package com.soham.aiinterviewcoach.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.naming.NamingException;
import javax.naming.directory.Attributes;
import javax.naming.directory.InitialDirContext;
import java.util.Hashtable;
import java.util.regex.Pattern;
import java.util.Map;
import com.soham.aiinterviewcoach.exception.InvalidEmailException;

@Slf4j
@Service
public class EmailValidationService {

    // RFC 5322 compliant email format pattern
    private static final Pattern EMAIL_PATTERN = Pattern.compile(
        "^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$"
    );

    // Known disposable email domains to block
    private static final java.util.Set<String> BLOCKED_DOMAINS = java.util.Set.of(
        "mailinator.com", "tempmail.com", "throwaway.email",
        "guerrillamail.com", "yopmail.com", "sharklasers.com",
        "trashmail.com", "fakeinbox.com", "maildrop.cc",
        "dispostable.com", "spamgourmet.com", "mintemail.com"
    );

    // Common typo domains and their corrections
    private static final Map<String, String> TYPO_DOMAINS = Map.of(
        "gmial.com", "gmail.com",
        "gamil.com", "gmail.com",
        "gmai.com", "gmail.com",
        "hotnail.com", "hotmail.com",
        "outlok.com", "outlook.com",
        "yahooo.com", "yahoo.com",
        "yaho.com", "yahoo.com"
    );

    // ============================================================
    // MAIN VALIDATION ENTRY POINT
    // ============================================================
    public void validateEmail(String email) {
        if (email == null || email.isBlank()) {
            throw new InvalidEmailException("Email address is required");
        }

        String normalized = email.trim().toLowerCase();

        // Step 1: Format check
        if (!isValidFormat(normalized)) {
            throw new InvalidEmailException(
                "Invalid email format: " + email
            );
        }

        // Step 2: Extract domain
        String domain = extractDomain(normalized);

        // Step 3: Typo check
        if (TYPO_DOMAINS.containsKey(domain)) {
            String suggestedDomain = TYPO_DOMAINS.get(domain);
            String suggestedEmail = normalized.substring(0, normalized.indexOf("@") + 1) + suggestedDomain;
            throw new InvalidEmailException(
                "Invalid email. Did you mean " + suggestedEmail + "?"
            );
        }

        // Step 4: Block disposable email services
        if (isDisposableDomain(domain)) {
            throw new InvalidEmailException(
                "Disposable email addresses are not allowed"
            );
        }

        // Step 5: MX record check
        if (!hasMxRecord(domain)) {
            throw new InvalidEmailException(
                "Email domain does not exist or cannot receive emails: " + domain
            );
        }

        log.info("Email validation passed for domain: {}", domain);
    }

    // ============================================================
    // FORMAT VALIDATION
    // ============================================================
    private boolean isValidFormat(String email) {
        return EMAIL_PATTERN.matcher(email).matches();
    }

    // ============================================================
    // DISPOSABLE DOMAIN CHECK
    // ============================================================
    private boolean isDisposableDomain(String domain) {
        return BLOCKED_DOMAINS.contains(domain.toLowerCase());
    }

    // ============================================================
    // MX RECORD LOOKUP
    // ============================================================
    private boolean hasMxRecord(String domain) {
        try {
            Hashtable<String, String> env = new Hashtable<>();
            env.put("java.naming.factory.initial",
                    "com.sun.jndi.dns.DnsContextFactory");
            env.put("com.sun.jndi.dns.timeout.initial", "3000");
            env.put("com.sun.jndi.dns.timeout.retries", "2");

            InitialDirContext ctx = new InitialDirContext(env);
            Attributes attrs = ctx.getAttributes(
                domain,
                new String[]{"MX"}
            );

            boolean hasMx = attrs.get("MX") != null;

            // If no MX record, fall back to A record check
            // (some small domains use A records for mail)
            if (!hasMx) {
                Attributes aAttrs = ctx.getAttributes(
                    domain,
                    new String[]{"A"}
                );
                hasMx = aAttrs.get("A") != null;
            }

            ctx.close();
            return hasMx;

        } catch (NamingException e) {
            log.warn("MX lookup failed for domain '{}': {}", domain, e.getMessage());
            // If DNS lookup fails due to network issue,
            // be lenient and allow registration
            // to avoid blocking legitimate users
            return true;
        } catch (Exception e) {
            log.error("Unexpected error during MX lookup for domain '{}': {}",
                domain, e.getMessage());
            return true;
        }
    }

    // ============================================================
    // EXTRACT DOMAIN FROM EMAIL
    // ============================================================
    private String extractDomain(String email) {
        return email.substring(email.indexOf("@") + 1);
    }
}
