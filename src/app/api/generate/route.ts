import { NextRequest } from "next/server";
import { validateUser } from "@/app/api/generate/utils/validate-user";
import { validateCredit } from "@/app/api/generate/utils/validate-credits";
import { generateVideo } from "@/app/api/generate/utils/generate-video";
import { recordUsage } from "@/app/api/generate/utils/record-usage";

interface GenerationRequest {
  prompt: string;
}

export async function POST(request: NextRequest) {
  try {
    const { prompt }: GenerationRequest = await request.json();

    // Step 1: Validate user authentication
    const user = await validateUser();

    // Step 2: Check credit limits
    const { profile } = await validateCredit(user.id);

    // Step 3: Generate video via mastra api
    const videoData = await generateVideo(prompt);

    // Step 4: Record usage and save video to database
    const result = await recordUsage(
      profile.id,
      videoData.result.projectName,
      videoData.result.fileSystem,
    );

    return Response.json(result);
  } catch (error) {
    console.error("Generate video error:", error);
    return Response.json(
      { error: `Failed to generate response: ${(error as Error).message}` },
      { status: 500 },
    );
  }
}
