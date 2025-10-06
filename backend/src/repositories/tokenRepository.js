import prisma from "../config/database.js";

export const tokenRepository = {
    
    storeRefreshToken: async (userId, token) => {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);

        return await prisma.refreshToken.create({
            data: {
                token,
                user_id: userId,
                expires_at: expiresAt,
            },
        });
    },

    findRefreshToken: async (token) => {
        return await prisma.refreshToken.findUnique({
            where: { token },
            include: { user: true },
        });
    },

    deleteRefreshToken: async (token) => {
        return await prisma.refreshToken.delete({
            where: { token },
        });
    },

    deleteAllUserRefreshTokens: async (user_id) => {
        return await prisma.refreshToken.deleteMany({
            where: { user_id },
        });
    },

    findExpiredTokens: async () => {
        return await prisma.refreshToken.findMany({
            where: {
                expires_at: {
                    lt: new Date(),
                },
            },
        });
    },

    cleanupExpiredTokens: async () => {
        return await prisma.refreshToken.deleteMany({
            where: {
                expires_at: {
                    lt: new Date(),
                },
            },
        });
    },

    findUserRefreshTokens: async (user_id) => {
        return await prisma.refreshToken.findMany({
            where: { user_id },
            orderBy: { created_at: "desc" },
        });
    },

    verifyTokenValidity: async (token) => {
        const storedToken = await prisma.refreshToken.findUnique({
            where: { token },
            include: { user: true },
        });

        if (!storedToken) {
            return { valid: false, reason: "TOKEN_NOT_FOUND" };
        }

        if (new Date() > storedToken.expires_at) {
            await prisma.refreshToken.delete({
                where: { token },
            });
            return { valid: false, reason: "TOKEN_EXPIRED" };
        }

        return { valid: true, token: storedToken };
    },
};
