# Project: src

## File: app.js
```js
import express from "express";
import routes from "./routes/index.js";
import { specs, swaggerUi } from "./config/swagger.js";
import cors from "cors";

const app = express();

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        const allowedOrigins = ["http://localhost:5176/"];

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log("Blocked by CORS:", origin);
            callback(null, true); // Allow all origins in development
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};


// Parse JSON bodies
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Swagger documentation
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
        explorer: true,
        customCss: ".swagger-ui .topbar { display: none }",
        customSiteTitle: "Chat App API Documentation",
    })
);

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        msg: "Chat App API is running",
        data: {
            timestamp: new Date().toISOString(),
            version: "1.0.0",
        },
    });
});

// API routes
app.use("/api", routes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        msg: "Route not found",
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(err.status || 500).json({
        success: false,
        msg: err.message || "Internal server error",
    });
});

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

## File: config/oauth.js
```js
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { handleGitHubUser } from "../utils/oauthHelpers.js";
import { userRepository } from "../repositories/userRepository.js";

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userRepository.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "/api/auth/oauth/github/callback",
            scope: ["user:email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log("GitHub profile received:", {
                    id: profile.id,
                    username: profile.username,
                    displayName: profile.displayName,
                    emails: profile.emails,
                    photos: profile.photos,
                });

                const user = await handleGitHubUser(profile);
                done(null, user);
            } catch (error) {
                console.error("GitHub OAuth error:", error);
                done(error, null);
            }
        }
    )
);

export default passport;

