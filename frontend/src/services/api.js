import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000, // 30 seconds
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

        // Token refresh logic - ONLY for 401 errors and when we have a refresh token
        if (error.response?.status === 401 && !originalRequest._retry) {
            const refreshToken = localStorage.getItem("refreshToken");

            // If no refresh token, don't attempt refresh - this is likely a login error
            if (!refreshToken) {
                console.log("No refresh token available - likely login error");
                // Don't clear tokens or redirect here - let the login component handle the error
                return Promise.reject(error);
            }

            // Only attempt refresh if we have a refresh token and this is not an auth endpoint
            const isAuthEndpoint = originalRequest.url.includes("/auth/");
            if (isAuthEndpoint) {
                console.log("Auth endpoint - skipping token refresh");
                return Promise.reject(error);
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

                // Clear auth data only on refresh failure (session expired)
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("user");

                // Redirect to login only if we're not already on login page
                if (window.location.pathname !== "/login") {
                    window.location.href = "/login";
                }

                return Promise.reject(
                    new Error("Session expired. Please login again.")
                );
            }
        }

        return Promise.reject(error);
    }
);

export default api;
