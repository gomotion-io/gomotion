import express, { Request, Response } from "express";
import { CreateAnimationInput } from "./g-zero/steps/create-animation/types";
import { createAnimationWorkflow } from "./g-zero/workflow";
import { renderProgress } from "./lib/lambda/progress";
import { renderRemotionVideo } from "./lib/remotion-renderer";
import { upload } from "./multer";

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "GoMotion Animation API",
    version: "1.0.0",
    endpoints: {
      "POST /api/animations": {
        description: "Create a new animation",
        requiredFields: ["apiKey", "instruction OR metadata"],
        optionalFields: ["contextModel", "model", "voiceId", "previousVideo", "images"],
      },
    },
  });
});

app.post(
  "/api/animations",
  upload.array("images", 10),
  async (req: Request, res: Response) => {
    try {
      // Extract fields from FormData
      const instruction = req.body.instruction as string;
      const metadata = req.body.metadata as string;
      const contextModel = req.body.contextModel as string;
      const model = req.body.model as string;
      const voiceId = req.body.voiceId as string;
      const previousCode = req.body.previousVideo as string;
      const apiKey = req.body.apiKey as string;
      const images = req.files as Express.Multer.File[];

      if (!apiKey) {
        return res.status(400).json({
          error: "Missing required field",
          message: "'apiKey' is required",
        });
      }

      if (!instruction && !metadata) {
        return res.status(400).json({
          error: "Missing required fields",
          message:
            "Either 'instruction' or 'metadata' must be provided and non-empty",
          received: {
            instruction: instruction || "undefined/empty",
            metadata: metadata || "undefined/empty",
          },
          example: {
            instruction: "Create a bouncing ball animation",
            metadata: "width: 1080, height: 1920, fps: 30",
            contextModel: "classic",
            model: "anthropic/claude-sonnet-4",
            apiKey: "your-openrouter-api-key",
          },
        });
      }

      const input: CreateAnimationInput = {
        instruction,
        metadata,
        contextModel: contextModel as "classic" | "creative" | "narrative",
        model: model,
        apiKey: apiKey,
        previousCode: previousCode,
        voiceId: voiceId,
        images: images || [],
      };

      console.log("[API] Creating animation with input:", {
        ...input,
        apiKey: "[REDACTED]",
        images: images ? `${images.length} images` : "no images",
      });

      const result = await createAnimationWorkflow(input);

      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.output,
          attempts: result.attempts,
        });
      } else {
        return res.status(500).json({
          success: false,
          error: result.error,
          attempts: result.attempts,
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error("[API] Unexpected error:", errorMessage);

      return res.status(500).json({
        success: false,
        error: "Internal server error",
        message: errorMessage,
      });
    }
  }
);

app.post("/api/render", async (req: Request, res: Response) => {
  const { runId, fileTree, meta = {} } = req.body;
  const { bucketName, renderId } = await renderRemotionVideo({
    runId,
    fileTree,
    meta,
  });
  res.json({ bucketName, renderId });
});

app.post("/api/progress", async (req: Request, res: Response) => {
  const { renderId, bucketName } = req.body;
  const result = await renderProgress({ renderId, bucketName });
  res.json(result);
});

export default app;
