import { computeFxStyle } from "@/gomotion-compiler/fx-engine";
import type { LayerSpec, TextPayload } from "@/gomotion-compiler/spec";
import { ms2f } from "@/gomotion-compiler/utils";
import { FC } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

interface TextLayerProps {
  layer: LayerSpec & { type: "text" };
  fps: number;
}

export const TextLayer: FC<TextLayerProps> = ({ layer, fps }) => {
  const { layout, style, text } = layer.payload as TextPayload;
  const { width, height } = useVideoConfig();

  // Inside a <Sequence> the frame count is already offset, so 0 == layer start.
  const frame = useCurrentFrame();
  const total = ms2f(layer.durationMs, fps);

  // If outside the layer duration, render nothing (safety guard).
  if (frame < 0 || frame >= total) {
    return null;
  }

  // Find the active animation segment (first where current time is within [start,end)).
  const activeAnim = (layer?.animations ?? []).find((a) => {
    const start = a.startMs ? ms2f(a.startMs - layer.startMs, fps) : 0;
    const end = a.endMs ? ms2f(a.endMs - layer.startMs, fps) : total;
    return frame >= start && frame < end;
  });

  // Progress (0-1) inside the active segment
  let progress = 0;
  if (activeAnim) {
    const start = activeAnim.startMs
      ? ms2f(activeAnim.startMs - layer.startMs, fps)
      : 0;
    const end = activeAnim.endMs
      ? ms2f(activeAnim.endMs - layer.startMs, fps)
      : total;
    const length = Math.max(1, end - start);
    progress = (frame - start) / length;
  }

  // Compute FX style
  const fxStyle = activeAnim
    ? computeFxStyle(activeAnim.fx, progress).style
    : {};

  // Positioning
  const top = (layout.y / 100) * height;
  const left = (layout.x / 100) * width;
  const textAlign = layout.align ?? "left";

  return (
    <span
      style={{
        position: "absolute",
        pointerEvents: "none",
        top,
        left,
        transformOrigin: "center center",
        textAlign,
        fontFamily: style.fontFamily ?? "sans-serif",
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        color: style.color,
        WebkitTextStroke: style.outline
          ? `${style.outline.width}px ${style.outline.color}`
          : undefined,
        whiteSpace: "pre-wrap",
        ...fxStyle,
      }}
    >
      {text}
    </span>
  );
};
