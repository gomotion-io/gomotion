export type CompositionMetadata = {
  width: number;
  height: number;
  fps: number;
  duration_in_frames: number;
};

export interface ProfileData extends Profile {
  products: {
    limit: number;
    variant_id: string;
  };
}
