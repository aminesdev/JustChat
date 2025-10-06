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