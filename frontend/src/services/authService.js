import api from "./api";

export const authService = {
    // Sign up new user
    async signup(userData) {
        const response = await api.post("/auth/signup", userData);
        return response.data;
    },

    // Login user
    async login(credentials) {
        const response = await api.post("/auth/login", credentials);
        return response.data;
    },

    // Refresh access token
    async refreshToken(refreshToken) {
        const response = await api.post("/auth/refresh-token", {
            refreshToken,
        });
        return response.data;
    },

    // Logout user
    async logout(refreshToken) {
        const response = await api.post("/auth/logout", { refreshToken });
        return response.data;
    },

    // Logout from all devices
    async logoutAll() {
        const response = await api.post("/auth/logout-all");
        return response.data;
    },
};
