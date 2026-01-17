import { bundle } from "@remotion/bundler";
import { getCompositions, renderStill } from "@remotion/renderer";
import fs from "fs/promises";
import path from "path";

export type Generated = {
  title: string;
  meta: {
    width: number;
    height: number;
    fps: number;
    durationInFrames: number;
  };
  files: Record<string, string>;
};

export const testRenderStill = async (generated: Generated) => {
  const tempDir = await fs.mkdtemp(path.join(process.cwd(), "remotion-test-"));
  try {
    // Write generated files to temp dir
    for (const [filePath, content] of Object.entries(generated.files)) {
      const fullPath = path.join(tempDir, filePath);
      await fs.mkdir(path.dirname(fullPath), { recursive: true });
      await fs.writeFile(fullPath, content as string);
    }

    const entryPoint = path.join(tempDir, "index.ts");

    // Bundle with Remotion
    const bundleLocation = await bundle({ entryPoint });

    // Get compositions from bundle
    const compositions = await getCompositions(bundleLocation);

    const normalizedTitle = generated.title ?? "";
    const candidates = [
      normalizedTitle,
      normalizedTitle.replace(/\s+/g, ""),
      normalizedTitle.replace(/\s+/g, "-"),
      normalizedTitle.replace(/[^a-zA-Z0-9]/g, ""),
      normalizedTitle.replace(/[^a-zA-Z0-9]/g, "-"),
    ].filter(Boolean);

    let composition = compositions.find((c) =>
      candidates.some((id) => c.id.toLowerCase() === id.toLowerCase())
    );

    if (!composition) {
      composition =
        compositions.find((c) => c.id === "Gomotion") ?? compositions[0];
    }

    if (!composition) {
      throw new Error(`No compositions found in bundle.`);
    }

    // Render still (frame 0) to a temp image
    const outputPath = path.join(tempDir, "test-still.png");
    await renderStill({
      composition,
      serveUrl: bundleLocation,
      output: outputPath,
      frame: 60, // Test 60th frame (1 second)
    });

    // If successful, clean up
    console.log("[RENDER SUCCESS]");
    await fs.rm(tempDir, { recursive: true, force: true });
  } catch (renderError) {
    console.error("[RENDER ERROR]: ", renderError);
    await fs.rm(tempDir, { recursive: true, force: true });
    throw renderError;
  }
};
