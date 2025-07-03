"use client";

import { RemotionPlayer } from "@/components/player";
import { PromptInput } from "@/components/prompt-input";
import { useVideoStore } from "@/store/video.store";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export const Viewer = () => {
  const params = useParams() as { id?: string };
  const loadVideo = useVideoStore((state) => state.load);

  useEffect(() => {
    if (params?.id) {
      loadVideo(params.id).catch(console.error);
    }
  }, [loadVideo, params.id]);

  return (
    <div className="flex flex-col min-w-0 h-[100svh] items-center gap-5  px-5 sm:px-10">
      <div className="w-full max-w-3xl flex flex-col min-w-0 flex-1 items-center sm:px-5 py-5 gap-5">
        <RemotionPlayer />
        <PromptInput />
      </div>
    </div>
  );
};
