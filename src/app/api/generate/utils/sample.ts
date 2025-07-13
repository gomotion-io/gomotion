export const particleBurst = {
  title: "Hello world",
  component:
    'const React = window.React;\nconst R = window.Remotion;\nconst GeneratedComp = () => {\n  const frame = R.useCurrentFrame();\n  const { fps } = R.useVideoConfig();\n  const particles = Array.from({ length: 20 }, (_, i) => {\n    const angle = i / 20 * 2 * Math.PI;\n    const distance = R.spring({\n      frame: frame - 60,\n      fps,\n      config: { damping: 15, stiffness: 200 }\n    }) * 300;\n    const x = Math.cos(angle) * distance;\n    const y = Math.sin(angle) * distance;\n    const opacity = R.interpolate(frame, [60, 100, 200, 240], [0, 1, 1, 0], {\n      extrapolateRight: "clamp",\n      extrapolateLeft: "clamp"\n    });\n    return { x, y, opacity, angle: angle * (180 / Math.PI) };\n  });\n  const textScale = R.spring({\n    frame: frame - 30,\n    fps,\n    config: { damping: 12, stiffness: 300 }\n  });\n  return /* @__PURE__ */ React.createElement("div", { style: {\n    width: "100%",\n    height: "100%",\n    display: "flex",\n    alignItems: "center",\n    justifyContent: "center",\n    backgroundColor: "#0a0a0a",\n    fontFamily: "Arial, sans-serif",\n    position: "relative",\n    overflow: "hidden"\n  } }, particles.map((particle, index) => /* @__PURE__ */ React.createElement(\n    "div",\n    {\n      key: index,\n      style: {\n        position: "absolute",\n        width: 8,\n        height: 8,\n        borderRadius: "50%",\n        background: `hsl(${index * 18}, 80%, 60%)`,\n        transform: `translate(${particle.x}px, ${particle.y}px)`,\n        opacity: particle.opacity\n      }\n    }\n  )), /* @__PURE__ */ React.createElement("div", { style: {\n    textAlign: "center",\n    transform: `scale(${textScale})`,\n    zIndex: 10\n  } }, /* @__PURE__ */ React.createElement("h1", { style: {\n    fontSize: 72,\n    fontWeight: "bold",\n    color: "white",\n    margin: 0,\n    textShadow: "0 0 20px rgba(255,255,255,0.5)"\n  } }, "hello world")));\n};\nvar index_default = GeneratedComp;\nexport {\n  GeneratedComp,\n  index_default as default\n};\n',
  meta: {
    width: 1920,
    height: 1080,
    fps: 60,
    durationInFrames: 300,
  },
};
