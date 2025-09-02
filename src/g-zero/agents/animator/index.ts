import { generateObject } from "ai";
import { openrouter } from "../../utils/config";
import { getAnimatorPrompt } from "./prompts";
import { AnimatorOutputSchema } from "./schema";
import { AnimatorInput } from "./types";

export const animatorAgent = async (input: AnimatorInput) => {
  const animator = await generateObject({
    model: openrouter(input.model),
    system: getAnimatorPrompt({
      contextModel: input.contextModel,
      previousCode: input.previousCode,
    }).prompt,
    schema: AnimatorOutputSchema,
    messages: [
      {
        role: "user",
        content: input.prompt,
      },
    ],
  });

  return animator.object;
};
