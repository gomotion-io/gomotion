import { useCurrentFrame } from "remotion";
import type { LayerSpec, TextPayload } from "@/gomotion-compiler-v2/spec";
import { FC } from "react";
import { ms2f } from "@/gomotion-compiler-v2/utils";

interface TextLayerProps {
  layer: LayerSpec & { type: "text" };
  fps: number;
}

export const TextLayer: FC<TextLayerProps> = ({ layer, fps }) => {
  const { layout, style, text } = layer.payload as TextPayload;
  const frame = useCurrentFrame() - ms2f(layer.startMs, fps); // local frame
  const total = ms2f(layer.durationMs, fps);

  // interpolate value to create animation with remotionjs
};
