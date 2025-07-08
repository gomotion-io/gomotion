import { FC, useMemo } from "react";
import { useCurrentFrame } from "remotion";
import {
  interpolateStyles,
  makeTransform,
  rotate,
} from "@remotion/animation-utils";
import { LayerSpec, TextPayload } from "@/gomotion-compiler/spec";
import { ms2f } from "@/gomotion-compiler/utils";

interface TextLayerProps {
  layer: LayerSpec & { type: "text" };
  fps: number;
}

export const TextLayer: FC<TextLayerProps> = ({ layer, fps }) => {
  const frame = useCurrentFrame();
  const { text, animations } = layer.payload as TextPayload;

  /**
   * Build the key-frame arrays once.
   * Each boundary (start & end) becomes a point in the interpolation range.
   */
  const { inputRange, outputRange } = useMemo(() => {
    const frames: number[] = [];
    const styles: Record<string, any>[] = [];

    // push the very first keyframe
    frames.push(ms2f(animations[0].startMs, fps));
    styles.push(normalize(animations[0].cssProperties));

    // push every segment’s *end* - that gives us seamless chaining
    animations.forEach((a) => {
      frames.push(ms2f(a.endMs, fps));
      styles.push(normalize(a.cssProperties));
    });

    return { inputRange: frames, outputRange: styles };
  }, [animations, fps]);

  // Let Remotion figure out the in-between styles
  const animatedStyles = interpolateStyles(frame, inputRange, outputRange, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return <span style={animatedStyles}>{text}</span>;
};

/**
 * Tiny helper – here you can upgrade raw strings like "rotate(45deg)"
 * to proper numeric transforms (optional but gives smoother motion).
 */
function normalize(raw: Record<string, any>) {
  if (typeof raw.transform === "string") {
    const match = /rotate\(([-\d.]+)deg\)/.exec(raw.transform);
    if (match) {
      return {
        ...raw,
        transform: makeTransform([rotate(Number(match[1]))]),
      };
    }
  }
  return raw;
}
