import { NextRequest } from "next/server";
import { validateUser } from "@/app/api/generate/utils/validate-user";
import { validateCredit } from "@/app/api/generate/utils/validate-credits";
import { generateVideo } from "@/app/api/generate/utils/generate-video";
import { createCount } from "@/supabase/server-functions/counts";
import { saveVideo } from "@/supabase/server-functions/videos";

interface GenerationRequest {
  prompt: string;
  voiceId: string;
  aspectRatio: string;
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, voiceId, aspectRatio }: GenerationRequest =
      await request.json();

    // Step 1: Validate user authentication
    const user = await validateUser();

    // Step 2: Check credit limits
    const { profile } = await validateCredit(user.id);

    // Step 3: Generate video via mastra api
    const videoData = await generateVideo({ prompt, voiceId, aspectRatio });

    // Step 4: Record usage and save video to database
    await createCount(profile.id);

    const result = await saveVideo({
      profileId: profile.id,
      video: videoData,
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
