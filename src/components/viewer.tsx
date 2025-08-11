"use client";

import { Profile } from "@/components/profile";
import { PromptInput } from "@/components/prompt-input";
import { useVideoStore } from "@/store/video.store";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Composition } from "./composition";

export const Viewer = () => {
  const params = useParams() as { id?: string };
  const loadVideo = useVideoStore((state) => state.load);

  useEffect(() => {
    if (params?.id) {
      loadVideo(params.id).catch(console.error);
    }
  }, [loadVideo, params.id]);

  return (
    <div className="flex flex-col min-w-0 h-[100svh] items-center px-5 sm:px-10 bg-neutral-50">
      <Profile />
      <div className="w-full max-w-4xl flex flex-col min-w-0 flex-1 items-center sm:px-5 pb-5 gap-10">
        <Composition />
        <PromptInput />
      </div>
    </div>
  );
};
