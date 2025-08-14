"use client";

import { MastraOutput } from "@/_type";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useVideoStore } from "@/store/video.store";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export function VideoHistory() {
  const router = useRouter();
  const { videos, loading, remove } = useVideoStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setVideoToDelete(id);
    setIsDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (videoToDelete) {
      await remove(videoToDelete);
    }
    setIsDialogOpen(false);
    setVideoToDelete(null);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            History <ChevronDownIcon className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          data-lenis-prevent
          className="w-64 h-96 overflow-y-auto flex flex-col gap-1.5"
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
            <div
              key={video.id}
              className="flex items-center justify-between px-3 py-2 bg-accent/50 hover:bg-accent rounded-lg border"
            >
              <button
                onClick={() => router.push(`/explore/${video.id}`)}
                className="flex flex-col gap-0.5 flex-1"
              >
                <div className="text-sm truncate text-start font-medium w-40">
                  {(video?.composition as unknown as MastraOutput)?.result
                    ?.title || "Untitled"}
                </div>
                <div className="text-xs text-start truncate text-muted-foreground font-medium">
                  {format(new Date(video.created_at), "d MMMM HH:mm")}
                </div>
              </button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(video.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Video</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this video? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
