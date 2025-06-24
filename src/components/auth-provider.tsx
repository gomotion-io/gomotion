"use client";

import { ProfileData } from "@/_type";
import { useUserStore } from "@/store/user.store";
import { User } from "@supabase/auth-js";
import { FC, ReactNode, useEffect } from "react";
import { useVideoStore } from "@/store/video.store";
import { useCountStore } from "@/store/count.store";

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

  return <>{children}</>;
};
