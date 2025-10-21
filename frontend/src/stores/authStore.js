import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "../services/authService";
import { storage } from "../utils/storageUtils";
import { getErrorMessage } from "../utils/errorUtils";

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            isInitialized: false,

            // Initialize auth state from localStorage
            initialize: async (force = false) => {
                console.log("AuthStore initialize() called", { force });

                // If forcing re-initialization, reset the state
                if (force) {
                    console.log("Force re-initialization requested");
                    set({ isInitialized: false });
                }

                if (get().isInitialized && !force) {
                    console.log("AuthStore already initialized, skipping");
                    return;
                }

                const accessToken = localStorage.getItem("accessToken");
                const refreshToken = localStorage.getItem("refreshToken");
                const userStr = localStorage.getItem("user");

                console.log("Auth initialization - localStorage check:", {
                    accessToken: accessToken ? "Present" : "Missing",
                    refreshToken: refreshToken ? "Present" : "Missing",
                    userStr: userStr ? "Present" : "Missing",
                });

                if (accessToken && refreshToken) {
                    try {
                        // Always load fresh user data from API
                        console.log("Loading fresh user data from API...");
                        const userStore = useUserStore.getState();
                        const freshUser = await userStore.loadCurrentUser();

                        if (freshUser) {
                            console.log("Fresh user data loaded:", {
                                email: freshUser.email,
                                avatar_url: freshUser.avatar_url,
                            });

                            set({
                                user: freshUser,
                                accessToken,
                                refreshToken,
                                isAuthenticated: true,
                                isInitialized: true,
                            });
                        } else {
                            throw new Error("Failed to load user data");
                        }
                    } catch (error) {
                        console.error(
                            "Failed to initialize auth with fresh data:",
                            error
                        );
                        // Fallback to localStorage data
                        if (userStr) {
                            try {
                                const user = JSON.parse(userStr);
                                console.log(
                                    "Using localStorage user data as fallback"
                                );
                                set({
                                    user,
                                    accessToken,
                                    refreshToken,
                                    isAuthenticated: true,
                                    isInitialized: true,
                                });
                            } catch (parseError) {
                                console.error(
                                    "Failed to parse stored user data:",
                                    parseError
                                );
                                localStorage.removeItem("accessToken");
                                localStorage.removeItem("refreshToken");
                                localStorage.removeItem("user");
                                set({
                                    isInitialized: true,
                                    isAuthenticated: false,
                                });
                            }
                        } else {
                            set({
                                isInitialized: true,
                                isAuthenticated: false,
                            });
                        }
                    }
                } else {
                    console.log(
                        "No valid tokens found, setting unauthenticated state"
                    );
                    set({
                        isInitialized: true,
                        isAuthenticated: false,
                        user: null,
                        accessToken: null,
                        refreshToken: null,
                    });
                }

                console.log("AuthStore initialize() completed");
            },

            // Reset initialization state
            resetInitialization: () => {
                console.log("🔄 Resetting auth store initialization");
                set({ isInitialized: false });
            },

            login: async (credentials) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await authService.login(credentials);
                    const { user, accessToken, refreshToken } =
                        response.data.data;

                    console.log("Login successful - User data:", user);

                    // Ensure user has avatar_url field, even if null
                    const userWithAvatar = {
                        ...user,
                        avatar_url: user.avatar_url || null, // Ensure it's at least null, not undefined
                    };

                    // Store user data
                    localStorage.setItem("accessToken", accessToken);
                    localStorage.setItem("refreshToken", refreshToken);
                    localStorage.setItem(
                        "user",
                        JSON.stringify(userWithAvatar)
                    );

                    set({
                        user: userWithAvatar,
                        accessToken,
                        refreshToken,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                        isInitialized: true,
                    });

                    return response;
                } catch (error) {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    localStorage.removeItem("user");

                    const errorMessage =
                        getErrorMessage(error) || "Login failed";
                    set({
                        isLoading: false,
                        error: errorMessage,
                        isAuthenticated: false,
                        user: null,
                        accessToken: null,
                        refreshToken: null,
                    });
                    throw new Error(errorMessage);
                }
            },

            signup: async (userData) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await authService.signup(userData);
                    const { user, accessToken, refreshToken } =
                        response.data.data;

                    // Ensure user has avatar_url field
                    const userWithAvatar = {
                        ...user,
                        avatar_url: user.avatar_url || null,
                    };

                    localStorage.setItem("accessToken", accessToken);
                    localStorage.setItem("refreshToken", refreshToken);
                    localStorage.setItem(
                        "user",
                        JSON.stringify(userWithAvatar)
                    );

                    set({
                        user: userWithAvatar,
                        accessToken,
                        refreshToken,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                        isInitialized: true,
                    });

                    return response;
                } catch (error) {
                    const errorMessage =
                        getErrorMessage(error) || "Signup failed";
                    set({ isLoading: false, error: errorMessage });
                    throw new Error(errorMessage);
                }
            },

            logout: async () => {
                set({ isLoading: true });
                try {
                    const { refreshToken } = get();
                    if (refreshToken) {
                        await authService.logout({ refreshToken });
                    }
                } catch (error) {
                    console.error("Logout API call failed:", error);
                } finally {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    localStorage.removeItem("user");

                    storage.clear();
                    set({
                        user: null,
                        accessToken: null,
                        refreshToken: null,
                        isAuthenticated: false,
                        isLoading: false,
                        error: null,
                        isInitialized: true,
                    });
                }
            },

            refreshTokens: async () => {
                const { refreshToken } = get();
                if (!refreshToken)
                    throw new Error("No refresh token available");

                try {
                    const response = await authService.refreshToken({
                        refreshToken,
                    });
                    const { accessToken } = response.data.data;
                    localStorage.setItem("accessToken", accessToken);
                    set({ accessToken, error: null });
                    return accessToken;
                } catch (error) {
                    get().logout();
                    throw new Error("Session expired. Please login again.");
                }
            },

            clearError: () => set({ error: null }),

            // Update user data with complete user object from userStore
            updateUser: (userData) => {
                set((state) => {
                    const updatedUser = { ...state.user, ...userData };
                    localStorage.setItem("user", JSON.stringify(updatedUser));
                    return { user: updatedUser };
                });
            },

            // NEW: Sync user data from userStore to authStore
            syncUserData: (userData) => {
                set((state) => {
                    const updatedUser = { ...state.user, ...userData };
                    localStorage.setItem("user", JSON.stringify(updatedUser));
                    return { user: updatedUser };
                });
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                isAuthenticated: state.isAuthenticated,
                isInitialized: state.isInitialized,
            }),
        }
    )
);
