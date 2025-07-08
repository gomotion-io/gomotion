import type { AudioPayload, LayerSpec } from "@/gomotion-compiler/spec";
import { FC } from "react";
import { Audio } from "remotion";

interface AudioLayerProps {
  layer: LayerSpec & { type: "audio" };
}

export const AudioLayer: FC<AudioLayerProps> = ({ layer }) => {
  const payload = layer.payload as AudioPayload;
  return payload.url ? <Audio src={payload.url} /> : null;
};
