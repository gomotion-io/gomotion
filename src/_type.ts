export interface ProfileData extends Profile {
  products: {
    limit: number;
    variant_id: string | null;
  } | null;
}

export type CompositionOutput = {
  runId: string;
  result: {
    meta: {
      fps: number;
      width: number;
      height: number;
      durationInFrames: number;
    };
    title: string;
    files: Record<string, string>;
    parts?: {
      endFrame: number;
      startFrame: number;
      title: string;
    }[];
  };
};
