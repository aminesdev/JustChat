import cloudinary, {
    resetCloudinary,
    isCloudinaryConfigured,
} from "../config/cloudinary.js";

// Track upload attempts for retry logic
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const uploadFileService = async (
    fileBuffer,
    originalName,
    folder = "files",
    retryCount = 0
) => {
    // Check if Cloudinary is configured
    if (!isCloudinaryConfigured()) {
        console.log("Cloudinary not configured, attempting reset...");
        await resetCloudinary();
    }

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

        let resourceType = "raw";
        let transformation = [];

        if (imageExtensions.includes(extension)) {
            resourceType = "image";
            transformation = [
                { width: 800, height: 800, crop: "limit" },
                { quality: "auto" },
            ];
        }

        const uploadOptions = {
            folder: folder,
            resource_type: resourceType,
            allowed_formats: null,
            transformation: transformation,
            timeout: 30000,
        };

        console.log(
            `Upload attempt ${
                retryCount + 1
            }: ${originalName}, type: ${resourceType}, folder: ${folder}, size: ${
                fileBuffer.length
            } bytes`
        );

        const uploadStream = cloudinary.uploader.upload_stream(
            uploadOptions,
            async (error, result) => {
                if (error) {
                    console.error(
                        `Cloudinary upload error (attempt ${retryCount + 1}):`,
                        error
                    );

                    // Retry logic for timeout errors
                    if (
                        (error.name === "TimeoutError" ||
                            error.http_code === 499) &&
                        retryCount < MAX_RETRIES
                    ) {
                        console.log(
                            `Retrying upload (${
                                retryCount + 1
                            }/${MAX_RETRIES})...`
                        );
                        await delay(RETRY_DELAY * (retryCount + 1));
                        try {
                            const retryResult = await uploadFileService(
                                fileBuffer,
                                originalName,
                                folder,
                                retryCount + 1
                            );
                            resolve(retryResult);
                        } catch (retryError) {
                            reject(retryError);
                        }
                        return;
                    }

                    if (
                        error.message.includes("File size too large") ||
                        error.http_code === 413
                    ) {
                        reject(new Error("FILE_TOO_LARGE"));
                    } else if (
                        error.message.includes("Invalid file") ||
                        error.http_code === 422
                    ) {
                        reject(new Error("INVALID_FILE_FORMAT"));
                    } else if (
                        error.name === "TimeoutError" ||
                        error.http_code === 499
                    ) {
                        reject(new Error("UPLOAD_TIMEOUT"));
                    } else if (error.http_code === 401) {
                        reject(new Error("CLOUDINARY_AUTH_ERROR"));
                    } else {
                        reject(new Error("UPLOAD_FAILED"));
                    }
                } else {
                    console.log(
                        `Cloudinary upload successful (attempt ${
                            retryCount + 1
                        }): ${result.public_id}`
                    );
                    resolve({
                        ...result,
                        resource_type: resourceType,
                        file_extension: extension,
                        original_name: originalName,
                    });
                }
            }
        );

        // Handle stream errors
        uploadStream.on("error", async (error) => {
            console.error(
                `Cloudinary stream error (attempt ${retryCount + 1}):`,
                error
            );

            if (retryCount < MAX_RETRIES) {
                console.log(
                    `Retrying upload due to stream error (${
                        retryCount + 1
                    }/${MAX_RETRIES})...`
                );
                await delay(RETRY_DELAY * (retryCount + 1));
                try {
                    const retryResult = await uploadFileService(
                        fileBuffer,
                        originalName,
                        folder,
                        retryCount + 1
                    );
                    resolve(retryResult);
                } catch (retryError) {
                    reject(retryError);
                }
            } else {
                reject(new Error("UPLOAD_STREAM_ERROR"));
            }
        });

        // Write the buffer to the stream
        try {
            uploadStream.end(fileBuffer);
        } catch (streamError) {
            console.error("Stream write error:", streamError);
            reject(new Error("STREAM_WRITE_ERROR"));
        }
    });
};

export const deleteFileService = async (publicId, resourceType = "image") => {
    try {
        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType,
            timeout: 15000,
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
