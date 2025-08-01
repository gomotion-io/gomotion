# GSAP Plugin Usage Guide

## Overview

This project now supports all GSAP plugins including premium plugins like CustomEase, DrawSVGPlugin, MorphSVGPlugin, Physics2DPlugin, ScrambleTextPlugin, and SplitText.

## Installation

### For Premium Plugins

The premium plugins (DrawSVGPlugin, MorphSVGPlugin, Physics2DPlugin, SplitText) require a GreenSock membership.

1. Purchase a GreenSock membership at https://greensock.com/club/
2. Download the plugins from your GreenSock account
3. Install them using npm with your authentication token:

```bash
npm install gsap@npm:@gsap/business
```

### For Free Plugins

Some plugins like ScrambleTextPlugin are available in the standard GSAP package:

```bash
npm install gsap
```

## Usage in Dynamic Components

All GSAP plugins are automatically available in your dynamic components. You don't need to import them:

```javascript
// In your dynamic component code
const GeneratedComponent = () => {
  const containerRef = useGsapTimeline(() => {
    const tl = gsap.timeline();

    // Using CustomEase
    if (CustomEase) {
      CustomEase.create("myEase", "0.17, 0.67, 0.83, 0.67");
      tl.to(".element", { x: 100, ease: "myEase" });
    }

    // Using ScrambleTextPlugin
    if (ScrambleTextPlugin) {
      tl.to(".text", {
        duration: 2,
        scrambleText: {
          text: "NEW TEXT",
          chars: "0123456789",
          revealDelay: 0.5,
          speed: 0.3,
        },
      });
    }

    // Using DrawSVGPlugin (premium)
    if (DrawSVGPlugin) {
      tl.from(".svg-path", {
        drawSVG: "0%",
        duration: 2,
        ease: "power2.inOut",
      });
    }

    // Using MorphSVGPlugin (premium)
    if (MorphSVGPlugin) {
      tl.to("#shape1", {
        morphSVG: "#shape2",
        duration: 2,
      });
    }

    // Using Physics2DPlugin (premium)
    if (Physics2DPlugin) {
      tl.to(".ball", {
        duration: 2,
        physics2D: {
          velocity: 300,
          angle: -60,
          gravity: 400,
        },
      });
    }

    // Using SplitText (premium)
    if (SplitText) {
      const split = new SplitText(".text", { type: "words,chars" });
      tl.from(split.chars, {
        opacity: 0,
        y: 100,
        rotateX: -90,
        stagger: 0.02,
      });
    }

    return tl;
  });

  return <div ref={containerRef}>{/* Your animated content */}</div>;
};
```

## Available Plugins

### Free Plugins

- **CustomEase**: Create custom easing curves
- **ScrambleTextPlugin**: Scramble text effect

### Premium Plugins (Require GreenSock Membership)

- **DrawSVGPlugin**: Animate SVG stroke drawing
- **MorphSVGPlugin**: Morph between SVG shapes
- **Physics2DPlugin**: Apply physics to animations
- **SplitText**: Split text into words/chars for animation

## Plugin Registration

Plugins are automatically registered when you use `useGsapTimeline` or `useComponent` hooks. The registration happens in:

- `/src/lib/gsap-plugins.ts` - Central plugin registry
- `/src/lib/use-component.ts` - Makes plugins available globally for dynamic components
- `/src/lib/use-gsap-timeline.ts` - Registers plugins for timeline usage

## Troubleshooting

If a plugin is not working:

1. Check the console for "Plugin not available" messages
2. Ensure the plugin is properly installed via npm
3. For premium plugins, verify your GreenSock membership is active
4. Check that the plugin is being used correctly with conditional checks (e.g., `if (DrawSVGPlugin) { ... }`)
