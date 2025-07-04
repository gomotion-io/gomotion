import {
  TextStomp,
  TextStompProps,
} from "@/gomotion-composition/text-layer/text-stomp";
import { AbsoluteFill } from "remotion";
import { FC } from "react";
import { Watermark } from "@/gomotion-composition/watermark";

export type GomotionCompositionProps = {
  watermark: boolean;
  fps: number;
  textStompLayer: TextStompProps;
};

export const GomotionComposition: FC<GomotionCompositionProps> = ({
  watermark,
  fps,
  textStompLayer,
}) => {
  return (
    <AbsoluteFill>
      <TextStomp words={textStompLayer.words} fps={fps} />
      {watermark && <Watermark />}
    </AbsoluteFill>
  );
};
