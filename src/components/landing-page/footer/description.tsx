import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactNode, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const phrases = [
  "We are young",
  "We are passionates",
  "We are storytellers",
  "We are innovators turning big ideas into motion",
  "This is our team..",
];

export default function Description() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const descriptions = containerRef.current.querySelectorAll<HTMLElement>(
      ".footer-description"
    );

    descriptions.forEach((item) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          scrub: true,
          start: "0px bottom",
          end: "bottom+=400px bottom",
        },
        opacity: 0,
        left: "-200px",
        ease: "power3.Out",
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative text-white uppercase text-[8vw] sm:text-[3vw] mt-[15vw] ml-[5vw] sm:ml-[10vw]"
    >
      {phrases.map((phrase, index) => {
        return <AnimatedText key={index}>{phrase}</AnimatedText>;
      })}
    </div>
  );
}

function AnimatedText({ children }: { children: ReactNode }) {
  return <p className="footer-description relative m-0">{children}</p>;
}
