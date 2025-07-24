import { MastraOutput } from "@/_type";
import { useParamStore } from "@/store/params.store";
import { createClient } from "@/supabase/client";
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
  remove: (id: string) => void;
  load: (id: string) => Promise<RefinedVideo | null>;
}

export const useVideoStore = create<VideoState>((set) => ({
  videos: [],
  currentVideo: null,
  loading: false,
  generating: false,

  fetchVideos: async (profileId) => {
    const supabase = createClient();

    set({ loading: true });

    const { data, error } = await supabase
      .from("videos")
      .select("*")
      .eq("profile_id", profileId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      set({ videos: data });
    }

    set({ loading: false });
  },

  create: async ({ prompt }) => {
    const { aspectRatio, currentVoice } = useParamStore.getState();

    if (!currentVoice) {
      throw new Error("currentVoice was not provided");
    }

    try {
      set({ generating: true, currentVideo: null });

      const res = await fetch("/api/animations/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          voiceId: currentVoice.voice_id,
          aspectRatio,
        }),
      });

      const data: Video = await res.json();

      if (data) {
        const refinedData = data as unknown as RefinedVideo;

        set((state) => ({ videos: [data, ...state.videos] }));

        set({ currentVideo: refinedData });

        return refinedData;
      }

      return null;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      set({ generating: false });
    }
  },

  update: async ({ id, prompt, previousVideo }) => {
    const { aspectRatio, currentVoice } = useParamStore.getState();

    if (!currentVoice) {
      throw new Error("currentVoice was not provided");
    }

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
          voiceId: currentVoice.voice_id,
          aspectRatio,
          previousVideo,
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

  remove: (id) =>
    set((state) => ({ videos: state.videos.filter((v) => v.id !== id) })),

  load: async (id) => {
    const supabase = createClient();

    set({ loading: true, currentVideo: null });

    const { data, error } = await supabase
      .from("videos")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      set({ loading: false });
      return null;
    }

    if (!data) {
      set({ loading: false });
      return null;
    }

    try {
      const refinedData = data as unknown as RefinedVideo;
      set({ currentVideo: refinedData });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }

    return data as unknown as RefinedVideo;
  },
}));
