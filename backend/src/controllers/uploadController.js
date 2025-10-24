import {
    uploadFileService,
    uploadImageService,
} from "../services/fileStorageService.js";
import { successResponse } from "../utils/responseHandler.js";
import { handleCloudinaryError } from "../utils/errorHandler.js";

export const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                msg: "No file provided",
            });
        }

        const folder = req.body.type === "profile" ? "profiles" : "files";
        const result = await uploadFileService(
            req.file.buffer,
            req.file.originalname,
            folder
        );

        successResponse(res, "File uploaded successfully", {
            url: result.secure_url,
            public_id: result.public_id,
            resource_type: result.resource_type,
            file_extension: result.file_extension,
            original_name: result.original_name,
            bytes: result.bytes,
        });
    } catch (error) {
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
