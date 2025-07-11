import type { LayerSpec, TextPayload } from "@/gomotion-compiler/spec";
import useInterpolatedStyles from "@/gomotion-compiler/useInterpolatedStyles";
import { FC } from "react";
import { AbsoluteFill } from "remotion";

interface TextLayerProps {
  layer: LayerSpec & { type: "text" };
  fps: number;
}

export const TextLayer: FC<TextLayerProps> = ({ layer, fps }) => {
  const { text, animations } = layer.payload as TextPayload;
  const style = useInterpolatedStyles(animations, fps);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span
        style={{
          ...style,
          fontFamily: '"Bangers, Impact, sans-serif",',
          textAlign: "center",
        }}
      >
        {text}
      </span>
    </AbsoluteFill>
  );
};
