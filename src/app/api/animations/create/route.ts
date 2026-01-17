import { validateUser } from "@/app/api/utils/validate-user";
import { Json } from "@/supabase/generated/database.types";
import { createCount } from "@/supabase/server-functions/counts";
import { getProfile } from "@/supabase/server-functions/profile";
import { createVideo } from "@/supabase/server-functions/videos";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const prompt = formData.get("prompt") as string;
  const aspectRatio = formData.get("aspectRatio") as string;
  const context = formData.get("context") as string;
  const model = formData.get("model") as string;
  const voiceId = formData.get("voiceId") as string;

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

    // Create a new FormData to send to the Express backend
    const backendFormData = new FormData();

    // Add the required fields
    backendFormData.append("instruction", prompt);
    backendFormData.append(
      "metadata",
      `width: ${width}, height: ${height}, fps: 30`,
    );
    backendFormData.append("contextModel", context);
    backendFormData.append("model", model);
    backendFormData.append("apiKey", profile.open_router_api_key);

    // Add voiceId if provided
    if (voiceId) {
      backendFormData.append("voiceId", voiceId);
    }

    // Forward images if provided

    const images = formData.getAll("images");
    if (images && images.length > 0) {
      images.forEach((image) => {
        backendFormData.append("images", image);
      });
    }

    console.log("backendFormData", backendFormData);
    const response = await fetch(
      `${process.env.GOMOTION_AGENT_SERVER}/api/animations`,
      {
        method: "POST",
        body: backendFormData, // Send FormData directly
      },
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
      { status: 500 },
    );
  }
}
