"use client";

import { Button } from "@/components/ui/button";
import { CircularProgress } from "@/components/ui/circular-progress";
import { VideoHistory } from "@/components/video-history";
import { useParamStore } from "@/store/params.store";
import { useRenderStore } from "@/store/render.store";
import { useUiStore } from "@/store/ui.store";
import { useUserStore } from "@/store/user.store";
import { useVideoStore } from "@/store/video.store";
import { PlusIcon } from "@heroicons/react/16/solid";
import { SparklesIcon } from "@heroicons/react/20/solid";
import { SettingsIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { SettingsDialog } from "./settings-dialog";

export const Profile = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { profile } = useUserStore();
  const video = useVideoStore((state) => state.currentVideo);
  const renderVideo = useRenderStore((state) => state.renderVideo);
  const progress = useRenderStore((state) => state.state);
  const setIsSettingsDialogOpen = useUiStore(
    (state) => state.setIsSettingsDialogOpen
  );
  const resetVideo = useVideoStore((state) => state.reset);
  const setPrompt = useParamStore((state) => state.setPrompt);

  const handleCreateNew = () => {
    // Clear current video and prompt then navigate to a clean explorer page
    resetVideo();
    setPrompt("");
    router.push("/explore");
  };

  useEffect(() => {
    if (searchParams.get("settings") === "true") {
      setIsSettingsDialogOpen(true);
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("settings");
      router.replace(`${pathname}?${newParams.toString()}`);
    }
  }, [searchParams, pathname, router, setIsSettingsDialogOpen]);

  return (
    <>
      <div className="flex flex-col gap-5 h-24 w-full items-center justify-center">
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center gap-3">
            <Button onClick={handleCreateNew}>
              Create new <PlusIcon />
            </Button>
            <Button
              onClick={() => {
                if (profile?.subscription_status !== "active") {
                  router.push("/pricing");
                  return;
                }
                renderVideo();
              }}
              variant="brandOutline"
              className="hidden sm:block z-10"
              disabled={
                !video ||
                !video.composition ||
                progress.status === "rendering" ||
                progress.status === "invoking"
              }
            >
              {progress.status === "invoking" ? (
                <div className="h-full flex items-center justify-center gap-2 text-indigo-500">
                  Preparing...
                </div>
              ) : progress.status === "rendering" ? (
                <div className="flex items-center gap-2">
                  <CircularProgress
                    progress={
                      "progress" in progress
                        ? Math.round(progress.progress * 100)
                        : 0
                    }
                  />
                  <div className="h-full flex items-center justify-center gap-2 text-indigo-500">
                    Exporting...
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center gap-2 text-indigo-500">
                  Export video <SparklesIcon className="w-4 h-4" />
                </div>
              )}
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <VideoHistory />
            <Button
              variant="outline"
              onClick={() => setIsSettingsDialogOpen(true)}
            >
              Settings <SettingsIcon />
            </Button>
          </div>
        </div>
      </div>

      <SettingsDialog />
    </>
  );
};
