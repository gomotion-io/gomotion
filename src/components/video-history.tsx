"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useVideoStore } from "@/store/video.store";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { GomotionSpec } from "@/gomotion-compiler/spec";

export function VideoHistory() {
  const router = useRouter();
  const { videos, loading } = useVideoStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          History
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 h-80 overflow-y-auto flex flex-col gap-1"
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
            onClick={() => router.push(`/explore/${video.id}`)}
            className="flex flex-col gap-0.5 px-3 bg-accent/50 hover:bg-accent h-14 rounded-lg justify-center border"
          >
            <div className="text-sm w-52 truncate text-start font-medium">
              {(video?.composition as unknown as GomotionSpec).meta.name}
            </div>
            <div className="text-xs text-start w-52 truncate text-stone-100/50 font-medium">
              {format(new Date(video.created_at), "d MMMM HH:mm")}
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
