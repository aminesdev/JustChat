import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
    persist(
        (set, get) => ({
            // State
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,

            // Actions
            setAuth: (userData) => {
                const { user, accessToken, refreshToken } = userData;
                set({
                    user,
                    accessToken,
                    refreshToken,
                    isAuthenticated: true,
                });

                // Also store in localStorage for API interceptor
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
            },

            logout: () => {
                set({
                    user: null,
                    accessToken: null,
                    refreshToken: null,
                    isAuthenticated: false,
                });

                // Clear localStorage
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
            },

            updateUser: (userData) => {
                set({ user: { ...get().user, ...userData } });
            },
        }),
        {
            name: "auth-storage", // name for the storage
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
