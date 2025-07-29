"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

interface VideoDialogProps {
  src: string;
  title: string;
  description: string;
  children: ReactNode;
}

export const VideoDialog = ({
  src,
  title,
  description,
  children,
}: VideoDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
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
