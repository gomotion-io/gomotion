import { MODEL_PROVIDERS, ModelProvider } from "@/constant";
import { create } from "zustand";

export type PromptParamsState = {
  prompt: string;
  llm_provider: string;
  llm_model: string;

  // --- setters ---
  setPrompt: (prompt: string) => void;
  setModelProvider: (provider: ModelProvider) => void;
};

export const usePromptParamsStore = create<PromptParamsState>((set) => ({
  prompt: "",
  llm_provider: MODEL_PROVIDERS[0].llm_provider,
  llm_model: MODEL_PROVIDERS[0].llm_model,
  setPrompt: (prompt) => set({ prompt }),
  setModelProvider: ({ llm_provider, llm_model }) =>
    set({ llm_provider, llm_model }),
}));
