import React from "react";
import { SignIn } from "@/components/sign-in";
import { getUser } from "@/supabase/server-functions/users";
import { redirect } from "next/navigation";

// Errors set by /api/auth/callback
const errorMessages: Record<string, string> = {
  cancelled: "Sign-in was cancelled. Please try again.",
  auth: "We couldn't sign you in. Please try again.",
};

type SignInPageProps = {
  searchParams: Promise<{ error?: string }>;
};

const SignInPage = async ({ searchParams }: SignInPageProps) => {
  const user = await getUser();

  if (user) {
    redirect("/explore");
  }

  const { error } = await searchParams;

  return (
    <SignIn
      error={error ? (errorMessages[error] ?? errorMessages.auth) : null}
    />
  );
};

export default SignInPage;
