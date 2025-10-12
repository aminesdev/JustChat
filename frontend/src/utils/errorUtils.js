export const getErrorMessage = (error) => {
    if (typeof error === "string") return error;
    if (error.response?.data?.msg) return error.response.data.msg;
    if (error.message) return error.message;
    return "An unexpected error occurred";
};

export const isNetworkError = (error) => {
    return !error.response && error.message?.includes("Network");
};

export const handleApiError = (error, fallback = "Something went wrong") => {
    console.error("API Error:", error);
    return getErrorMessage(error) || fallback;
};
