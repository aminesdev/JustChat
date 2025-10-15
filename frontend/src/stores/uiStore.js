import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUIStore = create(
    persist(
        (set, get) => ({
            theme: "light",
            activeSidebar: "conversations",
            isMobileSidebarOpen: false,
            modals: {
                userProfile: false,
                imagePreview: false,
                deleteConfirm: false,
                newConversation: false,
            },
            toast: null,
            loadingStates: new Map(),

            setTheme: (theme) => {
                set({ theme });
                document.documentElement.classList.toggle(
                    "dark",
                    theme === "dark"
                );
            },

            toggleTheme: () => {
                const newTheme = get().theme === "light" ? "dark" : "light";
                set({ theme: newTheme });
                document.documentElement.classList.toggle(
                    "dark",
                    newTheme === "dark"
                );
            },

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
            setLoading: (key, isLoading) =>
                set((state) => {
                    const newLoadingStates = new Map(state.loadingStates);
                    if (isLoading) newLoadingStates.set(key, true);
                    else newLoadingStates.delete(key);
                    return { loadingStates: newLoadingStates };
                }),
            isLoading: (key) => get().loadingStates.has(key),
            isModalOpen: (modalName) => get().modals[modalName],
        }),
        {
            name: "ui-storage",
            partialize: (state) => ({ theme: state.theme }),
        }
    )
);
