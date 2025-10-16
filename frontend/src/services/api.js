import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000, // 15 seconds
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error("Request interceptor error:", error);
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Network error (backend not reachable)
        if (!error.response) {
            console.error("Network Error: Cannot connect to server");
            const networkError = new Error(
                "Cannot connect to server. Please check if the backend is running."
            );
            networkError.isNetworkError = true;
            return Promise.reject(networkError);
        }

        // Token refresh logic - ONLY if we have a refresh token
        if (error.response?.status === 401 && !originalRequest._retry) {
            const refreshToken = localStorage.getItem("refreshToken");

            // If no refresh token, don't attempt refresh
            if (!refreshToken) {
                console.error("No refresh token available");
                // Clear auth data and redirect to login
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("user");

                // Only redirect if not already on login page
                if (window.location.pathname !== "/login") {
                    window.location.href = "/login";
                }

                return Promise.reject(new Error("No refresh token available"));
            }

            originalRequest._retry = true;

            try {
                const response = await axios.post(
                    `${API_BASE_URL}/auth/refresh-token`,
                    { refreshToken }
                );

                const { accessToken } = response.data.data;
                localStorage.setItem("accessToken", accessToken);
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);

                // Clear auth data
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("user");

                // Redirect to login
                if (window.location.pathname !== "/login") {
                    window.location.href = "/login";
                }

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
