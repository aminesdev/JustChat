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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             examples:
 *               success:
 *                 value:
 *                   success: true
 *                   msg: "Conversation created successfully"
 *                   data:
 *                     conversation:
 *                       id: "123e4567-e89b-12d3-a456-426614174000"
 *                       user1_id: "123e4567-e89b-12d3-a456-426614174000"
 *                       user2_id: "123e4567-e89b-12d3-a456-426614174001"
 *                       created_at: "2023-10-01T12:00:00Z"
 *                       user1:
 *                         id: "123e4567-e89b-12d3-a456-426614174000"
 *                         email: "user1@example.com"
 *                         full_name: "John Doe"
 *                         avatar_url: null
 *                         is_online: true
 *                         last_seen: "2023-10-01T12:00:00Z"
 *                       user2:
 *                         id: "123e4567-e89b-12d3-a456-426614174001"
 *                         email: "user2@example.com"
 *                         full_name: "Jane Smith"
 *                         avatar_url: null
 *                         is_online: false
 *                         last_seen: "2023-10-01T11:00:00Z"
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             examples:
 *               success:
 *                 value:
 *                   success: true
 *                   msg: "Conversations retrieved successfully"
 *                   data:
 *                     conversations:
 *                       - id: "123e4567-e89b-12d3-a456-426614174000"
 *                         user1_id: "123e4567-e89b-12d3-a456-426614174000"
 *                         user2_id: "123e4567-e89b-12d3-a456-426614174001"
 *                         created_at: "2023-10-01T12:00:00Z"
 *                         user1:
 *                           id: "123e4567-e89b-12d3-a456-426614174000"
 *                           email: "user1@example.com"
 *                           full_name: "John Doe"
 *                           avatar_url: null
 *                           is_online: true
 *                           last_seen: "2023-10-01T12:00:00Z"
 *                         user2:
 *                           id: "123e4567-e89b-12d3-a456-426614174001"
 *                           email: "user2@example.com"
 *                           full_name: "Jane Smith"
 *                           avatar_url: null
 *                           is_online: false
 *                           last_seen: "2023-10-01T11:00:00Z"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get("/", getUserConversations);

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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
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
