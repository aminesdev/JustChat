export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isValidPassword = (password) => {
    return password && password.length >= 6;
};

export const isValidName = (name) => {
    return name && name.trim().length >= 2;
};

export const validateMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return "Message cannot be empty";
    if (trimmed.length > 1000) return "Message too long (max 1000 characters)";
    return null;
};
