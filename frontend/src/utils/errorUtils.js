export const getErrorMessage = (error) => {
    if (!error) return "An unexpected error occurred";

    if (typeof error === "string") return error;

    // Axios error
    if (error.response?.data?.msg) {
        return error.response.data.msg;
    }

    // Error object with message
    if (error.message) {
        return error.message;
    }

    // Network error
    if (error.code === "NETWORK_ERROR" || error.message?.includes("Network")) {
        return "Network error. Please check your connection.";
    }

    // Fallback
    return "An unexpected error occurred";
};

export const isNetworkError = (error) => {
    return (
        !error?.response &&
        (error?.code === "NETWORK_ERROR" || error?.message?.includes("Network"))
    );
};

export const isAuthError = (error) => {
    return error?.response?.status === 401;
};

export const isServerError = (error) => {
    return error?.response?.status >= 500;
};

export const handleApiError = (error, fallback = "Something went wrong") => {
    console.error("API Error:", error);

    const message = getErrorMessage(error);

    if (isNetworkError(error)) {
        return "Network error. Please check your connection.";
    }

    if (isAuthError(error)) {
        return "Session expired. Please login again.";
    }

    return message || fallback;
};

export const logError = (error, context = "") => {
    console.error(`Error${context ? ` in ${context}` : ""}:`, {
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
    });
};
