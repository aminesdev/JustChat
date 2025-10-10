import { conversationRepository } from "../repositories/conversationRepository.js";
import { userRepository } from "../repositories/userRepository.js";

export const createConversationService = async (user1_id, user2_id) => {
    const [sortedUser1, sortedUser2] = [user1_id, user2_id].sort();

    const existingConversation =
        await conversationRepository.findByParticipants(
            sortedUser1,
            sortedUser2
        );
    if (existingConversation) {
        throw new Error("CONVERSATION_ALREADY_EXISTS");
    }

    const users = await userRepository.findByIds([sortedUser1, sortedUser2]);
    if (users.length !== 2) {
        throw new Error("USER_NOT_FOUND");
    }

    const conversation = await conversationRepository.create({
        user1_id: sortedUser1,
        user2_id: sortedUser2,
    });

    return conversation;
};

export const getUserConversationsService = async (user_id) => {
    const conversations = await conversationRepository.findByUserId(user_id);
    return conversations;
};

export const getConversationService = async (conversation_id, user_id) => {
    const conversation = await conversationRepository.findByIdWithAccess(
        conversation_id,
        user_id
    );
    if (!conversation) {
        throw new Error("CONVERSATION_NOT_FOUND");
    }
    return conversation;
};

export const getConversationParticipantsService = async (
    conversation_id,
    user_id
) => {
    const conversation = await conversationRepository.findByIdWithAccess(
        conversation_id,
        user_id
    );
    if (!conversation) {
        throw new Error("CONVERSATION_NOT_FOUND");
    }

    return {
        participants: [conversation.user1, conversation.user2],
    };
};

export const deleteConversationService = async (conversation_id, user_id) => {
    const conversation = await conversationRepository.findByIdWithAccess(
        conversation_id,
        user_id
    );
    if (!conversation) {
        throw new Error("CONVERSATION_NOT_FOUND");
    }

    await conversationRepository.delete(conversation_id);
    return { success: true, message: "Conversation deleted successfully" };
};

export const checkConversationService = async (user1_id, user2_id) => {
    const [sortedUser1, sortedUser2] = [user1_id, user2_id].sort();

    const conversation = await conversationRepository.findByParticipants(
        sortedUser1,
        sortedUser2
    );

    return conversation;
};
