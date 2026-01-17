import { ProfileData } from "@/_type";
import { createClient } from "@/supabase/client";
import { User } from "@supabase/auth-js";
import { create } from "zustand";

export type UserState = {
  user: User | null;
  profile: ProfileData | null;
  loading: boolean;
  initialise: (user: User | null, profile: ProfileData | null) => void;
  updateProfile: (updates: Partial<ProfileData>) => void;
  signOut: () => Promise<void>;
};

export const useUserStore = create<UserState>((set) => {
  return {
    user: null,
    profile: null,
    loading: false,
    initialise: (user, profile) => set({ user, profile }),
    updateProfile: (updates) =>
      set((state) => ({
        profile: state.profile ? { ...state.profile, ...updates } : null,
      })),
    signOut: async () => {
      const supabase = createClient();
      await supabase.auth.signOut();
      set({ user: null, profile: null });
    },
  };
});
