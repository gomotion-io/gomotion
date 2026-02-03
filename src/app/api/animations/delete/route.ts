import { validateUser } from "@/app/api/utils/validate-user";
import { deleteVideo } from "@/supabase/server-functions/videos";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();
    const user = await validateUser();
    await deleteVideo({ id, profileId: user.id });
    return Response.json({ success: true });
  } catch (error) {
    console.error("Delete video error:", error);
    return Response.json(
      { error: `Failed to delete video: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
