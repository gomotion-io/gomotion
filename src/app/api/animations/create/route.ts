import { validateCredit } from "@/app/api/utils/validate-credits";
import { validateUser } from "@/app/api/utils/validate-user";
import { Json } from "@/supabase/generated/database.types";
import { createCount } from "@/supabase/server-functions/counts";
import { createVideo } from "@/supabase/server-functions/videos";
import { NextRequest } from "next/server";

interface GenerateAnimationRequest {
  prompt: string;
  aspectRatio: string;
  context: string;
  model: string;
  voiceId?: string;
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { prompt, aspectRatio, context, model } =
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

    const response = await fetch(
      `${process.env.GOMOTION_AGENT_SERVER}/api/animations`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instruction: prompt,
          metadata: `width: ${width}, height: ${height} , fps: 30`,
          contextModel: context,
          model,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create composition");
    }

    const data = await response.json();

    const composition = {
      runId: data.runId,
      result: data.data.output,
    };

    await createCount(profile.id);

    const result = await createVideo({
      profileId: profile.id,
      composition: composition as unknown as Json,
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
