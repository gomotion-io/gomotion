import { MODEL_PROVIDERS, ModelProvider } from "@/constant";
import { create } from "zustand";

export enum AspectRatio {
  "16:9" = "1920:1080",
  "9:16" = "1080:1920",
  "1:1" = "1080:1080",
  "4:3" = "1440:1080",
}

export type ParamsState = {
  prompt: string;
  llm_provider: string;
  llm_model: string;
  aspectRatio: AspectRatio;
  setPrompt: (prompt: string) => void;
  setModelProvider: (provider: ModelProvider) => void;
  setAspectRatio: (aspectRatio: AspectRatio) => void;
};

export const useParamStore = create<ParamsState>((set) => ({
  prompt: "",
  llm_provider: MODEL_PROVIDERS[0].llm_provider,
  llm_model: MODEL_PROVIDERS[0].llm_model,
  aspectRatio: AspectRatio["16:9"],
  setPrompt: (prompt) => set({ prompt }),
  setModelProvider: ({ llm_provider, llm_model }) =>
    set({ llm_provider, llm_model }),
  setAspectRatio: (aspectRatio: AspectRatio) => set({ aspectRatio }),
}));
