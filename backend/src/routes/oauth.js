import express from "express";
import {
    githubAuth,
    githubCallback,
    getOAuthProviders,
    getOAuthHealth,
    getOAuthStatus,
} from "../controllers/oauthController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: OAuth
 *   description: OAuth authentication endpoints
 */

/**
 * @swagger
 * /auth/oauth/providers:
 *   get:
 *     summary: Get available OAuth providers
 *     tags: [OAuth]
 *     responses:
 *       200:
 *         description: OAuth providers retrieved successfully
 */
router.get("/providers", getOAuthProviders);

/**
 * @swagger
 * /auth/oauth/health:
 *   get:
 *     summary: Check OAuth configuration health
 *     tags: [OAuth]
 *     responses:
 *       200:
 *         description: OAuth health status
 */
router.get("/health", getOAuthHealth);

/**
 * @swagger
 * /auth/oauth/status:
 *   get:
 *     summary: Check if OAuth is enabled
 *     tags: [OAuth]
 *     responses:
 *       200:
 *         description: OAuth status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     enabled:
 *                       type: boolean
 *                     timestamp:
 *                       type: string
 */
router.get("/status", getOAuthStatus);

// GitHub OAuth routes
router.get("/github", githubAuth);
router.get("/github/callback", githubCallback);

export default router;
