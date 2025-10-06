# Project: src

## File: app.js
```js
import express from "express";
import routes from "./routes/index.js";

const app = express();
app.use(express.json());

app.use("/api", routes);

export default app;
```

## File: config/cloudinary.js
```js
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

export async function testCloudinary() {
    try {
        const result = await cloudinary.api.ping();
        console.log("Cloudinary configuration successful!");
        console.log("Status:", result.status);
    } catch (error) {
        console.log("Cloudinary configuration failed:");
        console.log("Error:", error.message);
        throw new Error("CLOUDINARY_CONFIG_ERROR");
    }
}

export default cloudinary;

```

## File: config/database.js
```js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;

export async function connectDb() {
    try {
        await prisma.$connect();
        console.log("PostgreSQL Connected via Prisma");
    } catch (err) {
        console.log("Database connection error", err.message);
        process.exit(1);
    }
}

```

## File: controllers/authController.js
```js
import {
    signupService,
    loginService,
    logoutService,
    refreshTokenService,
    logoutAllDevicesService,
} from "../services/authService.js";
import { successResponse, createdResponse } from "../utils/responseHandler.js";
import { handleAuthError, handleTokenError } from "../utils/errorHandler.js";

export const signup = async (req, res) => {
    try {
        const result = await signupService(req.body);

        createdResponse(res, "User created successfully", {
            user: result.user,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
        });
    } catch (error) {
        handleAuthError(res, error);
    }
};

export const login = async (req, res) => {
    try {
        const result = await loginService(req.body);

        successResponse(res, "Login successful", {
            user: result.user,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
        });
    } catch (error) {
        handleAuthError(res, error);
    }
};

export const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        const result = await refreshTokenService(refreshToken);

        successResponse(res, "Access token refreshed successfully", {
            accessToken: result.accessToken,
        });
    } catch (error) {
        handleTokenError(res, error);
    }
};

export const logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        await logoutService(refreshToken);

        successResponse(res, "Logged out successfully");
    } catch (error) {
        handleTokenError(res, error);
    }
};

export const logoutAll = async (req, res) => {
    try {
        const userId = req.user.userId;
        await logoutAllDevicesService(userId);
        successResponse(res, "Logged out from all devices successfully");
    } catch (error) {
        handleTokenError(res, error);
    }
};

```

## File: controllers/conversationController.js
```js
import {
    createConversationService,
    getUserConversationsService,
    getConversationService,
    getConversationParticipantsService,
    deleteConversationService,
} from "../services/conversationService.js";
import { successResponse, createdResponse } from "../utils/responseHandler.js";
import { handleConversationError } from "../utils/errorHandler.js";

export const createConversation = async (req, res) => {
    try {
        const user1_id = req.user.userId;
        const { user2_id } = req.body;

        const conversation = await createConversationService(
            user1_id,
            user2_id
        );

        createdResponse(res, "Conversation created successfully", {
            conversation,
        });
    } catch (error) {
        handleConversationError(res, error);
    }
};

export const getUserConversations = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const conversations = await getUserConversationsService(user_id);

        successResponse(res, "Conversations retrieved successfully", {
            conversations,
        });
    } catch (error) {
        handleConversationError(res, error);
    }
};

export const getConversation = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const { id } = req.params;

        const conversation = await getConversationService(id, user_id);

        successResponse(res, "Conversation retrieved successfully", {
            conversation,
        });
    } catch (error) {
        handleConversationError(res, error);
    }
};

export const getConversationParticipants = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const { id } = req.params;

        const result = await getConversationParticipantsService(id, user_id);

        successResponse(res, "Participants retrieved successfully", result);
    } catch (error) {
        handleConversationError(res, error);
    }
};

export const deleteConversation = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const { id } = req.params;

        const result = await deleteConversationService(id, user_id);

        successResponse(res, result.message);
    } catch (error) {
        handleConversationError(res, error);
    }
};

```

