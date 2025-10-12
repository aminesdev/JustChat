import api from "./api";
import { validateFile, compressImage } from "../utils/fileUtils";

export const uploadService = {
    uploadImage: async (file, type = "message") => {
        validateFile(file);

        let processedFile = file;
        
        if (file.size > 1024 * 1024) {
            processedFile = await compressImage(file, 0.7);
        }

        const formData = new FormData();
        formData.append("image", processedFile);
        formData.append("type", type);

        const response = await api.post("/upload/image", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            timeout: 30000,
        });
        return response;
    },
};
