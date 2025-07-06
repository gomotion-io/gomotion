import type { CSSProperties } from "react";
import { interpolate, interpolateColors } from "remotion";

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
  /** Depth field translation in px [start, end] */
  translateZ?: [number, number];
  /** Shear on the X axis in degrees [start, end] */
  skewX?: [number, number];
  /** Shear on the Y axis in degrees [start, end] */
  skewY?: [number, number];
  /** 3-D X rotations (deg)  [start, end] */
  rotateX?: [number, number];
  /** 3-D Y rotations (deg)  [start, end] */
  rotateY?: [number, number];
  /** Optional per-FX perspective in px (fallback to default) */
  perspective?: number;
}

export interface ComputeFxResult {
  /** Styles to apply to the main element (e.g. text span, image, container etc.). */
  style: CSSProperties;
}

/**
 * Compute CSS transform / color / opacity styles for a given FxSpec and
 * animation progress value.
 *
 * `progress` MUST be in the range 0 – 1 (e.g. value returned by Remotion
 * `spring` or `interpolate` helpers).
 */
export const computeFxStyle = (
  fx: FxSpec,
  progress: number
): ComputeFxResult => {
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
  const translateZ = fx.translateZ
    ? interpolate(progress, [0, 1], fx.translateZ)
    : 0;
  const skewX = fx.skewX ? interpolate(progress, [0, 1], fx.skewX) : 0;
  const skewY = fx.skewY ? interpolate(progress, [0, 1], fx.skewY) : 0;
  const rotX = fx.rotateX ? interpolate(progress, [0, 1], fx.rotateX) : 0;
  const rotY = fx.rotateY ? interpolate(progress, [0, 1], fx.rotateY) : 0;
  const perspective = fx.perspective ?? 800;

  const style: CSSProperties = {
    backgroundColor: bgColor,
    transform: `perspective(${perspective}px) translateZ(${translateZ}px) translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${rotate}deg) rotateX(${rotX}deg) rotateY(${rotY}deg) skew(${skewX}deg, ${skewY}deg)`,
    transformStyle: "preserve-3d",
    opacity,
    color,
  };

  return { style };
};
