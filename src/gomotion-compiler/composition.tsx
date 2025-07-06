import { TextStomp, WordSpec } from "@/gomotion-compiler/text-layer/text-stomp";
import { AbsoluteFill, Audio, Sequence } from "remotion";
import { FC } from "react";
import { Watermark } from "@/gomotion-compiler/watermark";

export type GomotionCompilerProps = {
  watermark: boolean;
  fps: number;
  textStompLayer: {
    sections: {
      words: WordSpec[];
      audioUrl: string;
      start: number; // in frames :    Math.min(...words.map(w => w.inFrame));
      end: number; //in frames :   Math.max(...words.map(w => w.outFrame));
      duration: number; // in frames :    Math.max(1, end - start);
      gap?: number; // optional
    }[];
  };
};

export const GomotionCompiler: FC<GomotionCompilerProps> = ({
  watermark,
  fps,
  textStompLayer,
}) => {
  return (
    <AbsoluteFill>
      {textStompLayer.sections.map((s, i) => (
        <div key={i}>
          {/* synced text */}
          <TextStomp words={s.words} fps={fps} />

          {/* synced audio */}
          <Sequence from={s.start} durationInFrames={s.duration}>
            <Audio src={s.audioUrl} />
          </Sequence>
        </div>
      ))}
      {watermark && <Watermark />}
    </AbsoluteFill>
  );
};
