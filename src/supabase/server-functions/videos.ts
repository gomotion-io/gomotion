import { createAdminClient } from "@/supabase/admin";
import { Json } from "@/supabase/generated/database.types";

type SaveVideo = {
  profileId: string;
  composition: Json;
};

export const saveVideo = async ({ profileId, composition }: SaveVideo) => {
  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from("videos")
    .insert([{ composition, profile_id: profileId }])
    .select()
    .single();

  if (error) throw error;

  return data;
};
