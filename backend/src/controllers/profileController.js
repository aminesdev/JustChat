import {
    updateProfileService,
    getProfileService,
} from "../services/profileService.js";
import { successResponse } from "../utils/responseHandler.js";
import {
    handleProfileError,
    handleCloudinaryError,
} from "../utils/errorHandler.js";

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const updatedUser = await updateProfileService(userId, req.body);

        successResponse(res, "Profile updated successfully", {
            user: updatedUser,
        });
    } catch (error) {
        if (
            error.message === "UPLOAD_FAILED" ||
            error.message === "DELETE_FAILED"
        ) {
            handleCloudinaryError(res, error);
        } else {
            handleProfileError(res, error);
        }
    }
};

export const getProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await getProfileService(userId);

        successResponse(res, "Profile retrieved successfully", { user });
    } catch (error) {
        handleProfileError(res, error);
    }
};
