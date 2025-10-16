import { create } from "zustand";
import { chatService } from "../services/chatService";
import { getErrorMessage } from "../utils/errorUtils";
import { sortConversations, getOtherUser } from "../utils/chatUtils";

export const useConversationStore = create((set, get) => ({
    conversations: new Map(),
    conversationsList: [],
    currentConversationId: null,
    isLoading: false,
    error: null,
    hasLoadedConversations: false, // Add flag to prevent multiple loads

    loadConversations: async () => {
        // Prevent multiple simultaneous loads
        if (get().isLoading || get().hasLoadedConversations) return;

        // Check if we have tokens before making the request
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

            const sortedConversations = sortConversations(conversations);

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
            // Don't throw error here to prevent infinite loop
        }
    },

    createConversation: async (user2Id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await chatService.createConversation(user2Id);
            const conversation = response.data.data.conversation;

            set((state) => {
                const newConversations = new Map(state.conversations);
                newConversations.set(conversation.id, conversation);

                const conversationsList = sortConversations([
                    conversation,
                    ...state.conversationsList,
                ]);

                return {
                    conversations: newConversations,
                    conversationsList,
                    currentConversationId: conversation.id,
                    isLoading: false,
                };
            });

            return conversation;
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to create conversation";
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    getOrCreateConversation: async (user2Id) => {
        // Get conversations from current state
        const conversations = get().conversationsList;

        // Check if conversation already exists
        const existingConversation = conversations.find(
            (conv) => conv.user1_id === user2Id || conv.user2_id === user2Id
        );

        if (existingConversation) {
            set({ currentConversationId: existingConversation.id });
            return existingConversation;
        }

        // Create new conversation if it doesn't exist
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
        // Get current user ID from localStorage to avoid circular dependency
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
