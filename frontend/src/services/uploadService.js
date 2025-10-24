import api from "./api";
import { validateFile, compressImage } from "../utils/fileUtils";

export const uploadService = {
    uploadImage: async (file, type = "message") => {
        // Validate file first
        validateFile(file);

        let processedFile = file;

        // Compress if larger than 1MB
        if (file.size > 1024 * 1024) {
            console.log("Compressing image...", file.size);
            try {
                processedFile = await compressImage(file, 0.7, 1200);
                console.log("Image compressed:", processedFile.size);
            } catch (compressError) {
                console.error(
                    "Image compression failed, using original:",
                    compressError
                );
                // Continue with original file if compression fails
            }
        }

        const formData = new FormData();
        formData.append("image", processedFile);
        formData.append("type", type);

        try {
            console.log("Uploading image to server...");
            const response = await api.post("/upload/image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                timeout: 30000, // 30 second timeout for large files
            });

            console.log("Upload successful:", response.data);
            return response.data;
        } catch (error) {
            console.error("Upload failed:", error);

            if (error.response) {
                // Server responded with error status
                throw new Error(
                    error.response.data.msg ||
                        `Upload failed: ${error.response.status}`
                );
            } else if (error.request) {
                // Network error
                throw new Error("Network error: Unable to connect to server");
            } else {
                // Other errors
                throw new Error("Upload failed: " + error.message);
            }
        }
    },

    uploadFile: async (file, type = "message") => {
        validateFile(file);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", type);

        const response = await api.post("/upload/file", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    },
};
