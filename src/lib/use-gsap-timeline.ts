import { useEffect, useRef } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { gsap, registerGSAPPlugins } from "./gsap-plugins";

export const useGsapTimeline = <T extends HTMLElement>(
  gsapTimelineFactory: () => gsap.core.Timeline
) => {
  const animationScopeRef = useRef<T>(null);
  const timelineRef = useRef<gsap.core.Timeline>(null);

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  useEffect(() => {
    // Register GSAP plugins once
    registerGSAPPlugins();

    const ctx = gsap.context(() => {
      timelineRef.current = gsapTimelineFactory();
      timelineRef.current.pause();
    }, animationScopeRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.seek(frame / fps);
    }
  }, [frame, fps]);

  return animationScopeRef;
};
