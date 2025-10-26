import { getIO } from "../config/socket.js";

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

            // Emit to all users in the conversation room except sender
            socket.to(`conversation:${conversation_id}`).emit("new_message", {
                message,
                conversation_id,
            });

            // Also emit to sender for consistency
            socket.emit("message_sent", {
                message,
                conversation_id,
            });

            // Notify participants about new message (for sidebar updates)
            getIO().emit("conversation_updated", {
                conversation_id,
                last_message: message,
                updated_at: new Date().toISOString(),
            });

            if (typeof callback === "function") {
                callback({
                    success: true,
                    message: message,
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
};
