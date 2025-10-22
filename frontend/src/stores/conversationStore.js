import { create } from "zustand";
import { chatService } from "../services/chatService";
import { getErrorMessage } from "../utils/errorUtils";
import { sortConversations, getOtherUser } from "../utils/chatUtils";
import {
    processConversations,
    getProperLastMessage,
} from "../utils/conversationHelpers";

// Helper function to get current user ID
const getCurrentUserId = () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr).id : null;
};

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
            console.log("🔄 Loading conversations from API...");
            const response = await chatService.getConversations();
            const conversations = response.data.data.conversations;

            // ADD DEBUG LOGGING
            console.log(
                "🔍 DEBUG - Raw conversations from backend:",
                conversations.map((c) => ({
                    id: c.id,
                    unread_count: c.unread_count,
                    has_unread_messages: c.has_unread_messages,
                    otherUser:
                        c.user1?.id === getCurrentUserId()
                            ? c.user2?.full_name
                            : c.user1?.full_name,
                }))
            );

            const currentUserId = getCurrentUserId();
            console.log("👤 Current user ID:", currentUserId);

            const processedConversations = processConversations(
                conversations,
                currentUserId
            );

            // ADD DEBUG LOGGING FOR PROCESSED CONVERSATIONS
            console.log(
                "🔍 DEBUG - Processed conversations:",
                processedConversations.map((c) => ({
                    id: c.id,
                    unread_count: c.unread_count,
                    has_unread_messages: c.has_unread_messages,
                    otherUser:
                        c.user1?.id === currentUserId
                            ? c.user2?.full_name
                            : c.user1?.full_name,
                }))
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
            console.error("❌ Failed to load conversations:", error);
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
            console.log("🔄 Creating conversation with user:", user2Id);
            const response = await chatService.createConversation(user2Id);
            const conversation = response.data.data.conversation;
            console.log("✅ Conversation created:", conversation);

            const currentUserId = getCurrentUserId();

            const processedConversation = {
                ...conversation,
                unread_count: 0,
                has_unread_messages: false,
                last_message: getProperLastMessage(conversation),
            };

            console.log(
                "🔄 Processed new conversation:",
                processedConversation
            );

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
        const currentUserId = getCurrentUserId();

        if (!currentUserId) {
            throw new Error("User not authenticated");
        }

        const conversations = get().conversationsList;
        console.log(
            "🔄 Checking existing conversations:",
            conversations.length
        );

        const existingConversation = conversations.find(
            (conv) =>
                (conv.user1.id === currentUserId &&
                    conv.user2.id === user2Id) ||
                (conv.user1.id === user2Id && conv.user2.id === currentUserId)
        );

        console.log("🔄 Existing conversation found:", existingConversation);

        if (existingConversation) {
            console.log(
                "✅ Using existing conversation:",
                existingConversation.id
            );
            set({ currentConversationId: existingConversation.id });
            return existingConversation;
        }

        console.log("🔄 No existing conversation, creating new one...");
        return await get().createConversation(user2Id);
    },

    setCurrentConversation: (conversationId) => {
        console.log("🔄 Setting current conversation:", conversationId);
        set({ currentConversationId: conversationId });
    },

    deleteConversation: async (conversationId) => {
        console.log("🔄 Deleting conversation:", conversationId);

        try {
            await chatService.deleteConversation(conversationId);

            // Remove conversation from local state
            set((state) => {
                const newConversations = new Map(state.conversations);
                newConversations.delete(conversationId);

                const conversationsList = state.conversationsList.filter(
                    (conv) => conv.id !== conversationId
                );

                // Clear current conversation if it was the deleted one
                const newCurrentConversationId =
                    state.currentConversationId === conversationId
                        ? null
                        : state.currentConversationId;

                return {
                    conversations: newConversations,
                    conversationsList,
                    currentConversationId: newCurrentConversationId,
                };
            });

            console.log("✅ Conversation deleted successfully");
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to delete conversation";
            console.error("❌ Failed to delete conversation:", error);
            throw new Error(errorMessage);
        }
    },

    markConversationAsRead: async (conversationId) => {
        console.log("🔄 Marking conversation as read:", conversationId);

        try {
            // Call the backend endpoint to mark all messages as read
            const response = await chatService.markAllAsRead(conversationId);
            const { unread_count, has_unread_messages } = response.data.data;

            console.log("✅ Backend marked conversation as read:", {
                unread_count,
                has_unread_messages,
            });

            // Force reload conversations to get fresh data from backend
            console.log(
                "🔄 Forcing conversation reload after marking as read..."
            );
            await get().loadConversations();
        } catch (error) {
            console.error("Failed to mark conversation as read:", error);

            // Even if backend fails, try to reload conversations to get current state
            try {
                console.log(
                    "🔄 Attempting to reload conversations after error..."
                );
                await get().loadConversations();
            } catch (reloadError) {
                console.error("Failed to reload conversations:", reloadError);
            }
        }
    },

    updateConversationLastMessage: (conversationId, lastMessage) => {
        console.log("🔄 Updating conversation last message:", {
            conversationId,
            lastMessage,
        });
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

    updateConversationOnNewMessage: (conversationId, message) => {
        const currentUserId = getCurrentUserId();

        console.log("🔄 Updating conversation on new message:", {
            conversationId,
            message,
            currentUserId,
        });

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

            console.log("🔄 Message unread status:", {
                isUnread,
                currentUnreadCount,
                newUnreadCount,
            });

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
        const conversation = state.conversations.get(
            state.currentConversationId
        );
        console.log("🔄 Getting current conversation:", conversation);
        return conversation;
    },

    getConversationById: (conversationId) => {
        const conversation = get().conversations.get(conversationId);
        console.log("🔄 Getting conversation by ID:", {
            conversationId,
            conversation,
        });
        return conversation;
    },

    getCurrentOtherUser: () => {
        const state = get();
        const conversation = state.conversations.get(
            state.currentConversationId
        );
        const currentUserId = getCurrentUserId();
        const otherUser = conversation
            ? getOtherUser(conversation, currentUserId)
            : null;
        console.log("🔄 Getting current other user:", otherUser);
        return otherUser;
    },

    resetStore: () => {
        console.log("🔄 Resetting conversation store");
        set({
            conversations: new Map(),
            conversationsList: [],
            currentConversationId: null,
            isLoading: false,
            error: null,
            hasLoadedConversations: false,
        });
    },
}));
