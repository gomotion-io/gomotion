import { validateUser } from "@/app/api/utils/validate-user";
import { getVideos } from "@/supabase/server-functions/videos";
import { NextRequest } from "next/server";

interface FetchVideosRequest {
  profileId: string;
}

export async function POST(request: NextRequest) {
  try {
    const { profileId } = (await request.json()) as FetchVideosRequest;

    await validateUser();

    const videos = await getVideos({ profileId });

    return Response.json(videos);
  } catch (error) {
    console.error("Fetch videos error:", error);
    return Response.json(
      {
        error: `Failed to fetch videos: ${(error as Error).message}`,
      },
      { status: 500 }
    );
  }
}
