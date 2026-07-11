import api from './api';

export const evaluationService = {

    submitAnswer: async (sessionId, qnaId, answer) => {
        const response = await api.post(
            `/api/users/me/interviews/${sessionId}/questions/${qnaId}/answer`,
            { answer }
        );
        return response.data;
    },

    complete: async (sessionId) => {
        const response = await api.post(
            `/api/users/me/interviews/${sessionId}/complete`
        );
        return response.data;
    },

    getReport: async (sessionId) => {
        const response = await api.get(
            `/api/users/me/interviews/${sessionId}/report`
        );
        return response.data;
    },
};