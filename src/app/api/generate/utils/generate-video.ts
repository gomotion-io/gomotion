import { mock } from "@/app/api/generate/utils/mock";

export async function generateVideo(prompt: string): Promise<Video> {
  console.log(prompt);
  // const response = await fetch(
  //   `${process.env.MASTRA_URL}/api/workflows/remotionWorkflow/start-async`,
  //   {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       inputData: {
  //         userRequest: prompt,
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
