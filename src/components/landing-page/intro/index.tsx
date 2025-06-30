"use client";

import Copy from "@/components/landing-page/intro/copy";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import CustomEase from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function Intro() {
  useGSAP(() => {
    const heroLink = document.querySelector(".hero-link");
    const animationDelay = 0.9;

    if (heroLink) {
      gsap.set(heroLink, { y: 30, opacity: 0 });

      gsap.to(heroLink, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: animationDelay,
        ease: "power4.out",
      });
    }
  }, []);

  return (
    <>
      <section
        className="relative w-screen overflow-hidden text-stone-100"
        style={{ height: "calc(100svh - 5rem)" }}
      >
        <div>
          <div
            className="absolute w-full flex px-5 sm:px-10"
            style={{ top: "25svh", left: 0 }}
          >
            <div className="flex-[2] lg:flex-[2]">
              <Copy animateOnScroll={false} delay={0.9}>
                <h3 className="font-medium text-4xl leading-snug">
                  Distractions surround us. Focus defines us. We use
                  <span className="opacity-50 ml-1">
                    {" "}
                    Motion Design to tell stories that stick.
                  </span>
                </h3>
              </Copy>
            </div>
            <div className="hidden lg:flex flex-[4]"></div>
          </div>
        </div>
      </section>
    </>
  );
}
