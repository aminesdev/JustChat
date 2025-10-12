import { create } from "zustand";
import { userService } from "../services/userService";

export const useUserStore = create((set, get) => ({
    currentUser: null,
    users: new Map(),
    searchedUsers: [],
    onlineUsers: new Set(),
    isLoading: false,
    error: null,

    loadCurrentUser: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await userService.getProfile();
            const user = response.data.data.user;

            set((state) => {
                const newUsers = new Map(state.users);
                newUsers.set(user.id, user);
                return {
                    currentUser: user,
                    users: newUsers,
                    isLoading: false,
                };
            });
        } catch (error) {
            const errorMessage =
                error.response?.data?.msg || "Failed to load profile";
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    updateProfile: async (profileData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await userService.updateProfile(profileData);
            const updatedUser = response.data.data.user;

            set((state) => {
                const newUsers = new Map(state.users);
                newUsers.set(updatedUser.id, updatedUser);
                return {
                    currentUser: updatedUser,
                    users: newUsers,
                    isLoading: false,
                };
            });

            return updatedUser;
        } catch (error) {
            const errorMessage =
                error.response?.data?.msg || "Failed to update profile";
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    searchUsers: async (query, limit = 10) => {
        if (!query || query.trim().length < 2) {
            set({ searchedUsers: [] });
            return [];
        }

        set({ isLoading: true, error: null });
        try {
            const response = await userService.searchUsers(query.trim(), limit);
            const users = response.data.data.users;

            set((state) => {
                const newUsers = new Map(state.users);
                users.forEach((user) => newUsers.set(user.id, user));
                return {
                    searchedUsers: users,
                    users: newUsers,
                    isLoading: false,
                };
            });

            return users;
        } catch (error) {
            const errorMessage =
                error.response?.data?.msg || "Failed to search users";
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    loadUserById: async (userId) => {
        const cachedUser = get().users.get(userId);
        if (cachedUser) return cachedUser;

        set({ isLoading: true, error: null });
        try {
            const response = await userService.getUserById(userId);
            const user = response.data.data.user;

            set((state) => {
                const newUsers = new Map(state.users);
                newUsers.set(user.id, user);
                return {
                    users: newUsers,
                    isLoading: false,
                };
            });

            return user;
        } catch (error) {
            const errorMessage =
                error.response?.data?.msg || "Failed to load user";
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    },

    updateOnlineStatus: async (isOnline) => {
        try {
            await userService.updateOnlineStatus(isOnline);

            set((state) => {
                if (!state.currentUser) return state;

                const updatedUser = {
                    ...state.currentUser,
                    is_online: isOnline,
                };
                const newUsers = new Map(state.users);
                newUsers.set(updatedUser.id, updatedUser);

                return {
                    currentUser: updatedUser,
                    users: newUsers,
                };
            });
        } catch (error) {
            console.error("Failed to update online status:", error);
        }
    },

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

    clearSearch: () => set({ searchedUsers: [] }),
    clearError: () => set({ error: null }),

    getUserById: (userId) => get().users.get(userId),
    isUserOnline: (userId) => get().onlineUsers.has(userId),
}));
