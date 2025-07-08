import type { GomotionSpec } from "./spec";

export const samples = {
  meta: {
    name: "hello world sample",
    fps: 30,
    width: 1920,
    height: 1080,
  },
  layers: [
    {
      id: "t1",
      type: "text",
      startMs: 0,
      durationMs: 1500,
      payload: {
        text: "Dream big",
        animations: [
          {
            startMs: 0,
            endMs: 700,
            cssProperties: {
              width: 100,
              height: 100,
              backgroundColor: "#ff0000",
              opacity: 1,
              transform: "rotate(0deg)",
              fontFamily: "Bebas Neue, Impact, sans-serif",
              fontSize: 120,
            },
          },
          {
            startMs: 700,
            endMs: 1500,
            cssProperties: {
              width: 300,
              height: 150,
              backgroundColor: "#0000ff",
              opacity: 0.5,
              transform: "rotate(45deg)",
              fontFamily: "Bebas Neue, Impact, sans-serif",
              fontSize: 80,
            },
          },
        ],
      },
    },
  ],
} satisfies GomotionSpec;
