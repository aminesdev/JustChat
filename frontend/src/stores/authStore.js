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
            isLoading: false,

            // Actions
            setAuth: (userData) => {
                const { user, accessToken, refreshToken } = userData;
                set({
                    user,
                    accessToken,
                    refreshToken,
                    isAuthenticated: true,
                    isLoading: false,
                });

                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
            },

            setLoading: (loading) => set({ isLoading: loading }),

            logout: () => {
                set({
                    user: null,
                    accessToken: null,
                    refreshToken: null,
                    isAuthenticated: false,
                    isLoading: false,
                });

                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
            },

            updateUser: (userData) => {
                set({ user: { ...get().user, ...userData } });
            },
        }),
        {
            name: "auth-storage",
        }
    )
);
