import { DEFAULT_MODEL, Model } from "@/lib/models";
import { create } from "zustand";

export enum AspectRatio {
  "16:9" = "1920:1080",
  "9:16" = "1080:1920",
  "1:1" = "1080:1080",
  "4:3" = "1440:1080",
}

export enum Context {
  Creative = "creative",
  Classic = "classic",
  Narrative = "narrative",
}

export type ParamsState = {
  prompt: string;
  aspectRatio: AspectRatio;
  context: Context;
  model: Model;
  images: File[];
  uploadImageError: string | null;
  setPrompt: (prompt: string) => void;
  setAspectRatio: (aspectRatio: AspectRatio) => void;
  setContext: (context: Context) => void;
  setModel: (model: Model) => void;
  addImages: (files: File[]) => void;
  removeImage: (index: number) => void;
  setUploadImageError: (error: string | null) => void;
  reset: () => void;
};

export const useParamStore = create<ParamsState>((set) => ({
  prompt: "",
  aspectRatio: AspectRatio["16:9"],
  context: Context.Creative,
  images: [],
  uploadImageError: null,
  model: DEFAULT_MODEL,
  setModel: (model: Model) => set({ model }),
  setPrompt: (prompt) => set({ prompt }),
  setAspectRatio: (aspectRatio: AspectRatio) => set({ aspectRatio }),
  setContext: (context: Context) => set({ context }),
  addImages: (files) =>
    set((state) => ({
      images: [...state.images, ...files].slice(0, 3), // Max 3 images
    })),
  removeImage: (index) =>
    set((state) => ({
      images: state.images.filter((_, i) => i !== index),
    })),
  setUploadImageError: (error) => set({ uploadImageError: error }),
  reset: () =>
    set({
      prompt: "",
      aspectRatio: AspectRatio["16:9"],
      context: Context.Creative,
      images: [],
      uploadImageError: null,
      model: DEFAULT_MODEL,
    }),
}));
