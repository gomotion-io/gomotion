"use client";

import { Menu } from "@/components/menu";
import { Button } from "@/components/ui/button";
import { CircularProgress } from "@/components/ui/circular-progress";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { VideoHistory } from "@/components/video-history";
import { useParamStore } from "@/store/params.store";
import { useRenderStore } from "@/store/render.store";
import { useUserStore } from "@/store/user.store";
import { useVideoStore } from "@/store/video.store";
import { PlusIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";

export const Profile = () => {
  const router = useRouter();
  const { user, profile, signOut } = useUserStore();
  const video = useVideoStore((state) => state.currentVideo);
  const renderVideo = useRenderStore((state) => state.renderVideo);
  const progress = useRenderStore((state) => state.state);
  const narrativeMode = useParamStore((state) => state.narrativeMode);
  const setNarrativeMode = useParamStore((state) => state.setNarrativeMode);

  // stores actions
  const resetVideo = useVideoStore((state) => state.reset);
  const setPrompt = useParamStore((state) => state.setPrompt);

  const handleCreateNew = () => {
    // Clear current video and prompt then navigate to a clean explorer page
    resetVideo();
    setPrompt("");
    router.push("/explore");
  };

  const logout = async () => {
    await signOut();
    router.push("/sign-in");
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-5 h-32 w-full items-center justify-center pt-5">
      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center gap-3">
          {profile?.subscription_status === "inactive" && (
            <Button size="sm" onClick={() => router.push("/pricing")}>
              Upgrade
            </Button>
          )}

          <Button onClick={handleCreateNew}>
            Create new <PlusIcon />
          </Button>

          <Button
            variant="outline"
            onClick={renderVideo}
            className=" hidden sm:block"
            disabled={
              !video ||
              !video.composition ||
              progress.status === "rendering" ||
              progress.status === "invoking"
            }
          >
            {progress.status === "invoking" ? (
              <div className="flex items-center">
                <span>Preparing...</span>
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
                <span>Exporting...</span>
              </div>
            ) : (
              "Export video"
            )}
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <VideoHistory />
          <Menu logout={logout} user={user} />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="narrative-mode"
          checked={narrativeMode}
          onCheckedChange={setNarrativeMode}
        />
        <Label
          htmlFor="narrative-mode"
          className={
            narrativeMode
              ? "text-emerald-900 [text-shadow:0_0_10px_rgb(34_197_94)]"
              : ""
          }
        >
          Narrative mode
        </Label>
      </div>
    </div>
  );
};
