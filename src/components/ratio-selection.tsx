"use client";

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
import { AspectRatio, useParamStore } from "@/store/params.store";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export const RatioSelection = () => {
  const aspectRatio = useParamStore((state) => state.aspectRatio);
  const setAspectRatio = useParamStore((state) => state.setAspectRatio);

  const displayLabel =
    Object.entries(AspectRatio).find(([, v]) => v === aspectRatio)?.[0] ||
    aspectRatio;

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
            value={aspectRatio}
            onValueChange={(value) => {
              setAspectRatio(value as AspectRatio);
            }}
            className="gap-1 flex flex-col"
          >
            {Object.entries(AspectRatio).map(([label, value]) => (
              <DropdownMenuRadioItem
                key={value}
                value={value}
                className="font-medium"
              >
                {label}
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
