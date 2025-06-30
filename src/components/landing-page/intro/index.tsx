"use client";

import Copy from "@/components/landing-page/intro/copy";
import { Scene } from "@/components/landing-page/intro/scene";

export default function Intro() {
  return (
    <>
      <section
        className="relative w-screen overflow-hidden text-stone-100"
        style={{ height: "calc(100svh - 5rem)" }}
      >
        <Scene />
        <div
          className="absolute w-full flex px-5 sm:px-10 top-[4svh] sm:top-[10svh]"
          style={{ left: 0 }}
        >
          <div className="flex-[2] lg:flex-[2]">
            <Copy animateOnScroll={false} delay={0.9}>
              <h3 className="font-semibold text-4xl leading-snug">
                Retention is all you need. That’s why we use
                <span className="opacity-50 ml-1">
                  {" "}
                  Motion Design to tell stories that stick.
                </span>
              </h3>
            </Copy>
          </div>
          <div className="hidden lg:flex flex-[4]"></div>
        </div>

        <div className="absolute w-full flex bottom-[4svh]" style={{ left: 0 }}>
          <div className="flex-[2] lg:flex-[4]"></div>
          <div className="lg:flex flex-[2] gap-5 opacity-85 justify-end px-5 sm:px-10">
            <Copy animateOnScroll={false} delay={0.9}>
              <div className="font-black leading-snug uppercase ">
                +50K subscribers{" "}
              </div>
            </Copy>
            <Copy animateOnScroll={false} delay={1.2}>
              <div className="font-black leading-snug uppercase">
                +10k videos generated
              </div>
            </Copy>
          </div>
        </div>
      </section>
    </>
  );
}
