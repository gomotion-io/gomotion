"use client";

import { useUserStore } from "@/store/user.store";
import { useVideoStore } from "@/store/video.store";
import { Loader } from "./loader";
import { RemotionPlayer } from "./player";

export const Composition = () => {
  const { profile } = useUserStore();
  const video = useVideoStore((state) => state.currentVideo);
  const generating = useVideoStore((state) => state.generating);

  if (generating) {
    return (
      <div className="w-full flex-1 flex items-center justify-center">
        <Loader className="text-neutral-950" />
      </div>
    );
  }

  if (!video || !video.composition) {
    return (
      <div className="w-full flex-1 flex items-center justify-center">
        <p className="text-neutral-500">No generation yet..</p>
      </div>
    );
  }

  return (
    <RemotionPlayer
      composition={video.composition}
      watermark={profile?.subscription_status === "inactive"}
    />
  );
};
