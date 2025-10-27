// Socket event names
export const SocketEvents = {
    // Connection events
    CONNECTION: "connection",
    DISCONNECT: "disconnect",
    CONNECTION_SUCCESS: "connection_success",
    ERROR: "error",

    // User events
    USER_ONLINE: "user_online",
    USER_OFFLINE: "user_offline",
    GET_ONLINE_USERS: "get_online_users",
    PROFILE_UPDATED: "profile_updated",
    USER_PROFILE_UPDATED: "user_profile_updated",

    // Conversation events
    JOIN_CONVERSATION: "join_conversation",
    LEAVE_CONVERSATION: "leave_conversation",
    CREATE_CONVERSATION: "create_conversation",
    CONVERSATION_CREATED: "conversation_created",
    NEW_CONVERSATION: "new_conversation",
    DELETE_CONVERSATION: "delete_conversation",
    CONVERSATION_DELETED: "conversation_deleted",
    CONVERSATION_UPDATED: "conversation_updated",
    CONVERSATION_USER_UPDATED: "conversation_user_updated",

    // Message events
    SEND_MESSAGE: "send_message",
    NEW_MESSAGE: "new_message",
    MESSAGE_SENT: "message_sent",
    MESSAGE_DELIVERED: "message_delivered",
    MESSAGE_READ: "message_read",
    MARK_AS_READ: "mark_as_read",
    MARK_ALL_AS_READ: "mark_all_as_read",
    ALL_MESSAGES_READ: "all_messages_read",
    EDIT_MESSAGE: "edit_message",
    MESSAGE_EDITED: "message_edited",
    DELETE_MESSAGE: "delete_message",
    MESSAGE_DELETED: "message_deleted",

    // Typing events
    TYPING_START: "typing_start",
    TYPING_STOP: "typing_stop",
    USER_TYPING: "user_typing",

    // Notification events
    PENDING_CONVERSATIONS: "pending_conversations",
};

// Message types
export const MessageTypes = {
    TEXT: "TEXT",
    IMAGE: "IMAGE",
};

// File upload folders
export const UploadFolders = {
    PROFILES: "profiles",
    MESSAGES: "messages",
    FILES: "files",
};

// Resource types
export const ResourceTypes = {
    IMAGE: "image",
    RAW: "raw",
    VIDEO: "video",
    AUTO: "auto",
};

// Time constants
export const TimeConstants = {
    MESSAGE_EDIT_TIMEOUT: 5 * 60 * 1000, // 5 minutes
    TYPING_TIMEOUT: 3000, // 3 seconds
    TOKEN_CLEANUP_INTERVAL: 24 * 60 * 60 * 1000, // 24 hours
};

// HTTP status codes
export const HttpStatus = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
};

// User select fields (commonly used)
export const UserSelectFields = {
    id: true,
    email: true,
    full_name: true,
    avatar_url: true,
    is_online: true,
    last_seen: true,
    created_at: true,
};

// Public user fields (exclude sensitive data)
export const PublicUserFields = {
    id: true,
    email: true,
    full_name: true,
    avatar_url: true,
    is_online: true,
    last_seen: true,
};
