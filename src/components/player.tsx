"use client";

import { Player } from "@remotion/player";
import { useUserStore } from "@/store/user.store";
import { GomotionCompiler } from "@/gomotion-compiler-v2";
import { samples } from "@/gomotion-compiler-v2/samples";
import { useMemo } from "react";

export const RemotionPlayer = () => {
  const { profile } = useUserStore();
  // const loading = useVideoStore((state) => state.loading);
  // const currentVideo = useVideoStore((state) => state.currentVideo);
  //
  // if (loading) {
  //   return (
  //     <div className="w-full flex-1 flex items-center justify-center">
  //       <div className="text-neutral-500 flex items-center ">
  //         <Loader /> <div>Loading video...</div>
  //       </div>
  //     </div>
  //   );
  // }
  //
  // if (!currentVideo || !currentVideo.composition) {
  //   return (
  //     <div className="w-full flex-1 flex items-center justify-center">
  //       <p className="text-neutral-500">No generation yet..</p>
  //     </div>
  //   );
  // }

  // ====================
  const { width, height, fps } = samples.meta;

  const durationInFrames = useMemo(
    () =>
      (samples.layers
        .map((t) => t.startMs + t.durationMs)
        .reduce((a, b) => Math.max(a, b), 0) /
        1000) *
      fps,
    [fps],
  );

  return (
    <div className="w-full flex-1">
      <Player
        controls
        alwaysShowControls
        component={GomotionCompiler}
        durationInFrames={durationInFrames}
        compositionHeight={height}
        compositionWidth={width}
        fps={fps}
        style={{ width: "100%", height: "100%" }}
        inputProps={{
          spec: samples,
          watermark: profile?.subscription_status === "inactive",
        }}
        browserMediaControlsBehavior={{ mode: "register-media-session" }}
        spaceKeyToPlayOrPause
      />
    </div>
  );
};
