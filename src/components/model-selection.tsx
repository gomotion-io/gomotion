"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MODEL_PROVIDERS } from "@/constant";
import { useParamStore } from "@/store/params.store";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ModelSelection = () => {
  const model = useParamStore((state) => state.llm_model);
  const setModelProvider = useParamStore((state) => state.setModelProvider);

  return (
    <Tooltip>
      <DropdownMenu>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-full p-1.5" variant="outline">
              {model} <ChevronDownIcon className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <DropdownMenuContent className="w-72">
          <DropdownMenuRadioGroup
            value={model}
            onValueChange={(value) => {
              const provider = MODEL_PROVIDERS.find(
                (m) => m.llm_model === value,
              );
              if (provider) {
                setModelProvider(provider);
              }
            }}
            className="gap-1 flex flex-col"
          >
            {MODEL_PROVIDERS.map((model) => (
              <DropdownMenuRadioItem
                key={model.llm_model}
                value={model.llm_model}
                className="font-medium"
              >
                {model.llm_model}
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
