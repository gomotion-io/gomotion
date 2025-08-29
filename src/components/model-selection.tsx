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
import Image from "next/image";

const models = [
  {
    name: "Claude Sonnet 4",
    value: "anthropic/claude-sonnet-4",
    icon: "/models-icons/anthropic.svg",
  },
  {
    name: "GPT 5",
    value: "openai/gpt-5",
    icon: "/models-icons/openai.svg",
  },
  {
    name: "Gemini 2.5 Pro",
    value: "google/gemini-2.5-pro",
    icon: "/models-icons/google.svg",
  },
  {
    name: "Grok 4",
    value: "x-ai/grok-4",
    icon: "/models-icons/xai.svg",
  },
];

export const ModelSelection = () => {
  const model = useParamStore((state) => state.model);
  const setModel = useParamStore((state) => state.setModel);
  const displayLabel =
    models.find((m) => m.value === model.value)?.name || model.name;
  const currentModel = models.find((m) => m.value === model.value);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="focus-visible:ring-0 focus-visible:border-border"
        asChild
      >
        <Button className="rounded-full p-1.5" variant="outline">
          {currentModel && (
            <Image
              src={currentModel.icon}
              alt={currentModel.name}
              className="w-4 h-4"
              width={16}
              height={16}
            />
          )}
          {displayLabel}
          <ChevronDownIcon className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-52">
        <DropdownMenuRadioGroup
          value={model.value}
          onValueChange={(value) => {
            setModel(models.find((m) => m.value === value)!);
          }}
          className="gap-1 flex flex-col"
        >
          {models.map((model) => (
            <DropdownMenuRadioItem
              key={model.value}
              value={model.value}
              className="font-medium"
            >
              <Image
                src={model.icon}
                alt={model.name}
                className="w-4 h-4"
                width={16}
                height={16}
              />
              {model.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
