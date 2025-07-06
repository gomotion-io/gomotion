import { computeFxStyle, FxSpec } from "@/gomotion-compiler/fx-engine";
import React from "react";
import {
  AbsoluteFill,
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
  fps?: number;
  /** Space between each word in px */
  gap?: number;
}

/**
 * Internal component that animates a single word.
 */
const Word: React.FC<{ spec: WordSpec; fps: number }> = ({ spec, fps }) => {
  const frame = useCurrentFrame();

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

  const { foregroundStyle, backgroundStyle } = computeFxStyle(fx, progress);

  return (
    <>
      {/* Text */}
      <span
        style={{
          display: "inline-block",
          whiteSpace: "pre",
          pointerEvents: "none",
          zIndex: 1,
          ...foregroundStyle,
        }}
      >
        {spec.text}
      </span>

      {/*  Background */}
      <AbsoluteFill
        style={{
          zIndex: 0,
          ...backgroundStyle,
        }}
      />
    </>
  );
};

/**
 * Main stomp‑text composition.
 */
export const TextStomp: React.FC<TextStompProps> = ({
  words,
  fps,
  gap = 32,
}) => {
  const { fps: projectFps, width, height } = useVideoConfig();
  const effectiveFps = fps ?? projectFps;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", width, height }}>
      {/* centre everything */}
      <AbsoluteFill
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Bebas Neue, Impact, sans-serif",
          fontSize: width * 0.15,
          fontWeight: 700,
        }}
      >
        {/* keep all words in one line / wrap if too long */}
        <div
          style={{
            display: "flex",
            gap,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {words.map((w, i) => (
            <Word key={i} spec={w} fps={effectiveFps} />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
