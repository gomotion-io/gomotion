import { validateUser } from "@/app/api/utils/validate-user";
import { getVideo } from "@/supabase/server-functions/videos";
import { NextRequest } from "next/server";

interface FetchVideoRequest {
  id: string;
}

export async function POST(request: NextRequest) {
  try {
    const { id } = (await request.json()) as FetchVideoRequest;

    await validateUser();

    const video = await getVideo({ id });

    return Response.json(video);
  } catch (error) {
    console.error("Fetch video error:", error);
    return Response.json(
      { error: `Failed to fetch video: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
