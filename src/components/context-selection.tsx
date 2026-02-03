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
import { Context, useParamStore } from "@/store/params.store";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Badge } from "./ui/badge";

const contexts = {
  [Context.Creative]: {
    label: "Creative",
    description:
      "More creative with high accurate but with longer generation time",
  },
  [Context.Classic]: {
    label: "Classic",
    description: "Low accuracy and short generation time",
  },
  [Context.Narrative]: {
    label: "Narrative",
    description:
      "For storytelling with voice-over and long-form content like ads, and trailers",
  },
};

export const ContextSelection = () => {
  const context = useParamStore((s) => s.context);
  const setContext = useParamStore((s) => s.setContext);

  return (
    <Tooltip>
      <DropdownMenu>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              className="rounded-full p-1.5"
              variant="outline"
              disabled={context === Context.Narrative}
            >
              <div className="truncate w-auto text-left sm:block hidden">
                {contexts[context].label}
              </div>
              <div className="sm:hidden block">
                {contexts[context].label.slice(0, 2).toUpperCase()}
              </div>
              <ChevronDownIcon className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuRadioGroup
            value={context}
            onValueChange={(value) => setContext(value as Context)}
            className="gap-1 flex flex-col"
          >
            {Object.values(Context).map((c) => (
              <DropdownMenuRadioItem
                key={c}
                value={c}
                disabled={c === Context.Narrative}
                className="font-medium"
              >
                <div className="flex flex-col">
                  <p className="text-sm font-medium mb-1 gap-1">
                    {contexts[c].label}{" "}
                    {c === Context.Narrative && (
                      <Badge className="h-4 text-xs text-emerald-900 bg-emerald-100">
                        Beta
                      </Badge>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {contexts[c].description}
                  </p>
                </div>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <TooltipContent>
        <p> {contexts[context].description}</p>
      </TooltipContent>
    </Tooltip>
  );
};
