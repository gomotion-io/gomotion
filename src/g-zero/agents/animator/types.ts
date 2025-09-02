import { z } from "zod";
import { AnimatorOutputSchema } from "./schema";

export type Context = "classic" | "creative" | "narrative";

export type AnimatorInput = {
  prompt: string;
  contextModel: Context;
  model: string;
  previousCode?: string;
};

export type AnimatorOutput = z.infer<typeof AnimatorOutputSchema>;
