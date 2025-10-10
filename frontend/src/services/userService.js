import api from "./api";

export const userService = {
    // Profile
    async getProfile() {
        const response = await api.get("/profile/me");
        return response.data;
    },

    async updateProfile(updateData) {
        const response = await api.put("/profile/update", updateData);
        return response.data;
    },

    // User search
    async searchUsers(query, page = 1, limit = 20) {
        const response = await api.get("/profile/search", {
            params: { q: query, page, limit },
        });
        return response.data;
    },

    // Online status
    async updateOnlineStatus(isOnline) {
        const response = await api.put("/profile/online-status", {
            is_online: isOnline,
        });
        return response.data;
    },
};
