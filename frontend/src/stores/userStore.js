import { create } from "zustand";
import { userService } from "../services/userService";
import { getErrorMessage } from "../utils/errorUtils";
import { useAuthStore } from "./authStore";

export const useUserStore = create((set, get) => ({
    currentUser: null,
    users: [],
    searchedUsers: [],
    onlineUsers: new Set(),
    isLoading: false,
    error: null,
    hasLoadedCurrentUser: false,

    loadCurrentUser: async () => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (!accessToken || !refreshToken) {
            console.log("No tokens available for loading user profile");
            set({
                error: "Authentication required",
                hasLoadedCurrentUser: true,
            });
            return;
        }

        set({ isLoading: true, error: null });
        try {
            const response = await userService.getProfile();
            const user = response.data.data.user;

            console.log("UserStore - Loaded current user:", {
                id: user.id,
                email: user.email,
                avatar_url: user.avatar_url,
            });

            // Ensure avatar_url is properly set (not undefined)
            const userWithAvatar = {
                ...user,
                avatar_url: user.avatar_url || null,
            };

            // Sync the complete user data to authStore
            const authStore = useAuthStore.getState();
            authStore.syncUserData(userWithAvatar);

            set({
                currentUser: userWithAvatar,
                users: [userWithAvatar],
                isLoading: false,
                hasLoadedCurrentUser: true,
            });

            return userWithAvatar;
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to load profile";
            console.error("Failed to load user profile:", error);
            set({
                isLoading: false,
                error: errorMessage,
                hasLoadedCurrentUser: true,
            });
        }
    },

    getAllUsers: async (limit = 50) => {
        set({ isLoading: true, error: null });
        try {
            const response = await userService.getAllUsers(limit);
            const users = response.data.data.users;

            console.log("UserStore - Loaded all users:", users.length);

            // Filter out the current user from the list
            const currentUserId = get().currentUser?.id;
            const otherUsers = users.filter(
                (user) => user.id !== currentUserId
            );

            set({
                users: otherUsers, // Store only other users, not current user
                isLoading: false,
            });

            return otherUsers;
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to load users";
            console.error("Failed to load users:", error);
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    searchUsers: async (query, limit = 10) => {
        const trimmedQuery = query?.trim();
        if (!trimmedQuery || trimmedQuery.length < 2) {
            set({ searchedUsers: [] });
            return [];
        }

        set({ isLoading: true, error: null });
        try {
            const response = await userService.searchUsers(trimmedQuery, limit);
            const users = response.data.data.users;

            set({
                searchedUsers: users,
                isLoading: false,
            });

            return users;
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to search users";
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    updateProfile: async (profileData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await userService.updateProfile(profileData);
            const updatedUser =
                response.data?.data?.user ||
                response.data?.data ||
                response.data?.user ||
                response.data;

            if (!updatedUser || !updatedUser.id) {
                throw new Error("Invalid user data in response");
            }

            console.log("✅ Profile updated - New user data:", updatedUser);

            // Sync updated user data to authStore
            const authStore = useAuthStore.getState();
            authStore.syncUserData(updatedUser);

            set({
                currentUser: updatedUser,
                isLoading: false,
                error: null,
            });

            return updatedUser;
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to update profile";
            set({
                isLoading: false,
                error: errorMessage,
            });
            throw error;
        }
    },

    uploadAvatar: async (file) => {
        set({ isLoading: true, error: null });
        try {
            const formData = new FormData();
            formData.append("avatar_file", file);

            const response = await userService.updateProfile(formData);
            const updatedUser =
                response.data?.data?.user ||
                response.data?.data ||
                response.data?.user ||
                response.data;

            if (!updatedUser || !updatedUser.id) {
                throw new Error("Invalid user data in response");
            }

            // Sync updated user data to authStore
            const authStore = useAuthStore.getState();
            authStore.syncUserData(updatedUser);

            set({
                currentUser: updatedUser,
                isLoading: false,
                error: null,
            });

            return updatedUser;
        } catch (error) {
            const errorMessage =
                getErrorMessage(error) || "Failed to upload avatar";
            set({
                isLoading: false,
                error: errorMessage,
            });
            throw error;
        }
    },

    clearSearch: () => set({ searchedUsers: [] }),
    clearError: () => set({ error: null }),
    getUserById: (userId) => {
        const state = get();
        return state.users.find((user) => user && user.id === userId);
    },
    isUserOnline: (userId) => get().onlineUsers.has(userId),
    setUserOnline: (userId) => {
        set((state) => {
            const newOnlineUsers = new Set(state.onlineUsers);
            newOnlineUsers.add(userId);
            return { onlineUsers: newOnlineUsers };
        });
    },
    setUserOffline: (userId) => {
        set((state) => {
            const newOnlineUsers = new Set(state.onlineUsers);
            newOnlineUsers.delete(userId);
            return { onlineUsers: newOnlineUsers };
        });
    },
    resetStore: () =>
        set({
            currentUser: null,
            users: [],
            searchedUsers: [],
            onlineUsers: new Set(),
            isLoading: false,
            error: null,
            hasLoadedCurrentUser: false,
        }),
}));
