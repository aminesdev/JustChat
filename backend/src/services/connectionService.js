import { getIO } from "../config/socket.js";
import { SocketEvents } from "../config/constants.js";

// Store multiple connections per user
const userConnections = new Map(); // userId -> Set of socketIds
const socketToUser = new Map(); // socketId -> userId

export const connectionService = {
    // Add a connection for a user
    addConnection(userId, socketId, user) {
        if (!userConnections.has(userId)) {
            userConnections.set(userId, new Set());
        }

        userConnections.get(userId).add(socketId);
        socketToUser.set(socketId, userId);

        console.log(
            `User ${userId} connected with socket ${socketId}. Total connections: ${
                userConnections.get(userId).size
            }`
        );

        return {
            isFirstConnection: userConnections.get(userId).size === 1,
            connectionCount: userConnections.get(userId).size,
        };
    },

    // Remove a connection
    removeConnection(socketId) {
        const userId = socketToUser.get(socketId);

        if (!userId) {
            return { userId: null, isLastConnection: false };
        }

        const connections = userConnections.get(userId);
        if (connections) {
            connections.delete(socketId);

            const isLastConnection = connections.size === 0;

            if (isLastConnection) {
                userConnections.delete(userId);
            }

            console.log(
                `User ${userId} disconnected socket ${socketId}. Remaining connections: ${connections.size}`
            );

            socketToUser.delete(socketId);

            return {
                userId,
                isLastConnection,
                connectionCount: connections.size,
            };
        }

        socketToUser.delete(socketId);
        return { userId, isLastConnection: true, connectionCount: 0 };
    },

    // Check if user is online (has at least one connection)
    isUserOnline(userId) {
        const connections = userConnections.get(userId);
        return connections && connections.size > 0;
    },

    // Get all socket IDs for a user
    getUserSockets(userId) {
        const connections = userConnections.get(userId);
        return connections ? Array.from(connections) : [];
    },

    // Get socket instance for a user (returns first available)
    getUserSocket(userId) {
        const socketIds = this.getUserSockets(userId);
        if (socketIds.length === 0) return null;

        const io = getIO();
        return io.sockets.sockets.get(socketIds[0]);
    },

    // Get all socket instances for a user
    getAllUserSockets(userId) {
        const socketIds = this.getUserSockets(userId);
        const io = getIO();

        return socketIds
            .map((id) => io.sockets.sockets.get(id))
            .filter((socket) => socket !== undefined);
    },

    // Send event to all user's connections
    sendToUser(userId, event, data) {
        const sockets = this.getAllUserSockets(userId);
        sockets.forEach((socket) => socket.emit(event, data));
        return sockets.length > 0;
    },

    // Send event to a specific conversation
    sendToConversation(conversationId, event, data, excludeSocketId = null) {
        const io = getIO();
        const room = `conversation:${conversationId}`;

        if (excludeSocketId) {
            io.to(room).except(excludeSocketId).emit(event, data);
        } else {
            io.to(room).emit(event, data);
        }
    },

    // Get all online users
    getOnlineUsers() {
        return Array.from(userConnections.keys());
    },

    // Get connection info for a user
    getUserConnectionInfo(userId) {
        const connections = userConnections.get(userId);
        if (!connections) return null;

        return {
            userId,
            connectionCount: connections.size,
            isOnline: connections.size > 0,
            socketIds: Array.from(connections),
        };
    },

    // Get total connection count
    getTotalConnections() {
        let total = 0;
        userConnections.forEach((connections) => {
            total += connections.size;
        });
        return total;
    },

    // Get user ID from socket ID
    getUserIdFromSocket(socketId) {
        return socketToUser.get(socketId);
    },

    // Clear all connections (for cleanup/restart)
    clearAllConnections() {
        userConnections.clear();
        socketToUser.clear();
    },
};
