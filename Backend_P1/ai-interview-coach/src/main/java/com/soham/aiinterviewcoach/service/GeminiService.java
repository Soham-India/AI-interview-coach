package com.soham.aiinterviewcoach.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.soham.aiinterviewcoach.dto.ai.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class GeminiService {

    private final ChatClient.Builder chatClientBuilder;
    private final ObjectMapper objectMapper;
    private final QuotaService quotaService;

    // ============================================================
    // 1. JOB MATRIX ANALYSIS
    // ============================================================
    public JobAnalysisResponse analyzeJobDescription(
            String jobTitle,
            String jobDescription
    ) {
        String systemPrompt = """
                Analyze this job description. Return exact JSON:
                {"skillsRequired": "comma, separated, skills", "analysisSummary": "2-3 sentence strategic summary."}
                """;

        String userPrompt = "Job Title: %s\nJob Description: %s".formatted(jobTitle, jobDescription);

        String raw = callGemini(systemPrompt, userPrompt);

        try {
            return objectMapper.readValue(sanitizeJson(raw), JobAnalysisResponse.class);
        } catch (Exception e) {
            log.error("Failed to parse AI job analysis response. Raw response: {}", raw, e);
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Failed to parse AI job analysis response", e
            );
        }
    }

    // ============================================================
    // 2. ADVERSARIAL QUESTION GENERATION
    // ============================================================
    public InterviewQuestionsResponse generateAllQuestions(
            String jobTitle,
            String skillsRequired,
            int questionCount
    ) {
        String systemPrompt = """
                Generate exactly %d distinct technical interview questions for this role.
                Mix difficulty: 40%% easy, 40%% medium, 20%% hard.
                Each question needs a topic tag. No yes/no questions.
                
                Return ONLY this JSON, no markdown:
                {"questions":[{"questionNumber":1,"topic":"TAG","questionText":"..."}]}
                """.formatted(questionCount);

        String userPrompt = "Job Title: %s\nSkills: %s".formatted(jobTitle, skillsRequired);

        String raw = callGemini(systemPrompt, userPrompt);

        try {
            return objectMapper.readValue(sanitizeJson(raw), InterviewQuestionsResponse.class);
        } catch (Exception e) {
            log.error("Failed to parse AI question generation response. Raw response: {}", raw, e);
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Failed to parse AI question generation response", e
            );
        }
    }

    // ============================================================
    // 3. TELEMETRY ANSWER EVALUATION
    // ============================================================
    public MetricEvaluationResponse evaluateAnswer(
            String question,
            String topic,
            String userAnswer,
            String jobTitle
    ) {
        String systemPrompt = """
                Evaluate this answer. Return exact JSON:
                {"technicalScore":8.5,"communicationScore":7.0,"confidenceScore":6.5,"structureScore":8.0,"overallScore":7.5,"verdict":"UPPERCASE SUMMARY","aiFeedback":"2-3 sentences feedback.","directives":["tip 1","tip 2","tip 3"]}
                """;

        String userPrompt = "Role: %s\nTopic: %s\nQ: %s\nA: %s".formatted(jobTitle, topic, question, userAnswer);

        String raw = callGemini(systemPrompt, userPrompt);

        try {
            return objectMapper.readValue(sanitizeJson(raw), MetricEvaluationResponse.class);
        } catch (Exception e) {
            log.error("Failed to parse AI evaluation response. Raw response: {}", raw, e);
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Failed to parse AI evaluation response", e
            );
        }
    }

    // ============================================================
    // 4. FINAL SYSTEM VERDICT
    // ============================================================
    public FinalReportResponse generateFinalReport(
            String jobTitle,
            int overallScore,
            List<String> questionSummaries
    ) {
        String systemPrompt = """
                Generate final diagnostic report based on performance. Return exact JSON:
                {"executiveSummary":"2-3 sentences.","strengths":["s1"],"weaknesses":["w1"],"recommendations":["r1"],"probability":"HIGH_CONF","risk":"LOW_RISK"}
                """;

        String userPrompt = "Role: %s\nScore: %d/100\nLog:\n%s".formatted(jobTitle, overallScore, String.join("\n", questionSummaries));

        String raw = callGemini(systemPrompt, userPrompt);

        try {
            return objectMapper.readValue(sanitizeJson(raw), FinalReportResponse.class);
        } catch (Exception e) {
            log.error("Failed to parse AI final report response. Raw response: {}", raw, e);
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Failed to parse AI final report response", e
            );
        }
    }

    // ============================================================
    // PRIVATE UTILITIES
    // ============================================================
    private String callGemini(String systemPrompt, String userPrompt) {
        // Pre-flight: reject if daily quota is exhausted
        quotaService.checkQuota();

        try {
            log.debug("Calling Gemini with system prompt length: {}, user prompt length: {}",
                    systemPrompt.length(), userPrompt.length());

            ChatClient chatClient = chatClientBuilder
                    .defaultSystem(systemPrompt)
                    .build();

            String response = chatClient
                    .prompt()
                    .user(userPrompt)
                    .call()
                    .content();

            // Only count successful calls against the quota
            quotaService.recordSuccess();

            log.debug("Gemini response received, length: {}", response != null ? response.length() : "null");
            return response;
        } catch (ResponseStatusException e) {
            // Re-throw quota exceptions and other ResponseStatusExceptions as-is
            throw e;
        } catch (Exception e) {
            String errorMessage = e.getMessage();
            HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

            // Check if the root cause is a rate limit or quota exceeded
            Throwable cause = e.getCause();
            while (cause != null) {
                if (cause.getMessage() != null && cause.getMessage().contains("429")) {
                    errorMessage = "Gemini API Quota Exceeded. Please check your rate limits.";
                    status = HttpStatus.TOO_MANY_REQUESTS;
                    break;
                }
                cause = cause.getCause();
            }

            if (status == HttpStatus.INTERNAL_SERVER_ERROR) {
                errorMessage = "Gemini API call failed: " + errorMessage;
            }

            log.error("Gemini API call failed. Exception type: {}, Message: {}",
                    e.getClass().getSimpleName(), e.getMessage(), e);
            throw new ResponseStatusException(
                    status,
                    errorMessage, e
            );
        }
    }

    private String sanitizeJson(String raw) {
        return raw.trim()
                .replace("```json", "")
                .replace("```", "")
                .trim();
    }
}