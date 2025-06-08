import { CompositionMetadata } from "@/_type";
import { usePromptParamsStore } from "@/store/prompt-params";
import * as esbuild from "esbuild-wasm";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Remotion from "remotion";
import { create } from "zustand";

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

export type GenerationState = {
  preparing: boolean;
  loading: boolean;
  composition: React.ComponentType | null;
  metadata: CompositionMetadata | null;
  // actions
  generateComp: (payload: { prompt: string }) => Promise<void>;
  // private setter for preparing to allow pre-initialization in components if desired
  _ensureEsbuildReady: () => Promise<void>;
};

export const useGenerationStore = create<GenerationState>((set) => ({
  preparing: false,
  loading: false,
  composition: null,
  metadata: null,

  // Expose esbuild initialization (optional)
  _ensureEsbuildReady: async () => {
    set({ preparing: true });
    await ensureEsbuildInitialized();
    set({ preparing: false });
  },

  generateComp: async ({ prompt }) => {
    const { llm_provider, llm_model } = usePromptParamsStore.getState();

    try {
      set({ loading: true });

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, llm_provider, llm_model }),
      });

      const { tsx, metadata } = await res.json();

      await ensureEsbuildInitialized();

      // Make React and Remotion available globally for the dynamic component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).React = React;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).ReactDOM = ReactDOM;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).Remotion = Remotion;

      // Compile the TSX string to ESM JS
      const { code } = await esbuild.transform(tsx, {
        loader: "tsx",
        format: "esm",
        jsx: "transform",
        jsxFactory: "React.createElement",
        jsxFragment: "React.Fragment",
      });

      const patchedCode = getPatchedCode(code);
      const jsBlob = new Blob([patchedCode], { type: "text/javascript" });
      const blobUrl = URL.createObjectURL(jsBlob);
      const imported = await import(/* webpackIgnore: true */ blobUrl);
      URL.revokeObjectURL(blobUrl);

      set({
        composition: imported.default as React.ComponentType,
        metadata: metadata as CompositionMetadata,
      });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },
}));

const getPatchedCode = (code: string) => {
  const moduleDefinitions = `
// Make React and Remotion available as globals
const React = window.React;
const Remotion = window.Remotion;

// Extract commonly used Remotion functions for convenience
const { useCurrentFrame, interpolate, spring, useVideoConfig, Sequence, Easing, Img, AbsoluteFill, Video } = window.Remotion;
`;

  return (
    moduleDefinitions +
    "\n" +
    code.replace(
      /import\s+(?:\*\s+as\s+\w+|\{[^}]*\}|\w+)\s+from\s+['"][^'"]*['"];?\s*/g,
      "// Import handled globally\n",
    )
  );
};
