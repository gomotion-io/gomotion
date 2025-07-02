"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import {
  default as Picture1,
  default as Picture2,
  default as Picture3,
} from "../../../../public/images/salar_de_atacama.jpg";

import Image, { StaticImageData } from "next/image";
import { useEffect, useRef } from "react";

export const ParallaxBand = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <main className="overflow-hidden">
      <div className="h-[5vh] md:h-[10vh]" />
      <div ref={container}>
        <Slide
          src={Picture1}
          direction={"left"}
          left={"-40%"}
          progress={scrollYProgress}
        />
        <Slide
          src={Picture2}
          direction={"right"}
          left={"-25%"}
          progress={scrollYProgress}
        />
        <Slide
          src={Picture3}
          direction={"left"}
          left={"-75%"}
          progress={scrollYProgress}
        />
      </div>
      <div className="h-[5vh] md:h-[10vh]" />
    </main>
  );
};

type SlideProps = {
  direction: "left" | "right";
  left: string;
  progress: MotionValue<number>;
  src: StaticImageData | string;
};

const Slide = (props: SlideProps) => {
  const direction = props.direction == "left" ? -1 : 1;
  const translateX = useTransform(
    props.progress,
    [0, 1],
    [150 * direction, -150 * direction]
  );
  const src = props.src as string;

  return (
    <motion.div
      style={{ x: translateX, left: props.left }}
      className="relative flex whitespace-nowrap will-change-transform"
    >
      <Phrase src={src} text="Life Coach" />
      <Phrase src={src} text="Tech Reviewer" />
      <Phrase src={src} text="Educational Creator" />
      <Phrase src={src} text="Casual Influencer" />
    </motion.div>
  );
};

const Phrase = ({ src, text }: { src: string; text: string }) => {
  return (
    <div className="px-5 mb-5 flex gap-5 items-center">
      <p className="text-[9.5vw] sm:text-[3.5vw] text-black">{text}</p>
      <span className="relative h-[9vw] md:h-[4.5vw] aspect-[4/2] rounded-full overflow-hidden">
        <Image style={{ objectFit: "cover" }} src={src} alt="image" fill />
      </span>
    </div>
  );
};
