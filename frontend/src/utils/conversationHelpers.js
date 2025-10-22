// Helper function to calculate unread messages
export const calculateUnreadCount = (conversation, currentUserId) => {
    console.log("🔄 Calculating unread count:", {
        conversationId: conversation.id,
        currentUserId,
        hasMessages: !!conversation.messages,
        messagesCount: conversation.messages?.length,
    });

    if (!conversation.messages || !currentUserId) {
        console.log("❌ No messages or current user ID, returning 0");
        return 0;
    }

    const unreadMessages = conversation.messages.filter((message) => {
        const isFromOtherUser = message.sender_id !== currentUserId;
        const isRead = message.read_receipts?.some(
            (receipt) => receipt.reader_id === currentUserId
        );
        const isUnread = isFromOtherUser && !isRead;

        console.log("📨 Message analysis:", {
            messageId: message.id,
            sender: message.sender_id,
            isFromOtherUser,
            isRead,
            isUnread,
        });

        return isUnread;
    });

    console.log("✅ Unread messages count:", unreadMessages.length);
    return unreadMessages.length;
};

// Helper function to get the proper last message
export const getProperLastMessage = (conversation) => {
    console.log(
        "🔄 Getting proper last message for conversation:",
        conversation.id
    );

    if (conversation.last_message) {
        console.log(
            "✅ Using conversation.last_message:",
            conversation.last_message
        );
        return conversation.last_message;
    }

    if (conversation.messages && conversation.messages.length > 0) {
        const sortedMessages = [...conversation.messages].sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        const lastMessage = sortedMessages[0];
        console.log(
            "✅ Using latest message from messages array:",
            lastMessage
        );
        return lastMessage;
    }

    console.log("❌ No last message found");
    return null;
};

// Process conversations for display
export const processConversations = (conversations, currentUserId) => {
    console.log("🔄 Processing conversations:", {
        inputCount: conversations.length,
        currentUserId,
    });

    if (!Array.isArray(conversations)) {
        console.log("❌ conversations is not an array");
        return [];
    }

    const processed = conversations.map((conv) => {
        // Use backend-provided unread counts if available
        const backendUnreadCount = conv.unread_count || 0;
        const backendHasUnread = conv.has_unread_messages || false;

        // Only calculate locally if backend doesn't provide the data
        const unreadCount = backendUnreadCount >= 0 ? backendUnreadCount : calculateUnreadCount(conv, currentUserId);
        const hasUnreadMessages = backendHasUnread !== undefined ? backendHasUnread : unreadCount > 0;
        const lastMessage = getProperLastMessage(conv);

        const result = {
            ...conv,
            unread_count: unreadCount,
            has_unread_messages: hasUnreadMessages,
            last_message: lastMessage,
        };

        console.log("📊 Processed conversation:", {
            id: result.id,
            otherUser: result.user1?.id === currentUserId ? result.user2?.full_name : result.user1?.full_name,
            backendUnreadCount,
            backendHasUnread,
            finalUnreadCount: result.unread_count,
            finalHasUnread: result.has_unread_messages,
        });

        return result;
    });

    return processed;
};
