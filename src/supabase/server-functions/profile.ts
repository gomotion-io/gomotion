"use server";

import { createClient } from "@/supabase/server";
import { ProfileData } from "@/_type";

export const getProfile = async (userId: string): Promise<ProfileData> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select(
      `
    *,
    products (
      limit,
      variant_id
    )
  `,
    )
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
};
