import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";

import { createClient } from "@/supabase/server";
import { linkProductToUser } from "@/supabase/server-functions/products";
import { getProfile } from "@/supabase/server-functions/profile";
import { getUser } from "@/supabase/server-functions/users";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  let next = searchParams.get("next") ?? "/explore";

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      if (type === "signup") {
        const user = await getUser();

        if (!user?.id) {
          throw new Error("User not found");
        }

        const profile = await getProfile(user.id);

        if (!profile) {
          throw new Error("Profile not found");
        }

        if (!profile?.products?.variant_id) {
          // link the user the free plan
          await linkProductToUser(user.id, "free");
        }
      }

      if (type === "recovery") {
        next = "/explore?settings=true";
      }

      // redirect user to specified redirect URL or root of app
      redirect(next);
    }
  }

  // redirect the user to an error page with some instructions
  redirect("/error");
}
