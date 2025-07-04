import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Watermark = () => {
  const { width } = useVideoConfig();
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 60], [0, 0.5], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        fontFamily: "Bebas Neue, Impact, sans-serif",
        fontSize: width * 0.025,
        fontWeight: 500,
        padding: 40,
        color: "#E5E9E0",
      }}
    >
      <Img
        src="https://legendary.b-cdn.net/watermark.svg"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.1,
        }}
      />
      <div style={{ display: "flex", gap: 25, opacity }}>
        <div>GOMOTION</div>
        <Img src="https://legendary.b-cdn.net/watermark.svg" />
      </div>
    </AbsoluteFill>
  );
};
