"use server";

import { User } from "@supabase/auth-js";
import { createClient } from "@/supabase/server";

export const getUser = async (): Promise<User | null> => {
  const supabase = await createClient();
  const response = await supabase.auth.getUser();

  return response.data.user;
};
