import {
    createConversationService,
    getUserConversationsService,
    getConversationService,
    getConversationParticipantsService,
    deleteConversationService,
    checkConversationService,
} from "../services/conversationService.js";
import { successResponse, createdResponse } from "../utils/responseHandler.js";
import { handleConversationError } from "../utils/errorHandler.js";
import { getIO } from "../config/socket.js";
import { sendToUser } from "../services/socketService.js";

export const createConversation = async (req, res) => {
    try {
        const user1_id = req.user.userId;
        const { user2_id } = req.body;

        const conversation = await createConversationService(
            user1_id,
            user2_id
        );

        // Trigger real-time conversation creation event
        const io = getIO();
        io.emit("conversation_created", {
            conversation,
            created_by: user1_id,
            created_at: new Date().toISOString(),
        });

        // Specifically notify the other user if they're online
        sendToUser(user2_id, "new_conversation", {
            conversation,
            created_by: req.user,
        });

        createdResponse(res, "Conversation created successfully", {
            conversation,
        });
    } catch (error) {
        handleConversationError(res, error);
    }
};

export const getUserConversations = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const conversations = await getUserConversationsService(user_id);

        successResponse(res, "Conversations retrieved successfully", {
            conversations,
        });
    } catch (error) {
        handleConversationError(res, error);
    }
};

export const getConversation = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const { id } = req.params;

        const conversation = await getConversationService(id, user_id);

        successResponse(res, "Conversation retrieved successfully", {
            conversation,
        });
    } catch (error) {
        handleConversationError(res, error);
    }
};

export const getConversationParticipants = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const { id } = req.params;

        const result = await getConversationParticipantsService(id, user_id);

        successResponse(res, "Participants retrieved successfully", result);
    } catch (error) {
        handleConversationError(res, error);
    }
};

export const deleteConversation = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const { id } = req.params;

        // Get conversation details before deletion
        const conversation = await getConversationService(id, user_id);

        const result = await deleteConversationService(id, user_id);

        // Trigger real-time conversation deletion event
        const io = getIO();
        const otherUserId =
            conversation.user1_id === user_id
                ? conversation.user2_id
                : conversation.user1_id;

        io.emit("conversation_deleted", {
            conversation_id: id,
            deleted_by: user_id,
            deleted_at: new Date().toISOString(),
            participants: [user_id, otherUserId],
        });

        // Specifically notify the other user if they're online
        sendToUser(otherUserId, "conversation_deleted", {
            conversation_id: id,
            deleted_by: req.user,
        });

        successResponse(res, result.message);
    } catch (error) {
        handleConversationError(res, error);
    }
};

export const checkConversation = async (req, res) => {
    try {
        const user1_id = req.user.userId;
        const { user2_id } = req.params;

        const conversation = await checkConversationService(user1_id, user2_id);

        successResponse(res, "Conversation check completed", {
            exists: !!conversation,
            conversation: conversation || null,
        });
    } catch (error) {
        handleConversationError(res, error);
    }
};
