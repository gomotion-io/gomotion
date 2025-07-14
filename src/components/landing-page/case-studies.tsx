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
            text="Dive Into New Success Stories"
            className="relative font-bold text-5xl sm:text-7xl uppercase mb-10"
            triggerOnScroll
          />
        </div>
        <div className="w-full pb-16">
          <div className="mx-auto flex flex-col gap-8 md:flex-row">
            <div className="flex-1">
              <h3 className="uppercase text-xl tracking-wide mb-2">
                [ Case Studies ]
              </h3>
            </div>

            <div className="flex-1 space-y-16">
              <div className="w-full sm:w-[70%] space-y-8 sm:space-y-16">
                <h2 className="text-4xl sm:text-6xl font-neue-montreal font-semibold">
                  How is AI Reshaping Artistic Boundaries?
                </h2>
                <p className="leading-relaxed text-muted-foreground">
                  Generative AI has rapidly advanced, moving beyond its humble
                  beginnings of basic visual outputs to now creating stunning,
                  lifelike artworks that challenge our perceptions of creativity
                  and technology.
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
    title: "Art in the Age of Algorithms",
    primary: "[ Lumina Horizon — Zara Lee ]",
    description:
      "Zara Lee’s AI-powered installation captivates audiences at the Global Digital Arts Forum, raising questions about the fusion of human intent and machine precision. The work highlights the limitless potential of AI as a creative partner in the world of modern art.",
    landingImg: "/images/landing/process_004.jpeg",
  },
  {
    title: "The Dawn of AI-Driven Fashion",
    primary: "[ Visionary Threads — Elena Marquez ]",
    description:
      "Elena Marquez launches the first fashion magazine curated entirely by AI, featuring futuristic designs and concepts that redefine the boundaries of creativity. While widely praised for its innovation, the magazine ignites debates over the role of human designers in a machine-led creative process.",
    landingImg: "/images/landing/process_002.jpeg",
  },
  {
    title: "The Rise of AI-Curated Art Awards",
    primary: "[ Synthetic Realities — Sophia Armitage ]",
    description:
      "Sophia Armitage’s groundbreaking AI-curated exhibition highlights the creative potential of machine-generated art. The event features photorealistic works of entirely fictional subjects, sparking a discussion about bias, authenticity, and AI’s role in shaping the future of artistic recognition.",
    landingImg: "/images/landing/process_003.jpeg",
  },
];
