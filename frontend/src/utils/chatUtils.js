import { formatMessageTime } from "./dateUtils";

// Sort conversations by last message time or creation time
export const sortConversations = (conversations) => {
    if (!Array.isArray(conversations)) return [];

    return [...conversations].sort((a, b) => {
        const aTime = a.last_message?.created_at || a.created_at;
        const bTime = b.last_message?.created_at || b.created_at;

        if (!aTime || !bTime) return 0;

        return new Date(bTime).getTime() - new Date(aTime).getTime();
    });
};

// Get the other user in a conversation
export const getOtherUser = (conversation, currentUserId) => {
    if (!conversation || !currentUserId) return null;

    const { user1, user2 } = conversation;

    if (!user1 || !user2) return null;

    return user1.id === currentUserId ? user2 : user1;
};

// Group messages by date
export const groupMessagesByDate = (messages) => {
    if (!Array.isArray(messages)) return {};

    const groups = {};

    messages.forEach((message) => {
        if (!message?.created_at) return;

        try {
            const date = new Date(message.created_at).toDateString();
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(message);
        } catch (error) {
            console.error("Error grouping message by date:", error);
        }
    });

    return groups;
};

// Check if user is online
export const isUserOnline = (user, onlineUsers) => {
    if (!user) return false;

    return user.is_online === true || (onlineUsers && onlineUsers.has(user.id));
};

// Format conversation preview
export const getConversationPreview = (conversation, currentUserId) => {
    if (!conversation) return "No messages yet";

    const { last_message } = conversation;

    if (!last_message) return "No messages yet";

    const isCurrentUser = last_message.sender_id === currentUserId;
    const prefix = isCurrentUser ? "You: " : "";

    if (last_message.message_type === "IMAGE") {
        return `${prefix}📷 Image`;
    }

    // Handle deleted messages
    if (last_message.message_text === "This message was deleted") {
        return `${prefix}🗑️ Message deleted`;
    }

    const preview = last_message.message_text || "Message";
    return `${prefix}${
        preview.length > 30 ? preview.substring(0, 30) + "..." : preview
    }`;
};

// Check if message is from current user
export const isOwnMessage = (message, currentUserId) => {
    return message?.sender_id === currentUserId;
};

// Format message timestamp for display
export const formatMessageTimestamp = (timestamp) => {
    if (!timestamp) return "";

    try {
        return formatMessageTime(timestamp);
    } catch (error) {
        console.error("Error formatting timestamp:", error);
        return "";
    }
};
