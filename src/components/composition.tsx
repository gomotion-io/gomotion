"use client";

import { useUserStore } from "@/store/user.store";
import { useVideoStore } from "@/store/video.store";
import Image from "next/image";
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
      <div className="w-full flex-1 flex flex-col items-center justify-center">
        <Image
          src="/images/no-generation.png"
          alt="No video"
          width={200}
          height={200}
          className="grayscale opacity-40 mb-4 "
        />
        <div className="text-lg font-medium mb-2">No animations</div>
        <span className="text-muted-foreground font-medium max-w-[16rem] text-center">
          Start by describing your animation in the chat.
        </span>
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
