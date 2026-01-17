"use client";

import { ProfileData } from "@/_type";
import { useCountStore } from "@/store/count.store";
import { useUiStore } from "@/store/ui.store";
import { useUserStore } from "@/store/user.store";
import { useVideoStore } from "@/store/video.store";
import { User } from "@supabase/auth-js";
import { FC, ReactNode, useEffect } from "react";

interface AuthProviderProps {
  initialUser: User | null;
  initialProfile: ProfileData | null;
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({
  initialUser,
  initialProfile,
  children,
}) => {
  const { initialise } = useUserStore();
  const { fetchVideos } = useVideoStore();
  const { fetchCounts } = useCountStore();
  const { setShowApiKeyOnboardingDialog } = useUiStore();

  useEffect(() => {
    initialise(initialUser, initialProfile);
  }, [initialProfile, initialUser, initialise]);

  useEffect(() => {
    if (initialProfile?.id) {
      fetchVideos(initialProfile?.id).catch(console.error);
    }
  }, [fetchVideos, initialProfile?.id]);

  useEffect(() => {
    if (initialProfile?.id && initialProfile?.products?.limit) {
      fetchCounts(initialProfile?.id, initialProfile?.products?.limit).catch(
        console.error,
      );
    }
  }, [fetchCounts, initialProfile]);

  // Show onboarding dialog if user is authenticated but has no API key
  useEffect(() => {
    if (initialUser && initialProfile && !initialProfile.open_router_api_key) {
      setShowApiKeyOnboardingDialog(true);
    }
  }, [initialUser, initialProfile, setShowApiKeyOnboardingDialog]);

  return <>{children}</>;
};
