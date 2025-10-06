import bcrypt from "bcryptjs";
import { userRepository } from "../repositories/userRepository.js";
import {
    uploadImageService,
    deleteImageService,
} from "./fileStorageService.js";
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
        try {
            const uploadResult = await uploadImageService(avatar_file);
            newAvatarUrl = uploadResult.secure_url;
            updateFields.avatar_url = newAvatarUrl;
            if (user.avatar_url) {
                const oldPublicId = extractPublicId(user.avatar_url);
                if (oldPublicId) {
                    try {
                        await deleteImageService(oldPublicId);
                    } catch (error) {
                        console.log(
                            "Failed to delete old image:",
                            error.message
                        );
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
