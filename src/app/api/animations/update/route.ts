import { pollMastraRun } from "@/app/api/utils/poll-mastra";
import { validateCredit } from "@/app/api/utils/validate-credits";
import { validateUser } from "@/app/api/utils/validate-user";
import { WORKFLOW_ID } from "@/constant";
import { Json } from "@/supabase/generated/database.types";
import { createCount } from "@/supabase/server-functions/counts";
import { updateVideo } from "@/supabase/server-functions/videos";
import { NextRequest } from "next/server";

interface GenerateAnimationRequest {
  videoId: string;
  aspectRatio: string;
  previousVideo: string;
  prompt: string;
  context: string;
  model: string;
  voiceId?: string;
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    videoId,
    prompt,
    aspectRatio,
    previousVideo,
    context,
    voiceId,
    model,
  } = body as GenerateAnimationRequest;

  if (!videoId || !prompt || !aspectRatio || !previousVideo || !context) {
    return Response.json(
      { error: "Missing or invalid required fields" },
      { status: 400 }
    );
  }

  const parts = aspectRatio.split(":");
  if (parts.length !== 2) {
    return Response.json(
      { error: "Invalid aspect ratio format" },
      { status: 400 }
    );
  }

  const width = Number(parts[0]);
  const height = Number(parts[1]);

  try {
    const user = await validateUser();
    const { profile } = await validateCredit(user.id);
    const data = await updateComposition({
      prompt,
      width,
      height,
      context,
      model,
      voiceId,
      previousCode: previousVideo,
    });

    await createCount(profile.id);

    const result = await updateVideo({
      id: videoId,
      composition: data as unknown as Json,
    });

    return Response.json(result);
  } catch (error) {
    console.error("Update animation error:", error);

    return Response.json(
      {
        error: `Failed to updating animation: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 }
    );
  }
}

async function updateComposition({
  prompt,
  width,
  height,
  context,
  model,
  voiceId,
  previousCode,
}: {
  prompt: string;
  width: number;
  height: number;
  context: string;
  model: string;
  voiceId?: string;
  previousCode: string;
}) {
  const agentUrl = process.env.MASTRA_AGENT_URL;
  if (!agentUrl) {
    throw new Error("MASTRA_AGENT_URL environment variable is not set");
  }

  // Create a run
  const createRunResponse = await fetch(
    `${agentUrl}/workflows/${WORKFLOW_ID}/create-run`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!createRunResponse.ok) {
    const errorText = await createRunResponse.text();
    throw new Error(
      `Failed to create run: ${createRunResponse.status} - ${errorText}`
    );
  }

  const { runId } = await createRunResponse.json();
  if (!runId) {
    throw new Error("Failed to obtain runId");
  }

  // Start the run
  const response = await fetch(
    `${agentUrl}/workflows/${WORKFLOW_ID}/start-async?runId=${runId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        inputData: {
          instruction: prompt,
          metadata: `width: ${width}, height: ${height}, fps: 30`,
          contextModel: context,
          previousCode,
          model,
          ...(voiceId && { voiceId }),
        },
        runtimeContext: {},
      }),
    }
  );

  // Check if the start request was successful
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Mastra API error: ${response.status} - ${errorText}`);
  }

  // Poll for run completion and get execution result
  const executionResultData = await pollMastraRun(runId);

  // Create composition from the result
  const composition = {
    runId,
    result: executionResultData.result.output,
  };

  return composition;
}
