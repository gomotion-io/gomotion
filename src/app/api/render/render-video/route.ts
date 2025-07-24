import { NextRequest } from "next/server";
import { validateUser } from "@/app/api/utils/validate-user";

interface RenderVideoRequest {
  runId: string;
  fileContent: string;
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
    const { runId, fileContent, meta }: RenderVideoRequest =
      await request.json();

    // Step 1: Validate user authentication
    await validateUser();

    // Step 2: Render the video
    const response = await fetch(`${process.env.EXPRESS_URL}/render`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ runId, fileContent, meta }),
    });

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Render video error:", error);
    return Response.json(
      { error: `Failed to render video: ${(error as Error).message}` },
      { status: 500 },
    );
  }
}
