import React from "react";
import { Register } from "@/components/register";
import { getUser } from "@/supabase/server-functions/users";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const user = await getUser();

  if (user) {
    redirect("/explore");
  }

  return <Register />;
};

export default RegisterPage;
