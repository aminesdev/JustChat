import prisma from "../config/database.js";

export const userRepository = {
    
    findMany: async (excludeUserId, limit = 50) => {
        return await prisma.user.findMany({
            where: {
                id: { not: excludeUserId },
            },
            select: {
                id: true,
                email: true,
                full_name: true,
                avatar_url: true,
                is_online: true,
                last_seen: true,
            },
            take: parseInt(limit),
            orderBy: [{ is_online: "desc" }, { full_name: "asc" }],
        });
    },

    findByEmail: async (email) => {
        return await prisma.user.findUnique({
            where: { email },
        });
    },

    findById: async (id) => {
        return await prisma.user.findUnique({
            where: { id },
        });
    },

    create: async (userData) => {
        return await prisma.user.create({
            data: userData,
        });
    },

    update: async (id, updateData) => {
        return await prisma.user.update({
            where: { id },
            data: updateData,
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
    },

    findByIds: async (ids) => {
        return await prisma.user.findMany({
            where: { id: { in: ids } },
            select: {
                id: true,
                email: true,
                full_name: true,
                avatar_url: true,
                is_online: true,
                last_seen: true,
            },
        });
    },

    searchUsers: async (query, currentUserId, limit = 10) => {
        return await prisma.user.findMany({
            where: {
                AND: [
                    { id: { not: currentUserId } }, // Exclude current user
                    {
                        OR: [
                            {
                                full_name: {
                                    contains: query,
                                    mode: "insensitive",
                                },
                            },
                            { email: { contains: query, mode: "insensitive" } },
                        ],
                    },
                ],
            },
            select: {
                id: true,
                email: true,
                full_name: true,
                avatar_url: true,
                is_online: true,
                last_seen: true,
            },
            take: parseInt(limit),
            orderBy: [
                { is_online: "desc" }, // Online users first
                { full_name: "asc" },
            ],
        });
    },

    updateOnlineStatus: async (userId, isOnline) => {
        return await prisma.user.update({
            where: { id: userId },
            data: {
                is_online: isOnline,
                last_seen: new Date(),
            },
            select: {
                id: true,
                is_online: true,
                last_seen: true,
            },
        });
    },
};
