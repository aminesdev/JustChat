import api from "./api";

export const chatService = {
    // Conversations
    async createConversation(user2_id) {
        const response = await api.post("/conversations", { user2_id });
        return response.data;
    },

    async getUserConversations() {
        const response = await api.get("/conversations");
        return response.data;
    },

    async getConversation(conversationId) {
        const response = await api.get(`/conversations/${conversationId}`);
        return response.data;
    },

    async deleteConversation(conversationId) {
        const response = await api.delete(`/conversations/${conversationId}`);
        return response.data;
    },

    // Messages
    async sendMessage(conversationId, messageData) {
        const response = await api.post(
            `/conversations/${conversationId}/messages`,
            messageData
        );
        return response.data;
    },

    async getMessages(conversationId, page = 1, limit = 50) {
        const response = await api.get(
            `/conversations/${conversationId}/messages`,
            {
                params: { page, limit },
            }
        );
        return response.data;
    },

    async getMessage(messageId) {
        const response = await api.get(`/conversations/message/${messageId}`);
        return response.data;
    },

    async updateMessage(messageId, messageText) {
        const response = await api.put(`/conversations/message/${messageId}`, {
            message_text: messageText,
        });
        return response.data;
    },

    async deleteMessage(messageId) {
        const response = await api.delete(
            `/conversations/message/${messageId}`
        );
        return response.data;
    },

    async markAsRead(messageId) {
        const response = await api.post(
            `/conversations/message/${messageId}/read`
        );
        return response.data;
    },

    async getUnreadCount(conversationId) {
        const response = await api.get(
            `/conversations/${conversationId}/unread-count`
        );
        return response.data;
    },
};
