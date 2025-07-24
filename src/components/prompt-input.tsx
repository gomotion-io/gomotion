"use client";

import { RatioSelection } from "@/components/ratio-selection";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { VoiceSelection } from "@/components/voice-selection";
import { cn } from "@/lib/utils";
import { useParamStore } from "@/store/params.store";
import { RefinedVideo, useVideoStore } from "@/store/video.store";
import { ArrowUpIcon, StopIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import { FC, useCallback, useMemo, useRef } from "react";

type PromptInputProps = {
  className?: string;
  isLandingPage?: boolean;
};

export const PromptInput: FC<PromptInputProps> = ({
  className,
  isLandingPage = false,
}) => {
  const router = useRouter();
  const textareaRef = useRef(null);

  const generating = useVideoStore((state) => state.generating);
  const createVideo = useVideoStore((state) => state.create);
  const updateVideo = useVideoStore((state) => state.update);
  const currentVideo = useVideoStore((state) => state.currentVideo);
  const setPrompt = useParamStore((state) => state.setPrompt);
  const prompt = useParamStore((state) => state.prompt);
  const currentVoice = useParamStore((state) => state.currentVoice);

  const canGenerate = useMemo(
    () => prompt.trim().length > 0 && !!currentVoice,
    [prompt, currentVoice],
  );

  const handleSubmit = useCallback(
    async (video: RefinedVideo | null) => {
      if (isLandingPage) {
        router.push("/explore");
      }

      if (video) {
        // update the current video
        await updateVideo({ id: video.id, prompt, previousVideo: video });
        return;
      }

      // else create a new video
      const data = await createVideo({ prompt });
      if (data?.id) {
        router.push(`/explore/${data.id}`);
      }
    },
    [createVideo, isLandingPage, prompt, router, updateVideo],
  );

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
          "min-h-[105px] text-sm max-h-[calc(75dvh)] overflow-hidden resize-none rounded-3xl font-medium backdrop-blur-2xl pl-5 pt-4 pb-10",
          className,
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
              handleSubmit(currentVideo).catch(console.error);
            }
          }
        }}
      />
      <div className="absolute bottom-0 right-0 p-2 w-fit flex flex-row justify-end gap-2 items-center">
        <VoiceSelection />
        <RatioSelection />
        {generating ? (
          <Button className="rounded-full w-14" disabled>
            <StopIcon className="w-5 h-5 animate-spin" />
          </Button>
        ) : (
          <Button
            disabled={!canGenerate}
            className="rounded-full"
            onClick={() => handleSubmit(currentVideo)}
          >
            {currentVideo ? (
              <div className="mx-2">Remix</div>
            ) : (
              <ArrowUpIcon className="w-5 h-5" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
