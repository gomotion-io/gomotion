import { createAdminClient } from "@/supabase/admin";
import { Json } from "@/supabase/generated/database.types";

type CreateVideo = {
  profileId: string;
  composition: Json;
};

export const createVideo = async ({ profileId, composition }: CreateVideo) => {
  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from("videos")
    .insert([{ composition, profile_id: profileId }])
    .select()
    .single();

  if (error) throw error;

  return data;
};

type UpdateVideo = {
  id: string;
  composition: Json;
};

export const updateVideo = async ({ id, composition }: UpdateVideo) => {
  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from("videos")
    .update({ composition })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

type GetVideos = {
  profileId: string;
};

export const getVideos = async ({ profileId }: GetVideos) => {
  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("profile_id", profileId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

type GetVideo = {
  id: string;
};

export const getVideo = async ({ id }: GetVideo) => {
  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
};
