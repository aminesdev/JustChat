import prisma from "../config/database.js";

export const conversationRepository = {
    findByParticipants: async (user1_id, user2_id) => {
        const [sortedUser1, sortedUser2] = [user1_id, user2_id].sort();

        return await prisma.conversation.findUnique({
            where: {
                user1_id_user2_id: {
                    user1_id: sortedUser1,
                    user2_id: sortedUser2,
                },
            },
        });
    },

    create: async (conversationData) => {
        return await prisma.conversation.create({
            data: conversationData,
            include: {
                user1: {
                    select: {
                        id: true,
                        email: true,
                        full_name: true,
                        avatar_url: true,
                        is_online: true,
                        last_seen: true,
                    },
                },
                user2: {
                    select: {
                        id: true,
                        email: true,
                        full_name: true,
                        avatar_url: true,
                        is_online: true,
                        last_seen: true,
                    },
                },
            },
        });
    },

    findByUserId: async (user_id) => {
        return await prisma.conversation.findMany({
            where: {
                OR: [{ user1_id: user_id }, { user2_id: user_id }],
            },
            include: {
                user1: {
                    select: {
                        id: true,
                        email: true,
                        full_name: true,
                        avatar_url: true,
                        is_online: true,
                        last_seen: true,
                    },
                },
                user2: {
                    select: {
                        id: true,
                        email: true,
                        full_name: true,
                        avatar_url: true,
                        is_online: true,
                        last_seen: true,
                    },
                },
                messages: {
                    take: 1,
                    orderBy: { created_at: "desc" },
                    include: {
                        sender: {
                            select: {
                                id: true,
                                full_name: true,
                            },
                        },
                    },
                },
                _count: {
                    select: {
                        messages: {
                            where: {
                                sender_id: { not: user_id }, // Messages where current user is NOT sender
                                read_receipts: {
                                    none: {
                                        reader_id: user_id, // No read receipt from current user
                                    },
                                },
                            },
                        },
                    },
                },
            },
            orderBy: {
                messages: {
                    _count: "desc",
                },
            },
        });
    },

    findByIdWithAccess: async (conversation_id, user_id) => {
        return await prisma.conversation.findFirst({
            where: {
                id: conversation_id,
                OR: [{ user1_id: user_id }, { user2_id: user_id }],
            },
            include: {
                user1: {
                    select: {
                        id: true,
                        email: true,
                        full_name: true,
                        avatar_url: true,
                        is_online: true,
                        last_seen: true,
                    },
                },
                user2: {
                    select: {
                        id: true,
                        email: true,
                        full_name: true,
                        avatar_url: true,
                        is_online: true,
                        last_seen: true,
                    },
                },
            },
        });
    },

    delete: async (conversation_id) => {
        return await prisma.conversation.delete({
            where: { id: conversation_id },
        });
    },
};
