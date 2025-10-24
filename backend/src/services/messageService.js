import { messageRepository } from "../repositories/messageRepository.js";
import { readReceiptRepository } from "../repositories/readReceiptRepository.js";
import { conversationRepository } from "../repositories/conversationRepository.js";

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
        is_delivered: false,
    });

    return message;
};

export const getMessagesService = async (
    conversation_id,
    user_id,
    page = 1,
    limit = 50
) => {
    page = Math.max(1, parseInt(page));
    limit = Math.min(Math.max(1, parseInt(limit)), 100);

    const conversation = await conversationRepository.findByIdWithAccess(
        conversation_id,
        user_id
    );
    if (!conversation) {
        throw new Error("CONVERSATION_NOT_FOUND_OR_ACCESS_DENIED");
    }

    const skip = (page - 1) * limit;

    try {
        const messages = await messageRepository.findByConversation(
            conversation_id,
            skip,
            limit
        );

        if (messages.length > 0) {
            try {
                await messageRepository.markAsDelivered(
                    conversation_id,
                    user_id
                );
            } catch (deliveryError) {
                console.error(
                    "Error marking messages as delivered:",
                    deliveryError
                );
            }
        }

        return messages.reverse();
    } catch (error) {
        console.error("Error in getMessagesService:", error);
        throw new Error("DATABASE_ERROR");
    }
};

export const getMessageService = async (message_id, user_id) => {
    const message = await messageRepository.findByIdWithAccess(
        message_id,
        user_id
    );
    if (!message) {
        throw new Error("MESSAGE_NOT_FOUND");
    }

    return message;
};

export const updateMessageService = async (message_id, user_id, updateData) => {
    const { message_text } = updateData;

    const existingMessage = await messageRepository.findByIdWithAccess(
        message_id,
        user_id
    );

    if (!existingMessage || existingMessage.sender_id !== user_id) {
        throw new Error("MESSAGE_NOT_FOUND_OR_NOT_EDITABLE");
    }

    if (existingMessage.message_type !== "TEXT") {
        throw new Error("ONLY_TEXT_MESSAGES_CAN_BE_EDITED");
    }

    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    if (existingMessage.created_at < fiveMinutesAgo) {
        throw new Error("MESSAGE_EDIT_TIMEOUT");
    }

    const updatedMessage = await messageRepository.update(message_id, {
        message_text,
    });

    return updatedMessage;
};

export const deleteMessageService = async (message_id, user_id) => {
    const existingMessage = await messageRepository.findByIdWithAccess(
        message_id,
        user_id
    );

    if (!existingMessage || existingMessage.sender_id !== user_id) {
        throw new Error("MESSAGE_NOT_FOUND_OR_NOT_DELETABLE");
    }

    if (existingMessage.message_type === "TEXT") {
        const deletedMessage = await messageRepository.update(message_id, {
            message_text: "This message was deleted",
            file_url: null,
            file_name: null,
            file_size: null,
            file_type: null,
        });
        return deletedMessage;
    } else {
        // For image messages, we keep the file info but mark as deleted
        const deletedMessage = await messageRepository.update(message_id, {
            message_text: "This image was deleted",
            file_url: null,
            file_name: null,
            file_size: null,
            file_type: null,
        });
        return deletedMessage;
    }
};

export const markAsReadService = async (message_id, user_id) => {
    const message = await messageRepository.findByIdWithAccess(
        message_id,
        user_id
    );

    if (!message) {
        throw new Error("MESSAGE_NOT_FOUND");
    }

    if (message.sender_id === user_id) {
        throw new Error("CANNOT_MARK_OWN_MESSAGE_READ");
    }

    const readReceipt = await readReceiptRepository.upsert({
        message_id,
        reader_id: user_id,
        read_at: new Date(),
    });

    return readReceipt;
};

export const getUnreadCountService = async (conversation_id, user_id) => {
    const conversation = await conversationRepository.findByIdWithAccess(
        conversation_id,
        user_id
    );

    if (!conversation) {
        throw new Error("CONVERSATION_NOT_FOUND_OR_ACCESS_DENIED");
    }

    try {
        const count = await messageRepository.countUnread(
            conversation_id,
            user_id
        );
        return { unread_count: count };
    } catch (error) {
        console.error("Error in getUnreadCountService:", error);
        throw new Error("DATABASE_ERROR");
    }
};

export const markAllAsReadService = async (conversation_id, user_id) => {
    const conversation = await conversationRepository.findByIdWithAccess(
        conversation_id,
        user_id
    );

    if (!conversation) {
        throw new Error("CONVERSATION_NOT_FOUND_OR_ACCESS_DENIED");
    }

    const result = await messageRepository.markAllAsRead(
        conversation_id,
        user_id
    );

    const unreadCount = await messageRepository.getUnreadCountAfterMark(
        conversation_id,
        user_id
    );

    return {
        marked_count: result.marked_count,
        unread_count: unreadCount,
        has_unread_messages: unreadCount > 0,
        conversation: {
            id: conversation_id,
            user1_id: conversation.user1_id,
            user2_id: conversation.user2_id,
        },
    };
};
