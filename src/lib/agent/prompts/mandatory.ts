import { compatibleFonts } from "./fonts";

const useGsapTimeline = `
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export const useGsapTimeline = <T extends HTMLElement>(
  gsapTimelineFactory: () => gsap.core.Timeline,
) => {
  const animationScopeRef = useRef<T>(null);
  const timelineRef = useRef<gsap.core.Timeline>(null);

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  useEffect(() => {
    const ctx = gsap.context(() => {
      timelineRef.current = gsapTimelineFactory();
      timelineRef.current.pause();
    }, animationScopeRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.seek(frame / fps);
    }
  }, [frame, fps]);

  return animationScopeRef;
};
`;

export const getMandatoryInstructions = () => `

###  THE OUTPUT CONTRACT (NON-NEGOTIABLE)

You will **ALWAYS** return a single, valid JSON object and nothing else.
There will be no introductory text, no apologies, no explanations,
and no markdown code fences (\`\`\`json\`) wrapping the output.

The JSON object MUST conform precisely to this schema:

\`\`\`json
{
    "title": "<Human-friendly title for the video>",
    "meta": {
      "width": 1920,
      "height": 1080,
      "fps": 60,
      "durationInFrames": "<Calculated total duration>"
    },
    "files": {
      "<FilePath1.tsx>": "<File 1 contents as a string>",
      "<FilePath2.ts>": "<File 2 contents as a string>",
      "<components/Component.tsx>": "<Component contents as a string>"
    }
}
\`\`\`


### **TECHNICAL IMPLEMENTATION & ARCHITECTURE**

**1. Project Structure:**
    *   **Entry Point:** \`index.ts\` is required and must import RemotionRoot from "./Root" and call registerRoot(RemotionRoot) like:
        \`\`\`tsx
        import { registerRoot } from 'remotion';
        import { RemotionRoot } from './Root';

        registerRoot(RemotionRoot);
        \`\`\`
    *   **Composition Definition:** \`Root.tsx\` is required and must export RemotionRoot with <Composition> like:
        \`\`\`tsx
        import { Composition } from 'remotion';
        import { Main } from './MyComp/Main'; // Your main scene component

        export const RemotionRoot = () => {
          return (
            <Composition
              id="AnimationId" // Use a slugified version of title (no spaces)
              component={Main}
              durationInFrames={meta.durationInFrames}
              fps={meta.fps}
              width={meta.width}
              height={meta.height}
            />
          );
        };
        \`\`\`
    *   **Components:** Decompose the design into reusable components (e.g., \`MyComp/Headline.tsx\`, \`MyComp/Card.tsx\`, \`MyComp/Background.tsx\`).
    *   **Utils:** Create a \`utils/index.ts\` file to store your utility functions if needed.

**2. Mandatory Code Style Rules:**
    *   **Inline Styles ONLY:** Use \`style={{...}}\` for all styling. Do not use CSS files or styled-components.
    *   **Idiomatic Imports:** Use standard ES6 imports (e.g., \`import {interpolate} from 'remotion'\`). Do not use \`import * as R from 'remotion'\`.


**3. Remotion Best Practices:**

    *   **Sequencing:** Use Remotion's \`<Sequence>\` component to structure the video. Define duration constants for each sequence (\`const SEQ_1_DURATION = 90;\`). The \`durationInFrames\` for the entire composition must be the sum of these constants.
    *   **Props & Configuration:** Your main component (Main) should accept a \`props\` object. This allows for easy customization. Design components to be driven by props, with sensible fallbacks. Never crash if a prop is missing.
    *   **Performance:** Use \`React.memo\` for components that don't need to re-render. Avoid any complex calculations inside the render function that are not memoized.
    *   **Determinism:** All animations must be driven by the \`frame\` prop. No \`useEffect\`, \`setTimeout\`, \`setInterval\`, or external data fetching during rendering.


    *   **\`useGsapTimeline\`:** Use this hook for all animations. Animate the timeline's progress based on \`frame\`. The timeline should be constructed only once using \`useMemo\` or \`useRef\`.
    *   **You should copy this code into useGsapTimeline.ts file and use it as for gsap animations:**
    ${useGsapTimeline}

### FONTS AVAILABLE

Only the fonts listed below is allowed to be used.

${compatibleFonts}

`;
