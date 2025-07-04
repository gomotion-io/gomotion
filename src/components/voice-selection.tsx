"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useParamStore } from "@/store/params.store";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useMemo } from "react";

export const VoiceSelection = () => {
  const voices = useParamStore((state) => state.voices);
  const voice = useParamStore((state) => state.voice);
  const setVoice = useParamStore((state) => state.setVoice);
  const getVoices = useParamStore((state) => state.getVoices);

  const displayLabel = useMemo(
    () => voices.find((v) => v.voiceId === voice?.voiceId)?.name,
    [],
  );

  useEffect(() => {
    getVoices().catch(console.error);
  }, [getVoices]);

  return (
    <Tooltip>
      <DropdownMenu>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-full p-1.5" variant="outline">
              {displayLabel}
              <ChevronDownIcon className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <DropdownMenuContent className="w-24">
          <DropdownMenuRadioGroup
            value={voice?.voiceId}
            onValueChange={(value) => {
              const voice = voices.find((v) => v.voiceId === value);
              if (voice) {
                setVoice(voice);
              }
            }}
            className="gap-1 flex flex-col"
          >
            {voices.map((v) => (
              <DropdownMenuRadioItem
                key={v.voiceId}
                value={v.voiceId}
                className="font-medium"
              >
                {v.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <TooltipContent>
        <p>Aspect ratio</p>
      </TooltipContent>
    </Tooltip>
  );
};
