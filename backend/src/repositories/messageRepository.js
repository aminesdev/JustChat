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

    markAllAsRead: async (conversation_id, reader_id) => {
        // Use a single query to create all read receipts at once
        // This prevents race conditions and duplicate errors
        const result = await prisma.$transaction(async (tx) => {
            // Get unread messages
            const unreadMessages = await tx.message.findMany({
                where: {
                    conversation_id,
                    sender_id: { not: reader_id },
                    read_receipts: {
                        none: {
                            reader_id: reader_id,
                        },
                    },
                },
                select: {
                    id: true,
                },
            });

            if (unreadMessages.length === 0) {
                return {
                    marked_count: 0,
                    read_receipts: [],
                };
            }

            // Create read receipts for all unread messages
            const now = new Date();
            const readReceiptData = unreadMessages.map((message) => ({
                message_id: message.id,
                reader_id: reader_id,
                read_at: now,
            }));

            // Use createMany with skipDuplicates to avoid unique constraint errors
            await tx.readReceipt.createMany({
                data: readReceiptData,
                skipDuplicates: true, // This prevents duplicate errors
            });

            // Get the created read receipts
            const readReceipts = await tx.readReceipt.findMany({
                where: {
                    message_id: {
                        in: unreadMessages.map((m) => m.id),
                    },
                    reader_id: reader_id,
                },
                include: {
                    reader: {
                        select: {
                            id: true,
                            full_name: true,
                        },
                    },
                },
            });

            return {
                marked_count: unreadMessages.length,
                read_receipts: readReceipts,
            };
        });

        return result;
    },

    getUnreadCountAfterMark: async (conversation_id, user_id) => {
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
