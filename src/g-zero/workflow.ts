import {
  checkSuccess,
  CheckSuccessOutput,
} from "./steps/create-animation/check-success";
import { createAnimation } from "./steps/create-animation/create-animation";
import {
  CreateAnimationInput,
  CreateAnimationOutput,
} from "./steps/create-animation/types";

export interface AnimationWorkflowResult {
  success: boolean;
  output?: CheckSuccessOutput;
  error?: string;
  attempts: number;
}

const MAX_ATTEMPTS = 5;

export const createAnimationWorkflow = async (
  input: CreateAnimationInput
): Promise<AnimationWorkflowResult> => {
  console.log("[WORKFLOW] Starting animation workflow");

  let result: CreateAnimationOutput | undefined;
  let attempts = 0;
  const maxAttempts = MAX_ATTEMPTS;

  // Do-while loop: create animation and check success, retry up to maxAttempts
  do {
    attempts++;
    console.log(`[WORKFLOW] Attempt ${attempts}/${maxAttempts}`);

    try {
      result = await createAnimation({
        ...input,
        attempts: attempts - 1, // Pass the current attempt count
      });

      if (result.success) {
        console.log(
          `[WORKFLOW] Animation created successfully on attempt ${attempts}`
        );
        const finalResult = await checkSuccess(result);
        return {
          success: true,
          output: finalResult,
          attempts,
        };
      } else {
        console.log(`[WORKFLOW] Attempt ${attempts} failed: ${result.error}`);
        // Update input for next attempt with error and previous code
        input = {
          ...input,
          previousCode: result.previousCode,
          error: result.error,
          attempts: attempts,
        };
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(
        `[WORKFLOW] Unexpected error on attempt ${attempts}:`,
        errorMessage
      );

      if (attempts >= maxAttempts) {
        return {
          success: false,
          error: errorMessage,
          attempts,
        };
      }

      // Continue to next attempt
      input = {
        ...input,
        error: errorMessage,
        attempts: attempts,
      };
    }
  } while (attempts < maxAttempts);

  // If we get here, all attempts failed
  return {
    success: false,
    error: result?.error || "Unknown error after max attempts",
    attempts,
  };
};
