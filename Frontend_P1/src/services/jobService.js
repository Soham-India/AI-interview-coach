import api from './api';

export const jobService = {

    create: async (data) => {
        const response = await api.post('/api/users/me/jobs', data);
        return response.data;
    },

    getAll: async () => {
        const response = await api.get('/api/users/me/jobs');
        return response.data;
    },

    getOne: async (jobProfileId) => {
        const response = await api.get(`/api/users/me/jobs/${jobProfileId}`);
        return response.data;
    },

    delete: async (jobProfileId) => {
        await api.delete(`/api/users/me/jobs/${jobProfileId}`);
    },
};

