import express from "express";
import {
    createConversation,
    getUserConversations,
    getConversation,
    getConversationParticipants,
    deleteConversation,
    checkConversation, // Add this import
} from "../controllers/conversationController.js";
import { authenticateToken } from "../middlewares/auth.js";
import { validate, validateParams } from "../middlewares/validation.js";
import { conversationValidation } from "../utils/validationSchemas.js";

const router = express.Router();

router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   name: Conversations
 *   description: Conversation management endpoints
 */

/**
 * @swagger
 * /conversations:
 *   post:
 *     summary: Create a new conversation
 *     tags: [Conversations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateConversationRequest'
 *     responses:
 *       201:
 *         description: Conversation created successfully
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       409:
 *         $ref: '#/components/responses/ConflictError'
 */
router.post(
    "/",
    validate(conversationValidation.createConversation),
    createConversation
);

/**
 * @swagger
 * /conversations:
 *   get:
 *     summary: Get user's conversations
 *     tags: [Conversations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Conversations retrieved successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get("/", getUserConversations);

/**
 * @swagger
 * /conversations/check/{user2_id}:
 *   get:
 *     summary: Check if conversation exists with user
 *     tags: [Conversations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: user2_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the other user
 *     responses:
 *       200:
 *         description: Conversation check completed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             examples:
 *               exists:
 *                 value:
 *                   success: true
 *                   msg: "Conversation check completed"
 *                   data:
 *                     exists: true
 *                     conversation:
 *                       id: "123e4567-e89b-12d3-a456-426614174000"
 *                       user1_id: "123e4567-e89b-12d3-a456-426614174000"
 *                       user2_id: "123e4567-e89b-12d3-a456-426614174001"
 *               notExists:
 *                 value:
 *                   success: true
 *                   msg: "Conversation check completed"
 *                   data:
 *                     exists: false
 *                     conversation: null
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get(
    "/check/:user2_id",
    validateParams(conversationValidation.checkConversation),
    checkConversation
);

/**
 * @swagger
 * /conversations/{id}:
 *   get:
 *     summary: Get specific conversation
 *     tags: [Conversations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ConversationId'
 *     responses:
 *       200:
 *         description: Conversation retrieved successfully
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get(
    "/:id",
    validateParams(conversationValidation.conversationParams),
    getConversation
);

/**
 * @swagger
 * /conversations/{id}/participants:
 *   get:
 *     summary: Get conversation participants
 *     tags: [Conversations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ConversationId'
 *     responses:
 *       200:
 *         description: Participants retrieved successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get(
    "/:id/participants",
    validateParams(conversationValidation.conversationParams),
    getConversationParticipants
);

/**
 * @swagger
 * /conversations/{id}:
 *   delete:
 *     summary: Delete a conversation
 *     tags: [Conversations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ConversationId'
 *     responses:
 *       200:
 *         description: Conversation deleted successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.delete(
    "/:id",
    validateParams(conversationValidation.conversationParams),
    deleteConversation
);

export default router;
