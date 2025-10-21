export const formatConversationTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
    } else {
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    }
};

export const getUnreadBadge = (conversation) => {
    if (!conversation.unread_count || conversation.unread_count === 0)
        return null;

    const count = conversation.unread_count;
    const displayCount = count > 99 ? "99+" : count;

    return (
        <div className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-1 min-w-5 h-5 flex items-center justify-center">
            {displayCount}
        </div>
    );
};
