import { validateUser } from "@/app/api/utils/validate-user";
import { getProfile } from "@/supabase/server-functions/profile";
import { NextRequest } from "next/server";

interface RenderVideoRequest {
  runId: string;
  fileTree: Record<string, string>;
  meta: {
    inputProps: {
      width: number;
      height: number;
      fps: number;
      durationInFrames: number;
    };
  };
}

export async function POST(request: NextRequest) {
  try {
    const { runId, fileTree, meta }: RenderVideoRequest = await request.json();

    // Step 1: Validate user authentication
    const user = await validateUser();

    // Step 1.5: Validate subscription
    const profile = await getProfile(user.id);
    if (profile.subscription_status !== "active") {
      return Response.json(
        { error: "Paid subscription required to export video" },
        { status: 403 }
      );
    }

    // Step 2: Render the video
    const GOMOTION_AGENT_SERVER = process.env.GOMOTION_AGENT_SERVER;

    if (!GOMOTION_AGENT_SERVER) {
      throw new Error("Error: GOMOTION_AGENT_SERVER environment variable is not set");
    }

    const response = await fetch(`${GOMOTION_AGENT_SERVER}/api/render`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ runId, fileTree, meta }),
    });

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Render video error:", error);
    return Response.json(
      { error: `Failed to render video: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
