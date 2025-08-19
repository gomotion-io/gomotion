import { MastraOutput } from "@/_type";
import { Context, useParamStore } from "@/store/params.store";
import { create } from "zustand";

export type RefinedVideo = Omit<Video, "composition"> & {
  composition: MastraOutput;
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
    previousVideo: Partial<Video>;
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
    const { aspectRatio, context, currentVoice } = useParamStore.getState();

    try {
      set({ generating: true, currentVideo: null });

      const res = await fetch("/api/animations/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          aspectRatio,
          context,
          voiceId: context === Context.Narrative && currentVoice?.voice_id,
        }),
      });

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

  update: async ({ id, prompt, previousVideo }) => {
    const { aspectRatio, context, currentVoice } = useParamStore.getState();

    if (
      !prompt &&
      (!previousVideo || Object.keys(previousVideo).length === 0)
    ) {
      throw new Error("neither prompt nor video updates are provided");
    }

    try {
      set({ generating: true });

      const res = await fetch("/api/animations/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          videoId: id,
          prompt,
          aspectRatio,
          previousVideo,
          context,
          voiceId: context === Context.Narrative && currentVoice?.voice_id,
        }),
      });

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
