import api from './api';

export const archiveService = {

    getAll: async (status = null) => {
        const params = status ? `?status=${status}` : '';
        const response = await api.get(`/api/users/me/archive${params}`);
        return response.data;
    },

    getDetail: async (sessionId) => {
        const response = await api.get(`/api/users/me/archive/${sessionId}`);
        return response.data;
    },
};