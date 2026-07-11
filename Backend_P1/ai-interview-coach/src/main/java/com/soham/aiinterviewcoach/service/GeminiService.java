package com.soham.aiinterviewcoach.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.soham.aiinterviewcoach.dto.ai.*;
import com.soham.aiinterviewcoach.entity.SessionQna;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GeminiService {

    private final ChatClient.Builder chatClientBuilder;
    private final ObjectMapper objectMapper;

    // ============================================================
    // 1. JOB MATRIX ANALYSIS
    // ============================================================
    public JobAnalysisResponse analyzeJobDescription(
            String jobTitle,
            String jobDescription
    ) {
        String systemPrompt = """
                You are an expert technical recruiter and job market analyst.
                Analyze the provided job description and extract:
                1. A comma-separated list of required technical skills
                2. A 2-3 sentence strategic summary of what this role demands
                
                Respond ONLY in this exact JSON format, no markdown, no extra text:
                {
                    "skillsRequired": "skill1, skill2, skill3",
                    "analysisSummary": "Your summary here."
                }
                """;

        String userPrompt = """
                Job Title: %s
                
                Job Description:
                %s
                """.formatted(jobTitle, jobDescription);

        String raw = callGemini(systemPrompt, userPrompt);

        try {
            return objectMapper.readValue(sanitizeJson(raw), JobAnalysisResponse.class);
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Failed to parse AI job analysis response"
            );
        }
    }

    // ============================================================
    // 2. ADVERSARIAL QUESTION GENERATION
    // ============================================================
    public InterviewQuestionsResponse generateInterviewQuestions(
            String jobTitle,
            String skillsRequired,
            List<SessionQna> history,
            Long userId,
            int questionCount
    ) {
        String systemPrompt = """
                You are an adversarial senior technical interviewer.
                Generate exactly %d technical interview questions for the role described.
                
                Rules:
                - The questions must be specific to the job title and skills, not generic
                - Review the history of questions already asked to avoid repeating topics
                - Provide a clear topic tag for each question
                - No yes/no questions — must require detailed explanation
                
                Respond ONLY in this exact JSON format, no markdown, no extra text:
                {
                    "questions": [
                        {
                            "topic": "TOPIC_TAG",
                            "questionText": "Your question here?"
                        }
                    ]
                }
                """.formatted(questionCount);

        String historyText = history == null || history.isEmpty() ? "No previous questions." : 
                history.stream()
                        .map(q -> "Topic: " + q.getTopic() + ", Q: " + q.getQuestionText())
                        .reduce((a, b) -> a + "\n" + b)
                        .orElse("");

        String userPrompt = """
                Job Title: %s
                Required Skills: %s
                
                Previous Questions Asked (DO NOT REPEAT THESE TOPICS):
                %s
                """.formatted(jobTitle, skillsRequired, historyText);

        String raw = callGemini(systemPrompt, userPrompt);

        try {
            return objectMapper.readValue(sanitizeJson(raw), InterviewQuestionsResponse.class);
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Failed to parse AI question generation response"
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
                You are a senior software engineer conducting a technical interview.
                Evaluate the candidate's answer to the interview question.
                
                Score each dimension from 0.0 to 10.0:
                - technicalScore: accuracy and depth of technical knowledge
                - communicationScore: clarity, structure, and articulation
                - confidenceScore: assertiveness and certainty in the response
                - structureScore: logical flow and organization of the answer
                
                Also provide:
                - verdict: a 3-6 word uppercase summary
                - aiFeedback: 2-3 sentences of honest, constructive feedback
                - directives: exactly 3 specific improvement tips as an array
                
                Respond ONLY in this exact JSON format, no markdown, no extra text:
                {
                    "technicalScore": 8.5,
                    "communicationScore": 7.0,
                    "confidenceScore": 6.5,
                    "structureScore": 8.0,
                    "overallScore": 7.5,
                    "verdict": "STRONG ARCHITECTURAL REASONING",
                    "aiFeedback": "Your feedback here.",
                    "directives": [
                        "First improvement tip.",
                        "Second improvement tip.",
                        "Third improvement tip."
                    ]
                }
                """;

        String userPrompt = """
                Role being interviewed for: %s
                Topic: %s
                Question: %s
                
                Candidate's Answer:
                %s
                """.formatted(jobTitle, topic, question, userAnswer);

        String raw = callGemini(systemPrompt, userPrompt);

        try {
            return objectMapper.readValue(sanitizeJson(raw), MetricEvaluationResponse.class);
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Failed to parse AI evaluation response"
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
                You are a senior technical interview panel delivering a final verdict.
                Based on the interview performance data, generate a comprehensive
                post-interview diagnostic report.
                
                Respond ONLY in this exact JSON format, no markdown, no extra text:
                {
                    "executiveSummary": "2-3 sentence overall assessment.",
                    "strengths": ["strength1", "strength2"],
                    "weaknesses": ["weakness1", "weakness2"],
                    "recommendations": ["recommendation1", "recommendation2"],
                    "probability": "HIGH_CONF or MED_CONF or LOW_CONF",
                    "risk": "LOW_RISK or MED_RISK or HIGH_RISK"
                }
                """;

        String userPrompt = """
                Role: %s
                Overall Score: %d/100
                
                Per-Question Performance Log:
                %s
                """.formatted(jobTitle, overallScore, String.join("\n", questionSummaries));

        String raw = callGemini(systemPrompt, userPrompt);

        try {
            return objectMapper.readValue(sanitizeJson(raw), FinalReportResponse.class);
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Failed to parse AI final report response"
            );
        }
    }

    // ============================================================
    // PRIVATE UTILITIES
    // ============================================================
    private String callGemini(String systemPrompt, String userPrompt) {
        ChatClient chatClient = chatClientBuilder
                .defaultSystem(systemPrompt)
                .build();

        return chatClient
                .prompt()
                .user(userPrompt)
                .call()
                .content();
    }

    private String sanitizeJson(String raw) {
        return raw.trim()
                .replace("```json", "")
                .replace("```", "")
                .trim();
    }
}