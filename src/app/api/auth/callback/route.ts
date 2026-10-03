import { NextResponse, type NextRequest } from "next/server";

import { createClient } from "@/supabase/server";
import { linkProductToUser } from "@/supabase/server-functions/products";
import {
  getProfile,
  syncProfileFromOAuth,
} from "@/supabase/server-functions/profile";

const DEFAULT_REDIRECT = "/explore";

// Only allow relative paths to avoid open redirects (e.g. `//evil.com`)
const getSafeRedirect = (next: string | null) =>
  next && next.startsWith("/") && !next.startsWith("//")
    ? next
    : DEFAULT_REDIRECT;

const getBaseUrl = (request: NextRequest, origin: string) => {
  // Behind a load balancer, the original host is in `x-forwarded-host`
  const forwardedHost = request.headers.get("x-forwarded-host");

  if (process.env.NODE_ENV === "development" || !forwardedHost) {
    return origin;
  }

  return `https://${forwardedHost}`;
};

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = getSafeRedirect(searchParams.get("next"));
  const baseUrl = getBaseUrl(request, origin);

  // The user cancelled or the provider returned an error
  if (!code) {
    const providerError = searchParams.get("error");
    const reason = providerError === "access_denied" ? "cancelled" : "auth";
    return NextResponse.redirect(`${baseUrl}/sign-in?error=${reason}`);
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    console.error("OAuth code exchange failed", error);
    return NextResponse.redirect(`${baseUrl}/sign-in?error=auth`);
  }

  // The session is valid at this point: a failure here must not block the
  // login, it is retried on the next sign-in.
  try {
    const profile = await getProfile(data.user.id);

    if (!profile.products?.variant_id) {
      // link the user to the free plan
      await linkProductToUser(data.user.id, "free");
    }

    await syncProfileFromOAuth(profile, data.user.user_metadata);
  } catch (profileError) {
    console.error("Failed to set up profile after sign-in", profileError);
  }

  return NextResponse.redirect(`${baseUrl}${next}`);
}
