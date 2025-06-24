import { getProfile } from "@/supabase/server-functions/profile";
import { getCounts } from "@/supabase/server-functions/counts";

export async function validateCredit(userId: string) {
  const profile = await getProfile(userId);
  const usageCount = await getCounts(profile.id);

  if (!profile.products) {
    throw new Error("No product found");
  }

  if (usageCount >= profile.products.limit) {
    throw new Error("Insufficient credits");
  }

  return { profile, usageCount };
}
