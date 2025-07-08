import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { FC, ReactNode } from "react";

interface EffectProps {
  progress: number; // 0-1 relative to effect’s span
  children: ReactNode;
}

/* ---------- Individual effects ---------- */

export const FadeIn: FC<EffectProps> = ({ progress, children }) => (
  <div style={{ opacity: progress }}>{children}</div>
);

export const FadeOut: FC<EffectProps> = ({ progress, children }) => (
  <div style={{ opacity: 1 - progress }}>{children}</div>
);

export const ScaleBounce: FC<EffectProps> = ({ children }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  // Map effect to spring(…)
  const scale = spring({
    fps,
    frame,
    config: { damping: 7, mass: 0.7 },
    from: 0,
    to: 1,
  });
  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale})`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export const Wipe: FC<
  EffectProps & { direction: "left" | "right" | "top" | "bottom" }
> = ({ progress, direction, children }) => {
  const translate = interpolate(progress, [0, 1], [100, 0]);
  const axis = direction === "left" || direction === "right" ? "X" : "Y";
  const sign = direction === "left" || direction === "top" ? -1 : 1;
  return (
    <AbsoluteFill
      style={{
        transform: `translate${axis}(${sign * translate}%)`,
        overflow: "hidden",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
