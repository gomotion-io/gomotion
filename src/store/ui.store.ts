import { create } from "zustand";

export type SettingsTab = "profile" | "password" | "api-key" | "logout";

type UiStore = {
  isSettingsDialogOpen: boolean;
  activeTab: SettingsTab;
  setIsSettingsDialogOpen: (isOpen: boolean) => void;
  setActiveTab: (tab: SettingsTab) => void;
  showApiKeyOnboardingDialog: boolean;
  setShowApiKeyOnboardingDialog: (show: boolean) => void;
};

export const useUiStore = create<UiStore>((set) => ({
  isSettingsDialogOpen: false,
  activeTab: "profile",
  setIsSettingsDialogOpen: (isOpen) => set({ isSettingsDialogOpen: isOpen }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  showApiKeyOnboardingDialog: false,
  setShowApiKeyOnboardingDialog: (show) =>
    set({ showApiKeyOnboardingDialog: show }),
}));
