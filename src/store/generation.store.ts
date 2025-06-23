import { useParamStore } from "@/store/params.store";
import type { FileSystemTree } from "@webcontainer/api";
import { create } from "zustand";

export type GenerationState = {
  loading: boolean;
  generateComp: (payload: {
    prompt: string;
  }) => Promise<FileSystemTree | undefined>;
};

export const useGenerationStore = create<GenerationState>((set) => ({
  preparing: false,
  loading: false,
  composition: null,
  metadata: null,

  generateComp: async ({ prompt }) => {
    const { llm_provider, llm_model } = useParamStore.getState();

    try {
      set({ loading: true });

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, llm_provider, llm_model }),
      });

      return (await res.json()) as FileSystemTree;
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },
}));
