import { AbsoluteFill, Sequence } from "remotion";
import type { GomotionSpec, LayerSpec } from "./spec";
import { FC } from "react";
import { Watermark } from "@/gomotion-compiler/watermark";
import { TextLayer } from "@/gomotion-compiler/layers/text";
import { ImageLayer } from "@/gomotion-compiler/layers/image";
import { VideoLayer } from "@/gomotion-compiler/layers/video";
import { ShapeLayer } from "@/gomotion-compiler/layers/shape";
import { msToFrame } from "@/gomotion-compiler/utils";
import { AudioLayer } from "@/gomotion-compiler/layers/audio";

interface CompilerProps {
  spec: GomotionSpec;
  watermark: boolean;
}

export const GomotionCompiler: FC<CompilerProps> = ({ spec, watermark }) => {
  const { fps } = spec.meta;
  return (
    <AbsoluteFill>
      {spec.layers.map((layer) => {
        const start = msToFrame(layer.startMs, fps);
        const duration = msToFrame(layer.durationMs, fps);
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
    case "audio":
      return <AudioLayer layer={layer as LayerSpec & { type: "audio" }} />;
    default:
      return null;
  }
}
