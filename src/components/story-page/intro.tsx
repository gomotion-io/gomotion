import { GeometricBackground } from "@/components/geometric-background";
import { ShuffleText } from "@/components/shuffle-text";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";

export const Intro = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const geoBgRef = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger);

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
    <div ref={containerRef} className="flex justify-center text-lg">
      <section className="relative gap-5 w-full h-full flex md:flex-row flex-col justify-center block-layout pt-40 max-w-6xl">
        <div className="w-full">
          <h3 className="uppercase text-xl tracking-wide mb-5">
            [ Our Story ]
          </h3>

          <ShuffleText
            as="h3"
            text="We are building what after effect should have been"
            className="relative font-bold text-5xl sm:text-6xl uppercase mb-10"
            triggerOnScroll
          />
        </div>

        <div
          ref={geoBgRef}
          className="absolute opacity-25"
          style={{
            top: "100%",
            left: "20%",
            transform: "translate(-50%, -50%) scale(2.5)",
            transformOrigin: "center center",
            zIndex: -1,
          }}
        >
          <GeometricBackground />
        </div>

        <div className="w-full pb-16">
          <div className="flex-1 space-y-16">
            <div className="w-full sm:w-[80%]">
              <div className="space-y-8 sm:space-y-16 leading-relaxed text-muted-foreground">
                Gomotion was born from our frustration with how hard it is to
                bring ideas to life through animation. Traditional tools like
                After Effects take months to master, and every video can swallow
                days, sometimes weeks of production time. We want to make it
                possible to craft motion animations in minutes and give everyone
                the power to express ideas with no technical barriers, just
                creativity.
              </div>

              <h2 className="text-white text-2xl font-bold leading-relaxed my-8">
                We&#39;re Tired of Great Ideas Dying in After Effects
              </h2>

              <p className="mb-4 text-muted-foreground">
                I&apos;m sitting here at 2 AM, staring at a timeline that should
                have taken 20 minutes but has eaten my entire weekend.
              </p>
              <p className="">
                My co-founder just messaged me :{" "}
                <em>
                  &quot;Started another After Effects project. Please
                  help.&quot;
                </em>
              </p>

              <p className="my-8 text-muted-foreground">
                Here&apos;s the thing:{" "}
                <strong className="text-white">
                  I have a Master&apos;s in Data Science and 1,380 YouTube
                  subscribers who trust me to explain complex AI concepts
                </strong>
                . My co-founder is a{" "}
                <strong className="text-white">
                  Senior frontend engineer who&apos;s shipped amazing products
                  for more companies than we can count
                </strong>
                . We&apos;re not dumb.
              </p>

              <p className="text-muted-foreground mb-6">
                But when it comes to turning our ideas into motion? We&apos;re
                hostages.
              </p>

              {/*  =============*/}
              <p className="text-muted-foreground mb-6">
                But when it comes to turning our ideas into motion? We&apos;re
                hostages.
              </p>

              {/*  TODO : APPLY THE SAME STYLE AS BEFORE ON ALL THE TEXT*/}
              <h2 className="text-2xl font-bold mt-10 mb-6">
                The Breaking Point
              </h2>

              <p className="text-muted-foreground mb-4">
                <strong className="text-white">Me:</strong> I&apos;ve got this
                brilliant way to visualize how neural networks learn. It&apos;s
                crystal clear in my head. Should take 5 seconds of animation.
              </p>

              <p className="text-muted-foreground mb-4">
                <strong className="text-white">Reality:</strong> 47 hours later,
                I&apos;m googling &#34;how to make text follow bezier curve&#34;
                for the thousandth time, my idea is half-dead, and I&apos;m
                questioning my life choices. The timeline? Never finished.
              </p>

              <p className="text-muted-foreground mb-4">
                <strong className="text-white">My co-founder:</strong> I need a
                simple product demo. Clean, professional, 30 seconds max.
              </p>

              <p className="text-muted-foreground mb-8">
                <strong className="text-white">Reality:</strong> Three abandoned
                After Effects projects later, we&apos;re still explaining our
                product with static screenshots and hand gestures.
              </p>

              <div className="bg-red-500/10 border-red-400 p-6 mb-8">
                <p className=" font-semibold text-red-400 mb-2">
                  The moment we snapped:
                </p>
                <p className="italic text-red-300">
                  &#34;Why is explaining an idea pure joy, but showing the idea
                  pure torture?&#34;
                </p>
              </div>

              <h2 className="text-2xl font-bold mt-10 mb-6">
                What We&apos;re Actually Building
              </h2>

              <p className="text-muted-foreground mb-6">
                Forget everything you know about motion graphics. We&apos;re not
                building another After Effects. We&apos;re not adding more
                buttons to Figma.
              </p>

              <p className="text-xl mb-6 font-semibold ">
                We&apos;re replacing the entire timeline with a single prompt.
              </p>

              <div className="bg-emerald-500/10 text-emerald-200 p-6 mb-8">
                <p className="mb-4">
                  <strong>You:</strong> &#34;Make my logo bounce in like
                  it&apos;s excited to be here&#34;
                </p>
                <p className=" mb-4">
                  <strong>Gomotion:</strong> *Handles the keyframes, easing
                  curves, and color theory*
                </p>
                <p className="">
                  <strong>You:</strong> *Gets a shareable video in 45 seconds*
                </p>
              </div>

              <h2 className="text-2xl font-bold mt-10 mb-6">
                This Is Personal
              </h2>

              <p className="text-muted-foreground mb-4">
                Every creator has that folder. You know the one. &#34;Video
                Ideas&#34; with 47 half-finished concepts that died because
                animation was too hard.
              </p>

              <p className="text-muted-foreground mb-4">
                Every entrepreneur has that moment. When you realize a simple
                demo video would explain everything, but the learning curve
                feels steeper than your startup journey.
              </p>

              <p className="text-muted-foreground mb-8">
                Every educator has that frustration. When you realize the
                perfect explanation is right there in your head, but getting it
                out requires learning software that feels like rocket science.
              </p>

              <div className="mb-8">
                <p className="text-xl font-bold mb-2">We believe:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    • Your creativity shouldn&apos;t be held hostage by software
                    complexity
                  </li>
                  <li>
                    • Ideas have expiration dates – the tools shouldn&apos;t be
                    slower than inspiration
                  </li>
                  <li>
                    • The best motion graphics tool is the one that disappears
                    while you create
                  </li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold mt-10 mb-6">
                Where We&apos;re Going
              </h2>

              <p className="text-muted-foreground mb-4">
                We&apos;re few months deep, shipping every Friday night with
                pizza boxes and energy drinks scattered across our desks. Our
                north star is simple:{" "}
                <span className="font-bold italic text-white">
                  Let anyone on Earth turn words into moving pictures before
                  their coffee gets cold.
                </span>
              </p>

              <p className="text-muted-foreground mb-6">
                If you&apos;ve ever had a brilliant idea die in a timeline... If
                you&apos;ve ever started an After Effects project and never
                finished it... If you&apos;ve ever chosen NOT to share something
                because making it move felt impossible...
              </p>

              <p className="text-xl mb-8 font-semibold">
                This is for you. This is for us. This is for everyone who&apos;s
                tired of great ideas staying stuck in their heads.
              </p>

              <div className="">
                <p className="font-medium mb-2">
                  — <strong>Lionel & Philippe</strong>
                </p>
                <p className="text-muted-foreground">
                  Co-founders, former timeline hostages, still pressing
                  &#34;publish&#34;
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  P.S. Yes, we&apos;re still learning After Effects. No,
                  we&apos;re not getting better at it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