```

## File: config/swagger.js
```js
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Chat App API",
            version: "1.0.0",
            description: `
# Chat App API

A real-time chat application backend with complete messaging features.

## Features:
- User authentication with JWT
- Real-time messaging (text and images)
- Conversation management
- Read receipts and message status
- File upload with Cloudinary
- Profile management

## Authentication:
- Uses JWT Bearer tokens
- Access tokens expire in 15 minutes
- Refresh tokens expire in 30 days
- Include token in header: \`Authorization: Bearer <token>\`

## Common Status Codes:
- 200: Success
- 201: Created
- 400: Validation error
- 401: Unauthorized
- 404: Not found
- 409: Resource already exists
- 500: Server error
      `.trim(),
            contact: {
                name: "API Support",
                email: "support@chatapp.com",
            },
            license: {
                name: "MIT",
                url: "https://opensource.org/licenses/MIT",
            },
        },
        servers: [
            {
                url: "http://localhost:5001/api",
                description: "Development server",
            },
            {
                url: "https://api.chatapp.com/v1",
                description: "Production server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description:
                        "Enter your JWT access token obtained from login or signup",
                },
            },
            schemas: {
                // User Schemas
                User: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            format: "uuid",
                            example: "123e4567-e89b-12d3-a456-426614174000",
                        },
                        email: {
                            type: "string",
                            format: "email",
                            example: "user@example.com",
                        },
                        full_name: {
                            type: "string",
                            example: "John Doe",
                        },
                        avatar_url: {
                            type: "string",
                            nullable: true,
                            example:
                                "https://res.cloudinary.com/dhv1xdi7a/image/upload/v1234567/avatar.jpg",
                        },
                        is_online: {
                            type: "boolean",
                            example: true,
                        },
                        last_seen: {
                            type: "string",
                            format: "date-time",
                            example: "2023-10-01T12:00:00Z",
                        },
                        created_at: {
                            type: "string",
                            format: "date-time",
                            example: "2023-10-01T12:00:00Z",
                        },
                    },
                },

                // Auth Schemas
                SignupRequest: {
                    type: "object",
                    required: ["email", "password", "full_name"],
                    properties: {
                        email: {
                            type: "string",
                            format: "email",
                            example: "user@example.com",
                        },
                        password: {
                            type: "string",
                            minLength: 6,
                            example: "password123",
                        },
                        full_name: {
                            type: "string",
                            minLength: 2,
                            maxLength: 100,
                            example: "John Doe",
                        },
                    },
                },
                LoginRequest: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: {
                            type: "string",
                            format: "email",
                            example: "user@example.com",
                        },
                        password: {
                            type: "string",
                            example: "password123",
                        },
                    },
                },
                AuthResponse: {
                    type: "object",
                    properties: {
                        user: {
                            $ref: "#/components/schemas/User",
                        },
                        accessToken: {
                            type: "string",
                            description: "JWT Access Token (15 minutes expiry)",
                            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                        },
                        refreshToken: {
                            type: "string",
                            description: "JWT Refresh Token (30 days expiry)",
                            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                        },
                    },
                },
                RefreshTokenRequest: {
                    type: "object",
                    required: ["refreshToken"],
                    properties: {
                        refreshToken: {
                            type: "string",
                            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                        },
                    },
                },
                RefreshTokenResponse: {
                    type: "object",
                    properties: {
                        accessToken: {
                            type: "string",
                            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                        },
                    },
                },
                LogoutRequest: {
                    type: "object",
                    required: ["refreshToken"],
                    properties: {
                        refreshToken: {
                            type: "string",
                            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                        },
                    },
                },

                // Conversation Schemas
                Conversation: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            format: "uuid",
                            example: "123e4567-e89b-12d3-a456-426614174000",
                        },
                        user1_id: {
                            type: "string",
                            format: "uuid",
                            example: "123e4567-e89b-12d3-a456-426614174000",
                        },
                        user2_id: {
                            type: "string",
                            format: "uuid",
                            example: "123e4567-e89b-12d3-a456-426614174001",
                        },
                        created_at: {
                            type: "string",
                            format: "date-time",
                            example: "2023-10-01T12:00:00Z",
                        },
                        user1: {
                            $ref: "#/components/schemas/User",
                        },
                        user2: {
                            $ref: "#/components/schemas/User",
                        },
                        last_message: {
                            type: "object",
                            properties: {
                                id: {
                                    type: "string",
                                    example:
                                        "123e4567-e89b-12d3-a456-426614174002",
                                },
                                message_text: {
                                    type: "string",
                                    example: "Hello there!",
                                },
                                created_at: {
                                    type: "string",
                                    format: "date-time",
                                    example: "2023-10-01T12:05:00Z",
                                },
                                sender: {
                                    type: "object",
                                    properties: {
                                        id: {
                                            type: "string",
                                            example:
                                                "123e4567-e89b-12d3-a456-426614174000",
                                        },
                                        full_name: {
                                            type: "string",
                                            example: "John Doe",
                                        },
                                    },
                                },
                            },
                        },
                        unread_count: {
                            type: "integer",
                            example: 5,
                        },
                    },
                },
                CreateConversationRequest: {
                    type: "object",
                    required: ["user2_id"],
                    properties: {
                        user2_id: {
                            type: "string",
                            format: "uuid",
                            example: "123e4567-e89b-12d3-a456-426614174001",
                        },
                    },
                },

                // Message Schemas
                Message: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            format: "uuid",
                            example: "123e4567-e89b-12d3-a456-426614174002",
                        },
                        conversation_id: {
                            type: "string",
                            format: "uuid",
                            example: "123e4567-e89b-12d3-a456-426614174000",
                        },
                        sender_id: {
                            type: "string",
                            format: "uuid",
                            example: "123e4567-e89b-12d3-a456-426614174000",
                        },
                        message_type: {
                            type: "string",
                            enum: ["TEXT", "IMAGE"],
                            example: "TEXT",
                        },
                        message_text: {
                            type: "string",
                            nullable: true,
                            example: "Hello, how are you?",
                        },
                        file_url: {
                            type: "string",
                            nullable: true,
                            example:
                                "https://res.cloudinary.com/dhv1xdi7a/image/upload/v1234567/image.jpg",
                        },
                        is_delivered: {
                            type: "boolean",
                            example: true,
                        },
                        delivered_at: {
                            type: "string",
                            format: "date-time",
                            nullable: true,
                            example: "2023-10-01T12:05:00Z",
                        },
                        created_at: {
                            type: "string",
                            format: "date-time",
                            example: "2023-10-01T12:00:00Z",
                        },
                        sender: {
                            $ref: "#/components/schemas/User",
                        },
                        read_receipts: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/ReadReceipt",
                            },
                        },
                    },
                },
                CreateMessageRequest: {
                    type: "object",
                    properties: {
                        message_text: {
                            type: "string",
                            maxLength: 1000,
                            example: "Hello there!",
                        },
                        message_type: {
                            type: "string",
                            enum: ["TEXT", "IMAGE"],
                            default: "TEXT",
                        },
                        file_url: {
                            type: "string",
                            format: "uri",
                            example: "https://example.com/image.jpg",
                        },
                    },
                },
                UpdateMessageRequest: {
                    type: "object",
                    required: ["message_text"],
                    properties: {
                        message_text: {
                            type: "string",
                            maxLength: 1000,
                            example: "Updated message text",
                        },
                    },
                },

                // Profile Schemas
                UpdateProfileRequest: {
                    type: "object",
                    properties: {
                        full_name: {
                            type: "string",
                            minLength: 2,
                            maxLength: 100,
                            example: "John Updated",
                        },
                        avatar_file: {
                            type: "string",
                            format: "binary",
                            description:
                                "Image file for avatar (JPEG, PNG, WebP, max 5MB)",
                        },
                        currentPassword: {
                            type: "string",
                            minLength: 6,
                            example: "currentpassword123",
                        },
                        newPassword: {
                            type: "string",
                            minLength: 6,
                            example: "newpassword123",
                        },
                    },
                },

                // Read Receipt Schemas
                ReadReceipt: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            format: "uuid",
                            example: "123e4567-e89b-12d3-a456-426614174003",
                        },
                        message_id: {
                            type: "string",
                            format: "uuid",
                            example: "123e4567-e89b-12d3-a456-426614174002",
                        },
                        reader_id: {
                            type: "string",
                            format: "uuid",
                            example: "123e4567-e89b-12d3-a456-426614174001",
                        },
                        read_at: {
                            type: "string",
                            format: "date-time",
                            example: "2023-10-01T12:05:00Z",
                        },
                        reader: {
                            type: "object",
                            properties: {
                                id: {
                                    type: "string",
                                    format: "uuid",
                                    example:
                                        "123e4567-e89b-12d3-a456-426614174001",
                                },
                                full_name: {
                                    type: "string",
                                    example: "Jane Smith",
                                },
                            },
                        },
                    },
                },

                // Pagination and Utility Schemas
                Pagination: {
                    type: "object",
                    properties: {
                        page: {
                            type: "integer",
                            example: 1,
                        },
                        limit: {
                            type: "integer",
                            example: 50,
                        },
                        total: {
                            type: "integer",
                            example: 150,
                        },
                    },
                },
                UnreadCount: {
                    type: "object",
                    properties: {
                        unread_count: {
                            type: "integer",
                            example: 5,
                        },
                    },
                },
                ParticipantsResponse: {
                    type: "object",
                    properties: {
                        participants: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/User",
                            },
                        },
                    },
                },

                // Response Schemas
                SuccessResponse: {
                    type: "object",
                    properties: {
                        success: {
                            type: "boolean",
                            example: true,
                        },
                        msg: {
                            type: "string",
                            example: "Operation completed successfully",
                        },
                        data: {
                            type: "object",
                            additionalProperties: true,
                        },
                    },
                },
                ErrorResponse: {
                    type: "object",
                    properties: {
                        success: {
                            type: "boolean",
                            example: false,
                        },
                        msg: {
                            type: "string",
                            example: "Error message description",
                        },
                        data: {
                            type: "object",
                            nullable: true,
                        },
                    },
                },
                ValidationError: {
                    type: "object",
                    properties: {
                        success: {
                            type: "boolean",
                            example: false,
                        },
                        msg: {
                            type: "string",
                            example:
                                "Validation failed: email must be a valid email",
                        },
                        data: {
                            type: "object",
                            nullable: true,
                        },
                    },
                },
            },
            responses: {
                UnauthorizedError: {
                    description: "Access token is missing or invalid",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/ErrorResponse",
                            },
                            examples: {
                                missingToken: {
                                    summary: "Missing access token",
                                    value: {
                                        success: false,
                                        msg: "Access token required",
                                        data: null,
                                    },
                                },
                                invalidToken: {
                                    summary: "Invalid access token",
                                    value: {
                                        success: false,
                                        msg: "Invalid or expired token",
                                        data: null,
                                    },
                                },
                            },
                        },
                    },
                },
                ValidationError: {
                    description: "Request validation failed",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/ValidationError",
                            },
                        },
                    },
                },
                NotFoundError: {
                    description: "Resource not found",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/ErrorResponse",
                            },
                            examples: {
                                userNotFound: {
                                    summary: "User not found",
                                    value: {
                                        success: false,
                                        msg: "User not found",
                                        data: null,
                                    },
                                },
                                conversationNotFound: {
                                    summary: "Conversation not found",
                                    value: {
                                        success: false,
                                        msg: "Conversation not found",
                                        data: null,
                                    },
                                },
                                messageNotFound: {
                                    summary: "Message not found",
                                    value: {
                                        success: false,
                                        msg: "Message not found",
                                        data: null,
                                    },
                                },
                            },
                        },
                    },
                },
                ConflictError: {
                    description: "Resource already exists",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/ErrorResponse",
                            },
                            examples: {
                                userExists: {
                                    summary: "User already exists",
                                    value: {
                                        success: false,
                                        msg: "User already exists",
                                        data: null,
                                    },
                                },
                                conversationExists: {
                                    summary: "Conversation already exists",
                                    value: {
                                        success: false,
                                        msg: "Conversation already exists",
                                        data: null,
                                    },
                                },
                            },
                        },
                    },
                },
                BadRequestError: {
                    description: "Bad request",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/ErrorResponse",
                            },
                            examples: {
                                invalidCredentials: {
                                    summary: "Invalid credentials",
                                    value: {
                                        success: false,
                                        msg: "Invalid email or password",
                                        data: null,
                                    },
                                },
                                currentPasswordRequired: {
                                    summary: "Current password required",
                                    value: {
                                        success: false,
                                        msg: "Current password is required to set new password",
                                        data: null,
                                    },
                                },
                            },
                        },
                    },
                },
            },
            parameters: {
                ConversationId: {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string",
                        format: "uuid",
                    },
                    description: "Conversation ID",
                },
                MessageId: {
                    name: "message_id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string",
                        format: "uuid",
                    },
                    description: "Message ID",
                },
                ConversationIdParam: {
                    name: "conversation_id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string",
                        format: "uuid",
                    },
                    description: "Conversation ID",
                },
                PageParam: {
                    name: "page",
                    in: "query",
                    schema: {
                        type: "integer",
                        minimum: 1,
                        default: 1,
                    },
                    description: "Page number",
                },
                LimitParam: {
                    name: "limit",
                    in: "query",
                    schema: {
                        type: "integer",
                        minimum: 1,
                        maximum: 100,
                        default: 50,
                    },
                    description: "Number of items per page",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
        tags: [
            {
                name: "Authentication",
                description: "User authentication endpoints",
            },
            {
                name: "Profile",
                description: "User profile management",
            },
            {
                name: "Users",
                description: "User search and management",
            },
            {
                name: "Upload",
                description: "File upload endpoints",
            },
            {
                name: "Conversations",
                description: "Conversation management",
            },
            {
                name: "Messages",
                description: "Message management",
            },
            {
                name: "System",
                description: "System health and status",
            },
        ],
    },
    apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };

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
    checkConversationService,
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

