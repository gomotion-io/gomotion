import { Player } from "@remotion/player";
import { useGenerationStore } from "@/store/generation";
import { Loader } from "@/components/loader";

export const RemotionPlayer = () => {
  const preparing = useGenerationStore((state) => state.preparing);
  const loading = useGenerationStore((state) => state.loading);
  const composition = useGenerationStore((state) => state.composition);
  const metadata = useGenerationStore((state) => state.metadata);

  if (preparing) {
    return (
      <div className="w-full flex-1 flex items-center justify-center">
        <div className="text-neutral-500 flex items-center ">
          <Loader /> <div>Preparing...</div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full flex-1 flex items-center justify-center">
        <div className="text-neutral-500 flex items-center ">
          <Loader /> <div>Loading video...</div>
        </div>
      </div>
    );
  }

  if (!composition || !metadata) {
    return (
      <div className="w-full flex-1 flex items-center justify-center">
        <p className="text-neutral-500">No composition loaded</p>
      </div>
    );
  }

  return (
    <div className="w-full flex-1">
      <Player
        controls
        alwaysShowControls
        component={composition}
        durationInFrames={Math.floor(metadata.duration_in_frames) + 1}
        outFrame={Math.max(1, Math.floor(metadata.duration_in_frames) - 1)}
        compositionHeight={metadata.height}
        compositionWidth={metadata.width}
        fps={metadata.fps}
        style={{ width: "100%", height: "100%" }}
        inputProps={{}}
        browserMediaControlsBehavior={{ mode: "register-media-session" }}
        spaceKeyToPlayOrPause
        loop
      />
    </div>
  );
};
