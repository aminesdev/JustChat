import { getIO, connectedUsers } from "../config/socket.js";
import {
    getUserSocket,
    sendToConversation,
} from "../services/socketService.js";

export const setupMessageHandlers = (socket) => {
    socket.on("send_message", async (data, callback) => {
        try {
            const {
                conversation_id,
                message_text,
                message_type = "TEXT",
                file_url,
            } = data;

            if (!conversation_id) {
                if (typeof callback === "function") {
                    callback({
                        success: false,
                        error: "Conversation ID is required",
                    });
                }
                return;
            }

            const { createMessageService } = await import(
                "../services/messageService.js"
            );

            const message = await createMessageService({
                conversation_id,
                sender_id: socket.userId,
                message_text,
                message_type,
                file_url,
            });

            // Get conversation participants
            const { conversationRepository } = await import(
                "../repositories/conversationRepository.js"
            );
            const conversation =
                await conversationRepository.findByIdWithAccess(
                    conversation_id,
                    socket.userId
                );

            const otherUserId =
                conversation.user1_id === socket.userId
                    ? conversation.user2_id
                    : conversation.user1_id;
            const isRecipientOnline = connectedUsers.has(otherUserId);

            // Emit to all users in the conversation room except sender
            socket.to(`conversation:${conversation_id}`).emit("new_message", {
                message,
                conversation_id,
                is_delivered: isRecipientOnline,
            });

            // Also emit to sender for consistency
            socket.emit("message_sent", {
                message,
                conversation_id,
                is_delivered: isRecipientOnline,
            });

            // Update delivery status if recipient is online
            if (isRecipientOnline) {
                const { messageRepository } = await import(
                    "../repositories/messageRepository.js"
                );
                await messageRepository.markAsDelivered(
                    conversation_id,
                    otherUserId
                );

                // Notify sender that message was delivered
                socket.emit("message_delivered", {
                    message_id: message.id,
                    conversation_id,
                    delivered_at: new Date().toISOString(),
                });
            }

            // Notify participants about new message (for sidebar updates)
            getIO().emit("conversation_updated", {
                conversation_id,
                last_message: message,
                updated_at: new Date().toISOString(),
                has_unread_messages: !isRecipientOnline,
            });

            if (typeof callback === "function") {
                callback({
                    success: true,
                    message: message,
                    is_delivered: isRecipientOnline,
                });
            }
        } catch (error) {
            console.error("Error sending message:", error);
            if (typeof callback === "function") {
                callback({
                    success: false,
                    error: error.message || "Failed to send message",
                });
            }
        }
    });

    socket.on("mark_as_read", async (data, callback) => {
        try {
            const { message_id, conversation_id } = data;

            if (!message_id || !conversation_id) {
                if (typeof callback === "function") {
                    callback({
                        success: false,
                        error: "Message ID and Conversation ID are required",
                    });
                }
                return;
            }

            const { markAsReadService } = await import(
                "../services/messageService.js"
            );

            const readReceipt = await markAsReadService(
                message_id,
                socket.userId
            );

            // Notify the sender that their message was read
            const senderSocket = getUserSocket(readReceipt.message.sender_id);
            if (senderSocket) {
                senderSocket.emit("message_read", {
                    message_id,
                    conversation_id,
                    read_by: socket.user,
                    read_at: readReceipt.read_at,
                });
            }

            if (typeof callback === "function") {
                callback({
                    success: true,
                    read_receipt: readReceipt,
                });
            }
        } catch (error) {
            console.error("Error marking message as read:", error);
            if (typeof callback === "function") {
                callback({
                    success: false,
                    error: error.message || "Failed to mark message as read",
                });
            }
        }
    });

    socket.on("mark_all_as_read", async (data, callback) => {
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

            const { markAllAsReadService } = await import(
                "../services/messageService.js"
            );

            const result = await markAllAsReadService(
                conversation_id,
                socket.userId
            );

            // Notify other participants in the conversation
            socket
                .to(`conversation:${conversation_id}`)
                .emit("all_messages_read", {
                    conversation_id,
                    read_by: socket.userId,
                    read_at: new Date().toISOString(),
                });

            if (typeof callback === "function") {
                callback({
                    success: true,
                    ...result,
                });
            }
        } catch (error) {
            console.error("Error marking all messages as read:", error);
            if (typeof callback === "function") {
                callback({
                    success: false,
                    error: error.message || "Failed to mark messages as read",
                });
            }
        }
    });

    // Real-time message editing
    socket.on("edit_message", async (data, callback) => {
        try {
            const { message_id, conversation_id, message_text } = data;

            if (!message_id || !conversation_id || !message_text) {
                if (typeof callback === "function") {
                    callback({
                        success: false,
                        error: "Message ID, Conversation ID, and message text are required",
                    });
                }
                return;
            }

            const { updateMessageService } = await import(
                "../services/messageService.js"
            );

            const updatedMessage = await updateMessageService(
                message_id,
                socket.userId,
                {
                    message_text: message_text.trim(),
                }
            );

            // Notify all participants in the conversation
            sendToConversation(conversation_id, "message_edited", {
                message: updatedMessage,
                conversation_id,
                edited_by: socket.userId,
                edited_at: new Date().toISOString(),
            });

            if (typeof callback === "function") {
                callback({
                    success: true,
                    message: updatedMessage,
                });
            }
        } catch (error) {
            console.error("Error editing message:", error);
            if (typeof callback === "function") {
                callback({
                    success: false,
                    error: error.message || "Failed to edit message",
                });
            }
        }
    });

    // Real-time message deletion
    socket.on("delete_message", async (data, callback) => {
        try {
            const { message_id, conversation_id } = data;

            if (!message_id || !conversation_id) {
                if (typeof callback === "function") {
                    callback({
                        success: false,
                        error: "Message ID and Conversation ID are required",
                    });
                }
                return;
            }

            const { deleteMessageService } = await import(
                "../services/messageService.js"
            );

            const result = await deleteMessageService(
                message_id,
                socket.userId
            );

            // Notify all participants in the conversation
            sendToConversation(conversation_id, "message_deleted", {
                message_id,
                conversation_id,
                deleted_by: socket.userId,
                deleted_at: new Date().toISOString(),
                deleted_message: result,
            });

            if (typeof callback === "function") {
                callback({
                    success: true,
                    message: result,
                });
            }
        } catch (error) {
            console.error("Error deleting message:", error);
            if (typeof callback === "function") {
                callback({
                    success: false,
                    error: error.message || "Failed to delete message",
                });
            }
        }
    });
};
