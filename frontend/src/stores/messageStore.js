import { create } from "zustand";
import { chatService } from "../services/chatService";
import { useAuthStore } from "./authStore";

export const useMessageStore = create((set, get) => ({
    messages: new Map(),
    isLoading: false,
    error: null,

    loadMessages: async (conversationId, page = 1, limit = 50) => {
        set({ isLoading: true, error: null });
        try {
            const response = await chatService.getMessages(
                conversationId,
                page,
                limit
            );
            const { messages, pagination } = response.data.data;

            set((state) => {
                const existingData = state.messages.get(conversationId) || {
                    messages: [],
                    pagination: {},
                };
                const existingMessages = existingData.messages;

                const messageMap = new Map();
                [...existingMessages, ...messages].forEach((msg) =>
                    messageMap.set(msg.id, msg)
                );
                const mergedMessages = Array.from(messageMap.values()).sort(
                    (a, b) => new Date(a.created_at) - new Date(b.created_at)
                );

                const newMessages = new Map(state.messages);
                newMessages.set(conversationId, {
                    messages: mergedMessages,
                    pagination: {
                        ...pagination,
                        hasMore: messages.length === limit,
                    },
                });

                return {
                    messages: newMessages,
                    isLoading: false,
                };
            });
        } catch (error) {
            const errorMessage =
                error.response?.data?.msg || "Failed to load messages";
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    sendMessage: async (conversationId, messageData) => {
        const tempId = `temp-${Date.now()}`;
        const { user } = useAuthStore.getState();

        const optimisticMessage = {
            id: tempId,
            ...messageData,
            conversation_id: conversationId,
            sender_id: user.id,
            sender: user,
            created_at: new Date().toISOString(),
            is_delivered: false,
            is_optimistic: true,
            read_receipts: [],
        };

        set((state) => {
            const existingData = state.messages.get(conversationId) || {
                messages: [],
                pagination: {},
            };
            const newMessages = new Map(state.messages);
            newMessages.set(conversationId, {
                ...existingData,
                messages: [...existingData.messages, optimisticMessage],
            });

            return { messages: newMessages };
        });

        try {
            const response = await chatService.sendMessage(
                conversationId,
                messageData
            );
            const realMessage = response.data.data.message;

            set((state) => {
                const existingData = state.messages.get(conversationId) || {
                    messages: [],
                    pagination: {},
                };
                const filteredMessages = existingData.messages.filter(
                    (msg) => msg.id !== tempId
                );

                const newMessages = new Map(state.messages);
                newMessages.set(conversationId, {
                    ...existingData,
                    messages: [...filteredMessages, realMessage],
                });

                return { messages: newMessages };
            });

            const { updateConversationLastMessage } =
                useConversationStore.getState();
            updateConversationLastMessage(conversationId, realMessage);

            return realMessage;
        } catch (error) {
            set((state) => {
                const existingData = state.messages.get(conversationId) || {
                    messages: [],
                    pagination: {},
                };
                const filteredMessages = existingData.messages.filter(
                    (msg) => msg.id !== tempId
                );

                const newMessages = new Map(state.messages);
                newMessages.set(conversationId, {
                    ...existingData,
                    messages: filteredMessages,
                });

                return {
                    messages: newMessages,
                    error:
                        error.response?.data?.msg || "Failed to send message",
                };
            });
            throw error;
        }
    },

    markMessageAsRead: async (conversationId, messageId) => {
        try {
            await chatService.markAsRead(conversationId, messageId);

            set((state) => {
                const conversationData = state.messages.get(conversationId);
                if (!conversationData) return state;

                const updatedMessages = conversationData.messages.map((msg) => {
                    if (msg.id === messageId) {
                        const { user } = useAuthStore.getState();
                        return {
                            ...msg,
                            read_receipts: [
                                ...(msg.read_receipts || []),
                                {
                                    reader_id: user.id,
                                    read_at: new Date().toISOString(),
                                },
                            ],
                        };
                    }
                    return msg;
                });

                const newMessages = new Map(state.messages);
                newMessages.set(conversationId, {
                    ...conversationData,
                    messages: updatedMessages,
                });

                return { messages: newMessages };
            });
        } catch (error) {
            console.error("Failed to mark message as read:", error);
        }
    },

    addMessage: (conversationId, message) => {
        set((state) => {
            const existingData = state.messages.get(conversationId) || {
                messages: [],
                pagination: {},
            };
            const messageExists = existingData.messages.some(
                (msg) => msg.id === message.id
            );

            if (messageExists) return state;

            const newMessages = new Map(state.messages);
            newMessages.set(conversationId, {
                ...existingData,
                messages: [...existingData.messages, message],
            });

            return { messages: newMessages };
        });
    },

    clearMessages: (conversationId) => {
        set((state) => {
            const newMessages = new Map(state.messages);
            newMessages.delete(conversationId);
            return { messages: newMessages };
        });
    },

    clearError: () => set({ error: null }),

    getMessages: (conversationId) => {
        const data = get().messages.get(conversationId);
        return data?.messages || [];
    },

    getPagination: (conversationId) => {
        const data = get().messages.get(conversationId);
        return data?.pagination || { hasMore: true };
    },
}));
