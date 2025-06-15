import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { prompt, llm_provider, llm_model } = await request.json();

    const safePrompt =
      (prompt as string | undefined)?.replace(/`/g, "'") ?? "Hello, Remotion!";

    const response = await fetch("http://127.0.0.1:5000/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: safePrompt,
        llm_provider: llm_provider || "google",
        llm_model: llm_model || "gemini-2.5-pro-preview-05-06",
      }),
    });

    const data = await response.json();
    console.log(data);
    return Response.json(data);
  } catch (error) {
    console.error("Error generating response:", error);
    return Response.json(
      { error: "Failed to generate response" },
      { status: 500 },
    );
  }
}
