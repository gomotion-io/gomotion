import { generateObject } from "ai";
import { openrouter } from "../../utils/config";
import { getAnimatorPrompt } from "./prompts";
import { AnimatorOutputSchema } from "./schema";
import { AnimatorInput } from "./types";

export const animatorAgent = async (input: AnimatorInput) => {
  // Prepare messages with text and images
  const messages: any[] = [];

  if (input.images && input.images.length > 0) {
    // Vision input: combine text prompt with images
    const content: any[] = [{ type: "text", text: input.prompt }];

    // Add images to the content
    input.images.forEach((image: any) => {
      if (image.buffer) {
        // If it's a multer file with buffer
        const base64Image = image.buffer.toString("base64");
        const mimeType = image.mimetype || "image/jpeg";
        content.push({
          type: "image",
          image: `data:${mimeType};base64,${base64Image}`,
        });
      } else if (typeof image === "string") {
        // If it's already a data URL
        content.push({
          type: "image",
          image: image,
        });
      }
    });

    messages.push({
      role: "user",
      content,
    });
  } else {
    // Text-only input
    messages.push({
      role: "user",
      content: input.prompt,
    });
  }

  const animator = await generateObject({
    model: openrouter(input.model),
    system: getAnimatorPrompt({
      contextModel: input.contextModel,
      previousCode: input.previousCode,
    }).prompt,
    schema: AnimatorOutputSchema,
    messages,
  });

  return animator.object;
};
