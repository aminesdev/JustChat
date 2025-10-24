export const getAvatarUrl = (url) => {
    if (!url) {
        console.log("❌ getAvatarUrl: No URL provided");
        return null;
    }

    console.log("🖼️ getAvatarUrl - Input:", url);

    // If it's already a full URL, return as is
    if (url.startsWith("http://") || url.startsWith("https://")) {
        console.log("✅ getAvatarUrl: Already full URL");
        return url;
    }

    // Cloudinary URL without protocol
    if (
        url.includes("cloudinary.com") ||
        url.startsWith("res.cloudinary.com")
    ) {
        let processedUrl = url;
        if (url.startsWith("//")) {
            processedUrl = `https:${url}`;
        } else if (url.startsWith("res.cloudinary.com")) {
            processedUrl = `https://${url}`;
        }
        console.log("☁️ getAvatarUrl: Cloudinary URL processed:", processedUrl);
        return processedUrl;
    }

    // If it starts with /, it's a relative path to the backend
    if (url.startsWith("/")) {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
        const baseUrl = apiUrl.endsWith("/") ? apiUrl.slice(0, -1) : apiUrl;
        const fullUrl = `${baseUrl}${url}`;
        console.log("🔗 getAvatarUrl: Relative path processed:", fullUrl);
        return fullUrl;
    }

    // If it's just a filename, assume it's in uploads directory
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
    const baseUrl = apiUrl.endsWith("/") ? apiUrl.slice(0, -1) : apiUrl;
    const fullUrl = `${baseUrl}/uploads/${url}`;
    console.log("📁 getAvatarUrl: Filename processed:", fullUrl);
    return fullUrl;
};

export const validateAvatarFile = (file) => {
    if (!file) return "No file selected";

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
        return "Only JPEG, PNG, and WebP images are allowed";
    }

    if (file.size > 5 * 1024 * 1024) {
        return "Image must be smaller than 5MB";
    }

    return null;
};