## File: controllers/messageController.js
```js
import {
    createMessageService,
    getMessagesService,
    getMessageService,
    updateMessageService,
    deleteMessageService,
    markAsReadService,
    getUnreadCountService,
} from "../services/messageService.js";
import { successResponse, createdResponse } from "../utils/responseHandler.js";
import { handleMessageError } from "../utils/errorHandler.js";

export const createMessage = async (req, res) => {
    try {
        const sender_id = req.user.userId;
        const { conversation_id } = req.params;
        const { message_text, message_type = "TEXT", file_url } = req.body;

        const message = await createMessageService({
            conversation_id,
            sender_id,
            message_text,
            message_type,
            file_url,
        });

        createdResponse(res, "Message sent successfully", {
            message,
        });
    } catch (error) {
        handleMessageError(res, error);
    }
};

export const getMessages = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const { conversation_id } = req.params;
        const { page = 1, limit = 50 } = req.query;

        const messages = await getMessagesService(
            conversation_id,
            user_id,
            parseInt(page),
            parseInt(limit)
        );

        successResponse(res, "Messages retrieved successfully", {
            messages,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: messages.length,
            },
        });
    } catch (error) {
        handleMessageError(res, error);
    }
};

export const getMessage = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const { message_id } = req.params;

        const message = await getMessageService(message_id, user_id);

        successResponse(res, "Message retrieved successfully", {
            message,
        });
    } catch (error) {
        handleMessageError(res, error);
    }
};

export const updateMessage = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const { message_id } = req.params;
        const { message_text } = req.body;

        if (!message_text || message_text.trim() === "") {
            return res.status(400).json({
                success: false,
                msg: "Message text cannot be empty",
            });
        }

        const updatedMessage = await updateMessageService(message_id, user_id, {
            message_text: message_text.trim(),
        });

        successResponse(res, "Message updated successfully", {
            message: updatedMessage,
        });
    } catch (error) {
        handleMessageError(res, error);
    }
};

export const deleteMessage = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const { message_id } = req.params;

        const result = await deleteMessageService(message_id, user_id);

        successResponse(res, "Message deleted successfully", {
            result,
        });
    } catch (error) {
        handleMessageError(res, error);
    }
};

export const markAsRead = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const { message_id } = req.params;

        const readReceipt = await markAsReadService(message_id, user_id);

        successResponse(res, "Message marked as read", {
            read_receipt: readReceipt,
        });
    } catch (error) {
        handleMessageError(res, error);
    }
};

export const getUnreadCount = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const { conversation_id } = req.params;

        const result = await getUnreadCountService(conversation_id, user_id);

        successResponse(res, "Unread count retrieved successfully", result);
    } catch (error) {
        handleMessageError(res, error);
    }
};

```

## File: controllers/profileController.js
```js
import {
    updateProfileService,
    getProfileService,
} from "../services/profileService.js";
import { successResponse } from "../utils/responseHandler.js";
import {
    handleProfileError,
    handleCloudinaryError,
} from "../utils/errorHandler.js";

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const updatedUser = await updateProfileService(userId, req.body);

        successResponse(res, "Profile updated successfully", {
            user: updatedUser,
        });
    } catch (error) {
        if (
            error.message === "UPLOAD_FAILED" ||
            error.message === "DELETE_FAILED"
        ) {
            handleCloudinaryError(res, error);
        } else {
            handleProfileError(res, error);
        }
    }
};

export const getProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await getProfileService(userId);

        successResponse(res, "Profile retrieved successfully", { user });
    } catch (error) {
        handleProfileError(res, error);
    }
};

```

## File: middlewares/auth.js
```js
import { tokenService } from "../services/tokenService.js";
import { unauthorizedResponse } from "../utils/responseHandler.js";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return unauthorizedResponse(res, "Access token required");
    }

    try {
        const decoded = tokenService.validateAccessToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return unauthorizedResponse(res, "Invalid or expired token");
    }
};

```

## File: middlewares/validation.js
```js
import { badRequestResponse } from "../utils/responseHandler.js";

export const validate = (schema, property = "body") => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property], {
            abortEarly: false,
            stripUnknown: true,
        });

        if (error) {
            const errorMessage = error.details
                .map((detail) => detail.message)
                .join(", ");

            return badRequestResponse(res, errorMessage);
        }

        if (property === "body") {
            req.body = schema.validate(req.body).value;
        }

        next();
    };
};

export const validateParams = (schema) => validate(schema, "params");

export const validateQuery = (schema) => validate(schema, "query");

```

## File: repositories/authRepository.js
```js
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

```

