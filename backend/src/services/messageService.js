import { messageRepository } from "../repositories/messageRepository.js";
import { readReceiptRepository } from "../repositories/readReceiptRepository.js";
import { conversationRepository } from "../repositories/conversationRepository.js";
import { connectedUsers } from "../config/socket.js";
import { sendToUser } from "./socketService.js";

export const createMessageService = async (messageData) => {
    const {
        conversation_id,
        sender_id,
        message_type,
        message_text,
        file_url,
        file_name,
        file_size,
        file_type,
    } = messageData;

    const conversation = await conversationRepository.findByIdWithAccess(
        conversation_id,
        sender_id
    );
    if (!conversation) {
        throw new Error("CONVERSATION_NOT_FOUND_OR_ACCESS_DENIED");
    }

    // Validate message content based on type
    if (message_type === "TEXT") {
        if (!message_text || message_text.trim() === "") {
            throw new Error("MESSAGE_TEXT_REQUIRED");
        }
        if (file_url) {
            throw new Error("TEXT_MESSAGES_CANNOT_HAVE_FILE_URL");
        }
    } else if (message_type === "IMAGE") {
        if (!file_url) {
            throw new Error("FILE_URL_REQUIRED");
        }
    } else {
        throw new Error("INVALID_MESSAGE_TYPE");
    }

    const message = await messageRepository.create({
        conversation_id,
        sender_id,
        message_type: message_type || "TEXT",
        message_text: message_text?.trim(),
        file_url,
        file_name,
        file_size,
        file_type,
        is_delivered: false, // Will be updated in real-time if recipient is online
    });

    // Check if recipient is online and update delivery status immediately
    const otherUserId =
        conversation.user1_id === sender_id
            ? conversation.user2_id
            : conversation.user1_id;
    const isRecipientOnline = connectedUsers.has(otherUserId);

    if (isRecipientOnline) {
        // Mark as delivered immediately
        await messageRepository.markAsDelivered(conversation_id, otherUserId);

        // Update the message object to reflect delivery status
        message.is_delivered = true;
        message.delivered_at = new Date();
    }

    return message;
};

// ... rest of your existing messageService.js code remains the same ...
// (getMessagesService, getMessageService, updateMessageService, deleteMessageService, etc.)
