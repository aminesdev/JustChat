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
