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

// Fill empty profile fields from the OAuth provider metadata (Google and GitHub
// both expose `full_name` and `avatar_url` once normalized by Supabase).
export const syncProfileFromOAuth = async (
  profile: ProfileData,
  metadata: Record<string, unknown>,
): Promise<void> => {
  const fullName =
    typeof metadata.full_name === "string" ? metadata.full_name : null;
  const avatarUrl =
    typeof metadata.avatar_url === "string" ? metadata.avatar_url : null;

  const updates: Partial<Profile> = {};
  if (!profile.full_name && fullName) updates.full_name = fullName;
  if (!profile.avatar_url && avatarUrl) updates.avatar_url = avatarUrl;

  if (Object.keys(updates).length === 0) return;

  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", profile.id);

  if (error) throw error;
};

export const updateOpenRouterApiKey = async (
  userId: string,
  apiKey: string
): Promise<void> => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .update({ open_router_api_key: apiKey })
    .eq("id", userId);

  if (error) throw error;
};
