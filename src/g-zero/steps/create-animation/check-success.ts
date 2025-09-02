import { CreateAnimationOutput } from "./types";

export interface CheckSuccessOutput {
  output: any;
}

export const checkSuccess = async (
  input: CreateAnimationOutput
): Promise<CheckSuccessOutput> => {
  if (!input.success) {
    throw new Error(
      `Failed to compile after ${input.attempts || 5} attempts: ${input.error}`
    );
  }

  console.log("[SUCCESS] Animation compiled successfully");
  console.log(JSON.parse(input.output!));

  return {
    output: JSON.parse(input.output!),
  };
};