## File: repositories/conversationRepository.js
```js
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
                                sender_id: { not: user_id },
                                read_receipts: {
                                    none: {
                                        reader_id: user_id,
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

```

## File: repositories/messageRepository.js
```js
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
            skip,
            take: limit,
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

```

## File: repositories/readReceiptRepository.js
```js
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

```

## File: repositories/tokenRepository.js
```js
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

```

## File: repositories/userRepository.js
```js
import prisma from "../config/database.js";

export const userRepository = {
    
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
};

```

## File: routes/auth.js
```js
import express from "express";
import {
    signup,
    login,
    logout,
    refreshToken,
    logoutAll,
} from "../controllers/authController.js";
import { authenticateToken } from "../middlewares/auth.js";
import { validate } from "../middlewares/validation.js";
import { authValidation } from "../utils/validationSchemas.js";

const router = express.Router();

router.post("/signup", validate(authValidation.signup), signup);
router.post("/login", validate(authValidation.login), login);
router.post("/logout", validate(authValidation.logout), logout);
router.post(
    "/refresh-token",
    validate(authValidation.refreshToken),
    refreshToken
);
router.post("/logout-all", authenticateToken, logoutAll);

export default router;

```

## File: routes/conversation.js
```js
import express from "express";
import {
    createConversation,
    getUserConversations,
    getConversation,
    getConversationParticipants,
    deleteConversation,
} from "../controllers/conversationController.js";
import { authenticateToken } from "../middlewares/auth.js";
import { validate, validateParams } from "../middlewares/validation.js";
import { conversationValidation } from "../utils/validationSchemas.js";

const router = express.Router();
router.use(authenticateToken);

router.post(
    "/",
    validate(conversationValidation.createConversation),
    createConversation
);
router.get("/", getUserConversations);
router.get(
    "/:id",
    validateParams(conversationValidation.conversationParams),
    getConversation
);
router.get(
    "/:id/participants",
    validateParams(conversationValidation.conversationParams),
    getConversationParticipants
);
router.delete(
    "/:id",
    validateParams(conversationValidation.conversationParams),
    deleteConversation
);

export default router;

```

## File: routes/index.js
```js
import express from "express";
import authRoutes from "./auth.js";
import profileRoutes from "./profile.js";
import conversationRoutes from "./conversation.js";
import messageRoutes from "./message.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/conversations", conversationRoutes);
router.use("/conversations", messageRoutes);

export default router;

```

## File: routes/message.js
```js
import express from "express";
import {
    createMessage,
    getMessages,
    getMessage,
    updateMessage,
    deleteMessage,
    markAsRead,
    getUnreadCount,
} from "../controllers/messageController.js";
import { authenticateToken } from "../middlewares/auth.js";
import {
    validate,
    validateParams,
    validateQuery,
} from "../middlewares/validation.js";
import {
    messageValidation,
    readReceiptValidation,
} from "../utils/validationSchemas.js";

const router = express.Router();
router.use(authenticateToken);

router.post(
    "/:conversation_id/messages",
    validateParams(messageValidation.conversationParams), // FIXED
    validate(messageValidation.createMessage),
    createMessage
);

router.get(
    "/:conversation_id/messages",
    validateParams(messageValidation.conversationParams), // FIXED
    validateQuery(messageValidation.queryParams),
    getMessages
);

router.get(
    "/:conversation_id/unread-count",
    validateParams(messageValidation.conversationParams), // FIXED
    getUnreadCount
);

router.get(
    "/message/:message_id",
    validateParams(messageValidation.messageParams),
    getMessage
);

router.put(
    "/message/:message_id",
    validateParams(messageValidation.messageParams),
    validate(messageValidation.updateMessage),
    updateMessage
);

router.delete(
    "/message/:message_id",
    validateParams(messageValidation.messageParams),
    deleteMessage
);

router.post(
    "/message/:message_id/read",
    validateParams(readReceiptValidation.markAsRead),
    markAsRead
);

export default router;

```

