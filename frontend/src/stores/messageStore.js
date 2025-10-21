import { create } from "zustand";
import { chatService } from "../services/chatService";
import { useAuthStore } from "./authStore";
import { useConversationStore } from "./conversationStore";
import { getErrorMessage } from "../utils/errorUtils";
import { validateMessage, sanitizeMessage } from '@/utils/validationUtils';
import { groupMessagesByDate } from "../utils/chatUtils";

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
                        currentPage: page,
                    },
                });

                return {
                    messages: newMessages,
                    isLoading: false,
                };
            });
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to load messages";
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    sendMessage: async (conversationId, messageData) => {
        if (messageData.message_type === "TEXT") {
            const validationError = validateMessage(messageData.message_text);
            if (validationError) {
                throw new Error(validationError);
            }
        }

        const tempId = `temp-${Date.now()}`;
        const { user } = useAuthStore.getState();

        if (!user) {
            throw new Error("User not authenticated");
        }

        const sanitizedData = {
            ...messageData,
            message_text:
                messageData.message_type === "TEXT"
                    ? sanitizeMessage(messageData.message_text)
                    : messageData.message_text,
        };

        const optimisticMessage = {
            id: tempId,
            ...sanitizedData,
            conversation_id: conversationId,
            sender_id: user.id,
            sender: {
                id: user.id,
                email: user.email,
                full_name: user.full_name,
                avatar_url: user.avatar_url,
            },
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
                sanitizedData
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
            if (updateConversationLastMessage) {
                updateConversationLastMessage(conversationId, realMessage);
            }

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
                    error: getErrorMessage(error) || "Failed to send message",
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

                const { user } = useAuthStore.getState();
                if (!user) return state;

                const updatedMessages = conversationData.messages.map((msg) => {
                    if (msg.id === messageId) {
                        const existingReceipts = msg.read_receipts || [];
                        const alreadyRead = existingReceipts.some(
                            (receipt) => receipt.reader_id === user.id
                        );

                        if (!alreadyRead) {
                            return {
                                ...msg,
                                read_receipts: [
                                    ...existingReceipts,
                                    {
                                        reader_id: user.id,
                                        read_at: new Date().toISOString(),
                                        reader: {
                                            id: user.id,
                                            full_name: user.full_name,
                                        },
                                    },
                                ],
                            };
                        }
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
        return data?.pagination || { hasMore: true, currentPage: 1 };
    },

    getGroupedMessages: (conversationId) => {
        const messages = get().getMessages(conversationId);
        return groupMessagesByDate(messages);
    },
    resetStore: () =>
        set({
            messages: new Map(),
            isLoading: false,
            error: null,
        }),
}));
