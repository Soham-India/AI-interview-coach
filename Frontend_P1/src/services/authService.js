import api from './api'

export const authService = {

    register: async (data) =>{
        const response = await api.post('api/auth/register' , data);
        return response.data;
    },

    login: async (data) => {
        const response = await api.post('api/auth/login' ,data);
        return response.data;
    },
};