## File: routes/profile.js
```js
import express from "express";
import { updateProfile, getProfile } from "../controllers/profileController.js";
import { authenticateToken } from "../middlewares/auth.js";
import { validate } from "../middlewares/validation.js";
import { profileValidation } from "../utils/validationSchemas.js";

const router = express.Router();

router.get("/me", authenticateToken, getProfile);
router.put(
    "/update",
    authenticateToken,
    validate(profileValidation.updateProfile),
    updateProfile
);

export default router;

```

## File: server.js
```js
import app from "./app.js";
import dotenv from "dotenv";
import {connectDb} from "./config/database.js";
import {testCloudinary} from "./config/cloudinary.js";

dotenv.config();

const PORT = process.env.PORT;

async function start() {
    await connectDb();
    await testCloudinary();
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

start();
```

## File: services/authService.js
```js
import bcrypt from "bcryptjs";
import { userRepository } from "../repositories/userRepository.js";
import { tokenService } from "./tokenService.js";

const saltRounds = parseInt(process.env.ROUNDS) || 12;

export const signupService = async (userData) => {
    const { email, full_name, password } = userData;

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
        throw new Error("USER_ALREADY_EXISTS");
    }

    const password_hash = await bcrypt.hash(password, saltRounds);

    const user = await userRepository.create({
        email,
        full_name,
        password_hash,
    });

    const { accessToken, refreshToken } = await tokenService.generateAuthTokens(
        user.id
    );

    return {
        user: {
            id: user.id,
            email: user.email,
            full_name: user.full_name,
        },
        accessToken,
        refreshToken,
    };
};

export const loginService = async (credentials) => {
    const { email, password } = credentials;

    const user = await userRepository.findByEmail(email);
    if (!user) {
        throw new Error("INVALID_CREDENTIALS");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
        throw new Error("INVALID_CREDENTIALS");
    }

    const { accessToken, refreshToken } = await tokenService.generateAuthTokens(
        user.id
    );

    return {
        user: {
            id: user.id,
            email: user.email,
            full_name: user.full_name,
        },
        accessToken,
        refreshToken,
    };
};

export const refreshTokenService = async (token) => {
    const result = await tokenService.refreshAccessToken(token);
    return result;
};

export const logoutService = async (token) => {
    const result = await tokenService.revokeToken(token);
    return result;
};

export const logoutAllDevicesService = async (userId) => {
    const result = await tokenService.revokeAllUserTokens(userId);
    return result;
};

```

## File: services/conversationService.js
```js
import { conversationRepository } from "../repositories/conversationRepository.js";
import { userRepository } from "../repositories/userRepository.js";

export const createConversationService = async (user1_id, user2_id) => {
    const [sortedUser1, sortedUser2] = [user1_id, user2_id].sort();

    const existingConversation =
        await conversationRepository.findByParticipants(
            sortedUser1,
            sortedUser2
        );
    if (existingConversation) {
        throw new Error("CONVERSATION_ALREADY_EXISTS");
    }

    const users = await userRepository.findByIds([sortedUser1, sortedUser2]);
    if (users.length !== 2) {
        throw new Error("USER_NOT_FOUND");
    }

    const conversation = await conversationRepository.create({
        user1_id: sortedUser1,
        user2_id: sortedUser2,
    });

    return conversation;
};

export const getUserConversationsService = async (user_id) => {
    const conversations = await conversationRepository.findByUserId(user_id);
    return conversations;
};

export const getConversationService = async (conversation_id, user_id) => {
    const conversation = await conversationRepository.findByIdWithAccess(
        conversation_id,
        user_id
    );
    if (!conversation) {
        throw new Error("CONVERSATION_NOT_FOUND");
    }
    return conversation;
};

export const getConversationParticipantsService = async (
    conversation_id,
    user_id
) => {
    const conversation = await conversationRepository.findByIdWithAccess(
        conversation_id,
        user_id
    );
    if (!conversation) {
        throw new Error("CONVERSATION_NOT_FOUND");
    }

    return {
        participants: [conversation.user1, conversation.user2],
    };
};

export const deleteConversationService = async (conversation_id, user_id) => {
    const conversation = await conversationRepository.findByIdWithAccess(
        conversation_id,
        user_id
    );
    if (!conversation) {
        throw new Error("CONVERSATION_NOT_FOUND");
    }

    await conversationRepository.delete(conversation_id);
    return { success: true, message: "Conversation deleted successfully" };
};

```

