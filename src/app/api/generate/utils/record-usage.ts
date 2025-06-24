import { Json } from "@/supabase/generated/database.types";
import { createCount } from "@/supabase/server-functions/counts";
import { saveVideo } from "@/supabase/server-functions/videos";

export async function recordUsage(
  profileId: string,
  projectName: string,
  fileSystem: Json,
) {
  // Record credit for successful generation
  await createCount(profileId);

  // Save generation to database
  const result = await saveVideo({
    profileId,
    name: projectName,
    composition: fileSystem,
  });

  return result;
}
