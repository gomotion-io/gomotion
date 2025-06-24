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

export function VideoHistory() {
  const supabase = createClient();
  const { videos, loading, fetchVideos, subscribe } = useVideoStore();

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      fetchVideos(user.id);
      subscribe(user.id);
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
        className="w-64 h-80 overflow-y-auto flex flex-col gap-2"
        align="end"
      >
        {loading && <Card className="h-10 animate-pulse" />}
        {videos.map((video) => (
          <Card
            key={video.id}
            className="h-10 flex items-center px-3 hover:bg-accent"
          >
            {video.name ?? "Untitled"}
          </Card>
        ))}
        {!loading && videos.length === 0 && (
          <p className="text-muted-foreground text-center py-4">
            No videos yet
          </p>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
