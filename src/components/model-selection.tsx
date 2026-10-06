"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MODELS } from "@/lib/models";
import { useParamStore } from "@/store/params.store";
import { useUserStore } from "@/store/user.store";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { Badge } from "./ui/badge";

export const ModelSelection = () => {
  const { profile } = useUserStore();
  const model = useParamStore((state) => state.model);
  const setModel = useParamStore((state) => state.setModel);
  const displayLabel =
    MODELS.find((m) => m.value === model.value)?.name || model.name;
  const currentModel = MODELS.find((m) => m.value === model.value);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="focus-visible:ring-0 focus-visible:border-border"
        asChild
      >
        <Button className="rounded-full p-1.5 gap-1 sm:gap-2" variant="outline">
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
          <ChevronDownIcon className="size-4 sm:size-5 max-[359px]:hidden" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-60">
        <DropdownMenuRadioGroup
          value={model.value}
          onValueChange={(value) => {
            setModel(MODELS.find((m) => m.value === value)!);
          }}
          className="gap-1 flex flex-col"
        >
          {MODELS.map((model) => (
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
