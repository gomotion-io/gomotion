"use server";

import { createClient } from "@/supabase/server";

interface ProfileData extends Profile {
  products: {
    limit: number;
    variant_id: string;
  };
}

export const getProfile = async (): Promise<ProfileData> => {
  const supabase = await createClient();
  const response = await supabase.auth.getUser();
  const userId = response.data?.user?.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

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
