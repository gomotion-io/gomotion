import { FxSpec } from "@/gomotion-compiler-v2/animations/fx-engine";

export interface AnimationSpec {
  meta: {
    version: string;
    fps: number;
    width: number;
    height: number;
    theme?: ThemeSpec;
  };
  layers: LayerSpec[];
}

export interface ThemeSpec {
  primary: string;
  secondary: string;
  background: string;
}

export interface LayerSpec {
  id: string;
  type: "text" | "image" | "video" | "shape";
  startMs: number;
  durationMs: number;
  payload: TextPayload | ImagePayload | VideoPayload | ShapePayload;
  animations: AnimationDef[];
}

export interface AnimationDef {
  fx: FxSpec;
  startMs?: number;
  endMs?: number;
  params?: Record<string, unknown>;
}

/**
 * TextPayload
 * ------------—
 * A single text element (layer payload) that the compiler will render.
 * Coordinates (`x`,`y`) are expressed in *percent* of the canvas,
 * so (50, 50) is dead-centre.  Colors expect HEX (or any valid CSS value).
 */
export interface TextPayload {
  /** Raw text (may include <br/> or rich HTML tags if your renderer supports it) */
  text: string;

  /** How Remotion should break the text for per-word / per-char animations */
  splitStrategy?: "by-word" | "by-char" | "all";

  /** Visual appearance */
  style: {
    fontFamily?: string; // e.g. "Montserrat"
    fontSize?: number; // px
    fontWeight?: number; // 100-900
    color?: string; // "#ffffff", "rgba(…)", etc.
    outline?: {
      color: string; // stroke color
      width: number; // px
    };
  };

  /** Positioning on the canvas */
  layout: {
    /** Horizontal anchor point (0-100 %) */
    x: number;
    /** Vertical anchor point (0-100 %) */
    y: number;
    /** Text-align relative to the anchor */
    align?: "left" | "center" | "right";
  };
}

/**
 * ImagePayload
 * ------------—
 */

type ImagePayload = {
  url: string;
};

/**
 * VideoPayload
 * ------------—
 */
type VideoPayload = {
  url: string;
};

/**
 * ShapePayload
 * ------------—
 */
type ShapePayload = {
  name: string;
};
