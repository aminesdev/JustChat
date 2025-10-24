import cloudinary from "../config/cloudinary.js";

export const uploadFileService = async (
    fileBuffer,
    originalName,
    folder = "files"
) => {
    return new Promise((resolve, reject) => {
        // Determine resource type based on file extension
        const extension = originalName.split(".").pop().toLowerCase();
        const imageExtensions = [
            "jpg",
            "jpeg",
            "png",
            "gif",
            "webp",
            "bmp",
            "svg",
        ];
        const videoExtensions = [
            "mp4",
            "avi",
            "mov",
            "wmv",
            "flv",
            "webm",
            "mkv",
        ];
        const audioExtensions = ["mp3", "wav", "ogg", "m4a", "flac", "aac"];

        let resourceType = "raw"; // Default for documents and other files
        let transformation = [];

        if (imageExtensions.includes(extension)) {
            resourceType = "image";
            transformation = [
                { width: 800, height: 800, crop: "limit" },
                { quality: "auto" },
            ];
        } else if (videoExtensions.includes(extension)) {
            resourceType = "video";
            transformation = [{ quality: "auto" }];
        } else if (audioExtensions.includes(extension)) {
            resourceType = "video"; // Cloudinary uses 'video' for audio files
        }

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folder,
                resource_type: resourceType,
                allowed_formats: null, // Allow all formats
                transformation: transformation,
            },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary upload error:", error);
                    if (error.message.includes("File size too large")) {
                        reject(new Error("FILE_TOO_LARGE"));
                    } else if (error.message.includes("Invalid file")) {
                        reject(new Error("INVALID_FILE_FORMAT"));
                    } else {
                        reject(new Error("UPLOAD_FAILED"));
                    }
                } else {
                    resolve({
                        ...result,
                        resource_type: resourceType,
                        file_extension: extension,
                        original_name: originalName,
                    });
                }
            }
        );

        uploadStream.end(fileBuffer);
    });
};

export const deleteFileService = async (publicId, resourceType = "image") => {
    try {
        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType,
        });

        if (result.result !== "ok") {
            throw new Error("DELETE_FAILED");
        }

        return result;
    } catch (error) {
        console.error("Cloudinary delete error:", error);
        throw new Error("DELETE_FAILED");
    }
};

// Keep the old function for backward compatibility
export const uploadImageService = async (fileBuffer, folder = "profiles") => {
    return uploadFileService(fileBuffer, `image_${Date.now()}.jpg`, folder);
};

// Add back the deleteImageService for backward compatibility
export const deleteImageService = async (publicId) => {
    return deleteFileService(publicId, "image");
};
