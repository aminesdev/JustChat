import express from "express";
import {
    searchUsers,
    getAllUsers,
    getUserById,
    updateOnlineStatus,
} from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/auth.js";
import {
    validate,
    validateQuery,
    validateParams,
} from "../middlewares/validation.js";
import { userValidation } from "../utils/validationSchemas.js";

const router = express.Router();

router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and search endpoints
 */

/**
 * @swagger
 * /users/search:
 *   get:
 *     summary: Search for users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: q
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 2
 *         description: Search query (searches in full name and email)
 *         example: "john"
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *         description: Maximum number of results
 *     responses:
 *       200:
 *         description: Users found successfully
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get("/search", validateQuery(userValidation.searchQuery), searchUsers);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (excluding current user)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 50
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get("/", validateQuery(userValidation.getAllUsers), getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get("/:id", validateParams(userValidation.userIdParams), getUserById);

/**
 * @swagger
 * /users/online-status:
 *   put:
 *     summary: Update user online status
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - is_online
 *             properties:
 *               is_online:
 *                 type: boolean
 *                 description: Online status
 *                 example: true
 *     responses:
 *       200:
 *         description: Online status updated successfully
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.put(
    "/online-status",
    validate(userValidation.updateOnlineStatus),
    updateOnlineStatus
);

export default router;
