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

    loadConversations: async () => {
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
                };
            });
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to load conversations";
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
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
        const existingConversation = get().conversationsList.find(
            (conv) => conv.user1_id === user2Id || conv.user2_id === user2Id
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
        const currentUserId = useAuthStore.getState().user?.id;
        return conversation ? getOtherUser(conversation, currentUserId) : null;
    },
}));
