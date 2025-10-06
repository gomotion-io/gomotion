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
import { useUserStore } from "@/store/user.store";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { Badge } from "./ui/badge";

const models = [
  {
    name: "Claude Sonnet 4",
    value: "anthropic/claude-sonnet-4",
    icon: "/models-icons/anthropic.svg",
    premuim: false,
  },
  {
    name: "Claude Opus 4.1",
    value: "anthropic/claude-opus-4.1",
    icon: "/models-icons/anthropic.svg",
    premuim: true,
  },
  {
    name: "GPT 5 Codex",
    value: "openai/gpt-5-codex",
    icon: "/models-icons/openai.svg",
    premuim: true,
  },
  {
    name: "Gemini 2.5 Pro",
    value: "google/gemini-2.5-pro",
    icon: "/models-icons/google.svg",
    premuim: false,
  },
  {
    name: "Grok 4",
    value: "x-ai/grok-4",
    icon: "/models-icons/xai.svg",
    premuim: false,
  },
];

export const ModelSelection = () => {
  const { profile } = useUserStore();
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
          <div className="sm:block hidden">{displayLabel}</div>
          <ChevronDownIcon className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-60">
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
              disabled={
                model.premuim && profile?.subscription_status !== "active"
              }
            >
              <Image
                src={model.icon}
                alt={model.name}
                className="w-4 h-4"
                width={16}
                height={16}
              />
              {model.name}
              {model.premuim && (
                <Badge className="h-4 text-xs text-emerald-900 bg-emerald-100">
                  Pro
                </Badge>
              )}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
