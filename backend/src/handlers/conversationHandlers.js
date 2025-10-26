export const setupConversationHandlers = (socket) => {
    socket.on("join_conversation", (conversationId) => {
        if (conversationId) {
            socket.join(`conversation:${conversationId}`);
            console.log(
                `User ${socket.userId} joined conversation ${conversationId}`
            );
        }
    });

    socket.on("leave_conversation", (conversationId) => {
        if (conversationId) {
            socket.leave(`conversation:${conversationId}`);
            console.log(
                `User ${socket.userId} left conversation ${conversationId}`
            );
        }
    });
};
