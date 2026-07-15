package com.soham.aiinterviewcoach.service;

import com.soham.aiinterviewcoach.dto.quota.QuotaStatusResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.concurrent.atomic.AtomicInteger;

@Slf4j
@Service
public class QuotaService {

    private final int dailyLimit;
    private final int warningThreshold;
    private final int blockThreshold;

    private final AtomicInteger requestCount = new AtomicInteger(0);
    private volatile LocalDate currentDay = LocalDate.now();

    public QuotaService(
            @Value("${gemini.quota.daily-limit:500}") int dailyLimit,
            @Value("${gemini.quota.warning-threshold:90}") int warningThresholdPercent,
            @Value("${gemini.quota.block-threshold:100}") int blockThresholdPercent
    ) {
        this.dailyLimit = dailyLimit;
        this.warningThreshold = (int) Math.ceil(dailyLimit * warningThresholdPercent / 100.0);
        this.blockThreshold = (int) Math.ceil(dailyLimit * blockThresholdPercent / 100.0);

        log.info("Quota initialized — limit: {}, warning at: {}, block at: {}",
                dailyLimit, warningThreshold, blockThreshold);
    }

    /**
     * Check if AI services are currently blocked.
     * Call this BEFORE making a Gemini API request.
     * Throws 429 if quota is exhausted.
     */
    public void checkQuota() {
        resetIfNewDay();

        if (requestCount.get() >= blockThreshold) {
            throw new ResponseStatusException(
                    HttpStatus.TOO_MANY_REQUESTS,
                    "AI services temporarily unavailable — daily quota exhausted. "
                    + "Services will automatically resume after the daily quota resets."
            );
        }
    }

    /**
     * Increment the counter after a successful Gemini call.
     * Only call this when the API call actually succeeded.
     */
    public void recordSuccess() {
        resetIfNewDay();
        int current = requestCount.incrementAndGet();
        log.debug("Gemini quota usage: {}/{}", current, dailyLimit);
    }

    /**
     * Get current quota status for the frontend.
     */
    public QuotaStatusResponse getStatus() {
        resetIfNewDay();
        int used = requestCount.get();
        return new QuotaStatusResponse(
                used,
                dailyLimit,
                used >= warningThreshold,
                used >= blockThreshold
        );
    }

    /**
     * Reset the counter if the day has changed.
     */
    private void resetIfNewDay() {
        LocalDate today = LocalDate.now();
        if (!today.equals(currentDay)) {
            synchronized (this) {
                if (!today.equals(currentDay)) {
                    log.info("New day detected — resetting quota counter. Previous usage: {}/{}",
                            requestCount.get(), dailyLimit);
                    requestCount.set(0);
                    currentDay = today;
                }
            }
        }
    }
}
