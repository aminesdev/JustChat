const typingTimeouts = new Map();

export const setupTypingHandlers = (socket) => {
    socket.on("typing_start", (data) => {
        const { conversation_id } = data;

        if (conversation_id) {
            // Notify other users in the conversation
            socket.to(`conversation:${conversation_id}`).emit("user_typing", {
                conversation_id,
                user_id: socket.userId,
                user: socket.user,
                typing: true,
            });

            // Clear existing timeout
            if (typingTimeouts.has(conversation_id)) {
                clearTimeout(typingTimeouts.get(conversation_id));
            }

            // Set new timeout to automatically stop typing indicator
            const timeout = setTimeout(() => {
                socket
                    .to(`conversation:${conversation_id}`)
                    .emit("user_typing", {
                        conversation_id,
                        user_id: socket.userId,
                        user: socket.user,
                        typing: false,
                    });
                typingTimeouts.delete(conversation_id);
            }, 3000);

            typingTimeouts.set(conversation_id, timeout);
        }
    });

    socket.on("typing_stop", (data) => {
        const { conversation_id } = data;

        if (conversation_id) {
            // Clear timeout
            if (typingTimeouts.has(conversation_id)) {
                clearTimeout(typingTimeouts.get(conversation_id));
                typingTimeouts.delete(conversation_id);
            }

            // Notify other users
            socket.to(`conversation:${conversation_id}`).emit("user_typing", {
                conversation_id,
                user_id: socket.userId,
                user: socket.user,
                typing: false,
            });
        }
    });

    // Clean up timeouts on disconnect
    socket.on("disconnect", () => {
        typingTimeouts.forEach((timeout, conversationId) => {
            clearTimeout(timeout);
        });
        typingTimeouts.clear();
    });
};
