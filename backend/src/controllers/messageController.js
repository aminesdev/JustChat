import {
    createMessageService,
    getMessagesService,
    getMessageService,
    updateMessageService,
    deleteMessageService,
    markAsReadService,
    getUnreadCountService,
} from "../services/messageService.js";
import { successResponse, createdResponse } from "../utils/responseHandler.js";
import { handleMessageError } from "../utils/errorHandler.js";

export const createMessage = async (req, res) => {
    try {
        const sender_id = req.user.userId;
        const { conversation_id } = req.params;
        const { message_text, message_type = "TEXT", file_url } = req.body;

        const message = await createMessageService({
            conversation_id,
            sender_id,
            message_text,
            message_type,
            file_url,
        });

        createdResponse(res, "Message sent successfully", {
            message,
        });
    } catch (error) {
        handleMessageError(res, error);
    }
};

export const getMessages = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const { conversation_id } = req.params;
        const { page = 1, limit = 50 } = req.query;

        const messages = await getMessagesService(
            conversation_id,
            user_id,
            parseInt(page),
            parseInt(limit)
        );

        successResponse(res, "Messages retrieved successfully", {
            messages,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: messages.length,
            },
        });
    } catch (error) {
        handleMessageError(res, error);
    }
};

export const getMessage = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const { message_id } = req.params;

        const message = await getMessageService(message_id, user_id);

        successResponse(res, "Message retrieved successfully", {
            message,
        });
    } catch (error) {
        handleMessageError(res, error);
    }
};

export const updateMessage = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const { message_id } = req.params;
        const { message_text } = req.body;

        if (!message_text || message_text.trim() === "") {
            return res.status(400).json({
                success: false,
                msg: "Message text cannot be empty",
            });
        }

        const updatedMessage = await updateMessageService(message_id, user_id, {
            message_text: message_text.trim(),
        });

        successResponse(res, "Message updated successfully", {
            message: updatedMessage,
        });
    } catch (error) {
        handleMessageError(res, error);
    }
};

export const deleteMessage = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const { message_id } = req.params;

        const result = await deleteMessageService(message_id, user_id);

        successResponse(res, "Message deleted successfully", {
            result,
        });
    } catch (error) {
        handleMessageError(res, error);
    }
};

export const markAsRead = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const { message_id } = req.params;

        const readReceipt = await markAsReadService(message_id, user_id);

        successResponse(res, "Message marked as read", {
            read_receipt: readReceipt,
        });
    } catch (error) {
        handleMessageError(res, error);
    }
};

export const getUnreadCount = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const { conversation_id } = req.params;

        const result = await getUnreadCountService(conversation_id, user_id);

        successResponse(res, "Unread count retrieved successfully", result);
    } catch (error) {
        handleMessageError(res, error);
    }
};
