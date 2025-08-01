import { initialize, transform } from "esbuild-wasm";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import GoogleFontLoader from "react-google-font-loader";
import * as R from "remotion";
import { GSAPWithPlugins, registerGSAPPlugins } from "./gsap-plugins";

let esbuildInitialized: Promise<void> | null = null;

const createComponent = async (code: string) => {
  if (!esbuildInitialized) {
    esbuildInitialized = initialize({
      wasmURL: "https://unpkg.com/esbuild-wasm@0.25.8/esbuild.wasm",
      worker: true,
    });
  }

  await esbuildInitialized;

  const result = await transform(code, {
    loader: "tsx",
    format: "esm",
    jsx: "transform",
    sourcefile: "index.tsx",
  });

  // Remove React, Remotion, and GSAP imports since we provide them globally at runtime.
  const strippedImports = result.code
    // Strip any kind of React import (default, namespace, named)
    .replace(/import\s+[^;]*from\s+["']react["'];?\n?/g, "")
    // Strip any React DOM import just in case
    .replace(/import\s+[^;]*from\s+["']react-dom[^"']*["'];?\n?/g, "")
    // Strip any Remotion import (including sub-paths)
    .replace(/import\s+[^;]*from\s+["']remotion[^"']*["'];?\n?/g, "")
    // Strip GSAP and plugin imports
    .replace(/import\s+[^;]*from\s+["']gsap[^"']*["'];?\n?/g, "")
    // Strip Google Font Loader import
    .replace(/import\s+[^;]*from\s+["']react-google-font-loader["'];?\n?/g, "");

  // Prepend global references so the code can access React, Remotion, and GSAP
  const wrappedCode =
    `const React = window.React;\nconst { useState, useEffect, useRef, useMemo, useCallback } = window.React;\nconst Remotion = window.Remotion;\nconst R = window.Remotion;\nconst gsap = window.gsap;\nconst { CustomEase, DrawSVGPlugin, MorphSVGPlugin, Physics2DPlugin, ScrambleTextPlugin, SplitText } = window.GSAPPlugins;\nconst GoogleFontLoader = window.GoogleFontLoader;\n` +
    strippedImports;

  console.debug("[useComponent] Transformed component code:", wrappedCode);
  return wrappedCode;
};

export const useComponent = (content: string) => {
  const [component, setComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    // Register GSAP plugins
    registerGSAPPlugins();

    // Set up global window objects
    window.React = React;
    window.ReactDOM = ReactDOM;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).Remotion = R;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gsap = GSAPWithPlugins.gsap;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).GSAPPlugins = {
      CustomEase: GSAPWithPlugins.CustomEase,
      DrawSVGPlugin: GSAPWithPlugins.DrawSVGPlugin,
      MorphSVGPlugin: GSAPWithPlugins.MorphSVGPlugin,
      Physics2DPlugin: GSAPWithPlugins.Physics2DPlugin,
      ScrambleTextPlugin: GSAPWithPlugins.ScrambleTextPlugin,
      SplitText: GSAPWithPlugins.SplitText,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).GoogleFontLoader = GoogleFontLoader;
  }, []);

  useEffect(() => {
    (async () => {
      const component = await createComponent(content);
      const jsBlob = new Blob([component], {
        type: "text/javascript",
      });
      const blobUrl = URL.createObjectURL(jsBlob);
      const imported = await import(/* webpackIgnore: true */ blobUrl);
      URL.revokeObjectURL(blobUrl);
      setComponent(() => imported.default);
    })();
  }, [content]);

  return {
    component,
  };
};