## File: services/fileStorageService.js
```js
import cloudinary from "../config/cloudinary.js";

export const uploadImageService = async (fileBuffer, folder = "profiles") => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folder,
                resource_type: "image",
                transformation: [
                    { width: 500, height: 500, crop: "limit" },
                    { quality: "auto" },
                    { format: "webp" },
                ],
            },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary upload error:", error);
                    reject(new Error("UPLOAD_FAILED"));
                } else {
                    resolve(result);
                }
            }
        );

        uploadStream.end(fileBuffer);
    });
};

export const deleteImageService = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result !== "ok") {
            throw new Error("DELETE_FAILED");
        }

        return result;
    } catch (error) {
        console.error("Cloudinary delete error:", error);
        throw new Error("DELETE_FAILED");
    }
};

```

## File: services/messageService.js
```js
import { messageRepository } from "../repositories/messageRepository.js";
import { readReceiptRepository } from "../repositories/readReceiptRepository.js";
import { conversationRepository } from "../repositories/conversationRepository.js";

export const createMessageService = async (messageData) => {
    const { conversation_id, sender_id, message_type, message_text, file_url } =
        messageData;
    const conversation = await conversationRepository.findByIdWithAccess(
        conversation_id,
        sender_id
    );
    if (!conversation) {
        throw new Error("CONVERSATION_NOT_FOUND_OR_ACCESS_DENIED");
    }

    if (message_type === "TEXT" && !message_text) {
        throw new Error("MESSAGE_TEXT_REQUIRED");
    }

    if (message_type === "IMAGE" && !file_url) {
        throw new Error("FILE_URL_REQUIRED_FOR_IMAGE");
    }

    const message = await messageRepository.create({
        conversation_id,
        sender_id,
        message_type: message_type || "TEXT",
        message_text,
        file_url,
        is_delivered: false,
    });

    return message;
};

export const getMessagesService = async (
    conversation_id,
    user_id,
    page = 1,
    limit = 50
) => {
    const conversation = await conversationRepository.findByIdWithAccess(
        conversation_id,
        user_id
    );
    if (!conversation) {
        throw new Error("CONVERSATION_NOT_FOUND_OR_ACCESS_DENIED");
    }

    const skip = (page - 1) * limit;

    const messages = await messageRepository.findByConversation(
        conversation_id,
        skip,
        limit
    );
    await messageRepository.markAsDelivered(conversation_id, user_id);

    return messages.reverse();
};

export const getMessageService = async (message_id, user_id) => {
    const message = await messageRepository.findByIdWithAccess(
        message_id,
        user_id
    );
    if (!message) {
        throw new Error("MESSAGE_NOT_FOUND");
    }

    return message;
};

export const updateMessageService = async (message_id, user_id, updateData) => {
    const { message_text } = updateData;
    const existingMessage = await messageRepository.findByIdWithAccess(
        message_id,
        user_id
    );
    if (!existingMessage || existingMessage.sender_id !== user_id) {
        throw new Error("MESSAGE_NOT_FOUND_OR_NOT_EDITABLE");
    }
    if (existingMessage.message_type !== "TEXT") {
        throw new Error("ONLY_TEXT_MESSAGES_CAN_BE_EDITED");
    }
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    if (existingMessage.created_at < fiveMinutesAgo) {
        throw new Error("MESSAGE_EDIT_TIMEOUT");
    }

    const updatedMessage = await messageRepository.update(message_id, {
        message_text,
    });
    return updatedMessage;
};

export const deleteMessageService = async (message_id, user_id) => {
    const existingMessage = await messageRepository.findByIdWithAccess(
        message_id,
        user_id
    );
    if (!existingMessage || existingMessage.sender_id !== user_id) {
        throw new Error("MESSAGE_NOT_FOUND_OR_NOT_DELETABLE");
    }


    if (existingMessage.message_type === "TEXT") {
        const deletedMessage = await messageRepository.update(message_id, {
            message_text: "This message was deleted",
            file_url: null,
        });
        return deletedMessage;
    } else {
        await messageRepository.delete(message_id);
        return { id: message_id, deleted: true };
    }
};

export const markAsReadService = async (message_id, user_id) => {
    const message = await messageRepository.findByIdWithAccess(
        message_id,
        user_id
    );
    if (!message) {
        throw new Error("MESSAGE_NOT_FOUND");
    }
    if (message.sender_id === user_id) {
        throw new Error("CANNOT_MARK_OWN_MESSAGE_READ");
    }
    const readReceipt = await readReceiptRepository.upsert({
        message_id,
        reader_id: user_id,
        read_at: new Date(),
    });

    return readReceipt;
};

export const getUnreadCountService = async (conversation_id, user_id) => {
    const conversation = await conversationRepository.findByIdWithAccess(
        conversation_id,
        user_id
    );
    if (!conversation) {
        throw new Error("CONVERSATION_NOT_FOUND_OR_ACCESS_DENIED");
    }

    const count = await messageRepository.countUnread(conversation_id, user_id);
    return { unread_count: count };
};

```

