import cloudinary from "../config/cloudinary.js";

export const extractPublicId = (url) => {
    if (!url) return null;

    const matches = url.match(/\/upload\/.*\/([^/.]+)(?=\.[^.]*$)/);
    return matches ? matches[1] : null;
};

export const uploadToCloudinary = async (fileBuffer, folder = "profiles") => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folder,
                resource_type: "image",
            },
            (error, result) => {
                if (error) {
                    reject(new Error("UPLOAD_FAILED"));
                } else {
                    resolve(result);
                }
            }
        );

        uploadStream.end(fileBuffer);
    });
};

export const deleteFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        throw new Error("DELETE_FAILED");
    }
};
