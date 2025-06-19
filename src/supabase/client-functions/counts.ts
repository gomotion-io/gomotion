import { createAdminClient } from "@/supabase/admin";
import { getProfile } from "@/supabase/server-functions/profile";

export const getCounts = async (): Promise<number> => {
  const supabase = await createAdminClient();
  const profile = await getProfile();

  const now = new Date();
  const firstDayOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1,
  ).toISOString();
  const lastDayOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
  ).toISOString();

  const { count, error } = await supabase
    .from("counts")
    .select("*", { count: "exact", head: true })
    .eq("profile_id", profile.id)
    .gte("created_at", firstDayOfMonth)
    .lte("created_at", lastDayOfMonth);

  if (error) throw error;
  return count ?? 0;
};
