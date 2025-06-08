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
import { usePromptParamsStore } from "@/store/prompt-params";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export const ModelSelection = () => {
  const model = usePromptParamsStore((state) => state.llm_model);
  const setModelProvider = usePromptParamsStore(
    (state) => state.setModelProvider
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full p-1.5" variant="outline">
          {model} <ChevronDownIcon className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72">
        <DropdownMenuRadioGroup
          value={model}
          onValueChange={(value) => {
            const provider = MODEL_PROVIDERS.find((m) => m.llm_model === value);
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
  );
};
