"use client";

import { Profile } from "@/components/profile";
import { PromptInput } from "@/components/prompt-input";
import { useVideoStore } from "@/store/video.store";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Composition } from "./composition";
import { FloatingSupportButton } from "./floating-support-button";
import { ImagesUploadPreviews } from "./images-upload/previews";

export const Viewer = () => {
  const params = useParams() as { id?: string };
  const loadVideo = useVideoStore((state) => state.load);

  useEffect(() => {
    if (params?.id) {
      loadVideo(params.id).catch(console.error);
    }
  }, [loadVideo, params.id]);

  return (
    <div className="flex flex-col max-w-[85rem] mx-auto min-w-0 h-[100svh] items-center px-5 sm:px-10 relative">
      <Profile />
      <div className="w-full max-w-4xl flex flex-col min-w-0 flex-1 items-center sm:px-5 pb-[11.5rem]">
        <Composition />
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50 p-5 flex justify-center">
        <div className="w-full max-w-4xl flex flex-col">
          <ImagesUploadPreviews />
          <PromptInput />
        </div>
      </div>
      <FloatingSupportButton />
    </div>
  );
};
