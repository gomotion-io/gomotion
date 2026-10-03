"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUiStore } from "@/store/ui.store";
import { ArrowUpRight, Coins } from "lucide-react";
import { useRef } from "react";

const OPENROUTER_CREDITS_URL = "https://openrouter.ai/settings/credits";

export const InsufficientCreditsDialog = () => {
  const { showInsufficientCreditsDialog, setShowInsufficientCreditsDialog } =
    useUiStore();

  const topUpLinkRef = useRef<HTMLAnchorElement>(null);

  const close = () => setShowInsufficientCreditsDialog(false);

  return (
    <Dialog
      open={showInsufficientCreditsDialog}
      onOpenChange={setShowInsufficientCreditsDialog}
    >
      <DialogContent
        className="sm:max-w-[440px]"
        showCloseButton={false}
        // Radix skips links when auto-focusing, which would land on "Not now".
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          topUpLinkRef.current?.focus();
        }}
      >
        <DialogHeader className="space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-400/20 to-orange-500/20 ring-1 ring-amber-500/30">
            <Coins className="h-7 w-7 text-amber-600" />
          </div>
          <div className="space-y-2 text-center">
            <DialogTitle className="text-2xl font-semibold">
              You&apos;re out of credits
            </DialogTitle>
            <DialogDescription className="text-base leading-relaxed">
              Your OpenRouter balance can&apos;t cover this generation. Top it
              up, your prompt is saved.
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="mt-2 flex flex-col gap-2">
          <Button asChild className="h-11 w-full">
            <a
              ref={topUpLinkRef}
              href={OPENROUTER_CREDITS_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
            >
              Add credits on OpenRouter
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="ghost" className="w-full" onClick={close}>
            Not now
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Gomotion runs on your own OpenRouter key, so credits are billed by
          OpenRouter, not by us.
        </p>
      </DialogContent>
    </Dialog>
  );
};
