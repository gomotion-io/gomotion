import type { LayerSpec, TextPayload } from "@/gomotion-compiler/spec";
import { FC } from "react";
import useInterpolatedStyles from "@/gomotion-compiler/useInterpolatedStyles";

interface TextLayerProps {
  layer: LayerSpec & { type: "text" };
  fps: number;
}

export const TextLayer: FC<TextLayerProps> = ({ layer, fps }) => {
  const { text, animations } = layer.payload as TextPayload;
  const style = useInterpolatedStyles(animations, fps);

  return (
    <span
      style={{
        display: "inline-block", // width and height work on a span now
        ...style,
      }}
    >
      {text}
    </span>
  );
};
