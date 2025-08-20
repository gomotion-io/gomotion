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

const normalizeName = (filePath: string) => {
  return filePath.replace(/\.[jt]sx?$/, "");
};

const resolvePath = (currentFile: string, importPath: string) => {
  const dir = currentFile.split("/").slice(0, -1).join("/");
  let full = importPath;
  if (importPath.startsWith(".")) {
    full = (dir ? dir + "/" : "") + importPath;
  }
  const segments = full.split("/");
  const resolved: string[] = [];
  for (const seg of segments) {
    if (seg === "" || seg === ".") continue;
    if (seg === "..") {
      if (resolved.length > 0) resolved.pop();
    } else {
      resolved.push(seg);
    }
  }
  let res = resolved.join("/");
  res = res.replace(/\.[jt]sx?$/, "");
  return res;
};

const extractImports = (code: string): string[] => {
  const imports: string[] = [];
  const regex = /import\s*(?:[\w\*\{\}\s,]+from\s*)?['"](.+?)['"]/g;
  let match;
  while ((match = regex.exec(code))) {
    const path = match[1];
    if (path.startsWith(".")) {
      imports.push(path);
    }
  }
  return imports;
};

export const bundleCode = async ({ files }: BundleCodeProps) => {
  await initializeEsbuild();

  const graph = new DepGraph<string>({ circular: false });
  const pathMap: Record<string, string> = {};

  for (const filePath in files) {
    const name = normalizeName(filePath);
    graph.addNode(name);
    pathMap[name] = filePath;
  }

  for (const filePath in files) {
    const name = normalizeName(filePath);
    const deps = extractImports(files[filePath]);
    for (const dep of deps) {
      const resolved = resolvePath(filePath, dep);
      if (graph.hasNode(resolved)) {
        graph.addDependency(name, resolved);
      } else {
        const base = resolved.split("/").pop();
        if (base && graph.hasNode(base)) {
          graph.addDependency(name, base);
        }
      }
    }
  }

  const fileOrder = graph.overallOrder();

  const moduleExports: Record<string, unknown> = {};

  for (const name of fileOrder) {
    const filePath = pathMap[name];

    if (filePath.endsWith(".css")) {
      moduleExports[name] = {};
      continue;
    }

    const code = files[filePath];
    let loader: esbuild.Loader = "tsx";
    if (filePath.endsWith(".ts")) {
      loader = "ts";
    } else if (filePath.endsWith(".js")) {
      loader = "js";
    } else if (filePath.endsWith(".jsx")) {
      loader = "jsx";
    }
    const result = await esbuild.build({
      stdin: {
        contents: code,
        loader,
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
      const resolved = resolvePath(filePath, path);
      let target = resolved;
      if (!moduleExports[target]) {
        const base = target.split("/").pop();
        if (base && moduleExports[base]) {
          target = base;
        } else {
          throw new Error(`Unknown module ${path} (resolved to ${resolved})`);
        }
      }
      return moduleExports[target];
    };

    new Function("require", "module", "exports", transpiled)(
      customRequire,
      module,
      module.exports
    );

    moduleExports[name] = module.exports;
  }

  let entryName = "Main";
  if (!moduleExports[entryName]) {
    entryName =
      Object.keys(moduleExports).find((n) => n.endsWith("Main")) || "Main";
  }
  return (moduleExports[entryName] as { Main: ComponentType }).Main;
};
