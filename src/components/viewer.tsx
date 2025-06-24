"use client";

import { Player } from "@/components/player";
import { PromptInput } from "@/components/prompt-input";
import { useWebContainer } from "@/hooks/webcontainer/useWebContainer";
import type { FileSystemTree } from "@webcontainer/api";
import { useEffect } from "react";

interface VideoViewerProps {
  composition: FileSystemTree;
}

export default function Viewer({ composition }: VideoViewerProps) {
  const { mountFiles } = useWebContainer();

  useEffect(() => {
    if (composition) {
      mountFiles(composition).catch(console.error);
    }
  }, [composition, mountFiles]);

  return (
    <div className="flex flex-col min-w-0 h-[calc(100vh-5rem)] items-center gap-5">
      <div className="w-full max-w-3xl flex flex-col min-w-0 flex-1 items-center sm:px-5 py-5 gap-5">
        <Player />
        <PromptInput />
      </div>
    </div>
  );
}
