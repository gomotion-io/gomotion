"use client";

import { PromptInput } from "@/components/prompt-input";
import { RemotionPlayer } from "@/components/remotion-player";
import { ChangeEvent, ComponentType, useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [composition] = useState<ComponentType | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = () => {
    // setComposition
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col min-w-0 h-dvh items-center p-5 gap-5">
      <RemotionPlayer composition={composition} />
      <PromptInput
        input={input}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
