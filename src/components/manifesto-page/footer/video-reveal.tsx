import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function VideoReveal() {
  const footerBgRef = useRef<HTMLDivElement>(null);
  const footerImgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!footerBgRef.current || !footerImgRef.current) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: footerBgRef.current,
        scrub: true,
        start: "top bottom-=700",
        end: "+=500px",
      },
    });

    timeline
      .from(footerBgRef.current, { clipPath: `inset(15%)` })
      .to(footerImgRef.current, { height: "200px" }, 0);
  }, []);

  return (
    <div className="relative w-full flex justify-center">
      <div
        ref={footerBgRef}
        className="footerBg w-full h-[70vh] sm:h-[100vh] absolute filter brightness-50"
      >
        <video
          src="https://legendary.b-cdn.net/website/motion-wall.mp4"
          autoPlay
          loop
          muted
          controls={false}
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex justify-center relative mt-[35vh]">
        <div
          ref={footerImgRef}
          data-scroll
          data-scroll-speed="0.3"
          className="footerImg absolute w-[350px] h-[475px] text-center font-medium text-xl "
        ></div>
        <h1
          data-scroll
          data-scroll-speed="0.7"
          className="text-white text-[7vw] z-30 text-center whitespace-nowrap"
        >
          <Image
            src="/images/gomotion.svg"
            alt="gomotion"
            width={55}
            height={55}
            unoptimized
          />
        </h1>
      </div>
    </div>
  );
}
