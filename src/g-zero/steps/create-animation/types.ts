import { z } from "zod";

const CreateAnimationInputSchema = z.object({
  instruction: z.string().optional(),
  metadata: z.string().optional().default(`width: 1080, height: 1920, fps: 30`),
  contextModel: z.enum(["classic", "creative", "narrative"]).default("classic"),
  model: z.string().default("anthropic/claude-sonnet-4"),
  voiceId: z.string().default("ZF6FPAbjXT4488VcRRnw"),
  previousCode: z.any().optional(),
  error: z.string().optional(),
  attempts: z.number().optional(),
});

const CreateAnimationOutputSchema = z.object({
  success: z.boolean(),
  contextModel: z.any().optional(),
  output: z.string().optional(),
  previousCode: z.any().optional(),
  error: z.string().optional(),
  attempts: z.number().optional(),
});

export type CreateAnimationInput = z.infer<typeof CreateAnimationInputSchema>;
export type CreateAnimationOutput = z.infer<typeof CreateAnimationOutputSchema>;
