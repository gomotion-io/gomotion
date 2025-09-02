import express, { Request, Response } from "express";
import { CreateAnimationInput } from "./g-zero/steps/create-animation/types";
import { createAnimationWorkflow } from "./g-zero/workflow";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "GoMotion Animation API",
    version: "1.0.0",
    endpoints: {
      "POST /api/animations": "Create a new animation",
    },
  });
});

app.post("/api/animations", async (req: Request, res: Response) => {
  try {
    const input: CreateAnimationInput = req.body;

    // Validate required fields
    if (!input.instruction && !input.metadata) {
      return res.status(400).json({
        error: "Missing required fields",
        message: "Either 'instruction' or 'metadata' must be provided",
        example: {
          instruction: "Create a bouncing ball animation",
          metadata: "width: 1080, height: 1920, fps: 30",
          contextModel: "classic",
          model: "anthropic/claude-sonnet-4",
        },
      });
    }

    console.log("[API] Creating animation with input:", input);

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
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[API] Unexpected error:", errorMessage);

    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: errorMessage,
    });
  }
});

export default app;
