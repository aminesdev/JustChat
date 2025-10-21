// utils/stringUtils.js
export const truncateText = (text, maxLength = 50) => {
    if (!text || typeof text !== "string") return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
};

export const getInitials = (name) => {
    if (!name || typeof name !== "string") return "?";

    return name
        .trim()
        .split(/\s+/)
        .map((part) => part.charAt(0))
        .join("")
        .toUpperCase()
        .substring(0, 2);
};

export const capitalizeFirst = (text) => {
    if (!text || typeof text !== "string") return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const generateRandomId = (prefix = "") => {
    return `${prefix}${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