## File: services/profileService.js
```js
import bcrypt from "bcryptjs";
import { userRepository } from "../repositories/userRepository.js";
import {
    uploadImageService,
    deleteImageService,
} from "./fileStorageService.js";
import { extractPublicId } from "../utils/cloudinaryUtils.js";

const saltRounds = parseInt(process.env.ROUNDS) || 12;

export const updateProfileService = async (userId, updateData) => {
    const { full_name, avatar_file, currentPassword, newPassword } = updateData;

    const user = await userRepository.findById(userId);
    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }

    const updateFields = {};

    if (full_name) updateFields.full_name = full_name;

    let newAvatarUrl = null;
    if (avatar_file) {
        try {
            const uploadResult = await uploadImageService(avatar_file);
            newAvatarUrl = uploadResult.secure_url;
            updateFields.avatar_url = newAvatarUrl;
            if (user.avatar_url) {
                const oldPublicId = extractPublicId(user.avatar_url);
                if (oldPublicId) {
                    try {
                        await deleteImageService(oldPublicId);
                    } catch (error) {
                        console.log(
                            "Failed to delete old image:",
                            error.message
                        );
                    }
                }
            }
        } catch (error) {
            throw error;
        }
    }
    if (newPassword) {
        if (!currentPassword) {
            throw new Error("CURRENT_PASSWORD_REQUIRED");
        }

        const isCurrentPasswordValid = await bcrypt.compare(
            currentPassword,
            user.password_hash
        );
        if (!isCurrentPasswordValid) {
            throw new Error("INVALID_CURRENT_PASSWORD");
        }

        updateFields.password_hash = await bcrypt.hash(newPassword, saltRounds);
    }

    const updatedUser = await userRepository.update(userId, updateFields);
    return updatedUser;
};

export const getProfileService = async (userId) => {
    const user = await userRepository.findById(userId);
    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }
    return user;
};

```

## File: services/tokenService.js
```js
import { tokenRepository } from "../repositories/tokenRepository.js";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
    verifyAccessToken,
} from "../utils/jwt.js";

export const tokenService = {

    generateAuthTokens: async (userId) => {
        const accessToken = generateAccessToken(userId);
        const refreshToken = generateRefreshToken(userId);

        await tokenRepository.storeRefreshToken(userId, refreshToken);

        return { accessToken, refreshToken };
    },

    refreshAccessToken: async (refreshToken) => {
        if (!refreshToken) {
            throw new Error("REFRESH_TOKEN_REQUIRED");
        }
        const decoded = verifyRefreshToken(refreshToken);
        const validity = await tokenRepository.verifyTokenValidity(
            refreshToken
        );
        if (!validity.valid) {
            throw new Error(validity.reason);
        }
        const accessToken = generateAccessToken(decoded.userId);

        return { accessToken };
    },

    revokeToken: async (token) => {
        if (token) {
            await tokenRepository.deleteRefreshToken(token);
        }
        return { success: true };
    },

    revokeAllUserTokens: async (userId) => {
        await tokenRepository.deleteAllUserRefreshTokens(userId);
        return { success: true, message: "All tokens revoked" };
    },

    validateAccessToken: (token) => {
        try {
            return verifyAccessToken(token);
        } catch (error) {
            throw new Error("INVALID_ACCESS_TOKEN");
        }
    },

    getUserSessions: async (userId) => {
        const tokens = await tokenRepository.findUserRefreshTokens(userId);
        return tokens.map((token) => ({
            id: token.id,
            created_at: token.created_at,
            expires_at: token.expires_at,
            is_expired: new Date() > token.expires_at,
        }));
    },
    
    cleanupExpiredTokens: async () => {
        const result = await tokenRepository.cleanupExpiredTokens();
        return { deletedCount: result.count };
    },
};

```

