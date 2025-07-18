import { NextRequest } from "next/server";
import { validateUser } from "@/app/api/utils/validate-user";
import { validateCredit } from "@/app/api/utils/validate-credits";
import { createCount } from "@/supabase/server-functions/counts";
import { saveVideo } from "@/supabase/server-functions/videos";
import { Json } from "@/supabase/generated/database.types";

interface GenerateAnimationRequest {
  prompt: string;
  voiceId: string;
  aspectRatio: string;
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, voiceId, aspectRatio }: GenerateAnimationRequest =
      await request.json();

    // Step 1: Validate user authentication
    const user = await validateUser();

    // Step 2: Check credit limits
    const { profile } = await validateCredit(user.id);

    // Step 3: Generate video via mastra api
    const [width, height] = aspectRatio.split(":").map(Number);

    const response = await fetch(
      `${process.env.EXPRESS_URL}/generate/animation`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputData: {
            instruction: prompt,
            metadata: `width: ${width}, height: ${height}`,
            voiceId,
          },
          runtimeContext: {},
        }),
      },
    );

    const data = await response.json();

    // Step 4: Record usage
    await createCount(profile.id);

    // Step 5: Save video to a database
    const result = await saveVideo({
      profileId: profile.id,
      composition: data as unknown as Json,
    });

    return Response.json(result);
  } catch (error) {
    console.error("Generate video error:", error);
    return Response.json(
      { error: `Failed to generate response: ${(error as Error).message}` },
      { status: 500 },
    );
  }
}
