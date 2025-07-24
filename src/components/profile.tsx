"use client";

import { Menu } from "@/components/menu";
import { Button } from "@/components/ui/button";
import { CircularProgress } from "@/components/ui/circular-progress";
import { VideoHistory } from "@/components/video-history";
import { useParamStore } from "@/store/params.store";
import { useRenderStore } from "@/store/render.store";
import { useUserStore } from "@/store/user.store";
import { useVideoStore } from "@/store/video.store";
import { PlusIcon } from "@heroicons/react/16/solid";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export const Profile = () => {
  const pathname = usePathname();
  const isExplorePage = pathname.startsWith("/explore");
  const router = useRouter();
  const { user, profile, signOut } = useUserStore();
  const video = useVideoStore((state) => state.currentVideo);
  const renderVideo = useRenderStore((state) => state.renderVideo);
  const progress = useRenderStore((state) => state.state);

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

  return isExplorePage ? (
    <div className="flex items-center gap-3">
      <div className="flex  items-center gap-3">
        {profile?.subscription_status === "inactive" && (
          <Button size="sm" onClick={() => router.push("/pricing")}>
            Upgrade
          </Button>
        )}
        <Button variant="outline" size="sm" onClick={handleCreateNew}>
          Create new <PlusIcon />
        </Button>
        <Button
          variant="outline"
          size="sm"
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
        <VideoHistory />
      </div>
      <Menu logout={logout} user={user} />
    </div>
  ) : (
    <div className="flex items-center gap-4">
      <Link href="/pricing">
        <div className="text-primary text-sm underline-offset-4 hover:underline font-semibold">
          Pricing
        </div>
      </Link>

      <Link href="/explore">
        <Button size="sm">
          Go to app <ArrowRight />{" "}
        </Button>
      </Link>
    </div>
  );
};
