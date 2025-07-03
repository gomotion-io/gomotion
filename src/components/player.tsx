"use client";

import { Player } from "@remotion/player";
import { Loader } from "@/components/loader";
import { useVideoStore } from "@/store/video.store";

export const RemotionPlayer = () => {
  const loading = useVideoStore((state) => state.loading);
  const currentVideo = useVideoStore((state) => state.currentVideo);
  const composition = useVideoStore((state) => state.composition);

  if (loading) {
    return (
      <div className="w-full flex-1 flex items-center justify-center">
        <div className="text-neutral-500 flex items-center ">
          <Loader /> <div>Loading video...</div>
        </div>
      </div>
    );
  }

  if (!currentVideo || !composition) {
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
        component={composition}
        durationInFrames={Math.floor(currentVideo.duration_in_frames) + 1}
        outFrame={Math.max(1, Math.floor(currentVideo.duration_in_frames) - 1)}
        compositionHeight={currentVideo.height}
        compositionWidth={currentVideo.width}
        fps={currentVideo.fps}
        style={{ width: "100%", height: "100%" }}
        inputProps={{}}
        browserMediaControlsBehavior={{ mode: "register-media-session" }}
        spaceKeyToPlayOrPause
      />
    </div>
  );
};