export const checkConversation = async (req, res) => {
    try {
        const user1_id = req.user.userId;
        const { user2_id } = req.params;

        const conversation = await checkConversationService(user1_id, user2_id);

        successResponse(res, "Conversation check completed", {
            exists: !!conversation,
            conversation: conversation || null,
        });
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

## File: controllers/oauthController.js
```js
import passport from "../config/oauth.js";
import { oauthService } from "../services/oauthService.js";
import { successResponse } from "../utils/responseHandler.js";
import { handleOAuthError } from "../utils/errorHandler.js";

// GitHub OAuth initiation
export const githubAuth = passport.authenticate("github", {
    scope: ["user:email"],
});

// GitHub OAuth callback
export const githubCallback = (req, res, next) => {
    try {
        // Validate callback parameters first
        oauthService.validateCallbackParams(req);

        passport.authenticate(
            "github",
            { session: false },
            (err, user, info) => {
                handleOAuthCallback(req, res, err, user, info);
            }
        )(req, res, next);
    } catch (error) {
        console.error("OAuth callback validation error:", error);
        handleOAuthError(res, error);
    }
};

// Handle OAuth callback
const handleOAuthCallback = (req, res, err, user, info) => {
    if (err) {
        console.error("OAuth callback error:", err);
        return res.redirect(
            `${process.env.CLIENT_URL}${
                process.env.CLIENT_ERROR_REDIRECT || "/login"
            }?error=oauth_failed&message=${encodeURIComponent(err.message)}`
        );
    }

    if (!user) {
        return res.redirect(
            `${process.env.CLIENT_URL}${
                process.env.CLIENT_ERROR_REDIRECT || "/login"
            }?error=authentication_failed`
        );
    }

    try {
        const config = oauthService.validateOAuthConfig();

        // Redirect to frontend with tokens as URL parameters
        const redirectUrl = `${config.client.url}${
            config.client.successRedirect
        }?accessToken=${user.accessToken}&refreshToken=${
            user.refreshToken
        }&user=${encodeURIComponent(JSON.stringify(user.user))}`;

        res.redirect(redirectUrl);
    } catch (redirectError) {
        console.error("Redirect error:", redirectError);
        res.redirect(
            `${process.env.CLIENT_URL}${
                process.env.CLIENT_ERROR_REDIRECT || "/login"
            }?error=redirect_failed`
        );
    }
};

// Get OAuth providers configuration
export const getOAuthProviders = (req, res) => {
    try {
        const config = oauthService.getOAuthConfig();

        successResponse(res, "OAuth providers retrieved successfully", config);
    } catch (error) {
        handleOAuthError(res, error);
    }
};

// Check OAuth health status
export const getOAuthHealth = (req, res) => {
    try {
        const config = oauthService.validateOAuthConfig();

        successResponse(res, "OAuth configuration is healthy", {
            healthy: true,
            github: config.github.enabled,
            clientUrl: config.client.url,
            successRedirect: config.client.successRedirect,
            errorRedirect: config.client.errorRedirect,
            timestamp: new Date().toISOString(),
            warnings: config.warnings,
        });
    } catch (error) {
        successResponse(res, "OAuth configuration has issues", {
            healthy: false,
            error: error.message,
            timestamp: new Date().toISOString(),
        });
    }
};

// Check if OAuth is enabled
export const getOAuthStatus = (req, res) => {
    try {
        const isEnabled = oauthService.isOAuthEnabled();

        successResponse(res, "OAuth status retrieved", {
            enabled: isEnabled,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        handleOAuthError(res, error);
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

        const updateData = {
            ...req.body,
            avatar_file: req.file,
        };

        const updatedUser = await updateProfileService(userId, updateData);

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

## File: controllers/uploadController.js
```js
import { uploadImageService } from "../services/fileStorageService.js";
import { successResponse } from "../utils/responseHandler.js";
import { handleCloudinaryError } from "../utils/errorHandler.js";

export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                msg: "No image file provided",
            });
        }

        const folder = req.body.type === "profile" ? "profiles" : "messages";
        const result = await uploadImageService(req.file.buffer, folder);

        successResponse(res, "Image uploaded successfully", {
            url: result.secure_url,
            public_id: result.public_id,
        });
    } catch (error) {
        handleCloudinaryError(res, error);
    }
};

