import React from "react";
import { SignIn } from "@/components/sign-in";
import { getUser } from "@/supabase/server-functions/users";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const user = await getUser();

  if (user) {
    redirect("/explore");
  }

  return <SignIn />;
};

export default SignInPage;
