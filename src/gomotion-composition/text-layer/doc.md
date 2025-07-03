# TextStomp Component Documentation

`TextStomp` is a reusable React component (built with [Remotion](https://www.remotion.dev/)) that lets you animate a sequence of words ("stomps") with highly-customisable per-word effects. Typical use-cases include dynamic title cards, lyric videos, and kinetic typography.

---

## Table of contents

1. [High-level overview](#high-level-overview)
2. [Installation & setup](#installation--setup)
3. [API reference](#api-reference)
   - [`FxSpec`](#fxspec)
   - [`WordSpec`](#wordspec)
   - [`TextStompProps`](#textstompprops)
4. [Basic example](#basic-example)
5. [Advanced example – multi-segment FX](#advanced-example--multi-segment-fx)
6. [Complex example – overlapping words](#complex-example--overlapping-words)
7. [Troubleshooting](#troubleshooting)

---

## High-level overview

At its core, `TextStomp` renders **one `<span>` per word** and applies time-based transformations (scale, rotation, opacity, colour, background colour) driven by Remotion's [`spring`](https://www.remotion.dev/docs/spring) and [`interpolate`](https://www.remotion.dev/docs/interpolate) helpers.

Each word can be visible for an arbitrary frame window (`inFrame` → `outFrame`) and may contain **multiple animation segments** (`fxs`). Segments inside a word are chained automatically: a word with two `fxs` and a duration of `120` frames will dedicate `60` frames to the first segment and `60` to the second, for example.

![diagram](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...) <!-- placeholder, GitHub will ignore -->

---

## Installation & setup

```bash
# Add Remotion if you haven't already
npm install remotion react react-dom

# No extra dependencies are required for TextStomp itself—
# simply copy `src/TextStomp.tsx` into your Remotion project.
```

Make sure your Remotion bundle has access to the font declared inside the component (`Bebas Neue`). You can swap this for any font-family in the component's style block if needed.

---

## API reference

### `FxSpec`

Defines how a single segment behaves.

| Field      | Type               | Description                                      |
| ---------- | ------------------ | ------------------------------------------------ |
| `scale`    | `[number, number]` | Start & end scale multiplier (1 = 100 %).        |
| `rotation` | `[number, number]` | Start & end rotation in **degrees**.             |
| `opacity`  | `[number, number]` | Start & end opacity (0-1).                       |
| `color`    | `[string, string]` | From → to text colour (CSS colour string).       |
| `bgColor`  | `[string, string]` | From → to background colour (CSS colour string). |

### `WordSpec`

Represents one animated word or phrase.

| Field      | Type       | Description                                          |
| ---------- | ---------- | ---------------------------------------------------- |
| `text`     | `string`   | The literal text to render.                          |
| `inFrame`  | `number`   | **Inclusive** starting frame index.                  |
| `outFrame` | `number`   | **Exclusive** ending frame index.                    |
| `fxs`      | `FxSpec[]` | One or more segments applied in chronological order. |

### `TextStompProps`

Props accepted by the `TextStomp` component itself.

| Prop    | Type         | Default                | Description                                           |
| ------- | ------------ | ---------------------- | ----------------------------------------------------- |
| `words` | `WordSpec[]` | –                      | Ordered list of words to animate.                     |
| `fps`   | `number`     | Remotion project `fps` | Overrides the project's FPS for finer timing control. |
| `gap`   | `number`     | `32`                   | Horizontal spacing between words (px).                |

---

## Basic example

The snippet below shows how to drop `TextStomp` into a typical Remotion `Composition`.

```tsx title="remotion/Root.tsx"
import { Composition } from "remotion";
import { TextStomp } from "./TextStomp";

export const RemotionRoot = () => (
  <>
    <Composition
      id="StompIntro"
      component={TextStomp}
      durationInFrames={180}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{
        gap: 40,
        words: [
          {
            text: "HELLO",
            inFrame: 0,
            outFrame: 60,
            fxs: [
              {
                scale: [0.5, 1],
                rotation: [-30, 0],
                opacity: [0, 1],
                color: ["#fff", "#fff"],
                bgColor: ["#ff0066", "#ff0066"],
              },
            ],
          },
          {
            text: "WORLD",
            inFrame: 60,
            outFrame: 120,
            fxs: [
              {
                scale: [0.5, 1],
                rotation: [30, 0],
                opacity: [0, 1],
                color: ["#fff", "#fff"],
                bgColor: ["#0066ff", "#0066ff"],
              },
            ],
          },
        ],
      }}
    />
  </>
);
```

### What you should see

1. Frame **0-59** – "HELLO" scales/rotates into view on a pink background.
2. Frame **60-119** – "WORLD" repeats the animation on a blue background.

---

## Advanced example – multi-segment FX

Below we define a single word that changes colour halfway through its lifespan by providing **two** `FxSpec` entries. Because the word lives for `90` frames, each segment will last `45` frames.

```tsx
const colourfulWord: WordSpec = {
  text: "DYNAMICS",
  inFrame: 0,
  outFrame: 90,
  fxs: [
    // Segment 1 (frame 0-44)
    {
      scale: [0.2, 1],
      rotation: [-90, 0],
      opacity: [0, 1],
      color: ["#ffe066", "#ffffff"],
      bgColor: ["#000000", "#000000"],
    },
    // Segment 2 (frame 45-89)
    {
      scale: [1, 1],
      rotation: [0, 0],
      opacity: [1, 1],
      color: ["#ffffff", "#ff5e5e"],
      bgColor: ["#000000", "#000000"],
    },
  ],
};
```

You can combine as many segments as you wish; the component will time-slice them evenly.

---

## Complex example – overlapping words

The configuration below mirrors the interactive demo found in `src/App.tsx`. It illustrates a **three-word sequence** with overlapping timelines and multi-segment animations.

```tsx title="examples/complex.tsx"
const demoSpec: TextStompProps = {
  fps: 30,
  words: [
    {
      text: "HELLO",
      inFrame: 0,
      outFrame: 60,
      fxs: [
        // Segment A (0-29)
        {
          scale: [0, 1],
          rotation: [-20, 0],
          opacity: [0, 1],
          color: ["#ffffff", "#ffffff"],
          bgColor: ["#000000", "#000000"],
        },
        // Segment B (30-59)
        {
          scale: [1, 1],
          rotation: [0, 0],
          opacity: [1, 1],
          color: ["#000000", "#000000"],
          bgColor: ["#fcd34d", "#fcd34d"],
        },
      ],
    },
    {
      text: "WORLD",
      inFrame: 30,
      outFrame: 60,
      fxs: [
        {
          scale: [0, 1],
          rotation: [20, 0],
          opacity: [0, 1],
          color: ["#ffffff", "#fcd34d"],
          bgColor: ["#000000", "#000000"],
        },
        {
          scale: [1, 1],
          rotation: [0, 0],
          opacity: [1, 1],
          color: ["#000000", "#000000"],
          bgColor: ["#fcd34d", "#fcd34d"],
        },
      ],
    },
    {
      text: "PEOPLE",
      inFrame: 60,
      outFrame: 90,
      fxs: [
        {
          scale: [0.3, 1],
          rotation: [0, 30],
          opacity: [0, 1],
          color: ["#ffffff", "#ffffff"],
          bgColor: ["#000000", "#000000"],
        },
      ],
    },
  ],
};

<Composition
  id="StompComplex"
  component={TextStomp}
  durationInFrames={120}
  fps={30}
  width={1920}
  height={1080}
  defaultProps={demoSpec}
/>;
```

### Timeline breakdown

- **Frames 0-29** – "HELLO" springs into view.
- **Frames 30-59** – "WORLD" begins while "HELLO" switches to its second colour scheme, creating a two-word overlap.
- **Frames 60-89** – "PEOPLE" replaces both earlier words with a sweeping rotation.

Experiment by changing the `inFrame`/`outFrame` values or adding extra segments to see how overlapping animations interact.

---

## Troubleshooting

| Symptom                 | Likely cause                                                       | Fix                                                               |
| ----------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------- |
| Component is invisible  | `inFrame` / `outFrame` do not intersect the current video timeline | Confirm the frame range and the composition's `durationInFrames`. |
| Text has incorrect font | Font not loaded in Remotion preview / render env                   | Import or host the font and reference it via CSS or Google Fonts. |
| Jerky animation         | Extremely low FPS or very stiff spring config                      | Pass a custom `fps` prop or tweak the spring in `TextStomp.tsx`.  |

---

## License

MIT © Your Name – feel free to copy & adapt.
