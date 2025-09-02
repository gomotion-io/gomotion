export const outputShape = {
  title: "Next.js Logo",
  meta: {
    width: 1920,
    height: 1080,
    fps: 60,
    durationInFrames: 600,
  },
  files: {
    "index.ts": `import { registerRoot } from "remotion";
import { RemotionRoot } from "./Root";
registerRoot(RemotionRoot);`,
    "Root.tsx": `import { Composition } from "remotion";
import { Main } from "./MyComp/Main";
export const RemotionRoot = () => {
  return (
    <Composition
      id="NextjsLogo"
      component={Main}
      durationInFrames={600}
      fps={60}
      width={1920}
      height={1080}
    />
  );
};`,
    "MyComp/Main.tsx": `import { fontFamily, loadFont } from "@remotion/google-fonts/Inter";
import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { NextLogo } from "./NextLogo";
import { Rings } from "./Rings";
import { TextFade } from "./TextFade";

loadFont("normal", {
  subsets: ["latin"],
  weights: ["400", "700"],
});

const container: React.CSSProperties = {
  backgroundColor: "white",
};

const logo: React.CSSProperties = {
  justifyContent: "center",
  alignItems: "center",
};

export const Main = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const title = "Next.js Logo";

  const transitionStart = 2 * fps;
  const transitionDuration = 1 * fps;

  const logoOut = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    durationInFrames: transitionDuration,
    delay: transitionStart,
  });

  const titleStyle: React.CSSProperties = useMemo(() => {
    return { fontFamily, fontSize: 70 };
  }, []);

  return (
    <AbsoluteFill style={container}>
      <Sequence durationInFrames={transitionStart + transitionDuration}>
        <Rings outProgress={logoOut}></Rings>
        <AbsoluteFill style={logo}>
          <NextLogo outProgress={logoOut}></NextLogo>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={transitionStart + transitionDuration / 2}>
        <TextFade>
          <h1 style={titleStyle}>{title}</h1>
        </TextFade>
      </Sequence>
    </AbsoluteFill>
  );
};`,
    "MyComp/NextLogo.tsx":
      'import { evolvePath } from "@remotion/paths";\nimport React, { useMemo } from "react";\nimport { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";\n\nconst mask: React.CSSProperties = {\n  maskType: "alpha",\n};\n\nconst nStroke =\n  "M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z";\n\nexport const NextLogo: React.FC<{\n  outProgress: number;\n}> = ({ outProgress }) => {\n  const { fps } = useVideoConfig();\n  const frame = useCurrentFrame();\n\n  const evolve1 = spring({\n    fps,\n    frame,\n    config: {\n      damping: 200,\n    },\n  });\n  const evolve2 = spring({\n    fps,\n    frame: frame - 15,\n    config: {\n      damping: 200,\n    },\n  });\n  const evolve3 = spring({\n    fps,\n    frame: frame - 30,\n    config: {\n      damping: 200,\n      mass: 3,\n    },\n    durationInFrames: 30,\n  });\n\n  const style: React.CSSProperties = useMemo(() => {\n    return {\n      height: 140,\n      borderRadius: 70,\n      scale: String(1 - outProgress),\n    };\n  }, [outProgress]);\n\n  const firstPath = `M 60.0568 54 v 71.97`;\n  const secondPath = `M 63.47956 56.17496 L 144.7535 161.1825`;\n  const thirdPath = `M 121 54 L 121 126`;\n\n  const evolution1 = evolvePath(evolve1, firstPath);\n  const evolution2 = evolvePath(evolve2, secondPath);\n  const evolution3 = evolvePath(\n    interpolate(evolve3, [0, 1], [0, 0.7]),\n    thirdPath,\n  );\n\n  return (\n    <svg style={style} fill="none" viewBox="0 0 180 180">\n      <mask height="180" id="mask" style={mask} width="180" x="0" y="0">\n        <circle cx="90" cy="90" fill="black" r="90"></circle>\n      </mask>\n      <mask id="n-mask" style={mask}>\n        <path d={nStroke} fill="black"></path>\n      </mask>\n      <g mask="url(#mask)">\n        <circle cx="90" cy="90" fill="black" r="90"></circle>\n        <g stroke="url(#gradient0)" mask="url(#n-mask)">\n          <path\n            strokeWidth="12.1136"\n            d={firstPath}\n            strokeDasharray={evolution1.strokeDasharray}\n            strokeDashoffset={evolution1.strokeDashoffset}\n          ></path>\n          <path\n            strokeWidth={12.1136}\n            d={secondPath}\n            strokeDasharray={evolution2.strokeDasharray}\n            strokeDashoffset={evolution2.strokeDashoffset}\n          ></path>\n        </g>\n        <path\n          stroke="url(#gradient1)"\n          d={thirdPath}\n          strokeDasharray={evolution3.strokeDasharray}\n          strokeDashoffset={evolution3.strokeDashoffset}\n          strokeWidth="12"\n        ></path>\n      </g>\n      <defs>\n        <linearGradient\n          gradientUnits="userSpaceOnUse"\n          id="gradient0"\n          x1="109"\n          x2="144.5"\n          y1="116.5"\n          y2="160.5"\n        >\n          <stop stopColor="white"></stop>\n          <stop offset="1" stopColor="white" stopOpacity="0"></stop>\n        </linearGradient>\n        <linearGradient\n          gradientUnits="userSpaceOnUse"\n          id="gradient1"\n          x1="121"\n          x2="120.799"\n          y1="54"\n          y2="106.875"\n        >\n          <stop stopColor="white"></stop>\n          <stop offset="1" stopColor="white" stopOpacity="0"></stop>\n        </linearGradient>\n      </defs>\n    </svg>\n  );\n};\n',
    "MyComp/Rings.tsx":
      'import React from "react";\nimport { AbsoluteFill, interpolateColors, useVideoConfig } from "remotion";\n\nconst RadialGradient: React.FC<{\n  radius: number;\n  color: string;\n}> = ({ radius, color }) => {\n  const height = radius * 2;\n  const width = radius * 2;\n\n  return (\n    <AbsoluteFill\n      style={\n        {\n          justifyContent: "center",\n          alignItems: "center",\n        }\n      }\n    >\n      <div\n        style={\n          {\n            height,\n            width,\n            borderRadius: "50%",\n            backgroundColor: color,\n            position: "absolute",\n            boxShadow: "0 0 100px rgba(0, 0, 0, 0.05)",\n          }\n        }\n      ></div>\n    </AbsoluteFill>\n  );\n};\n\nexport const Rings: React.FC<{\n  outProgress: number;\n}> = ({ outProgress }) => {\n  const scale = 1 / (1 - outProgress);\n  const { height } = useVideoConfig();\n\n  return (\n    <AbsoluteFill\n      style={\n        {\n          transform: `scale(${scale})`,\n        }\n      }\n    >\n      {new Array(5)\n        .fill(true)\n        .map((_, i) => {\n          return (\n            <RadialGradient\n              key={i}\n              radius={height * 0.3 * i}\n              color={interpolateColors(i, [0, 4], ["#fff", "#fff"])}\n            />\n          );\n        })\n        .reverse()}\n    </AbsoluteFill>\n  );\n};\n',
    "MyComp/TextFade.tsx":
      'import React, { useMemo } from "react";\nimport {\n  AbsoluteFill,\n  interpolate,\n  spring,\n  useCurrentFrame,\n  useVideoConfig,\n} from "remotion";\n\nconst outer: React.CSSProperties = {};\n\nexport const TextFade: React.FC<{\n  children: React.ReactNode;\n}> = ({ children }) => {\n  const { fps } = useVideoConfig();\n  const frame = useCurrentFrame();\n\n  const progress = spring({\n    fps,\n    frame,\n    config: {\n      damping: 200,\n    },\n    durationInFrames: 80,\n  });\n\n  const rightStop = interpolate(progress, [0, 1], [200, 0]);\n\n  const leftStop = Math.max(0, rightStop - 60);\n\n  const maskImage = `linear-gradient(-45deg, transparent ${leftStop}%, black ${rightStop}%)`;\n\n  const container: React.CSSProperties = useMemo(() => {\n    return {\n      justifyContent: "center",\n      alignItems: "center",\n    };\n  }, []);\n\n  const content: React.CSSProperties = useMemo(() => {\n    return {\n      maskImage,\n      WebkitMaskImage: maskImage,\n    };\n  }, [maskImage]);\n\n  return (\n    <AbsoluteFill style={outer}>\n      <AbsoluteFill style={container}>\n        <div style={content}>{children}</div>\n      </AbsoluteFill>\n    </AbsoluteFill>\n  );\n};\n',
  },
};
