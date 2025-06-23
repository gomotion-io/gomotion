import { getCounts } from "@/supabase/server-functions/counts";
import { getProfile } from "@/supabase/server-functions/profile";
import { getUser } from "@/supabase/server-functions/users";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    // Ensure the user is authenticated
    const user = await getUser();
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check credit limits
    const profile = await getProfile(user.id);
    const usageCount = await getCounts(profile.id);

    if (usageCount >= profile.products.limit) {
      return Response.json(
        {
          rateLimit: true,
          limit: profile.products.limit,
          message: "Insufficient credits!",
        },
        { status: 401 },
      );
    }

    // Generate video
    const response = await fetch(
      `${process.env.MASTRA_URL}/api/workflows/remotionWorkflow/start-async`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputData: {
            userRequest: prompt,
          },
          runtimeContext: {},
        }),
      },
    );

    const data = await response.json();

    if (data.status !== "success") {
      return Response.json({ error: response.status });
    }

    const fileSystem = data.result.fileSystem;

    // Record credit for successful generation
    // await createCount(profile.id);

    console.log(fileSystem);
    return Response.json(fileSystem);
  } catch (error) {
    console.error("Generate video error:", error);
    return Response.json(
      { error: `Failed to generate response: ${(error as Error).message}` },
      { status: 500 },
    );
  }
}
