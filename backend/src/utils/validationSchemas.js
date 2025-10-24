import Joi from "joi";

const uuidSchema = Joi.string().uuid().required();
const emailSchema = Joi.string().email().required();
const passwordSchema = Joi.string().min(6).required();

export const authValidation = {
    signup: Joi.object({
        email: emailSchema,
        password: passwordSchema,
        full_name: Joi.string().min(2).max(100).required(),
    }),

    login: Joi.object({
        email: emailSchema,
        password: passwordSchema,
    }),

    refreshToken: Joi.object({
        refreshToken: Joi.string().required(),
    }),

    logout: Joi.object({
        refreshToken: Joi.string().required(),
    }),
};

export const profileValidation = {
    updateProfile: Joi.object({
        full_name: Joi.string().min(2).max(100).optional(),
        // Remove avatar_file from Joi validation since it's handled by Multer
        currentPassword: Joi.string().min(6).optional(),
        newPassword: Joi.string().min(6).optional(),
    }).custom((value, helpers) => {
        if (value.newPassword && !value.currentPassword) {
            return helpers.error("any.custom", {
                message:
                    "Current password is required when setting new password",
            });
        }
        return value;
    }),
};

export const conversationValidation = {
    createConversation: Joi.object({
        user2_id: uuidSchema,
    }),

    conversationParams: Joi.object({
        id: uuidSchema,
    }),

    checkConversation: Joi.object({
        user2_id: uuidSchema,
    }),
};

export const messageValidation = {
    createMessage: Joi.object({
        message_text: Joi.string()
            .max(1000)
            .when("message_type", {
                is: "TEXT",
                then: Joi.required(),
                otherwise: Joi.optional().allow(""),
            }),
        message_type: Joi.string()
            .valid("TEXT", "IMAGE", "FILE", "VIDEO", "AUDIO")
            .default("TEXT"),
        file_url: Joi.string()
            .uri()
            .when("message_type", {
                is: Joi.valid("IMAGE", "FILE", "VIDEO", "AUDIO"),
                then: Joi.required(),
                otherwise: Joi.optional().allow(null),
            }),
        file_name: Joi.string().max(255).optional(),
        file_size: Joi.number().integer().min(0).optional(),
        file_type: Joi.string().max(100).optional(),
    }),

    updateMessage: Joi.object({
        message_text: Joi.string().max(1000).required(),
    }),

    conversationParams: Joi.object({
        conversation_id: uuidSchema,
    }),

    messageParams: Joi.object({
        message_id: uuidSchema,
    }),

    // ADD THIS NEW SCHEMA FOR ROUTES WITH BOTH PARAMS
    messageParamsWithConversation: Joi.object({
        conversation_id: uuidSchema,
        message_id: uuidSchema,
    }),

    queryParams: Joi.object({
        page: Joi.number().integer().min(1).default(1),
        limit: Joi.number().integer().min(1).max(100).default(50),
    }),
};

export const readReceiptValidation = {
    markAsRead: Joi.object({
        message_id: uuidSchema,
    }),
    markAsReadWithConversation: Joi.object({
        conversation_id: uuidSchema,
        message_id: uuidSchema,
    }),
};

export const userValidation = {
    searchQuery: Joi.object({
        q: Joi.string().min(2).max(100).required(),
        limit: Joi.number().integer().min(1).max(50).default(10),
    }),

    updateOnlineStatus: Joi.object({
        is_online: Joi.boolean().required(),
    }),

    getAllUsers: Joi.object({
        limit: Joi.number().integer().min(1).max(100).default(50),
    }),

    userIdParams: Joi.object({
        id: uuidSchema,
    }),
};
