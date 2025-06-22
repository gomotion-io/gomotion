"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpIcon, StopIcon } from "@heroicons/react/16/solid";
import { useCallback, useRef } from "react";
import { ModelSelection } from "@/components/model-selection";
import { useGenerationStore } from "@/store/generation.store";
import { useParamStore } from "@/store/params.store";
import { RatioSelection } from "@/components/ratio-selection";

export const PromptInput = () => {
  const textareaRef = useRef(null);

  const loading = useGenerationStore((state) => state.loading);
  const generateComp = useGenerationStore((state) => state.generateComp);
  const setPrompt = useParamStore((state) => state.setPrompt);
  const prompt = useParamStore((state) => state.prompt);

  const handleSubmit = useCallback(async () => {
    await generateComp({ prompt });
  }, [generateComp, prompt]);

  return (
    <div className="relative w-full flex flex-col gap-4">
      <Textarea
        ref={textareaRef}
        placeholder="Describe your video..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="min-h-[95px] text-sm max-h-[calc(75dvh)] overflow-hidden resize-none rounded-3xl font-medium backdrop-blur-md pl-5 pt-4 pb-10"
        rows={2}
        autoFocus
        onKeyDown={(event) => {
          if (
            event.key === "Enter" &&
            !event.shiftKey &&
            !event.nativeEvent.isComposing
          ) {
            event.preventDefault();
            handleSubmit();
          }
        }}
      />
      <div className="absolute bottom-0 right-0 p-2 w-fit flex flex-row justify-end gap-2 items-center">
        <RatioSelection />
        <ModelSelection />
        {loading ? (
          <Button className="rounded-full w-14" onClick={() => {}}>
            <StopIcon className="w-5 h-5" />
          </Button>
        ) : (
          <Button
            disabled={!prompt.trim()}
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
