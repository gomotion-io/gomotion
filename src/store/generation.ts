import { CompositionMetadata } from "@/_type";
import { usePromptParamsStore } from "@/store/prompt-params";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Remotion from "remotion";
import { create } from "zustand";

export type GenerationState = {
  loading: boolean;
  composition: React.ComponentType | null;
  metadata: CompositionMetadata | null;
  generateComp: (payload: { prompt: string }) => Promise<void>;
};

export const useGenerationStore = create<GenerationState>((set) => ({
  preparing: false,
  loading: false,
  composition: null,
  metadata: null,

  generateComp: async ({ prompt }) => {
    const { llm_provider, llm_model } = usePromptParamsStore.getState();

    try {
      set({ loading: true });

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, llm_provider, llm_model }),
      });

      const { tsx, metadata } = await res.json();

      // Make React and Remotion available globally for the dynamic component
      window.React = React;
      window.ReactDOM = ReactDOM;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).Remotion = Remotion;

      // Transform TSX using the API route
      const transformRes = await fetch("/api/transform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tsx }),
      });

      const { code } = await transformRes.json();

      const jsBlob = new Blob([code], { type: "text/javascript" });
      const blobUrl = URL.createObjectURL(jsBlob);
      const imported = await import(/* webpackIgnore: true */ blobUrl);
      URL.revokeObjectURL(blobUrl);

      set({
        composition: imported.default as React.ComponentType,
        metadata: metadata as CompositionMetadata,
      });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },
}));
