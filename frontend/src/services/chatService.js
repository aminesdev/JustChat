import api from "./api";

export const chatService = {
    // Conversations
    getConversations: async () => {
        const response = await api.get("/conversations");
        return response;
    },

    createConversation: async (user2Id) => {
        const response = await api.post("/conversations", {
            user2_id: user2Id,
        });
        return response;
    },

    checkConversation: async (user2Id) => {
        const response = await api.get(`/conversations/check/${user2Id}`);
        return response;
    },

    getConversation: async (conversationId) => {
        const response = await api.get(`/conversations/${conversationId}`);
        return response;
    },

    getConversationParticipants: async (conversationId) => {
        const response = await api.get(
            `/conversations/${conversationId}/participants`
        );
        return response;
    },

    deleteConversation: async (conversationId) => {
        const response = await api.delete(`/conversations/${conversationId}`);
        return response;
    },

    // Messages
    getMessages: async (conversationId, page = 1, limit = 50) => {
        const response = await api.get(
            `/conversations/${conversationId}/messages`,
            {
                params: { page, limit },
            }
        );
        return response;
    },

    sendMessage: async (conversationId, messageData) => {
        const response = await api.post(
            `/conversations/${conversationId}/messages`,
            messageData
        );
        return response;
    },

    getMessage: async (conversationId, messageId) => {
        const response = await api.get(
            `/conversations/${conversationId}/messages/${messageId}`
        );
        return response;
    },

    updateMessage: async (conversationId, messageId, updateData) => {
        const response = await api.put(
            `/conversations/${conversationId}/messages/${messageId}`,
            updateData
        );
        return response;
    },

    deleteMessage: async (conversationId, messageId) => {
        const response = await api.delete(
            `/conversations/${conversationId}/messages/${messageId}`
        );
        return response;
    },

    markAsRead: async (conversationId, messageId) => {
        const response = await api.post(
            `/conversations/${conversationId}/messages/${messageId}/read`
        );
        return response;
    },

    getUnreadCount: async (conversationId) => {
        const response = await api.get(
            `/conversations/${conversationId}/unread-count`
        );
        return response;
    },
};
