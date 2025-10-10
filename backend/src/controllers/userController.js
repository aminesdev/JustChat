import {
    searchUsersService,
    updateOnlineStatusService,
    getAllUsersService,
    getUserByIdService,
} from "../services/userService.js";
import { successResponse } from "../utils/responseHandler.js";
import { handleUserError } from "../utils/errorHandler.js";

export const searchUsers = async (req, res) => {
    try {
        const currentUserId = req.user.userId;
        const { q, limit = 10 } = req.query;

        const users = await searchUsersService(q, currentUserId, limit);

        successResponse(res, "Users retrieved successfully", {
            users,
            count: users.length,
        });
    } catch (error) {
        handleUserError(res, error);
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const currentUserId = req.user.userId;
        const { limit = 50 } = req.query;

        const users = await getAllUsersService(currentUserId, limit);

        successResponse(res, "Users retrieved successfully", {
            users,
            count: users.length,
        });
    } catch (error) {
        handleUserError(res, error);
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserByIdService(id);

        successResponse(res, "User retrieved successfully", { user });
    } catch (error) {
        handleUserError(res, error);
    }
};

export const updateOnlineStatus = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { is_online } = req.body;

        const updatedUser = await updateOnlineStatusService(userId, is_online);

        successResponse(res, "Online status updated successfully", {
            user: updatedUser,
        });
    } catch (error) {
        handleUserError(res, error);
    }
};
