export type ModelProvider = {
  llm_provider: string;
  llm_model: string;
};

export const MODEL_PROVIDERS: ModelProvider[] = [
  { llm_provider: "google", llm_model: "gemini-2.5-pro-preview-05-06" },
  { llm_provider: "openai", llm_model: "gpt-4o" },
  { llm_provider: "anthropic", llm_model: "claude-4-sonnet" },
];
