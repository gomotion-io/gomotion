import { validateUser } from "@/app/api/utils/validate-user";
import { NextRequest } from "next/server";

interface RenderProgressRequest {
  bucketName: string;
  renderId: string;
}

export async function POST(request: NextRequest) {
  try {
    const { bucketName, renderId }: RenderProgressRequest =
      await request.json();

    // Step 1: Validate user authentication
    await validateUser();

    // Step 2: get the progress status of the render
    const EXPRESS_URL = process.env.EXPRESS_URL;

    if (!EXPRESS_URL) {
      throw new Error("Error: EXPRESS_URL environment variable is not set");
    }

    const response = await fetch(`${EXPRESS_URL}/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bucketName, renderId }),
    });

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Render progress error:", error);
    return Response.json(
      { error: `Failed to get render progress: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
