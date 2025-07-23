import { useVideoStore } from "@/store/video.store";
import { create } from "zustand";
import { MastraOutput } from "@/_type";

interface ProgressResponseProgress {
  type: "progress";
  progress: number;
}

interface ProgressResponseDone {
  type: "done";
  url: string;
  size: number;
}

interface ProgressResponseError {
  type: "error";
  message: string;
}

type ProgressResponse =
  | ProgressResponseProgress
  | ProgressResponseDone
  | ProgressResponseError;

export type State =
  | {
      status: "init";
    }
  | {
      status: "invoking";
    }
  | {
      renderId: string;
      bucketName: string;
      progress: number;
      status: "rendering";
    }
  | {
      renderId: string | null;
      status: "error";
      error: Error;
    }
  | {
      url: string;
      size: number;
      status: "done";
    };

const wait = async (milliSeconds: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, milliSeconds));

interface RenderStoreState {
  state: State;
  renderVideo: () => Promise<void>;
  undo: () => void;
}

export const useRenderStore = create<RenderStoreState>((set) => ({
  state: { status: "init" },

  renderVideo: async () => {
    const currentVideo = useVideoStore.getState().currentVideo;

    if (!currentVideo || !currentVideo.composition) {
      set({
        state: {
          status: "error",
          renderId: null,
          error: new Error("No video composition available for rendering."),
        },
      });
      return;
    }

    const composition = currentVideo.composition as unknown as MastraOutput;

    const runId: string = composition.runId;
    const fileContent: string = composition.result?.component ?? "";
    const meta = {
      inputProps: {
        width: composition.result?.meta?.width ?? 1920,
        height: composition.result?.meta?.height ?? 1080,
        fps: composition.result?.meta?.fps ?? 30,
        durationInFrames: composition.result?.meta?.durationInFrames ?? 300,
      },
    };

    set({ state: { status: "invoking" } });

    try {
      const render_res = await fetch("/api/render-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ runId, fileContent, meta }),
      });

      const { renderId, bucketName } = await render_res.json();

      set({
        state: {
          status: "rendering",
          progress: 0,
          renderId,
          bucketName,
        },
      });

      let pending = true;
      while (pending) {
        const progress_res = await fetch("/api/render-progress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bucketName, renderId }),
        });

        const result = (await progress_res.json()) as ProgressResponse;

        console.log(result); ////

        switch (result.type) {
          case "error": {
            set({
              state: {
                status: "error",
                renderId,
                error: new Error(result.message),
              },
            });
            pending = false;
            break;
          }
          case "done": {
            // trigger download before or after updating state
            const { url, size } = result;
            // Update Zustand state first
            set({
              state: {
                status: "done",
                size: size,
                url: url,
              },
            });

            // In the browser, initiate a file download for the rendered video
            if (
              typeof window !== "undefined" &&
              typeof document !== "undefined"
            ) {
              try {
                const anchor = document.createElement("a");
                anchor.href = url;
                // Use the file name from the URL if available, otherwise fallback
                anchor.download = url.split("/").pop() ?? "video.mp4";
                anchor.style.display = "none";
                document.body.appendChild(anchor);
                anchor.click();
                document.body.removeChild(anchor);
              } catch (downloadError) {
                console.error(
                  "Failed to automatically download the video:",
                  downloadError,
                );
              }
            }

            pending = false;
            break;
          }
          case "progress": {
            set({
              state: {
                status: "rendering",
                bucketName,
                progress: result.progress,
                renderId,
              },
            });
            await wait(1000);
            break;
          }
        }
      }
    } catch (err) {
      set({
        state: {
          status: "error",
          error: err as Error,
          renderId: null,
        },
      });
    }
  },

  undo: () => set({ state: { status: "init" } }),
}));
