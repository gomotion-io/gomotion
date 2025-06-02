"use client";
import * as esbuild from "esbuild-wasm";
import * as React from "react";
import { ComponentType, useCallback, useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import * as Remotion from "remotion";

// Extend window type to include our global libraries
declare global {
  interface Window {
    React: typeof React;
    ReactDOM: typeof ReactDOM;
    Remotion: typeof Remotion;
  }
}

let esbuildInitPromise: Promise<void> | null = null;
let esbuildInitialized = false;

const ensureEsbuildInitialized = () => {
  if (esbuildInitialized) return Promise.resolve();

  if (!esbuildInitPromise) {
    esbuildInitPromise = esbuild
      .initialize({
        wasmURL: "https://unpkg.com/esbuild-wasm@0.19.12/esbuild.wasm",
        worker: true,
      })
      .then(() => {
        esbuildInitialized = true;
      });
  }

  return esbuildInitPromise;
};

export const useGeneration = () => {
  const [preparing, setPreparing] = useState(false);

  useEffect(() => {
    (async () => {
      setPreparing(true);
      await ensureEsbuildInitialized();
      setPreparing(false);
    })();
  }, []);

  const generateRemotionComponent = useCallback(
    async ({ prompt }: { prompt: string }) => {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const { tsx, metadata } = await res.json();

      await ensureEsbuildInitialized();

      // Make React and Remotion available globally for the dynamic component
      window.React = React;
      window.ReactDOM = ReactDOM;
      window.Remotion = Remotion;

      // Compile the TSX string to ESM JS
      const { code } = await esbuild.transform(tsx, {
        loader: "tsx",
        format: "esm",
        jsx: "transform",
        jsxFactory: "React.createElement",
        jsxFragment: "React.Fragment",
      });

      const jsBlob = new Blob([getPatchedCode(code)], {
        type: "text/javascript",
      });
      const blobUrl = URL.createObjectURL(jsBlob);
      const imported = await import(/* webpackIgnore: true */ blobUrl);

      // Clean up the blob URL to prevent memory leaks
      URL.revokeObjectURL(blobUrl);

      return {
        composition: imported.default as ComponentType,
        metadata,
      };
    },
    []
  );

  return {
    preparing,
    generateRemotionComponent,
  };
};

// Replace bare module specifiers with global references
const getPatchedCode = (code: string) => {
  // Create inline module definitions at the top of the code
  const moduleDefinitions = `
// Make React and Remotion available as globals
const React = window.React;
const Remotion = window.Remotion;

// Extract commonly used Remotion functions for convenience
const { useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } = window.Remotion;
`;

  return (
    moduleDefinitions +
    "\n" +
    code
      // Remove all import statements since we're using globals
      .replace(
        /import\s+(?:\*\s+as\s+\w+|\{[^}]*\}|\w+)\s+from\s+['"][^'"]*['"];?\s*/g,
        "// Import handled globally\n"
      )
  );
};
