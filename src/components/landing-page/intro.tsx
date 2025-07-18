import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";
import { CustomPlayer } from "@/components/custom-player";
import { GeometricBackground } from "@/components/geometric-background";

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
              <h2 className="text-4xl sm:text-6xl font-neue-montreal font-semibold">
                Animations with simple prompts.
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                No more complex keyframes, shapes, or animation timelines. You
                no longer need a master’s degree to express your creativity.
                With a single prompt, you can generate intricate scenes, shapes,
                and motion animations that perfectly match your vision.
              </p>

              <h2 className="text-white font-bold leading-relaxed mt-6">
                Forget About After Effects
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                That concept you&#39;ve been putting off because animation feels
                impossible? GoMotion makes it real in minutes, not months.
                Complete with visuals, motion, and sound - exactly as you
                imagined it.
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
