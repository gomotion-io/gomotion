import { create } from "zustand";

export enum AspectRatio {
  "16:9" = "1920:1080",
  "9:16" = "1080:1920",
  "1:1" = "1080:1080",
  "4:3" = "1440:1080",
}

export type Voice = {
  name: string;
  voice_id: string;
  preview_url: string;
};

export type ParamsState = {
  prompt: string;
  aspectRatio: AspectRatio;
  voices: Voice[];
  currentVoice: Voice | null;
  setPrompt: (prompt: string) => void;
  setAspectRatio: (aspectRatio: AspectRatio) => void;
  getVoices: () => Promise<void>;
  setCurrentVoice: (currentVoice: Voice) => void;
};

export const useParamStore = create<ParamsState>((set) => ({
  prompt: "",
  aspectRatio: AspectRatio["16:9"],
  voices: [],
  currentVoice: null,
  setPrompt: (prompt) => set({ prompt }),
  setAspectRatio: (aspectRatio: AspectRatio) => set({ aspectRatio }),
  getVoices: async () => {
    const res = await fetch("/api/voices");
    const data = await res.json();
    set({ voices: data, currentVoice: data[0] });
  },
  setCurrentVoice: (currentVoice) => set({ currentVoice }),
}));
