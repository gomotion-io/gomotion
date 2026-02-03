import { Viewer } from "@/components/viewer";
import { redirect } from "next/navigation";
import { getUser } from "@/supabase/server-functions/users";

export default async function ExplorePage() {
  const user = await getUser();

  if (!user) {
    redirect("/sign-in");
  }

  return <Viewer />;
}
