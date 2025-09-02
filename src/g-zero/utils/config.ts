import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const openrouter = createOpenRouter({
  apiKey:
    "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",
});

export const getModel = (model?: string) => {
  if (!model) {
    return openrouter("anthropic/claude-sonnet-4");
  }

  return openrouter(model);
};

// Export the provider instance for direct use
export { openrouter };
