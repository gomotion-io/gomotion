import fs from "fs/promises";
import path from "path";
import { ProjectScaffoldOptions } from "./types";

// Helper to detect Main path from the user's files
const detectMainImportPath = (files: Record<string, string>) => {
  // Prefer an exact /Main.tsx or /Main.jsx etc.
  const candidates = Object.keys(files).filter((k) =>
    /(^|\/)Main\.(tsx|ts|jsx|js|mjs|cjs)$/.test(k)
  );
  if (candidates.length > 0) {
    // Return path relative to project root, without extension, prefixed with './'
    const rel = candidates[0].replace(/\.(tsx|ts|jsx|js|mjs|cjs)$/, "");
    return `./${rel}`;
  }
  // Fallback to ./Main (user might provide it later)
  return "./Main";
};

export const writeProjectScaffold = async (tmpDir: string, entryPath: string, hasUserIndex: boolean) => {
  const pkgJson = {
    name: "gomotion-remotion-temp",
    private: true,
    type: "module",
  } as const;
  await fs.writeFile(path.join(tmpDir, "package.json"), JSON.stringify(pkgJson, null, 2));

  const tsconfig = {
    compilerOptions: {
      target: "ES2021",
      module: "ESNext",
      moduleResolution: "Bundler",
      jsx: "react-jsx",
      strict: true,
      skipLibCheck: true,
      baseUrl: ".",
      types: ["remotion"],
    },
    include: ["**/*"],
  } as const;
  await fs.writeFile(path.join(tmpDir, "tsconfig.json"), JSON.stringify(tsconfig, null, 2));

  if (!hasUserIndex) {
    const indexTs = `import { registerRoot } from 'remotion';
import { RemotionRoot } from './Root';
registerRoot(RemotionRoot);
`;
    await fs.writeFile(entryPath, indexTs, "utf-8");
  }
};

export const makeRootTsx = ({
  compositionId,
  inputProps,
  mainImportPath,
}: ProjectScaffoldOptions & { mainImportPath: string }) => {
  const durationInFrames = Number(inputProps?.durationInFrames ?? 300);
  const fps = Number(inputProps?.fps ?? 30);
  const width = Number(inputProps?.width ?? 1920);
  const height = Number(inputProps?.height ?? 1080);

  return `
import { Composition } from 'remotion';
import { Main } from '${mainImportPath}';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="${compositionId}"
        component={Main}
        durationInFrames={${durationInFrames}}
        fps={${fps}}
        width={${width}}
        height={${height}}
        defaultProps={${JSON.stringify(inputProps ?? {})}}
      />
    </>
  );
};
`;
};

// Export the helper function for use in renderer
export { detectMainImportPath };
