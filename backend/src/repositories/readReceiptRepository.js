import prisma from "../config/database.js";

export const readReceiptRepository = {
    upsert: async (receiptData) => {
        return await prisma.readReceipt.upsert({
            where: {
                message_id_reader_id: {
                    message_id: receiptData.message_id,
                    reader_id: receiptData.reader_id,
                },
            },
            update: {
                read_at: receiptData.read_at,
            },
            create: receiptData,
            include: {
                reader: {
                    select: {
                        id: true,
                        full_name: true,
                    },
                },
            },
        });
    },

    createMany: async (receiptsData) => {
        return await prisma.readReceipt.createMany({
            data: receiptsData,
            skipDuplicates: true, // Prevent duplicate errors
        });
    },

    findByMessageAndReader: async (message_id, reader_id) => {
        return await prisma.readReceipt.findUnique({
            where: {
                message_id_reader_id: {
                    message_id,
                    reader_id,
                },
            },
        });
    },

    exists: async (message_id, reader_id) => {
        const receipt = await prisma.readReceipt.findUnique({
            where: {
                message_id_reader_id: {
                    message_id,
                    reader_id,
                },
            },
            select: {
                id: true,
            },
        });
        return !!receipt;
    },
};
