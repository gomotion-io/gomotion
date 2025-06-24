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
    const { aspectRatio } = useParamStore.getState();

    try {
      set({ loading: true });

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, aspectRatio }),
      });

      const data: Video = await res.json();
      return data.composition as FileSystemTree;
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },
}));
