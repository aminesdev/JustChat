import { getIO } from "../config/socket.js";
import { sendToUser } from "../services/socketService.js";

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

    // Create conversation with real-time notification
    socket.on("create_conversation", async (data, callback) => {
        try {
            const { user2_id } = data;

            if (!user2_id) {
                if (typeof callback === "function") {
                    callback({
                        success: false,
                        error: "User ID is required",
                    });
                }
                return;
            }

            const { createConversationService } = await import(
                "../services/conversationService.js"
            );

            const conversation = await createConversationService(
                socket.userId,
                user2_id
            );

            // Notify both users about the new conversation
            getIO().emit("conversation_created", {
                conversation,
                created_by: socket.userId,
                created_at: new Date().toISOString(),
            });

            // Specifically notify the other user if they're online
            sendToUser(user2_id, "new_conversation", {
                conversation,
                created_by: socket.user,
            });

            if (typeof callback === "function") {
                callback({
                    success: true,
                    conversation,
                });
            }
        } catch (error) {
            console.error("Error creating conversation:", error);
            if (typeof callback === "function") {
                callback({
                    success: false,
                    error: error.message || "Failed to create conversation",
                });
            }
        }
    });

    // Delete conversation with real-time notification
    socket.on("delete_conversation", async (data, callback) => {
        try {
            const { conversation_id } = data;

            if (!conversation_id) {
                if (typeof callback === "function") {
                    callback({
                        success: false,
                        error: "Conversation ID is required",
                    });
                }
                return;
            }

            const { deleteConversationService, getConversationService } =
                await import("../services/conversationService.js");

            // Get conversation details before deletion
            const conversation = await getConversationService(
                conversation_id,
                socket.userId
            );

            await deleteConversationService(conversation_id, socket.userId);

            // Notify both users about the deleted conversation
            const otherUserId =
                conversation.user1_id === socket.userId
                    ? conversation.user2_id
                    : conversation.user1_id;

            getIO().emit("conversation_deleted", {
                conversation_id,
                deleted_by: socket.userId,
                deleted_at: new Date().toISOString(),
                participants: [socket.userId, otherUserId],
            });

            // Specifically notify the other user if they're online
            sendToUser(otherUserId, "conversation_deleted", {
                conversation_id,
                deleted_by: socket.user,
            });

            // Leave the conversation room
            socket.leave(`conversation:${conversation_id}`);
            joinedConversations.delete(conversation_id);

            if (typeof callback === "function") {
                callback({
                    success: true,
                    message: "Conversation deleted successfully",
                });
            }
        } catch (error) {
            console.error("Error deleting conversation:", error);
            if (typeof callback === "function") {
                callback({
                    success: false,
                    error: error.message || "Failed to delete conversation",
                });
            }
        }
    });

    // Clean up joined conversations on disconnect
    socket.on("disconnect", () => {
        joinedConversations.clear();
    });
};
