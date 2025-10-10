import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUIStore = create(
    persist(
        (set, get) => ({
            // State
            theme: "light",
            sidebarOpen: true,
            activeModal: null,
            notifications: [],
            loadingStates: {},

            // Actions - Theme
            toggleTheme: () =>
                set((state) => ({
                    theme: state.theme === "light" ? "dark" : "light",
                })),
            setTheme: (theme) => set({ theme }),

            // Actions - Layout
            toggleSidebar: () =>
                set((state) => ({
                    sidebarOpen: !state.sidebarOpen,
                })),
            setSidebarOpen: (open) => set({ sidebarOpen: open }),

            // Actions - Modals
            openModal: (modalName) => set({ activeModal: modalName }),
            closeModal: () => set({ activeModal: null }),

            // Actions - Notifications
            addNotification: (notification) =>
                set((state) => ({
                    notifications: [
                        ...state.notifications,
                        {
                            id: Date.now(),
                            ...notification,
                        },
                    ],
                })),
            removeNotification: (id) =>
                set((state) => ({
                    notifications: state.notifications.filter(
                        (n) => n.id !== id
                    ),
                })),
            clearNotifications: () => set({ notifications: [] }),

            // Actions - Loading states
            setLoading: (key, loading) =>
                set((state) => ({
                    loadingStates: {
                        ...state.loadingStates,
                        [key]: loading,
                    },
                })),
        }),
        {
            name: "ui-storage",
            partialize: (state) => ({ theme: state.theme }),
        }
    )
);
