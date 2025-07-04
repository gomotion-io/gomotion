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
  playingVoiceId: string | null;
  audio: HTMLAudioElement | null;
  toggleVoicePreview: (voice: Voice) => void;
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
  playingVoiceId: null,
  audio: null,
  setPrompt: (prompt) => set({ prompt }),
  setAspectRatio: (aspectRatio: AspectRatio) => set({ aspectRatio }),
  getVoices: async () => {
    const res = await fetch("/api/voices");
    const data = await res.json();
    set({ voices: data, currentVoice: data[0] });
  },
  setCurrentVoice: (currentVoice) => set({ currentVoice }),
  toggleVoicePreview: (voice) =>
    set((state) => {
      if (state.playingVoiceId === voice.voice_id) {
        state.audio?.pause();
        return { playingVoiceId: null, audio: null } as Partial<ParamsState>;
      }

      state.audio?.pause();

      const newAudio = new Audio(voice.preview_url);
      newAudio.addEventListener("ended", () => {
        set({ playingVoiceId: null, audio: null });
      });
      newAudio.play().catch(console.error);

      return {
        playingVoiceId: voice.voice_id,
        audio: newAudio,
      } as Partial<ParamsState>;
    }),
}));
