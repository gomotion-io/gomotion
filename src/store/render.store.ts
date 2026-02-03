import { MastraOutput } from "@/_type";
import { bundleCode } from "@/lib/bundle-code";
import { downloadBlob, renderVideo } from "@/lib/web-renderer";
import { useVideoStore } from "@/store/video.store";
import React from "react";
import { create } from "zustand";

export type State =
  | {
      status: "init";
    }
  | {
      status: "invoking";
    }
  | {
      status: "bundling";
    }
  | {
      progress: number;
      renderedFrames: number;
      totalFrames: number;
      status: "rendering";
    }
  | {
      status: "error";
      error: Error;
    }
  | {
      url: string;
      size: number;
      status: "done";
    };

interface RenderStoreState {
  state: State;
  abortController: AbortController | null;
  renderVideo: () => Promise<void>;
  cancelRender: () => void;
  undo: () => void;
}

export const useRenderStore = create<RenderStoreState>((set, get) => ({
  state: { status: "init" },
  abortController: null,

  renderVideo: async () => {
    const currentVideo = useVideoStore.getState().currentVideo;

    if (!currentVideo || !currentVideo.composition) {
      set({
        state: {
          status: "error",
          error: new Error("No video composition available for rendering."),
        },
      });
      return;
    }

    const composition = currentVideo.composition as unknown as MastraOutput;

    const fileTree: Record<string, string> = composition.result?.files ?? {};
    const meta = {
      width: composition.result?.meta?.width ?? 1920,
      height: composition.result?.meta?.height ?? 1080,
      fps: composition.result?.meta?.fps ?? 30,
      durationInFrames: composition.result?.meta?.durationInFrames ?? 300,
    };
    const title = composition.result?.title ?? "video";

    // Create abort controller for cancellation
    const abortController = new AbortController();
    set({ abortController });

    set({ state: { status: "bundling" } });

    try {
      // Bundle the code to get the component
      const component = await bundleCode({ files: fileTree });

      set({
        state: {
          status: "rendering",
          progress: 0,
          renderedFrames: 0,
          totalFrames: meta.durationInFrames,
        },
      });

      // Render the video using the web renderer
      const result = await renderVideo({
        component: component as React.ComponentType<Record<string, unknown>>,
        durationInFrames: meta.durationInFrames,
        fps: meta.fps,
        width: meta.width,
        height: meta.height,
        compositionId: title.replace(/\s+/g, "-").toLowerCase(),
        signal: abortController.signal,
        onProgress: (progress) => {
          const totalFrames = meta.durationInFrames;
          const renderedProgress = progress.renderedFrames / totalFrames;
          const encodedProgress = progress.encodedFrames / totalFrames;
          // Weight: 40% rendering, 60% encoding
          const overallProgress = renderedProgress * 0.4 + encodedProgress * 0.6;

          set({
            state: {
              status: "rendering",
              progress: Math.min(overallProgress * 100, 99),
              renderedFrames: progress.renderedFrames,
              totalFrames,
            },
          });
        },
      });

      // Update state to done
      set({
        state: {
          status: "done",
          url: result.url,
          size: result.size,
        },
        abortController: null,
      });

      // Trigger download
      const filename = `${title.replace(/\s+/g, "_")}.mp4`;
      downloadBlob(result.blob, filename);
    } catch (err) {
      // Check if it was cancelled
      if (err instanceof Error && err.name === "AbortError") {
        set({
          state: { status: "init" },
          abortController: null,
        });
        return;
      }

      set({
        state: {
          status: "error",
          error: err as Error,
        },
        abortController: null,
      });
    }
  },

  cancelRender: () => {
    const { abortController } = get();
    if (abortController) {
      abortController.abort();
    }
    set({
      state: { status: "init" },
      abortController: null,
    });
  },

  undo: () =>
    set({
      state: { status: "init" },
      abortController: null,
    }),
}));
