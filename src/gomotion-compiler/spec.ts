export interface GomotionSpec {
  meta: {
    name: string;
    fps: number;
    width: number;
    height: number;
  };
  layers: LayerSpec[];
}

export interface LayerSpec {
  id: string;
  type: "text" | "image" | "video" | "shape" | "audio";
  startMs: number;
  durationMs: number;
  payload:
    | TextPayload
    | ImagePayload
    | VideoPayload
    | ShapePayload
    | AudioPayload;
}

export interface Animation {
  startMs: number;
  endMs: number;
  cssProperties: Record<string, unknown>;
}

/**
 * TextPayload
 * ------------—
 * A single text or phrase element that the compiler will render.
 */
export interface TextPayload {
  /** Raw text (may include <br/> or rich HTML tags if your renderer supports it) */
  text: string;
  /** animation */
  animations: Animation[];
}

/**
 * ImagePayload
 * ------------—
 */
export type ImagePayload = {
  url: string;
};

/**
 * VideoPayload
 * ------------—
 */
export type VideoPayload = {
  url: string;
};

/**
 * ShapePayload
 * ------------—
 */
export type ShapePayload = {
  name: string;
};

/**
 * AudioPayload
 * ------------—
 */
export type AudioPayload = {
  url: string;
};
