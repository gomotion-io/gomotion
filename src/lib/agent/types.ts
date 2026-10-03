import { DEFAULT_MODEL } from "@/lib/models";
import { z } from "zod";

export type Context = "classic" | "creative" | "narrative";

export const AnimatorInputSchema = z.object({
  instruction: z.string(),
  metadata: z.string().optional().default("width: 1080, height: 1920, fps: 30"),
  contextModel: z.enum(["classic", "creative", "narrative"]).default("classic"),
  model: z.string().default(DEFAULT_MODEL.value),
  apiKey: z.string(),
  images: z.array(z.string()).optional(),
  previousCode: z.any().optional(),
  error: z.string().optional(),
});

export type AnimatorInput = z.infer<typeof AnimatorInputSchema>;

export interface AnimatorOutput {
  title: string;
  meta: {
    width: number;
    height: number;
    fps: number;
    durationInFrames: number;
  };
  files: Record<string, string>;
}

export type AnimationErrorCode = "INSUFFICIENT_CREDITS";

export interface AnimationResult {
  success: boolean;
  output?: AnimatorOutput;
  error?: string;
  errorCode?: AnimationErrorCode;
  attempts: number;
}
