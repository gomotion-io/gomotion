import { PromptInput } from "@/components/prompt-input";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import { Player } from "@/components/player";

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-col min-w-0 h-[100svh] items-center gap-5  px-5 sm:px-10">
      <div className="w-full max-w-3xl flex flex-col min-w-0 flex-1 items-center sm:px-5 py-5 gap-5">
        <Player />
        <PromptInput />
      </div>
    </div>
  );
}
