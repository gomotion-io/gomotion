"use client";

import { renderMediaOnWeb } from "@remotion/web-renderer";
import { ComponentType } from "react";

export interface RenderOptions {
  component: ComponentType<Record<string, unknown>>;
  durationInFrames: number;
  fps: number;
  width: number;
  height: number;
  compositionId: string;
  onProgress?: (progress: {
    renderedFrames: number;
    encodedFrames: number;
  }) => void;
  signal?: AbortSignal;
}

export interface RenderResult {
  blob: Blob;
  url: string;
  size: number;
}

export async function renderVideo(options: RenderOptions): Promise<RenderResult> {
  const {
    component,
    durationInFrames,
    fps,
    width,
    height,
    compositionId,
    onProgress,
    signal,
  } = options;

  const { getBlob } = await renderMediaOnWeb({
    composition: {
      id: compositionId,
      component,
      durationInFrames,
      fps,
      width,
      height,
    },
    container: "mp4",
    videoCodec: "h264",
    videoBitrate: "high",
    onProgress: onProgress
      ? (progress) => {
          onProgress({
            renderedFrames: progress.renderedFrames,
            encodedFrames: progress.encodedFrames,
          });
        }
      : null,
    signal: signal ?? null,
  });

  const blob = await getBlob();
  const url = URL.createObjectURL(blob);
  const size = blob.size;

  return { blob, url, size };
}

export function downloadBlob(blob: Blob, filename: string = "video.mp4") {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
