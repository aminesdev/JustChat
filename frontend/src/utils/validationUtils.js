export const isValidEmail = (email) => {
    if (!email || typeof email !== "string") return false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
};

export const isValidPassword = (password) => {
    if (!password || typeof password !== "string") return false;

    // At least 6 characters, with at least one letter and one number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
};

export const isValidName = (name) => {
    if (!name || typeof name !== "string") return false;

    const trimmed = name.trim();
    return trimmed.length >= 2 && trimmed.length <= 100;
};

export const validateMessage = (text) => {
    if (!text && text !== "") {
        return "Message is required";
    }

    const trimmed = text.toString().trim();
    if (!trimmed) return "Message cannot be empty";
    if (trimmed.length > 1000) return "Message too long (max 1000 characters)";

    return null;
};

export const validateConversationId = (id) => {
    if (!id || typeof id !== "string") return false;

    const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
};

export const validateFileUpload = (file, options = {}) => {
    const {
        maxSize = 5 * 1024 * 1024,
        allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"],
    } = options;

    if (!file) {
        return "No file selected";
    }

    if (file.size > maxSize) {
        return `File must be smaller than ${maxSize / 1024 / 1024}MB`;
    }

    if (!allowedTypes.includes(file.type)) {
        return "Only JPEG, PNG, WebP, and GIF images are allowed";
    }

    return null;
};

// Add the missing sanitizeMessage function
export const sanitizeMessage = (text) => {
    if (!text || typeof text !== "string") return "";

    return text
        .trim()
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br>");
};

// Add unsanitizeMessage if needed
export const unsanitizeMessage = (text) => {
    if (!text || typeof text !== "string") return "";

    return text
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/<br>/g, "\n");
};
