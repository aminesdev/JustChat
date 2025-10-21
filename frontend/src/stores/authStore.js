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

            initialize: async (force = false) => {
                console.log("AuthStore initialize() called", { force });

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

                if (accessToken && refreshToken && userStr) {
                    try {
                        const user = JSON.parse(userStr);
                        console.log(
                            "Setting authenticated state with user:",
                            user.email
                        );

                        set({
                            accessToken,
                            refreshToken,
                            user,
                            isAuthenticated: true,
                            isInitialized: true,
                        });

                        console.log("Auth initialized successfully");
                    } catch (error) {
                        console.error(
                            "Failed to parse stored user data:",
                            error
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

            resetInitialization: () => {
                console.log("Resetting auth store initialization");
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
                        avatar_url: user.avatar_url || null,
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
                    // Clear everything on logout
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    localStorage.removeItem("user");

                    storage.clear();

                    // Reset stores to clear any cached data
                    try {
                        // Reset stores by setting their initial state
                        const { useConversationStore } = await import(
                            "./conversationStore"
                        );
                        const { useUserStore } = await import("./userStore");
                        const { useMessageStore } = await import(
                            "./messageStore"
                        );

                        const conversationStore =
                            useConversationStore.getState();
                        const userStore = useUserStore.getState();

                        if (conversationStore.resetStore)
                            conversationStore.resetStore();
                        if (userStore.resetStore) userStore.resetStore();
                    } catch (storeError) {
                        console.error("Error clearing stores:", storeError);
                    }

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

            updateUser: (userData) => {
                set((state) => {
                    const updatedUser = { ...state.user, ...userData };
                    localStorage.setItem("user", JSON.stringify(updatedUser));
                    return { user: updatedUser };
                });
            },

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