```

## File: controllers/userController.js
```js
import {
    searchUsersService,
    updateOnlineStatusService,
    getAllUsersService,
    getUserByIdService,
} from "../services/userService.js";
import { successResponse } from "../utils/responseHandler.js";
import { handleUserError } from "../utils/errorHandler.js";

export const searchUsers = async (req, res) => {
    try {
        const currentUserId = req.user.userId;
        const { q, limit = 10 } = req.query;

        const users = await searchUsersService(q, currentUserId, limit);

        successResponse(res, "Users retrieved successfully", {
            users,
            count: users.length,
        });
    } catch (error) {
        handleUserError(res, error);
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const currentUserId = req.user.userId;
        const { limit = 50 } = req.query;

        const users = await getAllUsersService(currentUserId, limit);

        successResponse(res, "Users retrieved successfully", {
            users,
            count: users.length,
        });
    } catch (error) {
        handleUserError(res, error);
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserByIdService(id);

        successResponse(res, "User retrieved successfully", { user });
    } catch (error) {
        handleUserError(res, error);
    }
};

export const updateOnlineStatus = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { is_online } = req.body;

        const updatedUser = await updateOnlineStatusService(userId, is_online);

        successResponse(res, "Online status updated successfully", {
            user: updatedUser,
        });
    } catch (error) {
        handleUserError(res, error);
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

## File: middlewares/upload.js
```js
import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

export { upload };
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
            skip: parseInt(skip),
            take: parseInt(limit),
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
    
    findMany: async (excludeUserId, limit = 50) => {
        return await prisma.user.findMany({
            where: {
                id: { not: excludeUserId },
            },
            select: {
                id: true,
                email: true,
                full_name: true,
                avatar_url: true,
                is_online: true,
                last_seen: true,
            },
            take: parseInt(limit),
            orderBy: [{ is_online: "desc" }, { full_name: "asc" }],
        });
    },

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

    searchUsers: async (query, currentUserId, limit = 10) => {
        return await prisma.user.findMany({
            where: {
                AND: [
                    { id: { not: currentUserId } }, // Exclude current user
                    {
                        OR: [
                            {
                                full_name: {
                                    contains: query,
                                    mode: "insensitive",
                                },
                            },
                            { email: { contains: query, mode: "insensitive" } },
                        ],
                    },
                ],
            },
            select: {
                id: true,
                email: true,
                full_name: true,
                avatar_url: true,
                is_online: true,
                last_seen: true,
            },
            take: parseInt(limit),
            orderBy: [
                { is_online: "desc" }, // Online users first
                { full_name: "asc" },
            ],
        });
    },

    updateOnlineStatus: async (userId, isOnline) => {
        return await prisma.user.update({
            where: { id: userId },
            data: {
                is_online: isOnline,
                last_seen: new Date(),
            },
            select: {
                id: true,
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

## File: routes/conversation.js
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

## File: routes/index.js
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

```

## File: routes/oauth.js
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

## File: routes/profile.js
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

## File: routes/upload.js
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

## File: routes/user.js
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

## File: server.js
```js
import app from "./app.js";
import dotenv from "dotenv";
import { connectDb } from "./config/database.js";
import { testCloudinary } from "./config/cloudinary.js";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        console.log("Starting Chat App Server...");

        // Connect to database
        await connectDb();
        console.log("Database connected successfully");

        // Test Cloudinary configuration
        await testCloudinary();
        console.log("Cloudinary configured successfully");

        // Start server
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
            console.log(
                `API Documentation: http://localhost:${PORT}/api-docs`
            );
            console.log(`Health Check: http://localhost:${PORT}/health`);
            console.log(
                `Environment: ${process.env.NODE_ENV || "development"}`
            );
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    process.exit(1);
});

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

