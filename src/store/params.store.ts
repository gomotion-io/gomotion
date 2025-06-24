import { create } from "zustand";

export enum AspectRatio {
  "16:9" = "1920:1080",
  "9:16" = "1080:1920",
  "1:1" = "1080:1080",
  "4:3" = "1440:1080",
}

export type ParamsState = {
  prompt: string;
  aspectRatio: AspectRatio;
  setPrompt: (prompt: string) => void;
  setAspectRatio: (aspectRatio: AspectRatio) => void;
};

export const useParamStore = create<ParamsState>((set) => ({
  prompt: "",
  aspectRatio: AspectRatio["16:9"],
  setPrompt: (prompt) => set({ prompt }),
  setAspectRatio: (aspectRatio: AspectRatio) => set({ aspectRatio }),
}));
