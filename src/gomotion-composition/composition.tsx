import {
  TextStomp,
  TextStompProps,
} from "@/gomotion-composition/text-layer/text-stomp";
import { AbsoluteFill } from "remotion";
import { FC } from "react";

type GomotionCompositionProps = {
  fps: number;
  textStomp: TextStompProps;
};

export const GomotionComposition: FC<GomotionCompositionProps> = ({
  fps,
  textStomp,
}) => {
  return (
    <AbsoluteFill>
      <TextStomp words={textStomp.words} fps={fps} />
    </AbsoluteFill>
  );
};
