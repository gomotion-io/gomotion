import { validateUser } from "@/app/api/utils/validate-user";
import { createAnimation, Context } from "@/lib/agent";
import { Json } from "@/supabase/generated/database.types";
import { getProfile } from "@/supabase/server-functions/profile";
import { createVideo } from "@/supabase/server-functions/videos";
import { nanoid } from "nanoid";
import { NextRequest } from "next/server";

export const maxDuration = 300; // 5 minutes max for AI generation

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const prompt = formData.get("prompt") as string;
  const aspectRatio = formData.get("aspectRatio") as string;
  const context = formData.get("context") as string;
  const model = formData.get("model") as string;

  if (!prompt || !aspectRatio || !context) {
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

    // Process images if provided
    const imageFiles = formData.getAll("images") as File[];
    const images: string[] = [];

    if (imageFiles && imageFiles.length > 0) {
      for (const imageFile of imageFiles) {
        if (imageFile instanceof File && imageFile.size > 0) {
          const buffer = await imageFile.arrayBuffer();
          const base64 = Buffer.from(buffer).toString("base64");
          const mimeType = imageFile.type || "image/jpeg";
          images.push(`data:${mimeType};base64,${base64}`);
        }
      }
    }

    // Use the local agent to create animation
    const animationResult = await createAnimation({
      instruction: prompt,
      metadata: `width: ${width}, height: ${height}, fps: 30`,
      contextModel: context as Context,
      model: model || "anthropic/claude-sonnet-4",
      apiKey: profile.open_router_api_key,
      images: images.length > 0 ? images : undefined,
    });

    if (!animationResult.success || !animationResult.output) {
      return Response.json(
        {
          error: animationResult.error || "Failed to generate animation",
        },
        { status: 500 },
      );
    }

    // Generate a unique run ID
    const runId = nanoid();

    const composition = {
      runId,
      result: animationResult.output,
    };

    const result = await createVideo({
      profileId: profile.id,
      composition: composition as unknown as Json,
    });

    return Response.json(result);
  } catch (error) {
    console.error("Create animation error:", error);

    return Response.json(
      {
        error: `Failed to create animation: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 },
    );
  }
}
