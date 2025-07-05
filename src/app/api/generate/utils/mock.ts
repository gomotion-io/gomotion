export const mock: Omit<Video, "id"> = {
  created_at: new Date().toISOString(),
  name: "Hello World Particle",
  profile_id: "8ca7f1bc-35f7-4810-99de-58795c9697ff",
  width: 1920,
  height: 1080,
  fps: 30,
  duration_in_frames: 420,
  composition: {
    textStompLayer: {
      words: [],
      gap: 20,
    },
  },
};
