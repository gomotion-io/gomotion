import { z } from "zod";

export const AnimatorOutputSchema = z.object({
  title: z.string(),
  meta: z.object({
    width: z.number(),
    height: z.number(),
    fps: z.number(),
    durationInFrames: z.number(),
  }),
  files: z.record(z.string(), z.string()),
});
