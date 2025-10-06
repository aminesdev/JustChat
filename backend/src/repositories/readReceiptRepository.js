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
};
