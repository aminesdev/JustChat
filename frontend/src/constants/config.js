export const APP_CONFIG = {
    APP_NAME: "JustChat",
    API_BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
    WS_URL: import.meta.env.VITE_WS_URL || "ws://localhost:5001",
    UPLOAD: {
        MAX_FILE_SIZE: 5 * 1024 * 1024,
        ALLOWED_IMAGE_TYPES: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
        ],
    },
    MESSAGES: {
        MAX_LENGTH: 1000,
        LOAD_LIMIT: 50,
        EDIT_TIMEOUT: 5 * 60 * 1000,
    },
    REALTIME: {
        TYPING_INDICATOR_TIMEOUT: 3000,
        RECONNECT_DELAY: 1000,
        MAX_RECONNECT_ATTEMPTS: 5,
    },
};
