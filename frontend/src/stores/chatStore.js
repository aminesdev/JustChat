import { create } from "zustand";

export const useChatStore = create((set, get) => ({
    // State
    conversations: [],
    activeConversation: null,
    messages: [],
    onlineUsers: new Set(),
    typingUsers: new Set(),

    // Actions - Conversations
    setConversations: (conversations) => set({ conversations }),
    addConversation: (conversation) =>
        set((state) => ({
            conversations: [conversation, ...state.conversations],
        })),
    setActiveConversation: (conversation) =>
        set({ activeConversation: conversation }),

    // Actions - Messages
    setMessages: (messages) => set({ messages }),
    addMessage: (message) =>
        set((state) => ({
            messages: [...state.messages, message],
        })),
    updateMessage: (messageId, updates) =>
        set((state) => ({
            messages: state.messages.map((msg) =>
                msg.id === messageId ? { ...msg, ...updates } : msg
            ),
        })),
    deleteMessage: (messageId) =>
        set((state) => ({
            messages: state.messages.filter((msg) => msg.id !== messageId),
        })),

    // Actions - Real-time
    setOnlineUsers: (userIds) => set({ onlineUsers: new Set(userIds) }),
    addOnlineUser: (userId) =>
        set((state) => ({
            onlineUsers: new Set([...state.onlineUsers, userId]),
        })),
    removeOnlineUser: (userId) =>
        set((state) => ({
            onlineUsers: new Set(
                [...state.onlineUsers].filter((id) => id !== userId)
            ),
        })),

    // Actions - Typing indicators
    addTypingUser: (userId) =>
        set((state) => ({
            typingUsers: new Set([...state.typingUsers, userId]),
        })),
    removeTypingUser: (userId) =>
        set((state) => ({
            typingUsers: new Set(
                [...state.typingUsers].filter((id) => id !== userId)
            ),
        })),
    clearTypingUsers: () => set({ typingUsers: new Set() }),

    // Getters
    getUnreadCount: (conversationId) => {
        const state = get();
        return state.messages.filter(
            (msg) =>
                msg.conversation_id === conversationId &&
                !msg.read_receipts?.some(
                    (receipt) => receipt.reader_id === state.user?.id
                )
        ).length;
    },
}));
