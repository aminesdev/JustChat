import bcrypt from "bcryptjs";
import prisma from "../config/database.js";

const saltRounds = parseInt(process.env.ROUNDS) || 12;

export const updateProfileService = async (userId, updateData) => {
    const { full_name, avatar_url, currentPassword, newPassword } = updateData;

    const updateFields = {};

    // Update basic profile info
    if (full_name) updateFields.full_name = full_name;
    if (avatar_url) updateFields.avatar_url = avatar_url;

    // Handle password change
    if (newPassword) {
        if (!currentPassword) {
            throw new Error("CURRENT_PASSWORD_REQUIRED");
        }

        // Verify current password
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { password_hash: true },
        });

        const isCurrentPasswordValid = await bcrypt.compare(
            currentPassword,
            user.password_hash
        );
        if (!isCurrentPasswordValid) {
            throw new Error("INVALID_CURRENT_PASSWORD");
        }

        // Hash new password
        updateFields.password_hash = await bcrypt.hash(newPassword, saltRounds);
    }

    // Update user
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
