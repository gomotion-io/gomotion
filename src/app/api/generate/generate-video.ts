import { NextRequest } from "next/server";

const DEFAULT_LLM_PROVIDER = "google";
const DEFAULT_LLM_MODEL = "gemini-2.5-pro-preview-05-06";

export async function generateVideo(request: NextRequest) {
  const { prompt, llm_provider, llm_model } = await request.json();

  const response = await fetch("http://127.0.0.1:5000/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt,
      llm_provider: llm_provider ?? DEFAULT_LLM_PROVIDER,
      llm_model: llm_model ?? DEFAULT_LLM_MODEL,
    }),
  });

  if (!response.ok) {
    throw new Error(`Video generation failed (${response.status})`);
  }

  return response.json();
}