## File: utils/cloudinaryUtils.js
```js
import cloudinary from "../config/cloudinary.js";

export const extractPublicId = (url) => {
    if (!url) return null;

    const matches = url.match(/\/upload\/.*\/([^/.]+)(?=\.[^.]*$)/);
    return matches ? matches[1] : null;
};

export const uploadToCloudinary = async (fileBuffer, folder = "profiles") => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folder,
                resource_type: "image",
            },
            (error, result) => {
                if (error) {
                    reject(new Error("UPLOAD_FAILED"));
                } else {
                    resolve(result);
                }
            }
        );

        uploadStream.end(fileBuffer);
    });
};

export const deleteFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        throw new Error("DELETE_FAILED");
    }
};

```

## File: utils/errorHandler.js
```js
import {
    errorResponse,
    badRequestResponse,
    unauthorizedResponse,
    conflictResponse,
    notFoundResponse,
} from "./responseHandler.js";

export const handleAuthError = (res, error) => {
    const errorMap = {
        USER_ALREADY_EXISTS: () => conflictResponse(res, "User already exists"),
        INVALID_CREDENTIALS: () =>
            unauthorizedResponse(res, "Invalid email or password"),
    };

    const handler = errorMap[error.message];
    if (handler) {
        handler();
    } else {
        console.error("Auth error:", error);
        errorResponse(res, "Internal server error");
    }
};

export const handleProfileError = (res, error) => {
    const errorMap = {
        CURRENT_PASSWORD_REQUIRED: () =>
            badRequestResponse(
                res,
                "Current password is required to set new password"
            ),
        INVALID_CURRENT_PASSWORD: () =>
            unauthorizedResponse(res, "Current password is incorrect"),
        USER_NOT_FOUND: () => notFoundResponse(res, "User not found"),
        UPLOAD_FAILED: () => errorResponse(res, "Failed to upload image", 502),
        DELETE_FAILED: () => errorResponse(res, "Failed to delete image", 502),
    };

    const handler = errorMap[error.message];
    if (handler) {
        handler();
    } else {
        console.error("Profile error:", error);
        errorResponse(res, "Internal server error");
    }
};

export const handleCloudinaryError = (res, error) => {
    const errorMap = {
        UPLOAD_FAILED: () =>
            errorResponse(res, "Failed to upload image to cloud storage", 502),
        DELETE_FAILED: () =>
            errorResponse(
                res,
                "Failed to delete image from cloud storage",
                502
            ),
        INVALID_IMAGE_FORMAT: () =>
            badRequestResponse(
                res,
                "Invalid image format. Supported formats: JPEG, PNG, WebP"
            ),
        IMAGE_TOO_LARGE: () =>
            badRequestResponse(res, "Image size too large. Maximum size: 5MB"),
        CLOUDINARY_CONFIG_ERROR: () =>
            errorResponse(res, "Cloud storage configuration error", 503),
        IMAGE_PROCESSING_ERROR: () =>
            errorResponse(res, "Error processing image", 500),
    };

    const handler = errorMap[error.message];
    if (handler) {
        handler();
    } else {
        console.error("Cloudinary error:", error);
        errorResponse(res, "Image service temporarily unavailable");
    }
};

export const handleTokenError = (res, error) => {
    const errorMap = {
        REFRESH_TOKEN_REQUIRED: () =>
            badRequestResponse(res, "Refresh token required"),
        TOKEN_NOT_FOUND: () =>
            unauthorizedResponse(res, "Invalid refresh token"),
        TOKEN_EXPIRED: () => unauthorizedResponse(res, "Refresh token expired"),
        INVALID_ACCESS_TOKEN: () =>
            unauthorizedResponse(res, "Invalid access token"),
        INVALID_REFRESH_TOKEN: () =>
            unauthorizedResponse(res, "Invalid refresh token"),
        REFRESH_TOKEN_EXPIRED: () =>
            unauthorizedResponse(res, "Refresh token expired"),
    };

    const handler = errorMap[error.message];
    if (handler) {
        handler();
    } else {
        console.error("Token error:", error);
        errorResponse(res, "Token service error");
    }
};

export const handleConversationError = (res, error) => {
    const errorMap = {
        CONVERSATION_ALREADY_EXISTS: () =>
            conflictResponse(res, "Conversation already exists"),
        CONVERSATION_NOT_FOUND: () =>
            notFoundResponse(res, "Conversation not found"),
        USER_NOT_FOUND: () => notFoundResponse(res, "User not found"),
    };

    const handler = errorMap[error.message];
    if (handler) {
        handler();
    } else {
        console.error("Conversation error:", error);
        errorResponse(res, "Internal server error");
    }
};

export const handleMessageError = (res, error) => {
    const errorMap = {
        CONVERSATION_NOT_FOUND_OR_ACCESS_DENIED: () =>
            notFoundResponse(res, "Conversation not found or access denied"),
        MESSAGE_NOT_FOUND: () => notFoundResponse(res, "Message not found"),
        MESSAGE_NOT_FOUND_OR_NOT_EDITABLE: () =>
            unauthorizedResponse(
                res,
                "Message not found or you don't have permission to edit it"
            ),
        MESSAGE_NOT_FOUND_OR_NOT_DELETABLE: () =>
            unauthorizedResponse(
                res,
                "Message not found or you don't have permission to delete it"
            ),
        MESSAGE_TEXT_REQUIRED: () =>
            badRequestResponse(
                res,
                "Message text is required for text messages"
            ),
        FILE_URL_REQUIRED_FOR_IMAGE: () =>
            badRequestResponse(res, "File URL is required for image messages"),
        ONLY_TEXT_MESSAGES_CAN_BE_EDITED: () =>
            badRequestResponse(res, "Only text messages can be edited"),
        MESSAGE_EDIT_TIMEOUT: () =>
            badRequestResponse(
                res,
                "Message can only be edited within 5 minutes of sending"
            ),
        CANNOT_MARK_OWN_MESSAGE_READ: () =>
            badRequestResponse(res, "Cannot mark your own message as read"),
    };

    const handler = errorMap[error.message];
    if (handler) {
        handler();
    } else {
        console.error("Message error:", error);
        errorResponse(res, "Internal server error");
    }
};
```

