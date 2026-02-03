import * as ReactThreeDrei from "@react-three/drei";
import * as ReactThreeFiber from "@react-three/fiber";
import * as AnimationUtils from "@remotion/animation-utils";
import * as Fonts from "@remotion/fonts";
import * as Gif from "@remotion/gif";
import * as LayoutUtils from "@remotion/layout-utils";
import * as Noise from "@remotion/noise";
import * as RemotionPaths from "@remotion/paths";
import * as Shapes from "@remotion/shapes";
import * as ThreeCanvas from "@remotion/three";
import * as Transitions from "@remotion/transitions";
import * as ZodTypes from "@remotion/zod-types";
import * as gsap from "gsap";
import * as CustomEase from "gsap/CustomEase";
import * as DrawSVGPlugin from "gsap/DrawSVGPlugin";
import * as MorphSVGPlugin from "gsap/MorphSVGPlugin";
import * as Physics2DPlugin from "gsap/Physics2DPlugin";
import * as ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import * as SplitText from "gsap/SplitText";
import * as TextPlugin from "gsap/TextPlugin";
import React from "react";
import * as JsxRuntime from "react/jsx-runtime";
import * as Remotion from "remotion";
import * as Three from "three";
import * as Zod from "zod";
import { fonts } from "./fonts";

export const externalModules: Record<string, unknown> = {
  // React
  react: React,
  zod: Zod,
  "react/jsx-runtime": JsxRuntime,

  // GSAP
  gsap: gsap,
  "gsap/CustomEase": CustomEase,
  "gsap/ScrambleTextPlugin": ScrambleTextPlugin,
  "gsap/DrawSVGPlugin": DrawSVGPlugin,
  "gsap/MorphSVGPlugin": MorphSVGPlugin,
  "gsap/Physics2DPlugin": Physics2DPlugin,
  "gsap/SplitText": SplitText,
  "gsap/TextPlugin": TextPlugin,

  // Three.js
  three: Three,
  "@react-three/fiber": ReactThreeFiber,
  "@react-three/drei": ReactThreeDrei,

  // Remotion
  remotion: Remotion,
  "@remotion/paths": RemotionPaths,
  "@remotion/three": ThreeCanvas,
  "@remotion/noise": Noise,
  "@remotion/shapes": Shapes,
  "@remotion/animation-utils": AnimationUtils,
  "@remotion/transitions": Transitions,
  "@remotion/gif": Gif,
  "@remotion/layout-utils": LayoutUtils,
  "@remotion/zod-types": ZodTypes,

  // Remotion Fonts
  "@remotion/fonts": Fonts,
  ...fonts,
};
