export const setupConversationHandlers = (socket) => {
    const joinedConversations = new Set();

    socket.on("join_conversation", (conversationId) => {
        if (conversationId && !joinedConversations.has(conversationId)) {
            socket.join(`conversation:${conversationId}`);
            joinedConversations.add(conversationId);
            console.log(
                `User ${socket.userId} joined conversation ${conversationId}`
            );
        }
    });

    socket.on("leave_conversation", (conversationId) => {
        if (conversationId && joinedConversations.has(conversationId)) {
            socket.leave(`conversation:${conversationId}`);
            joinedConversations.delete(conversationId);
            console.log(
                `User ${socket.userId} left conversation ${conversationId}`
            );
        }
    });

    // Clean up joined conversations on disconnect
    socket.on("disconnect", () => {
        joinedConversations.clear();
    });
};
