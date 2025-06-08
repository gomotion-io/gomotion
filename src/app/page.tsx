"use client";

import { Header } from "@/components/header";
import { PromptInput } from "@/components/prompt-input";
import { RemotionPlayer } from "@/components/remotion-player";
import { useGenerationStore } from "@/store/generation";
import { useEffect } from "react";

export default function Home() {
  const ensureReady = useGenerationStore((state) => state._ensureEsbuildReady);

  useEffect(() => {
    ensureReady();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col min-w-0 h-dvh items-center px-5 gap-5 pb-5">
      <Header />
      <div className="max-w-3xl w-full mx-auto flex flex-col min-w-0 h-dvh items-center p-5 gap-5">
        <RemotionPlayer />
        <PromptInput />
      </div>
    </div>
  );
}
