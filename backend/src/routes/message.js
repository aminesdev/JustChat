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
