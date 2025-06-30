import Viewer from "@/components/viewer";
import type { FileSystemTree } from "@webcontainer/api";
import { redirect } from "next/navigation";
import { getVideoById } from "@/supabase/server-functions/videos";
import { getUser } from "@/supabase/server-functions/users";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ExplorePage({ params }: PageProps) {
  const { id } = await params;

  const user = await getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const video = await getVideoById(id);

  if (!video || !video.composition) {
    // If no video or composition found, fallback to the base explore page
    redirect("/explore");
  }

  return (
    <Viewer composition={video.composition as unknown as FileSystemTree} />
  );
}
