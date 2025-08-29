"use client";

import { Button } from "@/components/ui/button";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/20/solid";

export const FloatingSupportButton = () => {
  return (
    <div className="fixed top-[5rem] right-6 z-50 flex flex-col gap-2">
      <Button
        asChild
        size="lg"
        className="bg-fuchsia-100 text-fuchsia-900 hover:bg-fuchsia-200 py-1 px-3 transition-colors duration-300 font-medium text-sm rounded-md"
      >
        <a
          href="https://discord.gg/Wd4nCJhCgd"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-3"
        >
          <ChatBubbleLeftRightIcon className="w-5 h-5" />
          <span className="font-medium">Join our Discord</span>
        </a>
      </Button>
    </div>
  );
};
