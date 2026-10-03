export type Model = {
  name: string;
  value: string;
  icon: string;
  premuim?: boolean;
};

// OpenRouter model ids (https://openrouter.ai/models), Anthropic first.
// Every model must support structured outputs (the agent uses generateObject)
// and image input (users can attach reference images).
export const MODELS: Model[] = [
  {
    name: "Claude Opus 5.5",
    value: "anthropic/claude-opus-5.5",
    icon: "/models-icons/anthropic.svg",
    premuim: false,
  },
  {
    name: "Claude Sonnet 5.5",
    value: "anthropic/claude-sonnet-5.5",
    icon: "/models-icons/anthropic.svg",
    premuim: false,
  },
  {
    name: "Claude Fable 5.1",
    value: "anthropic/claude-fable-5.1",
    icon: "/models-icons/anthropic.svg",
    premuim: false,
  },
  {
    name: "GPT 6.1 Sol",
    value: "openai/gpt-6.1-sol",
    icon: "/models-icons/openai.svg",
    premuim: false,
  },
  {
    name: "GPT 6 Astra",
    value: "openai/gpt-6-astra",
    icon: "/models-icons/openai.svg",
    premuim: false,
  },
  {
    name: "Gemini 3.1 Pro Preview",
    value: "google/gemini-3.1-pro-preview",
    icon: "/models-icons/google.svg",
    premuim: false,
  },
  {
    name: "Gemini 3.8 Flash",
    value: "google/gemini-3.8-flash",
    icon: "/models-icons/google.svg",
    premuim: false,
  },
  {
    name: "Kimi K3",
    value: "moonshotai/kimi-k3",
    icon: "/models-icons/kimi.png",
    premuim: false,
  },
  {
    name: "Grok 4.7",
    value: "x-ai/grok-4.7",
    icon: "/models-icons/xai.svg",
    premuim: false,
  },
];

export const DEFAULT_MODEL = MODELS[0];
