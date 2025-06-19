import { createClient } from "@/supabase/client";

interface ProfileData extends Profile {
  products: {
    limit: number;
    variant_id: string;
  };
}

export const getProfile = async (userId: string): Promise<ProfileData> => {
  const supabase = createClient();

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
