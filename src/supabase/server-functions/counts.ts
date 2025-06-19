"use server";

import { getProfile } from "@/supabase/server-functions/profile";
import { createClient } from "@/supabase/client";

export const createCount = async (): Promise<void> => {
  const supabase = createClient();
  const profile = await getProfile();

  const { error } = await supabase
    .from("counts")
    .insert([{ profile_id: profile.id }]);

  if (error) throw error;
};
