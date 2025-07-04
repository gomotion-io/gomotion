import React from "react";
import {
  AbsoluteFill,
  interpolate,
  interpolateColors,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

/**
 * Per‑word animation FX specification.
 */
export interface FxSpec {
  /** Scale animation range [start, end]. */
  scale?: [number, number];
  /** Rotation animation range in degrees [start, end]. */
  rotation?: [number, number];
  /** Opacity animation range [start, end]. */
  opacity?: [number, number];
  /** Color animation */
  color?: [string, string];
  /** Background color animation */
  bgColor?: [string, string];
  /** Horizontal translation in px [start, end] */
  translateX?: [number, number];
  /** Vertical translation in px [start, end] */
  translateY?: [number, number];
}

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

  const progress = spring({
    frame: segRel,
    fps,
    config: { damping: 8, stiffness: 150, mass: 0.8 },
  });

  const fx = spec.fxs[segIndex];

  const scale = fx.scale ? interpolate(progress, [0, 1], fx.scale) : 1;
  const rotate = fx.rotation ? interpolate(progress, [0, 1], fx.rotation) : 0;
  const opacity = fx.opacity ? interpolate(progress, [0, 1], fx.opacity) : 1;
  const color = fx.color
    ? interpolateColors(progress, [0, 1], fx.color)
    : undefined;
  const bgColor = fx.bgColor
    ? interpolateColors(progress, [0, 1], fx.bgColor)
    : undefined;
  const translateX = fx.translateX
    ? interpolate(progress, [0, 1], fx.translateX)
    : 0;
  const translateY = fx.translateY
    ? interpolate(progress, [0, 1], fx.translateY)
    : 0;

  return (
    <>
      {/* Text */}
      <span
        style={{
          display: "inline-block",
          transform: `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
          opacity,
          whiteSpace: "pre",
          pointerEvents: "none",
          color,
          zIndex: 1,
        }}
      >
        {spec.text}
      </span>

      {/*  Background */}
      <AbsoluteFill
        style={{
          backgroundColor: bgColor,
          zIndex: 0,
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
