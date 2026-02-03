import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateObject } from "ai";
import { getAnimatorPrompt } from "./prompts";
import { AnimatorOutputSchema } from "./schema";
import { AnimatorInput, AnimatorOutput, AnimationResult, Context } from "./types";

const MAX_ATTEMPTS = 5;

export const createOpenRouterClient = (apiKey: string) => {
  return createOpenRouter({ apiKey });
};

interface GenerateAnimationInput {
  prompt: string;
  contextModel: Context;
  model: string;
  apiKey: string;
  images?: string[];
  previousCode?: AnimatorOutput;
}

async function generateAnimation(
  input: GenerateAnimationInput
): Promise<AnimatorOutput> {
  const openrouter = createOpenRouterClient(input.apiKey);

  // Prepare messages with text and images
  const content: Array<{ type: string; text?: string; image?: string }> = [
    { type: "text", text: input.prompt },
  ];

  // Add images if provided
  if (input.images && input.images.length > 0) {
    input.images.forEach((image) => {
      content.push({
        type: "image",
        image: image,
      });
    });
  }

  const result = await generateObject({
    model: openrouter(input.model),
    system: getAnimatorPrompt({
      contextModel: input.contextModel,
      previousCode: input.previousCode ? JSON.stringify(input.previousCode) : undefined,
    }).prompt,
    schema: AnimatorOutputSchema,
    messages: [
      {
        role: "user",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        content: content as any,
      },
    ],
  });

  return result.object as AnimatorOutput;
}

export async function createAnimation(
  input: AnimatorInput
): Promise<AnimationResult> {
  console.log("[AGENT] Starting animation creation workflow");

  let lastOutput: AnimatorOutput | undefined;
  let lastError: string | undefined;
  let attempts = 0;

  while (attempts < MAX_ATTEMPTS) {
    attempts++;
    console.log(`[AGENT] Attempt ${attempts}/${MAX_ATTEMPTS}`);

    try {
      // Build the prompt
      let prompt: string;

      if (lastOutput && lastError) {
        // Retry with error feedback
        prompt = `Fix the previous output based on this error: ${lastError}

Previous output: ${JSON.stringify(lastOutput)}

Remember: Output ONLY a valid JSON object conforming to the required schema.
Do not include any introductory text, explanations, or markdown.`;
      } else {
        // Initial prompt
        const instructionText = input.instruction || "";
        const metadataText = input.metadata || "";
        prompt = `${instructionText}\n${metadataText}`.trim();
      }

      // Generate animation
      const output = await generateAnimation({
        prompt,
        contextModel: input.contextModel,
        model: input.model,
        apiKey: input.apiKey,
        images: input.images,
        previousCode: lastOutput,
      });

      // Validate the output structure
      if (!output.title || !output.meta || !output.files) {
        throw new Error("Invalid output structure: missing required fields");
      }

      if (
        typeof output.meta.width !== "number" ||
        typeof output.meta.height !== "number" ||
        typeof output.meta.fps !== "number" ||
        typeof output.meta.durationInFrames !== "number"
      ) {
        throw new Error("Invalid meta structure: missing or invalid numeric fields");
      }

      if (Object.keys(output.files).length === 0) {
        throw new Error("No files generated");
      }

      // Check for required files
      const hasIndexTs = Object.keys(output.files).some((f) =>
        f.toLowerCase().includes("index.ts")
      );
      const hasRootTsx = Object.keys(output.files).some((f) =>
        f.toLowerCase().includes("root.tsx")
      );
      const hasMainTsx = Object.keys(output.files).some((f) =>
        f.toLowerCase().includes("main.tsx")
      );

      if (!hasIndexTs) {
        throw new Error("Missing required file: index.ts");
      }
      if (!hasRootTsx) {
        throw new Error("Missing required file: Root.tsx");
      }
      if (!hasMainTsx) {
        throw new Error("Missing required file: Main.tsx");
      }

      console.log(`[AGENT] Animation created successfully on attempt ${attempts}`);

      return {
        success: true,
        output,
        attempts,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`[AGENT] Attempt ${attempts} failed:`, errorMessage);

      lastError = errorMessage;
      if (lastOutput === undefined) {
        // If we don't have a previous output yet, we can't do a fix attempt
        // Just continue to the next iteration
      }

      if (attempts >= MAX_ATTEMPTS) {
        return {
          success: false,
          error: errorMessage,
          attempts,
        };
      }
    }
  }

  return {
    success: false,
    error: lastError || "Unknown error after max attempts",
    attempts,
  };
}
