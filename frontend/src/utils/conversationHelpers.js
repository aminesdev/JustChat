// Helper function to calculate unread messages
export const calculateUnreadCount = (conversation, currentUserId) => {
    if (!conversation.messages || !currentUserId) return 0;

    return conversation.messages.filter(
        (message) =>
            message.sender_id !== currentUserId &&
            !message.read_receipts?.some(
                (receipt) => receipt.reader_id === currentUserId
            )
    ).length;
};

// Helper function to get the proper last message
export const getProperLastMessage = (conversation) => {
    if (conversation.last_message) {
        return conversation.last_message;
    }

    if (conversation.messages && conversation.messages.length > 0) {
        const sortedMessages = [...conversation.messages].sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        return sortedMessages[0];
    }

    return null;
};

// Process conversations for display
export const processConversations = (conversations, currentUserId) => {
    if (!Array.isArray(conversations)) return [];

    return conversations.map((conv) => {
        const unreadCount = calculateUnreadCount(conv, currentUserId);
        const hasUnreadMessages = unreadCount > 0;
        const lastMessage = getProperLastMessage(conv);

        return {
            ...conv,
            unread_count: unreadCount,
            has_unread_messages: hasUnreadMessages,
            last_message: lastMessage,
        };
    });
};
