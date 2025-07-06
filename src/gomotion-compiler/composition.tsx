import { TextStomp, TextStompProps } from "@/gomotion-compiler/text-stomp";
import { AbsoluteFill } from "remotion";
import { FC } from "react";
import { Watermark } from "@/gomotion-compiler/watermark";

export type GomotionCompilerProps = {
  watermark: boolean;
  fps: number;
  textStompLayer: {
    sections: TextStompProps[];
  };
};

export const GomotionCompiler: FC<GomotionCompilerProps> = ({
  watermark,
  fps,
  textStompLayer,
}) => {
  return (
    <AbsoluteFill>
      {/* ========= TEXT STOMP LAYER ========= */}
      {textStompLayer.sections.map((s, i) => (
        <TextStomp key={i} words={s.words} audio={s.audio} fps={fps} />
      ))}

      {/* ========= Watermark ========= */}
      {watermark && <Watermark />}
    </AbsoluteFill>
  );
};
