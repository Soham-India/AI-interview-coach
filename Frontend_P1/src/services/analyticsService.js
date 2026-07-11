import api from './api';

export const analyticsService = {

    getSummary: async () => {
        const response = await api.get('/api/users/me/analytics/summary');
        return response.data;
    },

    getSkills: async () => {
        const response = await api.get('/api/users/me/analytics/skills');
        return response.data;
    },

    getDistribution: async () => {
        const response = await api.get('/api/users/me/analytics/distribution');
        return response.data;
    },
};