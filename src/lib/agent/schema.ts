import { z } from "zod";

export const AnimatorOutputSchema = z.object({
  title: z.string(),
  meta: z.object({
    width: z.number(),
    height: z.number(),
    fps: z.number(),
    durationInFrames: z.number(),
  }),
  // Strict structured outputs only allow objects with additionalProperties: false,
  // so a path -> content record would always come back empty. Files are returned
  // as a list instead and turned back into a record by the agent.
  files: z.array(
    z.object({
      path: z.string(),
      content: z.string(),
    })
  ),
});

export type AnimatorSchemaOutput = z.infer<typeof AnimatorOutputSchema>;
