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

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Message management endpoints
 */

/**
 * @swagger
 * /conversations/{conversation_id}/messages:
 *   post:
 *     summary: Send a message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ConversationIdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMessageRequest'
 *     responses:
 *       201:
 *         description: Message sent successfully
 */
router.post(
    "/:conversation_id/messages",
    validateParams(messageValidation.conversationParams),
    validate(messageValidation.createMessage),
    createMessage
);

/**
 * @swagger
 * /conversations/{conversation_id}/messages:
 *   get:
 *     summary: Get messages from a conversation
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ConversationIdParam'
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *     responses:
 *       200:
 *         description: Messages retrieved successfully
 */
router.get(
    "/:conversation_id/messages",
    validateParams(messageValidation.conversationParams),
    validateQuery(messageValidation.queryParams),
    getMessages
);

/**
 * @swagger
 * /conversations/{conversation_id}/unread-count:
 *   get:
 *     summary: Get unread message count
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ConversationIdParam'
 *     responses:
 *       200:
 *         description: Unread count retrieved successfully
 */
router.get(
    "/:conversation_id/unread-count",
    validateParams(messageValidation.conversationParams),
    getUnreadCount
);

/**
 * @swagger
 * /conversations/{conversation_id}/messages/{message_id}:
 *   get:
 *     summary: Get a specific message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ConversationIdParam'
 *       - name: message_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Message retrieved successfully
 */
router.get(
    "/:conversation_id/messages/:message_id",
    validateParams(messageValidation.messageParamsWithConversation),
    getMessage
);

/**
 * @swagger
 * /conversations/{conversation_id}/messages/{message_id}:
 *   put:
 *     summary: Update a message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ConversationIdParam'
 *       - name: message_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateMessageRequest'
 *     responses:
 *       200:
 *         description: Message updated successfully
 */
router.put(
    "/:conversation_id/messages/:message_id",
    validateParams(messageValidation.messageParamsWithConversation),
    validate(messageValidation.updateMessage),
    updateMessage
);

/**
 * @swagger
 * /conversations/{conversation_id}/messages/{message_id}:
 *   delete:
 *     summary: Delete a message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ConversationIdParam'
 *       - name: message_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Message deleted successfully
 */
router.delete(
    "/:conversation_id/messages/:message_id",
    validateParams(messageValidation.messageParamsWithConversation),
    deleteMessage
);

/**
 * @swagger
 * /conversations/{conversation_id}/messages/{message_id}/read:
 *   post:
 *     summary: Mark a message as read
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ConversationIdParam'
 *       - name: message_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Message marked as read
 */
router.post(
    "/:conversation_id/messages/:message_id/read",
    validateParams(messageValidation.messageParamsWithConversation),
    markAsRead
);

export default router;