export const checkConversationService = async (user1_id, user2_id) => {
    const [sortedUser1, sortedUser2] = [user1_id, user2_id].sort();

    const conversation = await conversationRepository.findByParticipants(
        sortedUser1,
        sortedUser2
    );

    return conversation;
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
    // Validate page and limit
    page = Math.max(1, parseInt(page));
    limit = Math.min(Math.max(1, parseInt(limit)), 100);

    const conversation = await conversationRepository.findByIdWithAccess(
        conversation_id,
        user_id
    );
    if (!conversation) {
        throw new Error("CONVERSATION_NOT_FOUND_OR_ACCESS_DENIED");
    }

    const skip = (page - 1) * limit;

    try {
        const messages = await messageRepository.findByConversation(
            conversation_id,
            skip,
            limit
        );

        // Only mark as delivered if there are messages from other users
        if (messages.length > 0) {
            try {
                await messageRepository.markAsDelivered(
                    conversation_id,
                    user_id
                );
            } catch (deliveryError) {
                console.error(
                    "Error marking messages as delivered:",
                    deliveryError
                );
                // Don't throw, continue with message retrieval
            }
        }

        return messages.reverse();
    } catch (error) {
        console.error("Error in getMessagesService:", error);
        throw new Error("DATABASE_ERROR");
    }
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

    try {
        const count = await messageRepository.countUnread(
            conversation_id,
            user_id
        );
        return { unread_count: count };
    } catch (error) {
        console.error("Error in getUnreadCountService:", error);
        throw new Error("DATABASE_ERROR");
    }
};

