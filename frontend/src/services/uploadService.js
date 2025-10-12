import api from "./api";

export const uploadService = {
    uploadImage: async (file, type = "message") => {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("type", type);

        const response = await api.post("/upload/image", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            timeout: 30000,
        });
        return response;
    },

    validateFile: (file) => {
        const maxSize = 5 * 1024 * 1024;
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
        ];

        if (file.size > maxSize) {
            throw new Error("File size too large. Maximum size is 5MB.");
        }

        if (!allowedTypes.includes(file.type)) {
            throw new Error(
                "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed."
            );
        }

        return true;
    },
};
