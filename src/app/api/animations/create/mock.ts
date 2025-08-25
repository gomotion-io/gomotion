export const mock = {
  runId: "123",
  result: {
    title: "Hello World Animation",
    meta: {
      width: 1080,
      height: 1920,
      fps: 60,
      durationInFrames: 300,
    },
    files: {
      "index.ts":
        "import { registerRoot } from 'remotion';\nimport { RemotionRoot } from './Root';\n\nregisterRoot(RemotionRoot);\n",
      "Root.tsx":
        "import { Composition } from 'remotion';\nimport { Main } from './Main';\n\nexport const RemotionRoot = () => {\n  return (\n    <Composition\n      id=\"HelloWorldAnimation\"\n      component={Main}\n      durationInFrames={300}\n      fps={60}\n      width={1080}\n      height={1920}\n    />\n  );\n};\n",
      "useGsapTimeline.ts":
        'import gsap from "gsap";\nimport { useEffect, useRef } from "react";\nimport { useCurrentFrame, useVideoConfig } from "remotion";\n\nexport const useGsapTimeline = <T extends HTMLElement>(\n  gsapTimelineFactory: () => gsap.core.Timeline,\n) => {\n  const animationScopeRef = useRef<T>(null);\n  const timelineRef = useRef<gsap.core.Timeline>(null);\n\n  const frame = useCurrentFrame();\n  const { fps } = useVideoConfig();\n\n  useEffect(() => {\n    const ctx = gsap.context(() => {\n      timelineRef.current = gsapTimelineFactory();\n      timelineRef.current.pause();\n    }, animationScopeRef);\n    return () => ctx.revert();\n  }, []);\n\n  useEffect(() => {\n    if (timelineRef.current) {\n      timelineRef.current.seek(frame / fps);\n    }\n  }, [frame, fps]);\n\n  return animationScopeRef;\n};\n',
      "theme.ts":
        "export const theme = {\n  colors: {\n    background: '#F8F8F8',\n    foreground: '#1A1A1A',\n    primary: '#0A45E5',\n    accent: '#4B8BFF',\n  },\n  typography: {\n    headline: {\n      fontSize: 112,\n      fontWeight: 600,\n    },\n    subhead: {\n      fontSize: 48,\n      fontWeight: 400,\n    },\n  },\n  spacing: {\n    unit: 8,\n  },\n};\n",
      "Main.tsx":
        "import { AbsoluteFill } from 'remotion';\nimport { loadFont } from '@remotion/google-fonts/Inter';\nimport { useRef } from 'react';\nimport { useGsapTimeline } from './useGsapTimeline';\nimport { theme } from './theme';\nimport gsap from 'gsap';\n\nconst { fontFamily } = loadFont();\n\nexport const Main: React.FC = () => {\n  const textRef = useRef<HTMLDivElement>(null);\n  const shapeRef = useRef<HTMLDivElement>(null);\n\n  const animationScopeRef = useGsapTimeline(() => {\n    const tl = gsap.timeline();\n\n    // Shape entrance\n    tl.fromTo(\n      shapeRef.current,\n      { scale: 0.8, opacity: 0 },\n      { scale: 1, opacity: 0.1, duration: 0.8, ease: 'power3.out' }\n    );\n\n    // Text entrance with stagger\n    tl.fromTo(\n      textRef.current,\n      { y: 40, opacity: 0, scale: 0.98 },\n      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' },\n      '-=0.4' // Overlap with shape\n    );\n\n    // Hold and then exit\n    tl.to(textRef.current, { opacity: 0, y: -40, duration: 0.6, ease: 'power2.in' }, '+=2');\n    tl.to(shapeRef.current, { opacity: 0, scale: 1.2, duration: 0.6, ease: 'power2.in' }, '-=0.6');\n\n    return tl;\n  });\n\n  return (\n    <AbsoluteFill\n      style={{\n        backgroundColor: theme.colors.background,\n        display: 'flex',\n        justifyContent: 'center',\n        alignItems: 'center',\n        fontFamily,\n      }}\n    >\n      <div ref={animationScopeRef} style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>\n        {/* Subtle glassmorphic circle for depth */}\n        <div\n          ref={shapeRef}\n          style={{\n            position: 'absolute',\n            width: 400,\n            height: 400,\n            borderRadius: '50%',\n            backgroundColor: 'rgba(255, 255, 255, 0.1)',\n            backdropFilter: 'blur(20px)',\n            boxShadow: 'inset 0px 4px 10px rgba(0,0,0,0.1)',\n          }}\n        />\n        {/* Text */}\n        <div\n          ref={textRef}\n          style={{\n            color: theme.colors.foreground,\n            fontSize: theme.typography.headline.fontSize,\n            fontWeight: theme.typography.headline.fontWeight,\n            textAlign: 'center',\n            padding: theme.spacing.unit * 4,\n          }}\n        >\n          Hello World\n        </div>\n      </div>\n    </AbsoluteFill>\n  );\n};\n",
    },
  },
};
