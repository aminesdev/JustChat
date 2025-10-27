import { connectedUsers, getIO } from "../config/socket.js";
import { updateOnlineStatusService } from "./userService.js";

export const updateUserOnlineStatus = async (userId, isOnline) => {
    try {
        await updateOnlineStatusService(userId, isOnline);
    } catch (error) {
        console.error("Error updating user online status:", error);
    }
};

export const handleUserDisconnect = (socket) => {
    // Only remove user if this is their current socket
    const currentConnection = connectedUsers.get(socket.userId);
    if (currentConnection && currentConnection.socketId === socket.id) {
        // Remove user from connected users
        connectedUsers.delete(socket.userId);

        // Update user online status
        updateUserOnlineStatus(socket.userId, false);

        // Notify others that user went offline
        socket.broadcast.emit("user_offline", {
            user_id: socket.userId,
            timestamp: new Date().toISOString(),
        });

        console.log(
            `User ${socket.userId} fully disconnected and marked offline`
        );
    } else {
        console.log(
            `User ${socket.userId} disconnected old socket ${socket.id}, keeping new connection active`
        );
    }
};

export const getUserSocket = (userId) => {
    const userConnection = connectedUsers.get(userId);
    return userConnection
        ? getIO().sockets.sockets.get(userConnection.socketId)
        : null;
};

export const sendToUser = (userId, event, data) => {
    const userSocket = getUserSocket(userId);
    if (userSocket) {
        userSocket.emit(event, data);
        return true;
    }
    return false;
};

export const sendToConversation = (
    conversationId,
    event,
    data,
    excludeSender = null
) => {
    const io = getIO();
    if (excludeSender) {
        io.to(`conversation:${conversationId}`)
            .except(excludeSender)
            .emit(event, data);
    } else {
        io.to(`conversation:${conversationId}`).emit(event, data);
    }
};

export const getConnectedUsers = () => {
    return Array.from(connectedUsers.values()).map((conn) => conn.user);
};

export const isUserConnected = (userId) => {
    return connectedUsers.has(userId);
};

export const getUserConnectionInfo = (userId) => {
    return connectedUsers.get(userId);
};

// Send offline notifications when user comes online
export const sendPendingNotifications = async (userId) => {
    try {
        const { conversationRepository } = await import(
            "../repositories/conversationRepository.js"
        );
        const conversations = await conversationRepository.findByUserId(userId);

        const userSocket = getUserSocket(userId);
        if (userSocket && conversations.length > 0) {
            userSocket.emit("pending_conversations", {
                conversations,
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        console.error("Error sending pending notifications:", error);
    }
};

// Check and send delivery status for pending messages
export const checkPendingDeliveries = async (userId) => {
    try {
        const { messageRepository } = await import(
            "../repositories/messageRepository.js"
        );
        const { conversationRepository } = await import(
            "../repositories/conversationRepository.js"
        );

        // Get all conversations for the user
        const conversations = await conversationRepository.findByUserId(userId);

        for (const conversation of conversations) {
            // Mark all undelivered messages as delivered
            const updatedCount = await messageRepository.markAsDelivered(
                conversation.id,
                userId
            );

            if (updatedCount > 0) {
                // Notify senders that their messages were delivered
                const undeliveredMessages =
                    await messageRepository.findByConversation(
                        conversation.id,
                        0,
                        100
                    );
                const deliveredMessages = undeliveredMessages.filter(
                    (msg) => msg.sender_id !== userId && !msg.is_delivered
                );

                for (const message of deliveredMessages) {
                    const senderSocket = getUserSocket(message.sender_id);
                    if (senderSocket) {
                        senderSocket.emit("message_delivered", {
                            message_id: message.id,
                            conversation_id: conversation.id,
                            delivered_at: new Date().toISOString(),
                        });
                    }
                }
            }
        }
    } catch (error) {
        console.error("Error checking pending deliveries:", error);
    }
};
