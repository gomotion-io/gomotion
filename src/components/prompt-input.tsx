"use client";

import { ContextSelection } from "@/components/context-selection";
import { RatioSelection } from "@/components/ratio-selection";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";
import { useParamStore } from "@/store/params.store";
import { useVideoStore } from "@/store/video.store";
import { ArrowUpIcon, StopIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import { FC, ReactNode, useCallback, useMemo, useRef } from "react";
import { ImagesUpload } from "./images-upload/uploader";
import { ModelSelection } from "./model-selection";
// import { VoiceSelection } from "./voice-selection";

type PromptInputProps = {
  className?: string;
  landingButton?: ReactNode;
};

export const PromptInput: FC<PromptInputProps> = ({
  className,
  landingButton,
}) => {
  const router = useRouter();
  const textareaRef = useRef(null);

  const generating = useVideoStore((state) => state.generating);
  const createVideo = useVideoStore((state) => state.create);
  // const updateVideo = useVideoStore((state) => state.update);
  const currentVideo = useVideoStore((state) => state.currentVideo);
  const setPrompt = useParamStore((state) => state.setPrompt);
  const prompt = useParamStore((state) => state.prompt);
  // const context = useParamStore((state) => state.context);

  const canGenerate = useMemo(() => prompt.trim().length > 0, [prompt]);

  const handleSubmit = useCallback(async () => {
    // if (video) {
    //   // update the current video
    //   await updateVideo({ id: video.id, prompt, previousVideo: video });
    //   return;
    // }
    // // else create a new video

    const data = await createVideo({ prompt });
    if (data?.id) {
      router.push(`/explore/${data.id}`);
    }
  }, [createVideo, prompt, router]);

  return (
    <div className="relative w-full flex flex-col gap-4">
      <Textarea
        ref={textareaRef}
        placeholder={
          currentVideo
            ? "Describe the change you want to make..."
            : "Describe your animation..."
        }
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className={cn(
          "min-h-[105px] bg-white text-sm max-h-[calc(75dvh)] overflow-hidden resize-none rounded-3xl font-medium backdrop-blur-2xl pl-5 pt-4 pb-10",
          className
        )}
        rows={2}
        autoFocus
        onKeyDown={(event) => {
          if (
            event.key === "Enter" &&
            !event.shiftKey &&
            !event.nativeEvent.isComposing
          ) {
            if (canGenerate) {
              event.preventDefault();
              handleSubmit().catch(console.error);
              // handleSubmit(currentVideo).catch(console.error);
            }
          }
        }}
      />

      <div className="absolute w-full bottom-0 z-50 right-0 p-2 flex flex-row justify-between gap-2 items-center">
        <ImagesUpload />

        <div className="flex flex-row gap-2">
          {/* {context === Context.Narrative && <VoiceSelection />} */}
          <ModelSelection />
          <RatioSelection />
          <ContextSelection />

          {landingButton ? (
            landingButton
          ) : generating ? (
            <Button
              className="rounded-full w-14 bg-indigo-200 font-medium text-indigo-900 hover:bg-indigo-300"
              disabled
            >
              <StopIcon className="w-5 h-5 animate-spin" />
            </Button>
          ) : (
            <Button
              disabled={!canGenerate}
              className="rounded-full bg-indigo-200 font-medium text-indigo-900 hover:bg-indigo-300"
              // onClick={() => handleSubmit(currentVideo)}
              onClick={() => handleSubmit()}
            >
              <ArrowUpIcon className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
