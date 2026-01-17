import fs from "fs/promises";
import * as fsTypes from "fs";
import path from "path";

export const ensureDir = async (p: string) => fs.mkdir(p, { recursive: true });

export const writeFileTree = async (rootDir: string, files: Record<string, string>) => {
  for (const [rel, contents] of Object.entries(files)) {
    const target = path.join(rootDir, rel);
    await ensureDir(path.dirname(target));
    await fs.writeFile(target, contents, "utf-8");
  }
};

export const ensureNodeModulesLink = async (workDir: string) => {
  const src = path.join(process.cwd(), "node_modules");
  const dest = path.join(workDir, "node_modules");
  try {
    await fs.lstat(dest).catch(async () => {
      await fs.access(src);
      const linkType = process.platform === "win32" ? "junction" : "dir";
      await fs.symlink(src, dest, linkType as unknown as fsTypes.symlink.Type);
    });
  } catch (err) {
    console.warn("Warning: Could not create node_modules symlink:", err);
  }
};

export const sanitizeOutName = (s: string) =>
  `${s}`.replace(/[^0-9a-zA-Z\-!_.*'()/]/g, "_") + ".mp4";
