import { userRepository } from "../repositories/userRepository.js";

export const searchUsersService = async (query, currentUserId, limit = 10) => {
    if (!query || query.trim().length === 0) {
        throw new Error("SEARCH_QUERY_REQUIRED");
    }

    if (query.trim().length < 2) {
        throw new Error("SEARCH_QUERY_TOO_SHORT");
    }

    const users = await userRepository.searchUsers(
        query.trim(),
        currentUserId,
        limit
    );

    return users;
};

export const getAllUsersService = async (currentUserId, limit = 50) => {
    const users = await userRepository.findMany(currentUserId, limit);
    return users;
};

export const getUserByIdService = async (userId) => {
    const user = await userRepository.findById(userId);

    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }

    // Return user without sensitive data
    const { password_hash, ...userWithoutPassword } = user;
    return userWithoutPassword;
};

export const updateOnlineStatusService = async (userId, isOnline) => {
    const user = await userRepository.findById(userId);
    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }

    const updatedUser = await userRepository.updateOnlineStatus(
        userId,
        isOnline
    );

    return updatedUser;
};
