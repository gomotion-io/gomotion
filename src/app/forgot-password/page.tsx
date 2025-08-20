import { ForgotPassword } from "@/components/forgot-password";
import { getUser } from "@/supabase/server-functions/users";
import { redirect } from "next/navigation";

const ForgotPasswordPage = async () => {
  const user = await getUser();

  if (user) {
    redirect("/explore");
  }

  return <ForgotPassword />;
};

export default ForgotPasswordPage;
