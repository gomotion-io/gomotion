import gsap from "gsap";

// Import all GSAP plugins - these will need to be installed separately
// Note: Some of these are premium plugins that require a GreenSock membership
let CustomEase: any;
let DrawSVGPlugin: any;
let MorphSVGPlugin: any;
let Physics2DPlugin: any;
let ScrambleTextPlugin: any;
let SplitText: any;

// Try to import plugins if they're available
try {
  CustomEase = require("gsap/CustomEase").CustomEase;
} catch (e) {
  console.log("CustomEase plugin not available");
}

try {
  DrawSVGPlugin = require("gsap/DrawSVGPlugin").DrawSVGPlugin;
} catch (e) {
  console.log("DrawSVGPlugin not available");
}

try {
  MorphSVGPlugin = require("gsap/MorphSVGPlugin").MorphSVGPlugin;
} catch (e) {
  console.log("MorphSVGPlugin not available");
}

try {
  Physics2DPlugin = require("gsap/Physics2DPlugin").Physics2DPlugin;
} catch (e) {
  console.log("Physics2DPlugin not available");
}

try {
  ScrambleTextPlugin = require("gsap/ScrambleTextPlugin").ScrambleTextPlugin;
} catch (e) {
  console.log("ScrambleTextPlugin not available");
}

try {
  SplitText = require("gsap/SplitText").SplitText;
} catch (e) {
  console.log("SplitText not available");
}

// Register all available plugins with GSAP
export const registerGSAPPlugins = () => {
  const plugins = [
    CustomEase,
    DrawSVGPlugin,
    MorphSVGPlugin,
    Physics2DPlugin,
    ScrambleTextPlugin,
  ];

  plugins.forEach((plugin) => {
    if (plugin) {
      gsap.registerPlugin(plugin);
    }
  });
};

// Export all plugins and utilities for use in components
export {
  CustomEase,
  DrawSVGPlugin,
  MorphSVGPlugin,
  Physics2DPlugin,
  ScrambleTextPlugin,
  SplitText,
  gsap,
};

// Create a global GSAP object with all plugins
export const GSAPWithPlugins = {
  gsap,
  CustomEase,
  DrawSVGPlugin,
  MorphSVGPlugin,
  Physics2DPlugin,
  ScrambleTextPlugin,
  SplitText,
};
