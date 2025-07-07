import { computeFxStyle, FxSpec } from "@/gomotion-compiler/fx-engine";
import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

/**
 * A single word (or phrase) appearing in the stomp sequence.
 */
export interface WordSpec {
  /** Rendered text. */
  text: string;
  /** Inclusive start frame. */
  inFrame: number;
  /** Exclusive end frame. */
  outFrame: number;
  /** Initial origin Y position */
  top: number;
  /** Initial origin X position */
  left: number;
  /** FX parameters for the word. */
  fxs: FxSpec[];
}

/**
 * Top‑level spec passed to the composition.
 */
export interface TextStompProps {
  /** Ordered list of animated words. */
  words: WordSpec[];
  /** Override fps; falls back to Remotion project fps when omitted. */
  fps: number;
  /** The Sync audio url */
  audio: {
    url: string;
    /** The audio start in frame  */
    start: number;
    /** The audio end in frame  */
    end: number;
  };
}

/**
 * Internal component that animates a single word.
 */
const Word: React.FC<{ spec: WordSpec; fps: number }> = ({ spec, fps }) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  // Not yet, or already gone?
  if (frame < spec.inFrame || frame >= spec.outFrame) {
    return null;
  }

  const rel = frame - spec.inFrame; // frame relative to word
  const total = spec.outFrame - spec.inFrame;
  const segLen = total / spec.fxs.length; // segments of animation
  const segIndex = Math.min(spec.fxs.length - 1, Math.floor(rel / segLen));
  const segRel = rel - segIndex * segLen; // frame within the segment

  // Easing params for the animation
  const progress = spring({
    frame: segRel,
    fps,
    config: { damping: 8, stiffness: 150, mass: 0.8 },
  });

  const fx = spec.fxs[segIndex];

  const { style } = computeFxStyle(fx, progress);

  return (
    <span
      style={{
        pointerEvents: "none",
        position: "absolute",
        zIndex: 1,
        top: spec.top,
        left: spec.left,
        // TO PASS TO PROPS , COMPUTATION IN MASTRA, SO THE IA COULD KNOW THE SIZE OF EACH WORD (BRAINSTORM)
        fontFamily: "Bebas Neue, Impact, sans-serif",
        fontSize: width * 0.15,
        //=======
        fontWeight: 700,
        ...style,
      }}
    >
      {spec.text}
    </span>
  );
};

/**
 * Main stomp‑text composition.
 */
export const TextStomp: React.FC<TextStompProps> = ({ words, fps, audio }) => {
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", width, height }}>
      {/* synced text */}
      {words.map((w, i) => (
        <Word key={i} spec={w} fps={fps} />
      ))}

      {/* synced audio */}
      <Sequence
        from={audio.start}
        durationInFrames={Math.max(1, audio.end - audio.start)}
      >
        <Audio src={audio.url} />
      </Sequence>
    </AbsoluteFill>
  );
};
