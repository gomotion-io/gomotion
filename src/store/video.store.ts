import { useParamStore } from "@/store/params.store";
import { createClient } from "@/supabase/client";
import * as React from "react";
import { ComponentType } from "react";
import * as ReactDOM from "react-dom";
import * as Remotion from "remotion";
import { create } from "zustand";

interface VideoState {
  videos: Video[];
  currentVideo: Video | null;
  loading: boolean;
  generating: boolean;
  fetchVideos: (profileId: string) => Promise<void>;
  subscribe: (profileId: string) => void;
  create: (payload: { prompt: string }) => Promise<Video | null>;
  remove: (id: string) => void;
  composition: ComponentType | null;
  load: (id: string) => Promise<Video | null>;
}

export const useVideoStore = create<VideoState>((set) => ({
  videos: [],
  currentVideo: null,
  loading: false,
  generating: false,
  composition: null,

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
      set({ generating: true, currentVideo: null });

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

        const composition = await createComponent(data.tsx);
        set({ currentVideo: data, composition });

        return data;
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
      const composition = await createComponent(data.tsx);
      set({ currentVideo: data, composition });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }

    return data as Video;
  },
}));

const createComponent = async (tsx: string) => {
  // Make React and Remotion available globally for the dynamic component
  window.React = React;
  window.ReactDOM = ReactDOM;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).Remotion = Remotion;

  // Transform TSX using the API route
  const transformRes = await fetch("/api/transform", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tsx }),
  });

  const { code } = await transformRes.json();

  const jsBlob = new Blob([code], { type: "text/javascript" });
  const blobUrl = URL.createObjectURL(jsBlob);
  const imported = await import(/* webpackIgnore: true */ blobUrl);
  URL.revokeObjectURL(blobUrl);

  return imported.default;
};
