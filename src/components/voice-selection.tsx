"use client";

import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useParamStore } from "@/store/params.store";
import { StopIcon } from "@heroicons/react/16/solid";
import { ChevronDownIcon, PlayIcon } from "@heroicons/react/20/solid";
import { useEffect, useMemo } from "react";

export const VoiceSelection = () => {
  const voices = useParamStore((state) => state.voices);
  const currentVoice = useParamStore((state) => state.currentVoice);
  const setCurrentVoice = useParamStore((state) => state.setCurrentVoice);
  const getVoices = useParamStore((state) => state.getVoices);
  const playingVoiceId = useParamStore((state) => state.playingVoiceId);
  const toggleVoicePreview = useParamStore((state) => state.toggleVoicePreview);

  const displayLabel = useMemo(
    () => voices.find((v) => v.voice_id === currentVoice?.voice_id)?.name,
    [currentVoice?.voice_id, voices]
  );

  useEffect(() => {
    getVoices().catch(console.error);
  }, [getVoices]);

  if (!displayLabel) {
    return <Loader />;
  }

  return (
    <Tooltip>
      <DropdownMenu>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-full p-1.5" variant="outline">
              <div className="truncate w-48">{displayLabel}</div>
              <ChevronDownIcon className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <DropdownMenuContent className="w-60">
          <DropdownMenuRadioGroup
            value={currentVoice?.voice_id}
            onValueChange={(value) => {
              const voice = voices.find((v) => v.voice_id === value);
              if (voice) {
                setCurrentVoice(voice);
              }
            }}
            className="gap-1 flex flex-col"
          >
            {voices.map((v) => (
              <DropdownMenuRadioItem
                key={v.voice_id}
                value={v.voice_id}
                className="py-0 pr-0 h-9"
              >
                <div className="flex gap-2 h-full w-full ">
                  <div className="flex items-center">
                    <div className="w-40 truncate font-medium">{v.name}</div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      toggleVoicePreview(v);
                    }}
                    className="flex-1 flex items-center justify-center rounded hover:bg-muted/10 focus:outline-none"
                  >
                    {playingVoiceId === v.voice_id ? (
                      <StopIcon className="w-4 h-4" />
                    ) : (
                      <PlayIcon className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <TooltipContent>
        <p>{currentVoice?.name}</p>
      </TooltipContent>
    </Tooltip>
  );
};
