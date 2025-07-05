"use client";

import VideoReveal from "@/components/landing-page/footer/video-reveal";
import Description from "@/components/landing-page/footer/description";
import Line from "@/components/landing-page/footer/line";
import GetStarted from "@/components/landing-page/footer/get-started";

export default function Footer() {
  return (
    <>
      <VideoReveal />
      <Description />
      <GetStarted />
      <Line />
    </>
  );
}
