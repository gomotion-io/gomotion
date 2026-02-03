import { validateUser } from "@/app/api/utils/validate-user";
import { Json } from "@/supabase/generated/database.types";
import { getProfile } from "@/supabase/server-functions/profile";
import { updateVideo } from "@/supabase/server-functions/videos";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const videoId = formData.get("videoId") as string;
  const prompt = formData.get("prompt") as string;
  const aspectRatio = formData.get("aspectRatio") as string;
  const context = formData.get("context") as string;
  const model = formData.get("model") as string;
  const voiceId = formData.get("voiceId") as string;
  const previousVideo = formData.get("previousVideo") as string;

  if (!videoId || !aspectRatio || !context) {
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

    // Create a new FormData to send to the Express backend
    const backendFormData = new FormData();

    // Add the required fields
    if (prompt) {
      backendFormData.append("instruction", prompt);
    }
    backendFormData.append(
      "metadata",
      `width: ${width}, height: ${height}, fps: 30`,
    );
    backendFormData.append("contextModel", context);
    backendFormData.append("model", model);

    // Add voiceId if provided
    if (voiceId) {
      backendFormData.append("voiceId", voiceId);
    }

    // Add previousVideo if provided
    if (previousVideo) {
      backendFormData.append("previousVideo", previousVideo);
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
      throw new Error("Failed to update composition");
    }

    const data = await response.json();

    const composition = {
      runId: data.runId,
      result: data.data.output,
    };

    // Step 4: Update video from db
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
