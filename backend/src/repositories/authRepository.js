import prisma from "../config/database.js";

export const authRepository = {

    createRefreshToken: async (tokenData) => {
        return await prisma.refreshToken.create({
            data: tokenData,
        });
    },

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
};
