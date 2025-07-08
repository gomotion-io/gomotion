import {
  FadeIn,
  FadeOut,
  ScaleBounce,
  Wipe,
} from "@/gomotion-compiler-v2/animations/animations";

export const EFFECT_MAP = {
  "fade-in": FadeIn,
  "fade-out": FadeOut,
  "scale-bounce": ScaleBounce,
  wipe: Wipe,
} as const;
