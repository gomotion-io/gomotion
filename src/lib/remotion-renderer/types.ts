export type RenderVideoOptions = {
  runId?: string; // Made optional with default generation
  fileTree: Record<string, string>; // assumes text files; see note below for binary
  meta: {
    inputProps?: Record<string, unknown> & {
      durationInFrames?: number;
      fps?: number;
      width?: number;
      height?: number;
    };
    compositionId?: string; // Allow caller to specify which composition to use
    // optional overrides
    privacy?: "public" | "private" | "no-acl"; // output privacy (site must stay public/no-acl)
    codec?: "h264" | "h265" | "vp8" | "prores";
    audioCodec?: "aac" | "mp3" | "opus" | "pcm-16";
    crf?: number | null;
    videoBitrate?: string;
    x264Preset?: "superfast" | "veryfast" | "faster" | "fast" | "medium" | "slow" | "slower" | "veryslow" | "placebo";
    colorSpace?: "default" | "bt709" | "bt2020-ncl";
    scale?: number; // 1 = native, 2 = 2x, etc.
    timeoutInMs?: number; // for delayRender waiting
    concurrency?: number; // alternative to framesPerLambda
    keepTmp?: boolean; // keep temp dir for debugging
  };
};

export type RenderResult = {
  renderId: string;
  bucketName: string;
  region: string;
};

export type ProjectScaffoldOptions = {
  compositionId: string;
  inputProps: RenderVideoOptions["meta"]["inputProps"];
};
