import api from './api';

export const quotaService = {
    getStatus: async () => {
        const response = await api.get('/api/quota/status');
        return response.data;
    },
};
