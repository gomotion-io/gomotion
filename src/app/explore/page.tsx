import { Viewer } from "@/components/viewer";

export default async function Home() {
  // const supabase = await createClient();
  // const { data, error } = await supabase.auth.getUser();
  // if (error || !data?.user) {
  //   redirect("/sign-in");
  // }

  return <Viewer />;
}
