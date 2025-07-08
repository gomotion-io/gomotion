import type { AnimationSpec } from "./spec";

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
          startMs: 0,
          endMs: 700,
          fx: {
            scale: [0, 1],
            rotation: [-20, 0],
            opacity: [0, 1],
          },
        },
        {
          startMs: 1200,
          endMs: 1500,
          fx: {
            scale: [1, 1],
            rotation: [0, 0],
            opacity: [1, 0],
          },
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
          startMs: 1600,
          endMs: 1900,
          fx: {
            scale: [0, 1],
            rotation: [20, 0],
            opacity: [0, 1],
          },
        },
      ],
    },
    {
      id: "a1",
      type: "audio",
      startMs: 0,
      durationMs: 1500,
      payload: {
        url: "",
      },
    },
  ],
} satisfies AnimationSpec;