## File: utils/jwt.js
```js
import jwt from "jsonwebtoken";

export const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15m",
    });
};

export const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "30d",
    });
};

export const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

export const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};

```

## File: utils/responseHandler.js
```js
export const successResponse = (res, msg, data = null, statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        msg,
        data,
    });
};

export const errorResponse = (res, msg, statusCode = 500) => {
    return res.status(statusCode).json({
        success: false,
        msg,
        data: null,
    });
};

export const createdResponse = (res, msg, data = null) => {
    return successResponse(res, msg, data, 201);
};

export const badRequestResponse = (res, msg) => {
    return errorResponse(res, msg, 400);
};

export const unauthorizedResponse = (res, msg = "Unauthorized") => {
    return errorResponse(res, msg, 401);
};

export const notFoundResponse = (res, msg = "Resource not found") => {
    return errorResponse(res, msg, 404);
};

export const conflictResponse = (res, msg = "Resource already exists") => {
    return errorResponse(res, msg, 409);
};

```

## File: utils/validationSchemas.js
```js
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
        avatar_file: Joi.any().optional(),
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
};

export const messageValidation = {
    createMessage: Joi.object({
        message_text: Joi.string().max(1000).when("message_type", {
            is: "TEXT",
            then: Joi.required(),
            otherwise: Joi.optional(),
        }),
        message_type: Joi.string().valid("TEXT", "IMAGE").default("TEXT"),
        file_url: Joi.string().uri().when("message_type", {
            is: "IMAGE",
            then: Joi.required(),
            otherwise: Joi.optional(),
        }),
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

    queryParams: Joi.object({
        page: Joi.number().integer().min(1).default(1),
        limit: Joi.number().integer().min(1).max(100).default(50),
    }),
};

export const readReceiptValidation = {
    markAsRead: Joi.object({
        message_id: uuidSchema,
    }),
};

```

