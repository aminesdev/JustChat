import { create } from "zustand";
import { chatService } from "../services/chatService";
import { getErrorMessage } from "../utils/errorUtils";
import { sortConversations, getOtherUser } from "../utils/chatUtils";
import {
    processConversations,
    getProperLastMessage,
} from "../utils/conversationHelpers";

export const useConversationStore = create((set, get) => ({
    conversations: new Map(),
    conversationsList: [],
    currentConversationId: null,
    isLoading: false,
    error: null,
    hasLoadedConversations: false,

    loadConversations: async () => {
        if (get().isLoading || get().hasLoadedConversations) return;

        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (!accessToken || !refreshToken) {
            console.error("No tokens available for loading conversations");
            set({
                error: "Authentication required",
                hasLoadedConversations: true,
            });
            return;
        }

        set({ isLoading: true, error: null });
        try {
            const response = await chatService.getConversations();
            const conversations = response.data.data.conversations;

            const userStr = localStorage.getItem("user");
            const currentUserId = userStr ? JSON.parse(userStr).id : null;

            const processedConversations = processConversations(
                conversations,
                currentUserId
            );
            const sortedConversations = sortConversations(
                processedConversations
            );

            set((state) => {
                const newConversations = new Map(state.conversations);

                sortedConversations.forEach((conv) => {
                    newConversations.set(conv.id, conv);
                });

                return {
                    conversations: newConversations,
                    conversationsList: sortedConversations,
                    isLoading: false,
                    hasLoadedConversations: true,
                };
            });
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to load conversations";
            console.error("Failed to load conversations:", error);
            set({
                isLoading: false,
                error: errorMessage,
                hasLoadedConversations: true,
            });
        }
    },

    createConversation: async (user2Id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await chatService.createConversation(user2Id);
            const conversation = response.data.data.conversation;

            const userStr = localStorage.getItem("user");
            const currentUserId = userStr ? JSON.parse(userStr).id : null;

            const processedConversation = {
                ...conversation,
                unread_count: 0,
                has_unread_messages: false,
                last_message: getProperLastMessage(conversation),
            };

            set((state) => {
                const newConversations = new Map(state.conversations);
                newConversations.set(
                    processedConversation.id,
                    processedConversation
                );

                const conversationsList = sortConversations([
                    processedConversation,
                    ...state.conversationsList,
                ]);

                return {
                    conversations: newConversations,
                    conversationsList,
                    currentConversationId: processedConversation.id,
                    isLoading: false,
                };
            });

            return processedConversation;
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to create conversation";
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    getOrCreateConversation: async (user2Id) => {
        const userStr = localStorage.getItem("user");
        const currentUserId = userStr ? JSON.parse(userStr).id : null;

        if (!currentUserId) {
            throw new Error("User not authenticated");
        }

        const conversations = get().conversationsList;

        const existingConversation = conversations.find(
            (conv) =>
                (conv.user1.id === currentUserId &&
                    conv.user2.id === user2Id) ||
                (conv.user1.id === user2Id && conv.user2.id === currentUserId)
        );

        if (existingConversation) {
            set({ currentConversationId: existingConversation.id });
            return existingConversation;
        }

        return await get().createConversation(user2Id);
    },

    setCurrentConversation: (conversationId) => {
        set({ currentConversationId: conversationId });
    },

    updateConversationLastMessage: (conversationId, lastMessage) => {
        set((state) => {
            const conversation = state.conversations.get(conversationId);
            if (!conversation) return state;

            const updatedConversation = {
                ...conversation,
                last_message: lastMessage,
            };
            const newConversations = new Map(state.conversations);
            newConversations.set(conversationId, updatedConversation);

            const conversationsList = sortConversations([
                updatedConversation,
                ...state.conversationsList.filter(
                    (conv) => conv.id !== conversationId
                ),
            ]);

            return {
                conversations: newConversations,
                conversationsList,
            };
        });
    },

    markConversationAsRead: (conversationId) => {
        set((state) => {
            const conversation = state.conversations.get(conversationId);
            if (!conversation) return state;

            const updatedConversation = {
                ...conversation,
                unread_count: 0,
                has_unread_messages: false,
            };

            const newConversations = new Map(state.conversations);
            newConversations.set(conversationId, updatedConversation);

            const conversationsList = state.conversationsList.map((conv) =>
                conv.id === conversationId ? updatedConversation : conv
            );

            return {
                conversations: newConversations,
                conversationsList,
            };
        });
    },

    updateConversationOnNewMessage: (conversationId, message) => {
        const userStr = localStorage.getItem("user");
        const currentUserId = userStr ? JSON.parse(userStr).id : null;

        set((state) => {
            const conversation = state.conversations.get(conversationId);
            if (!conversation) return state;

            const isUnread =
                message.sender_id !== currentUserId &&
                !message.read_receipts?.some(
                    (receipt) => receipt.reader_id === currentUserId
                );

            const currentUnreadCount = conversation.unread_count || 0;
            const newUnreadCount = isUnread
                ? currentUnreadCount + 1
                : currentUnreadCount;

            const updatedConversation = {
                ...conversation,
                last_message: message,
                unread_count: newUnreadCount,
                has_unread_messages: newUnreadCount > 0,
            };

            const newConversations = new Map(state.conversations);
            newConversations.set(conversationId, updatedConversation);

            const conversationsList = sortConversations([
                updatedConversation,
                ...state.conversationsList.filter(
                    (conv) => conv.id !== conversationId
                ),
            ]);

            return {
                conversations: newConversations,
                conversationsList,
            };
        });
    },

    clearError: () => set({ error: null }),

    getCurrentConversation: () => {
        const state = get();
        return state.conversations.get(state.currentConversationId);
    },

    getConversationById: (conversationId) =>
        get().conversations.get(conversationId),

    getCurrentOtherUser: () => {
        const state = get();
        const conversation = state.conversations.get(
            state.currentConversationId
        );
        const userStr = localStorage.getItem("user");
        if (!userStr) return null;

        try {
            const currentUser = JSON.parse(userStr);
            return conversation
                ? getOtherUser(conversation, currentUser.id)
                : null;
        } catch (error) {
            console.error("Failed to parse user from localStorage:", error);
            return null;
        }
    },

    resetStore: () =>
        set({
            conversations: new Map(),
            conversationsList: [],
            currentConversationId: null,
            isLoading: false,
            error: null,
            hasLoadedConversations: false,
        }),
}));
