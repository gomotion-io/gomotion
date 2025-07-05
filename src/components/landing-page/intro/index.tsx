"use client";

import { CustomPlayer } from "@/components/custom-player";
import Copy from "@/components/landing-page/intro/copy";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import localFont from "next/font/local";
import { cx } from "class-variance-authority";
import Image from "next/image";

const neueMontreal = localFont({
  src: "../../../../public/fonts/PPNeueMontreal-Bold.otf",
});

export default function Intro() {
  return (
    <div className="flex flex-col lg:flex-row w-full">
      <section className="relative flex flex-col items-center justify-center w-full lg:w-1/2 overflow-hidden text-stone-100 h-[100svh] pt-24 sm:pt-14">
        <div className="flex flex-col justify-center lg:items-start items-center mt-20 sm:mt-28">
          <Copy animateOnScroll={false} delay={0.9}>
            <h3
              className={cx(
                "text-white -ml-2 font-medium lg:max-w-xl text-center sm:text-start leading-relaxed text-6xl md:text-7xl mb-2",
                neueMontreal.className,
              )}
            >
              GOMOTION
            </h3>
          </Copy>
          <Copy animateOnScroll={false} delay={0.9}>
            <h3 className="text-white font-medium sm:max-w-xl text-center sm:text-start leading-relaxed text-xl mb-2">
              No After Effects. Just Prompts
            </h3>
          </Copy>
          <Copy animateOnScroll={false} delay={0.9}>
            <h3 className="text-stone-400 text-center lg:text-start px-5 lg:px-0 max-w-full lg:max-w-lg text-balance leading-relaxed text-xl mb-5 sm:mb-14">
              Create stories that stick — effortlessly. GoMotion is the first
              frontier AI model for motion-design storytelling
            </h3>
          </Copy>

          <div className="flex -ml-5">
            <div className="relative w-[5rem] h-[5rem] flex items-center justify-center hero-icon">
              <Image
                src="/images/ae.svg"
                alt="ae"
                width={40}
                height={40}
                unoptimized
              />
              <Image
                src="/images/x.svg"
                alt="x"
                width={70}
                height={70}
                unoptimized
                className="absolute"
              />
            </div>

            <div className="hero-icon">
              <Image
                src="/images/arrow-right.svg"
                alt="x"
                width={80}
                height={80}
                unoptimized
              />
            </div>

            <div className="relative w-[5rem] h-[5rem] flex items-center justify-center hero-icon">
              <Image
                src="/images/gomotion.svg"
                alt="gomotion"
                width={30}
                height={30}
                unoptimized
              />
            </div>
          </div>

          <div className="text-stone-400 italic hero-icon mb-5">
            &#34;Next Gen Motion Design. Without the Old Tools.&#34;
          </div>

          <div className="flex -space-x-2 mb-10 hero-icon">
            <img
              className="inline-block size-10 rounded-full ring-2 ring-stone-400"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <img
              className="inline-block size-10 rounded-full ring-2 ring-stone-400"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <img
              className="inline-block size-10 rounded-full ring-2 ring-stone-400"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              alt=""
            />
            <img
              className="inline-block size-10 rounded-full ring-2 ring-stone-400"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>

          <Link href="/register">
            <Button
              className="intro-button text-lg px-5 cursor-pointer h-12 hover:bg-opacity-50 hover:scale-105 transition-all duration-300 mb-24"
              size="lg"
              variant="outline"
            >
              Get started for free
            </Button>
          </Link>
        </div>
      </section>

      <section className="relative flex items-center justify-center w-full lg:w-1/2 h-[60vh] lg:h-[100svh] overflow-hidden">
        <div className="relative capability-player w-full h-full">
          <CustomPlayer
            url="https://legendary.b-cdn.net/website/works.mp4"
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
      </section>
    </div>
  );
}
