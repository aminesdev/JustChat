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
    // Remove user from connected users
    connectedUsers.delete(socket.userId);

    // Update user online status
    updateUserOnlineStatus(socket.userId, false);

    // Notify others that user went offline
    socket.broadcast.emit("user_offline", {
        user_id: socket.userId,
        timestamp: new Date().toISOString(),
    });
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
