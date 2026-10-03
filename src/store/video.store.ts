import { CompositionOutput } from "@/_type";
import type { AnimationErrorCode } from "@/lib/agent";
import { useParamStore } from "@/store/params.store";
import { useUiStore } from "@/store/ui.store";
import { create } from "zustand";

export type RefinedVideo = Omit<Video, "composition"> & {
  composition: CompositionOutput;
};

// Running out of OpenRouter credits is an expected state: show the top-up
// dialog instead of failing. Any other error is thrown to the caller.
const handleGenerationError = async (res: Response, action: string) => {
  const { error, code }: { error?: string; code?: AnimationErrorCode } =
    await res.json().catch(() => ({}));

  if (code === "INSUFFICIENT_CREDITS") {
    useUiStore.getState().setShowInsufficientCreditsDialog(true);
    return;
  }

  throw new Error(error || `${action} failed (${res.status})`);
};

interface VideoState {
  videos: Video[];
  currentVideo: RefinedVideo | null;
  loading: boolean;
  generating: boolean;
  fetchVideos: (profileId: string) => Promise<void>;
  create: (payload: { prompt: string }) => Promise<RefinedVideo | null>;
  update: (payload: {
    id: string;
    prompt: string;
  }) => Promise<RefinedVideo | null>;
  remove: (id: string) => Promise<void>;
  load: (id: string) => Promise<RefinedVideo | null>;
  reset: () => void;
}

export const useVideoStore = create<VideoState>((set) => ({
  videos: [],
  currentVideo: null,
  loading: false,
  generating: false,

  fetchVideos: async (profileId) => {
    set({ loading: true });

    try {
      const res = await fetch("/api/animations/fetch-all", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profileId }),
      });

      if (!res.ok) {
        throw new Error(`Fetch videos failed (${res.status})`);
      }

      const data: Video[] = await res.json();

      if (data) {
        set({ videos: data });
      }
    } catch (error) {
      console.error("fetchVideos error:", error);
    } finally {
      set({ loading: false });
    }
  },

  create: async ({ prompt }) => {
    const { aspectRatio, context, model, images } = useParamStore.getState();

    try {
      set({ generating: true, currentVideo: null });

      const formData = new FormData();
      formData.append("prompt", prompt);
      formData.append("aspectRatio", aspectRatio);
      formData.append("context", context);
      formData.append("model", model.value);

      images.forEach((image) => {
        formData.append(`images`, image);
      });

      const res = await fetch("/api/animations/create", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        await handleGenerationError(res, "Create");
        return null;
      }

      const data: Video = await res.json();

      if (!data) {
        return null;
      }

      const refinedData = data as unknown as RefinedVideo;
      set((state) => ({ videos: [data, ...state.videos] }));
      set({ currentVideo: refinedData });

      return refinedData;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      set({ generating: false });
    }
  },

  update: async ({ id, prompt }) => {
    const { aspectRatio, context, model, images } = useParamStore.getState();

    if (!prompt) {
      throw new Error("prompt is required to update a video");
    }

    try {
      set({ generating: true });

      const formData = new FormData();
      formData.append("videoId", id);
      formData.append("aspectRatio", aspectRatio);
      formData.append("context", context);
      formData.append("model", model.value);
      formData.append("prompt", prompt);

      images.forEach((image) => {
        formData.append(`images`, image);
      });

      const res = await fetch("/api/animations/update", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        await handleGenerationError(res, "Update");
        return null;
      }

      const data: Video = await res.json();

      if (!data) {
        return null;
      }

      const refinedData = data as unknown as RefinedVideo;

      set((state) => ({
        videos: state.videos.map((v) => (v.id === id ? (data as Video) : v)),
        currentVideo: refinedData,
      }));

      return refinedData;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      set({ generating: false });
    }
  },

  remove: async (id) => {
    try {
      const res = await fetch("/api/animations/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      set((state) => ({ videos: state.videos.filter((v) => v.id !== id) }));
    } catch (error) {
      console.error("Delete error:", error);
      throw error;
    }
  },

  load: async (id) => {
    set({ loading: true, currentVideo: null });

    try {
      const res = await fetch("/api/animations/fetch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data: Video = await res.json();

      if (!data) {
        return null;
      }

      const refinedData = data as unknown as RefinedVideo;
      set({ currentVideo: refinedData });
      return refinedData;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  reset: () =>
    set({
      currentVideo: null,
      generating: false,
    }),
}));
