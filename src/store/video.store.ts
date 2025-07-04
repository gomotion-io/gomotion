import { GomotionCompositionProps } from "@/gomotion-composition/composition";
import { useParamStore } from "@/store/params.store";
import { createClient } from "@/supabase/client";
import { create } from "zustand";

type RefinedVideo = Omit<Video, "composition"> & {
  composition: {
    textStompLayer: GomotionCompositionProps["textStompLayer"];
  };
};

interface VideoState {
  videos: Video[];
  currentVideo: RefinedVideo | null;
  loading: boolean;
  generating: boolean;
  fetchVideos: (profileId: string) => Promise<void>;
  subscribe: (profileId: string) => void;
  create: (payload: { prompt: string }) => Promise<RefinedVideo | null>;
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

  subscribe: (profileId) => {
    const supabase = createClient();

    supabase
      .channel(`videos-list-${profileId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "videos",
          filter: `profile_id=eq.${profileId}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            set((state) => ({
              videos: [payload.new as Video, ...state.videos],
            }));
          }

          if (payload.eventType === "DELETE") {
            set((state) => ({
              videos: state.videos.filter(
                (v) => v.id !== (payload.old as Video).id,
              ),
            }));
          }
        },
      )
      .subscribe();
  },

  create: async ({ prompt }) => {
    const { aspectRatio, currentVoice } = useParamStore.getState();

    if (!currentVoice) {
      throw new Error("currentVoice was not provided");
    }

    try {
      set({ generating: true, currentVideo: null });

      const res = await fetch("/api/generate", {
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
