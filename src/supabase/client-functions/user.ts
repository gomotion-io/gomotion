"use client";

import { User } from "@supabase/auth-js";
import { createClient } from "@/supabase/client";

export const getUser = async (): Promise<User | null> => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};
