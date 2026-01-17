import { create } from "zustand";

export type SettingsTab = "profile" | "usage" | "password" | "api-key" | "logout";

type UiStore = {
  isSettingsDialogOpen: boolean;
  activeTab: SettingsTab;
  setIsSettingsDialogOpen: (isOpen: boolean) => void;
  setActiveTab: (tab: SettingsTab) => void;
  showInsufficientCreditsDialog: boolean;
  setShowInsufficientCreditsDialog: (show: boolean) => void;
  showApiKeyOnboardingDialog: boolean;
  setShowApiKeyOnboardingDialog: (show: boolean) => void;
};

export const useUiStore = create<UiStore>((set) => ({
  isSettingsDialogOpen: false,
  activeTab: "profile",
  setIsSettingsDialogOpen: (isOpen) => set({ isSettingsDialogOpen: isOpen }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  showInsufficientCreditsDialog: false,
  setShowInsufficientCreditsDialog: (show) =>
    set({ showInsufficientCreditsDialog: show }),
  showApiKeyOnboardingDialog: false,
  setShowApiKeyOnboardingDialog: (show) =>
    set({ showApiKeyOnboardingDialog: show }),
}));
