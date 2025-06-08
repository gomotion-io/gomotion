"use client";

import { PromptInput } from "@/components/prompt-input";
import { RemotionPlayer } from "@/components/remotion-player";
import { useGeneration } from "@/hooks/use-generation";
import { ChangeEvent, ComponentType, useState } from "react";
import { CompositionMetadata } from "@/_type";
import { Header } from "@/components/header";

export default function Home() {
  const [input, setInput] = useState("");
  const [composition, setComposition] = useState<ComponentType | null>(null);
  const [metadata, setMetadata] = useState<CompositionMetadata | null>(null);
  const [loading, setLoading] = useState(false);

  const { preparing, generateRemotionComponent } = useGeneration();

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;

    try {
      setLoading(true);
      const result = await generateRemotionComponent({ prompt: input });
      setComposition(() => result.composition);
      setMetadata(() => result.metadata);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-w-0 h-dvh items-center px-5 gap-5 pb-5">
      <Header />
      <div className="max-w-3xl w-full mx-auto flex flex-col min-w-0 h-dvh items-center p-5 gap-5">
        <RemotionPlayer
          composition={composition}
          metadata={metadata}
          preparing={preparing}
        />
        <PromptInput
          input={input}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
}
