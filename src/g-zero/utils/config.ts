import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const getModel = (model?: string) => {
  if (!model) {
    return openrouter("anthropic/claude-sonnet-4");
  }

  return openrouter(model);
};

// Export the provider instance for direct use
export { openrouter };
