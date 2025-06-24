"use server";

import { createAdminClient } from "@/supabase/admin";

export const getCounts = async (profileId: string): Promise<number> => {
  const supabase = await createAdminClient();

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
    .eq("profile_id", profileId)
    .gte("created_at", firstDayOfMonth)
    .lte("created_at", lastDayOfMonth);

  if (error) throw error;
  return count ?? 0;
};

export const createCount = async (profileId: string): Promise<void> => {
  const supabase = await createAdminClient();

  const { error } = await supabase
    .from("counts")
    .insert([{ profile_id: profileId }]);

  if (error) throw error;
};
