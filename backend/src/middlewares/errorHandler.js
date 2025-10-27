import { AppError } from "../utils/errors.js";
import { logger } from "../utils/logger.js";
import { HttpStatus } from "../config/constants.js";

export const errorHandler = (err, req, res, next) => {
    // Log error
    logger.error("Error occurred", err, {
        method: req.method,
        path: req.path,
        userId: req.user?.userId,
    });

    // Handle operational errors
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            success: false,
            msg: err.message,
            code: err.code,
            data: null,
        });
    }

    // Handle Prisma errors
    if (err.code && err.code.startsWith("P")) {
        return handlePrismaError(err, res);
    }

    // Handle validation errors (from Joi)
    if (err.isJoi) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            msg: "Validation error",
            code: "VALIDATION_ERROR",
            data: {
                details: err.details,
            },
        });
    }

    // Handle JWT errors
    if (err.name === "JsonWebTokenError") {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            success: false,
            msg: "Invalid token",
            code: "INVALID_TOKEN",
            data: null,
        });
    }

    if (err.name === "TokenExpiredError") {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            success: false,
            msg: "Token expired",
            code: "TOKEN_EXPIRED",
            data: null,
        });
    }

    // Handle multer errors
    if (err.name === "MulterError") {
        return res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            msg: `File upload error: ${err.message}`,
            code: "FILE_UPLOAD_ERROR",
            data: null,
        });
    }

    // Default error response (unexpected errors)
    logger.error("Unexpected error", err);

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        msg: "Internal server error",
        code: "INTERNAL_ERROR",
        data: null,
    });
};

function handlePrismaError(err, res) {
    const errorMap = {
        P2002: {
            statusCode: HttpStatus.CONFLICT,
            message: "A record with this information already exists",
            code: "DUPLICATE_RECORD",
        },
        P2025: {
            statusCode: HttpStatus.NOT_FOUND,
            message: "Record not found",
            code: "RECORD_NOT_FOUND",
        },
        P2003: {
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Invalid reference to related record",
            code: "INVALID_REFERENCE",
        },
        P2001: {
            statusCode: HttpStatus.NOT_FOUND,
            message: "Record not found",
            code: "RECORD_NOT_FOUND",
        },
    };

    const errorInfo = errorMap[err.code] || {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Database error",
        code: "DATABASE_ERROR",
    };

    return res.status(errorInfo.statusCode).json({
        success: false,
        msg: errorInfo.message,
        code: errorInfo.code,
        data: null,
    });
}

// Async error wrapper
export const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
