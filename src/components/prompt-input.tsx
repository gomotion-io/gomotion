"use client";

import { RatioSelection } from "@/components/ratio-selection";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { VoiceSelection } from "@/components/voice-selection";
import { useParamStore } from "@/store/params.store";
import { useVideoStore } from "@/store/video.store";
import { ArrowUpIcon, StopIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import { FC, useCallback, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

type PromptInputProps = {
  placeholder?: string;
  className?: string;
  isLandingPage?: boolean;
};

export const PromptInput: FC<PromptInputProps> = ({
  className,
  placeholder = "Describe your animations...",
  isLandingPage = false,
}) => {
  const router = useRouter();
  const textareaRef = useRef(null);

  const generating = useVideoStore((state) => state.generating);
  const createVideo = useVideoStore((state) => state.create);
  const setPrompt = useParamStore((state) => state.setPrompt);
  const prompt = useParamStore((state) => state.prompt);
  const currentVoice = useParamStore((state) => state.currentVoice);

  const canGenerate = useMemo(
    () => prompt.trim().length > 0 && !!currentVoice,
    [prompt, currentVoice],
  );

  const handleSubmit = useCallback(async () => {
    if (isLandingPage) {
      router.push("/explore");
    }

    const video = await createVideo({ prompt });
    if (video?.id) {
      router.push(`/explore/${video.id}`);
    }
  }, [createVideo, isLandingPage, prompt, router]);

  return (
    <div className="relative w-full flex flex-col gap-4">
      <Textarea
        ref={textareaRef}
        placeholder={placeholder}
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
              handleSubmit().catch(console.error);
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
            className="rounded-full w-14"
            onClick={handleSubmit}
          >
            <ArrowUpIcon className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );
};
