import { generateVideo } from "@/app/api/generate/generate-video";
import { getCounts } from "@/supabase/server-functions/counts";
import { getProfile } from "@/supabase/server-functions/profile";
import { getUser } from "@/supabase/server-functions/users";

export async function POST() {
  try {
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
    const data = await generateVideo();

    // Record credit for successful generation
    // await createCount(profile.id);

    return Response.json(data);
  } catch (error) {
    console.error("Generate video error:", error);
    return Response.json(
      { error: `Failed to generate response: ${(error as Error).message}` },
      { status: 500 },
    );
  }
}
