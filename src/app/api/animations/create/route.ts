import { validateCredit } from "@/app/api/utils/validate-credits";
import { validateUser } from "@/app/api/utils/validate-user";
import { WORKFLOW_ID } from "@/constant";
import { Json } from "@/supabase/generated/database.types";
import { createCount } from "@/supabase/server-functions/counts";
import { createVideo } from "@/supabase/server-functions/videos";
import { NextRequest } from "next/server";

interface GenerateAnimationRequest {
  prompt: string;
  aspectRatio: string;
  context: string;
  voiceId?: string;
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { prompt, aspectRatio, context, voiceId } =
    body as GenerateAnimationRequest;

  if (!prompt || !aspectRatio || !context) {
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
    const data = await generateComposition({
      prompt,
      width,
      height,
      context,
      voiceId,
    });

    await createCount(profile.id);

    const result = await createVideo({
      profileId: profile.id,
      composition: data as unknown as Json,
    });

    return Response.json(result);
  } catch (error) {
    console.error("Create animation error:", error);

    return Response.json(
      {
        error: `Failed to creating animation: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 }
    );
  }
}

async function generateComposition({
  prompt,
  width,
  height,
  context,
  voiceId,
}: {
  prompt: string;
  width: number;
  height: number;
  context: string;
  voiceId?: string;
}) {
  const agentUrl = process.env.MASTRA_AGENT_URL;
  if (!agentUrl) {
    throw new Error("MASTRA_AGENT_URL environment variable is not set");
  }

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

  const response = await fetch(
    `${agentUrl}/workflows/${WORKFLOW_ID}/start-async?runId=${runId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        inputData: {
          instruction: prompt,
          metadata: `width: ${width}, height: ${height} , fps: 30`,
          contextModel: context,
          ...(voiceId && { voiceId }),
        },
        runtimeContext: {},
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Mastra API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();

  const composition = {
    runId,
    result: data.result.output,
  };

  return composition;
}
