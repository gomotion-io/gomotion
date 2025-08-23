"use client";

import { Button } from "@/components/ui/button";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/20/solid";

export const FloatingSupportButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        asChild
        size="lg"
        className="rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
      >
        <a
          // href="https://gomotion.featurebase.app/"
            href="https://gomotionio.canny.io/feature-requests"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-3"
        >
          <ChatBubbleLeftRightIcon className="w-5 h-5" />
          <span className="font-medium">Support & Features</span>
        </a>
      </Button>
    </div>
  );
};
