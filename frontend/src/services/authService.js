import api from "./api";

export const authService = {
    login: async (credentials) => {
        const response = await api.post("/auth/login", credentials);
        return response;
    },

    signup: async (userData) => {
        const response = await api.post("/auth/signup", userData);
        return response;
    },

    refreshToken: async (tokenData) => {
        const response = await api.post("/auth/refresh-token", tokenData);
        return response;
    },

    logout: async (tokenData) => {
        const response = await api.post("/auth/logout", tokenData);
        return response;
    },

    logoutAll: async () => {
        const response = await api.post("/auth/logout-all");
        return response;
    },
};
