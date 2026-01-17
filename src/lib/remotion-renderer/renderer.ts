import { deploySite, getOrCreateBucket } from "@remotion/lambda";
import {
  type AwsRegion,
  renderMediaOnLambda,
  getCompositionsOnLambda,
} from "@remotion/lambda/client";
import { getCompositions } from "@remotion/renderer";
import fs from "fs/promises";
import os from "os";
import path from "path";
import { FRAME_PER_LAMBDA, REGION } from "../lambda/config";
import { ensureLambdaFunction } from "../lambda/ensure-lambda";
import { REMOTION_CONFIG } from "./config";
import { writeProjectScaffold, makeRootTsx, detectMainImportPath } from "./project-builder";
import { RenderVideoOptions, RenderResult } from "./types";
import { ensureDir, writeFileTree, ensureNodeModulesLink, sanitizeOutName } from "./utils";

export async function renderRemotionVideo({
  runId,
  fileTree,
  meta,
}: RenderVideoOptions): Promise<RenderResult> {
  const region = REGION as AwsRegion;

  const safeRunId = runId ?? `run-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const requestedCompositionId = meta?.compositionId;

  const framesPerLambda =
    meta?.concurrency != null ? undefined : FRAME_PER_LAMBDA ?? undefined;

  const scale = meta?.scale ?? REMOTION_CONFIG.DEFAULT_SCALE;

  const tmpDir = path.join(os.tmpdir(), `gomotion/remotion-${safeRunId}-${Date.now()}`);
  const entry = path.join(tmpDir, "index.ts");
  const rootPath = path.join(tmpDir, "Root.tsx");

  try {
    await ensureDir(tmpDir);

    // --- WRITE USER FILES FIRST ---
    await writeFileTree(tmpDir, fileTree);

    const hasUserIndex = Object.prototype.hasOwnProperty.call(fileTree, "index.ts");
    await writeProjectScaffold(tmpDir, entry, hasUserIndex);

    const hasUserRoot = Object.prototype.hasOwnProperty.call(fileTree, "Root.tsx");
    if (!hasUserRoot) {
      const mainImportPath = detectMainImportPath(fileTree);
      const compositionForScaffold = requestedCompositionId ?? "gomotion";
      await fs.writeFile(
        rootPath,
        makeRootTsx({
          compositionId: compositionForScaffold,
          inputProps: meta?.inputProps,
          mainImportPath,
        }),
        "utf-8"
      );
    }

    await ensureNodeModulesLink(tmpDir);

    const { bucketName } = await getOrCreateBucket({
      region,
      enableFolderExpiry: true,
    });

    const { serveUrl } = await deploySite({
      entryPoint: hasUserIndex ? path.join(tmpDir, "index.ts") : entry,
      bucketName,
      region,
      siteName: "gomotion",
      logLevel: "info",
      options: {
        rootDir: tmpDir,
        onBundleProgress: (p) => console.log(`[bundle] ${p}%`),
        onUploadProgress: (u) =>
          console.log(
            `[upload] ${u.filesUploaded}/${u.totalFiles} (${u.sizeUploaded}/${u.totalSize} bytes)`
          ),
      },
    });

    const functionName = await ensureLambdaFunction();

    // Discover compositions
    let compositions;
    try {
      compositions = await getCompositionsOnLambda({
        region,
        functionName,
        serveUrl,
        inputProps: meta?.inputProps ?? {},
        timeoutInMilliseconds: 60000,
      });
    } catch (error) {
      // Fallback to local getCompositions
      compositions = await getCompositions(serveUrl);
    }

    if (!compositions || compositions.length === 0) {
      throw new Error("No compositions found in the deployed site");
    }

    // Choose composition: exact requested id or first available
    const composition =
      (requestedCompositionId &&
        compositions.find((c) => c.id === requestedCompositionId)) ??
      compositions[0];

    if (!composition) {
      const available = compositions.map((c) => c.id).join(", ");
      throw new Error(`No compositions found. Available: ${available || "(none)"}`);
    }

    const { renderId } = await renderMediaOnLambda({
      region,
      functionName,
      serveUrl,
      composition: composition.id,
      concurrency: meta?.concurrency,
      framesPerLambda,
      codec: meta?.codec ?? REMOTION_CONFIG.DEFAULT_CODEC,
      audioCodec: meta?.audioCodec,
      crf: meta?.crf ?? REMOTION_CONFIG.DEFAULT_CRF,
      videoBitrate: meta?.videoBitrate,
      x264Preset: meta?.x264Preset,
      colorSpace: meta?.colorSpace ?? "default",
      outName: sanitizeOutName(safeRunId),
      scale,
      timeoutInMilliseconds: meta?.timeoutInMs ?? REMOTION_CONFIG.DEFAULT_TIMEOUT_MS,
      privacy: meta?.privacy ?? REMOTION_CONFIG.DEFAULT_PRIVACY,
      metadata: { runId: safeRunId, ts: Date.now().toString() },
      logLevel: "info",
    });

    return { renderId, bucketName, region };
  } catch (error) {
    console.error("[render error]", error);
    throw error;
  } finally {
    if (!meta?.keepTmp) {
      await fs.rm(tmpDir, { recursive: true, force: true }).catch(() => void 0);
    }
  }
}
