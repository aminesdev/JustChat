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
