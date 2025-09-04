"use client";

import { MastraOutput } from "@/_type";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useParamStore } from "@/store/params.store";
import { useVideoStore } from "@/store/video.store";
import { format } from "date-fns";
import { Check, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export function VideoHistory() {
  const router = useRouter();
  const { videos, loading, remove, reset: resetVideo } = useVideoStore();
  const resetParams = useParamStore((state) => state.reset);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<string | null>(null);
  const [videosToDelete, setVideosToDelete] = useState<string[]>([]);
  const [selectedVideos, setSelectedVideos] = useState<Set<string>>(new Set());
  const [isBulkMode, setIsBulkMode] = useState(false);

  const confirmDelete = async () => {
    if (videoToDelete) {
      await remove(videoToDelete);
    }
    setIsDialogOpen(false);
    setVideoToDelete(null);
  };

  const handleBulkDelete = () => {
    setVideosToDelete(Array.from(selectedVideos));
    setIsDialogOpen(true);
  };

  const confirmBulkDelete = async () => {
    for (const videoId of videosToDelete) {
      await remove(videoId);
    }
    setIsDialogOpen(false);
    setVideosToDelete([]);
    setSelectedVideos(new Set());
    setIsBulkMode(false);
  };

  const handleSelectVideo = (id: string) => {
    return () => {
      if (!isBulkMode) {
        resetVideo();
        resetParams();
        router.push(`/explore/${id}`);
      }
    };
  };

  const toggleVideoSelection = (videoId: string) => {
    const newSelected = new Set(selectedVideos);
    if (newSelected.has(videoId)) {
      newSelected.delete(videoId);
    } else {
      newSelected.add(videoId);
    }
    setSelectedVideos(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedVideos.size === videos.length) {
      setSelectedVideos(new Set());
    } else {
      setSelectedVideos(new Set(videos.map((video) => video.id)));
    }
  };

  const toggleBulkMode = () => {
    setIsBulkMode(!isBulkMode);
    setSelectedVideos(new Set());
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
          className="w-80 h-96 overflow-y-auto flex flex-col gap-1.5 p-0 "
          align="end"
        >
          {/* Bulk Operations Header */}
          <div className="flex items-center justify-between p-3 border-b mb-1 bg-accent">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleBulkMode}
                className="h-7 px-2 text-xs"
              >
                {isBulkMode ? (
                  <>
                    <X className="w-3 h-3 mr-1" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Check className="w-3 h-3 mr-1" />
                    Select videos
                  </>
                )}
              </Button>
              {isBulkMode && videos.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleSelectAll}
                  className="h-7 px-2 text-xs"
                >
                  {selectedVideos.size === videos.length
                    ? "Deselect All"
                    : "Select All"}
                </Button>
              )}
            </div>
            {isBulkMode && selectedVideos.size > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleBulkDelete}
                className="h-7 px-2 text-xs"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Delete ({selectedVideos.size})
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-2 px-3">
            {loading && (
              <div className="flex flex-col gap-1">
                <Card className="animate-pulse bg-accent" />
                <Card className="animate-pulse bg-accent" />
                <Card className="animate-pulse bg-accent" />
                <Card className="animate-pulse bg-accent" />
              </div>
            )}
            {videos.map((video) => (
              <Button
                key={video.id}
                variant={
                  selectedVideos.has(video.id) ? "brandOutline" : "outline"
                }
                className={cn(
                  "flex items-center justify-between h-14 px-3 py-2 rounded-lg border"
                )}
              >
                {isBulkMode && (
                  <Checkbox
                    checked={selectedVideos.has(video.id)}
                    onCheckedChange={() => toggleVideoSelection(video.id)}
                    className="mr-2 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                  />
                )}
                <button
                  onClick={handleSelectVideo(video.id)}
                  className="flex flex-col gap-0.5 flex-1 min-w-0"
                  disabled={isBulkMode}
                >
                  <div className="text-sm truncate text-start font-medium">
                    {(video?.composition as unknown as MastraOutput)?.result
                      ?.title || "Untitled"}
                  </div>
                  <div className="text-xs text-start truncate text-muted-foreground font-medium">
                    {format(new Date(video.created_at), "d MMMM HH:mm")}
                  </div>
                </button>
              </Button>
            ))}
            {!loading && videos.length === 0 && (
              <div className="flex h-full items-center justify-center">
                <div className="text-muted-foreground text-center font-medium text-sm ">
                  No videos yet
                </div>
              </div>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {videosToDelete.length > 1 ? "Delete Videos" : "Delete Video"}
            </DialogTitle>
            <DialogDescription>
              {videosToDelete.length > 1
                ? `Are you sure you want to delete ${videosToDelete.length} videos? This action cannot be undone.`
                : "Are you sure you want to delete this video? This action cannot be undone."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDialogOpen(false);
                setVideoToDelete(null);
                setVideosToDelete([]);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={
                videosToDelete.length > 0 ? confirmBulkDelete : confirmDelete
              }
            >
              Delete{" "}
              {videosToDelete.length > 1 ? `(${videosToDelete.length})` : ""}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
