import { getUser } from "@/supabase/server-functions/users";

export async function validateUser() {
  const user = await getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}
