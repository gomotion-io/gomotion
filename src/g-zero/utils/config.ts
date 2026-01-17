import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export const createOpenRouterClient = (apiKey: string) => {
  return createOpenRouter({
    apiKey,
  });
};

export const getModel = (apiKey: string, model?: string) => {
  const openrouter = createOpenRouterClient(apiKey);

  if (!model) {
    return openrouter("anthropic/claude-sonnet-4");
  }

  return openrouter(model);
};
