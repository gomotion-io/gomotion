import { getUser } from "@/supabase/server-functions/users";
import { Header } from "@/components/header";

export const HeaderWrapper = async () => {
  const user = await getUser();
  return <Header user={user} />;
};
