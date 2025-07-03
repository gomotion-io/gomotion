import { createAdminClient } from "@/supabase/admin";

type SaveVideo = {
  profileId: string;
  video: Omit<Video, "id">;
};

export const saveVideo = async ({ profileId, video }: SaveVideo) => {
  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from("videos")
    .insert([{ ...video, profile_id: profileId }])
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
