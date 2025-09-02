import { animatorAgent } from "../../agents/animator";
import { Generated, testRenderStill } from "../../utils/render-code";
import { CreateAnimationInput, CreateAnimationOutput } from "./types";

export const createAnimation = async (
  input: CreateAnimationInput
): Promise<CreateAnimationOutput> => {
  console.log("[Input] createAnimation", input);

  let prompt;

  if (input.instruction && input.metadata) {
    prompt = `${input.instruction}\n${input.metadata}`;
  } else if (input.previousCode !== undefined && input.error !== undefined) {
    prompt = `Fix the previous output based on this compile error: ${
      input.error
    }
    \nPrevious output: ${JSON.stringify(input.previousCode)}\n
    \nRemember: Output ONLY a valid JSON object conforming to the required schema.
     Do not include any introductory text, explanations, or markdown.`;
  } else {
    throw new Error("Invalid input for createAnimation step");
  }

  const animator = await animatorAgent({
    prompt: input.instruction ?? "",
    contextModel: input.contextModel,
    model: input.model,
    previousCode: input.previousCode,
  });

  let generated;

  try {
    generated = animator ?? JSON.parse(animator);
  } catch (parseError: unknown) {
    const errorMessage =
      parseError instanceof Error ? parseError.message : String(parseError);
    throw new Error("Failed to parse generated result: " + errorMessage);
  }

  try {
    await testRenderStill(generated as Generated);
    return {
      success: true,
      output: JSON.stringify(generated),
      contextModel: input.contextModel,
      previousCode: input.previousCode,
    };
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    return {
      success: false,
      previousCode: generated,
      error: errorMessage,
      contextModel: input.contextModel,
      attempts: (input.attempts || 0) + 1,
    };
  }
};
