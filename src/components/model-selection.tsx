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
import { ModelRouter, useParamStore } from "@/store/params.store";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export const ModelSelection = () => {
  const model = useParamStore((s) => s.model);
  const setModel = useParamStore((s) => s.setModel);

  return (
    <Tooltip>
      <DropdownMenu>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-full p-1.5" variant="outline">
              <div className="truncate w-auto text-left">{model}</div>
              <ChevronDownIcon className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuRadioGroup
            value={model}
            onValueChange={(value) => setModel(value as ModelRouter)}
            className="gap-1 flex flex-col"
          >
            {Object.values(ModelRouter).map((m) => (
              <DropdownMenuRadioItem key={m} value={m} className="font-medium">
                {m}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <TooltipContent>
        <p>Model</p>
      </TooltipContent>
    </Tooltip>
  );
};
