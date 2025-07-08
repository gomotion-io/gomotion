import { AbsoluteFill, Sequence } from "remotion";
import type { AnimationSpec, LayerSpec } from "./spec";
import { FC } from "react";
import { Watermark } from "@/gomotion-compiler/watermark";
import { TextLayer } from "@/gomotion-compiler-v2/layers/text";
import { ImageLayer } from "@/gomotion-compiler-v2/layers/image";
import { VideoLayer } from "@/gomotion-compiler-v2/layers/video";
import { ShapeLayer } from "@/gomotion-compiler-v2/layers/shape";
import { ms2f } from "@/gomotion-compiler-v2/utils";

interface CompilerProps {
  spec: AnimationSpec;
  watermark: boolean;
}

export const GomotionCompiler: FC<CompilerProps> = ({ spec, watermark }) => {
  const { fps } = spec.meta;
  return (
    <AbsoluteFill>
      {spec.layers.map((layer) => {
        const start = ms2f(layer.startMs, fps);
        const duration = ms2f(layer.durationMs, fps);
        return (
          <Sequence key={layer.id} from={start} durationInFrames={duration}>
            {renderLayer(layer, fps)}
          </Sequence>
        );
      })}

      {watermark && <Watermark />}
    </AbsoluteFill>
  );
};

function renderLayer(layer: LayerSpec, fps: number) {
  switch (layer.type) {
    case "text":
      return (
        <TextLayer layer={layer as LayerSpec & { type: "text" }} fps={fps} />
      );
    case "image":
      return <ImageLayer /* … */ />;
    case "video":
      return <VideoLayer /* … */ />;
    case "shape":
      return <ShapeLayer /* … */ />;
    default:
      return null;
  }
}
