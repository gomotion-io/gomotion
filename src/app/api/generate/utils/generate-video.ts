import { MastraOutput } from "@/_type";

type GenerateVideo = {
  prompt: string;
  voiceId: string;
  aspectRatio: string;
};

export async function generateVideo({
  prompt,
  voiceId,
  aspectRatio,
}: GenerateVideo): Promise<MastraOutput> {
  const [width, height] = aspectRatio.split(":").map(Number);

  const response = await fetch(
    `${process.env.MASTRA_URL}/api/workflows/remotionWorkflow/start-async`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        inputData: {
          instruction: prompt,
          metadata: `width: ${width}, height: ${height}, voiceId: ${voiceId}`,
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

  return data.result;
}
