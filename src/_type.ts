export interface ProfileData extends Profile {
  products: {
    limit: number;
    variant_id: string | null;
  } | null;
}

export type MastraOutput = {
  runId: string;
  result: {
    meta: {
      fps: number;
      width: number;
      height: number;
      durationInFrames: number;
    };
    title: string;
    component: string;
  };
};
