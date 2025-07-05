"use client";

import { Player } from "@remotion/player";
import { Loader } from "@/components/loader";
import { useVideoStore } from "@/store/video.store";
import { useUserStore } from "@/store/user.store";
import { GomotionCompiler } from "@/gomotion-compiler/composition";

export const RemotionPlayer = () => {
  const { profile } = useUserStore();
  const loading = useVideoStore((state) => state.loading);
  const currentVideo = useVideoStore((state) => state.currentVideo);

  if (loading) {
    return (
      <div className="w-full flex-1 flex items-center justify-center">
        <div className="text-neutral-500 flex items-center ">
          <Loader /> <div>Loading video...</div>
        </div>
      </div>
    );
  }

  if (!currentVideo || !currentVideo.composition) {
    return (
      <div className="w-full flex-1 flex items-center justify-center">
        <p className="text-neutral-500">No generation yet..</p>
      </div>
    );
  }

  return (
    <div className="w-full flex-1">
      <Player
        controls
        alwaysShowControls
        component={GomotionCompiler}
        durationInFrames={Math.floor(currentVideo.duration_in_frames) + 1}
        outFrame={Math.max(1, Math.floor(currentVideo.duration_in_frames) - 1)}
        compositionHeight={currentVideo.height}
        compositionWidth={currentVideo.width}
        fps={currentVideo.fps}
        style={{ width: "100%", height: "100%" }}
        inputProps={{
          watermark: profile?.subscription_status === "inactive",
          fps: currentVideo.fps,
          textStompLayer: currentVideo.composition.textStompLayer,
        }}
        browserMediaControlsBehavior={{ mode: "register-media-session" }}
        spaceKeyToPlayOrPause
      />
    </div>
  );
};
