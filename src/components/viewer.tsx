"use client";

import { RemotionPlayer } from "@/components/player";
import { PromptInput } from "@/components/prompt-input";
import { useVideoStore } from "@/store/video.store";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useUserStore } from "@/store/user.store";
import { Loader } from "@/components/loader";
import { Profile } from "@/components/profile";

export const Viewer = () => {
  const params = useParams() as { id?: string };
  const { profile } = useUserStore();
  const loadVideo = useVideoStore((state) => state.load);
  const video = useVideoStore((state) => state.currentVideo);
  const generating = useVideoStore((state) => state.generating);

  useEffect(() => {
    if (params?.id) {
      loadVideo(params.id).catch(console.error);
    }
  }, [loadVideo, params.id]);

  return (
    <div className="flex flex-col min-w-0 h-[100svh] items-center px-5 sm:px-10 bg-neutral-50">
      <Profile />
      <div className="w-full max-w-4xl flex flex-col min-w-0 flex-1 items-center sm:px-5 pb-5 gap-5">
        {generating ? (
          <div className="w-full flex-1 flex items-center justify-center">
            <Loader className="text-neutral-950" />
          </div>
        ) : !video || !video.composition ? (
          <div className="w-full flex-1 flex items-center justify-center border border-dashed">
            <p className="text-neutral-500">No generation yet..</p>
          </div>
        ) : (
          <RemotionPlayer
            composition={video.composition}
            watermark={profile?.subscription_status === "inactive"}
          />
        )}
        <PromptInput />
      </div>
    </div>
  );
};
