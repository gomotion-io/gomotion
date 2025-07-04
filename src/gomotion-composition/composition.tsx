import {
  TextStomp,
  TextStompProps,
} from "@/gomotion-composition/text-layer/text-stomp";
import { AbsoluteFill } from "remotion";
import { FC } from "react";

export type GomotionCompositionProps = {
  fps: number;
  textStompLayer: TextStompProps;
};

export const GomotionComposition: FC<GomotionCompositionProps> = ({
  fps,
  textStompLayer,
}) => {
  return (
    <AbsoluteFill>
      <TextStomp words={textStompLayer.words} fps={fps} />
    </AbsoluteFill>
  );
};
