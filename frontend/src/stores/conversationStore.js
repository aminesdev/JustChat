import { create } from "zustand";
import { chatService } from "../services/chatService";

export const useConversationStore = create((set, get) => ({
    // State
    conversations: new Map(), // conversationId -> conversation
    conversationsList: [], // Ordered list for UI
    currentConversationId: null,
    isLoading: false,
    error: null,

    // Actions - Conversation management
    loadConversations: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await chatService.getConversations();
            const conversations = response.data.conversations;

            set((state) => {
                const newConversations = new Map(state.conversations);
                const conversationsList = [];

                conversations.forEach((conv) => {
                    newConversations.set(conv.id, conv);
                    conversationsList.push(conv);
                });

                return {
                    conversations: newConversations,
                    conversationsList,
                    isLoading: false,
                };
            });
        } catch (error) {
            const errorMessage =
                error.response?.data?.msg || "Failed to load conversations";
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    createConversation: async (user2Id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await chatService.createConversation(user2Id);
            const conversation = response.data.conversation;

            set((state) => {
                const newConversations = new Map(state.conversations);
                newConversations.set(conversation.id, conversation);

                const conversationsList = [
                    conversation,
                    ...state.conversationsList,
                ];

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
                error.response?.data?.msg || "Failed to create conversation";
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    getOrCreateConversation: async (user2Id) => {
        // Check if conversation already exists
        const existingConversation = get().conversationsList.find(
            (conv) => conv.user1_id === user2Id || conv.user2_id === user2Id
        );

        if (existingConversation) {
            set({ currentConversationId: existingConversation.id });
            return existingConversation;
        }

        // Create new conversation
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

            // Reorder conversations list (most recent first)
            const conversationsList = state.conversationsList
                .filter((conv) => conv.id !== conversationId)
                .sort(
                    (a, b) =>
                        new Date(b.last_message?.created_at || b.created_at) -
                        new Date(a.last_message?.created_at || a.created_at)
                );

            return {
                conversations: newConversations,
                conversationsList: [updatedConversation, ...conversationsList],
            };
        });
    },

    // Utility actions
    clearError: () => set({ error: null }),

    // Selectors
    getCurrentConversation: () => {
        const state = get();
        return state.conversations.get(state.currentConversationId);
    },

    getConversationById: (conversationId) =>
        get().conversations.get(conversationId),
}));
