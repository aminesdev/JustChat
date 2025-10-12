import { create } from "zustand";

export const useUIStore = create((set, get) => ({
    // State
    activeSidebar: "conversations",
    isMobileSidebarOpen: false,
    modals: {
        userProfile: false,
        imagePreview: false,
        deleteConfirm: false,
        newConversation: false,
    },
    toast: null,
    theme: "light",
    loadingStates: new Map(),

    // Actions - UI state only
    setActiveSidebar: (sidebar) => set({ activeSidebar: sidebar }),

    toggleMobileSidebar: () =>
        set((state) => ({
            isMobileSidebarOpen: !state.isMobileSidebarOpen,
        })),

    openModal: (modalName) =>
        set((state) => ({
            modals: { ...state.modals, [modalName]: true },
        })),

    closeModal: (modalName) =>
        set((state) => ({
            modals: { ...state.modals, [modalName]: false },
        })),

    closeAllModals: () =>
        set({
            modals: {
                userProfile: false,
                imagePreview: false,
                deleteConfirm: false,
                newConversation: false,
            },
        }),

    showToast: (toastData) => set({ toast: toastData }),

    hideToast: () => set({ toast: null }),

    setTheme: (theme) => {
        set({ theme });
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    },

    toggleTheme: () =>
        set((state) => {
            const newTheme = state.theme === "light" ? "dark" : "light";
            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            return { theme: newTheme };
        }),

    setLoading: (key, isLoading) =>
        set((state) => {
            const newLoadingStates = new Map(state.loadingStates);
            if (isLoading) {
                newLoadingStates.set(key, true);
            } else {
                newLoadingStates.delete(key);
            }
            return { loadingStates: newLoadingStates };
        }),

    // Selectors
    isLoading: (key) => get().loadingStates.has(key),
    isModalOpen: (modalName) => get().modals[modalName],
}));
