import express from "express";
import authRoutes from "./auth.js";
import profileRoutes from "./profile.js";
import conversationRoutes from "./conversation.js";
import messageRoutes from "./message.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: User authentication endpoints
 *   - name: Profile
 *     description: User profile management
 *   - name: Conversations
 *     description: Conversation management
 *   - name: Messages
 *     description: Message management
 *   - name: System
 *     description: System health and status
 */

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     tags: [System]
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             examples:
 *               health:
 *                 value:
 *                   success: true
 *                   msg: "Chat App API is running"
 *                   data:
 *                     timestamp: "2023-10-01T12:00:00Z"
 *                     version: "1.0.0"
 */

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/conversations", conversationRoutes);
router.use("/conversations", messageRoutes);

export default router;
