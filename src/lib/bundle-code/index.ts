import { DepGraph } from "dependency-graph";
import * as esbuild from "esbuild-wasm";
import { ComponentType } from "react";
import { externalModules } from "./externals-modules";

type BundleCodeProps = {
  files: Record<string, string>;
};

let initPromise: Promise<void> | null = null;

const initializeEsbuild = () => {
  if (!initPromise) {
    initPromise = esbuild.initialize({
      wasmURL: "https://unpkg.com/esbuild-wasm@0.25.9/esbuild.wasm",
    });
  }
  return initPromise;
};

export const bundleCode = async ({ files }: BundleCodeProps) => {
  await initializeEsbuild();

  const extractImports = (code: string): string[] => {
    const imports: string[] = [];
    const regex = /from\s+['"](.+?)['"]/g;
    let match;
    while ((match = regex.exec(code))) {
      const path = match[1];
      if (path.startsWith(".") || path.includes("/")) {
        const normalized = path.replace(/^\.\//, "").replace(/\.[jt]sx$/, "");
        imports.push(normalized);
      }
    }
    return imports;
  };

  const graph = new DepGraph<string>({ circular: false });

  for (const filePath in files) {
    const name = filePath.replace(".tsx", "");
    graph.addNode(name);
  }

  for (const filePath in files) {
    const name = filePath.replace(".tsx", "");
    const deps = extractImports(files[filePath]);
    for (const dep of deps) {
      if (graph.hasNode(dep)) {
        graph.addDependency(name, dep);
      }
    }
  }

  const fileOrder = graph.overallOrder();

  const moduleExports: Record<string, unknown> = {};

  for (const name of fileOrder) {
    const filePath = `${name}.tsx`;
    const code = files[filePath];
    const result = await esbuild.build({
      stdin: {
        contents: code,
        loader: "tsx",
        resolveDir: "/",
      },
      write: false,
      bundle: false,
      platform: "browser",
      jsx: "automatic",
      format: "cjs",
    });

    const transpiled = result.outputFiles[0].text;

    // eslint-disable-next-line @next/next/no-assign-module-variable
    const module = { exports: {} };
    const customRequire = (path: string) => {
      if (externalModules[path]) return externalModules[path];
      const normalized = path.replace(/^\.\//, "").replace(/\.[jt]sx$/, "");
      if (moduleExports[normalized]) {
        return moduleExports[normalized];
      }
      throw new Error(`Unknown module ${path}`);
    };

    new Function("require", "module", "exports", transpiled)(
      customRequire,
      module,
      module.exports
    );

    moduleExports[name] = module.exports;
  }

  return (moduleExports["Main"] as { Main: ComponentType }).Main;
};
