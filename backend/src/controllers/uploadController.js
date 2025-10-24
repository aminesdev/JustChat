import {
    uploadFileService,
    uploadImageService,
} from "../services/fileStorageService.js";
import { successResponse } from "../utils/responseHandler.js";
import { handleCloudinaryError } from "../utils/errorHandler.js";
import { resetCloudinary } from "../config/cloudinary.js";

export const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                msg: "No file provided",
            });
        }

        // Validate file size (10MB limit)
        if (req.file.size > 10 * 1024 * 1024) {
            return res.status(400).json({
                success: false,
                msg: "File size too large. Maximum size: 10MB",
            });
        }

        const folder = req.body.type === "profile" ? "profiles" : "files";
        console.log(
            `Starting upload for file: ${req.file.originalname}, size: ${req.file.size} bytes`
        );

        const result = await uploadFileService(
            req.file.buffer,
            req.file.originalname,
            folder
        );

        console.log(`Upload completed successfully: ${result.public_id}`);

        successResponse(res, "File uploaded successfully", {
            url: result.secure_url,
            public_id: result.public_id,
            resource_type: result.resource_type,
            file_extension: result.file_extension,
            original_name: result.original_name,
            bytes: result.bytes,
        });
    } catch (error) {
        console.error("Upload controller error:", error.message);

        // Try to reset Cloudinary on timeout errors
        if (
            error.message === "UPLOAD_TIMEOUT" ||
            error.message === "UPLOAD_STREAM_ERROR"
        ) {
            console.log("Attempting to reset Cloudinary connection...");
            await resetCloudinary();
        }

        handleCloudinaryError(res, error);
    }
};

// Keep the old function for backward compatibility
export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                msg: "No image file provided",
            });
        }

        // Validate file size (5MB limit for images)
        if (req.file.size > 5 * 1024 * 1024) {
            return res.status(400).json({
                success: false,
                msg: "Image size too large. Maximum size: 5MB",
            });
        }

        // Validate file type
        if (!req.file.mimetype.startsWith("image/")) {
            return res.status(400).json({
                success: false,
                msg: "Invalid file type. Only image files are allowed.",
            });
        }

        const folder = req.body.type === "profile" ? "profiles" : "messages";
        console.log(
            `Starting image upload: ${req.file.originalname}, size: ${req.file.size} bytes`
        );

        const result = await uploadImageService(req.file.buffer, folder);

        console.log(`Image upload completed successfully: ${result.public_id}`);

        successResponse(res, "Image uploaded successfully", {
            url: result.secure_url,
            public_id: result.public_id,
        });
    } catch (error) {
        console.error("Image upload controller error:", error.message);

        // Try to reset Cloudinary on timeout errors
        if (
            error.message === "UPLOAD_TIMEOUT" ||
            error.message === "UPLOAD_STREAM_ERROR"
        ) {
            console.log("Attempting to reset Cloudinary connection...");
            await resetCloudinary();
        }

        handleCloudinaryError(res, error);
    }
};

// Add a health check endpoint for Cloudinary
export const cloudinaryHealth = async (req, res) => {
    try {
        const result = await resetCloudinary();
        if (result) {
            successResponse(res, "Cloudinary is healthy");
        } else {
            res.status(503).json({
                success: false,
                msg: "Cloudinary is not responding",
            });
        }
    } catch (error) {
        res.status(503).json({
            success: false,
            msg: "Cloudinary health check failed",
            error: error.message,
        });
    }
};
