import {
    updateProfileService,
    getProfileService,
} from "../services/profileService.js";
import { successResponse } from "../utils/responseHandler.js";
import {
    handleProfileError,
    handleCloudinaryError,
} from "../utils/errorHandler.js";
import { getIO } from "../config/socket.js";

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.userId;

        const updateData = {
            ...req.body,
            avatar_file: req.file,
        };

        const updatedUser = await updateProfileService(userId, updateData);

        // Trigger real-time profile update event
        const io = getIO();
        io.emit("user_profile_updated", {
            user_id: userId,
            user: updatedUser,
            updated_at: new Date().toISOString(),
            updated_fields: {
                full_name: !!updateData.full_name,
                avatar_url: !!req.file,
            },
        });

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
