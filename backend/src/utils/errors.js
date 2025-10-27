// Custom error classes for better error handling
export class AppError extends Error {
    constructor(message, statusCode, code) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationError extends AppError {
    constructor(message, details = null) {
        super(message, 400, "VALIDATION_ERROR");
        this.details = details;
    }
}

export class AuthenticationError extends AppError {
    constructor(message = "Authentication failed") {
        super(message, 401, "AUTHENTICATION_ERROR");
    }
}

export class AuthorizationError extends AppError {
    constructor(message = "Access denied") {
        super(message, 403, "AUTHORIZATION_ERROR");
    }
}

export class NotFoundError extends AppError {
    constructor(resource = "Resource") {
        super(`${resource} not found`, 404, "NOT_FOUND");
        this.resource = resource;
    }
}

export class ConflictError extends AppError {
    constructor(message = "Resource already exists") {
        super(message, 409, "CONFLICT_ERROR");
    }
}

export class ExternalServiceError extends AppError {
    constructor(service, message = "External service error") {
        super(message, 502, "EXTERNAL_SERVICE_ERROR");
        this.service = service;
    }
}

export class RateLimitError extends AppError {
    constructor(message = "Too many requests") {
        super(message, 429, "RATE_LIMIT_ERROR");
    }
}

export class FileUploadError extends AppError {
    constructor(message, code = "FILE_UPLOAD_ERROR") {
        super(message, 400, code);
    }
}

// Error code constants
export const ErrorCodes = {
    // Auth errors
    USER_ALREADY_EXISTS: "USER_ALREADY_EXISTS",
    INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
    TOKEN_EXPIRED: "TOKEN_EXPIRED",
    TOKEN_INVALID: "TOKEN_INVALID",
    REFRESH_TOKEN_REQUIRED: "REFRESH_TOKEN_REQUIRED",

    // User errors
    USER_NOT_FOUND: "USER_NOT_FOUND",
    CURRENT_PASSWORD_REQUIRED: "CURRENT_PASSWORD_REQUIRED",
    INVALID_CURRENT_PASSWORD: "INVALID_CURRENT_PASSWORD",
    SEARCH_QUERY_REQUIRED: "SEARCH_QUERY_REQUIRED",
    SEARCH_QUERY_TOO_SHORT: "SEARCH_QUERY_TOO_SHORT",

    // Conversation errors
    CONVERSATION_ALREADY_EXISTS: "CONVERSATION_ALREADY_EXISTS",
    CONVERSATION_NOT_FOUND: "CONVERSATION_NOT_FOUND",

    // Message errors
    MESSAGE_NOT_FOUND: "MESSAGE_NOT_FOUND",
    MESSAGE_TEXT_REQUIRED: "MESSAGE_TEXT_REQUIRED",
    MESSAGE_NOT_EDITABLE: "MESSAGE_NOT_EDITABLE",
    MESSAGE_EDIT_TIMEOUT: "MESSAGE_EDIT_TIMEOUT",
    CANNOT_MARK_OWN_MESSAGE_READ: "CANNOT_MARK_OWN_MESSAGE_READ",
    FILE_URL_REQUIRED: "FILE_URL_REQUIRED",
    INVALID_MESSAGE_TYPE: "INVALID_MESSAGE_TYPE",

    // File upload errors
    FILE_TOO_LARGE: "FILE_TOO_LARGE",
    INVALID_FILE_FORMAT: "INVALID_FILE_FORMAT",
    UPLOAD_FAILED: "UPLOAD_FAILED",
    UPLOAD_TIMEOUT: "UPLOAD_TIMEOUT",
    DELETE_FAILED: "DELETE_FAILED",

    // OAuth errors
    EMAIL_REQUIRED_FOR_OAUTH: "EMAIL_REQUIRED_FOR_OAUTH",
    OAUTH_PROVIDER_ERROR: "OAUTH_PROVIDER_ERROR",
    MISSING_OAUTH_CONFIG: "MISSING_OAUTH_CONFIG",

    // Database errors
    DATABASE_ERROR: "DATABASE_ERROR",
    TRANSACTION_FAILED: "TRANSACTION_FAILED",
};
