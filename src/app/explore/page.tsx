"use client";

import { Header } from "@/components/header";
import { PromptInput } from "@/components/prompt-input";
import { RemotionPlayer } from "@/components/remotion-player";

export default function Home() {
  return (
    <div className="flex flex-col min-w-0 h-dvh items-center gap-5">
      <Header />
      <div className="w-full max-w-3xl flex flex-col min-w-0 flex-1 items-center p-5 gap-5">
        <RemotionPlayer />
        <PromptInput />
      </div>
    </div>
  );
}