```

## File: services/oauthService.js
```js
import { handleGitHubUser } from "../utils/oauthHelpers.js";
import { oauthValidators } from "../utils/oauthValidators.js";

export const oauthService = {
    // Process GitHub OAuth callback
    processGitHubCallback: async (profile) => {
        try {
            // Validate the GitHub profile before processing
            oauthValidators.validateGitHubProfile(profile);

            const result = await handleGitHubUser(profile);
            return result;
        } catch (error) {
            console.error("OAuth service error:", error);
            throw error;
        }
    },

    // Validate OAuth configuration (delegates to validator)
    validateOAuthConfig: () => {
        return oauthValidators.validateOAuthConfig();
    },

    // Validate callback parameters
    validateCallbackParams: (req) => {
        return oauthValidators.validateCallbackParams(req);
    },

    // Check if OAuth is enabled
    isOAuthEnabled: () => {
        return oauthValidators.isOAuthEnabled();
    },

    // Get OAuth configuration for frontend
    getOAuthConfig: () => {
        const config = oauthValidators.validateOAuthConfig();

        return {
            providers: {
                github: config.github.enabled
                    ? {
                          name: "GitHub",
                          url: "/api/auth/github",
                          enabled: true,
                      }
                    : null,
            },
            client: {
                url: config.client.url,
                successRedirect: config.client.successRedirect,
                errorRedirect: config.client.errorRedirect,
            },
        };
    },
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
        // Validate file type
        if (!avatar_file.mimetype.startsWith("image/")) {
            throw new Error("INVALID_IMAGE_FORMAT");
        }

        // Validate file size (5MB limit)
        if (avatar_file.size > 5 * 1024 * 1024) {
            throw new Error("IMAGE_TOO_LARGE");
        }

        try {
            const uploadResult = await uploadImageService(
                avatar_file.buffer,
                "profiles"
            );
            newAvatarUrl = uploadResult.secure_url;
            updateFields.avatar_url = newAvatarUrl;

            // Delete old avatar if exists
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
                        // Don't throw error, continue with update
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

## File: services/userService.js
```js
import { userRepository } from "../repositories/userRepository.js";

export const searchUsersService = async (query, currentUserId, limit = 10) => {
    if (!query || query.trim().length === 0) {
        throw new Error("SEARCH_QUERY_REQUIRED");
    }

    if (query.trim().length < 2) {
        throw new Error("SEARCH_QUERY_TOO_SHORT");
    }

    const users = await userRepository.searchUsers(
        query.trim(),
        currentUserId,
        limit
    );

    return users;
};

export const getAllUsersService = async (currentUserId, limit = 50) => {
    const users = await userRepository.findMany(currentUserId, limit);
    return users;
};

export const getUserByIdService = async (userId) => {
    const user = await userRepository.findById(userId);

    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }

    // Return user without sensitive data
    const { password_hash, ...userWithoutPassword } = user;
    return userWithoutPassword;
};

export const updateOnlineStatusService = async (userId, isOnline) => {
    const user = await userRepository.findById(userId);
    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }

    const updatedUser = await userRepository.updateOnlineStatus(
        userId,
        isOnline
    );

    return updatedUser;
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
        INVALID_IMAGE_FORMAT: () =>
            badRequestResponse(
                res,
                "Invalid image format. Supported formats: JPEG, PNG, WebP"
            ),
        IMAGE_TOO_LARGE: () =>
            badRequestResponse(res, "Image size too large. Maximum size: 5MB"),
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

export const handleUserError = (res, error) => {
    const errorMap = {
        SEARCH_QUERY_REQUIRED: () =>
            badRequestResponse(res, "Search query is required"),
        SEARCH_QUERY_TOO_SHORT: () =>
            badRequestResponse(
                res,
                "Search query must be at least 2 characters"
            ),
        USER_NOT_FOUND: () => notFoundResponse(res, "User not found"),
    };

    const handler = errorMap[error.message];
    if (handler) {
        handler();
    } else {
        console.error("User error:", error);
        errorResponse(res, "Internal server error");
    }
};

export const handleOAuthError = (res, error) => {
    const errorMap = {
        EMAIL_REQUIRED_FOR_OAUTH: () =>
            badRequestResponse(
                res,
                "Email is required for OAuth authentication. Please ensure your GitHub account has a public email."
            ),
        OAUTH_PROVIDER_ERROR: () =>
            errorResponse(res, "OAuth provider error", 502),
        MISSING_OAUTH_CONFIG: () =>
            errorResponse(res, "OAuth configuration is incomplete", 503),
    };

    const handler = errorMap[error.message];
    if (handler) {
        handler();
    } else {
        console.error("OAuth error:", error);
        errorResponse(res, "OAuth authentication failed");
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

## File: utils/oauthHelpers.js
```js
import bcrypt from "bcryptjs";
import { userRepository } from "../repositories/userRepository.js";
import { tokenService } from "../services/tokenService.js";

// Extract email from GitHub profile
export const getEmailFromGitHubProfile = (profile) => {
    // GitHub might not return email if it's private
    if (profile.emails && profile.emails.length > 0) {
        return profile.emails[0].value;
    }

    // Fallback: use GitHub username to create an email
    if (profile.username) {
        return `${profile.username}@github.com`;
    }

    // Last resort: use profile ID
    return `${profile.id}@github.com`;
};

// Extract full name from GitHub profile
export const getFullNameFromGitHubProfile = (profile) => {
    return profile.displayName || profile.username || "GitHub User";
};

// Extract avatar from GitHub profile
export const getAvatarFromGitHubProfile = (profile) => {
    return profile.photos && profile.photos[0] ? profile.photos[0].value : null;
};

// Generate random password for OAuth users
export const generateRandomPassword = async () => {
    const randomPassword =
        Math.random().toString(36).slice(-16) +
        Math.random().toString(36).slice(-16);
    return await bcrypt.hash(
        randomPassword,
        parseInt(process.env.ROUNDS) || 12
    );
};

// Main OAuth user handler
export const handleGitHubUser = async (profile) => {
    const email = getEmailFromGitHubProfile(profile);

    if (!email) {
        throw new Error("EMAIL_REQUIRED_FOR_OAUTH");
    }

    // Check if user exists
    let user = await userRepository.findByEmail(email);

    if (!user) {
        // Create new user
        const passwordHash = await generateRandomPassword();

        user = await userRepository.create({
            email: email,
            full_name: getFullNameFromGitHubProfile(profile),
            password_hash: passwordHash,
            avatar_url: getAvatarFromGitHubProfile(profile),
            is_online: true,
        });
    } else {
        // Update existing user's online status
        user = await userRepository.update(user.id, {
            is_online: true,
            last_seen: new Date(),
        });
    }

    // Generate tokens
    const { accessToken, refreshToken } = await tokenService.generateAuthTokens(
        user.id
    );

    return {
        user: {
            id: user.id,
            email: user.email,
            full_name: user.full_name,
            avatar_url: user.avatar_url,
            is_online: user.is_online,
            last_seen: user.last_seen,
            created_at: user.created_at,
        },
        accessToken,
        refreshToken,
    };
};

```

## File: utils/oauthValidators.js
```js
export const oauthValidators = {
    // Validate OAuth environment configuration
    validateOAuthConfig: () => {
        const missingVars = [];
        const warnings = [];

        // Required environment variables
        if (!process.env.GITHUB_CLIENT_ID) {
            missingVars.push("GITHUB_CLIENT_ID");
        }

        if (!process.env.GITHUB_CLIENT_SECRET) {
            missingVars.push("GITHUB_CLIENT_SECRET");
        }

        if (!process.env.CLIENT_URL) {
            missingVars.push("CLIENT_URL");
        }

        // Optional but recommended environment variables
        if (!process.env.CLIENT_SUCCESS_REDIRECT) {
            warnings.push("CLIENT_SUCCESS_REDIRECT (default: /chat)");
        }

        if (!process.env.CLIENT_ERROR_REDIRECT) {
            warnings.push("CLIENT_ERROR_REDIRECT (default: /login)");
        }

        // Throw error for missing required variables
        if (missingVars.length > 0) {
            throw new Error(
                `Missing required OAuth environment variables: ${missingVars.join(
                    ", "
                )}`
            );
        }

        return {
            github: {
                enabled: !!process.env.GITHUB_CLIENT_ID,
                clientId: process.env.GITHUB_CLIENT_ID
                    ? "configured"
                    : "missing",
                clientSecret: process.env.GITHUB_CLIENT_SECRET
                    ? "configured"
                    : "missing",
                callbackUrl: "/api/auth/github/callback",
            },
            client: {
                url: process.env.CLIENT_URL,
                successRedirect: process.env.CLIENT_SUCCESS_REDIRECT || "/chat",
                errorRedirect: process.env.CLIENT_ERROR_REDIRECT || "/login",
            },
            warnings: warnings.length > 0 ? warnings : null,
        };
    },

    // Validate GitHub profile structure
    validateGitHubProfile: (profile) => {
        if (!profile) {
            throw new Error("GitHub profile is null or undefined");
        }

        if (!profile.id) {
            throw new Error("GitHub profile missing ID");
        }

        if (!profile.username && !profile.displayName) {
            throw new Error("GitHub profile missing username and display name");
        }

        // Check if we have at least one way to identify the user
        const hasEmail = profile.emails && profile.emails.length > 0;
        const hasUsername = !!profile.username;

        if (!hasEmail && !hasUsername) {
            throw new Error("GitHub profile missing both email and username");
        }

        return true;
    },

    // Validate OAuth callback parameters
    validateCallbackParams: (req) => {
        const { error, error_description, code } = req.query;

        if (error) {
            throw new Error(
                `OAuth provider error: ${error} - ${
                    error_description || "No description"
                }`
            );
        }

        if (!code) {
            throw new Error("Missing authorization code in callback");
        }

        return true;
    },

    // Check if OAuth is properly configured
    isOAuthEnabled: () => {
        try {
            const config = oauthValidators.validateOAuthConfig();
            return config.github.enabled;
        } catch (error) {
            return false;
        }
    },
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

```

