import { z } from "zod";
import { AnimatorOutputSchema } from "./schema";

export type Context = "classic" | "creative" | "narrative";

export type AnimatorInput = {
  prompt: string;
  contextModel: Context;
  model: string;
  images?: any[]; // Array of image files/data
  previousCode?: string;
};

export type AnimatorOutput = z.infer<typeof AnimatorOutputSchema>;
