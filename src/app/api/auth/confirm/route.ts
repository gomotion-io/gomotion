import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";

import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import { getProfile } from "@/supabase/server-functions/profile";
import { linkProductToUser } from "@/supabase/server-functions/products";
import { getUser } from "@/supabase/server-functions/users";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/explore";

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      const user = await getUser();

      if (!user?.id) {
        throw new Error("User not found");
      }

      const profile = await getProfile();

      if (!profile) {
        throw new Error("Profile not found");
      }

      if (!profile?.products?.variant_id) {
        // link the user the free plan
        await linkProductToUser(user.id, "free");
      }

      // redirect user to specified redirect URL or root of app
      redirect(next);
    }
  }

  // redirect the user to an error page with some instructions
  redirect("/error");
}
