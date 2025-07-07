import { mock } from "@/app/api/generate/utils/mock";

type GenerateVideo = {
  prompt: string;
  voiceId: string;
  aspectRatio: string;
};

export async function generateVideo({
  prompt,
  voiceId,
  aspectRatio,
}: GenerateVideo): Promise<Omit<Video, "id">> {
  // console.log("input", prompt, voiceId, aspectRatio);
  //
  // const response = await fetch(
  //   `${process.env.MASTRA_URL}/api/workflows/remotionWorkflow/start-async`,
  //   {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       inputData: {
  //         userRequest: {
  //           prompt,
  //           voiceId,
  //           aspectRatio,
  //         },
  //       },
  //       runtimeContext: {},
  //     }),
  //   },
  // );
  //
  // const data = await response.json();
  //
  // if (data.status !== "success") {
  //   console.log("API Error:", data);
  //   throw new Error(`Video generation failed with status: ${response.status}`);
  // }

  return mock;
}
