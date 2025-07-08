import type { AnimationSpec } from "./spec";

export const samples = {
  meta: {
    version: "1.0",
    fps: 30,
    width: 1920,
    height: 1080,
    theme: {
      primary: "#ffe600",
      secondary: "#ffffff",
      background: "#000000",
    },
  },
  layers: [
    {
      id: "t1",
      type: "text",
      startMs: 0,
      durationMs: 1500,
      payload: {
        text: "Dream big",
        splitStrategy: "by-word",
        style: {
          fontFamily: "Montserrat",
          fontSize: 140,
          fontWeight: 800,
          color: "#ffffff",
        },
        layout: {
          x: 50,
          y: 40,
          align: "center",
        },
      },
      animations: [
        {
          name: "scale-bounce",
          startMs: 0,
          endMs: 700,
        },
        {
          name: "fade-out",
          startMs: 1200,
          endMs: 1500,
        },
      ],
    },
    {
      id: "t2",
      type: "text",
      startMs: 1600,
      durationMs: 1400,
      payload: {
        text: "Start small",
        splitStrategy: "by-word",
        style: {
          fontFamily: "Montserrat",
          fontSize: 120,
          fontWeight: 800,
          color: "#ffe600",
        },
        layout: {
          x: 50,
          y: 30,
          align: "center",
        },
      },
      animations: [
        {
          name: "wipe",
          params: {
            direction: "left",
          },
          startMs: 1600,
          endMs: 1900,
        },
      ],
    },
  ],
} satisfies AnimationSpec;
