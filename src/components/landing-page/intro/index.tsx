"use client";

import Copy from "@/components/landing-page/intro/copy";
import DynamicBackground from "@/components/landing-page/intro/dynamic-background";
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
        className="relative w-screen overflow-hidden text-foreground px-5 sm:px-10"
        style={{ height: "calc(100svh - 5rem)" }}
      >
        <DynamicBackground logoPath="/images/logos/logo_light.png" />

        <div className="hero-content">
          <div
            className="absolute w-full flex p-6"
            style={{ top: "25svh", left: 0 }}
          >
            <div className="flex-[2] lg:flex-[2]">
              <Copy animateOnScroll={false} delay={0.9}>
                <h3 className="font-medium text-4xl">
                  Systems thinking and creative execution brought into web
                  development for consistent outcomes.
                </h3>
              </Copy>
            </div>
            <div className="hidden lg:flex flex-[4]"></div>
          </div>

          <div className="absolute bottom-0 w-full p-6 flex items-end">
            <div className="hidden lg:flex flex-[4] gap-[4.5rem]">
              <Copy animateOnScroll={false} delay={0.9}>
                <div className="w-[65%]">
                  <p className="sm caps mono">Studios</p>
                  <p className="sm caps mono">Toronto and Copenhagen</p>
                </div>
              </Copy>
            </div>
            <div className="flex-[2] flex justify-between items-end">
              <div className="flex-shrink-0">
                <Copy animateOnScroll={false} delay={0.9}>
                  <p className="sm caps mono">Web Systems</p>
                  <p className="sm caps mono">Interface Design</p>
                  <p className="sm caps mono">Creative Development</p>
                  <p className="sm caps mono">End to End Delivery</p>
                </Copy>
              </div>

              <div className="hero-link">
                {/*<BtnLink route="/contact" label="contact" />*/}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
