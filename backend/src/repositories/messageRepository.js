import prisma from "../config/database.js";

export const messageRepository = {
    create: async (messageData) => {
        return await prisma.message.create({
            data: messageData,
            include: {
                sender: {
                    select: {
                        id: true,
                        email: true,
                        full_name: true,
                        avatar_url: true,
                    },
                },
                conversation: {
                    select: {
                        id: true,
                        user1_id: true,
                        user2_id: true,
                    },
                },
            },
        });
    },

    findByConversation: async (conversation_id, skip = 0, limit = 50) => {
        return await prisma.message.findMany({
            where: { conversation_id },
            include: {
                sender: {
                    select: {
                        id: true,
                        email: true,
                        full_name: true,
                        avatar_url: true,
                    },
                },
                read_receipts: {
                    include: {
                        reader: {
                            select: {
                                id: true,
                                full_name: true,
                            },
                        },
                    },
                },
            },
            orderBy: { created_at: "desc" },
            skip: parseInt(skip),
            take: parseInt(limit),
        });
    },

    findByIdWithAccess: async (message_id, user_id) => {
        return await prisma.message.findFirst({
            where: {
                id: message_id,
                conversation: {
                    OR: [{ user1_id: user_id }, { user2_id: user_id }],
                },
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        email: true,
                        full_name: true,
                        avatar_url: true,
                    },
                },
                read_receipts: {
                    include: {
                        reader: {
                            select: {
                                id: true,
                                full_name: true,
                            },
                        },
                    },
                },
                conversation: {
                    select: {
                        id: true,
                        user1_id: true,
                        user2_id: true,
                    },
                },
            },
        });
    },

    update: async (message_id, updateData) => {
        return await prisma.message.update({
            where: { id: message_id },
            data: updateData,
            include: {
                sender: {
                    select: {
                        id: true,
                        email: true,
                        full_name: true,
                        avatar_url: true,
                    },
                },
                read_receipts: {
                    include: {
                        reader: {
                            select: {
                                id: true,
                                full_name: true,
                            },
                        },
                    },
                },
            },
        });
    },

    delete: async (message_id) => {
        return await prisma.message.delete({
            where: { id: message_id },
        });
    },

    markAsDelivered: async (conversation_id, user_id) => {
        return await prisma.message.updateMany({
            where: {
                conversation_id,
                sender_id: { not: user_id },
                is_delivered: false,
            },
            data: {
                is_delivered: true,
                delivered_at: new Date(),
            },
        });
    },

    countUnread: async (conversation_id, user_id) => {
        return await prisma.message.count({
            where: {
                conversation_id,
                sender_id: { not: user_id },
                read_receipts: {
                    none: {
                        reader_id: user_id,
                    },
                },
            },
        });
    },
};
