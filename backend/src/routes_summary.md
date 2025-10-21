# Project: routes

## File: auth.js
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

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupRequest'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             examples:
 *               success:
 *                 value:
 *                   success: true
 *                   msg: "User created successfully"
 *                   data:
 *                     user:
 *                       id: "123e4567-e89b-12d3-a456-426614174000"
 *                       email: "user@example.com"
 *                       full_name: "John Doe"
 *                       avatar_url: null
 *                       is_online: false
 *                       last_seen: "2023-10-01T12:00:00Z"
 *                       created_at: "2023-10-01T12:00:00Z"
 *                     accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       409:
 *         $ref: '#/components/responses/ConflictError'
 */
router.post("/signup", validate(authValidation.signup), signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             examples:
 *               success:
 *                 value:
 *                   success: true
 *                   msg: "Login successful"
 *                   data:
 *                     user:
 *                       id: "123e4567-e89b-12d3-a456-426614174000"
 *                       email: "user@example.com"
 *                       full_name: "John Doe"
 *                       avatar_url: null
 *                       is_online: true
 *                       last_seen: "2023-10-01T12:00:00Z"
 *                       created_at: "2023-10-01T12:00:00Z"
 *                     accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/BadRequestError'
 */
router.post("/login", validate(authValidation.login), login);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshTokenRequest'
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             examples:
 *               success:
 *                 value:
 *                   success: true
 *                   msg: "Access token refreshed successfully"
 *                   data:
 *                     accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post(
    "/refresh-token",
    validate(authValidation.refreshToken),
    refreshToken
);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LogoutRequest'
 *     responses:
 *       200:
 *         description: Logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 */
router.post("/logout", validate(authValidation.logout), logout);

/**
 * @swagger
 * /auth/logout-all:
 *   post:
 *     summary: Logout from all devices
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out from all devices
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post("/logout-all", authenticateToken, logoutAll);

export default router;

```

## File: conversation.js
```js
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

```

## File: index.js
```js
import express from "express";
import authRoutes from "./auth.js";
import oauthRoutes from "./oauth.js";
import profileRoutes from "./profile.js";
import conversationRoutes from "./conversation.js";
import messageRoutes from "./message.js";
import userRoutes from "./user.js";
import uploadRoutes from "./upload.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/auth/oauth", oauthRoutes);
router.use("/profile", profileRoutes);
router.use("/conversations", conversationRoutes);
router.use("/conversations", messageRoutes);
router.use("/users", userRoutes);
router.use("/upload", uploadRoutes);

export default router;

```

## File: message.js
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
    markAllAsRead,
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
 * /conversations/{conversation_id}/mark-all-read:
 *   post:
 *     summary: Mark all messages in conversation as read
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ConversationIdParam'
 *     responses:
 *       200:
 *         description: All messages marked as read successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             examples:
 *               success:
 *                 value:
 *                   success: true
 *                   msg: "All messages marked as read"
 *                   data:
 *                     marked_count: 5
 *                     unread_count: 0
 *                     has_unread_messages: false
 *                     conversation:
 *                       id: "123e4567-e89b-12d3-a456-426614174000"
 *                       user1_id: "123e4567-e89b-12d3-a456-426614174000"
 *                       user2_id: "123e4567-e89b-12d3-a456-426614174001"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.post(
    "/:conversation_id/mark-all-read",
    validateParams(messageValidation.conversationParams),
    markAllAsRead
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

```

## File: oauth.js
```js
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

```

## File: profile.js
```js
import express from "express";
import { updateProfile, getProfile } from "../controllers/profileController.js";
import { authenticateToken } from "../middlewares/auth.js";
import { validate } from "../middlewares/validation.js";
import { profileValidation } from "../utils/validationSchemas.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: User profile management endpoints
 */

/**
 * @swagger
 * /profile/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */
router.get("/me", authenticateToken, getProfile);

/**
 * @swagger
 * /profile/update:
 *   put:
 *     summary: Update user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProfileRequest'
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */
router.put(
    "/update",
    authenticateToken,
    upload.single("avatar_file"),
    updateProfile
);

export default router;

```

## File: upload.js
```js
import express from "express";
import { uploadImage } from "../controllers/uploadController.js";
import { authenticateToken } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.use(authenticateToken);

/**
 * @swagger
 * /upload/image:
 *   post:
 *     summary: Upload an image (for messages or profile)
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               type:
 *                 type: string
 *                 enum: [message, profile]
 *                 default: message
 *     responses:
 *       200:
 *         description: Image uploaded successfully
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
 *                     url:
 *                       type: string
 *                     public_id:
 *                       type: string
 */
router.post("/image", upload.single("image"), uploadImage);

export default router;

```

## File: user.js
```js
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

```

