import { useParamStore } from "@/store/params.store";
import { createClient } from "@/supabase/client";
import type { FileSystemTree } from "@webcontainer/api";
import { create } from "zustand";

interface VideoState {
  videos: Video[];
  loading: boolean;
  generating: boolean;
  fetchVideos: (profileId: string) => Promise<void>;
  subscribe: (profileId: string) => void;
  create: (payload: { prompt: string }) => Promise<FileSystemTree | undefined>;
  remove: (id: string) => void;
}

export const useVideoStore = create<VideoState>((set) => ({
  videos: [],
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
    const { aspectRatio } = useParamStore.getState();

    try {
      set({ generating: true });

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, aspectRatio }),
      });

      const data: Video = await res.json();

      if (data) {
        set((state) => ({ videos: [data, ...state.videos] }));
      }

      return data.composition as unknown as FileSystemTree;
    } catch (error) {
      console.error(error);
    } finally {
      set({ generating: false });
    }
  },

  remove: (id) =>
    set((state) => ({ videos: state.videos.filter((v) => v.id !== id) })),
}));
