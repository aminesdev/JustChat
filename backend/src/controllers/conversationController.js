import {
    createConversationService,
    getUserConversationsService,
    getConversationService,
    getConversationParticipantsService,
    deleteConversationService,
} from "../services/conversationService.js";
import { successResponse, createdResponse } from "../utils/responseHandler.js";
import { handleConversationError } from "../utils/errorHandler.js";

export const createConversation = async (req, res) => {
    try {
        const user1_id = req.user.userId;
        const { user2_id } = req.body;

        const conversation = await createConversationService(
            user1_id,
            user2_id
        );

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

        const result = await deleteConversationService(id, user_id);

        successResponse(res, result.message);
    } catch (error) {
        handleConversationError(res, error);
    }
};
