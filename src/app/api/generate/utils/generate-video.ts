import { Json } from "@/supabase/generated/database.types";

interface WorkflowResponse {
  status: string;
  result: {
    projectName: string;
    fileSystem: Json;
  };
}

export async function generateVideo(prompt: string): Promise<WorkflowResponse> {
  const response = await fetch(
    `${process.env.MASTRA_URL}/api/workflows/remotionWorkflow/start-async`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        inputData: {
          userRequest: prompt,
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

  return data;
}
