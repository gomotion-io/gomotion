// convert milliseconds in frames
export function msToFrame(ms: number, fps: number) {
  return Math.round((ms / 1000) * fps);
}

// clamp value to stay between 0 and 1
export function clamp(v: number) {
  return Math.max(0, Math.min(1, v));
}
