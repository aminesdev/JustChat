import { connectedUsers, getIO } from "../config/socket.js";
import { sendToConversation } from "../services/socketService.js";

export const setupUserHandlers = (socket) => {
    socket.on("get_online_users", async (callback) => {
        try {
            const onlineUsers = Array.from(connectedUsers.values()).map(
                (conn) => conn.user
            );

            if (typeof callback === "function") {
                callback({
                    success: true,
                    online_users: onlineUsers,
                });
            }
        } catch (error) {
            console.error("Error getting online users:", error);
            if (typeof callback === "function") {
                callback({
                    success: false,
                    error: "Failed to get online users",
                });
            }
        }
    });

    // Listen for profile updates
    socket.on("profile_updated", async (data, callback) => {
        try {
            const { full_name, avatar_url } = data;

            // Update user in connected users map
            const userConnection = connectedUsers.get(socket.userId);
            if (userConnection) {
                if (full_name) userConnection.user.full_name = full_name;
                if (avatar_url) userConnection.user.avatar_url = avatar_url;
                connectedUsers.set(socket.userId, userConnection);
            }

            // Notify all users about profile update
            getIO().emit("user_profile_updated", {
                user_id: socket.userId,
                user: userConnection?.user || socket.user,
                updated_at: new Date().toISOString(),
                updated_fields: {
                    full_name: !!full_name,
                    avatar_url: !!avatar_url,
                },
            });

            // Notify all conversations this user is part of
            const { conversationRepository } = await import(
                "../repositories/conversationRepository.js"
            );
            const conversations = await conversationRepository.findByUserId(
                socket.userId
            );

            conversations.forEach((conversation) => {
                sendToConversation(
                    conversation.id,
                    "conversation_user_updated",
                    {
                        conversation_id: conversation.id,
                        user_id: socket.userId,
                        user: userConnection?.user || socket.user,
                        updated_at: new Date().toISOString(),
                    }
                );
            });

            if (typeof callback === "function") {
                callback({
                    success: true,
                    message: "Profile update broadcasted",
                });
            }
        } catch (error) {
            console.error("Error broadcasting profile update:", error);
            if (typeof callback === "function") {
                callback({
                    success: false,
                    error: "Failed to broadcast profile update",
                });
            }
        }
    });
};
