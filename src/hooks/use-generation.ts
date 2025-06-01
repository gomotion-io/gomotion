"use client";
import * as esbuild from "esbuild-wasm";
import type { ComponentType } from "react";
import { useCallback, useEffect } from "react";

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
  useEffect(() => {
    ensureEsbuildInitialized().catch(console.error);
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

      // Compile the TSX string to ESM JS
      const { code } = await esbuild.transform(tsx, {
        loader: "tsx",
        format: "esm",
        jsx: "transform",
      });

      const jsBlob = new Blob([getPatchedCode(code)], {
        type: "text/javascript",
      });
      const blobUrl = URL.createObjectURL(jsBlob);
      const imported = await import(/* webpackIgnore: true */ blobUrl);
      return {
        composition: imported.default as ComponentType,
        metadata,
      };
    },
    [],
  );

  return {
    generateRemotionComponent,
  };
};

// Replace bare module specifiers with CDN URLs so the browser can resolve
// them when the module is imported from the Blob URL.
const getPatchedCode = (code: string) => {
  return (
    code
      // React automatic runtime files
      .replace(
        /from\s+['"]react\/jsx-runtime['"]/g,
        'from "https://esm.sh/react@19/jsx-runtime"',
      )
      // Classic React default import
      .replace(/from\s+['"]react['"]/g, 'from "https://esm.sh/react@19"')
      // Remotion packages that may appear
      .replace(/from\s+['"]remotion['"]/g, 'from "https://esm.sh/remotion@4"')
      .replace(
        /from\s+['"]@remotion\/animation['"]/g,
        'from "https://esm.sh/@remotion/animation@4"',
      )
  );
};
