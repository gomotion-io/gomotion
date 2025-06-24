"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useVideoStore } from "@/store/video.store";
import { createClient } from "@/supabase/client";
import { useEffect } from "react";
import { getProfile } from "@/supabase/server-functions/profile";
import { useRouter } from "next/navigation";

export function VideoHistory() {
  const router = useRouter();
  const supabase = createClient();
  const { videos, loading, fetchVideos, subscribe } = useVideoStore();

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const profile = await getProfile(user.id);

      await fetchVideos(profile.id);
      subscribe(profile.id);
    })();
    // We only want to run this once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">History</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 h-80 overflow-y-auto flex flex-col gap-1"
        align="end"
      >
        {loading && (
          <div className="flex flex-col gap-1">
            <Card className="animate-pulse bg-accent" />
            <Card className="animate-pulse bg-accent" />
            <Card className="animate-pulse bg-accent" />
            <Card className="animate-pulse bg-accent" />
          </div>
        )}
        {videos.map((video) => (
          <button
            key={video.id}
            onClick={() => router.push("/explore")}
            className="flex px-3 hover:bg-accent h-12 rounded-lg items-center border"
          >
            <div className="text-sm w-64 truncate font-medium">
              {video.name}
            </div>
          </button>
        ))}
        {!loading && videos.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <div className="text-muted-foreground text-center font-medium text-sm ">
              No videos yet
            </div>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
