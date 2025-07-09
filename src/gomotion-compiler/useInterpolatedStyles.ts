import { CSSProperties, useMemo } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { interpolateStyles } from "@remotion/animation-utils";
import { msToFrame } from "@/gomotion-compiler/utils";

export interface AnimationKeyframe {
  startMs: number;
  endMs: number;
  cssProperties: CSSProperties;
}

export function useInterpolatedStyles(
  animations: AnimationKeyframe[],
  fpsOverride?: number,
): CSSProperties {
  const frame = useCurrentFrame();
  const { fps: videoFps } = useVideoConfig();
  const fps = fpsOverride ?? videoFps;

  /**
   * Compute the style snapshot for the current frame.
   * - If "before" the timeline, freeze the first keyframe.
   * - If between two keyframes, interpolate.
   * - If "after" the timeline, freeze the last keyframe.
   */
  return useMemo(() => {
    if (!animations?.length) return {};

    // Before first keyframe → take its style verbatim
    if (frame <= msToFrame(animations[0].startMs, fps)) {
      return animations[0].cssProperties;
    }

    // Walk segments (current → next)
    for (let i = 0; i < animations.length - 1; i++) {
      const current = animations[i];
      const next = animations[i + 1];
      const segStart = msToFrame(current.startMs, fps);
      const segEnd = msToFrame(current.endMs, fps);

      if (frame >= segStart && frame <= segEnd) {
        return interpolateStyles(
          frame,
          [segStart, segEnd],
          [current.cssProperties, next.cssProperties],
        );
      }
    }

    // After last segment → keep final style
    return animations[animations.length - 1].cssProperties;
  }, [animations, frame, fps]);
}

export default useInterpolatedStyles;
