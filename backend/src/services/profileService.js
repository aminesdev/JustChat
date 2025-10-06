import bcrypt from "bcryptjs";
import prisma from "../config/database.js";
import {
    uploadImageService,
    deleteImageService,
} from "./fileStorageService.js";

const saltRounds = parseInt(process.env.ROUNDS) || 12;

export const updateProfileService = async (userId, updateData) => {
    const { full_name, avatar_file, currentPassword, newPassword } = updateData;

    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }
    const updateFields = {};
    if (full_name) updateFields.full_name = full_name;

    // Handle image upload
    let newAvatarUrl = null;
    if (avatar_file) {
        const uploadResult = await uploadImageService(avatar_file);
        newAvatarUrl = uploadResult.secure_url;
        updateFields.avatar_url = newAvatarUrl;

        if (user.avatar_url) {
            const oldPublicId = extractPublicId(user.avatar_url);
            if (oldPublicId) {
                try {
                    await deleteImageService(oldPublicId);
                } catch (error) {
                    console.log("Failed to delete old image:", error.message);
                }
            }
        }
    }

    // Handle password change
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

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateFields,
        select: {
            id: true,
            email: true,
            full_name: true,
            avatar_url: true,
            is_online: true,
            last_seen: true,
            created_at: true,
        },
    });

    return updatedUser;
};

export const getProfileService = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            full_name: true,
            avatar_url: true,
            is_online: true,
            last_seen: true,
            created_at: true,
        },
    });

    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }

    return user;
};
