import { createAdminClient } from "@/supabase/admin";
import { Json } from "@/supabase/generated/database.types";

type SaveVideo = {
  profileId: string;
  name: string;
  composition: Json;
};

export const saveVideo = async ({
  profileId,
  name,
  composition,
}: SaveVideo) => {
  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from("videos")
    .insert([{ profile_id: profileId, name, composition }])
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const getVideoById = async (id: string) => {
  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
};
