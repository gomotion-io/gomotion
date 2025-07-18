import { ShuffleText } from "@/components/shuffle-text";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export const CaseStudies = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const images = gsap.utils.toArray<HTMLElement>(".case-studies-img");

      images.forEach((img, i) => {
        const imgElement = (img as HTMLElement).querySelector("img");

        ScrollTrigger.create({
          trigger: img as HTMLElement,
          start: "top bottom",
          end: "top top",
          onUpdate: (self) => {
            gsap.to(imgElement, {
              scale: 2 - self.progress,
              duration: 0.1,
              ease: "none",
            });
          },
        });

        ScrollTrigger.create({
          trigger: img as HTMLElement,
          start: "top top",
          end: () =>
            `+=${
              (document.querySelector(".case-studies-item") as HTMLElement)
                .offsetHeight *
              (images.length - i - 1)
            }`,
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef}>
      <section className="relative w-full h-full block-layout">
        <div className="w-full sm:w-[65%]">
          <ShuffleText
            as="h3"
            text="Unlock your creativity with gomotion"
            className="relative font-bold text-5xl sm:text-7xl uppercase mb-10"
            triggerOnScroll
          />
        </div>
        <div className="w-full pb-16">
          <div className="mx-auto flex flex-col gap-8 md:flex-row">
            <div className="flex-1">
              <h3 className="uppercase text-xl tracking-wide mb-2">
                [ What you can do ]
              </h3>
            </div>

            <div className="flex-1 space-y-16">
              <div className="w-full sm:w-[70%] space-y-8 sm:space-y-16">
                <h2 className="text-4xl sm:text-6xl font-neue-montreal font-semibold">
                  Create complex animations
                </h2>
                <p className="leading-relaxed text-muted-foreground">
                  Create stunning motion graphics in record time. Animate text,
                  logos, and shapes. Build complex scenes, add visual effects,
                  and synchronize with voice-overs—all from a single prompt.
                  GoMotion makes it effortless to bring your ideas to life with
                  smooth, cinematic motion. Whether you&#39;re producing content
                  for social media, presentations, product demos, or full-length
                  videos, GoMotion adapts to your style and vision — no
                  technical skills required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full h-full flex -mt-0.5">
        <div className="flex-1 relative z-10 block-layout">
          {caseStudies.map((item, idx) => (
            <div
              key={idx}
              className={`case-studies-item case-studies-item-${idx + 1} w-full h-auto md:h-[100svh] mb-24 sm:mb-0`}
            >
              <div className="flex flex-col justify-center h-full gap-4 sm:gap-0">
                <div className="block md:hidden overflow-hidden h-[300px] mb-4">
                  <img
                    src={item.landingImg}
                    alt="case-studiy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <ShuffleText
                  as="h3"
                  text={item.title}
                  className="font-neue-montreal md:min-h-[9rem] font-bold text-5xl sm:text-6xl mb-2"
                  triggerOnScroll
                />
                <p className="mb-2 text-muted-foreground">{item.primary}</p>
                <p className="max-w-xl leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:block flex-1 relative">
          {caseStudies.map((item, idx) => (
            <div
              key={idx}
              className={`case-studies-img case-studies-img-${idx + 1} relative w-full h-[100svh] overflow-hidden z-10`}
              style={{ willChange: "transform" }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[85%] w-[60%]">
                <img
                  src={item.landingImg}
                  alt="case-study"
                  className="w-full h-full object-cover"
                  style={{ willChange: "transform" }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const caseStudies = [
  {
    title: "Animate text in complex scenes from prompt.",
    primary: "[ Transform Words Into Motion ]",
    description:
      "Skip the keyframes—just describe how you want your text to move. GoMotion instantly animates titles, captions, and logos with cinematic flair. Perfect for product demo and creators who want professional results without the hassle.",
    landingImg: "/images/landing/process_004.jpeg",
  },
  {
    title: "Move shapes in complex animations.",
    primary: "[ Master Complex Shape Dynamics ]",
    description:
      "Create advanced shape animations in seconds. From geometric morphs to fluid motion, GoMotion handles the complexity so you can focus on creativity. Great for explainers, data viz, and artistic visuals.",
    landingImg: "/images/landing/process_002.jpeg",
  },
  {
    title: "Create end-to-end animations with voice-over",
    primary: "[ Complete Visual Storytelling ]",
    description:
      "Turn your script into full animated stories with synced voice-overs. Ideal for educators, founders, and creatives who need polished content fast—without the manual editing.",
    landingImg: "/images/landing/process_003.jpeg",
  },
];
