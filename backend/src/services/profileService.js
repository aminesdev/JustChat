import bcrypt from "bcryptjs";
import { userRepository } from "../repositories/userRepository.js";
import { uploadFileService, deleteFileService } from "./fileStorageService.js";
import { extractPublicId } from "../utils/cloudinaryUtils.js";

const saltRounds = parseInt(process.env.ROUNDS) || 12;

export const updateProfileService = async (userId, updateData) => {
    const { full_name, avatar_file, currentPassword, newPassword } = updateData;

    const user = await userRepository.findById(userId);
    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }

    const updateFields = {};

    if (full_name) updateFields.full_name = full_name;

    let newAvatarUrl = null;
    if (avatar_file) {
        // Validate file type
        if (!avatar_file.mimetype.startsWith("image/")) {
            throw new Error("INVALID_IMAGE_FORMAT");
        }

        // Validate file size (5MB limit)
        if (avatar_file.size > 5 * 1024 * 1024) {
            throw new Error("IMAGE_TOO_LARGE");
        }

        try {
            const uploadResult = await uploadFileService(
                avatar_file.buffer,
                avatar_file.originalname,
                "profiles"
            );
            newAvatarUrl = uploadResult.secure_url;
            updateFields.avatar_url = newAvatarUrl;

            // Delete old avatar if exists
            if (user.avatar_url) {
                const oldPublicId = extractPublicId(user.avatar_url);
                if (oldPublicId) {
                    try {
                        await deleteFileService(oldPublicId, "image");
                    } catch (error) {
                        console.log(
                            "Failed to delete old image:",
                            error.message
                        );
                        // Don't throw error, continue with update
                    }
                }
            }
        } catch (error) {
            throw error;
        }
    }

    if (newPassword) {
        if (!currentPassword) {
            throw new Error("CURRENT_PASSWORD_REQUIRED");
        }

        const isCurrentPasswordValid = await bcrypt.compare(
            currentPassword,
            user.password_hash
        );
        if (!isCurrentPasswordValid) {
            throw new Error("INVALID_CURRENT_PASSWORD");
        }

        updateFields.password_hash = await bcrypt.hash(newPassword, saltRounds);
    }

    const updatedUser = await userRepository.update(userId, updateFields);
    return updatedUser;
};

export const getProfileService = async (userId) => {
    const user = await userRepository.findById(userId);
    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }
    return user;
};
