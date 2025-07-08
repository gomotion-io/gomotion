import { useCurrentFrame } from "remotion";
import type { LayerSpec, TextPayload } from "@/gomotion-compiler-v2/spec";
import { CSSProperties, FC, ReactNode } from "react";
import { EFFECT_MAP } from "@/gomotion-compiler-v2/animations";
import { clamp, ms2f } from "@/gomotion-compiler-v2/utils";

interface TextLayerProps {
  layer: LayerSpec & { type: "text" };
  fps: number;
}

export const TextLayer: FC<TextLayerProps> = ({ layer, fps }) => {
  const payload = layer.payload as TextPayload;
  const frame = useCurrentFrame() - ms2f(layer.startMs, fps); // local frame
  const total = ms2f(layer.durationMs, fps);

  // Build array of wrapper functions (one per animation in spec)
  let node: ReactNode = renderText(payload, frame, layer);

  layer.animations.forEach((anim) => {
    const start = ms2f(anim.startMs ?? 0, fps);
    const end = anim.endMs != null ? ms2f(anim.endMs, fps) : total;
    const length = end - start;

    // Range-aware progress
    const p = clamp((frame - start) / Math.max(length, 1));

    const Comp = EFFECT_MAP[anim.name as keyof typeof EFFECT_MAP];
    if (!Comp) return;

    node = (
      <Comp progress={p} {...(anim.params as any)}>
        {node}
      </Comp>
    );
  });

  return node;
};

/* ---------- helpers ---------- */

function renderText(payload: TextPayload, frame: number, layer: LayerSpec) {
  const { text, splitStrategy = "all", style, layout } = payload;
  const words = text.split(/\s/);

  if (
    layer.animations.some((a) => a.name === "word-by-word") &&
    splitStrategy !== "all"
  ) {
    // simple reveal one every 6 frames (~0.2s @ 30 fps)
    const revealPer = 6;
    const visibleCount = Math.floor(frame / revealPer) + 1;
    return (
      <div style={textCss(style, layout)}>
        {words.map((w, i) => (
          <span key={i} style={{ opacity: i < visibleCount ? 1 : 0 }}>
            {w}{" "}
          </span>
        ))}
      </div>
    );
  }

  return <div style={textCss(style, layout)}>{text}</div>;
}

function textCss(
  style: TextPayload["style"],
  layout: TextPayload["layout"],
): CSSProperties {
  return {
    position: "absolute",
    left: `${layout.x}%`,
    top: `${layout.y}%`,
    transform: "translate(-50%,-50%)",
    fontFamily: style.fontFamily ?? "sans-serif",
    fontSize: style.fontSize,
    fontWeight: style.fontWeight,
    color: style.color,
    textAlign: layout.align ?? "center",
    WebkitTextStroke: style.outline
      ? `${style.outline.width}px ${style.outline.color}`
      : undefined,
    whiteSpace: "pre-wrap",
    border: "1px solid red", // only for debugging
  };
}
