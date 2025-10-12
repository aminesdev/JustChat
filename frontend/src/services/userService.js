import api from "./api";

export const userService = {
    searchUsers: async (query, limit = 10) => {
        const response = await api.get("/users/search", {
            params: { q: query, limit },
        });
        return response;
    },

    getAllUsers: async (limit = 50) => {
        const response = await api.get("/users", {
            params: { limit },
        });
        return response;
    },

    getUserById: async (userId) => {
        const response = await api.get(`/users/${userId}`);
        return response;
    },

    getProfile: async () => {
        const response = await api.get("/profile/me");
        return response;
    },

    updateProfile: async (profileData) => {
        const response = await api.put("/profile/update", profileData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response;
    },

    updateOnlineStatus: async (isOnline) => {
        const response = await api.put("/users/online-status", {
            is_online: isOnline,
        });
        return response;
    },
};
