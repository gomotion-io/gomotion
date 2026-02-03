"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface VideoDialogProps {
  src: string;
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}

export const VideoDialog = ({
  src,
  title,
  description,
  children,
  className,
}: VideoDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={cn(
            "cursor-pointer rounded-xl overflow-hidden  h-full border",
            className
          )}
        >
          {children}
        </div>
      </DialogTrigger>
      <DialogContent className="w-full max-w-3xl p-2 bg-neutral-50">
        <div className="w-full">
          <video
            id={title}
            src={src}
            controls
            autoPlay
            playsInline
            muted
            className="w-full h-auto max-h-[70vh] rounded-md"
          />
        </div>
        <DialogFooter className="mb-4 flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
          <DialogDescription className="flex flex-col gap-2">
            <div className="text-emerald-900 w-20 py-1 px-3 transition-colors duration-300 bg-emerald-100 font-medium text-sm rounded-md">
              Prompt
            </div>
            <div className="pl-2 text-primary"> {description}</div>
          </DialogDescription>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
