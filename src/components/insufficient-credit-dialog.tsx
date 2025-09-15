"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUiStore } from "@/store/ui.store";
import Image from "next/image";
import { useRouter } from "next/navigation";
export const InsufficientCreditDialog = () => {
  const { showInsufficientCreditsDialog, setShowInsufficientCreditsDialog } =
    useUiStore();
  const router = useRouter();

  return (
    <Dialog
      open={showInsufficientCreditsDialog}
      onOpenChange={setShowInsufficientCreditsDialog}
    >
      <DialogContent className="p-2">
        <DialogHeader>
          <div className="border sm:h-60 h-40 overflow-hidden rounded-md mb-4">
            <Image
              src="/images/upgrade.jpg"
              alt="Insufficient Credits"
              width={1080}
              height={1080}
              className="w-full h-full object-cover"
            />
          </div>
          <DialogTitle className="px-5 text-2xl sm:mb-0 mb-5">
            Out of credits ? Get full access for $8.99.
          </DialogTitle>
          <DialogDescription className="mb-5 px-5 leading-relaxed sm:block hidden">
            Upgrade now to unlock full access to Gomotion and keep bringing your
            ideas to life with powerful, AI-generated motion design.
          </DialogDescription>

          <div className="mb-6 px-5">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-sm text-start leading-relaxed">
                  Export in up to 4K for YouTube, social, or pitch decks
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-sm text-start leading-relaxed">
                  Access to all Pro models (GPT-5, Claude Opus 4.1 and more...)
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-sm text-start leading-relaxed">
                  Use commercially on your website or client work
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-sm text-start leading-relaxed">
                  Unock the Powerfull Narrative mode for complete ads creation
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setShowInsufficientCreditsDialog(false)}
          >
            Cancel
          </Button>
          <Button
            className="flex items-center gap-2 px-8"
            onClick={() => {
              setShowInsufficientCreditsDialog(false);
              router.push("/pricing");
            }}
          >
            Let&apos;s go <span>🚀</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
