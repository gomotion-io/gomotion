export interface ProfileData extends Profile {
  products: {
    limit: number;
    variant_id: string | null;
  } | null;
}

export type MastraOutput = {
  title: string;
  component: string;
  meta: {
    width: number;
    height: number;
    fps: number;
    durationInFrames: number;
  };
};
