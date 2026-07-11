import api from './api';

export const userService = {

    getProfile: async () => {
        const response = await api.get('/api/users/me/profile');
        return response.data;
    },

    updateProfile: async (data) => {
        const response = await api.patch('/api/users/me/profile', data);
        return response.data;
    },

    getStats: async () => {
        const response = await api.get('/api/users/me/stats');
        return response.data;
    },

    getPreferences: async () => {
        const response = await api.get('/api/users/me/preferences');
        return response.data;
    },

    updatePreferences: async (data) => {
        const response = await api.patch('/api/users/me/preferences', data);
        return response.data;
    },
};