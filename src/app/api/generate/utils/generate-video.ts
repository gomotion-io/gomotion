import type { GomotionSpec } from "@/gomotion-compiler/spec";

type GenerateVideo = {
  prompt: string;
  voiceId: string;
  aspectRatio: string;
};

const DEFAULT_FPS = 30;

export async function generateVideo({
  prompt,
  voiceId,
  aspectRatio,
}: GenerateVideo): Promise<GomotionSpec> {
  const [width, height] = aspectRatio.split(":").map(Number);

  console.log({ voiceId, width, height, fps: DEFAULT_FPS });

  const response = await fetch(
    `${process.env.MASTRA_URL}/api/workflows/remotionWorkflow/start-async`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        inputData: {
          prompt,
          meta: { width, height, fps: DEFAULT_FPS, voiceId },
        },
        runtimeContext: {},
      }),
    },
  );

  const data = await response.json();

  if (data.status !== "success") {
    console.log("API Error:", data);
    throw new Error(`Video generation failed with status: ${response.status}`);
  }

  return {
    meta: {
      name: data.name as string,
      width,
      height,
      fps: DEFAULT_FPS,
    },
    layers: data.layers ?? [],
  };
}
