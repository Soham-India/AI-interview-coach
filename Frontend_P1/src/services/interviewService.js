import api from './api';

export const interviewService = {

    //need changes in the question count later
    start: async (jobProfileId, questionCount = 5) => {
        const response = await api.post('/api/users/me/interviews/start', {
            jobProfileId,
            questionCount,
        });
        return response.data;
    },

    getSession: async (sessionId) => {
        const response = await api.get(`/api/users/me/interviews/${sessionId}`);
        return response.data;
    },

    getNextQuestion: async (sessionId) => {
        const response = await api.post(
            `/api/users/me/interviews/${sessionId}/next-question`
        );
        return response.data;
    },

    updateElapsedTime: async (sessionId, seconds) => {
        await api.patch(
            `/api/users/me/interviews/${sessionId}/elapsed-time?seconds=${seconds}`
        );
    },

    terminate: async (sessionId) => {
        await api.patch(`/api/users/me/interviews/${sessionId}/terminate`);
    },
};