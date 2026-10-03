import { CompositionOutput } from "@/_type";
import { imagesToDataUrls } from "@/app/api/utils/images-to-data-urls";
import { validateUser } from "@/app/api/utils/validate-user";
import { createAnimation, Context } from "@/lib/agent";
import { DEFAULT_MODEL } from "@/lib/models";
import { Json } from "@/supabase/generated/database.types";
import { getProfile } from "@/supabase/server-functions/profile";
import { getVideo, updateVideo } from "@/supabase/server-functions/videos";
import { nanoid } from "nanoid";
import { NextRequest } from "next/server";

export const maxDuration = 300; // 5 minutes max for AI generation

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const videoId = formData.get("videoId") as string;
  const prompt = formData.get("prompt") as string;
  const aspectRatio = formData.get("aspectRatio") as string;
  const context = formData.get("context") as string;
  const model = formData.get("model") as string;

  if (!videoId || !prompt || !aspectRatio || !context) {
    return Response.json(
      { error: "Missing or invalid required fields" },
      { status: 400 },
    );
  }

  const parts = aspectRatio.split(":");
  if (parts.length !== 2) {
    return Response.json(
      { error: "Invalid aspect ratio format" },
      { status: 400 },
    );
  }

  const width = Number(parts[0]);
  const height = Number(parts[1]);

  try {
    const user = await validateUser();
    const profile = await getProfile(user.id);

    if (!profile) {
      return Response.json({ error: "Profile not found" }, { status: 404 });
    }

    // Validate that user has an OpenRouter API key
    if (!profile.open_router_api_key) {
      return Response.json(
        {
          error:
            "OpenRouter API key is required. Please add your API key in settings.",
        },
        { status: 400 },
      );
    }

    // Load the video to remix from the db, and make sure it belongs to the user
    const video = await getVideo({ id: videoId });
    const previousComposition =
      video?.composition as unknown as CompositionOutput | null;

    if (
      !video ||
      video.profile_id !== profile.id ||
      !previousComposition?.result
    ) {
      return Response.json({ error: "Video not found" }, { status: 404 });
    }

    // Process images if provided
    const images = await imagesToDataUrls(formData);

    // Use the local agent in remix mode to update the animation
    const animationResult = await createAnimation({
      instruction: prompt,
      metadata: `width: ${width}, height: ${height}, fps: 30`,
      contextModel: context as Context,
      model: model || DEFAULT_MODEL.value,
      apiKey: profile.open_router_api_key,
      images: images.length > 0 ? images : undefined,
      previousCode: previousComposition.result,
    });

    if (!animationResult.success || !animationResult.output) {
      return Response.json(
        {
          error: animationResult.error || "Failed to update animation",
        },
        { status: 500 },
      );
    }

    const composition = {
      runId: nanoid(),
      result: animationResult.output,
    };

    const result = await updateVideo({
      id: videoId,
      composition: composition as unknown as Json,
    });

    return Response.json(result);
  } catch (error) {
    console.error("Update animation error:", error);
    return Response.json(
      { error: `Failed to update animation: ${(error as Error).message}` },
      { status: 500 },
    );
  }
}
