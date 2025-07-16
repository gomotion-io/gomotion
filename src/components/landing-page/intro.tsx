import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";
import { CustomPlayer } from "@/components/custom-player";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export const Intro = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const geoBgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const yMove = -750 * progress;
          const rotation = 360 * progress;

          gsap.to(geoBgRef.current, {
            y: yMove,
            rotation: rotation,
            duration: 0.1,
            ease: "none",
            overwrite: true,
          });
        },
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="pb-10 sm:pb-32 block-layout relative overflow-hidden"
    >
      <div className="h-[10rem]" />

      <div
        ref={geoBgRef}
        className="absolute opacity-25"
        style={{
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(2.5)",
          transformOrigin: "center center",
          zIndex: -1,
        }}
      >
        <GeometricBackground />
      </div>

      <div className="w-full sm:pt-[20em] pb-16">
        <div className="mx-auto flex flex-col gap-8 md:flex-row">
          <div className="flex-1">
            <h3 className="uppercase text-xl tracking-wide mb-2">
              [ Setting the Scene ]
            </h3>
          </div>

          <div className="flex-1 space-y-16">
            <div className="w-full sm:w-[70%] space-y-16">
            <h2 className="leading-relaxed text-3xl">
              Create complex animations with simple prompts.
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              No more complex keyframes, shapes, or animation timelines.
              You no longer need a master’s degree to express your creativity.

              With a single prompt, you can generate intricate scenes, shapes,
              and motion animations that perfectly match your vision.
            </p>

            <h2 className="text-white font-bold leading-relaxed mt-6">
            Forget About After Effects
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              That concept you've been putting off because animation feels impossible? 
              GoMotion makes it real in minutes, not months. Complete with visuals, 
              motion, and sound - exactly as you imagined it.
            </p>

            </div>

            <div className="space-y-8">
              <h4 className="leading-relaxed sm:w-2/3 ">
                <span className="font-semibold underline underline-offset-4">
                  PROMPT
                </span>
                :{" "}
                <span className="italic  ">
                  A glitch and kinetic effect featuring the brand GOMOTION,
                  accompanied by a voiceover saying Unleash your creativity
                </span>
              </h4>

              <div className="flex flex-col gap-8 sm:flex-row">
                {[
                  {
                    src: "https://legendary.b-cdn.net/site/placeholder.mov",
                    title: "— Created with Gomotion G-Zero (G-0)",
                  },
                  {
                    src: "https://legendary.b-cdn.net/site/placeholder.mov",
                    title: "— Created with Gomotion G-Zero (G-0)",
                  },
                ].map(({ src, title }, idx) => (
                  <div key={idx} className="flex-1">
                    <div
                      className="relative w-full aspect-square mb-4 overflow-hidden"
                      style={{
                        clipPath:
                          "polygon(0 0, 80% 0, 100% 20%, 100% 70%, 100% 100%, 10% 100%, 0 90%, 0% 30%)",
                      }}
                    >
                      <CustomPlayer
                        url={src}
                        width="100%"
                        height="100%"
                        playsinline
                        style={{ position: "absolute", top: 0, left: 0 }}
                        config={{
                          file: {
                            attributes: {
                              style: {
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              },
                            },
                          },
                        }}
                      />
                    </div>
                    <h4 className="font-medium">{title}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GeometricBackground = () => {
  return (
    <svg
      width="201"
      height="200"
      viewBox="0 0 201 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1_1034)">
        <mask
          id="mask0_1_1034"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="201"
          height="200"
        >
          <path d="M200.5 0H0.5V200H200.5V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_1_1034)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M189.441 100C193.269 100 196.977 99.4861 200.5 98.5234C197.699 97.9327 194.795 97.622 191.819 97.622H142.355C134.185 97.622 126.561 95.2811 120.119 91.2334C121.527 82.9896 125.413 75.0866 131.777 68.7229L163.391 37.1094C166.098 34.4024 168.356 31.4169 170.167 28.2452C167.768 29.8079 165.495 31.6416 163.391 33.7463L128.414 68.7229C122.637 74.4999 115.591 78.2351 108.174 79.9285C103.34 73.1033 100.5 64.7671 100.5 55.7675V11.0593C100.5 7.23107 99.9861 3.5229 99.0234 0C98.4327 2.80071 98.122 5.70466 98.122 8.68118V58.1456C98.122 66.3155 95.7811 73.9388 91.7335 80.3812C83.4897 78.9727 75.5866 75.0865 69.2229 68.7228L37.6094 37.1094C34.9024 34.4024 31.9169 32.1437 28.7452 30.3334C30.3079 32.7315 32.1416 35.0047 34.2463 37.1094L69.2229 72.086C74.9999 77.8631 78.7352 84.9088 80.4285 92.3263C73.6033 97.1596 65.2671 100 56.2675 100H11.5593C7.73105 100 4.02289 100.514 0.5 101.477C3.30073 102.067 6.20469 102.378 9.18122 102.378H58.6456C66.8156 102.378 74.4388 104.719 80.8812 108.767C79.4727 117.01 75.5866 124.913 69.2229 131.277L37.6094 162.891C34.9025 165.598 32.6438 168.583 30.8335 171.755C33.2316 170.192 35.5047 168.358 37.6094 166.254L72.586 131.277C78.363 125.5 85.4088 121.765 92.8263 120.071C97.6596 126.897 100.5 135.233 100.5 144.233V188.941C100.5 192.769 101.014 196.477 101.977 200C102.567 197.199 102.878 194.295 102.878 191.319V141.854C102.878 133.684 105.219 126.061 109.267 119.619C117.51 121.027 125.413 124.913 131.777 131.277L163.391 162.891C166.098 165.598 169.083 167.856 172.255 169.667C170.692 167.268 168.858 164.995 166.754 162.891L131.777 127.914C126 122.137 122.265 115.091 120.572 107.674C127.397 102.84 135.733 100 144.733 100H189.441Z"
            fill="#a8a29e"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_1_1034">
          <rect
            width="200"
            height="200"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
