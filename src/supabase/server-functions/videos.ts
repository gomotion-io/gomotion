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

export const getVideos = async (profileId: string) => {
  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from("videos")
    .select()
    .eq("profile_id", profileId);

  if (error) throw error;

  return data;
};

export const deleteVideo = async (id: string): Promise<void> => {
  const supabase = await createAdminClient();

  const { error } = await supabase.from("videos").delete().eq("id", id);

  if (error) throw error;
};
